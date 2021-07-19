<?php
/**
 * UAGB Admin.
 *
 * @package UAGB
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

if ( ! class_exists( 'UAGB_Admin' ) ) {

	/**
	 * Class UAGB_Admin.
	 */
	final class UAGB_Admin {

		/**
		 * Calls on initialization
		 *
		 * @since 0.0.1
		 */
		public static function init() {

			if ( ! is_admin() ) {
				return;
			}

			self::initialize_ajax();

			// Add UAGB menu option to admin.
			add_action( 'network_admin_menu', __CLASS__ . '::menu' );

			add_action( 'admin_menu', __CLASS__ . '::menu' );

			add_action( 'uagb_render_admin_content', __CLASS__ . '::render_content' );

			add_action( 'admin_init', __CLASS__ . '::register_notices' );

			add_filter( 'wp_kses_allowed_html', __CLASS__ . '::add_data_attributes', 10, 2 );

			add_action( 'admin_enqueue_scripts', __CLASS__ . '::notice_styles_scripts' );

			add_action( 'wp_ajax_uag-theme-activate', __CLASS__ . '::theme_activate' );

			add_action( 'wp_ajax_uagb_file_generation', __CLASS__ . '::file_generation' );

			add_action( 'wp_ajax_uagb_file_regeneration', __CLASS__ . '::file_regeneration' );

			add_action( 'wp_ajax_uagb_beta_updates', __CLASS__ . '::uagb_beta_updates' );

			// Enqueue admin scripts.
			if ( isset( $_GET['page'] ) && ( UAGB_SLUG === $_GET['page'] || 'uag-tools' === $_GET['page'] ) ) { // phpcs:ignore WordPress.Security.NonceVerification.Recommended
				add_action( 'admin_enqueue_scripts', __CLASS__ . '::styles_scripts' );

				self::save_settings();
			}

			add_filter( 'rank_math/researches/toc_plugins', __CLASS__ . '::toc_plugin' );
			// Activation hook.
			add_action( 'admin_init', __CLASS__ . '::activation_redirect' );

			add_action( 'admin_post_uag_rollback', array( __CLASS__, 'post_uagb_rollback' ) );

			add_action( 'admin_footer', array( __CLASS__, 'rollback_version_popup' ) );

			if ( ! is_customize_preview() ) {
				add_action( 'admin_head', array( __CLASS__, 'admin_submenu_css' ) );
			}
		}

		/**
		 * Activation Reset
		 */
		public static function activation_redirect() {
			$do_redirect = apply_filters( 'uagb_enable_redirect_activation', get_option( '__uagb_do_redirect' ) );
			if ( $do_redirect ) {
				update_option( '__uagb_do_redirect', false );
				if ( ! is_multisite() ) {
					wp_safe_redirect( esc_url( admin_url( 'options-general.php?page=' . UAGB_SLUG ) ) );
					exit();
				}
			}
		}

		/**
		 * Filters and Returns a list of allowed tags and attributes for a given context.
		 *
		 * @param Array  $allowedposttags Array of allowed tags.
		 * @param String $context Context type (explicit).
		 * @since 1.8.0
		 * @return Array
		 */
		public static function add_data_attributes( $allowedposttags, $context ) {
			$allowedposttags['a']['data-repeat-notice-after'] = true;

			return $allowedposttags;
		}

		/**
		 * Ask Plugin Rating
		 *
		 * @since 1.8.0
		 */
		public static function register_notices() {

			if ( ! current_user_can( 'manage_options' ) ) {
				return;
			}

			$image_path = UAGB_URL . 'admin/assets/images/uagb_notice.svg';

			Astra_Notices::add_notice(
				array(
					'id'                         => 'uagb-admin-rating',
					'type'                       => '',
					'message'                    => sprintf(
						'<div class="notice-image">
							<img src="%1$s" class="custom-logo" alt="Ultimate Addons for Gutenberg" itemprop="logo"></div>
							<div class="notice-content">
								<div class="notice-heading">
									%2$s
								</div>
								%3$s<br />
								<div class="uagb-review-notice-container">
									<a href="%4$s" class="astra-notice-close uagb-review-notice button-primary" target="_blank">
									%5$s
									</a>
								<span class="dashicons dashicons-calendar"></span>
									<a href="#" data-repeat-notice-after="%6$s" class="astra-notice-close uagb-review-notice">
									%7$s
									</a>
								<span class="dashicons dashicons-smiley"></span>
									<a href="#" class="astra-notice-close uagb-review-notice">
									%8$s
									</a>
								</div>
							</div>',
						$image_path,
						__( 'Wow! The Ultimate Addons for Gutenberg has already powered over 5 pages on your website!', 'ultimate-addons-for-gutenberg' ),
						__( 'Would you please mind sharing your views and give it a 5 star rating on the WordPress repository?', 'ultimate-addons-for-gutenberg' ),
						'https://wordpress.org/support/plugin/ultimate-addons-for-gutenberg/reviews/?filter=5#new-post',
						__( 'Ok, you deserve it', 'ultimate-addons-for-gutenberg' ),
						MONTH_IN_SECONDS,
						__( 'Nope, maybe later', 'ultimate-addons-for-gutenberg' ),
						__( 'I already did', 'ultimate-addons-for-gutenberg' )
					),
					'repeat-notice-after'        => MONTH_IN_SECONDS,
					'display-notice-after'       => WEEK_IN_SECONDS,
					'priority'                   => 20,
					'display-with-other-notices' => false,
					'show_if'                    => UAGB_Admin_Helper::show_rating_notice(),
				)
			);

			if ( class_exists( 'Classic_Editor' ) ) {
				$editor_option = get_option( 'classic-editor-replace' );
				if ( isset( $editor_option ) && 'block' !== $editor_option ) {
					Astra_Notices::add_notice(
						array(
							'id'                         => 'uagb-classic-editor',
							'type'                       => 'warning',
							'message'                    => sprintf(
								/* translators: %s: html tags */
								__( 'Ultimate Addons for Gutenberg requires&nbsp;%3$sBlock Editor%4$s. You can change your editor settings to Block Editor from&nbsp;%1$shere%2$s. Plugin is currently NOT RUNNING.', 'ultimate-addons-for-gutenberg' ),
								'<a href="' . admin_url( 'options-writing.php' ) . '">',
								'</a>',
								'<strong>',
								'</strong>'
							),
							'priority'                   => 20,
							'display-with-other-notices' => true,
						)
					);
				}
			}
		}

		/**
		 * Renders the admin settings menu.
		 *
		 * @since 0.0.1
		 * @return void
		 */
		public static function menu() {

			if ( ! current_user_can( 'manage_options' ) ) {
				return;
			}

			add_submenu_page(
				'options-general.php',
				UAGB_PLUGIN_SHORT_NAME,
				UAGB_PLUGIN_SHORT_NAME,
				'manage_options',
				UAGB_SLUG,
				__CLASS__ . '::render',
				10
			);

			add_submenu_page(
				'options-general.php',
				__( 'Tools', 'ultimate-addons-for-gutenberg' ),
				__( 'Tools', 'ultimate-addons-for-gutenberg' ),
				'manage_options',
				'uag-tools',
				__CLASS__ . '::render',
				11
			);
		}

		/**
		 * Renders the admin settings.
		 *
		 * @since 0.0.1
		 * @return void
		 */
		public static function render() {
			$action = ( isset( $_GET['action'] ) ) ? sanitize_text_field( $_GET['action'] ) : ''; // phpcs:ignore WordPress.Security.NonceVerification.Recommended
			$action = ( ! empty( $action ) && '' !== $action ) ? $action : 'general';
			$action = str_replace( '_', '-', $action );

			// Enable header icon filter below.
			$uagb_icon                 = apply_filters( 'uagb_header_top_icon', true );
			$uagb_visit_site_url       = apply_filters( 'uagb_site_url', 'https://www.ultimategutenberg.com/?utm_source=uag-dashboard&utm_medium=link&utm_campaign=uag-dashboard' );
			$uagb_header_wrapper_class = apply_filters( 'uagb_header_wrapper_class', array( $action ) );

			include_once UAGB_DIR . 'admin/uagb-admin.php';
		}

		/**
		 * Renders the admin settings content.
		 *
		 * @since 0.0.1
		 * @return void
		 */
		public static function render_content() {

			if ( ! current_user_can( 'manage_options' ) ) {
				return;
			}

			$action = ( isset( $_GET['action'] ) ) ? sanitize_text_field( $_GET['action'] ) : ''; // phpcs:ignore WordPress.Security.NonceVerification.Recommended

			if ( isset( $_GET['page'] ) && 'uag-tools' === $_GET['page'] ) { // phpcs:ignore WordPress.Security.NonceVerification.Recommended
				$action = 'tools';
			}

			$action = ( ! empty( $action ) && '' !== $action ) ? $action : 'general';
			$action = str_replace( '_', '-', $action );

			$uagb_header_wrapper_class = apply_filters( 'uagb_header_wrapper_class', array( $action ) );

			$base_path = realpath( UAGB_DIR . '/admin' );
			$path      = realpath( $base_path . '/uagb-' . $action . '.php' );
			if ( $path && $base_path && strpos( $path, $base_path ) === 0 ) {
				include_once $path;
			}
		}

		/**
		 * Enqueues the needed CSS/JS for the builder's admin settings page.
		 *
		 * @since 1.8.0
		 */
		public static function notice_styles_scripts() {
			// Styles.
			wp_enqueue_style( 'uagb-notice-settings', UAGB_URL . 'admin/assets/admin-notice.css', array(), UAGB_VER );
		}

		/**
		 * Enqueues the needed CSS/JS for the builder's admin settings page.
		 *
		 * @since 1.0.0
		 */
		public static function styles_scripts() {

			if ( ! current_user_can( 'manage_options' ) ) {
				return;
			}

			// Styles.
			wp_enqueue_style( 'uagb-admin-settings', UAGB_URL . 'admin/assets/admin-menu-settings.css', array(), UAGB_VER, 'all' );
			// Script.
			wp_enqueue_script( 'uagb-admin-settings', UAGB_URL . 'admin/assets/admin-menu-settings.js', array( 'jquery', 'wp-util', 'updates' ), UAGB_VER, true );

			$localize = array(
				'ajax_url'        => admin_url( 'admin-ajax.php' ),
				'ajax_nonce'      => wp_create_nonce( 'uagb-block-nonce' ),
				'activate'        => __( 'Activate', 'ultimate-addons-for-gutenberg' ),
				'deactivate'      => __( 'Deactivate', 'ultimate-addons-for-gutenberg' ),
				'enable_beta'     => __( 'Enable Beta Updates', 'ultimate-addons-for-gutenberg' ),
				'disable_beta'    => __( 'Disable Beta Updates', 'ultimate-addons-for-gutenberg' ),
				'installing_text' => __( 'Installing Astra', 'ultimate-addons-for-gutenberg' ),
				'activating_text' => __( 'Activating Astra', 'ultimate-addons-for-gutenberg' ),
				'activated_text'  => __( 'Astra Activated!', 'ultimate-addons-for-gutenberg' ),
			);

			wp_localize_script( 'uagb-admin-settings', 'uagb', apply_filters( 'uagb_js_localize', $localize ) );
		}

		/**
		 * Save All admin settings here
		 */
		public static function save_settings() {

			// Only admins can save settings.
			if ( ! current_user_can( 'manage_options' ) ) {
				return;
			}

			// Let extensions hook into saving.
			do_action( 'uagb_admin_settings_save' );
		}

		/**
		 * Initialize Ajax
		 */
		public static function initialize_ajax() {

			if ( ! current_user_can( 'manage_options' ) ) {
				return;
			}
			// Ajax requests.
			add_action( 'wp_ajax_uagb_activate_widget', __CLASS__ . '::activate_widget' );
			add_action( 'wp_ajax_uagb_deactivate_widget', __CLASS__ . '::deactivate_widget' );

			add_action( 'wp_ajax_uagb_bulk_activate_widgets', __CLASS__ . '::bulk_activate_widgets' );
			add_action( 'wp_ajax_uagb_bulk_deactivate_widgets', __CLASS__ . '::bulk_deactivate_widgets' );

			add_action( 'wp_ajax_uagb_allow_beta_updates', __CLASS__ . '::allow_beta_updates' );
		}

		/**
		 * Activate module
		 */
		public static function activate_widget() {

			check_ajax_referer( 'uagb-block-nonce', 'nonce' );

			$block_id = sanitize_text_field( $_POST['block_id'] );

			$blocks = UAGB_Admin_Helper::get_admin_settings_option( '_uagb_blocks', array() );

			$blocks[ $block_id ] = $block_id;

			$blocks = array_map( 'esc_attr', $blocks );

			if ( 'how-to' === $block_id && 'disabled' === $blocks['info-box'] ) {
				$blocks['info-box'] = 'info-box';
				$blocks             = array_map( 'esc_attr', $blocks );
			}

			// Update blocks.
			UAGB_Admin_Helper::update_admin_settings_option( '_uagb_blocks', $blocks );
			UAGB_Admin_Helper::create_specific_stylesheet();

			wp_send_json_success();
		}

		/**
		 * Deactivate module
		 */
		public static function deactivate_widget() {

			check_ajax_referer( 'uagb-block-nonce', 'nonce' );

			$block_id            = sanitize_text_field( $_POST['block_id'] );
			$blocks              = UAGB_Admin_Helper::get_admin_settings_option( '_uagb_blocks', array() );
			$blocks[ $block_id ] = 'disabled';
			$blocks              = array_map( 'esc_attr', $blocks );

			if ( 'info-box' === $block_id && 'how-to' === $blocks['how-to'] ) {
				wp_send_json_error();
			}

			// Update blocks.
			UAGB_Admin_Helper::update_admin_settings_option( '_uagb_blocks', $blocks );
			UAGB_Admin_Helper::create_specific_stylesheet();

			wp_send_json_success();
		}

		/**
		 * Activate all module
		 */
		public static function bulk_activate_widgets() {

			check_ajax_referer( 'uagb-block-nonce', 'nonce' );

			// Get all widgets.
			$all_blocks = UAGB_Helper::$block_list;
			$new_blocks = array();

			// Set all extension to enabled.
			foreach ( $all_blocks as $slug => $value ) {
				$_slug                = str_replace( 'uagb/', '', $slug );
				$new_blocks[ $_slug ] = $_slug;
			}

			// Escape attrs.
			$new_blocks = array_map( 'esc_attr', $new_blocks );

			// Update new_extensions.
			UAGB_Admin_Helper::update_admin_settings_option( '_uagb_blocks', $new_blocks );
			UAGB_Admin_Helper::create_specific_stylesheet();

			wp_send_json_success();
		}

		/**
		 * Deactivate all module
		 */
		public static function bulk_deactivate_widgets() {

			check_ajax_referer( 'uagb-block-nonce', 'nonce' );

			// Get all extensions.
			$old_blocks = UAGB_Helper::$block_list;
			$new_blocks = array();

			// Set all extension to enabled.
			foreach ( $old_blocks as $slug => $value ) {
				$_slug                = str_replace( 'uagb/', '', $slug );
				$new_blocks[ $_slug ] = 'disabled';
			}

			// Escape attrs.
			$new_blocks = array_map( 'esc_attr', $new_blocks );

			// Update new_extensions.
			UAGB_Admin_Helper::update_admin_settings_option( '_uagb_blocks', $new_blocks );
			UAGB_Admin_Helper::create_specific_stylesheet();

			wp_send_json_success();
		}

		/**
		 * Allow beta updates
		 */
		public static function allow_beta_updates() {

			check_ajax_referer( 'uagb-block-nonce', 'nonce' );

			$beta_update = sanitize_text_field( $_POST['allow_beta'] );

			// Update new_extensions.
			UAGB_Admin_Helper::update_admin_settings_option( '_uagb_beta', $beta_update );

			wp_send_json_success();
		}
		/**
		 * Update the Beta updates flag.
		 *
		 * @since 1.23.0
		 */
		public static function uagb_beta_updates() {

			if ( ! current_user_can( 'install_plugins' ) ) {
				wp_send_json_error(
					array(
						'success' => false,
						'message' => __( 'Access Denied. You don\'t have enough capabilities to execute this action.', 'ultimate-addons-for-gutenberg' ),
					)
				);
			}

			check_ajax_referer( 'uagb-block-nonce', 'nonce' );

			wp_send_json_success(
				array(
					'success' => true,
					'message' => update_option( 'uagb_beta', sanitize_text_field( $_POST['value'] ) ),
				)
			);
		}
		/**
		 * File Generation Flag
		 *
		 * @since 1.14.0
		 */
		public static function file_generation() {

			if ( ! current_user_can( 'manage_options' ) ) {
				wp_send_json_error(
					array(
						'success' => false,
						'message' => __( 'Access Denied. You don\'t have enough capabilities to execute this action.', 'ultimate-addons-for-gutenberg' ),
					)
				);
			}

			check_ajax_referer( 'uagb-block-nonce', 'nonce' );

			if ( 'disabled' === $_POST['value'] ) {
				UAGB_Helper::delete_all_uag_dir_files();
			}

			wp_send_json_success(
				array(
					'success' => true,
					'message' => update_option( '_uagb_allow_file_generation', sanitize_text_field( $_POST['value'] ) ),
				)
			);
		}

		/**
		 * File Regeneration Flag
		 *
		 * @since 1.23.0
		 */
		public static function file_regeneration() {

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

			$file_generation = UAGB_Helper::allow_file_generation();

			if ( 'enabled' === $file_generation ) {

				UAGB_Helper::delete_all_uag_dir_files();
			}

			/* Update the asset version */
			update_option( '__uagb_asset_version', time() );

			wp_send_json_success(
				array(
					'success' => true,
				)
			);
		}
		/**
		 * Required Plugin Activate
		 *
		 * @since 1.8.2
		 */
		public static function theme_activate() {

			check_ajax_referer( 'uagb-block-nonce', 'nonce' );

			$theme_slug = ( isset( $_POST['slug'] ) ) ? sanitize_text_field( $_POST['slug'] ) : '';

			if ( ! current_user_can( 'switch_themes' ) || ! $theme_slug ) {
				wp_send_json_error(
					array(
						'success' => false,
						'message' => __( 'No Theme specified', 'ultimate-addons-for-gutenberg' ),
					)
				);
			}

			$activate = switch_theme( $theme_slug );

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
					'success' => true,
					'message' => __( 'Theme Successfully Activated', 'ultimate-addons-for-gutenberg' ),
				)
			);
		}

		/**
		 * Rank Math SEO filter to add kb-elementor to the TOC list.
		 *
		 * @param array $plugins TOC plugins.
		 */
		public static function toc_plugin( $plugins ) {
			$plugins['ultimate-addons-for-gutenberg/ultimate-addons-for-gutenberg.php'] = 'Ultimate Addons for Gutenberg';
			return $plugins;
		}

		/**
		 * UAG version rollback.
		 *
		 * Rollback to previous UAG version.
		 *
		 * Fired by `admin_post_uag_rollback` action.
		 *
		 * @since 1.23.0
		 * @access public
		 */
		public static function post_uagb_rollback() {

			if ( ! current_user_can( 'install_plugins' ) ) {
				wp_die(
					esc_html__( 'You do not have permission to access this page.', 'ultimate-addons-for-gutenberg' ),
					esc_html__( 'Rollback to Previous Version', 'ultimate-addons-for-gutenberg' ),
					array(
						'response' => 200,
					)
				);
			}

			check_admin_referer( 'uag_rollback' );

			$rollback_versions = UAGB_Admin_Helper::get_instance()->get_rollback_versions();
			$update_version    = sanitize_text_field( $_GET['version'] );

			if ( empty( $update_version ) || ! in_array( $update_version, $rollback_versions ) ) { //phpcs:ignore WordPress.PHP.StrictInArray.MissingTrueStrict
				wp_die( esc_html__( 'Error occurred, The version selected is invalid. Try selecting different version.', 'ultimate-addons-for-gutenberg' ) );
			}

			$plugin_slug = basename( UAGB_FILE, '.php' );

			$rollback = new UAGB_Rollback(
				array(
					'version'     => $update_version,
					'plugin_name' => UAGB_BASE,
					'plugin_slug' => $plugin_slug,
					'package_url' => sprintf( 'https://downloads.wordpress.org/plugin/%s.%s.zip', $plugin_slug, $update_version ),
				)
			);

			$rollback->run();

			wp_die(
				'',
				esc_html__( 'Rollback to Previous Version', 'ultimate-addons-for-gutenberg' ),
				array(
					'response' => 200,
				)
			);
		}
		/**
		 * UAG version rollback popup.
		 *
		 * Rollback to previous UAG version Popup.
		 *
		 * Fired by `admin_post_uag_rollback` action.
		 *
		 * @since 1.23.0
		 * @access public
		 */
		public static function rollback_version_popup() {

			$current_screen = get_current_screen();

			if ( $current_screen && 'settings_page_uag-tools' !== $current_screen->id ) {
				return;
			}

			?>
			<div class="uagb-confirm-rollback-popup">
				<div class="uagb-confirm-rollback-popup-content">
					<div class="uagb-confirm-rollback-popup-header">Rollback to Previous Version</div>
					<div class="uagb-confirm-rollback-popup-message">Are you sure you want to reinstall previous version?</div>
					<div class="uagb-confirm-rollback-popup-buttons-wrapper">
						<button class="uagb-confirm-rollback-popup-button confirm-cancel">Cancel</button>
						<button class="uagb-confirm-rollback-popup-button confirm-ok">Continue</button>
					</div>
				</div>
			</div>
			<?php
		}
		/**
		 * Renders Admin Submenu CSS.
		 *
		 * @since 1.23.0
		 * @return void
		 */
		public static function admin_submenu_css() {
			echo '<style class="uag-menu-appearance-style">
				#adminmenu a[href="options-general.php?page=uag-tools"]:before {
					content: "\21B3";
					margin-right: 0.5em;
					opacity: 0.5;
				}
			</style>';
		}
	}

	UAGB_Admin::init();
}
