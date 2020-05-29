<?php
/**
 * Server-side rendering for the post block.
 *
 * @since   0.0.1
 * @package UAGB
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

global $uagb_post_settings;

/**
 * Sends the Post pagination markup to edit.js
 *
 * @since 1.14.9
 */
function uagb_post_pagination() {

	check_ajax_referer( 'uagb_ajax_nonce', 'nonce' );

	if ( isset( $_POST['attributes'] ) ) {

		$query = UAGB_Helper::get_query( $_POST['attributes'], 'grid' );

		$pagination_markup = uagb_render_pagination( $query, $_POST['attributes'] );

		wp_send_json_success( $pagination_markup );
	}

	wp_send_json_error( ' No attributes recieved' );

}
add_action( 'wp_ajax_uagb_post_pagination', 'uagb_post_pagination' );

/**
 * Renders the post carousel block on server.
 *
 * @param array $attributes Array of block attributes.
 *
 * @since 0.0.1
 */
function uagb_post_carousel_callback( $attributes ) {
	$query = UAGB_Helper::get_query( $attributes, 'carousel' );
	global $uagb_post_settings;

	$uagb_post_settings['carousel'][ $attributes['block_id'] ] = $attributes;

	ob_start();

	uagb_get_post_html( $attributes, $query, 'carousel' );
	// Output the post markup.
	return ob_get_clean();
}

/**
 * Renders the post grid block on server.
 *
 * @param array $attributes Array of block attributes.
 *
 * @since 0.0.1
 */
function uagb_post_grid_callback( $attributes ) {
	$query = UAGB_Helper::get_query( $attributes, 'grid' );
	global $uagb_post_settings;
	$uagb_post_settings['grid'][ $attributes['block_id'] ] = $attributes;

	ob_start();

	uagb_get_post_html( $attributes, $query, 'grid' );
	// Output the post markup.
	return ob_get_clean();
}

/**
 * Renders the post masonry block on server.
 *
 * @param array $attributes Array of block attributes.
 *
 * @since 0.0.1
 */
function uagb_post_masonry_callback( $attributes ) {
	$query = UAGB_Helper::get_query( $attributes, 'masonry' );
	global $uagb_post_settings;

	$uagb_post_settings['masonry'][ $attributes['block_id'] ] = $attributes;

	ob_start();
	uagb_get_post_html( $attributes, $query, 'masonry' );

	// Output the post markup.
	return ob_get_clean();
}

add_action( 'wp_footer', 'uagb_post_block_add_script', 1000 );

/**
 * Renders the post masonry related script.
 *
 * @since 0.0.1
 */
function uagb_post_block_add_script() {
	global $uagb_post_settings;
	if ( isset( $uagb_post_settings['masonry'] ) && ! empty( $uagb_post_settings['masonry'] ) ) {
		foreach ( $uagb_post_settings['masonry'] as $key => $value ) {
			?>
			<script type="text/javascript" id="uagb-post-masonry-script-<?php echo esc_html( $key ); ?>">
				document.addEventListener("DOMContentLoaded", function(){
					( function( $ ) {

						var $scope = $( '.uagb-block-<?php echo esc_html( $key ); ?>' );
						$scope.imagesLoaded( function() {
							$scope.find( '.is-masonry' ).isotope();
						});

						$( window ).resize( function() {
							$scope.find( '.is-masonry' ).isotope();
						} );
					} )( jQuery );
				});
			</script>
			<?php
		}
	}

	if ( isset( $uagb_post_settings['carousel'] ) && ! empty( $uagb_post_settings['carousel'] ) ) {
		foreach ( $uagb_post_settings['carousel'] as $key => $value ) {

			$dots         = ( 'dots' === $value['arrowDots'] || 'arrows_dots' === $value['arrowDots'] ) ? true : false;
			$arrows       = ( 'arrows' === $value['arrowDots'] || 'arrows_dots' === $value['arrowDots'] ) ? true : false;
			$equal_height = isset( $value['equalHeight'] ) ? $value['equalHeight'] : '';
			$tcolumns     = ( isset( $value['tcolumns'] ) ) ? $value['tcolumns'] : 2;
			$mcolumns     = ( isset( $value['mcolumns'] ) ) ? $value['mcolumns'] : 1;

			?>
			<script type="text/javascript" id="<?php echo esc_html( $key ); ?>">
				document.addEventListener("DOMContentLoaded", function(){
					( function( $ ) {
						var cols = parseInt( '<?php echo esc_html( $value['columns'] ); ?>' );
						var $scope = $( '.uagb-block-<?php echo esc_html( $key ); ?>' ).find( '.is-carousel' );

						if ( cols >= $scope.children().length ) {
							return;
						}

						var slider_options = {
							'slidesToShow' : cols,
							'slidesToScroll' : 1,
							'autoplaySpeed' : <?php echo esc_html( $value['autoplaySpeed'] ); ?>,
							'autoplay' : Boolean( '<?php echo esc_html( $value['autoplay'] ); ?>' ),
							'infinite' : Boolean( '<?php echo esc_html( $value['infiniteLoop'] ); ?>' ),
							'pauseOnHover' : Boolean( '<?php echo esc_html( $value['pauseOnHover'] ); ?>' ),
							'speed' : <?php echo esc_html( $value['transitionSpeed'] ); ?>,
							'arrows' : Boolean( '<?php echo esc_html( $arrows ); ?>' ),
							'dots' : Boolean( '<?php echo esc_html( $dots ); ?>' ),
							'rtl' : false,
							'prevArrow' : '<button type=\"button\" data-role=\"none\" class=\"slick-prev\" aria-label=\"Previous\" tabindex=\"0\" role=\"button\"><svg width=\"20\" height=\"20\" viewBox=\"0 0 256 512\"><path d=\"M31.7 239l136-136c9.4-9.4 24.6-9.4 33.9 0l22.6 22.6c9.4 9.4 9.4 24.6 0 33.9L127.9 256l96.4 96.4c9.4 9.4 9.4 24.6 0 33.9L201.7 409c-9.4 9.4-24.6 9.4-33.9 0l-136-136c-9.5-9.4-9.5-24.6-.1-34z\"></path></svg><\/button>',
							'nextArrow' : '<button type=\"button\" data-role=\"none\" class=\"slick-next\" aria-label=\"Next\" tabindex=\"0\" role=\"button\"><svg width=\"20\" height=\"20\" viewBox=\"0 0 256 512\"><path d=\"M224.3 273l-136 136c-9.4 9.4-24.6 9.4-33.9 0l-22.6-22.6c-9.4-9.4-9.4-24.6 0-33.9l96.4-96.4-96.4-96.4c-9.4-9.4-9.4-24.6 0-33.9L54.3 103c9.4-9.4 24.6-9.4 33.9 0l136 136c9.5 9.4 9.5 24.6.1 34z\"></path></svg><\/button>',
							'responsive' : [
								{
									'breakpoint' : 1024,
									'settings' : {
										'slidesToShow' : <?php echo esc_html( $tcolumns ); ?>,
										'slidesToScroll' : 1,
									}
								},
								{
									'breakpoint' : 767,
									'settings' : {
										'slidesToShow' : <?php echo esc_html( $mcolumns ); ?>,
										'slidesToScroll' : 1,
									}
								}
							]
						};

						$scope.imagesLoaded( function() {
							$scope.slick( slider_options );
						});

						var enableEqualHeight = ( '<?php echo esc_html( $equal_height ); ?>' )

						if( enableEqualHeight ){
							$scope.imagesLoaded( function() {
								UAGBPostCarousel._setHeight( $scope );
							});

							$scope.on( 'afterChange', function() {
								UAGBPostCarousel._setHeight( $scope );
							} );
						}

					} )( jQuery );
				});
			</script>
			<?php
		}
	}
}

