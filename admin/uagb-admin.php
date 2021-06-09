<?php
/**
 * UAGB Admin HTML.
 *
 * @package UAGB
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

?>
<div class="uagb-menu-page-wrapper wrap uagb-clear general">
	<div id="uagb-menu-page">
		<div class="uagb-menu-page-header <?php echo esc_attr( implode( ' ', $uagb_header_wrapper_class ) ); ?>">
			<div class="uagb-container uagb-flex">
				<div class="uagb-title">
					<a href="<?php echo esc_url( $uagb_visit_site_url ); ?>" target="_blank" rel="noopener" >
					<?php if ( $uagb_icon ) { ?>
						<img src="<?php echo esc_url( UAGB_URL . 'admin/assets/images/uagb_logo.svg' ); ?>" class="uagb-header-icon" alt="<?php echo esc_attr( UAGB_PLUGIN_NAME ); ?> "  width="640" height="360" loading="lazy">
						<?php
					} else {
						echo sprintf( '<h4>%s</h4>', esc_html( UAGB_PLUGIN_NAME ) );
					}
					?>
						<span class="uagb-plugin-version"><?php echo esc_html( UAGB_VER ); ?></span>
					</a>
				</div>
				<div class="uagb-top-links">
					<?php esc_attr_e( 'Take Gutenberg to The Next Level! - ', 'ultimate-addons-for-gutenberg' ); ?>
					<a href="<?php echo esc_url( $uagb_visit_site_url ); ?>" target="_blank" rel=""><?php esc_html_e( 'View Demos', 'ultimate-addons-for-gutenberg' ); ?></a>
				</div>
			</div>
		</div>
		<?php
			do_action( 'uagb_render_admin_content' );
		?>
	</div>
</div>
