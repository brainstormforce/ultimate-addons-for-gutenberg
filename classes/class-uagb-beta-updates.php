<?php
/**
 * UAGB Beta Updates.
 *
 * @package UAGB
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

if ( ! class_exists( 'UAGB_Beta_Updates' ) ) {

	/**
	 * Class UAGB_Beta_Updates.
	 */
	final class UAGB_Beta_Updates {

		/**
		 * Member Variable
		 *
		 * @var instance
		 */
		private static $instance;

		/**
		 * Transient key.
		 *
		 * Holds the UAG beta updates transient key.
		 *
		 * @since 1.23.0
		 * @access private
		 * @static
		 *
		 * @var string Transient key.
		 */
		private $transient_key;

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
		 *
		 * @since 1.23.0
		 */
		public function __construct() {

			if ( 'yes' !== get_option( 'uagb_beta', 'no' ) ) {
				return;
			}

			$this->transient_key = md5( 'uagb_beta_testers_response_key' );

			add_filter( 'pre_set_site_transient_update_plugins', array( $this, 'check_version' ) );

		}

		/**
		 * Get beta version.
		 *
		 * Retrieve UAG beta version from wp.org plugin repository.
		 *
		 * @since 1.23.0
		 * @access private
		 *
		 * @return string|false Beta version or false.
		 */
		private function get_beta_version() {

			$beta_version = get_site_transient( $this->transient_key );

			if ( false === $beta_version ) {
				$beta_version = 'false';

				$response = wp_remote_get( 'https://plugins.svn.wordpress.org/ultimate-addons-for-gutenberg/trunk/readme.txt' );

				if ( ! is_wp_error( $response ) && ! empty( $response['body'] ) ) {
					preg_match( '/Beta tag: (.*)/i', $response['body'], $matches );
					if ( isset( $matches[1] ) ) {
						$beta_version = $matches[1];
					}
				}

				set_site_transient( $this->transient_key, $beta_version, 6 * HOUR_IN_SECONDS );
			}

			return $beta_version;
		}

		/**
		 * Check version.
		 *
		 * Checks whether a beta version exist, and retrieve the version data.
		 *
		 * Fired by `pre_set_site_transient_update_plugins` filter, before WordPress
		 * runs the plugin update checker.
		 *
		 * @since 1.23.0
		 * @access public
		 *
		 * @param object $transient Plugin version data.
		 *
		 * @return array Plugin version data.
		 */
		public function check_version( $transient ) {

			if ( empty( $transient->checked ) ) {
				return $transient;
			}

			delete_site_transient( $this->transient_key );

			$plugin_slug = basename( UAGB_FILE, '.php' );

			$beta_version = $this->get_beta_version();

			if ( 'false' !== $beta_version && version_compare( $beta_version, UAGB_VER, '>' ) ) {
				$response              = new \stdClass();
				$response->plugin      = $plugin_slug;
				$response->slug        = $plugin_slug;
				$response->new_version = $beta_version;
				$response->url         = 'https://ultimategutenberg.com/';
				$response->package     = sprintf( 'https://downloads.wordpress.org/plugin/ultimate-addons-for-gutenberg.%s.zip', $beta_version );

				$transient->response[ UAGB_BASE ] = $response;
			}

			return $transient;
		}
	}

	/**
	 *  Prepare if class 'UAGB_Beta_Updates' exist.
	 *  Kicking this off by calling 'get_instance()' method
	 */
	UAGB_Beta_Updates::get_instance();
}