/**
 * Renders the post grid block on server.
 *
 * @param array  $attributes Array of block attributes.
 *
 * @param object $query WP_Query object.
 * @param string $layout post grid/masonry/carousel layout.
 * @since 0.0.1
 */
function uagb_get_post_html( $attributes, $query, $layout ) {
	$attributes['post_type'] = $layout;

	$wrap = array(
		'uagb-post__items uagb-post__columns-' . $attributes['columns'],
		'is-' . $layout,
		'uagb-post__columns-tablet-' . $attributes['tcolumns'],
		'uagb-post__columns-mobile-' . $attributes['mcolumns'],
	);

	$block_id  = 'uagb-block-' . $attributes['block_id'];
	$outerwrap = array(
		'uagb-post-grid',
		( isset( $attributes['className'] ) ) ? $attributes['className'] : '',
		'uagb-post__image-position-' . $attributes['imgPosition'],
		$block_id,
	);

	switch ( $layout ) {
		case 'masonry':
			break;

		case 'grid':
			if ( $attributes['equalHeight'] ) {
				array_push( $wrap, 'uagb-post__equal-height' );
			}
			break;

		case 'carousel':
			array_push( $outerwrap, 'uagb-post__arrow-outside' );

			if ( $attributes['equalHeight'] ) {
				array_push( $wrap, 'uagb-post__carousel_equal-height' );
			}

			if ( $query->post_count > $attributes['columns'] ) {
				array_push( $outerwrap, 'uagb-slick-carousel' );
			}
			break;

		default:
			// Nothing to do here.
			break;
	}
	?>
	<div class="<?php echo esc_html( implode( ' ', $outerwrap ) ); ?>">

		<div class="<?php echo esc_html( implode( ' ', $wrap ) ); ?>">

		<?php

		while ( $query->have_posts() ) {
			$query->the_post();
			// Filter to modify the attributes based on content requirement.
			$attributes = apply_filters( 'uagb_post_alter_attributes', $attributes, get_the_ID() );
			include 'single.php';
		}

		wp_reset_postdata();
		?>
		</div>
		<?php
		if ( isset( $attributes['postPagination'] ) && true === $attributes['postPagination'] ) {

			echo '<div class="uagb-post-pagination-wrap">';
			echo uagb_render_pagination( $query, $attributes );//phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
			echo '</div>';
		}
		?>
	</div>
	<?php
}

/**
 * Renders the post post pagination on server.
 *
 * @param object $query WP_Query object.
 * @param array  $attributes Array of block attributes.
 * @since x.x.x
 */
function uagb_render_pagination( $query, $attributes ) {

	$permalink_structure = get_option( 'permalink_structure' );
	$base                = untrailingslashit( wp_specialchars_decode( get_pagenum_link() ) );
	$base                = UAGB_Helper::build_base_url( $permalink_structure, $base );
	$format              = UAGB_Helper::paged_format( $permalink_structure, $base );
	$paged               = UAGB_Helper::get_paged( $query );
	$page_limit          = isset( $attributes['pageLimit'] ) ? $attributes['pageLimit'] : $attributes['postsToShow'];
	$links               = paginate_links(
		array(
			'base'      => $base . '%_%',
			'format'    => $format,
			'current'   => ( ! $paged ) ? 1 : $paged,
			'total'     => $page_limit,
			'type'      => 'array',
			'mid_size'  => 4,
			'end_size'  => 4,
			'prev_text' => $attributes['paginationPrevText'],
			'next_text' => $attributes['paginationNextText'],
		)
	);

	if ( isset( $links ) ) {

		return wp_kses_post( implode( PHP_EOL, $links ) );
	}

	return '';
}
/**
 * Registers the `core/latest-posts` block on server.
 *
 * @since 0.0.1
 */
