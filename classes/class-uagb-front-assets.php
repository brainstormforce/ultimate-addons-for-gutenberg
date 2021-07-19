<?php
/**
 * UAGB Front Assets.
 *
 * @package UAGB
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Class UAGB_Front_Assets.
 */
class UAGB_Front_Assets {

	/**
	 * Member Variable
	 *
	 * @since 0.0.1
	 * @var instance
	 */
	private static $instance;

	/**
	 * Post ID
	 *
	 * @since 1.23.0
	 * @var array
	 */
	protected $post_id;

	/**
	 * Assets Post Object
	 *
	 * @since 1.23.0
	 * @var array
	 */
	protected $post_assets;

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

		add_action( 'wp', array( $this, 'set_initial_variables' ), 99 );
		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_asset_files' ) );
	}

	/**
	 * Set initial variables.
	 *
	 * @since 1.23.0
	 */
	public function set_initial_variables() {

		$this->post_id = false;

		if ( is_single() || is_page() || is_404() ) {
			$this->post_id = get_the_ID();
		}

		if ( ! $this->post_id ) {
			return;
		}

		$this->post_assets = new UAGB_Post_Assets( $this->post_id );

		if ( ! $this->post_assets->is_allowed_assets_generation ) {
			return;
		}

		if ( is_single() || is_page() || is_404() ) {

			$this_post = get_post( $this->post_id );

			/**
			 * Filters the post to build stylesheet for.
			 *
			 * @param \WP_Post $this_post The global post.
			 */
			$this_post = apply_filters_deprecated( 'uagb_post_for_stylesheet', array( $this_post ), '1.23.0' );

			if ( $this_post && $this->post_id !== $this_post->ID ) {
				$this->post_assets->prepare_assets( $this_post );
			}
		}
	}

	/**
	 * Enqueue asset files.
	 *
	 * @since 1.23.0
	 */
	public function enqueue_asset_files() {

		if ( $this->post_assets ) {
			$this->post_assets->enqueue_scripts();
		}

		/* Archive compatibility */
		if ( is_archive() || is_home() || is_search() ) {

			global $wp_query;
			$cached_wp_query = $wp_query->posts;

			foreach ( $cached_wp_query as $post ) { // phpcs:ignore WordPress.WP.GlobalVariablesOverride.Prohibited

				$current_post_assets = new UAGB_Post_Assets( $post->ID );

				$current_post_assets->enqueue_scripts();

			}
		}

		/* WooCommerce compatibility */
		if ( class_exists( 'WooCommerce' ) ) {

			if ( is_cart() ) {

				$id = get_option( 'woocommerce_cart_page_id' );
			} elseif ( is_account_page() ) {

				$id = get_option( 'woocommerce_myaccount_page_id' );
			} elseif ( is_checkout() ) {

				$id = get_option( 'woocommerce_checkout_page_id' );
			} elseif ( is_checkout_pay_page() ) {

				$id = get_option( 'woocommerce_pay_page_id' );
			} elseif ( is_shop() ) {

				$id = get_option( 'woocommerce_shop_page_id' );
			}

			if ( ! empty( $id ) ) {
				$current_post_assets = new UAGB_Post_Assets( intval( $id ) );
				$current_post_assets->enqueue_scripts();
			}
		}

	}

	/**
	 * Get post_assets obj.
	 *
	 * @since 1.23.0
	 */
	public function get_post_assets_obj() {
		return $this->post_assets;
	}
}

/**
 *  Prepare if class 'UAGB_Front_Assets' exist.
 *  Kicking this off by calling 'get_instance()' method
 */
UAGB_Front_Assets::get_instance();

/**
 * Get frontend post_assets obj.
 *
 * @since 1.23.0
 */
function uagb_get_front_post_assets() {
	return UAGB_Front_Assets::get_instance()->get_post_assets_obj();
}
