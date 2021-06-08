<?php
/**
 * UAGB Post Base.
 *
 * @package UAGB
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Class UAGB_Post_Assets.
 */
class UAGB_Post_Assets {

	/**
	 * Current Block List
	 *
	 * @since 1.13.4
	 * @var current_block_list
	 */
	public $current_block_list = array();

	/**
	 * UAG Block Flag
	 *
	 * @since 1.13.4
	 * @var uag_flag
	 */
	public $uag_flag = false;

	/**
	 * UAG FAQ Layout Flag
	 *
	 * @since 1.18.1
	 * @var uag_faq_layout
	 */
	public $uag_faq_layout = false;

	/**
	 * UAG File Generation Flag
	 *
	 * @since 1.14.0
	 * @var file_generation
	 */
	public $file_generation = 'disabled';

	/**
	 * UAG File Generation Flag
	 *
	 * @since 1.14.0
	 * @var file_generation
	 */
	public $is_allowed_assets_generation = false;

	/**
	 * UAG File Generation Fallback Flag for CSS
	 *
	 * @since 1.15.0
	 * @var file_generation
	 */
	public $fallback_css = false;

	/**
	 * UAG File Generation Fallback Flag for JS
	 *
	 * @since 1.15.0
	 * @var file_generation
	 */
	public $fallback_js = false;

	/**
	 * Enque Style and Script Variable
	 *
	 * @since 1.14.0
	 * @var instance
	 */
	public $assets_file_handler = array();

	/**
	 * Stylesheet
	 *
	 * @since 1.13.4
	 * @var stylesheet
	 */
	public $stylesheet = '';

	/**
	 * Script
	 *
	 * @since 1.13.4
	 * @var script
	 */
	public $script = '';

	/**
	 * Store Json variable
	 *
	 * @since 1.8.1
	 * @var instance
	 */
	public $icon_json;

	/**
	 * Page Blocks Variable
	 *
	 * @since 1.6.0
	 * @var instance
	 */
	public $page_blocks;

	/**
	 * Google fonts to enqueue
	 *
	 * @var array
	 */
	public $gfonts = array();

	/**
	 * Static CSS Added Array
	 *
	 * @since 1.23.0
	 * @var array
	 */
	public $static_css_blocks = array();

	/**
	 * Static CSS Added Array
	 *
	 * @since 1.23.0
	 * @var array
	 */
	public static $conditional_blocks_printed = false;

	/**
	 * Post ID
	 *
	 * @since 1.23.0
	 * @var array
	 */
	protected $post_id;

	/**
	 * Constructor
	 *
	 * @param int $post_id Post ID.
	 */
	public function __construct( $post_id ) {

		$this->post_id = $post_id;

		$this->file_generation = UAGB_Helper::$file_generation;

		$this->is_allowed_assets_generation = $this->allow_assets_generation();

		if ( $this->is_allowed_assets_generation ) {
			$this_post = get_post( $this->post_id );

			$this->prepare_assets( $this_post );
		}
	}

	/**
	 * This function determines wether to generate new assets or not.
	 *
	 * @since 1.23.0
	 */
	public function allow_assets_generation() {

		$page_assets     = get_post_meta( $this->post_id, '_uag_page_assets', true );
		$version_updated = false;
		$css_asset_info  = array();
		$js_asset_info   = array();

		if ( empty( $page_assets ) || empty( $page_assets['uag_version'] ) ) {
			return true;
		}

		if ( UAGB_ASSET_VER !== $page_assets['uag_version'] ) {
			$version_updated = true;
		}

		if ( 'enabled' === $this->file_generation ) {

			$css_asset_info = UAGB_Scripts_Utils::get_asset_info( 'css', $this->post_id );
			$css_file_path  = $css_asset_info['css'];

			$js_asset_info = UAGB_Scripts_Utils::get_asset_info( 'js', $this->post_id );
			$js_file_path  = $js_asset_info['js'];

			if ( $version_updated ) {
				$uagb_filesystem = uagb_filesystem();
				$uagb_filesystem->delete( $css_file_path );
				$uagb_filesystem->delete( $js_file_path );

				// Delete keys.
				delete_post_meta( $this->post_id, '_uag_css_file_name' );
				delete_post_meta( $this->post_id, '_uag_js_file_name' );
			}

			if ( empty( $css_file_path ) || ! file_exists( $css_file_path ) ) {
				return true;
			}

			if ( ! empty( $js_file_path ) && ! file_exists( $js_file_path ) ) {
				return true;
			}
		}

		// If version is updated, return true.
		if ( $version_updated ) {
			// Delete cached meta.
			delete_post_meta( $this->post_id, '_uag_page_assets' );
			return true;
		}

		// Set required varibled from stored data.
		$this->current_block_list  = $page_assets['current_block_list'];
		$this->uag_flag            = $page_assets['uag_flag'];
		$this->stylesheet          = $page_assets['css'];
		$this->script              = $page_assets['js'];
		$this->gfonts              = $page_assets['gfonts'];
		$this->uag_faq_layout      = $page_assets['uag_faq_layout'];
		$this->assets_file_handler = array_merge( $css_asset_info, $js_asset_info );

		return false;
	}

