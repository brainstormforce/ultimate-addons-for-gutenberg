<?php
/**
 * UAGB Filesystem
 *
 * @package UAGB
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Class UAGB_Filesystem.
 */
class UAGB_Filesystem {

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
	 * Get an instance of WP_Filesystem.
	 *
	 * @since 1.23.0
	 */
	public function get_filesystem() {

		global $wp_filesystem;

		if ( ! $wp_filesystem || 'direct' !== $wp_filesystem->method ) {
			require_once ABSPATH . '/wp-admin/includes/file.php';

			/**
			 * Context for filesystem, default false.
			 *
			 * @see request_filesystem_credentials_context
			 */
			$context = apply_filters( 'request_filesystem_credentials_context', false );

			add_filter( 'filesystem_method', array( $this, 'filesystem_method' ) );
			add_filter( 'request_filesystem_credentials', array( $this, 'request_filesystem_credentials' ) );

			$creds = request_filesystem_credentials( site_url(), '', true, $context, null );

			WP_Filesystem( $creds, $context );

			remove_filter( 'filesystem_method', array( $this, 'filesystem_method' ) );
			remove_filter( 'request_filesystem_credentials', array( $this, 'request_filesystem_credentials' ) );
		}

		// Set the permission constants if not already set.
		if ( ! defined( 'FS_CHMOD_DIR' ) ) {
			define( 'FS_CHMOD_DIR', 0755 );
		}
		if ( ! defined( 'FS_CHMOD_FILE' ) ) {
			define( 'FS_CHMOD_FILE', 0644 );
		}

		return $wp_filesystem;
	}

	/**
	 * Method to direct.
	 *
	 * @since 1.23.0
	 */
	public function filesystem_method() {
		return 'direct';
	}

	/**
	 * Sets credentials to true.
	 *
	 * @since 1.23.0
	 */
	public function request_filesystem_credentials() {
		return true;
	}
}

/**
 *  Prepare if class 'UAGB_Filesystem' exist.
 *  Kicking this off by calling 'get_instance()' method
 */
UAGB_Filesystem::get_instance();

/**
 * Filesystem class
 *
 * @since 1.23.0
 */
function uagb_filesystem() {
	return UAGB_Filesystem::get_instance()->get_filesystem();
}

