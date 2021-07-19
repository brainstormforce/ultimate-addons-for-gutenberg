<?php
/**
 * Uag Admin Helper.
 *
 * @package Uag
 */

namespace UagAdmin\Inc;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Class AdminHelper.
 */
class AdminHelper {

	/**
	 * Common.
	 *
	 * @var object instance
	 */
	public static $common = null;

	/**
	 * Options.
	 *
	 * @var object instance
	 */
	public static $options = null;

	/**
	 * Get Common settings.
	 *
	 * @return array.
	 */
	public static function get_common_settings() {

		$options = array();

		$uag_versions = self::get_rollback_versions();

		$common_default = apply_filters(
			'uag_common_settings_default',
			array(
				'disallow_indexing'            => 'disable',
				'global_checkout'              => '',
				'default_page_builder'         => 'elementor',
				'rollback_to_previous_version' => $uag_versions[0]['value'],
				'enable_beta_updates'          => 'no',
				'enable_file_generation'       => 'no',
				'blocks_activation_and_deactivation' => \UAGB_Admin_Helper::get_admin_settings_option( '_uagb_blocks', array() ),
				'enable_templates_button' => 'disabled',
				'enable_block_condition' => true
			)
		);
		$updatedStatus = array(
			'disallow_indexing'            => 'disable',
			'global_checkout'              => '',
			'default_page_builder'         => 'elementor',
			'rollback_to_previous_version' => $uag_versions[0]['value'],
			'enable_beta_updates'          => self::get_admin_settings_option( 'uagb_beta', false, false ),
			'enable_file_generation'       => self::get_admin_settings_option( '_uagb_allow_file_generation', false, false ),
			'blocks_activation_and_deactivation' => self::get_admin_settings_option( '_uagb_blocks', array() ),
			'enable_templates_button' => self::get_admin_settings_option( 'enable_templates_button', false, false ),
			'enable_block_condition' => self::get_admin_settings_option( 'enable_block_condition', false, false )
		);

		$common = self::get_admin_settings_option( '_uag_common', false, false );

		$common = wp_parse_args( $common, $updatedStatus );

		foreach ( $common as $key => $data ) {	
			$options[ '_uag_common[' . $key . ']' ] = $data;
		}
		return $options;
	}
	/**
	 * Set Common settings.
	 *
	 * @return array.
	 */
	public static function set_common_settings( $key, $value ) {

		$common         = self::get_common_settings();
		$common[ $key ] = $value;

		update_option( '_uag_common', $common );
	}

	/**
	 * Get admin settings.
	 *
	 * @param string $key key.
	 * @param bool   $default key.
	 * @param bool   $network_override key.
	 *
	 * @return array.
	 */
	public static function get_admin_settings_option( $key, $default = false, $network_override = false ) {

		// Get the site-wide option if we're in the network admin.
		if ( $network_override && is_multisite() ) {
			$value = get_site_option( $key, $default );
		} else {
			$value = get_option( $key, $default );
		}

		return $value;
	}


	/**
	 * Get options.
	 */
	public static function get_options() {

		$general_settings = self::get_common_settings();

		$options = $general_settings;

		$options = apply_filters( 'uag_global_data_options', $options );

		return $options;
	}

	/**
	 * Get Rollback versions.
	 *
	 * @since 1.23.0
	 * @return array
	 * @access public
	 */
	public static function get_rollback_versions() {

		$rollback_versions_options = get_transient( 'uag_rollback_versions_' . UAGB_VER );

		if ( ! $rollback_versions_options || empty( $rollback_versions_options ) ) {

			$max_versions = 10;

			require_once ABSPATH . 'wp-admin/includes/plugin-install.php';

			$plugin_information = plugins_api(
				'plugin_information',
				array(
					'slug' => 'ultimate-addons-for-gutenberg',
				)
			);

			if ( empty( $plugin_information->versions ) || ! is_array( $plugin_information->versions ) ) {
				return array();
			}

			krsort( $plugin_information->versions );

			$rollback_versions = array();

			foreach ( $plugin_information->versions as $version => $download_link ) {

				$lowercase_version = strtolower( $version );

				$is_valid_rollback_version = ! preg_match( '/(trunk|beta|rc|dev)/i', $lowercase_version );

				if ( ! $is_valid_rollback_version ) {
					continue;
				}

				if ( version_compare( $version, UAGB_VER, '>=' ) ) {
					continue;
				}

				$rollback_versions[] = $version;
			}

			usort( $rollback_versions, array( __CLASS__, 'sort_rollback_versions' ) );

			$rollback_versions = array_slice( $rollback_versions, 0, $max_versions, true );

			$rollback_versions_options = array();

			foreach ( $rollback_versions as $version ) {

				$version = array(
					'label' => $version,
					'value' => $version,

				);

				$rollback_versions_options[] = $version;
			}

			set_transient( 'uag_rollback_versions_' . UAGB_VER, $rollback_versions_options, WEEK_IN_SECONDS );
		}

		return $rollback_versions_options;
	}
	/**
	 * Sort Rollback versions.
	 *
	 * @param string $prev Previous Version.
	 * @param string $next Next Version.
	 *
	 * @since 1.23.0
	 * @return array
	 * @access public
	 */
	public static function sort_rollback_versions( $prev, $next ) {

		if ( version_compare( $prev, $next, '==' ) ) {
			return 0;
		}

		if ( version_compare( $prev, $next, '>' ) ) {
			return -1;
		}

		return 1;
	}
}
