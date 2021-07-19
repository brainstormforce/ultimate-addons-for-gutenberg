<?php
/**
 * UAGB Block Helper.
 *
 * @package UAGB
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

if ( ! class_exists( 'UAGB_Block_Helper' ) ) {

	/**
	 * Class UAGB_Block_Helper.
	 */
	class UAGB_Block_Helper {

		/**
		 * Get Star Rating block CSS
		 *
		 * @since 1.24.0
		 * @param array  $attr The block attributes.
		 * @param string $id The selector ID.
		 * @return array The Widget List.
		 */
		public static function get_star_rating_css( $attr, $id ) {
			$defaults = UAGB_Helper::$block_list['uagb/star-rating']['attributes'];

			$attr = array_merge( $defaults, $attr );

			$t_selectors = array();
			$m_selectors = array();
			$selectors   = array();

			$alignment       = 'flex-start';
			$stack_alignment = $attr['align'];
			if ( '' !== $attr['align'] ) {
				if ( 'right' === $attr['align'] ) {
					$alignment = 'flex-end';
				}
				if ( 'center' === $attr['align'] ) {
					$alignment = 'center';
				}
				if ( 'full' === $attr['align'] ) {
					$alignment       = 'space-between';
					$stack_alignment = 'left';
				}
			}

			$selectors = array(
				' .uag-star-rating'         => array(
					'font-size' => UAGB_Helper::get_css_value( $attr['size'], 'px' ),
				),
				' .uag-star-rating > span'  => array(
					'margin-right' => UAGB_Helper::get_css_value( $attr['gap'], 'px' ),
					'color'        => $attr['unmarkedColor'],
				),
				' .uag-star:nth-child(-n+' . floor( $attr['rating'] ) . ')' => array(
					'color' => $attr['color'],
				),
				' .uag-star-rating__title'  => array(
					'font-size'   => UAGB_Helper::get_css_value( $attr['fontSize'], $attr['fontSizeType'] ),
					'font-family' => $attr['fontFamily'],
					'font-weight' => $attr['fontWeight'],
					'line-height' => UAGB_Helper::get_css_value( $attr['lineHeight'], $attr['lineHeightType'] ),
					'color'       => $attr['titleColor'],
				),
				'.uag-star-rating__wrapper' => array(
					'justify-content' => $alignment,
					'text-align'      => $stack_alignment,
				),
			);

			$index = 'margin-right';
			if ( 'stack' === $attr['layout'] ) {
				$index = 'margin-bottom';
			}

			$selectors[' .uag-star-rating__title'][ $index ] = UAGB_Helper::get_css_value( $attr['titleGap'], 'px' );

			$remainder = ( $attr['rating'] - floor( $attr['rating'] ) );
			$width     = $remainder * 100;

			if ( 0 !== $width ) {
				$selectors[ ' .uag-star:nth-child(' . ceil( $attr['rating'] ) . '):before' ] = array(
					'color'    => $attr['color'],
					'width'    => UAGB_Helper::get_css_value( $width, '%' ),
					'position' => 'absolute',
					'content'  => "'★'",
					'overflow' => 'hidden',
				);

				$selectors[ ' .uag-star:nth-child(' . ceil( $attr['rating'] ) . ')' ] = array(
					'position' => 'relative',
				);
			}

			$combined_selectors = array(
				'desktop' => $selectors,
				'tablet'  => $t_selectors,
				'mobile'  => $m_selectors,
			);

			$combined_selectors = UAGB_Helper::get_typography_css( $attr, '', ' .uag-star-rating__title', $combined_selectors );

			return UAGB_Helper::generate_all_css( $combined_selectors, ' .uagb-block-' . substr( $attr['block_id'], 0, 8 ) );
		}

		/**
		 * Get review block CSS
		 *
		 * @since 1.19.0
		 * @param array  $attr The block attributes.
		 * @param string $id The selector ID.
		 * @return array The Widget List.
		 */
		public static function get_review_css( $attr, $id ) {
			$defaults = UAGB_Helper::$block_list['uagb/review']['attributes'];

			$attr = array_merge( $defaults, $attr );

			$t_selectors = array();
			$m_selectors = array();
			$selectors   = array();

			$selectors = array(
				' .uagb_review_block .uagb-rating-title'  => array(
					'color' => $attr['titleColor'],
				),
				' .uagb_review_block .uagb-rating-desc'   => array(
					'color' => $attr['descColor'],
				),
				' .uagb_review_block .uagb-rating-author' => array(
					'color' => $attr['authorColor'],
				),
				' .uagb_review_entry'                     => array(
					'color' => $attr['contentColor'],
				),
				' .uagb_review_block'                     => array(
					'padding-left'   => UAGB_Helper::get_css_value( $attr['contentHrPadding'], 'px' ),
					'padding-right'  => UAGB_Helper::get_css_value( $attr['contentHrPadding'], 'px' ),
					'padding-top'    => UAGB_Helper::get_css_value( $attr['contentVrPadding'], 'px' ),
					'padding-bottom' => UAGB_Helper::get_css_value( $attr['contentVrPadding'], 'px' ),
					'text-align'     => $attr['overallAlignment'],
				),
				' .uagb_review_summary'                   => array(
					'color' => $attr['summaryColor'],
				),
				' .uagb_review_entry .star, .uagb_review_average_stars .star' => array(
					'fill' => $attr['starColor'],
				),
				' .uagb_review_entry path, .uagb_review_average_stars path' => array(
					'stroke' => $attr['starOutlineColor'],
					'fill'   => $attr['starActiveColor'],
				),
			);

			$combined_selectors = array(
				'desktop' => $selectors,
				'tablet'  => $t_selectors,
				'mobile'  => $m_selectors,
			);

			$combined_selectors = UAGB_Helper::get_typography_css( $attr, 'head', ' .uagb-rating-title, .uagb_review_entry', $combined_selectors );
			$combined_selectors = UAGB_Helper::get_typography_css( $attr, 'subHead', ' .uagb-rating-desc, .uagb-rating-author', $combined_selectors );
			$combined_selectors = UAGB_Helper::get_typography_css( $attr, 'content', ' .uagb_review_summary', $combined_selectors );

			return UAGB_Helper::generate_all_css( $combined_selectors, ' .uagb-block-' . substr( $attr['block_id'], 0, 8 ) );

		}

		/**
		 * Get Inline Notice CSS
		 *
		 * @since 1.16.0
		 * @param array  $attr The block attributes.
		 * @param string $id The selector ID.
		 * @return array The Widget List.
		 */
		public static function get_inline_notice_css( $attr, $id ) {
			$defaults = UAGB_Helper::$block_list['uagb/inline-notice']['attributes'];

			$attr = array_merge( $defaults, $attr );

			$t_selectors = array();
			$m_selectors = array();
			$selectors   = array();

			$lPadding = 0;
			$rPadding = 0;

			if ( $attr['noticeDismiss'] ) {
				if ( 'left' === $attr['noticeAlignment'] || 'center' === $attr['noticeAlignment'] ) {
					$rPadding = ( $attr['titleHrPadding'] + '13' );
					$lPadding = $attr['titleHrPadding'];
				} else {
					$lPadding = ( $attr['titleHrPadding'] + '13' );
					$rPadding = $attr['titleHrPadding'];
				}
			} else {
				$lPadding = $attr['titleHrPadding'];
				$rPadding = $attr['titleHrPadding'];
			}

			$selectors = array(
				' .uagb-notice-title'           => array(
					'padding-left'   => UAGB_Helper::get_css_value( $lPadding, 'px' ),
					'padding-right'  => UAGB_Helper::get_css_value( $rPadding, 'px' ),
					'padding-top'    => UAGB_Helper::get_css_value( $attr['titleVrPadding'], 'px' ),
					'padding-bottom' => UAGB_Helper::get_css_value( $attr['titleVrPadding'], 'px' ),
				),
				'.uagb-inline_notice__outer-wrap .uagb-notice-title' => array(
					'color' => $attr['titleColor'],
				),
				' .uagb-notice-text'            => array(
					'color'          => $attr['textColor'],
					'padding-left'   => UAGB_Helper::get_css_value( $attr['contentHrPadding'], 'px' ),
					'padding-right'  => UAGB_Helper::get_css_value( $attr['contentHrPadding'], 'px' ),
					'padding-top'    => UAGB_Helper::get_css_value( $attr['contentVrPadding'], 'px' ),
					'padding-bottom' => UAGB_Helper::get_css_value( $attr['contentVrPadding'], 'px' ),
				),
				' span.uagb-notice-dismiss svg' => array(
					'fill'  => $attr['noticeDismissColor'],
					'color' => $attr['noticeDismissColor'],
				),
			);

			if ( 'modern' === $attr['layout'] ) {

				$selectors[' .uagb-notice-title']['background-color']        = $attr['noticeColor'];
				$selectors[' .uagb-notice-title']['border-top-right-radius'] = '3px';
				$selectors[' .uagb-notice-title']['border-top-left-radius']  = '3px';

				$selectors[' .uagb-notice-text']['background-color']           = $attr['contentBgColor'];
				$selectors[' .uagb-notice-text']['border']                     = '2px solid' . $attr['noticeColor'];
				$selectors[' .uagb-notice-text']['border-bottom-left-radius']  = '3px';
				$selectors[' .uagb-notice-text']['border-bottom-right-radius'] = '3px';
			} elseif ( 'simple' === $attr['layout'] ) {

				$selectors[' .uagb-notice-title']['background-color'] = $attr['contentBgColor'];
				$selectors[' .uagb-notice-title']['border-left']      = UAGB_Helper::get_css_value( $attr['highlightWidth'], 'px' ) . ' solid ' . $attr['noticeColor'];

				$selectors[' .uagb-notice-text']['background-color'] = $attr['contentBgColor'];
				$selectors[' .uagb-notice-text']['border-left']      = UAGB_Helper::get_css_value( $attr['highlightWidth'], 'px' ) . ' solid ' . $attr['noticeColor'];

			}

			$combined_selectors = array(
				'desktop' => $selectors,
				'tablet'  => $t_selectors,
				'mobile'  => $m_selectors,
			);

			$combined_selectors = UAGB_Helper::get_typography_css( $attr, 'title', ' .uagb-notice-title', $combined_selectors );
			$combined_selectors = UAGB_Helper::get_typography_css( $attr, 'desc', ' .uagb-notice-text p', $combined_selectors );

			return UAGB_Helper::generate_all_css( $combined_selectors, ' .uagb-block-' . $id );
		}

		/**
		 * Get How To CSS
		 *
		 * @since 1.15.0
		 * @param array  $attr The block attributes.
		 * @param string $id The selector ID.
		 * @return array The Widget List.
		 */
		public static function get_how_to_css( $attr, $id ) {
			$defaults = UAGB_Helper::$block_list['uagb/how-to']['attributes'];

			$attr = array_merge( $defaults, $attr );

			$t_selectors = array();
			$m_selectors = array();

			$selectors = array(
				' .uagb-how-to-main-wrap' => array(
					'text-align' => $attr['overallAlignment'],
				),
				' .uagb-how-to-main-wrap p.uagb-howto-desc-text' => array(
					'margin-bottom' => UAGB_Helper::get_css_value( $attr['row_gap'], 'px' ),
				),

				' .uagb-how-to-main-wrap .uagb-howto__source-wrap' => array(
					'margin-bottom' => UAGB_Helper::get_css_value( $attr['row_gap'], 'px' ),
				),

				' .uagb-how-to-main-wrap span.uagb-howto__time-wrap' => array(
					'margin-bottom' => UAGB_Helper::get_css_value( $attr['row_gap'], 'px' ),
				),

				' .uagb-how-to-main-wrap span.uagb-howto__cost-wrap' => array(
					'margin-bottom' => UAGB_Helper::get_css_value( $attr['row_gap'], 'px' ),
				),

				' .uagb-tools__wrap .uagb-how-to-tools-child__wrapper:last-child' => array(
					'margin-bottom' => '0px',
				),

				' .uagb-how-to-materials .uagb-how-to-materials-child__wrapper:last-child' => array(
					'margin-bottom' => UAGB_Helper::get_css_value( $attr['row_gap'], 'px' ),
				),

				' .uagb-howto-steps__wrap .wp-block-uagb-info-box' => array(
					'margin-bottom' => UAGB_Helper::get_css_value( $attr['step_gap'], 'px' ),
				),

				' .uagb-howto-steps__wrap .wp-block-uagb-info-box:last-child' => array(
					'margin-bottom' => '0px',
				),

				' span.uagb-howto__time-wrap .uagb-howto-timeNeeded-value' => array(
					'margin-left' => UAGB_Helper::get_css_value( $attr['timeSpace'], 'px' ),
				),

				' span.uagb-howto__cost-wrap .uagb-howto-estcost-value' => array(
					'margin-left' => UAGB_Helper::get_css_value( $attr['costSpace'], 'px' ),
				),

				' ' . $attr['headingTag'] . '.uagb-howto-heading-text' => array(
					'color' => $attr['headingColor'],
				),

				' p.uagb-howto-desc-text' => array(
					'color' => $attr['subHeadingColor'],
				),

				' .uagb-howto__wrap span.uagb-howto__time-wrap p' => array(
					'color' => $attr['subHeadingColor'],
				),

				' .uagb-howto__wrap span.uagb-howto__cost-wrap p' => array(
					'color' => $attr['subHeadingColor'],
				),

				' .uagb-howto__wrap span.uagb-howto__time-wrap h4.uagb-howto-timeNeeded-text' => array(
					'color' => $attr['showTotaltimecolor'],
				),

				' .uagb-howto__wrap span.uagb-howto__cost-wrap h4.uagb-howto-estcost-text' => array(
					'color' => $attr['showTotaltimecolor'],
				),

				' .uagb-how-to-tools__wrap .uagb-howto-req-tools-text' => array(
					'color' => $attr['showTotaltimecolor'],
				),

				'  .uagb-how-to-materials__wrap .uagb-howto-req-materials-text' => array(
					'color' => $attr['showTotaltimecolor'],
				),

				' .uagb-how-to-steps__wrap .uagb-howto-req-steps-text' => array(
					'color' => $attr['showTotaltimecolor'],
				),
			);

			$selectors[' .uagb-tools__wrap .uagb-how-to-tools-child__wrapper'] = array(
				'color' => $attr['subHeadingColor'],
			);

			$selectors[' .uagb-how-to-materials .uagb-how-to-materials-child__wrapper'] = array(
				'color' => $attr['subHeadingColor'],
			);

			$combined_selectors = array(
				'desktop' => $selectors,
				'tablet'  => $t_selectors,
				'mobile'  => $m_selectors,
			);

			$combined_selectors = UAGB_Helper::get_typography_css( $attr, 'subHead', ' p', $combined_selectors );
			$combined_selectors = UAGB_Helper::get_typography_css( $attr, 'price', ' h4', $combined_selectors );
			$combined_selectors = UAGB_Helper::get_typography_css( $attr, 'head', ' .uagb-howto-heading-text', $combined_selectors );
			$combined_selectors = UAGB_Helper::get_typography_css( $attr, 'subHead', ' .uagb-tools .uagb-tools__label', $combined_selectors );
			$combined_selectors = UAGB_Helper::get_typography_css( $attr, 'subHead', ' .uagb-materials .uagb-materials__label', $combined_selectors );

			return UAGB_Helper::generate_all_css( $combined_selectors, ' .uagb-block-' . $id );
		}

		/**
		 * Get Section Block CSS
		 *
		 * @since 0.0.1
		 * @param array  $attr The block attributes.
		 * @param string $id The selector ID.
		 * @return array The Widget List.
		 */
		public static function get_section_css( $attr, $id ) {

			global $content_width;

			$defaults = UAGB_Helper::$block_list['uagb/section']['attributes'];

			$attr = array_merge( $defaults, $attr );

			$bg_type                 = ( isset( $attr['backgroundType'] ) ) ? $attr['backgroundType'] : 'none';
			$overlay_type            = ( isset( $attr['overlayType'] ) ) ? $attr['overlayType'] : 'color';
			$gradientOverlayPosition = ( isset( $attr['gradientOverlayPosition'] ) ) ? $attr['gradientOverlayPosition'] : 'center center';
			$gradientPosition        = ( isset( $attr['gradientPosition'] ) ) ? $attr['gradientPosition'] : 'center center';

			$boxShadowPositionCSS = $attr['boxShadowPosition'];
			if ( 'outset' === $attr['boxShadowPosition'] ) {
				$boxShadowPositionCSS = '';
			}

			$style = array(
				'padding-top'    => UAGB_Helper::get_css_value( $attr['topPadding'], $attr['desktopPaddingType'] ),
				'padding-bottom' => UAGB_Helper::get_css_value( $attr['bottomPadding'], $attr['desktopPaddingType'] ),
				'padding-left'   => UAGB_Helper::get_css_value( $attr['leftPadding'], $attr['desktopPaddingType'] ),
				'padding-right'  => UAGB_Helper::get_css_value( $attr['rightPadding'], $attr['desktopPaddingType'] ),
				'border-radius'  => UAGB_Helper::get_css_value( $attr['borderRadius'], 'px' ),
				'margin-top'     => UAGB_Helper::get_css_value( $attr['topMargin'], $attr['desktopMarginType'] ),
				'margin-bottom'  => UAGB_Helper::get_css_value( $attr['bottomMargin'], $attr['desktopMarginType'] ),

			);

			$m_selectors = array();
			$t_selectors = array();
			if ( 'boxed' === $attr['contentWidth'] ) {
				switch ( $attr['align'] ) {
					case 'right':
						$style['margin-right'] = UAGB_Helper::get_css_value( $attr['rightMargin'], $attr['desktopMarginType'] );
						$style['margin-left']  = 'auto';
						break;
					case 'left':
						$style['margin-right'] = 'auto';
						$style['margin-left']  = UAGB_Helper::get_css_value( $attr['leftMargin'], $attr['desktopMarginType'] );
						break;
					case 'center':
						$style['margin-right'] = 'auto';
						$style['margin-left']  = 'auto';
						break;
				}
			}
			if ( 'full_width' === $attr['contentWidth'] ) {
				$style['margin-right'] = UAGB_Helper::get_css_value( $attr['rightMargin'], $attr['desktopMarginType'] );
				$style['margin-left']  = UAGB_Helper::get_css_value( $attr['leftMargin'], $attr['desktopMarginType'] );
			}
			if ( 'none' !== $attr['borderStyle'] ) {
				$style['border-style'] = $attr['borderStyle'];
				$style['border-width'] = UAGB_Helper::get_css_value( $attr['borderWidth'], 'px' );
				$style['border-color'] = $attr['borderColor'];
			}

			$position = str_replace( '-', ' ', $attr['backgroundPosition'] );

			$section_width = '100%';

			if ( isset( $attr['contentWidth'] ) && ( 'boxed' === $attr['contentWidth'] && isset( $attr['width'] ) ) ) {
				$section_width = UAGB_Helper::get_css_value( $attr['width'], 'px' );
			}

			if ( 'wide' !== $attr['align'] && 'full' !== $attr['align'] ) {
				$style['max-width'] = $section_width;
			}

			if ( 'image' === $bg_type ) {

				$style['background-image']      = ( isset( $attr['backgroundImage'] ) && isset( $attr['backgroundImage']['url'] ) ) ? "url('" . $attr['backgroundImage']['url'] . "' )" : null;
				$style['background-position']   = $position;
				$style['background-attachment'] = $attr['backgroundAttachment'];
				$style['background-repeat']     = $attr['backgroundRepeat'];
				$style['background-size']       = $attr['backgroundSize'];

			}

			$inner_width = '100%';

			if ( isset( $attr['contentWidth'] ) ) {
				if ( 'boxed' !== $attr['contentWidth'] ) {
					if ( isset( $attr['themeWidth'] ) && $attr['themeWidth'] ) {
						$inner_width = UAGB_Helper::get_css_value( $content_width, 'px' );
					} else {
						if ( isset( $attr['innerWidth'] ) ) {
							$inner_width = UAGB_Helper::get_css_value( $attr['innerWidth'], $attr['innerWidthType'] );
						}
					}
				}
			}

			$selectors = array(
				'.uagb-section__wrap'          => $style,
				' > .uagb-section__video-wrap' => array(
					'opacity' => ( isset( $attr['backgroundVideoOpacity'] ) && '' !== $attr['backgroundVideoOpacity'] ) ? ( ( 100 - $attr['backgroundVideoOpacity'] ) / 100 ) : 0.5,
				),
				' > .uagb-section__inner-wrap' => array(
					'max-width' => $inner_width,
				),
				'.wp-block-uagb-section'       => array(
					'box-shadow' => UAGB_Helper::get_css_value( $attr['boxShadowHOffset'], 'px' ) . ' ' . UAGB_Helper::get_css_value( $attr['boxShadowVOffset'], 'px' ) . ' ' . UAGB_Helper::get_css_value( $attr['boxShadowBlur'], 'px' ) . ' ' . UAGB_Helper::get_css_value( $attr['boxShadowSpread'], 'px' ) . ' ' . $attr['boxShadowColor'] . ' ' . $boxShadowPositionCSS,
				),
			);

			if ( 'video' === $bg_type ) {
				$selectors[' > .uagb-section__overlay'] = array(
					'opacity'          => 1,
					'background-color' => $attr['backgroundVideoColor'],
				);
			} elseif ( 'image' === $bg_type ) {
				if ( 'color' === $overlay_type ) {
					$selectors[' > .uagb-section__overlay'] = array(
						'opacity'          => ( isset( $attr['backgroundOpacity'] ) && '' !== $attr['backgroundOpacity'] ) ? $attr['backgroundOpacity'] / 100 : 0,
						'background-color' => $attr['backgroundImageColor'],
					);
				} else {
					$selectors[' > .uagb-section__overlay']['background-color'] = 'transparent';
					$selectors[' > .uagb-section__overlay']['opacity']          = ( isset( $attr['backgroundOpacity'] ) && '' !== $attr['backgroundOpacity'] ) ? $attr['backgroundOpacity'] / 100 : '';

					if ( 'linear' === $attr['gradientOverlayType'] ) {

						$selectors[' > .uagb-section__overlay']['background-image'] = 'linear-gradient(' . $attr['gradientOverlayAngle'] . 'deg, ' . $attr['gradientOverlayColor1'] . ' ' . $attr['gradientOverlayLocation1'] . '%, ' . $attr['gradientOverlayColor2'] . ' ' . $attr['gradientOverlayLocation2'] . '%)';
					} else {

						$selectors[' > .uagb-section__overlay']['background-image'] = 'radial-gradient( at ' . $gradientOverlayPosition . ', ' . $attr['gradientOverlayColor1'] . ' ' . $attr['gradientOverlayLocation1'] . '%, ' . $attr['gradientOverlayColor2'] . ' ' . $attr['gradientOverlayLocation2'] . '%)';
					}
				}
			} elseif ( 'color' === $bg_type ) {
				$selectors[' > .uagb-section__overlay'] = array(
					'opacity'          => ( isset( $attr['backgroundOpacity'] ) && '' !== $attr['backgroundOpacity'] ) ? $attr['backgroundOpacity'] / 100 : '',
					'background-color' => $attr['backgroundColor'],
				);
			} elseif ( 'gradient' === $bg_type ) {
				$selectors[' > .uagb-section__overlay']['background-color'] = 'transparent';
				$selectors[' > .uagb-section__overlay']['opacity']          = ( isset( $attr['backgroundOpacity'] ) && '' !== $attr['backgroundOpacity'] ) ? $attr['backgroundOpacity'] / 100 : '';

				if ( $attr['gradientValue'] ) {
					$selectors[' > .uagb-section__overlay']['background-image'] = $attr['gradientValue'];
				} else {
					if ( 'linear' === $attr['gradientType'] ) {

						$selectors[' > .uagb-section__overlay']['background-image'] = 'linear-gradient(' . $attr['gradientAngle'] . 'deg, ' . $attr['gradientColor1'] . ' ' . $attr['gradientLocation1'] . '%, ' . $attr['gradientColor2'] . ' ' . $attr['gradientLocation2'] . '%)';
					} else {
						$selectors[' > .uagb-section__overlay']['background-image'] = 'radial-gradient( at ' . $gradientPosition . ', ' . $attr['gradientColor1'] . ' ' . $attr['gradientLocation1'] . '%, ' . $attr['gradientColor2'] . ' ' . $attr['gradientLocation2'] . '%)';
					}
				}
			}

			$selectors[' > .uagb-section__overlay']['border-radius'] = UAGB_Helper::get_css_value( $attr['borderRadius'], 'px' );

			$m_selectors = array(
				'.uagb-section__wrap' => array(
					'padding-top'    => UAGB_Helper::get_css_value( $attr['topPaddingMobile'], $attr['mobilePaddingType'] ),
					'padding-bottom' => UAGB_Helper::get_css_value( $attr['bottomPaddingMobile'], $attr['mobilePaddingType'] ),
					'padding-left'   => UAGB_Helper::get_css_value( $attr['leftPaddingMobile'], $attr['mobilePaddingType'] ),
					'padding-right'  => UAGB_Helper::get_css_value( $attr['rightPaddingMobile'], $attr['mobilePaddingType'] ),
				),
			);

			$t_selectors                                      = array(
				'.uagb-section__wrap' => array(
					'padding-top'    => UAGB_Helper::get_css_value( $attr['topPaddingTablet'], $attr['tabletPaddingType'] ),
					'padding-bottom' => UAGB_Helper::get_css_value( $attr['bottomPaddingTablet'], $attr['tabletPaddingType'] ),
					'padding-left'   => UAGB_Helper::get_css_value( $attr['leftPaddingTablet'], $attr['tabletPaddingType'] ),
					'padding-right'  => UAGB_Helper::get_css_value( $attr['rightPaddingTablet'], $attr['tabletPaddingType'] ),
				),
			);
			$m_selectors['.uagb-section__wrap']['margin-top'] = UAGB_Helper::get_css_value( $attr['topMarginMobile'], $attr['mobileMarginType'] );
			$m_selectors['.uagb-section__wrap']['margin-bottom'] = UAGB_Helper::get_css_value( $attr['bottomMarginMobile'], $attr['mobileMarginType'] );
			$t_selectors['.uagb-section__wrap']['margin-top']    = UAGB_Helper::get_css_value( $attr['topMarginTablet'], $attr['tabletMarginType'] );
			$t_selectors['.uagb-section__wrap']['margin-bottom'] = UAGB_Helper::get_css_value( $attr['bottomMarginTablet'], $attr['tabletMarginType'] );
			if ( 'boxed' === $attr['contentWidth'] ) {
				if ( 'right' === $attr['align'] ) {
					$t_selectors['.uagb-section__wrap']['margin-right'] = UAGB_Helper::get_css_value( $attr['rightMarginTablet'], $attr['tabletMarginType'] );
					$m_selectors['.uagb-section__wrap']['margin-right'] = UAGB_Helper::get_css_value( $attr['rightMarginMobile'], $attr['mobileMarginType'] );
				} elseif ( 'left' === $attr['align'] ) {
					$t_selectors['.uagb-section__wrap']['margin-left'] = UAGB_Helper::get_css_value( $attr['leftMarginTablet'], $attr['tabletMarginType'] );
					$m_selectors['.uagb-section__wrap']['margin-left'] = UAGB_Helper::get_css_value( $attr['leftMarginMobile'], $attr['mobileMarginType'] );
				}
			}

			$combined_selectors = array(
				'desktop' => $selectors,
				'tablet'  => $t_selectors,
				'mobile'  => $m_selectors,
			);

			$base_selector = ( $attr['classMigrate'] ) ? '.uagb-block-' : '#uagb-section-';

			return UAGB_Helper::generate_all_css( $combined_selectors, $base_selector . $id );
		}

		/**
		 * Get Columns Block CSS
		 *
		 * @since 1.8.0
		 * @param array  $attr The block attributes.
		 * @param string $id The selector ID.
		 * @return array The Widget List.
		 */
		public static function get_columns_css( $attr, $id ) {

			global $content_width;

			$defaults = UAGB_Helper::$block_list['uagb/columns']['attributes'];

			$attr = array_merge( $defaults, $attr );

			$bg_type = ( isset( $attr['backgroundType'] ) ) ? $attr['backgroundType'] : 'none';

			$m_selectors          = array();
			$t_selectors          = array();
			$boxShadowPositionCSS = $attr['boxShadowPosition'];
			if ( 'outset' === $attr['boxShadowPosition'] ) {
				$boxShadowPositionCSS = '';
			}
			$style = array(
				'padding-top'    => UAGB_Helper::get_css_value( $attr['topPadding'], $attr['desktopPaddingType'] ),
				'padding-bottom' => UAGB_Helper::get_css_value( $attr['bottomPadding'], $attr['desktopPaddingType'] ),
				'padding-left'   => UAGB_Helper::get_css_value( $attr['leftPadding'], $attr['desktopPaddingType'] ),
				'padding-right'  => UAGB_Helper::get_css_value( $attr['rightPadding'], $attr['desktopPaddingType'] ),
				'margin-top'     => UAGB_Helper::get_css_value( $attr['topMargin'], $attr['desktopMarginType'] ),
				'margin-bottom'  => UAGB_Helper::get_css_value( $attr['bottomMargin'], $attr['desktopMarginType'] ),
				'border-radius'  => UAGB_Helper::get_css_value( $attr['borderRadius'], $attr['desktopMarginType'] ),
			);

			if ( 'none' !== $attr['borderStyle'] ) {
				$style['border-style'] = $attr['borderStyle'];
				$style['border-width'] = UAGB_Helper::get_css_value( $attr['borderWidth'], 'px' );
				$style['border-color'] = $attr['borderColor'];
			}

			$position = str_replace( '-', ' ', $attr['backgroundPosition'] );

			if ( 'image' === $bg_type ) {

				$style['background-image']      = ( isset( $attr['backgroundImage'] ) && isset( $attr['backgroundImage']['url'] ) ) ? "url('" . $attr['backgroundImage']['url'] . "' )" : null;
				$style['background-position']   = $position;
				$style['background-attachment'] = $attr['backgroundAttachment'];
				$style['background-repeat']     = $attr['backgroundRepeat'];
				$style['background-size']       = $attr['backgroundSize'];

			}

			$inner_width = '100%';

			if ( isset( $attr['contentWidth'] ) ) {
				if ( 'theme' === $attr['contentWidth'] ) {
					$inner_width = UAGB_Helper::get_css_value( $content_width, 'px' );
				} elseif ( 'custom' === $attr['contentWidth'] ) {
					$inner_width = UAGB_Helper::get_css_value( $attr['width'], $attr['widthType'] );
				}
			}

			$selectors = array(
				'.uagb-columns__wrap'              => $style,
				' .uagb-columns__video-wrap'       => array(
					'opacity' => ( isset( $attr['backgroundVideoOpacity'] ) && '' !== $attr['backgroundVideoOpacity'] ) ? ( ( 100 - $attr['backgroundVideoOpacity'] ) / 100 ) : 0.5,
				),
				' > .uagb-columns__inner-wrap'     => array(
					'max-width' => $inner_width,
				),
				' .uagb-column__inner-wrap'        => array(
					'padding' => UAGB_Helper::get_css_value( $attr['columnGap'], 'px' ),
				),
				' .uagb-columns__shape-top svg'    => array(
					'height' => UAGB_Helper::get_css_value( $attr['topHeight'], 'px' ),
				),
				' .uagb-columns__shape.uagb-columns__shape-top .uagb-columns__shape-fill' => array(
					'fill' => UAGB_Helper::hex2rgba( $attr['topColor'], ( isset( $attr['topDividerOpacity'] ) && '' !== $attr['topDividerOpacity'] ) ? $attr['topDividerOpacity'] : 100 ),
				),
				' .uagb-columns__shape-bottom svg' => array(
					'height' => UAGB_Helper::get_css_value( $attr['bottomHeight'], 'px' ),
				),
				' .uagb-columns__shape.uagb-columns__shape-bottom .uagb-columns__shape-fill' => array(
					'fill' => UAGB_Helper::hex2rgba( $attr['bottomColor'], ( isset( $attr['bottomDividerOpacity'] ) && '' !== $attr['bottomDividerOpacity'] ) ? $attr['bottomDividerOpacity'] : 100 ),
				),
				'.wp-block-uagb-columns'           => array(
					'box-shadow' => UAGB_Helper::get_css_value( $attr['boxShadowHOffset'], 'px' ) . ' ' . UAGB_Helper::get_css_value( $attr['boxShadowVOffset'], 'px' ) . ' ' . UAGB_Helper::get_css_value( $attr['boxShadowBlur'], 'px' ) . ' ' . UAGB_Helper::get_css_value( $attr['boxShadowSpread'], 'px' ) . ' ' . $attr['boxShadowColor'] . ' ' . $boxShadowPositionCSS,
				),
			);

			if ( '' !== $attr['topWidth'] ) {
				$selectors[' .uagb-columns__shape-top svg']['width'] = 'calc( ' . $attr['topWidth'] . '% + 1.3px )';
			}

			if ( '' !== $attr['bottomWidth'] ) {
				$selectors[' .uagb-columns__shape-bottom svg']['width'] = 'calc( ' . $attr['bottomWidth'] . '% + 1.3px )';
			}

			if ( 'video' === $bg_type ) {
				$selectors[' > .uagb-columns__overlay'] = array(
					'opacity'          => 1,
					'background-color' => $attr['backgroundVideoColor'],
				);
			} elseif ( 'image' === $bg_type ) {
				$selectors[' > .uagb-columns__overlay'] = array(
					'opacity'          => ( isset( $attr['backgroundOpacity'] ) && '' !== $attr['backgroundOpacity'] ) ? $attr['backgroundOpacity'] / 100 : 0,
					'background-color' => $attr['backgroundImageColor'],
				);
			} elseif ( 'color' === $bg_type ) {
				$selectors[' > .uagb-columns__overlay'] = array(
					'opacity'          => ( isset( $attr['backgroundOpacity'] ) && '' !== $attr['backgroundOpacity'] ) ? $attr['backgroundOpacity'] / 100 : '',
					'background-color' => $attr['backgroundColor'],
				);
			} elseif ( 'gradient' === $bg_type ) {
				$selectors[' > .uagb-columns__overlay']['background-color'] = 'transparent';
				$selectors[' > .uagb-columns__overlay']['opacity']          = ( isset( $attr['backgroundOpacity'] ) && '' !== $attr['backgroundOpacity'] ) ? $attr['backgroundOpacity'] / 100 : '';

				if ( $attr['gradientValue'] ) {
					$selectors[' > .uagb-columns__overlay']['background-image'] = $attr['gradientValue'];
				} else {
					if ( 'linear' === $attr['gradientType'] ) {
						$selectors[' > .uagb-columns__overlay']['background-image'] = 'linear-gradient(' . $attr['gradientAngle'] . 'deg, ' . $attr['gradientColor1'] . ' ' . $attr['gradientLocation1'] . '%, ' . $attr['gradientColor2'] . ' ' . $attr['gradientLocation2'] . '%)';
					} else {
						$selectors[' > .uagb-columns__overlay']['background-image'] = 'radial-gradient( at center center, ' . $attr['gradientColor1'] . ' ' . $attr['gradientLocation1'] . '%, ' . $attr['gradientColor2'] . ' ' . $attr['gradientLocation2'] . '%)';
					}
				}
			}

			$selectors[' > .uagb-columns__overlay']['border-radius'] = UAGB_Helper::get_css_value( $attr['borderRadius'], 'px' );

			$m_selectors = array(
				'.uagb-columns__wrap'              => array(
					'padding-top'    => UAGB_Helper::get_css_value( $attr['topPaddingMobile'], $attr['mobilePaddingType'] ),
					'padding-bottom' => UAGB_Helper::get_css_value( $attr['bottomPaddingMobile'], $attr['mobilePaddingType'] ),
					'padding-left'   => UAGB_Helper::get_css_value( $attr['leftPaddingMobile'], $attr['mobilePaddingType'] ),
					'padding-right'  => UAGB_Helper::get_css_value( $attr['rightPaddingMobile'], $attr['mobilePaddingType'] ),
					'margin-top'     => UAGB_Helper::get_css_value( $attr['topMarginMobile'], $attr['mobileMarginType'] ),
					'margin-bottom'  => UAGB_Helper::get_css_value( $attr['bottomMarginMobile'], $attr['mobileMarginType'] ),
				),
				' .uagb-columns__shape-bottom svg' => array(
					'height' => UAGB_Helper::get_css_value( $attr['bottomHeightMobile'], 'px' ),
				),
				' .uagb-columns__shape-top svg'    => array(
					'height' => UAGB_Helper::get_css_value( $attr['topHeightMobile'], 'px' ),
				),
			);

			$t_selectors = array(
				'.uagb-columns__wrap'              => array(
					'padding-top'    => UAGB_Helper::get_css_value( $attr['topPaddingTablet'], $attr['tabletPaddingType'] ),
					'padding-bottom' => UAGB_Helper::get_css_value( $attr['bottomPaddingTablet'], $attr['tabletPaddingType'] ),
					'padding-left'   => UAGB_Helper::get_css_value( $attr['leftPaddingTablet'], $attr['tabletPaddingType'] ),
					'padding-right'  => UAGB_Helper::get_css_value( $attr['rightPaddingTablet'], $attr['tabletPaddingType'] ),
					'margin-top'     => UAGB_Helper::get_css_value( $attr['topMarginTablet'], $attr['tabletMarginType'] ),
					'margin-bottom'  => UAGB_Helper::get_css_value( $attr['bottomMarginTablet'], $attr['tabletMarginType'] ),
				),
				' .uagb-columns__shape-bottom svg' => array(
					'height' => UAGB_Helper::get_css_value( $attr['bottomHeightTablet'], 'px' ),
				),
				' .uagb-columns__shape-top svg'    => array(
					'height' => UAGB_Helper::get_css_value( $attr['topHeightTablet'], 'px' ),
				),
			);

			$combined_selectors = array(
				'desktop' => $selectors,
				'tablet'  => $t_selectors,
				'mobile'  => $m_selectors,
			);

			$base_selector = ( $attr['classMigrate'] ) ? '.uagb-block-' : '#uagb-columns-';

			return UAGB_Helper::generate_all_css( $combined_selectors, $base_selector . $id );
		}

		/**
		 * Get Single Column Block CSS
		 *
		 * @since 1.8.0
		 * @param array  $attr The block attributes.
		 * @param string $id The selector ID.
		 * @return array The Widget List.
		 */
		public static function get_column_css( $attr, $id ) {

			global $content_width;

			$defaults = UAGB_Helper::$block_list['uagb/column']['attributes'];

			$attr = array_merge( $defaults, $attr );

			$bg_type      = ( isset( $attr['backgroundType'] ) ) ? $attr['backgroundType'] : 'none';
			$overlay_type = ( isset( $attr['overlayType'] ) ) ? $attr['overlayType'] : 'none';

			$style = array(
				'padding-top'    => UAGB_Helper::get_css_value( $attr['topPadding'], $attr['desktopPaddingType'] ),
				'padding-bottom' => UAGB_Helper::get_css_value( $attr['bottomPadding'], $attr['desktopPaddingType'] ),
				'padding-left'   => UAGB_Helper::get_css_value( $attr['leftPadding'], $attr['desktopPaddingType'] ),
				'padding-right'  => UAGB_Helper::get_css_value( $attr['rightPadding'], $attr['desktopPaddingType'] ),
				'margin-top'     => UAGB_Helper::get_css_value( $attr['topMargin'], $attr['desktopMarginType'] ),
				'margin-bottom'  => UAGB_Helper::get_css_value( $attr['bottomMargin'], $attr['desktopMarginType'] ),
				'margin-left'    => UAGB_Helper::get_css_value( $attr['leftMargin'], $attr['desktopMarginType'] ),
				'margin-right'   => UAGB_Helper::get_css_value( $attr['rightMargin'], $attr['desktopMarginType'] ),
				'border-radius'  => UAGB_Helper::get_css_value( $attr['borderRadius'], 'px' ),
			);

			$m_selectors = array();
			$t_selectors = array();

			if ( 'none' !== $attr['borderStyle'] ) {
				$style['border-style'] = $attr['borderStyle'];
				$style['border-width'] = UAGB_Helper::get_css_value( $attr['borderWidth'], 'px' );
				$style['border-color'] = $attr['borderColor'];
			}

			$position = str_replace( '-', ' ', $attr['backgroundPosition'] );

			if ( 'image' === $bg_type ) {

				$style['background-image']      = ( isset( $attr['backgroundImage'] ) && isset( $attr['backgroundImage']['url'] ) ) ? "url('" . $attr['backgroundImage']['url'] . "' )" : null;
				$style['background-position']   = $position;
				$style['background-attachment'] = $attr['backgroundAttachment'];
				$style['background-repeat']     = $attr['backgroundRepeat'];
				$style['background-size']       = $attr['backgroundSize'];

			}

			$selectors = array(
				'.uagb-column__wrap' => $style,
			);

			if ( 'image' === $bg_type ) {
				if ( 'color' === $overlay_type ) {
					$selectors[' > .uagb-column__overlay'] = array(
						'opacity'          => ( isset( $attr['backgroundOpacity'] ) && '' !== $attr['backgroundOpacity'] ) ? $attr['backgroundOpacity'] / 100 : 0,
						'background-color' => $attr['backgroundImageColor'],
					);
				} else {
					$selectors[' > .uagb-column__overlay']['background-color'] = 'transparent';
					$selectors[' > .uagb-column__overlay']['opacity']          = ( isset( $attr['backgroundOpacity'] ) && '' !== $attr['backgroundOpacity'] ) ? $attr['backgroundOpacity'] / 100 : '';

					if ( 'linear' === $attr['gradientOverlayType'] ) {

						$selectors[' > .uagb-column__overlay']['background-image'] = 'linear-gradient(' . $attr['gradientOverlayAngle'] . 'deg, ' . $attr['gradientOverlayColor1'] . ' ' . $attr['gradientOverlayLocation1'] . '%, ' . $attr['gradientOverlayColor2'] . ' ' . $attr['gradientOverlayLocation2'] . '%)';
					} else {

						$selectors[' > .uagb-column__overlay']['background-image'] = 'radial-gradient( at center center, ' . $attr['gradientOverlayColor1'] . ' ' . $attr['gradientOverlayLocation1'] . '%, ' . $attr['gradientOverlayColor2'] . ' ' . $attr['gradientOverlayLocation2'] . '%)';
					}
				}
			} elseif ( 'color' === $bg_type ) {
				$selectors[' > .uagb-column__overlay'] = array(
					'opacity'          => ( isset( $attr['backgroundOpacity'] ) && '' !== $attr['backgroundOpacity'] ) ? $attr['backgroundOpacity'] / 100 : '',
					'background-color' => $attr['backgroundColor'],
				);
			} elseif ( 'gradient' === $bg_type ) {
				$selectors[' > .uagb-column__overlay']['background-color'] = 'transparent';
				$selectors[' > .uagb-column__overlay']['opacity']          = ( isset( $attr['backgroundOpacity'] ) && '' !== $attr['backgroundOpacity'] ) ? $attr['backgroundOpacity'] / 100 : '';

				if ( $attr['gradientValue'] ) {
					$selectors[' > .uagb-column__overlay']['background-image'] = $attr['gradientValue'];
				} else {
					if ( 'linear' === $attr['gradientType'] ) {
						$selectors[' > .uagb-column__overlay']['background-image'] = 'linear-gradient(' . $attr['gradientAngle'] . 'deg, ' . $attr['gradientColor1'] . ' ' . $attr['gradientLocation1'] . '%, ' . $attr['gradientColor2'] . ' ' . $attr['gradientLocation2'] . '%)';
					} else {
						$selectors[' > .uagb-column__overlay']['background-image'] = 'radial-gradient( at center center, ' . $attr['gradientColor1'] . ' ' . $attr['gradientLocation1'] . '%, ' . $attr['gradientColor2'] . ' ' . $attr['gradientLocation2'] . '%)';
					}
				}
			}

			if ( '' !== $attr['colWidth'] && 0 !== $attr['colWidth'] ) {

				$selectors['.uagb-column__wrap']['width'] = UAGB_Helper::get_css_value( $attr['colWidth'], '%' );
			}

			$m_selectors = array(
				'.uagb-column__wrap' => array(
					'padding-top'    => UAGB_Helper::get_css_value( $attr['topPaddingMobile'], $attr['mobilePaddingType'] ),
					'padding-bottom' => UAGB_Helper::get_css_value( $attr['bottomPaddingMobile'], $attr['mobilePaddingType'] ),
					'padding-left'   => UAGB_Helper::get_css_value( $attr['leftPaddingMobile'], $attr['mobilePaddingType'] ),
					'padding-right'  => UAGB_Helper::get_css_value( $attr['rightPaddingMobile'], $attr['mobilePaddingType'] ),
					'margin-top'     => UAGB_Helper::get_css_value( $attr['topMarginMobile'], $attr['mobileMarginType'] ),
					'margin-bottom'  => UAGB_Helper::get_css_value( $attr['bottomMarginMobile'], $attr['mobileMarginType'] ),
					'margin-left'    => UAGB_Helper::get_css_value( $attr['leftMarginMobile'], $attr['mobileMarginType'] ),
					'margin-right'   => UAGB_Helper::get_css_value( $attr['rightMarginMobile'], $attr['mobileMarginType'] ),
				),
			);

			$t_selectors = array(
				'.uagb-column__wrap' => array(
					'padding-top'    => UAGB_Helper::get_css_value( $attr['topPaddingTablet'], $attr['tabletPaddingType'] ),
					'padding-bottom' => UAGB_Helper::get_css_value( $attr['bottomPaddingTablet'], $attr['tabletPaddingType'] ),
					'padding-left'   => UAGB_Helper::get_css_value( $attr['leftPaddingTablet'], $attr['tabletPaddingType'] ),
					'padding-right'  => UAGB_Helper::get_css_value( $attr['rightPaddingTablet'], $attr['tabletPaddingType'] ),
					'margin-top'     => UAGB_Helper::get_css_value( $attr['topMarginTablet'], $attr['tabletMarginType'] ),
					'margin-bottom'  => UAGB_Helper::get_css_value( $attr['bottomMarginTablet'], $attr['tabletMarginType'] ),
					'margin-left'    => UAGB_Helper::get_css_value( $attr['leftMarginTablet'], $attr['tabletMarginType'] ),
					'margin-right'   => UAGB_Helper::get_css_value( $attr['rightMarginTablet'], $attr['tabletMarginType'] ),
				),
			);

			if ( '' !== $attr['colWidthTablet'] && 0 !== $attr['colWidthTablet'] ) {

				$t_selectors['.uagb-column__wrap']['width'] = UAGB_Helper::get_css_value( $attr['colWidthTablet'], '%' );
			}

			if ( '' !== $attr['colWidthMobile'] && 0 !== $attr['colWidthMobile'] ) {

				$m_selectors['.uagb-column__wrap']['width'] = UAGB_Helper::get_css_value( $attr['colWidthMobile'], '%' );
			}

			$combined_selectors = array(
				'desktop' => $selectors,
				'tablet'  => $t_selectors,
				'mobile'  => $m_selectors,
			);

			$base_selector = ( $attr['classMigrate'] ) ? '.uagb-block-' : '#uagb-column-';

			return UAGB_Helper::generate_all_css( $combined_selectors, $base_selector . $id );
		}

		/**
		 * Get Advanced Heading Block CSS
		 *
		 * @since 0.0.1
		 * @param array  $attr The block attributes.
		 * @param string $id The selector ID.
		 * @return array The Widget List.
		 */
		public static function get_adv_heading_css( $attr, $id ) {

			$defaults = UAGB_Helper::$block_list['uagb/advanced-heading']['attributes'];

			$attr = array_merge( $defaults, (array) $attr );

			$m_selectors = array();
			$t_selectors = array();

			$selectors = array(
				'.wp-block-uagb-advanced-heading .uagb-heading-text' => array(
					'text-align'    => $attr['headingAlign'],
					'color'         => $attr['headingColor'],
					'margin-bottom' => UAGB_Helper::get_css_value( $attr['headSpace'], 'px' ),
				),
				' .uagb-separator-wrap' => array(
					'text-align' => $attr['headingAlign'],
				),
				'.wp-block-uagb-advanced-heading .uagb-desc-text' => array(
					'text-align' => $attr['headingAlign'],
					'color'      => $attr['subHeadingColor'],
				),

			);

			$seperatorStyle = isset( $attr['seperatorStyle'] ) ? $attr['seperatorStyle'] : '';

			if ( 'none' !== $seperatorStyle ) {
				$selectors[' .uagb-separator'] = array(
					'border-top-style' => $attr['seperatorStyle'],
					'border-top-width' => UAGB_Helper::get_css_value( $attr['separatorHeight'], 'px' ),
					'width'            => UAGB_Helper::get_css_value( $attr['separatorWidth'], $attr['separatorWidthType'] ),
					'border-color'     => $attr['separatorColor'],
					'margin-bottom'    => UAGB_Helper::get_css_value( $attr['separatorSpace'], 'px' ),
				);

			}

			$combined_selectors = array(
				'desktop' => $selectors,
				'tablet'  => $t_selectors,
				'mobile'  => $m_selectors,
			);

			$combined_selectors = UAGB_Helper::get_typography_css( $attr, 'head', ' .uagb-heading-text', $combined_selectors );
			$combined_selectors = UAGB_Helper::get_typography_css( $attr, 'subHead', ' .uagb-desc-text', $combined_selectors );

			$base_selector = ( $attr['classMigrate'] ) ? '.uagb-block-' : '#uagb-adv-heading-';

			return UAGB_Helper::generate_all_css( $combined_selectors, $base_selector . $id );
		}

		/**
		 * Get Multi Buttons Block CSS
		 *
		 * @since 0.0.1
		 * @param array  $attr The block attributes.
		 * @param string $id The selector ID.
		 * @return array The Widget List.
		 */
		public static function get_buttons_css( $attr, $id ) {

			$defaults = UAGB_Helper::$block_list['uagb/buttons']['attributes'];

			$attr = array_merge( $defaults, (array) $attr );

			$m_selectors = array();
			$t_selectors = array();

			$selectors = array(
				' .uagb-button__wrapper' => array(
					'margin-left'  => UAGB_Helper::get_css_value( ( $attr['gap'] / 2 ), 'px' ),
					'margin-right' => UAGB_Helper::get_css_value( ( $attr['gap'] / 2 ), 'px' ),
				),
			);

			if ( 'desktop' === $attr['stack'] ) {

				$selectors[' .uagb-button__wrapper'] = array(
					'margin-left'   => 0,
					'margin-right'  => 0,
					'margin-bottom' => UAGB_Helper::get_css_value( $attr['gap'], 'px' ),
				);

				if ( $attr['childMigrate'] ) {
					$selectors[' .uagb-buttons-layout-wrap'] = array(
						'flex-direction' => 'column',
					);
				} else {
					$selectors[' .uagb-buttons__wrap'] = array(
						'flex-direction' => 'column',
					);
				}
			} elseif ( 'tablet' === $attr['stack'] ) {

				$t_selectors[' .uagb-button__wrapper'] = array(
					'margin-left'   => 0,
					'margin-right'  => 0,
					'margin-bottom' => UAGB_Helper::get_css_value( $attr['gap'], 'px' ),
				);

				if ( $attr['childMigrate'] ) {
					$t_selectors[' .uagb-buttons-layout-wrap'] = array(
						'flex-direction' => 'column',
					);
				} else {
					$t_selectors[' .uagb-buttons__wrap'] = array(
						'flex-direction' => 'column',
					);
				}
			} elseif ( 'mobile' === $attr['stack'] ) {

				$m_selectors[' .uagb-button__wrapper'] = array(
					'margin-left'   => 0,
					'margin-right'  => 0,
					'margin-bottom' => UAGB_Helper::get_css_value( $attr['gap'], 'px' ),
				);

				if ( $attr['childMigrate'] ) {
					$m_selectors[' .uagb-buttons-layout-wrap'] = array(
						'flex-direction' => 'column',
					);
				} else {
					$m_selectors[' .uagb-buttons__wrap'] = array(
						'flex-direction' => 'column',
					);
				}
			}
			$alignment = ( 'left' === $attr['align'] ) ? 'flex-start' : ( ( 'right' === $attr['align'] ) ? 'flex-end' : 'center' );

			if ( 'full' === $attr['align'] ) {
				$selectors[' .uagb-buttons__wrap']          = array(
					'justify-content' => 'space-between',
				);
				$selectors[' .uagb-button__link']           = array(
					'text-align' => 'center',
				);
				$selectors[' .wp-block-uagb-buttons-child'] = array(
					'width' => '100%',
				);
				$selectors[' .uagb-buttons__outer-wrap:first-child .uagb-button__wrapper'] = array(
					'margin-left' => 0,
				);
				$selectors[' .uagb-buttons__outer-wrap:last-child .uagb-button__wrapper']  = array(
					'margin-right' => 0,
				);
			} else {
				$selectors['.uagb-buttons__outer-wrap .uagb-buttons__wrap'] = array(
					'justify-content'   => $alignment,
					'-webkit-box-pack'  => $alignment,
					'-ms-flex-pack'     => $alignment,
					'justify-content'   => $alignment,
					'-webkit-box-align' => $alignment,
					'-ms-flex-align'    => $alignment,
					'align-items'       => $alignment,
				);
				if ( 'left' === $attr['align'] ) {
					$selectors[' .uagb-buttons__outer-wrap:first-child .uagb-button__wrapper'] = array(
						'margin-left' => 0,
					);
				}

				if ( 'right' === $attr['align'] ) {
					$selectors[' .uagb-buttons__outer-wrap:last-child .uagb-button__wrapper'] = array(
						'margin-right' => 0,
					);
				}
			}
			if ( $attr['childMigrate'] ) {
					$selectors[' .uagb-buttons-repeater:not(.wp-block-button__link)'] = array(
						'font-family' => $attr['fontFamily'],
						'font-weight' => $attr['fontWeight'],
					);
			}

			if ( ! $attr['childMigrate'] ) {

				$defaults = UAGB_Helper::$block_list['uagb/buttons-child']['attributes'];

				foreach ( $attr['buttons'] as $key => $button ) {

					if ( $attr['btn_count'] <= $key ) {
						break;
					}

					$button = array_merge( $defaults, (array) $button );

					$wrapper = ( ! $attr['childMigrate'] ) ? ' .uagb-buttons-repeater-' . $key . '.uagb-button__wrapper' : ' .uagb-buttons-repeater';

					$selectors[ $wrapper ] = array(
						'font-family' => $attr['fontFamily'],
						'font-weight' => $attr['fontWeight'],
					);

					$child_selectors = self::get_buttons_child_selectors( $button, $key, $attr['childMigrate'] );
					$selectors       = array_merge( $selectors, (array) $child_selectors['selectors'] );
					$t_selectors     = array_merge( $t_selectors, (array) $child_selectors['t_selectors'] );
					$m_selectors     = array_merge( $m_selectors, (array) $child_selectors['m_selectors'] );
				}
			}

			$combined_selectors = array(
				'desktop' => $selectors,
				'tablet'  => $t_selectors,
				'mobile'  => $m_selectors,
			);

			$base_selector = ( $attr['classMigrate'] ) ? '.uagb-block-' : '#uagb-buttons-';

			return UAGB_Helper::generate_all_css( $combined_selectors, $base_selector . $id );
		}
		/**
		 * Get Multi Buttons - Child Block CSS
		 *
		 * @since 1.14.9
		 * @param array  $attr The block attributes.
		 * @param string $id The selector ID.
		 * @return array The Widget List.
		 */
		public static function get_buttons_child_css( $attr, $id ) {

			$defaults = UAGB_Helper::$block_list['uagb/buttons-child']['attributes'];

			$attr               = array_merge( $defaults, (array) $attr );
			$all_selectors      = self::get_buttons_child_selectors( $attr, $id, true );
			$combined_selectors = array(
				'desktop' => $all_selectors['selectors'],
				'tablet'  => $all_selectors['t_selectors'],
				'mobile'  => $all_selectors['m_selectors'],
			);

			return UAGB_Helper::generate_all_css( $combined_selectors, '.uagb-block-' . $id );
		}
		/**
		 * Get Buttons Block CSS
		 *
		 * @since 1.14.9
		 * @param array  $attr The block attributes.
		 * @param string $id The key for the Icon List Item.
		 * @param string $child_migrate The child migration flag.
		 * @return array The Widget List.
		 */
		public static function get_buttons_child_selectors( $attr, $id, $child_migrate ) {

			$wrapper     = ( ! $child_migrate ) ? ' .uagb-buttons-repeater-' . $id : ' .uagb-buttons-repeater';
			$m_selectors = array();
			$t_selectors = array();
			$selectors   = array();

			if ( ! $attr['inheritFromTheme'] ) {
				$attr['sizeType']       = isset( $attr['sizeType'] ) ? $attr['sizeType'] : 'px';
				$attr['lineHeightType'] = isset( $attr['lineHeightType'] ) ? $attr['lineHeightType'] : 'em';

				$selectors[ $wrapper ] = array(
					'font-size'     => UAGB_Helper::get_css_value( $attr['size'], $attr['sizeType'] ),
					'line-height'   => UAGB_Helper::get_css_value( $attr['lineHeight'], $attr['lineHeightType'] ),
					'border-width'  => UAGB_Helper::get_css_value( $attr['borderWidth'], 'px' ),
					'border-color'  => $attr['borderColor'],
					'border-style'  => $attr['borderStyle'],
					'border-radius' => UAGB_Helper::get_css_value( $attr['borderRadius'], 'px' ),
					'background'    => $attr['background'],
					'padding'       => UAGB_Helper::get_css_value( $attr['vPadding'], 'px' ) . ' ' . UAGB_Helper::get_css_value( $attr['hPadding'], 'px' ),
					'color'         => $attr['color'],
				);

				$selectors[ $wrapper . ':hover' ] = array(
					'background'   => $attr['hBackground'],
					'border-width' => UAGB_Helper::get_css_value( $attr['borderWidth'], 'px' ),
					'border-color' => $attr['borderHColor'],
					'border-style' => $attr['borderStyle'],
					'color'        => $attr['hColor'],
				);

				$m_selectors[ $wrapper ] = array(
					'font-size'   => UAGB_Helper::get_css_value( $attr['sizeMobile'], $attr['sizeType'] ),
					'line-height' => UAGB_Helper::get_css_value( $attr['lineHeightMobile'], $attr['lineHeightType'] ),
				);

				$t_selectors[ $wrapper ] = array(
					'font-size'   => UAGB_Helper::get_css_value( $attr['sizeTablet'], $attr['sizeType'] ),
					'line-height' => UAGB_Helper::get_css_value( $attr['lineHeightTablet'], $attr['lineHeightType'] ),
				);
			}

			$selectors[ $wrapper . ' .uagb-button__icon' ] = array(
				'width' => UAGB_Helper::get_css_value( $attr['size'], $attr['sizeType'] ),
			);

			if ( ! $attr['inheritFromTheme'] ) {
				$selectors[ $wrapper . ' .uagb-button__icon' ]['color'] = $attr['color'];
			}

			$selectors[ $wrapper . ' .uagb-button__icon-position-after' ] = array(
				'margin-left' => UAGB_Helper::get_css_value( $attr['iconSpace'], 'px' ),
			);

			$selectors[ $wrapper . ' .uagb-button__icon-position-before' ] = array(
				'margin-right' => UAGB_Helper::get_css_value( $attr['iconSpace'], 'px' ),
			);

			$m_selectors[ $wrapper . ' .uagb-button__icon' ] = array(
				'width'  => UAGB_Helper::get_css_value( $attr['sizeMobile'], $attr['sizeType'] ),
				'height' => UAGB_Helper::get_css_value( $attr['sizeMobile'], $attr['sizeType'] ),
			);

			$t_selectors[ $wrapper . ' .uagb-button__icon' ] = array(
				'width'  => UAGB_Helper::get_css_value( $attr['sizeTablet'], $attr['sizeType'] ),
				'height' => UAGB_Helper::get_css_value( $attr['sizeTablet'], $attr['sizeType'] ),
			);

			return array(

				'selectors'   => $selectors,
				'm_selectors' => $m_selectors,
				't_selectors' => $t_selectors,
			);
		}
		/**
		 * Get Info Box CSS
		 *
		 * @since 0.0.1
		 * @param array  $attr The block attributes.
		 * @param string $id The selector ID.
		 * @return array The Widget List.
		 */
		public static function get_info_box_css( $attr, $id ) {

			$defaults = UAGB_Helper::$block_list['uagb/info-box']['attributes'];

			$attr = array_merge( $defaults, (array) $attr );

			$m_selectors = array();
			$t_selectors = array();

			$cta_icon_size   = UAGB_Helper::get_css_value( $attr['ctaFontSize'], $attr['ctaFontSizeType'] );
			$m_cta_icon_size = UAGB_Helper::get_css_value( $attr['ctaFontSizeMobile'], $attr['ctaFontSizeType'] );
			$t_cta_icon_size = UAGB_Helper::get_css_value( $attr['ctaFontSizeTablet'], $attr['ctaFontSizeType'] );
			$icon_size       = UAGB_Helper::get_css_value( $attr['iconSize'], 'px' );

			$selectors = array(
				' .uagb-ifb-icon'                       => array(
					'height'      => $icon_size,
					'width'       => $icon_size,
					'line-height' => $icon_size,
				),
				' .uagb-ifb-icon > span'                => array(
					'font-size'   => $icon_size,
					'height'      => $icon_size,
					'width'       => $icon_size,
					'line-height' => $icon_size,
					'color'       => $attr['iconColor'],
				),
				' .uagb-ifb-icon svg'                   => array(
					'fill' => $attr['iconColor'],
				),
				' .uagb-ifb-icon:hover > span'          => array(
					'color' => $attr['iconHover'],
				),
				' .uagb-ifb-icon:hover svg'             => array(
					'fill' => $attr['iconHover'],
				),

				' .uagb-infbox__link-to-all:hover ~ .uagb-infobox__content-wrap .uagb-ifb-icon svg' => array(
					'fill' => $attr['iconHover'],
				),

				' .uagb-infobox__content-wrap .uagb-ifb-imgicon-wrap' => array(
					'margin-left'   => UAGB_Helper::get_css_value( $attr['iconLeftMargin'], 'px' ),
					'margin-right'  => UAGB_Helper::get_css_value( $attr['iconRightMargin'], 'px' ),
					'margin-top'    => UAGB_Helper::get_css_value( $attr['iconTopMargin'], 'px' ),
					'margin-bottom' => UAGB_Helper::get_css_value( $attr['iconBottomMargin'], 'px' ),
				),
				' .uagb-infobox .uagb-ifb-image-content img' => array(
					'border-radius' => UAGB_Helper::get_css_value( $attr['iconimgBorderRadius'], 'px' ),
				),
				// Prefix Style.
				' .uagb-ifb-title-prefix'               => array(
					'color'         => $attr['prefixColor'],
					'margin-bottom' => UAGB_Helper::get_css_value( $attr['prefixSpace'], 'px' ),
				),
				// Title Style.

				' .uagb-ifb-title-wrap .uagb-ifb-title' => array(
					'color'         => $attr['headingColor'],
					'margin-bottom' => $attr['headSpace'] . 'px',
				),
				// Description Style.
				' .uagb-ifb-text-wrap .uagb-ifb-desc'   => array(
					'color'         => $attr['subHeadingColor'],
					'margin-bottom' => UAGB_Helper::get_css_value( $attr['subHeadSpace'], 'px' ),
				),
				// Seperator.
				' .uagb-ifb-separator'                  => array(
					'width'            => UAGB_Helper::get_css_value( $attr['seperatorWidth'], $attr['separatorWidthType'] ),
					'border-top-width' => UAGB_Helper::get_css_value( $attr['seperatorThickness'], 'px' ),
					'border-top-color' => $attr['seperatorColor'],
					'border-top-style' => $attr['seperatorStyle'],
				),
				' .uagb-ifb-separator-parent'           => array(
					'margin-bottom' => UAGB_Helper::get_css_value( $attr['seperatorSpace'], 'px' ),
				),
				// CTA icon space.
				' .uagb-ifb-align-icon-after'           => array(
					'margin-left' => UAGB_Helper::get_css_value( $attr['ctaIconSpace'], 'px' ),
				),
				' .uagb-ifb-align-icon-before'          => array(
					'margin-right' => UAGB_Helper::get_css_value( $attr['ctaIconSpace'], 'px' ),
				),
			);

			if ( ! ( $attr['inheritFromTheme'] && 'button' === $attr['ctaType'] ) ) {
				$selectors[' .uagb-infobox-cta-link']                          = array(
					'color' => $attr['ctaLinkColor'],
				);
				$selectors[' .uagb-infobox-cta-link:hover']                    = array(
					'color' => $attr['ctaLinkHoverColor'],
				);
				$selectors[' .uagb-infobox-cta-link .uagb-ifb-button-icon']    = array(
					'font-size'   => $cta_icon_size,
					'height'      => $cta_icon_size,
					'width'       => $cta_icon_size,
					'line-height' => $cta_icon_size,
				);
				$selectors[' .uagb-infobox-cta-link .uagb-ifb-text-icon']      = array(
					'font-size'   => $cta_icon_size,
					'height'      => $cta_icon_size,
					'width'       => $cta_icon_size,
					'line-height' => $cta_icon_size,
				);
				$selectors[' .uagb-infobox-cta-link svg']                      = array(
					'fill' => $attr['ctaLinkColor'],
				);
				$selectors[' .uagb-infobox-cta-link:hover svg']                = array(
					'fill' => $attr['ctaLinkHoverColor'],
				);
				$selectors[' .uagb-ifb-button-wrapper .uagb-infobox-cta-link'] = array(
					'color'            => $attr['ctaBtnLinkColor'],
					'background-color' => $attr['ctaBgColor'],
					'border-style'     => $attr['ctaBorderStyle'],
					'border-color'     => $attr['ctaBorderColor'],
					'border-radius'    => UAGB_Helper::get_css_value( $attr['ctaBorderRadius'], 'px' ),
					'border-width'     => UAGB_Helper::get_css_value( $attr['ctaBorderWidth'], 'px' ),
					'padding-top'      => UAGB_Helper::get_css_value( $attr['ctaBtnVertPadding'], 'px' ),
					'padding-bottom'   => UAGB_Helper::get_css_value( $attr['ctaBtnVertPadding'], 'px' ),
					'padding-left'     => UAGB_Helper::get_css_value( $attr['ctaBtnHrPadding'], 'px' ),
					'padding-right'    => UAGB_Helper::get_css_value( $attr['ctaBtnHrPadding'], 'px' ),

				);
				$selectors[' .uagb-ifb-button-wrapper .uagb-infobox-cta-link svg']       = array(
					'fill' => $attr['ctaBtnLinkColor'],
				);
				$selectors[' .uagb-ifb-button-wrapper .uagb-infobox-cta-link:hover']     = array(
					'color'            => $attr['ctaLinkHoverColor'],
					'background-color' => $attr['ctaBgHoverColor'],
					'border-color'     => $attr['ctaBorderhoverColor'],
				);
				$selectors[' .uagb-ifb-button-wrapper .uagb-infobox-cta-link:hover svg'] = array(
					'fill' => $attr['ctaLinkHoverColor'],
				);
			}

			if ( $attr['imageWidthType'] ) {
				// Image.
				$selectors[' .uagb-ifb-image-content > img'] = array(
					'width'     => UAGB_Helper::get_css_value( $attr['imageWidth'], 'px' ),
					'max-width' => UAGB_Helper::get_css_value( $attr['imageWidth'], 'px' ),
				);
			}

			if ( 'above-title' === $attr['iconimgPosition'] || 'below-title' === $attr['iconimgPosition'] ) {
				$selectors[' .uagb-infobox__content-wrap'] = array(
					'text-align' => $attr['headingAlign'],
				);
			}

			$m_selectors = array(
				' .uagb-infobox-cta-link .uagb-ifb-button-icon' => array(
					'font-size'   => $m_cta_icon_size,
					'height'      => $m_cta_icon_size,
					'width'       => $m_cta_icon_size,
					'line-height' => $m_cta_icon_size,
				),
				' .uagb-infobox-cta-link .uagb-ifb-text-icon' => array(
					'font-size'   => $m_cta_icon_size,
					'height'      => $m_cta_icon_size,
					'width'       => $m_cta_icon_size,
					'line-height' => $m_cta_icon_size,
				),
			);

			$t_selectors = array(
				' .uagb-infobox-cta-link .uagb-ifb-button-icon' => array(
					'font-size'   => $t_cta_icon_size,
					'height'      => $t_cta_icon_size,
					'width'       => $t_cta_icon_size,
					'line-height' => $t_cta_icon_size,
				),
				' .uagb-infobox-cta-link .uagb-ifb-text-icon' => array(
					'font-size'   => $t_cta_icon_size,
					'height'      => $t_cta_icon_size,
					'width'       => $t_cta_icon_size,
					'line-height' => $t_cta_icon_size,
				),
			);

			$combined_selectors = array(
				'desktop' => $selectors,
				'tablet'  => $t_selectors,
				'mobile'  => $m_selectors,
			);

			$combined_selectors = UAGB_Helper::get_typography_css( $attr, 'head', ' .uagb-ifb-title', $combined_selectors );
			$combined_selectors = UAGB_Helper::get_typography_css( $attr, 'subHead', ' .uagb-ifb-desc', $combined_selectors );
			$combined_selectors = UAGB_Helper::get_typography_css( $attr, 'prefix', ' .uagb-ifb-title-prefix', $combined_selectors );
			$combined_selectors = UAGB_Helper::get_typography_css( $attr, 'cta', ' .uagb-infobox-cta-link', $combined_selectors );

			$base_selector = ( $attr['classMigrate'] ) ? '.uagb-block-' : '#uagb-infobox-';

			return UAGB_Helper::generate_all_css( $combined_selectors, $base_selector . $id );

		}

		/**
		 * Get CTA CSS
		 *
		 * @since 1.7.0
		 * @param array  $attr The block attributes.
		 * @param string $id The selector ID.
		 * @return array The Widget List.
		 */
		public static function get_call_to_action_css( $attr, $id ) {

			$defaults = UAGB_Helper::$block_list['uagb/call-to-action']['attributes'];

			$attr = array_merge( $defaults, (array) $attr );

			$t_selectors = array();
			$m_selectors = array();

			$svg_size   = UAGB_Helper::get_css_value( $attr['ctaFontSize'], $attr['ctaFontSizeType'] );
			$m_svg_size = UAGB_Helper::get_css_value( $attr['ctaFontSizeMobile'], $attr['ctaFontSizeType'] );
			$t_svg_size = UAGB_Helper::get_css_value( $attr['ctaFontSizeTablet'], $attr['ctaFontSizeType'] );

			$selectors = array(
				' .uagb-cta__button-wrapper .uagb-cta-with-svg' => array(
					'font-size'   => $svg_size,
					'width'       => $svg_size,
					'height'      => $svg_size,
					'line-height' => $svg_size,
				),
				' .uagb-cta__button-wrapper .uagb-cta__block-link svg' => array(
					'fill' => $attr['ctaBtnLinkColor'],
				),
				' .uagb-cta__button-wrapper:hover .uagb-cta__block-link svg' => array(
					'fill' => $attr['ctaLinkHoverColor'],
				),
				' .uagb-cta__title'               => array(
					'line-height'   => UAGB_Helper::get_css_value( $attr['titleLineHeight'], $attr['titleLineHeightType'] ),
					'color'         => $attr['titleColor'],
					'margin-bottom' => $attr['titleSpace'] . 'px',
				),
				' .uagb-cta__desc'                => array(
					'color'         => $attr['descColor'],
					'margin-bottom' => UAGB_Helper::get_css_value( $attr['descSpace'], 'px' ),
				),
				' .uagb-cta__align-button-after'  => array(
					'margin-left' => UAGB_Helper::get_css_value( $attr['ctaIconSpace'], 'px' ),
				),
				' .uagb-cta__align-button-before' => array(
					'margin-right' => UAGB_Helper::get_css_value( $attr['ctaIconSpace'], 'px' ),
				),
			);

			if ( 'text' === $attr['ctaType'] ) {
				$selectors[' .uagb-cta__button-wrapper a.uagb-cta-typeof-text']        = array(
					'color' => $attr['ctaBtnLinkColor'],
				);
				$selectors[' .uagb-cta__button-wrapper:hover a.uagb-cta-typeof-text '] = array(
					'color' => $attr['ctaLinkHoverColor'],
				);
			}

			if ( ! $attr['inheritFromTheme'] && 'button' === $attr['ctaType'] ) {
				$selectors[' .uagb-cta__button-wrapper a.uagb-cta-typeof-button']       = array(
					'color'            => $attr['ctaBtnLinkColor'],
					'background-color' => $attr['ctaBgColor'],
					'border-style'     => $attr['ctaBorderStyle'],
					'border-color'     => $attr['ctaBorderColor'],
					'border-radius'    => UAGB_Helper::get_css_value( $attr['ctaBorderRadius'], 'px' ),
					'border-width'     => UAGB_Helper::get_css_value( $attr['ctaBorderWidth'], 'px' ),
					'padding-top'      => UAGB_Helper::get_css_value( $attr['ctaBtnVertPadding'], 'px' ),
					'padding-bottom'   => UAGB_Helper::get_css_value( $attr['ctaBtnVertPadding'], 'px' ),
					'padding-left'     => UAGB_Helper::get_css_value( $attr['ctaBtnHrPadding'], 'px' ),
					'padding-right'    => UAGB_Helper::get_css_value( $attr['ctaBtnHrPadding'], 'px' ),
				);
				$selectors[' .uagb-cta__button-wrapper:hover a.uagb-cta-typeof-button'] = array(
					'color'            => $attr['ctaLinkHoverColor'],
					'background-color' => $attr['ctaBgHoverColor'],
					'border-color'     => $attr['ctaBorderhoverColor'],
				);
			}

			$selectors[' .uagb-cta__content-wrap'] = array(
				'text-align' => $attr['textAlign'],
			);

			if ( 'left' === $attr['textAlign'] && 'right' === $attr['ctaPosition'] ) {
				$selectors[' .uagb-cta__left-right-wrap .uagb-cta__content'] = array(
					'margin-left'  => UAGB_Helper::get_css_value( $attr['ctaLeftSpace'], 'px' ),
					'margin-right' => '0',
				);
			}

			if ( 'right' === $attr['textAlign'] && 'right' === $attr['ctaPosition'] ) {
				$selectors[' .uagb-cta__left-right-wrap .uagb-cta__content'] = array(
					'margin-right' => UAGB_Helper::get_css_value( $attr['ctaRightSpace'], 'px' ),
					'margin-left'  => '0',
				);
			}

			if ( 'right' === $attr['ctaPosition'] && ( 'text' === $attr['ctaType'] || 'button' === $attr['ctaType'] ) ) {
				$selectors[' .uagb-cta__content-right .uagb-cta__left-right-wrap .uagb-cta__content'] = array(
					'width' => UAGB_Helper::get_css_value( $attr['contentWidth'], '%' ),
				);

				$selectors[' .uagb-cta__content-right .uagb-cta__left-right-wrap .uagb-cta__link-wrapper'] = array(
					'width' => UAGB_Helper::get_css_value( ( 100 - $attr['contentWidth'] ), '%' ),
				);
			}

			$t_selectors = array(
				' .uagb-cta__button-wrapper .uagb-cta-with-svg'  => array(
					'font-size'   => $t_svg_size,
					'width'       => $t_svg_size,
					'height'      => $t_svg_size,
					'line-height' => $t_svg_size,
				),
			);

			$m_selectors = array(
				' .uagb-cta__button-wrapper .uagb-cta-with-svg'  => array(
					'font-size'   => $m_svg_size,
					'width'       => $m_svg_size,
					'height'      => $m_svg_size,
					'line-height' => $m_svg_size,
				),
			);

			$combined_selectors = array(
				'desktop' => $selectors,
				'tablet'  => $t_selectors,
				'mobile'  => $m_selectors,
			);

			if ( 'text' === $attr['ctaType'] ) {
				$combined_selectors = UAGB_Helper::get_typography_css( $attr, 'cta', ' .uagb-cta__button-wrapper a.uagb-cta-typeof-text', $combined_selectors );
			}

			if ( ! $attr['inheritFromTheme'] && 'button' === $attr['ctaType'] ) {
				$combined_selectors = UAGB_Helper::get_typography_css( $attr, 'cta', ' .uagb-cta__button-wrapper a.uagb-cta-typeof-button', $combined_selectors );
			}
			$combined_selectors = UAGB_Helper::get_typography_css( $attr, 'title', ' .uagb-cta__title', $combined_selectors );
			$combined_selectors = UAGB_Helper::get_typography_css( $attr, 'desc', ' .uagb-cta__desc', $combined_selectors );

			$base_selector = ( $attr['classMigrate'] ) ? '.uagb-block-' : '#uagb-cta-block-';

			return UAGB_Helper::generate_all_css( $combined_selectors, $base_selector . $id );

		}

		/**
		 * Get Testimonial CSS
		 *
		 * @since 0.0.1
		 * @param array  $attr The block attributes.
		 * @param string $id The selector ID.
		 * @return array The Widget List.
		 */
		public static function get_testimonial_css( $attr, $id ) {

			$defaults = UAGB_Helper::$block_list['uagb/testimonial']['attributes'];

			$attr = array_merge( $defaults, (array) $attr );

			$img_align = 'center';
			if ( 'left' === $attr['headingAlign'] ) {
				$img_align = 'flex-start';
			} elseif ( 'right' === $attr['headingAlign'] ) {
				$img_align = 'flex-end';
			}

			$position = str_replace( '-', ' ', $attr['backgroundPosition'] );

			$t_selectors = array();
			$m_selectors = array();

			$selectors = array(
				' .uagb-testimonial__wrap'        => array(
					'padding-left'  => UAGB_Helper::get_css_value( ( ( $attr['columnGap'] ) / 2 ), 'px' ),
					'padding-right' => UAGB_Helper::get_css_value( ( ( $attr['columnGap'] ) / 2 ), 'px' ),
					'margin-bottom' => UAGB_Helper::get_css_value( $attr['rowGap'], 'px' ),
				),
				' .uagb-testimonial__wrap .uagb-tm__image-content' => array(
					'padding-left'   => UAGB_Helper::get_css_value( $attr['imgHrPadding'], 'px' ),
					'padding-right'  => UAGB_Helper::get_css_value( $attr['imgHrPadding'], 'px' ),
					'padding-top'    => UAGB_Helper::get_css_value( $attr['imgVrPadding'], 'px' ),
					'padding-bottom' => UAGB_Helper::get_css_value( $attr['imgVrPadding'], 'px' ),
				),
				' .uagb-tm__image img'            => array(
					'width'     => UAGB_Helper::get_css_value( $attr['imageWidth'], 'px' ),
					'max-width' => UAGB_Helper::get_css_value( $attr['imageWidth'], 'px' ),
				),
				' .uagb-tm__content'              => array(
					'text-align' => $attr['headingAlign'],
					'padding'    => UAGB_Helper::get_css_value( $attr['contentPadding'], 'px' ),
				),
				' .uagb-tm__author-name'          => array(
					'color'         => $attr['authorColor'],
					'margin-bottom' => $attr['nameSpace'] . 'px',
				),
				' .uagb-tm__company'              => array(
					'color' => $attr['companyColor'],
				),
				' .uagb-tm__desc'                 => array(
					'color'         => $attr['descColor'],
					'margin-bottom' => UAGB_Helper::get_css_value( $attr['descSpace'], 'px' ),
				),
				' .uagb-testimonial__wrap.uagb-tm__bg-type-color .uagb-tm__content' => array(
					'background-color' => $attr['backgroundColor'],
				),
				' .uagb-testimonial__wrap.uagb-tm__bg-type-image .uagb-tm__content' => array(
					'background-image'    => ( isset( $attr['backgroundImage']['url'] ) && '' !== $attr['backgroundImage']['url'] ) ? 'url("' . $attr['backgroundImage']['url'] . '")' : null,
					'background-position' => $position,
					'background-repeat'   => $attr['backgroundRepeat'],
					'background-size'     => $attr['backgroundSize'],
				),
				' .uagb-testimonial__wrap.uagb-tm__bg-type-image .uagb-tm__overlay' => array(
					'background-color' => $attr['backgroundImageColor'],
					'opacity'          => ( isset( $attr['backgroundOpacity'] ) && '' !== $attr['backgroundOpacity'] ) ? ( ( 100 - $attr['backgroundOpacity'] ) / 100 ) : '0.5',
				),
				' .uagb-testimonial__wrap .uagb-tm__content' => array(
					'border-color'  => $attr['borderColor'],
					'border-style'  => $attr['borderStyle'],
					'border-width'  => UAGB_Helper::get_css_value( $attr['borderWidth'], 'px' ),
					'border-radius' => UAGB_Helper::get_css_value( $attr['borderRadius'], 'px' ),
				),
				' ul.slick-dots li button:before' => array(
					'color' => $attr['arrowColor'],
				),
				' ul.slick-dots li.slick-active button:before' => array(
					'color' => $attr['arrowColor'],
				),
				' .uagb-tm__image-position-top .uagb-tm__image-content' => array(
					'justify-content' => $img_align,
				),
			);

			if ( 'dots' === $attr['arrowDots'] ) {
				$selectors['.uagb-slick-carousel'] = array(
					'padding' => '0 0 35px 0',
				);
			}

			if ( '1' === $attr['test_item_count'] || $attr['test_item_count'] === $attr['columns'] ) {
				$selectors['.uagb-slick-carousel'] = array(
					'padding' => 0,
				);
			}

			$m_selectors = array(
				' .uagb-tm__content' => array(
					'text-align' => 'center',
				),
			);

			$combined_selectors = array(
				'desktop' => $selectors,
				'tablet'  => $t_selectors,
				'mobile'  => $m_selectors,
			);

			$combined_selectors = UAGB_Helper::get_typography_css( $attr, 'name', '  .uagb-tm__author-name', $combined_selectors );
			$combined_selectors = UAGB_Helper::get_typography_css( $attr, 'company', ' .uagb-tm__company', $combined_selectors );
			$combined_selectors = UAGB_Helper::get_typography_css( $attr, 'desc', ' .uagb-tm__desc', $combined_selectors );

			$base_selector = ( $attr['classMigrate'] ) ? '.uagb-block-' : '#uagb-testimonial-';

			return UAGB_Helper::generate_all_css( $combined_selectors, $base_selector . $id );
		}

		/**
		 * Get Team Block CSS
		 *
		 * @since 0.0.1
		 * @param array  $attr The block attributes.
		 * @param string $id The selector ID.
		 * @return array The Widget List.
		 */
		public static function get_team_css( $attr, $id ) {

			$defaults = UAGB_Helper::$block_list['uagb/team']['attributes'];

			$attr = array_merge( $defaults, (array) $attr );

			$m_selectors = array();
			$t_selectors = array();

			$icon_size   = UAGB_Helper::get_css_value( $attr['socialFontSize'], $attr['socialFontSizeType'] );
			$m_icon_size = UAGB_Helper::get_css_value( $attr['socialFontSizeMobile'], $attr['socialFontSizeType'] );
			$t_icon_size = UAGB_Helper::get_css_value( $attr['socialFontSizeTablet'], $attr['socialFontSizeType'] );

			$selectors = array(
				' p.uagb-team__desc'                 => array(
					'color'         => $attr['descColor'],
					'margin-bottom' => UAGB_Helper::get_css_value( $attr['descSpace'], 'px' ),
				),
				' .uagb-team__prefix'                => array(
					'color' => $attr['prefixColor'],
				),
				' .uagb-team__desc-wrap'             => array(
					'margin-top' => UAGB_Helper::get_css_value( $attr['prefixSpace'], 'px' ),
				),
				' .uagb-team__social-icon a'         => array(
					'color'       => $attr['socialColor'],
					'font-size'   => $icon_size,
					'width'       => $icon_size,
					'height'      => $icon_size,
					'line-height' => $icon_size,
				),
				' .uagb-team__social-icon svg'       => array(
					'fill'   => $attr['socialColor'],
					'width'  => $icon_size,
					'height' => $icon_size,
				),
				' .uagb-team__social-icon:hover a'   => array(
					'color' => $attr['socialHoverColor'],
				),
				' .uagb-team__social-icon:hover svg' => array(
					'fill' => $attr['socialHoverColor'],
				),
				'.uagb-team__image-position-left .uagb-team__social-icon' => array(
					'margin-right' => UAGB_Helper::get_css_value( $attr['socialSpace'], 'px' ),
					'margin-left'  => UAGB_Helper::get_css_value( 0, 'px' ),
				),
				'.uagb-team__image-position-right .uagb-team__social-icon' => array(
					'margin-left'  => UAGB_Helper::get_css_value( $attr['socialSpace'], 'px' ),
					'margin-right' => UAGB_Helper::get_css_value( 0, 'px' ),
				),
				'.uagb-team__image-position-above.uagb-team__align-center .uagb-team__social-icon' => array(
					'margin-right' => UAGB_Helper::get_css_value( ( $attr['socialSpace'] / 2 ), 'px' ),
					'margin-left'  => UAGB_Helper::get_css_value( ( $attr['socialSpace'] / 2 ), 'px' ),
				),
				'.uagb-team__image-position-above.uagb-team__align-left .uagb-team__social-icon' => array(
					'margin-right' => UAGB_Helper::get_css_value( $attr['socialSpace'], 'px' ),
					'margin-left'  => UAGB_Helper::get_css_value( 0, 'px' ),
				),
				'.uagb-team__image-position-above.uagb-team__align-right .uagb-team__social-icon' => array(
					'margin-left'  => UAGB_Helper::get_css_value( $attr['socialSpace'], 'px' ),
					'margin-right' => UAGB_Helper::get_css_value( 0, 'px' ),
				),
				' .uagb-team__image-wrap'            => array(
					'margin-top'    => UAGB_Helper::get_css_value( $attr['imgTopMargin'], 'px' ),
					'margin-bottom' => UAGB_Helper::get_css_value( $attr['imgBottomMargin'], 'px' ),
					'margin-left'   => UAGB_Helper::get_css_value( $attr['imgLeftMargin'], 'px' ),
					'margin-right'  => UAGB_Helper::get_css_value( $attr['imgRightMargin'], 'px' ),
					'width'         => UAGB_Helper::get_css_value( $attr['imgWidth'], 'px' ),
				),
			);

			if ( 'above' === $attr['imgPosition'] ) {
				if ( 'center' === $attr['align'] ) {
					$selectors[' .uagb-team__image-wrap']['margin-left']  = 'auto';
					$selectors[' .uagb-team__image-wrap']['margin-right'] = 'auto';
				} elseif ( 'left' === $attr['align'] ) {
					$selectors[' .uagb-team__image-wrap']['margin-right'] = 'auto';
				} elseif ( 'right' === $attr['align'] ) {
					$selectors[' .uagb-team__image-wrap']['margin-left'] = 'auto';
				}
			}

			if ( 'above' !== $attr['imgPosition'] && 'middle' === $attr['imgAlign'] ) {
				$selectors[' .uagb-team__image-wrap']['align-self'] = 'center';
			}

			$selectors[ ' ' . $attr['tag'] . '.uagb-team__title' ] = array(
				'color'         => $attr['titleColor'],
				'margin-bottom' => UAGB_Helper::get_css_value( $attr['titleSpace'], 'px' ),
			);

			$m_selectors = array(
				' .uagb-team__social-icon a'   => array(
					'font-size'   => $m_icon_size,
					'width'       => $m_icon_size,
					'height'      => $m_icon_size,
					'line-height' => $m_icon_size,
				),
				' .uagb-team__social-icon svg' => array(
					'width'  => $m_icon_size,
					'height' => $m_icon_size,
				),
			);

			$t_selectors = array(
				' .uagb-team__social-icon a'   => array(
					'font-size'   => $t_icon_size,
					'width'       => $t_icon_size,
					'height'      => $t_icon_size,
					'line-height' => $t_icon_size,
				),
				' .uagb-team__social-icon svg' => array(
					'width'  => $t_icon_size,
					'height' => $t_icon_size,
				),
			);

			$combined_selectors = array(
				'desktop' => $selectors,
				'tablet'  => $t_selectors,
				'mobile'  => $m_selectors,
			);

			$combined_selectors = UAGB_Helper::get_typography_css( $attr, 'title', ' ' . $attr['tag'] . '.uagb-team__title', $combined_selectors );
			$combined_selectors = UAGB_Helper::get_typography_css( $attr, 'prefix', ' .uagb-team__prefix', $combined_selectors );
			$combined_selectors = UAGB_Helper::get_typography_css( $attr, 'desc', ' p.uagb-team__desc', $combined_selectors );

			$base_selector = ( $attr['classMigrate'] ) ? '.uagb-block-' : '#uagb-team-';

			return UAGB_Helper::generate_all_css( $combined_selectors, $base_selector . $id );
		}

		/**
		 * Get Social Share Block CSS
		 *
		 * @since 0.0.1
		 * @param array  $attr The block attributes.
		 * @param string $id The selector ID.
		 * @return array The Widget List.
		 */
		public static function get_social_share_css( $attr, $id ) {

			$defaults = UAGB_Helper::$block_list['uagb/social-share']['attributes'];

			$attr = array_merge( $defaults, (array) $attr );

			$alignment = ( 'left' === $attr['align'] ) ? 'flex-start' : ( ( 'right' === $attr['align'] ) ? 'flex-end' : 'center' );

			$m_selectors = array();
			$t_selectors = array();

			$image_size   = UAGB_Helper::get_css_value( $attr['size'], $attr['sizeType'] );
			$m_image_size = UAGB_Helper::get_css_value( $attr['sizeMobile'], $attr['sizeType'] );
			$t_image_size = UAGB_Helper::get_css_value( $attr['sizeTablet'], $attr['sizeType'] );

			$selectors[' .uagb-social-share__wrap .block-editor-inner-blocks'] = array(
				'text-align' => UAGB_Helper::get_css_value( $attr['align'] ),
			);

			$selectors['.uagb-social-share__layout-vertical .uagb-ss__wrapper'] = array(
				'padding'       => UAGB_Helper::get_css_value( $attr['bgSize'], 'px' ),
				'margin-left'   => 0,
				'margin-right'  => 0,
				'margin-bottom' => UAGB_Helper::get_css_value( $attr['gap'], 'px' ),
			);

			$selectors['.uagb-social-share__layout-horizontal .uagb-ss__wrapper'] = array(
				'padding'      => UAGB_Helper::get_css_value( $attr['bgSize'], 'px' ),
				'margin-left'  => UAGB_Helper::get_css_value( ( $attr['gap'] / 2 ), 'px' ),
				'margin-right' => UAGB_Helper::get_css_value( ( $attr['gap'] / 2 ), 'px' ),
			);

			$selectors[' .uagb-ss__wrapper'] = array(
				'border-radius' => UAGB_Helper::get_css_value( $attr['borderRadius'], 'px' ),
			);

			$selectors[' .uagb-ss__source-wrap'] = array(
				'width' => $image_size,
			);

			$selectors[' .uagb-ss__source-wrap svg'] = array(
				'width'  => $image_size,
				'height' => $image_size,
			);

			$selectors[' .uagb-ss__source-image'] = array(
				'width' => $image_size,
			);

			$selectors[' .uagb-ss__source-icon'] = array(
				'width'       => $image_size,
				'height'      => $image_size,
				'font-size'   => $image_size,
				'line-height' => $image_size,
			);

			$t_selectors[' .uagb-ss__source-wrap'] = array(
				'width'       => $t_image_size,
				'height'      => $t_image_size,
				'line-height' => $t_image_size,
			);

			$t_selectors[' .uagb-ss__source-wrap svg'] = array(
				'width'  => $t_image_size,
				'height' => $t_image_size,
			);

			$t_selectors[' .uagb-ss__source-image'] = array(
				'width' => $t_image_size,
			);

			$t_selectors[' .uagb-ss__source-icon'] = array(
				'width'       => $t_image_size,
				'height'      => $t_image_size,
				'font-size'   => $t_image_size,
				'line-height' => $t_image_size,
			);

			$m_selectors[' .uagb-ss__source-wrap'] = array(
				'width'       => $m_image_size,
				'height'      => $m_image_size,
				'line-height' => $m_image_size,
			);

			$m_selectors[' .uagb-ss__source-wrap svg'] = array(
				'width'  => $m_image_size,
				'height' => $m_image_size,
			);

			$m_selectors[' .uagb-ss__source-image'] = array(
				'width' => $m_image_size,
			);

			$m_selectors[' .uagb-ss__source-icon']                                  = array(
				'width'       => $m_image_size,
				'height'      => $m_image_size,
				'font-size'   => $m_image_size,
				'line-height' => $m_image_size,
			);
			$m_selectors['.uagb-social-share__layout-horizontal .uagb-ss__wrapper'] = array(
				'margin-left'  => 0,
				'margin-right' => 0,
			);

			$selectors[' .uagb-social-share__wrap'] = array(
				'justify-content'   => $alignment,
				'-webkit-box-pack'  => $alignment,
				'-ms-flex-pack'     => $alignment,
				'justify-content'   => $alignment,
				'-webkit-box-align' => $alignment,
				'-ms-flex-align'    => $alignment,
				'align-items'       => $alignment,
			);

			if ( ! $attr['childMigrate'] ) {

				$defaults = UAGB_Helper::$block_list['uagb/social-share-child']['attributes'];

				foreach ( $attr['socials'] as $key => $socials ) {

					$socials                        = array_merge( $defaults, (array) $socials );
					$socials['icon_color']          = ( isset( $socials['icon_color'] ) ) ? $socials['icon_color'] : '';
					$socials['icon_hover_color']    = ( isset( $socials['icon_hover_color'] ) ) ? $socials['icon_hover_color'] : '';
					$socials['icon_bg_color']       = ( isset( $socials['icon_bg_color'] ) ) ? $socials['icon_bg_color'] : '';
					$socials['icon_bg_hover_color'] = ( isset( $socials['icon_bg_hover_color'] ) ) ? $socials['icon_bg_hover_color'] : '';

					if ( $attr['social_count'] <= $key ) {
						break;
					}

					$child_selectors = self::get_social_share_child_selectors( $socials, $key, $attr['childMigrate'] );
					$selectors       = array_merge( $selectors, (array) $child_selectors );
				}
			}

			if ( 'horizontal' === $attr['social_layout'] ) {

				if ( 'desktop' === $attr['stack'] ) {

					$selectors[' .uagb-ss__wrapper'] = array(
						'margin-left'   => 0,
						'margin-right'  => 0,
						'margin-bottom' => UAGB_Helper::get_css_value( $attr['gap'], 'px' ),
					);

					$selectors[' .uagb-social-share__wrap'] = array(
						'flex-direction'    => 'column',
						'justify-content'   => $alignment,
						'-webkit-box-pack'  => $alignment,
						'-ms-flex-pack'     => $alignment,
						'justify-content'   => $alignment,
						'-webkit-box-align' => $alignment,
						'-ms-flex-align'    => $alignment,
						'align-items'       => $alignment,
					);

				} elseif ( 'tablet' === $attr['stack'] ) {

					$t_selectors[' .uagb-ss__wrapper'] = array(
						'margin-left'   => 0,
						'margin-right'  => 0,
						'margin-bottom' => UAGB_Helper::get_css_value( $attr['gap'], 'px' ),
					);

					$t_selectors[' .uagb-social-share__wrap'] = array(
						'flex-direction'    => 'column',
						'justify-content'   => $alignment,
						'-webkit-box-pack'  => $alignment,
						'-ms-flex-pack'     => $alignment,
						'justify-content'   => $alignment,
						'-webkit-box-align' => $alignment,
						'-ms-flex-align'    => $alignment,
						'align-items'       => $alignment,
					);

				} elseif ( 'mobile' === $attr['stack'] ) {

					$m_selectors[' .uagb-ss__wrapper'] = array(
						'margin-left'   => 0,
						'margin-right'  => 0,
						'margin-bottom' => UAGB_Helper::get_css_value( $attr['gap'], 'px' ),
					);

					$m_selectors[' .uagb-social-share__wrap'] = array(
						'flex-direction'    => 'column',
						'justify-content'   => $alignment,
						'-webkit-box-pack'  => $alignment,
						'-ms-flex-pack'     => $alignment,
						'justify-content'   => $alignment,
						'-webkit-box-align' => $alignment,
						'-ms-flex-align'    => $alignment,
						'align-items'       => $alignment,
					);
				}
			}

			$combined_selectors = array(
				'desktop' => $selectors,
				'tablet'  => $t_selectors,
				'mobile'  => $m_selectors,
			);

			$base_selector = ( $attr['classMigrate'] ) ? '.uagb-block-' : '#uagb-social-share-';

			return UAGB_Helper::generate_all_css( $combined_selectors, $base_selector . $id );
		}

		/**
		 * Get social share Block CSS
		 *
		 * @since 1.14.9
		 * @param array  $attr The block attributes.
		 * @param string $id The selector ID.
		 * @return array The Widget List.
		 */
		public static function get_social_share_child_css( $attr, $id ) {

			$defaults = UAGB_Helper::$block_list['uagb/social-share-child']['attributes'];

			$attr = array_merge( $defaults, (array) $attr );

			$selectors = self::get_social_share_child_selectors( $attr, $id, true );

			$desktop = UAGB_Helper::generate_css( $selectors, '.uagb-block-' . $id );

			$generated_css = array(
				'desktop' => $desktop,
				'tablet'  => '',
				'mobile'  => '',
			);

			return $generated_css;
		}

		/**
		 * Get Social share Block CSS
		 *
		 * @since 1.14.9
		 * @param array  $attr The block attributes.
		 * @param string $id The key for the Icon List Item.
		 * @param string $childMigrate The child migration flag.
		 * @return array The Widget List.
		 */
		public static function get_social_share_child_selectors( $attr, $id, $childMigrate ) {

			$wrapper = ( ! $childMigrate ) ? ' .uagb-ss-repeater-' . $id : '.uagb-ss-repeater';

			$selectors[ $wrapper . ' a.uagb-ss__link' ]           = array(
				'color' => $attr['icon_color'],
			);
			$selectors[ $wrapper . ' a.uagb-ss__link' ]           = array(
				'color' => $attr['icon_color'],
			);
			$selectors[ $wrapper . ' a.uagb-ss__link svg' ]       = array(
				'fill' => $attr['icon_color'],
			);
			$selectors[ $wrapper . ':hover a.uagb-ss__link' ]     = array(
				'color' => $attr['icon_hover_color'],
			);
			$selectors[ $wrapper . ':hover a.uagb-ss__link svg' ] = array(
				'fill' => $attr['icon_hover_color'],
			);

			$selectors[ $wrapper . '.uagb-ss__wrapper' ]       = array(
				'background' => $attr['icon_bg_color'],
			);
			$selectors[ $wrapper . '.uagb-ss__wrapper:hover' ] = array(
				'background' => $attr['icon_bg_hover_color'],
			);

			return $selectors;
		}


		/**
		 * Get Icon List Block CSS
		 *
		 * @since 0.0.1
		 * @param array  $attr The block attributes.
		 * @param string $id The selector ID.
		 * @return array The Widget List.
		 */
		public static function get_icon_list_css( $attr, $id ) {

			$defaults = UAGB_Helper::$block_list['uagb/icon-list']['attributes'];

			$attr = array_merge( $defaults, (array) $attr );

			$alignment = ( 'left' === $attr['align'] ) ? 'flex-start' : ( ( 'right' === $attr['align'] ) ? 'flex-end' : 'center' );

			$m_selectors = array();
			$t_selectors = array();

			$icon_size   = UAGB_Helper::get_css_value( $attr['size'], $attr['sizeType'] );
			$m_icon_size = UAGB_Helper::get_css_value( $attr['sizeMobile'], $attr['sizeType'] );
			$t_icon_size = UAGB_Helper::get_css_value( $attr['size'], $attr['sizeType'] );

			$selectors = array(
				'.uagb-icon-list__layout-vertical .uagb-icon-list__wrapper' => array(
					'margin-left'   => 0,
					'margin-right'  => 0,
					'margin-bottom' => UAGB_Helper::get_css_value( $attr['gap'], 'px' ),
				),
				'.uagb-icon-list__layout-vertical .uagb-icon-list__wrap' => array(
					'flex-direction' => 'column',
				),
				'.uagb-icon-list__layout-vertical .uagb-icon-list__wrapper:last-child' => array(
					'margin-bottom' => 0,
				),
				'.uagb-icon-list__layout-horizontal .uagb-icon-list__wrapper' => array(
					'margin-left'  => UAGB_Helper::get_css_value( ( $attr['gap'] / 2 ), 'px' ),
					'margin-right' => UAGB_Helper::get_css_value( ( $attr['gap'] / 2 ), 'px' ),
				),
				'.uagb-icon-list__layout-horizontal .uagb-icon-list__wrapper:first-child' => array(
					'margin-left' => 0,
				),
				'.uagb-icon-list__layout-horizontal .uagb-icon-list__wrapper:last-child' => array(
					'margin-right' => 0,
				),
				// Desktop Icon Size CSS starts.
				' .uagb-icon-list__source-image'       => array(
					'width' => $icon_size,
				),
				' .uagb-icon-list__source-icon'        => array(
					'width'     => $icon_size,
					'height'    => $icon_size,
					'font-size' => $icon_size,
				),
				' .uagb-icon-list__source-icon svg'    => array(
					'width'  => $icon_size,
					'height' => $icon_size,
				),
				' .uagb-icon-list__source-icon:before' => array(
					'width'     => $icon_size,
					'height'    => $icon_size,
					'font-size' => $icon_size,
				),
				' .uagb-icon-list__label-wrap'         => array(
					'text-align' => $attr['align'],
				),

				' .uagb-icon-list__source-wrap'        => array(
					'padding'       => UAGB_Helper::get_css_value( $attr['bgSize'], 'px' ),
					'border-radius' => UAGB_Helper::get_css_value( $attr['borderRadius'], 'px' ),
					'border-style'  => ( $attr['border'] > 0 ) ? 'solid' : '',
					'border-width'  => UAGB_Helper::get_css_value( $attr['border'], 'px' ),
				),
				' .uagb-icon-list__wrap'               => array(
					'justify-content'   => $alignment,
					'-webkit-box-pack'  => $alignment,
					'-ms-flex-pack'     => $alignment,
					'justify-content'   => $alignment,
					'-webkit-box-align' => $alignment,
					'-ms-flex-align'    => $alignment,
					'align-items'       => $alignment,
				),
			);

			if ( $attr['childMigrate'] ) {
				$selectors[' .uagb-icon-list-repeater'] = array(
					'font-family' => $attr['fontFamily'],
					'font-weight' => $attr['fontWeight'],
					'font-size'   => UAGB_Helper::get_css_value( $attr['fontSize'], $attr['fontSizeType'] ),
					'line-height' => $attr['lineHeight'] . $attr['lineHeightType'],
				);
			}

			if ( 'right' === $attr['align'] ) {
				$selectors[':not(.uagb-icon-list__no-label) .uagb-icon-list__source-wrap'] = array(
					'margin-left' => UAGB_Helper::get_css_value( $attr['inner_gap'], 'px' ),
				);
				$selectors[' .uagb-icon-list__content-wrap']                               = array(
					'flex-direction' => 'row-reverse',
				);
			} else {
				$selectors[':not(.uagb-icon-list__no-label) .uagb-icon-list__source-wrap'] = array(
					'margin-right' => UAGB_Helper::get_css_value( $attr['inner_gap'], 'px' ),
				);
			}
			// Desktop Icon Size CSS ends.
			// Mobile Icon Size CSS starts.
			$m_selectors = array(
				' .uagb-icon-list__source-image'       => array(
					'width' => $m_icon_size,
				),
				' .uagb-icon-list__source-icon'        => array(
					'width'     => $m_icon_size,
					'height'    => $m_icon_size,
					'font-size' => $m_icon_size,
				),
				' .uagb-icon-list__source-icon svg'    => array(
					'width'  => $m_icon_size,
					'height' => $m_icon_size,
				),
				' .uagb-icon-list__source-icon:before' => array(
					'width'     => $m_icon_size,
					'height'    => $m_icon_size,
					'font-size' => $m_icon_size,
				),
			);
			// Mobile Icon Size CSS ends.
			// Tablet Icon Size CSS starts.
			$t_selectors = array(
				' .uagb-icon-list__source-image'       => array(
					'width' => $t_icon_size,
				),
				' .uagb-icon-list__source-icon'        => array(
					'width'     => $t_icon_size,
					'height'    => $t_icon_size,
					'font-size' => $t_icon_size,
				),
				' .uagb-icon-list__source-icon svg'    => array(
					'width'  => $t_icon_size,
					'height' => $t_icon_size,
				),
				' .uagb-icon-list__source-icon:before' => array(
					'width'     => $t_icon_size,
					'height'    => $t_icon_size,
					'font-size' => $t_icon_size,
				),
			);
			// Tablet Icon Size CSS ends.
			$selectors[' .uagb-icon-list-repeater .uagb-icon-list__label'] = array(
				'font-size'   => UAGB_Helper::get_css_value( $attr['fontSize'], $attr['fontSizeType'] ),
				'font-family' => $attr['fontFamily'],
				'font-weight' => $attr['fontWeight'],
				'line-height' => $attr['lineHeight'] . $attr['lineHeightType'],
			);

			$m_selectors[' .uagb-icon-list-repeater .uagb-icon-list__label'] = array(
				'font-size'   => UAGB_Helper::get_css_value( $attr['fontSizeMobile'], $attr['fontSizeType'] ),
				'line-height' => UAGB_Helper::get_css_value( $attr['lineHeightMobile'], $attr['lineHeightType'] ),
			);

			$t_selectors[' .uagb-icon-list-repeater .uagb-icon-list__label'] = array(
				'font-size'   => UAGB_Helper::get_css_value( $attr['fontSizeTablet'], $attr['fontSizeType'] ),
				'line-height' => UAGB_Helper::get_css_value( $attr['lineHeightTablet'], $attr['lineHeightType'] ),
			);

			if ( 'horizontal' === $attr['icon_layout'] ) {

				if ( 'tablet' === $attr['stack'] ) {

					$t_selectors[' .uagb-icon-list__wrap .uagb-icon-list__wrapper'] = array(
						'margin-left'   => 0,
						'margin-right'  => 0,
						'margin-bottom' => UAGB_Helper::get_css_value( $attr['gap'], 'px' ),
					);

					$t_selectors[' .uagb-icon-list__wrap'] = array(
						'flex-direction' => 'column',
					);

					$t_selectors[' .uagb-icon-list__wrap .uagb-icon-list__wrapper:last-child'] = array(
						'margin-bottom' => 0,
					);

				} elseif ( 'mobile' === $attr['stack'] ) {

					$m_selectors[' .uagb-icon-list__wrap .uagb-icon-list__wrapper'] = array(
						'margin-left'   => 0,
						'margin-right'  => 0,
						'margin-bottom' => UAGB_Helper::get_css_value( $attr['gap'], 'px' ),
					);

					$m_selectors[' .uagb-icon-list__wrap'] = array(
						'flex-direction' => 'column',
					);

					$m_selectors[' .uagb-icon-list__wrap .uagb-icon-list__wrapper:last-child'] = array(
						'margin-bottom' => 0,
					);
				}
			}
			if ( ! $attr['childMigrate'] ) {

				$defaults = UAGB_Helper::$block_list['uagb/icon-list-child']['attributes'];

				foreach ( $attr['icons'] as $key => $icon ) {

					$wrapper = ( ! $attr['childMigrate'] ) ? ' .uagb-icon-list-repeater-' . $key . '.uagb-icon-list__wrapper' : ' .uagb-icon-list-repeater';

					$selectors[ $wrapper ]                                     = array(
						'font-family' => $attr['fontFamily'],
						'font-weight' => $attr['fontWeight'],
						'font-size'   => UAGB_Helper::get_css_value( $attr['fontSize'], $attr['sizeType'] ),
						'line-height' => $attr['lineHeight'] . $attr['lineHeightType'],
					);
					$m_selectors_child[ $wrapper . ' .uagb-icon-list__label' ] = array(
						'font-family' => $attr['fontFamily'],
						'font-weight' => $attr['fontWeight'],
						'font-size'   => UAGB_Helper::get_css_value( $attr['fontSizeMobile'], $attr['sizeType'] ),
						'line-height' => $attr['lineHeightMobile'] . $attr['lineHeightType'],
					);
					$t_selectors_child[ $wrapper . ' .uagb-icon-list__label' ] = array(
						'font-family' => $attr['fontFamily'],
						'font-weight' => $attr['fontWeight'],
						'font-size'   => UAGB_Helper::get_css_value( $attr['fontSizeTablet'], $attr['sizeType'] ),
						'line-height' => $attr['lineHeightTablet'] . $attr['lineHeightType'],
					);

					if ( $attr['icon_count'] <= $key ) {
						break;
					}

					$icon = array_merge( $defaults, (array) $icon );

					$child_selectors = self::get_icon_list_child_selectors( $icon, $key, $attr['childMigrate'] );
					$selectors       = array_merge( $selectors, (array) $child_selectors );
					$t_selectors     = array_merge( $t_selectors, (array) $t_selectors_child );
					$m_selectors     = array_merge( $m_selectors, (array) $m_selectors_child );
				}
			}

			$combined_selectors = array(
				'desktop' => $selectors,
				'tablet'  => $t_selectors,
				'mobile'  => $m_selectors,
			);

			$base_selector = ( $attr['classMigrate'] ) ? '.uagb-block-' : '#uagb-icon-list-';

			return UAGB_Helper::generate_all_css( $combined_selectors, $base_selector . $id );
		}

		/**
		 * Get Icon List Block CSS
		 *
		 * @since 1.14.9
		 * @param array  $attr The block attributes.
		 * @param string $id The selector ID.
		 * @return array The Widget List.
		 */
		public static function get_icon_list_child_css( $attr, $id ) {

			$defaults = UAGB_Helper::$block_list['uagb/icon-list-child']['attributes'];

			$attr = array_merge( $defaults, (array) $attr );

			$selectors = self::get_icon_list_child_selectors( $attr, $id, true );

			$desktop = UAGB_Helper::generate_css( $selectors, '.uagb-block-' . $id );

			$generated_css = array(
				'desktop' => $desktop,
				'tablet'  => '',
				'mobile'  => '',
			);

			return $generated_css;
		}

		/**
		 * Get Icon List Block CSS
		 *
		 * @since 1.14.9
		 * @param array  $attr The block attributes.
		 * @param string $id The key for the Icon List Item.
		 * @param string $childMigrate The child migration flag.
		 * @return array The Widget List.
		 */
		public static function get_icon_list_child_selectors( $attr, $id, $childMigrate ) {

			$wrapper = ( ! $childMigrate ) ? ' .uagb-icon-list-repeater-' . $id : '.uagb-icon-list-repeater';

			$selectors[ $wrapper . ' .uagb-icon-list__source-icon' ]           = array(
				'color' => $attr['icon_color'],
			);
			$selectors[ $wrapper . ' .uagb-icon-list__source-icon' ]           = array(
				'color' => $attr['icon_color'],
			);
			$selectors[ $wrapper . ' .uagb-icon-list__source-icon svg' ]       = array(
				'fill' => $attr['icon_color'],
			);
			$selectors[ $wrapper . ':hover .uagb-icon-list__source-icon' ]     = array(
				'color' => $attr['icon_hover_color'],
			);
			$selectors[ $wrapper . ':hover .uagb-icon-list__source-icon svg' ] = array(
				'fill' => $attr['icon_hover_color'],
			);
			$selectors[ $wrapper . ' .uagb-icon-list__label' ]                 = array(
				'color' => $attr['label_color'],
			);
			$selectors[ $wrapper . ':hover .uagb-icon-list__label' ]           = array(
				'color' => $attr['label_hover_color'],
			);
			$selectors[ $wrapper . ' .uagb-icon-list__source-wrap' ]           = array(
				'background'   => $attr['icon_bg_color'],
				'border-color' => $attr['icon_border_color'],
			);
			$selectors[ $wrapper . ':hover .uagb-icon-list__source-wrap' ]     = array(
				'background'   => $attr['icon_bg_hover_color'],
				'border-color' => $attr['icon_border_hover_color'],
			);

			return $selectors;
		}

		/**
		 * Get Content Timeline Parent Block CSS
		 *
		 * @since 0.0.1
		 * @param array  $attr The block attributes.
		 * @param string $id The selector ID.
		 * @return array The Widget List.
		 */
		public static function get_content_timeline_css( $attr, $id ) {

			$defaults = UAGB_Helper::$block_list['uagb/content-timeline']['attributes'];

			$attr = array_merge( $defaults, (array) $attr );

			$selectors   = array();
			$t_selectors = array();
			$m_selectors = array();

			$connector_size = UAGB_Helper::get_css_value( $attr['connectorBgsize'], 'px' );

			$selectors = array(
				' .uagb-timeline-content .uagb-timeline__heading' => array(
					'text-align' => $attr['align'],
					'color'      => $attr['headingColor'],
				),
				' .uagb-timeline__heading-text'     => array(
					'margin-bottom' => UAGB_Helper::get_css_value( $attr['headSpace'], 'px' ),
				),
				' .uagb-timeline__main .uagb-timeline__marker.uagb-timeline__in-view-icon .uagb-timeline__icon-new' => array(
					'color' => $attr['iconFocus'],
				),
				' .uagb-timeline__heading-text'     => array(
					'margin-bottom' => UAGB_Helper::get_css_value( $attr['headSpace'], 'px' ),
				),
				' .uagb-timeline-content .uagb-timeline-desc-content' => array(
					'text-align' => $attr['align'],
					'color'      => $attr['subHeadingColor'],
				),
				' .uagb-timeline__events-new'       => array(
					'text-align' => $attr['align'],
				),
				' .uagb-timeline__day-right .uagb-timeline__arrow:after' => array(
					'border-left-color' => $attr['backgroundColor'],
				),
				' .uagb-timeline__day-right .uagb-timeline__arrow:after' => array(
					'border-right-color' => $attr['backgroundColor'],
				),
				' .uagb-timeline__day-right .uagb-timeline__arrow:after' => array(
					'border-left-color' => $attr['backgroundColor'],
				),
				' .uagb-timeline__day-right .uagb-timeline__arrow:after' => array(
					'border-right-color' => $attr['backgroundColor'],
				),
				' .uagb-timeline__center-block .uagb-timeline__day-right .uagb-timeline__arrow:after' => array(
					'border-left-color' => $attr['backgroundColor'],
				),
				' .uagb-timeline__right-block .uagb-timeline__day-right .uagb-timeline__arrow:after' => array(
					'border-left-color' => $attr['backgroundColor'],
				),
				' .uagb-timeline__right-block .uagb-timeline__day-left .uagb-timeline__arrow:after' => array(
					'border-left-color' => $attr['backgroundColor'],
				),
				' .uagb-timeline__center-block .uagb-timeline__day-left .uagb-timeline__arrow:after' => array(
					'border-right-color' => $attr['backgroundColor'],
				),
				' .uagb-timeline__left-block .uagb-timeline__day-left .uagb-timeline__arrow:after' => array(
					'border-right-color' => $attr['backgroundColor'],
				),
				' .uagb-timeline__line__inner'      => array(
					'background-color' => $attr['separatorFillColor'],
				),
				' .uagb-timeline__line'             => array(
					'background-color' => $attr['separatorColor'],
					'width'            => UAGB_Helper::get_css_value( $attr['separatorwidth'], 'px' ),
				),
				' .uagb-timeline__right-block .uagb-timeline__line' => array(
					'right' => 'calc( ' . $attr['connectorBgsize'] . 'px / 2 )',
				),
				' .uagb-timeline__left-block .uagb-timeline__line' => array(
					'left' => 'calc( ' . $attr['connectorBgsize'] . 'px / 2 )',
				),
				' .uagb-timeline__center-block .uagb-timeline__line' => array(
					'right' => 'calc( ' . $attr['connectorBgsize'] . 'px / 2 )',
				),
				' .uagb-timeline__marker'           => array(
					'background-color' => $attr['separatorBg'],
					'min-height'       => $connector_size,
					'min-width'        => $connector_size,
					'line-height'      => $connector_size,
					'border'           => $attr['borderwidth'] . 'px solid' . $attr['separatorBorder'],
				),
				' .uagb-timeline__left-block .uagb-timeline__left .uagb-timeline__arrow' => array(
					'height' => $connector_size,
				),
				' .uagb-timeline__right-block .uagb-timeline__right .uagb-timeline__arrow' => array(
					'height' => $connector_size,
				),
				' .uagb-timeline__center-block .uagb-timeline__left .uagb-timeline__arrow' => array(
					'height' => $connector_size,
				),
				' .uagb-timeline__center-block .uagb-timeline__right .uagb-timeline__arrow' => array(
					'height' => $connector_size,
				),
				' .uagb-timeline__center-block .uagb-timeline__marker' => array(
					'margin-left'  => UAGB_Helper::get_css_value( $attr['horizontalSpace'], 'px' ),
					'margin-right' => UAGB_Helper::get_css_value( $attr['horizontalSpace'], 'px' ),
				),
				' .uagb-timeline__field'            => array(
					'margin-bottom' => UAGB_Helper::get_css_value( $attr['verticalSpace'], 'px' ),
				),
				' .uagb-timeline__date-hide.uagb-timeline__date-inner' => array(
					'margin-bottom' => UAGB_Helper::get_css_value( $attr['dateBottomspace'], 'px' ),
					'color'         => $attr['dateColor'],
					'text-align'    => $attr['align'],
				),
				' .uagb-timeline__right-block .uagb-timeline__day-new.uagb-timeline__day-left' => array(
					'margin-right' => UAGB_Helper::get_css_value( $attr['horizontalSpace'], 'px' ),
				),
				' .uagb-timeline__left-block .uagb-timeline__day-new.uagb-timeline__day-left' => array(
					'margin-left' => UAGB_Helper::get_css_value( $attr['horizontalSpace'], 'px' ),
				),
				' .uagb-timeline__left-block .uagb-timeline__day-new.uagb-timeline__day-right' => array(
					'margin-left' => UAGB_Helper::get_css_value( $attr['horizontalSpace'], 'px' ),
				),
				' .uagb-timeline__right-block .uagb-timeline__day-new.uagb-timeline__day-right' => array(
					'margin-right' => UAGB_Helper::get_css_value( $attr['horizontalSpace'], 'px' ),
				),
				' .uagb-timeline__date-new'         => array(
					'color'     => $attr['dateColor'],
					'font-size' => UAGB_Helper::get_css_value( $attr['dateFontsize'], $attr['dateFontsizeType'] ),
				),
				' .uagb-timeline__right-block .uagb-timeline__date-hide.uagb-timeline__date-inner' => array(
					'font-size' => UAGB_Helper::get_css_value( $attr['dateFontsize'], $attr['dateFontsizeType'] ),
				),
				' .uagb-timeline__left-block .uagb-timeline__date-hide.uagb-timeline__date-inner' => array(
					'font-size' => UAGB_Helper::get_css_value( $attr['dateFontsize'], $attr['dateFontsizeType'] ),
				),
				' .uagb-timeline__events-inner-new' => array(
					'background-color' => $attr['backgroundColor'],
					'border-radius'    => UAGB_Helper::get_css_value( $attr['borderRadius'], 'px' ),
					'padding'          => UAGB_Helper::get_css_value( $attr['bgPadding'], 'px' ),
				),
				' .uagb-timeline__main .uagb-timeline__icon-new' => array(
					'color' => $attr['iconColor'],
					'width' => UAGB_Helper::get_css_value( $attr['iconSize'], 'px' ),
				),
				' .uagb-timeline__main .uagb-timeline__marker.uagb-timeline__in-view-icon .uagb-timeline__icon-new svg' => array(
					'fill' => $attr['iconFocus'],
				),
				' .uagb-timeline__main .uagb-timeline__marker.uagb-timeline__in-view-icon .uagb-timeline__icon-new' => array(
					'color' => $attr['iconFocus'],
				),
				' .uagb-timeline__main .uagb-timeline__marker.uagb-timeline__in-view-icon' => array(
					'background'   => $attr['iconBgFocus'],
					'border-color' => $attr['borderFocus'],
				),
				' .uagb-timeline__main .uagb-timeline__icon-new svg' => array(
					'fill' => $attr['iconColor'],
				),
			);

			$m_selectors = array(
				' .uagb-timeline__center-block .uagb-timeline__day-right .uagb-timeline__arrow:after' => array(
					'border-right-color' => $attr['backgroundColor'],
				),
				' .uagb-timeline__center-block .uagb-timeline__marker' => array(
					'margin-left'  => 0,
					'margin-right' => 0,
				),
			);

			$t_selectors = array(
				' .uagb-timeline__center-block .uagb-timeline__day-right .uagb-timeline__arrow:after' => array(
					'border-right-color' => $attr['backgroundColor'],
				),
				' .uagb-timeline__center-block .uagb-timeline__marker' => array(
					'margin-left'  => 0,
					'margin-right' => 0,
				),
			);

			$combined_selectors = array(
				'desktop' => $selectors,
				'tablet'  => $t_selectors,
				'mobile'  => $m_selectors,
			);

			$base_selector      = ( $attr['classMigrate'] ) ? '.uagb-block-' : '#uagb-ctm-';
			$combined_selectors = UAGB_Helper::get_typography_css( $attr, 'head', ' .uagb-timeline__heading', $combined_selectors );
			$combined_selectors = UAGB_Helper::get_typography_css( $attr, 'date', ' .uagb-timeline__date-new', $combined_selectors );
			$combined_selectors = UAGB_Helper::get_typography_css( $attr, 'date', ' .uagb-timeline__date-hide.uagb-timeline__date-inner', $combined_selectors );
			$combined_selectors = UAGB_Helper::get_typography_css( $attr, 'subHead', ' p.uagb-timeline-desc-content', $combined_selectors );
			return UAGB_Helper::generate_all_css( $combined_selectors, $base_selector . $id );
		}

		/**
		 * Get Content Timeline Block CSS
		 *
		 * @since 0.0.1
		 * @param array  $attr The block attributes.
		 * @param string $id The selector ID.
		 * @return array The Widget List.
		 */
		public static function get_post_timeline_css( $attr, $id ) {

			$defaults = UAGB_Helper::$block_list['uagb/post-timeline']['attributes'];

			$attr        = array_merge( $defaults, (array) $attr );
			$t_selectors = array();

			$selectors = array(
				' .uagb-timeline__heading'                 => array(
					'text-align' => $attr['align'],
				),
				' .uagb-timeline__author'                  => array(
					'text-align'    => $attr['align'],
					'margin-bottom' => UAGB_Helper::get_css_value( $attr['authorSpace'], 'px' ),
				),
				' .uagb-timeline__link_parent'             => array(
					'text-align' => $attr['align'],
				),
				' .uagb-timeline__image a'                 => array(
					'text-align' => $attr['align'],
				),
				' .uagb-timeline__author-link'             => array(
					'color' => $attr['authorColor'],
				),
				' .dashicons-admin-users'                  => array(
					'color'       => $attr['authorColor'],
					'font-size'   => UAGB_Helper::get_css_value( $attr['authorFontSize'], $attr['authorFontSizeType'] ),
					'font-weight' => $attr['authorFontWeight'],
					'line-height' => UAGB_Helper::get_css_value( $attr['authorLineHeight'], $attr['authorLineHeightType'] ),
				),
				' .uagb-timeline__link'                    => array(
					'color'            => $attr['ctaColor'],
					'background-color' => $attr['ctaBackground'],
				),
				' .uagb-content .uagb-timeline__heading a' => array(
					'text-align' => $attr['align'],
					'color'      => $attr['headingColor'],
				),
				' .uagb-timeline__heading-text'            => array(
					'margin-bottom' => UAGB_Helper::get_css_value( $attr['headSpace'], 'px' ),
				),
				' .uagb_timeline__cta-enable .uagb-timeline-desc-content' => array(
					'margin-bottom' => UAGB_Helper::get_css_value( $attr['contentSpace'], 'px' ),
				),
				' .uagb-content'                           => array(
					'padding' => UAGB_Helper::get_css_value( $attr['contentPadding'], 'px' ),
				),
			);

			$desktop_selectors = self::get_timeline_selectors( $attr );
			$selectors         = array_merge( $selectors, $desktop_selectors );

			$t_selectors = array(
				' .dashicons-admin-users' => array(
					'font-size'   => UAGB_Helper::get_css_value( $attr['authorFontSizeTablet'], $attr['authorFontSizeType'] ),
					'line-height' => UAGB_Helper::get_css_value( $attr['authorLineHeightTablet'], $attr['authorLineHeightType'] ),
				),
				' .uagb-timeline__center-block.uagb-timeline__responsive-tablet .uagb-timeline__author' => array(
					'text-align' => 'left',
				),
				' .uagb-timeline__center-block.uagb-timeline__responsive-tablet .uagb-timeline__link_parent' => array(
					'text-align' => 'left',
				),
				' .uagb-timeline__center-block.uagb-timeline__responsive-tablet .uagb-timeline__image a' => array(
					'text-align' => 'left',
				),
			);

			$tablet_selectors = self::get_timeline_tablet_selectors( $attr );
			$t_selectors      = array_merge( $t_selectors, $tablet_selectors );

			// Mobile responsive CSS.
			$m_selectors = array(
				' .dashicons-admin-users'  => array(
					'font-size'   => UAGB_Helper::get_css_value( $attr['authorFontSizeMobile'], $attr['authorFontSizeType'] ),
					'line-height' => UAGB_Helper::get_css_value( $attr['authorLineHeightMobile'], $attr['authorLineHeightType'] ),
				),
				' .uagb-timeline__heading' => array(
					'text-align' => $attr['align'],
				),
				' .uagb-timeline__center-block.uagb-timeline__responsive-tablet .uagb-timeline__author' => array(
					'text-align' => 'left',
				),
				' .uagb-timeline__center-block.uagb-timeline__responsive-tablet .uagb-timeline__link_parent' => array(
					'text-align' => 'left',
				),
				' .uagb-timeline__center-block.uagb-timeline__responsive-mobile .uagb-timeline__image a' => array(
					'text-align' => 'left',
				),
			);

			$mobile_selectors = self::get_timeline_mobile_selectors( $attr );
			$m_selectors      = array_merge( $m_selectors, $mobile_selectors );

			$combined_selectors = array(
				'desktop' => $selectors,
				'tablet'  => $t_selectors,
				'mobile'  => $m_selectors,
			);

			$combined_selectors = UAGB_Helper::get_typography_css( $attr, 'date', ' .uagb-timeline__date-hide.uagb-timeline__date-inner', $combined_selectors );
			$combined_selectors = UAGB_Helper::get_typography_css( $attr, 'date', ' .uagb-timeline__date-new', $combined_selectors );
			$combined_selectors = UAGB_Helper::get_typography_css( $attr, 'subHead', ' p.uagb-timeline-desc-content', $combined_selectors );
			$combined_selectors = UAGB_Helper::get_typography_css( $attr, 'author', ' .uagb-timeline__author-link', $combined_selectors );
			$combined_selectors = UAGB_Helper::get_typography_css( $attr, 'cta', ' .uagb-timeline__link', $combined_selectors );
			$combined_selectors = UAGB_Helper::get_typography_css( $attr, 'head', ' .uagb-timeline__heading a', $combined_selectors );

			return UAGB_Helper::generate_all_css( $combined_selectors, '.uagb-block-' . $id );
		}

		/**
		 * Get Restaurant Menu Block CSS
		 *
		 * @since 1.0.2
		 * @param array  $attr The block attributes.
		 * @param string $id The selector ID.
		 * @return array The Widget List.
		 */
		public static function get_restaurant_menu_css( $attr, $id ) {

			$defaults = UAGB_Helper::$block_list['uagb/restaurant-menu']['attributes'];

			$attr = array_merge( $defaults, (array) $attr );

			$m_selectors = array();
			$t_selectors = array();

			$align = $attr['headingAlign'];
			if ( 'left' === $align ) {
				$align = 'flex-start';
			} elseif ( 'right' === $align ) {
				$align = 'flex-end';
			}

			$selectors = array(
				' .uagb-rest_menu__wrap'            => array(
					'padding-left'  => UAGB_Helper::get_css_value( ( $attr['columnGap'] / 2 ), 'px' ),
					'padding-right' => UAGB_Helper::get_css_value( ( $attr['columnGap'] / 2 ), 'px' ),
					'margin-bottom' => UAGB_Helper::get_css_value( $attr['rowGap'], 'px' ),
				),
				' .uagb-rest_menu__wrap .uagb-rm__image-content' => array(
					'padding-left'   => UAGB_Helper::get_css_value( $attr['imgHrPadding'], 'px' ),
					'padding-right'  => UAGB_Helper::get_css_value( $attr['imgHrPadding'], 'px' ),
					'padding-top'    => UAGB_Helper::get_css_value( $attr['imgVrPadding'], 'px' ),
					'padding-bottom' => UAGB_Helper::get_css_value( $attr['imgVrPadding'], 'px' ),
				),
				' .uagb-rm__image img'              => array(
					'width'     => UAGB_Helper::get_css_value( $attr['imageWidth'], 'px' ),
					'max-width' => UAGB_Helper::get_css_value( $attr['imageWidth'], 'px' ),
				),
				' .uagb-rm__separator-parent'       => array(
					'justify-content' => $align,
				),
				' .uagb-rm__content'                => array(
					'text-align'     => $attr['headingAlign'],
					'padding-left'   => UAGB_Helper::get_css_value( $attr['contentHrPadding'], 'px' ),
					'padding-right'  => UAGB_Helper::get_css_value( $attr['contentHrPadding'], 'px' ),
					'padding-top'    => UAGB_Helper::get_css_value( $attr['contentVrPadding'], 'px' ),
					'padding-bottom' => UAGB_Helper::get_css_value( $attr['contentVrPadding'], 'px' ),
				),
				' .uagb-rm-details .uagb-rm__title' => array(
					'color'         => $attr['titleColor'],
					'margin-bottom' => UAGB_Helper::get_css_value( $attr['titleSpace'], 'px' ),
				),
				' .uagb-rm__price'                  => array(
					'color' => $attr['priceColor'],
				),
				' .uagb-rm__desc'                   => array(
					'color'         => $attr['descColor'],
					'margin-bottom' => UAGB_Helper::get_css_value( $attr['descSpace'], 'px' ),
				),
			);

			if ( 'none' !== $attr['seperatorStyle'] ) {
				$selectors[' .uagb-rest_menu__wrap .uagb-rm__separator'] = array(
					'border-top-color' => $attr['seperatorColor'],
					'border-top-style' => $attr['seperatorStyle'],
					'border-top-width' => UAGB_Helper::get_css_value( $attr['seperatorThickness'], 'px' ),
					'width'            => UAGB_Helper::get_css_value( $attr['seperatorWidth'], '%' ),
				);
			}

			$selectors[ ' .uagb-rest_menu__wrap.uagb-rm__desk-column-' . $attr['columns'] . ':nth-child(' . $attr['columns'] . 'n+1)' ] = array(
				'margin-left' => '0',
				'clear'       => 'left',
			);

			$t_selectors = array(
				' .uagb-rest_menu__wrap.uagb-rm__desk-column-' . $attr['columns'] . ':nth-child(' . $attr['columns'] . 'n+1)' => array(
					'margin-left' => 'unset',
					'clear'       => 'unset',
				),
				' .uagb-rest_menu__wrap.uagb-rm__tablet-column-' . $attr['tcolumns'] . ':nth-child(' . $attr['tcolumns'] . 'n+1)' => array(
					'margin-left' => '0',
					'clear'       => 'left',
				),
			);

			$m_selectors = array(
				' .uagb-rest_menu__wrap.uagb-rm__desk-column-' . $attr['columns'] . ':nth-child(' . $attr['columns'] . 'n+1)' => array(
					'margin-left' => 'unset',
					'clear'       => 'unset',
				),
				' .uagb-rest_menu__wrap.uagb-rm__mobile-column-' . $attr['mcolumns'] . ':nth-child(' . $attr['mcolumns'] . 'n+1)' => array(
					'margin-left' => '0',
					'clear'       => 'left',
				),
			);

			$combined_selectors = array(
				'desktop' => $selectors,
				'tablet'  => $t_selectors,
				'mobile'  => $m_selectors,
			);

			$combined_selectors = UAGB_Helper::get_typography_css( $attr, 'title', ' .uagb-rm__title', $combined_selectors );
			$combined_selectors = UAGB_Helper::get_typography_css( $attr, 'price', ' .uagb-rm__price', $combined_selectors );
			$combined_selectors = UAGB_Helper::get_typography_css( $attr, 'desc', ' .uagb-rm__desc', $combined_selectors );

			$base_selector = ( $attr['classMigrate'] ) ? '.uagb-block-' : '#uagb-rm-';

			return UAGB_Helper::generate_all_css( $combined_selectors, $base_selector . $id );
		}

		/**
		 * Get Post Grid Block CSS
		 *
		 * @since 1.4.0
		 * @param array  $attr The block attributes.
		 * @param string $id The selector ID.
		 * @return array The Widget List.
		 */
		public static function get_post_grid_css( $attr, $id ) {

			$defaults = UAGB_Helper::$block_list['uagb/post-grid']['attributes'];

			$attr = array_merge( $defaults, (array) $attr );

			$selectors = self::get_post_selectors( $attr );

			// Pagination CSS.
			$selectors[' .uagb-post-pagination-wrap'] = array(

				'margin-top' => UAGB_Helper::get_css_value( $attr['paginationSpacing'], 'px' ),
				'text-align' => $attr['paginationAlignment'],
			);
			if ( 'filled' === $attr['paginationLayout'] ) {
				$selectors[' .uagb-post-pagination-wrap .page-numbers.current'] = array(

					'background-color' => $attr['paginationBgActiveColor'],
					'color'            => $attr['paginationActiveColor'],
				);
				$selectors[' .uagb-post-pagination-wrap a']                     = array(

					'background-color' => $attr['paginationBgColor'],
					'color'            => $attr['paginationColor'],
				);
			} else {

				$selectors[' .uagb-post-pagination-wrap .page-numbers.current'] = array(

					'border-style'     => 'solid',
					'background-color' => 'transparent',
					'border-width'     => UAGB_Helper::get_css_value( $attr['paginationBorderSize'], 'px' ),
					'border-color'     => $attr['paginationBorderActiveColor'],
					'border-radius'    => UAGB_Helper::get_css_value( $attr['paginationBorderRadius'], 'px' ),
					'color'            => $attr['paginationActiveColor'],
				);

				$selectors[' .uagb-post-pagination-wrap a'] = array(

					'border-style'     => 'solid',
					'background-color' => 'transparent',
					'border-width'     => UAGB_Helper::get_css_value( $attr['paginationBorderSize'], 'px' ),
					'border-color'     => $attr['paginationBorderColor'],
					'border-radius'    => UAGB_Helper::get_css_value( $attr['paginationBorderRadius'], 'px' ),
					'color'            => $attr['paginationColor'],
				);

			}

			$m_selectors = self::get_post_mobile_selectors( $attr );

			$t_selectors = self::get_post_tablet_selectors( $attr );

			$combined_selectors = array(
				'desktop' => $selectors,
				'tablet'  => $t_selectors,
				'mobile'  => $m_selectors,
			);

			if ( ! $attr['inheritFromTheme'] ) {
				$combined_selectors = UAGB_Helper::get_typography_css( $attr, 'title', ' .uagb-post__text .uagb-post__title', $combined_selectors );
				$combined_selectors = UAGB_Helper::get_typography_css( $attr, 'title', ' .uagb-post__text .uagb-post__title a', $combined_selectors );
				$combined_selectors = UAGB_Helper::get_typography_css( $attr, 'meta', ' .uagb-post__text .uagb-post-grid-byline', $combined_selectors );
				$combined_selectors = UAGB_Helper::get_typography_css( $attr, 'meta', ' .uagb-post__text .uagb-post-grid-byline .uagb-post__author', $combined_selectors );

				$combined_selectors = UAGB_Helper::get_typography_css( $attr, 'meta', ' .uagb-post__text .uagb-post-grid-byline .uagb-post__author a', $combined_selectors );
				$combined_selectors = UAGB_Helper::get_typography_css( $attr, 'excerpt', ' .uagb-post__text .uagb-post__excerpt', $combined_selectors );
				$combined_selectors = UAGB_Helper::get_typography_css( $attr, 'cta', ' .uagb-post__text .uagb-post__cta', $combined_selectors );
				$combined_selectors = UAGB_Helper::get_typography_css( $attr, 'cta', ' .uagb-post__text .uagb-post__cta a', $combined_selectors );
			}

			return UAGB_Helper::generate_all_css( $combined_selectors, '.uagb-block-' . $id );
		}

		/**
		 * Get Post Carousel Block CSS
		 *
		 * @since 1.4.0
		 * @param array  $attr The block attributes.
		 * @param string $id The selector ID.
		 * @return array The Widget List.
		 */
		public static function get_post_carousel_css( $attr, $id ) {

			$defaults = UAGB_Helper::$block_list['uagb/post-carousel']['attributes'];

			$attr = array_merge( $defaults, (array) $attr );

			$selectors = self::get_post_selectors( $attr );

			$m_selectors = self::get_post_mobile_selectors( $attr );

			$t_selectors = self::get_post_tablet_selectors( $attr );

			$arrow_size = UAGB_Helper::get_css_value( $attr['arrowSize'], 'px' );

			$selectors[' .slick-arrow'] = array(
				'border-color' => $attr['arrowColor'],
			);

			$selectors[' .slick-arrow span'] = array(
				'color'     => $attr['arrowColor'],
				'font-size' => $arrow_size,
				'width'     => $arrow_size,
				'height'    => $arrow_size,
			);

			$selectors[' .slick-arrow svg'] = array(
				'fill'   => $attr['arrowColor'],
				'width'  => $arrow_size,
				'height' => $arrow_size,
			);

			$selectors[' .slick-arrow'] = array(
				'border-color'  => $attr['arrowColor'],
				'border-width'  => UAGB_Helper::get_css_value( $attr['arrowBorderSize'], 'px' ),
				'border-radius' => UAGB_Helper::get_css_value( $attr['arrowBorderRadius'], 'px' ),
			);

			$selectors['.uagb-post-grid ul.slick-dots li.slick-active button:before'] = array(
				'color' => $attr['arrowColor'],
			);

			$selectors['.uagb-slick-carousel ul.slick-dots li button:before'] = array(
				'color' => $attr['arrowColor'],
			);

			if ( isset( $attr['arrowDots'] ) && 'dots' === $attr['arrowDots'] ) {

				$selectors['.uagb-slick-carousel'] = array(
					'padding' => '0 0 35px 0',
				);
			}

			$combined_selectors = array(
				'desktop' => $selectors,
				'tablet'  => $t_selectors,
				'mobile'  => $m_selectors,
			);

			if ( ! $attr['inheritFromTheme'] ) {
				$combined_selectors = UAGB_Helper::get_typography_css( $attr, 'title', ' .uagb-post__text .uagb-post__title', $combined_selectors );
				$combined_selectors = UAGB_Helper::get_typography_css( $attr, 'title', ' .uagb-post__text .uagb-post__title a', $combined_selectors );
				$combined_selectors = UAGB_Helper::get_typography_css( $attr, 'meta', ' .uagb-post__text .uagb-post-grid-byline', $combined_selectors );
				$combined_selectors = UAGB_Helper::get_typography_css( $attr, 'meta', ' .uagb-post__text .uagb-post-grid-byline .uagb-post__author', $combined_selectors );

				$combined_selectors = UAGB_Helper::get_typography_css( $attr, 'meta', ' .uagb-post__text .uagb-post-grid-byline .uagb-post__author a', $combined_selectors );
				$combined_selectors = UAGB_Helper::get_typography_css( $attr, 'excerpt', ' .uagb-post__text .uagb-post__excerpt', $combined_selectors );
				$combined_selectors = UAGB_Helper::get_typography_css( $attr, 'cta', ' .uagb-post__text .uagb-post__cta', $combined_selectors );
				$combined_selectors = UAGB_Helper::get_typography_css( $attr, 'cta', ' .uagb-post__text .uagb-post__cta a', $combined_selectors );
			}

			return UAGB_Helper::generate_all_css( $combined_selectors, '.uagb-block-' . $id );
		}

		/**
		 * Get Post Masonry Block CSS
		 *
		 * @since 1.4.0
		 * @param array  $attr The block attributes.
		 * @param string $id The selector ID.
		 * @return array The Widget List.
		 */
		public static function get_post_masonry_css( $attr, $id ) {

			$defaults = UAGB_Helper::$block_list['uagb/post-masonry']['attributes'];

			$attr = array_merge( $defaults, (array) $attr );

			$selectors = self::get_post_selectors( $attr );

			$m_selectors = self::get_post_mobile_selectors( $attr );

			$t_selectors = self::get_post_tablet_selectors( $attr );

			if ( 'infinite' === $attr['paginationType'] ) {

				$selectors[' .uagb-post__load-more-wrap'] = array(
					'text-align' => $attr['paginationAlign'],
				);

				$selectors[' .uagb-post__load-more-wrap .uagb-post-pagination-button'] = array(

					'color'            => $attr['paginationTextColor'],
					'background-color' => $attr['paginationMasonryBgColor'],
					'border-style'     => $attr['paginationMasonryBorderStyle'],
					'border-width'     => UAGB_Helper::get_css_value( $attr['paginationMasonryBorderWidth'], 'px' ),
					'border-radius'    => UAGB_Helper::get_css_value( $attr['paginationMasonryBorderRadius'], 'px' ),
					'border-color'     => $attr['paginationMasonryBorderColor'],
					'font-size'        => UAGB_Helper::get_css_value( $attr['paginationFontSize'], 'px' ),
					'padding-top'      => UAGB_Helper::get_css_value( $attr['vpaginationButtonPaddingDesktop'], $attr['paginationButtonPaddingType'] ),
					'padding-bottom'   => UAGB_Helper::get_css_value( $attr['vpaginationButtonPaddingDesktop'], $attr['paginationButtonPaddingType'] ),
					'padding-right'    => UAGB_Helper::get_css_value( $attr['hpaginationButtonPaddingDesktop'], $attr['paginationButtonPaddingType'] ),
					'padding-left'     => UAGB_Helper::get_css_value( $attr['hpaginationButtonPaddingDesktop'], $attr['paginationButtonPaddingType'] ),

				);
				$selectors[' .uagb-post__load-more-wrap .uagb-post-pagination-button:hover'] = array(
					'color'            => $attr['paginationTextHoverColor'],
					'background-color' => $attr['paginationBgHoverColor'],
				);
				$m_selectors[' .uagb-post__load-more-wrap .uagb-post-pagination-button']     = array(
					'padding-top'    => UAGB_Helper::get_css_value( $attr['vpaginationButtonPaddingMobile'], $attr['paginationButtonPaddingType'] ),
					'padding-bottom' => UAGB_Helper::get_css_value( $attr['vpaginationButtonPaddingMobile'], $attr['paginationButtonPaddingType'] ),
					'padding-right'  => UAGB_Helper::get_css_value( $attr['hpaginationButtonPaddingMobile'], $attr['paginationButtonPaddingType'] ),
					'padding-left'   => UAGB_Helper::get_css_value( $attr['hpaginationButtonPaddingMobile'], $attr['paginationButtonPaddingType'] ),
				);
				$t_selectors[' .uagb-post__load-more-wrap .uagb-post-pagination-button']     = array(
					'padding-top'    => UAGB_Helper::get_css_value( $attr['vpaginationButtonPaddingTablet'], $attr['paginationButtonPaddingType'] ),
					'padding-bottom' => UAGB_Helper::get_css_value( $attr['vpaginationButtonPaddingTablet'], $attr['paginationButtonPaddingType'] ),
					'padding-right'  => UAGB_Helper::get_css_value( $attr['hpaginationButtonPaddingTablet'], $attr['paginationButtonPaddingType'] ),
					'padding-left'   => UAGB_Helper::get_css_value( $attr['hpaginationButtonPaddingTablet'], $attr['paginationButtonPaddingType'] ),
				);

				$selectors['.uagb-post-grid .uagb-post-inf-loader div'] = array(
					'width'            => UAGB_Helper::get_css_value( $attr['loaderSize'], 'px' ),
					'height'           => UAGB_Helper::get_css_value( $attr['loaderSize'], 'px' ),
					'background-color' => $attr['loaderColor'],
				);
			}

			$combined_selectors = array(
				'desktop' => $selectors,
				'tablet'  => $t_selectors,
				'mobile'  => $m_selectors,
			);

			if ( ! $attr['inheritFromTheme'] ) {
				$combined_selectors = UAGB_Helper::get_typography_css( $attr, 'title', ' .uagb-post__text .uagb-post__title', $combined_selectors );
				$combined_selectors = UAGB_Helper::get_typography_css( $attr, 'title', ' .uagb-post__text .uagb-post__title a', $combined_selectors );
				$combined_selectors = UAGB_Helper::get_typography_css( $attr, 'meta', ' .uagb-post__text .uagb-post-grid-byline', $combined_selectors );
				$combined_selectors = UAGB_Helper::get_typography_css( $attr, 'meta', ' .uagb-post__text .uagb-post-grid-byline .uagb-post__author', $combined_selectors );

				$combined_selectors = UAGB_Helper::get_typography_css( $attr, 'meta', ' .uagb-post__text .uagb-post-grid-byline .uagb-post__author a', $combined_selectors );
				$combined_selectors = UAGB_Helper::get_typography_css( $attr, 'excerpt', ' .uagb-post__text .uagb-post__excerpt', $combined_selectors );
				$combined_selectors = UAGB_Helper::get_typography_css( $attr, 'cta', ' .uagb-post__text .uagb-post__cta', $combined_selectors );
				$combined_selectors = UAGB_Helper::get_typography_css( $attr, 'cta', ' .uagb-post__text .uagb-post__cta a', $combined_selectors );

			}

			return UAGB_Helper::generate_all_css( $combined_selectors, '.uagb-block-' . $id );
		}

		/**
		 * Get Post Block Selectors CSS
		 *
		 * @param array $attr The block attributes.
		 * @since 1.4.0
		 */
		public static function get_post_selectors( $attr ) {
			$selectors = array(
				' .uagb-post__items'         => array(
					'margin-right' => UAGB_Helper::get_css_value( ( -$attr['rowGap'] / 2 ), 'px' ),
					'margin-left'  => UAGB_Helper::get_css_value( ( -$attr['rowGap'] / 2 ), 'px' ),
				),
				' .uagb-post__items article' => array(
					'padding-right' => UAGB_Helper::get_css_value( ( $attr['rowGap'] / 2 ), 'px' ),
					'padding-left'  => UAGB_Helper::get_css_value( ( $attr['rowGap'] / 2 ), 'px' ),
					'margin-bottom' => UAGB_Helper::get_css_value( ( $attr['columnGap'] ), 'px' ),
				),
				' .uagb-post__inner-wrap'    => array(
					'background' => $attr['bgColor'],
					'padding'    => UAGB_Helper::get_css_value( ( $attr['contentPadding'] ), 'px' ),
					'text-align' => $attr['align'],
				),

				' .uagb-post__cta'           => array(
					'margin-bottom' => UAGB_Helper::get_css_value( $attr['ctaBottomSpace'], 'px' ),
				),
				' .uagb-post__image'         => array(
					'margin-bottom' => UAGB_Helper::get_css_value( $attr['imageBottomSpace'], 'px' ),
				),
				' .uagb-post__title'         => array(
					'margin-bottom' => UAGB_Helper::get_css_value( $attr['titleBottomSpace'], 'px' ),
				),
				' .uagb-post-grid-byline'    => array(
					'margin-bottom' => UAGB_Helper::get_css_value( $attr['metaBottomSpace'], 'px' ),
				),
				' .uagb-post__excerpt'       => array(
					'margin-bottom' => UAGB_Helper::get_css_value( $attr['excerptBottomSpace'], 'px' ),
				),
				' .uagb-post__image:before'  => array(
					'background-color' => $attr['bgOverlayColor'],
					'opacity'          => ( $attr['overlayOpacity'] / 100 ),
				),
			);
			if ( 'background' !== $attr['imgPosition'] ) {
				$selectors[' .uagb-post__inner-wrap > .uagb-post__image:first-child'] = array(
					'margin-top'   => UAGB_Helper::get_css_value( ( -$attr['contentPadding'] ), 'px' ),
					'margin-left'  => UAGB_Helper::get_css_value( ( -$attr['contentPadding'] ), 'px' ),
					'margin-right' => UAGB_Helper::get_css_value( ( -$attr['contentPadding'] ), 'px' ),
				);
			}
			if ( ! $attr['inheritFromTheme'] ) {
				$selectors[' .uagb-post__text .uagb-post__title']['color']                  = $attr['titleColor'];
				$selectors[' .uagb-post__text .uagb-post__title a']                         = array(
					'color' => $attr['titleColor'],
				);
				$selectors[' .uagb-post__text .uagb-post-grid-byline']['color']             = $attr['metaColor'];
				$selectors[' .uagb-post__text .uagb-post-grid-byline .uagb-post__author']   = array(
					'color' => $attr['metaColor'],
				);
				$selectors[' .uagb-post__text .uagb-post-grid-byline .uagb-post__author a'] = array(
					'color' => $attr['metaColor'],
				);
				$selectors[' .uagb-post__text .uagb-post__excerpt']['color']                = $attr['excerptColor'];
				$selectors[' .uagb-post__text .uagb-post__cta']                             = array(
					'color'         => $attr['ctaColor'],
					'background'    => $attr['ctaBgColor'],
					'border-color'  => $attr['borderColor'],
					'border-width'  => UAGB_Helper::get_css_value( $attr['borderWidth'], 'px' ),
					'border-radius' => UAGB_Helper::get_css_value( $attr['borderRadius'], 'px' ),
					'border-style'  => $attr['borderStyle'],
				);
				$selectors[' .uagb-post__text .uagb-post__cta a']                           = array(
					'color'   => $attr['ctaColor'],
					'padding' => ( $attr['btnVPadding'] ) . 'px ' . ( $attr['btnHPadding'] ) . 'px',
				);
				$selectors[' .uagb-post__text .uagb-post__cta:hover']                       = array(
					'color'        => $attr['ctaHColor'],
					'background'   => $attr['ctaBgHColor'],
					'border-color' => $attr['borderHColor'],
				);
				$selectors[' .uagb-post__text .uagb-post__cta:hover a']                     = array(
					'color' => $attr['ctaHColor'],
				);
			}

			return $selectors;

		}

		/**
		 * Get Post Block Selectors CSS for Mobile devices
		 *
		 * @param array $attr The block attributes.
		 * @since 1.6.1
		 */
		public static function get_post_mobile_selectors( $attr ) {

			return array(
				' .uagb-post__inner-wrap' => array(
					'padding' => ( $attr['contentPaddingMobile'] ) . 'px',
				),
			);

		}

		/**
		 * Get Post Block Selectors CSS for Tablet devices
		 *
		 * @param array $attr The block attributes.
		 * @since 1.8.2
		 */
		public static function get_post_tablet_selectors( $attr ) {
			return array();

		}
		/**
		 * Get Tabs CSS
		 *
		 * @since 1.21.0
		 * @param array  $attr The block attributes.
		 * @param string $id The selector ID.
		 * @return array The Widget List.
		 */
		public static function get_tabs_css( $attr, $id ) {

			$defaults = UAGB_Helper::$block_list['uagb/tabs']['attributes'];

			$attr = array_merge( $defaults, (array) $attr );

			$selectors = array(
				' .uagb-tabs__panel .uagb-tab '     => array(
					'background'     => $attr['headerBgColor'],
					'text-align'     => $attr['titleAlign'],
					'padding-top'    => UAGB_Helper::get_css_value( $attr['tabTitleVertPadding'], 'px' ),
					'padding-bottom' => UAGB_Helper::get_css_value( $attr['tabTitleVertPadding'], 'px' ),
					'padding-left'   => UAGB_Helper::get_css_value( $attr['tabTitleHrPadding'], 'px' ),
					'padding-right'  => UAGB_Helper::get_css_value( $attr['tabTitleHrPadding'], 'px' ),
					'margin-top'     => UAGB_Helper::get_css_value( $attr['tabTitleTopMargin'], 'px' ),
					'margin-left'    => UAGB_Helper::get_css_value( $attr['tabTitleLeftMargin'], 'px' ),
					'margin-right'   => UAGB_Helper::get_css_value( $attr['tabTitleRightMargin'], 'px' ),
					'margin-bottom'  => UAGB_Helper::get_css_value( $attr['tabTitleBottomMargin'], 'px' ),
					'border-color'   => $attr['borderColor'],
					'border-width'   => UAGB_Helper::get_css_value( $attr['borderWidth'], 'px' ),
				),
				' .uagb-tabs__panel .uagb-tab span' => array(
					'color' => $attr['headerTextColor'],
				),
				' .uagb-tabs__panel .uagb-tab.uagb-tabs__active' => array(
					'background' => $attr['activeTabBgColor'],
				),

				' .uagb-tabs__panel .uagb-tab.uagb-tabs__active  span' => array(
					'color' => $attr['activeTabTextColor'],
				),
				' .uagb-tabs__panel .uagb-tab.uagb-tabs__active .uagb-tabs__icon svg' => array(
					'fill' => $attr['activeiconColor'],
				),

				' .uagb-tabs__body-wrap '           => array(
					'background'     => $attr['bodyBgColor'],
					'padding-top'    => UAGB_Helper::get_css_value( $attr['tabBodyVertPadding'], 'px' ),
					'padding-bottom' => UAGB_Helper::get_css_value( $attr['tabBodyVertPadding'], 'px' ),
					'padding-left'   => UAGB_Helper::get_css_value( $attr['tabBodyHrPadding'], 'px' ),
					'padding-right'  => UAGB_Helper::get_css_value( $attr['tabBodyHrPadding'], 'px' ),
					'margin-top'     => UAGB_Helper::get_css_value( $attr['tabBodyTopMargin'], 'px' ),
					'margin-left'    => UAGB_Helper::get_css_value( $attr['tabBodyLeftMargin'], 'px' ),
					'margin-right'   => UAGB_Helper::get_css_value( $attr['tabBodyRightMargin'], 'px' ),
					'margin-bottom'  => UAGB_Helper::get_css_value( $attr['tabBodyBottomMargin'], 'px' ),
					'border-color'   => $attr['borderColor'],
					'border-width'   => UAGB_Helper::get_css_value( $attr['borderWidth'], 'px' ),
				),

				' .uagb-tabs__body-wrap p '         => array(
					'color' => $attr['bodyTextColor'],
				),
				' .uagb-tabs__icon svg'             => array(
					'height' => UAGB_Helper::get_css_value( $attr['iconSize'], 'px' ),
					'width'  => UAGB_Helper::get_css_value( $attr['iconSize'], 'px' ),
					'fill'   => $attr['iconColor'],
				),
				' .uagb-tabs__icon-position-left > .uagb-tabs__icon' => array(
					'margin-right' => UAGB_Helper::get_css_value( $attr['iconSpacing'], 'px' ),
				),
				' .uagb-tabs__icon-position-right > .uagb-tabs__icon' => array(
					'margin-left' => UAGB_Helper::get_css_value( $attr['iconSpacing'], 'px' ),
				),
				' .uagb-tabs__icon-position-bottom > .uagb-tabs__icon' => array(
					'margin-top' => UAGB_Helper::get_css_value( $attr['iconSpacing'], 'px' ),
				),
				' .uagb-tabs__icon-position-top > .uagb-tabs__icon' => array(
					'margin-bottom' => UAGB_Helper::get_css_value( $attr['iconSpacing'], 'px' ),
				),
			);
			$m_selectors = array();
			$t_selectors = array();

			// Desktop.
			if ( 'hstyle5' === $attr['tabsStyleD'] ) {
				$selectors['.uagb-tabs__wrap.uagb-tabs__hstyle5-desktop'] = array(
					'background'   => $attr['bodyBgColor'],
					'border-color' => $attr['borderColor'],
					'border-width' => UAGB_Helper::get_css_value( $attr['borderWidth'], 'px' ),
				);
			}
			if ( 'vstyle10' === $attr['tabsStyleD'] ) {
				$selectors['.uagb-tabs__wrap.uagb-tabs__vstyle10-desktop'] = array(
					'background'   => $attr['bodyBgColor'],
					'border-color' => $attr['borderColor'],
					'border-width' => UAGB_Helper::get_css_value( $attr['borderWidth'], 'px' ),
				);
			}
			// Mobile.
			if ( 'hstyle5' === $attr['tabsStyleM'] ) {
				$m_selectors['.uagb-tabs__wrap.uagb-tabs__hstyle5-mobile '] = array(
					'background'   => $attr['bodyBgColor'],
					'border-color' => $attr['borderColor'],
					'border-width' => UAGB_Helper::get_css_value( $attr['borderWidth'], 'px' ),
				);
			}
			if ( 'vstyle10' === $attr['tabsStyleM'] ) {
				$m_selectors['.uagb-tabs__wrap.uagb-tabs__vstyle10-mobile '] = array(
					'background'   => $attr['bodyBgColor'],
					'border-color' => $attr['borderColor'],
					'border-width' => UAGB_Helper::get_css_value( $attr['borderWidth'], 'px' ),
				);
			}
			if ( 'stack4' === $attr['tabsStyleM'] ) {
				$m_selectors['.uagb-tabs__wrap.uagb-tabs__stack4-mobile'] = array(
					'background'   => $attr['bodyBgColor'],
					'border-color' => $attr['borderColor'],
					'border-width' => UAGB_Helper::get_css_value( $attr['borderWidth'], 'px' ),
				);
			}
			// Tablet.
			if ( 'hstyle5' === $attr['tabsStyleT'] ) {
				$t_selectors['.uagb-tabs__wrap.uagb-tabs__hstyle5-tablet '] = array(
					'background'   => $attr['bodyBgColor'],
					'border-color' => $attr['borderColor'],
					'border-width' => UAGB_Helper::get_css_value( $attr['borderWidth'], 'px' ),
				);
			}
			if ( 'vstyle10' === $attr['tabsStyleT'] ) {
				$t_selectors['.uagb-tabs__wrap.uagb-tabs__vstyle10-tablet'] = array(
					'background'   => $attr['bodyBgColor'],
					'border-color' => $attr['borderColor'],
					'border-width' => UAGB_Helper::get_css_value( $attr['borderWidth'], 'px' ),
				);
			}
			$combined_selectors = array(
				'desktop' => $selectors,
				'mobile'  => $m_selectors,
				'tablet'  => $t_selectors,
			);
			$combined_selectors = UAGB_Helper::get_typography_css( $attr, 'title', '  .uagb-tabs__panel .uagb-tab span', $combined_selectors );

			return UAGB_Helper::generate_all_css( $combined_selectors, '.uagb-block-' . $id );
		}
		/**
		 * Get Blockquote CSS
		 *
		 * @since 1.8.2
		 * @param array  $attr The block attributes.
		 * @param string $id The selector ID.
		 * @return array The Widget List.
		 */
		public static function get_blockquote_css( $attr, $id ) {

			$defaults = UAGB_Helper::$block_list['uagb/blockquote']['attributes'];

			$attr = array_merge( $defaults, (array) $attr );

			$author_space = $attr['authorSpace'];

			if ( 'center' !== $attr['align'] || 'border' === $attr['skinStyle'] ) {
				$author_space = 0;
			}

			// Set align to left for border style.
			$text_align = $attr['align'];

			if ( 'border' === $attr['skinStyle'] ) {
				$text_align = 'left';
			}

			$selectors = array(
				' .uagb-blockquote__content'          => array(
					'color'         => $attr['descColor'],
					'margin-bottom' => UAGB_Helper::get_css_value( $attr['descSpace'], 'px' ),
					'text-align'    => $text_align,
				),
				' cite.uagb-blockquote__author'       => array(
					'color'      => $attr['authorColor'],
					'text-align' => $text_align,
				),
				' .uagb-blockquote__skin-border blockquote.uagb-blockquote' => array(
					'border-color'      => $attr['borderColor'],
					'border-left-style' => $attr['borderStyle'],
					'border-left-width' => UAGB_Helper::get_css_value( $attr['borderWidth'], 'px' ),
					'padding-left'      => UAGB_Helper::get_css_value( $attr['borderGap'], 'px' ),
					'padding-top'       => UAGB_Helper::get_css_value( $attr['verticalPadding'], 'px' ),
					'padding-bottom'    => UAGB_Helper::get_css_value( $attr['verticalPadding'], 'px' ),
				),

				' .uagb-blockquote__skin-quotation .uagb-blockquote__icon-wrap' => array(
					'background'    => $attr['quoteBgColor'],
					'border-radius' => UAGB_Helper::get_css_value( $attr['quoteBorderRadius'], '%' ),
					'margin-top'    => UAGB_Helper::get_css_value( $attr['quoteTopMargin'], 'px' ),
					'margin-bottom' => UAGB_Helper::get_css_value( $attr['quoteBottomMargin'], 'px' ),
					'margin-left'   => UAGB_Helper::get_css_value( $attr['quoteLeftMargin'], 'px' ),
					'margin-right'  => UAGB_Helper::get_css_value( $attr['quoteRightMargin'], 'px' ),
					'padding'       => UAGB_Helper::get_css_value( $attr['quotePadding'], $attr['quotePaddingType'] ),
				),

				' .uagb-blockquote__skin-quotation .uagb-blockquote__icon' => array(
					'width'  => UAGB_Helper::get_css_value( $attr['quoteSize'], $attr['quoteSizeType'] ),
					'height' => UAGB_Helper::get_css_value( $attr['quoteSize'], $attr['quoteSizeType'] ),
				),

				' .uagb-blockquote__skin-quotation .uagb-blockquote__icon svg' => array(
					'fill' => $attr['quoteColor'],
				),

				' .uagb-blockquote__style-style_1 .uagb-blockquote' => array(
					'text-align' => $attr['align'],
				),

				' .uagb-blockquote__author-wrap'      => array(
					'margin-bottom' => UAGB_Helper::get_css_value( $author_space, 'px' ),
				),
				' .uagb-blockquote__author-image img' => array(
					'width'         => UAGB_Helper::get_css_value( $attr['authorImageWidth'], 'px' ),
					'height'        => UAGB_Helper::get_css_value( $attr['authorImageWidth'], 'px' ),
					'border-radius' => UAGB_Helper::get_css_value( $attr['authorImgBorderRadius'], '%' ),
				),

				' .uagb-blockquote__skin-quotation .uagb-blockquote__icon:hover svg' => array(
					'fill' => $attr['quoteHoverColor'],
				),

				' .uagb-blockquote__skin-quotation .uagb-blockquote__icon-wrap:hover' => array(
					'background' => $attr['quoteBgHoverColor'],
				),

				' .uagb-blockquote__skin-border blockquote.uagb-blockquote:hover' => array(
					'border-left-color' => $attr['borderHoverColor'],
				),
			);

			if ( $attr['enableTweet'] ) {
				$selectors[' .uagb-blockquote__tweet-style-link a.uagb-blockquote__tweet-button'] = array(
					'color' => $attr['tweetLinkColor'],
				);

				$selectors[' .uagb-blockquote__tweet-style-link a.uagb-blockquote__tweet-button svg'] = array(
					'fill' => $attr['tweetLinkColor'],
				);

				$selectors[' .uagb-blockquote__tweet-style-classic a.uagb-blockquote__tweet-button'] = array(
					'color'            => $attr['tweetBtnColor'],
					'background-color' => $attr['tweetBtnBgColor'],
					'padding-left'     => UAGB_Helper::get_css_value( $attr['tweetBtnHrPadding'], 'px' ),
					'padding-right'    => UAGB_Helper::get_css_value( $attr['tweetBtnHrPadding'], 'px' ),
					'padding-top'      => UAGB_Helper::get_css_value( $attr['tweetBtnVrPadding'], 'px' ),
					'padding-bottom'   => UAGB_Helper::get_css_value( $attr['tweetBtnVrPadding'], 'px' ),
				);

				$selectors[' .uagb-blockquote__tweet-style-classic a.uagb-blockquote__tweet-button svg'] = array(
					'fill' => $attr['tweetBtnColor'],
				);

				$selectors[' .uagb-blockquote__tweet-style-bubble a.uagb-blockquote__tweet-button'] = array(
					'color'            => $attr['tweetBtnColor'],
					'background-color' => $attr['tweetBtnBgColor'],
					'padding-left'     => UAGB_Helper::get_css_value( $attr['tweetBtnHrPadding'], 'px' ),
					'padding-right'    => UAGB_Helper::get_css_value( $attr['tweetBtnHrPadding'], 'px' ),
					'padding-top'      => UAGB_Helper::get_css_value( $attr['tweetBtnVrPadding'], 'px' ),
					'padding-bottom'   => UAGB_Helper::get_css_value( $attr['tweetBtnVrPadding'], 'px' ),
				);

				$selectors[' .uagb-blockquote__tweet-style-bubble a.uagb-blockquote__tweet-button svg'] = array(
					'fill' => $attr['tweetBtnColor'],
				);

				$selectors[' .uagb-blockquote__tweet-style-bubble a.uagb-blockquote__tweet-button:before'] = array(
					'border-right-color' => $attr['tweetBtnBgColor'],
				);

				$selectors[' a.uagb-blockquote__tweet-button svg'] = array(
					'width'  => UAGB_Helper::get_css_value( $attr['tweetBtnFontSize'], $attr['tweetBtnFontSizeType'] ),
					'height' => UAGB_Helper::get_css_value( $attr['tweetBtnFontSize'], $attr['tweetBtnFontSizeType'] ),
				);

				$selectors[' .uagb-blockquote__tweet-icon_text a.uagb-blockquote__tweet-button svg'] = array(
					'margin-right' => UAGB_Helper::get_css_value( $attr['tweetIconSpacing'], 'px' ),
				);

				// Hover CSS.
				$selectors[' .uagb-blockquote__tweet-style-link a.uagb-blockquote__tweet-button:hover'] = array(
					'color' => $attr['tweetBtnHoverColor'],
				);

				$selectors[' .uagb-blockquote__tweet-style-link a.uagb-blockquote__tweet-button:hover svg'] = array(
					'fill' => $attr['tweetBtnHoverColor'],
				);

				$selectors[' .uagb-blockquote__tweet-style-classic a.uagb-blockquote__tweet-button:hover'] = array(
					'color'            => $attr['tweetBtnHoverColor'],
					'background-color' => $attr['tweetBtnBgHoverColor'],
				);

				$selectors[' .uagb-blockquote__tweet-style-classic a.uagb-blockquote__tweet-button:hover svg'] = array(
					'fill' => $attr['tweetBtnHoverColor'],
				);

				$selectors[' .uagb-blockquote__tweet-style-bubble a.uagb-blockquote__tweet-button:hover'] = array(
					'color'            => $attr['tweetBtnHoverColor'],
					'background-color' => $attr['tweetBtnBgHoverColor'],
				);

				$selectors[' .uagb-blockquote__tweet-style-bubble a.uagb-blockquote__tweet-button:hover svg'] = array(
					'fill' => $attr['tweetBtnHoverColor'],
				);

				$selectors[' .uagb-blockquote__tweet-style-bubble a.uagb-blockquote__tweet-button:hover:before'] = array(
					'border-right-color' => $attr['tweetBtnBgHoverColor'],
				);
			}

			$t_selectors = array(
				' a.uagb-blockquote__tweet-button svg' => array(
					'width'  => UAGB_Helper::get_css_value( $attr['tweetBtnFontSizeTablet'], $attr['tweetBtnFontSizeType'] ),
					'height' => UAGB_Helper::get_css_value( $attr['tweetBtnFontSizeTablet'], $attr['tweetBtnFontSizeType'] ),
				),
				' .uagb-blockquote__skin-quotation .uagb-blockquote__icon-wrap' => array(
					'padding' => UAGB_Helper::get_css_value( $attr['quotePaddingTablet'], $attr['quotePaddingType'] ),
				),
				' .uagb-blockquote__skin-quotation .uagb-blockquote__icon' => array(
					'width'  => UAGB_Helper::get_css_value( $attr['quoteSizeTablet'], $attr['quoteSizeType'] ),
					'height' => UAGB_Helper::get_css_value( $attr['quoteSizeTablet'], $attr['quoteSizeType'] ),
				),
			);

			$m_selectors = array(
				' a.uagb-blockquote__tweet-button svg' => array(
					'width'  => UAGB_Helper::get_css_value( $attr['tweetBtnFontSizeMobile'], $attr['tweetBtnFontSizeType'] ),
					'height' => UAGB_Helper::get_css_value( $attr['tweetBtnFontSizeMobile'], $attr['tweetBtnFontSizeType'] ),
				),
				' .uagb-blockquote__skin-quotation .uagb-blockquote__icon-wrap' => array(
					'padding' => UAGB_Helper::get_css_value( $attr['quotePaddingMobile'], $attr['quotePaddingType'] ),
				),
				' .uagb-blockquote__skin-quotation .uagb-blockquote__icon' => array(
					'width'  => UAGB_Helper::get_css_value( $attr['quoteSizeMobile'], $attr['quoteSizeType'] ),
					'height' => UAGB_Helper::get_css_value( $attr['quoteSizeMobile'], $attr['quoteSizeType'] ),
				),
			);

			$combined_selectors = array(
				'desktop' => $selectors,
				'tablet'  => $t_selectors,
				'mobile'  => $m_selectors,
			);

			$combined_selectors = UAGB_Helper::get_typography_css( $attr, 'tweetBtn', ' a.uagb-blockquote__tweet-button', $combined_selectors );
			$combined_selectors = UAGB_Helper::get_typography_css( $attr, 'author', ' cite.uagb-blockquote__author', $combined_selectors );
			$combined_selectors = UAGB_Helper::get_typography_css( $attr, 'desc', ' .uagb-blockquote__content', $combined_selectors );

			$base_selector = ( $attr['classMigrate'] ) ? '.uagb-block-' : '#uagb-blockquote-';

			return UAGB_Helper::generate_all_css( $combined_selectors, $base_selector . $id );
		}

		/**
		 * Get Timeline Block Desktop Selectors CSS
		 *
		 * @param array $attr The block attributes.
		 * @since 1.8.2
		 */
		public static function get_timeline_selectors( $attr ) {
			$connector_size = UAGB_Helper::get_css_value( $attr['connectorBgsize'], 'px' );
			$selectors      = array(
				' .uagb-timeline__heading-text'           => array(
					'margin-bottom' => UAGB_Helper::get_css_value( $attr['headSpace'], 'px' ),
				),
				' .uagb-timeline-desc-content'            => array(
					'text-align' => $attr['align'],
					'color'      => $attr['subHeadingColor'],
				),
				' .uagb-timeline__events-new'             => array(
					'text-align' => $attr['align'],
				),
				' .uagb-timeline__day-right .uagb-timeline__arrow:after' => array(
					'border-left-color' => $attr['backgroundColor'],
				),
				' .uagb-timeline__day-right .uagb-timeline__arrow:after' => array(
					'border-left-color' => $attr['backgroundColor'],
				),
				' .uagb-timeline__day-left .uagb-timeline__arrow:after' => array(
					'border-right-color' => $attr['backgroundColor'],
				),
				' .uagb-timeline__day-left .uagb-timeline__arrow:after' => array(
					'border-right-color' => $attr['backgroundColor'],
				),
				' .uagb-timeline__line__inner'            => array(
					'background-color' => $attr['separatorFillColor'],
				),
				' .uagb-timeline__line'                   => array(
					'background-color' => $attr['separatorColor'],
					'width'            => UAGB_Helper::get_css_value( $attr['separatorwidth'], 'px' ),
				),
				' .uagb-timeline__right-block .uagb-timeline__line' => array(
					'right' => 'calc( ' . $attr['connectorBgsize'] . 'px / 2 )',
				),
				' .uagb-timeline__left-block .uagb-timeline__line' => array(
					'left' => 'calc( ' . $attr['connectorBgsize'] . 'px / 2 )',
				),
				' .uagb-timeline__center-block .uagb-timeline__line' => array(
					'right' => 'calc( ' . $attr['connectorBgsize'] . 'px / 2 )',
				),
				' .uagb-timeline__marker'                 => array(
					'background-color' => $attr['separatorBg'],
					'min-height'       => $connector_size,
					'min-width'        => $connector_size,
					'line-height'      => $connector_size,
					'border'           => $attr['borderwidth'] . 'px solid' . $attr['separatorBorder'],
				),
				' .uagb-timeline__left-block .uagb-timeline__left .uagb-timeline__arrow' => array(
					'height' => $connector_size,
				),
				' .uagb-timeline__right-block .uagb-timeline__right .uagb-timeline__arrow' => array(
					'height' => $connector_size,
				),
				' .uagb-timeline__center-block .uagb-timeline__left .uagb-timeline__arrow' => array(
					'height' => $connector_size,
				),
				' .uagb-timeline__center-block .uagb-timeline__right .uagb-timeline__arrow' => array(
					'height' => $connector_size,
				),
				' .uagb-timeline__center-block .uagb-timeline__marker' => array(
					'margin-left'  => UAGB_Helper::get_css_value( $attr['horizontalSpace'], 'px' ),
					'margin-right' => UAGB_Helper::get_css_value( $attr['horizontalSpace'], 'px' ),
				),
				' .uagb-timeline__field:not(:last-child)' => array(
					'margin-bottom' => UAGB_Helper::get_css_value( $attr['verticalSpace'], 'px' ),
				),
				' .uagb-timeline__date-hide.uagb-timeline__date-inner' => array(
					'margin-bottom' => UAGB_Helper::get_css_value( $attr['dateBottomspace'], 'px' ),
					'color'         => $attr['dateColor'],
					'text-align'    => $attr['align'],
				),
				' .uagb-timeline__left-block .uagb-timeline__day-new.uagb-timeline__day-left' => array(
					'margin-left' => UAGB_Helper::get_css_value( $attr['horizontalSpace'], 'px' ),
				),
				' .uagb-timeline__right-block .uagb-timeline__day-new.uagb-timeline__day-right' => array(
					'margin-right' => UAGB_Helper::get_css_value( $attr['horizontalSpace'], 'px' ),
				),
				' .uagb-timeline__date-new'               => array(
					'color'     => $attr['dateColor'],
					'font-size' => UAGB_Helper::get_css_value( $attr['dateFontsize'], $attr['dateFontsizeType'] ),
				),
				' .uagb-timeline__events-inner-new'       => array(
					'background-color' => $attr['backgroundColor'],
					'border-radius'    => UAGB_Helper::get_css_value( $attr['borderRadius'], 'px' ),
					'padding'          => UAGB_Helper::get_css_value( $attr['bgPadding'], 'px' ),
				),
				' .uagb-timeline__main .uagb-timeline__icon-new' => array(
					'color'     => $attr['iconColor'],
					'font-size' => UAGB_Helper::get_css_value( $attr['iconSize'], 'px' ),
					'width'     => UAGB_Helper::get_css_value( $attr['iconSize'], 'px' ),
				),
				' .uagb-timeline__main .uagb-timeline__marker.uagb-timeline__in-view-icon .uagb-timeline__icon-new svg' => array(
					'fill' => $attr['iconFocus'],
				),
				' .uagb-timeline__main .uagb-timeline__marker.uagb-timeline__in-view-icon .uagb-timeline__icon-new' => array(
					'color' => $attr['iconFocus'],
				),
				' .uagb-timeline__main .uagb-timeline__marker.uagb-timeline__in-view-icon' => array(
					'background'   => $attr['iconBgFocus'],
					'border-color' => $attr['borderFocus'],
				),
				' .uagb-timeline__main .uagb-timeline__icon-new svg' => array(
					'fill' => $attr['iconColor'],
				),
			);

			return $selectors;

		}

		/**
		 * Get Timeline Block Tablet Selectors CSS.
		 *
		 * @param array $attr The block attributes.
		 * @since 1.8.2
		 */
		public static function get_timeline_tablet_selectors( $attr ) {
			$tablet_selector = array(
				' .uagb-timeline__center-block .uagb-timeline__marker' => array(
					'margin-left'  => 0,
					'margin-right' => 0,
				),
				' .uagb-timeline__center-block.uagb-timeline__responsive-tablet .uagb-timeline__day-right .uagb-timeline__arrow:after' => array(
					'border-right-color' => $attr['backgroundColor'],
				),
				' .uagb-timeline__center-block.uagb-timeline__responsive-tablet .uagb-timeline__line' => array(
					'left' => 'calc( ' . $attr['connectorBgsize'] . 'px / 2 )',
				),
			);

			return $tablet_selector;

		}

		/**
		 * Get Timeline Block Mobile Selectors CSS.
		 *
		 * @param array $attr The block attributes.
		 * @since 1.8.2
		 */
		public static function get_timeline_mobile_selectors( $attr ) {
			$m_selectors = array(
				' .uagb-timeline__center-block .uagb-timeline__marker' => array(
					'margin-left'  => 0,
					'margin-right' => 0,
				),
				' .uagb-timeline__center-block .uagb-timeline__day-new.uagb-timeline__day-left' => array(
					'margin-left' => UAGB_Helper::get_css_value( $attr['horizontalSpace'], 'px' ),
				),
				' .uagb-timeline__center-block .uagb-timeline__day-new.uagb-timeline__day-right' => array(
					'margin-left' => UAGB_Helper::get_css_value( $attr['horizontalSpace'], 'px' ),
				),
				' .uagb-timeline__center-block.uagb-timeline__responsive-mobile .uagb-timeline__day-right .uagb-timeline__arrow:after' => array(
					'border-right-color' => $attr['backgroundColor'],
				),
				' .uagb-timeline__center-block.uagb-timeline__responsive-mobile .uagb-timeline__line' => array(
					'left' => 'calc( ' . $attr['connectorBgsize'] . 'px / 2 )',
				),
			);
			return $m_selectors;

		}

		/**
		 * Get Contact Form 7 CSS
		 *
		 * @param array  $attr The block attributes.
		 * @param string $id The selector ID.
		 * @since 1.10.0
		 */
		public static function get_cf7_styler_css( $attr, $id ) {
			$defaults = UAGB_Helper::$block_list['uagb/cf7-styler']['attributes'];

			$attr = array_merge( $defaults, (array) $attr );

			$field_hr_padding = UAGB_Helper::get_css_value( $attr['fieldHrPadding'], 'px' );
			$field_vr_padding = UAGB_Helper::get_css_value( $attr['fieldVrPadding'], 'px' );

			$selectors = array(
				' .wpcf7 .wpcf7-form'                => array(
					'text-align' => $attr['align'],
				),
				' .wpcf7 form.wpcf7-form:not(input)' => array(
					'color' => $attr['fieldLabelColor'],
				),
				' .wpcf7 input:not([type=submit])'   => array(
					'background-color' => $attr['fieldBgColor'],
					'color'            => $attr['fieldInputColor'],
					'border-style'     => $attr['fieldBorderStyle'],
					'border-color'     => $attr['fieldBorderColor'],
					'border-width'     => UAGB_Helper::get_css_value( $attr['fieldBorderWidth'], 'px' ),
					'border-radius'    => UAGB_Helper::get_css_value( $attr['fieldBorderRadius'], $attr['fieldBorderRadiusType'] ),
					'padding-left'     => $field_hr_padding,
					'padding-right'    => $field_hr_padding,
					'padding-top'      => $field_vr_padding,
					'padding-bottom'   => $field_vr_padding,
					'margin-top'       => UAGB_Helper::get_css_value( $attr['fieldLabelSpacing'], 'px' ),
					'margin-bottom'    => UAGB_Helper::get_css_value( $attr['fieldSpacing'], 'px' ),
					'text-align'       => $attr['align'],
				),
				' .wpcf7 select'                     => array(
					'background-color' => $attr['fieldBgColor'],
					'color'            => $attr['fieldLabelColor'],
					'border-style'     => $attr['fieldBorderStyle'],
					'border-color'     => $attr['fieldBorderColor'],
					'border-width'     => UAGB_Helper::get_css_value( $attr['fieldBorderWidth'], 'px' ),
					'border-radius'    => UAGB_Helper::get_css_value( $attr['fieldBorderRadius'], $attr['fieldBorderRadiusType'] ),
					'margin-top'       => UAGB_Helper::get_css_value( $attr['fieldLabelSpacing'], 'px' ),
					'margin-bottom'    => UAGB_Helper::get_css_value( $attr['fieldSpacing'], 'px' ),
					'text-align'       => $attr['align'],
				),
				' .wpcf7 select.wpcf7-form-control.wpcf7-select:not([multiple="multiple"])' => array(
					'padding-left'   => $field_hr_padding,
					'padding-right'  => $field_hr_padding,
					'padding-top'    => $field_vr_padding,
					'padding-bottom' => $field_vr_padding,
				),
				' .wpcf7 select.wpcf7-select[multiple="multiple"] option' => array(
					'padding-left'   => $field_hr_padding,
					'padding-right'  => $field_hr_padding,
					'padding-top'    => $field_vr_padding,
					'padding-bottom' => $field_vr_padding,
				),
				' .wpcf7 textarea'                   => array(
					'background-color' => $attr['fieldBgColor'],
					'color'            => $attr['fieldInputColor'],
					'border-color'     => $attr['fieldBorderColor'],
					'border-width'     => UAGB_Helper::get_css_value( $attr['fieldBorderWidth'], 'px' ),
					'border-radius'    => UAGB_Helper::get_css_value( $attr['fieldBorderRadius'], $attr['fieldBorderRadiusType'] ),
					'border-style'     => $attr['fieldBorderStyle'],
					'padding-left'     => $field_hr_padding,
					'padding-right'    => $field_hr_padding,
					'padding-top'      => $field_vr_padding,
					'padding-bottom'   => $field_vr_padding,
					'margin-top'       => UAGB_Helper::get_css_value( $attr['fieldLabelSpacing'], 'px' ),
					'margin-bottom'    => UAGB_Helper::get_css_value( $attr['fieldSpacing'], 'px' ),
					'text-align'       => $attr['align'],
				),
				' .wpcf7 textarea::placeholder'      => array(
					'color'      => $attr['fieldInputColor'],
					'text-align' => $attr['align'],
				),
				' .wpcf7 input::placeholder'         => array(
					'color'      => $attr['fieldInputColor'],
					'text-align' => $attr['align'],
				),

				// Focus.
				' .wpcf7 form input:not([type=submit]):focus' => array(
					'border-color' => $attr['fieldBorderFocusColor'],
				),
				' .wpcf7 form select:focus'          => array(
					'border-color' => $attr['fieldBorderFocusColor'],
				),
				' .wpcf7 textarea:focus'             => array(
					'border-color' => $attr['fieldBorderFocusColor'],
				),

				// Submit button.
				' .wpcf7 input.wpcf7-form-control.wpcf7-submit' => array(
					'color'            => $attr['buttonTextColor'],
					'background-color' => $attr['buttonBgColor'],
					'border-color'     => $attr['buttonBorderColor'],
					'border-style'     => $attr['buttonBorderStyle'],
					'border-width'     => UAGB_Helper::get_css_value( $attr['buttonBorderWidth'], 'px' ),
					'border-radius'    => UAGB_Helper::get_css_value( $attr['buttonBorderRadius'], $attr['buttonBorderRadiusType'] ),
					'padding-left'     => UAGB_Helper::get_css_value( $attr['buttonHrPadding'], 'px' ),
					'padding-right'    => UAGB_Helper::get_css_value( $attr['buttonHrPadding'], 'px' ),
					'padding-top'      => UAGB_Helper::get_css_value( $attr['buttonVrPadding'], 'px' ),
					'padding-bottom'   => UAGB_Helper::get_css_value( $attr['buttonVrPadding'], 'px' ),
				),
				' .wpcf7 input.wpcf7-form-control.wpcf7-submit:hover' => array(
					'color'            => $attr['buttonTextHoverColor'],
					'background-color' => $attr['buttonBgHoverColor'],
					'border-color'     => $attr['buttonBorderHoverColor'],
				),

				// Check box Radio.
				' .wpcf7 .wpcf7-checkbox input[type="checkbox"]:checked + span:before' => array(
					'background-color' => $attr['fieldBgColor'],
					'color'            => $attr['fieldInputColor'],
					'font-size'        => 'calc( ' . $attr['fieldVrPadding'] . 'px / 1.2 )',
					'border-color'     => $attr['fieldBorderFocusColor'],
				),
				' .wpcf7 .wpcf7-checkbox input[type="checkbox"] + span:before' => array(
					'background-color' => $attr['fieldBgColor'],
					'color'            => $attr['fieldInputColor'],
					'height'           => $field_vr_padding,
					'width'            => $field_vr_padding,
					'border-style'     => $attr['fieldBorderStyle'],
					'border-color'     => $attr['fieldBorderColor'],
					'border-width'     => UAGB_Helper::get_css_value( $attr['fieldBorderWidth'], 'px' ),
					'border-radius'    => UAGB_Helper::get_css_value( $attr['fieldBorderRadius'], $attr['fieldBorderRadiusType'] ),
					'font-size'        => 'calc( ' . $attr['fieldVrPadding'] . 'px / 1.2 )',
				),
				' .wpcf7 .wpcf7-acceptance input[type="checkbox"]:checked + span:before' => array(
					'background-color' => $attr['fieldBgColor'],
					'color'            => $attr['fieldInputColor'],
					'font-size'        => 'calc( ' . $attr['fieldVrPadding'] . 'px / 1.2 )',
					'border-color'     => $attr['fieldBorderFocusColor'],
				),
				' .wpcf7 .wpcf7-acceptance input[type="checkbox"] + span:before' => array(
					'background-color' => $attr['fieldBgColor'],
					'color'            => $attr['fieldInputColor'],
					'height'           => $field_vr_padding,
					'width'            => $field_vr_padding,
					'font-size'        => 'calc( ' . $attr['fieldVrPadding'] . 'px / 1.2 )',
					'border-color'     => $attr['fieldBorderColor'],
					'border-style'     => $attr['fieldBorderStyle'],
					'border-width'     => UAGB_Helper::get_css_value( $attr['fieldBorderWidth'], 'px' ),
					'border-radius'    => UAGB_Helper::get_css_value( $attr['fieldBorderRadius'], $attr['fieldBorderRadiusType'] ),
				),
				' .wpcf7 .wpcf7-radio input[type="radio"] + span:before' => array(
					'background-color' => $attr['fieldBgColor'],
					'color'            => $attr['fieldInputColor'],
					'height'           => $field_vr_padding,
					'width'            => $field_vr_padding,
					'border-style'     => $attr['fieldBorderStyle'],
					'border-color'     => $attr['fieldBorderColor'],
					'border-width'     => UAGB_Helper::get_css_value( $attr['fieldBorderWidth'], 'px' ),
				),
				' .wpcf7 .wpcf7-radio input[type="radio"]:checked + span:before' => array(
					'border-color' => $attr['fieldBorderFocusColor'],
				),

				// Underline border.
				' .uagb-cf7-styler__field-style-underline .wpcf7 input:not([type=submit])' => array(
					'border-style'        => 'none',
					'border-bottom-color' => $attr['fieldBorderColor'],
					'border-bottom-style' => 'solid',
					'border-bottom-width' => UAGB_Helper::get_css_value( $attr['fieldBorderWidth'], 'px' ),
					'border-radius'       => UAGB_Helper::get_css_value( $attr['fieldBorderRadius'], $attr['fieldBorderRadiusType'] ),
				),
				' .uagb-cf7-styler__field-style-underline textarea' => array(
					'border-style'        => 'none',
					'border-bottom-color' => $attr['fieldBorderColor'],
					'border-bottom-style' => 'solid',
					'border-bottom-width' => UAGB_Helper::get_css_value( $attr['fieldBorderWidth'], 'px' ),
					'border-radius'       => UAGB_Helper::get_css_value( $attr['fieldBorderRadius'], $attr['fieldBorderRadiusType'] ),
				),
				' .uagb-cf7-styler__field-style-underline select' => array(
					'border-style'        => 'none',
					'border-bottom-color' => $attr['fieldBorderColor'],
					'border-bottom-style' => 'solid',
					'border-bottom-width' => UAGB_Helper::get_css_value( $attr['fieldBorderWidth'], 'px' ),
					'border-radius'       => UAGB_Helper::get_css_value( $attr['fieldBorderRadius'], $attr['fieldBorderRadiusType'] ),
				),
				' .uagb-cf7-styler__field-style-underline textarea' => array(
					'border-style'        => 'none',
					'border-bottom-color' => $attr['fieldBorderColor'],
					'border-bottom-style' => 'solid',
					'border-bottom-width' => UAGB_Helper::get_css_value( $attr['fieldBorderWidth'], 'px' ),
					'border-radius'       => UAGB_Helper::get_css_value( $attr['fieldBorderRadius'], $attr['fieldBorderRadiusType'] ),
				),
				' .uagb-cf7-styler__field-style-underline .wpcf7-checkbox input[type="checkbox"] + span:before' => array(
					'border-style' => 'solid',
				),
				' .uagb-cf7-styler__field-style-underline .wpcf7 input[type="radio"] + span:before' => array(
					'border-style' => 'solid',
				),
				' .uagb-cf7-styler__field-style-underline .wpcf7-acceptance input[type="checkbox"] + span:before' => array(
					'border-style' => 'solid',
				),
				' .uagb-cf7-styler__field-style-box .wpcf7-checkbox input[type="checkbox"]:checked + span:before' => array(
					'border-style'  => $attr['fieldBorderStyle'],
					'border-width'  => UAGB_Helper::get_css_value( $attr['fieldBorderWidth'], 'px' ),
					'border-radius' => UAGB_Helper::get_css_value( $attr['fieldBorderRadius'], $attr['fieldBorderRadiusType'] ),
					'font-size'     => 'calc( ' . $attr['fieldVrPadding'] . 'px / 1.2 )',
				),
				' .uagb-cf7-styler__field-style-box .wpcf7-acceptance input[type="checkbox"]:checked + span:before' => array(
					'border-style'  => $attr['fieldBorderStyle'],
					'border-width'  => UAGB_Helper::get_css_value( $attr['fieldBorderWidth'], 'px' ),
					'border-radius' => UAGB_Helper::get_css_value( $attr['fieldBorderRadius'], $attr['fieldBorderRadiusType'] ),
					'font-size'     => 'calc( ' . $attr['fieldVrPadding'] . 'px / 1.2 )',
				),
				' .wpcf7-radio input[type="radio"]:checked + span:before' => array(
					'background-color' => $attr['fieldInputColor'],
				),

				// Override check box.
				' .uagb-cf7-styler__check-style-enabled .wpcf7 .wpcf7-checkbox input[type="checkbox"] + span:before' => array(
					'background-color' => $attr['radioCheckBgColor'],
					'color'            => $attr['radioCheckSelectColor'],
					'height'           => UAGB_Helper::get_css_value( $attr['radioCheckSize'], 'px' ),
					'width'            => UAGB_Helper::get_css_value( $attr['radioCheckSize'], 'px' ),
					'font-size'        => 'calc( ' . $attr['radioCheckSize'] . 'px / 1.2 )',
					'border-color'     => $attr['radioCheckBorderColor'],
					'border-width'     => UAGB_Helper::get_css_value( $attr['radioCheckBorderWidth'], 'px' ),
					'border-radius'    => UAGB_Helper::get_css_value( $attr['radioCheckBorderRadius'], $attr['radioCheckBorderRadiusType'] ),
				),
				' .uagb-cf7-styler__check-style-enabled .wpcf7 .wpcf7-checkbox input[type="checkbox"]:checked + span:before' => array(
					'border-color' => $attr['fieldBorderFocusColor'],
				),
				' .uagb-cf7-styler__check-style-enabled .wpcf7 .wpcf7-acceptance input[type="checkbox"] + span:before' => array(
					'background-color' => $attr['radioCheckBgColor'],
					'color'            => $attr['radioCheckSelectColor'],
					'height'           => UAGB_Helper::get_css_value( $attr['radioCheckSize'], 'px' ),
					'width'            => UAGB_Helper::get_css_value( $attr['radioCheckSize'], 'px' ),
					'font-size'        => 'calc( ' . $attr['radioCheckSize'] . 'px / 1.2 )',
					'border-color'     => $attr['radioCheckBorderColor'],
					'border-width'     => UAGB_Helper::get_css_value( $attr['radioCheckBorderWidth'], 'px' ),
					'border-radius'    => UAGB_Helper::get_css_value( $attr['radioCheckBorderRadius'], $attr['radioCheckBorderRadiusType'] ),
				),
				' .uagb-cf7-styler__check-style-enabled .wpcf7 .wpcf7-acceptance input[type="checkbox"]:checked + span:before' => array(
					'border-color' => $attr['fieldBorderFocusColor'],
				),

				' .uagb-cf7-styler__check-style-enabled .wpcf7 input[type="radio"] + span:before' => array(
					'background-color' => $attr['radioCheckBgColor'],
					'color'            => $attr['radioCheckSelectColor'],
					'height'           => UAGB_Helper::get_css_value( $attr['radioCheckSize'], 'px' ),
					'width'            => UAGB_Helper::get_css_value( $attr['radioCheckSize'], 'px' ),
					'font-size'        => 'calc( ' . $attr['radioCheckSize'] . 'px / 1.2 )',
					'border-color'     => $attr['radioCheckBorderColor'],
					'border-width'     => UAGB_Helper::get_css_value( $attr['radioCheckBorderWidth'], 'px' ),
				),
				' .uagb-cf7-styler__check-style-enabled .wpcf7-radio input[type="radio"]:checked + span:before' => array(
					'background-color' => $attr['radioCheckSelectColor'],
				),
				' .uagb-cf7-styler__check-style-enabled .wpcf7 form .wpcf7-list-item-label' => array(
					'color' => $attr['radioCheckLableColor'],
				),
				' span.wpcf7-not-valid-tip'          => array(
					'color' => $attr['validationMsgColor'],
				),
				' .uagb-cf7-styler__highlight-border input.wpcf7-form-control.wpcf7-not-valid' => array(
					'border-color' => $attr['highlightBorderColor'],
				),
				' .uagb-cf7-styler__highlight-border .wpcf7-form-control.wpcf7-not-valid .wpcf7-list-item-label:before' => array(
					'border-color' => $attr['highlightBorderColor'] . '!important',
				),
				' .uagb-cf7-styler__highlight-style-bottom_right .wpcf7-not-valid-tip' => array(
					'background-color' => $attr['validationMsgBgColor'],
				),
				' .wpcf7-response-output'            => array(
					'border-width'   => UAGB_Helper::get_css_value( $attr['msgBorderSize'], 'px' ),
					'border-radius'  => UAGB_Helper::get_css_value( $attr['msgBorderRadius'], $attr['msgBorderRadiusType'] ),
					'padding-top'    => UAGB_Helper::get_css_value( $attr['msgVrPadding'], 'px' ),
					'padding-bottom' => UAGB_Helper::get_css_value( $attr['msgVrPadding'], 'px' ),
					'padding-left'   => UAGB_Helper::get_css_value( $attr['msgHrPadding'], 'px' ),
					'padding-right'  => UAGB_Helper::get_css_value( $attr['msgHrPadding'], 'px' ),
				),
				' .wpcf7-response-output.wpcf7-validation-errors' => array(
					'background-color' => $attr['errorMsgBgColor'],
					'border-color'     => $attr['errorMsgBorderColor'],
					'color'            => $attr['errorMsgColor'],
				),
				' .wpcf7-response-output.wpcf7-validation- success' => array(
					'background-color' => $attr['successMsgBgColor'],
					'border-color'     => $attr['successMsgBorderColor'],
					'color'            => $attr['successMsgColor'],
				),

			);

			$t_selectors = array(
				' .wpcf7 form.wpcf7-form:not(input)' => array(
					'color' => $attr['fieldLabelColor'],
				),
			);

			$m_selectors = array();

			$combined_selectors = array(
				'desktop' => $selectors,
				'tablet'  => $t_selectors,
				'mobile'  => $m_selectors,
			);

			$combined_selectors = UAGB_Helper::get_typography_css( $attr, 'radioCheck', ' .uagb-cf7-styler__check-style-enabled .wpcf7 form .wpcf7-list-item-label', $combined_selectors );
			$combined_selectors = UAGB_Helper::get_typography_css( $attr, 'validationMsg', ' span.wpcf7-not-valid-tip', $combined_selectors );
			$combined_selectors = UAGB_Helper::get_typography_css( $attr, 'msg', ' .wpcf7-response-output', $combined_selectors );
			$combined_selectors = UAGB_Helper::get_typography_css( $attr, 'button', ' .wpcf7 input.wpcf7-form-control.wpcf7-submit', $combined_selectors );
			$combined_selectors = UAGB_Helper::get_typography_css( $attr, 'label', ' .wpcf7 form .wpcf7-list-item-label', $combined_selectors );
			$combined_selectors = UAGB_Helper::get_typography_css( $attr, 'label', ' .wpcf7 form label', $combined_selectors );
			$combined_selectors = UAGB_Helper::get_typography_css( $attr, 'input', ' .wpcf7 select', $combined_selectors );
			$combined_selectors = UAGB_Helper::get_typography_css( $attr, 'input', ' .wpcf7 textarea', $combined_selectors );
			$combined_selectors = UAGB_Helper::get_typography_css( $attr, 'input', ' .wpcf7 input:not([type=submit])', $combined_selectors );

			return UAGB_Helper::generate_all_css( $combined_selectors, '.uagb-block-' . $id );
		}

		/**
		 * Get Gravity Form Styler CSS
		 *
		 * @param array  $attr The block attributes.
		 * @param string $id The selector ID.
		 * @since 1.12.0
		 */
		public static function get_gf_styler_css( $attr, $id ) {
			$defaults = UAGB_Helper::$block_list['uagb/gf-styler']['attributes'];

			$attr = array_merge( $defaults, (array) $attr );

			$attr['msgVrPadding']   = ( '' === $attr['msgVrPadding'] ) ? '0' : $attr['msgVrPadding'];
			$attr['msgHrPadding']   = ( '' === $attr['msgHrPadding'] ) ? '0' : $attr['msgHrPadding'];
			$attr['textAreaHeight'] = ( 'auto' === $attr['msgHrPadding'] ) ? $attr['textAreaHeight'] : $attr['textAreaHeight'] . 'px';

			$selectors = array(
				' .gform_wrapper form'                   => array(
					'text-align' => $attr['align'],
				),
				' .wp-block-uagb-gf-styler form:not(input)' => array(
					'color' => $attr['fieldLabelColor'],
				),
				' .gform_heading'                        => array(
					'text-align' => $attr['titleDescAlignment'],
				),
				' input:not([type=submit])'              => array(
					'background-color' => $attr['fieldBgColor'],
					'color'            => $attr['fieldInputColor'],
					'border-style'     => $attr['fieldBorderStyle'],
					'border-color'     => $attr['fieldBorderColor'],
					'border-width'     => UAGB_Helper::get_css_value( $attr['fieldBorderWidth'], 'px' ),
					'border-radius'    => UAGB_Helper::get_css_value( $attr['fieldBorderRadius'], $attr['fieldBorderRadiusType'] ),
					'padding-left'     => UAGB_Helper::get_css_value( $attr['fieldHrPadding'], 'px' ),
					'padding-right'    => UAGB_Helper::get_css_value( $attr['fieldHrPadding'], 'px' ),
					'padding-top'      => UAGB_Helper::get_css_value( $attr['fieldVrPadding'], 'px' ),
					'padding-bottom'   => UAGB_Helper::get_css_value( $attr['fieldVrPadding'], 'px' ),
					'margin-top'       => UAGB_Helper::get_css_value( $attr['fieldLabelSpacing'], 'px' ),
					'margin-bottom'    => UAGB_Helper::get_css_value( $attr['fieldSpacing'], 'px' ),
					'text-align'       => $attr['align'],
				),
				' input[type=button]'                    => array(
					'color'            => $attr['buttonTextColor'],
					'background-color' => $attr['buttonBgColor'],
					'border-color'     => $attr['buttonBorderColor'],
					'border-style'     => $attr['buttonBorderStyle'],
					'border-width'     => UAGB_Helper::get_css_value( $attr['buttonBorderWidth'], 'px' ),
					'border-radius'    => UAGB_Helper::get_css_value( $attr['buttonBorderRadius'], $attr['buttonBorderRadiusType'] ),
					'padding-left'     => UAGB_Helper::get_css_value( $attr['buttonHrPadding'], 'px' ),
					'padding-right'    => UAGB_Helper::get_css_value( $attr['buttonHrPadding'], 'px' ),
					'padding-top'      => UAGB_Helper::get_css_value( $attr['buttonVrPadding'], 'px' ),
					'padding-bottom'   => UAGB_Helper::get_css_value( $attr['buttonVrPadding'], 'px' ),
				),
				' input[type=button]:hover'              => array(
					'color'            => $attr['buttonTextHoverColor'],
					'background-color' => $attr['buttonBgHoverColor'],
					'border-color'     => $attr['buttonBorderHoverColor'],
				),
				' select'                                => array(
					'background-color' => $attr['fieldBgColor'],
					'border-style'     => $attr['fieldBorderStyle'],
					'border-color'     => $attr['fieldBorderColor'],
					'border-width'     => UAGB_Helper::get_css_value( $attr['fieldBorderWidth'], 'px' ),
					'border-radius'    => UAGB_Helper::get_css_value( $attr['fieldBorderRadius'], $attr['fieldBorderRadiusType'] ),
					'margin-top'       => UAGB_Helper::get_css_value( $attr['fieldLabelSpacing'], 'px' ),
					'margin-bottom'    => UAGB_Helper::get_css_value( $attr['fieldSpacing'], 'px' ),
					'color'            => $attr['fieldInputColor'],
					'text-align'       => $attr['align'],
					'padding-left'     => UAGB_Helper::get_css_value( $attr['fieldHrPadding'], 'px' ),
					'padding-right'    => UAGB_Helper::get_css_value( $attr['fieldHrPadding'], 'px' ),
					'padding-top'      => UAGB_Helper::get_css_value( $attr['fieldVrPadding'], 'px' ),
					'padding-bottom'   => UAGB_Helper::get_css_value( $attr['fieldVrPadding'], 'px' ),
				),
				' .chosen-container-single span'         => array(
					'background-color' => $attr['fieldBgColor'],
					'border-style'     => $attr['fieldBorderStyle'],
					'border-color'     => $attr['fieldBorderColor'],
					'border-width'     => UAGB_Helper::get_css_value( $attr['fieldBorderWidth'], 'px' ),
					'border-radius'    => UAGB_Helper::get_css_value( $attr['fieldBorderRadius'], $attr['fieldBorderRadiusType'] ),
					'margin-top'       => UAGB_Helper::get_css_value( $attr['fieldLabelSpacing'], 'px' ),
					'margin-bottom'    => UAGB_Helper::get_css_value( $attr['fieldSpacing'], 'px' ),
					'color'            => $attr['fieldInputColor'],
					'text-align'       => $attr['align'],
					'padding-left'     => UAGB_Helper::get_css_value( $attr['fieldHrPadding'], 'px' ),
					'padding-right'    => UAGB_Helper::get_css_value( $attr['fieldHrPadding'], 'px' ),
					'padding-top'      => UAGB_Helper::get_css_value( $attr['fieldVrPadding'], 'px' ),
					'padding-bottom'   => UAGB_Helper::get_css_value( $attr['fieldVrPadding'], 'px' ),
				),
				' .chosen-container-single.chosen-container-active .chosen-single span' => array(
					'margin-bottom' => 0,
				),
				' select.wpgf-form-control.wpgf-select:not([multiple="multiple"])' => array(
					'padding-left'   => UAGB_Helper::get_css_value( $attr['fieldHrPadding'], 'px' ),
					'padding-right'  => UAGB_Helper::get_css_value( $attr['fieldHrPadding'], 'px' ),
					'padding-top'    => UAGB_Helper::get_css_value( $attr['fieldVrPadding'], 'px' ),
					'padding-bottom' => UAGB_Helper::get_css_value( $attr['fieldVrPadding'], 'px' ),
				),
				' select.wpgf-select[multiple="multiple"] option' => array(
					'padding-left'   => UAGB_Helper::get_css_value( $attr['fieldHrPadding'], 'px' ),
					'padding-right'  => UAGB_Helper::get_css_value( $attr['fieldHrPadding'], 'px' ),
					'padding-top'    => UAGB_Helper::get_css_value( $attr['fieldVrPadding'], 'px' ),
					'padding-bottom' => UAGB_Helper::get_css_value( $attr['fieldVrPadding'], 'px' ),
				),
				' textarea'                              => array(
					'background-color' => $attr['fieldBgColor'],
					'color'            => $attr['fieldInputColor'],
					'border-color'     => $attr['fieldBorderColor'],
					'border-width'     => UAGB_Helper::get_css_value( $attr['fieldBorderWidth'], 'px' ),
					'border-radius'    => UAGB_Helper::get_css_value( $attr['fieldBorderRadius'], $attr['fieldBorderRadiusType'] ),
					'border-style'     => $attr['fieldBorderStyle'],
					'padding-left'     => UAGB_Helper::get_css_value( $attr['fieldHrPadding'], 'px' ),
					'padding-right'    => UAGB_Helper::get_css_value( $attr['fieldHrPadding'], 'px' ),
					'padding-top'      => UAGB_Helper::get_css_value( $attr['fieldVrPadding'], 'px' ),
					'padding-bottom'   => UAGB_Helper::get_css_value( $attr['fieldVrPadding'], 'px' ),
					'margin-top'       => UAGB_Helper::get_css_value( $attr['fieldLabelSpacing'], 'px' ),
					'margin-bottom'    => UAGB_Helper::get_css_value( $attr['fieldSpacing'], 'px' ),
					'text-align'       => $attr['align'],
					'height'           => $attr['textAreaHeight'],
				),
				' textarea::placeholder'                 => array(
					'color'      => $attr['fieldInputColor'],
					'text-align' => $attr['align'],
				),
				' input::placeholder'                    => array(
					'color'      => $attr['fieldInputColor'],
					'text-align' => $attr['align'],
				),
				' form label.gfield_label'               => array(
					'color'       => $attr['fieldLabelColor'],
					'font-size'   => UAGB_Helper::get_css_value( $attr['labelFontSize'], $attr['labelFontSizeType'] ),
					'font-family' => $attr['labelFontFamily'],
					'font-weight' => $attr['labelFontWeight'],
					'line-height' => UAGB_Helper::get_css_value( $attr['labelLineHeight'], $attr['labelLineHeightType'] ),
				),
				' form .gfield_radio label.gfield_label' => array(
					'color'       => $attr['fieldLabelColor'],
					'font-size'   => UAGB_Helper::get_css_value( $attr['labelFontSize'], $attr['labelFontSizeType'] ),
					'font-family' => $attr['labelFontFamily'],
					'font-weight' => $attr['labelFontWeight'],
					'line-height' => UAGB_Helper::get_css_value( $attr['labelLineHeight'], $attr['labelLineHeightType'] ),
				),
				' form .gfield_checkbox label.gfield_label' => array(
					'color'       => $attr['fieldLabelColor'],
					'font-size'   => UAGB_Helper::get_css_value( $attr['labelFontSize'], $attr['labelFontSizeType'] ),
					'font-family' => $attr['labelFontFamily'],
					'font-weight' => $attr['labelFontWeight'],
					'line-height' => UAGB_Helper::get_css_value( $attr['labelLineHeight'], $attr['labelLineHeightType'] ),
				),
				' .wpgf .gfield_checkbox input[type="checkbox"] + label, .wpgf .gfield_checkbox input[type="checkbox"] + label' => array(
					'margin-top' => UAGB_Helper::get_css_value( $attr['fieldLabelSpacing'], 'px' ),
				),

				// Focus.
				' form input:not([type=submit]):focus'   => array(
					'border-color' => $attr['fieldBorderFocusColor'],
				),
				' form select:focus'                     => array(
					'border-color' => $attr['fieldBorderFocusColor'],
				),
				' textarea:focus'                        => array(
					'border-color' => $attr['fieldBorderFocusColor'],
				),

				// Submit button.
				' input.gform_button'                    => array(
					'color'            => $attr['buttonTextColor'],
					'background-color' => $attr['buttonBgColor'],
					'border-color'     => $attr['buttonBorderColor'],
					'border-style'     => $attr['buttonBorderStyle'],
					'border-width'     => UAGB_Helper::get_css_value( $attr['buttonBorderWidth'], 'px' ),
					'border-radius'    => UAGB_Helper::get_css_value( $attr['buttonBorderRadius'], $attr['buttonBorderRadiusType'] ),
					'padding-left'     => UAGB_Helper::get_css_value( $attr['buttonHrPadding'], 'px' ),
					'padding-right'    => UAGB_Helper::get_css_value( $attr['buttonHrPadding'], 'px' ),
					'padding-top'      => UAGB_Helper::get_css_value( $attr['buttonVrPadding'], 'px' ),
					'padding-bottom'   => UAGB_Helper::get_css_value( $attr['buttonVrPadding'], 'px' ),
				),

				' .gform_footer.top_label input[type="submit"]' => array(
					'font-size' => UAGB_Helper::get_css_value( $attr['buttonFontSize'], $attr['buttonFontSizeType'] ),
				),

				' input.gform_button:hover'              => array(
					'color'            => $attr['buttonTextHoverColor'],
					'background-color' => $attr['buttonBgHoverColor'],
					'border-color'     => $attr['buttonBorderHoverColor'],
				),

				// Check box Radio.
				' .gfield_checkbox input[type="checkbox"]:checked + label:before' => array(
					'background-color' => $attr['fieldBgColor'],
					'color'            => $attr['fieldInputColor'],
					'font-size'        => 'calc( ' . $attr['fieldVrPadding'] . 'px / 1.2 )',
					'border-color'     => $attr['fieldBorderFocusColor'],
				),
				' .gfield_checkbox input[type="checkbox"] + label:before' => array(
					'background-color' => $attr['fieldBgColor'],
					'color'            => $attr['fieldInputColor'],
					'height'           => UAGB_Helper::get_css_value( $attr['fieldVrPadding'], 'px' ),
					'width'            => UAGB_Helper::get_css_value( $attr['fieldVrPadding'], 'px' ),
					'border-style'     => $attr['fieldBorderStyle'],
					'border-color'     => $attr['fieldBorderColor'],
					'border-width'     => UAGB_Helper::get_css_value( $attr['fieldBorderWidth'], 'px' ),
					'border-radius'    => UAGB_Helper::get_css_value( $attr['fieldBorderRadius'], $attr['fieldBorderRadiusType'] ),
					'font-size'        => 'calc( ' . $attr['fieldVrPadding'] . 'px / 1.2 )',
				),
				' input[type="checkbox"]:checked + label:before' => array(
					'background-color' => $attr['fieldBgColor'],
					'color'            => $attr['fieldInputColor'],
					'font-size'        => 'calc( ' . $attr['fieldVrPadding'] . 'px / 1.2 )',
					'border-color'     => $attr['fieldBorderFocusColor'],
				),
				' input[type="checkbox"] + label:before' => array(
					'background-color' => $attr['fieldBgColor'],
					'color'            => $attr['fieldInputColor'],
					'height'           => UAGB_Helper::get_css_value( $attr['fieldVrPadding'], 'px' ),
					'width'            => UAGB_Helper::get_css_value( $attr['fieldVrPadding'], 'px' ),
					'font-size'        => 'calc( ' . $attr['fieldVrPadding'] . 'px / 1.2 )',
					'border-color'     => $attr['fieldBorderColor'],
					'border-style'     => $attr['fieldBorderStyle'],
					'border-width'     => UAGB_Helper::get_css_value( $attr['fieldBorderWidth'], 'px' ),
					'border-radius'    => UAGB_Helper::get_css_value( $attr['fieldBorderRadius'], $attr['fieldBorderRadiusType'] ),
				),
				' .gfield_radio input[type="radio"] + label:before' => array(
					'background-color' => $attr['fieldBgColor'],
					'color'            => $attr['fieldInputColor'],
					'height'           => UAGB_Helper::get_css_value( $attr['fieldVrPadding'], 'px' ),
					'width'            => UAGB_Helper::get_css_value( $attr['fieldVrPadding'], 'px' ),
					'border-style'     => $attr['fieldBorderStyle'],
					'border-color'     => $attr['fieldBorderColor'],
					'border-width'     => UAGB_Helper::get_css_value( $attr['fieldBorderWidth'], 'px' ),
				),
				' .gfield_radio input[type="radio"]:checked + label:before' => array(
					'border-color' => $attr['fieldBorderFocusColor'],
				),

				// Underline border.
				' .uagb-gf-styler__field-style-underline input:not([type=submit])' => array(
					'border-style'        => 'none',
					'border-bottom-color' => $attr['fieldBorderColor'],
					'border-bottom-style' => 'solid',
					'border-bottom-width' => UAGB_Helper::get_css_value( $attr['fieldBorderWidth'], 'px' ),
					'border-radius'       => UAGB_Helper::get_css_value( $attr['fieldBorderRadius'], $attr['fieldBorderRadiusType'] ),
				),
				' .uagb-gf-styler__field-style-underline textarea' => array(
					'border-style'        => 'none',
					'border-bottom-color' => $attr['fieldBorderColor'],
					'border-bottom-style' => 'solid',
					'border-bottom-width' => UAGB_Helper::get_css_value( $attr['fieldBorderWidth'], 'px' ),
					'border-radius'       => UAGB_Helper::get_css_value( $attr['fieldBorderRadius'], $attr['fieldBorderRadiusType'] ),
				),
				' .uagb-gf-styler__field-style-underline select' => array(
					'border-style'        => 'none',
					'border-bottom-color' => $attr['fieldBorderColor'],
					'border-bottom-style' => 'solid',
					'border-bottom-width' => UAGB_Helper::get_css_value( $attr['fieldBorderWidth'], 'px' ),
					'border-radius'       => UAGB_Helper::get_css_value( $attr['fieldBorderRadius'], $attr['fieldBorderRadiusType'] ),
				),
				' .uagb-gf-styler__field-style-underline textarea' => array(
					'border-style'        => 'none',
					'border-bottom-color' => $attr['fieldBorderColor'],
					'border-bottom-style' => 'solid',
					'border-bottom-width' => UAGB_Helper::get_css_value( $attr['fieldBorderWidth'], 'px' ),
					'border-radius'       => UAGB_Helper::get_css_value( $attr['fieldBorderRadius'], $attr['fieldBorderRadiusType'] ),
				),
				' .uagb-gf-styler__check-style-enabled .gfield_checkbox input[type="checkbox"] + label:before' => array(
					'border-style' => 'solid',
				),
				' .uagb-gf-styler__check-style-enabled input[type="radio"] + label:before' => array(
					'border-style' => 'solid',
				),
				' .uagb-gf-styler__field-style-box .gfield_checkbox input[type="checkbox"]:checked + label:before' => array(
					'border-style'  => 'solid',
					'border-width'  => UAGB_Helper::get_css_value( $attr['fieldBorderWidth'], 'px' ),
					'border-radius' => UAGB_Helper::get_css_value( $attr['fieldBorderRadius'], $attr['fieldBorderRadiusType'] ),
					'font-size'     => 'calc( ' . $attr['radioCheckSize'] . 'px / 1.2 )',
				),
				' .uagb-gf-styler__field-style-box input[type="checkbox"]:checked + label:before' => array(
					'border-style'  => 'solid',
					'border-width'  => UAGB_Helper::get_css_value( $attr['fieldBorderWidth'], 'px' ),
					'border-radius' => UAGB_Helper::get_css_value( $attr['fieldBorderRadius'], $attr['fieldBorderRadiusType'] ),
					'font-size'     => 'calc( ' . $attr['radioCheckSize'] . 'px / 1.2 )',
				),
				' .gfield_radio input[type="radio"]:checked + label:before' => array(
					'background-color' => $attr['fieldInputColor'],
				),

				// Override check box.
				' .uagb-gf-styler__check-style-enabled .gfield_checkbox input[type="checkbox"] + label:before' => array(
					'background-color' => $attr['radioCheckBgColor'],
					'color'            => $attr['radioCheckSelectColor'],
					'height'           => UAGB_Helper::get_css_value( $attr['radioCheckSize'], 'px' ),
					'width'            => UAGB_Helper::get_css_value( $attr['radioCheckSize'], 'px' ),
					'font-size'        => 'calc( ' . $attr['radioCheckSize'] . 'px / 1.2 )',
					'border-color'     => $attr['radioCheckBorderColor'],
					'border-style'     => 'solid',
					'border-width'     => UAGB_Helper::get_css_value( $attr['radioCheckBorderWidth'], 'px' ),
					'border-radius'    => UAGB_Helper::get_css_value( $attr['radioCheckBorderRadius'], $attr['radioCheckBorderRadiusType'] ),
				),
				' .uagb-gf-styler__check-style-enabled .gfield_checkbox input[type="checkbox"]:checked + label:before' => array(
					'border-color' => $attr['fieldBorderFocusColor'],
				),
				' .uagb-gf-styler__check-style-enabled input[type="checkbox"] + label:before' => array(
					'background-color' => $attr['radioCheckBgColor'],
					'color'            => $attr['radioCheckSelectColor'],
					'height'           => UAGB_Helper::get_css_value( $attr['radioCheckSize'], 'px' ),
					'width'            => UAGB_Helper::get_css_value( $attr['radioCheckSize'], 'px' ),
					'font-size'        => 'calc( ' . $attr['radioCheckSize'] . 'px / 1.2 )',
					'border-color'     => $attr['radioCheckBorderColor'],
					'border-width'     => UAGB_Helper::get_css_value( $attr['radioCheckBorderWidth'], 'px' ),
					'border-radius'    => UAGB_Helper::get_css_value( $attr['radioCheckBorderRadius'], $attr['radioCheckBorderRadiusType'] ),
				),
				' .uagb-gf-styler__check-style-enabled input[type="checkbox"]:checked + label:before' => array(
					'border-color' => $attr['fieldBorderFocusColor'],
				),

				' .uagb-gf-styler__check-style-enabled input[type="radio"] + label:before' => array(
					'background-color' => $attr['radioCheckBgColor'],
					'color'            => $attr['radioCheckSelectColor'],
					'height'           => UAGB_Helper::get_css_value( $attr['radioCheckSize'], 'px' ),
					'width'            => UAGB_Helper::get_css_value( $attr['radioCheckSize'], 'px' ),
					'font-size'        => 'calc( ' . $attr['radioCheckSize'] . 'px / 1.2 )',
					'border-color'     => $attr['radioCheckBorderColor'],
					'border-width'     => UAGB_Helper::get_css_value( $attr['radioCheckBorderWidth'], 'px' ),
				),
				' .uagb-gf-styler__check-style-enabled .gfield_radio input[type="radio"]:checked + label:before' => array(
					'background-color' => $attr['radioCheckSelectColor'],
				),
				' .uagb-gf-styler__check-style-enabled form .gfield_radio label' => array(
					'color' => $attr['radioCheckLableColor'],
				),
				' .uagb-gf-styler__check-style-enabled form .gfield_checkbox label' => array(
					'color' => $attr['radioCheckLableColor'],
				),
				// Validation Errors.
				' .gform_wrapper .gfield_description.validation_message' => array(
					'color' => $attr['validationMsgColor'],
				),
				' .uagb-gf-styler__error-yes .gform_wrapper .gfield.gfield_error' => array(
					'background-color' => $attr['validationMsgBgColor'],
				),

				' .uagb-gf-styler__error-yes .gform_wrapper li.gfield_error input:not([type="submit"]):not([type="button"]):not([type="image"])' => array(
					'border-color' => $attr['highlightBorderColor'],
				),

				' .uagb-gf-styler__error-yes .gform_wrapper .gfield_error .ginput_container select' => array(
					'border-color' => $attr['highlightBorderColor'],
				),

				' .uagb-gf-styler__error-yes .gform_wrapper .gfield_error .ginput_container .chosen-single' => array(
					'border-color' => $attr['highlightBorderColor'],
				),

				' .uagb-gf-styler__error-yes .gform_wrapper .gfield_error .ginput_container textarea' => array(
					'border-color' => $attr['highlightBorderColor'],
				),

				' .uagb-gf-styler__error-yes .gform_wrapper li.gfield.gfield_error' => array(
					'border-color' => $attr['highlightBorderColor'],
				),

				' .uagb-gf-styler__error-yes .gform_wrapper li.gfield.gfield_error.gfield_contains_required.gfield_creditcard_warning' => array(
					'border-color' => $attr['highlightBorderColor'],
				),

				' .uagb-gf-styler__error-yes li.gfield_error .gfield_checkbox input[type="checkbox"] + label:before' => array(
					'border-color' => $attr['highlightBorderColor'],
				),

				' .uagb-gf-styler__error-yes li.gfield_error .ginput_container_consent input[type="checkbox"] + label:before' => array(
					'border-color' => $attr['highlightBorderColor'],
				),

				' .uagb-gf-styler__error-yes li.gfield_error .gfield_radio input[type="radio"] + label:before' => array(
					'border-color' => $attr['highlightBorderColor'],
				),

				' .uagb-gf-styler__error-yes .gform_wrapper li.gfield_error input[type="text"]' => array(
					'border' => $attr['fieldBorderWidth'] . 'px ' . $attr['fieldBorderStyle'] . ' ' . $attr['fieldBorderColor'] . '!important',
				),

				' .uael-gf-style-underline.uagb-gf-styler__error-yes .gform_wrapper li.gfield_error input[type="text"]' => array(
					'border-width' => $attr['fieldBorderWidth'] . 'px !important',
					'border-style' => 'solid !important',
					'border-color' => $attr['fieldBorderColor'] . '!important',
				),

				' .gform_wrapper div.validation_error'   => array(
					'color'            => $attr['errorMsgColor'],
					'background-color' => $attr['errorMsgBgColor'],
					'border-color'     => $attr['errorMsgBorderColor'],
					'border-style'     => 'solid',
					'border-width'     => UAGB_Helper::get_css_value( $attr['msgBorderSize'], 'px' ),
					'border-radius'    => UAGB_Helper::get_css_value( $attr['msgBorderRadius'], $attr['msgBorderRadiusType'] ),
					'padding'          => $attr['msgVrPadding'] . 'px ' . $attr['msgHrPadding'] . 'px',
				),

				' .gform_confirmation_message'           => array(
					'color' => $attr['successMsgColor'],
				),
			);

			$t_selectors = array(
				' form.wpgf-form:not(input)' => array(
					'color' => $attr['fieldLabelColor'],
				),
			);

			$m_selectors = array();

			$combined_selectors = array(
				'desktop' => $selectors,
				'tablet'  => $t_selectors,
				'mobile'  => $m_selectors,
			);

			$combined_selectors = UAGB_Helper::get_typography_css( $attr, 'validationMsg', ' .gform_wrapper .validation_message', $combined_selectors );
			$combined_selectors = UAGB_Helper::get_typography_css( $attr, 'validationMsg', ' span.wpgf-not-valid-tip', $combined_selectors );
			$combined_selectors = UAGB_Helper::get_typography_css( $attr, 'successMsg', ' .gform_confirmation_message', $combined_selectors );
			$combined_selectors = UAGB_Helper::get_typography_css( $attr, 'msg', ' .gform_wrapper div.validation_error', $combined_selectors );
			$combined_selectors = UAGB_Helper::get_typography_css( $attr, 'msg', ' .wpgf-response-output', $combined_selectors );
			$combined_selectors = UAGB_Helper::get_typography_css( $attr, 'button', ' input.gform_button, input.gform_previous_button, input.gform_next_button', $combined_selectors );
			$combined_selectors = UAGB_Helper::get_typography_css( $attr, 'label', ' form .gfield_checkbox label.gfield_label', $combined_selectors );
			$combined_selectors = UAGB_Helper::get_typography_css( $attr, 'label', ' form .gfield_radio label.gfield_label', $combined_selectors );
			$combined_selectors = UAGB_Helper::get_typography_css( $attr, 'label', ' form label.gfield_label', $combined_selectors );
			$combined_selectors = UAGB_Helper::get_typography_css( $attr, 'input', ' textarea', $combined_selectors );
			$combined_selectors = UAGB_Helper::get_typography_css( $attr, 'input', ' select', $combined_selectors );
			$combined_selectors = UAGB_Helper::get_typography_css( $attr, 'input', ' input:not([type=submit])', $combined_selectors );
			$combined_selectors = UAGB_Helper::get_typography_css( $attr, 'radioCheck', ' .uagb-gf-styler__check-style-enabled form .gfield_checkbox label', $combined_selectors );
			$combined_selectors = UAGB_Helper::get_typography_css( $attr, 'input', ' .chosen-container-single span', $combined_selectors );
			$combined_selectors = UAGB_Helper::get_typography_css( $attr, 'radioCheck', ' .uagb-gf-styler__check-style-enabled form .gfield_radio label', $combined_selectors );

			return UAGB_Helper::generate_all_css( $combined_selectors, '.uagb-block-' . $id );
		}

		/**
		 * Get Marketing Button Block CSS
		 *
		 * @since 1.11.0
		 * @param array  $attr The block attributes.
		 * @param string $id The selector ID.
		 * @return array The Widget List.
		 */
		public static function get_marketing_btn_css( $attr, $id ) {

			$defaults = UAGB_Helper::$block_list['uagb/marketing-button']['attributes'];

			$attr = array_merge( $defaults, (array) $attr );

			$m_selectors = array();
			$t_selectors = array();

			$icon_color       = ( '' === $attr['iconColor'] ) ? $attr['titleColor'] : $attr['iconColor'];
			$icon_hover_color = ( '' === $attr['iconHoverColor'] ) ? $attr['titleHoverColor'] : $attr['iconHoverColor'];

			$selectors = array(
				' .uagb-marketing-btn__title-wrap'    => array(
					'margin-bottom' => UAGB_Helper::get_css_value( $attr['titleSpace'], 'px' ),
				),
				' .uagb-marketing-btn__icon-wrap'     => array(
					'width'  => UAGB_Helper::get_css_value( $attr['iconFontSize'], $attr['iconFontSizeType'] ),
					'height' => UAGB_Helper::get_css_value( $attr['iconFontSize'], $attr['iconFontSizeType'] ),
				),
				' .uagb-marketing-btn__icon-wrap svg' => array(
					'fill' => $icon_color,
				),
				' p.uagb-marketing-btn__prefix'       => array(
					'color' => $attr['prefixColor'],
				),
				' .uagb-marketing-btn__link:hover p.uagb-marketing-btn__prefix' => array(
					'color' => $attr['prefixHoverColor'],
				),
				' .uagb-marketing-btn__link:hover .uagb-marketing-btn__icon-wrap svg' => array(
					'fill' => $icon_hover_color,
				),
				' .uagb-marketing-btn__link'          => array(
					'padding-left'   => UAGB_Helper::get_css_value( $attr['hPadding'], $attr['paddingType'] ),
					'padding-right'  => UAGB_Helper::get_css_value( $attr['hPadding'], $attr['paddingType'] ),
					'padding-top'    => UAGB_Helper::get_css_value( $attr['vPadding'], $attr['paddingType'] ),
					'padding-bottom' => UAGB_Helper::get_css_value( $attr['vPadding'], $attr['paddingType'] ),
					'border-style'   => $attr['borderStyle'],
					'border-width'   => UAGB_Helper::get_css_value( $attr['borderWidth'], 'px' ),
					'border-color'   => $attr['borderColor'],
					'border-radius'  => UAGB_Helper::get_css_value( $attr['borderRadius'], 'px' ),
				),
				' .uagb-marketing-btn__link:hover'    => array(
					'border-color' => $attr['borderHoverColor'],
				),
			);

			$selectors[ ' ' . $attr['titleTag'] . '.uagb-marketing-btn__title' ] = array(
				'color' => $attr['titleColor'],
			);

			$selectors[ ' .uagb-marketing-btn__link:hover ' . $attr['titleTag'] . '.uagb-marketing-btn__title' ] = array(
				'color' => $attr['titleHoverColor'],
			);

			if ( 'transparent' === $attr['backgroundType'] ) {

				$selectors[' .uagb-marketing-btn__link']['background'] = 'transparent';

			} elseif ( 'color' === $attr['backgroundType'] ) {

				$selectors[' .uagb-marketing-btn__link']['background'] = UAGB_Helper::hex2rgba( $attr['backgroundColor'], $attr['backgroundOpacity'] );

				// Hover Background.
				$selectors[' .uagb-marketing-btn__link:hover']['background'] = UAGB_Helper::hex2rgba( $attr['backgroundHoverColor'], $attr['backgroundHoverOpacity'] );

			} elseif ( 'gradient' === $attr['backgroundType'] ) {

				$selectors[' .uagb-marketing-btn__link']['background-color'] = 'transparent';

				if ( 'linear' === $attr['gradientType'] ) {

					$selectors[' .uagb-marketing-btn__link']['background-image'] = 'linear-gradient(' . $attr['gradientAngle'] . 'deg, ' . UAGB_Helper::hex2rgba( $attr['gradientColor1'], $attr['backgroundOpacity'] ) . ' ' . $attr['gradientLocation1'] . '%, ' . UAGB_Helper::hex2rgba( $attr['gradientColor2'], $attr['backgroundOpacity'] ) . ' ' . $attr['gradientLocation2'] . '%)';
				} else {

					$selectors[' .uagb-marketing-btn__link']['background-image'] = 'radial-gradient( at center center, ' . UAGB_Helper::hex2rgba( $attr['gradientColor1'], $attr['backgroundOpacity'] ) . ' ' . $attr['gradientLocation1'] . '%, ' . UAGB_Helper::hex2rgba( $attr['gradientColor2'], $attr['backgroundOpacity'] ) . ' ' . $attr['gradientLocation2'] . '%)';
				}
			}

			$margin_type = ( 'after' === $attr['iconPosition'] ) ? 'margin-left' : 'margin-right';

			$selectors[' .uagb-marketing-btn__icon-wrap'][ $margin_type ] = UAGB_Helper::get_css_value( $attr['iconSpace'], 'px' );

			$m_selectors = array(
				' .uagb-marketing-btn__icon-wrap' => array(
					'width'  => UAGB_Helper::get_css_value( $attr['iconFontSizeMobile'], $attr['iconFontSizeType'] ),
					'height' => UAGB_Helper::get_css_value( $attr['iconFontSizeMobile'], $attr['iconFontSizeType'] ),
				),
				' .uagb-marketing-btn__link'      => array(
					'padding-left'   => UAGB_Helper::get_css_value( $attr['hPaddingMobile'], $attr['paddingType'] ),
					'padding-right'  => UAGB_Helper::get_css_value( $attr['hPaddingMobile'], $attr['paddingType'] ),
					'padding-top'    => UAGB_Helper::get_css_value( $attr['vPaddingMobile'], $attr['paddingType'] ),
					'padding-bottom' => UAGB_Helper::get_css_value( $attr['vPaddingMobile'], $attr['paddingType'] ),
				),

			);

			$t_selectors = array(
				' .uagb-marketing-btn__icon-wrap' => array(
					'width'  => UAGB_Helper::get_css_value( $attr['iconFontSizeTablet'], $attr['iconFontSizeType'] ),
					'height' => UAGB_Helper::get_css_value( $attr['iconFontSizeTablet'], $attr['iconFontSizeType'] ),
				),
				' .uagb-marketing-btn__link'      => array(
					'padding-left'   => UAGB_Helper::get_css_value( $attr['hPaddingTablet'], $attr['paddingType'] ),
					'padding-right'  => UAGB_Helper::get_css_value( $attr['hPaddingTablet'], $attr['paddingType'] ),
					'padding-top'    => UAGB_Helper::get_css_value( $attr['vPaddingTablet'], $attr['paddingType'] ),
					'padding-bottom' => UAGB_Helper::get_css_value( $attr['vPaddingTablet'], $attr['paddingType'] ),
				),

			);

			$combined_selectors = array(
				'desktop' => $selectors,
				'tablet'  => $t_selectors,
				'mobile'  => $m_selectors,
			);

			$combined_selectors = UAGB_Helper::get_typography_css( $attr, 'title', ' .uagb-marketing-btn__title', $combined_selectors );
			$combined_selectors = UAGB_Helper::get_typography_css( $attr, 'prefix', ' .uagb-marketing-btn__prefix', $combined_selectors );

			$base_selector = ( $attr['classMigrate'] ) ? '.uagb-block-' : '#uagb-marketing-btn-';

			return UAGB_Helper::generate_all_css( $combined_selectors, $base_selector . $id );
		}

		/**
		 * Get Table of Contents Block CSS
		 *
		 * @since 1.13.0
		 * @param array  $attr The block attributes.
		 * @param string $id The selector ID.
		 * @return array The Widget List.
		 */
		public static function get_table_of_contents_css( $attr, $id ) {

			$defaults = UAGB_Helper::$block_list['uagb/table-of-contents']['attributes'];

			$attr        = array_merge( $defaults, (array) $attr );
			$m_selectors = array();
			$t_selectors = array();

			$alignment = ( 'left' === $attr['headingAlignment'] ) ? 'flex-start' : ( ( 'right' === $attr['headingAlignment'] ) ? 'flex-end' : 'center' );

			$selectors = array(
				' .uagb-toc__list-wrap li a:hover' => array(
					'color' => $attr['linkHoverColor'],
				),
				' .uagb-toc__list-wrap li a'       => array(
					'color' => $attr['linkColor'],
				),
				' .uagb-toc__title-wrap'           => array(
					'justify-content' => $alignment,
					'margin-bottom'   => UAGB_Helper::get_css_value( $attr['headingBottom'], 'px' ),
				),
				' .uagb-toc__title'                => array(
					'color' => $attr['headingColor'],
				),
				' .uagb-toc__wrap'                 => array(
					'border-style'   => $attr['borderStyle'],
					'border-width'   => UAGB_Helper::get_css_value( $attr['borderWidth'], 'px' ),
					'border-color'   => $attr['borderColor'],
					'border-radius'  => UAGB_Helper::get_css_value( $attr['borderRadius'], 'px' ),
					'padding-left'   => UAGB_Helper::get_css_value( $attr['hPaddingDesktop'], $attr['paddingTypeDesktop'] ),
					'padding-right'  => UAGB_Helper::get_css_value( $attr['hPaddingDesktop'], $attr['paddingTypeDesktop'] ),
					'padding-top'    => UAGB_Helper::get_css_value( $attr['vPaddingDesktop'], $attr['paddingTypeDesktop'] ),
					'padding-bottom' => UAGB_Helper::get_css_value( $attr['vPaddingDesktop'], $attr['paddingTypeDesktop'] ),
					'background'     => $attr['backgroundColor'],
				),
				' .uagb-toc__list-wrap'            => array(
					'column-count' => $attr['tColumnsDesktop'],
					'overflow'     => 'hidden',
				),
				' .uagb-toc__list-wrap > ul.uagb-toc__list > li:first-child' => array(
					'padding-top' => 0,
				),
				' .uagb-toc__list-wrap > ol.uagb-toc__list li' => array(
					'color' => $attr['bulletColor'],
				),
				' .uagb-toc__list-wrap > li'       => array(
					'color' => $attr['bulletColor'],
				),
				' .uagb-toc__list-wrap ol.uagb-toc__list:first-child' => array(
					'margin-left'   => UAGB_Helper::get_css_value( $attr['hMarginDesktop'], $attr['marginTypeDesktop'] ),
					'margin-right'  => UAGB_Helper::get_css_value( $attr['hMarginDesktop'], $attr['marginTypeDesktop'] ),
					'margin-top'    => UAGB_Helper::get_css_value( $attr['vMarginDesktop'], $attr['marginTypeDesktop'] ),
					'margin-bottom' => UAGB_Helper::get_css_value( $attr['vMarginDesktop'], $attr['marginTypeDesktop'] ),
				),
				' .uagb-toc__list-wrap ul.uagb-toc__list:last-child > li:last-child' => array(
					'padding-bottom' => 0,
				),
				' .uag-toc__collapsible-wrap svg'  => array(
					'width'  => UAGB_Helper::get_css_value( $attr['iconSize'], 'px' ),
					'height' => UAGB_Helper::get_css_value( $attr['iconSize'], 'px' ),
					'fill'   => $attr['iconColor'],
				),
			);

			if ( '' !== $attr['contentPaddingDesktop'] ) {
				$selectors[' .uagb-toc__list-wrap ol.uagb-toc__list > li']['padding-top']    = 'calc( ' . UAGB_Helper::get_css_value( $attr['contentPaddingDesktop'] . $attr['contentPaddingTypeDesktop'] ) . ' / 2 )';
				$selectors[' .uagb-toc__list-wrap ol.uagb-toc__list > li']['padding-bottom'] = 'calc( ' . UAGB_Helper::get_css_value( $attr['contentPaddingDesktop'] . $attr['contentPaddingTypeDesktop'] ) . ' / 2 )';
				$selectors[' .uagb-toc__list-wrap ul.uagb-toc__list > li']['padding-top']    = 'calc( ' . UAGB_Helper::get_css_value( $attr['contentPaddingDesktop'] . $attr['contentPaddingTypeDesktop'] ) . ' / 2 )';
				$selectors[' .uagb-toc__list-wrap ul.uagb-toc__list > li']['padding-bottom'] = 'calc( ' . UAGB_Helper::get_css_value( $attr['contentPaddingDesktop'] . $attr['contentPaddingTypeDesktop'] ) . ' / 2 )';
			}

			if ( $attr['customWidth'] ) {
				$selectors[' .uagb-toc__wrap']['width'] = UAGB_Helper::get_css_value( $attr['widthDesktop'], $attr['widthTypeDesktop'] );
			}

			if ( $attr['disableBullets'] ) {
				$selectors[' .uagb-toc__list']                 = array(
					'list-style-type' => 'none',
				);
				$selectors[' .uagb-toc__list .uagb-toc__list'] = array(
					'list-style-type' => 'none',
				);
			}

			$m_selectors = array(
				' .uagb-toc__wrap'      => array(
					'width'          => UAGB_Helper::get_css_value( $attr['widthMobile'], $attr['widthTypeMobile'] ),
					'padding-left'   => UAGB_Helper::get_css_value( $attr['hPaddingMobile'], $attr['paddingTypeMobile'] ),
					'padding-right'  => UAGB_Helper::get_css_value( $attr['hPaddingMobile'], $attr['paddingTypeMobile'] ),
					'padding-top'    => UAGB_Helper::get_css_value( $attr['vPaddingMobile'], $attr['paddingTypeMobile'] ),
					'padding-bottom' => UAGB_Helper::get_css_value( $attr['vPaddingMobile'], $attr['paddingTypeMobile'] ),
				),
				' .uagb-toc__list-wrap' => array(
					'column-count' => $attr['tColumnsMobile'],
					'overflow'     => 'hidden',
				),
				' .uagb-toc__list-wrap > ul.uagb-toc__list > li:first-child' => array(
					'padding-top' => 0,
				),
				' .uagb-toc__list-wrap ul.uagb-toc__list:last-child > li:last-child' => array(
					'padding-bottom' => 0,
				),

			);

			$t_selectors = array(
				' .uagb-toc__wrap'      => array(
					'width'          => UAGB_Helper::get_css_value( $attr['widthTablet'], $attr['widthTypeTablet'] ),
					'padding-left'   => UAGB_Helper::get_css_value( $attr['hPaddingTablet'], $attr['paddingTypeTablet'] ),
					'padding-right'  => UAGB_Helper::get_css_value( $attr['hPaddingTablet'], $attr['paddingTypeTablet'] ),
					'padding-top'    => UAGB_Helper::get_css_value( $attr['vPaddingTablet'], $attr['paddingTypeTablet'] ),
					'padding-bottom' => UAGB_Helper::get_css_value( $attr['vPaddingTablet'], $attr['paddingTypeTablet'] ),
				),
				' .uagb-toc__list-wrap' => array(
					'column-count' => $attr['tColumnsTablet'],
					'overflow'     => 'hidden',
				),
				' .uagb-toc__list-wrap > ul.uagb-toc__list > li:first-child' => array(
					'padding-top' => 0,
				),
				' .uagb-toc__list-wrap ul.uagb-toc__list:last-child > li:last-child' => array(
					'padding-bottom' => 0,
				),
			);

			if ( '' !== $attr['contentPaddingTablet'] ) {
				$t_selectors[' .uagb-toc__list-wrap ol.uagb-toc__list > li'] = array(
					'padding-top'    => 'calc( ' . UAGB_Helper::get_css_value( $attr['contentPaddingTablet'] . $attr['contentPaddingTypeTablet'] ) . ' / 2 )',
					'padding-bottom' => 'calc( ' . UAGB_Helper::get_css_value( $attr['contentPaddingTablet'] . $attr['contentPaddingTypeTablet'] ) . ' / 2 )',
				);
				$t_selectors[' .uagb-toc__list-wrap ul.uagb-toc__list > li'] = array(
					'padding-top'    => 'calc( ' . UAGB_Helper::get_css_value( $attr['contentPaddingTablet'] . $attr['contentPaddingTypeTablet'] ) . ' / 2 )',
					'padding-bottom' => 'calc( ' . UAGB_Helper::get_css_value( $attr['contentPaddingTablet'] . $attr['contentPaddingTypeTablet'] ) . ' / 2 )',
				);
			}

			if ( '' !== $attr['contentPaddingMobile'] ) {
				$m_selectors[' .uagb-toc__list-wrap ol.uagb-toc__list > li'] = array(
					'padding-top'    => 'calc( ' . UAGB_Helper::get_css_value( $attr['contentPaddingMobile'] . $attr['contentPaddingTypeMobile'] ) . ' / 2 )',
					'padding-bottom' => 'calc( ' . UAGB_Helper::get_css_value( $attr['contentPaddingMobile'] . $attr['contentPaddingTypeMobile'] ) . ' / 2 )',
				);
				$m_selectors[' .uagb-toc__list-wrap ul.uagb-toc__list > li'] = array(
					'padding-top'    => 'calc( ' . UAGB_Helper::get_css_value( $attr['contentPaddingMobile'] . $attr['contentPaddingTypeMobile'] ) . ' / 2 )',
					'padding-bottom' => 'calc( ' . UAGB_Helper::get_css_value( $attr['contentPaddingMobile'] . $attr['contentPaddingTypeMobile'] ) . ' / 2 )',
				);
			}

			$combined_selectors = array(
				'desktop' => $selectors,
				'tablet'  => $t_selectors,
				'mobile'  => $m_selectors,
			);

			$combined_selectors = UAGB_Helper::get_typography_css( $attr, 'heading', ' .uagb-toc__title', $combined_selectors );
			$combined_selectors = UAGB_Helper::get_typography_css( $attr, '', ' .uagb-toc__list-wrap ol li a', $combined_selectors );

			$base_selector = ( $attr['classMigrate'] ) ? '.uagb-block-' : '#uagb-toc-';

			$desktop = UAGB_Helper::generate_css( $combined_selectors['desktop'], $base_selector . $id );

			$tablet = UAGB_Helper::generate_css( $combined_selectors['tablet'], $base_selector . $id );

			$mobile = UAGB_Helper::generate_css( $combined_selectors['mobile'], $base_selector . $id );

			if ( '' !== $attr['scrollToTopColor'] ) {
				$desktop .= '.uagb-toc__scroll-top { color: ' . $attr['scrollToTopColor'] . '; }';
			}

			if ( '' !== $attr['scrollToTopBgColor'] ) {
				$desktop .= '.uagb-toc__scroll-top.uagb-toc__show-scroll { background: ' . $attr['scrollToTopBgColor'] . '; }';
			}

			$generated_css = array(
				'desktop' => $desktop,
				'tablet'  => $tablet,
				'mobile'  => $mobile,
			);

			return $generated_css;
		}

		/**
		 * Get FAQ CSS.
		 *
		 * @since 1.15.0
		 * @param array  $attr The block attributes.
		 * @param string $id The selector ID.
		 */
		public static function get_faq_css( $attr, $id ) {

			$defaults = UAGB_Helper::$block_list['uagb/faq']['attributes'];

			$attr = array_merge( $defaults, $attr );

			$icon_color        = $attr['iconColor'];
			$icon_active_color = $attr['iconActiveColor'];

			$attr['questionBottomPaddingDesktop'] = ( 10 === $attr['questionBottomPaddingDesktop'] && 10 !== $attr['vquestionPaddingDesktop'] ) ? $attr['vquestionPaddingDesktop'] : $attr['questionBottomPaddingDesktop'];

			$attr['questionLeftPaddingDesktop'] = ( 10 === $attr['questionLeftPaddingDesktop'] && 10 !== $attr['hquestionPaddingDesktop'] ) ? $attr['hquestionPaddingDesktop'] : $attr['questionLeftPaddingDesktop'];

			$attr['questionBottomPaddingTablet'] = ( 10 === $attr['questionBottomPaddingTablet'] && 10 !== $attr['vquestionPaddingTablet'] ) ? $attr['vquestionPaddingTablet'] : $attr['questionBottomPaddingTablet'];

			$attr['questionLeftPaddingTablet'] = ( 10 === $attr['questionLeftPaddingTablet'] && 10 !== $attr['hquestionPaddingTablet'] ) ? $attr['hquestionPaddingTablet'] : $attr['questionLeftPaddingTablet'];

			$attr['questionBottomPaddingMobile'] = ( 10 === $attr['questionBottomPaddingMobile'] && 10 !== $attr['vquestionPaddingMobile'] ) ? $attr['vquestionPaddingMobile'] : $attr['questionBottomPaddingMobile'];

			$attr['questionLeftPaddingMobile'] = ( 10 === $attr['questionLeftPaddingMobile'] && 10 !== $attr['hquestionPaddingMobile'] ) ? $attr['hquestionPaddingMobile'] : $attr['questionLeftPaddingMobile'];

			if ( ! isset( $attr['iconColor'] ) || '' === $attr['iconColor'] ) {

				$icon_color = $attr['questionTextColor'];
			}
			if ( ! isset( $attr['iconActiveColor'] ) || '' === $attr['iconActiveColor'] ) {

				$icon_active_color = $attr['questionTextActiveColor'];
			}

			$icon_size   = UAGB_Helper::get_css_value( $attr['iconSize'], $attr['iconSizeType'] );
			$t_icon_size = UAGB_Helper::get_css_value( $attr['iconSizeTablet'], $attr['iconSizeType'] );
			$m_icon_size = UAGB_Helper::get_css_value( $attr['iconSizeMobile'], $attr['iconSizeType'] );

			$selectors = array(
				' .uagb-icon svg'                      => array(
					'width'     => $icon_size,
					'height'    => $icon_size,
					'font-size' => $icon_size,
					'fill'      => $icon_color,
				),
				' .uagb-icon-active svg'               => array(
					'width'     => $icon_size,
					'height'    => $icon_size,
					'font-size' => $icon_size,
					'fill'      => $icon_active_color,
				),
				' .uagb-faq-child__outer-wrap'         => array(
					'margin-bottom' => UAGB_Helper::get_css_value( $attr['rowsGap'], 'px' ),
				),
				' .uagb-faq-item'                      => array(
					'background-color' => $attr['boxBgColor'],
					'border-style'     => $attr['borderStyle'],
					'border-width'     => UAGB_Helper::get_css_value( $attr['borderWidth'], 'px' ),
					'border-radius'    => UAGB_Helper::get_css_value( $attr['borderRadius'], 'px' ),
					'border-color'     => $attr['borderColor'],
				),
				' .uagb-faq-item .uagb-question'       => array(
					'color' => $attr['questionTextColor'],
				),
				' .uagb-faq-item.uagb-faq-item-active .uagb-question' => array(
					'color' => $attr['questionTextActiveColor'],
				),
				' .uagb-faq-item:hover .uagb-question' => array(
					'color' => $attr['questionTextActiveColor'],
				),
				' .uagb-faq-questions-button'          => array(
					'padding-top'    => UAGB_Helper::get_css_value( $attr['vquestionPaddingDesktop'], $attr['questionPaddingTypeDesktop'] ),
					'padding-bottom' => UAGB_Helper::get_css_value( $attr['questionBottomPaddingDesktop'], $attr['questionPaddingTypeDesktop'] ),
					'padding-right'  => UAGB_Helper::get_css_value( $attr['hquestionPaddingDesktop'], $attr['questionPaddingTypeDesktop'] ),
					'padding-left'   => UAGB_Helper::get_css_value( $attr['questionLeftPaddingDesktop'], $attr['questionPaddingTypeDesktop'] ),
				),
				' .uagb-faq-content span'              => array(
					'margin-top'    => UAGB_Helper::get_css_value( $attr['vanswerPaddingDesktop'], $attr['answerPaddingTypeDesktop'] ),
					'margin-bottom' => UAGB_Helper::get_css_value( $attr['vanswerPaddingDesktop'], $attr['answerPaddingTypeDesktop'] ),
					'margin-right'  => UAGB_Helper::get_css_value( $attr['hanswerPaddingDesktop'], $attr['answerPaddingTypeDesktop'] ),
					'margin-left'   => UAGB_Helper::get_css_value( $attr['hanswerPaddingDesktop'], $attr['answerPaddingTypeDesktop'] ),
				),
				'.uagb-faq-icon-row .uagb-faq-item .uagb-faq-icon-wrap' => array(
					'margin-right' => UAGB_Helper::get_css_value( $attr['gapBtwIconQUestion'], 'px' ),
				),
				'.uagb-faq-icon-row-reverse .uagb-faq-item .uagb-faq-icon-wrap' => array(
					'margin-left' => UAGB_Helper::get_css_value( $attr['gapBtwIconQUestion'], 'px' ),
				),
				' .uagb-faq-item:hover .uagb-icon svg' => array(
					'fill' => $icon_active_color,
				),
				' .uagb-faq-item .uagb-faq-questions-button.uagb-faq-questions' => array(
					'flex-direction' => $attr['iconAlign'],
				),
				' .uagb-faq-item .uagb-faq-content p'  => array(
					'color' => $attr['answerTextColor'],
				),
			);

			$t_selectors = array(
				' .uagb-faq-questions-button' => array(
					'padding-top'    => UAGB_Helper::get_css_value( $attr['vquestionPaddingTablet'], $attr['questionPaddingTypeDesktop'] ),
					'padding-bottom' => UAGB_Helper::get_css_value( $attr['questionBottomPaddingTablet'], $attr['questionPaddingTypeDesktop'] ),
					'padding-right'  => UAGB_Helper::get_css_value( $attr['hquestionPaddingTablet'], $attr['questionPaddingTypeDesktop'] ),
					'padding-left'   => UAGB_Helper::get_css_value( $attr['questionLeftPaddingTablet'], $attr['questionPaddingTypeDesktop'] ),
				),
				' .uagb-faq-content span'     => array(
					'margin-top'    => UAGB_Helper::get_css_value( $attr['vanswerPaddingTablet'], $attr['answerPaddingTypeDesktop'] ),
					'margin-bottom' => UAGB_Helper::get_css_value( $attr['vanswerPaddingTablet'], $attr['answerPaddingTypeDesktop'] ),
					'margin-right'  => UAGB_Helper::get_css_value( $attr['hanswerPaddingTablet'], $attr['answerPaddingTypeDesktop'] ),
					'margin-left'   => UAGB_Helper::get_css_value( $attr['hanswerPaddingTablet'], $attr['answerPaddingTypeDesktop'] ),
				),
				' .uagb-icon svg'             => array(
					'width'     => $t_icon_size,
					'height'    => $t_icon_size,
					'font-size' => $t_icon_size,
				),
				' .uagb-icon-active svg'      => array(
					'width'     => $t_icon_size,
					'height'    => $t_icon_size,
					'font-size' => $t_icon_size,
				),
			);
			$m_selectors = array(
				' .uagb-faq-questions-button' => array(
					'padding-top'    => UAGB_Helper::get_css_value( $attr['vquestionPaddingMobile'], $attr['questionPaddingTypeDesktop'] ),
					'padding-bottom' => UAGB_Helper::get_css_value( $attr['questionBottomPaddingMobile'], $attr['questionPaddingTypeDesktop'] ),
					'padding-right'  => UAGB_Helper::get_css_value( $attr['hquestionPaddingMobile'], $attr['questionPaddingTypeDesktop'] ),
					'padding-left'   => UAGB_Helper::get_css_value( $attr['questionLeftPaddingMobile'], $attr['questionPaddingTypeDesktop'] ),
				),
				' .uagb-faq-content span'     => array(
					'margin-top'    => UAGB_Helper::get_css_value( $attr['vanswerPaddingMobile'], $attr['answerPaddingTypeDesktop'] ),
					'margin-bottom' => UAGB_Helper::get_css_value( $attr['vanswerPaddingMobile'], $attr['answerPaddingTypeDesktop'] ),
					'margin-right'  => UAGB_Helper::get_css_value( $attr['hanswerPaddingMobile'], $attr['answerPaddingTypeDesktop'] ),
					'margin-left'   => UAGB_Helper::get_css_value( $attr['hanswerPaddingMobile'], $attr['answerPaddingTypeDesktop'] ),
				),
				' .uagb-icon svg'             => array(
					'width'     => $m_icon_size,
					'height'    => $m_icon_size,
					'font-size' => $m_icon_size,
				),
				' .uagb-icon-active svg'      => array(
					'width'     => $m_icon_size,
					'height'    => $m_icon_size,
					'font-size' => $m_icon_size,
				),
			);

			if ( 'accordion' === $attr['layout'] && true === $attr['inactiveOtherItems'] ) {

				$selectors[' .wp-block-uagb-faq-child.uagb-faq-child__outer-wrap .uagb-faq-content '] = array(
					'display' => 'none',
				);
			}
			if ( 'accordion' === $attr['layout'] && true === $attr['expandFirstItem'] ) {

				$selectors[' .uagb-faq__wrap.uagb-buttons-layout-wrap > .uagb-faq-child__outer-wrap:first-child > .uagb-faq-child__wrapper .uagb-faq-item.uagb-faq-item-active .uagb-faq-content '] = array(
					'display' => 'block',
				);
			}
			if ( true === $attr['enableSeparator'] ) {

				$selectors[' .uagb-faq-child__outer-wrap .uagb-faq-content '] = array(
					'border-style'        => 'solid',
					'border-top-color'    => $attr['borderColor'],
					'border-top-width'    => UAGB_Helper::get_css_value( $attr['borderWidth'], 'px' ),
					'border-right-width'  => '0px',
					'border-bottom-width' => '0px',
					'border-left-width'   => '0px',
				);
			}
			if ( 'grid' === $attr['layout'] ) {

				$selectors['.uagb-faq-layout-grid .uagb-faq__wrap .uagb-faq-child__outer-wrap '] = array(
					'text-align' => $attr['align'],
				);
				$selectors['.uagb-faq-layout-grid .uagb-faq__wrap.uagb-buttons-layout-wrap ']    = array(
					'grid-template-columns' => 'repeat(' . $attr['columns'] . ', 1fr)',
					'grid-column-gap'       => UAGB_Helper::get_css_value( $attr['columnsGap'], 'px' ),
					'grid-row-gap'          => UAGB_Helper::get_css_value( $attr['rowsGap'], 'px' ),
					'display'               => 'grid',
				);
				$t_selectors['.uagb-faq-layout-grid .uagb-faq__wrap.uagb-buttons-layout-wrap ']  = array(
					'grid-template-columns' => 'repeat(' . $attr['tcolumns'] . ', 1fr)',
				);
				$m_selectors['.uagb-faq-layout-grid .uagb-faq__wrap.uagb-buttons-layout-wrap ']  = array(
					'grid-template-columns' => 'repeat(' . $attr['mcolumns'] . ', 1fr)',
				);
			}

			$combined_selectors = array(
				'desktop' => $selectors,
				'tablet'  => $t_selectors,
				'mobile'  => $m_selectors,
			);

			$combined_selectors = UAGB_Helper::get_typography_css( $attr, 'question', ' .uagb-faq-questions-button .uagb-question', $combined_selectors );
			$combined_selectors = UAGB_Helper::get_typography_css( $attr, 'answer', ' .uagb-faq-item .uagb-faq-content p', $combined_selectors );

			return UAGB_Helper::generate_all_css( $combined_selectors, '.uagb-block-' . $id );
		}
		/**
		 * Get WP-Search CSS.
		 *
		 * @since 1.16.0
		 * @param array  $attr The block attributes.
		 * @param string $id The selector ID.
		 */
		public static function get_wp_search_css( $attr, $id ) {

			$defaults = UAGB_Helper::$block_list['uagb/wp-search']['attributes'];
			$attr     = array_merge( $defaults, $attr );

			$selectors            = array();
			$t_selectors          = array();
			$m_selectors          = array();
			$boxShadowPositionCSS = $attr['boxShadowPosition'];

			if ( 'outset' === $attr['boxShadowPosition'] ) {
				$boxShadowPositionCSS = '';
			}
			$vInputPaddingDesktop = UAGB_Helper::get_css_value( $attr['vinputPaddingDesktop'], $attr['inputPaddingTypeDesktop'] );
			$hInputPaddingDesktop = UAGB_Helper::get_css_value( $attr['hinputPaddingDesktop'], $attr['inputPaddingTypeDesktop'] );
			$vInputPaddingTablet  = UAGB_Helper::get_css_value( $attr['vinputPaddingTablet'], $attr['inputPaddingTypeDesktop'] );
			$hInputPaddingTablet  = UAGB_Helper::get_css_value( $attr['hinputPaddingTablet'], $attr['inputPaddingTypeDesktop'] );
			$vInputPaddingMobile  = UAGB_Helper::get_css_value( $attr['vinputPaddingMobile'], $attr['inputPaddingTypeDesktop'] );
			$hInputPaddingMobile  = UAGB_Helper::get_css_value( $attr['hinputPaddingMobile'], $attr['inputPaddingTypeDesktop'] );
			$iconSize             = UAGB_Helper::get_css_value( $attr['iconSize'], 'px' );
			$buttonIconSize       = UAGB_Helper::get_css_value( $attr['buttonIconSize'], 'px' );
			$inputCSS             = array(
				'color'            => $attr['textColor'],
				'background-color' => $attr['inputBgColor'],
				'border'           => 0,
				'border-radius'    => '0px',
				'margin'           => 0,
				'outline'          => 'unset',
				'padding-top'      => $vInputPaddingDesktop,
				'padding-bottom'   => $vInputPaddingDesktop,
				'padding-right'    => $hInputPaddingDesktop,
				'padding-left'     => $hInputPaddingDesktop,
			);
			$boxCSS               = array(
				'border-style'  => $attr['borderStyle'],
				'border-width'  => UAGB_Helper::get_css_value( $attr['borderWidth'], 'px' ),
				'border-color'  => $attr['borderColor'],
				'outline'       => 'unset',
				'border-radius' => UAGB_Helper::get_css_value( $attr['borderRadius'], 'px' ),
				'box-shadow'    => UAGB_Helper::get_css_value( $attr['boxShadowHOffset'], 'px' ) . ' ' . UAGB_Helper::get_css_value( $attr['boxShadowVOffset'], 'px' ) . ' ' . UAGB_Helper::get_css_value( $attr['boxShadowBlur'], 'px' ) . ' ' . UAGB_Helper::get_css_value( $attr['boxShadowSpread'], 'px' ) . ' ' . $attr['boxShadowColor'] . ' ' . $boxShadowPositionCSS,
				'transition'    => 'all .5s',
			);
			if ( 'px' === $attr['inputSizeType'] ) {
				$boxCSS['max-width'] = UAGB_Helper::get_css_value( $attr['inputSize'], $attr['inputSizeType'] );
			} else {
				$boxCSS['width'] = UAGB_Helper::get_css_value( $attr['inputSize'], $attr['inputSizeType'] );
			}
			$icon_color = $attr['textColor'];

			if ( $attr['iconColor'] && '' !== $attr['iconColor'] ) {
				$icon_color = $attr['iconColor'];
			}

			$selectors = array(
				' .uagb-search-form__container .uagb-search-submit' => array(
					'width'   => UAGB_Helper::get_css_value( $attr['buttonWidth'], 'px' ),
					'padding' => 0,
					'border'  => 0,
				),
				' .uagb-search-form__container .uagb-search-form__input::placeholder' => array(
					'color'   => $attr['textColor'],
					'opacity' => 0.6,
				),
				' .uagb-search-form__container .uagb-search-submit .uagb-wp-search-button-icon-wrap svg' => array(
					'width'     => $buttonIconSize,
					'height'    => $buttonIconSize,
					'font-size' => $buttonIconSize,
					'fill'      => $attr['buttonIconColor'],
				),
				' .uagb-search-form__container .uagb-search-submit:hover .uagb-wp-search-button-icon-wrap svg' => array(
					'fill' => $attr['buttonIconHoverColor'],
				),
				' .uagb-search-form__container .uagb-search-submit .uagb-wp-search-button-text' => array(
					'color' => $attr['buttonTextColor'],
				),
				' .uagb-search-form__container .uagb-search-submit:hover .uagb-wp-search-button-text' => array(
					'color' => $attr['buttonTextHoverColor'],
				),
				'.uagb-layout-input .uagb-wp-search-icon-wrap svg' => array(
					'width'     => $iconSize,
					'height'    => $iconSize,
					'font-size' => $iconSize,
					'fill'      => $icon_color,
				),
			);

			if ( 'input-button' === $attr['layout'] || 'input' === $attr['layout'] ) {
				$selectors[' .uagb-search-form__container .uagb-search-form__input'] = $inputCSS;

				$selectors[' .uagb-search-wrapper .uagb-search-form__container'] = $boxCSS;

				if ( 'inset' === $attr['boxShadowPosition'] ) {
					$selectors[' .uagb-search-wrapper .uagb-search-form__input'] = array(

						'box-shadow' => UAGB_Helper::get_css_value( $attr['boxShadowHOffset'], 'px' ) . ' ' . UAGB_Helper::get_css_value( $attr['boxShadowVOffset'], 'px' ) . ' ' . UAGB_Helper::get_css_value( $attr['boxShadowBlur'], 'px' ) . ' ' . UAGB_Helper::get_css_value( $attr['boxShadowSpread'], 'px' ) . ' ' . $attr['boxShadowColor'] . ' ' . $boxShadowPositionCSS,
					);
				}

				$selectors[' .uagb-search-form__container .uagb-wp-search-icon-wrap'] = array(
					'background-color' => $attr['inputBgColor'],
					'padding-top'      => $vInputPaddingDesktop,
					'padding-bottom'   => $vInputPaddingDesktop,
					'padding-left'     => $hInputPaddingDesktop,
				);
			}

			$selectors['.uagb-layout-input-button .uagb-search-wrapper .uagb-search-form__container .uagb-search-submit']       = array(
				'background-color' => $attr['buttonBgColor'],
			);
			$selectors['.uagb-layout-input-button .uagb-search-wrapper .uagb-search-form__container .uagb-search-submit:hover'] = array(
				'background-color' => $attr['buttonBgHoverColor'],
			);

			$m_selectors = array(
				' .uagb-search-wrapper .uagb-search-form__container .uagb-search-form__input' => array(
					'padding-top'    => $vInputPaddingMobile,
					'padding-bottom' => $vInputPaddingMobile,
					'padding-right'  => $hInputPaddingMobile,
					'padding-left'   => $hInputPaddingMobile,
				),
				' .uagb-search-form__container .uagb-wp-search-icon-wrap' => array(
					'padding-top'    => $vInputPaddingMobile,
					'padding-bottom' => $vInputPaddingMobile,
					'padding-left'   => $hInputPaddingMobile,
				),
			);

			$t_selectors        = array(
				' .uagb-search-wrapper .uagb-search-form__container .uagb-search-form__input' => array(
					'padding-top'    => $vInputPaddingTablet,
					'padding-bottom' => $vInputPaddingTablet,
					'padding-right'  => $hInputPaddingTablet,
					'padding-left'   => $hInputPaddingTablet,
				),
				' .uagb-search-form__container .uagb-wp-search-icon-wrap' => array(
					'padding-top'    => $vInputPaddingTablet,
					'padding-bottom' => $vInputPaddingTablet,
					'padding-left'   => $hInputPaddingTablet,
				),
			);
			$combined_selectors = array(
				'desktop' => $selectors,
				'tablet'  => $t_selectors,
				'mobile'  => $m_selectors,
			);
			$combined_selectors = UAGB_Helper::get_typography_css( $attr, 'input', ' .uagb-search-wrapper .uagb-search-form__container .uagb-search-form__input', $combined_selectors );

			$combined_selectors = UAGB_Helper::get_typography_css( $attr, 'button', ' .uagb-search-wrapper .uagb-search-form__container .uagb-search-submit .uagb-wp-search-button-text', $combined_selectors );

			return UAGB_Helper::generate_all_css( $combined_selectors, '.uagb-block-' . $id );
		}

		/**
		 * Get Taxonomy List CSS.
		 *
		 * @since 1.18.0
		 * @param array  $attr The block attributes.
		 * @param string $id The selector ID.
		 */
		public static function get_taxonomy_list_css( $attr, $id ) {

			$defaults = UAGB_Helper::$block_list['uagb/taxonomy-list']['attributes'];
			$attr     = array_merge( $defaults, $attr );

			$selectors   = array();
			$t_selectors = array();
			$m_selectors = array();

			$boxShadowPositionCSS = $attr['boxShadowPosition'];

			if ( 'outset' === $attr['boxShadowPosition'] ) {
				$boxShadowPositionCSS = '';
			}

			$selectors = array(
				' .uagb-taxonomy-wrap.uagb-layout-grid'   => array(
					'display'               => 'grid',
					'grid-template-columns' => 'repeat(' . $attr['columns'] . ', 1fr)',
					'grid-column-gap'       => UAGB_Helper::get_css_value( $attr['columnGap'], 'px' ),
					'grid-row-gap'          => UAGB_Helper::get_css_value( $attr['rowGap'], 'px' ),

				),
				' .uagb-layout-grid .uagb-taxomony-box'   => array(
					'padding'          => UAGB_Helper::get_css_value( $attr['contentPadding'], 'px' ),
					'grid-column-gap'  => UAGB_Helper::get_css_value( $attr['columnGap'], 'px' ),
					'background-color' => $attr['bgColor'],
					'text-align'       => $attr['alignment'],
					'box-shadow'       => UAGB_Helper::get_css_value( $attr['boxShadowHOffset'], 'px' ) . ' ' . UAGB_Helper::get_css_value( $attr['boxShadowVOffset'], 'px' ) . ' ' . UAGB_Helper::get_css_value( $attr['boxShadowBlur'], 'px' ) . ' ' . UAGB_Helper::get_css_value( $attr['boxShadowSpread'], 'px' ) . ' ' . $attr['boxShadowColor'] . ' ' . $boxShadowPositionCSS,

				),
				' .uagb-layout-grid .uagb-tax-title'      => array(
					'color'         => $attr['titleColor'],
					'margin-top'    => '0',
					'margin-bottom' => UAGB_Helper::get_css_value( $attr['titleBottomSpace'], 'px' ),
				),
				' .uagb-layout-grid .uagb-tax-count'      => array(
					'color' => $attr['countColor'],
				),

				// List layout styling.
				' .uagb-layout-list .uagb-tax-list'       => array(
					'list-style' => $attr['listStyle'],
					'color'      => $attr['listStyleColor'],
				),
				' .uagb-layout-list .uagb-tax-list:hover' => array(
					'color' => $attr['hoverlistStyleColor'],
				),
				' .uagb-layout-list .uagb-tax-list a.uagb-tax-link' => array(
					'color' => $attr['listTextColor'],
				),
				' .uagb-layout-list .uagb-tax-list a.uagb-tax-link:hover' => array(
					'color' => $attr['hoverlistTextColor'],
				),
				' .uagb-layout-list .uagb-tax-list .uagb-tax-link-wrap' => array(
					'margin-bottom' => UAGB_Helper::get_css_value( $attr['listBottomMargin'], 'px' ),
				),

			);

			if ( 'none' !== $attr['seperatorStyle'] ) {
				$selectors[' .uagb-layout-list .uagb-tax-separator'] = array(
					'border-top-color' => $attr['seperatorColor'],
					'border-top-style' => $attr['seperatorStyle'],
					'border-top-width' => UAGB_Helper::get_css_value( $attr['seperatorThickness'], 'px' ),
					'width'            => UAGB_Helper::get_css_value( $attr['seperatorWidth'], '%' ),
				);
			}

			if ( 'none' !== $attr['borderStyle'] ) {
				$selectors[' .uagb-taxomony-box'] = array(
					'border'        => UAGB_Helper::get_css_value( $attr['borderThickness'], 'px' ) . ' ' . $attr['borderStyle'] . ' ' . $attr['borderColor'],
					'border-radius' => UAGB_Helper::get_css_value( $attr['borderRadius'], 'px' ),
				);
			}

			$t_selectors = array(
				' .uagb-taxonomy-wrap.uagb-layout-grid' => array(
					'grid-template-columns' => 'repeat(' . $attr['tcolumns'] . ', 1fr)',
				),
				' .uagb-layout-grid .uagb-taxomony-box' => array(
					'padding' => UAGB_Helper::get_css_value( $attr['contentPaddingTablet'], 'px' ),
				),
			);

			$m_selectors = array(
				' .uagb-taxonomy-wrap.uagb-layout-grid' => array(
					'grid-template-columns' => 'repeat(' . $attr['mcolumns'] . ', 1fr)',
				),
				' .uagb-layout-grid .uagb-taxomony-box' => array(
					'padding' => UAGB_Helper::get_css_value( $attr['contentPaddingMobile'], 'px' ),
				),
			);

			$combined_selectors = array(
				'desktop' => $selectors,
				'tablet'  => $t_selectors,
				'mobile'  => $m_selectors,
			);

			$combined_selectors = UAGB_Helper::get_typography_css( $attr, 'title', ' .uagb-layout-grid .uagb-tax-title', $combined_selectors );
			$combined_selectors = UAGB_Helper::get_typography_css( $attr, 'count', ' .uagb-layout-grid .uagb-tax-count', $combined_selectors );
			$combined_selectors = UAGB_Helper::get_typography_css( $attr, 'list', ' .uagb-layout-list .uagb-tax-list', $combined_selectors );

			return UAGB_Helper::generate_all_css( $combined_selectors, '.uagb-block-' . $id );
		}

		/**
		 * Get Forms Block Parent CSS
		 *
		 * @since 1.22.0
		 * @param array  $attr The block attributes.
		 * @param string $id The selector ID.
		 * @return array The Widget List.
		 */
		public static function get_forms_css( $attr, $id ) {

			$defaults = UAGB_Helper::$block_list['uagb/forms']['attributes'];

			$attr        = array_merge( $defaults, (array) $attr );
			$selectors   = array();
			$m_selectors = array();
			$t_selectors = array();
			$selectors   = array(
				' form.uagb-forms-main-form, form.uagb-forms-main-form .uagb-forms-input, form.uagb-forms-main-form textarea' => array(
					'text-align' => $attr['overallAlignment'],
				),
				' .uagb-forms-main-form .uagb-forms-field-set' => array(
					'margin-bottom' => UAGB_Helper::get_css_value( $attr['fieldGap'], 'px' ),
				),
				' .uagb-forms-main-form .uagb-forms-input-label' => array(
					'color'     => $attr['labelColor'],
					'font-size' => UAGB_Helper::get_css_value( $attr['labelFontSize'], $attr['labelFontSizeType'] ),
				),
				' .uagb-forms-success-message' => array(
					'border'           => UAGB_Helper::get_css_value( $attr['successMessageBorderWidth'], 'px' ) . ' ' . $attr['successMessageBorderStyle'] . ' ' . $attr['successMessageBorderColor'],
					'background-color' => $attr['successMessageBGColor'],
					'color'            => $attr['successMessageTextColor'],
				),
				' .uagb-forms-failed-message'  => array(
					'border'           => UAGB_Helper::get_css_value( $attr['failedMessageBorderWidth'], 'px' ) . ' ' . $attr['failedMessageBorderStyle'] . ' ' . $attr['failedMessageBorderColor'],
					'background-color' => $attr['failedMessageBGColor'],
					'color'            => $attr['failedMessageTextColor'],
				),
				' .uagb-forms-main-form .uagb-forms-main-submit-button-wrap' => array(
					'text-align' => $attr['buttonAlign'],

				),
				' .uagb-forms-main-form .uagb-forms-input:focus' => array(
					'outline'      => ' none !important',
					'border-color' => $attr['inputactiveColor'],
				),
				' .uagb-forms-main-form .uagb-forms-main-submit-button' => array(
					'font-size'        => UAGB_Helper::get_css_value( $attr['submitTextFontSize'], $attr['submitTextFontSizeType'] ),
					'color'            => $attr['submitColor'],
					'background-color' => $attr['submitBgColor'],
					'border'           => UAGB_Helper::get_css_value( $attr['submitborderWidth'], 'px' ) . ' ' . $attr['submitborderStyle'] . ' ' . $attr['submitborderColor'],
					'border-radius'    => UAGB_Helper::get_css_value( $attr['submitborderRadius'], 'px' ),
					'padding'          => UAGB_Helper::get_css_value( $attr['vPaddingSubmit'], 'px' ) . ' ' . UAGB_Helper::get_css_value( $attr['hPaddingSubmit'], 'px' ),
				),
				' .uagb-forms-main-form .uagb-forms-main-submit-button:hover' => array(
					'color'            => $attr['submitColorHover'],
					'background-color' => $attr['submitBgColorHover'],
					'border-color'     => $attr['submitborderHoverColor'],
				),

			);

			// Checkbox Field css.
			$selectors[' .uagb-forms-checkbox-wrap input[type=checkbox]:checked + label:before'] = array(
				'color'     => $attr['inputColor'],
				'font-size' => 'calc(' . $attr['toggleSize'] . 'px / 1.2)',
			);
			$selectors[' .uagb-forms-checkbox-wrap input[type=checkbox] + label:before']         = array(
				'background-color' => $attr['bgColor'],
				'width'            => UAGB_Helper::get_css_value( $attr['toggleSize'], 'px' ),
				'height'           => UAGB_Helper::get_css_value( $attr['toggleSize'], 'px' ),
			);
			$selectors[' .uagb-forms-checkbox-wrap > label']                                     = array(
				'color' => $attr['inputColor'],
			);

			// Radio Button Field css.
			$selectors[' .uagb-forms-radio-wrap input[type=radio]:checked + label:before'] = array(
				'background-color' => $attr['inputColor'],
				'font-size'        => 'calc(' . $attr['toggleSize'] . 'px / 1.2)',
			);
			$selectors[' .uagb-forms-radio-wrap input[type=radio] + label:before']         = array(
				'background-color' => $attr['bgColor'],
				'width'            => UAGB_Helper::get_css_value( $attr['toggleSize'], 'px' ),
				'height'           => UAGB_Helper::get_css_value( $attr['toggleSize'], 'px' ),
			);
			$selectors[' .uagb-forms-radio-wrap > label']                                  = array(
				'color' => $attr['inputColor'],
			);

			// Toggle Field css.
			$selectors[' .uagb-slider']                              = array(
				'background-color' => $attr['bgColor'],
			);
			$selectors[' .uagb-forms-main-form .uagb-switch']        = array(
				'width'  => UAGB_Helper::get_css_value( '50' + $attr['toggleWidthSize'] + $attr['inputborderWidth'], 'px' ),
				'height' => UAGB_Helper::get_css_value( '25' + $attr['toggleHeightSize'] + $attr['inputborderWidth'], 'px' ),
			);
			$selectors[' .uagb-forms-main-form .uagb-slider:before'] = array(
				'width'  => UAGB_Helper::get_css_value( '20' + $attr['toggleWidthSize'] - $attr['inputborderWidth'] / 2, 'px' ),
				'height' => UAGB_Helper::get_css_value( '20' + $attr['toggleHeightSize'] - $attr['inputborderWidth'], 'px' ),
			);
			$selectors[' .uagb-switch input:checked + .uagb-slider'] = array(
				'background-color' => $attr['toggleActiveColor'],
			);
			$selectors[' .uagb-switch input:focus + .uagb-slider']   = array(
				'box-shadow' => '0 0 1px' . $attr['toggleActiveColor'],
			);

			// Accept Field css.
			$selectors[' .uagb-forms-accept-wrap input[type=checkbox]:checked + label:before'] = array(
				'color'     => $attr['inputColor'],
				'font-size' => 'calc(' . $attr['toggleSize'] . 'px / 1.2)',
			);
			$selectors[' .uagb-forms-accept-wrap input[type=checkbox] + label:before']         = array(
				'background-color' => $attr['bgColor'],
				'width'            => UAGB_Helper::get_css_value( $attr['toggleSize'], 'px' ),
				'height'           => UAGB_Helper::get_css_value( $attr['toggleSize'], 'px' ),
			);
			$selectors[' .uagb-forms-accept-wrap > label']                                     = array(
				'color' => $attr['inputColor'],
			);

			if ( 'boxed' === $attr['formStyle'] ) {
				$selectors[' .uagb-forms-main-form  .uagb-forms-checkbox-wrap input[type=checkbox] + label:before'] = array(
					'border'        => UAGB_Helper::get_css_value( $attr['inputborderWidth'], 'px' ) . ' ' . $attr['inputborderStyle'] . ' ' . $attr['inputborderColor'],
					'border-radius' => UAGB_Helper::get_css_value( $attr['inputborderRadius'], 'px' ),
				);
				$selectors[' .uagb-forms-main-form .uagb-forms-checkbox-wrap > input']                              = array(
					'color' => $attr['inputColor'],
				);
				$selectors[' .uagb-forms-main-form  .uagb-forms-radio-wrap input[type=radio] + label:before']       = array(
					'border' => UAGB_Helper::get_css_value( $attr['inputborderWidth'], 'px' ) . ' ' . $attr['inputborderStyle'] . ' ' . $attr['inputborderColor'],
				);
				$selectors[' .uagb-forms-main-form .uagb-forms-radio-wrap > input']                                 = array(
					'color' => $attr['inputColor'],
				);
				$selectors[' .uagb-forms-main-form .uagb-slider'] = array(
					'border' => UAGB_Helper::get_css_value( $attr['inputborderWidth'], 'px' ) . ' ' . $attr['inputborderStyle'] . ' ' . $attr['inputborderColor'],
				);
				$selectors[' .uagb-forms-main-form  .uagb-forms-accept-wrap input[type=checkbox] + label:before'] = array(
					'border'        => UAGB_Helper::get_css_value( $attr['inputborderWidth'], 'px' ) . ' ' . $attr['inputborderStyle'] . ' ' . $attr['inputborderColor'],
					'border-radius' => UAGB_Helper::get_css_value( $attr['inputborderRadius'], 'px' ),
				);
				$selectors[' .uagb-forms-main-form .uagb-forms-accept-wrap > input']                              = array(
					'color' => $attr['inputColor'],
				);

				$selectors[' .uagb-forms-main-form  .uagb-forms-input'] = array(
					'background-color' => $attr['bgColor'],
					'border'           => UAGB_Helper::get_css_value( $attr['inputborderWidth'], 'px' ) . ' ' . $attr['inputborderStyle'] . ' ' . $attr['inputborderColor'],
					'border-radius'    => UAGB_Helper::get_css_value( $attr['inputborderRadius'], 'px' ),
					'color'            => $attr['inputColor'],
					'padding'          => UAGB_Helper::get_css_value( $attr['vPaddingField'], 'px' ) . ' ' . UAGB_Helper::get_css_value( $attr['hPaddingField'], 'px' ),

				);
				$selectors[' .uagb-forms-main-form  .uagb-forms-input.uagb-form-phone-country'] = array(
					'padding' => UAGB_Helper::get_css_value( $attr['vPaddingField'] - 1, 'px' ) . ' ' . UAGB_Helper::get_css_value( $attr['hPaddingField'], 'px' ),
				);

				$selectors[' .uagb-forms-input:hover']        = array(
					'border-color' => $attr['inputborderHoverColor'],
				);
				$selectors[' .uagb-forms-input::placeholder'] = array(
					'color' => $attr['inputplaceholderColor'],
				);
			}

			if ( 'underlined' === $attr['formStyle'] ) {
				$selectors[' .uagb-forms-main-form  .uagb-forms-accept-wrap input[type=checkbox] + label:before']   = array(
					'border-bottom' => UAGB_Helper::get_css_value( $attr['inputborderWidth'], 'px' ) . ' ' . $attr['inputborderStyle'] . ' ' . $attr['inputborderColor'],
				);
				$selectors[' .uagb-forms-main-form  .uagb-forms-checkbox-wrap input[type=checkbox] + label:before'] = array(
					'border-bottom' => UAGB_Helper::get_css_value( $attr['inputborderWidth'], 'px' ) . ' ' . $attr['inputborderStyle'] . ' ' . $attr['inputborderColor'],
				);
				$selectors[' .uagb-forms-main-form .uagb-slider'] = array(
					'border-bottom' => UAGB_Helper::get_css_value( $attr['inputborderWidth'], 'px' ) . ' ' . $attr['inputborderStyle'] . ' ' . $attr['inputborderColor'],
				);
				$selectors[' .uagb-forms-main-form  .uagb-forms-radio-wrap input[type=radio] + label:before'] = array(
					'border-bottom' => UAGB_Helper::get_css_value( $attr['inputborderWidth'], 'px' ) . ' ' . $attr['inputborderStyle'] . ' ' . $attr['inputborderColor'],
				);
				$selectors[' .uagb-forms-main-form  .uagb-forms-input']                                       = array(
					'border'        => 0,
					'outline'       => 0,
					'border-radius' => 0,
					'background'    => 'transparent',
					'border-bottom' => UAGB_Helper::get_css_value( $attr['inputborderWidth'], 'px' ) . ' ' . $attr['inputborderStyle'] . ' ' . $attr['inputborderColor'],
					'color'         => $attr['inputColor'],
					'padding'       => UAGB_Helper::get_css_value( $attr['vPaddingField'], 'px' ) . ' ' . UAGB_Helper::get_css_value( $attr['hPaddingField'], 'px' ),

				);
				$selectors[' .uagb-forms-main-form  .uagb-forms-input.uagb-form-phone-country'] = array(
					'padding' => UAGB_Helper::get_css_value( $attr['vPaddingField'] - 1, 'px' ) . ' ' . UAGB_Helper::get_css_value( $attr['hPaddingField'], 'px' ),
				);

				$selectors[' .uagb-forms-input:hover']        = array(
					'border-color' => $attr['inputborderHoverColor'],
				);
				$selectors[' .uagb-forms-input::placeholder'] = array(
					'color' => $attr['inputplaceholderColor'],
				);
			}

			$combined_selectors = array(
				'desktop' => $selectors,
				'tablet'  => $t_selectors,
				'mobile'  => $m_selectors,
			);

			$combined_selectors = UAGB_Helper::get_typography_css( $attr, 'submitText', ' .uagb-forms-main-form .uagb-forms-main-submit-button', $combined_selectors );

			$combined_selectors = UAGB_Helper::get_typography_css( $attr, 'label', ' .uagb-forms-main-form .uagb-forms-input-label', $combined_selectors );

			$combined_selectors = UAGB_Helper::get_typography_css( $attr, 'input', ' .uagb-forms-main-form  .uagb-forms-input::placeholder', $combined_selectors );

			$combined_selectors = UAGB_Helper::get_typography_css( $attr, 'input', ' .uagb-forms-main-form  .uagb-forms-input', $combined_selectors );

			return UAGB_Helper::generate_all_css( $combined_selectors, '.uagb-block-' . $id );
		}

		/**
		 * Get Lottie CSS.
		 *
		 * @since 1.20.0
		 * @param array  $attr The block attributes.
		 * @param string $id The selector ID.
		 */
		public static function get_lottie_css( $attr, $id ) {

			$defaults = UAGB_Helper::$block_list['uagb/lottie']['attributes'];
			$attr     = array_merge( $defaults, $attr );

			$selectors   = array();
			$t_selectors = array();
			$m_selectors = array();

			$selectors                                   = array(
				'.uagb-lottie__outer-wrap' => array(
					'width'            => UAGB_Helper::get_css_value( $attr['width'], 'px' ),
					'height'           => UAGB_Helper::get_css_value( $attr['height'], 'px' ),
					'overflow'         => 'hidden',
					'outline'          => 'none',
					'background-color' => $attr['backgroundColor'],
				),
				'.uagb-lottie__left'       => array(
					'margin-right' => 'auto',
				),
				'.uagb-lottie__right'      => array(
					'margin-left' => 'auto',
				),
				'.uagb-lottie__center'     => array(
					'margin' => '0 auto',
				),
			);
			$selectors['.uagb-lottie__outer-wrap:hover'] = array(
				'background' => $attr['backgroundHColor'],
			);

			$t_selectors = array(
				'.uagb-lottie__outer-wrap' => array(
					'width'  => UAGB_Helper::get_css_value( $attr['widthTablet'], 'px' ),
					'height' => UAGB_Helper::get_css_value( $attr['heightTablet'], 'px' ),
				),
			);

			$m_selectors = array(
				'.uagb-lottie__outer-wrap' => array(
					'width'  => UAGB_Helper::get_css_value( $attr['widthMob'], 'px' ),
					'height' => UAGB_Helper::get_css_value( $attr['heightMob'], 'px' ),
				),
			);

			$combined_selectors = array(
				'desktop' => $selectors,
				'tablet'  => $t_selectors,
				'mobile'  => $m_selectors,
			);

			return UAGB_Helper::generate_all_css( $combined_selectors, '.uagb-block-' . $id );
		}

		/**
		 * Get Condition block CSS.
		 *
		 * @since 1.22.0
		 */
		public static function get_condition_block_css() {

			return '@media (min-width: 1025px){body .uag-hide-desktop.uagb-google-map__wrap,body .uag-hide-desktop{display:none}}@media (min-width: 768px) and (max-width: 1024px){body .uag-hide-tab.uagb-google-map__wrap,body .uag-hide-tab{display:none}}@media (max-width: 767px){body .uag-hide-mob.uagb-google-map__wrap,body .uag-hide-mob{display:none}}';
		}

		/**
		 * Get Masonry Gallery CSS.
		 *
		 * @since 1.24.0
		 * @param array  $attr The block attributes.
		 * @param string $id The selector ID.
		 */
		public static function get_gallery_css( $attr, $id ) {
			if ( isset( $attr['masonry'] ) && true === $attr['masonry'] ) {
				$col_count = ( isset( $attr['columns'] ) ) ? $attr['columns'] : 3;
				$selectors = array();
				if ( isset( $attr['masonryGutter'] ) && '' !== $attr['masonryGutter'] ) {
					$selectors = array(
						'.wp-block-gallery.columns-' . $col_count . ' ul.blocks-gallery-grid' => array(
							'column-gap' => UAGB_Helper::get_css_value( $attr['masonryGutter'], 'px' ),
						),
						'.wp-block-gallery ul.blocks-gallery-grid li.blocks-gallery-item' => array(
							'margin-bottom' => UAGB_Helper::get_css_value( $attr['masonryGutter'], 'px' ),
						),
					);
				}
				$t_selectors = array();
				if ( $col_count > 3 ) {
					$t_selectors = array(
						'.wp-block-gallery.columns-' . $col_count . ' .blocks-gallery-grid' => array(
							'column-count' => '3',
						),
					);
				}
			}
			$combined_selectors = array(
				'desktop' => $selectors,
				'tablet'  => $t_selectors,
				'mobile'  => array(),
			);

			return UAGB_Helper::generate_all_css( $combined_selectors, '.uagb-block-' . $id );
		}

		/**
		 * Get Masonry Gallery CSS.
		 *
		 * @since 1.24.0
		 */
		public static function get_masonry_gallery_css() {

			$selectors = array(
				' .blocks-gallery-grid .blocks-gallery-item' => array(
					'margin'             => 0,
					'display'            => 'block',
					'grid-template-rows' => '1fr auto',
					'margin-bottom'      => '1em',
					'break-inside'       => 'avoid',
					'width'              => 'unset',
				),
				'.wp-block-gallery .blocks-gallery-grid' => array(
					'column-gap' => '1em',
					'display'    => 'unset',
				),
				'.columns-1 .blocks-gallery-grid'        => array(
					'column-count' => '1',
				),
				'.columns-2 .blocks-gallery-grid'        => array(
					'column-count' => '2',
				),
				'.columns-3 .blocks-gallery-grid'        => array(
					'column-count' => '3',
				),
				'.columns-4 .blocks-gallery-grid'        => array(
					'column-count' => '4',
				),
				'.columns-5 .blocks-gallery-grid'        => array(
					'column-count' => '5',
				),
				'.columns-6 .blocks-gallery-grid'        => array(
					'column-count' => '6',
				),
				'.columns-7 .blocks-gallery-grid'        => array(
					'column-count' => '7',
				),
				'.columns-8 .blocks-gallery-grid'        => array(
					'column-count' => '8',
				),
			);

			$m_selectors = array(
				'.wp-block-gallery[class*="columns-"] .blocks-gallery-grid' => array(
					'column-count' => '2',
					'column-gap'   => '1em',
					'display'      => 'unset',
				),
				'.wp-block-gallery.columns-1 .blocks-gallery-grid'        => array(
					'column-count' => '1',
				),
			);

			$combined_selectors = array(
				'desktop' => $selectors,
				'tablet'  => array(),
				'mobile'  => $m_selectors,
			);

			$css = UAGB_Helper::generate_all_css( $combined_selectors, '.uag-masonry' );

			$desktop = $css['desktop'];
			$tablet  = $css['tablet'];
			$mobile  = $css['mobile'];

			$tab_styling_css = '';
			$mob_styling_css = '';

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
	}
}