function uagb_register_blocks() {
	// Check if the register function exists.
	if ( ! function_exists( 'register_block_type' ) ) {
		return;
	}

	register_block_type(
		'uagb/post-grid',
		array(
			'attributes'      => array(
				'block_id'                    => array(
					'type'    => 'string',
					'default' => 'not_set',
				),
				'categories'                  => array(
					'type' => 'string',
				),
				'postType'                    => array(
					'type'    => 'string',
					'default' => 'post',
				),
				'taxonomyType'                => array(
					'type'    => 'string',
					'default' => 'category',
				),
				'postsToShow'                 => array(
					'type'    => 'number',
					'default' => 6,
				),
				'displayPostDate'             => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'displayPostExcerpt'          => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'excerptLength'               => array(
					'type'    => 'number',
					'default' => 25,
				),
				'displayPostAuthor'           => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'displayPostTitle'            => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'displayPostComment'          => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'displayPostTaxonomy'         => array(
					'type'    => 'boolean',
					'default' => false,
				),
				'displayPostImage'            => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'imgSize'                     => array(
					'type'    => 'string',
					'default' => 'large',
				),
				'imgPosition'                 => array(
					'type'    => 'string',
					'default' => 'top',
				),
				'linkBox'                     => array(
					'type' => 'boolean',
				),
				'bgOverlayColor'              => array(
					'type'    => 'string',
					'default' => '#ffffff',
				),
				'overlayOpacity'              => array(
					'type'    => 'number',
					'default' => '50',
				),
				'displayPostLink'             => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'newTab'                      => array(
					'type'    => 'boolean',
					'default' => false,
				),
				'ctaText'                     => array(
					'type'    => 'string',
					'default' => __( 'Read More', 'ultimate-addons-for-gutenberg' ),
				),
				'borderWidth'                 => array(
					'type'    => 'number',
					'default' => 1,
				),
				'btnHPadding'                 => array(
					'type'    => 'number',
					'default' => 10,
				),
				'btnVPadding'                 => array(
					'type'    => 'number',
					'default' => 5,
				),
				'borderStyle'                 => array(
					'type'    => 'string',
					'default' => 'none',
				),
				'borderColor'                 => array(
					'type'    => 'string',
					'default' => '#3b3b3b',
				),
				'borderHColor'                => array(
					'type' => 'string',
				),
				'borderRadius'                => array(
					'type'    => 'number',
					'default' => 0,
				),
				'columns'                     => array(
					'type'    => 'number',
					'default' => 3,
				),
				'tcolumns'                    => array(
					'type'    => 'number',
					'default' => 2,
				),
				'mcolumns'                    => array(
					'type'    => 'number',
					'default' => 1,
				),
				'align'                       => array(
					'type'    => 'string',
					'default' => 'left',
				),
				'width'                       => array(
					'type'    => 'string',
					'default' => 'wide',
				),
				'order'                       => array(
					'type'    => 'string',
					'default' => 'desc',
				),
				'orderBy'                     => array(
					'type'    => 'string',
					'default' => 'date',
				),
				'rowGap'                      => array(
					'type'    => 'number',
					'default' => 20,
				),
				'columnGap'                   => array(
					'type'    => 'number',
					'default' => 20,
				),
				'bgColor'                     => array(
					'type'    => 'string',
					'default' => '#e4e4e4',
				),
				'titleColor'                  => array(
					'type'    => 'string',
					'default' => '#3b3b3b',
				),
				'titleTag'                    => array(
					'type'    => 'string',
					'default' => 'h3',
				),
				'titleFontSize'               => array(
					'type'    => 'number',
					'default' => '',
				),
				'titleFontSizeType'           => array(
					'type'    => 'string',
					'default' => 'px',
				),
				'titleFontSizeMobile'         => array(
					'type' => 'number',
				),
				'titleFontSizeTablet'         => array(
					'type' => 'number',
				),
				'titleFontFamily'             => array(
					'type'    => 'string',
					'default' => '',
				),
				'titleFontWeight'             => array(
					'type' => 'string',
				),
				'titleFontSubset'             => array(
					'type' => 'string',
				),
				'titleLineHeightType'         => array(
					'type'    => 'string',
					'default' => 'em',
				),
				'titleLineHeight'             => array(
					'type' => 'number',
				),
				'titleLineHeightTablet'       => array(
					'type' => 'number',
				),
				'titleLineHeightMobile'       => array(
					'type' => 'number',
				),
				'titleLoadGoogleFonts'        => array(
					'type'    => 'boolean',
					'default' => false,
				),

				'metaFontSize'                => array(
					'type'    => 'number',
					'default' => '',
				),
				'metaFontSizeType'            => array(
					'type'    => 'string',
					'default' => 'px',
				),
				'metaFontSizeMobile'          => array(
					'type' => 'number',
				),
				'metaFontSizeTablet'          => array(
					'type' => 'number',
				),
				'metaFontFamily'              => array(
					'type'    => 'string',
					'default' => '',
				),
				'metaFontWeight'              => array(
					'type' => 'string',
				),
				'metaFontSubset'              => array(
					'type' => 'string',
				),
				'metaLineHeightType'          => array(
					'type'    => 'string',
					'default' => 'em',
				),
				'metaLineHeight'              => array(
					'type' => 'number',
				),
				'metaLineHeightTablet'        => array(
					'type' => 'number',
				),
				'metaLineHeightMobile'        => array(
					'type' => 'number',
				),
				'metaLoadGoogleFonts'         => array(
					'type'    => 'boolean',
					'default' => false,
				),

				'excerptFontSize'             => array(
					'type'    => 'number',
					'default' => '',
				),
				'excerptFontSizeType'         => array(
					'type'    => 'string',
					'default' => 'px',
				),
				'excerptFontSizeMobile'       => array(
					'type' => 'number',
				),
				'excerptFontSizeTablet'       => array(
					'type' => 'number',
				),
				'excerptFontFamily'           => array(
					'type'    => 'string',
					'default' => '',
				),
				'excerptFontWeight'           => array(
					'type' => 'string',
				),
				'excerptFontSubset'           => array(
					'type' => 'string',
				),
				'excerptLineHeightType'       => array(
					'type'    => 'string',
					'default' => 'em',
				),
				'excerptLineHeight'           => array(
					'type' => 'number',
				),
				'excerptLineHeightTablet'     => array(
					'type' => 'number',
				),
				'excerptLineHeightMobile'     => array(
					'type' => 'number',
				),
				'excerptLoadGoogleFonts'      => array(
					'type'    => 'boolean',
					'default' => false,
				),

				'ctaFontSize'                 => array(
					'type'    => 'number',
					'default' => '',
				),
				'ctaFontSizeType'             => array(
					'type'    => 'string',
					'default' => 'px',
				),
				'ctaFontSizeMobile'           => array(
					'type' => 'number',
				),
				'ctaFontSizeTablet'           => array(
					'type' => 'number',
				),
				'ctaFontFamily'               => array(
					'type'    => 'string',
					'default' => '',
				),
				'ctaFontWeight'               => array(
					'type' => 'string',
				),
				'ctaFontSubset'               => array(
					'type' => 'string',
				),
				'ctaLineHeightType'           => array(
					'type'    => 'string',
					'default' => 'em',
				),
				'ctaLineHeight'               => array(
					'type' => 'number',
				),
				'ctaLineHeightTablet'         => array(
					'type' => 'number',
				),
				'ctaLineHeightMobile'         => array(
					'type' => 'number',
				),
				'ctaLoadGoogleFonts'          => array(
					'type'    => 'boolean',
					'default' => false,
				),
				'metaColor'                   => array(
					'type'    => 'string',
					'default' => '#777777',
				),
				'excerptColor'                => array(
					'type'    => 'string',
					'default' => '',
				),
				'ctaColor'                    => array(
					'type'    => 'string',
					'default' => '#ffffff',
				),
				'ctaBgColor'                  => array(
					'type'    => 'string',
					'default' => '#333333',
				),
				'ctaHColor'                   => array(
					'type' => 'string',
				),
				'ctaBgHColor'                 => array(
					'type' => 'string',
				),
				'contentPadding'              => array(
					'type'    => 'number',
					'default' => 20,
				),
				'contentPaddingMobile'        => array(
					'type' => 'number',
				),
				'titleBottomSpace'            => array(
					'type'    => 'number',
					'default' => 15,
				),
				'metaBottomSpace'             => array(
					'type'    => 'number',
					'default' => 15,
				),
				'excerptBottomSpace'          => array(
					'type'    => 'number',
					'default' => 25,
				),
				'equalHeight'                 => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'postPagination'              => array(
					'type'    => 'boolean',
					'default' => false,
				),
				'pageLimit'                   => array(
					'type'    => 'number',
					'default' => 10,
				),
				'paginationBgActiveColor'     => array(
					'type'    => 'string',
					'default' => '#e4e4e4',
				),
				'paginationActiveColor'       => array(
					'type'    => 'string',
					'default' => '#333333',
				),
				'paginationBgColor'           => array(
					'type'    => 'string',
					'default' => '#e4e4e4',
				),
				'paginationColor'             => array(
					'type'    => 'string',
					'default' => '#777777',
				),
				'paginationMarkup'            => array(
					'type'    => 'string',
					'default' => '',
				),
				'paginationLayout'            => array(
					'type'    => 'string',
					'default' => 'filled',
				),
				'paginationBorderActiveColor' => array(
					'type' => 'string',
				),
				'paginationBorderColor'       => array(
					'type'    => 'string',
					'default' => '#888686',
				),
				'paginationBorderRadius'      => array(
					'type' => 'number',
				),
				'paginationBorderSize'        => array(
					'type'    => 'number',
					'default' => 1,
				),
				'paginationSpacing'           => array(
					'type'    => 'number',
					'default' => 20,
				),
				'paginationAlignment'         => array(
					'type'    => 'string',
					'default' => 'left',
				),
				'paginationPrevText'          => array(
					'type'    => 'string',
					'default' => '« Previous',
				),
				'paginationNextText'          => array(
					'type'    => 'string',
					'default' => 'Next »',
				),
			),
			'render_callback' => 'uagb_post_grid_callback',
		)
	);

	register_block_type(
		'uagb/post-carousel',
		array(
			'attributes'      => array(
				'block_id'                => array(
					'type'    => 'string',
					'default' => 'not_set',
				),
				'categories'              => array(
					'type' => 'string',
				),
				'postType'                => array(
					'type'    => 'string',
					'default' => 'post',
				),
				'taxonomyType'            => array(
					'type'    => 'string',
					'default' => 'category',
				),
				'postsToShow'             => array(
					'type'    => 'number',
					'default' => 6,
				),
				'displayPostDate'         => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'displayPostExcerpt'      => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'excerptLength'           => array(
					'type'    => 'number',
					'default' => 25,
				),
				'displayPostAuthor'       => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'displayPostTitle'        => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'displayPostComment'      => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'displayPostTaxonomy'     => array(
					'type'    => 'boolean',
					'default' => false,
				),
				'displayPostImage'        => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'imgSize'                 => array(
					'type'    => 'string',
					'default' => 'large',
				),
				'imgPosition'             => array(
					'type'    => 'string',
					'default' => 'top',
				),
				'linkBox'                 => array(
					'type' => 'boolean',
				),
				'bgOverlayColor'          => array(
					'type'    => 'string',
					'default' => '#ffffff',
				),
				'overlayOpacity'          => array(
					'type'    => 'number',
					'default' => '50',
				),
				'displayPostLink'         => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'newTab'                  => array(
					'type'    => 'boolean',
					'default' => false,
				),
				'ctaText'                 => array(
					'type'    => 'string',
					'default' => __( 'Read More', 'ultimate-addons-for-gutenberg' ),
				),
				'borderWidth'             => array(
					'type'    => 'number',
					'default' => 1,
				),
				'btnHPadding'             => array(
					'type'    => 'number',
					'default' => 10,
				),
				'btnVPadding'             => array(
					'type'    => 'number',
					'default' => 5,
				),
				'borderStyle'             => array(
					'type'    => 'string',
					'default' => 'none',
				),
				'borderColor'             => array(
					'type'    => 'string',
					'default' => '#3b3b3b',
				),
				'borderHColor'            => array(
					'type' => 'string',
				),
				'borderRadius'            => array(
					'type'    => 'number',
					'default' => 0,
				),
				'columns'                 => array(
					'type'    => 'number',
					'default' => 3,
				),
				'tcolumns'                => array(
					'type'    => 'number',
					'default' => 2,
				),
				'mcolumns'                => array(
					'type'    => 'number',
					'default' => 1,
				),
				'align'                   => array(
					'type'    => 'string',
					'default' => 'left',
				),
				'width'                   => array(
					'type'    => 'string',
					'default' => 'wide',
				),
				'order'                   => array(
					'type'    => 'string',
					'default' => 'desc',
				),
				'orderBy'                 => array(
					'type'    => 'string',
					'default' => 'date',
				),
				'rowGap'                  => array(
					'type'    => 'number',
					'default' => 20,
				),
				'columnGap'               => array(
					'type'    => 'number',
					'default' => 20,
				),
				'bgColor'                 => array(
					'type'    => 'string',
					'default' => '#e4e4e4',
				),
				'titleColor'              => array(
					'type'    => 'string',
					'default' => '#3b3b3b',
				),
				'titleTag'                => array(
					'type'    => 'string',
					'default' => 'h3',
				),
				'titleFontSize'           => array(
					'type'    => 'number',
					'default' => '',
				),
				'titleFontSizeType'       => array(
					'type'    => 'string',
					'default' => 'px',
				),
				'titleFontSizeMobile'     => array(
					'type' => 'number',
				),
				'titleFontSizeTablet'     => array(
					'type' => 'number',
				),
				'titleFontFamily'         => array(
					'type'    => 'string',
					'default' => '',
				),
				'titleFontWeight'         => array(
					'type' => 'string',
				),
				'titleFontSubset'         => array(
					'type' => 'string',
				),
				'titleLineHeightType'     => array(
					'type'    => 'string',
					'default' => 'em',
				),
				'titleLineHeight'         => array(
					'type' => 'number',
				),
				'titleLineHeightTablet'   => array(
					'type' => 'number',
				),
				'titleLineHeightMobile'   => array(
					'type' => 'number',
				),
				'titleLoadGoogleFonts'    => array(
					'type'    => 'boolean',
					'default' => false,
				),
				'metaFontSize'            => array(
					'type'    => 'number',
					'default' => '',
				),
				'metaFontSizeType'        => array(
					'type'    => 'string',
					'default' => 'px',
				),
				'metaFontSizeMobile'      => array(
					'type' => 'number',
				),
				'metaFontSizeTablet'      => array(
					'type' => 'number',
				),
				'metaFontFamily'          => array(
					'type'    => 'string',
					'default' => '',
				),
				'metaFontWeight'          => array(
					'type' => 'string',
				),
				'metaFontSubset'          => array(
					'type' => 'string',
				),
				'metaLineHeightType'      => array(
					'type'    => 'string',
					'default' => 'em',
				),
				'metaLineHeight'          => array(
					'type' => 'number',
				),
				'metaLineHeightTablet'    => array(
					'type' => 'number',
				),
				'metaLineHeightMobile'    => array(
					'type' => 'number',
				),
				'metaLoadGoogleFonts'     => array(
					'type'    => 'boolean',
					'default' => false,
				),
				'excerptFontSize'         => array(
					'type'    => 'number',
					'default' => '',
				),
				'excerptFontSizeType'     => array(
					'type'    => 'string',
					'default' => 'px',
				),
				'excerptFontSizeMobile'   => array(
					'type' => 'number',
				),
				'excerptFontSizeTablet'   => array(
					'type' => 'number',
				),
				'excerptFontFamily'       => array(
					'type'    => 'string',
					'default' => '',
				),
				'excerptFontWeight'       => array(
					'type' => 'string',
				),
				'excerptFontSubset'       => array(
					'type' => 'string',
				),
				'excerptLineHeightType'   => array(
					'type'    => 'string',
					'default' => 'em',
				),
				'excerptLineHeight'       => array(
					'type' => 'number',
				),
				'excerptLineHeightTablet' => array(
					'type' => 'number',
				),
				'excerptLineHeightMobile' => array(
					'type' => 'number',
				),
				'excerptLoadGoogleFonts'  => array(
					'type'    => 'boolean',
					'default' => false,
				),
				'ctaFontSize'             => array(
					'type'    => 'number',
					'default' => '',
				),
				'ctaFontSizeType'         => array(
					'type'    => 'string',
					'default' => 'px',
				),
				'ctaFontSizeMobile'       => array(
					'type' => 'number',
				),
				'ctaFontSizeTablet'       => array(
					'type' => 'number',
				),
				'ctaFontFamily'           => array(
					'type'    => 'string',
					'default' => '',
				),
				'ctaFontWeight'           => array(
					'type' => 'string',
				),
				'ctaFontSubset'           => array(
					'type' => 'string',
				),
				'ctaLineHeightType'       => array(
					'type'    => 'string',
					'default' => 'em',
				),
				'ctaLineHeight'           => array(
					'type' => 'number',
				),
				'ctaLineHeightTablet'     => array(
					'type' => 'number',
				),
				'ctaLineHeightMobile'     => array(
					'type' => 'number',
				),
				'ctaLoadGoogleFonts'      => array(
					'type'    => 'boolean',
					'default' => false,
				),
				'metaColor'               => array(
					'type'    => 'string',
					'default' => '#777777',
				),
				'excerptColor'            => array(
					'type'    => 'string',
					'default' => '',
				),
				'ctaColor'                => array(
					'type'    => 'string',
					'default' => '#ffffff',
				),
				'ctaBgColor'              => array(
					'type'    => 'string',
					'default' => '#333333',
				),
				'ctaHColor'               => array(
					'type' => 'string',
				),
				'ctaBgHColor'             => array(
					'type' => 'string',
				),
				'contentPadding'          => array(
					'type'    => 'number',
					'default' => 20,
				),
				'contentPaddingMobile'    => array(
					'type' => 'number',
				),
				'titleBottomSpace'        => array(
					'type'    => 'number',
					'default' => 15,
				),
				'metaBottomSpace'         => array(
					'type'    => 'number',
					'default' => 15,
				),
				'excerptBottomSpace'      => array(
					'type'    => 'number',
					'default' => 25,
				),
				'pauseOnHover'            => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'infiniteLoop'            => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'transitionSpeed'         => array(
					'type'    => 'number',
					'default' => 500,
				),
				'arrowDots'               => array(
					'type'    => 'string',
					'default' => 'arrows_dots',
				),
				'autoplay'                => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'autoplaySpeed'           => array(
					'type'    => 'number',
					'default' => 2000,
				),
				'arrowSize'               => array(
					'type'    => 'number',
					'default' => 20,
				),
				'arrowBorderSize'         => array(
					'type'    => 'number',
					'default' => 1,
				),
				'arrowBorderRadius'       => array(
					'type'    => 'number',
					'default' => 0,
				),
				'arrowColor'              => array(
					'type'    => 'string',
					'default' => '#aaaaaa',
				),
				'equalHeight'             => array(
					'type'    => 'boolean',
					'default' => false,
				),
			),
			'render_callback' => 'uagb_post_carousel_callback',
		)
	);

	register_block_type(
		'uagb/post-masonry',
		array(
			'attributes'      => array(
				'block_id'                => array(
					'type'    => 'string',
					'default' => 'not_set',
				),
				'categories'              => array(
					'type' => 'string',
				),
				'postType'                => array(
					'type'    => 'string',
					'default' => 'post',
				),
				'taxonomyType'            => array(
					'type'    => 'string',
					'default' => 'category',
				),
				'postsToShow'             => array(
					'type'    => 'number',
					'default' => 6,
				),
				'displayPostDate'         => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'displayPostExcerpt'      => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'excerptLength'           => array(
					'type'    => 'number',
					'default' => 25,
				),
				'displayPostAuthor'       => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'displayPostTitle'        => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'displayPostComment'      => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'displayPostTaxonomy'     => array(
					'type'    => 'boolean',
					'default' => false,
				),
				'displayPostImage'        => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'imgSize'                 => array(
					'type'    => 'string',
					'default' => 'large',
				),
				'imgPosition'             => array(
					'type'    => 'string',
					'default' => 'top',
				),
				'linkBox'                 => array(
					'type' => 'boolean',
				),
				'bgOverlayColor'          => array(
					'type'    => 'string',
					'default' => '#ffffff',
				),
				'overlayOpacity'          => array(
					'type'    => 'number',
					'default' => '50',
				),
				'displayPostLink'         => array(
					'type'    => 'boolean',
					'default' => true,
				),
				'newTab'                  => array(
					'type'    => 'boolean',
					'default' => false,
				),
				'ctaText'                 => array(
					'type'    => 'string',
					'default' => __( 'Read More', 'ultimate-addons-for-gutenberg' ),
				),
				'borderWidth'             => array(
					'type'    => 'number',
					'default' => 1,
				),
				'btnHPadding'             => array(
					'type'    => 'number',
					'default' => 10,
				),
				'btnVPadding'             => array(
					'type'    => 'number',
					'default' => 5,
				),
				'borderStyle'             => array(
					'type'    => 'string',
					'default' => 'none',
				),
				'borderColor'             => array(
					'type'    => 'string',
					'default' => '#3b3b3b',
				),
				'borderHColor'            => array(
					'type' => 'string',
				),
				'borderRadius'            => array(
					'type'    => 'number',
					'default' => 0,
				),
				'columns'                 => array(
					'type'    => 'number',
					'default' => 3,
				),
				'tcolumns'                => array(
					'type'    => 'number',
					'default' => 2,
				),
				'mcolumns'                => array(
					'type'    => 'number',
					'default' => 1,
				),
				'align'                   => array(
					'type'    => 'string',
					'default' => 'left',
				),
				'width'                   => array(
					'type'    => 'string',
					'default' => 'wide',
				),
				'order'                   => array(
					'type'    => 'string',
					'default' => 'desc',
				),
				'orderBy'                 => array(
					'type'    => 'string',
					'default' => 'date',
				),
				'rowGap'                  => array(
					'type'    => 'number',
					'default' => 20,
				),
				'columnGap'               => array(
					'type'    => 'number',
					'default' => 20,
				),
				'bgColor'                 => array(
					'type'    => 'string',
					'default' => '#e4e4e4',
				),
				'titleColor'              => array(
					'type'    => 'string',
					'default' => '#3b3b3b',
				),
				'titleTag'                => array(
					'type'    => 'string',
					'default' => 'h3',
				),
				'titleFontSize'           => array(
					'type'    => 'number',
					'default' => '',
				),
				'titleFontSizeType'       => array(
					'type'    => 'string',
					'default' => 'px',
				),
				'titleFontSizeMobile'     => array(
					'type' => 'number',
				),
				'titleFontSizeTablet'     => array(
					'type' => 'number',
				),
				'titleFontFamily'         => array(
					'type'    => 'string',
					'default' => '',
				),
				'titleFontWeight'         => array(
					'type' => 'string',
				),
				'titleFontSubset'         => array(
					'type' => 'string',
				),
				'titleLineHeightType'     => array(
					'type'    => 'string',
					'default' => 'em',
				),
				'titleLineHeight'         => array(
					'type' => 'number',
				),
				'titleLineHeightTablet'   => array(
					'type' => 'number',
				),
				'titleLineHeightMobile'   => array(
					'type' => 'number',
				),
				'titleLoadGoogleFonts'    => array(
					'type'    => 'boolean',
					'default' => false,
				),

				'metaFontSize'            => array(
					'type'    => 'number',
					'default' => '',
				),
				'metaFontSizeType'        => array(
					'type'    => 'string',
					'default' => 'px',
				),
				'metaFontSizeMobile'      => array(
					'type' => 'number',
				),
				'metaFontSizeTablet'      => array(
					'type' => 'number',
				),
				'metaFontFamily'          => array(
					'type'    => 'string',
					'default' => '',
				),
				'metaFontWeight'          => array(
					'type' => 'string',
				),
				'metaFontSubset'          => array(
					'type' => 'string',
				),
				'metaLineHeightType'      => array(
					'type'    => 'string',
					'default' => 'em',
				),
				'metaLineHeight'          => array(
					'type' => 'number',
				),
				'metaLineHeightTablet'    => array(
					'type' => 'number',
				),
				'metaLineHeightMobile'    => array(
					'type' => 'number',
				),
				'metaLoadGoogleFonts'     => array(
					'type'    => 'boolean',
					'default' => false,
				),
				'excerptFontSize'         => array(
					'type'    => 'number',
					'default' => '',
				),
				'excerptFontSizeType'     => array(
					'type'    => 'string',
					'default' => 'px',
				),
				'excerptFontSizeMobile'   => array(
					'type' => 'number',
				),
				'excerptFontSizeTablet'   => array(
					'type' => 'number',
				),
				'excerptFontFamily'       => array(
					'type'    => 'string',
					'default' => '',
				),
				'excerptFontWeight'       => array(
					'type' => 'string',
				),
				'excerptFontSubset'       => array(
					'type' => 'string',
				),
				'excerptLineHeightType'   => array(
					'type'    => 'string',
					'default' => 'em',
				),
				'excerptLineHeight'       => array(
					'type' => 'number',
				),
				'excerptLineHeightTablet' => array(
					'type' => 'number',
				),
				'excerptLineHeightMobile' => array(
					'type' => 'number',
				),
				'excerptLoadGoogleFonts'  => array(
					'type'    => 'boolean',
					'default' => false,
				),
				'ctaFontSize'             => array(
					'type'    => 'number',
					'default' => '',
				),
				'ctaFontSizeType'         => array(
					'type'    => 'string',
					'default' => 'px',
				),
				'ctaFontSizeMobile'       => array(
					'type' => 'number',
				),
				'ctaFontSizeTablet'       => array(
					'type' => 'number',
				),
				'ctaFontFamily'           => array(
					'type'    => 'string',
					'default' => '',
				),
				'ctaFontWeight'           => array(
					'type' => 'string',
				),
				'ctaFontSubset'           => array(
					'type' => 'string',
				),
				'ctaLineHeightType'       => array(
					'type'    => 'string',
					'default' => 'em',
				),
				'ctaLineHeight'           => array(
					'type' => 'number',
				),
				'ctaLineHeightTablet'     => array(
					'type' => 'number',
				),
				'ctaLineHeightMobile'     => array(
					'type' => 'number',
				),
				'ctaLoadGoogleFonts'      => array(
					'type'    => 'boolean',
					'default' => false,
				),
				'metaColor'               => array(
					'type'    => 'string',
					'default' => '#777777',
				),
				'excerptColor'            => array(
					'type'    => 'string',
					'default' => '',
				),
				'ctaColor'                => array(
					'type'    => 'string',
					'default' => '#ffffff',
				),
				'ctaBgColor'              => array(
					'type'    => 'string',
					'default' => '#333333',
				),
				'ctaHColor'               => array(
					'type' => 'string',
				),
				'ctaBgHColor'             => array(
					'type' => 'string',
				),
				'contentPadding'          => array(
					'type'    => 'number',
					'default' => 20,
				),
				'contentPaddingMobile'    => array(
					'type' => 'number',
				),
				'titleBottomSpace'        => array(
					'type'    => 'number',
					'default' => 15,
				),
				'metaBottomSpace'         => array(
					'type'    => 'number',
					'default' => 15,
				),
				'excerptBottomSpace'      => array(
					'type'    => 'number',
					'default' => 25,
				),
			),
			'render_callback' => 'uagb_post_masonry_callback',
		)
	);
}