	/**
	 * Enqueue all page assets.
	 *
	 * @since 1.23.0
	 */
	public function enqueue_scripts() {

		// Global Required assets.
		if ( has_blocks( $this->post_id ) ) {
			/* Print conditional css for all blocks */
			add_action( 'wp_head', array( $this, 'print_conditional_css' ), 80 );
		}

		// UAG Flag specific.
		if ( $this->is_allowed_assets_generation ) {
			$this->generate_assets();
			$this->generate_asset_files();
		}

		if ( $this->uag_flag ) {

			// Register Assets for Frontend & Enqueue for Editor.
			UAGB_Scripts_Utils::enqueue_blocks_dependency_both();

			// Enqueue all dependency assets.
			$this->enqueue_blocks_dependency_frontend();

			// RTL Styles Suppport.
			UAGB_Scripts_Utils::enqueue_blocks_rtl_styles();

			// Print google fonts.
			add_action( 'wp_head', array( $this, 'print_google_fonts' ), 120 );

			if ( 'enabled' === $this->file_generation ) {
				// Enqueue File Generation Assets Files.
				$this->enqueue_file_generation_assets();
			}

			// Print Dynamic CSS.
			if ( 'disabled' === $this->file_generation || $this->fallback_css ) {
				add_action( 'wp_head', array( $this, 'print_stylesheet' ), 80 );
			}
			// Print Dynamic JS.
			if ( 'disabled' === $this->file_generation || $this->fallback_js ) {
				add_action( 'wp_footer', array( $this, 'print_script' ), 1000 );
			}
		}
	}


	/**
	 * This function updates the Page assets in the Page Meta Key.
	 *
	 * @since 1.23.0
	 */
	public function update_page_assets() {

		$meta_array = array(
			'css'                => $this->stylesheet,
			'js'                 => $this->script,
			'current_block_list' => $this->current_block_list,
			'uag_flag'           => $this->uag_flag,
			'uag_version'        => UAGB_ASSET_VER,
			'gfonts'             => $this->gfonts,
			'uag_faq_layout'     => $this->uag_faq_layout,
		);

		update_post_meta( $this->post_id, '_uag_page_assets', $meta_array );
	}
	/**
	 * This is the action where we create dynamic asset files.
	 * CSS Path : uploads/uag-plugin/uag-style-{post_id}-{timestamp}.css
	 * JS Path : uploads/uag-plugin/uag-script-{post_id}-{timestamp}.js
	 *
	 * @since 1.15.0
	 */
	public function generate_asset_files() {

		if ( 'enabled' === $this->file_generation ) {
			$this->file_write( $this->stylesheet, 'css', $this->post_id );
			$this->file_write( $this->script, 'js', $this->post_id );
		}

		$this->update_page_assets();
	}

