<?php
/**
 * UAGB Blocks Initializer
 *
 * Enqueue CSS/JS of all the blocks.
 *
 * @since   1.0.0
 * @package UAGB
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * UAGB_Init_Blocks.
 *
 * @package UAGB
 */
class UAGB_Init_Blocks {


	/**
	 * Member Variable
	 *
	 * @var instance
	 */
	private static $instance;

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

		// Hook: Editor assets.
		add_action( 'enqueue_block_editor_assets', array( $this, 'editor_assets' ) );

		if ( version_compare( get_bloginfo( 'version' ), '5.8', '>=' ) ) {
			add_filter( 'block_categories_all', array( $this, 'register_block_category' ), 10, 2 );
		} else {
			add_filter( 'block_categories', array( $this, 'register_block_category' ), 10, 2 );
		}

		add_action( 'wp_ajax_uagb_gf_shortcode', array( $this, 'gf_shortcode' ) );
		add_action( 'wp_ajax_nopriv_uagb_gf_shortcode', array( $this, 'gf_shortcode' ) );

		add_action( 'wp_ajax_uagb_cf7_shortcode', array( $this, 'cf7_shortcode' ) );
		add_action( 'wp_ajax_nopriv_uagb_cf7_shortcode', array( $this, 'cf7_shortcode' ) );