add_action( 'init', 'uagb_register_blocks' );

/**
 * Create API fields for additional info
 *
 * @since 0.0.1
 */
function uagb_blocks_register_rest_fields() {
	$post_type = UAGB_Helper::get_post_types();

	foreach ( $post_type as $key => $value ) {
		// Add featured image source.
		register_rest_field(
			$value['value'],
			'uagb_featured_image_src',
			array(
				'get_callback'    => 'uagb_blocks_get_image_src',
				'update_callback' => null,
				'schema'          => null,
			)
		);

		// Add author info.
		register_rest_field(
			$value['value'],
			'uagb_author_info',
			array(
				'get_callback'    => 'uagb_blocks_get_author_info',
				'update_callback' => null,
				'schema'          => null,
			)
		);

		// Add comment info.
		register_rest_field(
			$value['value'],
			'uagb_comment_info',
			array(
				'get_callback'    => 'uagb_blocks_get_comment_info',
				'update_callback' => null,
				'schema'          => null,
			)
		);

		// Add excerpt info.
		register_rest_field(
			$value['value'],
			'uagb_excerpt',
			array(
				'get_callback'    => 'uagb_blocks_get_excerpt',
				'update_callback' => null,
				'schema'          => null,
			)
		);

	}
}

add_action( 'rest_api_init', 'uagb_blocks_register_rest_fields' );