	/**
	 * Enqueue Gutenberg block assets for both frontend + backend.
	 *
	 * @since 1.13.4
	 */
	public function enqueue_blocks_dependency_frontend() {

		$block_list_for_assets = $this->current_block_list;

		$blocks = UAGB_Config::get_block_attributes();

		foreach ( $block_list_for_assets as $key => $curr_block_name ) {

			$js_assets = ( isset( $blocks[ $curr_block_name ]['js_assets'] ) ) ? $blocks[ $curr_block_name ]['js_assets'] : array();

			$css_assets = ( isset( $blocks[ $curr_block_name ]['css_assets'] ) ) ? $blocks[ $curr_block_name ]['css_assets'] : array();

			foreach ( $js_assets as $asset_handle => $val ) {
				// Scripts.
				if ( 'uagb-faq-js' === $val ) {
					if ( $this->uag_faq_layout ) {
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

		$uagb_masonry_ajax_nonce = wp_create_nonce( 'uagb_masonry_ajax_nonce' );
		wp_localize_script(
			'uagb-post-js',
			'uagb_data',
			array(
				'ajax_url'                => admin_url( 'admin-ajax.php' ),
				'uagb_masonry_ajax_nonce' => $uagb_masonry_ajax_nonce,
			)
		);

		$uagb_forms_ajax_nonce = wp_create_nonce( 'uagb_forms_ajax_nonce' );
		wp_localize_script(
			'uagb-forms-js',
			'uagb_forms_data',
			array(
				'ajax_url'              => admin_url( 'admin-ajax.php' ),
				'uagb_forms_ajax_nonce' => $uagb_forms_ajax_nonce,
			)
		);
	}

	/**
	 * Enqueue File Generation Files.
	 */
	public function enqueue_file_generation_assets() {

		$file_handler = $this->assets_file_handler;

		if ( isset( $file_handler['css_url'] ) ) {
			wp_enqueue_style( 'uag-style-' . $this->post_id, $file_handler['css_url'], array(), UAGB_VER, 'all' );
		} else {
			$this->fallback_css = true;
		}
		if ( isset( $file_handler['js_url'] ) ) {
			wp_enqueue_script( 'uag-script-' . $this->post_id, $file_handler['js_url'], array(), UAGB_VER, true );
		} else {
			$this->fallback_js = true;
		}
	}
	/**
	 * Print the Script in footer.
	 */
	public function print_script() {

		if ( empty( $this->script ) ) {
			return;
		}

		echo '<script type="text/javascript" id="uagb-script-frontend-' . $this->post_id . '">' . $this->script . '</script>'; //phpcs:ignore WordPress.XSS.EscapeOutput.OutputNotEscaped
	}

	/**
	 * Print the Stylesheet in header.
	 */
	public function print_stylesheet() {

		if ( empty( $this->stylesheet ) ) {
			return;
		}

		echo '<style id="uagb-style-frontend-' . $this->post_id . '">' . $this->stylesheet . '</style>'; //phpcs:ignore WordPress.XSS.EscapeOutput.OutputNotEscaped
	}

	/**
	 * Print Conditional blocks css.
	 */
	public function print_conditional_css() {

		if ( self::$conditional_blocks_printed ) {
			return;
		}

		$conditional_block_css = UAGB_Block_Helper::get_condition_block_css();

		echo '<style id="uagb-style-conditional-extension">' . $conditional_block_css . '</style>'; //phpcs:ignore WordPress.XSS.EscapeOutput.OutputNotEscaped

		self::$conditional_blocks_printed = true;

	}


	/**
	 * Load the front end Google Fonts.
	 */
	public function print_google_fonts() {

		if ( empty( $this->gfonts ) ) {
			return;
		}

		$show_google_fonts = apply_filters( 'uagb_blocks_show_google_fonts', true );
		if ( ! $show_google_fonts ) {
			return;
		}
		$link    = '';
		$subsets = array();
		foreach ( $this->gfonts as $key => $gfont_values ) {
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

		$this->current_block_list[] = $name;

		if ( strpos( $name, 'uagb/' ) !== false ) {
			$this->uag_flag = true;
		}

		// Add static css here.
		$block_css_arr = UAGB_Config::get_block_assets_css();

		if ( isset( $block_css_arr[ $name ] ) && ! in_array( $block_css_arr[ $name ]['name'], $this->static_css_blocks, true ) ) {
			$common_css = array(
				'common' => $this->get_block_static_css( $block_css_arr[ $name ]['name'] ),
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
					$this->uag_faq_layout = true;
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

						$this->stylesheet .= $assets['css'];
						$this->script     .= $assets['js'];
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

		$this->current_block_list = array_unique( $this->current_block_list );

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

		/* Finalize prepared assets and store in static variable */
		global $content_width;

		$this->stylesheet = str_replace( '#CONTENT_WIDTH#', $content_width . 'px', $this->stylesheet );

		if ( '' !== $this->script ) {
			$this->script = 'document.addEventListener("DOMContentLoaded", function(){ ' . $this->script . ' })';
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
			$this->page_blocks = $blocks;

			if ( ! is_array( $blocks ) || empty( $blocks ) ) {
				return;
			}

			$assets = $this->get_blocks_assets( $blocks );

			$this->stylesheet .= $assets['css'];
			$this->script     .= $assets['js'];

			// Update fonts.
			$this->gfonts = array_merge( $this->gfonts, UAGB_Helper::$gfonts );
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

						$this->stylesheet .= $assets['css'];
						$this->script     .= $assets['js'];

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
	 * Creates a new file for Dynamic CSS/JS.
	 *
	 * @param  string $file_data The data that needs to be copied into the created file.
	 * @param  string $type Type of file - CSS/JS.
	 * @param  string $file_state Wether File is new or old.
	 * @param  string $old_file_name Old file name timestamp.
	 * @since 1.15.0
	 * @return boolean true/false
	 */
	public function create_file( $file_data, $type, $file_state = 'new', $old_file_name = '' ) {

		$date          = new DateTime();
		$new_timestamp = $date->getTimestamp();
		$uploads_dir   = UAGB_Helper::get_upload_dir();
		$file_system   = uagb_filesystem();

		// Example 'uag-css-15-1645698679.css'.
		$file_name = 'uag-' . $type . '-' . $this->post_id . '-' . $new_timestamp . '.' . $type;

		if ( 'old' === $file_state ) {
			$file_name = $old_file_name;
		}

		// Create a new file.
		$result = $file_system->put_contents( $uploads_dir['path'] . $file_name, $file_data, FS_CHMOD_FILE );

		if ( $result ) {
			// Update meta with current timestamp.
			update_post_meta( $this->post_id, '_uag_' . $type . '_file_name', $file_name );
		}

		return $result;
	}

	/**
	 * Creates css and js files.
	 *
	 * @param  var $file_data    Gets the CSS\JS for the current Page.
	 * @param  var $type    Gets the CSS\JS type.
	 * @param  var $post_id Post ID.
	 * @since  1.14.0
	 */
	public function file_write( $file_data, $type = 'css', $post_id = '' ) {

		if ( ! $this->post_id ) {
			return false;
		}

		$file_system = uagb_filesystem();

		// Get timestamp - Already saved OR new one.
		$file_name   = get_post_meta( $this->post_id, '_uag_' . $type . '_file_name', true );
		$file_name   = empty( $file_name ) ? '' : $file_name;
		$assets_info = UAGB_Scripts_Utils::get_asset_info( $type, $this->post_id );
		$file_path   = $assets_info[ $type ];

		if ( '' === $file_data ) {
			/**
			 * This is when the generated CSS/JS is blank.
			 * This means this page does not use UAG block.
			 * In this scenario we need to delete the existing file.
			 * This will ensure there are no extra files added for user.
			*/

			if ( ! empty( $file_name ) && file_exists( $file_path ) ) {
				// Delete old file.
				wp_delete_file( $file_path );
			}

			return true;
		}

		/**
		 * Timestamp present but file does not exists.
		 * This is the case where somehow the files are delete or not created in first place.
		 * Here we attempt to create them again.
		 */
		if ( ! $file_system->exists( $file_path ) && '' !== $file_name ) {

			$did_create = $this->create_file( $file_data, $type, 'old', $file_name );

			if ( $did_create ) {
				$this->assets_file_handler = array_merge( $this->assets_file_handler, $assets_info );
			}

			return $did_create;
		}

		/**
		 * Need to create new assets.
		 * No such assets present for this current page.
		 */
		if ( '' === $file_name ) {

			// Create a new file.
			$did_create = $this->create_file( $file_data, $type );

			if ( $did_create ) {
				$new_assets_info           = UAGB_Scripts_Utils::get_asset_info( $type, $this->post_id );
				$this->assets_file_handler = array_merge( $this->assets_file_handler, $new_assets_info );
			}

			return $did_create;

		}

		/**
		 * File already exists.
		 * Need to match the content.
		 * If new content is present we update the current assets.
		 */
		if ( file_exists( $file_path ) ) {

			$old_data = $file_system->get_contents( $file_path );

			if ( $old_data !== $file_data ) {

				// Delete old file.
				wp_delete_file( $file_path );

				// Create a new file.
				$did_create = $this->create_file( $file_data, $type );

				if ( $did_create ) {
					$new_assets_info           = UAGB_Scripts_Utils::get_asset_info( $type, $this->post_id );
					$this->assets_file_handler = array_merge( $this->assets_file_handler, $new_assets_info );
				}

				return $did_create;
			}
		}

		$this->assets_file_handler = array_merge( $this->assets_file_handler, $assets_info );

		return true;
	}

	/**
	 * Get Static CSS of Block.
	 *
	 * @param string $block_name Block Name.
	 *
	 * @return string Static CSS.
	 * @since 1.23.0
	 */
	public function get_block_static_css( $block_name ) {

		$css = '';

		$block_static_css_path = UAGB_DIR . 'assets/css/blocks/' . $block_name . '.css';

		if ( file_exists( $block_static_css_path ) ) {

			$file_system = uagb_filesystem();

			$css = $file_system->get_contents( $block_static_css_path );
		}

		array_push( $this->static_css_blocks, $block_name );

		return $css;
	}
}

