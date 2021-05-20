<?php
/**
 * Sync Library
 *
 * @package Ast Block Templates
 * @since 1.0.0
 */

if ( ! class_exists( 'Ast_Block_Templates_Sync_Library' ) ) :

	/**
	 * Sync Library
	 *
	 * @since 1.0.0
	 */
	class Ast_Block_Templates_Sync_Library {

		/**
		 * Instance
		 *
		 * @since 1.0.0
		 * @access private
		 * @var object Class object.
		 */
		private static $instance;

		/**
		 * Initiator
		 *
		 * @since 1.0.0
		 * @return object initialized object of class.
		 */
		public static function get_instance() {
			if ( ! isset( self::$instance ) ) {
				self::$instance = new self();
			}
			return self::$instance;
		}

		/**
		 * Constructor
		 *
		 * @since 1.0.0
		 */
		public function __construct() {
			add_action( 'wp_ajax_ast-block-templates-import-categories', array( $this, 'ajax_import_categories' ) );
			add_action( 'wp_ajax_ast-block-templates-get-sites-request-count', array( $this, 'ajax_sites_requests_count' ) );
			add_action( 'wp_ajax_ast-block-templates-import-sites', array( $this, 'ajax_import_sites' ) );
			add_action( 'wp_ajax_ast-block-templates-get-blocks-request-count', array( $this, 'ajax_blocks_requests_count' ) );
			add_action( 'wp_ajax_ast-block-templates-import-blocks', array( $this, 'ajax_import_blocks' ) );
			add_action( 'wp_ajax_ast-block-templates-check-sync-library-status', array( $this, 'check_sync_status' ) );
			add_action( 'wp_ajax_ast-block-templates-update-sync-library-status', array( $this, 'update_library_complete' ) );
			add_action( 'admin_head', array( $this, 'setup_templates' ) );
		}

		/**
		 * Start Importer
		 *
		 * @since 1.0.0
		 * @return void
		 */
		public function setup_templates() {
			$is_fresh_site = get_site_option( 'ast_block_templates_fresh_site', 'yes' );

			if ( 'no' === $is_fresh_site ) {
				return;
			}

			$this->set_default_assets();

			update_site_option( 'ast_block_templates_fresh_site', 'no' );
		}

		/**
		 * Set default assets
		 *
		 * @since 1.0.2
		 */
		public function set_default_assets() {

			$dir        = AST_BLOCK_TEMPLATES_DIR . 'dist/json';
			$list_files = $this->get_default_assets();
			foreach ( $list_files as $key => $file_name ) {
				if ( file_exists( $dir . '/' . $file_name . '.json' ) ) {
					$data = ast_block_templates_get_filesystem()->get_contents( $dir . '/' . $file_name . '.json' );
					if ( ! empty( $data ) ) {
						update_site_option( $file_name, json_decode( $data, true ) );
					}
				}
			}

		}

		/**
		 * Json Files Names.
		 *
		 * @since 1.0.1
		 * @return array
		 */
		public function get_default_assets() {
			return array(
				'ast-block-templates-categories',
				'ast-block-templates-sites-1',
				'ast-block-templates-site-requests',
				'ast-block-templates-blocks-1',
				'ast-block-templates-block-requests',
			);
		}

		/**
		 * Update Library Complete
		 *
		 * @since 1.0.0
		 * @return void
		 */
		public function update_library_complete() {

			if ( ! ast_block_templates_doing_wp_cli() ) {
				// Verify Nonce.
				check_ajax_referer( 'ast-block-templates-ajax-nonce', '_ajax_nonce' );
			}

			$this->update_latest_checksums();

			update_site_option( 'ast-block-templates-batch-is-complete', 'no', 'no' );
			update_site_option( 'ast-block-templates-manual-sync-complete', 'yes', 'no' );

			if ( ast_block_templates_doing_wp_cli() ) {
				WP_CLI::line( 'Updated checksums' );
			} else {
				wp_send_json_success(
					array(
						'message' => 'Updated checksums',
						'status'  => true,
						'data'    => '',
					)
				);
			}
		}

		/**
		 * Update Library
		 *
		 * @since 1.0.0
		 * @return void
		 */
		public function check_sync_status() {

			if ( ! ast_block_templates_doing_wp_cli() ) {
				// Verify Nonce.
				check_ajax_referer( 'ast-block-templates-ajax-nonce', '_ajax_nonce' );
			}

			if ( 'no' === $this->get_last_export_checksums() ) {

				if ( ast_block_templates_doing_wp_cli() ) {
					WP_CLI::error( 'Template library refreshed!' );
				} else {
					wp_send_json_success(
						array(
							'message' => 'Updated',
							'status'  => true,
							'data'    => 'updated',
						)
					);
				}
			}

			if ( ! ast_block_templates_doing_wp_cli() ) {
				wp_send_json_success(
					array(
						'message' => 'Complete',
						'status'  => true,
						'data'    => '',
					)
				);
			}
		}

		/**
		 * Get Last Exported Checksum Status
		 *
		 * @since 1.0.0
		 * @return string Checksums Status.
		 */
		public function get_last_export_checksums() {

			$old_last_export_checksums = get_site_option( 'ast-block-templates-last-export-checksums', '' );

			$new_last_export_checksums = $this->set_last_export_checksums();

			$checksums_status = 'no';

			if ( empty( $old_last_export_checksums ) ) {
				$checksums_status = 'yes';
			}

			if ( $new_last_export_checksums !== $old_last_export_checksums ) {
				$checksums_status = 'yes';
			}

			return apply_filters( 'ast_block_templates_checksums_status', $checksums_status );
		}

		/**
		 * Set Last Exported Checksum
		 *
		 * @since 1.0.0
		 * @return string Checksums Status.
		 */
		public function set_last_export_checksums() {

			if ( ! empty( $this->last_export_checksums ) ) {
				return $this->last_export_checksums;
			}

			$api_args = array(
				'timeout' => 60,
			);

			$query_args = array();

			$api_url = add_query_arg( $query_args, trailingslashit( AST_BLOCK_TEMPLATES_LIBRARY_URL ) . 'wp-json/astra-sites/v1/get-last-export-checksums/' );

			$response = wp_remote_get( $api_url, $api_args );

			if ( ! is_wp_error( $response ) || wp_remote_retrieve_response_code( $response ) === 200 ) {
				$result = json_decode( wp_remote_retrieve_body( $response ), true );

				// Set last export checksums.
				if ( ! empty( $result['last_export_checksums'] ) ) {
					update_site_option( 'ast-block-templates-last-export-checksums-latest', $result['last_export_checksums'], 'no' );

					$this->last_export_checksums = $result['last_export_checksums'];
				}
			}

			return $this->last_export_checksums;
		}

		/**
		 * Update Latest Checksums
		 *
		 * Store latest checksum after batch complete.
		 *
		 * @since 1.0.0
		 * @return void
		 */
		public function update_latest_checksums() {
			$latest_checksums = get_site_option( 'ast-block-templates-last-export-checksums-latest', '' );
			update_site_option( 'ast-block-templates-last-export-checksums', $latest_checksums, 'no' );
		}

		/**
		 * Import Sites
		 *
		 * @since 1.0.0
		 * @return void
		 */
		public function ajax_import_sites() {

			// Verify Nonce.
			check_ajax_referer( 'ast-block-templates-ajax-nonce', '_ajax_nonce' );

			$page_no = isset( $_POST['page_no'] ) ? absint( $_POST['page_no'] ) : ''; // phpcs:ignore WordPress.Security.NonceVerification.Missing
			if ( $page_no ) {
				$sites_and_pages = $this->import_sites( $page_no );
				wp_send_json_success(
					array(
						'message' => 'Success imported sites for page ' . $page_no,
						'status'  => true,
						'data'    => $sites_and_pages,
					)
				);
			}

			wp_send_json_error(
				array(
					'message' => 'Failed imported sites for page ' . $page_no,
					'status'  => false,
					'data'    => '',
				)
			);
		}

		/**
		 * Import Categories
		 *
		 * @since 1.0.3
		 * @return void
		 */
		public function ajax_import_categories() {

			// Verify Nonce.
			check_ajax_referer( 'ast-block-templates-ajax-nonce', '_ajax_nonce' );

			$categories = $this->import_categories();
			wp_send_json_success(
				array(
					'message' => 'Success imported categories',
					'status'  => true,
					'data'    => $categories,
				)
			);

		}

		/**
		 * Import Blocks
		 *
		 * @since 1.0.0
		 * @return void
		 */
		public function ajax_import_blocks() {

			// Verify Nonce.
			check_ajax_referer( 'ast-block-templates-ajax-nonce', '_ajax_nonce' );

			$page_no = isset( $_POST['page_no'] ) ? absint( $_POST['page_no'] ) : ''; // phpcs:ignore WordPress.Security.NonceVerification.Missing
			if ( $page_no ) {
				$sites_and_pages = $this->import_blocks( $page_no );
				wp_send_json_success(
					array(
						'message' => 'Success imported sites for page ' . $page_no,
						'status'  => true,
						'data'    => $sites_and_pages,
					)
				);
			}

			wp_send_json_error(
				array(
					'message' => 'Failed imported blocks for page ' . $page_no,
					'status'  => false,
					'data'    => '',
				)
			);
		}

		/**
		 * Blocks Requests Count
		 *
		 * @since 1.0.0
		 * @return void
		 */
		public function ajax_sites_requests_count() {

			// Verify Nonce.
			check_ajax_referer( 'ast-block-templates-ajax-nonce', '_ajax_nonce' );

			// Get count.
			$total_requests = $this->get_total_sites_count();
			if ( $total_requests ) {
				wp_send_json_success(
					array(
						'message' => 'Success',
						'status'  => true,
						'data'    => $total_requests,
					)
				);
			}

			wp_send_json_success(
				array(
					'message' => 'Failed',
					'status'  => false,
					'data'    => $total_requests,
				)
			);
		}

		/**
		 * Blocks Requests Count
		 *
		 * @since 1.0.0
		 * @return void
		 */
		public function ajax_blocks_requests_count() {

			// Verify Nonce.
			check_ajax_referer( 'ast-block-templates-ajax-nonce', '_ajax_nonce' );

			// Get count.
			$total_requests = $this->get_total_blocks_requests();
			if ( $total_requests ) {
				wp_send_json_success(
					array(
						'message' => 'Success',
						'status'  => true,
						'data'    => $total_requests,
					)
				);
			}

			wp_send_json_success(
				array(
					'message' => 'Failed',
					'status'  => false,
					'data'    => $total_requests,
				)
			);
		}

		/**
		 * Get Sites Total Requests
		 *
		 * @return integer
		 */
		public function get_total_sites_count() {

			ast_block_templates_log( 'SITE: Getting Total Sites' );

			$api_args = array(
				'timeout' => 60,
			);

			$query_args = apply_filters(
				'ast_block_templates_get_total_pages_args',
				array(
					'page_builder' => 'gutenberg',
				)
			);

			$api_url = add_query_arg( $query_args, trailingslashit( AST_BLOCK_TEMPLATES_LIBRARY_URL ) . 'wp-json/astra-sites/v1/get-total-pages/' );

			ast_block_templates_log( 'SITE: ' . $api_url );

			$response = wp_remote_get( $api_url, $api_args );

			if ( ! is_wp_error( $response ) || wp_remote_retrieve_response_code( $response ) === 200 ) {
				$total_requests = json_decode( wp_remote_retrieve_body( $response ), true );

				if ( isset( $total_requests['pages'] ) ) {
					ast_block_templates_log( 'SITE: Request count ' . $total_requests['pages'] );

					update_site_option( 'ast-block-templates-site-requests', $total_requests['pages'], 'no' );

					do_action( 'ast_block_templates_sync_get_total_pages', $total_requests['pages'] );

					return $total_requests['pages'];
				}
			}

			ast_block_templates_log( 'SITE: Request Failed! Still Calling..' );
		}

		/**
		 * Get Blocks Total Requests
		 *
		 * @return integer
		 */
		public function get_total_blocks_requests() {

			ast_block_templates_log( 'BLOCK: Getting Total Blocks' );

			$api_args = array(
				'timeout' => 60,
			);

			$query_args = apply_filters(
				'ast_block_templates_get_blocks_count_args',
				array(
					'page_builder' => 'gutenberg',
				)
			);

			$api_url = add_query_arg( $query_args, trailingslashit( AST_BLOCK_TEMPLATES_LIBRARY_URL ) . 'wp-json/astra-blocks/v1/get-blocks-count/' );

			ast_block_templates_log( 'BLOCK: ' . $api_url );

			$response = wp_remote_get( $api_url, $api_args );

			if ( ! is_wp_error( $response ) || wp_remote_retrieve_response_code( $response ) === 200 ) {
				$total_requests = json_decode( wp_remote_retrieve_body( $response ), true );

				if ( isset( $total_requests['pages'] ) ) {
					ast_block_templates_log( 'BLOCK: Requests count ' . $total_requests['pages'] );

					update_site_option( 'ast-block-templates-block-requests', $total_requests['pages'], 'no' );

					do_action( 'ast_block_templates_sync_blocks_requests', $total_requests['pages'] );
					return $total_requests['pages'];
				}
			}

		}

		/**
		 * Import Sites
		 *
		 * @since 1.0.0
		 * @param  integer $page Page number.
		 * @return void
		 */
		public function import_sites( $page = 1 ) {

			ast_block_templates_log( 'SITE: Importing request ' . $page . ' ..' );
			$api_args   = array(
				'timeout' => 30,
			);
			$all_blocks = array();

			$query_args = apply_filters(
				'ast_block_templates_get_sites_and_pages_args',
				array(
					'per_page'     => 100,
					'page'         => $page,
					'page-builder' => 'gutenberg',
				)
			);

			$api_url = add_query_arg( $query_args, trailingslashit( AST_BLOCK_TEMPLATES_LIBRARY_URL ) . 'wp-json/astra-sites/v1/sites-and-pages/' );

			ast_block_templates_log( 'SITE: ' . $api_url );

			$response = wp_remote_get( $api_url, $api_args );

			if ( ! is_wp_error( $response ) || wp_remote_retrieve_response_code( $response ) === 200 ) {
				$all_blocks = json_decode( wp_remote_retrieve_body( $response ), true );

				if ( isset( $all_blocks['code'] ) ) {
					$message = isset( $all_blocks['message'] ) ? $all_blocks['message'] : '';
					if ( ! empty( $message ) ) {
						ast_block_templates_log( 'SITE: HTTP Request Error: ' . $message );
					} else {
						ast_block_templates_log( 'SITE: HTTP Request Error!' );
					}
				} else {

					$option_name = 'ast-block-templates-sites-' . $page;
					ast_block_templates_log( 'SITE: Storing in option ' . $option_name );

					update_site_option( $option_name, $all_blocks, 'no' );

					do_action( 'ast_block_templates_sync_sites', $page, $all_blocks );

					if ( ast_block_templates_doing_wp_cli() ) {
						ast_block_templates_log( 'SITE: Generating ' . $option_name . '.json file' );
					}
				}
			} else {
				ast_block_templates_log( 'SITE: API Error: ' . $response->get_error_message() );
			}

			ast_block_templates_log( 'SITE: Completed request ' . $page );
		}

		/**
		 * Import Categories
		 *
		 * @since 1.0.3
		 * @return void
		 */
		public function import_categories() {

			ast_block_templates_log( 'CATEGORY:Importing categories..' );
			$api_args = array(
				'timeout' => 30,
			);

			$query_args = apply_filters(
				'ast_block_templates_get_category_args',
				array(
					'per_page'   => 100,
					'_fields'    => 'id,count,name,slug,parent',
					'hide_empty' => true,
				)
			);

			$api_url = add_query_arg( $query_args, trailingslashit( AST_BLOCK_TEMPLATES_LIBRARY_URL ) . 'wp-json/wp/v2/blocks-category/' );

			$response = wp_remote_get( $api_url, $api_args );

			if ( ! is_wp_error( $response ) || wp_remote_retrieve_response_code( $response ) === 200 ) {
				$all_categories = json_decode( wp_remote_retrieve_body( $response ), true );

				if ( isset( $all_categories['code'] ) ) {
					$message = isset( $all_categories['message'] ) ? $all_categories['message'] : '';
					if ( ! empty( $message ) ) {
						ast_block_templates_log( 'CATEGORY:HTTP Request Error: ' . $message );
					} else {
						ast_block_templates_log( 'CATEGORY:HTTP Request Error!' );
					}
				} else {

					$option_name = 'ast-block-templates-categories';
					ast_block_templates_log( 'CATEGORY:Storing in option ' . $option_name );

					update_site_option( $option_name, $all_categories, 'no' );

					do_action( 'ast_block_templates_sync_categories', $all_categories );

					if ( ast_block_templates_doing_wp_cli() ) {
						ast_block_templates_log( 'CATEGORY:Generating ' . $option_name . '.json file' );
					}
				}
			} else {
				ast_block_templates_log( 'CATEGORY:API Error: ' . $response->get_error_message() );
			}

			ast_block_templates_log( 'CATEGORY:Completed category import.' );
		}

		/**
		 * Import Blocks
		 *
		 * @since 1.0.0
		 * @param  integer $page Page number.
		 * @return void
		 */
		public function import_blocks( $page = 1 ) {

			ast_block_templates_log( 'BLOCK: Importing request ' . $page . ' ..' );
			$api_args   = array(
				'timeout' => 30,
			);
			$all_blocks = array();

			$query_args = apply_filters(
				'ast_block_templates_blocks_args',
				array(
					'page_builder' => 'gutenberg',
					'per_page'     => 100,
					'page'         => $page,
				)
			);

			$api_url = add_query_arg( $query_args, trailingslashit( AST_BLOCK_TEMPLATES_LIBRARY_URL ) . 'wp-json/astra-blocks/v1/blocks/' );

			ast_block_templates_log( 'BLOCK: ' . $api_url );

			$response = wp_remote_get( $api_url, $api_args );

			if ( ! is_wp_error( $response ) || wp_remote_retrieve_response_code( $response ) === 200 ) {
				$all_blocks = json_decode( wp_remote_retrieve_body( $response ), true );

				if ( isset( $all_blocks['code'] ) ) {
					$message = isset( $all_blocks['message'] ) ? $all_blocks['message'] : '';
					if ( ! empty( $message ) ) {
						ast_block_templates_log( 'BLOCK: HTTP Request Error: ' . $message );
					} else {
						ast_block_templates_log( 'BLOCK: HTTP Request Error!' );
					}
				} else {
					$option_name = 'ast-block-templates-blocks-' . $page;
					ast_block_templates_log( 'BLOCK: Storing in option ' . $option_name );

					update_site_option( $option_name, $all_blocks, 'no' );

					if ( ast_block_templates_doing_wp_cli() ) {
						do_action( 'ast_block_templates_sync_blocks', $page, $all_blocks );
						ast_block_templates_log( 'BLOCK: Genearting ' . $option_name . '.json file' );
					}
				}
			} else {
				ast_block_templates_log( 'BLOCK: API Error: ' . $response->get_error_message() );
			}

			ast_block_templates_log( 'BLOCK: Completed request ' . $page );
		}

	}

	/**
	 * Kicking this off by calling 'get_instance()' method
	 */
	Ast_Block_Templates_Sync_Library::get_instance();

endif;