/**
 * Create API Order By Fields
 *
 * @since 1.12.0
 */
function uagb_blocks_register_rest_orderby_fields() {
	$post_type = UAGB_Helper::get_post_types();

	foreach ( $post_type as $key => $type ) {
		add_filter( "rest_{$type['value']}_collection_params", 'uagb_blocks_add_orderby', 10, 1 );
	}
}

add_action( 'init', 'uagb_blocks_register_rest_orderby_fields' );


/**
 * Get featured image source for the rest field as per size
 *
 * @param object $object Post Object.
 * @param string $field_name Field name.
 * @param object $request Request Object.
 * @since 0.0.1
 */
function uagb_blocks_get_image_src( $object, $field_name, $request ) {
	$image_sizes = UAGB_Helper::get_image_sizes();

	$featured_images = array();

	if ( ! isset( $object['featured_media'] ) ) {
		return $featured_images;
	}

	foreach ( $image_sizes as $key => $value ) {
		$size = $value['value'];

		$featured_images[ $size ] = wp_get_attachment_image_src(
			$object['featured_media'],
			$size,
			false
		);
	}

	return $featured_images;
}

/**
 * Get author info for the rest field
 *
 * @param object $object Post Object.
 * @param string $field_name Field name.
 * @param object $request Request Object.
 * @since 0.0.1
 */
