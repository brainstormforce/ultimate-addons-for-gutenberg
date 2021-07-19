<?php
/**
 * Global Data.
 *
 * @package uag
 */

namespace UagAdmin\Inc;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Class GlobalSettings.
 */
class GlobalSettings {

	/**
	 * Get flow meta options.
	 */
	public static function get_global_settings_fields() {

		$settings = array(
			'rollback_to_previous_version' => array(
				'title'  => __( 'Version Control ', 'ultimate-addons-for-gutenberg' ),
				'fields' => array(
					'rollback_to_previous_version' => array(
						'type'    => 'select',
						'name'    => '_uag_common[rollback_to_previous_version]',
						'label'   => __( 'Rollback to Previous Version', 'ultimate-addons-for-gutenberg' ),
						/* translators: %1$s: link html start, %2$s: link html end*/
						'desc'    => sprintf( __( 'Experiencing an issue with Ultimate Addons for Gutenberg version %s? Rollback to a previous version before the issue appeared.', 'ultimate-addons-for-gutenberg' ), UAGB_VER ),
						'options' => AdminHelper::get_rollback_versions(),
					),
				),
			),
			'enable_beta_updates'          => array(
				'title'  => __( 'Version Control ', 'ultimate-addons-for-gutenberg' ),
				'fields' => array(
					'enable_beta_updates' => array(
						'name'  => '_uag_common[enable_beta_updates]',
						'label' => __( 'Enable Beta Updates', 'ultimate-addons-for-gutenberg' ),
						/* translators: %1$s: link html start, %2$s: link html end*/
						'desc'  => __(
							'Enable this option to turn on beta updates & get notified when a new beta version of Ultimate Addons for Gutenberg is available.The beta version will not install automatically. You will always have the option to ignore it.',
							'ultimate-addons-for-gutenberg'
						),
					),
				),
			),
			'enable_block_condition'          => array(
				'title'  => __( 'Display Condition', 'ultimate-addons-for-gutenberg' ),
				'fields' => array(
					'enable_block_condition' => array(
						'type'    => 'toggle',
						'name'  => '_uag_common[enable_block_condition]',
						'label' => __( 'Display Condition', 'ultimate-addons-for-gutenberg' ),
						/* translators: %1$s: link html start, %2$s: link html end*/
					),
				),
			),
			'enable_file_generation'       => array(
				'title'  => __( 'Assets Generation', 'ultimate-addons-for-gutenberg' ),
				'fields' => array(
					'enable_file_generation' => array(
						'type'  => 'toggle',
						'name'  => '_uag_common[enable_file_generation]',
						'label' => __( 'Enable File Generation', 'ultimate-addons-for-gutenberg' ),
						/* translators: %1$s: link html start, %2$s: link html end*/
						'desc'  => sprintf(
							__(
								'Enabling this option will generate CSS & JS files for Ultimate Addons for Gutenberg block styling instead of loading the CSS & JS inline on page.

						Please read this <a target="_blank" rel="noopener" href="%1$s">article</a> to know more.
						
						',
								'ultimate-addons-for-gutenberg'
							),
							esc_url( 'https://www.ultimategutenberg.com/clean-html-with-uag/?utm_source=uag-dashboard&utm_medium=link&utm_campaign=uag-dashboard' )
						),
					),
				),
			),
			'blocks_activation_and_deactivation'       => array(
				'title' => __( 'Blocks Activation & Deactivation', 'ultimate-addons-for-gutenberg' ),
			),
			'enable_templates_button'       => array(
				'title'  => __( 'Templates', 'ultimate-addons-for-gutenberg' ),
				'fields' => array(
					'enable_templates_button' => array(
						'type'  => 'toggle',
						'name'  => '_uag_common[enable_templates_button]',
						'label' => __( 'Enable Templates Button', 'ultimate-addons-for-gutenberg' ),
						'desc'  => sprintf(
							__('Enabling this option will generate CSS & JS files for Ultimate Addons for Gutenberg block styling instead of loading the CSS & JS inline on page.Please read this <a target="_blank" rel="noopener" href="%1$s">article</a> to know more.','ultimate-addons-for-gutenberg'),
						)
					),
				),
			),

		);

		$settings = apply_filters( 'uag_global_settings_data', $settings );

		return $settings;
	}
}
