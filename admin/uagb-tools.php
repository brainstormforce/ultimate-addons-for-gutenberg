<?php
/**
 * Tools Setting Form
 *
 * @package UAGB
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

$kb_data                = UAGB_Admin_Helper::knowledgebase_data();
$enable_kb              = $kb_data['enable_knowledgebase'];
$kb_url                 = $kb_data['knowledgebase_url'];
$support_data           = UAGB_Admin_Helper::support_data();
$support_url            = $support_data['support_url'];
$uagb_support_link      = apply_filters( 'uagb_support_link', $support_url );
$uagb_support_link_text = apply_filters( 'uagb_support_link_text', __( 'Submit a Ticket »', 'ultimate-addons-for-gutenberg' ) );

?>
<div class="uagb-container uagb-general">
<div id="poststuff">
	<div id="post-body" class="columns-2">
		<div id="post-body-content">
			<!-- All WordPress Notices below header -->
			<h1 class="screen-reader-text"> <?php esc_html_e( 'Ultimate Addons for Gutenberg', 'ultimate-addons-for-gutenberg' ); ?> </h1>
			<div class="widgets postbox">
				<div class="uagb-intro-section">
					<div class="uagb-intro-col">
						<?php
							$uagb_beta = get_option( 'uagb_beta', 'no' );

							$beta_updates_button_text = __( 'Enable Beta Updates', 'ultimate-addons-for-gutenberg' );

							$value = 'yes';

						if ( 'yes' === $uagb_beta ) {

							$beta_updates_button_text = __( 'Disable Beta Updates', 'ultimate-addons-for-gutenberg' );

							$value = 'no';

						}
						?>
						<h2 class="uagb-normal-cusror">
							<span class="uagb-gen-icon dashicons dashicons-laptop"></span>
							<span><?php esc_html_e( 'Enable Beta Updates', 'ultimate-addons-for-gutenberg' ); ?></span>
						</h2>
						<div class="inside">
							<p>
								<?php esc_html_e( 'Enable this option to turn on beta updates & get notified when a new beta version of Ultimate Addons for Gutenberg is available.', 'ultimate-addons-for-gutenberg' ); ?>
								<br><br>
								<?php esc_html_e( 'The beta version will not install automatically. You will always have the option to ignore it.', 'ultimate-addons-for-gutenberg' ); ?>
							</p>
							<button class="button uag-beta-updates" data-value="<?php echo esc_attr( $value ); ?>" >
								<?php echo esc_html( $beta_updates_button_text ); ?>
							</button>

							<p><span style="color: red;">
								<?php esc_html_e( 'Note: We do not recommend updating to a beta version on production site.', 'ultimate-addons-for-gutenberg' ); ?>
							</span></p>
						</div>
					</div>
				</div>
			</div>
			<div class="widgets postbox">
				<div class="uagb-intro-section">
					<div class="uagb-intro-col">
						<h2 class="uagb-normal-cusror">
							<span class="uagb-gen-icon dashicons dashicons-controls-repeat"></span>
							<span><?php esc_html_e( 'Rollback to Previous Version', 'ultimate-addons-for-gutenberg' ); ?></span>
						</h2>
						<div class="inside">
							<p>
								<?php
								/* translators: %s: UAG version */
								echo esc_html( sprintf( __( 'Experiencing an issue with Ultimate Addons for Gutenberg version %s? Rollback to a previous version before the issue appeared.', 'ultimate-addons-for-gutenberg' ), UAGB_VER ) );
								?>
							</p>
							<select class="uagb-rollback-select">
								<?php

								$uag_versions = UAGB_Admin_Helper::get_instance()->get_rollback_versions();

								foreach ( $uag_versions as $version ) {
									?>
									<option value="<?php echo esc_attr( $version ); ?>"><?php echo esc_html( $version ); ?> </option>
									<?php
								}
								?>
							</select>
							<a data-placeholder-text=" <?php echo esc_html__( 'Reinstall ', 'ultimate-addons-for-gutenberg' ) . 'v{VERSION}'; ?>" href="<?php echo esc_url( add_query_arg( 'version', $uag_versions[0], wp_nonce_url( admin_url( 'admin-post.php?action=uag_rollback' ), 'uag_rollback' ) ) ); ?>" data-placeholder-url="<?php echo esc_url( wp_nonce_url( admin_url( 'admin-post.php?action=uag_rollback&version=VERSION' ), 'uag_rollback' ) ); ?>" class="button uagb-rollback-button"><?php echo esc_html__( 'Reinstall ', 'ultimate-addons-for-gutenberg' ) . esc_html( $uag_versions[0] ); ?> </a>
							<p><span style="color: red;">
								<?php esc_html_e( 'Warning: Please backup your database before making the rollback.', 'ultimate-addons-for-gutenberg' ); ?>
							</span></p>
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="postbox-container uagb-sidebar" id="postbox-container-1">
			<div id="side-sortables">
				<div class="postbox">
					<h2 class="hndle uagb-normal-cusror">
						<span class="dashicons dashicons-book"></span>
						<span><?php esc_html_e( 'Knowledge Base', 'ultimate-addons-for-gutenberg' ); ?></span>
					</h2>
					<div class="inside">
						<p>
							<?php esc_html_e( 'Not sure how something works? Take a peek at the knowledge base and learn.', 'ultimate-addons-for-gutenberg' ); ?>
						</p>
						<a href='<?php echo esc_url( $kb_url ); ?> ' target="_blank" rel="noopener"><?php esc_attr_e( 'Visit Knowledge Base »', 'ultimate-addons-for-gutenberg' ); ?></a>
					</div>
				</div>
				<div class="postbox">
					<h2 class="hndle uagb-normal-cusror">
						<span class="dashicons dashicons-awards"></span>
						<span><?php esc_html_e( 'Five Star Support', 'ultimate-addons-for-gutenberg' ); ?></span>
					</h2>
					<div class="inside">
						<p>
							<?php
							printf(
								/* translators: %1$s: uagb name. */
								esc_html__( 'Got a question? Get in touch with %1$s developers. We\'re happy to help!', 'ultimate-addons-for-gutenberg' ),
								esc_html( UAGB_PLUGIN_NAME )
							);
							?>
						</p>
						<?php
							printf(
								/* translators: %1$s: uagb support link. */
								'%1$s',
								! empty( $uagb_support_link ) ? '<a href=' . esc_url( $uagb_support_link ) . ' target="_blank" rel="noopener">' . esc_html( $uagb_support_link_text ) . '</a>' :
								esc_html( $uagb_support_link_text )
							);
							?>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
</div>