function uagb_blocks_get_author_info( $object, $field_name, $request ) {

	$author = ( isset( $object['author'] ) ) ? $object['author'] : '';

	// Get the author name.
	$author_data['display_name'] = get_the_author_meta( 'display_name', $author );

	// Get the author link.
	$author_data['author_link'] = get_author_posts_url( $author );

	// Return the author data.
	return $author_data;
}

/**
 * Get comment info for the rest field
 *
 * @param object $object Post Object.
 * @param string $field_name Field name.
 * @param object $request Request Object.
 * @since 0.0.1
 */
function uagb_blocks_get_comment_info( $object, $field_name, $request ) {
	// Get the comments link.
	$comments_count = wp_count_comments( $object['id'] );
	return $comments_count->total_comments;
}

/**
 * Get excerpt for the rest field
 *
 * @param object $object Post Object.
 * @param string $field_name Field name.
 * @param object $request Request Object.
 * @since 0.0.1
 */
function uagb_blocks_get_excerpt( $object, $field_name, $request ) {
	$excerpt = wp_trim_words( get_the_excerpt( $object['id'] ) );
	if ( ! $excerpt ) {
		$excerpt = null;
	}
	return $excerpt;
}

/**
 * Adds Order By values to Rest API
 *
 * @param object $params Parameters.
 * @since 1.12.0
 */
