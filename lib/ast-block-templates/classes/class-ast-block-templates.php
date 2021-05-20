<?php
/**
 * Init
 *
 * @since 1.0.0
 * @package Ast Block Templates
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

if ( ! class_exists( 'Ast_Block_Templates' ) ) :

	/**
	 * Admin
	 */
	class Ast_Block_Templates {

		/**
		 * Instance
		 *
		 * @since 1.0.0
		 * @var (Object) Ast_Block_Templates
		 */
		private static $instance = null;

		/**
		 * Get Instance
		 *
		 * @since 1.0.0
		 *
		 * @return object Class object.
		 */
		public static function get_instance() {
			if ( ! isset( self::$instance ) ) {
				self::$instance = new self();
			}

			return self::$instance;
		}

		/**
		 * Constructor.
		 *
		 * @since 1.0.0
		 */
		private function __construct() {
			require_once AST_BLOCK_TEMPLATES_DIR . 'classes/functions.php';
			require_once AST_BLOCK_TEMPLATES_DIR . 'classes/class-ast-block-templates-sync-library.php';
			require_once AST_BLOCK_TEMPLATES_DIR . 'classes/class-ast-block-templates-image-importer.php';
			require_once AST_BLOCK_TEMPLATES_DIR . 'classes/class-ast-block-templates-sync-library-wp-cli.php';

			add_action( 'enqueue_block_editor_assets', array( $this, 'template_assets' ) );
			add_action( 'wp_ajax_ast_block_templates_importer', array( $this, 'template_importer' ) );
			add_action( 'wp_ajax_ast_block_templates_activate_plugin', array( $this, 'activate_plugin' ) );
			add_action( 'wp_ajax_ast_block_templates_import_wpforms', array( $this, 'import_wpforms' ) );
			add_action( 'wp_ajax_ast_block_templates_import_block', array( $this, 'import_block' ) );
			add_filter( 'upload_mimes', array( $this, 'custom_upload_mimes' ) );
		}

		/**
		 * Add .json files as supported format in the uploader.
		 *
		 * @param array $mimes Already supported mime types.
		 */
		public function custom_upload_mimes( $mimes ) {

			// Allow JSON files.
			$mimes['json'] = 'application/json';

			return $mimes;
		}

		/**
		 * Import WP Forms
		 *
		 * @since 1.0.0
		 *
		 * @param  string $wpforms_url WP Forms JSON file URL.
		 * @return void
		 */
		public function import_wpforms( $wpforms_url = '' ) {

			$wpforms_url = ( isset( $_REQUEST['wpforms_url'] ) ) ? urldecode( $_REQUEST['wpforms_url'] ) : $wpforms_url; // phpcs:ignore WordPress.Security.NonceVerification.Recommended
			$ids_mapping = array();

			if ( ! empty( $wpforms_url ) && function_exists( 'wpforms_encode' ) ) {

				// Download JSON file.
				$file_path = $this->download_file( $wpforms_url );

				if ( $file_path['success'] ) {
					if ( isset( $file_path['data']['file'] ) ) {

						$ext = strtolower( pathinfo( $file_path['data']['file'], PATHINFO_EXTENSION ) );

						if ( 'json' === $ext ) {
							$forms = json_decode( ast_block_templates_get_filesystem()->get_contents( $file_path['data']['file'] ), true );

							if ( ! empty( $forms ) ) {

								foreach ( $forms as $form ) {
									$title = ! empty( $form['settings']['form_title'] ) ? $form['settings']['form_title'] : '';
									$desc  = ! empty( $form['settings']['form_desc'] ) ? $form['settings']['form_desc'] : '';

									$new_id = post_exists( $title, '', '', 'wpforms' );

									if ( ! $new_id ) {
										$new_id = wp_insert_post(
											array(
												'post_title'   => $title,
												'post_status'  => 'publish',
												'post_type'    => 'wpforms',
												'post_excerpt' => $desc,
											)
										);

										ast_block_templates_log( 'Imported Form ' . $title );
									}

									if ( $new_id ) {

										// ID mapping.
										$ids_mapping[ $form['id'] ] = $new_id;

										$form['id'] = $new_id;
										wp_update_post(
											array(
												'ID' => $new_id,
												'post_content' => wpforms_encode( $form ),
											)
										);
									}
								}
							}
						}
					}
				} else {
					wp_send_json_error( $file_path );
				}
			}

			update_option( 'ast_block_templates_wpforms_ids_mapping', $ids_mapping );

			wp_send_json_success( $ids_mapping );
		}

		/**
		 * Import Block
		 */
		public function import_block() {

			// Allow the SVG tags in batch update process.
			add_filter( 'wp_kses_allowed_html', array( $this, 'allowed_tags_and_attributes' ), 10, 2 );

			$ids_mapping = get_option( 'ast_block_templates_wpforms_ids_mapping', array() );

			// Post content.
			$content = isset( $_REQUEST['content'] ) ? stripslashes( $_REQUEST['content'] ) : ''; // phpcs:ignore WordPress.Security.NonceVerification.Recommended

			// Empty mapping? Then return.
			if ( ! empty( $ids_mapping ) ) {
				// Replace ID's.
				foreach ( $ids_mapping as $old_id => $new_id ) {
					$content = str_replace( '[wpforms id="' . $old_id, '[wpforms id="' . $new_id, $content );
					$content = str_replace( '{"formId":"' . $old_id . '"}', '{"formId":"' . $new_id . '"}', $content );
				}
			}

			// # Tweak
			// Gutenberg break block markup from render. Because the '&' is updated in database with '&amp;' and it
			// expects as 'u0026amp;'. So, Converted '&amp;' with 'u0026amp;'.
			//
			// @todo This affect for normal page content too. Detect only Gutenberg pages and process only on it.
			// $content = str_replace( '&amp;', "\u0026amp;", $content );
			$content = $this->get_content( $content );

			// Update content.
			wp_send_json_success( $content );
		}

		/**
		 * Download and Replace hotlink images
		 *
		 * @since 1.0.0
		 *
		 * @param  string $content Mixed post content.
		 * @return array           Hotlink image array.
		 */
		public function get_content( $content = '' ) {

			$content = stripslashes( $content );

			// Extract all links.
			preg_match_all( '#\bhttps?://[^,\s()<>]+(?:\([\w\d]+\)|([^,[:punct:]\s]|/))#', $content, $match );

			$all_links = array_unique( $match[0] );

			// Not have any link.
			if ( empty( $all_links ) ) {
				return $content;
			}

			$link_mapping = array();
			$image_links  = array();
			$other_links  = array();

			// Extract normal and image links.
			foreach ( $all_links as $key => $link ) {
				if ( ast_block_templates_is_valid_image( $link ) ) {

					// Get all image links.
					// Avoid *-150x, *-300x and *-1024x images.
					if (
						false === strpos( $link, '-150x' ) &&
						false === strpos( $link, '-300x' ) &&
						false === strpos( $link, '-1024x' )
					) {
						$image_links[] = $link;
					}
				} else {

					// Collect other links.
					$other_links[] = $link;
				}
			}

			// Step 1: Download images.
			if ( ! empty( $image_links ) ) {
				foreach ( $image_links as $key => $image_url ) {
					// Download remote image.
					$image            = array(
						'url' => $image_url,
						'id'  => 0,
					);
					$downloaded_image = Ast_Block_Templates_Image_Importer::get_instance()->import( $image );

					// Old and New image mapping links.
					$link_mapping[ $image_url ] = $downloaded_image['url'];
				}
			}

			// Step 3: Replace mapping links.
			foreach ( $link_mapping as $old_url => $new_url ) {
				$content = str_replace( $old_url, $new_url, $content );

				// Replace the slashed URLs if any exist.
				$old_url = str_replace( '/', '/\\', $old_url );
				$new_url = str_replace( '/', '/\\', $new_url );
				$content = str_replace( $old_url, $new_url, $content );
			}

			return $content;
		}

		/**
		 * Allowed tags for the batch update process.
		 *
		 * @param  array        $allowedposttags   Array of default allowable HTML tags.
		 * @param  string|array $context    The context for which to retrieve tags. Allowed values are 'post',
		 *                                  'strip', 'data', 'entities', or the name of a field filter such as
		 *                                  'pre_user_description'.
		 * @return array Array of allowed HTML tags and their allowed attributes.
		 */
		public function allowed_tags_and_attributes( $allowedposttags, $context ) {

			// Keep only for 'post' contenxt.
			if ( 'post' === $context ) {

				// <svg> tag and attributes.
				$allowedposttags['svg'] = array(
					'xmlns'   => true,
					'viewbox' => true,
				);

				// <path> tag and attributes.
				$allowedposttags['path'] = array(
					'd' => true,
				);
			}

			return $allowedposttags;
		}

		/**
		 * Activate Plugin
		 */
		public function activate_plugin() {
			wp_clean_plugins_cache();

			$plugin_init = ( isset( $_POST['init'] ) ) ? esc_attr( $_POST['init'] ) : ''; // phpcs:ignore

			$activate = activate_plugin( $plugin_init, '', false, true );

			if ( is_wp_error( $activate ) ) {
				wp_send_json_error(
					array(
						'success' => false,
						'message' => $activate->get_error_message(),
					)
				);
			}

			wp_send_json_success(
				array(
					'message' => 'Plugin activated successfully.',
				)
			);
		}

		/**
		 * Template Importer
		 *
		 * @since 1.0.0
		 */
		public function template_importer() {

			$nonce = isset( $_REQUEST['_ajax_nonce'] ) && wp_verify_nonce( $_REQUEST['_ajax_nonce'], 'ast-block-templates-ajax-nonce' ) ? true : false;

			if ( ! $nonce ) {
				wp_send_json_error( 'Invalid nonce.' );
			}

			$api_uri = sanitize_text_field( $_REQUEST['api_uri'] );

			$api_args = apply_filters(
				'ast_block_templates_api_args',
				array(
					'timeout' => 15,
				)
			);

			$request_params = apply_filters(
				'ast_block_templates_api_params',
				array(
					'_fields' => 'original_content',
				)
			);

			$demo_api_uri = add_query_arg( $request_params, $api_uri );

			// API Call.
			$response = wp_remote_get( $demo_api_uri, $api_args );

			if ( is_wp_error( $response ) || ( isset( $response->status ) && 0 === $response->status ) ) {
				if ( isset( $response->status ) ) {
					wp_send_json_error( json_decode( $response, true ) );
				} else {
					wp_send_json_error( $response->get_error_message() );
				}
			}

			if ( wp_remote_retrieve_response_code( $response ) !== 200 ) {
				wp_send_json_error( wp_remote_retrieve_body( $response ) );
			}

			$data = json_decode( wp_remote_retrieve_body( $response ), true );

			wp_send_json_success( $data['original_content'] );
		}

		/**
		 * Template Assets
		 *
		 * @since 1.0.0
		 */
		public function template_assets() {
			wp_enqueue_script( 'ast-block-templates', AST_BLOCK_TEMPLATES_URI . 'dist/main.js', array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-editor', 'masonry', 'imagesloaded', 'updates' ), AST_BLOCK_TEMPLATES_VER, true );
			wp_add_inline_script( 'ast-block-templates', 'window.lodash = _.noConflict();', 'after' );

			wp_enqueue_style( 'ast-block-templates', AST_BLOCK_TEMPLATES_URI . 'dist/style.css', array(), AST_BLOCK_TEMPLATES_VER, 'all' );

			wp_localize_script(
				'ast-block-templates',
				'AstBlockTemplatesVars',
				apply_filters(
					'ast_block_templates_localize_vars',
					array(
						'popup_class'             => defined( 'UAGB_PLUGIN_SHORT_NAME' ) ? 'uag-block-templates-lightbox' : 'ast-block-templates-lightbox',
						'ajax_url'                => admin_url( 'admin-ajax.php' ),
						'uri'                     => AST_BLOCK_TEMPLATES_URI,
						'white_label_name'        => '',
						'allBlocks'               => $this->get_all_blocks(),
						'allSites'                => $this->get_all_sites(),
						'allCategories'           => get_site_option( 'ast-block-templates-categories', array() ),
						'wpforms_status'          => $this->get_plugin_status( 'wpforms-lite/wpforms.php' ),
						'gutenberg_status'        => $this->get_plugin_status( 'gutenberg/gutenberg.php' ),
						'_ajax_nonce'             => wp_create_nonce( 'ast-block-templates-ajax-nonce' ),
						'button_text'             => esc_html__( 'Starter Templates', 'ast-block-templates' ),
						'display_button_logo'     => true,
						'popup_logo_uri'          => AST_BLOCK_TEMPLATES_URI . 'dist/logo.svg',
						'button_logo'             => AST_BLOCK_TEMPLATES_URI . 'dist/starter-template-logo.svg',
						'button_class'            => '',
						'display_suggestion_link' => true,
						'suggestion_link'         => 'https://wpastra.com/sites-suggestions/?utm_source=demo-import-panel&utm_campaign=astra-sites&utm_medium=suggestions',
					)
				)
			);

		}

		/**
		 * Get plugin status
		 *
		 * @since 1.0.0
		 *
		 * @param  string $plugin_init_file Plguin init file.
		 * @return mixed
		 */
		public function get_plugin_status( $plugin_init_file ) {

			$installed_plugins = get_plugins();

			if ( ! isset( $installed_plugins[ $plugin_init_file ] ) ) {
				return 'not-installed';
			} elseif ( is_plugin_active( $plugin_init_file ) ) {
				return 'active';
			} else {
				return 'inactive';
			}
		}

		/**
		 * Get all sites
		 *
		 * @since 1.0.0
		 *
		 * @return array page builder sites.
		 */
		public function get_all_sites() {
			$total_requests = (int) get_site_option( 'ast-block-templates-site-requests', 0 );

			$sites = array();

			if ( $total_requests ) {

				for ( $page = 1; $page <= $total_requests; $page++ ) {
					$current_page_data = get_site_option( 'ast-block-templates-sites-' . $page, array() );
					if ( ! empty( $current_page_data ) ) {
						foreach ( $current_page_data as $site_id => $site_data ) {

							// Replace `astra-sites-tag` with `tag`.
							$site_data['tag'] = $site_data['astra-sites-tag'];
							unset( $site_data['astra-sites-tag'] );

							// Replace `id-` from the site ID.
							$site_data['ID'] = str_replace( 'id-', '', $site_id );

							if ( count( $site_data['pages'] ) ) {
								foreach ( $site_data['pages'] as $page_id => $page_data ) {

									$single_page = $page_data;

									// Replace `astra-sites-tag` with `tag`.
									$single_page['tag'] = $single_page['astra-sites-tag'];
									unset( $single_page['astra-sites-tag'] );

									// Replace `id-` from the site ID.
									$single_page['ID'] = str_replace( 'id-', '', $page_id );

									$site_data['pages'][] = $single_page;

									unset( $site_data['pages'][ $page_id ] );
								}
							}

							$sites[] = $site_data;
						}
					}
				}
			}

			return $sites;
		}

		/**
		 * Get all blocks
		 *
		 * @since 1.0.0
		 * @return array All Elementor Blocks.
		 */
		public function get_all_blocks() {
			$blocks         = array();
			$total_requests = (int) get_site_option( 'ast-block-templates-block-requests', 0 );

			for ( $page = 1; $page <= $total_requests; $page++ ) {
				$current_page_data = get_site_option( 'ast-block-templates-blocks-' . $page, array() );
				if ( ! empty( $current_page_data ) ) {
					foreach ( $current_page_data as $page_id => $page_data ) {
						$page_data['ID'] = str_replace( 'id-', '', $page_id );
						$blocks[]        = $page_data;
					}
				}
			}

			return $blocks;
		}

		/**
		 * Download File Into Uploads Directory
		 *
		 * @since 1.0.0
		 *
		 * @param  string $file Download File URL.
		 * @param  array  $overrides Upload file arguments.
		 * @param  int    $timeout_seconds Timeout in downloading the XML file in seconds.
		 * @return array        Downloaded file data.
		 */
		public function download_file( $file = '', $overrides = array(), $timeout_seconds = 300 ) {

			// Gives us access to the download_url() and wp_handle_sideload() functions.
			require_once ABSPATH . 'wp-admin/includes/file.php';

			// Download file to temp dir.
			$temp_file = download_url( $file, $timeout_seconds );

			// WP Error.
			if ( is_wp_error( $temp_file ) ) {
				return array(
					'success' => false,
					'data'    => $temp_file->get_error_message(),
				);
			}

			// Array based on $_FILE as seen in PHP file uploads.
			$file_args = array(
				'name'     => basename( $file ),
				'tmp_name' => $temp_file,
				'error'    => 0,
				'size'     => filesize( $temp_file ),
			);

			$defaults = array(

				// Tells WordPress to not look for the POST form
				// fields that would normally be present as
				// we downloaded the file from a remote server, so there
				// will be no form fields
				// Default is true.
				'test_form'   => false,

				// Setting this to false lets WordPress allow empty files, not recommended.
				// Default is true.
				'test_size'   => true,

				// A properly uploaded file will pass this test. There should be no reason to override this one.
				'test_upload' => true,

				'mimes'       => array(
					'xml'  => 'text/xml',
					'json' => 'application/json',
				),
			);

			$overrides = wp_parse_args( $overrides, $defaults );

			// Move the temporary file into the uploads directory.
			$results = wp_handle_sideload( $file_args, $overrides );

			if ( isset( $results['error'] ) ) {
				return array(
					'success' => false,
					'data'    => $results,
				);
			}

			// Success.
			return array(
				'success' => true,
				'data'    => $results,
			);
		}

	}

	/**
	 * Kicking this off by calling 'get_instance()' method
	 */
	Ast_Block_Templates::get_instance();

endif;
