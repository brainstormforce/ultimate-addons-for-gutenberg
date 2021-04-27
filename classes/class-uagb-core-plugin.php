<?php
/**
 * UAGB Core Plugin.
 *
 * @package UAGB
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * UAGB_Core_Plugin.
 *
 * @package UAGB
 */
class UAGB_Core_Plugin {

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

		$this->includes();
	}

	/**
	 * Includes.
	 *
	 * @since 1.0.0
	 */
	private function includes() {

		require UAGB_DIR . 'lib/notices/class-astra-notices.php';
		require UAGB_DIR . 'classes/class-uagb-admin.php';
		require UAGB_DIR . 'classes/class-uagb-frontend.php';
		require UAGB_DIR . 'classes/class-uagb-init-blocks.php';
	}
}

/**
 *  Prepare if class 'UAGB_Core_Plugin' exist.
 *  Kicking this off by calling 'get_instance()' method
 */
UAGB_Core_Plugin::get_instance();