function uagb_blocks_add_orderby( $params ) {

	$params['orderby']['enum'][] = 'rand';
	$params['orderby']['enum'][] = 'menu_order';

	return $params;
}

/**
 * Render Image HTML.
 *
 * @param array $attributes Array of block attributes.
 *
 * @since 0.0.1
 */
function uagb_render_image( $attributes ) {
	if ( ! $attributes['displayPostImage'] ) {
		return;
	}

	if ( ! get_the_post_thumbnail_url() ) {
		return;
	}

	$target = ( $attributes['newTab'] ) ? '_blank' : '_self';
	do_action( "uagb_single_post_before_featured_image_{$attributes['post_type']}", get_the_ID(), $attributes );

	?>
	<div class='uagb-post__image'>
		<a href="<?php echo esc_url( apply_filters( "uagb_single_post_link_{$attributes['post_type']}", get_the_permalink(), get_the_ID(), $attributes ) ); ?>" target="<?php echo esc_html( $target ); ?>" rel="bookmark noopener noreferrer"><?php echo wp_get_attachment_image( get_post_thumbnail_id(), $attributes['imgSize'] ); ?>
		</a>
	</div>
	<?php
	do_action( "uagb_single_post_after_featured_image_{$attributes['post_type']}", get_the_ID(), $attributes );
}

/**
 * Render Post Title HTML.
 *
 * @param array $attributes Array of block attributes.
 *
 * @since 0.0.1
 */
function uagb_render_title( $attributes ) {

	if ( ! $attributes['displayPostTitle'] ) {
		return;
	}

	$target = ( $attributes['newTab'] ) ? '_blank' : '_self';
	do_action( "uagb_single_post_before_title_{$attributes['post_type']}", get_the_ID(), $attributes );
	?>
	<<?php echo esc_html( $attributes['titleTag'] ); ?> class="uagb-post__title">
		<a href="<?php echo esc_url( apply_filters( "uagb_single_post_link_{$attributes['post_type']}", get_the_permalink(), get_the_ID(), $attributes ) ); ?>" target="<?php echo esc_html( $target ); ?>" rel="bookmark noopener noreferrer"><?php the_title(); ?></a>
	</<?php echo esc_html( $attributes['titleTag'] ); ?>>
	<?php
	do_action( "uagb_single_post_after_title_{$attributes['post_type']}", get_the_ID(), $attributes );
}

