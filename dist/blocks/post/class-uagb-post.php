<?php
/**
 * UAGB Post.
 *
 * @package UAGB
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

if ( ! class_exists( 'UAGB_Post' ) ) {

	/**
	 * Class UAGB_Post.
	 */
	class UAGB_Post {


		/**
		 * Member Variable
		 *
		 * @since 1.18.1
		 * @var instance
		 */
		private static $instance;

		/**
		 * Member Variable
		 *
		 * @since 1.18.1
		 * @var settings
		 */
		private static $settings;

		/**
		 *  Initiator
		 *
		 * @since 1.18.1
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

			add_action( 'init', array( $this, 'register_blocks' ) );
			add_action( 'wp_ajax_uagb_post_pagination', array( $this, 'post_pagination' ) );
			add_action( 'wp_ajax_nopriv_uagb_post_pagination', array( $this, 'post_pagination' ) );
			add_action( 'wp_ajax_uagb_get_posts', array( $this, 'masonry_pagination' ) );
			add_action( 'wp_ajax_nopriv_uagb_get_posts', array( $this, 'masonry_pagination' ) );
			add_action( 'wp_footer', array( $this, 'add_post_dynamic_script' ), 1000 );
		}

		/**
		 * Registers the `core/latest-posts` block on server.
		 *
		 * @since 0.0.1
		 */
		public function register_blocks() {
			// Check if the register function exists.
			if ( ! function_exists( 'register_block_type' ) ) {
				return;
			}

			$common_attributes = $this->get_post_attributes();

			register_block_type(
				'uagb/post-grid',
				array(
					'attributes'      => array_merge(
						$common_attributes,
						array(
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
							'layoutConfig'                => array(
								'type'    => 'array',
								'default' => array(
									array( 'uagb/post-image' ),
									array( 'uagb/post-title' ),
									array( 'uagb/post-meta' ),
									array( 'uagb/post-excerpt' ),
									array( 'uagb/post-button' ),
								),
							),
						)
					),
					'render_callback' => array( $this, 'post_grid_callback' ),
				)
			);

			register_block_type(
				'uagb/post-carousel',
				array(
					'attributes'      => array_merge(
						$common_attributes,
						array(
							'pauseOnHover'      => array(
								'type'    => 'boolean',
								'default' => true,
							),
							'infiniteLoop'      => array(
								'type'    => 'boolean',
								'default' => true,
							),
							'transitionSpeed'   => array(
								'type'    => 'number',
								'default' => 500,
							),
							'arrowDots'         => array(
								'type'    => 'string',
								'default' => 'arrows_dots',
							),
							'autoplay'          => array(
								'type'    => 'boolean',
								'default' => true,
							),
							'autoplaySpeed'     => array(
								'type'    => 'number',
								'default' => 2000,
							),
							'arrowSize'         => array(
								'type'    => 'number',
								'default' => 20,
							),
							'arrowBorderSize'   => array(
								'type'    => 'number',
								'default' => 1,
							),
							'arrowBorderRadius' => array(
								'type'    => 'number',
								'default' => 0,
							),
							'arrowColor'        => array(
								'type'    => 'string',
								'default' => '#aaaaaa',
							),
							'equalHeight'       => array(
								'type'    => 'boolean',
								'default' => false,
							),
							'layoutConfig'      => array(
								'type'    => 'array',
								'default' => array(
									array( 'uagb/post-image' ),
									array( 'uagb/post-title' ),
									array( 'uagb/post-meta' ),
									array( 'uagb/post-excerpt' ),
									array( 'uagb/post-button' ),
								),
							),
						)
					),
					'render_callback' => array( $this, 'post_carousel_callback' ),
				)
			);

			register_block_type(
				'uagb/post-masonry',
				array(
					'attributes'      => array_merge(
						$common_attributes,
						array(
							'paginationType'               => array(
								'type'    => 'string',
								'default' => 'none',
							),
							'paginationEventType'          => array(
								'type'    => 'string',
								'default' => 'button',
							),
							'buttonText'                   => array(
								'type'    => 'string',
								'default' => 'Load More',
							),
							'paginationAlign'              => array(
								'type'    => 'string',
								'default' => 'center',
							),
							'paginationTextColor'          => array(
								'type'    => 'string',
								'default' => '',
							),
							'paginationMasonryBgColor'     => array(
								'type'    => 'string',
								'default' => '',
							),
							'paginationBgHoverColor'       => array(
								'type' => 'string',
							),
							'paginationTextHoverColor'     => array(
								'type' => 'string',
							),
							'paginationMasonryBorderStyle' => array(
								'type'    => 'string',
								'default' => 'solid',
							),
							'paginationMasonryBorderWidth' => array(
								'type'    => 'number',
								'default' => 1,
							),
							'paginationMasonryBorderRadius' => array(
								'type'    => 'number',
								'default' => 2,
							),
							'paginationMasonryBorderColor' => array(
								'type'    => 'string',
								'default' => '',
							),
							'paginationFontSize'           => array(
								'type'    => 'number',
								'default' => 13,
							),
							'loaderColor'                  => array(
								'type'    => 'string',
								'default' => '#0085ba',
							),
							'loaderSize'                   => array(
								'type'    => 'number',
								'default' => 18,
							),
							'paginationButtonPaddingType'  => array(
								'type'    => 'string',
								'default' => 'px',
							),
							'vpaginationButtonPaddingMobile' => array(
								'type'    => 'number',
								'default' => 8,
							),
							'vpaginationButtonPaddingTablet' => array(
								'type'    => 'number',
								'default' => 8,
							),
							'vpaginationButtonPaddingDesktop' => array(
								'type'    => 'number',
								'default' => 8,
							),
							'hpaginationButtonPaddingMobile' => array(
								'type'    => 'number',
								'default' => 12,
							),
							'hpaginationButtonPaddingTablet' => array(
								'type'    => 'number',
								'default' => 12,
							),
							'hpaginationButtonPaddingDesktop' => array(
								'type'    => 'number',
								'default' => 12,
							),
							'layoutConfig'                 => array(
								'type'    => 'array',
								'default' => array(
									array( 'uagb/post-image' ),
									array( 'uagb/post-title' ),
									array( 'uagb/post-meta' ),
									array( 'uagb/post-excerpt' ),
									array( 'uagb/post-button' ),
								),
							),
						)
					),
					'render_callback' => array( $this, 'post_masonry_callback' ),
				)
			);
		}

		/**
		 * Get Post common attributes for all Post Grid, Masonry and Carousel.
		 *
		 * @since 0.0.1
		 */
		public function get_post_attributes() {

			return array(
				'inheritFromTheme'        => array(
					'type'    => 'boolean',
					'default' => false,
				),
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
				'postDisplaytext'         => array(
					'type'    => 'string',
					'default' => 'No post found!',
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

				// Title Attributes.
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

				// Meta attributes.
				'metaColor'               => array(
					'type'    => 'string',
					'default' => '#777777',
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

				// Excerpt Attributes.
				'excerptColor'            => array(
					'type'    => 'string',
					'default' => '',
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
				'displayPostContentRadio' => array(
					'type'    => 'string',
					'default' => 'excerpt',
				),

				// CTA attributes.
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

				// Spacing Attributes.
				'contentPadding'          => array(
					'type'    => 'number',
					'default' => 20,
				),
				'contentPaddingMobile'    => array(
					'type' => 'number',
				),
				'ctaBottomSpace'          => array(
					'type'    => 'number',
					'default' => 0,
				),
				'imageBottomSpace'        => array(
					'type'    => 'number',
					'default' => 15,
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
				// Exclude Current Post.
				'excludeCurrentPost'      => array(
					'type'    => 'boolean',
					'default' => false,
				),
			);
		}

		/**
		 * Renders the post grid block on server.
		 *
		 * @param array $attributes Array of block attributes.
		 *
		 * @since 0.0.1
		 */
		public function post_grid_callback( $attributes ) {

			// Render query.
			$query = UAGB_Helper::get_query( $attributes, 'grid' );

			// Cache the settings.
			self::$settings['grid'][ $attributes['block_id'] ] = $attributes;

			ob_start();
			$this->get_post_html( $attributes, $query, 'grid' );
			// Output the post markup.
			return ob_get_clean();
		}

		/**
		 * Renders the post carousel block on server.
		 *
		 * @param array $attributes Array of block attributes.
		 *
		 * @since 0.0.1
		 */
		public function post_carousel_callback( $attributes ) {

			// Render query.
			$query = UAGB_Helper::get_query( $attributes, 'carousel' );

			// Cache the settings.
			self::$settings['carousel'][ $attributes['block_id'] ] = $attributes;

			ob_start();
			$this->get_post_html( $attributes, $query, 'carousel' );
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
		public function post_masonry_callback( $attributes ) {

			// Render query.
			$query = UAGB_Helper::get_query( $attributes, 'masonry' );

			// Cache the settings.
			self::$settings['masonry'][ $attributes['block_id'] ] = $attributes;

			ob_start();
			$this->get_post_html( $attributes, $query, 'masonry' );
			// Output the post markup.
			return ob_get_clean();
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
		public function get_post_html( $attributes, $query, $layout ) {

			$attributes['post_type'] = $layout;

			$wrap = array(
				'uagb-post__items uagb-post__columns-' . $attributes['columns'],
				'is-' . $layout,
				'uagb-post__columns-tablet-' . $attributes['tcolumns'],
				'uagb-post__columns-mobile-' . $attributes['mcolumns'],
			);

			$block_id = 'uagb-block-' . $attributes['block_id'];

			$animation_class = ( isset( $attributes['animationfield'] ) ) ? 'uag-animation-speed  uag-animation-' . $attributes['animationfield'] : '';

			$animation_hover_class = ( isset( $attributes['animationhoverfield'] ) ) ? 'uag-hover-animation-' . $attributes['animationhoverfield'] : '';

			$outerwrap = array(
				'uagb-post-grid',
				( isset( $attributes['className'] ) ) ? $attributes['className'] : '',
				'uagb-post__image-position-' . $attributes['imgPosition'],
				$block_id,
				$animation_hover_class,
				$animation_class,
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

			$total = $query->max_num_pages;
			?>

			<div class="<?php echo esc_html( implode( ' ', $outerwrap ) ); ?>" data-total="<?php echo esc_attr( $total ); ?>">

				<div class="<?php echo esc_html( implode( ' ', $wrap ) ); ?>">

				<?php

					$this->posts_articles_markup( $query, $attributes );
				?>
				</div>
				<?php
				$post_not_found = $query->found_posts;

				if ( 0 === $post_not_found ) {
					?>
					<p class="uagb-post__no-posts">
						<?php echo esc_html( $attributes['postDisplaytext'] ); ?>
					</p>
					<?php
				}

				if ( ( isset( $attributes['postPagination'] ) && true === $attributes['postPagination'] ) ) {

					?>
					<div class="uagb-post-pagination-wrap">
						<?php echo $this->render_pagination( $query, $attributes ); //phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
					</div>
					<?php
				}
				if ( 'masonry' === $layout && 'infinite' === $attributes['paginationType'] ) {

					if ( 'scroll' === $attributes['paginationEventType'] ) {
						?>
							<div class="uagb-post-inf-loader" style="display: none;">
								<div class="uagb-post-loader-1"></div>
								<div class="uagb-post-loader-2"></div>
								<div class="uagb-post-loader-3"></div>
							</div>
							<?php

					}
					if ( 'button' === $attributes['paginationEventType'] ) {
						?>
							<div class="uagb-post__load-more-wrap">
								<span class="uagb-post-pagination-button">
									<a class="uagb-post__load-more" href="javascript:void(0);">
									<?php echo esc_html( $attributes['buttonText'] ); ?>
									</a>
								</span>
							</div>
							<?php
					}
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
		 * @since 1.18.1
		 */
		public function render_pagination( $query, $attributes ) {

			$permalink_structure = get_option( 'permalink_structure' );
			$base                = untrailingslashit( wp_specialchars_decode( get_pagenum_link() ) );
			$base                = UAGB_Helper::build_base_url( $permalink_structure, $base );
			$format              = UAGB_Helper::paged_format( $permalink_structure, $base );
			$paged               = UAGB_Helper::get_paged( $query );
			$page_limit          = min( $attributes['pageLimit'], $query->max_num_pages );
			$page_limit          = isset( $page_limit ) ? $page_limit : $attributes['postsToShow'];
			$attributes['postsToShow'];

			$links = paginate_links(
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
		 * Sends the Post pagination markup to edit.js
		 *
		 * @since 1.14.9
		 */
		public function post_pagination() {

			check_ajax_referer( 'uagb_ajax_nonce', 'nonce' );

			if ( isset( $_POST['attributes'] ) ) {

				$query = UAGB_Helper::get_query( $_POST['attributes'], 'grid' );

				$pagination_markup = $this->render_pagination( $query, $_POST['attributes'] );

				wp_send_json_success( $pagination_markup );
			}

			wp_send_json_error( ' No attributes recieved' );
		}
		/**
		 * Sends the Posts to Masonry AJAX.
		 *
		 * @since 1.18.1
		 */
		public function masonry_pagination() {

			check_ajax_referer( 'uagb_masonry_ajax_nonce', 'nonce' );

			$attr = $_POST['attr'];

			$attr['paged'] = $_POST['page_number'];

			$query = UAGB_Helper::get_query( $attr, 'masonry' );

			foreach ( $attr as $key => $attribute ) {
				$attr[ $key ] = ( 'false' === $attribute ) ? false : ( ( 'true' === $attribute ) ? true : $attribute );
			}

			ob_start();
			$this->posts_articles_markup( $query, $attr );
			$html = ob_get_clean();

			wp_send_json_success( $html );
		}

		/**
		 * Render Posts HTML for Masonry Pagination.
		 *
		 * @param object $query WP_Query object.
		 * @param array  $attributes Array of block attributes.
		 * @since 1.18.1
		 */
		public function posts_articles_markup( $query, $attributes ) {

			while ( $query->have_posts() ) {
				$query->the_post();
				// Filter to modify the attributes based on content requirement.
				$attributes         = apply_filters( 'uagb_post_alter_attributes', $attributes, get_the_ID() );
				$post_class_enabled = apply_filters( 'uagb_enable_post_class', false, $attributes );

				do_action( "uagb_post_before_article_{$attributes['post_type']}", get_the_ID(), $attributes );

				?>
				<article <?php ( $post_class_enabled ) ? post_class() : ''; ?>>
					<?php do_action( "uagb_post_before_inner_wrap_{$attributes['post_type']}", get_the_ID(), $attributes ); ?>
					<div class="uagb-post__inner-wrap">
						<?php $this->render_complete_box_link( $attributes ); ?>
						<?php $this->render_innerblocks( $attributes ); ?>
					</div>
					<?php do_action( "uagb_post_after_inner_wrap_{$attributes['post_type']}", get_the_ID(), $attributes ); ?>
				</article>

				<?php

				do_action( "uagb_post_after_article_{$attributes['post_type']}", get_the_ID(), $attributes );

			}

			wp_reset_postdata();
		}
		/**
		 * Render layout.
		 *
		 * @param array $fname to get the block.
		 * @param array $attr Array of block attributes.
		 *
		 * @since 1.20.0
		 */
		public function render_layout( $fname, $attr ) {
			switch ( $fname ) {
				case 'uagb/post-button':
					return $this->render_button( $attr );
				case 'uagb/post-image':
					return $this->render_image( $attr );
				case 'uagb/post-title':
					return $this->render_title( $attr );
				case 'uagb/post-meta':
					return $this->render_meta( $attr );
				case 'uagb/post-excerpt':
					return $this->render_excerpt( $attr );
				default:
					return '';
			}
		}
		/**
		 * Render Inner blocks.
		 *
		 * @param array $attributes Array of block attributes.
		 *
		 * @since 1.20.0
		 */
		public function render_innerblocks( $attributes ) {
			$length = count( $attributes['layoutConfig'] );
			for ( $i = 0; $i < $length; $i++ ) {
				$this->render_layout( $attributes['layoutConfig'][ $i ][0], $attributes );
			}
		}
		/**
		 * Renders the post masonry related script.
		 *
		 * @since 0.0.1
		 */
		public function add_post_dynamic_script() {

			if ( isset( self::$settings['masonry'] ) && ! empty( self::$settings['masonry'] ) ) {
				foreach ( self::$settings['masonry'] as $key => $value ) {
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
						<?php $selector = '.uagb-block-' . $key; ?>
						jQuery( document ).ready(function() {
							UAGBPostMasonry._init( <?php echo wp_json_encode( $value ); ?>, '<?php echo esc_attr( $selector ); ?>' );
						});
					</script>
					<?php
				}
			}

			if ( isset( self::$settings['carousel'] ) && ! empty( self::$settings['carousel'] ) ) {
				foreach ( self::$settings['carousel'] as $key => $value ) {

					$dots         = ( 'dots' === $value['arrowDots'] || 'arrows_dots' === $value['arrowDots'] ) ? true : false;
					$arrows       = ( 'arrows' === $value['arrowDots'] || 'arrows_dots' === $value['arrowDots'] ) ? true : false;
					$equal_height = isset( $value['equalHeight'] ) ? $value['equalHeight'] : '';
					$tcolumns     = ( isset( $value['tcolumns'] ) ) ? $value['tcolumns'] : 2;
					$mcolumns     = ( isset( $value['mcolumns'] ) ) ? $value['mcolumns'] : 1;
					$is_rtl       = is_rtl();

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
									'rtl' : Boolean( '<?php echo esc_html( $is_rtl ); ?>' ),
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
		 * Render Image HTML.
		 *
		 * @param array $attributes Array of block attributes.
		 *
		 * @since 0.0.1
		 */
		public function render_image( $attributes ) {
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
		public function render_title( $attributes ) {

			if ( ! $attributes['displayPostTitle'] ) {
				return;
			}

			$target = ( $attributes['newTab'] ) ? '_blank' : '_self';
			do_action( "uagb_single_post_before_title_{$attributes['post_type']}", get_the_ID(), $attributes );
			?>
			<div class='uagb-post__text'> 
				<<?php echo esc_html( $attributes['titleTag'] ); ?> class="uagb-post__title">
					<a href="<?php echo esc_url( apply_filters( "uagb_single_post_link_{$attributes['post_type']}", get_the_permalink(), get_the_ID(), $attributes ) ); ?>" target="<?php echo esc_html( $target ); ?>" rel="bookmark noopener noreferrer"><?php the_title(); ?></a>
				</<?php echo esc_html( $attributes['titleTag'] ); ?>>
			</div>
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
		public function render_meta_author( $attributes ) {

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
		public function render_meta_date( $attributes ) {

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
		public function render_meta_comment( $attributes ) {

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
		public function render_meta_taxonomy( $attributes ) {

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
		public function render_meta( $attributes ) {

			global $post;
			do_action( "uagb_single_post_before_meta_{$attributes['post_type']}", get_the_ID(), $attributes );

			$meta_sequence = array( 'author', 'date', 'comment', 'taxonomy' );
			$meta_sequence = apply_filters( "uagb_single_post_meta_sequence_{$attributes['post_type']}", $meta_sequence, get_the_ID(), $attributes );
			?>
			<div class='uagb-post__text'> 
			<div class="uagb-post-grid-byline">
				<?php
				foreach ( $meta_sequence as $key => $sequence ) {
					switch ( $sequence ) {
						case 'author':
							$this->render_meta_author( $attributes );
							break;

						case 'date':
							$this->render_meta_date( $attributes );
							break;

						case 'comment':
							$this->render_meta_comment( $attributes );
							break;

						case 'taxonomy':
							$this->render_meta_taxonomy( $attributes );
							break;

						default:
							break;
					}
				}
				?>
			</div>
			</div>
			<?php
			do_action( "uagb_single_post_after_meta_{$attributes['post_type']}", get_the_ID(), $attributes );

		}

		/**
		 * Render Post Excerpt HTML.
		 *
		 * @param array $attributes Array of block attributes.
		 *
		 * @since 0.0.1
		 */
		public function render_excerpt( $attributes ) {
			if ( ! $attributes['displayPostExcerpt'] ) {
				return;
			}

			$length = ( isset( $attributes['excerptLength'] ) ) ? $attributes['excerptLength'] : 25;

			if ( 'full_post' === $attributes['displayPostContentRadio'] ) {
				$excerpt = get_the_content();
			} else {
				$excerpt = wp_trim_words( get_the_excerpt(), $length );
			}

			if ( ! $excerpt ) {
				$excerpt = null;
			}

			$excerpt = apply_filters( "uagb_single_post_excerpt_{$attributes['post_type']}", $excerpt, get_the_ID(), $attributes );
			do_action( "uagb_single_post_before_excerpt_{$attributes['post_type']}", get_the_ID(), $attributes );
			?>
				<div class='uagb-post__text'> 
					<div class="uagb-post__excerpt">
						<?php echo wp_kses_post( $excerpt ); ?>
					</div>
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
		public function render_button( $attributes ) {
			if ( ! $attributes['displayPostLink'] || 'full_post' === $attributes['displayPostContentRadio'] ) {
				return;
			}
			$target   = ( $attributes['newTab'] ) ? '_blank' : '_self';
			$cta_text = ( $attributes['ctaText'] ) ? $attributes['ctaText'] : __( 'Read More', 'ultimate-addons-for-gutenberg' );
			do_action( "uagb_single_post_before_cta_{$attributes['post_type']}", get_the_ID(), $attributes );
			$wrap_classes = ( true === $attributes['inheritFromTheme'] ) ? 'uagb-post__cta wp-block-button' : 'uagb-post__cta';
			$link_classes = ( false === $attributes['inheritFromTheme'] ) ? 'uagb-post__link uagb-text-link' : 'wp-block-button__link uagb-text-link';
			?>
			<div class='uagb-post__text'> 
				<div class="<?php echo esc_html( $wrap_classes ); ?>">
					<a class="<?php echo esc_html( $link_classes ); ?>" href="<?php echo esc_url( apply_filters( "uagb_single_post_link_{$attributes['post_type']}", get_the_permalink(), get_the_ID(), $attributes ) ); ?>" target="<?php echo esc_html( $target ); ?>" rel="bookmark noopener noreferrer"><?php echo esc_html( $cta_text ); ?></a>
				</div>
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
		public function render_complete_box_link( $attributes ) {
			if ( ! ( isset( $attributes['linkBox'] ) && $attributes['linkBox'] ) ) {
				return;
			}
			$target = ( $attributes['newTab'] ) ? '_blank' : '_self';
			?>
			<a class="uagb-post__link-complete-box" href="<?php echo esc_url( apply_filters( "uagb_single_post_link_{$attributes['post_type']}", get_the_permalink(), get_the_ID(), $attributes ) ); ?>" target="<?php echo esc_html( $target ); ?>" rel="bookmark noopener noreferrer"></a>
			<?php
		}
	}

	/**
	 *  Prepare if class 'UAGB_Post' exist.
	 *  Kicking this off by calling 'get_instance()' method
	 */
	UAGB_Post::get_instance();
}
