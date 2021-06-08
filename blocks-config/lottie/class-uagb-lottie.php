<?php
/**
 * UAGB - Lottie
 *
 * @package UAGB
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

if ( ! class_exists( 'UAGB_Lottie' ) ) {

	/**
	 * Class UAGB_Lottie.
	 *
	 * @since 1.20.0
	 */
	class UAGB_Lottie {

		/**
		 * Member Variable
		 *
		 * @since 1.20.0
		 * @var instance
		 */
		private static $instance;

		/**
		 *  Initiator
		 *
		 * @since 1.20.0
		 */
		public static function get_instance() {
			if ( ! isset( self::$instance ) ) {
				self::$instance = new self();
			}
			return self::$instance;
		}

		/**
		 * Constructor
		 *
		 * @since 1.20.0
		 */
		public function __construct() {

			// Activation hook.
			add_action( 'init', array( $this, 'register_blocks' ) );
		}

		/**
		 * Registers the `uagb/lottie` block on server.
		 *
		 * @since 1.20.0
		 */
		public function register_blocks() {

			// Check if the register function exists.
			if ( ! function_exists( 'register_block_type' ) ) {
				return;
			}

			register_block_type(
				'uagb/lottie',
				array(
					'attributes'      => array(
						'block_id'         => array(
							'type' => 'string',
						),
						'align'            => array(
							'type'    => 'string',
							'default' => 'center',
						),
						'lottieURl'        => array(
							'type'    => 'string',
							'default' => '',
						),
						'jsonLottie'       => array(
							'type' => 'object',
						),
						// Controls.
						'loop'             => array(
							'type'    => 'boolean',
							'default' => true,
						),
						'speed'            => array(
							'type'    => 'number',
							'default' => 1,
						),
						'reverse'          => array(
							'type'    => 'boolean',
							'default' => false,
						),
						'playOnHover'      => array(
							'type'    => 'boolean',
							'default' => false,
						),
						'playOn'           => array(
							'type'    => 'string',
							'default' => 'none',
						),
						// Style.
						'height'           => array(
							'type' => 'number',
						),
						'heightTablet'     => array(
							'type' => 'number',
						),
						'heightMob'        => array(
							'type' => 'number',
						),
						'width'            => array(
							'type' => 'number',
						),
						'widthTablet'      => array(
							'type' => 'number',
						),
						'widthMob'         => array(
							'type' => 'number',
						),
						'backgroundColor'  => array(
							'type'    => 'string',
							'default' => '',
						),
						'backgroundHColor' => array(
							'type'    => 'string',
							'default' => '',
						),
					),
					'render_callback' => array( $this, 'render_html' ),
				)
			);
		}

		/**
		 * Render Lottie HTML.
		 *
		 * @param array $attributes Array of block attributes.
		 *
		 * @since 1.20.0
		 */
		public function render_html( $attributes ) {

			$block_id = '';

			if ( isset( $attributes['block_id'] ) ) {
				$block_id = $attributes['block_id'];
			}

			$main_classes = array(
				'uagb-block-' . $block_id,
				'uagb-lottie__outer-wrap',
				'uagb-lottie__' . $attributes['align'],
			);

			ob_start();

			?>
				<div class = "<?php echo esc_attr( implode( ' ', $main_classes ) ); ?>" ></div>
			<?php
				return ob_get_clean();
		}
	}

	/**
	 *  Prepare if class 'UAGB_Lottie' exist.
	 *  Kicking this off by calling 'get_instance()' method
	 */
	UAGB_Lottie::get_instance();
}
