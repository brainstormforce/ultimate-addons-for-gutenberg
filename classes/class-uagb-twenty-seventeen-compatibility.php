<?php
/**
 * UAGB Twenty Seventeen Compatibility.
 *
 * @package UAGB
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

if ( ! class_exists( 'UAGB_Twenty_Seventeen_Compatibility' ) ) {

	/**
	 * Class UAGB_Twenty_Seventeen_Compatibility.
	 */
	final class UAGB_Twenty_Seventeen_Compatibility {

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

			add_action( 'wp', array( $this, 'generate_stylesheet' ), 99 );
		}
		/**
		 * Generates stylesheet and appends in head tag.
		 *
		 * @since 1.18.1
		 */
		public function generate_stylesheet() {

			$panel_count = twentyseventeen_panel_count();

			$all_posts = array();

			for ( $i = 1; $i <= $panel_count; $i++ ) {
				$mod_key = 'panel_' . $i;
				$post_id = get_theme_mod( $mod_key );
				$post    = get_post( $post_id );
				array_push( $all_posts, $post );
			}

			foreach ( $all_posts as $post ) {

				UAGB_Frontend::get_instance()->prepare_assets( $post );
			}
			if ( 'enabled' === UAGB_Helper::$file_generation ) {
				UAGB_Frontend::file_write( UAGB_Frontend::$stylesheet, 'css' );
			}
		}
	}
}
UAGB_Twenty_Seventeen_Compatibility::get_instance();