/**
 * Render Post Meta - Author HTML.
 *
 * @param array $attributes Array of block attributes.
 *
 * @since 1.14.0
 */
function uagb_render_meta_author( $attributes ) {

	if ( ! $attributes['displayPostAuthor'] ) {
		return;
	}
	?>
	<span class="uagb-post__author">
		<span class="dashicons-admin-users dashicons"></span>
		<?php the_author_posts_link(); ?>
	</span>
	<?php
}

/**
 * Render Post Meta - Date HTML.
 *
 * @param array $attributes Array of block attributes.
 *
 * @since 1.14.0
 */
function uagb_render_meta_date( $attributes ) {

	if ( ! $attributes['displayPostDate'] ) {
		return;
	}
	global $post;
	?>
	<time datetime="<?php echo esc_attr( get_the_date( 'c', $post->ID ) ); ?>" class="uagb-post__date">
		<span class="dashicons-calendar dashicons"></span>
		<?php echo esc_html( get_the_date( '', $post->ID ) ); ?>
	</time>
	<?php
}

/**
 * Render Post Meta - Comment HTML.
 *
 * @param array $attributes Array of block attributes.
 *
 * @since 1.14.0
 */
function uagb_render_meta_comment( $attributes ) {

	if ( ! $attributes['displayPostComment'] ) {
		return;
	}
	?>
	<span class="uagb-post__comment">
		<span class="dashicons-admin-comments dashicons"></span>
		<?php comments_number(); ?>
	</span>
	<?php
}

/**
 * Render Post Meta - Comment HTML.
 *
 * @param array $attributes Array of block attributes.
 *
 * @since 1.14.0
 */
function uagb_render_meta_taxonomy( $attributes ) {

	if ( ! $attributes['displayPostTaxonomy'] ) {
		return;
	}
	global $post;

	$terms = get_the_terms( $post->ID, $attributes['taxonomyType'] );
	if ( is_wp_error( $terms ) ) {
		return;
	}

	if ( ! isset( $terms[0] ) ) {
		return;
	}
	?>
	<span class="uagb-post__taxonomy">
		<span class="dashicons-tag dashicons"></span>
		<?php echo esc_html( $terms[0]->name ); ?>
	</span>
	<?php
}

/**
 * Render Post Meta HTML.
 *
 * @param array $attributes Array of block attributes.
 *
 * @since 0.0.1
 */
function uagb_render_meta( $attributes ) {
	global $post;
	// @codingStandardsIgnoreStart
	do_action( "uagb_single_post_before_meta_{$attributes['post_type']}", get_the_ID(), $attributes );

	$meta_sequence = array( 'author', 'date', 'comment', 'taxonomy' );
	$meta_sequence = apply_filters( "uagb_single_post_meta_sequence_{$attributes['post_type']}", $meta_sequence, get_the_ID(), $attributes );
	?>
	<div class="uagb-post-grid-byline">
		<?php
		foreach ( $meta_sequence as $key => $sequence ) {
			switch ( $sequence ) {
				case 'author':
					uagb_render_meta_author( $attributes );
					break;

				case 'date':
					uagb_render_meta_date( $attributes );
					break;

				case 'comment':
					uagb_render_meta_comment( $attributes );
					break;

				case 'taxonomy':
					uagb_render_meta_taxonomy( $attributes );
					break;
				
				default:
					break;
			}
		}
		?>
	
	</div>
	<?php
	do_action( "uagb_single_post_after_meta_{$attributes['post_type']}", get_the_ID(), $attributes );
	// @codingStandardsIgnoreEnd
}

/**
 * Render Post Excerpt HTML.
 *
 * @param array $attributes Array of block attributes.
 *
 * @since 0.0.1
 */
function uagb_render_excerpt( $attributes ) {
	if ( ! $attributes['displayPostExcerpt'] ) {
		return;
	}

	$length = ( isset( $attributes['excerptLength'] ) ) ? $attributes['excerptLength'] : 25;

	$excerpt = wp_trim_words( get_the_excerpt(), $length );
	if ( ! $excerpt ) {
		$excerpt = null;
	}
	$excerpt = apply_filters( "uagb_single_post_excerpt_{$attributes['post_type']}", $excerpt, get_the_ID(), $attributes );
	do_action( "uagb_single_post_before_excerpt_{$attributes['post_type']}", get_the_ID(), $attributes );
	?>
	<div class="uagb-post__excerpt">
		<?php echo wp_kses_post( $excerpt ); ?>
	</div>
	<?php
	do_action( "uagb_single_post_after_excerpt_{$attributes['post_type']}", get_the_ID(), $attributes );
}

/**
 * Render Post CTA button HTML.
 *
 * @param array $attributes Array of block attributes.
 *
 * @since 0.0.1
 */
function uagb_render_button( $attributes ) {
	if ( ! $attributes['displayPostLink'] ) {
		return;
	}
	$target   = ( $attributes['newTab'] ) ? '_blank' : '_self';
	$cta_text = ( $attributes['ctaText'] ) ? $attributes['ctaText'] : __( 'Read More', 'ultimate-addons-for-gutenberg' );
	do_action( "uagb_single_post_before_cta_{$attributes['post_type']}", get_the_ID(), $attributes );
	?>
	<div class="uagb-post__cta">
		<a class="uagb-post__link uagb-text-link" href="<?php echo esc_url( apply_filters( "uagb_single_post_link_{$attributes['post_type']}", get_the_permalink(), get_the_ID(), $attributes ) ); ?>" target="<?php echo esc_html( $target ); ?>" rel="bookmark noopener noreferrer"><?php echo esc_html( $cta_text ); ?></a>
	</div>
	<?php
	do_action( "uagb_single_post_after_cta_{$attributes['post_type']}", get_the_ID(), $attributes );
}

/**
 * Render Complete Box Link HTML.
 *
 * @param array $attributes Array of block attributes.
 *
 * @since 1.7.0
 */
function uagb_render_complete_box_link( $attributes ) {
	if ( ! ( isset( $attributes['linkBox'] ) && $attributes['linkBox'] ) ) {
		return;
	}
	$target = ( $attributes['newTab'] ) ? '_blank' : '_self';
	?>
	<a class="uagb-post__link-complete-box" href="<?php echo esc_url( apply_filters( "uagb_single_post_link_{$attributes['post_type']}", get_the_permalink(), get_the_ID(), $attributes ) ); ?>" target="<?php echo esc_html( $target ); ?>" rel="bookmark noopener noreferrer"></a>
	<?php
}
