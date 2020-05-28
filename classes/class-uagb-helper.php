<?php
/**
 * UAGB Helper.
 *
 * @package UAGB
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

if ( ! class_exists( 'UAGB_Helper' ) ) {

	/**
	 * Class UAGB_Helper.
	 */
	final class UAGB_Helper {


		/**
		 * Member Variable
		 *
		 * @since 0.0.1
		 * @var instance
		 */
		private static $instance;

		/**
		 * Member Variable
		 *
		 * @since 0.0.1
		 * @var instance
		 */
		public static $block_list;

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
		 * UAG File Generation Flag
		 *
		 * @since 1.14.0
		 * @var file_generation
		 */
		public static $file_generation = 'disabled';

		/**
		 * Enque Style and Script Variable
		 *
		 * @since 1.14.0
		 * @var instance
		 */
		public static $css_file_handler;

		/**
		 * Stylesheet
		 *
		 * @since 1.13.4
		 * @var stylesheet
		 */
		public static $stylesheet;

		/**
		 * Script
		 *
		 * @since 1.13.4
		 * @var script
		 */
		public static $script;

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

			if ( ! defined( 'FS_CHMOD_FILE' ) ) {
				define( 'FS_CHMOD_FILE', ( fileperms( ABSPATH . 'index.php' ) & 0777 | 0644 ) );
			}

			require UAGB_DIR . 'classes/class-uagb-config.php';
			require UAGB_DIR . 'classes/class-uagb-block-helper.php';

			self::$block_list      = UAGB_Config::get_block_attributes();
			self::$file_generation = self::allow_file_generation();

			add_action( 'wp_enqueue_scripts', array( $this, 'block_assets' ) );
			add_action( 'wp', array( $this, 'generate_stylesheet' ), 99 );
			add_action( 'wp', array( $this, 'generate_script' ), 100 );
			add_action( 'wp_head', array( $this, 'frontend_gfonts' ), 120 );
			add_action( 'wp_head', array( $this, 'print_stylesheet' ), 80 );
			add_action( 'wp_footer', array( $this, 'print_script' ), 1000 );
			add_filter( 'redirect_canonical', array( $this, 'override_canonical' ), 1, 2 );
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
					wp_enqueue_script( $val );
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
				}
				if ( isset( $file_handler['js_url'] ) ) {
					wp_enqueue_script( 'uag-script', $file_handler['js_url'], array(), UAGB_VER, true );
				}
			}

		}

		/**
		 * Print the Script in footer.
		 */
		public function print_script() {

			if ( 'enabled' === self::$file_generation ) {
				return;
			}

			if ( is_null( self::$script ) || '' === self::$script ) {
				return;
			}

			self::file_write( self::$script, 'js' );

			ob_start();
			?>
			<script type="text/javascript" id="uagb-script-frontend">document.addEventListener("DOMContentLoaded", function(){( function( $ ) { <?php echo self::$script; //phpcs:ignore WordPress.XSS.EscapeOutput.OutputNotEscaped ?> })(jQuery)})</script>
			<?php
			ob_end_flush();
		}

		/**
		 * Print the Stylesheet in header.
		 */
		public function print_stylesheet() {

			if ( 'enabled' === self::$file_generation ) {
				return;
			}

			global $content_width;

			if ( is_null( self::$stylesheet ) || '' === self::$stylesheet ) {
				return;
			}

			self::$stylesheet = str_replace( '#CONTENT_WIDTH#', $content_width . 'px', self::$stylesheet );

			self::file_write( self::$stylesheet, 'css' );

			ob_start();
			?>
			<style id="uagb-style-frontend"><?php echo self::$stylesheet; //phpcs:ignore WordPress.XSS.EscapeOutput.OutputNotEscaped ?></style>
			<?php
			ob_end_flush();
		}

		/**
		 * Load the front end Google Fonts.
		 */
		public function frontend_gfonts() {
			if ( empty( self::$gfonts ) ) {
				return;
			}
			$show_google_fonts = apply_filters( 'uagb_blocks_show_google_fonts', true );
			if ( ! $show_google_fonts ) {
				return;
			}
			$link    = '';
			$subsets = array();
			foreach ( self::$gfonts as $key => $gfont_values ) {
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
		 * Parse CSS into correct CSS syntax.
		 *
		 * @param array  $selectors The block selectors.
		 * @param string $id The selector ID.
		 * @since 0.0.1
		 */
		public static function generate_css( $selectors, $id ) {
			$styling_css = '';

			if ( empty( $selectors ) ) {
				return '';
			}

			foreach ( $selectors as $key => $value ) {

				$css = '';

				foreach ( $value as $j => $val ) {

					if ( 'font-family' === $j && 'Default' === $val ) {
						continue;
					}

					if ( ! empty( $val ) || 0 === $val ) {
						if ( 'font-family' === $j ) {
							$css .= $j . ': "' . $val . '";';
						} else {
							$css .= $j . ': ' . $val . ';';
						}
					}
				}

				if ( ! empty( $css ) ) {
					$styling_css     .= $id;
					$styling_css     .= $key . '{';
						$styling_css .= $css . '}';
				}
			}

			return $styling_css;
		}

		/**
		 * Get CSS value
		 *
		 * Syntax:
		 *
		 *  get_css_value( VALUE, UNIT );
		 *
		 * E.g.
		 *
		 *  get_css_value( VALUE, 'em' );
		 *
		 * @param string $value  CSS value.
		 * @param string $unit  CSS unit.
		 * @since 1.13.4
		 */
		public static function get_css_value( $value = '', $unit = '' ) {

			// @codingStandardsIgnoreStart

			if ( '' == $value ) {
				return $value;
			}
			// @codingStandardsIgnoreEnd

			$css_val = '';

			if ( ! empty( $value ) ) {
				$css_val = esc_attr( $value ) . $unit;
			}

			return $css_val;
		}

		/**
		 * Generates CSS recurrsively.
		 *
		 * @param object $block The block object.
		 * @since 0.0.1
		 */
		public function get_block_css( $block ) {

            // @codingStandardsIgnoreStart

            $block = ( array ) $block;

            $name = $block['blockName'];
            $css  = array();
            $block_id = '';

            if( ! isset( $name ) ) {
                return '';
            }

            if ( isset( $block['attrs'] ) && is_array( $block['attrs'] ) ) {
                $blockattr = $block['attrs'];
                if ( isset( $blockattr['block_id'] ) ) {
                    $block_id = $blockattr['block_id'];
                }
            }

            self::$current_block_list[] = $name;

			if ( strpos( $name, 'uagb/' ) !== false ) {
				self::$uag_flag = true;
			}

            switch ( $name ) {
                case 'uagb/section':
                    $css += UAGB_Block_Helper::get_section_css( $blockattr, $block_id );
                    break;

                case 'uagb/advanced-heading':
                    $css += UAGB_Block_Helper::get_adv_heading_css( $blockattr, $block_id );
                    UAGB_Block_Helper::blocks_advanced_heading_gfont( $blockattr );
                    break;

                case 'uagb/info-box':
					$css += UAGB_Block_Helper::get_info_box_css( $blockattr, $block_id );
                    UAGB_Block_Helper::blocks_info_box_gfont( $blockattr );
                    break;

                case 'uagb/buttons':
                    $css += UAGB_Block_Helper::get_buttons_css( $blockattr, $block_id );
                    UAGB_Block_Helper::blocks_buttons_gfont( $blockattr );
					break;

				case 'uagb/buttons-child':
					$css += UAGB_Block_Helper::get_buttons_child_css( $blockattr, $block_id );
					break;

                case 'uagb/blockquote':
                    $css += UAGB_Block_Helper::get_blockquote_css( $blockattr, $block_id );
                     UAGB_Block_Helper::blocks_blockquote_gfont( $blockattr );
                    break;

				case 'uagb/testimonial':
					$css += UAGB_Block_Helper::get_testimonial_css( $blockattr, $block_id );
					UAGB_Block_Helper::blocks_testimonial_gfont( $blockattr );
					break;

                case 'uagb/team':
                    $css += UAGB_Block_Helper::get_team_css( $blockattr, $block_id );
                    UAGB_Block_Helper::blocks_team_gfont( $blockattr );
                    break;

                case 'uagb/social-share':
                    $css += UAGB_Block_Helper::get_social_share_css( $blockattr, $block_id );
                    break;

                case 'uagb/social-share-child':
					$css += UAGB_Block_Helper::get_social_share_child_css( $blockattr, $block_id );
					break;

                case 'uagb/content-timeline':
                    $css += UAGB_Block_Helper::get_content_timeline_css( $blockattr, $block_id );
                    UAGB_Block_Helper::blocks_content_timeline_gfont( $blockattr );
                    break;

				case 'uagb/restaurant-menu':
					$css += UAGB_Block_Helper::get_restaurant_menu_css( $blockattr, $block_id );
					UAGB_Block_Helper::blocks_restaurant_menu_gfont( $blockattr );
					break;

                case 'uagb/call-to-action':
                    $css += UAGB_Block_Helper::get_call_to_action_css( $blockattr, $block_id );
                    UAGB_Block_Helper::blocks_call_to_action_gfont( $blockattr );
                    break;

                case 'uagb/post-timeline':
                    $css += UAGB_Block_Helper::get_post_timeline_css( $blockattr, $block_id );
                    UAGB_Block_Helper::blocks_post_timeline_gfont( $blockattr );
                    break;

                case 'uagb/icon-list':
                    $css += UAGB_Block_Helper::get_icon_list_css( $blockattr, $block_id );
                     UAGB_Block_Helper::blocks_icon_list_gfont( $blockattr );
					break;
					
				case 'uagb/icon-list-child':
					$css += UAGB_Block_Helper::get_icon_list_child_css( $blockattr, $block_id );
					break;

                case 'uagb/post-grid':
                    $css += UAGB_Block_Helper::get_post_grid_css( $blockattr, $block_id );
                    UAGB_Block_Helper::blocks_post_gfont( $blockattr );
                    break;

                case 'uagb/post-carousel':
                    $css += UAGB_Block_Helper::get_post_carousel_css( $blockattr, $block_id );
                    UAGB_Block_Helper::blocks_post_gfont( $blockattr );
                    break;

                case 'uagb/post-masonry':
                    $css += UAGB_Block_Helper::get_post_masonry_css( $blockattr, $block_id );
                    UAGB_Block_Helper::blocks_post_gfont( $blockattr );
                    break;

                case 'uagb/columns':
                    $css += UAGB_Block_Helper::get_columns_css( $blockattr, $block_id );
                    break;

                case 'uagb/column':
                    $css += UAGB_Block_Helper::get_column_css( $blockattr, $block_id );
                    break;

                case 'uagb/cf7-styler':
					$css += UAGB_Block_Helper::get_cf7_styler_css( $blockattr, $block_id );
					UAGB_Block_Helper::blocks_cf7_styler_gfont( $blockattr );
					break;

				case 'uagb/marketing-button':
					$css += UAGB_Block_Helper::get_marketing_btn_css( $blockattr, $block_id );
					UAGB_Block_Helper::blocks_marketing_btn_gfont( $blockattr );
					break;

                case 'uagb/gf-styler':
					$css += UAGB_Block_Helper::get_gf_styler_css( $blockattr, $block_id );
					 UAGB_Block_Helper::blocks_gf_styler_gfont( $blockattr );
					break;

				case 'uagb/table-of-contents':
					$css += UAGB_Block_Helper::get_table_of_contents_css( $blockattr, $block_id );
					UAGB_Block_Helper::blocks_table_of_contents_gfont( $blockattr );
					break;

                default:
                    // Nothing to do here.
                    break;
            }

            if ( isset( $block['innerBlocks'] ) ) {
                foreach ( $block['innerBlocks'] as $j => $inner_block ) {
                    if ( 'core/block' == $inner_block['blockName'] ) {
                        $id = ( isset( $inner_block['attrs']['ref'] ) ) ? $inner_block['attrs']['ref'] : 0;

                        if ( $id ) {
                            $content = get_post_field( 'post_content', $id );

                            $reusable_blocks = $this->parse( $content );

                            self::$stylesheet .= $this->get_stylesheet( $reusable_blocks );
                        }
                    } else {
                    	// Get CSS for the Block.
                        $inner_block_css = $this->get_block_css( $inner_block );

                        $css_desktop = ( isset( $css['desktop'] ) ? $css['desktop'] : '' );
                        $css_tablet = ( isset( $css['tablet'] ) ? $css['tablet'] : '' );
                        $css_mobile = ( isset( $css['mobile'] ) ? $css['mobile'] : '' );

                        if( isset( $inner_block_css['desktop'] ) ){
	                        $css['desktop'] = $css_desktop . $inner_block_css['desktop'];
	                        $css['tablet'] = $css_tablet . $inner_block_css['tablet'];
	                        $css['mobile'] = $css_mobile . $inner_block_css['mobile'];
                        }
                    }
                }
            }

            self::$current_block_list = array_unique( self::$current_block_list );

            return $css;

            // @codingStandardsIgnoreEnd
		}

		/**
		 * Adds Google fonts all blocks.
		 *
		 * @param array $load_google_font the blocks attr.
		 * @param array $font_family the blocks attr.
		 * @param array $font_weight the blocks attr.
		 * @param array $font_subset the blocks attr.
		 */
		public static function blocks_google_font( $load_google_font, $font_family, $font_weight, $font_subset ) {

			if ( true === $load_google_font ) {
				if ( ! array_key_exists( $font_family, self::$gfonts ) ) {
					$add_font                     = array(
						'fontfamily'   => $font_family,
						'fontvariants' => ( isset( $font_weight ) && ! empty( $font_weight ) ? array( $font_weight ) : array() ),
						'fontsubsets'  => ( isset( $font_subset ) && ! empty( $font_subset ) ? array( $font_subset ) : array() ),
					);
					self::$gfonts[ $font_family ] = $add_font;
				} else {
					if ( isset( $font_weight ) && ! empty( $font_weight ) && ! in_array( $font_weight, self::$gfonts[ $font_family ]['fontvariants'], true ) ) {
						array_push( self::$gfonts[ $font_family ]['fontvariants'], $font_weight );
					}
					if ( isset( $font_subset ) && ! empty( $font_subset ) && ! in_array( $font_subset, self::$gfonts[ $font_family ]['fontsubsets'], true ) ) {
						array_push( self::$gfonts[ $font_family ]['fontsubsets'], $font_subset );
					}
				}
			}
		}

		/**
		 * Generates Js recurrsively.
		 *
		 * @param object $block The block object.
		 * @since 1.6.0
		 */
		public function get_block_js( $block ) {

            // @codingStandardsIgnoreStart

            $block = ( array ) $block;

            $name = $block['blockName'];
            $js  = '';

            if( ! isset( $name ) ) {
                return '';
            }

            if ( isset( $block['attrs'] ) && is_array( $block['attrs'] ) ) {
                $blockattr = $block['attrs'];
                if ( isset( $blockattr['block_id'] ) ) {
                    $block_id = $blockattr['block_id'];
                }
            }

			switch ( $name ) {
                case 'uagb/testimonial':
                    $js .= UAGB_Block_Helper::get_testimonial_js( $blockattr, $block_id );
                    break;

                case 'uagb/blockquote':
                    $js .= UAGB_Block_Helper::get_blockquote_js( $blockattr, $block_id );
                    break;

                case 'uagb/social-share':
                    $js .= UAGB_Block_Helper::get_social_share_js( $blockattr, $block_id );
					break;

				case 'uagb/table-of-contents':
                    $js .= UAGB_Block_Helper::get_table_of_contents_js( $blockattr, $block_id );
					break;

                default:
                    // Nothing to do here.
                    break;
            }

            if ( isset( $block['innerBlocks'] ) ) {

                foreach ( $block['innerBlocks'] as $j => $inner_block ) {

                    if ( 'core/block' == $inner_block['blockName'] ) {
                        $id = ( isset( $inner_block['attrs']['ref'] ) ) ? $inner_block['attrs']['ref'] : 0;

                        if ( $id ) {
                            $content = get_post_field( 'post_content', $id );

                            $reusable_blocks = $this->parse( $content );

                            $this->get_scripts( $reusable_blocks );
                        }
                    } else {
                        // Get JS for the Block.
                        $js .= $this->get_block_js( $inner_block );
                    }
                }
            }

            return $js;

            // @codingStandardsIgnoreEnd
		}

		/**
		 * Generates stylesheet and appends in head tag.
		 *
		 * @since 0.0.1
		 */
		public function generate_stylesheet() {

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

			self::file_write( self::$stylesheet, 'css' );
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

				self::$stylesheet .= $this->get_stylesheet( $blocks );
			}
		}

		/**
		 * Generates scripts and appends in footer tag.
		 *
		 * @since 1.5.0
		 */
		public function generate_script() {

			$blocks = self::$page_blocks;

			if ( ! is_array( $blocks ) || empty( $blocks ) ) {
				return;
			}

			$this->get_scripts( $blocks );

			if ( ! empty( self::$script ) ) {
				self::file_write( self::$script, 'js' );
			}

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
		 * Generates stylesheet for reusable blocks.
		 *
		 * @param array $blocks Blocks array.
		 * @since 1.1.0
		 */
		public function get_stylesheet( $blocks ) {

			$desktop = '';
			$tablet  = '';
			$mobile  = '';

			$tab_styling_css = '';
			$mob_styling_css = '';

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

							self::$stylesheet .= $this->get_stylesheet( $reusable_blocks );

						}
					} else {
						// Get CSS for the Block.
						$css = $this->get_block_css( $block );

						if ( isset( $css['desktop'] ) ) {
							$desktop .= $css['desktop'];
							$tablet  .= $css['tablet'];
							$mobile  .= $css['mobile'];
						}
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

			return $desktop . $tab_styling_css . $mob_styling_css;
		}


		/**
		 * Generates scripts for reusable blocks.
		 *
		 * @param array $blocks Blocks array.
		 * @since 1.6.0
		 */
		public function get_scripts( $blocks ) {

			foreach ( $blocks as $i => $block ) {
				if ( is_array( $block ) ) {
					if ( 'core/block' === $block['blockName'] ) {
						$id = ( isset( $block['attrs']['ref'] ) ) ? $block['attrs']['ref'] : 0;

						if ( $id ) {
							$content = get_post_field( 'post_content', $id );

							$reusable_blocks = $this->parse( $content );

							$this->get_scripts( $reusable_blocks );
						}
					} else {
						// Get JS for the Block.
						self::$script .= $this->get_block_js( $block );
					}
				}
			}

			if ( ! empty( self::$script ) ) {
				self::$script = '( function( $ ) { ' . self::$script . '})(jQuery);';
			}
		}

		/**
		 * Get Buttons default array.
		 *
		 * @since 0.0.1
		 */
		public static function get_button_defaults() {

			$default = array();

			for ( $i = 1; $i <= 2; $i++ ) {
				array_push(
					$default,
					array(
						'size'             => '',
						'vPadding'         => 10,
						'hPadding'         => 14,
						'borderWidth'      => 1,
						'borderRadius'     => 2,
						'borderStyle'      => 'solid',
						'borderColor'      => '#333',
						'borderHColor'     => '#333',
						'color'            => '#333',
						'background'       => '',
						'hColor'           => '#333',
						'hBackground'      => '',
						'sizeType'         => 'px',
						'sizeMobile'       => '',
						'sizeTablet'       => '',
						'lineHeightType'   => 'em',
						'lineHeight'       => '',
						'lineHeightMobile' => '',
						'lineHeightTablet' => '',
					)
				);
			}

			return $default;
		}

		/**
		 * Returns an option from the database for
		 * the admin settings page.
		 *
		 * @param  string  $key     The option key.
		 * @param  mixed   $default Option default value if option is not available.
		 * @param  boolean $network_override Whether to allow the network admin setting to be overridden on subsites.
		 * @return string           Return the option value
		 */
		public static function get_admin_settings_option( $key, $default = false, $network_override = false ) {

			// Get the site-wide option if we're in the network admin.
			if ( $network_override && is_multisite() ) {
				$value = get_site_option( $key, $default );
			} else {
				$value = get_option( $key, $default );
			}

			return $value;
		}

		/**
		 * Updates an option from the admin settings page.
		 *
		 * @param string $key       The option key.
		 * @param mixed  $value     The value to update.
		 * @param bool   $network   Whether to allow the network admin setting to be overridden on subsites.
		 * @return mixed
		 */
		public static function update_admin_settings_option( $key, $value, $network = false ) {

			// Update the site-wide option since we're in the network admin.
			if ( $network && is_multisite() ) {
				update_site_option( $key, $value );
			} else {
				update_option( $key, $value );
			}
		}

		/**
		 * Is Knowledgebase.
		 *
		 * @return string
		 * @since 0.0.1
		 */
		public static function knowledgebase_data() {

			$knowledgebase = array(
				'enable_knowledgebase' => true,
				'knowledgebase_url'    => 'https://www.ultimategutenberg.com/docs/?utm_source=uag-dashboard&utm_medium=link&utm_campaign=uag-dashboard',
			);

			return $knowledgebase;
		}

		/**
		 * Is Knowledgebase.
		 *
		 * @return string
		 * @since 0.0.1
		 */
		public static function support_data() {

			$support = array(
				'enable_support' => true,
				'support_url'    => 'https://www.ultimategutenberg.com/support/?utm_source=uag-dashboard&utm_medium=link&utm_campaign=uag-dashboard',
			);

			return $support;
		}

		/**
		 * Provide Widget settings.
		 *
		 * @return array()
		 * @since 0.0.1
		 */
		public static function get_block_options() {

			$blocks       = self::$block_list;
			$saved_blocks = self::get_admin_settings_option( '_uagb_blocks' );
			if ( is_array( $blocks ) ) {
				foreach ( $blocks as $slug => $data ) {
					$_slug = str_replace( 'uagb/', '', $slug );

					if ( isset( $saved_blocks[ $_slug ] ) ) {
						if ( 'disabled' === $saved_blocks[ $_slug ] ) {
							$blocks[ $slug ]['is_activate'] = false;
						} else {
							$blocks[ $slug ]['is_activate'] = true;
						}
					} else {
						$blocks[ $slug ]['is_activate'] = ( isset( $data['default'] ) ) ? $data['default'] : false;
					}
				}
			}

			self::$block_list = $blocks;

			return apply_filters( 'uagb_enabled_blocks', self::$block_list );
		}

		/**
		 * Get Json Data.
		 *
		 * @since 1.8.1
		 * @return Array
		 */
		public static function backend_load_font_awesome_icons() {

			$json_file = UAGB_DIR . 'dist/blocks/uagb-controls/UAGBIcon.json';
			if ( ! file_exists( $json_file ) ) {
				return array();
			}

			// Function has already run.
			if ( null !== self::$icon_json ) {
				return self::$icon_json;
			}

			$str             = self::get_instance()->get_filesystem()->get_contents( $json_file );
			self::$icon_json = json_decode( $str, true );
			return self::$icon_json;
		}

		/**
		 * Generate SVG.
		 *
		 * @since 1.8.1
		 * @param  array $icon Decoded fontawesome json file data.
		 */
		public static function render_svg_html( $icon ) {
			$icon = str_replace( 'far', '', $icon );
			$icon = str_replace( 'fas', '', $icon );
			$icon = str_replace( 'fab', '', $icon );
			$icon = str_replace( 'fa-', '', $icon );
			$icon = str_replace( 'fa', '', $icon );
			$icon = sanitize_text_field( esc_attr( $icon ) );

			$json = self::backend_load_font_awesome_icons();
			$path = isset( $json[ $icon ]['svg']['brands'] ) ? $json[ $icon ]['svg']['brands']['path'] : $json[ $icon ]['svg']['solid']['path'];
			$view = isset( $json[ $icon ]['svg']['brands'] ) ? $json[ $icon ]['svg']['brands']['viewBox'] : $json[ $icon ]['svg']['solid']['viewBox'];
			if ( $view ) {
				$view = implode( ' ', $view );
			}
			?>
			<svg xmlns="https://www.w3.org/2000/svg" viewBox= "<?php echo esc_html( $view ); ?>"><path d="<?php echo esc_html( $path ); ?>"></path></svg>
			<?php
		}

		/**
		 * Returns Query.
		 *
		 * @param array  $attributes The block attributes.
		 * @param string $block_type The Block Type.
		 * @since 1.8.2
		 */
		public static function get_query( $attributes, $block_type ) {

			// Block type is grid/masonry/carousel/timeline.
			$query_args = array(
				'posts_per_page'      => ( isset( $attributes['postsToShow'] ) ) ? $attributes['postsToShow'] : 6,
				'post_status'         => 'publish',
				'post_type'           => ( isset( $attributes['postType'] ) ) ? $attributes['postType'] : 'post',
				'order'               => ( isset( $attributes['order'] ) ) ? $attributes['order'] : 'desc',
				'orderby'             => ( isset( $attributes['orderBy'] ) ) ? $attributes['orderBy'] : 'date',
				'ignore_sticky_posts' => 1,
			);

			if ( isset( $attributes['categories'] ) && '' !== $attributes['categories'] ) {
				$query_args['tax_query'][] = array(
					'taxonomy' => ( isset( $attributes['taxonomyType'] ) ) ? $attributes['taxonomyType'] : 'category',
					'field'    => 'id',
					'terms'    => $attributes['categories'],
					'operator' => 'IN',
				);
			}

			if ( isset( $attributes['postPagination'] ) && true === $attributes['postPagination'] ) {

				if ( get_query_var( 'paged' ) ) {

					$paged = get_query_var( 'paged' );

				} elseif ( get_query_var( 'page' ) ) {

					$paged = get_query_var( 'page' );

				} else {

					$paged = 1;

				}
				$query_args['posts_per_page'] = $attributes['postsToShow'];
				$query_args['paged']          = $paged;

			}

			$query_args = apply_filters( "uagb_post_query_args_{$block_type}", $query_args, $attributes );

			return new WP_Query( $query_args );
		}

		/**
		 * Get size information for all currently-registered image sizes.
		 *
		 * @global $_wp_additional_image_sizes
		 * @uses   get_intermediate_image_sizes()
		 * @link   https://codex.wordpress.org/Function_Reference/get_intermediate_image_sizes
		 * @since  1.9.0
		 * @return array $sizes Data for all currently-registered image sizes.
		 */
		public static function get_image_sizes() {

			global $_wp_additional_image_sizes;

			$sizes       = get_intermediate_image_sizes();
			$image_sizes = array();

			$image_sizes[] = array(
				'value' => 'full',
				'label' => esc_html__( 'Full', 'ultimate-addons-for-gutenberg' ),
			);

			foreach ( $sizes as $size ) {
				if ( in_array( $size, array( 'thumbnail', 'medium', 'medium_large', 'large' ), true ) ) {
					$image_sizes[] = array(
						'value' => $size,
						'label' => ucwords( trim( str_replace( array( '-', '_' ), array( ' ', ' ' ), $size ) ) ),
					);
				} else {
					$image_sizes[] = array(
						'value' => $size,
						'label' => sprintf(
							'%1$s (%2$sx%3$s)',
							ucwords( trim( str_replace( array( '-', '_' ), array( ' ', ' ' ), $size ) ) ),
							$_wp_additional_image_sizes[ $size ]['width'],
							$_wp_additional_image_sizes[ $size ]['height']
						),
					);
				}
			}

			$image_sizes = apply_filters( 'uagb_post_featured_image_sizes', $image_sizes );

			return $image_sizes;
		}

		/**
		 * Get Post Types.
		 *
		 * @since 1.11.0
		 * @access public
		 */
		public static function get_post_types() {

			$post_types = get_post_types(
				array(
					'public'       => true,
					'show_in_rest' => true,
				),
				'objects'
			);

			$options = array();

			foreach ( $post_types as $post_type ) {
				if ( 'product' === $post_type->name ) {
					continue;
				}

				if ( 'attachment' === $post_type->name ) {
					continue;
				}

				$options[] = array(
					'value' => $post_type->name,
					'label' => $post_type->label,
				);
			}

			return apply_filters( 'uagb_loop_post_types', $options );
		}

		/**
		 * Get all taxonomies.
		 *
		 * @since 1.11.0
		 * @access public
		 */
		public static function get_related_taxonomy() {

			$post_types = self::get_post_types();

			$return_array = array();

			foreach ( $post_types as $key => $value ) {
				$post_type = $value['value'];

				$taxonomies = get_object_taxonomies( $post_type, 'objects' );
				$data       = array();

				foreach ( $taxonomies as $tax_slug => $tax ) {
					if ( ! $tax->public || ! $tax->show_ui || ! $tax->show_in_rest ) {
						continue;
					}

					$data[ $tax_slug ] = $tax;

					$terms = get_terms( $tax_slug );

					$related_tax = array();

					if ( ! empty( $terms ) ) {
						foreach ( $terms as $t_index => $t_obj ) {
							$related_tax[] = array(
								'id'   => $t_obj->term_id,
								'name' => $t_obj->name,
							);
						}

						$return_array[ $post_type ]['terms'][ $tax_slug ] = $related_tax;
					}
				}

				$return_array[ $post_type ]['taxonomy'] = $data;
			}

			return apply_filters( 'uagb_post_loop_taxonomies', $return_array );
		}

		/**
		 * Get flag if more than 5 pages are build using UAG.
		 *
		 * @since  1.10.0
		 * @return boolean true/false Flag if more than 5 pages are build using UAG.
		 */
		public static function show_rating_notice() {

			$posts_created_with_uag = get_option( 'posts-created-with-uagb' );

			if ( false === $posts_created_with_uag ) {
				$query_args = array(
					'posts_per_page' => 100,
					'post_status'    => 'publish',
					'post_type'      => 'any',
				);

				$query = new WP_Query( $query_args );

				$uag_post_count = 0;

				if ( isset( $query->post_count ) && $query->post_count > 0 ) {
					foreach ( $query->posts as $key => $post ) {
						if ( $uag_post_count >= 5 ) {
							break;
						}

						if ( false !== strpos( $post->post_content, '<!-- wp:uagb/' ) ) {
							$uag_post_count++;
						}
					}
				}

				if ( $uag_post_count >= 5 ) {
					update_option( 'posts-created-with-uagb', $uag_post_count );

					$posts_created_with_uag = $uag_post_count;
				}
			}

			return ( $posts_created_with_uag >= 5 );
		}

		/**
		 *  Get - RGBA Color
		 *
		 *  Get HEX color and return RGBA. Default return RGB color.
		 *
		 * @param  var   $color      Gets the color value.
		 * @param  var   $opacity    Gets the opacity value.
		 * @param  array $is_array Gets an array of the value.
		 * @since   1.11.0
		 */
		public static function hex2rgba( $color, $opacity = false, $is_array = false ) {

			$default = $color;

			// Return default if no color provided.
			if ( empty( $color ) ) {
				return $default;
			}

			// Sanitize $color if "#" is provided.
			if ( '#' === $color[0] ) {
				$color = substr( $color, 1 );
			}

			// Check if color has 6 or 3 characters and get values.
			if ( strlen( $color ) === 6 ) {
					$hex = array( $color[0] . $color[1], $color[2] . $color[3], $color[4] . $color[5] );
			} elseif ( strlen( $color ) === 3 ) {
					$hex = array( $color[0] . $color[0], $color[1] . $color[1], $color[2] . $color[2] );
			} else {
					return $default;
			}

			// Convert hexadec to rgb.
			$rgb = array_map( 'hexdec', $hex );

			// Check if opacity is set(rgba or rgb).
			if ( false !== $opacity && '' !== $opacity ) {
				if ( abs( $opacity ) >= 1 ) {
					$opacity = $opacity / 100;
				}
				$output = 'rgba(' . implode( ',', $rgb ) . ',' . $opacity . ')';
			} else {
				$output = 'rgb(' . implode( ',', $rgb ) . ')';
			}

			if ( $is_array ) {
				return $rgb;
			} else {
				// Return rgb(a) color string.
				return $output;
			}
		}

		/**
		 *  Get Specific Stylesheet
		 *
		 * @since 1.13.4
		 */
		public static function create_specific_stylesheet() {

			$saved_blocks         = self::get_admin_settings_option( '_uagb_blocks' );
			$combined             = array();
			$is_already_post      = false;
			$is_already_timeline  = false;
			$is_already_column    = false;
			$is_already_icon_list = false;
			$is_already_button    = false;

			foreach ( UAGB_Config::$block_attributes as $key => $block ) {

				$block_name = str_replace( 'uagb/', '', $key );

				if ( isset( $saved_blocks[ $block_name ] ) && 'disabled' === $saved_blocks[ $block_name ] ) {
					continue;
				}

				switch ( $block_name ) {

					case 'post-grid':
					case 'post-carousel':
					case 'post-masonry':
						if ( ! $is_already_post ) {
							$combined[]      = 'post';
							$is_already_post = true;
						}
						break;

					case 'columns':
					case 'column':
						if ( ! $is_already_column ) {
							$combined[]        = 'column';
							$combined[]        = 'columns';
							$is_already_column = true;
						}
						break;

					case 'icon-list':
					case 'icon-list-child':
						if ( ! $is_already_icon_list ) {
							$combined[]           = 'icon-list';
							$combined[]           = 'icon-list-child';
							$is_already_icon_list = true;
						}
						break;
					case 'buttons-child':
					case 'buttons':
						if ( ! $is_already_button ) {
							$combined[]        = 'buttons';
							$combined[]        = 'buttons-child';
							$is_already_button = true;
						}
						break;

					case 'post-timeline':
					case 'content-timeline':
						if ( ! $is_already_timeline ) {
							$combined[]          = 'timeline';
							$is_already_timeline = true;
						}
						break;

					case 'restaurant-menu':
						$combined[] = 'price-list';
						break;

					default:
						$combined[] = $block_name;
						break;
				}
			}

			$combined_path = plugin_dir_path( UAGB_FILE ) . 'dist/blocks.style.css';
			wp_delete_file( $combined_path );

			$style = '';

			$wp_filesystem = self::get_instance()->get_filesystem();

			foreach ( $combined as $key => $c_block ) {
				$style .= $wp_filesystem->get_contents( plugin_dir_path( UAGB_FILE ) . 'assets/css/blocks/' . $c_block . '.css' );

			}
			$wp_filesystem->put_contents( $combined_path, $style, FS_CHMOD_FILE );
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

			$dir_name = basename( UAGB_DIR );
			if ( 'ultimate-addons-for-gutenberg' === $dir_name ) {
				$dir_name = 'uag-plugin';
			}
			// SSL workaround.
			if ( self::is_ssl() ) {
				$wp_info['baseurl'] = str_ireplace( 'http://', 'https://', $wp_info['baseurl'] );
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
		 * Checks to see if the site has SSL enabled or not.
		 *
		 * @since 1.14.0
		 * @return bool
		 */
		public static function is_ssl() {
			if (
				is_ssl() ||
				( 0 === stripos( get_option( 'siteurl' ), 'https://' ) ) ||
				( isset( $_SERVER['HTTP_X_FORWARDED_PROTO'] ) && 'https' === $_SERVER['HTTP_X_FORWARDED_PROTO'] )
			) {
				return true;
			}
			return false;
		}

		/**
		 * Returns an array of paths for the CSS and JS assets
		 * of the current post.
		 *
		 * @param  var $data    Gets the CSS\JS for the current Page.
		 * @param  var $type    Gets the CSS\JS type.
		 * @param  var $timestamp Timestamp.
		 * @since 1.14.0
		 * @return array
		 */
		public static function get_asset_info( $data, $type, $timestamp ) {

			$post_id     = get_the_ID();
			$uploads_dir = self::get_upload_dir();
			$css_suffix  = 'uag-style';
			$js_suffix   = 'uag-script';
			$info        = array();

			if ( ! empty( $data ) && 'css' === $type ) {

				$info['css']     = $uploads_dir['path'] . $css_suffix . '-' . $post_id . '-' . $timestamp . '.css';
				$info['css_url'] = $uploads_dir['url'] . $css_suffix . '-' . $post_id . '-' . $timestamp . '.css';

			} elseif ( ! empty( $data ) && 'js' === $type ) {

				$info['js']     = $uploads_dir['path'] . $js_suffix . '-' . $post_id . '-' . $timestamp . '.js';
				$info['js_url'] = $uploads_dir['url'] . $js_suffix . '-' . $post_id . '-' . $timestamp . '.js';

			}

			return $info;
		}

		/**
		 * Creates css and js files.
		 *
		 * @param  var $style_data    Gets the CSS\JS for the current Page.
		 * @param  var $type    Gets the CSS\JS type.
		 * @since  1.14.0
		 */
		public static function file_write( $style_data, $type ) {

			$post_timestamp = get_post_meta( get_the_ID(), 'uag_style_timestamp-' . $type, true );

			$var = ( 'css' === $type ) ? 'css' : 'js';

			if ( '' === $post_timestamp || false === $post_timestamp ) {
				// File not created yet.
				$date      = new DateTime();
				$timestamp = $date->getTimestamp();

				$assets_info = self::get_asset_info( $style_data, $type, $timestamp );

				if ( isset( $assets_info[ $var ] ) ) {
					// Create a new file.
					self::get_instance()->get_filesystem()->put_contents( $assets_info[ $var ], $style_data, FS_CHMOD_FILE );

					// Update the post meta.
					update_post_meta( get_the_ID(), 'uag_style_timestamp-' . $type, $timestamp );

					if ( is_array( self::$css_file_handler ) ) {
						self::$css_file_handler = array_merge( self::$css_file_handler, $assets_info );
					} else {
						self::$css_file_handler = $assets_info;
					}
				} else {
					self::$css_file_handler = $assets_info;
				}
			} else {

				// File already created.
				$timestamp   = $post_timestamp;
				$assets_info = self::get_asset_info( $style_data, $type, $timestamp );
				if ( isset( $assets_info[ $var ] ) ) {

					if ( file_exists( $assets_info[ $var ] ) ) {

						$old_data = self::get_instance()->get_filesystem()->get_contents( $assets_info[ $var ] );

						if ( $old_data !== $style_data ) {

							// File needs a change in content.
							$date            = new DateTime();
							$new_timestamp   = $date->getTimestamp();
							$new_assets_info = self::get_asset_info( $style_data, $type, $new_timestamp );

							// Create a new file.
							self::get_instance()->get_filesystem()->put_contents( $new_assets_info[ $var ], $style_data, FS_CHMOD_FILE );

							// Update the post meta.
							update_post_meta( get_the_ID(), 'uag_style_timestamp-' . $type, $new_timestamp );

							// Delete old file.
							wp_delete_file( $assets_info[ $var ] );

							if ( is_array( self::$css_file_handler ) ) {
								self::$css_file_handler = array_merge( self::$css_file_handler, $new_assets_info );
							} else {
								self::$css_file_handler = $new_assets_info;
							}
						} else {

							// Do nothing.
							if ( is_array( self::$css_file_handler ) ) {
								self::$css_file_handler = array_merge( self::$css_file_handler, $assets_info );
							} else {
								self::$css_file_handler = $assets_info;
							}
						}
					} else {
						self::$css_file_handler = $assets_info;
					}
				} else {
					self::$css_file_handler = $assets_info;
				}
			}
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
		 * Gives the paged Query var.
		 *
		 * @param Object $query Query.
		 * @return int $paged Paged Query var.
		 * @since 1.14.9
		 */
		public static function get_paged( $query ) {

			global $paged;

			// Check the 'paged' query var.
			$paged_qv = $query->get( 'paged' );

			if ( is_numeric( $paged_qv ) ) {
				return $paged_qv;
			}

			// Check the 'page' query var.
			$page_qv = $query->get( 'page' );

			if ( is_numeric( $page_qv ) ) {
				return $page_qv;
			}

			// Check the $paged global?
			if ( is_numeric( $paged ) ) {
				return $paged;
			}

			return 0;
		}
		/**
		 * Builds the base url.
		 *
		 * @param string $permalink_structure Premalink Structure.
		 * @param string $base Base.
		 * @since 1.14.9
		 */
		public static function build_base_url( $permalink_structure, $base ) {
			// Check to see if we are using pretty permalinks.
			if ( ! empty( $permalink_structure ) ) {

				if ( strrpos( $base, 'paged-' ) ) {
					$base = substr_replace( $base, '', strrpos( $base, 'paged-' ), strlen( $base ) );
				}

				// Remove query string from base URL since paginate_links() adds it automatically.
				// This should also fix the WPML pagination issue that was added since 1.10.2.
				if ( count( $_GET ) > 0 ) { // phpcs:ignore WordPress.Security.NonceVerification.Recommended
					$base = strtok( $base, '?' );
				}

				// Add trailing slash when necessary.
				if ( '/' === substr( $permalink_structure, -1 ) ) {
					$base = trailingslashit( $base );
				} else {
					$base = untrailingslashit( $base );
				}
			} else {
				$url_params = wp_parse_url( $base, PHP_URL_QUERY );

				if ( empty( $url_params ) ) {
					$base = trailingslashit( $base );
				}
			}

			return $base;
		}
		/**
		 * Returns the Paged Format.
		 *
		 * @param string $permalink_structure Premalink Structure.
		 * @param string $base Base.
		 * @since 1.14.9
		 */
		public static function paged_format( $permalink_structure, $base ) {

			$page_prefix = empty( $permalink_structure ) ? 'paged' : 'page';

			if ( ! empty( $permalink_structure ) ) {
				$format  = substr( $base, -1 ) !== '/' ? '/' : '';
				$format .= $page_prefix . '/';
				$format .= '%#%';
				$format .= substr( $permalink_structure, -1 ) === '/' ? '/' : '';
			} elseif ( empty( $permalink_structure ) || is_search() ) {
				$parse_url = wp_parse_url( $base, PHP_URL_QUERY );
				$format    = empty( $parse_url ) ? '?' : '&';
				$format   .= $page_prefix . '=%#%';
			}

			return $format;
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
	}

	/**
	 *  Prepare if class 'UAGB_Helper' exist.
	 *  Kicking this off by calling 'get_instance()' method
	 */
	UAGB_Helper::get_instance();
}
