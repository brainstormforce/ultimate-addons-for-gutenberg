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
		 * Get Section Block CSS
		 *
		 * @since 0.0.1
		 * @param array  $attr The block attributes.
		 * @param string $id The selector ID.
		 * @return array The Widget List.
		 */
		public static function get_section_css( $attr, $id ) { 			// @codingStandardsIgnoreStart

			global $content_width;

			$defaults = UAGB_Helper::$block_list['uagb/section']['attributes'];

			$attr = array_merge( $defaults, $attr );

			$bg_type = ( isset( $attr['backgroundType'] ) ) ? $attr['backgroundType'] : 'none';
			$overlay_type = ( isset( $attr['overlayType'] ) ) ? $attr['overlayType'] : 'color';
			$gradientOverlayPosition = ( isset( $attr['gradientOverlayPosition'] ) ) ? $attr['gradientOverlayPosition'] : 'center center';
			$gradientPosition = ( isset( $attr['gradientPosition'] ) ) ? $attr['gradientPosition'] : 'center center';
			
			$boxShadowPositionCSS = $attr['boxShadowPosition'];
			if ( 'outset' === $attr['boxShadowPosition'] ) {
				$boxShadowPositionCSS = '';
			}
			
			$style = array(
				'padding-top'    => UAGB_Helper::get_css_value( $attr['topPadding'], $attr['desktopPaddingType'] ),
				'padding-bottom' => UAGB_Helper::get_css_value( $attr['bottomPadding'], $attr['desktopPaddingType'] ),
				'padding-left'   => UAGB_Helper::get_css_value( $attr['leftPadding'], $attr['desktopPaddingType'] ),
				'padding-right'  => UAGB_Helper::get_css_value( $attr['rightPadding'], $attr['desktopPaddingType'] ),
				'border-radius'  => UAGB_Helper::get_css_value( $attr['borderRadius'], 'px' )
			);

			$m_selectors = array();
			$t_selectors = array();

			if ( 'right' == $attr['align'] ) {
				$style['margin-right']  = UAGB_Helper::get_css_value( $attr['rightMargin'], $attr['desktopMarginType'] );
				$style['margin-left']   = 'auto';
				$style['margin-top']    = UAGB_Helper::get_css_value( $attr['topMargin'], $attr['desktopMarginType'] );
				$style['margin-bottom'] = UAGB_Helper::get_css_value( $attr['bottomMargin'], $attr['desktopMarginType'] );
			} elseif ( 'left' == $attr['align'] ) {
				$style['margin-right']  = 'auto';
				$style['margin-left']   = UAGB_Helper::get_css_value( $attr['leftMargin'], $attr['desktopMarginType'] );
				$style['margin-top']    = UAGB_Helper::get_css_value( $attr['topMargin'], $attr['desktopMarginType'] );
				$style['margin-bottom'] = UAGB_Helper::get_css_value( $attr['bottomMargin'], $attr['desktopMarginType'] );
			} elseif ( 'center' == $attr['align'] ) {
				$style['margin-right']  = 'auto';
				$style['margin-left']   = 'auto';
				$style['margin-top']    = UAGB_Helper::get_css_value( $attr['topMargin'], $attr['desktopMarginType'] );
				$style['margin-bottom'] = UAGB_Helper::get_css_value( $attr['bottomMargin'], $attr['desktopMarginType'] );
			} else {
				$style['margin-top']    = UAGB_Helper::get_css_value( $attr['topMargin'], $attr['desktopMarginType'] );
				$style['margin-bottom'] = UAGB_Helper::get_css_value( $attr['bottomMargin'], $attr['desktopMarginType'] );
			}

			if ( "none" != $attr['borderStyle'] ) {
				$style["border-style"] = $attr['borderStyle'];
				$style["border-width"] = UAGB_Helper::get_css_value( $attr['borderWidth'], 'px' );
				$style["border-color"] =  $attr['borderColor'];
			}

			$position = str_replace( '-', ' ', $attr['backgroundPosition'] );

			$section_width = '100%';

			if ( isset( $attr['contentWidth'] ) ) {

				if ( 'boxed' == $attr['contentWidth'] ) {
					if ( isset( $attr['width'] ) ) {
						$section_width = UAGB_Helper::get_css_value( $attr['width'], 'px' );
					}
				}
			}

			if ( 'wide' != $attr['align'] && 'full' != $attr['align'] ) {
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
				if ( 'boxed' != $attr['contentWidth'] ) {
					if ( isset( $attr['themeWidth'] ) && $attr['themeWidth'] == true ) {
						$inner_width = UAGB_Helper::get_css_value( $content_width, 'px' );
					} else {
						if ( isset( $attr['innerWidth'] ) ) {
							$inner_width = UAGB_Helper::get_css_value( $attr['innerWidth'], $attr['innerWidthType'] );
						}
					}
				}
			}

			$selectors = array(
				'.uagb-section__wrap'        => $style,
				' > .uagb-section__video-wrap' => array(
					'opacity' => ( isset( $attr['backgroundVideoOpacity'] ) && '' != $attr['backgroundVideoOpacity'] ) ? ( ( 100 - $attr['backgroundVideoOpacity'] ) / 100 ) : 0.5,
				),
				' > .uagb-section__inner-wrap' => array(
					'max-width' => $inner_width
				),
				'.wp-block-uagb-section' => array (
					'box-shadow' => UAGB_Helper::get_css_value( $attr['boxShadowHOffset'], "px" ) . ' ' . UAGB_Helper::get_css_value( $attr['boxShadowVOffset'], "px" ) . ' ' . UAGB_Helper::get_css_value( $attr['boxShadowBlur'], "px" ) . ' ' . UAGB_Helper::get_css_value( $attr['boxShadowSpread'], "px" ) . ' ' . $attr['boxShadowColor'] . ' ' . $boxShadowPositionCSS
				)
			);

			if ( 'video' == $bg_type ) {
				$selectors[' > .uagb-section__overlay'] = array(
					'opacity'          => 1,
					'background-color' => $attr['backgroundVideoColor'],
				);
			} else if ( 'image' == $bg_type ) {
				if( 'color' == $overlay_type ){
					$selectors[' > .uagb-section__overlay'] = array(
						'opacity' => ( isset( $attr['backgroundOpacity'] ) && '' != $attr['backgroundOpacity'] ) ? $attr['backgroundOpacity'] / 100 : 0,
						'background-color' => $attr['backgroundImageColor'],
					);
				}else{
					$selectors[' > .uagb-section__overlay']['background-color'] = 'transparent';
					$selectors[' > .uagb-section__overlay']['opacity'] =  ( isset( $attr['backgroundOpacity'] ) && '' != $attr['backgroundOpacity'] ) ? $attr['backgroundOpacity'] / 100 : "";

					if ( 'linear' === $attr['gradientOverlayType'] ) {

						$selectors[' > .uagb-section__overlay']['background-image'] = 'linear-gradient(' . $attr['gradientOverlayAngle'] . 'deg, ' . $attr['gradientOverlayColor1'] . ' ' . $attr['gradientOverlayLocation1'] . '%, ' . $attr['gradientOverlayColor2'] . ' ' . $attr['gradientOverlayLocation2'] . '%)';
					} else {

						$selectors[' > .uagb-section__overlay']['background-image'] = 'radial-gradient( at ' . $gradientOverlayPosition . ', ' . $attr['gradientOverlayColor1'] . ' ' . $attr['gradientOverlayLocation1'] . '%, ' . $attr['gradientOverlayColor2'] . ' ' . $attr['gradientOverlayLocation2'] . '%)';
					}
				}
			} else if ( 'color' == $bg_type ) {
				$selectors[' > .uagb-section__overlay'] = array(
					'opacity' => ( isset( $attr['backgroundOpacity'] ) && '' != $attr['backgroundOpacity'] ) ? $attr['backgroundOpacity'] / 100 : "",
					'background-color' => $attr['backgroundColor'],
				);
			} else if ( 'gradient' === $bg_type ) {
				$selectors[' > .uagb-section__overlay']['background-color'] = 'transparent';
				$selectors[' > .uagb-section__overlay']['opacity'] =  ( isset( $attr['backgroundOpacity'] ) && '' != $attr['backgroundOpacity'] ) ? $attr['backgroundOpacity'] / 100 : "";

				if ( 'linear' === $attr['gradientType'] ) {

					$selectors[' > .uagb-section__overlay']['background-image'] = 'linear-gradient(' . $attr['gradientAngle'] . 'deg, ' . $attr['gradientColor1'] . ' ' . $attr['gradientLocation1'] . '%, ' . $attr['gradientColor2'] . ' ' . $attr['gradientLocation2'] . '%)';
				} else {
					$selectors[' > .uagb-section__overlay']['background-image'] = 'radial-gradient( at ' . $gradientPosition . ', ' . $attr['gradientColor1'] . ' ' . $attr['gradientLocation1'] . '%, ' . $attr['gradientColor2'] . ' ' . $attr['gradientLocation2'] . '%)';
				}
			}

			$selectors[' > .uagb-section__overlay']["border-radius"] = UAGB_Helper::get_css_value( $attr['borderRadius'], 'px' );

			$m_selectors = array(
				'.uagb-section__wrap' => array(
					'padding-top'    => UAGB_Helper::get_css_value( $attr['topPaddingMobile'], $attr['mobilePaddingType'] ),
					'padding-bottom' => UAGB_Helper::get_css_value( $attr['bottomPaddingMobile'], $attr['mobilePaddingType'] ),
					'padding-left'   => UAGB_Helper::get_css_value( $attr['leftPaddingMobile'], $attr['mobilePaddingType'] ),
					'padding-right'  => UAGB_Helper::get_css_value( $attr['rightPaddingMobile'], $attr['mobilePaddingType'] ),
				)
			);

			$t_selectors = array(
				'.uagb-section__wrap' => array(
					'padding-top'    => UAGB_Helper::get_css_value( $attr['topPaddingTablet'], $attr['tabletPaddingType'] ),
					'padding-bottom' => UAGB_Helper::get_css_value( $attr['bottomPaddingTablet'], $attr['tabletPaddingType'] ),
					'padding-left'   => UAGB_Helper::get_css_value( $attr['leftPaddingTablet'], $attr['tabletPaddingType'] ),
					'padding-right'  => UAGB_Helper::get_css_value( $attr['rightPaddingTablet'], $attr['tabletPaddingType'] ),
				)
			);

			if ( 'right' == $attr['align'] ) {
				$t_selectors['.uagb-section__wrap']['margin-right']  = UAGB_Helper::get_css_value( $attr['rightMarginTablet'], $attr['tabletMarginType'] );
				$t_selectors['.uagb-section__wrap']['margin-top']    = UAGB_Helper::get_css_value( $attr['topMarginTablet'], $attr['tabletMarginType'] );
				$t_selectors['.uagb-section__wrap']['margin-bottom'] = UAGB_Helper::get_css_value( $attr['bottomMarginTablet'], $attr['tabletMarginType'] );

				$m_selectors['.uagb-section__wrap']['margin-right']  = UAGB_Helper::get_css_value( $attr['rightMarginMobile'], $attr['mobileMarginType'] );
				$m_selectors['.uagb-section__wrap']['margin-top']    = UAGB_Helper::get_css_value( $attr['topMarginMobile'], $attr['mobileMarginType'] );
				$m_selectors['.uagb-section__wrap']['margin-bottom'] = UAGB_Helper::get_css_value( $attr['bottomMarginMobile'], $attr['mobileMarginType'] );
			} elseif ( 'left' == $attr['align'] ) {
				$t_selectors['.uagb-section__wrap']['margin-left']   = UAGB_Helper::get_css_value( $attr['leftMarginTablet'], $attr['tabletMarginType'] );
				$t_selectors['.uagb-section__wrap']['margin-top']    = UAGB_Helper::get_css_value( $attr['topMarginTablet'], $attr['tabletMarginType'] );
				$t_selectors['.uagb-section__wrap']['margin-bottom'] = UAGB_Helper::get_css_value( $attr['bottomMarginTablet'], $attr['tabletMarginType'] );

				$m_selectors['.uagb-section__wrap']['margin-left']   = UAGB_Helper::get_css_value( $attr['leftMarginMobile'], $attr['mobileMarginType'] );
				$m_selectors['.uagb-section__wrap']['margin-top']    = UAGB_Helper::get_css_value( $attr['topMarginMobile'], $attr['mobileMarginType'] );
				$m_selectors['.uagb-section__wrap']['margin-bottom'] = UAGB_Helper::get_css_value( $attr['bottomMarginMobile'], $attr['mobileMarginType'] );
			} else {
				$t_selectors['.uagb-section__wrap']['margin-top']    = UAGB_Helper::get_css_value( $attr['topMarginTablet'], $attr['tabletMarginType'] );
				$t_selectors['.uagb-section__wrap']['margin-bottom'] = UAGB_Helper::get_css_value( $attr['bottomMarginTablet'], $attr['tabletMarginType'] );

				$m_selectors['.uagb-section__wrap']['margin-top']    = UAGB_Helper::get_css_value( $attr['topMarginMobile'], $attr['mobileMarginType'] );
				$m_selectors['.uagb-section__wrap']['margin-bottom'] = UAGB_Helper::get_css_value( $attr['bottomMarginMobile'], $attr['mobileMarginType'] );
			}

			// @codingStandardsIgnoreEnd

			$base_selector = ( $attr['classMigrate'] ) ? '.uagb-block-' : '#uagb-section-';

			$desktop = UAGB_Helper::generate_css( $selectors, $base_selector . $id );

			$tablet = UAGB_Helper::generate_css( $t_selectors, $base_selector . $id );

			$mobile = UAGB_Helper::generate_css( $m_selectors, $base_selector . $id );

			$generated_css = array(
				'desktop' => $desktop,
				'tablet'  => $tablet,
				'mobile'  => $mobile,
			);

			return $generated_css;
		}

		/**
		 * Get Columns Block CSS
		 *
		 * @since 1.8.0
		 * @param array  $attr The block attributes.
		 * @param string $id The selector ID.
		 * @return array The Widget List.
		 */
		public static function get_columns_css( $attr, $id ) { 			// @codingStandardsIgnoreStart

			global $content_width;

			$defaults = UAGB_Helper::$block_list['uagb/columns']['attributes'];

			$attr = array_merge( $defaults, $attr );

			$bg_type = ( isset( $attr['backgroundType'] ) ) ? $attr['backgroundType'] : 'none';

			$m_selectors = array();
			$t_selectors = array();
			$boxShadowPositionCSS = $attr['boxShadowPosition'];
			if ( 'outset' === $attr['boxShadowPosition'] ) {
				$boxShadowPositionCSS = '';
			}
			$style = array(
				'padding-top'    => UAGB_Helper::get_css_value( $attr['topPadding'], $attr['desktopPaddingType'] ),
				'padding-bottom' => UAGB_Helper::get_css_value( $attr['bottomPadding'], $attr['desktopPaddingType'] ),
				'padding-left'   => UAGB_Helper::get_css_value( $attr['leftPadding'], $attr['desktopPaddingType'] ),
				'padding-right'  => UAGB_Helper::get_css_value( $attr['rightPadding'], $attr['desktopPaddingType'] ),
				'margin-top'    => UAGB_Helper::get_css_value( $attr['topMargin'], $attr['desktopMarginType'] ),
				'margin-bottom' => UAGB_Helper::get_css_value( $attr['bottomMargin'], $attr['desktopMarginType'] ),
				'border-radius'  => UAGB_Helper::get_css_value( $attr['borderRadius'], $attr['desktopMarginType'] ),
			);

			if ( "none" != $attr['borderStyle'] ) {
				$style["border-style"] = $attr['borderStyle'];
				$style["border-width"] = UAGB_Helper::get_css_value( $attr['borderWidth'], 'px' );
				$style["border-color"] =  $attr['borderColor'];
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
				if ( 'theme' == $attr['contentWidth'] ) {
					$inner_width = UAGB_Helper::get_css_value( $content_width, 'px' );
				} else if ( 'custom' == $attr['contentWidth'] ) {
					$inner_width = UAGB_Helper::get_css_value( $attr['width'], $attr['widthType'] );
				}
			}

			$selectors = array(
				'.uagb-columns__wrap'        => $style,
				' .uagb-columns__video-wrap' => array(
					'opacity' => ( isset( $attr['backgroundVideoOpacity'] ) && '' != $attr['backgroundVideoOpacity'] ) ? ( ( 100 - $attr['backgroundVideoOpacity'] ) / 100 ) : 0.5,
				),
				' > .uagb-columns__inner-wrap' => array(
					'max-width' => $inner_width,
				),
				' .uagb-column__inner-wrap' => array(
					'padding' => UAGB_Helper::get_css_value( $attr['columnGap'], 'px' )
				),
				' .uagb-columns__shape-top svg' => array(
					'height' => UAGB_Helper::get_css_value( $attr['topHeight'], 'px' )
				),
				' .uagb-columns__shape-top .uagb-columns__shape-fill' => array(
					'fill' => UAGB_Helper::hex2rgba( $attr['topColor'], ( isset( $attr['topDividerOpacity'] ) && '' != $attr['topDividerOpacity'] ) ? $attr['topDividerOpacity'] : 100 ),
				),
				' .uagb-columns__shape-bottom svg' => array(
					'height' => UAGB_Helper::get_css_value( $attr['bottomHeight'], 'px' )
				),
				' .uagb-columns__shape-bottom .uagb-columns__shape-fill' => array(
					'fill' => UAGB_Helper::hex2rgba( $attr['bottomColor'], ( isset( $attr['bottomDividerOpacity'] ) && '' != $attr['bottomDividerOpacity'] ) ? $attr['bottomDividerOpacity'] : 100 ),
				),
				'.wp-block-uagb-columns' => array(
					"box-shadow" => UAGB_Helper::get_css_value( $attr['boxShadowHOffset'], "px" ) . ' ' . UAGB_Helper::get_css_value( $attr['boxShadowVOffset'], "px" ) . ' ' . UAGB_Helper::get_css_value( $attr['boxShadowBlur'], "px" ) . ' ' . UAGB_Helper::get_css_value( $attr['boxShadowSpread'], "px" ) . ' ' . $attr['boxShadowColor'] . ' ' . $boxShadowPositionCSS  
				),
			);

			if ( '' !== $attr['topWidth'] ) {
				$selectors[' .uagb-columns__shape-top svg']['width'] = "calc( " . $attr['topWidth'] . "% + 1.3px )";
			}

			if ( '' !== $attr['bottomWidth'] ) {
				$selectors[' .uagb-columns__shape-bottom svg']['width'] = "calc( " . $attr['bottomWidth'] . "% + 1.3px )";
			}

			if ( 'video' == $bg_type ) {
				$selectors[' > .uagb-columns__overlay'] = array(
					'opacity'          => 1,
					'background-color' => $attr['backgroundVideoColor'],
				);
			} else if ( 'image' == $bg_type ) {
				$selectors[' > .uagb-columns__overlay'] = array(
					'opacity' => ( isset( $attr['backgroundOpacity'] ) && '' != $attr['backgroundOpacity'] ) ? $attr['backgroundOpacity'] / 100 : 0,
					'background-color' => $attr['backgroundImageColor'],
				);
			} else if ( 'color' == $bg_type ) {
				$selectors[' > .uagb-columns__overlay'] = array(
					'opacity' => ( isset( $attr['backgroundOpacity'] ) && '' != $attr['backgroundOpacity'] ) ? $attr['backgroundOpacity'] / 100 : "",
					'background-color' => $attr['backgroundColor'],
				);
			} elseif ( 'gradient' === $bg_type ) {
				$selectors[' > .uagb-columns__overlay']['background-color'] = 'transparent';
				$selectors[' > .uagb-columns__overlay']['opacity'] = ( isset( $attr['backgroundOpacity'] ) && '' != $attr['backgroundOpacity'] ) ? $attr['backgroundOpacity'] / 100 : "";

				if ( 'linear' === $attr['gradientType'] ) {

					$selectors[' > .uagb-columns__overlay']['background-image'] = 'linear-gradient(' . $attr['gradientAngle'] . 'deg, ' . $attr['gradientColor1'] . ' ' . $attr['gradientLocation1'] . '%, ' . $attr['gradientColor2'] . ' ' . $attr['gradientLocation2'] . '%)';
				} else {

					$selectors[' > .uagb-columns__overlay']['background-image'] = 'radial-gradient( at center center, ' . $attr['gradientColor1'] . ' ' . $attr['gradientLocation1'] . '%, ' . $attr['gradientColor2'] . ' ' . $attr['gradientLocation2'] . '%)';
				}
			}

			$selectors[' > .uagb-columns__overlay']["border-radius"] = UAGB_Helper::get_css_value( $attr['borderRadius'], 'px' );

			$m_selectors = array(
				'.uagb-columns__wrap' => array(
					'padding-top'    => UAGB_Helper::get_css_value( $attr['topPaddingMobile'], $attr['mobilePaddingType'] ),
					'padding-bottom' => UAGB_Helper::get_css_value( $attr['bottomPaddingMobile'], $attr['mobilePaddingType'] ),
					'padding-left'   => UAGB_Helper::get_css_value( $attr['leftPaddingMobile'], $attr['mobilePaddingType'] ),
					'padding-right'  => UAGB_Helper::get_css_value( $attr['rightPaddingMobile'], $attr['mobilePaddingType'] ),
					'margin-top'    => UAGB_Helper::get_css_value( $attr['topMarginMobile'], $attr['mobileMarginType'] ),
					'margin-bottom' => UAGB_Helper::get_css_value( $attr['bottomMarginMobile'], $attr['mobileMarginType'] ),
				),
				' .uagb-columns__shape-bottom svg' => array(
					'height' => UAGB_Helper::get_css_value( $attr['bottomHeightMobile'], 'px' )
				),
				' .uagb-columns__shape-top svg' => array(
					'height' => UAGB_Helper::get_css_value( $attr['topHeightMobile'], 'px' )
				),
			);

			$t_selectors = array(
				'.uagb-columns__wrap' => array(
					'padding-top'    => UAGB_Helper::get_css_value( $attr['topPaddingTablet'], $attr['tabletPaddingType'] ),
					'padding-bottom' => UAGB_Helper::get_css_value( $attr['bottomPaddingTablet'], $attr['tabletPaddingType'] ),
					'padding-left'   => UAGB_Helper::get_css_value( $attr['leftPaddingTablet'], $attr['tabletPaddingType'] ),
					'padding-right'  => UAGB_Helper::get_css_value( $attr['rightPaddingTablet'], $attr['tabletPaddingType'] ),
					'margin-top'    => UAGB_Helper::get_css_value( $attr['topMarginTablet'], $attr['tabletMarginType'] ),
					'margin-bottom' => UAGB_Helper::get_css_value( $attr['bottomMarginTablet'], $attr['tabletMarginType'] ),
				),
				' .uagb-columns__shape-bottom svg' => array(
					'height' => UAGB_Helper::get_css_value( $attr['bottomHeightTablet'], 'px' )
				),
				' .uagb-columns__shape-top svg' => array(
					'height' => UAGB_Helper::get_css_value( $attr['topHeightTablet'], 'px' )
				),
			);

			// @codingStandardsIgnoreEnd

			$base_selector = ( $attr['classMigrate'] ) ? '.uagb-block-' : '#uagb-columns-';

			$desktop = UAGB_Helper::generate_css( $selectors, $base_selector . $id );

			$tablet = UAGB_Helper::generate_css( $t_selectors, $base_selector . $id );

			$mobile = UAGB_Helper::generate_css( $m_selectors, $base_selector . $id );

			$generated_css = array(
				'desktop' => $desktop,
				'tablet'  => $tablet,
				'mobile'  => $mobile,
			);

			return $generated_css;
		}

		/**
		 * Get Single Column Block CSS
		 *
		 * @since 1.8.0
		 * @param array  $attr The block attributes.
		 * @param string $id The selector ID.
		 * @return array The Widget List.
		 */
		public static function get_column_css( $attr, $id ) { 			// @codingStandardsIgnoreStart

			global $content_width;

			$defaults = UAGB_Helper::$block_list['uagb/column']['attributes'];

			$attr = array_merge( $defaults, $attr );

			$bg_type = ( isset( $attr['backgroundType'] ) ) ? $attr['backgroundType'] : 'none';
			$overlay_type = ( isset( $attr['overlayType'] ) ) ? $attr['overlayType'] : 'none';

			$style = array(
				'padding-top'    => UAGB_Helper::get_css_value( $attr['topPadding'], $attr['desktopPaddingType'] ),
				'padding-bottom' => UAGB_Helper::get_css_value( $attr['bottomPadding'], $attr['desktopPaddingType'] ),
				'padding-left'   => UAGB_Helper::get_css_value( $attr['leftPadding'], $attr['desktopPaddingType'] ),
				'padding-right'  => UAGB_Helper::get_css_value( $attr['rightPadding'], $attr['desktopPaddingType'] ),
				'margin-top'    => UAGB_Helper::get_css_value( $attr['topMargin'], $attr['desktopMarginType'] ),
				'margin-bottom' => UAGB_Helper::get_css_value( $attr['bottomMargin'], $attr['desktopMarginType'] ),
				'margin-left'    => UAGB_Helper::get_css_value( $attr['leftMargin'], $attr['desktopMarginType'] ),
				'margin-right' => UAGB_Helper::get_css_value( $attr['rightMargin'], $attr['desktopMarginType'] ),
				'border-radius' => UAGB_Helper::get_css_value( $attr['borderRadius'], 'px' ),
			);

			$m_selectors = array();
			$t_selectors = array();

			if ( "none" != $attr['borderStyle'] ) {
				$style["border-style"] = $attr['borderStyle'];
				$style["border-width"] = UAGB_Helper::get_css_value( $attr['borderWidth'], 'px' );
				$style["border-color"] =  $attr['borderColor'];
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
				'.uagb-column__wrap' => $style
			);

			if ( 'image' == $bg_type ) {
				if( 'color' == $overlay_type ){
					$selectors[' > .uagb-column__overlay'] = array(
					'opacity' => ( isset( $attr['backgroundOpacity'] ) && '' != $attr['backgroundOpacity'] ) ? $attr['backgroundOpacity'] / 100 : 0,
					'background-color' => $attr['backgroundImageColor'],
					);
				}else{
					$selectors[' > .uagb-column__overlay']['background-color'] = 'transparent';
					$selectors[' > .uagb-column__overlay']['opacity'] =  ( isset( $attr['backgroundOpacity'] ) && '' != $attr['backgroundOpacity'] ) ? $attr['backgroundOpacity'] / 100 : "";

					if ( 'linear' === $attr['gradientOverlayType'] ) {

						$selectors[' > .uagb-column__overlay']['background-image'] = 'linear-gradient(' . $attr['gradientOverlayAngle'] . 'deg, ' . $attr['gradientOverlayColor1'] . ' ' . $attr['gradientOverlayLocation1'] . '%, ' . $attr['gradientOverlayColor2'] . ' ' . $attr['gradientOverlayLocation2'] . '%)';
					} else {

						$selectors[' > .uagb-column__overlay']['background-image'] = 'radial-gradient( at center center, ' . $attr['gradientOverlayColor1'] . ' ' . $attr['gradientOverlayLocation1'] . '%, ' . $attr['gradientOverlayColor2'] . ' ' . $attr['gradientOverlayLocation2'] . '%)';
					}
				}

			} else if ( 'color' == $bg_type ) {
				$selectors[' > .uagb-column__overlay'] = array(
					'opacity' => ( isset( $attr['backgroundOpacity'] ) && '' != $attr['backgroundOpacity'] ) ? $attr['backgroundOpacity'] / 100 : "",
					'background-color' => $attr['backgroundColor'],
				);
			} elseif ( 'gradient' === $bg_type ) {
				$selectors[' > .uagb-column__overlay']['background-color'] = 'transparent';
				$selectors[' > .uagb-column__overlay']['opacity'] = ( isset( $attr['backgroundOpacity'] ) && '' != $attr['backgroundOpacity'] ) ? $attr['backgroundOpacity'] / 100 : "";

				if ( 'linear' === $attr['gradientType'] ) {

					$selectors[' > .uagb-column__overlay']['background-image'] = 'linear-gradient(' . $attr['gradientAngle'] . 'deg, ' . $attr['gradientColor1'] . ' ' . $attr['gradientLocation1'] . '%, ' . $attr['gradientColor2'] . ' ' . $attr['gradientLocation2'] . '%)';
				} else {

					$selectors[' > .uagb-column__overlay']['background-image'] = 'radial-gradient( at center center, ' . $attr['gradientColor1'] . ' ' . $attr['gradientLocation1'] . '%, ' . $attr['gradientColor2'] . ' ' . $attr['gradientLocation2'] . '%)';
				}
			}

			if ( '' != $attr['colWidth'] && 0 != $attr['colWidth'] ) {

				$selectors['.uagb-column__wrap']["width"] = UAGB_Helper::get_css_value( $attr['colWidth'], "%" );
			}

			$m_selectors = array(
				'.uagb-column__wrap' => array(
					'padding-top'    => UAGB_Helper::get_css_value( $attr['topPaddingMobile'], $attr['mobilePaddingType'] ),
					'padding-bottom' => UAGB_Helper::get_css_value( $attr['bottomPaddingMobile'], $attr['mobilePaddingType'] ),
					'padding-left'   => UAGB_Helper::get_css_value( $attr['leftPaddingMobile'], $attr['mobilePaddingType'] ),
					'padding-right'  => UAGB_Helper::get_css_value( $attr['rightPaddingMobile'], $attr['mobilePaddingType'] ),
					'margin-top'    => UAGB_Helper::get_css_value( $attr['topMarginMobile'], $attr['mobileMarginType'] ),
					'margin-bottom' => UAGB_Helper::get_css_value( $attr['bottomMarginMobile'], $attr['mobileMarginType'] ),
					'margin-left'    => UAGB_Helper::get_css_value( $attr['leftMarginMobile'], $attr['mobileMarginType'] ),
					'margin-right' => UAGB_Helper::get_css_value( $attr['rightMarginMobile'], $attr['mobileMarginType'] ),
				)
			);

			$t_selectors = array(
				'.uagb-column__wrap' => array(
					'padding-top'    => UAGB_Helper::get_css_value( $attr['topPaddingTablet'], $attr['tabletPaddingType'] ),
					'padding-bottom' => UAGB_Helper::get_css_value( $attr['bottomPaddingTablet'], $attr['tabletPaddingType'] ),
					'padding-left'   => UAGB_Helper::get_css_value( $attr['leftPaddingTablet'], $attr['tabletPaddingType'] ),
					'padding-right'  => UAGB_Helper::get_css_value( $attr['rightPaddingTablet'], $attr['tabletPaddingType'] ),
					'margin-top'    => UAGB_Helper::get_css_value( $attr['topMarginTablet'], $attr['tabletMarginType'] ),
					'margin-bottom' => UAGB_Helper::get_css_value( $attr['bottomMarginTablet'], $attr['tabletMarginType'] ),
					'margin-left'    => UAGB_Helper::get_css_value( $attr['leftMarginTablet'], $attr['tabletMarginType'] ),
					'margin-right' => UAGB_Helper::get_css_value( $attr['rightMarginTablet'], $attr['tabletMarginType'] ),
				)
			);

			if ( '' != $attr['colWidthTablet'] && 0 != $attr['colWidthTablet'] ) {

				$t_selectors['.uagb-column__wrap']["width"] = UAGB_Helper::get_css_value( $attr['colWidthTablet'], '%' );
			}

			if ( '' != $attr['colWidthMobile'] && 0 != $attr['colWidthMobile'] ) {

				$m_selectors['.uagb-column__wrap']["width"] = UAGB_Helper::get_css_value( $attr['colWidthMobile'], '%' );
			}

			// @codingStandardsIgnoreEnd

			$base_selector = ( $attr['classMigrate'] ) ? '.uagb-block-' : '#uagb-column-';

			$desktop = UAGB_Helper::generate_css( $selectors, $base_selector . $id );

			$tablet = UAGB_Helper::generate_css( $t_selectors, $base_selector . $id );

			$mobile = UAGB_Helper::generate_css( $m_selectors, $base_selector . $id );

			$generated_css = array(
				'desktop' => $desktop,
				'tablet'  => $tablet,
				'mobile'  => $mobile,
			);

			return $generated_css;
		}

		/**
		 * Get Advanced Heading Block CSS
		 *
		 * @since 0.0.1
		 * @param array  $attr The block attributes.
		 * @param string $id The selector ID.
		 * @return array The Widget List.
		 */
		public static function get_adv_heading_css( $attr, $id ) { 			// @codingStandardsIgnoreStart

			$defaults = UAGB_Helper::$block_list['uagb/advanced-heading']['attributes'];

			$attr = array_merge( $defaults, (array) $attr );

			$m_selectors = array();
			$t_selectors = array();

			$selectors = array(
				' .uagb-heading-text'        => array(
					'text-align' => $attr['headingAlign'],
					'font-family' => $attr['headFontFamily'],
					'font-weight' => $attr['headFontWeight'],
					'font-size' => UAGB_Helper::get_css_value( $attr['headFontSize'], $attr['headFontSizeType'] ),
					'line-height' => UAGB_Helper::get_css_value( $attr['headLineHeight'], $attr['headLineHeightType'] ),
					'color' => $attr['headingColor'],
					'margin-bottom' => UAGB_Helper::get_css_value( $attr['headSpace'], "px" ),
				),
				' .uagb-separator-wrap' => array(
					'text-align' => $attr['headingAlign'],
				),
				' .uagb-desc-text' => array(
					'text-align' => $attr['headingAlign'],
					'font-family' => $attr['subHeadFontFamily'],
					'font-weight' => $attr['subHeadFontWeight'],
					'font-size' => UAGB_Helper::get_css_value( $attr['subHeadFontSize'], $attr['subHeadFontSizeType'] ),
					'line-height' => UAGB_Helper::get_css_value( $attr['subHeadLineHeight'], $attr['subHeadLineHeightType'] ),
					'color' => $attr['subHeadingColor'],
				)

			);

			$m_selectors = array(
				' .uagb-heading-text'        => array(
					'font-size' => UAGB_Helper::get_css_value( $attr['headFontSizeMobile'], $attr['headFontSizeType'] ),
					'line-height' => UAGB_Helper::get_css_value( $attr['headLineHeightMobile'], $attr['headLineHeightType'] ),
				),
				' .uagb-desc-text' => array(
					'font-size' => UAGB_Helper::get_css_value( $attr['subHeadFontSizeMobile'], $attr['subHeadFontSizeType'] ),
					'line-height' => UAGB_Helper::get_css_value( $attr['subHeadLineHeightMobile'], $attr['subHeadLineHeightType'] ),
				)

			);

			$t_selectors = array(
				' .uagb-heading-text'        => array(
					'font-size' => UAGB_Helper::get_css_value( $attr['headFontSizeTablet'], $attr['headFontSizeType'] ),
					'line-height' => UAGB_Helper::get_css_value( $attr['headLineHeightTablet'], $attr['headLineHeightType'] ),

				),
				' .uagb-desc-text' => array(
					'font-size' => UAGB_Helper::get_css_value( $attr['subHeadFontSizeTablet'], $attr['subHeadFontSizeType'] ),
					'line-height' => UAGB_Helper::get_css_value( $attr['subHeadLineHeightTablet'], $attr['subHeadLineHeightType'] ),
				)

			);

			$seperatorStyle = isset( $attr['seperatorStyle'] ) ? $attr['seperatorStyle'] : '';

			if( 'none' !== $seperatorStyle ){
				$selectors[' .uagb-separator'] = array (
					'border-top-style' => $attr['seperatorStyle'] ,
					'border-top-width' => UAGB_Helper::get_css_value( $attr['separatorHeight'], "px" ),
					'width' => UAGB_Helper::get_css_value( $attr['separatorWidth'], $attr['separatorWidthType'] ),
					'border-color' => $attr['separatorColor'],
					'margin-bottom' => UAGB_Helper::get_css_value( $attr['separatorSpace'], "px" ),
				);

			}
			// @codingStandardsIgnoreEnd

			$base_selector = ( $attr['classMigrate'] ) ? '.uagb-block-' : '#uagb-adv-heading-';

			$desktop = UAGB_Helper::generate_css( $selectors, $base_selector . $id );

			$tablet = UAGB_Helper::generate_css( $t_selectors, $base_selector . $id );

			$mobile = UAGB_Helper::generate_css( $m_selectors, $base_selector . $id );

			$generated_css = array(
				'desktop' => $desktop,
				'tablet'  => $tablet,
				'mobile'  => $mobile,
			);

			return $generated_css;
		}

		/**
		 * Get Multi Buttons Block CSS
		 *
		 * @since 0.0.1
		 * @param array  $attr The block attributes.
		 * @param string $id The selector ID.
		 * @return array The Widget List.
		 */
		public static function get_buttons_css( $attr, $id ) { 			// @codingStandardsIgnoreStart

			$defaults = UAGB_Helper::$block_list['uagb/buttons']['attributes'];

			$attr = array_merge( $defaults, (array) $attr );

			$m_selectors = array();
			$t_selectors = array();

			$selectors = array(
				' .uagb-button__wrapper' => array(
					'margin-left' => UAGB_Helper::get_css_value( ( $attr['gap']/2 ), 'px' ),
					'margin-right' => UAGB_Helper::get_css_value( ( $attr['gap']/2 ), 'px' )
				),
			);

			if ( "desktop" == $attr['stack'] ) {

				$selectors[" .uagb-button__wrapper"] = array (
					'margin-left' => 0,
					'margin-right' => 0,
					"margin-bottom" => UAGB_Helper::get_css_value( $attr['gap'], 'px' )
				);
				
				if ( $attr['childMigrate'] ) {
					$selectors[" .uagb-buttons-layout-wrap"] = array (
						"flex-direction" => "column"
					);
				} else {
					$selectors[" .uagb-buttons__wrap"] = array (
						"flex-direction" => "column"
					);
				}
				
			} else if ( "tablet" == $attr['stack'] ) {
			
				$t_selectors[" .uagb-button__wrapper"] = array (
					'margin-left' => 0,
					'margin-right' => 0,
					"margin-bottom" => UAGB_Helper::get_css_value( $attr['gap'], 'px' )
				);
			
				if ( $attr['childMigrate'] ) {
					$t_selectors[" .uagb-buttons-layout-wrap"] = array (
						"flex-direction" => "column"
					);
				} else {
					$t_selectors[" .uagb-buttons__wrap"] = array (
						"flex-direction" => "column"
					);
				}
			
			} else if ( "mobile" == $attr['stack'] ) {
			
				$m_selectors[" .uagb-button__wrapper"] = array (
					'margin-left' => 0,
					'margin-right' => 0,
					"margin-bottom" => UAGB_Helper::get_css_value( $attr['gap'], 'px' )
				);
				
				if ( $attr['childMigrate'] ) {
					$m_selectors[" .uagb-buttons-layout-wrap"] = array (
						"flex-direction" => "column"
					);
				} else {
					$m_selectors[" .uagb-buttons__wrap"] = array (
						"flex-direction" => "column"
					);
				}
			}
			$alignment = ( $attr['align'] == 'left' ) ? 'flex-start' : ( ( $attr['align'] == 'right' ) ? 'flex-end' : 'center' );

			if( 'full' === $attr['align'] ) {
				$selectors[' .uagb-buttons__wrap'] = array (
					'justify-content' => 'space-between',
				);
				$selectors[' .uagb-button__link'] = array(
					'text-align' => 'center'
				);
				$selectors[' .wp-block-uagb-buttons-child'] = array(
					'width' => '100%'
				);
				$selectors[' .uagb-buttons__outer-wrap:first-child .uagb-button__wrapper'] = array(
					'margin-left' => 0
				);
				$selectors[' .uagb-buttons__outer-wrap:last-child .uagb-button__wrapper'] = array(
					'margin-right' => 0
				);
			} else {
				$selectors['.uagb-buttons__outer-wrap .uagb-buttons__wrap'] = array (
					'justify-content' => $alignment,
					'-webkit-box-pack'=> $alignment,
					'-ms-flex-pack' => $alignment,
					'justify-content' => $alignment,
					'-webkit-box-align' => $alignment,
					'-ms-flex-align' => $alignment,
					'align-items' => $alignment,
				);
				if ( $attr['align'] === 'left' ) {
					$selectors[' .uagb-buttons__outer-wrap:first-child .uagb-button__wrapper'] = array(
						'margin-left' => 0
					);
				}

				if ( $attr['align'] === 'right' ) {
					$selectors[' .uagb-buttons__outer-wrap:last-child .uagb-button__wrapper'] = array(
						'margin-right' => 0
					);
				}
			}
			if ( $attr['childMigrate'] ) {
					$selectors[' .uagb-buttons-repeater'] = array (
					'font-family'   => $attr['fontFamily'],
					'font-weight'   => $attr['fontWeight'],
					);
			}

			if ( ! $attr['childMigrate'] ) {
				
				foreach ( $attr['buttons'] as $key => $button ) {

					if ( $attr['btn_count'] <= $key ) {
						break;
					}

					$wrapper = ( ! $attr['childMigrate'] ) ? " .uagb-buttons-repeater-" . $key . '.uagb-button__wrapper' : " .uagb-buttons-repeater";
				
					$selectors[$wrapper] = array (
					'font-family'   => $attr['fontFamily'],
					'font-weight'   => $attr['fontWeight'],
					);
				
					$child_selectors = self::get_buttons_child_selectors( $button, $key, $attr['childMigrate'] );
					$selectors = array_merge( $selectors, (array) $child_selectors['selectors'] );
					$t_selectors = array_merge( $t_selectors, (array) $child_selectors['t_selectors'] );
					$m_selectors = array_merge( $m_selectors, (array) $child_selectors['m_selectors'] );
				}
			}

			// @codingStandardsIgnoreEnd

			$base_selector = ( $attr['classMigrate'] ) ? '.uagb-block-' : '#uagb-buttons-';

			$desktop = UAGB_Helper::generate_css( $selectors, $base_selector . $id );

			$tablet = UAGB_Helper::generate_css( $t_selectors, $base_selector . $id );

			$mobile = UAGB_Helper::generate_css( $m_selectors, $base_selector . $id );

			$generated_css = array(
				'desktop' => $desktop,
				'tablet'  => $tablet,
				'mobile'  => $mobile,
			);

			return $generated_css;
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

			$attr          = array_merge( $defaults, (array) $attr );
			$all_selectors = self::get_buttons_child_selectors( $attr, $id, true );
			$base_selector = ( $attr['classMigrate'] ) ? '.uagb-block-' : '#uagb-buttons-';

			$desktop = UAGB_Helper::generate_css( $all_selectors['selectors'], $base_selector . $id );

			$tablet = UAGB_Helper::generate_css( $all_selectors['t_selectors'], $base_selector . $id );

			$mobile = UAGB_Helper::generate_css( $all_selectors['m_selectors'], $base_selector . $id );

			$generated_css = array(
				'desktop' => $desktop,
				'tablet'  => $tablet,
				'mobile'  => $mobile,
			);

			return $generated_css;
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

			$wrapper = ( ! $child_migrate ) ? ' .uagb-buttons-repeater-' . $id : ' .uagb-buttons-repeater';

			$m_selectors = array();
			$t_selectors = array();

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
			);

			$selectors[ $wrapper . ':hover' ] = array(
				'background'   => $attr['hBackground'],
				'border-width' => UAGB_Helper::get_css_value( $attr['borderWidth'], 'px' ),
				'border-color' => $attr['borderHColor'],
				'border-style' => $attr['borderStyle'],
			);

			$selectors[ $wrapper . ' a.uagb-button__link' ] = array(
				'padding' => UAGB_Helper::get_css_value( $attr['vPadding'], 'px' ) . ' ' . UAGB_Helper::get_css_value( $attr['hPadding'], 'px' ),
				'color'   => $attr['color'],
			);

			$selectors[ $wrapper . ':hover a.uagb-button__link' ] = array(
				'color' => $attr['hColor'],
			);

			$m_selectors[ $wrapper ] = array(
				'font-size'   => UAGB_Helper::get_css_value( $attr['sizeMobile'], $attr['sizeType'] ),
				'line-height' => UAGB_Helper::get_css_value( $attr['lineHeightMobile'], $attr['lineHeightType'] ),
			);

			$t_selectors[ $wrapper ] = array(
				'font-size'   => UAGB_Helper::get_css_value( $attr['sizeTablet'], $attr['sizeType'] ),
				'line-height' => UAGB_Helper::get_css_value( $attr['lineHeightTablet'], $attr['lineHeightType'] ),
			);

			$all_selectors = array(

				'selectors'   => $selectors,
				'm_selectors' => $m_selectors,
				't_selectors' => $t_selectors,
			);

			return $all_selectors;

		}
		/**
		 * Get Info Box CSS
		 *
		 * @since 0.0.1
		 * @param array  $attr The block attributes.
		 * @param string $id The selector ID.
		 * @return array The Widget List.
		 */
		public static function get_info_box_css( $attr, $id ) { 			// @codingStandardsIgnoreStart.
			$defaults = UAGB_Helper::$block_list['uagb/info-box']['attributes'];

			$attr = array_merge( $defaults, (array) $attr );

			$m_selectors = array();
			$t_selectors = array();

			$selectors = array(
				' .uagb-ifb-icon'  => array(
					'height'      => UAGB_Helper::get_css_value( $attr['iconSize'], 'px' ),
					'width'       => UAGB_Helper::get_css_value( $attr['iconSize'], 'px' ),
					'line-height' => UAGB_Helper::get_css_value( $attr['iconSize'], 'px' ),
				),
				' .uagb-ifb-icon > span' => array(
					'font-size'   => UAGB_Helper::get_css_value( $attr['iconSize'], 'px' ),
					'height'      => UAGB_Helper::get_css_value( $attr['iconSize'], 'px' ),
					'width'       => UAGB_Helper::get_css_value( $attr['iconSize'], 'px' ),
					'line-height' => UAGB_Helper::get_css_value( $attr['iconSize'], 'px' ),
					'color'       => $attr['iconColor'],
				),
				' .uagb-ifb-icon svg' => array(
					'fill'       => $attr['iconColor'],
				),
				' .uagb-ifb-icon:hover > span' => array(
					'color' => $attr['iconHover'] ,
				),
				' .uagb-ifb-icon:hover svg' => array(
					'fill' => $attr['iconHover'] ,
				),

				' .uagb-infbox__link-to-all:hover ~ .uagb-infobox__content-wrap .uagb-ifb-icon svg' => array(
					'fill' => $attr['iconHover'] ,
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
				// CTA style .
				' .uagb-infobox-cta-link' => array(
					'font-size'   => $attr['ctaFontSize'].$attr['ctaFontSizeType'],
					'font-family' => $attr['ctaFontFamily'],
					'font-weight' => $attr['ctaFontWeight'],
					'color'       => $attr['ctaLinkColor'],
				),
				' .uagb-infobox-cta-link:hover' => array(
					'color'       => $attr['ctaLinkHoverColor'],
				),
				' .uagb-infobox-cta-link .uagb-ifb-button-icon' => array(
					'font-size'   => UAGB_Helper::get_css_value( $attr['ctaFontSize'], $attr['ctaFontSizeType'] ),
					'height'      => UAGB_Helper::get_css_value( $attr['ctaFontSize'], $attr['ctaFontSizeType'] ),
					'width'       => UAGB_Helper::get_css_value( $attr['ctaFontSize'], $attr['ctaFontSizeType'] ),
					'line-height' => UAGB_Helper::get_css_value( $attr['ctaFontSize'], $attr['ctaFontSizeType'] ),
				),
				' .uagb-infobox-cta-link .uagb-ifb-text-icon' => array(
					'font-size'   => UAGB_Helper::get_css_value( $attr['ctaFontSize'], $attr['ctaFontSizeType'] ),
					'height'      => UAGB_Helper::get_css_value( $attr['ctaFontSize'], $attr['ctaFontSizeType'] ),
					'width'       => UAGB_Helper::get_css_value( $attr['ctaFontSize'], $attr['ctaFontSizeType'] ),
					'line-height' => UAGB_Helper::get_css_value( $attr['ctaFontSize'], $attr['ctaFontSizeType'] ),
				),
				' .uagb-infobox-cta-link svg' => array(
					'fill'        => $attr['ctaLinkColor'],
				),
				' .uagb-infobox-cta-link:hover svg' => array(
					'fill'       => $attr['ctaLinkHoverColor'],
				),
				' .uagb-ifb-button-wrapper .uagb-infobox-cta-link' => array(
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

				),
				' .uagb-ifb-button-wrapper .uagb-infobox-cta-link svg' => array(
					'fill'            => $attr['ctaBtnLinkColor'],
				),
				' .uagb-ifb-button-wrapper .uagb-infobox-cta-link:hover' => array(
					'color'       => $attr['ctaLinkHoverColor'],
					'background-color' => $attr['ctaBgHoverColor'],
					'border-color'     => $attr['ctaBorderhoverColor'],
				),
				' .uagb-ifb-button-wrapper .uagb-infobox-cta-link:hover svg' => array(
					'fill'       => $attr['ctaLinkHoverColor'],
				),
				// Prefix Style.
				' .uagb-ifb-title-prefix' => array(
					'font-size'     => UAGB_Helper::get_css_value( $attr['prefixFontSize'], $attr['prefixFontSizeType'] ),
					'font-family' => $attr['prefixFontFamily'],
					'font-weight' => $attr['prefixFontWeight'],
					'line-height' => UAGB_Helper::get_css_value( $attr['prefixLineHeight'], $attr['prefixLineHeightType'] ),
					'color'         => $attr['prefixColor'],
					'margin-bottom' => UAGB_Helper::get_css_value( $attr['prefixSpace'], 'px' ),
				),
				// Title Style.
				' .uagb-ifb-title' => array(
					'font-size'     => UAGB_Helper::get_css_value( $attr['headFontSize'], $attr['headFontSizeType'] ),
					'font-family' => $attr['headFontFamily'],
					'font-weight' => $attr['headFontWeight'],
					'line-height' => UAGB_Helper::get_css_value( $attr['headLineHeight'], $attr['headLineHeightType'] ),
					'color'         => $attr['headingColor'],
					'margin-bottom' => $attr['headSpace'] . 'px',
				),
				// Description Style.
				' .uagb-ifb-desc' => array(
					'font-size'     => UAGB_Helper::get_css_value( $attr['subHeadFontSize'], $attr['subHeadFontSizeType'] ) ,
					'font-family' => $attr['subHeadFontFamily'],
					'font-weight' => $attr['subHeadFontWeight'],
					'line-height' => UAGB_Helper::get_css_value( $attr['subHeadLineHeight'], $attr['subHeadLineHeightType'] ),
					'color'         => $attr['subHeadingColor'],
					'margin-bottom' => UAGB_Helper::get_css_value( $attr['subHeadSpace'], 'px' ),
				),
				// Seperator.
				' .uagb-ifb-separator' => array(
					'width'            => UAGB_Helper::get_css_value( $attr['seperatorWidth'], $attr['separatorWidthType'] ),
					'border-top-width' => UAGB_Helper::get_css_value( $attr['seperatorThickness'], 'px' ),
					'border-top-color' => $attr['seperatorColor'],
					'border-top-style' => $attr['seperatorStyle'],
				),
				' .uagb-ifb-separator-parent' => array(
					'margin-bottom' => UAGB_Helper::get_css_value( $attr['seperatorSpace'], 'px' ),
				),
				// CTA icon space.
				' .uagb-ifb-align-icon-after' => array(
					'margin-left' => UAGB_Helper::get_css_value( $attr['ctaIconSpace'], 'px' ),
				),
				' .uagb-ifb-align-icon-before' => array(
					'margin-right' => UAGB_Helper::get_css_value( $attr['ctaIconSpace'], 'px' ),
				),
			);

			if ( $attr['imageWidthType'] ) {
				// Image.
				$selectors[' .uagb-ifb-image-content > img'] = array(
					'width'=> UAGB_Helper::get_css_value( $attr['imageWidth'], 'px' ),
				    'max-width'=> UAGB_Helper::get_css_value( $attr['imageWidth'], 'px' ),
				);
			}

			if( 'above-title' === $attr['iconimgPosition'] ||  'below-title' === $attr['iconimgPosition'] ){
				$selectors[' .uagb-infobox__content-wrap'] = array(
					'text-align' => $attr['headingAlign'],
				);
			}

			$m_selectors = array(
				' .uagb-ifb-title-prefix' => array(
					'font-size'     => UAGB_Helper::get_css_value( $attr['prefixFontSizeMobile'], $attr['prefixFontSizeType'] ),
					'line-height' => UAGB_Helper::get_css_value( $attr['prefixLineHeightMobile'], $attr['prefixLineHeightType'] ),
				),
				' .uagb-ifb-title'        => array(
					'font-size' => UAGB_Helper::get_css_value( $attr['headFontSizeMobile'], $attr['headFontSizeType'] ),
					'line-height' => UAGB_Helper::get_css_value( $attr['headLineHeightMobile'], $attr['headLineHeightType'] ),
				),
				' .uagb-ifb-desc' => array(
					'font-size' => UAGB_Helper::get_css_value( $attr['subHeadFontSizeMobile'], $attr['subHeadFontSizeType'] ),
					'line-height' => UAGB_Helper::get_css_value( $attr['subHeadLineHeightMobile'], $attr['subHeadLineHeightType'] ),
				),
				' .uagb-infobox-cta-link' => array(
					'font-size' => UAGB_Helper::get_css_value( $attr['ctaFontSizeMobile'], $attr['ctaFontSizeType'] ),
				),
				' .uagb-infobox-cta-link .uagb-ifb-button-icon' => array(
					'font-size'   => UAGB_Helper::get_css_value( $attr['ctaFontSizeMobile'], $attr['ctaFontSizeType'] ),
					'height'      => UAGB_Helper::get_css_value( $attr['ctaFontSizeMobile'], $attr['ctaFontSizeType'] ),
					'width'       => UAGB_Helper::get_css_value( $attr['ctaFontSizeMobile'], $attr['ctaFontSizeType'] ),
					'line-height' => UAGB_Helper::get_css_value( $attr['ctaFontSizeMobile'], $attr['ctaFontSizeType'] ),
				),
				' .uagb-infobox-cta-link .uagb-ifb-text-icon' => array(
					'font-size'   => UAGB_Helper::get_css_value( $attr['ctaFontSizeMobile'], $attr['ctaFontSizeType'] ),
					'height'      => UAGB_Helper::get_css_value( $attr['ctaFontSizeMobile'], $attr['ctaFontSizeType'] ),
					'width'       => UAGB_Helper::get_css_value( $attr['ctaFontSizeMobile'], $attr['ctaFontSizeType'] ),
					'line-height' => UAGB_Helper::get_css_value( $attr['ctaFontSizeMobile'], $attr['ctaFontSizeType'] ),
				),
			);

			$t_selectors = array(
				' .uagb-ifb-title-prefix' => array(
					'font-size'     => UAGB_Helper::get_css_value( $attr['prefixFontSizeTablet'], $attr['prefixFontSizeType'] ),
				),
				' .uagb-ifb-title'        => array(
					'font-size' => UAGB_Helper::get_css_value( $attr['headFontSizeTablet'], $attr['headFontSizeType'] ),
				),
				' .uagb-ifb-desc' => array(
					'font-size' => UAGB_Helper::get_css_value( $attr['subHeadFontSizeTablet'], $attr['subHeadFontSizeType'] ),
				),
				' .uagb-infobox-cta-link' => array(
					'font-size' => UAGB_Helper::get_css_value( $attr['ctaFontSizeTablet'], $attr['ctaFontSizeType'] ),
				),
				' .uagb-infobox-cta-link .uagb-ifb-button-icon' => array(
					'font-size'   => UAGB_Helper::get_css_value( $attr['ctaFontSizeTablet'], $attr['ctaFontSizeType'] ),
					'height'      => UAGB_Helper::get_css_value( $attr['ctaFontSizeTablet'], $attr['ctaFontSizeType'] ),
					'width'       => UAGB_Helper::get_css_value( $attr['ctaFontSizeTablet'], $attr['ctaFontSizeType'] ),
					'line-height' => UAGB_Helper::get_css_value( $attr['ctaFontSizeTablet'], $attr['ctaFontSizeType'] ),
				),
				' .uagb-infobox-cta-link .uagb-ifb-text-icon' => array(
					'font-size'   => UAGB_Helper::get_css_value( $attr['ctaFontSizeTablet'], $attr['ctaFontSizeType'] ),
					'height'      => UAGB_Helper::get_css_value( $attr['ctaFontSizeTablet'], $attr['ctaFontSizeType'] ),
					'width'       => UAGB_Helper::get_css_value( $attr['ctaFontSizeTablet'], $attr['ctaFontSizeType'] ),
					'line-height' => UAGB_Helper::get_css_value( $attr['ctaFontSizeTablet'], $attr['ctaFontSizeType'] ),
				),
			);

			// @codingStandardsIgnoreEnd.

			$base_selector = ( $attr['classMigrate'] ) ? '.uagb-block-' : '#uagb-infobox-';

			$desktop = UAGB_Helper::generate_css( $selectors, $base_selector . $id );

			$tablet = UAGB_Helper::generate_css( $t_selectors, $base_selector . $id );

			$mobile = UAGB_Helper::generate_css( $m_selectors, $base_selector . $id );

			$generated_css = array(
				'desktop' => $desktop,
				'tablet'  => $tablet,
				'mobile'  => $mobile,
			);

			return $generated_css;
		}

		/**
		 * Get CTA CSS
		 *
		 * @since 1.7.0
		 * @param array  $attr The block attributes.
		 * @param string $id The selector ID.
		 * @return array The Widget List.
		 */
		public static function get_call_to_action_css( $attr, $id ) { 			// @codingStandardsIgnoreStart.
			$defaults = UAGB_Helper::$block_list['uagb/call-to-action']['attributes'];

			$attr = array_merge( $defaults, (array) $attr );

			$t_selectors = array();
			$m_selectors = array();

			$selectors = array(
				' .uagb-cta__button-wrapper a.uagb-cta-typeof-text'  => array(
					'font-size'   => UAGB_Helper::get_css_value( $attr['ctaFontSize'], $attr['ctaFontSizeType'] ),
					'font-family' => $attr['ctaFontFamily'],
					'font-weight' => $attr['ctaFontWeight'],
					'color'       => $attr['ctaBtnLinkColor'],
				),
				' .uagb-cta__button-wrapper:hover a.uagb-cta-typeof-text '  => array(
					'color'       => $attr['ctaLinkHoverColor'],
				),
				' .uagb-cta__button-wrapper a.uagb-cta-typeof-button'  => array(
					'font-size'        => $attr['ctaFontSize']. $attr['ctaFontSizeType'],
					'font-family'      => $attr['ctaFontFamily'],
					'font-weight'      => $attr['ctaFontWeight'],
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
				),
				' .uagb-cta__button-wrapper:hover a.uagb-cta-typeof-button'  => array(
					'color'            => $attr['ctaLinkHoverColor'],
					'background-color' => $attr['ctaBgHoverColor'],
					'border-color'     => $attr['ctaBorderhoverColor'],
				),
				' .uagb-cta__button-wrapper .uagb-cta-with-svg'  => array(
					'font-size'   => UAGB_Helper::get_css_value( $attr['ctaFontSize'], $attr['ctaFontSizeType'] ),
					'width'       => UAGB_Helper::get_css_value( $attr['ctaFontSize'], $attr['ctaFontSizeType'] ),
					'height'      => UAGB_Helper::get_css_value( $attr['ctaFontSize'], $attr['ctaFontSizeType'] ),
					'line-height' => UAGB_Helper::get_css_value( $attr['ctaFontSize'], $attr['ctaFontSizeType'] ),
				),
				' .uagb-cta__button-wrapper .uagb-cta__block-link svg'  => array(
					'fill'   => $attr['ctaBtnLinkColor'],
				),
				' .uagb-cta__button-wrapper:hover .uagb-cta__block-link svg'  => array(
					'fill'   => $attr['ctaLinkHoverColor'],
				),
				' .uagb-cta__title'  => array(
					'font-size'     => UAGB_Helper::get_css_value( $attr['titleFontSize'], $attr['titleFontSizeType'] ),
					'font-family'   => $attr['titleFontFamily'],
					'font-weight'   => $attr['titleFontWeight'],
					'line-height'   => UAGB_Helper::get_css_value( $attr['titleLineHeight'], $attr['titleLineHeightType'] ),
					'color'         => $attr['titleColor'],
					'margin-bottom' => $attr['titleSpace']. "px",
				),
				' .uagb-cta__desc'  => array(
					'font-size'     => UAGB_Helper::get_css_value( $attr['descFontSize'], $attr['descFontSizeType'] ),
					'font-family'   => $attr['descFontFamily'],
					'font-weight'   => $attr['descFontWeight'],
					'line-height'   => UAGB_Helper::get_css_value( $attr['descLineHeight'], $attr['descLineHeightType'] ),
					'color'         => $attr['descColor'],
					'margin-bottom' => UAGB_Helper::get_css_value( $attr['descSpace'], 'px' ),
				),
				' .uagb-cta__align-button-after'  => array(
					'margin-left'    => UAGB_Helper::get_css_value( $attr['ctaIconSpace'], 'px' ),
				),
				' .uagb-cta__align-button-before'  => array(
					'margin-right'   => UAGB_Helper::get_css_value( $attr['ctaIconSpace'], 'px' ),
				),
			);

			$selectors[' .uagb-cta__content-wrap'] = array(
                'text-align' => $attr['textAlign'],
            );

            if( 'left' === $attr['textAlign'] && "right" === $attr['ctaPosition'] ){
	            $selectors[' .uagb-cta__left-right-wrap .uagb-cta__content'] = array(
	                'margin-left'  => UAGB_Helper::get_css_value( $attr['ctaLeftSpace'], 'px' ),
	                'margin-right' => '0',
	            );
            }

            if( 'right' === $attr['textAlign'] && 'right' === $attr['ctaPosition'] ){
	            $selectors[' .uagb-cta__left-right-wrap .uagb-cta__content'] = array(
	                'margin-right' => UAGB_Helper::get_css_value( $attr['ctaRightSpace'], 'px' ),
	                'margin-left' => '0',
	            );
            }

            if( $attr['ctaPosition'] === "right" && ( $attr['ctaType'] === 'text' || $attr['ctaType'] === 'button' ) ){
				$selectors[" .uagb-cta__content-right .uagb-cta__left-right-wrap .uagb-cta__content"] = array(
					"width" => UAGB_Helper::get_css_value( $attr['contentWidth'], '%' ),
				);

				$selectors[" .uagb-cta__content-right .uagb-cta__left-right-wrap .uagb-cta__link-wrapper"] = array(
					"width" => UAGB_Helper::get_css_value( (100 - $attr['contentWidth'] ), '%' ),
				);
			}

			$t_selectors = array(
				' .uagb-cta__button-wrapper a.uagb-cta-typeof-text'  => array(
					'font-size'   => UAGB_Helper::get_css_value( $attr['ctaFontSizeTablet'], $attr['ctaFontSizeType'] ),
				),
				' .uagb-cta__button-wrapper a.uagb-cta-typeof-button'  => array(
					'font-size'        => UAGB_Helper::get_css_value( $attr['ctaFontSizeTablet'], $attr['ctaFontSizeType'] ),
				),
				' .uagb-cta__button-wrapper .uagb-cta-with-svg'  => array(
					'font-size'   => UAGB_Helper::get_css_value( $attr['ctaFontSizeTablet'], $attr['ctaFontSizeType'] ),
					'width'       => UAGB_Helper::get_css_value( $attr['ctaFontSizeTablet'], $attr['ctaFontSizeType'] ),
					'height'      => UAGB_Helper::get_css_value( $attr['ctaFontSizeTablet'], $attr['ctaFontSizeType'] ),
					'line-height' => UAGB_Helper::get_css_value( $attr['ctaFontSizeTablet'], $attr['ctaFontSizeType'] ),
				),
				' .uagb-cta__title'  => array(
					'font-size'        => UAGB_Helper::get_css_value( $attr['titleFontSizeTablet'], $attr['titleFontSizeType'] ),
					'line-height' => UAGB_Helper::get_css_value( $attr['titleLineHeightTablet'], $attr['titleLineHeightType'] ),
				),
				' .uagb-cta__desc'  => array(
					'font-size'        => UAGB_Helper::get_css_value( $attr['descFontSizeTablet'], $attr['descFontSizeType'] ),
					'line-height' => UAGB_Helper::get_css_value( $attr['descLineHeightTablet'], $attr['descLineHeightType'] ),
				),
			);

			$m_selectors = array(
				' .uagb-cta__button-wrapper a.uagb-cta-typeof-text'  => array(
					'font-size'   => UAGB_Helper::get_css_value( $attr['ctaFontSizeMobile'],$attr['ctaFontSizeType'] ),
				),
				' .uagb-cta__button-wrapper a.uagb-cta-typeof-button'  => array(
					'font-size'        => UAGB_Helper::get_css_value( $attr['ctaFontSizeMobile'],$attr['ctaFontSizeType'] ),
				),
				' .uagb-cta__button-wrapper .uagb-cta-with-svg'  => array(
					'font-size'   => UAGB_Helper::get_css_value( $attr['ctaFontSizeMobile'],$attr['ctaFontSizeType'] ),
					'width'       => UAGB_Helper::get_css_value( $attr['ctaFontSizeMobile'],$attr['ctaFontSizeType'] ),
					'height'      => UAGB_Helper::get_css_value( $attr['ctaFontSizeMobile'],$attr['ctaFontSizeType'] ),
					'line-height' => UAGB_Helper::get_css_value( $attr['ctaFontSizeMobile'],$attr['ctaFontSizeType'] ),
				),
				' .uagb-cta__title'  => array(
					'font-size'        => UAGB_Helper::get_css_value( $attr['titleFontSizeMobile'],$attr['titleFontSizeType'] ),
					'line-height' => UAGB_Helper::get_css_value( $attr['titleLineHeightMobile'],$attr['titleLineHeightType'] ),
				),
				' .uagb-cta__desc'  => array(
					'font-size'        => UAGB_Helper::get_css_value( $attr['descFontSizeMobile'],$attr['descFontSizeType'] ),
					'line-height' => UAGB_Helper::get_css_value( $attr['descLineHeightMobile'], $attr['descLineHeightType'] ),
				),
			);

			// @codingStandardsIgnoreEnd.

			$base_selector = ( $attr['classMigrate'] ) ? '.uagb-block-' : '#uagb-cta-block-';
			$desktop       = UAGB_Helper::generate_css( $selectors, $base_selector . $id );
			$tablet        = UAGB_Helper::generate_css( $t_selectors, $base_selector . $id );
			$mobile        = UAGB_Helper::generate_css( $m_selectors, $base_selector . $id );

			$generated_css = array(
				'desktop' => $desktop,
				'tablet'  => $tablet,
				'mobile'  => $mobile,
			);

			return $generated_css;
		}

		/**
		 * Get Testimonial CSS
		 *
		 * @since 0.0.1
		 * @param array  $attr The block attributes.
		 * @param string $id The selector ID.
		 * @return array The Widget List.
		 */
		public static function get_testimonial_css( $attr, $id ) { 			// @codingStandardsIgnoreStart.

			$defaults = UAGB_Helper::$block_list['uagb/testimonial']['attributes'];

			$attr = array_merge( $defaults, (array) $attr );

			$img_align = 'center';
			if( 'left' === $attr['headingAlign']){
				$img_align = 'flex-start';
			}else if( 'right' === $attr['headingAlign']){
				$img_align = 'flex-end';
			}

			$position = str_replace( '-', ' ', $attr['backgroundPosition'] );

			$selectors = array(
				' .uagb-testimonial__wrap' => array(
					'padding-left'   => UAGB_Helper::get_css_value( ( ($attr['columnGap']) /2 ), 'px' ),
					'padding-right'  => UAGB_Helper::get_css_value( ( ($attr['columnGap']) /2 ), 'px' ),
					'margin-bottom' => UAGB_Helper::get_css_value( $attr['rowGap'], 'px' ),
				),
				' .uagb-testimonial__wrap .uagb-tm__image-content' => array(
					'padding-left'   => UAGB_Helper::get_css_value( $attr['imgHrPadding'], 'px' ),
					'padding-right'  => UAGB_Helper::get_css_value( $attr['imgHrPadding'], 'px' ),
					'padding-top'   => UAGB_Helper::get_css_value( $attr['imgVrPadding'], 'px' ),
					'padding-bottom'  => UAGB_Helper::get_css_value( $attr['imgVrPadding'], 'px' ),
				),
				' .uagb-tm__image img' => array(
					'width'   => UAGB_Helper::get_css_value( $attr['imageWidth'], 'px' ),
					'max-width'  => UAGB_Helper::get_css_value( $attr['imageWidth'], 'px' ),
				),
				' .uagb-tm__content' => array(
					'text-align'   => $attr['headingAlign'],
					'padding'  => UAGB_Helper::get_css_value( $attr['contentPadding'], 'px' ),
				),
				' .uagb-tm__author-name' => array(
					'color'         => $attr['authorColor'],
					'font-size'     => $attr['nameFontSize'] . $attr['nameFontSizeType'],
					'font-family'   => $attr['nameFontFamily'],
					'font-weight'   => $attr['nameFontWeight'],
					'line-height'   => $attr['nameLineHeight'] . $attr['nameLineHeightType'],
					'margin-bottom' => $attr['nameSpace'] . 'px',
				),
				' .uagb-tm__company' => array(
					'color'       => $attr['companyColor'],
					'font-size'   => UAGB_Helper::get_css_value( $attr['companyFontSize'], $attr['companyFontSizeType'] ),
					'font-family' => $attr['companyFontFamily'],
					'font-weight' => $attr['companyFontWeight'],
					'line-height' => UAGB_Helper::get_css_value( $attr['companyLineHeight'], $attr['companyLineHeightType'] ),
				),
				' .uagb-tm__desc' => array(
					'color'         => $attr['descColor'],
					'font-size'     => UAGB_Helper::get_css_value( $attr['descFontSize'], $attr['descFontSizeType'] ),
					'font-family'   => $attr['descFontFamily'],
					'font-weight'   => $attr['descFontWeight'],
					'line-height'   => UAGB_Helper::get_css_value( $attr['descLineHeight'], $attr['descLineHeightType'] ),
					'margin-bottom' => UAGB_Helper::get_css_value( $attr['descSpace'], 'px' ),
				),
				' .uagb-testimonial__wrap.uagb-tm__bg-type-color .uagb-tm__content' => array(
					'background-color'   => $attr['backgroundColor'],
				),
				' .uagb-testimonial__wrap.uagb-tm__bg-type-image .uagb-tm__content' => array(
					'background-image'   => ( isset( $attr['backgroundImage']['url'] ) && isset( $attr['backgroundImage']['url'] ) ) ? 'url("'.$attr['backgroundImage']['url'].'")' : null,
					'background-position'=> $position,
					'background-repeat'=> $attr['backgroundRepeat'],
					'background-size'=> $attr['backgroundSize'],
				),
				' .uagb-testimonial__wrap.uagb-tm__bg-type-image .uagb-tm__overlay' => array(
					'background-color'   => $attr['backgroundImageColor'],
					'opacity'   => ( isset( $attr['backgroundOpacity'] ) && '' != $attr['backgroundOpacity'] ) ? ( ( 100 - $attr['backgroundOpacity'] ) / 100 ) : '0.5',
				),
				' .uagb-testimonial__wrap .uagb-tm__content' => array(
					'border-color'   => $attr['borderColor'],
					'border-style'   => $attr['borderStyle'],
					'border-width'  => UAGB_Helper::get_css_value( $attr['borderWidth'], 'px' ),
					'border-radius'  => UAGB_Helper::get_css_value( $attr['borderRadius'], 'px' ),
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

			if( 'dots' === $attr['arrowDots'] ){
				$selectors['.uagb-slick-carousel'] = array(
						'padding' => '0 0 35px 0',
					);
			}

			if( '1' === $attr['test_item_count'] || $attr['test_item_count'] === $attr['columns'] ){
				$selectors['.uagb-slick-carousel'] = array(
						'padding' => 0,
					);
			}

			$t_selectors = array(
				' .uagb-tm__author-name' => array(
					'font-size'  => UAGB_Helper::get_css_value( $attr['nameFontSizeTablet'], $attr['nameFontSizeType'] ),
					'line-height' => UAGB_Helper::get_css_value( $attr['nameLineHeightTablet'], $attr['nameLineHeightType'] ),
				),
				' .uagb-tm__company' => array(
					'font-size'  => UAGB_Helper::get_css_value( $attr['companyFontSizeTablet'], $attr['companyFontSizeType'] ),
					'line-height' => UAGB_Helper::get_css_value( $attr['companyLineHeightTablet'], $attr['companyLineHeightType'] ),
				),
				' .uagb-tm__desc' => array(
					'font-size'  => UAGB_Helper::get_css_value( $attr['descFontSizeTablet'], $attr['descFontSizeType'] ),
					'line-height' => UAGB_Helper::get_css_value( $attr['descLineHeightTablet'], $attr['descLineHeightType'] ),
				),
			);

			$m_selectors = array(
				' .uagb-tm__author-name' => array(
					'font-size'  => UAGB_Helper::get_css_value( $attr['nameFontSizeMobile'], $attr['nameFontSizeType'] ),
					'line-height' => UAGB_Helper::get_css_value( $attr['nameLineHeightMobile'], $attr['nameLineHeightType'] ),
				),
				' .uagb-tm__company' => array(
					'font-size'  => UAGB_Helper::get_css_value( $attr['companyFontSizeMobile'], $attr['companyFontSizeType'] ),
					'line-height' => UAGB_Helper::get_css_value( $attr['companyLineHeightMobile'], $attr['companyLineHeightType'] ),
				),
				' .uagb-tm__desc' => array(
					'font-size'  => UAGB_Helper::get_css_value( $attr['descFontSizeMobile'], $attr['descFontSizeType'] ),
					'line-height' => UAGB_Helper::get_css_value( $attr['descLineHeightMobile'], $attr['descLineHeightType'] ),
				),
				' .uagb-tm__content' => array(
					'text-align' => 'center',
				)
			);


			// @codingStandardsIgnoreEnd.
			$base_selector = ( $attr['classMigrate'] ) ? '.uagb-block-' : '#uagb-testimonial-';
			$desktop       = UAGB_Helper::generate_css( $selectors, $base_selector . $id );

			$tablet = UAGB_Helper::generate_css( $t_selectors, $base_selector . $id );

			$mobile = UAGB_Helper::generate_css( $m_selectors, $base_selector . $id );

			$generated_css = array(
				'desktop' => $desktop,
				'tablet'  => $tablet,
				'mobile'  => $mobile,
			);

			return $generated_css;
		}

		/**
		 * Get Team Block CSS
		 *
		 * @since 0.0.1
		 * @param array  $attr The block attributes.
		 * @param string $id The selector ID.
		 * @return array The Widget List.
		 */
		public static function get_team_css( $attr, $id ) { 			// @codingStandardsIgnoreStart

			$defaults = UAGB_Helper::$block_list['uagb/team']['attributes'];

			$attr = array_merge( $defaults, (array) $attr );

			$m_selectors = array();
			$t_selectors = array();

			$selectors = array(
				" p.uagb-team__desc" => array(
					"font-family" => $attr['descFontFamily'],
					"font-weight" => $attr['descFontWeight'],
					"font-size" => UAGB_Helper::get_css_value( $attr['descFontSize'], $attr['descFontSizeType'] ),
					"line-height" => UAGB_Helper::get_css_value( $attr['descLineHeight'], $attr['descLineHeightType'] ),
					"color" => $attr['descColor'],
					"margin-bottom" => UAGB_Helper::get_css_value( $attr['descSpace'], 'px' ),
				),
				" .uagb-team__prefix" => array(
					"font-family" => $attr['prefixFontFamily'],
					"font-weight" => $attr['prefixFontWeight'],
					"font-size" => UAGB_Helper::get_css_value( $attr['prefixFontSize'], $attr['prefixFontSizeType'] ),
					"line-height" => UAGB_Helper::get_css_value( $attr['prefixLineHeight'], $attr['prefixLineHeightType'] ),
					"color" => $attr['prefixColor'],
				),
				" .uagb-team__desc-wrap" => array(
					"margin-top" => UAGB_Helper::get_css_value( $attr['prefixSpace'], 'px' ),
				),
				" .uagb-team__social-icon a" => array(
					"color" => $attr['socialColor'],
					"font-size" => UAGB_Helper::get_css_value( $attr['socialFontSize'], $attr['socialFontSizeType'] ),
					"width" => UAGB_Helper::get_css_value( $attr['socialFontSize'], $attr['socialFontSizeType'] ),
					"height" => UAGB_Helper::get_css_value( $attr['socialFontSize'], $attr['socialFontSizeType'] ),
					"line-height" => UAGB_Helper::get_css_value( $attr['socialFontSize'], $attr['socialFontSizeType'] ),
				),
				" .uagb-team__social-icon svg" => array(
					"fill" => $attr['socialColor'],
					"width" => UAGB_Helper::get_css_value( $attr['socialFontSize'], $attr['socialFontSizeType'] ),
					"height" => UAGB_Helper::get_css_value( $attr['socialFontSize'], $attr['socialFontSizeType'] ),
				),
				" .uagb-team__social-icon:hover a" => array(
					"color" => $attr['socialHoverColor'],
				),
				" .uagb-team__social-icon:hover svg" => array(
					"fill" => $attr['socialHoverColor'],
				),
				".uagb-team__image-position-left .uagb-team__social-icon" => array(
					"margin-right" => UAGB_Helper::get_css_value( $attr['socialSpace'], 'px' ),
					"margin-left" => UAGB_Helper::get_css_value( 0 , 'px' ),
				),
				".uagb-team__image-position-right .uagb-team__social-icon" => array(
					"margin-left" => UAGB_Helper::get_css_value( $attr['socialSpace'], 'px' ),
					"margin-right" => UAGB_Helper::get_css_value( 0 , 'px' ),
				),
				".uagb-team__image-position-above.uagb-team__align-center .uagb-team__social-icon" => array(
					"margin-right" => UAGB_Helper::get_css_value( ( $attr['socialSpace'] / 2 ), 'px' ),
					"margin-left" => UAGB_Helper::get_css_value( ( $attr['socialSpace'] / 2 ), 'px' ),
				),
				".uagb-team__image-position-above.uagb-team__align-left .uagb-team__social-icon" => array(
					"margin-right" => UAGB_Helper::get_css_value( $attr['socialSpace'], 'px' ),
					"margin-left" => UAGB_Helper::get_css_value( 0 , 'px' ),
				),
				".uagb-team__image-position-above.uagb-team__align-right .uagb-team__social-icon" => array(
					"margin-left" => UAGB_Helper::get_css_value( $attr['socialSpace'], 'px' ),
					"margin-right" => UAGB_Helper::get_css_value( 0 , 'px' ),
				),
				" .uagb-team__image-wrap" => array(
					"margin-top" => UAGB_Helper::get_css_value( $attr['imgTopMargin'], 'px' ),
					"margin-bottom" => UAGB_Helper::get_css_value( $attr['imgBottomMargin'], 'px' ),
					"margin-left" => UAGB_Helper::get_css_value( $attr['imgLeftMargin'], 'px' ),
					"margin-right" => UAGB_Helper::get_css_value( $attr['imgRightMargin'], 'px' ),
					"width" => UAGB_Helper::get_css_value( $attr['imgWidth'], 'px' )
				),
			);

			if( 'above' == $attr['imgPosition'] ) {
				if ( 'center' == $attr['align'] ) {
					$selectors[" .uagb-team__image-wrap"]["margin-left"] = "auto";
					$selectors[" .uagb-team__image-wrap"]["margin-right"] = "auto";
				} else if ( 'left' == $attr['align'] ) {
					$selectors[" .uagb-team__image-wrap"]["margin-right"] = "auto";
				} else if ( 'right' == $attr['align'] ) {
					$selectors[" .uagb-team__image-wrap"]["margin-left"] = "auto";
				}
			}

			if ( "above" != $attr['imgPosition'] ) {
				if ( "middle" == $attr['imgAlign'] ) {
					$selectors[" .uagb-team__image-wrap"]["align-self"] = "center";
				}
			}

			$selectors[" " . $attr['tag'] . ".uagb-team__title"] = array(
				"font-family" => $attr['titleFontFamily'],
				"font-weight" => $attr['titleFontWeight'],
				"font-size" => UAGB_Helper::get_css_value( $attr['titleFontSize'], $attr['titleFontSizeType'] ),
				"line-height" => UAGB_Helper::get_css_value( $attr['titleLineHeight'], $attr['titleLineHeightType'] ),
				"color" => $attr['titleColor'],
				"margin-bottom" => UAGB_Helper::get_css_value( $attr['titleSpace'], 'px' ),
			);

			$m_selectors = array(
				" p.uagb-team__desc" => array(
					"font-size" => UAGB_Helper::get_css_value( $attr['descFontSizeMobile'], $attr['descFontSizeType'] ),
				),
				" .uagb-team__prefix" => array(
					"font-size" => UAGB_Helper::get_css_value( $attr['prefixFontSizeMobile'], $attr['prefixFontSizeType'] ),
				),
				" .uagb-team__social-icon a" => array(
					"font-size" => UAGB_Helper::get_css_value( $attr['socialFontSizeMobile'], $attr['socialFontSizeType'] ),
					"width" => UAGB_Helper::get_css_value( $attr['socialFontSizeMobile'], $attr['socialFontSizeType'] ),
					"height" => UAGB_Helper::get_css_value( $attr['socialFontSizeMobile'], $attr['socialFontSizeType'] ),
					"line-height" => UAGB_Helper::get_css_value( $attr['socialFontSizeMobile'], $attr['socialFontSizeType'] ),
				),
				" .uagb-team__social-icon svg" => array(
					"width" => UAGB_Helper::get_css_value( $attr['socialFontSizeMobile'], $attr['socialFontSizeType'] ),
					"height" => UAGB_Helper::get_css_value( $attr['socialFontSizeMobile'], $attr['socialFontSizeType'] ),
				),
			);

			$t_selectors = array(
				" p.uagb-team__desc" => array(
					"font-size" => UAGB_Helper::get_css_value( $attr['descFontSizeTablet'], $attr['descFontSizeType'] ),
				),
				" .uagb-team__prefix" => array(
					"font-size" => UAGB_Helper::get_css_value( $attr['prefixFontSizeTablet'], $attr['prefixFontSizeType'] ),
				),
				" .uagb-team__social-icon a" => array(
					"font-size" => UAGB_Helper::get_css_value( $attr['socialFontSizeTablet'], $attr['socialFontSizeType'] ),
					"width" => UAGB_Helper::get_css_value( $attr['socialFontSizeTablet'], $attr['socialFontSizeType'] ),
					"height" => UAGB_Helper::get_css_value( $attr['socialFontSizeTablet'], $attr['socialFontSizeType'] ),
					"line-height" => UAGB_Helper::get_css_value( $attr['socialFontSizeTablet'], $attr['socialFontSizeType'] ),
				),
				" .uagb-team__social-icon svg" => array(
					"width" => UAGB_Helper::get_css_value( $attr['socialFontSizeTablet'], $attr['socialFontSizeType'] ),
					"height" => UAGB_Helper::get_css_value( $attr['socialFontSizeTablet'], $attr['socialFontSizeType'] ),
				),
			);

			$m_selectors[" " . $attr['tag'] . ".uagb-team__title"] = array(
				"font-size" => UAGB_Helper::get_css_value( $attr['titleFontSizeMobile'], $attr['titleFontSizeType'] ),
			);

			$t_selectors[" " . $attr['tag'] . ".uagb-team__title"] = array(
				"font-size" => UAGB_Helper::get_css_value( $attr['titleFontSizeTablet'], $attr['titleFontSizeType'] ),
			);

			// @codingStandardsIgnoreEnd

			$base_selector = ( $attr['classMigrate'] ) ? '.uagb-block-' : '#uagb-team-';

			$desktop = UAGB_Helper::generate_css( $selectors, $base_selector . $id );

			$tablet = UAGB_Helper::generate_css( $t_selectors, $base_selector . $id );

			$mobile = UAGB_Helper::generate_css( $m_selectors, $base_selector . $id );

			$generated_css = array(
				'desktop' => $desktop,
				'tablet'  => $tablet,
				'mobile'  => $mobile,
			);

			return $generated_css;
		}

		/**
		 * Get Social Share Block CSS
		 *
		 * @since 0.0.1
		 * @param array  $attr The block attributes.
		 * @param string $id The selector ID.
		 * @return array The Widget List.
		 */
		public static function get_social_share_css( $attr, $id ) { 			// @codingStandardsIgnoreStart

			$defaults = UAGB_Helper::$block_list['uagb/social-share']['attributes'];

			$attr = array_merge( $defaults, (array) $attr );

			$alignment = ( $attr['align'] == 'left' ) ? 'flex-start' : ( ( $attr['align'] == 'right' ) ? 'flex-end' : 'center' );

			$m_selectors = array();
			$t_selectors = array();

			$selectors[" .uagb-social-share__wrap .block-editor-inner-blocks"] = array(
			"text-align" => UAGB_Helper::get_css_value( $attr['align'] ),
			);

			$selectors[".uagb-social-share__layout-vertical .uagb-ss__wrapper"] = array(
				"padding"  => UAGB_Helper::get_css_value( $attr['bgSize'], 'px' ),
				"margin-left"  => 0,
				"margin-right"  => 0,
				"margin-bottom"  => UAGB_Helper::get_css_value( $attr['gap'], 'px' )
			);

			$selectors[".uagb-social-share__layout-vertical .uagb-social-share__wrap"] = array(
				"flex-direction" => "column"
			);

			$selectors[".uagb-social-share__layout-horizontal .uagb-ss__wrapper"] = array(
				"padding"  => UAGB_Helper::get_css_value( $attr['bgSize'], 'px' ),
				"margin-left"  => UAGB_Helper::get_css_value( ( $attr['gap']/2 ), 'px' ),
				"margin-right"  => UAGB_Helper::get_css_value( ( $attr['gap']/2 ), 'px' )
			);

			$selectors[" .uagb-ss__wrapper"] = array(
				"border-radius" => UAGB_Helper::get_css_value( $attr['borderRadius'], 'px' )
			);

			$selectors[" .uagb-ss__source-wrap"] = array(
				"width" => UAGB_Helper::get_css_value( $attr['size'], $attr['sizeType'] ),
			);

			$selectors[" .uagb-ss__source-wrap svg"] = array(
				"width" => UAGB_Helper::get_css_value( $attr['size'], $attr['sizeType'] ),
				"height" => UAGB_Helper::get_css_value( $attr['size'], $attr['sizeType'] ),
			);

			$selectors[" .uagb-ss__source-image"] = array(
				"width" => UAGB_Helper::get_css_value( $attr['size'], $attr['sizeType'] )
			);

			$selectors[" .uagb-ss__source-icon"] = array(
				"width" => UAGB_Helper::get_css_value( $attr['size'], $attr['sizeType'] ),
				"height" => UAGB_Helper::get_css_value( $attr['size'], $attr['sizeType'] ),
				"font-size" => UAGB_Helper::get_css_value( $attr['size'], $attr['sizeType'] ),
				"line-height" => UAGB_Helper::get_css_value( $attr['size'], $attr['sizeType'] )
			);


			$t_selectors[" .uagb-ss__source-wrap"] = array(
				"width" => UAGB_Helper::get_css_value( $attr['sizeTablet'], $attr['sizeType'] ),
				"height" => UAGB_Helper::get_css_value( $attr['sizeTablet'], $attr['sizeType'] ),
				"line-height" => UAGB_Helper::get_css_value( $attr['sizeTablet'], $attr['sizeType'] )
			);

			$t_selectors[" .uagb-ss__source-wrap svg"] = array(
				"width" => UAGB_Helper::get_css_value( $attr['sizeTablet'], $attr['sizeType'] ),
				"height" => UAGB_Helper::get_css_value( $attr['sizeTablet'], $attr['sizeType'] ),
			);

			$t_selectors[" .uagb-ss__source-image"] = array(
				"width" => UAGB_Helper::get_css_value( $attr['sizeTablet'], $attr['sizeType'] )
			);

			$t_selectors[" .uagb-ss__source-icon"] = array(
				"width" => UAGB_Helper::get_css_value( $attr['sizeTablet'], $attr['sizeType'] ),
				"height" => UAGB_Helper::get_css_value( $attr['sizeTablet'], $attr['sizeType'] ),
				"font-size" => UAGB_Helper::get_css_value( $attr['sizeTablet'], $attr['sizeType'] ),
				"line-height" => UAGB_Helper::get_css_value( $attr['sizeTablet'], $attr['sizeType'] )
			);
			$t_selectors[".uagb-social-share__layout-horizontal .uagb-ss__wrapper"] = array(
				"margin-left"  => 0,
				"margin-right"  => 0
			);


			$m_selectors[" .uagb-ss__source-wrap"] = array(
				"width" => UAGB_Helper::get_css_value( $attr['sizeMobile'], $attr['sizeType'] ),
				"height" => UAGB_Helper::get_css_value( $attr['sizeMobile'], $attr['sizeType'] ),
				"line-height" => UAGB_Helper::get_css_value( $attr['sizeMobile'], $attr['sizeType'] )
			);

			$m_selectors[" .uagb-ss__source-wrap svg"] = array(
				"width" => UAGB_Helper::get_css_value( $attr['sizeMobile'], $attr['sizeType'] ),
				"height" => UAGB_Helper::get_css_value( $attr['sizeMobile'], $attr['sizeType'] ),
			);

			$m_selectors[" .uagb-ss__source-image"] = array(
				"width" => UAGB_Helper::get_css_value( $attr['sizeMobile'], $attr['sizeType'] )
			);

			$m_selectors[" .uagb-ss__source-icon"] = array(
				"width" => UAGB_Helper::get_css_value( $attr['sizeMobile'], $attr['sizeType'] ),
				"height" => UAGB_Helper::get_css_value( $attr['sizeMobile'], $attr['sizeType'] ),
				"font-size" => UAGB_Helper::get_css_value( $attr['sizeMobile'], $attr['sizeType'] ),
				"line-height" => UAGB_Helper::get_css_value( $attr['sizeMobile'], $attr['sizeType'] )
			);
			$m_selectors[".uagb-social-share__layout-horizontal .uagb-ss__wrapper"] = array(
				"margin-left"  => 0,
				"margin-right"  => 0
			);

			$selectors[" .uagb-social-share__wrap"] = array(
				"justify-content"  => $alignment,
				"-webkit-box-pack" => $alignment,
				"-ms-flex-pack" => $alignment,
				"justify-content" => $alignment,
				"-webkit-box-align" => $alignment,
				"-ms-flex-align" => $alignment,
				"align-items" => $alignment,
			);

			if ( ! $attr['childMigrate'] ) {

				foreach ( $attr['socials'] as $key => $socials ) {
					
					$socials['icon_color'] = ( isset( $socials['icon_color'] ) ) ? $socials['icon_color'] : '';
					$socials['icon_hover_color'] = ( isset( $socials['icon_hover_color'] ) ) ? $socials['icon_hover_color'] : '';
					$socials['icon_bg_color'] = ( isset( $socials['icon_bg_color'] ) ) ? $socials['icon_bg_color'] : '';
					$socials['icon_bg_hover_color'] = ( isset( $socials['icon_bg_hover_color'] ) ) ? $socials['icon_bg_hover_color'] : '';

					if ( $attr['social_count'] <= $key ) {
						break;
					}

					$child_selectors = self::get_social_share_child_selectors( $socials, $key, $attr['childMigrate'] );
					$selectors = array_merge( $selectors, (array) $child_selectors );
				}
			}

			if ( 'horizontal' == $attr['social_layout'] ) {

				if ( "desktop" == $attr['stack'] ) {

					$selectors[" .uagb-ss__wrapper"] = array (
						"margin-left"  => 0,
						"margin-right"  => 0,
						"margin-bottom"  => UAGB_Helper::get_css_value( $attr['gap'], 'px' )
					);

					$selectors[" .uagb-social-share__wrap"] = array (
						"flex-direction" => "column",
						"justify-content"  => $alignment,
						"-webkit-box-pack" => $alignment,
						"-ms-flex-pack" => $alignment,
						"justify-content" => $alignment,
						"-webkit-box-align" => $alignment,
						"-ms-flex-align" => $alignment,
						"align-items" => $alignment,
					);

				} else if ( "tablet" == $attr['stack'] ) {

					$t_selectors[" .uagb-ss__wrapper"] = array (
						"margin-left" => 0,
						"margin-right" => 0,
						"margin-bottom" => UAGB_Helper::get_css_value( $attr['gap'], 'px' )
					);

					$t_selectors[" .uagb-social-share__wrap"] = array (
						"flex-direction" => "column",
						"justify-content"  => $alignment,
						"-webkit-box-pack" => $alignment,
						"-ms-flex-pack" => $alignment,
						"justify-content" => $alignment,
						"-webkit-box-align" => $alignment,
						"-ms-flex-align" => $alignment,
						"align-items" => $alignment,
					);

				} else if ( "mobile" == $attr['stack'] ) {

					$m_selectors[" .uagb-ss__wrapper"] = array (
						"margin-left" => 0,
						"margin-right" => 0,
						"margin-bottom" => UAGB_Helper::get_css_value( $attr['gap'], 'px' )
					);

					$m_selectors[" .uagb-social-share__wrap"] = array (
						"flex-direction" => "column",
						"justify-content"  => $alignment,
						"-webkit-box-pack" => $alignment,
						"-ms-flex-pack" => $alignment,
						"justify-content" => $alignment,
						"-webkit-box-align" => $alignment,
						"-ms-flex-align" => $alignment,
						"align-items" => $alignment,
					);
				}
			}
			

			// @codingStandardsIgnoreEnd

			$base_selector = ( $attr['classMigrate'] ) ? '.uagb-block-' : '#uagb-social-share-';

			$desktop = UAGB_Helper::generate_css( $selectors, $base_selector . $id );

			$tablet = UAGB_Helper::generate_css( $t_selectors, $base_selector . $id );

			$mobile = UAGB_Helper::generate_css( $m_selectors, $base_selector . $id );

			$generated_css = array(
				'desktop' => $desktop,
				'tablet'  => $tablet,
				'mobile'  => $mobile,
			);

			return $generated_css;
		}

		/**
		 * Get social share Block CSS
		 *
		 * @since 1.14.9
		 * @param array  $attr The block attributes.
		 * @param string $id The selector ID.
		 * @return array The Widget List.
		 */
		public static function get_social_share_child_css( $attr, $id ) { 			// @codingStandardsIgnoreStart

			$defaults = UAGB_Helper::$block_list['uagb/social-share-child']['attributes'];

			$attr = array_merge( $defaults, (array) $attr );

			$selectors = self::get_social_share_child_selectors( $attr, $id, true );

			// @codingStandardsIgnoreEnd

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
		public static function get_social_share_child_selectors( $attr, $id, $childMigrate ) { 			// @codingStandardsIgnoreStart

			$wrapper = ( ! $childMigrate ) ? " .uagb-ss-repeater-" . $id : ".uagb-ss-repeater";

			$selectors[$wrapper . " a.uagb-ss__link"] = array(
				"color" => $attr['icon_color']
			);
			$selectors[$wrapper . " a.uagb-ss__link"] = array(
				"color" => $attr['icon_color']
			);
			$selectors[$wrapper . " a.uagb-ss__link svg"] = array(
				"fill" => $attr['icon_color']
			);
			$selectors[$wrapper . ":hover a.uagb-ss__link"] = array (
				"color" => $attr['icon_hover_color']
			);
			$selectors[$wrapper . ":hover a.uagb-ss__link svg"] = array (
				"fill" => $attr['icon_hover_color']
			);
			
			$selectors[$wrapper . ".uagb-ss__wrapper"] = array (
				"background" => $attr['icon_bg_color'],
			);
			$selectors[$wrapper . ".uagb-ss__wrapper:hover"] = array (
				"background" => $attr['icon_bg_hover_color'],
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
		public static function get_icon_list_css( $attr, $id ) { 			// @codingStandardsIgnoreStart

			$defaults = UAGB_Helper::$block_list['uagb/icon-list']['attributes'];

			$attr = array_merge( $defaults, (array) $attr );

			$alignment = ( $attr['align'] == 'left' ) ? 'flex-start' : ( ( $attr['align'] == 'right' ) ? 'flex-end' : 'center' );

			$m_selectors = array();
			$t_selectors = array();

			$selectors = array(
				".uagb-icon-list__layout-vertical .uagb-icon-list__wrapper" => array(
					"margin-left"  => 0,
					"margin-right"  => 0,
					"margin-bottom"  => UAGB_Helper::get_css_value( $attr['gap'], 'px' )
				),
				".uagb-icon-list__layout-vertical .uagb-icon-list__wrap" => array(
					 "flex-direction" => "column"
				),
				".uagb-icon-list__layout-vertical .uagb-icon-list__wrapper:last-child" => array(
					"margin-bottom"  => 0
				),
				".uagb-icon-list__layout-horizontal .uagb-icon-list__wrapper" => array(
					"margin-left"  => UAGB_Helper::get_css_value( ( $attr['gap']/2 ), 'px' ),
					"margin-right"  => UAGB_Helper::get_css_value( ( $attr['gap']/2 ), 'px' )
				),
				".uagb-icon-list__layout-horizontal .uagb-icon-list__wrapper:first-child" => array(
					"margin-left"  => 0
				),
				".uagb-icon-list__layout-horizontal .uagb-icon-list__wrapper:last-child" => array(
					"margin-right"  => 0
				),
				// Desktop Icon Size CSS starts.
				" .uagb-icon-list__source-image" => array(
					"width" => UAGB_Helper::get_css_value( $attr['size'], $attr['sizeType'] )
				),
				" .uagb-icon-list__source-icon" => array(
					"width" => UAGB_Helper::get_css_value( $attr['size'], $attr['sizeType'] ),
					"height" => UAGB_Helper::get_css_value( $attr['size'], $attr['sizeType'] ),
					"font-size" => UAGB_Helper::get_css_value( $attr['size'], $attr['sizeType'] )
				),
				" .uagb-icon-list__source-icon svg" => array(
					"width" => UAGB_Helper::get_css_value( $attr['size'], $attr['sizeType'] ),
					"height" => UAGB_Helper::get_css_value( $attr['size'], $attr['sizeType'] ),
				),
				" .uagb-icon-list__source-icon:before"=> array(
					"width" => UAGB_Helper::get_css_value( $attr['size'], $attr['sizeType'] ),
					"height" => UAGB_Helper::get_css_value( $attr['size'], $attr['sizeType'] ),
					"font-size" => UAGB_Helper::get_css_value( $attr['size'], $attr['sizeType'] )
				),
				" .uagb-icon-list__label-wrap"=> array(
					"text-align" => $attr['align']
				),

				" .uagb-icon-list__source-wrap"=> array(
					"padding" => UAGB_Helper::get_css_value( $attr['bgSize'], 'px' ),
					"border-radius" => UAGB_Helper::get_css_value( $attr['borderRadius'], 'px' ),
					"border-style" => ( $attr['border'] > 0 ) ? 'solid' : '',
					"border-width" => UAGB_Helper::get_css_value( $attr['border'], 'px' )
				),
				" .uagb-icon-list__wrap"=> array(
					"justify-content"  => $alignment,
					"-webkit-box-pack" => $alignment,
					"-ms-flex-pack" => $alignment,
					"justify-content" => $alignment,
					"-webkit-box-align" => $alignment,
					"-ms-flex-align" => $alignment,
					"align-items" => $alignment,
				)
			);

			if ( $attr['childMigrate'] ) {
				$selectors[' .uagb-icon-list-repeater'] = array (
				'font-family'   => $attr['fontFamily'],
				'font-weight'   => $attr['fontWeight'],
				'font-size'     => UAGB_Helper::get_css_value( $attr['fontSize'], $attr['sizeType'] ),
				'line-height'   => $attr['lineHeight'] . $attr['lineHeightType'],
				);
			}

			if ( 'right' == $attr['align'] ) {
				$selectors[":not(.uagb-icon-list__no-label) .uagb-icon-list__source-wrap"] = array(
					"margin-left" => UAGB_Helper::get_css_value( $attr['inner_gap'], 'px' )
				);
				$selectors[" .uagb-icon-list__content-wrap"] = array(
					"flex-direction" => "row-reverse"
				);
			} else {
				$selectors[":not(.uagb-icon-list__no-label) .uagb-icon-list__source-wrap"] = array(
					"margin-right" => UAGB_Helper::get_css_value( $attr['inner_gap'], 'px' )
				);
			}
			// Desktop Icon Size CSS ends.

			// Mobile Icon Size CSS starts.
			$m_selectors = array(
				" .uagb-icon-list__source-image" => array(
					"width" => UAGB_Helper::get_css_value( $attr['sizeMobile'], $attr['sizeType'] )
				),
				" .uagb-icon-list__source-icon" => array(
					"width" => UAGB_Helper::get_css_value( $attr['sizeMobile'], $attr['sizeType'] ),
					"height" => UAGB_Helper::get_css_value( $attr['sizeMobile'], $attr['sizeType'] ),
					"font-size" => UAGB_Helper::get_css_value( $attr['sizeMobile'], $attr['sizeType'] )
				),
				" .uagb-icon-list__source-icon svg" => array(
					"width" => UAGB_Helper::get_css_value( $attr['sizeMobile'], $attr['sizeType'] ),
					"height" => UAGB_Helper::get_css_value( $attr['sizeMobile'], $attr['sizeType'] ),
				),
				" .uagb-icon-list__source-icon:before" => array(
					"width" => UAGB_Helper::get_css_value( $attr['sizeMobile'], $attr['sizeType'] ),
					"height" => UAGB_Helper::get_css_value( $attr['sizeMobile'], $attr['sizeType'] ),
					"font-size" => UAGB_Helper::get_css_value( $attr['sizeMobile'], $attr['sizeType'] )
				),
			);
			// Mobile Icon Size CSS ends.

			// Tablet Icon Size CSS starts.
			$t_selectors = array(
				" .uagb-icon-list__source-image" => array(
					"width" => UAGB_Helper::get_css_value( $attr['sizeTablet'], $attr['sizeType'] )
				),
				" .uagb-icon-list__source-icon" => array(
					"width" => UAGB_Helper::get_css_value( $attr['sizeTablet'], $attr['sizeType'] ),
					"height" => UAGB_Helper::get_css_value( $attr['sizeTablet'], $attr['sizeType'] ),
					"font-size" => UAGB_Helper::get_css_value( $attr['sizeTablet'], $attr['sizeType'] )
				),
				" .uagb-icon-list__source-icon svg" => array(
					"width" => UAGB_Helper::get_css_value( $attr['sizeTablet'], $attr['sizeType'] ),
					"height" => UAGB_Helper::get_css_value( $attr['sizeTablet'], $attr['sizeType'] ),
				),
				" .uagb-icon-list__source-icon:before" => array(
					"width" => UAGB_Helper::get_css_value( $attr['sizeTablet'], $attr['sizeType'] ),
					"height" => UAGB_Helper::get_css_value( $attr['sizeTablet'], $attr['sizeType'] ),
					"font-size" => UAGB_Helper::get_css_value( $attr['sizeTablet'], $attr['sizeType'] )
				),
			);
			// Tablet Icon Size CSS ends.

			$selectors[" .uagb-icon-list-repeater .uagb-icon-list__label"] = array (
				"font-size" => UAGB_Helper::get_css_value( $attr['fontSize'], $attr['fontSizeType'] ),
				'font-family' => $attr['fontFamily'],
				'font-weight' => $attr['fontWeight'],
				'line-height' => $attr['lineHeight'] . $attr['lineHeightType'],
			);

			$m_selectors[" .uagb-icon-list-repeater .uagb-icon-list__label"] = array (
				"font-size" => UAGB_Helper::get_css_value( $attr['fontSizeMobile'], $attr['fontSizeType'] ),
				'line-height' => UAGB_Helper::get_css_value( $attr['lineHeightMobile'], $attr['lineHeightType'] ),
			);

			$t_selectors[" .uagb-icon-list-repeater .uagb-icon-list__label"] = array (
				"font-size" => UAGB_Helper::get_css_value( $attr['fontSizeTablet'], $attr['fontSizeType'] ),
				'line-height' => UAGB_Helper::get_css_value( $attr['lineHeightTablet'], $attr['lineHeightType'] ),
			);

			if ( 'horizontal' == $attr['icon_layout'] ) {

				if ( "tablet" == $attr['stack'] ) {

					$t_selectors[" .uagb-icon-list__wrap .uagb-icon-list__wrapper"] = array (
						"margin-left" => 0,
						"margin-right" => 0,
						"margin-bottom" => UAGB_Helper::get_css_value( $attr['gap'], 'px' )
					);

					$t_selectors[" .uagb-icon-list__wrap"] = array (
						"flex-direction" => "column"
					);

					$t_selectors[" .uagb-icon-list__wrap .uagb-icon-list__wrapper:last-child"] = array (
						"margin-bottom" => 0
					);

				} else if ( "mobile" == $attr['stack'] ) {

					$m_selectors[" .uagb-icon-list__wrap .uagb-icon-list__wrapper"] = array (
						"margin-left" => 0,
						"margin-right" => 0,
						"margin-bottom" => UAGB_Helper::get_css_value( $attr['gap'], 'px' )
					);

					$m_selectors[" .uagb-icon-list__wrap"] = array (
						"flex-direction" => "column"
					);

					$m_selectors[" .uagb-icon-list__wrap .uagb-icon-list__wrapper:last-child"] = array (
						"margin-bottom" => 0
					);
				}
			}
			if ( ! $attr['childMigrate'] ) {

				

				foreach ( $attr['icons'] as $key => $icon ) {

					$wrapper = ( ! $attr['childMigrate'] ) ? " .uagb-icon-list-repeater-" . $key . '.uagb-icon-list__wrapper' : " .uagb-icon-list-repeater";

					$selectors[$wrapper] = array (
					'font-family'   => $attr['fontFamily'],
					'font-weight'   => $attr['fontWeight'],
					'font-size'     => UAGB_Helper::get_css_value( $attr['fontSize'], $attr['sizeType'] ),
					'line-height'   => $attr['lineHeight'] . $attr['lineHeightType'],
					);
					$m_selectors_child[$wrapper. " .uagb-icon-list__label"] = array (
					'font-family'   => $attr['fontFamily'],
					'font-weight'   => $attr['fontWeight'],
					'font-size'     => UAGB_Helper::get_css_value( $attr['fontSizeMobile'], $attr['sizeType'] ),
					'line-height'   => $attr['lineHeightMobile'] . $attr['lineHeightType'],
					);
					$t_selectors_child[$wrapper. " .uagb-icon-list__label"] = array (
					'font-family'   => $attr['fontFamily'],
					'font-weight'   => $attr['fontWeight'],
					'font-size'     => UAGB_Helper::get_css_value( $attr['fontSizeTablet'], $attr['sizeType'] ),
					'line-height'   => $attr['lineHeightTablet'] . $attr['lineHeightType'],
					);

					$icon['icon_color'] = ( isset( $icon['icon_color'] ) ) ? $icon['icon_color'] : '';
					$icon['icon_hover_color'] = ( isset( $icon['icon_hover_color'] ) ) ? $icon['icon_hover_color'] : '';
					$icon['icon_bg_color'] = ( isset( $icon['icon_bg_color'] ) ) ? $icon['icon_bg_color'] : '';
					$icon['icon_bg_hover_color'] = ( isset( $icon['icon_bg_hover_color'] ) ) ? $icon['icon_bg_hover_color'] : '';
					$icon['icon_border_color'] = ( isset( $icon['icon_border_color'] ) ) ? $icon['icon_border_color'] : '';
					$icon['icon_border_hover_color'] = ( isset( $icon['icon_border_hover_color'] ) ) ? $icon['icon_border_hover_color'] : '';
					$icon['label_color'] = ( isset( $icon['label_color'] ) ) ? $icon['label_color'] : '';
					$icon['label_hover_color'] = ( isset( $icon['label_hover_color'] ) ) ? $icon['label_hover_color'] : '';
	
					if ( $attr['icon_count'] <= $key ) {
						break;
					}
				
					$child_selectors = self::get_icon_list_child_selectors( $icon, $key, $attr['childMigrate'] );
					$selectors = array_merge( $selectors, (array) $child_selectors );
					$t_selectors = array_merge( $t_selectors, (array) $t_selectors_child );
					$m_selectors = array_merge( $m_selectors, (array) $m_selectors_child );				
				}

			}
			// @codingStandardsIgnoreEnd

			$base_selector = ( $attr['classMigrate'] ) ? '.uagb-block-' : '#uagb-icon-list-';

			$desktop = UAGB_Helper::generate_css( $selectors, $base_selector . $id );

			$tablet = UAGB_Helper::generate_css( $t_selectors, $base_selector . $id );

			$mobile = UAGB_Helper::generate_css( $m_selectors, $base_selector . $id );

			$generated_css = array(
				'desktop' => $desktop,
				'tablet'  => $tablet,
				'mobile'  => $mobile,
			);

			return $generated_css;
		}

		/**
		 * Get Icon List Block CSS
		 *
		 * @since 1.14.9
		 * @param array  $attr The block attributes.
		 * @param string $id The selector ID.
		 * @return array The Widget List.
		 */
		public static function get_icon_list_child_css( $attr, $id ) { 			// @codingStandardsIgnoreStart

			$defaults = UAGB_Helper::$block_list['uagb/icon-list-child']['attributes'];

			$attr = array_merge( $defaults, (array) $attr );

			$selectors = self::get_icon_list_child_selectors( $attr, $id, true );

			// @codingStandardsIgnoreEnd

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
		public static function get_icon_list_child_selectors( $attr, $id, $childMigrate ) { 			// @codingStandardsIgnoreStart

			$wrapper = ( ! $childMigrate ) ? " .uagb-icon-list-repeater-" . $id : ".uagb-icon-list-repeater";

			$selectors[$wrapper . " .uagb-icon-list__source-icon"] = array(
				"color" => $attr['icon_color']
			);
			$selectors[$wrapper . " .uagb-icon-list__source-icon"] = array(
				"color" => $attr['icon_color']
			);
			$selectors[$wrapper . " .uagb-icon-list__source-icon svg"] = array(
				"fill" => $attr['icon_color']
			);
			$selectors[$wrapper . ":hover .uagb-icon-list__source-icon"] = array (
				"color" => $attr['icon_hover_color']
			);
			$selectors[$wrapper . ":hover .uagb-icon-list__source-icon svg"] = array (
				"fill" => $attr['icon_hover_color']
			);
			$selectors[$wrapper . " .uagb-icon-list__label"] = array (
				"color" => $attr['label_color']
			);
			$selectors[$wrapper . ":hover .uagb-icon-list__label"] = array (
				"color" => $attr['label_hover_color']
			);
			$selectors[$wrapper . " .uagb-icon-list__source-wrap"] = array (
				"background" => $attr['icon_bg_color'],
				"border-color" => $attr['icon_border_color'],
			);
			$selectors[$wrapper . ":hover .uagb-icon-list__source-wrap"] = array (
				"background" => $attr['icon_bg_hover_color'],
				"border-color" => $attr['icon_border_hover_color']
			);

			// @codingStandardsIgnoreEnd

			return $selectors;
		}

		/**
		 * Get Content Timeline Block CSS
		 *
		 * @since 0.0.1
		 * @param array  $attr The block attributes.
		 * @param string $id The selector ID.
		 * @return array The Widget List.
		 */
		public static function get_content_timeline_css( $attr, $id ) { 			// @codingStandardsIgnoreStart

			$defaults = UAGB_Helper::$block_list['uagb/content-timeline']['attributes'];

			$attr = array_merge( $defaults, (array) $attr );

			$selectors = array();
			$t_selectors = array();
			$m_selectors = array();

			$selectors = array(
				" .uagb-timeline__heading" => array(
					"text-align"  => $attr['align'],
					"color"  => $attr['headingColor'],
					"font-size"  => UAGB_Helper::get_css_value( $attr['headFontSize'], $attr['headFontSizeType'] ),
					'font-family' => $attr['headFontFamily'],
					'font-weight' => $attr['headFontWeight'],
					'line-height' => UAGB_Helper::get_css_value( $attr['headLineHeight'], $attr['headLineHeightType'] ),
				),
				" .uagb-timeline__heading-text" => array(
					"margin-bottom"  => UAGB_Helper::get_css_value( $attr['headSpace'], 'px' )
				),
				' .uagb-timeline__main .uagb-timeline__marker.uagb-timeline__in-view-icon .uagb-timeline__icon-new' => array(
					'color'=> $attr['iconFocus'],
				),
			);

			$desktop_selectors = self::get_timeline_selectors( $attr );
			$selectors = array_merge( $selectors, $desktop_selectors );

			$t_selectors = array(
				" .uagb-timeline__date-hide.uagb-timeline__date-inner" => array(
					"font-size" => UAGB_Helper::get_css_value( $attr['dateFontsizeTablet'], $attr['dateFontsizeType'] ),
					'line-height' => UAGB_Helper::get_css_value( $attr['dateLineHeightTablet'], $attr['dateLineHeightType'] ),
				),
				" .uagb-timeline__date-new" => array(
					"font-size" => UAGB_Helper::get_css_value( $attr['dateFontsizeTablet'], $attr['dateFontsizeType'] ),
					'line-height' => UAGB_Helper::get_css_value( $attr['dateLineHeightTablet'], $attr['dateLineHeightType'] ),
				),
				" .uagb-timeline__heading" => array(
					"font-size" => UAGB_Helper::get_css_value( $attr['headFontSizeTablet'], $attr['headFontSizeType'] ),
					'line-height' => UAGB_Helper::get_css_value( $attr['headLineHeightTablet'], $attr['headLineHeightType'] ),
				),
				" .uagb-timeline-desc-content" => array(
					"font-size" => UAGB_Helper::get_css_value( $attr['subHeadFontSizeTablet'], $attr['subHeadFontSizeType'] ),
					'line-height' => UAGB_Helper::get_css_value( $attr['subHeadLineHeightTablet'], $attr['subHeadLineHeightType'] ),
				),
			);

			$tablet_selectors = self::get_timeline_tablet_selectors( $attr );
			$t_selectors = array_merge( $t_selectors, $tablet_selectors );

			$m_selectors = array(
				" .uagb-timeline__date-hide.uagb-timeline__date-inner" => array(
					"font-size" => UAGB_Helper::get_css_value( $attr['dateFontsizeMobile'], $attr['dateFontsizeType'] ),
					'line-height' => UAGB_Helper::get_css_value( $attr['dateLineHeightMobile'], $attr['dateLineHeightType'] ),
				),
				" .uagb-timeline__date-new" => array(
					"font-size" => UAGB_Helper::get_css_value( $attr['dateFontsizeMobile'], $attr['dateFontsizeType'] ),
					'line-height' => UAGB_Helper::get_css_value( $attr['dateLineHeightMobile'], $attr['dateLineHeightType'] ),
				),
				" .uagb-timeline__heading" => array(
					"font-size" => UAGB_Helper::get_css_value( $attr['headFontSizeMobile'], $attr['headFontSizeType'] ),
					'line-height' => UAGB_Helper::get_css_value( $attr['headLineHeightMobile'], $attr['headLineHeightType'] ),
				),
				" .uagb-timeline-desc-content" => array(
					"font-size" => UAGB_Helper::get_css_value( $attr['subHeadFontSizeMobile'], $attr['subHeadFontSizeType'] ),
					'line-height' => UAGB_Helper::get_css_value( $attr['subHeadLineHeightMobile'], $attr['subHeadLineHeightType'] ),
				),
			);

			$mobile_selectors = self::get_timeline_mobile_selectors( $attr );

			$m_selectors = array_merge( $m_selectors, $mobile_selectors );

			// @codingStandardsIgnoreEnd

			$base_selector = ( $attr['classMigrate'] ) ? '.uagb-block-' : '#uagb-ctm-';

			$desktop = UAGB_Helper::generate_css( $selectors, $base_selector . $id );

			$tablet = UAGB_Helper::generate_css( $t_selectors, $base_selector . $id );

			$mobile = UAGB_Helper::generate_css( $m_selectors, $base_selector . $id );

			$generated_css = array(
				'desktop' => $desktop,
				'tablet'  => $tablet,
				'mobile'  => $mobile,
			);

			return $generated_css;
		}

		/**
		 * Get Content Timeline Block CSS
		 *
		 * @since 0.0.1
		 * @param array  $attr The block attributes.
		 * @param string $id The selector ID.
		 * @return array The Widget List.
		 */
		public static function get_post_timeline_css( $attr, $id ) { 			// @codingStandardsIgnoreStart

			$defaults = UAGB_Helper::$block_list['uagb/post-timeline']['attributes'];

			$attr = array_merge( $defaults, (array) $attr );
			$t_selectors = array();

			$selectors = array(
				" .uagb-timeline__heading" => array(
					"text-align"  => $attr['align'],
				),
				" .uagb-timeline__author" => array(
					"text-align"  => $attr['align'],
					"margin-bottom"  => UAGB_Helper::get_css_value( $attr['authorSpace'], 'px' )
				),
				" .uagb-timeline__link_parent" => array(
					"text-align"  => $attr['align'],
				),
				" .uagb-timeline__image a" => array(
					"text-align"  => $attr['align'],
				),
				" .uagb-timeline__author-link" => array(
					"color"  => $attr['authorColor'],
					"font-size"  => UAGB_Helper::get_css_value( $attr['authorFontSize'], $attr['authorFontSizeType'] ),
					'font-family' => $attr['authorFontFamily'],
					'font-weight' => $attr['authorFontWeight'],
					'line-height' => UAGB_Helper::get_css_value( $attr['authorLineHeight'], $attr['authorLineHeightType'] ),
				),
				" .dashicons-admin-users" => array(
					"color"  => $attr['authorColor'],
					"font-size"  => UAGB_Helper::get_css_value( $attr['authorFontSize'], $attr['authorFontSizeType'] ),
					'font-weight' => $attr['authorFontWeight'],
					'line-height' => UAGB_Helper::get_css_value( $attr['authorLineHeight'], $attr['authorLineHeightType'] ),
				),
				" .uagb-timeline__link" => array(
					"color"  => $attr['ctaColor'],
					"font-size"  => UAGB_Helper::get_css_value( $attr['ctaFontSize'], $attr['ctaFontSizeType'] ),
					'font-family' => $attr['ctaFontFamily'],
					'font-weight' => $attr['ctaFontWeight'],
					'line-height' => UAGB_Helper::get_css_value( $attr['ctaLineHeight'], $attr['ctaLineHeightType'] ),
					"background-color"  => $attr['ctaBackground'],
				),
				" .uagb-timeline__heading a" => array(
					"text-align"  => $attr['align'],
					"color"  => $attr['headingColor'],
					"font-size"  => UAGB_Helper::get_css_value( $attr['headFontSize'], $attr['headFontSizeType'] ),
					'font-family' => $attr['headFontFamily'],
					'font-weight' => $attr['headFontWeight'],
					'line-height' => UAGB_Helper::get_css_value( $attr['headLineHeight'], $attr['headLineHeightType'] ),
				),
				" .uagb-timeline__heading-text" => array(
					"margin-bottom"  => UAGB_Helper::get_css_value( $attr['headSpace'], 'px' )
				),
				" .uagb_timeline__cta-enable .uagb-timeline-desc-content" => array(
					"margin-bottom"  => UAGB_Helper::get_css_value( $attr['contentSpace'], 'px' ),
				),
			    ' .uagb-content' => array(
			        'padding'=> UAGB_Helper::get_css_value( $attr['contentPadding'], 'px' ),
			    ),
			);



			$desktop_selectors = self::get_timeline_selectors( $attr );
			$selectors = array_merge( $selectors, $desktop_selectors );

			$t_selectors = array(
				" .uagb-timeline__author-link" => array(
					"font-size"  => UAGB_Helper::get_css_value( $attr['authorFontSizeTablet'], $attr['authorFontSizeType'] ),
					'line-height' => UAGB_Helper::get_css_value( $attr['authorLineHeightTablet'], $attr['authorLineHeightType'] ),
				),
				" .dashicons-admin-users" => array(
					"font-size"  => UAGB_Helper::get_css_value( $attr['authorFontSizeTablet'], $attr['authorFontSizeType'] ),
					'line-height' => UAGB_Helper::get_css_value( $attr['authorLineHeightTablet'], $attr['authorLineHeightType'] ),
				),
				" .uagb-timeline__link" => array(
					"font-size"  => UAGB_Helper::get_css_value( $attr['ctaFontSizeTablet'], $attr['ctaFontSizeType'] ),
					'line-height' => UAGB_Helper::get_css_value( $attr['ctaLineHeightTablet'], $attr['ctaLineHeightType'] ),
				),
				" .uagb-timeline__heading a" => array(
					"font-size"  => UAGB_Helper::get_css_value( $attr['headFontSizeTablet'], $attr['headFontSizeType'] ),
					'line-height' => UAGB_Helper::get_css_value( $attr['headLineHeightTablet'], $attr['headLineHeightType'] ),
				),
				" .uagb-timeline__center-block.uagb-timeline__responsive-tablet .uagb-timeline__author" => array(
					"text-align"  => 'left',
				),
				" .uagb-timeline__center-block.uagb-timeline__responsive-tablet .uagb-timeline__link_parent" => array(
					"text-align"  => 'left',
				),
				" .uagb-timeline__center-block.uagb-timeline__responsive-tablet .uagb-timeline__image a" => array(
					'text-align' => 'left',
				),
			);

			$tablet_selectors = self::get_timeline_tablet_selectors( $attr );
			$t_selectors = array_merge( $t_selectors, $tablet_selectors );

			// Mobile responsive CSS.
			$m_selectors = array(
				" .uagb-timeline__author-link" => array(
					"font-size"  => UAGB_Helper::get_css_value( $attr['authorFontSizeMobile'], $attr['authorFontSizeType'] ),
					'line-height' => UAGB_Helper::get_css_value( $attr['authorLineHeightMobile'], $attr['authorLineHeightType'] ),
				),
				" .dashicons-admin-users" => array(
					"font-size"  => UAGB_Helper::get_css_value( $attr['authorFontSizeMobile'], $attr['authorFontSizeType'] ),
					'line-height' => UAGB_Helper::get_css_value( $attr['authorLineHeightMobile'], $attr['authorLineHeightType'] ),
				),
				" .uagb-timeline__link" => array(
					"font-size"  => UAGB_Helper::get_css_value( $attr['ctaFontSizeMobile'], $attr['ctaFontSizeType'] ),
					'line-height' => UAGB_Helper::get_css_value( $attr['ctaLineHeightMobile'], $attr['ctaLineHeightType'] ),
				),
				" .uagb-timeline__heading a" => array(
					"font-size"  => UAGB_Helper::get_css_value( $attr['headFontSizeMobile'], $attr['headFontSizeType'] ),
					'line-height' => UAGB_Helper::get_css_value( $attr['headLineHeightMobile'], $attr['headLineHeightType'] ),
				),
				" .uagb-timeline__heading" => array(
					"text-align"  => $attr['align'],
				),
				" .uagb-timeline__center-block.uagb-timeline__responsive-tablet .uagb-timeline__author" => array(
					"text-align"  => 'left',
				),
				" .uagb-timeline__center-block.uagb-timeline__responsive-tablet .uagb-timeline__link_parent" => array(
					"text-align"  => 'left',
				),
				" .uagb-timeline__center-block.uagb-timeline__responsive-mobile .uagb-timeline__image a" => array(
					'text-align' => 'left',
				),
			);

			$mobile_selectors = self::get_timeline_mobile_selectors( $attr );
			$m_selectors = array_merge( $m_selectors, $mobile_selectors );

			// @codingStandardsIgnoreEnd

			$desktop = UAGB_Helper::generate_css( $selectors, '.uagb-block-' . $id );
			$tablet  = UAGB_Helper::generate_css( $t_selectors, '.uagb-block-' . $id );
			$mobile  = UAGB_Helper::generate_css( $m_selectors, '.uagb-block-' . $id );

			$generated_css = array(
				'desktop' => $desktop,
				'tablet'  => $tablet,
				'mobile'  => $mobile,
			);

			return $generated_css;
		}

		/**
		 * Get Restaurant Menu Block CSS
		 *
		 * @since 1.0.2
		 * @param array  $attr The block attributes.
		 * @param string $id The selector ID.
		 * @return array The Widget List.
		 */
		public static function get_restaurant_menu_css( $attr, $id ) { 			// @codingStandardsIgnoreStart

			$defaults = UAGB_Helper::$block_list['uagb/restaurant-menu']['attributes'];

			$attr = array_merge( $defaults, (array) $attr );

			$m_selectors = array();
			$t_selectors = array();

			$align = $attr['headingAlign'];
            if( 'left' === $align ){
            	$align = 'flex-start';
            }else if( 'right' === $align ){
            	$align = 'flex-end';
            }

			$selectors = array(
				" .uagb-rest_menu__wrap" => array(
					'padding-left'  => UAGB_Helper::get_css_value( ( $attr['columnGap']/2 ), 'px' ),
					'padding-right'  => UAGB_Helper::get_css_value( ( $attr['columnGap']/2 ), 'px' ),
					'margin-bottom'  => UAGB_Helper::get_css_value( $attr['rowGap'], 'px' )
				),
				" .uagb-rest_menu__wrap .uagb-rm__image-content" => array(
			        'padding-left' =>  UAGB_Helper::get_css_value( $attr['imgHrPadding'],'px' ),
			        'padding-right' =>  UAGB_Helper::get_css_value( $attr['imgHrPadding'],'px' ),
			        'padding-top' =>  UAGB_Helper::get_css_value( $attr['imgVrPadding'],'px' ),
			        'padding-bottom' =>  UAGB_Helper::get_css_value( $attr['imgVrPadding'],'px' ),
			    ),
			    " .uagb-rm__image img" => array(
			        'width'=>  UAGB_Helper::get_css_value( $attr['imageWidth'], 'px' ),
			        'max-width'=>  UAGB_Helper::get_css_value( $attr['imageWidth'], 'px' ),
			    ),
			    " .uagb-rm__separator-parent" => array(
			        'justify-content' => $align,
			    ),
			    " .uagb-rm__content" => array(
					'text-align'     => $attr['headingAlign'] ,
					'padding-left'   => UAGB_Helper::get_css_value( $attr['contentHrPadding'], 'px' ),
					'padding-right'  => UAGB_Helper::get_css_value( $attr['contentHrPadding'], 'px' ),
					'padding-top'    => UAGB_Helper::get_css_value( $attr['contentVrPadding'], 'px' ),
					'padding-bottom' => UAGB_Helper::get_css_value( $attr['contentVrPadding'], 'px' ),
			    ),
			    " .uagb-rm__title" => array(
					'font-size'     => UAGB_Helper::get_css_value( $attr['titleFontSize'], $attr['titleFontSizeType'] ),
					'color'         => $attr['titleColor'] ,
					'margin-bottom' => UAGB_Helper::get_css_value( $attr['titleSpace'], 'px' ),
					'font-family'   => $attr['titleFontFamily'],
					'font-weight'   => $attr['titleFontWeight'],
					'line-height'   => UAGB_Helper::get_css_value( $attr['titleLineHeight'], $attr['titleLineHeightType'] ),
			    ),
			    " .uagb-rm__price" => array(
			        'font-size' => UAGB_Helper::get_css_value( $attr['priceFontSize'], $attr['priceFontSizeType'] ),
			        'font-family'   => $attr['priceFontFamily'],
					'font-weight'   => $attr['priceFontWeight'],
					'line-height'   => UAGB_Helper::get_css_value( $attr['priceLineHeight'], $attr['priceLineHeightType'] ),
			        'color'     => $attr['priceColor'],
			    ),
			    " .uagb-rm__desc" => array(
			        'font-size' =>  UAGB_Helper::get_css_value( $attr['descFontSize'], $attr['descFontSizeType'] ),
			        'font-family'   => $attr['descFontFamily'],
					'font-weight'   => $attr['descFontWeight'],
					'line-height'   => UAGB_Helper::get_css_value( $attr['descLineHeight'], $attr['descLineHeightType'] ),
			        'color'=>  $attr['descColor'],
			        'margin-bottom'=>  UAGB_Helper::get_css_value( $attr['descSpace'], 'px' ),
			    ),
			);

            if ( $attr["seperatorStyle"] != "none" ) {
                $selectors[" .uagb-rest_menu__wrap .uagb-rm__separator"] = array(
                    'border-top-color'=>  $attr['seperatorColor'],
                    'border-top-style'=> $attr['seperatorStyle'],
                    'border-top-width'=> UAGB_Helper::get_css_value( $attr['seperatorThickness'], 'px' ),
                    'width'=> UAGB_Helper::get_css_value( $attr['seperatorWidth'], '%' ),
                );
            }

            $selectors[' .uagb-rest_menu__wrap.uagb-rm__desk-column-'.$attr['columns'].':nth-child('.$attr['columns'].'n+1)'] = array(
                    'margin-left'=> '0',
					'clear'=> 'left',
                );

			$t_selectors = array(
				' .uagb-rest_menu__wrap.uagb-rm__desk-column-'.$attr['columns'].':nth-child('.$attr['columns'].'n+1)' => array(
					'margin-left'=> 'unset',
					'clear'=> 'unset',
				),
				' .uagb-rest_menu__wrap.uagb-rm__tablet-column-'.$attr['tcolumns'].':nth-child('.$attr['tcolumns'].'n+1)' => array(
					'margin-left'=> '0',
					'clear'=> 'left',
				),
				" .uagb-rm__title" => array(
					"font-size" => UAGB_Helper::get_css_value( $attr['titleFontSizeTablet'], $attr['titleFontSizeType'] ),
					'line-height'   => UAGB_Helper::get_css_value( $attr['titleLineHeightTablet'], $attr['titleLineHeightType'] ),
				),
				" .uagb-rm__desc" => array(
					"font-size" => UAGB_Helper::get_css_value( $attr['descFontSizeTablet'], $attr['descFontSizeType'] ),
					'line-height'   => UAGB_Helper::get_css_value( $attr['descLineHeightTablet'], $attr['descLineHeightType'] ),
				),
				" .uagb-rm__price" => array(
					"font-size" => UAGB_Helper::get_css_value( $attr['priceFontSizeTablet'], $attr['priceFontSizeType'] ),
					'line-height'   => UAGB_Helper::get_css_value( $attr['priceLineHeightTablet'], $attr['priceLineHeightType'] ),
				)
			);

			$m_selectors = array(
				' .uagb-rest_menu__wrap.uagb-rm__desk-column-'.$attr['columns'].':nth-child('.$attr['columns'].'n+1)' => array(
					'margin-left'=> 'unset',
					'clear'=> 'unset',
				),
				' .uagb-rest_menu__wrap.uagb-rm__mobile-column-'.$attr['mcolumns'].':nth-child('.$attr['mcolumns'].'n+1)' => array(
					'margin-left'=> '0',
					'clear'=> 'left',
				),
				" .uagb-rm__title" => array(
					"font-size" => UAGB_Helper::get_css_value( $attr['titleFontSizeMobile'], $attr['titleFontSizeType'] ),
					'line-height'   => UAGB_Helper::get_css_value( $attr['titleLineHeightMobile'], $attr['titleLineHeightType'] ),
				),
				" .uagb-rm__desc" => array(
					"font-size" => UAGB_Helper::get_css_value( $attr['descFontSizeMobile'], $attr['descFontSizeType'] ),
					'line-height'   => UAGB_Helper::get_css_value( $attr['descLineHeightMobile'], $attr['descLineHeightType'] ),
				),
				" .uagb-rm__price" => array(
					"font-size" => UAGB_Helper::get_css_value( $attr['priceFontSizeMobile'], $attr['priceFontSizeType'] ),
					'line-height'   => UAGB_Helper::get_css_value( $attr['priceLineHeightMobile'], $attr['priceLineHeightType'] ),
				)
			);

			// @codingStandardsIgnoreEnd
			$base_selector = ( $attr['classMigrate'] ) ? '.uagb-block-' : '#uagb-rm-';

			$desktop = UAGB_Helper::generate_css( $selectors, $base_selector . $id );
			$tablet  = UAGB_Helper::generate_css( $t_selectors, $base_selector . $id );
			$mobile  = UAGB_Helper::generate_css( $m_selectors, $base_selector . $id );

			$generated_css = array(
				'desktop' => $desktop,
				'tablet'  => $tablet,
				'mobile'  => $mobile,
			);

			return $generated_css;
		}

		/**
		 * Get Post Grid Block CSS
		 *
		 * @since 1.4.0
		 * @param array  $attr The block attributes.
		 * @param string $id The selector ID.
		 * @return array The Widget List.
		 */
		public static function get_post_grid_css( $attr, $id ) { 			// @codingStandardsIgnoreStart

			$defaults = UAGB_Helper::$block_list['uagb/post-grid']['attributes'];

			$attr = array_merge( $defaults, (array) $attr );

			$selectors = self::get_post_selectors( $attr );
			
			// Pagination CSS
			$selectors[" .uagb-post-pagination-wrap"] = array (

				"margin-top" => UAGB_Helper::get_css_value( $attr['paginationSpacing'], "px" ),
				"text-align" => $attr['paginationAlignment'],
			);
			if ( 'filled' === $attr['paginationLayout'] ) {
				$selectors[" .uagb-post-pagination-wrap .page-numbers.current"] = array ( 
					
					"background-color" =>  $attr['paginationBgActiveColor'],
					"color" =>  $attr['paginationActiveColor'],
				);
				$selectors[" .uagb-post-pagination-wrap a"] = array ( 
					
					"background-color" =>  $attr['paginationBgColor'],
					"color" =>  $attr['paginationColor'],
				);
			} else  {

				$selectors[" .uagb-post-pagination-wrap .page-numbers.current"] = array ( 
					
					"border-style" => "solid",
					"background-color"=> "transparent",
					"border-width" =>  UAGB_Helper::get_css_value( $attr['paginationBorderSize'], "px" ),
					"border-color" =>  $attr['paginationBorderActiveColor'],
					"border-radius" => UAGB_Helper::get_css_value( $attr['paginationBorderRadius'], "px" ),
					"color" =>  $attr['paginationActiveColor'],
				);

				$selectors[" .uagb-post-pagination-wrap a"] = array ( 
					
					"border-style" => "solid",
					"background-color"=> "transparent",
					"border-width" =>  UAGB_Helper::get_css_value( $attr['paginationBorderSize'], "px" ),
					"border-color" =>  $attr['paginationBorderColor'],
					"border-radius" => UAGB_Helper::get_css_value( $attr['paginationBorderRadius'], "px" ),
					"color" =>  $attr['paginationColor'],
				);

			}
			
			$m_selectors = self::get_post_mobile_selectors( $attr );

			$t_selectors = self::get_post_tablet_selectors( $attr );

			// @codingStandardsIgnoreEnd

			$desktop = UAGB_Helper::generate_css( $selectors, '.uagb-block-' . $id );

			$tablet = UAGB_Helper::generate_css( $t_selectors, '.uagb-block-' . $id );

			$mobile = UAGB_Helper::generate_css( $m_selectors, '.uagb-block-' . $id );

			$generated_css = array(
				'desktop' => $desktop,
				'tablet'  => $tablet,
				'mobile'  => $mobile,
			);

			return $generated_css;
		}

		/**
		 * Get Post Carousel Block CSS
		 *
		 * @since 1.4.0
		 * @param array  $attr The block attributes.
		 * @param string $id The selector ID.
		 * @return array The Widget List.
		 */
		public static function get_post_carousel_css( $attr, $id ) { 			// @codingStandardsIgnoreStart

			$defaults = UAGB_Helper::$block_list['uagb/post-carousel']['attributes'];

			$attr = array_merge( $defaults, (array) $attr );

			$selectors = self::get_post_selectors( $attr );

			$m_selectors = self::get_post_mobile_selectors( $attr );

			$t_selectors = self::get_post_tablet_selectors( $attr );

			$selectors[" .slick-arrow"] = array(
				"border-color" => $attr['arrowColor']
			);

			$selectors[" .slick-arrow span"] = array(
				"color" => $attr['arrowColor'],
				"font-size" => UAGB_Helper::get_css_value( $attr['arrowSize'], 'px' ),
				"width" => UAGB_Helper::get_css_value( $attr['arrowSize'], 'px' ),
				"height" => UAGB_Helper::get_css_value( $attr['arrowSize'], 'px' )
			);

			$selectors[" .slick-arrow svg"] = array(
				"fill" => $attr['arrowColor'],
				"width" => UAGB_Helper::get_css_value( $attr['arrowSize'], 'px' ),
				"height" => UAGB_Helper::get_css_value( $attr['arrowSize'], 'px' )
			);

			$selectors[" .slick-arrow"] = array(
				"border-color" => $attr['arrowColor'],
				"border-width" => UAGB_Helper::get_css_value( $attr['arrowBorderSize'], 'px' ),
				"border-radius" => UAGB_Helper::get_css_value( $attr['arrowBorderRadius'], 'px' )
			);

			$selectors[".uagb-post-grid ul.slick-dots li.slick-active button:before"] = array(
				"color" => $attr['arrowColor']
			);

			$selectors[".uagb-slick-carousel ul.slick-dots li button:before"] = array(
				"color" => $attr['arrowColor']
			);

			if ( isset( $attr['arrowDots'] ) && 'dots' == $attr['arrowDots'] ) {

				$selectors[".uagb-slick-carousel"] = array(
					"padding" => "0 0 35px 0"
				);
			}

			// @codingStandardsIgnoreEnd

			$desktop = UAGB_Helper::generate_css( $selectors, '.uagb-block-' . $id );

			$tablet = UAGB_Helper::generate_css( $t_selectors, '.uagb-block-' . $id );

			$mobile = UAGB_Helper::generate_css( $m_selectors, '.uagb-block-' . $id );

			$generated_css = array(
				'desktop' => $desktop,
				'tablet'  => $tablet,
				'mobile'  => $mobile,
			);

			return $generated_css;
		}

		/**
		 * Get Post Masonry Block CSS
		 *
		 * @since 1.4.0
		 * @param array  $attr The block attributes.
		 * @param string $id The selector ID.
		 * @return array The Widget List.
		 */
		public static function get_post_masonry_css( $attr, $id ) { 			// @codingStandardsIgnoreStart

			$defaults = UAGB_Helper::$block_list['uagb/post-masonry']['attributes'];

			$attr = array_merge( $defaults, (array) $attr );

			$selectors = self::get_post_selectors( $attr );

			$m_selectors = self::get_post_mobile_selectors( $attr );

			$t_selectors = self::get_post_tablet_selectors( $attr );

			// @codingStandardsIgnoreEnd

			$desktop = UAGB_Helper::generate_css( $selectors, '.uagb-block-' . $id );

			$tablet = UAGB_Helper::generate_css( $t_selectors, '.uagb-block-' . $id );

			$mobile = UAGB_Helper::generate_css( $m_selectors, '.uagb-block-' . $id );

			$generated_css = array(
				'desktop' => $desktop,
				'tablet'  => $tablet,
				'mobile'  => $mobile,
			);

			return $generated_css;
		}

		/**
		 * Get Post Block Selectors CSS
		 *
		 * @param array $attr The block attributes.
		 * @since 1.4.0
		 */
		public static function get_post_selectors( $attr ) { 			// @codingStandardsIgnoreStart
			return array(
				" .uagb-post__items" => array(
					"margin-right" =>  UAGB_Helper::get_css_value( ( -$attr['rowGap']/2 ), 'px' ),
					"margin-left" =>  UAGB_Helper::get_css_value( ( -$attr['rowGap']/2 ), 'px' ),
				),
				" .uagb-post__items article" => array(
					"padding-right" => UAGB_Helper::get_css_value( ( $attr['rowGap']/2 ), 'px' ),
					"padding-left" => UAGB_Helper::get_css_value( ( $attr['rowGap']/2 ), 'px' ),
					"margin-bottom" => UAGB_Helper::get_css_value( ( $attr['columnGap'] ), 'px' )
				),
				" .uagb-post__inner-wrap" => array(
					"background" => $attr['bgColor']
				),
				" .uagb-post__text" => array(
					"padding" => UAGB_Helper::get_css_value( ( $attr['contentPadding'] ), 'px' ),
					"text-align" => $attr['align']
				),
				" .uagb-post__text .uagb-post__title" => array(
					"color"=> $attr['titleColor'],
					"font-size"=> UAGB_Helper::get_css_value( $attr['titleFontSize'], $attr['titleFontSizeType'] ),
					'font-family' => $attr['titleFontFamily'],
					'font-weight' => $attr['titleFontWeight'],
					'line-height' => UAGB_Helper::get_css_value( $attr['titleLineHeight'], $attr['titleLineHeightType'] ),
					"margin-bottom"=> UAGB_Helper::get_css_value( $attr['titleBottomSpace'], 'px' )
				),
				" .uagb-post__text .uagb-post__title a" => array(
					"color"       => $attr['titleColor'],
					"font-size"   => UAGB_Helper::get_css_value( $attr['titleFontSize'], $attr['titleFontSizeType'] ),
					'font-family' => $attr['titleFontFamily'],
					'font-weight' => $attr['titleFontWeight'],
					'line-height' => UAGB_Helper::get_css_value( $attr['titleLineHeight'], $attr['titleLineHeightType'] ),
				),
				" .uagb-post__text .uagb-post-grid-byline" => array(
					"color"=> $attr['metaColor'],
					"font-size"     => UAGB_Helper::get_css_value( $attr['metaFontSize'], $attr['metaFontSizeType'] ),
					'font-family'   => $attr['metaFontFamily'],
					'font-weight'   => $attr['metaFontWeight'],
					'line-height'   => UAGB_Helper::get_css_value( $attr['metaLineHeight'], $attr['metaLineHeightType'] ),
					"margin-bottom" => UAGB_Helper::get_css_value( $attr['metaBottomSpace'], 'px' )
				),
				" .uagb-post__text .uagb-post-grid-byline .uagb-post__author" => array(
					"color"       => $attr['metaColor'],
					"font-size"   => UAGB_Helper::get_css_value( $attr['metaFontSize'], $attr['metaFontSizeType'] ),
					'font-family' => $attr['metaFontFamily'],
					'font-weight' => $attr['metaFontWeight'],
					'line-height' => UAGB_Helper::get_css_value( $attr['metaLineHeight'], $attr['metaLineHeightType'] ),
				),
				" .uagb-post__text .uagb-post-grid-byline .uagb-post__author a" => array(
					"color"       => $attr['metaColor'],
					"font-size"   => UAGB_Helper::get_css_value( $attr['metaFontSize'], $attr['metaFontSizeType'] ),
					'font-family' => $attr['metaFontFamily'],
					'font-weight' => $attr['metaFontWeight'],
					'line-height' => UAGB_Helper::get_css_value( $attr['metaLineHeight'], $attr['metaLineHeightType'] ),
				),
				" .uagb-post__text .uagb-post__excerpt" => array(
					"color"         => $attr['excerptColor'],
					"font-size"     => UAGB_Helper::get_css_value( $attr['excerptFontSize'], $attr['excerptFontSizeType'] ),
					'font-family'   => $attr['excerptFontFamily'],
					'font-weight'   => $attr['excerptFontWeight'],
					'line-height'   => UAGB_Helper::get_css_value( $attr['excerptLineHeight'], $attr['excerptLineHeightType'] ),
					"margin-bottom" => UAGB_Helper::get_css_value( $attr['excerptBottomSpace'], 'px' )
				),
				" .uagb-post__text .uagb-post__cta" => array(
					"color"         => $attr['ctaColor'],
					"font-size"     => UAGB_Helper::get_css_value( $attr['ctaFontSize'], $attr['ctaFontSizeType'] ),
					'font-family'   => $attr['ctaFontFamily'],
					'font-weight'   => $attr['ctaFontWeight'],
					'line-height'   => UAGB_Helper::get_css_value( $attr['ctaLineHeight'], $attr['ctaLineHeightType'] ),
					"background"    => $attr['ctaBgColor'],
					"border-color"  => $attr['borderColor'],
					"border-width"  => UAGB_Helper::get_css_value( $attr['borderWidth'], 'px' ),
					"border-radius" => UAGB_Helper::get_css_value( $attr['borderRadius'], 'px' ),
					"border-style"  => $attr['borderStyle'],
				),
				" .uagb-post__text .uagb-post__cta a" => array(
					"color"=> $attr['ctaColor'],
					"font-size"     => UAGB_Helper::get_css_value( $attr['ctaFontSize'], $attr['ctaFontSizeType'] ),
					'font-family'   => $attr['ctaFontFamily'],
					'font-weight'   => $attr['ctaFontWeight'],
					'line-height'   => UAGB_Helper::get_css_value( $attr['ctaLineHeight'], $attr['ctaLineHeightType'] ),
					"padding" => ( $attr['btnVPadding'] ) . "px " . ( $attr['btnHPadding'] ) . "px",
				),
				" .uagb-post__text .uagb-post__cta:hover" => array(
					"color"=> $attr['ctaHColor'],
					"background"=> $attr['ctaBgHColor'],
					"border-color"=> $attr['borderHColor']
				),
				" .uagb-post__text .uagb-post__cta:hover a" => array(
					"color"=> $attr['ctaHColor']
				),
				" .uagb-post__image:before" => array(
					"background-color" => $attr['bgOverlayColor'],
					"opacity" => ( $attr['overlayOpacity'] / 100 )
				),
			);
			// @codingStandardsIgnoreEnd
		}

		/**
		 * Get Post Block Selectors CSS for Mobile devices
		 *
		 * @param array $attr The block attributes.
		 * @since 1.6.1
		 */
		public static function get_post_mobile_selectors( $attr ) { 			// @codingStandardsIgnoreStart

			return array(
				" .uagb-post__text .uagb-post__title" => array(
					"font-size" => UAGB_Helper::get_css_value( $attr['titleFontSizeMobile'], $attr['titleFontSizeType'] ),
					'line-height'   => UAGB_Helper::get_css_value( $attr['titleLineHeightMobile'], $attr['titleLineHeightType'] ),
				),
				" .uagb-post__text .uagb-post__title a" => array(
					"font-size" => UAGB_Helper::get_css_value( $attr['titleFontSizeMobile'], $attr['titleFontSizeType'] ),
					'line-height'   => UAGB_Helper::get_css_value( $attr['titleLineHeightMobile'], $attr['titleLineHeightType'] ),
				),
				" .uagb-post__text .uagb-post-grid-byline" => array(
					"font-size" => UAGB_Helper::get_css_value( $attr['metaFontSizeMobile'], $attr['metaFontSizeType'] ),
					'line-height'   => UAGB_Helper::get_css_value( $attr['metaLineHeightMobile'], $attr['metaLineHeightType'] ),
				),
				" .uagb-post__text .uagb-post-grid-byline .uagb-post__author" => array(
					"font-size" => UAGB_Helper::get_css_value( $attr['metaFontSizeMobile'], $attr['metaFontSizeType'] ),
					'line-height'   => UAGB_Helper::get_css_value( $attr['metaLineHeightMobile'], $attr['metaLineHeightType'] ),
				),
				" .uagb-post__text .uagb-post-grid-byline .uagb-post__author a" => array(
					"font-size" => UAGB_Helper::get_css_value( $attr['metaFontSizeMobile'], $attr['metaFontSizeType'] ),
					'line-height'   => UAGB_Helper::get_css_value( $attr['metaLineHeightMobile'], $attr['metaLineHeightType'] ),
				),
				" .uagb-post__text .uagb-post__excerpt" => array(
					"font-size" => UAGB_Helper::get_css_value( $attr['excerptFontSizeMobile'], $attr['excerptFontSizeType'] ),
					'line-height'   => UAGB_Helper::get_css_value( $attr['excerptLineHeightMobile'], $attr['excerptLineHeightType'] ),
				),
				" .uagb-post__text .uagb-post__cta" => array(
					"font-size" => UAGB_Helper::get_css_value( $attr['ctaFontSizeMobile'], $attr['ctaFontSizeType'] ),
					'line-height'   => UAGB_Helper::get_css_value( $attr['ctaLineHeightMobile'], $attr['ctaLineHeightType'] ),
				),
				" .uagb-post__text .uagb-post__cta a" => array(
					"font-size" => UAGB_Helper::get_css_value( $attr['ctaFontSizeMobile'], $attr['ctaFontSizeType'] ),
					'line-height'   => UAGB_Helper::get_css_value( $attr['ctaLineHeightMobile'], $attr['ctaLineHeightType'] ),
				),
				" .uagb-post__text" => array(
					"padding" => ( $attr['contentPaddingMobile'] ) . "px",
				),
			);
			// @codingStandardsIgnoreEnd
		}

		/**
		 * Get Post Block Selectors CSS for Tablet devices
		 *
		 * @param array $attr The block attributes.
		 * @since 1.8.2
		 */
		public static function get_post_tablet_selectors( $attr ) { 			// @codingStandardsIgnoreStart
			return array(
				" .uagb-post__text .uagb-post__title" => array(
					"font-size" => UAGB_Helper::get_css_value( $attr['titleFontSizeTablet'], $attr['titleFontSizeType'] ),
					'line-height'   => UAGB_Helper::get_css_value( $attr['titleLineHeightTablet'], $attr['titleLineHeightType'] ),
				),
				" .uagb-post__text .uagb-post__title a" => array(
					"font-size" => UAGB_Helper::get_css_value( $attr['titleFontSizeTablet'], $attr['titleFontSizeType'] ),
					'line-height'   => UAGB_Helper::get_css_value( $attr['titleLineHeightTablet'], $attr['titleLineHeightType'] ),
				),
				" .uagb-post__text .uagb-post-grid-byline" => array(
					"font-size" => UAGB_Helper::get_css_value( $attr['metaFontSizeTablet'], $attr['metaFontSizeType'] ),
					'line-height'   => UAGB_Helper::get_css_value( $attr['metaLineHeightTablet'], $attr['metaLineHeightType'] ),
				),
				" .uagb-post__text .uagb-post-grid-byline .uagb-post__author" => array(
					"font-size" => UAGB_Helper::get_css_value( $attr['metaFontSizeTablet'], $attr['metaFontSizeType'] ),
					'line-height'   => UAGB_Helper::get_css_value( $attr['metaLineHeightTablet'], $attr['metaLineHeightType'] ),
				),
				" .uagb-post__text .uagb-post-grid-byline .uagb-post__author a" => array(
					"font-size" => UAGB_Helper::get_css_value( $attr['metaFontSizeTablet'], $attr['metaFontSizeType'] ),
					'line-height'   => UAGB_Helper::get_css_value( $attr['metaLineHeightTablet'], $attr['metaLineHeightType'] ),
				),
				" .uagb-post__text .uagb-post__excerpt" => array(
					"font-size" => UAGB_Helper::get_css_value( $attr['excerptFontSizeTablet'], $attr['excerptFontSizeType'] ),
					'line-height'   => UAGB_Helper::get_css_value( $attr['excerptLineHeightTablet'], $attr['excerptLineHeightType'] ),
				),
				" .uagb-post__text .uagb-post__cta" => array(
					"font-size" => UAGB_Helper::get_css_value( $attr['ctaFontSizeTablet'], $attr['ctaFontSizeType'] ),
					'line-height'   => UAGB_Helper::get_css_value( $attr['ctaLineHeightTablet'], $attr['ctaLineHeightType'] ),
				),
				" .uagb-post__text .uagb-post__cta a" => array(
					"font-size" => UAGB_Helper::get_css_value( $attr['ctaFontSizeTablet'], $attr['ctaFontSizeType'] ),
					'line-height'   => UAGB_Helper::get_css_value( $attr['ctaLineHeightTablet'], $attr['ctaLineHeightType'] ),
				),
			);
			// @codingStandardsIgnoreEnd
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
			// @codingStandardsIgnoreStart

			$defaults = UAGB_Helper::$block_list['uagb/blockquote']['attributes'];

			$attr = array_merge( $defaults, (array) $attr );

			$alignment = ( $attr['align'] == 'left' ) ? 'flex-start' : ( ( $attr['align'] == 'right' ) ? 'flex-end' : 'center' );

			$content_align ="center";

			if( 'left' === $attr['align'] ){
				$content_align =" flex-start";
			}
			if( 'right' === $attr['align'] ){
				$content_align =" flex-end";
			}

			$author_space = $attr['authorSpace'];

			if( 'center' !== $attr['align'] ||  $attr['skinStyle'] == "border" ){
				$author_space = 0;
			}

			//Set align to left for border style.
			$text_align = $attr['align'];

			if( 'border' === $attr['skinStyle'] ){
				$text_align = 'left';
			}

			$selectors = array(
				" .uagb-blockquote__content" => array(
					"font-size"     => UAGB_Helper::get_css_value( $attr['descFontSize'], $attr['descFontSizeType'] ),
					'font-family'   => $attr['descFontFamily'],
					'font-weight'   => $attr['descFontWeight'],
					'line-height'   => UAGB_Helper::get_css_value( $attr['descLineHeight'], $attr['descLineHeightType'] ),
					"color"         => $attr['descColor'],
					"margin-bottom" => UAGB_Helper::get_css_value( $attr['descSpace'], 'px' ),
					"text-align"    => $text_align,
				),
				" cite.uagb-blockquote__author" => array(
					"font-size"         => UAGB_Helper::get_css_value( $attr['authorFontSize'], $attr['authorFontSizeType'] ),
					'font-family'   => $attr['authorFontFamily'],
					'font-weight'   => $attr['authorFontWeight'],
					'line-height'   => UAGB_Helper::get_css_value( $attr['authorLineHeight'], $attr['authorLineHeightType'] ),
					"color"             => $attr['authorColor'],
					"text-align"        => $text_align,
				),
				" .uagb-blockquote__skin-border blockquote.uagb-blockquote" => array(
					"border-color"      => $attr['borderColor'],
					"border-left-style" => $attr['borderStyle'],
					"border-left-width" => UAGB_Helper::get_css_value( $attr['borderWidth'], 'px' ),
					"padding-left"      => UAGB_Helper::get_css_value( $attr['borderGap'], 'px' ),
					"padding-top"       => UAGB_Helper::get_css_value( $attr['verticalPadding'], 'px' ),
					"padding-bottom"    => UAGB_Helper::get_css_value( $attr['verticalPadding'], 'px' ),
				),

				" .uagb-blockquote__skin-quotation .uagb-blockquote__icon-wrap" => array(
					"background"        => $attr['quoteBgColor'],
					"border-radius"     => UAGB_Helper::get_css_value( $attr['quoteBorderRadius'],'%' ),
					"margin-top"        => UAGB_Helper::get_css_value( $attr['quoteTopMargin'], 'px' ),
					"margin-bottom"     => UAGB_Helper::get_css_value( $attr['quoteBottomMargin'], 'px' ),
					"margin-left"       => UAGB_Helper::get_css_value( $attr['quoteLeftMargin'], 'px' ),
					"margin-right"      => UAGB_Helper::get_css_value( $attr['quoteRightMargin'], 'px' ),
					"padding"      		=> UAGB_Helper::get_css_value( $attr['quotePadding'], $attr['quotePaddingType'] ),
				),

				" .uagb-blockquote__skin-quotation .uagb-blockquote__icon" => array(
					"width"             => UAGB_Helper::get_css_value( $attr['quoteSize'], $attr['quoteSizeType'] ),
					"height"            => UAGB_Helper::get_css_value( $attr['quoteSize'], $attr['quoteSizeType'] ),
				),

				" .uagb-blockquote__skin-quotation .uagb-blockquote__icon svg" => array(
					"fill"         => $attr['quoteColor'],
				),

				" .uagb-blockquote__style-style_1 .uagb-blockquote" => array(
					"text-align"        => $attr['align'],
				),

				" .uagb-blockquote__author-wrap" => array(
					"margin-bottom"     => UAGB_Helper::get_css_value( $author_space, 'px' ),
				),
				" .uagb-blockquote__author-image img" => array(
					"width"             => UAGB_Helper::get_css_value( $attr['authorImageWidth'], 'px' ),
					"height"            => UAGB_Helper::get_css_value( $attr['authorImageWidth'], 'px' ),
					"border-radius"     => UAGB_Helper::get_css_value( $attr['authorImgBorderRadius'], '%' )
				),

				" .uagb-blockquote__skin-quotation .uagb-blockquote__icon:hover svg" => array(
					"fill"         => $attr['quoteHoverColor'],
				),

				" .uagb-blockquote__skin-quotation .uagb-blockquote__icon-wrap:hover" => array(
					"background"    => $attr['quoteBgHoverColor'],
				),

				" .uagb-blockquote__skin-border blockquote.uagb-blockquote:hover" => array(
					"border-left-color"         => $attr['borderHoverColor'],
				),
			);

			if( $attr['enableTweet'] ){
				$selectors[" a.uagb-blockquote__tweet-button"] = array(
					"font-size"          => UAGB_Helper::get_css_value( $attr['tweetBtnFontSize'], $attr['tweetBtnFontSizeType'] ),
					'font-family'   => $attr['tweetBtnFontFamily'],
					'font-weight'   => $attr['tweetBtnFontWeight'],
					'line-height'   => UAGB_Helper::get_css_value( $attr['tweetBtnLineHeight'], $attr['tweetBtnLineHeightType'] ),
				);

				$selectors[" .uagb-blockquote__tweet-style-link a.uagb-blockquote__tweet-button"] = array(
					"color"              => $attr['tweetLinkColor'],
				);

				$selectors[" .uagb-blockquote__tweet-style-link a.uagb-blockquote__tweet-button svg"] = array(
					"fill"              => $attr['tweetLinkColor'],
				);

				$selectors[" .uagb-blockquote__tweet-style-classic a.uagb-blockquote__tweet-button"] = array(
					"color"              => $attr['tweetBtnColor'],
					"background-color"   => $attr['tweetBtnBgColor'],
					"padding-left"       => UAGB_Helper::get_css_value( $attr['tweetBtnHrPadding'], 'px' ),
					"padding-right"      => UAGB_Helper::get_css_value( $attr['tweetBtnHrPadding'], 'px' ),
					"padding-top"        => UAGB_Helper::get_css_value( $attr['tweetBtnVrPadding'], 'px' ),
					"padding-bottom"     => UAGB_Helper::get_css_value( $attr['tweetBtnVrPadding'], 'px' ),
				);

				$selectors[" .uagb-blockquote__tweet-style-classic a.uagb-blockquote__tweet-button svg"] = array(
					"fill"              => $attr['tweetBtnColor'],
				);

				$selectors[" .uagb-blockquote__tweet-style-bubble a.uagb-blockquote__tweet-button"] = array(
					"color"              => $attr['tweetBtnColor'],
					"background-color"   => $attr['tweetBtnBgColor'],
					"padding-left"       => UAGB_Helper::get_css_value( $attr['tweetBtnHrPadding'], 'px' ),
					"padding-right"      => UAGB_Helper::get_css_value( $attr['tweetBtnHrPadding'], 'px' ),
					"padding-top"        => UAGB_Helper::get_css_value( $attr['tweetBtnVrPadding'], 'px' ),
					"padding-bottom"     => UAGB_Helper::get_css_value( $attr['tweetBtnVrPadding'], 'px' ),
				);

				$selectors[" .uagb-blockquote__tweet-style-bubble a.uagb-blockquote__tweet-button svg"] = array(
					"fill"              => $attr['tweetBtnColor'],
				);

				$selectors[" .uagb-blockquote__tweet-style-bubble a.uagb-blockquote__tweet-button:before"] = array(
					"border-right-color" => $attr['tweetBtnBgColor'],
				);

				$selectors[" a.uagb-blockquote__tweet-button svg"] = array(
					"width"       		 => UAGB_Helper::get_css_value( $attr['tweetBtnFontSize'], $attr['tweetBtnFontSizeType'] ),
					"height"             => UAGB_Helper::get_css_value( $attr['tweetBtnFontSize'], $attr['tweetBtnFontSizeType'] ),
				);

				$selectors[" .uagb-blockquote__tweet-icon_text a.uagb-blockquote__tweet-button svg"] = array(
					"margin-right"       => UAGB_Helper::get_css_value( $attr['tweetIconSpacing'], 'px' ),
				);

				// Hover CSS.
				$selectors[" .uagb-blockquote__tweet-style-link a.uagb-blockquote__tweet-button:hover"] = array(
					"color"              => $attr['tweetBtnHoverColor'],
				);

				$selectors[" .uagb-blockquote__tweet-style-link a.uagb-blockquote__tweet-button:hover svg"] = array(
					"fill"              => $attr['tweetBtnHoverColor'],
				);

				$selectors[" .uagb-blockquote__tweet-style-classic a.uagb-blockquote__tweet-button:hover"] = array(
					"color"              => $attr['tweetBtnHoverColor'],
					"background-color"   => $attr['tweetBtnBgHoverColor'],
				);

				$selectors[" .uagb-blockquote__tweet-style-classic a.uagb-blockquote__tweet-button:hover svg"] = array(
					"fill"              => $attr['tweetBtnHoverColor'],
				);

				$selectors[" .uagb-blockquote__tweet-style-bubble a.uagb-blockquote__tweet-button:hover"] = array(
					"color"              => $attr['tweetBtnHoverColor'],
					"background-color"   => $attr['tweetBtnBgHoverColor'],
				);

				$selectors[" .uagb-blockquote__tweet-style-bubble a.uagb-blockquote__tweet-button:hover svg"] = array(
					"fill"              => $attr['tweetBtnHoverColor'],
				);

				$selectors[" .uagb-blockquote__tweet-style-bubble a.uagb-blockquote__tweet-button:hover:before"] = array(
					"border-right-color" => $attr['tweetBtnBgHoverColor'],
				);
			}

			$t_selectors = array(
				" .uagb-blockquote__content" => array(
					"font-size"         => UAGB_Helper::get_css_value( $attr['descFontSizeTablet'], $attr['descFontSizeType'] ),
					'line-height'   => UAGB_Helper::get_css_value( $attr['descLineHeightTablet'], $attr['descLineHeightType'] ),
				),
				" cite.uagb-blockquote__author" =>array(
					"font-size"         => UAGB_Helper::get_css_value( $attr['authorFontSizeTablet'], $attr['authorFontSizeType'] ),
					'line-height'   => UAGB_Helper::get_css_value( $attr['authorLineHeightTablet'], $attr['authorLineHeightType'] ),
				),
				" a.uagb-blockquote__tweet-button" => array(
					"font-size"          => UAGB_Helper::get_css_value( $attr['tweetBtnFontSizeTablet'], $attr['tweetBtnFontSizeType'] ),
					'line-height'   => UAGB_Helper::get_css_value( $attr['tweetBtnLineHeightTablet'], $attr['tweetBtnLineHeightType'] ),
				),
				" a.uagb-blockquote__tweet-button svg" => array(
					"width"       		 => UAGB_Helper::get_css_value( $attr['tweetBtnFontSizeTablet'], $attr['tweetBtnFontSizeType'] ),
					"height"             => UAGB_Helper::get_css_value( $attr['tweetBtnFontSizeTablet'], $attr['tweetBtnFontSizeType'] ),
				),
				" .uagb-blockquote__skin-quotation .uagb-blockquote__icon-wrap" => array(
					"padding"      		=> UAGB_Helper::get_css_value( $attr['quotePaddingTablet'], $attr['quotePaddingType'] ),
				),
				" .uagb-blockquote__skin-quotation .uagb-blockquote__icon" => array(
					"width"             => UAGB_Helper::get_css_value( $attr['quoteSizeTablet'], $attr['quoteSizeType'] ),
					"height"            => UAGB_Helper::get_css_value( $attr['quoteSizeTablet'], $attr['quoteSizeType'] ),
				),
			);

			$m_selectors = array(
				" .uagb-blockquote__content" =>  array(
					"font-size"   => UAGB_Helper::get_css_value( $attr['descFontSizeMobile'], $attr['descFontSizeType'] ),
					'line-height' => UAGB_Helper::get_css_value( $attr['descLineHeightMobile'], $attr['descLineHeightType'] ),
				),
				" cite.uagb-blockquote__author" =>  array(
					"font-size"   => UAGB_Helper::get_css_value( $attr['authorFontSizeMobile'], $attr['authorFontSizeType'] ),
					'line-height' => UAGB_Helper::get_css_value( $attr['authorLineHeightMobile'], $attr['authorLineHeightType'] ),
				),
				" a.uagb-blockquote__tweet-button" => array(
					"font-size"   => UAGB_Helper::get_css_value( $attr['tweetBtnFontSizeMobile'], $attr['tweetBtnFontSizeType'] ),
					'line-height' => UAGB_Helper::get_css_value( $attr['tweetBtnLineHeightMobile'], $attr['tweetBtnLineHeightType'] ),
				),
				" a.uagb-blockquote__tweet-button svg" => array(
					"width"  => UAGB_Helper::get_css_value( $attr['tweetBtnFontSizeMobile'], $attr['tweetBtnFontSizeType'] ),
					"height" => UAGB_Helper::get_css_value( $attr['tweetBtnFontSizeMobile'], $attr['tweetBtnFontSizeType'] ),
				),
				" .uagb-blockquote__skin-quotation .uagb-blockquote__icon-wrap" => array(
					"padding"      		=> UAGB_Helper::get_css_value( $attr['quotePaddingMobile'], $attr['quotePaddingType'] ),
				),
				" .uagb-blockquote__skin-quotation .uagb-blockquote__icon" => array(
					"width"  => UAGB_Helper::get_css_value( $attr['quoteSizeMobile'], $attr['quoteSizeType'] ),
					"height" => UAGB_Helper::get_css_value( $attr['quoteSizeMobile'], $attr['quoteSizeType'] ),
				),
			);

			// @codingStandardsIgnoreEnd

			$base_selector = ( $attr['classMigrate'] ) ? '.uagb-block-' : '#uagb-blockquote-';

			$desktop = UAGB_Helper::generate_css( $selectors, $base_selector . $id );

			$tablet = UAGB_Helper::generate_css( $t_selectors, $base_selector . $id );

			$mobile = UAGB_Helper::generate_css( $m_selectors, $base_selector . $id );

			$generated_css = array(
				'desktop' => $desktop,
				'tablet'  => $tablet,
				'mobile'  => $mobile,
			);

			return $generated_css;
		}

		/**
		 * Get Timeline Block Desktop Selectors CSS
		 *
		 * @param array $attr The block attributes.
		 * @since 1.8.2
		 */
		public static function get_timeline_selectors( $attr ) { 			// @codingStandardsIgnoreStart
			$selectors = array(
				" .uagb-timeline__heading-text" => array(
					"margin-bottom"  => UAGB_Helper::get_css_value( $attr['headSpace'], 'px' )
				),
				" .uagb-timeline-desc-content" => array(
					"text-align"  => $attr['align'],
					"color"       => $attr['subHeadingColor'],
					"font-size"   => UAGB_Helper::get_css_value( $attr['subHeadFontSize'], $attr['subHeadFontSizeType'] ),
					'font-family' => $attr['subHeadFontFamily'],
					'font-weight' => $attr['subHeadFontWeight'],
					'line-height' => UAGB_Helper::get_css_value( $attr['subHeadLineHeight'], $attr['subHeadLineHeightType'] ),
				),
				' .uagb-timeline__events-new' => array(
					'text-align' => $attr['align']
				),
				' .uagb-timeline__date-inner' => array(
					'text-align' => $attr['align']
				),
				' .uagb-timeline__center-block .uagb-timeline__day-right .uagb-timeline__arrow:after' => array(
			        'border-left-color'  => $attr['backgroundColor']
			    ),
			    ' .uagb-timeline__right-block .uagb-timeline__day-right .uagb-timeline__arrow:after' => array(
					'border-left-color'  => $attr['backgroundColor']
				),
				' .uagb-timeline__center-block .uagb-timeline__day-left .uagb-timeline__arrow:after' => array(
			        'border-right-color'  => $attr['backgroundColor']
			    ),
			     ' .uagb-timeline__left-block .uagb-timeline__day-left .uagb-timeline__arrow:after' => array(
			        'border-right-color'  => $attr['backgroundColor']
			    ),
			    ' .uagb-timeline__line__inner' => array(
					'background-color'  => $attr['separatorFillColor']
				),
				' .uagb-timeline__line' => array(
					'background-color'  => $attr['separatorColor'],
					'width'  => UAGB_Helper::get_css_value( $attr['separatorwidth'], 'px' )
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
			    ' .uagb-timeline__marker' => array(
					'background-color' => $attr['separatorBg'],
					'min-height'       => UAGB_Helper::get_css_value( $attr['connectorBgsize'], 'px' ),
					'min-width'        => UAGB_Helper::get_css_value( $attr['connectorBgsize'], 'px' ),
					'line-height'      => UAGB_Helper::get_css_value( $attr['connectorBgsize'], 'px' ),
					'border'           => $attr['borderwidth'].'px solid'.$attr['separatorBorder'],
				),
				' .uagb-timeline__left-block .uagb-timeline__left .uagb-timeline__arrow' => array(
			        'height' => UAGB_Helper::get_css_value( $attr['connectorBgsize'], 'px' ),
			    ),
			    ' .uagb-timeline__right-block .uagb-timeline__right .uagb-timeline__arrow' => array(
			        'height' => UAGB_Helper::get_css_value( $attr['connectorBgsize'], 'px' ),
			    ),
			    ' .uagb-timeline__center-block .uagb-timeline__left .uagb-timeline__arrow' => array(
					'height' => UAGB_Helper::get_css_value( $attr['connectorBgsize'], 'px' ),
				),
				' .uagb-timeline__center-block .uagb-timeline__right .uagb-timeline__arrow' => array(
					'height' => UAGB_Helper::get_css_value( $attr['connectorBgsize'], 'px' ),
				),
				' .uagb-timeline__center-block .uagb-timeline__marker' => array(
					'margin-left' => UAGB_Helper::get_css_value( $attr['horizontalSpace'], 'px' ),
					'margin-right'=> UAGB_Helper::get_css_value( $attr['horizontalSpace'], 'px' ),
				),
				' .uagb-timeline__field:not(:last-child)' => array(
					'margin-bottom' => UAGB_Helper::get_css_value( $attr['verticalSpace'], 'px' ),
				),
				' .uagb-timeline__date-hide.uagb-timeline__date-inner' => array(
					'margin-bottom' => UAGB_Helper::get_css_value( $attr['dateBottomspace'], 'px' ),
					'color'         => $attr['dateColor'],
					'font-size'     => UAGB_Helper::get_css_value( $attr['dateFontsize'], $attr['dateFontsizeType'] ),
					'font-family'   => $attr['dateFontFamily'],
					'font-weight'   => $attr['dateFontWeight'],
					'line-height'   => UAGB_Helper::get_css_value( $attr['dateLineHeight'], $attr['dateLineHeightType'] ),
					'text-align'    => $attr['align'],
			    ),
			    ' .uagb-timeline__left-block .uagb-timeline__day-new.uagb-timeline__day-left' => array(
			        'margin-left' => UAGB_Helper::get_css_value( $attr['horizontalSpace'], 'px' ),
			    ),
			    ' .uagb-timeline__right-block .uagb-timeline__day-new.uagb-timeline__day-right' => array(
					'margin-right' => UAGB_Helper::get_css_value( $attr['horizontalSpace'], 'px' ),
				),
				' .uagb-timeline__date-new' => array(
					'color'       => $attr['dateColor'],
					'font-size'   => UAGB_Helper::get_css_value( $attr['dateFontsize'], $attr['dateFontsizeType'] ),
					'font-family' => $attr['dateFontFamily'],
					'font-weight' => $attr['dateFontWeight'],
					'line-height' => UAGB_Helper::get_css_value( $attr['dateLineHeight'], $attr['dateLineHeightType'] ),
				),
				' .uagb-timeline__events-inner-new' => array(
					'background-color' => $attr['backgroundColor'],
					'border-radius' => UAGB_Helper::get_css_value( $attr['borderRadius'], 'px' ),
					'padding'=> UAGB_Helper::get_css_value( $attr['bgPadding'], 'px' ),
				),
				' .uagb-timeline__main .uagb-timeline__icon-new' => array(
					'color'     => $attr['iconColor'],
					'font-size' => UAGB_Helper::get_css_value( $attr['iconSize'], 'px' ),
					'width'     => UAGB_Helper::get_css_value( $attr['iconSize'], 'px' ),
				),
				' .uagb-timeline__main .uagb-timeline__marker.uagb-timeline__in-view-icon .uagb-timeline__icon-new svg' => array(
					'fill'=> $attr['iconFocus'],
				),
				' .uagb-timeline__main .uagb-timeline__marker.uagb-timeline__in-view-icon .uagb-timeline__icon-new' => array(
			        'color'=> $attr['iconFocus'],
			    ),
			    ' .uagb-timeline__main .uagb-timeline__marker.uagb-timeline__in-view-icon' => array(
					'background' => $attr['iconBgFocus'],
					'border-color'=> $attr['borderFocus'],
				),
				' .uagb-timeline__main .uagb-timeline__icon-new svg' => array(
			        'fill'=> $attr['iconColor'],
			    ),
			);

			return $selectors;
			// @codingStandardsIgnoreEnd
		}

		/**
		 * Get Timeline Block Tablet Selectors CSS.
		 *
		 * @param array $attr The block attributes.
		 * @since 1.8.2
		 */
		public static function get_timeline_tablet_selectors( $attr ) { 			// @codingStandardsIgnoreStart
			$tablet_selector = array(
				" .uagb-timeline-desc-content" => array(
					"font-size"  => UAGB_Helper::get_css_value( $attr['subHeadFontSizeTablet'], $attr['subHeadFontSizeType'] ),
					'line-height' => UAGB_Helper::get_css_value( $attr['subHeadLineHeightTablet'], $attr['subHeadLineHeightType'] ),
				),
				' .uagb-timeline__date-hide.uagb-timeline__date-inner' => array(
				    'font-size' => UAGB_Helper::get_css_value( $attr['dateFontsizeTablet'], $attr['dateFontsizeType'] ),
				    'line-height' => UAGB_Helper::get_css_value( $attr['dateLineHeightTablet'], $attr['dateLineHeightType'] ),
				),
				' .uagb-timeline__date-new' => array(
					'font-size' => UAGB_Helper::get_css_value( $attr['dateFontsizeTablet'], $attr['dateFontsizeType'] ),
					'line-height' => UAGB_Helper::get_css_value( $attr['dateLineHeightTablet'], $attr['dateLineHeightType'] ),
				),
				' .uagb-timeline__center-block .uagb-timeline__marker' => array(
			        'margin-left' => 0,
			        'margin-right' => 0,
			    ),
			    " .uagb-timeline__center-block.uagb-timeline__responsive-tablet .uagb-timeline__heading" => array(
					"text-align"  => 'left',
				),
				" .uagb-timeline__center-block.uagb-timeline__responsive-tablet .uagb-timeline-desc-content" => array(
					"text-align"  => 'left',
				),
				' .uagb-timeline__center-block.uagb-timeline__responsive-tablet .uagb-timeline__events-new' => array(
					'text-align' => 'left'
				),
				' .uagb-timeline__center-block.uagb-timeline__responsive-tablet .uagb-timeline__date-inner' => array(
			        'text-align' => 'left'
			    ),
			    ' .uagb-timeline__center-block.uagb-timeline__responsive-tablet .uagb-timeline__date-hide.uagb-timeline__date-inner' => array(
					'text-align'=> 'left',
				),
				" .uagb-timeline__center-block.uagb-timeline__responsive-tablet .uagb-timeline__day-right .uagb-timeline__arrow:after" => array(
					"border-right-color"  => $attr['backgroundColor'],
				),
				" .uagb-timeline__center-block.uagb-timeline__responsive-tablet .uagb-timeline__line" => array(
					'left' => 'calc( '.$attr['connectorBgsize'].'px / 2 )',
				),
			);

			return $tablet_selector;
			// @codingStandardsIgnoreEnd
		}

		/**
		 * Get Timeline Block Mobile Selectors CSS.
		 *
		 * @param array $attr The block attributes.
		 * @since 1.8.2
		 */
		public static function get_timeline_mobile_selectors( $attr ) {         	// @codingStandardsIgnoreStart
        	$m_selectors = array(
        		" .uagb-timeline-desc-content" => array(
					"font-size"  => UAGB_Helper::get_css_value( $attr['subHeadFontSizeMobile'], $attr['subHeadFontSizeType'] ),
					'line-height' => UAGB_Helper::get_css_value( $attr['subHeadLineHeightMobile'], $attr['subHeadLineHeightType'] ),
				),
				' .uagb-timeline__date-hide.uagb-timeline__date-inner' => array(
				    'font-size' => UAGB_Helper::get_css_value( $attr['dateFontsizeMobile'], $attr['dateFontsizeType'] ),
				    'line-height' => UAGB_Helper::get_css_value( $attr['dateLineHeightMobile'], $attr['dateLineHeightType'] ),
				),
				' .uagb-timeline__date-new' => array(
					'font-size' => UAGB_Helper::get_css_value( $attr['dateFontsizeMobile'], $attr['dateFontsizeType'] ),
					'line-height' => UAGB_Helper::get_css_value( $attr['dateLineHeightMobile'], $attr['dateLineHeightType'] ),
				),
				' .uagb-timeline__center-block .uagb-timeline__marker' => array(
			        'margin-left' => 0,
			        'margin-right' => 0,
			    ),
			    ' .uagb-timeline__center-block .uagb-timeline__day-new.uagb-timeline__day-left' => array(
					'margin-left' => UAGB_Helper::get_css_value( $attr['horizontalSpace'], 'px' ),
				),
				' .uagb-timeline__center-block .uagb-timeline__day-new.uagb-timeline__day-right' => array(
			        'margin-left' => UAGB_Helper::get_css_value( $attr['horizontalSpace'], 'px' ),
			    ),
				" .uagb-timeline__center-block.uagb-timeline__responsive-mobile .uagb-timeline__heading" => array(
					"text-align"  => 'left',
				),
				" .uagb-timeline__center-block.uagb-timeline__responsive-mobile .uagb-timeline-desc-content" => array(
					"text-align"  => 'left',
				),
				' .uagb-timeline__center-block.uagb-timeline__responsive-mobile .uagb-timeline__events-new' => array(
					'text-align' => 'left'
				),
				' .uagb-timeline__center-block.uagb-timeline__responsive-mobile .uagb-timeline__date-inner' => array(
					'text-align' => 'left'
				),
				' .uagb-timeline__center-block.uagb-timeline__responsive-mobile .uagb-timeline__date-hide.uagb-timeline__date-inner' => array(
					'text-align'=> 'left',
				),
				" .uagb-timeline__center-block.uagb-timeline__responsive-mobile .uagb-timeline__day-right .uagb-timeline__arrow:after" => array(
					"border-right-color"  => $attr['backgroundColor'],
				),
				" .uagb-timeline__center-block.uagb-timeline__responsive-mobile .uagb-timeline__line" => array(
					'left' => 'calc( '.$attr['connectorBgsize'].'px / 2 )',
				),
			);
			return $m_selectors;
        	// @codingStandardsIgnoreEnd
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

			$selectors = array(
				' .wpcf7 .wpcf7-form'                 => array(
					'text-align' => $attr['align'],
				),
				' .wpcf7 form.wpcf7-form:not(input)'  => array(
					'color' => $attr['fieldLabelColor'],
				),
				' .wpcf7 input:not([type=submit])'    => array(
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
					'font-size'        => UAGB_Helper::get_css_value( $attr['inputFontSize'], $attr['inputFontSizeType'] ),
					'font-family'      => $attr['inputFontFamily'],
					'font-weight'      => $attr['inputFontWeight'],
					'line-height'      => UAGB_Helper::get_css_value( $attr['inputLineHeight'], $attr['inputLineHeightType'] ),
					'text-align'       => $attr['align'],
				),
				' .wpcf7 select'                      => array(
					'background-color' => $attr['fieldBgColor'],
					'color'            => $attr['fieldLabelColor'],
					'border-style'     => $attr['fieldBorderStyle'],
					'border-color'     => $attr['fieldBorderColor'],
					'border-width'     => UAGB_Helper::get_css_value( $attr['fieldBorderWidth'], 'px' ),
					'border-radius'    => UAGB_Helper::get_css_value( $attr['fieldBorderRadius'], $attr['fieldBorderRadiusType'] ),
					'margin-top'       => UAGB_Helper::get_css_value( $attr['fieldLabelSpacing'], 'px' ),
					'margin-bottom'    => UAGB_Helper::get_css_value( $attr['fieldSpacing'], 'px' ),
					'font-size'        => UAGB_Helper::get_css_value( $attr['inputFontSize'], $attr['inputFontSizeType'] ),
					'font-family'      => $attr['inputFontFamily'],
					'font-weight'      => $attr['inputFontWeight'],
					'line-height'      => UAGB_Helper::get_css_value( $attr['inputLineHeight'], $attr['inputLineHeightType'] ),
					'text-align'       => $attr['align'],
				),
				' .wpcf7 select.wpcf7-form-control.wpcf7-select:not([multiple="multiple"])' => array(
					'padding-left'   => UAGB_Helper::get_css_value( $attr['fieldHrPadding'], 'px' ),
					'padding-right'  => UAGB_Helper::get_css_value( $attr['fieldHrPadding'], 'px' ),
					'padding-top'    => UAGB_Helper::get_css_value( $attr['fieldVrPadding'], 'px' ),
					'padding-bottom' => UAGB_Helper::get_css_value( $attr['fieldVrPadding'], 'px' ),
				),
				' .wpcf7 select.wpcf7-select[multiple="multiple"] option' => array(
					'padding-left'   => UAGB_Helper::get_css_value( $attr['fieldHrPadding'], 'px' ),
					'padding-right'  => UAGB_Helper::get_css_value( $attr['fieldHrPadding'], 'px' ),
					'padding-top'    => UAGB_Helper::get_css_value( $attr['fieldVrPadding'], 'px' ),
					'padding-bottom' => UAGB_Helper::get_css_value( $attr['fieldVrPadding'], 'px' ),
				),
				' .wpcf7 textarea'                    => array(
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
					'font-size'        => UAGB_Helper::get_css_value( $attr['inputFontSize'], $attr['inputFontSizeType'] ),
					'font-family'      => $attr['inputFontFamily'],
					'font-weight'      => $attr['inputFontWeight'],
					'line-height'      => UAGB_Helper::get_css_value( $attr['inputLineHeight'], $attr['inputLineHeightType'] ),
					'text-align'       => $attr['align'],
				),
				' .wpcf7 textarea::placeholder'       => array(
					'color'      => $attr['fieldInputColor'],
					'text-align' => $attr['align'],
				),
				' .wpcf7 input::placeholder'          => array(
					'color'      => $attr['fieldInputColor'],
					'text-align' => $attr['align'],
				),
				' .wpcf7 form label'                  => array(
					'font-size'   => UAGB_Helper::get_css_value( $attr['labelFontSize'], $attr['labelFontSizeType'] ),
					'font-family' => $attr['labelFontFamily'],
					'font-weight' => $attr['labelFontWeight'],
					'line-height' => UAGB_Helper::get_css_value( $attr['labelLineHeight'], $attr['labelLineHeightType'] ),
				),
				' .wpcf7 form .wpcf7-list-item-label' => array(
					'font-size'   => UAGB_Helper::get_css_value( $attr['labelFontSize'], $attr['labelFontSizeType'] ),
					'font-family' => $attr['labelFontFamily'],
					'font-weight' => $attr['labelFontWeight'],
					'line-height' => UAGB_Helper::get_css_value( $attr['labelLineHeight'], $attr['labelLineHeightType'] ),
				),

				// Focus.
				' .wpcf7 form input:not([type=submit]):focus' => array(
					'border-color' => $attr['fieldBorderFocusColor'],
				),
				' .wpcf7 form select:focus'           => array(
					'border-color' => $attr['fieldBorderFocusColor'],
				),
				' .wpcf7 textarea:focus'              => array(
					'border-color' => $attr['fieldBorderFocusColor'],
				),

				// Submit button.
				' .wpcf7 input.wpcf7-form-control.wpcf7-submit' => array(
					'color'            => $attr['buttonTextColor'],
					'background-color' => $attr['buttonBgColor'],
					'font-size'        => UAGB_Helper::get_css_value( $attr['buttonFontSize'], $attr['buttonFontSizeType'] ),
					'font-family'      => $attr['buttonFontFamily'],
					'font-weight'      => $attr['buttonFontWeight'],
					'line-height'      => UAGB_Helper::get_css_value( $attr['buttonLineHeight'], $attr['buttonLineHeightType'] ),
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
					'height'           => UAGB_Helper::get_css_value( $attr['fieldVrPadding'], 'px' ),
					'width'            => UAGB_Helper::get_css_value( $attr['fieldVrPadding'], 'px' ),
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
					'height'           => UAGB_Helper::get_css_value( $attr['fieldVrPadding'], 'px' ),
					'width'            => UAGB_Helper::get_css_value( $attr['fieldVrPadding'], 'px' ),
					'font-size'        => 'calc( ' . $attr['fieldVrPadding'] . 'px / 1.2 )',
					'border-color'     => $attr['fieldBorderColor'],
					'border-style'     => $attr['fieldBorderStyle'],
					'border-width'     => UAGB_Helper::get_css_value( $attr['fieldBorderWidth'], 'px' ),
					'border-radius'    => UAGB_Helper::get_css_value( $attr['fieldBorderRadius'], $attr['fieldBorderRadiusType'] ),
				),
				' .wpcf7 .wpcf7-radio input[type="radio"] + span:before' => array(
					'background-color' => $attr['fieldBgColor'],
					'color'            => $attr['fieldInputColor'],
					'height'           => UAGB_Helper::get_css_value( $attr['fieldVrPadding'], 'px' ),
					'width'            => UAGB_Helper::get_css_value( $attr['fieldVrPadding'], 'px' ),
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
					'font-size'   => UAGB_Helper::get_css_value( $attr['radioCheckFontSize'], $attr['radioCheckFontSizeType'] ),
					'font-family' => $attr['radioCheckFontFamily'],
					'font-weight' => $attr['radioCheckFontWeight'],
					'line-height' => UAGB_Helper::get_css_value( $attr['radioCheckLineHeight'], $attr['radioCheckLineHeightType'] ),
					'color'       => $attr['radioCheckLableColor'],
				),
				' span.wpcf7-not-valid-tip'           => array(
					'color'       => $attr['validationMsgColor'],
					'font-size'   => UAGB_Helper::get_css_value( $attr['validationMsgFontSize'], $attr['validationMsgFontSizeType'] ),
					'font-family' => $attr['validationMsgFontFamily'],
					'font-weight' => $attr['validationMsgFontWeight'],
					'line-height' => UAGB_Helper::get_css_value( $attr['validationMsgLineHeight'], $attr['validationMsgLineHeightType'] ),
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
				' .wpcf7-response-output'             => array(
					'border-width'   => UAGB_Helper::get_css_value( $attr['msgBorderSize'], 'px' ),
					'border-radius'  => UAGB_Helper::get_css_value( $attr['msgBorderRadius'], $attr['msgBorderRadiusType'] ),
					'font-size'      => UAGB_Helper::get_css_value( $attr['msgFontSize'], $attr['msgFontSizeType'] ),
					'font-family'    => $attr['msgFontFamily'],
					'font-weight'    => $attr['msgFontWeight'],
					'line-height'    => UAGB_Helper::get_css_value( $attr['msgLineHeight'], $attr['msgLineHeightType'] ),
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
				' .wpcf7 input:not([type=submit])'   => array(
					'font-size'   => UAGB_Helper::get_css_value( $attr['inputFontSizeTablet'], $attr['inputFontSizeType'] ),
					'line-height' => UAGB_Helper::get_css_value( $attr['inputLineHeightTablet'], $attr['inputLineHeightType'] ),
				),
				' .wpcf7 select'                     => array(
					'font-size'   => UAGB_Helper::get_css_value( $attr['labelFontSizeTablet'], $attr['labelFontSizeType'] ),
					'line-height' => UAGB_Helper::get_css_value( $attr['labelLineHeightTablet'], $attr['labelLineHeightType'] ),
				),
				' .wpcf7 textarea'                   => array(
					'font-size'   => UAGB_Helper::get_css_value( $attr['inputFontSizeTablet'], $attr['inputFontSizeType'] ),
					'line-height' => UAGB_Helper::get_css_value( $attr['inputLineHeightTablet'], $attr['inputLineHeightType'] ),
				),
				' .wpcf7 form label'                 => array(
					'font-size'   => UAGB_Helper::get_css_value( $attr['labelFontSizeTablet'], $attr['labelFontSizeType'] ),
					'line-height' => UAGB_Helper::get_css_value( $attr['labelLineHeightTablet'], $attr['labelLineHeightType'] ),
				),

				' .wpcf7 form .wpcf7-list-item-label.gfield_label' => array(
					'font-size'   => UAGB_Helper::get_css_value( $attr['labelFontSizeTablet'], $attr['labelFontSizeType'] ),
					'line-height' => UAGB_Helper::get_css_value( $attr['labelLineHeightTablet'], $attr['labelLineHeightType'] ),
				),
				' .wpcf7 input.wpcf7-form-control.wpcf7-submit' => array(
					'font-size'   => UAGB_Helper::get_css_value( $attr['buttonFontSizeTablet'], $attr['buttonFontSizeType'] ),
					'line-height' => UAGB_Helper::get_css_value( $attr['buttonLineHeightTablet'], $attr['buttonLineHeightType'] ),
				),
				' .uagb-cf7-styler__check-style-enabled .wpcf7 form .wpcf7-list-item-label' => array(
					'font-size'   => UAGB_Helper::get_css_value( $attr['radioCheckFontSizeTablet'], $attr['radioCheckFontSizeType'] ),
					'line-height' => UAGB_Helper::get_css_value( $attr['radioCheckLineHeightTablet'], $attr['radioCheckLineHeightType'] ),
				),
				' span.wpcf7-not-valid-tip'          => array(
					'font-size'   => UAGB_Helper::get_css_value( $attr['validationMsgFontSizeTablet'], $attr['validationMsgFontSizeType'] ),
					'line-height' => UAGB_Helper::get_css_value( $attr['validationMsgLineHeightTablet'], $attr['validationMsgLineHeightType'] ),
				),
				' .wpcf7-response-output'            => array(
					'font-size'   => UAGB_Helper::get_css_value( $attr['msgFontSizeTablet'], $attr['msgFontSizeType'] ),
					'line-height' => UAGB_Helper::get_css_value( $attr['msgLineHeightTablet'], $attr['msgLineHeightType'] ),
				),
			);

			$m_selectors = array(
				' .wpcf7 input:not([type=submit])'    => array(
					'font-size'   => UAGB_Helper::get_css_value( $attr['inputFontSizeMobile'], $attr['inputFontSizeType'] ),
					'line-height' => UAGB_Helper::get_css_value( $attr['inputLineHeightMobile'], $attr['inputLineHeightType'] ),
				),
				' .wpcf7 select'                      => array(
					'font-size'   => UAGB_Helper::get_css_value( $attr['labelFontSizeMobile'], $attr['labelFontSizeType'] ),
					'line-height' => UAGB_Helper::get_css_value( $attr['labelLineHeightMobile'], $attr['labelLineHeightType'] ),
				),
				' .wpcf7 textarea'                    => array(
					'font-size'   => UAGB_Helper::get_css_value( $attr['inputFontSizeMobile'], $attr['inputFontSizeType'] ),
					'line-height' => UAGB_Helper::get_css_value( $attr['inputLineHeightMobile'], $attr['inputLineHeightType'] ),
				),
				' .wpcf7 form label'                  => array(
					'font-size'   => UAGB_Helper::get_css_value( $attr['labelFontSizeMobile'], $attr['labelFontSizeType'] ),
					'line-height' => UAGB_Helper::get_css_value( $attr['labelLineHeightMobile'], $attr['labelLineHeightType'] ),
				),

				' .wpcf7 form .wpcf7-list-item-label' => array(
					'font-size'   => UAGB_Helper::get_css_value( $attr['labelFontSizeMobile'], $attr['labelFontSizeType'] ),
					'line-height' => UAGB_Helper::get_css_value( $attr['labelLineHeightMobile'], $attr['labelLineHeightType'] ),
				),
				' .wpcf7 input.wpcf7-form-control.wpcf7-submit' => array(
					'font-size'   => UAGB_Helper::get_css_value( $attr['buttonFontSizeMobile'], $attr['buttonFontSizeType'] ),
					'line-height' => UAGB_Helper::get_css_value( $attr['buttonLineHeightMobile'], $attr['buttonLineHeightType'] ),
				),
				' .uagb-cf7-styler__check-style-enabled .wpcf7 form .wpcf7-list-item-label' => array(
					'font-size'   => UAGB_Helper::get_css_value( $attr['radioCheckFontSizeMobile'], $attr['radioCheckFontSizeType'] ),
					'line-height' => UAGB_Helper::get_css_value( $attr['radioCheckLineHeightMobile'], $attr['radioCheckLineHeightType'] ),
				),
				' span.wpcf7-not-valid-tip'           => array(
					'font-size'   => UAGB_Helper::get_css_value( $attr['validationMsgFontSizeMobile'], $attr['validationMsgFontSizeType'] ),
					'line-height' => UAGB_Helper::get_css_value( $attr['validationMsgLineHeightMobile'], $attr['validationMsgLineHeightType'] ),
				),
				' .wpcf7-response-output'             => array(
					'font-size'   => UAGB_Helper::get_css_value( $attr['msgFontSizeMobile'], $attr['msgFontSizeType'] ),
					'line-height' => UAGB_Helper::get_css_value( $attr['msgLineHeightMobile'], $attr['msgLineHeightType'] ),
				),
			);

			$desktop = UAGB_Helper::generate_css( $selectors, '.uagb-block-' . $id );
			$tablet  = UAGB_Helper::generate_css( $t_selectors, '.uagb-block-' . $id );
			$mobile  = UAGB_Helper::generate_css( $m_selectors, '.uagb-block-' . $id );

			$generated_css = array(
				'desktop' => $desktop,
				'tablet'  => $tablet,
				'mobile'  => $mobile,
			);

			return $generated_css;
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
					'font-size'        => UAGB_Helper::get_css_value( $attr['inputFontSize'], $attr['inputFontSizeType'] ),
					'font-family'      => $attr['inputFontFamily'],
					'font-weight'      => $attr['inputFontWeight'],
					'line-height'      => UAGB_Helper::get_css_value( $attr['inputLineHeight'], $attr['inputLineHeightType'] ),
					'text-align'       => $attr['align'],
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
					'font-size'        => UAGB_Helper::get_css_value( $attr['inputFontSize'], $attr['inputFontSizeType'] ),
					'font-family'      => $attr['inputFontFamily'],
					'font-weight'      => $attr['inputFontWeight'],
					'line-height'      => UAGB_Helper::get_css_value( $attr['inputLineHeight'], $attr['inputLineHeightType'] ),
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
					'font-size'        => UAGB_Helper::get_css_value( $attr['inputFontSize'], $attr['inputFontSizeType'] ),
					'font-family'      => $attr['inputFontFamily'],
					'font-weight'      => $attr['inputFontWeight'],
					'line-height'      => UAGB_Helper::get_css_value( $attr['inputLineHeight'], $attr['inputLineHeightType'] ),
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
					'font-size'        => UAGB_Helper::get_css_value( $attr['inputFontSize'], $attr['inputFontSizeType'] ),
					'font-family'      => $attr['inputFontFamily'],
					'font-weight'      => $attr['inputFontWeight'],
					'line-height'      => UAGB_Helper::get_css_value( $attr['inputLineHeight'], $attr['inputLineHeightType'] ),
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
					'font-size'        => UAGB_Helper::get_css_value( $attr['buttonFontSize'], $attr['buttonFontSizeType'] ),
					'font-family'      => $attr['buttonFontFamily'],
					'font-weight'      => $attr['buttonFontWeight'],
					'line-height'      => UAGB_Helper::get_css_value( $attr['buttonLineHeight'], $attr['buttonLineHeightType'] ),
					'border-color'     => $attr['buttonBorderColor'],
					'border-style'     => $attr['buttonBorderStyle'],
					'border-width'     => UAGB_Helper::get_css_value( $attr['buttonBorderWidth'], 'px' ),
					'border-radius'    => UAGB_Helper::get_css_value( $attr['buttonBorderRadius'], $attr['buttonBorderRadiusType'] ),
					'padding-left'     => UAGB_Helper::get_css_value( $attr['buttonHrPadding'], 'px' ),
					'padding-right'    => UAGB_Helper::get_css_value( $attr['buttonHrPadding'], 'px' ),
					'padding-top'      => UAGB_Helper::get_css_value( $attr['buttonVrPadding'], 'px' ),
					'padding-bottom'   => UAGB_Helper::get_css_value( $attr['buttonVrPadding'], 'px' ),
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
					'font-size'   => UAGB_Helper::get_css_value( $attr['radioCheckFontSize'], $attr['radioCheckFontSizeType'] ),
					'font-family' => $attr['radioCheckFontFamily'],
					'font-weight' => $attr['radioCheckFontWeight'],
					'line-height' => UAGB_Helper::get_css_value( $attr['radioCheckLineHeight'], $attr['radioCheckLineHeightType'] ),
					'color'       => $attr['radioCheckLableColor'],
				),
				' .uagb-gf-styler__check-style-enabled form .gfield_checkbox label' => array(
					'font-size'   => UAGB_Helper::get_css_value( $attr['radioCheckFontSize'], $attr['radioCheckFontSizeType'] ),
					'font-family' => $attr['radioCheckFontFamily'],
					'font-weight' => $attr['radioCheckFontWeight'],
					'line-height' => UAGB_Helper::get_css_value( $attr['radioCheckLineHeight'], $attr['radioCheckLineHeightType'] ),
					'color'       => $attr['radioCheckLableColor'],
				),
				// Validation Errors.
				' .gform_wrapper .gfield_description.validation_message' => array(
					'color' => $attr['validationMsgColor'],
				),
				' .gform_wrapper .validation_message'    => array(
					'font-size'   => UAGB_Helper::get_css_value( $attr['validationMsgFontSize'], $attr['validationMsgFontSizeType'] ),
					'font-family' => $attr['validationMsgFontFamily'],
					'font-weight' => $attr['validationMsgFontWeight'],
					'line-height' => UAGB_Helper::get_css_value( $attr['validationMsgLineHeight'], $attr['validationMsgLineHeightType'] ),
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
					'font-size'        => UAGB_Helper::get_css_value( $attr['msgFontSize'], $attr['msgFontSizeType'] ),
					'font-family'      => $attr['msgFontFamily'],
					'font-weight'      => $attr['msgFontWeight'],
					'line-height'      => UAGB_Helper::get_css_value( $attr['msgLineHeight'], $attr['msgLineHeightType'] ),
				),

				' .gform_confirmation_message'           => array(
					'color'       => $attr['successMsgColor'],
					'font-size'   => UAGB_Helper::get_css_value( $attr['successMsgFontSize'], $attr['successMsgFontSizeType'] ),
					'font-family' => $attr['successMsgFontFamily'],
					'font-weight' => $attr['successMsgFontWeight'],
					'line-height' => UAGB_Helper::get_css_value( $attr['successMsgLineHeight'], $attr['successMsgLineHeightType'] ),
				),
			);

			$t_selectors = array(
				' form.wpgf-form:not(input)'             => array(
					'color' => $attr['fieldLabelColor'],
				),
				' input:not([type=submit])'              => array(
					'font-size'   => UAGB_Helper::get_css_value( $attr['inputFontSizeTablet'], $attr['inputFontSizeType'] ),
					'line-height' => UAGB_Helper::get_css_value( $attr['inputLineHeightTablet'], $attr['inputLineHeightType'] ),
				),
				' textarea'                              => array(
					'font-size'   => UAGB_Helper::get_css_value( $attr['inputFontSizeTablet'], $attr['inputFontSizeType'] ),
					'line-height' => UAGB_Helper::get_css_value( $attr['inputLineHeightTablet'], $attr['inputLineHeightType'] ),
				),
				' form label.gfield_label'               => array(
					'font-size'   => UAGB_Helper::get_css_value( $attr['labelFontSizeTablet'], $attr['labelFontSizeType'] ),
					'line-height' => UAGB_Helper::get_css_value( $attr['labelLineHeightTablet'], $attr['labelLineHeightType'] ),
				),

				' form .gfield_radio label.gfield_label' => array(
					'font-size'   => UAGB_Helper::get_css_value( $attr['labelFontSizeTablet'], $attr['labelFontSizeType'] ),
					'line-height' => UAGB_Helper::get_css_value( $attr['labelLineHeightTablet'], $attr['labelLineHeightType'] ),
				),
				' form .gfield_checkbox label.gfield_label' => array(
					'font-size'   => UAGB_Helper::get_css_value( $attr['labelFontSizeTablet'], $attr['labelFontSizeType'] ),
					'line-height' => UAGB_Helper::get_css_value( $attr['labelLineHeightTablet'], $attr['labelLineHeightType'] ),
				),
				' input.gform_button'                    => array(
					'font-size'   => UAGB_Helper::get_css_value( $attr['buttonFontSizeTablet'], $attr['buttonFontSizeType'] ),
					'line-height' => UAGB_Helper::get_css_value( $attr['buttonLineHeightTablet'], $attr['buttonLineHeightType'] ),
				),
				' .uagb-gf-styler__check-style-enabled form .gfield_radio label' => array(
					'font-size'   => UAGB_Helper::get_css_value( $attr['radioCheckFontSizeTablet'], $attr['radioCheckFontSizeType'] ),
					'line-height' => UAGB_Helper::get_css_value( $attr['radioCheckLineHeightTablet'], $attr['radioCheckLineHeightType'] ),
				),
				' .uagb-gf-styler__check-style-enabled form .gfield_checkbox label' => array(
					'font-size'   => UAGB_Helper::get_css_value( $attr['radioCheckFontSizeTablet'], $attr['radioCheckFontSizeType'] ),
					'line-height' => UAGB_Helper::get_css_value( $attr['radioCheckLineHeightTablet'], $attr['radioCheckLineHeightType'] ),
				),
				' span.wpgf-not-valid-tip'               => array(
					'font-size'   => UAGB_Helper::get_css_value( $attr['validationMsgFontSizeTablet'], $attr['validationMsgFontSizeType'] ),
					'line-height' => UAGB_Helper::get_css_value( $attr['validationMsgLineHeightTablet'], $attr['validationMsgLineHeightType'] ),
				),
				' .wpgf-response-output'                 => array(
					'font-size'   => UAGB_Helper::get_css_value( $attr['msgFontSizeTablet'], $attr['msgFontSizeType'] ),
					'line-height' => UAGB_Helper::get_css_value( $attr['msgLineHeightTablet'], $attr['msgLineHeightType'] ),
				),
				' .gform_wrapper .validation_message'    => array(
					'font-size'   => UAGB_Helper::get_css_value( $attr['validationMsgFontSizeTablet'], $attr['validationMsgFontSizeType'] ),
					'line-height' => UAGB_Helper::get_css_value( $attr['validationMsgLineHeightTablet'], $attr['validationMsgLineHeightType'] ),
				),
				' .gform_wrapper div.validation_error'   => array(
					'font-size'   => UAGB_Helper::get_css_value( $attr['msgFontSizeTablet'], $attr['msgFontSizeType'] ),
					'line-height' => UAGB_Helper::get_css_value( $attr['msgLineHeightTablet'], $attr['msgLineHeightType'] ),
				),
				' .gform_confirmation_message'           => array(
					'font-size'   => UAGB_Helper::get_css_value( $attr['successMsgFontSizeTablet'], $attr['successMsgFontSizeType'] ),
					'line-height' => UAGB_Helper::get_css_value( $attr['successMsgLineHeightTablet'], $attr['successMsgLineHeightType'] ),
					'color'       => $attr['successMsgColor'],
				),
			);

			$m_selectors = array(
				' input:not([type=submit])'              => array(
					'font-size'   => UAGB_Helper::get_css_value( $attr['inputFontSizeMobile'], $attr['inputFontSizeType'] ),
					'line-height' => UAGB_Helper::get_css_value( $attr['inputLineHeightMobile'], $attr['inputLineHeightType'] ),
				),
				' textarea'                              => array(
					'font-size'   => UAGB_Helper::get_css_value( $attr['inputFontSizeMobile'], $attr['inputFontSizeType'] ),
					'line-height' => UAGB_Helper::get_css_value( $attr['inputLineHeightMobile'], $attr['inputLineHeightType'] ),
				),
				' form label.gfield_label'               => array(
					'font-size'   => UAGB_Helper::get_css_value( $attr['labelFontSizeMobile'], $attr['labelFontSizeType'] ),
					'line-height' => UAGB_Helper::get_css_value( $attr['labelLineHeightMobile'], $attr['labelLineHeightType'] ),
				),

				' form .gfield_radio label.gfield_label' => array(
					'font-size'   => UAGB_Helper::get_css_value( $attr['labelFontSizeMobile'], $attr['labelFontSizeType'] ),
					'line-height' => UAGB_Helper::get_css_value( $attr['labelLineHeightMobile'], $attr['labelLineHeightType'] ),
				),
				' form .gfield_checkbox label.gfield_label' => array(
					'font-size'   => UAGB_Helper::get_css_value( $attr['labelFontSizeMobile'], $attr['labelFontSizeType'] ),
					'line-height' => UAGB_Helper::get_css_value( $attr['labelLineHeightMobile'], $attr['labelLineHeightType'] ),
				),
				' input.gform_button'                    => array(
					'font-size'   => UAGB_Helper::get_css_value( $attr['buttonFontSizeMobile'], $attr['buttonFontSizeType'] ),
					'line-height' => UAGB_Helper::get_css_value( $attr['buttonLineHeightMobile'], $attr['buttonLineHeightType'] ),
				),
				' .uagb-gf-styler__check-style-enabled form .gfield_radio label' => array(
					'font-size'   => UAGB_Helper::get_css_value( $attr['radioCheckFontSizeMobile'], $attr['radioCheckFontSizeType'] ),
					'line-height' => UAGB_Helper::get_css_value( $attr['radioCheckLineHeightMobile'], $attr['radioCheckLineHeightType'] ),
				),
				' .uagb-gf-styler__check-style-enabled form .gfield_checkbox label' => array(
					'font-size'   => UAGB_Helper::get_css_value( $attr['radioCheckFontSizeMobile'], $attr['radioCheckFontSizeType'] ),
					'line-height' => UAGB_Helper::get_css_value( $attr['radioCheckLineHeightMobile'], $attr['radioCheckLineHeightType'] ),
				),
				' span.wpgf-not-valid-tip'               => array(
					'font-size'   => UAGB_Helper::get_css_value( $attr['validationMsgFontSizeMobile'], $attr['validationMsgFontSizeType'] ),
					'line-height' => UAGB_Helper::get_css_value( $attr['validationMsgLineHeightMobile'], $attr['validationMsgLineHeightType'] ),
				),
				' .wpgf-response-output'                 => array(
					'font-size'   => UAGB_Helper::get_css_value( $attr['msgFontSizeMobile'], $attr['msgFontSizeType'] ),
					'line-height' => UAGB_Helper::get_css_value( $attr['msgLineHeightMobile'], $attr['msgLineHeightType'] ),
				),
				' .gform_wrapper .validation_message'    => array(
					'font-size'   => UAGB_Helper::get_css_value( $attr['validationMsgFontSizeMobile'], $attr['validationMsgFontSizeType'] ),
					'line-height' => UAGB_Helper::get_css_value( $attr['validationMsgLineHeightMobile'], $attr['validationMsgLineHeightType'] ),
				),
				' .gform_wrapper div.validation_error'   => array(
					'font-size'   => UAGB_Helper::get_css_value( $attr['msgFontSizeMobile'], $attr['msgFontSizeType'] ),
					'line-height' => UAGB_Helper::get_css_value( $attr['msgLineHeightMobile'], $attr['msgLineHeightType'] ),
				),
				' .gform_confirmation_message'           => array(
					'font-size'   => UAGB_Helper::get_css_value( $attr['successMsgFontSizeMobile'], $attr['successMsgFontSizeType'] ),
					'line-height' => UAGB_Helper::get_css_value( $attr['successMsgLineHeightMobile'], $attr['successMsgLineHeightType'] ),
					'color'       => $attr['successMsgColor'],
				),
			);

			$desktop       = UAGB_Helper::generate_css( $selectors, '.uagb-block-' . $id );
			$tablet        = UAGB_Helper::generate_css( $t_selectors, '.uagb-block-' . $id );
			$mobile        = UAGB_Helper::generate_css( $m_selectors, '.uagb-block-' . $id );
			$generated_css = array(
				'desktop' => $desktop,
				'tablet'  => $tablet,
				'mobile'  => $mobile,
			);

			return $generated_css;
		}

		/*
		 * Get Marketing Button Block CSS
		 *
		 * @since 1.11.0
		 * @param array  $attr The block attributes.
		 * @param string $id The selector ID.
		 * @return array The Widget List.
		 */
		public static function get_marketing_btn_css( $attr, $id ) { 			// @codingStandardsIgnoreStart

			$defaults = UAGB_Helper::$block_list['uagb/marketing-button']['attributes'];

			$attr = array_merge( $defaults, (array) $attr );

			$m_selectors = array();
			$t_selectors = array();

			$icon_color = ( "" == $attr["iconColor"] ) ? $attr["titleColor"] : $attr["iconColor"];
			$icon_hover_color = ( "" == $attr["iconHoverColor"] ) ? $attr["titleHoverColor"] : $attr["iconHoverColor"];

			$selectors = array(
				" .uagb-marketing-btn__title-wrap" => array(
					"margin-bottom" => UAGB_Helper::get_css_value( $attr["titleSpace"], 'px' )
				),
				" .uagb-marketing-btn__title" => array(
					"font-size" => UAGB_Helper::get_css_value( $attr["titleFontSize"], $attr["titleFontSizeType"] ),
					"line-height" => UAGB_Helper::get_css_value( $attr["titleLineHeight"], $attr["titleLineHeightType"] ),
					"font-family" => $attr["titleFontFamily"],
					"font-weight" => $attr["titleFontWeight"],
					"color" => $attr["titleColor"],
				),
				" .uagb-marketing-btn__icon-wrap" => array(
					"width" => UAGB_Helper::get_css_value( $attr["iconFontSize"], $attr["iconFontSizeType"] ),
					"height" => UAGB_Helper::get_css_value( $attr["iconFontSize"], $attr["iconFontSizeType"] ),
				),
				" .uagb-marketing-btn__icon-wrap svg" => array(
					"fill" => $icon_color
				),
				" .uagb-marketing-btn__prefix" => array(
					"font-size" => UAGB_Helper::get_css_value( $attr["prefixFontSize"], $attr["prefixFontSizeType"] ),
					"line-height" => UAGB_Helper::get_css_value( $attr["prefixLineHeight"], $attr["prefixLineHeightType"] ),
					"font-family" => $attr["prefixFontFamily"],
					"font-weight" => $attr["prefixFontWeight"],
					"color" => $attr["prefixColor"],
				),
				" .uagb-marketing-btn__link:hover .uagb-marketing-btn__title" => array(
					"color" => $attr["titleHoverColor"],
				),
				" .uagb-marketing-btn__link:hover .uagb-marketing-btn__prefix" => array(
					"color" => $attr["prefixHoverColor"],
				),
				" .uagb-marketing-btn__link:hover .uagb-marketing-btn__icon-wrap svg" => array(
					"fill" => $icon_hover_color
				),
				" .uagb-marketing-btn__link" => array(
					"padding-left" => UAGB_Helper::get_css_value( $attr["hPadding"], $attr['paddingType'] ),
					"padding-right" => UAGB_Helper::get_css_value( $attr["hPadding"], $attr['paddingType'] ),
					"padding-top" => UAGB_Helper::get_css_value( $attr["vPadding"], $attr['paddingType'] ),
					"padding-bottom" => UAGB_Helper::get_css_value( $attr["vPadding"], $attr['paddingType'] ),
					"border-style" => $attr["borderStyle"],
					"border-width" => UAGB_Helper::get_css_value( $attr["borderWidth"], 'px' ),
					"border-color" => $attr["borderColor"],
					"border-radius" => UAGB_Helper::get_css_value( $attr["borderRadius"], 'px' ),
				),
				" .uagb-marketing-btn__link:hover" => array(
					"border-color" => $attr["borderHoverColor"]
				),
			);

			if ( "transparent" == $attr["backgroundType"] ) {

				$selectors[" .uagb-marketing-btn__link"]["background"] = "transparent";

			} else if ( "color" == $attr["backgroundType"] ) {

				$selectors[" .uagb-marketing-btn__link"]["background"] = UAGB_Helper::hex2rgba( $attr["backgroundColor"], $attr['backgroundOpacity'] );

				// Hover Background
				$selectors[" .uagb-marketing-btn__link:hover"]["background"] = UAGB_Helper::hex2rgba( $attr["backgroundHoverColor"], $attr['backgroundHoverOpacity'] );

			} else if ( "gradient" == $attr["backgroundType"] ) {

				$selectors[' .uagb-marketing-btn__link']['background-color'] = 'transparent';

				if ( 'linear' === $attr['gradientType'] ) {

					$selectors[' .uagb-marketing-btn__link']['background-image'] = 'linear-gradient(' . $attr['gradientAngle'] . 'deg, ' . UAGB_Helper::hex2rgba( $attr['gradientColor1'], $attr['backgroundOpacity'] ) . ' ' . $attr['gradientLocation1'] . '%, ' . UAGB_Helper::hex2rgba( $attr['gradientColor2'], $attr['backgroundOpacity'] ) . ' ' . $attr['gradientLocation2'] . '%)';
				} else {

					$selectors[' .uagb-marketing-btn__link']['background-image'] = 'radial-gradient( at center center, ' . UAGB_Helper::hex2rgba( $attr['gradientColor1'], $attr['backgroundOpacity'] ) . ' ' . $attr['gradientLocation1'] . '%, ' . UAGB_Helper::hex2rgba( $attr['gradientColor2'], $attr['backgroundOpacity'] ) . ' ' . $attr['gradientLocation2'] . '%)';
				}
			}

			$margin_type = ( "after" == $attr["iconPosition"] ) ? "margin-left" : "margin-right";

			$selectors[" .uagb-marketing-btn__icon-wrap"][$margin_type] = UAGB_Helper::get_css_value( $attr["iconSpace"], "px" );

			$m_selectors = array(
				' .uagb-marketing-btn__title'        => array(
					'font-size' => UAGB_Helper::get_css_value( $attr['titleFontSizeMobile'], $attr['titleFontSizeType'] ),
					'line-height' => UAGB_Helper::get_css_value( $attr['titleLineHeightMobile'], $attr['titleLineHeightType'] ),
				),
				' .uagb-marketing-btn__prefix' => array(
					'font-size' => UAGB_Helper::get_css_value( $attr['prefixFontSizeMobile'], $attr['prefixFontSizeType'] ),
					'line-height' => UAGB_Helper::get_css_value( $attr['prefixLineHeightMobile'], $attr['prefixLineHeightType'] ),
				),
				' .uagb-marketing-btn__icon-wrap' => array(
					"width" => UAGB_Helper::get_css_value( $attr["iconFontSizeMobile"], $attr["iconFontSizeType"] ),
					"height" => UAGB_Helper::get_css_value( $attr["iconFontSizeMobile"], $attr["iconFontSizeType"] ),
				),
				" .uagb-marketing-btn__link" => array(
					"padding-left" => UAGB_Helper::get_css_value( $attr["hPaddingMobile"], $attr['paddingType'] ),
					"padding-right" => UAGB_Helper::get_css_value( $attr["hPaddingMobile"], $attr['paddingType'] ),
					"padding-top" => UAGB_Helper::get_css_value( $attr["vPaddingMobile"], $attr['paddingType'] ),
					"padding-bottom" => UAGB_Helper::get_css_value( $attr["vPaddingMobile"], $attr['paddingType'] ),
				),

			);

			$t_selectors = array(
				' .uagb-marketing-btn__title'        => array(
					'font-size' => UAGB_Helper::get_css_value( $attr['titleFontSizeTablet'], $attr['titleFontSizeType'] ),
					'line-height' => UAGB_Helper::get_css_value( $attr['titleLineHeightTablet'], $attr['titleLineHeightType'] ),
				),
				' .uagb-marketing-btn__prefix' => array(
					'font-size' => UAGB_Helper::get_css_value( $attr['prefixFontSizeTablet'], $attr['prefixFontSizeType'] ),
					'line-height' => UAGB_Helper::get_css_value( $attr['prefixLineHeightTablet'], $attr['prefixLineHeightType'] ),
				),
				' .uagb-marketing-btn__icon-wrap' => array(
					"width" => UAGB_Helper::get_css_value( $attr["iconFontSizeTablet"], $attr["iconFontSizeType"] ),
					"height" => UAGB_Helper::get_css_value( $attr["iconFontSizeTablet"], $attr["iconFontSizeType"] ),
				),
				" .uagb-marketing-btn__link" => array(
					"padding-left" => UAGB_Helper::get_css_value( $attr["hPaddingTablet"], $attr['paddingType'] ),
					"padding-right" => UAGB_Helper::get_css_value( $attr["hPaddingTablet"], $attr['paddingType'] ),
					"padding-top" => UAGB_Helper::get_css_value( $attr["vPaddingTablet"], $attr['paddingType'] ),
					"padding-bottom" => UAGB_Helper::get_css_value( $attr["vPaddingTablet"], $attr['paddingType'] ),
				),

			);

			// @codingStandardsIgnoreEnd
			$base_selector = ( $attr['classMigrate'] ) ? '.uagb-block-' : '#uagb-marketing-btn-';

			$desktop = UAGB_Helper::generate_css( $selectors, $base_selector . $id );

			$tablet = UAGB_Helper::generate_css( $t_selectors, $base_selector . $id );

			$mobile = UAGB_Helper::generate_css( $m_selectors, $base_selector . $id );

			$generated_css = array(
				'desktop' => $desktop,
				'tablet'  => $tablet,
				'mobile'  => $mobile,
			);

			return $generated_css;
		}

		/**
		 * Get Table of Contents Block CSS
		 *
		 * @since 1.13.0
		 * @param array  $attr The block attributes.
		 * @param string $id The selector ID.
		 * @return array The Widget List.
		 */
		public static function get_table_of_contents_css( $attr, $id ) { 			// @codingStandardsIgnoreStart

			$defaults = UAGB_Helper::$block_list['uagb/table-of-contents']['attributes'];

			$attr = array_merge( $defaults, (array) $attr );
			$m_selectors = array();
			$t_selectors = array();

			$selectors = array(
				" .uagb-toc__list-wrap ul li a:hover" => array(
					"color" => $attr["linkHoverColor"],
				),
				" .uagb-toc__list-wrap ul li a" => array(
					"font-size" => UAGB_Helper::get_css_value( $attr["fontSize"], $attr["fontSizeType"] ),
					"line-height" => UAGB_Helper::get_css_value( $attr["lineHeight"], $attr["lineHeightType"] ),
					"font-family" => $attr["fontFamily"],
					"font-weight" => $attr["fontWeight"],
					"color" => $attr["linkColor"],
				),
				" .uagb-toc__title" => array(
					"font-size" => UAGB_Helper::get_css_value( $attr["headingFontSize"], $attr["headingFontSizeType"] ),
					"line-height" => UAGB_Helper::get_css_value( $attr["headingLineHeight"], $attr["headingLineHeightType"] ),
					"font-family" => $attr["headingFontFamily"],
					"font-weight" => $attr["headingFontWeight"],
					"color" => $attr["headingColor"],
					"margin-bottom" => UAGB_Helper::get_css_value( $attr["headingBottom"], "px"),
				),
				" .uagb-toc__wrap" => array(
					"border-style" => $attr["borderStyle"],
					"border-width" => UAGB_Helper::get_css_value( $attr["borderWidth"], "px" ),
					"border-color" => $attr["borderColor"],
					"border-radius" => UAGB_Helper::get_css_value( $attr["borderRadius"], "px" ),
					"padding-left" => UAGB_Helper::get_css_value( $attr["hPaddingDesktop"], $attr["paddingTypeDesktop"] ),
					"padding-right" => UAGB_Helper::get_css_value( $attr["hPaddingDesktop"], $attr["paddingTypeDesktop"] ),
					"padding-top" => UAGB_Helper::get_css_value( $attr["vPaddingDesktop"], $attr["paddingTypeDesktop"] ),
					"padding-bottom" => UAGB_Helper::get_css_value( $attr["vPaddingDesktop"], $attr["paddingTypeDesktop"] ),
					"background" => $attr["backgroundColor"],
				),
				" .uagb-toc__list-wrap" => array(
					'column-count' => $attr['tColumnsDesktop'],
					'overflow' => 'hidden'
				),
				" .uagb-toc__list-wrap > ul.uagb-toc__list > li:first-child" => array(
				    "padding-top" => 0
				),
				" .uagb-toc__list-wrap > ul.uagb-toc__list li" => array(
				    "color" => $attr["bulletColor"]
				),
				" .uagb-toc__list-wrap ul.uagb-toc__list:first-child" => array(
					"margin-left" => UAGB_Helper::get_css_value( $attr["hMarginDesktop"], $attr["marginTypeDesktop"] ),
					"margin-right" => UAGB_Helper::get_css_value( $attr["hMarginDesktop"], $attr["marginTypeDesktop"] ),
					"margin-top" => UAGB_Helper::get_css_value( $attr["vMarginDesktop"], $attr["marginTypeDesktop"] ),
					"margin-bottom" => UAGB_Helper::get_css_value( $attr["vMarginDesktop"], $attr["marginTypeDesktop"] ),
				),
				" .uagb-toc__list-wrap ul.uagb-toc__list:last-child > li:last-child" => array(
				    "padding-bottom" => 0
				),
				" .uag-toc__collapsible-wrap svg" => array(
					"width" => UAGB_Helper::get_css_value( $attr["iconSize"], "px" ),
					"height" => UAGB_Helper::get_css_value( $attr["iconSize"], "px" ),
					"fill" => $attr["iconColor"]
				),
			);

			if ( '' != $attr["contentPaddingDesktop"] ) {
				$selectors[" .uagb-toc__list-wrap ul.uagb-toc__list > li"]["padding-top"] = "calc( " . UAGB_Helper::get_css_value( $attr['contentPaddingDesktop'] . $attr['contentPaddingTypeDesktop'] ) . " / 2 )";
				$selectors[" .uagb-toc__list-wrap ul.uagb-toc__list > li"]["padding-bottom"] = "calc( " . UAGB_Helper::get_css_value( $attr['contentPaddingDesktop'] . $attr['contentPaddingTypeDesktop'] ) . " / 2 )";
			}

			if ( $attr["customWidth"] ) {
				$selectors[" .uagb-toc__wrap"]["width"] = UAGB_Helper::get_css_value( $attr["widthDesktop"], $attr["widthTypeDesktop"] );
			}

			if ( $attr["disableBullets"] ) {
				$selectors[" .uagb-toc__list"] = array(
				    "list-style-type" => 'none'
				);
				$selectors[" .uagb-toc__list .uagb-toc__list"] = array(
				    "list-style-type" => 'none'
				);
			}


			$m_selectors = array(
				' .uagb-toc__list-wrap ul li a'        => array(
					'font-size' => UAGB_Helper::get_css_value( $attr['fontSizeMobile'], $attr['fontSizeType'] ),
					'line-height' => UAGB_Helper::get_css_value( $attr['lineHeightMobile'], $attr['lineHeightType'] ),
				),
				" .uagb-toc__title" => array(
					"font-size" => UAGB_Helper::get_css_value( $attr["headingFontSizeMobile"], $attr["headingFontSizeType"] ),
					"line-height" => UAGB_Helper::get_css_value( $attr["headingLineHeightMobile"], $attr["headingLineHeightType"] ),
				),
				" .uagb-toc__wrap" => array(
					"width" => UAGB_Helper::get_css_value( $attr["widthMobile"], $attr["widthTypeMobile"] ),
					"padding-left" => UAGB_Helper::get_css_value( $attr["hPaddingMobile"], $attr["paddingTypeMobile"] ),
					"padding-right" => UAGB_Helper::get_css_value( $attr["hPaddingMobile"], $attr["paddingTypeMobile"] ),
					"padding-top" => UAGB_Helper::get_css_value( $attr["vPaddingMobile"], $attr["paddingTypeMobile"] ),
					"padding-bottom" => UAGB_Helper::get_css_value( $attr["vPaddingMobile"], $attr["paddingTypeMobile"] ),
				),
				" .uagb-toc__list-wrap" => array(
					'column-count' => $attr['tColumnsMobile'],
					'overflow' => 'hidden'
				),
				" .uagb-toc__list-wrap > ul.uagb-toc__list > li:first-child" => array(
				    "padding-top" => 0
				),
				" .uagb-toc__list-wrap ul.uagb-toc__list:last-child > li:last-child" => array(
				    "padding-bottom" => 0
				),

			);

			$t_selectors = array(
				' .uagb-toc__list-wrap ul li a'        => array(
					'font-size' => UAGB_Helper::get_css_value( $attr['fontSizeTablet'], $attr['fontSizeType'] ),
					'line-height' => UAGB_Helper::get_css_value( $attr['lineHeightTablet'], $attr['lineHeightType'] ),
				),
				" .uagb-toc__title" => array(
					"font-size" => UAGB_Helper::get_css_value( $attr["headingFontSizeTablet"], $attr["headingFontSizeType"] ),
					"line-height" => UAGB_Helper::get_css_value( $attr["headingLineHeightTablet"], $attr["headingLineHeightType"] ),
				),
				" .uagb-toc__wrap" => array(
					"width" => UAGB_Helper::get_css_value( $attr["widthTablet"], $attr["widthTypeTablet"] ),
					"padding-left" => UAGB_Helper::get_css_value( $attr["hPaddingTablet"], $attr["paddingTypeTablet"] ),
					"padding-right" => UAGB_Helper::get_css_value( $attr["hPaddingTablet"], $attr["paddingTypeTablet"] ),
					"padding-top" => UAGB_Helper::get_css_value( $attr["vPaddingTablet"], $attr["paddingTypeTablet"] ),
					"padding-bottom" => UAGB_Helper::get_css_value( $attr["vPaddingTablet"], $attr["paddingTypeTablet"] ),
				),
				" .uagb-toc__list-wrap" => array(
					'column-count' => $attr['tColumnsTablet'],
					'overflow' => 'hidden'
				),
				" .uagb-toc__list-wrap > ul.uagb-toc__list > li:first-child" => array(
				    "padding-top" => 0
				),
				" .uagb-toc__list-wrap ul.uagb-toc__list:last-child > li:last-child" => array(
				    "padding-bottom" => 0
				),			);

			if ( '' != $attr["contentPaddingTablet"] ) {
				$t_selectors[" .uagb-toc__list-wrap ul.uagb-toc__list > li"] = array(
					"padding-top" => "calc( " . UAGB_Helper::get_css_value( $attr['contentPaddingTablet'] . $attr['contentPaddingTypeTablet'] ) . " / 2 )",
					"padding-bottom" => "calc( " . UAGB_Helper::get_css_value( $attr['contentPaddingTablet'] . $attr['contentPaddingTypeTablet'] ) . " / 2 )",
				);
			}

			if ( '' != $attr["contentPaddingMobile"] ) {
				$m_selectors[" .uagb-toc__list-wrap ul.uagb-toc__list > li"] = array(
					"padding-top" => "calc( " . UAGB_Helper::get_css_value( $attr['contentPaddingMobile'] . $attr['contentPaddingTypeMobile'] ) . " / 2 )",
					"padding-bottom" => "calc( " . UAGB_Helper::get_css_value( $attr['contentPaddingMobile'] . $attr['contentPaddingTypeMobile'] ) . " / 2 )",
				);
			}

			// @codingStandardsIgnoreEnd

			$base_selector = ( $attr['classMigrate'] ) ? '.uagb-block-' : '#uagb-toc-';

			$desktop = UAGB_Helper::generate_css( $selectors, $base_selector . $id );

			$tablet = UAGB_Helper::generate_css( $t_selectors, $base_selector . $id );

			$mobile = UAGB_Helper::generate_css( $m_selectors, $base_selector . $id );

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
		 * @since x.x.x
		 * @param array  $attr The block attributes.
		 * @param string $id The selector ID.
		 */
		public static function get_faq_css( $attr, $id ) {

			$defaults = UAGB_Helper::$block_list['uagb/faq']['attributes'];

			$attr = array_merge( $defaults, $attr );

			$icon_color = $attr['iconColor'];

			if ( ! isset( $attr['iconColor'] ) || '' === $attr['iconColor'] ) {

				$icon_color = $attr['questionTextColor'];
			}

			$selectors = array(
				' .uagb-icon svg'                      => array(
					'width'     => UAGB_Helper::get_css_value( $attr['iconSize'], $attr['iconSizeType'] ),
					'height'    => UAGB_Helper::get_css_value( $attr['iconSize'], $attr['iconSizeType'] ),
					'font-size' => UAGB_Helper::get_css_value( $attr['iconSize'], $attr['iconSizeType'] ),
					'fill'      => $icon_color,
				),
				' .uagb-icon-active svg'               => array(
					'width'     => UAGB_Helper::get_css_value( $attr['iconSize'], $attr['iconSizeType'] ),
					'height'    => UAGB_Helper::get_css_value( $attr['iconSize'], $attr['iconSizeType'] ),
					'font-size' => UAGB_Helper::get_css_value( $attr['iconSize'], $attr['iconSizeType'] ),
					'fill'      => $attr['iconActiveColor'],
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
					'padding-bottom' => UAGB_Helper::get_css_value( $attr['vquestionPaddingDesktop'], $attr['questionPaddingTypeDesktop'] ),
					'padding-right'  => UAGB_Helper::get_css_value( $attr['hquestionPaddingDesktop'], $attr['questionPaddingTypeDesktop'] ),
					'padding-left'   => UAGB_Helper::get_css_value( $attr['hquestionPaddingDesktop'], $attr['questionPaddingTypeDesktop'] ),
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
					'fill' => $attr['iconActiveColor'],
				),
				' .uagb-faq-item .uagb-faq-questions-button.uagb-faq-questions' => array(
					'flex-direction' => $attr['iconAlign'],
				),
				' .uagb-faq-questions-button .uagb-question' => array(
					'font-size'   => UAGB_Helper::get_css_value( $attr['questionfontSize'], $attr['questionfontSizeType'] ),
					'line-height' => UAGB_Helper::get_css_value( $attr['questionlineHeight'], $attr['questionlineHeightType'] ),
					'font-family' => $attr['questionfontFamily'],
					'font-weight' => $attr['questionfontWeight'],
				),
				' .uagb-faq-item .uagb-faq-content p'  => array(
					'font-size'   => UAGB_Helper::get_css_value( $attr['answerfontSize'], $attr['answerfontSizeType'] ),
					'line-height' => UAGB_Helper::get_css_value( $attr['answerlineHeight'], $attr['answerlineHeightType'] ),
					'font-family' => $attr['answerfontFamily'],
					'font-weight' => $attr['answerfontWeight'],
					'color'       => $attr['answerTextColor'],
				),
			);

			$t_selectors = array(
				' .uagb-faq-questions-button'         => array(
					'padding-top'    => UAGB_Helper::get_css_value( $attr['vquestionPaddingTablet'], $attr['questionPaddingTypeTablet'] ),
					'padding-bottom' => UAGB_Helper::get_css_value( $attr['vquestionPaddingTablet'], $attr['questionPaddingTypeTablet'] ),
					'padding-right'  => UAGB_Helper::get_css_value( $attr['hquestionPaddingTablet'], $attr['questionPaddingTypeTablet'] ),
					'padding-left'   => UAGB_Helper::get_css_value( $attr['hquestionPaddingTablet'], $attr['questionPaddingTypeTablet'] ),
				),
				' .uagb-faq-content span'             => array(
					'margin-top'    => UAGB_Helper::get_css_value( $attr['vanswerPaddingTablet'], $attr['answerPaddingTypeTablet'] ),
					'margin-bottom' => UAGB_Helper::get_css_value( $attr['vanswerPaddingTablet'], $attr['answerPaddingTypeTablet'] ),
					'margin-right'  => UAGB_Helper::get_css_value( $attr['hanswerPaddingTablet'], $attr['answerPaddingTypeTablet'] ),
					'margin-left'   => UAGB_Helper::get_css_value( $attr['hanswerPaddingTablet'], $attr['answerPaddingTypeTablet'] ),
				),
				' .uagb-faq-questions-button .uagb-question' => array(
					'font-size'   => UAGB_Helper::get_css_value( $attr['questionfontSizeTablet'], $attr['questionfontSizeType'] ),
					'line-height' => UAGB_Helper::get_css_value( $attr['questionlineHeightTablet'], $attr['questionlineHeightType'] ),
				),
				' .uagb-faq-item .uagb-faq-content p' => array(
					'font-size'   => UAGB_Helper::get_css_value( $attr['answerfontSizeTablet'], $attr['answerfontSizeType'] ),
					'line-height' => UAGB_Helper::get_css_value( $attr['answerlineHeightTablet'], $attr['answerlineHeightType'] ),
				),
				' .uagb-icon svg'                     => array(
					'width'     => UAGB_Helper::get_css_value( $attr['iconSizeTablet'], $attr['iconSizeType'] ),
					'height'    => UAGB_Helper::get_css_value( $attr['iconSizeTablet'], $attr['iconSizeType'] ),
					'font-size' => UAGB_Helper::get_css_value( $attr['iconSizeTablet'], $attr['iconSizeType'] ),
				),
				' .uagb-icon-active svg'              => array(
					'width'     => UAGB_Helper::get_css_value( $attr['iconSizeTablet'], $attr['iconSizeType'] ),
					'height'    => UAGB_Helper::get_css_value( $attr['iconSizeTablet'], $attr['iconSizeType'] ),
					'font-size' => UAGB_Helper::get_css_value( $attr['iconSizeTablet'], $attr['iconSizeType'] ),
				),
			);
			$m_selectors = array(
				' .uagb-faq-questions-button'         => array(
					'padding-top'    => UAGB_Helper::get_css_value( $attr['vquestionPaddingMobile'], $attr['questionPaddingTypeMobile'] ),
					'padding-bottom' => UAGB_Helper::get_css_value( $attr['vquestionPaddingMobile'], $attr['questionPaddingTypeMobile'] ),
					'padding-right'  => UAGB_Helper::get_css_value( $attr['hquestionPaddingMobile'], $attr['questionPaddingTypeMobile'] ),
					'padding-left'   => UAGB_Helper::get_css_value( $attr['hquestionPaddingMobile'], $attr['questionPaddingTypeMobile'] ),
				),
				' .uagb-faq-content span'             => array(
					'margin-top'    => UAGB_Helper::get_css_value( $attr['vanswerPaddingMobile'], $attr['answerPaddingTypeMobile'] ),
					'margin-bottom' => UAGB_Helper::get_css_value( $attr['vanswerPaddingMobile'], $attr['answerPaddingTypeMobile'] ),
					'margin-right'  => UAGB_Helper::get_css_value( $attr['hanswerPaddingMobile'], $attr['answerPaddingTypeMobile'] ),
					'margin-left'   => UAGB_Helper::get_css_value( $attr['hanswerPaddingMobile'], $attr['answerPaddingTypeMobile'] ),
				),
				' .uagb-faq-questions-button .uagb-question' => array(
					'font-size'   => UAGB_Helper::get_css_value( $attr['questionfontSizeMobile'], $attr['questionfontSizeType'] ),
					'line-height' => UAGB_Helper::get_css_value( $attr['questionlineHeightMobile'], $attr['questionlineHeightType'] ),
				),
				' .uagb-faq-item .uagb-faq-content p' => array(
					'font-size'   => UAGB_Helper::get_css_value( $attr['answerfontSizeMobile'], $attr['answerfontSizeType'] ),
					'line-height' => UAGB_Helper::get_css_value( $attr['answerlineHeightMobile'], $attr['answerlineHeightType'] ),
				),
				' .uagb-icon svg'                     => array(
					'width'     => UAGB_Helper::get_css_value( $attr['iconSizeMobile'], $attr['iconSizeType'] ),
					'height'    => UAGB_Helper::get_css_value( $attr['iconSizeMobile'], $attr['iconSizeType'] ),
					'font-size' => UAGB_Helper::get_css_value( $attr['iconSizeMobile'], $attr['iconSizeType'] ),
				),
				' .uagb-icon-active svg'              => array(
					'width'     => UAGB_Helper::get_css_value( $attr['iconSizeMobile'], $attr['iconSizeType'] ),
					'height'    => UAGB_Helper::get_css_value( $attr['iconSizeMobile'], $attr['iconSizeType'] ),
					'font-size' => UAGB_Helper::get_css_value( $attr['iconSizeMobile'], $attr['iconSizeType'] ),
				),
			);

			if ( 'accordion' === $attr['layout'] && true === $attr['inactiveOtherItems'] ) {

				$selectors[' .wp-block-uagb-faq-child.uagb-faq-child__outer-wrap .uagb-faq-content '] = array(
					'display' => 'none',
				);
			}
			if ( 'accordion' === $attr['layout'] && true === $attr['expandFirstItem'] ) {

				$selectors[' .uagb-faq__wrap.uagb-buttons-layout-wrap > .uagb-faq-child__outer-wrap:first-child > .uagb-faq-child__wrapper .uagb-faq-content '] = array(
					'display' => 'block',
				);
			}
			if ( true === $attr['enableSeparator'] ) {

				$selectors[' .uagb-faq-child__outer-wrap .uagb-faq-content '] = array(
					'border-style'     => 'solid',
					'border-top-color' => $attr['borderColor'],
					'border-top-width' => UAGB_Helper::get_css_value( $attr['borderWidth'], 'px' ),
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
			}

			$base_selector = '.uagb-block-';

			$desktop = UAGB_Helper::generate_css( $selectors, $base_selector . $id );
			$tablet  = UAGB_Helper::generate_css( $t_selectors, $base_selector . $id );
			$mobile  = UAGB_Helper::generate_css( $m_selectors, $base_selector . $id );

			$generated_css = array(
				'desktop' => $desktop,
				'tablet'  => $tablet,
				'mobile'  => $mobile,
			);

			return $generated_css;
		}
		/**
		 * Get Testimonial Js
		 *
		 * @since 1.6.0
		 * @param array  $attr The block attributes.
		 * @param string $id The selector ID.
		 */
		public static function get_testimonial_js( $attr, $id ) { 			// @codingStandardsIgnoreStart.

			$defaults = UAGB_Helper::$block_list['uagb/testimonial']['attributes'];

			$attr = array_merge( $defaults, (array) $attr );

			$dots = ( "dots" == $attr['arrowDots'] || "arrowDots" == $attr['arrowDots'] ) ? true : false;
			$arrows = ( "arrows" == $attr['arrowDots'] || "arrowDots" == $attr['arrowDots'] ) ? true : false;

			$slick_options = apply_filters( 'uagb_testimonials_slick_options',[
				'slidesToShow'   => $attr['columns'],
				'slidesToScroll' => 1,
				'autoplaySpeed'  =>  $attr['autoplaySpeed'],
				'autoplay'       => $attr['autoplay'],
				'infinite'       => $attr['infiniteLoop'],
				'pauseOnHover'   => $attr['pauseOnHover'],
				'speed'          => $attr['transitionSpeed'],
				'arrows'         => $arrows,
				'dots'           => $dots,
				'rtl'            => false,
				'prevArrow'		 => '<button type="button" data-role="none" class="slick-prev" aria-label="Previous" tabindex="0" role="button" style="border-color: '.$attr["arrowColor"].';border-radius:'.$attr["arrowBorderRadius"].'px;border-width:'.$attr["arrowBorderSize"].'px"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512" height ="'.$attr["arrowSize"].'" width = "'.$attr["arrowSize"].'" fill ="'.$attr["arrowColor"].'"  ><path d="M31.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L127.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L201.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34z"></path></svg></button>',
				'nextArrow'		 => '<button type="button" data-role="none" class="slick-next" aria-label="Next" tabindex="0" role="button" style="border-color: '.$attr["arrowColor"].';border-radius:'.$attr["arrowBorderRadius"].'px;border-width:'.$attr["arrowBorderSize"].'px"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 512" height ="'.$attr["arrowSize"].'" width = "'.$attr["arrowSize"].'" fill ="'.$attr["arrowColor"].'" ><path d="M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z"></path></svg></button>',
				'responsive'		=> [
					[
						'breakpoint' => 1024,
						'settings' => [
							'slidesToShow'   => $attr['tcolumns'],
							'slidesToScroll' => 1,
						],
					],
					[
						'breakpoint' => 767,
						'settings' => [
							'slidesToShow'   => $attr['mcolumns'],
							'slidesToScroll' => 1,
						],
					]
				]
			], $id );

			$settings = json_encode($slick_options);
			$base_selector = ( isset( $attr['classMigrate'] ) && $attr['classMigrate'] ) ? '.uagb-block-' : '#uagb-testimonial-';
			$selector =	$base_selector . $id;
			$js = '$( document ).ready( function() { if( $( "' . $selector . '" ).length > 0 ){ $( "' . $selector . '" ).find( ".is-carousel" ).slick( ' . $settings .' ); } } );';

			return $js;
			// @codingStandardsIgnoreEnd.
		}

		/**
		 * Get Blockquote Js
		 *
		 * @since 1.8.2
		 * @param array  $attr The block attributes.
		 * @param string $id The selector ID.
		 */
		public static function get_blockquote_js( $attr, $id ) {
			// @codingStandardsIgnoreStart.

			$defaults = UAGB_Helper::$block_list['uagb/blockquote']['attributes'];

			$attr = array_merge( $defaults, (array) $attr );

			$target = $attr['iconTargetUrl'];

			$url = " " ;

			if( $target == 'current' ){
				global $wp;
				$url = home_url(add_query_arg(array(),$wp->request));
			}else{
				$url = $attr['customUrl'];
			}

			$via = isset( $attr['iconShareVia'] ) ? $attr['iconShareVia'] : '';

			$base_selector = ( isset( $attr['classMigrate'] ) && $attr['classMigrate'] ) ? '.uagb-block-' : '#uagb-blockquote-';
			$selector =	$base_selector . $id;

			$js = 'jQuery( "' . $selector . '" ).find( ".uagb-blockquote__tweet-button" ).click(function(){'.
				  'var content = jQuery("' . $selector . '").find(".uagb-blockquote__content").text();'.
				  'var request_url = "https://twitter.com/share?url="+ encodeURIComponent("' . $url . '")+"&text="+content+"&via="+("' . $via . '");'.
				  'window.open( request_url );'.
				'});';

			return $js;
			// @codingStandardsIgnoreEnd.
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
			$js            = 'var ssLinks = document.querySelectorAll( "' . $selector . '" ); for (let j = 0; j < ssLinks.length; j++) { var ssLink = ssLinks[j].querySelectorAll( ".uagb-ss__link" );';
			$js           .= 'for (let i = 0; i < ssLink.length; i++) { ssLink[i].addEventListener( "click", function() {' .
					'var social_url = this.dataset.href;' .
					'var target = ""; ' .
					'if( social_url == "mailto:?body=" ){ ' .
						'target = "_self";' .
					'}' .
					'var request_url = social_url + window.location.href ;' .
					'window.open( request_url,target );' .
				'}); }}';
			return $js;
		}

		/**
		 * Get Table of Contents Js
		 *
		 * @since 1.13.0
		 * @param array  $attr The block attributes.
		 * @param string $id The selector ID.
		 */
		public static function get_table_of_contents_js( $attr, $id ) {
			// @codingStandardsIgnoreStart.

			$defaults = UAGB_Helper::$block_list['uagb/table-of-contents']['attributes'];

			$attr = array_merge( $defaults, (array) $attr );
			$base_selector = ( isset( $attr['classMigrate'] ) && $attr['classMigrate'] ) ? '.uagb-block-' : '#uagb-toc-';
			$selector =	$base_selector . $id;

			$js = 'jQuery( document ).ready(function() { ' .
					 'UAGBTableOfContents._run( ' . json_encode( $attr ) . ', "'. $selector .'" ); '.
				'});';

			return $js;
			// @codingStandardsIgnoreEnd.
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
			UAGB_Helper::blocks_google_font( $name_load_google_fonts, $name_font_family, $name_font_family, $name_font_subset );
			UAGB_Helper::blocks_google_font( $company_load_google_fonts, $company_font_family, $company_font_family, $company_font_subset );
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
		 * Adds Google fonts for Icon List block
		 *
		 * @since 1.9.1
		 * @param array $attr the blocks attr.
		 */
		public static function blocks_icon_list_gfont( $attr ) {

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
	}
}
