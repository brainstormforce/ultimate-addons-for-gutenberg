<?php
/**
 * UAGB File Generation
 *
 * @package UAGB
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

if ( ! class_exists( 'UAGB_File_Generation' ) ) {

	/**
	 * Class UAGB_File_Generation.
	 */
	final class UAGB_File_Generation {

		/**
		 * Member Variable
		 *
		 * @var instance
		 */
		private static $instance;

		/**
		 * UAG File Generation Flag
		 *
		 * @since 1.14.0
		 * @var file_generation
		 */
		public static $file_generation = 'disabled';

		/**
		 * Current Block List
		 *
		 * @since 1.13.4
		 * @var current_block_list
		 */
		public static $current_block_list = array();

		/**
		 * UAG FAQ Layout Flag
		 *
		 * @since 1.18.1
		 * @var uag_faq_layout
		 */
		public static $uag_faq_layout = false;

		/**
		 * Enque Style and Script Variable
		 *
		 * @since 1.14.0
		 * @var instance
		 */
		public static $css_file_handler = array();

		/**
		 * UAG File Generation Fallback Flag for CSS
		 *
		 * @since 1.15.0
		 * @var file_generation
		 */
		public static $fallback_css = false;

		/**
		 * UAG File Generation Fallback Flag for JS
		 *
		 * @since 1.15.0
		 * @var file_generation
		 */
		public static $fallback_js = false;

		/**
		 * Stylesheet
		 *
		 * @since 1.13.4
		 * @var stylesheet
		 */
		public static $stylesheet = '';

		/**
		 * Script
		 *
		 * @since 1.13.4
		 * @var script
		 */
		public static $script = '';

		/**
		 * UAG Block Flag
		 *
		 * @since 1.13.4
		 * @var uag_flag
		 */
		public static $uag_flag = false;

		/**
		 * Table of Contents Present on a Page.
		 *
		 * @var bool
		 */
		public static $table_of_contents_flag = false;

		/**
		 * Static CSS Added Array
		 *
		 * @since x.x.x
		 * @var array
		 */
		public static $static_css_blocks = array();

		/**
		 * Page Blocks Variable
		 *
		 * @since 1.6.0
		 * @var instance
		 */
		public static $page_blocks;

		/**
		 *  Initiator
		 */
		public static function get_instance() {
			if ( ! isset( self::$instance ) ) {
				self::$instance = new self();
			}
			return self::$instance;
		}

		/**
		 * Constructor
		 */
		public function __construct() {

			$this->define_constants();

			self::$file_generation = static::allow_file_generation();

			add_action( 'wp_enqueue_scripts', array( $this, 'generate_asset_files' ), 1 );
			add_action( 'wp_head', array( $this, 'print_stylesheet' ), 80 );
			add_action( 'save_post', array( $this, 'delete_page_assets' ), 10, 1 );
			add_action( 'wp', array( $this, 'generate_assets' ), 99 );
			add_action( 'wp_footer', array( $this, 'print_script' ), 1000 );
			add_action( 'wp_enqueue_scripts', array( $this, 'block_assets' ), 10 );
			add_filter( 'the_content', array( $this, 'add_table_of_contents_wrapper' ) );

			add_action( 'wp_ajax_uagb_file_generation', array( $this, 'file_generation' ) );
			add_action( 'wp_ajax_uagb_file_regeneration', array( $this, 'file_regeneration' ) );

		}

		/**
		 * Add Wrapper to all the Blocks for fetching the Table of Contents Headings.
		 *
		 * @param string $content Post Content.
		 *
		 * @since 1.22.1
		 */
		public function add_table_of_contents_wrapper( $content ) {

			if ( true === self::$table_of_contents_flag ) {

				return '<div class="uag-toc__entry-content">' . $content . '</div>';
			}

			return $content;
		}

		/**
		 * Print the Script in footer.
		 */
		public function print_script() {

			if ( 'enabled' === self::$file_generation && ! self::$fallback_js ) {
				return;
			}

			if ( is_null( self::$script ) || '' === self::$script ) {
				return;
			}

			ob_start();
			?>
			<script type="text/javascript" id="uagb-script-frontend"><?php echo self::$script; //phpcs:ignore WordPress.XSS.EscapeOutput.OutputNotEscaped ?></script>
			<?php
			ob_end_flush();

			$this->update_page_assets();
		}

		/**
		 * Enqueue Gutenberg block assets for both frontend + backend.
		 *
		 * @since 1.13.4
		 */
		public function block_assets() {

			$block_list_for_assets = self::$current_block_list;

			$blocks = UAGB_Config::get_block_attributes();

			foreach ( $block_list_for_assets as $key => $curr_block_name ) {

				$js_assets = ( isset( $blocks[ $curr_block_name ]['js_assets'] ) ) ? $blocks[ $curr_block_name ]['js_assets'] : array();

				$css_assets = ( isset( $blocks[ $curr_block_name ]['css_assets'] ) ) ? $blocks[ $curr_block_name ]['css_assets'] : array();

				foreach ( $js_assets as $asset_handle => $val ) {
					// Scripts.
					if ( 'uagb-faq-js' === $val ) {
						if ( self::$uag_faq_layout ) {
							wp_enqueue_script( 'uagb-faq-js' );
						}
					} else {
						wp_enqueue_script( $val );
					}
				}

				foreach ( $css_assets as $asset_handle => $val ) {
					// Styles.
					wp_enqueue_style( $val );
				}
			}

			if ( 'enabled' === self::$file_generation ) {
				$file_handler = self::$css_file_handler;

				if ( isset( $file_handler['css_url'] ) ) {
					wp_enqueue_style( 'uag-style', $file_handler['css_url'], array(), UAGB_VER, 'all' );
				} else {
					self::$fallback_css = true;
				}
				if ( isset( $file_handler['js_url'] ) ) {
					wp_enqueue_script( 'uag-script', $file_handler['js_url'], array(), UAGB_VER, true );
				} else {
					self::$fallback_js = true;
				}
			}

		}

		/**
		 * Print the Stylesheet in header.
		 */
		public function print_stylesheet() {

			$conditional_block_css = UAGB_Block_Helper::get_condition_block_css();

			ob_start();
			?>
			<style id="uagb-style-conditional-extension"><?php echo $conditional_block_css; //phpcs:ignore WordPress.XSS.EscapeOutput.OutputNotEscaped ?></style>
			<?php
			ob_end_flush();

			if ( 'enabled' === self::$file_generation && ! self::$fallback_css ) {
				return;
			}

			if ( is_null( self::$stylesheet ) || '' === self::$stylesheet ) {
				return;
			}

			ob_start();

			?>
			<style id="uagb-style-frontend"><?php echo self::$stylesheet; //phpcs:ignore WordPress.XSS.EscapeOutput.OutputNotEscaped ?></style>
			<?php
			ob_end_flush();

			$this->update_page_assets();
		}

		/**
		 * This function updates the Page assets in the Page Meta Key.
		 *
		 * @since x.x.x
		 */
		public function update_page_assets() {

			$post_id = get_the_ID();

			$meta_array = array(
				'css'                    => self::$stylesheet,
				'js'                     => self::$script,
				'current_block_list'     => self::$current_block_list,
				'uag_flag'               => self::$uag_flag,
				'table_of_contents_flag' => self::$table_of_contents_flag,
				'uag_version'            => UAGB_VER,
			);

			update_post_meta( $post_id, '_uagb_page_assets', $meta_array );
		}

		/**
		 * Defines all constants
		 *
		 * @since 1.0.0
		 */
		public function define_constants() {
			if ( ! defined( 'FS_CHMOD_FILE' ) ) {
				define( 'FS_CHMOD_FILE', ( fileperms( ABSPATH . 'index.php' ) & 0777 | 0644 ) );
			}
		}

		/**
		 * File Generation Flag
		 *
		 * @since 1.14.0
		 */
		public function file_generation() {

			if ( ! current_user_can( 'manage_options' ) ) {
				wp_send_json_error(
					array(
						'success' => false,
						'message' => __( 'Access Denied. You don\'t have enough capabilities to execute this action.', 'ultimate-addons-for-gutenberg' ),
					)
				);
			}

			check_ajax_referer( 'uagb-block-nonce', 'nonce' );

			if ( ! isset( $_POST['value'] ) ) {
				wp_send_json_error( __( 'Please check value.', 'ultimate-addons-for-gutenberg' ) );
			}

			$value = $_POST['value'];

			if ( 'disabled' === $value ) {
				$this->delete_upload_dir();
			}

			wp_send_json_success(
				array(
					'success' => true,
					'message' => update_option( '_uagb_allow_file_generation', $value ),
				)
			);
		}

		/**
		 * File Regeneration Flag
		 *
		 * @since x.x.x
		 */
		public function file_regeneration() {

			if ( ! current_user_can( 'manage_options' ) ) {
				wp_send_json_error(
					array(
						'success' => false,
						'message' => __( 'Access Denied. You don\'t have enough capabilities to execute this action.', 'ultimate-addons-for-gutenberg' ),
					)
				);
			}

			check_ajax_referer( 'uagb-block-nonce', 'nonce' );

			global $wpdb;
			$wpdb->delete( $wpdb->postmeta, array( 'meta_key' => '_uagb_page_assets' ) );

			$allow_file_generation = static::allow_file_generation();
			if ( 'enabled' === $allow_file_generation ) {
				$this->delete_upload_dir();
			}

			wp_send_json_success();
		}

		/**
		 * Deletes the upload dir.
		 *
		 * @since 1.18.0
		 * @return array
		 */
		public function delete_upload_dir() {

			$wp_info = wp_upload_dir( null, false );

			$dir_name = basename( UAGB_DIR );
			if ( 'ultimate-addons-for-gutenberg' === $dir_name ) {
				$dir_name = 'uag-plugin';
			}

			// Build the paths.
			$dir_info = array(
				'path' => trailingslashit( trailingslashit( $wp_info['basedir'] ) . $dir_name ),
			);

			// Check the upload dir if it doesn't exist or not.
			if ( file_exists( $dir_info['path'] . 'index.html' ) ) {
				// Remove the directory.
				$wp_filesystem = $this->get_filesystem();
				return $wp_filesystem->rmdir( $dir_info['path'], true );
			}
			return false;
		}

		/**
		 * Allow File Geranation flag.
		 *
		 * @since  1.14.0
		 */
		public static function allow_file_generation() {
			return get_option( '_uagb_allow_file_generation', 'disabled' );
		}

		/**
		 * Get an instance of WP_Filesystem_Direct.
		 *
		 * @since 1.14.4
		 * @return object A WP_Filesystem_Direct instance.
		 */
		public function get_filesystem() {
			global $wp_filesystem;

			require_once ABSPATH . '/wp-admin/includes/file.php';

			WP_Filesystem();

			return $wp_filesystem;
		}

		/**
		 * This is the action where we create dynamic asset files.
		 * CSS Path : uploads/uag-plugin/uag-style-{post_id}-{timestamp}.css
		 * JS Path : uploads/uag-plugin/uag-script-{post_id}-{timestamp}.js
		 *
		 * @since 1.15.0
		 */
		public function generate_asset_files() {

			if ( ! $this::allow_generate_assets() ) {
				return;
			}

			global $content_width;
			self::$stylesheet = str_replace( '#CONTENT_WIDTH#', $content_width . 'px', self::$stylesheet );
			if ( '' !== self::$script ) {
				self::$script = 'document.addEventListener("DOMContentLoaded", function(){( function( $ ) { ' . self::$script . ' })(jQuery)})';
			}

			if ( 'enabled' === self::$file_generation ) {
				self::file_write( self::$stylesheet, 'css' );
				self::file_write( self::$script, 'js' );

				$this->update_page_assets();
			}
		}

		/**
		 * This function determines wether to generate new assets or not.
		 *
		 * @since x.x.x
		 */
		public function allow_generate_assets() {

			$post_id = get_the_ID();

			$page_assets = get_post_meta( $post_id, '_uagb_page_assets', true );

			if ( isset( $page_assets ) && isset( $page_assets['uag_version'] ) && UAGB_VER !== $page_assets['uag_version'] ) {
				return true;
			}

			if ( 'disabled' === self::$file_generation ) {

				if ( isset( $page_assets ) && empty( $page_assets ) ) {

					return true;

				}
			} else {

				$post_timestamp_css = get_post_meta( $post_id, '_uag_css_style_name', true );
				$post_timestamp_js  = get_post_meta( $post_id, '_uag_js_script_name', true );

				$css_asset_info = array();
				$js_asset_info  = array();

				if ( ! empty( $post_timestamp_css ) ) {

					$css_asset_info = self::get_asset_info( 'css', $post_id );
					$css_file_path  = $css_asset_info['css'];
				}
				if ( ! empty( $post_timestamp_js ) ) {

					$js_asset_info = self::get_asset_info( 'js', $post_id );
					$js_file_path  = $js_asset_info['js'];
				}

				self::$css_file_handler = array_merge( $css_asset_info, $js_asset_info );

				if ( ( ! isset( $css_file_path ) || null === $css_file_path ) && ( ! isset( $js_file_path ) || null === $js_file_path ) ) {
					return true;
				}

				if ( ( isset( $css_file_path ) && null !== $css_file_path && ! file_exists( $css_file_path ) ) || ( isset( $js_file_path ) && null !== $js_file_path && ! file_exists( $js_file_path ) ) ) {

					return true;
				}
			}

			if ( isset( $page_assets ) && ! empty( $page_assets ) ) {

				self::$current_block_list     = $page_assets['current_block_list'];
				self::$uag_flag               = $page_assets['uag_flag'];
				self::$stylesheet             = $page_assets['css'];
				self::$script                 = $page_assets['js'];
				self::$table_of_contents_flag = $page_assets['table_of_contents_flag'];
			}

			return false;
		}

		/**
		 * This function deletes the Page assets from the Page Meta Key.
		 *
		 * @param int $post_id Post Id.
		 * @since x.x.x
		 */
		public function delete_page_assets( $post_id ) {

			if ( 'disabled' !== self::$file_generation ) {

				$css_asset_info = self::get_asset_info( 'css', $post_id );
				$js_asset_info  = self::get_asset_info( 'js', $post_id );

				$css_file_path = $css_asset_info['css'];
				$js_file_path  = $js_asset_info['js'];

				if ( file_exists( $css_file_path ) ) {
					wp_delete_file( $css_file_path );
				}
				if ( file_exists( $css_file_path ) ) {
					wp_delete_file( $js_file_path );
				}
			}

			delete_post_meta( $post_id, '_uagb_page_assets' );
			delete_post_meta( $post_id, '_uag_css_style_name' );
			delete_post_meta( $post_id, '_uag_js_script_name' );
		}

		/**
		 * Returns an array of paths for the CSS and JS assets
		 * of the current post.
		 *
		 * @param  var $type    Gets the CSS\JS type.
		 * @param  var $post_id Post ID.
		 * @since 1.14.0
		 * @return array
		 */
		public static function get_asset_info( $type, $post_id ) {

			$uploads_dir = self::get_upload_dir();
			$info        = array();

			switch ( $type ) {
				case 'css':
					$path            = get_post_meta( $post_id, '_uag_css_style_name', true );
					$info['css']     = $uploads_dir['path'] . $path;
					$info['css_url'] = $uploads_dir['url'] . $path;
					break;
				case 'js':
					$path           = get_post_meta( $post_id, '_uag_js_script_name', true );
					$info['js']     = $uploads_dir['path'] . $path;
					$info['js_url'] = $uploads_dir['url'] . $path;
					break;
				default:
					break;
			}

			return $info;
		}

		/**
		 * Returns an array of paths for the upload directory
		 * of the current site.
		 *
		 * @since 1.14.0
		 * @return array
		 */
		public static function get_upload_dir() {

			$wp_info = wp_upload_dir( null, false );

			// SSL workaround.
			if ( UAGB_Helper::is_ssl() ) {
				$wp_info['baseurl'] = str_ireplace( 'http://', 'https://', $wp_info['baseurl'] );
			}

			$dir_name = basename( UAGB_DIR );
			if ( 'ultimate-addons-for-gutenberg' === $dir_name ) {
				$dir_name = 'uag-plugin';
			}

			// Build the paths.
			$dir_info = array(
				'path' => trailingslashit( trailingslashit( $wp_info['basedir'] ) . $dir_name ),
				'url'  => trailingslashit( trailingslashit( $wp_info['baseurl'] ) . $dir_name ),
			);

			// Create the upload dir if it doesn't exist.
			if ( ! file_exists( $dir_info['path'] ) ) {
				// Create the directory.
				$wp_filesystem = self::get_instance()->get_filesystem();
				$wp_filesystem->mkdir( $dir_info['path'] );
				// Add an index file for security.
				$wp_filesystem->put_contents( $dir_info['path'] . 'index.html', '', FS_CHMOD_FILE );
			}

			return apply_filters( 'uag_get_upload_dir', $dir_info );
		}

		/**
		 * Creates css and js files.
		 *
		 * @param  var $style_data    Gets the CSS\JS for the current Page.
		 * @param  var $type    Gets the CSS\JS type.
		 * @since  1.14.0
		 */
		public static function file_write( $style_data, $type ) {

			$post_id = get_the_ID();
			if ( ! $post_id ) {
				return false;
			}

			switch ( $type ) {
				case 'css':
					$post_timestamp_path = get_post_meta( $post_id, '_uag_css_style_name', true );
					break;
				case 'js':
					$post_timestamp_path = get_post_meta( $post_id, '_uag_js_script_name', true );
					break;
				default:
					break;
			}

			$var           = ( 'css' === $type ) ? 'css' : 'js';
			$date          = new DateTime();
			$new_timestamp = $date->getTimestamp();
			$file_system   = self::get_instance()->get_filesystem();

			// Get timestamp - Already saved OR new one.
			$post_timestamp_path = ( '' === $post_timestamp_path || false === $post_timestamp_path ) ? '' : $post_timestamp_path;
			$assets_info         = self::get_asset_info( $type, $post_id );

			$relative_src_path = $assets_info[ $var ];

			if ( '' === $style_data ) {
				/**
				 * This is when the generated CSS/JS is blank.
				 * This means this page does not use UAG block.
				 * In this scenario we need to delete the existing file.
				 * This will ensure there are no extra files added for user.
				 */

				if ( file_exists( $relative_src_path ) ) {
					// Delete old file.
					wp_delete_file( $relative_src_path );
				}

				return true;
			}

			/**
			 * Timestamp present but file does not exists.
			 * This is the case where somehow the files are delete or not created in first place.
			 * Here we attempt to create them again.
			 */
			if ( ! $file_system->exists( $relative_src_path ) && '' !== $post_timestamp_path ) {

				$did_create = self::create_file( $style_data, $post_timestamp_path, $type, 'old' );

				if ( $did_create ) {
					self::$css_file_handler = array_merge( self::$css_file_handler, $assets_info );
				}

				return $did_create;
			}

			/**
			 * Need to create new assets.
			 * No such assets present for this current page.
			 */
			if ( '' === $post_timestamp_path ) {

				// Create a new file.
				$did_create = self::create_file( $style_data, $new_timestamp, $type, 'new' );

				if ( $did_create ) {
					$new_assets_info        = self::get_asset_info( $type, $post_id );
					self::$css_file_handler = array_merge( self::$css_file_handler, $new_assets_info );
				}

				return $did_create;

			}

			/**
			 * File already exists.
			 * Need to match the content.
			 * If new content is present we update the current assets.
			 */
			if ( file_exists( $relative_src_path ) ) {

				$old_data = $file_system->get_contents( $relative_src_path );

				if ( $old_data !== $style_data ) {

					// Delete old file.
					wp_delete_file( $relative_src_path );

					// Create a new file.
					$did_create = self::create_file( $style_data, $new_timestamp, $type, 'new' );

					if ( $did_create ) {
						$new_assets_info        = self::get_asset_info( $type, $post_id );
						self::$css_file_handler = array_merge( self::$css_file_handler, $new_assets_info );
					}

					return $did_create;
				}
			}

			self::$css_file_handler = array_merge( self::$css_file_handler, $assets_info );

			return true;
		}

		/**
		 * Creates a new file for Dynamic CSS/JS.
		 *
		 * @param  string $style_data The data that needs to be copied into the created file.
		 * @param  string $timestamp Current timestamp.
		 * @param  string $type Type of file - CSS/JS.
		 * @param  string $file_state Wether File is new or old.
		 * @since 1.15.0
		 * @return boolean true/false
		 */
		public static function create_file( $style_data, $timestamp, $type, $file_state ) {

			$post_id = get_the_ID();
			if ( ! $post_id ) {
				return false;
			}

			$uploads_dir = self::get_upload_dir();

			$file_system = self::get_instance()->get_filesystem();

			if ( 'css' === $type ) {

				$path = 'uag-style-' . $post_id . '-' . $timestamp . '.css';

				if ( 'old' === $file_state ) {

					$path = $timestamp;
				}

				// Create a new file.
				$result = $file_system->put_contents( $uploads_dir['path'] . $path, $style_data, FS_CHMOD_FILE );

				if ( $result ) {
					// Update meta with current timestamp.
					update_post_meta( $post_id, '_uag_css_style_name', $path );
				}
			} elseif ( 'js' === $type ) {

				$path = 'uag-script-' . $post_id . '-' . $timestamp . '.js';

				if ( 'old' === $file_state ) {

					$path = $timestamp;
				}

				// Create a new file.
				$result = $file_system->put_contents( $uploads_dir['path'] . $path, $style_data, FS_CHMOD_FILE );

				if ( $result ) {
					// Update meta with current timestamp.
					update_post_meta( $post_id, '_uag_js_script_name', $path );
				}
			}

			return $result;
		}

		/**
		 * Check if UAG upload folder has write permissions or not.
		 *
		 * @since  1.14.9
		 * @return bool true or false.
		 */
		public static function has_read_write_permissions() {

			$upload_dir = self::get_upload_dir();

			$file_created = self::get_instance()->get_filesystem()->put_contents( $upload_dir['path'] . 'index.html', '' );

			if ( ! $file_created ) {

				return false;
			}

			return true;
		}

		/**
		 * Generates stylesheet and appends in head tag.
		 *
		 * @since 0.0.1
		 */
		public function generate_assets() {

			if ( ! $this::allow_generate_assets() ) {
				return;
			}

			$this_post = array();

			if ( class_exists( 'WooCommerce' ) ) {

				if ( is_cart() ) {

					$id        = get_option( 'woocommerce_cart_page_id' );
					$this_post = get_post( $id );

				} elseif ( is_account_page() ) {

					$id        = get_option( 'woocommerce_myaccount_page_id' );
					$this_post = get_post( $id );

				} elseif ( is_checkout() ) {

					$id        = get_option( 'woocommerce_checkout_page_id' );
					$this_post = get_post( $id );

				} elseif ( is_checkout_pay_page() ) {

					$id        = get_option( 'woocommerce_pay_page_id' );
					$this_post = get_post( $id );

				} elseif ( is_shop() ) {

					$id        = get_option( 'woocommerce_shop_page_id' );
					$this_post = get_post( $id );
				}

				if ( is_object( $this_post ) ) {
					$this->get_generated_stylesheet( $this_post );
				}
			}

			if ( is_single() || is_page() || is_404() ) {

				global $post;
				$this_post = $post;

				if ( ! is_object( $this_post ) ) {
					return;
				}

				/**
				 * Filters the post to build stylesheet for.
				 *
				 * @param \WP_Post $this_post The global post.
				 */
				$this_post = apply_filters( 'uagb_post_for_stylesheet', $this_post );

				$this->get_generated_stylesheet( $this_post );

			} elseif ( is_archive() || is_home() || is_search() ) {

				global $wp_query;
				$cached_wp_query = $wp_query;

				foreach ( $cached_wp_query as $post ) { // phpcs:ignore WordPress.WP.GlobalVariablesOverride.Prohibited
					$this->get_generated_stylesheet( $post );
				}
			}
		}

		/**
		 * Generates stylesheet in loop.
		 *
		 * @param object $this_post Current Post Object.
		 * @since 1.7.0
		 */
		public function get_generated_stylesheet( $this_post ) {

			if ( ! is_object( $this_post ) ) {
				return;
			}

			if ( ! isset( $this_post->ID ) ) {
				return;
			}

			if ( has_blocks( $this_post->ID ) && isset( $this_post->post_content ) ) {

				$blocks            = $this->parse( $this_post->post_content );
				self::$page_blocks = $blocks;

				if ( ! is_array( $blocks ) || empty( $blocks ) ) {
					return;
				}

				$assets = $this->get_assets( $blocks );

				self::$stylesheet .= $assets['css'];
				self::$script     .= $assets['js'];
			}
		}

		/**
		 * Generates stylesheet for reusable blocks.
		 *
		 * @param array $blocks Blocks array.
		 * @since 1.1.0
		 */
		public function get_assets( $blocks ) {

			$desktop = '';
			$tablet  = '';
			$mobile  = '';

			$tab_styling_css = '';
			$mob_styling_css = '';

			$js = '';

			foreach ( $blocks as $i => $block ) {

				if ( is_array( $block ) ) {

					if ( '' === $block['blockName'] ) {
						continue;
					}

					if ( 'core/block' === $block['blockName'] ) {
						$id = ( isset( $block['attrs']['ref'] ) ) ? $block['attrs']['ref'] : 0;

						if ( $id ) {
							$content = get_post_field( 'post_content', $id );

							$reusable_blocks = $this->parse( $content );

							$assets = $this->get_assets( $reusable_blocks );

							self::$stylesheet .= $assets['css'];
							self::$script     .= $assets['js'];

						}
					} else {

						// Add your block specif css here.
						$block_assets = $this->get_block_css_and_js( $block );
						// Get CSS for the Block.
						$css = $block_assets['css'];

						if ( ! empty( $css['common'] ) ) {
							$desktop .= $css['common'];
						}

						if ( isset( $css['desktop'] ) ) {
							$desktop .= $css['desktop'];
							$tablet  .= $css['tablet'];
							$mobile  .= $css['mobile'];
						}
						$js .= $block_assets['js'];
					}
				}
			}

			if ( ! empty( $tablet ) ) {
				$tab_styling_css .= '@media only screen and (max-width: ' . UAGB_TABLET_BREAKPOINT . 'px) {';
				$tab_styling_css .= $tablet;
				$tab_styling_css .= '}';
			}

			if ( ! empty( $mobile ) ) {
				$mob_styling_css .= '@media only screen and (max-width: ' . UAGB_MOBILE_BREAKPOINT . 'px) {';
				$mob_styling_css .= $mobile;
				$mob_styling_css .= '}';
			}

			return array(
				'css' => $desktop . $tab_styling_css . $mob_styling_css,
				'js'  => $js,
			);
		}

		/**
		 * Parse Guten Block.
		 *
		 * @param string $content the content string.
		 * @since 1.1.0
		 */
		public function parse( $content ) {

			global $wp_version;

			return ( version_compare( $wp_version, '5', '>=' ) ) ? parse_blocks( $content ) : gutenberg_parse_blocks( $content );
		}

		/**
		 * Get Static CSS of Block.
		 *
		 * @param string $block_name Block Name.
		 *
		 * @return string Static CSS.
		 * @since x.x.x
		 */
		public static function get_block_static_css( $block_name ) {

			$css = '';

			$block_static_css_path = UAGB_DIR . 'assets/css/blocks/' . $block_name . '.css';

			if ( file_exists( $block_static_css_path ) ) {

				$file_system = self::get_instance()->get_filesystem();

				$css = $file_system->get_contents( $block_static_css_path );
			}

			self::$static_css_blocks[] = $block_name;

			return $css;
		}

		/**
		 * Generates CSS recurrsively.
		 *
		 * @param object $block The block object.
		 * @since 0.0.1
		 */
		public function get_block_css_and_js( $block ) {

			$block = (array) $block;

			$name     = $block['blockName'];
			$css      = array();
			$js       = '';
			$block_id = '';

			if ( ! isset( $name ) ) {
				return array(
					'css' => array(),
					'js'  => '',
				);
			}

			if ( isset( $block['attrs'] ) && is_array( $block['attrs'] ) ) {
				/**
				 * Filters the block attributes for CSS and JS generation.
				 *
				 * @param array  $block_attributes The block attributes to be filtered.
				 * @param string $name             The block name.
				 */
				$blockattr = apply_filters( 'uagb_block_attributes_for_css_and_js', $block['attrs'], $name );
				if ( isset( $blockattr['block_id'] ) ) {
					$block_id = $blockattr['block_id'];
				}
			}

			self::$current_block_list[] = $name;

			if ( strpos( $name, 'uagb/' ) !== false ) {
				self::$uag_flag = true;
			}

			// Add static css here.
			$block_css_arr = UAGB_Config::get_block_assets_css();

			if ( isset( $block_css_arr[ $name ] ) && ! in_array( $block_css_arr[ $name ]['name'], self::$static_css_blocks, true ) ) {
				$common_css = array(
					'common' => self::get_block_static_css( $block_css_arr[ $name ]['name'] ),
				);
				$css       += $common_css;
			}

			switch ( $name ) {
				case 'uagb/review':
					$css += UAGB_Block_Helper::get_review_css( $blockattr, $block_id );
					UAGB_Block_JS::blocks_review_gfont( $blockattr );
					break;

				case 'uagb/inline-notice':
					$css += UAGB_Block_Helper::get_inline_notice_css( $blockattr, $block_id );
					UAGB_Block_JS::blocks_inline_notice_gfont( $blockattr );
					$js .= UAGB_Block_JS::get_inline_notice_js( $blockattr, $block_id );
					break;

				case 'uagb/how-to':
					$css += UAGB_Block_Helper::get_how_to_css( $blockattr, $block_id );
					UAGB_Block_JS::blocks_how_to_gfont( $blockattr );
					break;

				case 'uagb/section':
					$css += UAGB_Block_Helper::get_section_css( $blockattr, $block_id );
					break;

				case 'uagb/advanced-heading':
					$css += UAGB_Block_Helper::get_adv_heading_css( $blockattr, $block_id );
					UAGB_Block_JS::blocks_advanced_heading_gfont( $blockattr );
					break;

				case 'uagb/info-box':
					$css += UAGB_Block_Helper::get_info_box_css( $blockattr, $block_id );
					UAGB_Block_JS::blocks_info_box_gfont( $blockattr );
					break;

				case 'uagb/buttons':
					$css += UAGB_Block_Helper::get_buttons_css( $blockattr, $block_id );
					UAGB_Block_JS::blocks_buttons_gfont( $blockattr );
					break;

				case 'uagb/buttons-child':
					$css += UAGB_Block_Helper::get_buttons_child_css( $blockattr, $block_id );
					break;

				case 'uagb/blockquote':
					$css += UAGB_Block_Helper::get_blockquote_css( $blockattr, $block_id );
					UAGB_Block_JS::blocks_blockquote_gfont( $blockattr );
					$js .= UAGB_Block_JS::get_blockquote_js( $blockattr, $block_id );
					break;

				case 'uagb/tabs':
					$css += UAGB_Block_Helper::get_tabs_css( $blockattr, $block_id );
					break;

				case 'uagb/testimonial':
					$css += UAGB_Block_Helper::get_testimonial_css( $blockattr, $block_id );
					UAGB_Block_JS::blocks_testimonial_gfont( $blockattr );
					$js .= UAGB_Block_JS::get_testimonial_js( $blockattr, $block_id );
					break;

				case 'uagb/team':
					$css += UAGB_Block_Helper::get_team_css( $blockattr, $block_id );
					UAGB_Block_JS::blocks_team_gfont( $blockattr );
					break;

				case 'uagb/social-share':
					$css += UAGB_Block_Helper::get_social_share_css( $blockattr, $block_id );
					$js  .= UAGB_Block_JS::get_social_share_js( $blockattr, $block_id );
					break;

				case 'uagb/social-share-child':
					$css += UAGB_Block_Helper::get_social_share_child_css( $blockattr, $block_id );
					break;

				case 'uagb/content-timeline':
					$css += UAGB_Block_Helper::get_content_timeline_css( $blockattr, $block_id );
					UAGB_Block_JS::blocks_content_timeline_gfont( $blockattr );
					break;

				case 'uagb/restaurant-menu':
					$css += UAGB_Block_Helper::get_restaurant_menu_css( $blockattr, $block_id );
					UAGB_Block_JS::blocks_restaurant_menu_gfont( $blockattr );
					break;

				case 'uagb/call-to-action':
					$css += UAGB_Block_Helper::get_call_to_action_css( $blockattr, $block_id );
					UAGB_Block_JS::blocks_call_to_action_gfont( $blockattr );
					break;

				case 'uagb/post-timeline':
					$css += UAGB_Block_Helper::get_post_timeline_css( $blockattr, $block_id );
					UAGB_Block_JS::blocks_post_timeline_gfont( $blockattr );
					break;

				case 'uagb/icon-list':
					$css += UAGB_Block_Helper::get_icon_list_css( $blockattr, $block_id );
					// We have used the same buttons gfont function because the inputs to these functions are same.
					// If need be please add a new function for Info Box and go ahead.
					UAGB_Block_JS::blocks_buttons_gfont( $blockattr );
					break;

				case 'uagb/icon-list-child':
					$css += UAGB_Block_Helper::get_icon_list_child_css( $blockattr, $block_id );
					break;

				case 'uagb/post-grid':
					$css += UAGB_Block_Helper::get_post_grid_css( $blockattr, $block_id );
					UAGB_Block_JS::blocks_post_gfont( $blockattr );
					break;

				case 'uagb/post-carousel':
					$css += UAGB_Block_Helper::get_post_carousel_css( $blockattr, $block_id );
					UAGB_Block_JS::blocks_post_gfont( $blockattr );
					break;

				case 'uagb/post-masonry':
					$css += UAGB_Block_Helper::get_post_masonry_css( $blockattr, $block_id );
					UAGB_Block_JS::blocks_post_gfont( $blockattr );
					break;

				case 'uagb/columns':
					$css += UAGB_Block_Helper::get_columns_css( $blockattr, $block_id );
					break;

				case 'uagb/column':
					$css += UAGB_Block_Helper::get_column_css( $blockattr, $block_id );
					break;

				case 'uagb/cf7-styler':
					$css += UAGB_Block_Helper::get_cf7_styler_css( $blockattr, $block_id );
					UAGB_Block_JS::blocks_cf7_styler_gfont( $blockattr );
					break;

				case 'uagb/marketing-button':
					$css += UAGB_Block_Helper::get_marketing_btn_css( $blockattr, $block_id );
					UAGB_Block_JS::blocks_marketing_btn_gfont( $blockattr );
					break;

				case 'uagb/gf-styler':
					$css += UAGB_Block_Helper::get_gf_styler_css( $blockattr, $block_id );
					UAGB_Block_JS::blocks_gf_styler_gfont( $blockattr );
					break;

				case 'uagb/table-of-contents':
					$css += UAGB_Block_Helper::get_table_of_contents_css( $blockattr, $block_id );
					UAGB_Block_JS::blocks_table_of_contents_gfont( $blockattr );
					$js                          .= UAGB_Block_JS::get_table_of_contents_js( $blockattr, $block_id );
					self::$table_of_contents_flag = true;
					break;

				case 'uagb/faq':
					$css += UAGB_Block_Helper::get_faq_css( $blockattr, $block_id );
					if ( ! isset( $blockattr['layout'] ) ) {
						self::$uag_faq_layout = true;
					}
					UAGB_Block_JS::blocks_faq_gfont( $blockattr );
					break;

				case 'uagb/wp-search':
					$css += UAGB_Block_Helper::get_wp_search_css( $blockattr, $block_id );
					UAGB_Block_JS::blocks_wp_search_gfont( $blockattr );
					break;

				case 'uagb/forms':
					$css += UAGB_Block_Helper::get_forms_css( $blockattr, $block_id );
					$js  .= UAGB_Block_JS::get_forms_js( $blockattr, $block_id );
					UAGB_Block_JS::blocks_forms_gfont( $blockattr );
					break;

				case 'uagb/taxonomy-list':
					$css += UAGB_Block_Helper::get_taxonomy_list_css( $blockattr, $block_id );
					UAGB_Block_JS::blocks_taxonomy_list_gfont( $blockattr );
					break;

				case 'uagb/lottie':
					$css += UAGB_Block_Helper::get_lottie_css( $blockattr, $block_id );
					$js  .= UAGB_Block_JS::get_lottie_js( $blockattr, $block_id );
					break;

				default:
					// Nothing to do here.
					break;
			}

			if ( isset( $block['innerBlocks'] ) ) {
				foreach ( $block['innerBlocks'] as $j => $inner_block ) {
					if ( 'core/block' === $inner_block['blockName'] ) {
						$id = ( isset( $inner_block['attrs']['ref'] ) ) ? $inner_block['attrs']['ref'] : 0;

						if ( $id ) {
							$content = get_post_field( 'post_content', $id );

							$reusable_blocks = $this->parse( $content );

							$assets = $this->get_assets( $reusable_blocks );

							self::$stylesheet .= $assets['css'];
							self::$script     .= $assets['js'];
						}
					} else {
						// Get CSS for the Block.
						$inner_assets    = $this->get_block_css_and_js( $inner_block );
						$inner_block_css = $inner_assets['css'];

						$css_common  = ( isset( $css['common'] ) ? $css['common'] : '' );
						$css_desktop = ( isset( $css['desktop'] ) ? $css['desktop'] : '' );
						$css_tablet  = ( isset( $css['tablet'] ) ? $css['tablet'] : '' );
						$css_mobile  = ( isset( $css['mobile'] ) ? $css['mobile'] : '' );

						if ( isset( $inner_block_css['common'] ) ) {
							$css['common'] = $css_common . $inner_block_css['common'];
						}

						if ( isset( $inner_block_css['desktop'] ) ) {
							$css['desktop'] = $css_desktop . $inner_block_css['desktop'];
							$css['tablet']  = $css_tablet . $inner_block_css['tablet'];
							$css['mobile']  = $css_mobile . $inner_block_css['mobile'];
						}

						$js .= $inner_assets['js'];
					}
				}
			}

			self::$current_block_list = array_unique( self::$current_block_list );

			return array(
				'css' => $css,
				'js'  => $js,
			);

		}

	}

	/**
	 *  Prepare if class 'UAGB_File_Generation' exist.
	 *  Kicking this off by calling 'get_instance()' method
	 */
	UAGB_File_Generation::get_instance();
}
