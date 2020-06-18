<?php
/**
 * UAGB Block Helper.
 *
 * @package UAGB
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

if ( ! class_exists( 'UAGB_Block_JS' ) ) {

	/**
	 * Class UAGB_Block_JS.
	 */
	class UAGB_Block_JS {

		/**
		 * Get Testimonial Js
		 *
		 * @since 1.6.0
		 * @param array  $attr The block attributes.
		 * @param string $id The selector ID.
		 */
		public static function get_testimonial_js( $attr, $id ) {

			$defaults = UAGB_Helper::$block_list['uagb/testimonial']['attributes'];

			$attr = array_merge( $defaults, (array) $attr );

			$dots   = ( 'dots' === $attr['arrowDots'] || 'arrowDots' === $attr['arrowDots'] ) ? true : false;
			$arrows = ( 'arrows' === $attr['arrowDots'] || 'arrowDots' === $attr['arrowDots'] ) ? true : false;

			$slick_options = apply_filters(
				'uagb_testimonials_slick_options',
				array(
					'slidesToShow'   => $attr['columns'],
					'slidesToScroll' => 1,
					'autoplaySpeed'  => $attr['autoplaySpeed'],
					'autoplay'       => $attr['autoplay'],
					'infinite'       => $attr['infiniteLoop'],
					'pauseOnHover'   => $attr['pauseOnHover'],
					'speed'          => $attr['transitionSpeed'],
					'arrows'         => $arrows,
					'dots'           => $dots,
					'rtl'            => false,
					'prevArrow'      => '<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button" style="border-color: ' . $attr['arrowColor'] . ';border-radius:' . $attr['arrowBorderRadius'] . 'px;border-width:' . $attr['arrowBorderSize'] . 'px"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512" height ="' . $attr['arrowSize'] . '" width = "' . $attr['arrowSize'] . '" fill ="' . $attr['arrowColor'] . '"  ><path d="M31.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L127.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L201.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34z"></path></svg></button>',
					'nextArrow'      => '<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button" style="border-color: ' . $attr['arrowColor'] . ';border-radius:' . $attr['arrowBorderRadius'] . 'px;border-width:' . $attr['arrowBorderSize'] . 'px"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512" height ="' . $attr['arrowSize'] . '" width = "' . $attr['arrowSize'] . '" fill ="' . $attr['arrowColor'] . '" ><path d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z"></path></svg></button>',
					'responsive'     => array(
						array(
							'breakpoint' => 1024,
							'settings'   => array(
								'slidesToShow'   => $attr['tcolumns'],
								'slidesToScroll' => 1,
							),
						),
						array(
							'breakpoint' => 767,
							'settings'   => array(
								'slidesToShow'   => $attr['mcolumns'],
								'slidesToScroll' => 1,
							),
						),
					),
				),
				$id
			);

			$settings      = wp_json_encode( $slick_options );
			$base_selector = ( isset( $attr['classMigrate'] ) && $attr['classMigrate'] ) ? '.uagb-block-' : '#uagb-testimonial-';
			$selector      = $base_selector . $id;
			$js            = '$( document ).ready( function() { if( $( "' . $selector . '" ).length > 0 ){ $( "' . $selector . '" ).find( ".is-carousel" ).slick( ' . $settings . ' ); } } );';

			return $js;

		}

		/**
		 * Get Blockquote Js
		 *
		 * @since 1.8.2
		 * @param array  $attr The block attributes.
		 * @param string $id The selector ID.
		 */
		public static function get_blockquote_js( $attr, $id ) {

			$defaults = UAGB_Helper::$block_list['uagb/blockquote']['attributes'];

			$attr = array_merge( $defaults, (array) $attr );

			$target = $attr['iconTargetUrl'];

			$url = '';

			if ( 'current' === $target ) {
				global $wp;
				$url = home_url( add_query_arg( array(), $wp->request ) );
			} else {
				$url = $attr['customUrl'];
			}

			$via = isset( $attr['iconShareVia'] ) ? $attr['iconShareVia'] : '';

			$base_selector = ( isset( $attr['classMigrate'] ) && $attr['classMigrate'] ) ? '.uagb-block-' : '#uagb-blockquote-';
			$selector      = $base_selector . $id;

			$js = 'jQuery( "' . $selector . '" ).find( ".uagb-blockquote__tweet-button" ).click(function(){ var content = jQuery("' . $selector . '").find(".uagb-blockquote__content").text(); var request_url = "https://twitter.com/share?url="+ encodeURIComponent("' . $url . '")+"&text="+content+"&via="+("' . $via . '"); window.open( request_url ); });';

			return $js;

		}

		/**
		 * Get Social Share JS
		 *
		 * @since 1.8.1
		 * @param string $attr The block attributes.
		 * @param string $id The selector ID.
		 */
		public static function get_social_share_js( $attr, $id ) {

			$base_selector = ( isset( $attr['classMigrate'] ) && $attr['classMigrate'] ) ? '.uagb-block-' : '#uagb-social-share-';
			$selector      = $base_selector . $id;
			ob_start();
			?>
			var ssLinks = document.querySelectorAll( '<?php echo esc_attr( $selector ); ?>' );
			for ( var j = 0; j < ssLinks.length; j++ ) {
				var ssLink = ssLinks[j].querySelectorAll( ".uagb-ss__link" );
				for ( var i = 0; i < ssLink.length; i++ ) {
					ssLink[i].addEventListener( "click", function() {
						var social_url = this.dataset.href;
						var target = "";
						if( social_url == "mailto:?body=" ) {
							target = "_self";
						}
						var request_url = social_url + window.location.href;
						window.open( request_url, target );
					});
				}
			}
			<?php
			return ob_get_clean();
		}

		/**
		 * Get Table of Contents Js
		 *
		 * @since 1.13.0
		 * @param array  $attr The block attributes.
		 * @param string $id The selector ID.
		 */
		public static function get_table_of_contents_js( $attr, $id ) {

			$defaults = UAGB_Helper::$block_list['uagb/table-of-contents']['attributes'];

			$attr          = array_merge( $defaults, (array) $attr );
			$base_selector = ( isset( $attr['classMigrate'] ) && $attr['classMigrate'] ) ? '.uagb-block-' : '#uagb-toc-';
			$selector      = $base_selector . $id;

			ob_start();
			?>
			jQuery( document ).ready(function() {
				UAGBTableOfContents._run( <?php echo wp_json_encode( $attr ); ?>, '<?php echo esc_attr( $selector ); ?>' );
			});
			<?php
			return ob_get_clean();

		}


		/**
		 * Get Inline Notice Js
		 *
		 * @since 1.16.0
		 * @param array  $attr The block attributes.
		 * @param string $id The selector ID.
		 */
		public static function get_inline_notice_js( $attr, $id ) {

			$defaults = UAGB_Helper::$block_list['uagb/inline-notice']['attributes'];

			$attr          = array_merge( $defaults, (array) $attr );
			$base_selector = '.uagb-block-';
			$selector      = $base_selector . $id;
			$js_attr       = array(
				'c_id'              => $attr['c_id'],
				'cookies'           => $attr['cookies'],
				'close_cookie_days' => $attr['close_cookie_days'],
				'noticeDismiss'     => $attr['noticeDismiss'],
			);

			ob_start();
			?>
			jQuery( document ).ready(function() {
				UAGBInlineNotice._run( <?php echo wp_json_encode( $js_attr ); ?>, '<?php echo esc_attr( $selector ); ?>' );
			});
			<?php
			return ob_get_clean();

		}

		/**
		 * Adds Google fonts for Advanced Heading block.
		 *
		 * @since 1.9.1
		 * @param array $attr the blocks attr.
		 */
		public static function blocks_advanced_heading_gfont( $attr ) {

			$head_load_google_font = isset( $attr['headLoadGoogleFonts'] ) ? $attr['headLoadGoogleFonts'] : '';
			$head_font_family      = isset( $attr['headFontFamily'] ) ? $attr['headFontFamily'] : '';
			$head_font_weight      = isset( $attr['headFontWeight'] ) ? $attr['headFontWeight'] : '';
			$head_font_subset      = isset( $attr['headFontSubset'] ) ? $attr['headFontSubset'] : '';

			$subhead_load_google_font = isset( $attr['subHeadLoadGoogleFonts'] ) ? $attr['subHeadLoadGoogleFonts'] : '';
			$subhead_font_family      = isset( $attr['subHeadFontFamily'] ) ? $attr['subHeadFontFamily'] : '';
			$subhead_font_weight      = isset( $attr['subHeadFontWeight'] ) ? $attr['subHeadFontWeight'] : '';
			$subhead_font_subset      = isset( $attr['subHeadFontSubset'] ) ? $attr['subHeadFontSubset'] : '';

			UAGB_Helper::blocks_google_font( $head_load_google_font, $head_font_family, $head_font_weight, $head_font_subset );
			UAGB_Helper::blocks_google_font( $subhead_load_google_font, $subhead_font_family, $subhead_font_weight, $subhead_font_subset );
		}

		/**
		 * Adds Google fonts for How To block.
		 *
		 * @since 1.15.0
		 * @param array $attr the blocks attr.
		 */
		public static function blocks_how_to_gfont( $attr ) {

			$head_load_google_font = isset( $attr['headLoadGoogleFonts'] ) ? $attr['headLoadGoogleFonts'] : '';
			$head_font_family      = isset( $attr['headFontFamily'] ) ? $attr['headFontFamily'] : '';
			$head_font_weight      = isset( $attr['headFontWeight'] ) ? $attr['headFontWeight'] : '';
			$head_font_subset      = isset( $attr['headFontSubset'] ) ? $attr['headFontSubset'] : '';

			$subhead_load_google_font = isset( $attr['subHeadLoadGoogleFonts'] ) ? $attr['subHeadLoadGoogleFonts'] : '';
			$subhead_font_family      = isset( $attr['subHeadFontFamily'] ) ? $attr['subHeadFontFamily'] : '';
			$subhead_font_weight      = isset( $attr['subHeadFontWeight'] ) ? $attr['subHeadFontWeight'] : '';
			$subhead_font_subset      = isset( $attr['subHeadFontSubset'] ) ? $attr['subHeadFontSubset'] : '';

			$price_load_google_font = isset( $attr['priceLoadGoogleFonts'] ) ? $attr['priceLoadGoogleFonts'] : '';
			$price_font_family      = isset( $attr['priceFontFamily'] ) ? $attr['priceFontFamily'] : '';
			$price_font_weight      = isset( $attr['priceFontWeight'] ) ? $attr['priceFontWeight'] : '';
			$price_font_subset      = isset( $attr['priceFontSubset'] ) ? $attr['priceFontSubset'] : '';

			UAGB_Helper::blocks_google_font( $head_load_google_font, $head_font_family, $head_font_weight, $head_font_subset );
			UAGB_Helper::blocks_google_font( $subhead_load_google_font, $subhead_font_family, $subhead_font_weight, $subhead_font_subset );
			UAGB_Helper::blocks_google_font( $price_load_google_font, $price_font_family, $price_font_weight, $price_font_subset );
		}

		/**
		 * Adds Google fonts for Inline Notice block.
		 *
		 * @since 1.16.0
		 * @param array $attr the blocks attr.
		 */
		public static function blocks_inline_notice_gfont( $attr ) {

			$title_load_google_font = isset( $attr['titleLoadGoogleFonts'] ) ? $attr['titleLoadGoogleFonts'] : '';
			$title_font_family      = isset( $attr['titleFontFamily'] ) ? $attr['titleFontFamily'] : '';
			$title_font_weight      = isset( $attr['titleFontWeight'] ) ? $attr['titleFontWeight'] : '';
			$title_font_subset      = isset( $attr['titleFontSubset'] ) ? $attr['titleFontSubset'] : '';

			$desc_load_google_font = isset( $attr['descLoadGoogleFonts'] ) ? $attr['descLoadGoogleFonts'] : '';
			$desc_font_family      = isset( $attr['descFontFamily'] ) ? $attr['descFontFamily'] : '';
			$desc_font_weight      = isset( $attr['descFontWeight'] ) ? $attr['descFontWeight'] : '';
			$desc_font_subset      = isset( $attr['descFontSubset'] ) ? $attr['descFontSubset'] : '';

			UAGB_Helper::blocks_google_font( $title_load_google_font, $title_font_family, $title_font_weight, $title_font_subset );
			UAGB_Helper::blocks_google_font( $desc_load_google_font, $desc_font_family, $desc_font_weight, $desc_font_subset );
		}

		/**
		 * Adds Google fonts for CF7 Styler block.
		 *
		 * @since 1.10.0
		 * @param array $attr the blocks attr.
		 */
		public static function blocks_cf7_styler_gfont( $attr ) {

			$label_load_google_font = isset( $attr['labelLoadGoogleFonts'] ) ? $attr['labelLoadGoogleFonts'] : '';
			$label_font_family      = isset( $attr['labelFontFamily'] ) ? $attr['labelFontFamily'] : '';
			$label_font_weight      = isset( $attr['labelFontWeight'] ) ? $attr['labelFontWeight'] : '';
			$label_font_subset      = isset( $attr['labelFontSubset'] ) ? $attr['labelFontSubset'] : '';

			$input_load_google_font = isset( $attr['inputLoadGoogleFonts'] ) ? $attr['inputLoadGoogleFonts'] : '';
			$input_font_family      = isset( $attr['inputFontFamily'] ) ? $attr['inputFontFamily'] : '';
			$input_font_weight      = isset( $attr['inputFontWeight'] ) ? $attr['inputFontWeight'] : '';
			$input_font_subset      = isset( $attr['inputFontSubset'] ) ? $attr['inputFontSubset'] : '';

			$radio_check_load_google_font = isset( $attr['radioCheckLoadGoogleFonts'] ) ? $attr['radioCheckLoadGoogleFonts'] : '';
			$radio_check_font_family      = isset( $attr['radioCheckFontFamily'] ) ? $attr['radioCheckFontFamily'] : '';
			$radio_check_font_weight      = isset( $attr['radioCheckFontWeight'] ) ? $attr['radioCheckFontWeight'] : '';
			$radio_check_font_subset      = isset( $attr['radioCheckFontSubset'] ) ? $attr['radioCheckFontSubset'] : '';

			$button_load_google_font = isset( $attr['buttonLoadGoogleFonts'] ) ? $attr['buttonLoadGoogleFonts'] : '';
			$button_font_family      = isset( $attr['buttonFontFamily'] ) ? $attr['buttonFontFamily'] : '';
			$button_font_weight      = isset( $attr['buttonFontWeight'] ) ? $attr['buttonFontWeight'] : '';
			$button_font_subset      = isset( $attr['buttonFontSubset'] ) ? $attr['buttonFontSubset'] : '';

			$msg_font_load_google_font = isset( $attr['msgLoadGoogleFonts'] ) ? $attr['msgLoadGoogleFonts'] : '';
			$msg_font_family           = isset( $attr['msgFontFamily'] ) ? $attr['msgFontFamily'] : '';
			$msg_font_weight           = isset( $attr['msgFontWeight'] ) ? $attr['msgFontWeight'] : '';
			$msg_font_subset           = isset( $attr['msgFontSubset'] ) ? $attr['msgFontSubset'] : '';

			$validation_msg_load_google_font = isset( $attr['validationMsgLoadGoogleFonts'] ) ? $attr['validationMsgLoadGoogleFonts'] : '';
			$validation_msg_font_family      = isset( $attr['validationMsgFontFamily'] ) ? $attr['validationMsgFontFamily'] : '';
			$validation_msg_font_weight      = isset( $attr['validationMsgFontWeight'] ) ? $attr['validationMsgFontWeight'] : '';
			$validation_msg_font_subset      = isset( $attr['validationMsgFontSubset'] ) ? $attr['validationMsgFontSubset'] : '';

			UAGB_Helper::blocks_google_font( $msg_font_load_google_font, $msg_font_family, $msg_font_weight, $msg_font_subset );
			UAGB_Helper::blocks_google_font( $validation_msg_load_google_font, $validation_msg_font_family, $validation_msg_font_weight, $validation_msg_font_subset );

			UAGB_Helper::blocks_google_font( $radio_check_load_google_font, $radio_check_font_family, $radio_check_font_weight, $radio_check_font_subset );
			UAGB_Helper::blocks_google_font( $button_load_google_font, $button_font_family, $button_font_weight, $button_font_subset );

			UAGB_Helper::blocks_google_font( $label_load_google_font, $label_font_family, $label_font_weight, $label_font_subset );
			UAGB_Helper::blocks_google_font( $input_load_google_font, $input_font_family, $input_font_weight, $input_font_subset );
		}


		/**
		 * Adds Google fonts for Gravity Form Styler block.
		 *
		 * @since 1.12.0
		 * @param array $attr the blocks attr.
		 */
		public static function blocks_gf_styler_gfont( $attr ) {

			$label_load_google_font = isset( $attr['labelLoadGoogleFonts'] ) ? $attr['labelLoadGoogleFonts'] : '';
			$label_font_family      = isset( $attr['labelFontFamily'] ) ? $attr['labelFontFamily'] : '';
			$label_font_weight      = isset( $attr['labelFontWeight'] ) ? $attr['labelFontWeight'] : '';
			$label_font_subset      = isset( $attr['labelFontSubset'] ) ? $attr['labelFontSubset'] : '';

			$input_load_google_font = isset( $attr['inputLoadGoogleFonts'] ) ? $attr['inputLoadGoogleFonts'] : '';
			$input_font_family      = isset( $attr['inputFontFamily'] ) ? $attr['inputFontFamily'] : '';
			$input_font_weight      = isset( $attr['inputFontWeight'] ) ? $attr['inputFontWeight'] : '';
			$input_font_subset      = isset( $attr['inputFontSubset'] ) ? $attr['inputFontSubset'] : '';

			$radio_check_load_google_font = isset( $attr['radioCheckLoadGoogleFonts'] ) ? $attr['radioCheckLoadGoogleFonts'] : '';
			$radio_check_font_family      = isset( $attr['radioCheckFontFamily'] ) ? $attr['radioCheckFontFamily'] : '';
			$radio_check_font_weight      = isset( $attr['radioCheckFontWeight'] ) ? $attr['radioCheckFontWeight'] : '';
			$radio_check_font_subset      = isset( $attr['radioCheckFontSubset'] ) ? $attr['radioCheckFontSubset'] : '';

			$button_load_google_font = isset( $attr['buttonLoadGoogleFonts'] ) ? $attr['buttonLoadGoogleFonts'] : '';
			$button_font_family      = isset( $attr['buttonFontFamily'] ) ? $attr['buttonFontFamily'] : '';
			$button_font_weight      = isset( $attr['buttonFontWeight'] ) ? $attr['buttonFontWeight'] : '';
			$button_font_subset      = isset( $attr['buttonFontSubset'] ) ? $attr['buttonFontSubset'] : '';

			$msg_font_load_google_font = isset( $attr['msgLoadGoogleFonts'] ) ? $attr['msgLoadGoogleFonts'] : '';
			$msg_font_family           = isset( $attr['msgFontFamily'] ) ? $attr['msgFontFamily'] : '';
			$msg_font_weight           = isset( $attr['msgFontWeight'] ) ? $attr['msgFontWeight'] : '';
			$msg_font_subset           = isset( $attr['msgFontSubset'] ) ? $attr['msgFontSubset'] : '';

			$validation_msg_load_google_font = isset( $attr['validationMsgLoadGoogleFonts'] ) ? $attr['validationMsgLoadGoogleFonts'] : '';
			$validation_msg_font_family      = isset( $attr['validationMsgFontFamily'] ) ? $attr['validationMsgFontFamily'] : '';
			$validation_msg_font_weight      = isset( $attr['validationMsgFontWeight'] ) ? $attr['validationMsgFontWeight'] : '';
			$validation_msg_font_subset      = isset( $attr['validationMsgFontSubset'] ) ? $attr['validationMsgFontSubset'] : '';

			UAGB_Helper::blocks_google_font( $msg_font_load_google_font, $msg_font_family, $msg_font_weight, $msg_font_subset );
			UAGB_Helper::blocks_google_font( $validation_msg_load_google_font, $validation_msg_font_family, $validation_msg_font_weight, $validation_msg_font_subset );

			UAGB_Helper::blocks_google_font( $radio_check_load_google_font, $radio_check_font_family, $radio_check_font_weight, $radio_check_font_subset );
			UAGB_Helper::blocks_google_font( $button_load_google_font, $button_font_family, $button_font_weight, $button_font_subset );

			UAGB_Helper::blocks_google_font( $label_load_google_font, $label_font_family, $label_font_weight, $label_font_subset );
			UAGB_Helper::blocks_google_font( $input_load_google_font, $input_font_family, $input_font_weight, $input_font_subset );
		}

		/**
		 * Adds Google fonts for Marketing Button block.
		 *
		 * @since 1.11.0
		 * @param array $attr the blocks attr.
		 */
		public static function blocks_marketing_btn_gfont( $attr ) {

			$title_load_google_font = isset( $attr['titleLoadGoogleFonts'] ) ? $attr['titleLoadGoogleFonts'] : '';
			$title_font_family      = isset( $attr['titleFontFamily'] ) ? $attr['titleFontFamily'] : '';
			$title_font_weight      = isset( $attr['titleFontWeight'] ) ? $attr['titleFontWeight'] : '';
			$title_font_subset      = isset( $attr['titleFontSubset'] ) ? $attr['titleFontSubset'] : '';

			$prefix_load_google_font = isset( $attr['prefixLoadGoogleFonts'] ) ? $attr['prefixLoadGoogleFonts'] : '';
			$prefix_font_family      = isset( $attr['prefixFontFamily'] ) ? $attr['prefixFontFamily'] : '';
			$prefix_font_weight      = isset( $attr['prefixFontWeight'] ) ? $attr['prefixFontWeight'] : '';
			$prefix_font_subset      = isset( $attr['prefixFontSubset'] ) ? $attr['prefixFontSubset'] : '';

			UAGB_Helper::blocks_google_font( $title_load_google_font, $title_font_family, $title_font_weight, $title_font_subset );
			UAGB_Helper::blocks_google_font( $prefix_load_google_font, $prefix_font_family, $prefix_font_weight, $prefix_font_subset );
		}

		/**
		 * Adds Google fonts for Table Of Contents block.
		 *
		 * @since 1.13.0
		 * @param array $attr the blocks attr.
		 */
		public static function blocks_table_of_contents_gfont( $attr ) {
			$load_google_font         = isset( $attr['loadGoogleFonts'] ) ? $attr['loadGoogleFonts'] : '';
			$font_family              = isset( $attr['fontFamily'] ) ? $attr['fontFamily'] : '';
			$font_weight              = isset( $attr['fontWeight'] ) ? $attr['fontWeight'] : '';
			$font_subset              = isset( $attr['fontSubset'] ) ? $attr['fontSubset'] : '';
			$heading_load_google_font = isset( $attr['headingLoadGoogleFonts'] ) ? $attr['headingLoadGoogleFonts'] : '';
			$heading_font_family      = isset( $attr['headingFontFamily'] ) ? $attr['headingFontFamily'] : '';
			$heading_font_weight      = isset( $attr['headingFontWeight'] ) ? $attr['headingFontWeight'] : '';
			$heading_font_subset      = isset( $attr['headingFontSubset'] ) ? $attr['headingFontSubset'] : '';
			UAGB_Helper::blocks_google_font( $load_google_font, $font_family, $font_weight, $font_subset );
			UAGB_Helper::blocks_google_font( $heading_load_google_font, $heading_font_family, $heading_font_weight, $heading_font_subset );
		}

		/**
		 * Adds Google fonts for Blockquote.
		 *
		 * @since 1.9.1
		 * @param array $attr the blocks attr.
		 */
		public static function blocks_blockquote_gfont( $attr ) {

			$desc_load_google_font = isset( $attr['descLoadGoogleFonts'] ) ? $attr['descLoadGoogleFonts'] : '';
			$desc_font_family      = isset( $attr['descFontFamily'] ) ? $attr['descFontFamily'] : '';
			$desc_font_weight      = isset( $attr['descFontWeight'] ) ? $attr['descFontWeight'] : '';
			$desc_font_subset      = isset( $attr['descFontSubset'] ) ? $attr['descFontSubset'] : '';

			$author_load_google_font = isset( $attr['authorLoadGoogleFonts'] ) ? $attr['authorLoadGoogleFonts'] : '';
			$author_font_family      = isset( $attr['authorFontFamily'] ) ? $attr['authorFontFamily'] : '';
			$author_font_weight      = isset( $attr['authorFontWeight'] ) ? $attr['authorFontWeight'] : '';
			$author_font_subset      = isset( $attr['authorFontSubset'] ) ? $attr['authorFontSubset'] : '';

			$tweet_btn_load_google_font = isset( $attr['tweetBtnLoadGoogleFonts'] ) ? $attr['tweetBtnLoadGoogleFonts'] : '';
			$tweet_btn_font_family      = isset( $attr['tweetBtnFontFamily'] ) ? $attr['tweetBtnFontFamily'] : '';
			$tweet_btn_font_weight      = isset( $attr['tweetBtnFontWeight'] ) ? $attr['tweetBtnFontWeight'] : '';
			$tweet_btn_font_subset      = isset( $attr['tweetBtnFontSubset'] ) ? $attr['tweetBtnFontSubset'] : '';

			UAGB_Helper::blocks_google_font( $desc_load_google_font, $desc_font_family, $desc_font_weight, $desc_font_subset );
			UAGB_Helper::blocks_google_font( $author_load_google_font, $author_font_family, $author_font_weight, $author_font_subset );
			UAGB_Helper::blocks_google_font( $tweet_btn_load_google_font, $tweet_btn_font_family, $tweet_btn_font_weight, $tweet_btn_font_subset );
		}

		/**
		 * Adds Google fonts for Testimonial block.
		 *
		 * @since 1.9.1
		 * @param array $attr the blocks attr.
		 */
		public static function blocks_testimonial_gfont( $attr ) {
			$desc_load_google_fonts = isset( $attr['descLoadGoogleFonts'] ) ? $attr['descLoadGoogleFonts'] : '';
			$desc_font_family       = isset( $attr['descFontFamily'] ) ? $attr['descFontFamily'] : '';
			$desc_font_weight       = isset( $attr['descFontWeight'] ) ? $attr['descFontWeight'] : '';
			$desc_font_subset       = isset( $attr['descFontSubset'] ) ? $attr['descFontSubset'] : '';

			$name_load_google_fonts = isset( $attr['nameLoadGoogleFonts'] ) ? $attr['nameLoadGoogleFonts'] : '';
			$name_font_family       = isset( $attr['nameFontFamily'] ) ? $attr['nameFontFamily'] : '';
			$name_font_weight       = isset( $attr['nameFontWeight'] ) ? $attr['nameFontWeight'] : '';
			$name_font_subset       = isset( $attr['nameFontSubset'] ) ? $attr['nameFontSubset'] : '';

			$company_load_google_fonts = isset( $attr['companyLoadGoogleFonts'] ) ? $attr['companyLoadGoogleFonts'] : '';
			$company_font_family       = isset( $attr['companyFontFamily'] ) ? $attr['companyFontFamily'] : '';
			$company_font_weight       = isset( $attr['companyFontWeight'] ) ? $attr['companyFontWeight'] : '';
			$company_font_subset       = isset( $attr['companyFontSubset'] ) ? $attr['companyFontSubset'] : '';

			UAGB_Helper::blocks_google_font( $desc_load_google_fonts, $desc_font_family, $desc_font_weight, $desc_font_subset );
			UAGB_Helper::blocks_google_font( $name_load_google_fonts, $name_font_family, $name_font_weight, $name_font_subset );
			UAGB_Helper::blocks_google_font( $company_load_google_fonts, $company_font_family, $company_font_weight, $company_font_subset );
		}

		/**
		 * Adds Google fonts for Advanced Heading block.
		 *
		 * @since 1.9.1
		 * @param array $attr the blocks attr.
		 */
		public static function blocks_team_gfont( $attr ) {

			$title_load_google_font = isset( $attr['titleLoadGoogleFonts'] ) ? $attr['titleLoadGoogleFonts'] : '';
			$title_font_family      = isset( $attr['titleFontFamily'] ) ? $attr['titleFontFamily'] : '';
			$title_font_weight      = isset( $attr['titleFontWeight'] ) ? $attr['titleFontWeight'] : '';
			$title_font_subset      = isset( $attr['titleFontSubset'] ) ? $attr['titleFontSubset'] : '';

			$prefix_load_google_font = isset( $attr['prefixLoadGoogleFonts'] ) ? $attr['prefixLoadGoogleFonts'] : '';
			$prefix_font_family      = isset( $attr['prefixFontFamily'] ) ? $attr['prefixFontFamily'] : '';
			$prefix_font_weight      = isset( $attr['prefixFontWeight'] ) ? $attr['prefixFontWeight'] : '';
			$prefix_font_subset      = isset( $attr['prefixFontSubset'] ) ? $attr['prefixFontSubset'] : '';

			$desc_load_google_font = isset( $attr['descLoadGoogleFonts'] ) ? $attr['descLoadGoogleFonts'] : '';
			$desc_font_family      = isset( $attr['descFontFamily'] ) ? $attr['descFontFamily'] : '';
			$desc_font_weight      = isset( $attr['descFontWeight'] ) ? $attr['descFontWeight'] : '';
			$desc_font_subset      = isset( $attr['descFontSubset'] ) ? $attr['descFontSubset'] : '';

			UAGB_Helper::blocks_google_font( $title_load_google_font, $title_font_family, $title_font_weight, $title_font_subset );
			UAGB_Helper::blocks_google_font( $prefix_load_google_font, $prefix_font_family, $prefix_font_weight, $prefix_font_subset );
			UAGB_Helper::blocks_google_font( $desc_load_google_font, $desc_font_family, $desc_font_weight, $desc_font_subset );
		}

		/**
		 *
		 * Adds Google fonts for Restaurant Menu block.
		 *
		 * @since 1.9.1
		 * @param array $attr the blocks attr.
		 */
		public static function blocks_restaurant_menu_gfont( $attr ) {
			$title_load_google_fonts = isset( $attr['titleLoadGoogleFonts'] ) ? $attr['titleLoadGoogleFonts'] : '';
			$title_font_family       = isset( $attr['titleFontFamily'] ) ? $attr['titleFontFamily'] : '';
			$title_font_weight       = isset( $attr['titleFontWeight'] ) ? $attr['titleFontWeight'] : '';
			$title_font_subset       = isset( $attr['titleFontSubset'] ) ? $attr['titleFontSubset'] : '';

			$price_load_google_fonts = isset( $attr['priceLoadGoogleFonts'] ) ? $attr['priceLoadGoogleFonts'] : '';
			$price_font_family       = isset( $attr['priceFontFamily'] ) ? $attr['priceFontFamily'] : '';
			$price_font_weight       = isset( $attr['priceFontWeight'] ) ? $attr['priceFontWeight'] : '';
			$price_font_subset       = isset( $attr['priceFontSubset'] ) ? $attr['priceFontSubset'] : '';

			$desc_load_google_fonts = isset( $attr['descLoadGoogleFonts'] ) ? $attr['descLoadGoogleFonts'] : '';
			$desc_font_family       = isset( $attr['descFontFamily'] ) ? $attr['descFontFamily'] : '';
			$desc_font_weight       = isset( $attr['descFontWeight'] ) ? $attr['descFontWeight'] : '';
			$desc_font_subset       = isset( $attr['descFontSubset'] ) ? $attr['descFontSubset'] : '';

			UAGB_Helper::blocks_google_font( $title_load_google_fonts, $title_font_family, $title_font_weight, $title_font_subset );
			UAGB_Helper::blocks_google_font( $price_load_google_fonts, $price_font_family, $price_font_weight, $price_font_subset );
			UAGB_Helper::blocks_google_font( $desc_load_google_fonts, $desc_font_family, $desc_font_weight, $desc_font_subset );
		}

		/**
		 * Adds Google fonts for Content Timeline block.
		 *
		 * @since 1.9.1
		 * @param array $attr the blocks attr.
		 */
		public static function blocks_content_timeline_gfont( $attr ) {
			$head_load_google_fonts = isset( $attr['headLoadGoogleFonts'] ) ? $attr['headLoadGoogleFonts'] : '';
			$head_font_family       = isset( $attr['headFontFamily'] ) ? $attr['headFontFamily'] : '';
			$head_font_weight       = isset( $attr['headFontWeight'] ) ? $attr['headFontWeight'] : '';
			$head_font_subset       = isset( $attr['headFontSubset'] ) ? $attr['headFontSubset'] : '';

			$subheadload_google_fonts = isset( $attr['subHeadLoadGoogleFonts'] ) ? $attr['subHeadLoadGoogleFonts'] : '';
			$subheadfont_family       = isset( $attr['subHeadFontFamily'] ) ? $attr['subHeadFontFamily'] : '';
			$subheadfont_weight       = isset( $attr['subHeadFontWeight'] ) ? $attr['subHeadFontWeight'] : '';
			$subheadfont_subset       = isset( $attr['subHeadFontSubset'] ) ? $attr['subHeadFontSubset'] : '';

			$date_load_google_fonts = isset( $attr['dateLoadGoogleFonts'] ) ? $attr['dateLoadGoogleFonts'] : '';
			$date_font_family       = isset( $attr['dateFontFamily'] ) ? $attr['dateFontFamily'] : '';
			$date_font_weight       = isset( $attr['dateFontWeight'] ) ? $attr['dateFontWeight'] : '';
			$date_font_subset       = isset( $attr['dateFontSubset'] ) ? $attr['dateFontSubset'] : '';

			UAGB_Helper::blocks_google_font( $head_load_google_fonts, $head_font_family, $head_font_weight, $head_font_subset );
			UAGB_Helper::blocks_google_font( $subheadload_google_fonts, $subheadfont_family, $subheadfont_weight, $subheadfont_subset );
			UAGB_Helper::blocks_google_font( $date_load_google_fonts, $date_font_family, $date_font_weight, $date_font_subset );
		}

		/**
		 * Adds Google fonts for Post Timeline block.
		 *
		 * @since 1.9.1
		 * @param array $attr the blocks attr.
		 */
		public static function blocks_post_timeline_gfont( $attr ) {
			self::blocks_content_timeline_gfont( $attr );

			$author_load_google_fonts = isset( $attr['authorLoadGoogleFonts'] ) ? $attr['authorLoadGoogleFonts'] : '';
			$author_font_family       = isset( $attr['authorFontFamily'] ) ? $attr['authorFontFamily'] : '';
			$author_font_weight       = isset( $attr['authorFontWeight'] ) ? $attr['authorFontWeight'] : '';
			$author_font_subset       = isset( $attr['authorFontSubset'] ) ? $attr['authorFontSubset'] : '';

			$cta_load_google_fonts = isset( $attr['ctaLoadGoogleFonts'] ) ? $attr['ctaLoadGoogleFonts'] : '';
			$cta_font_family       = isset( $attr['ctaFontFamily'] ) ? $attr['ctaFontFamily'] : '';
			$cta_font_weight       = isset( $attr['ctaFontWeight'] ) ? $attr['ctaFontWeight'] : '';
			$cta_font_subset       = isset( $attr['ctaFontSubset'] ) ? $attr['ctaFontSubset'] : '';

			UAGB_Helper::blocks_google_font( $author_load_google_fonts, $author_font_family, $author_font_weight, $author_font_subset );
			UAGB_Helper::blocks_google_font( $cta_load_google_fonts, $cta_font_family, $cta_font_weight, $cta_font_subset );
		}

		/**
		 * Adds Google fonts for Mulit Button's block.
		 *
		 * @since 1.9.1
		 * @param array $attr the blocks attr.
		 */
		public static function blocks_buttons_gfont( $attr ) {

			$load_google_font = isset( $attr['loadGoogleFonts'] ) ? $attr['loadGoogleFonts'] : '';
			$font_family      = isset( $attr['fontFamily'] ) ? $attr['fontFamily'] : '';
			$font_weight      = isset( $attr['fontWeight'] ) ? $attr['fontWeight'] : '';
			$font_subset      = isset( $attr['fontSubset'] ) ? $attr['fontSubset'] : '';

			UAGB_Helper::blocks_google_font( $load_google_font, $font_family, $font_weight, $font_subset );
		}

		/**
		 * Adds Google fonts for Post block.
		 *
		 * @since 1.9.1
		 * @param array $attr the blocks attr.
		 */
		public static function blocks_post_gfont( $attr ) {

			$title_load_google_font = isset( $attr['titleLoadGoogleFonts'] ) ? $attr['titleLoadGoogleFonts'] : '';
			$title_font_family      = isset( $attr['titleFontFamily'] ) ? $attr['titleFontFamily'] : '';
			$title_font_weight      = isset( $attr['titleFontWeight'] ) ? $attr['titleFontWeight'] : '';
			$title_font_subset      = isset( $attr['titleFontSubset'] ) ? $attr['titleFontSubset'] : '';

			$meta_load_google_font = isset( $attr['metaLoadGoogleFonts'] ) ? $attr['metaLoadGoogleFonts'] : '';
			$meta_font_family      = isset( $attr['metaFontFamily'] ) ? $attr['metaFontFamily'] : '';
			$meta_font_weight      = isset( $attr['metaFontWeight'] ) ? $attr['metaFontWeight'] : '';
			$meta_font_subset      = isset( $attr['metaFontSubset'] ) ? $attr['metaFontSubset'] : '';

			$excerpt_load_google_font = isset( $attr['excerptLoadGoogleFonts'] ) ? $attr['excerptLoadGoogleFonts'] : '';
			$excerpt_font_family      = isset( $attr['excerptFontFamily'] ) ? $attr['excerptFontFamily'] : '';
			$excerpt_font_weight      = isset( $attr['excerptFontWeight'] ) ? $attr['excerptFontWeight'] : '';
			$excerpt_font_subset      = isset( $attr['excerptFontSubset'] ) ? $attr['excerptFontSubset'] : '';

			$cta_load_google_font = isset( $attr['ctaLoadGoogleFonts'] ) ? $attr['ctaLoadGoogleFonts'] : '';
			$cta_font_family      = isset( $attr['ctaFontFamily'] ) ? $attr['ctaFontFamily'] : '';
			$cta_font_weight      = isset( $attr['ctaFontWeight'] ) ? $attr['ctaFontWeight'] : '';
			$cta_font_subset      = isset( $attr['ctaFontSubset'] ) ? $attr['ctaFontSubset'] : '';

			UAGB_Helper::blocks_google_font( $title_load_google_font, $title_font_family, $title_font_weight, $title_font_subset );

			UAGB_Helper::blocks_google_font( $meta_load_google_font, $meta_font_family, $meta_font_weight, $meta_font_subset );

			UAGB_Helper::blocks_google_font( $excerpt_load_google_font, $excerpt_font_family, $excerpt_font_weight, $excerpt_font_subset );

			UAGB_Helper::blocks_google_font( $cta_load_google_font, $cta_font_family, $cta_font_weight, $cta_font_subset );
		}

		/**
		 * Adds Google fonts for Advanced Heading block.
		 *
		 * @since 1.9.1
		 * @param array $attr the blocks attr.
		 */
		public static function blocks_info_box_gfont( $attr ) {

			$head_load_google_font = isset( $attr['headLoadGoogleFonts'] ) ? $attr['headLoadGoogleFonts'] : '';
			$head_font_family      = isset( $attr['headFontFamily'] ) ? $attr['headFontFamily'] : '';
			$head_font_weight      = isset( $attr['headFontWeight'] ) ? $attr['headFontWeight'] : '';
			$head_font_subset      = isset( $attr['headFontSubset'] ) ? $attr['headFontSubset'] : '';

			$prefix_load_google_font = isset( $attr['prefixLoadGoogleFonts'] ) ? $attr['prefixLoadGoogleFonts'] : '';
			$prefix_font_family      = isset( $attr['prefixFontFamily'] ) ? $attr['prefixFontFamily'] : '';
			$prefix_font_weight      = isset( $attr['prefixFontWeight'] ) ? $attr['prefixFontWeight'] : '';
			$prefix_font_subset      = isset( $attr['prefixFontSubset'] ) ? $attr['prefixFontSubset'] : '';

			$subhead_load_google_font = isset( $attr['subHeadLoadGoogleFonts'] ) ? $attr['subHeadLoadGoogleFonts'] : '';
			$subhead_font_family      = isset( $attr['subHeadFontFamily'] ) ? $attr['subHeadFontFamily'] : '';
			$subhead_font_weight      = isset( $attr['subHeadFontWeight'] ) ? $attr['subHeadFontWeight'] : '';
			$subhead_font_subset      = isset( $attr['subHeadFontSubset'] ) ? $attr['subHeadFontSubset'] : '';

			$cta_load_google_font = isset( $attr['ctaLoadGoogleFonts'] ) ? $attr['ctaLoadGoogleFonts'] : '';
			$cta_font_family      = isset( $attr['ctaFontFamily'] ) ? $attr['ctaFontFamily'] : '';
			$cta_font_weight      = isset( $attr['ctaFontWeight'] ) ? $attr['ctaFontWeight'] : '';
			$cta_font_subset      = isset( $attr['ctaFontSubset'] ) ? $attr['ctaFontSubset'] : '';

			UAGB_Helper::blocks_google_font( $cta_load_google_font, $cta_font_family, $cta_font_weight, $cta_font_subset );
			UAGB_Helper::blocks_google_font( $head_load_google_font, $head_font_family, $head_font_weight, $head_font_subset );
			UAGB_Helper::blocks_google_font( $prefix_load_google_font, $prefix_font_family, $prefix_font_weight, $prefix_font_subset );
			UAGB_Helper::blocks_google_font( $subhead_load_google_font, $subhead_font_family, $subhead_font_weight, $subhead_font_subset );
		}

		/**
		 * Adds Google fonts for Call To Action block.
		 *
		 * @since 1.9.1
		 * @param array $attr the blocks attr.
		 */
		public static function blocks_call_to_action_gfont( $attr ) {

			$title_load_google_font = isset( $attr['titleLoadGoogleFonts'] ) ? $attr['titleLoadGoogleFonts'] : '';
			$title_font_family      = isset( $attr['titleFontFamily'] ) ? $attr['titleFontFamily'] : '';
			$title_font_weight      = isset( $attr['titleFontWeight'] ) ? $attr['titleFontWeight'] : '';
			$title_font_subset      = isset( $attr['titleFontSubset'] ) ? $attr['titleFontSubset'] : '';

			$desc_load_google_font = isset( $attr['descLoadGoogleFonts'] ) ? $attr['descLoadGoogleFonts'] : '';
			$desc_font_family      = isset( $attr['descFontFamily'] ) ? $attr['descFontFamily'] : '';
			$desc_font_weight      = isset( $attr['descFontWeight'] ) ? $attr['descFontWeight'] : '';
			$desc_font_subset      = isset( $attr['descFontSubset'] ) ? $attr['descFontSubset'] : '';

			$cta_load_google_font = isset( $attr['ctaLoadGoogleFonts'] ) ? $attr['ctaLoadGoogleFonts'] : '';
			$cta_font_family      = isset( $attr['ctaFontFamily'] ) ? $attr['ctaFontFamily'] : '';
			$cta_font_weight      = isset( $attr['ctaFontWeight'] ) ? $attr['ctaFontWeight'] : '';
			$cta_font_subset      = isset( $attr['ctaFontSubset'] ) ? $attr['ctaFontSubset'] : '';

			UAGB_Helper::blocks_google_font( $cta_load_google_font, $cta_font_family, $cta_font_weight, $cta_font_subset );
			UAGB_Helper::blocks_google_font( $title_load_google_font, $title_font_family, $title_font_weight, $title_font_subset );
			UAGB_Helper::blocks_google_font( $desc_load_google_font, $desc_font_family, $desc_font_weight, $desc_font_subset );
		}

		/**
		 * Adds Google fonts for FAQ block.
		 *
		 * @since 1.15.0
		 * @param array $attr the blocks attr.
		 */
		public static function blocks_faq_gfont( $attr ) {

			$question_load_google_font = isset( $attr['questionloadGoogleFonts'] ) ? $attr['questionloadGoogleFonts'] : '';
			$question_font_family      = isset( $attr['questionFontFamily'] ) ? $attr['questionFontFamily'] : '';
			$question_font_weight      = isset( $attr['questionFontWeight'] ) ? $attr['questionFontWeight'] : '';
			$question_font_subset      = isset( $attr['questionFontSubset'] ) ? $attr['questionFontSubset'] : '';

			$answer_load_google_font = isset( $attr['answerloadGoogleFonts'] ) ? $attr['answerloadGoogleFonts'] : '';
			$answer_font_family      = isset( $attr['answerFontFamily'] ) ? $attr['answerFontFamily'] : '';
			$answer_font_weight      = isset( $attr['answerFontWeight'] ) ? $attr['answerFontWeight'] : '';
			$answer_font_subset      = isset( $attr['answerFontSubset'] ) ? $attr['answerFontSubset'] : '';

			UAGB_Helper::blocks_google_font( $question_load_google_font, $question_font_family, $question_font_weight, $question_font_subset );
			UAGB_Helper::blocks_google_font( $answer_load_google_font, $answer_font_family, $answer_font_weight, $answer_font_subset );

		}

		/**
		 * Adds Google fonts for WP Search block.
		 *
		 * @since 1.16.0
		 * @param array $attr the blocks attr.
		 */
		public static function blocks_wp_search_gfont( $attr ) {

			$input_load_google_font = isset( $attr['inputloadGoogleFonts'] ) ? $attr['inputloadGoogleFonts'] : '';
			$input_font_family      = isset( $attr['inputFontFamily'] ) ? $attr['inputFontFamily'] : '';
			$input_font_weight      = isset( $attr['inputFontWeight'] ) ? $attr['inputFontWeight'] : '';
			$input_font_subset      = isset( $attr['inputFontSubset'] ) ? $attr['inputFontSubset'] : '';

			$button_load_google_font = isset( $attr['buttonloadGoogleFonts'] ) ? $attr['buttonloadGoogleFonts'] : '';
			$button_font_family      = isset( $attr['buttonFontFamily'] ) ? $attr['buttonFontFamily'] : '';
			$button_font_weight      = isset( $attr['buttonFontWeight'] ) ? $attr['buttonFontWeight'] : '';
			$button_font_subset      = isset( $attr['buttonFontSubset'] ) ? $attr['buttonFontSubset'] : '';

			UAGB_Helper::blocks_google_font( $button_load_google_font, $button_font_family, $button_font_weight, $button_font_subset );
			UAGB_Helper::blocks_google_font( $input_load_google_font, $input_font_family, $input_font_weight, $input_font_subset );
		}

	}
}
