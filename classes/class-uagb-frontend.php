<?php
/**
 * UAGB Helper.
 *
 * @package UAGB
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Class UAGB_Frontend.
 */
class UAGB_Frontend {

	/**
	 * Member Variable
	 *
	 * @since 0.0.1
	 * @var instance
	 */
	private static $instance;

	/**
	 * Current Block List
	 *
	 * @since 1.13.4
	 * @var current_block_list
	 */
	public static $current_block_list = array();

	/**
	 * UAG Block Flag
	 *
	 * @since 1.13.4
	 * @var uag_flag
	 */
	public static $uag_flag = false;

	/**
	 * UAG FAQ Layout Flag
	 *
	 * @since 1.18.1
	 * @var uag_faq_layout
	 */
	public static $uag_faq_layout = false;

	/**
	 * UAG File Generation Flag
	 *
	 * @since 1.14.0
	 * @var file_generation
	 */
	public static $file_generation = 'disabled';

	/**
	 * UAG File Generation Flag
	 *
	 * @since 1.14.0
	 * @var file_generation
	 */
	public static $is_allowed_assets_generation = false;

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
	 * Enque Style and Script Variable
	 *
	 * @since 1.14.0
	 * @var instance
	 */
	public static $assets_file_handler = array();

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
	 * Store Json variable
	 *
	 * @since 1.8.1
	 * @var instance
	 */
	public static $icon_json;

	/**
	 * Page Blocks Variable
	 *
	 * @since 1.6.0
	 * @var instance
	 */
	public static $page_blocks;

	/**
	 * Google fonts to enqueue
	 *
	 * @var array
	 */
	public static $gfonts = array();

	/**
	 * Static CSS Added Array
	 *
	 * @since 1.23.0
	 * @var array
	 */
	public static $static_css_blocks = array();

	/**
	 *  Initiator
	 *
	 * @since 0.0.1
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

		$this->define_vars();

		add_action( 'wp', array( $this, 'set_initial_vars' ), 5 );
		/* Generated assets */
		add_action( 'wp', array( $this, 'generate_assets' ), 99 );

		/* Generated assets files*/
		add_action( 'wp_enqueue_scripts', array( $this, 'generate_asset_files' ), 1 );

		/* Enqueue assets files*/
		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_block_assets' ), 10 );

		/* Print fonts */
		add_action( 'wp_head', array( $this, 'print_stylesheet' ), 80 );
		add_action( 'wp_head', array( $this, 'print_google_fonts' ), 120 );
		add_action( 'wp_footer', array( $this, 'print_script' ), 1000 );

