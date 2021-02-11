<?php
/**
 * UAGB - Contact Form 7 Styler.
 *
 * @package UAGB
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

if ( ! class_exists( 'UAGB_CF7_Styler' ) ) {

	/**
	 * Class UAGB_CF7_Styler.
	 */
	class UAGB_CF7_Styler {

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

			// Activation hook.
			add_action( 'init', array( $this, 'register_blocks' ) );
		}

		/**
		 * Registers the `core/latest-posts` block on server.
		 *
		 * @since 0.0.1
		 */
		public function register_blocks() {

			// Check if the register function exists.
			if ( ! function_exists( 'register_block_type' ) ) {
				return;
			}

			register_block_type(
				'uagb/cf7-styler',
				array(
					'attributes'      => array(
						'block_id'                      => array(
							'type' => 'string',
						),
						'align'                         => array(
							'type'    => 'string',
							'default' => 'left',
						),
						'className'                     => array(
							'type' => 'string',
						),
						'formId'                        => array(
							'type'    => 'string',
							'default' => '0',
						),
						'isHtml'                        => array(
							'type' => 'boolean',
						),
						'formJson'                      => array(
							'type'    => 'object',
							'default' => null,
						),
						'fieldStyle'                    => array(
							'type'    => 'string',
							'default' => 'box',
						),
						'fieldVrPadding'                => array(
							'type'    => 'number',
							'default' => 10,
						),
						'fieldHrPadding'                => array(
							'type'    => 'number',
							'default' => 10,
						),
						'fieldBgColor'                  => array(
							'type'    => 'string',
							'default' => '#fafafa',
						),
						'fieldLabelColor'               => array(
							'type'    => 'string',
							'default' => '#333',
						),
						'fieldInputColor'               => array(
							'type'    => 'string',
							'default' => '#333',
						),
						'fieldBorderStyle'              => array(
							'type'    => 'string',
							'default' => 'solid',
						),
						'fieldBorderWidth'              => array(
							'type'    => 'number',
							'default' => 1,
						),
						'fieldBorderRadius'             => array(
							'type'    => 'number',
							'default' => 0,
						),
						'fieldBorderColor'              => array(
							'type'    => 'string',
							'default' => '#eeeeee',
						),
						'fieldBorderFocusColor'         => array(
							'type'    => 'string',
							'default' => '',
						),
						'buttonAlignment'               => array(
							'type'    => 'string',
							'default' => 'left',
						),
						'buttonVrPadding'               => array(
							'type'    => 'number',
							'default' => 10,
						),
						'buttonHrPadding'               => array(
							'type'    => 'number',
							'default' => 25,
						),
						'buttonBorderStyle'             => array(
							'type'    => 'string',
							'default' => 'solid',
						),
						'buttonBorderWidth'             => array(
							'type'    => 'number',
							'default' => 1,
						),
						'buttonBorderRadius'            => array(
							'type'    => 'number',
							'default' => 0,
						),
						'buttonBorderColor'             => array(
							'type'    => 'string',
							'default' => '#333',
						),
						'buttonTextColor'               => array(
							'type'    => 'string',
							'default' => '#333',
						),
						'buttonBgColor'                 => array(
							'type'    => 'string',
							'default' => 'transparent',
						),
						'buttonBorderHoverColor'        => array(
							'type'    => 'string',
							'default' => '#333',
						),
						'buttonTextHoverColor'          => array(
							'type'    => 'string',
							'default' => '#333',
						),
						'buttonBgHoverColor'            => array(
							'type'    => 'string',
							'default' => 'transparent',
						),
						'fieldSpacing'                  => array(
							'type'    => 'number',
							'default' => '',
						),
						'fieldLabelSpacing'             => array(
							'type'    => 'number',
							'default' => '',
						),
						'labelFontSize'                 => array(
							'type'    => 'number',
							'default' => '',
						),
						'labelFontSizeType'             => array(
							'type'    => 'string',
							'default' => 'px',
						),
						'labelFontSizeTablet'           => array(
							'type' => 'number',
						),
						'labelFontSizeMobile'           => array(
							'type' => 'number',
						),
						'labelFontFamily'               => array(
							'type'    => 'string',
							'default' => 'Default',
						),
						'labelFontWeight'               => array(
							'type' => 'string',
						),
						'labelFontSubset'               => array(
							'type' => 'string',
						),
						'labelLineHeightType'           => array(
							'type'    => 'string',
							'default' => 'em',
						),
						'labelLineHeight'               => array(
							'type' => 'number',
						),
						'labelLineHeightTablet'         => array(
							'type' => 'number',
						),
						'labelLineHeightMobile'         => array(
							'type' => 'number',
						),
						'labelLoadGoogleFonts'          => array(
							'type'    => 'boolean',
							'default' => false,
						),
						'inputFontSize'                 => array(
							'type'    => 'number',
							'default' => '',
						),
						'inputFontSizeType'             => array(
							'type'    => 'string',
							'default' => 'px',
						),
						'inputFontSizeTablet'           => array(
							'type' => 'number',
						),
						'inputFontSizeMobile'           => array(
							'type' => 'number',
						),
						'inputFontFamily'               => array(
							'type'    => 'string',
							'default' => 'Default',
						),
						'inputFontWeight'               => array(
							'type' => 'string',
						),
						'inputFontSubset'               => array(
							'type' => 'string',
						),
						'inputLineHeightType'           => array(
							'type'    => 'string',
							'default' => 'em',
						),
						'inputLineHeight'               => array(
							'type' => 'number',
						),
						'inputLineHeightTablet'         => array(
							'type' => 'number',
						),
						'inputLineHeightMobile'         => array(
							'type' => 'number',
						),
						'inputLoadGoogleFonts'          => array(
							'type'    => 'boolean',
							'default' => false,
						),
						'buttonFontSize'                => array(
							'type'    => 'number',
							'default' => '',
						),
						'buttonFontSizeType'            => array(
							'type'    => 'string',
							'default' => 'px',
						),
						'buttonFontSizeTablet'          => array(
							'type' => 'number',
						),
						'buttonFontSizeMobile'          => array(
							'type' => 'number',
						),
						'buttonFontFamily'              => array(
							'type'    => 'string',
							'default' => 'Default',
						),
						'buttonFontWeight'              => array(
							'type' => 'string',
						),
						'buttonFontSubset'              => array(
							'type' => 'string',
						),
						'buttonLineHeightType'          => array(
							'type'    => 'string',
							'default' => 'em',
						),
						'buttonLineHeight'              => array(
							'type' => 'number',
						),
						'buttonLineHeightTablet'        => array(
							'type' => 'number',
						),
						'buttonLineHeightMobile'        => array(
							'type' => 'number',
						),
						'buttonLoadGoogleFonts'         => array(
							'type'    => 'boolean',
							'default' => false,
						),
						'enableOveride'                 => array(
							'type'    => 'boolean',
							'default' => true,
						),
						'radioCheckSize'                => array(
							'type'    => 'number',
							'default' => '',
						),
						'radioCheckBgColor'             => array(
							'type'    => 'string',
							'default' => '',
						),
						'radioCheckSelectColor'         => array(
							'type'    => 'string',
							'default' => '',
						),
						'radioCheckLableColor'          => array(
							'type'    => 'string',
							'default' => '',
						),
						'radioCheckBorderColor'         => array(
							'type'    => 'string',
							'default' => '#abb8c3',
						),
						'radioCheckBorderWidth'         => array(
							'type'    => 'number',
							'default' => '',
						),
						'radioCheckBorderRadius'        => array(
							'type'    => 'number',
							'default' => '',
						),
						'radioCheckFontSize'            => array(
							'type'    => 'number',
							'default' => '',
						),
						'radioCheckFontSizeType'        => array(
							'type'    => 'string',
							'default' => 'px',
						),
						'radioCheckFontSizeTablet'      => array(
							'type' => 'number',
						),
						'radioCheckFontSizeMobile'      => array(
							'type' => 'number',
						),
						'radioCheckFontFamily'          => array(
							'type'    => 'string',
							'default' => 'Default',
						),
						'radioCheckFontWeight'          => array(
							'type' => 'string',
						),
						'radioCheckFontSubset'          => array(
							'type' => 'string',
						),
						'radioCheckLineHeightType'      => array(
							'type'    => 'string',
							'default' => 'em',
						),
						'radioCheckLineHeight'          => array(
							'type' => 'number',
						),
						'radioCheckLineHeightTablet'    => array(
							'type' => 'number',
						),
						'radioCheckLineHeightMobile'    => array(
							'type' => 'number',
						),
						'radioCheckLoadGoogleFonts'     => array(
							'type'    => 'boolean',
							'default' => false,
						),
						'validationMsgPosition'         => array(
							'type'    => 'string',
							'default' => 'default',
						),
						'validationMsgColor'            => array(
							'type'    => 'string',
							'default' => '#ff0000',
						),
						'validationMsgBgColor'          => array(
							'type'    => 'string',
							'default' => '',
						),
						'enableHighlightBorder'         => array(
							'type'    => 'boolean',
							'default' => false,
						),
						'highlightBorderColor'          => array(
							'type'    => 'string',
							'default' => '#ff0000',
						),
						'validationMsgFontSize'         => array(
							'type'    => 'number',
							'default' => '',
						),
						'validationMsgFontSizeType'     => array(
							'type'    => 'string',
							'default' => 'px',
						),
						'validationMsgFontSizeTablet'   => array(
							'type' => 'number',
						),
						'validationMsgFontSizeMobile'   => array(
							'type' => 'number',
						),
						'validationMsgFontFamily'       => array(
							'type'    => 'string',
							'default' => 'Default',
						),
						'validationMsgFontWeight'       => array(
							'type' => 'string',
						),
						'validationMsgFontSubset'       => array(
							'type' => 'string',
						),
						'validationMsgLineHeightType'   => array(
							'type'    => 'string',
							'default' => 'em',
						),
						'validationMsgLineHeight'       => array(
							'type' => 'number',
						),
						'validationMsgLineHeightTablet' => array(
							'type' => 'number',
						),
						'validationMsgLineHeightMobile' => array(
							'type' => 'number',
						),
						'validationMsgLoadGoogleFonts'  => array(
							'type'    => 'boolean',
							'default' => false,
						),
						'successMsgColor'               => array(
							'type'    => 'string',
							'default' => '',
						),
						'successMsgBgColor'             => array(
							'type'    => 'string',
							'default' => '',
						),
						'successMsgBorderColor'         => array(
							'type'    => 'string',
							'default' => '',
						),
						'errorMsgColor'                 => array(
							'type'    => 'string',
							'default' => '',
						),
						'errorMsgBgColor'               => array(
							'type'    => 'string',
							'default' => '',
						),
						'errorMsgBorderColor'           => array(
							'type'    => 'string',
							'default' => '',
						),
						'msgBorderSize'                 => array(
							'type'    => 'number',
							'default' => '',
						),
						'msgBorderRadius'               => array(
							'type'    => 'number',
							'default' => '',
						),
						'msgVrPadding'                  => array(
							'type'    => 'number',
							'default' => '',
						),
						'msgHrPadding'                  => array(
							'type'    => 'number',
							'default' => '',
						),
						'msgFontSize'                   => array(
							'type'    => 'number',
							'default' => '',
						),
						'msgFontSizeType'               => array(
							'type'    => 'string',
							'default' => 'px',
						),
						'msgFontSizeTablet'             => array(
							'type' => 'number',
						),
						'msgFontSizeMobile'             => array(
							'type' => 'number',
						),
						'msgFontFamily'                 => array(
							'type'    => 'string',
							'default' => 'Default',
						),
						'msgFontWeight'                 => array(
							'type' => 'string',
						),
						'msgFontSubset'                 => array(
							'type' => 'string',
						),
						'msgLineHeightType'             => array(
							'type'    => 'string',
							'default' => 'em',
						),
						'msgLineHeight'                 => array(
							'type' => 'number',
						),
						'msgLineHeightTablet'           => array(
							'type' => 'number',
						),
						'msgLineHeightMobile'           => array(
							'type' => 'number',
						),
						'msgLoadGoogleFonts'            => array(
							'type'    => 'boolean',
							'default' => false,
						),
						'radioCheckBorderRadiusType'    => array(
							'type'    => 'string',
							'default' => 'px',
						),
						'msgBorderRadiusType'           => array(
							'type'    => 'string',
							'default' => 'px',
						),
						'fieldBorderRadiusType'         => array(
							'type'    => 'string',
							'default' => 'px',
						),
						'buttonBorderRadiusType'        => array(
							'type'    => 'string',
							'default' => 'px',
						),
					),
					'render_callback' => array( $this, 'render_html' ),
				)
			);
		}

		/**
		 * Render CF7 HTML.
		 *
		 * @param array $attributes Array of block attributes.
		 *
		 * @since 1.10.0
		 */
		public function render_html( $attributes ) {

			$form = $attributes['formId'];

			$classes = array(
				'uagb-cf7-styler__align-' . $attributes['align'],
				'uagb-cf7-styler__field-style-' . $attributes['fieldStyle'],
				'uagb-cf7-styler__btn-align-' . $attributes['buttonAlignment'],
				'uagb-cf7-styler__highlight-style-' . $attributes['validationMsgPosition'],
			);

			if ( $attributes['enableOveride'] ) {
				$classes[] = 'uagb-cf7-styler__check-style-enabled';
			}

			if ( $attributes['enableHighlightBorder'] ) {
				$classes[] = 'uagb-cf7-styler__highlight-border';
			}

			$animation_class = ( isset( $attributes['animationfield'] ) ) ? 'uag-animation-speed  uag-animation-' . $attributes['animationfield'] : '';

			$animation_hover_class = ( isset( $attributes['animationhoverfield'] ) ) ? 'uag-hover-animation-' . $attributes['animationhoverfield'] : '';

			$main_classes = array(
				'wp-block-uagb-cf7-styler',
				'uagb-cf7-styler__outer-wrap',
				'uagb-block-' . $attributes['block_id'],
				$animation_class,
				$animation_hover_class,
			);

			if ( isset( $attributes['className'] ) ) {
				$main_classes[] = $attributes['className'];
			}

			ob_start();
			if ( $form && 0 !== $form && -1 !== $form ) {
				?>
				<div class = "<?php echo esc_attr( implode( ' ', $main_classes ) ); ?>">
					<div class = "<?php echo esc_attr( implode( ' ', $classes ) ); ?>">
					<?php echo do_shortcode( '[contact-form-7 id="' . $form . '"]' ); ?>
					</div>
				</div>
				<?php
			}
			return ob_get_clean();
		}
	}

	/**
	 *  Prepare if class 'UAGB_CF7_Styler' exist.
	 *  Kicking this off by calling 'get_instance()' method
	 */
	UAGB_CF7_Styler::get_instance();
}
