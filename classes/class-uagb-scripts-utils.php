<?php
/**
 * UAGB Scripts Utils.
 *
 * @package UAGB
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

/**
 * Class UAGB_Scripts_Utils.
 */
final class UAGB_Scripts_Utils {

	/**
	 * Enqueue Gutenberg block assets for both frontend + backend.
	 *
	 * @since 1.23.0
	 */
	public static function enqueue_blocks_dependency_both() {

		$blocks       = UAGB_Config::get_block_attributes();
		$saved_blocks = UAGB_Admin_Helper::get_admin_settings_option( '_uagb_blocks', array() );
		$block_assets = UAGB_Config::get_block_assets();

		foreach ( $blocks as $slug => $value ) {
			$_slug = str_replace( 'uagb/', '', $slug );

			if ( ! ( isset( $saved_blocks[ $_slug ] ) && 'disabled' === $saved_blocks[ $_slug ] ) ) {

				$js_assets = ( isset( $blocks[ $slug ]['js_assets'] ) ) ? $blocks[ $slug ]['js_assets'] : array();

				$css_assets = ( isset( $blocks[ $slug ]['css_assets'] ) ) ? $blocks[ $slug ]['css_assets'] : array();

				if ( 'cf7-styler' === $_slug ) {
					if ( ! wp_script_is( 'contact-form-7', 'enqueued' ) ) {
						wp_enqueue_script( 'contact-form-7' );
					}

					if ( ! wp_script_is( ' wpcf7-admin', 'enqueued' ) ) {
						wp_enqueue_script( ' wpcf7-admin' );
					}
				}

				foreach ( $js_assets as $asset_handle => $val ) {
					// Scripts.
					wp_register_script(
						$val, // Handle.
						$block_assets[ $val ]['src'],
						$block_assets[ $val ]['dep'],
						UAGB_VER,
						true
					);

					$skip_editor = isset( $block_assets[ $val ]['skipEditor'] ) ? $block_assets[ $val ]['skipEditor'] : false;

					if ( is_admin() && false === $skip_editor ) {
						wp_enqueue_script( $val );
					}
				}

				foreach ( $css_assets as $asset_handle => $val ) {
					// Styles.
					wp_register_style(
						$val, // Handle.
						$block_assets[ $val ]['src'],
						$block_assets[ $val ]['dep'],
						UAGB_VER
					);

					if ( is_admin() ) {
						wp_enqueue_style( $val );
					}
				}
			}
		}

		$uagb_masonry_ajax_nonce = wp_create_nonce( 'uagb_masonry_ajax_nonce' );
		wp_localize_script(
			'uagb-post-js',
			'uagb_data',
			array(
				'ajax_url'                => admin_url( 'admin-ajax.php' ),
				'uagb_masonry_ajax_nonce' => $uagb_masonry_ajax_nonce,
			)
		);

		$uagb_forms_ajax_nonce = wp_create_nonce( 'uagb_forms_ajax_nonce' );
		wp_localize_script(
			'uagb-forms-js',
			'uagb_forms_data',
			array(
				'ajax_url'              => admin_url( 'admin-ajax.php' ),
				'uagb_forms_ajax_nonce' => $uagb_forms_ajax_nonce,
			)
		);

	}

	/**
	 * Enqueue block styles.
	 *
	 * @since 1.23.0
	 */
	public static function enqueue_blocks_styles() {

		$wp_upload_dir = UAGB_Helper::get_uag_upload_dir_path();

		if ( file_exists( $wp_upload_dir . 'custom-style-blocks.css' ) ) {

			$wp_upload_url = UAGB_Helper::get_uag_upload_url_path();

			wp_enqueue_style(
				'uagb-block-css', // Handle.
				$wp_upload_url . 'custom-style-blocks.css', // Block style CSS.
				array(),
				UAGB_VER
			);
		} else {
			wp_enqueue_style(
				'uagb-block-css', // Handle.
				UAGB_URL . 'dist/style-blocks.css', // Block style CSS.
				array(),
				UAGB_VER
			);
		}
	}

	/**
	 * Enqueue block rtl styles.
	 *
	 * @since 1.23.0
	 */
	public static function enqueue_blocks_rtl_styles() {
		if ( is_rtl() ) {
			wp_enqueue_style(
				'uagb-style-rtl', // Handle.
				UAGB_URL . 'assets/css/style-blocks.rtl.css', // RTL style CSS.
				array(),
				UAGB_VER
			);
		}
	}

	/**
	 * Returns an array of paths for the CSS and JS assets
	 * of the current post.
	 *
	 * @param  var $type    Gets the CSS\JS type.
	 * @param  var $post_id Post ID.
	 * @since 1.14.0
	 * @return array
	 */
	public static function get_asset_info( $type, $post_id ) {

		$uploads_dir = UAGB_Helper::get_upload_dir();
		$info        = array();

		$path                   = get_post_meta( $post_id, '_uag_' . $type . '_file_name', true );
		$info[ $type ]          = $uploads_dir['path'] . $path;
		$info[ $type . '_url' ] = $uploads_dir['url'] . $path;

		return $info;
	}
}
