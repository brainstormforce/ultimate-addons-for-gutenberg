<?php
/**
 * General Setting Form
 *
 * @package UAGB
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

$blocks                = UAGB_Admin_Helper::get_block_options();
$allow_file_generation = UAGB_Helper::allow_file_generation();
$kb_data               = UAGB_Admin_Helper::knowledgebase_data();
$enable_kb             = $kb_data['enable_knowledgebase'];
$kb_url                = $kb_data['knowledgebase_url'];

$support_data   = UAGB_Admin_Helper::support_data();
$enable_support = $support_data['enable_support'];
$support_url    = $support_data['support_url'];

$uagb_support_link      = apply_filters( 'uagb_support_link', $support_url );
$uagb_support_link_text = apply_filters( 'uagb_support_link_text', __( 'Submit a Ticket »', 'ultimate-addons-for-gutenberg' ) );
$has_read_write_perms   = UAGB_Helper::has_read_write_permissions();


array_multisort(
	array_map(
		function( $element ) {
			return $element['title'];
		},
		$blocks
	),
	SORT_ASC,
	$blocks
);
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
						<h2>
							<span class="uagb-intro-icon dashicons dashicons-megaphone"></span>
							<span><?php esc_html_e( 'Welcome to the Ultimate Addons for Gutenberg!', 'ultimate-addons-for-gutenberg' ); ?></span>
						</h2>
						<p><?php esc_html_e( 'Thank you for choosing Ultimate Addons for Gutenberg - the most comprehensive library of advanced and creative blocks to build a stunning website and blog faster than ever before!', 'ultimate-addons-for-gutenberg' ); ?></p>
						<a href="https://www.ultimategutenberg.com/getting-started-with-gutenberg-blocks/?utm_source=uag-dashboard&utm_medium=link&utm_campaign=uag-dashboard" target="_blank" rel="noopener"><?php esc_attr_e( 'How to use the Ultimate Addons for Gutenberg Blocks »', 'ultimate-addons-for-gutenberg' ); ?></a>
						<p><strong><?php esc_html_e( 'Ready-to-use Full Demo Websites - ', 'ultimate-addons-for-gutenberg' ); ?></strong><?php esc_html_e( 'Get professionally designed 20+ pre-built FREE starter sites built using Gutenberg, Ultimate Addons for Gutenberg and the Astra theme. These can be imported in just a few clicks. Tweak them easily and build awesome websites in minutes!', 'ultimate-addons-for-gutenberg' ); ?></p>
						<a href="https://www.ultimategutenberg.com/ready-websites-for-gutenberg/?utm_source=uag-dashboard&utm_medium=link&utm_campaign=uag-dashboard" target="_blank" rel="noopener"><?php esc_attr_e( 'Know More »', 'ultimate-addons-for-gutenberg' ); ?></a>
					</div>
				</div>
			</div>
			<div class="widgets postbox">
				<div class="uagb-intro-section">
					<div class="uagb-intro-col">
						<h2>
							<span class="uagb-intro-icon dashicons dashicons-smiley"></span>
							<span><?php esc_html_e( 'Ever-growing Library of Gutenberg Blocks', 'ultimate-addons-for-gutenberg' ); ?></span>
						</h2>
						<p><?php esc_html_e( 'The easy-to-use and extremely powerful blocks of the Ultimate Addons for Gutenberg (UAG) are now available within your Gutenberg Editor. Search for "UAG" in the block inserter and see all the Ultimate Addons for Gutenberg blocks listed below. Simply click on the block you wish to add on your page or post.', 'ultimate-addons-for-gutenberg' ); ?></p>
						<p><?php esc_html_e( 'Wish to see some real design implementations with these blocks?', 'ultimate-addons-for-gutenberg' ); ?></p>
						<a href="https://www.ultimategutenberg.com/?utm_source=uag-dashboard&utm_medium=link&utm_campaign=uag-dashboard" target="_blank" rel="noopener"><?php esc_attr_e( 'See Demos »', 'ultimate-addons-for-gutenberg' ); ?></a>
						<p><?php esc_html_e( 'Check out the detailed knowledge base articles that will help you understand the working of each block.', 'ultimate-addons-for-gutenberg' ); ?></p>
						<a href="<?php echo esc_url( $kb_url ); ?>" target="_blank" rel="noopener"><?php esc_attr_e( 'Visit Knowledge Base »', 'ultimate-addons-for-gutenberg' ); ?></a>
					</div>
				</div>
			</div>
			<div class="widgets postbox">
				<h2 class="hndle uagb-flex uagb-widgets-heading"><span><?php esc_html_e( 'Blocks', 'ultimate-addons-for-gutenberg' ); ?></span>
					<div class="uagb-bulk-actions-wrap">
						<a class="bulk-action uagb-activate-all button"> <?php esc_html_e( 'Activate All', 'ultimate-addons-for-gutenberg' ); ?> </a>
						<a class="bulk-action uagb-deactivate-all button"> <?php esc_html_e( 'Deactivate All', 'ultimate-addons-for-gutenberg' ); ?> </a>
						<a class="uagb-reusable-block-link button button-primary" href="<?php echo esc_url( admin_url( 'edit.php?post_type=wp_block' ) ); ?>" rel="noopener"> <?php esc_html_e( 'Reusable Blocks', 'ultimate-addons-for-gutenberg' ); ?> <span class="dashicons-controls-repeat dashicons"></span></a>
					</div>
				</h2>
				<div class="uagb-list-section">
					<?php
					if ( is_array( $blocks ) && ! empty( $blocks ) ) :
						?>
						<ul class="uagb-widget-list">
							<?php
							foreach ( $blocks as $addon => $info ) {

								$addon = str_replace( 'uagb/', '', $addon );

								$child_blocks = array(
									'column',
									'icon-list-child',
									'social-share-child',
									'buttons-child',
									'faq-child',
									'post-title',
									'post-image',
									'post-button',
									'post-excerpt',
									'post-meta',
									'restaurant-menu-child',
									'content-timeline-child',
								);

								if ( array_key_exists( 'extension', $info ) && $info['extension'] ) {
									continue;
								}

								if ( in_array( $addon, $child_blocks, true ) ) {
									continue;
								}

								$title_url     = ( isset( $info['title_url'] ) && ! empty( $info['title_url'] ) ) ? 'href="' . esc_url( $info['title_url'] ) . '"' : '';
								$anchor_target = ( isset( $info['title_url'] ) && ! empty( $info['title_url'] ) ) ? "target='_blank' rel='noopener'" : '';

								$class = 'deactivate';

								$uagb_link = array(
									'link_class' => 'uagb-activate-widget',
									'link_text'  => __( 'Activate', 'ultimate-addons-for-gutenberg' ),
								);

								if ( $info['is_activate'] ) {
									$class     = 'activate';
									$uagb_link = array(
										'link_class' => 'uagb-deactivate-widget',
										'link_text'  => __( 'Deactivate', 'ultimate-addons-for-gutenberg' ),
									);
								}

								echo '<li id="' . esc_attr( $addon ) . '"  class="' . esc_attr( $class ) . '"><a class="uagb-widget-title"' . esc_url( $title_url ) . esc_url( $anchor_target ) . ' >' . esc_html( $info['title'] ) . '</a><div class="uagb-widget-link-wrapper">';

								printf(
									'<a href="%1$s" class="%2$s"> %3$s </a>',
									( isset( $uagb_link['link_url'] ) && ! empty( $uagb_link['link_url'] ) ) ? esc_url( $uagb_link['link_url'] ) : '#',
									esc_attr( $uagb_link['link_class'] ),
									esc_html( $uagb_link['link_text'] )
								);

								if ( $info['is_activate'] && isset( $info['setting_url'] ) ) {

									printf(
										'<a href="%1$s" class="%2$s"> %3$s </a>',
										esc_url( $info['setting_url'] ),
										esc_attr( 'uagb-advanced-settings' ),
										esc_html( $info['setting_text'] )
									);
								}

								echo '</div></li>';
							}
							?>
						</ul>
					<?php endif; ?>
				</div>
			</div>
		</div>
		<div class="postbox-container uagb-sidebar" id="postbox-container-1">
			<div id="side-sortables">
				<?php if ( ! defined( 'ASTRA_THEME_VERSION' ) ) { ?>
				<div class="postbox uagb-astra-sidebar">
					<h2 class="hndle uagb-normal-cusror">
						<span class="dashicons dashicons-admin-customizer"></span>
						<span><?php esc_html_e( 'Free Theme for Gutenberg', 'ultimate-addons-for-gutenberg' ); ?></span>
					</h2>
					<img class="uagb-ast-img" src="<?php echo esc_url( UAGB_URL . 'admin/assets/images/welcome-screen-astra.jpg' ); ?>">
					<div class="inside">
						<p><?php esc_html_e( 'Join over 1+ million active users empowering their websites with Astra! From beginners to industry leaders, everyone loves the Astra theme.', 'ultimate-addons-for-gutenberg' ); ?></p>
						<h4><?php esc_html_e( 'Why Astra Theme?', 'ultimate-addons-for-gutenberg' ); ?></h4>
						<p><strong><?php esc_html_e( 'Faster Performance - ', 'ultimate-addons-for-gutenberg' ); ?></strong><?php esc_html_e( 'Built with speed and performance in mind, Astra follows the best coding standards and lets you build faster loading and better performing websites.', 'ultimate-addons-for-gutenberg' ); ?></p>
						<p><strong><?php esc_html_e( 'Easy Customization - ', 'ultimate-addons-for-gutenberg' ); ?></strong><?php esc_html_e( 'With all the settings managed through the customizer, Astra keeps it simple and gives you lots of options to customize everything with a few clicks.', 'ultimate-addons-for-gutenberg' ); ?></p>
						<p><strong><?php esc_html_e( 'Pixel Perfect Design - ', 'ultimate-addons-for-gutenberg' ); ?></strong><?php esc_html_e( 'Astra reduces your design time by giving you pixel-perfect FREE ready-to-use websites demos within a huge library of starter sites.', 'ultimate-addons-for-gutenberg' ); ?></p>
						<?php
						$theme = wp_get_theme();
						if ( ! file_exists( get_theme_root() . '/astra/functions.php' ) ) {
							?>
						<a class="button button-primary ast-sites-inactive uag-install-theme" href="#" data-slug="astra"><?php esc_html_e( 'Install Astra Now!', 'ultimate-addons-for-gutenberg' ); ?></a>
						<?php } elseif ( 'Astra' !== $theme->name || 'Astra' !== $theme->parent_theme && file_exists( get_theme_root() . '/astra/functions.php' ) ) { ?>
							<a class="button button-primary ast-sites-inactive uag-activate-theme" href="#" data-slug="astra" data-init="astra/astra.php"><?php esc_html_e( 'Activate Astra Now!', 'ultimate-addons-for-gutenberg' ); ?></a>
						<?php } ?>
						<div>
						</div>
					</div>
				</div>
				<?php } ?>
				<div class="postbox">
					<h2 class="hndle ast-normal-cusror">
						<span class="dashicons dashicons-admin-page"></span>
						<span>
							<?php printf( esc_html__( 'CSS File Generation', 'ultimate-addons-for-gutenberg' ) ); ?>
						</span>
					</h2>
					<div class="inside">
						<p class="warning">
						</p>
							<?php esc_html_e( 'Enabling this option will generate CSS files for Ultimate Addons for Gutenberg block styling instead of loading the CSS inline on page.', 'ultimate-addons-for-gutenberg' ); ?>
						<p>
						<?php
						$file_generation_doc_link = esc_url( 'https://www.ultimategutenberg.com/clean-html-with-uag/?utm_source=uag-dashboard&utm_medium=link&utm_campaign=uag-dashboard' );
						$a_tag_open               = '<a target="_blank" rel="noopener" href="' . $file_generation_doc_link . '">';
						$a_tag_close              = '</a>';

						printf(
							/* translators: %1$s: a tag open. */
							esc_html__( 'Please read %1$s this article %2$s to know more.', 'ultimate-addons-for-gutenberg' ),
							wp_kses_post( $a_tag_open ),
							wp_kses_post( $a_tag_close )
						);
						?>
						</p>
						<label for="uag_file_generation">
							<?php
							$button_disabled = '';
							if ( 'disabled' === $allow_file_generation && true === $has_read_write_perms ) {
								$val                    = 'enabled';
								$file_generation_string = __( 'Enable File Generation', 'ultimate-addons-for-gutenberg' );
							} elseif ( 'disabled' === $allow_file_generation && false === $has_read_write_perms ) {

								$val                    = 'disabled';
								$file_generation_string = __( 'Inadequate File Permission', 'ultimate-addons-for-gutenberg' );
								$button_disabled        = 'disabled';

							} else {
								$val                    = 'disabled';
								$file_generation_string = __( 'Disable File Generation', 'ultimate-addons-for-gutenberg' );
							}
							?>
							<button class="button astra-beta-updates uag-file-generation" id="uag_file_generation" data-value="<?php echo esc_attr( $val ); ?>" <?php echo esc_attr( $button_disabled ); ?> >
								<?php echo esc_html( $file_generation_string ); ?>
							</button>
						</label>
					</div>
				</div>
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
	<!-- /post-body -->
	<br class="clear">
</div>
</div>