		add_filter( 'redirect_canonical', array( $this, 'override_canonical' ), 1, 2 );
		add_action( 'save_post', array( $this, 'delete_page_assets' ), 10, 1 );
	}

	/**
	 * Define variables.
	 *
	 * @since 1.23.0
	 */
	public function define_vars() {
		self::$file_generation = UAGB_Helper::$file_generation;
	}

	/**
	 * Set initial required variables.
	 *
	 * @since 1.23.0
	 */
	public function set_initial_vars() {
		self::$is_allowed_assets_generation = $this->allow_assets_generation();
	}

	/**
	 * This function determines wether to generate new assets or not.
	 *
	 * @since 1.23.0
	 */
	public function allow_assets_generation() {

		$post_id = get_the_ID();

		$page_assets = get_post_meta( $post_id, '_uagb_page_assets', true );

		if ( empty( $page_assets )
			|| empty( $page_assets['uag_version'] )
			|| UAGB_ASSET_VER !== $page_assets['uag_version']
		) {
			return true;
		}

		if ( 'enabled' === self::$file_generation ) {

			$post_timestamp_css = get_post_meta( $post_id, '_uag_css_file_name', true );
			$post_timestamp_js  = get_post_meta( $post_id, '_uag_js_file_name', true );

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

			if ( empty( $css_file_path ) || ! file_exists( $css_file_path ) ) {
				return true;
			}

			if ( empty( $js_file_path ) || ! file_exists( $js_file_path ) ) {
				return true;
			}

			self::$assets_file_handler = array_merge( $css_asset_info, $js_asset_info );
		}

		// Set required varibled from stored data.
		self::$current_block_list = $page_assets['current_block_list'];
		self::$uag_flag           = $page_assets['uag_flag'];
		self::$stylesheet         = $page_assets['css'];
		self::$script             = $page_assets['js'];

		return false;
	}
	/**
	 * This function deletes the Page assets from the Page Meta Key.
	 *
	 * @param int $post_id Post Id.
	 * @since 1.23.0
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
			if ( file_exists( $js_file_path ) ) {
				wp_delete_file( $js_file_path );
			}
		}

		delete_post_meta( $post_id, '_uagb_page_assets' );
		delete_post_meta( $post_id, '_uag_css_file_name' );
		delete_post_meta( $post_id, '_uag_js_file_name' );
	}
	/**
	 * This function updates the Page assets in the Page Meta Key.
	 *
	 * @since 1.23.0
	 */
	public function update_page_assets() {

		$post_id = get_the_ID();

		$meta_array = array(
			'css'                => self::$stylesheet,
			'js'                 => self::$script,
			'current_block_list' => self::$current_block_list,
			'uag_flag'           => self::$uag_flag,
			'uag_version'        => UAGB_ASSET_VER,
		);

		update_post_meta( $post_id, '_uagb_page_assets', $meta_array );
	}
	/**
	 * This is the action where we create dynamic asset files.
	 * CSS Path : uploads/uag-plugin/uag-style-{post_id}-{timestamp}.css
	 * JS Path : uploads/uag-plugin/uag-script-{post_id}-{timestamp}.js
	 *
	 * @since 1.15.0
	 */
	public function generate_asset_files() {

		if ( ! self::$is_allowed_assets_generation ) {
			return;
		}

		if ( 'enabled' === self::$file_generation ) {
			self::file_write( self::$stylesheet, 'css' );
			self::file_write( self::$script, 'js' );
		}

		$this->update_page_assets();
	}

	/**
	 * Enqueue Gutenberg block assets for both frontend + backend.
	 *
	 * @since 1.13.4
	 */
	public function enqueue_block_assets() {

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
			$file_handler = self::$assets_file_handler;

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
	 * Print the Script in footer.
	 */
	public function print_script() {

		if ( 'enabled' === self::$file_generation && ! self::$fallback_js ) {
			return;
		}

		if ( empty( self::$script ) ) {
			return;
		}

		echo '<script type="text/javascript" id="uagb-script-frontend">' . self::$script . '</script>'; //phpcs:ignore WordPress.XSS.EscapeOutput.OutputNotEscaped
	}

	/**
	 * Print the Stylesheet in header.
	 */
	public function print_stylesheet() {

		$this->print_conditional_css();

		if ( 'enabled' === self::$file_generation && ! self::$fallback_css ) {
			return;
		}

		if ( empty( self::$stylesheet ) ) {
			return;
		}

		echo '<style id="uagb-style-frontend">' . self::$stylesheet . '</style>'; //phpcs:ignore WordPress.XSS.EscapeOutput.OutputNotEscaped
	}

	/**
	 * Print Conditional blocks css.
	 */
	public function print_conditional_css() {

		$conditional_block_css = UAGB_Block_Helper::get_condition_block_css();

		echo '<style id="uagb-style-conditional-extension">' . $conditional_block_css . '</style>'; //phpcs:ignore WordPress.XSS.EscapeOutput.OutputNotEscaped
	}


	/**
	 * Load the front end Google Fonts.
	 */
	public function print_google_fonts() {

		if ( empty( UAGB_Helper::$gfonts ) ) {
			return;
		}
		$show_google_fonts = apply_filters( 'uagb_blocks_show_google_fonts', true );
		if ( ! $show_google_fonts ) {
			return;
		}
		$link    = '';
		$subsets = array();
		foreach ( UAGB_Helper::$gfonts as $key => $gfont_values ) {
			if ( ! empty( $link ) ) {
				$link .= '%7C'; // Append a new font to the string.
			}
			$link .= $gfont_values['fontfamily'];
			if ( ! empty( $gfont_values['fontvariants'] ) ) {
				$link .= ':';
				$link .= implode( ',', $gfont_values['fontvariants'] );
			}
			if ( ! empty( $gfont_values['fontsubsets'] ) ) {
				foreach ( $gfont_values['fontsubsets'] as $subset ) {
					if ( ! in_array( $subset, $subsets, true ) ) {
						array_push( $subsets, $subset );
					}
				}
			}
		}
		if ( ! empty( $subsets ) ) {
			$link .= '&amp;subset=' . implode( ',', $subsets );
		}
		if ( isset( $link ) && ! empty( $link ) ) {
			echo '<link href="//fonts.googleapis.com/css?family=' . esc_attr( str_replace( '|', '%7C', $link ) ) . '" rel="stylesheet">'; //phpcs:ignore WordPress.WP.EnqueuedResources.NonEnqueuedStylesheet
		}
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
				$js .= UAGB_Block_JS::get_table_of_contents_js( $blockattr, $block_id );
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

						$reusable_blocks = $this->parse_blocks( $content );

						$assets = $this->get_blocks_assets( $reusable_blocks );

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

	/**
	 * Generates stylesheet and appends in head tag.
	 *
	 * @since 0.0.1
	 */
	public function generate_assets() {

		if ( ! self::$is_allowed_assets_generation ) {
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
				$this->prepare_assets( $this_post );
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

			$this->prepare_assets( $this_post );

		} elseif ( is_archive() || is_home() || is_search() ) {

			global $wp_query;
			$cached_wp_query = $wp_query;

			foreach ( $cached_wp_query as $post ) { // phpcs:ignore WordPress.WP.GlobalVariablesOverride.Prohibited
				$this->prepare_assets( $post );
			}
		}

		/* Prepare assets and store in static variable */
		global $content_width;

		self::$stylesheet = str_replace( '#CONTENT_WIDTH#', $content_width . 'px', self::$stylesheet );

		if ( '' !== self::$script ) {
			self::$script = 'document.addEventListener("DOMContentLoaded", function(){ ' . self::$script . ' })';
		}

		/* Update page assets */
		$this->update_page_assets();
	}

	/**
	 * Generates stylesheet in loop.
	 *
	 * @param object $this_post Current Post Object.
	 * @since 1.7.0
	 */
	public function prepare_assets( $this_post ) {

		if ( empty( $this_post ) || empty( $this_post->ID ) ) {
			return;
		}

		if ( has_blocks( $this_post->ID ) && isset( $this_post->post_content ) ) {

			$blocks            = $this->parse_blocks( $this_post->post_content );
			self::$page_blocks = $blocks;

			if ( ! is_array( $blocks ) || empty( $blocks ) ) {
				return;
			}

			$assets = $this->get_blocks_assets( $blocks );

			self::$stylesheet .= $assets['css'];
			self::$script     .= $assets['js'];
		}
	}

	/**
	 * Parse Guten Block.
	 *
	 * @param string $content the content string.
	 * @since 1.1.0
	 */
	public function parse_blocks( $content ) {

		global $wp_version;

		return ( version_compare( $wp_version, '5', '>=' ) ) ? parse_blocks( $content ) : gutenberg_parse_blocks( $content );
	}

	/**
	 * Generates assets for all blocks including reusable blocks.
	 *
	 * @param array $blocks Blocks array.
	 * @since 1.1.0
	 */
	public function get_blocks_assets( $blocks ) {

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

						$reusable_blocks = $this->parse_blocks( $content );

						$assets = $this->get_blocks_assets( $reusable_blocks );

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
	 * Returns an array of paths for the CSS and JS assets
	 * of the current post.
	 *
	 * @param  var $type    Gets the CSS\JS type.
	 * @param  var $post_id Post ID.
	 * @since 1.14.0
	 * @return array
	 */
	public static function get_asset_info( $type, $post_id ) {

		$uploads_dir = UAGB_Helper::get_upload_dir();
		$info        = array();

		$path                   = get_post_meta( $post_id, '_uag_' . $type . '_file_name', true );
		$info[ $type ]          = $uploads_dir['path'] . $path;
		$info[ $type . '_url' ] = $uploads_dir['url'] . $path;

		return $info;
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

		$uploads_dir = UAGB_Helper::get_upload_dir();

		$file_system = uagb_filesystem();

		// Example 'uag-css-15-1645698679.css'.
		$path = 'uag-' . $type . '-' . $post_id . '-' . $timestamp . '.' . $type;

		if ( 'old' === $file_state ) {
			$path = $timestamp;
		}

		// Create a new file.
		$result = $file_system->put_contents( $uploads_dir['path'] . $path, $style_data, FS_CHMOD_FILE );

		if ( $result ) {
			// Update meta with current timestamp.
			update_post_meta( $post_id, '_uag_' . $type . '_file_name', $path );
		}

		return $result;
	}

	/**
	 * Creates css and js files.
	 *
	 * @param  var $style_data    Gets the CSS\JS for the current Page.
	 * @param  var $type    Gets the CSS\JS type.
	 * @since  1.14.0
	 */
	public static function file_write( $style_data, $type = 'css' ) {

		$post_id = get_the_ID();
		if ( ! $post_id ) {
			return false;
		}

		$post_timestamp_path = get_post_meta( $post_id, '_uag_' . $type . '_file_name', true );

		$date          = new DateTime();
		$new_timestamp = $date->getTimestamp();
		$file_system   = uagb_filesystem();

		// Get timestamp - Already saved OR new one.
		$post_timestamp_path = empty( $post_timestamp_path ) ? '' : $post_timestamp_path;
		$assets_info         = self::get_asset_info( $type, $post_id );

		$relative_src_path = $assets_info[ $type ];

		if ( '' === $style_data ) {
			/**
			 * This is when the generated CSS/JS is blank.
			 * This means this page does not use UAG block.
			 * In this scenario we need to delete the existing file.
			 * This will ensure there are no extra files added for user.
			*/

			if ( ! empty( $post_timestamp_path ) && file_exists( $relative_src_path ) ) {
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
				self::$assets_file_handler = array_merge( self::$assets_file_handler, $assets_info );
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
				$new_assets_info           = self::get_asset_info( $type, $post_id );
				self::$assets_file_handler = array_merge( self::$assets_file_handler, $new_assets_info );
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
					$new_assets_info           = self::get_asset_info( $type, $post_id );
					self::$assets_file_handler = array_merge( self::$assets_file_handler, $new_assets_info );
				}

				return $did_create;
			}
		}

		self::$assets_file_handler = array_merge( self::$assets_file_handler, $assets_info );

		return true;
	}

	/**
	 * Disable canonical on Single Post.
	 *
	 * @param  string $redirect_url  The redirect URL.
	 * @param  string $requested_url The requested URL.
	 * @since  1.14.9
	 * @return bool|string
	 */
	public function override_canonical( $redirect_url, $requested_url ) {

		global $wp_query;

		if ( is_array( $wp_query->query ) ) {

			if ( true === $wp_query->is_singular
				&& - 1 === $wp_query->current_post
				&& true === $wp_query->is_paged
			) {
				$redirect_url = false;
			}
		}

		return $redirect_url;
	}

	/**
	 * Get Static CSS of Block.
	 *
	 * @param string $block_name Block Name.
	 *
	 * @return string Static CSS.
	 * @since 1.23.0
	 */
	public static function get_block_static_css( $block_name ) {

		$css = '';

		$block_static_css_path = UAGB_DIR . 'assets/css/blocks/' . $block_name . '.css';

		if ( file_exists( $block_static_css_path ) ) {

			$file_system = uagb_filesystem();

			$css = $file_system->get_contents( $block_static_css_path );
		}

		array_push( self::$static_css_blocks, $block_name );

		return $css;
	}
}

/**
 *  Prepare if class 'UAGB_Frontend' exist.
 *  Kicking this off by calling 'get_instance()' method
 */
UAGB_Frontend::get_instance();