		if ( ! is_admin() ) {
			add_action( 'render_block', array( $this, 'render_block' ), 5, 2 );
		}
	}
	/**
	 * Render block.
	 *
	 * @param mixed $block_content The block content.
	 * @param array $block The block data.
	 * @since 1.21.0
	 * @return mixed Returns the new block content.
	 */
	public function render_block( $block_content, $block ) {

		$block_attributes = $block['attrs'];

		if ( isset( $block_attributes['UAGDisplayConditions'] ) && array_key_exists( 'UAGDisplayConditions', $block_attributes ) ) {

			switch ( $block_attributes['UAGDisplayConditions'] ) {

				case 'userstate':
					$block_content = $this->user_state_visibility( $block_attributes, $block_content );
					break;

				case 'userRole':
					$block_content = $this->user_role_visibility( $block_attributes, $block_content );
					break;

				case 'browser':
					$block_content = $this->browser_visibility( $block_attributes, $block_content );
					break;

				case 'os':
					$block_content = $this->os_visibility( $block_attributes, $block_content );
					break;

				default:
					// code...
					break;
			}
		}
		return $block_content;
	}
	/**
	 * User State Visibility.
	 *
	 * @param array $block_attributes The block data.
	 * @param mixed $block_content The block content.
	 *
	 * @since 1.21.0
	 * @return mixed Returns the new block content.
	 */
	public function user_role_visibility( $block_attributes, $block_content ) {

		$user = wp_get_current_user();

		if ( isset( $block_attributes['UAGUserRole'] ) && array_key_exists( 'UAGUserRole', $block_attributes ) ) {

			$value = $block_attributes['UAGUserRole'];

			if ( is_user_logged_in() && in_array( $value, $user->roles, true ) ) {
				return '';
			}
		}
		return $block_content;
	}
	/**
	 * User State Visibility.
	 *
	 * @param array $block_attributes The block data.
	 * @param mixed $block_content The block content.
	 * @since 1.21.0
	 * @return mixed Returns the new block content.
	 */
	public function os_visibility( $block_attributes, $block_content ) {

		if ( ! array_key_exists( 'UAGSystem', $block_attributes ) ) {
			return $block_content;
		}

		$value = $block_attributes['UAGSystem'];

		$os = array(
			'iphone'   => '(iPhone)',
			'android'  => '(Android)',
			'windows'  => 'Win16|(Windows 95)|(Win95)|(Windows_95)|(Windows 98)|(Win98)|(Windows NT 5.0)|(Windows 2000)|(Windows NT 5.1)|(Windows XP)|(Windows NT 5.2)|(Windows NT 6.0)|(Windows Vista)|(Windows NT 6.1)|(Windows 7)|(Windows NT 4.0)|(WinNT4.0)|(WinNT)|(Windows NT)|Windows ME',
			'open_bsd' => 'OpenBSD',
			'sun_os'   => 'SunOS',
			'linux'    => '(Linux)|(X11)',
			'mac_os'   => '(Mac_PowerPC)|(Macintosh)',
		);

		if ( preg_match( '@' . $os[ $value ] . '@', $_SERVER['HTTP_USER_AGENT'] ) ) {
			return '';
		}

		return $block_content;
	}
	/**
	 * User State Visibility.
	 *
	 * @param array $block_attributes The block data.
	 * @param mixed $block_content The block content.
	 *
	 * @since 1.21.0
	 * @return mixed Returns the new block content.
	 */
	public function browser_visibility( $block_attributes, $block_content ) {

		if ( ! array_key_exists( 'UAGBrowser', $block_attributes ) ) {
			return $block_content;
		}

		$browsers = array(
			'ie'         => array(
				'MSIE',
				'Trident',
			),
			'firefox'    => 'Firefox',
			'chrome'     => 'Chrome',
			'opera_mini' => 'Opera Mini',
			'opera'      => 'Opera',
			'safari'     => 'Safari',
		);

		$value = $block_attributes['UAGBrowser'];

		$show = false;

		if ( 'ie' === $value ) {
			if ( false !== strpos( $_SERVER['HTTP_USER_AGENT'], $browsers[ $value ][0] ) || false !== strpos( $_SERVER['HTTP_USER_AGENT'], $browsers[ $value ][1] ) ) {
				$show = true;
			}
		} else {
			if ( false !== strpos( $_SERVER['HTTP_USER_AGENT'], $browsers[ $value ] ) ) {
				$show = true;

				// Additional check for Chrome that returns Safari.
				if ( 'safari' === $value || 'firefox' === $value ) {
					if ( false !== strpos( $_SERVER['HTTP_USER_AGENT'], 'Chrome' ) ) {
						$show = false;
					}
				}
			}
		}

		return ( $show ) ? '' : $block_content;
	}
	/**
	 * User State Visibility.
	 *
	 * @param array $block_attributes The block data.
	 * @param mixed $block_content The block content.
	 *
	 * @since 1.21.0
	 * @return mixed Returns the new block content.
	 */
	public function user_state_visibility( $block_attributes, $block_content ) {

		if ( isset( $block_attributes['UAGLoggedIn'] ) && $block_attributes['UAGLoggedIn'] && is_user_logged_in() ) {
			return '';
		}

		if ( isset( $block_attributes['UAGLoggedOut'] ) && $block_attributes['UAGLoggedOut'] && ! is_user_logged_in() ) {
			return '';
		}

		return $block_content;

	}

	/**
	 * Renders the Gravity Form shortcode.
	 *
	 * @since 1.12.0
	 */
	public function gf_shortcode() {

		check_ajax_referer( 'uagb_ajax_nonce', 'nonce' );

		$id = intval( $_POST['formId'] );

		if ( $id && 0 !== $id && -1 !== $id ) {
			$data['html'] = do_shortcode( '[gravityforms id="' . $id . '" ajax="true"]' );
		} else {
			$data['html'] = '<p>' . __( 'Please select a valid Gravity Form.', 'ultimate-addons-for-gutenberg' ) . '</p>';
		}
		wp_send_json_success( $data );
	}

	/**
	 * Renders the Contect Form 7 shortcode.
	 *
	 * @since 1.10.0
	 */
	public function cf7_shortcode() {

		check_ajax_referer( 'uagb_ajax_nonce', 'nonce' );

		$id = intval( $_POST['formId'] );

		if ( $id && 0 !== $id && -1 !== $id ) {
			$data['html'] = do_shortcode( '[contact-form-7 id="' . $id . '" ajax="true"]' );
		} else {
			$data['html'] = '<p>' . __( 'Please select a valid Contact Form 7.', 'ultimate-addons-for-gutenberg' ) . '</p>';
		}
		wp_send_json_success( $data );
	}

	/**
	 * Gutenberg block category for UAGB.
	 *
	 * @param array  $categories Block categories.
	 * @param object $post Post object.
	 * @since 1.0.0
	 */
	public function register_block_category( $categories, $post ) {
		return array_merge(
			$categories,
			array(
				array(
					'slug'  => 'uagb',
					'title' => __( 'Ultimate Addons Blocks', 'ultimate-addons-for-gutenberg' ),
				),
			)
		);
	}

	/**
	 * Enqueue Gutenberg block assets for backend editor.
	 *
	 * @since 1.0.0
	 */
	public function editor_assets() {

		$uagb_ajax_nonce = wp_create_nonce( 'uagb_ajax_nonce' );

		$script_dep_path = UAGB_DIR . 'dist/blocks.asset.php';
		$script_info     = file_exists( $script_dep_path )
			? include $script_dep_path
			: array(
				'dependencies' => array(),
				'version'      => UAGB_VER,
			);
		$script_dep      = array_merge( $script_info['dependencies'], array( 'wp-blocks', 'wp-i18n', 'wp-element', 'wp-components', 'wp-editor', 'wp-api-fetch' ) );

		// Scripts.
		wp_enqueue_script(
			'uagb-block-editor-js', // Handle.
			UAGB_URL . 'dist/blocks.js',
			$script_dep, // Dependencies, defined above.
			$script_info['version'], // UAGB_VER.
			true // Enqueue the script in the footer.
		);

		wp_set_script_translations( 'uagb-block-editor-js', 'ultimate-addons-for-gutenberg' );

		// Styles.
		wp_enqueue_style(
			'uagb-block-editor-css', // Handle.
			UAGB_URL . 'dist/blocks.css', // Block editor CSS.
			array( 'wp-edit-blocks' ), // Dependency to include the CSS after it.
			UAGB_VER
		);

		// Common Editor style.
		wp_enqueue_style(
			'uagb-block-common-editor-css', // Handle.
			UAGB_URL . 'admin/assets/common-block-editor.css', // Block editor CSS.
			array( 'wp-edit-blocks' ), // Dependency to include the CSS after it.
			UAGB_VER
		);

		wp_enqueue_script( 'uagb-deactivate-block-js', UAGB_URL . 'admin/assets/blocks-deactivate.js', array( 'wp-blocks' ), UAGB_VER, true );

		$blocks       = array();
		$saved_blocks = UAGB_Admin_Helper::get_admin_settings_option( '_uagb_blocks' );

		if ( is_array( $saved_blocks ) ) {
			foreach ( $saved_blocks as $slug => $data ) {
				$_slug         = 'uagb/' . $slug;
				$current_block = UAGB_Config::$block_attributes[ $_slug ];

				if ( isset( $current_block['is_child'] ) && $current_block['is_child'] ) {
					continue;
				}

				if ( isset( $current_block['is_active'] ) && ! $current_block['is_active'] ) {
					continue;
				}

				if ( isset( $saved_blocks[ $slug ] ) ) {
					if ( 'disabled' === $saved_blocks[ $slug ] ) {
						array_push( $blocks, $_slug );
					}
				}
			}
		}

		wp_localize_script(
			'uagb-deactivate-block-js',
			'uagb_deactivate_blocks',
			array(
				'deactivated_blocks' => $blocks,
			)
		);

		wp_localize_script(
			'uagb-block-editor-js',
			'uagb_blocks_info',
			array(
				'blocks'               => UAGB_Config::get_block_attributes(),
				'category'             => 'uagb',
				'ajax_url'             => admin_url( 'admin-ajax.php' ),
				'cf7_forms'            => $this->get_cf7_forms(),
				'gf_forms'             => $this->get_gravity_forms(),
				'tablet_breakpoint'    => UAGB_TABLET_BREAKPOINT,
				'mobile_breakpoint'    => UAGB_MOBILE_BREAKPOINT,
				'image_sizes'          => UAGB_Helper::get_image_sizes(),
				'post_types'           => UAGB_Helper::get_post_types(),
				'all_taxonomy'         => UAGB_Helper::get_related_taxonomy(),
				'taxonomy_list'        => UAGB_Helper::get_taxonomy_list(),
				'uagb_ajax_nonce'      => $uagb_ajax_nonce,
				'uagb_home_url'        => home_url(),
				'user_role'            => $this->get_user_role(),
				'uagb_url'             => UAGB_URL,
				'uagb_mime_type'       => UAGB_Helper::get_mime_type(),
				'uagb_site_url'        => UAGB_URI,
				'enableConditions'     => apply_filters_deprecated( 'enable_block_condition', array( true ), '1.23.4', 'uag_enable_block_condition' ),
				'enableMasonryGallery' => apply_filters( 'uag_enable_masonry_gallery', true ),
			)
		);

		// To match the editor with frontend.
		// Scripts Dependency.
		UAGB_Scripts_Utils::enqueue_blocks_dependency_both();
		// Style.
		UAGB_Scripts_Utils::enqueue_blocks_styles();
		// RTL Styles.
		UAGB_Scripts_Utils::enqueue_blocks_rtl_styles();
	}

	/**
	 *  Get the User Roles
	 *
	 *  @since 1.21.0
	 */
	public function get_user_role() {

		global $wp_roles;

		$field_options = array();

		$role_lists = $wp_roles->get_names();

		$field_options[0] = array(
			'value' => '',
			'label' => __( 'None', 'ultimate-addons-for-gutenberg' ),
		);

		foreach ( $role_lists as $key => $role_list ) {
			$field_options[] = array(
				'value' => $key,
				'label' => $role_list,
			);
		}

		return $field_options;
	}

	/**
	 * Function to integrate CF7 Forms.
	 *
	 * @since 1.10.0
	 */
	public function get_cf7_forms() {
		$field_options = array();

		if ( class_exists( 'WPCF7_ContactForm' ) ) {
			$args             = array(
				'post_type'      => 'wpcf7_contact_form',
				'posts_per_page' => -1,
			);
			$forms            = get_posts( $args );
			$field_options[0] = array(
				'value' => -1,
				'label' => __( 'Select Form', 'ultimate-addons-for-gutenberg' ),
			);
			if ( $forms ) {
				foreach ( $forms as $form ) {
					$field_options[] = array(
						'value' => $form->ID,
						'label' => $form->post_title,
					);
				}
			}
		}

		if ( empty( $field_options ) ) {
			$field_options = array(
				'-1' => __( 'You have not added any Contact Form 7 yet.', 'ultimate-addons-for-gutenberg' ),
			);
		}
		return $field_options;
	}

	/**
	 * Returns all gravity forms with ids
	 *
	 * @since 1.12.0
	 * @return array Key Value paired array.
	 */
	public function get_gravity_forms() {
		$field_options = array();

		if ( class_exists( 'GFForms' ) ) {
			$forms            = RGFormsModel::get_forms( null, 'title' );
			$field_options[0] = array(
				'value' => -1,
				'label' => __( 'Select Form', 'ultimate-addons-for-gutenberg' ),
			);
			if ( is_array( $forms ) ) {
				foreach ( $forms as $form ) {
					$field_options[] = array(
						'value' => $form->id,
						'label' => $form->title,
					);
				}
			}
		}

		if ( empty( $field_options ) ) {
			$field_options = array(
				'-1' => __( 'You have not added any Gravity Forms yet.', 'ultimate-addons-for-gutenberg' ),
			);
		}

		return $field_options;
	}
}

/**
 *  Prepare if class 'UAGB_Init_Blocks' exist.
 *  Kicking this off by calling 'get_instance()' method
 */
UAGB_Init_Blocks::get_instance();
