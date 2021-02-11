<?php
/**
 * UAGB Post.
 *
 * @package UAGB
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

if ( ! class_exists( 'UAGB_Post_Timeline' ) ) {

	/**
	 * Class UAGB_Post_Timeline.
	 */
	class UAGB_Post_Timeline {


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

			register_block_type(
				'uagb/post-timeline',
				array(
					'attributes'      => array(
						'align'                   => array(
							'type'    => 'string',
							'default' => 'center',
						),
						'headingColor'            => array(
							'type'    => 'string',
							'default' => '#333',
						),
						'subHeadingColor'         => array(
							'type'    => 'string',
							'default' => '#333',
						),
						'separatorBg'             => array(
							'type'    => 'string',
							'default' => '#eee',
						),
						'backgroundColor'         => array(
							'type'    => 'string',
							'default' => '#eee',
						),
						'separatorColor'          => array(
							'type'    => 'string',
							'default' => '#eee',
						),
						'separatorFillColor'      => array(
							'type'    => 'string',
							'default' => '#61ce70',
						),
						'separatorBorder'         => array(
							'type'    => 'string',
							'default' => '#eee',
						),
						'borderFocus'             => array(
							'type'    => 'string',
							'default' => '#5cb85c',
						),
						'headingTag'              => array(
							'type'    => 'string',
							'default' => 'h3',
						),
						'horizontalSpace'         => array(
							'type'    => 'number',
							'default' => 10,
						),
						'verticalSpace'           => array(
							'type'    => 'number',
							'default' => 15,
						),
						'timelinAlignment'        => array(
							'type'    => 'string',
							'default' => 'center',
						),
						'arrowlinAlignment'       => array(
							'type'    => 'string',
							'default' => 'center',
						),
						'subHeadFontSizeType'     => array(
							'type'    => 'string',
							'default' => 'px',
						),
						'subHeadFontSize'         => array(
							'type' => 'number',
						),
						'subHeadFontSizeTablet'   => array(
							'type' => 'number',
						),
						'subHeadFontSizeMobile'   => array(
							'type' => 'number',
						),
						'subHeadFontFamily'       => array(
							'type'    => 'string',
							'default' => '',
						),
						'subHeadFontWeight'       => array(
							'type' => 'string',
						),
						'subHeadFontSubset'       => array(
							'type' => 'string',
						),
						'subHeadLineHeightType'   => array(
							'type'    => 'string',
							'default' => 'em',
						),
						'subHeadLineHeight'       => array(
							'type' => 'number',
						),
						'subHeadLineHeightTablet' => array(
							'type' => 'number',
						),
						'subHeadLineHeightMobile' => array(
							'type' => 'number',
						),
						'subHeadLoadGoogleFonts'  => array(
							'type'    => 'boolean',
							'default' => false,
						),
						'headSpace'               => array(
							'type'    => 'number',
							'default' => 5,
						),
						'authorSpace'             => array(
							'type'    => 'number',
							'default' => 5,
						),
						'contentSpace'            => array(
							'type'    => 'number',
							'default' => 15,
						),
						'separatorwidth'          => array(
							'type'    => 'number',
							'default' => 3,
						),
						'borderwidth'             => array(
							'type'    => 'number',
							'default' => 0,
						),
						'iconColor'               => array(
							'type'    => 'string',
							'default' => '#333',
						),
						'iconFocus'               => array(
							'type'    => 'string',
							'default' => '#fff',
						),
						'iconBgFocus'             => array(
							'type'    => 'string',
							'default' => '#61ce70',
						),
						'authorColor'             => array(
							'type'    => 'string',
							'default' => '#333',
						),
						'authorFontSizeType'      => array(
							'type'    => 'string',
							'default' => 'px',
						),
						'authorFontSize'          => array(
							'type'    => 'number',
							'default' => 11,
						),
						'authorFontSizeTablet'    => array(
							'type' => 'number',
						),
						'authorFontSizeMobile'    => array(
							'type' => 'number',
						),
						'authorFontFamily'        => array(
							'type'    => 'string',
							'default' => '',
						),
						'authorFontWeight'        => array(
							'type' => 'string',
						),
						'authorFontSubset'        => array(
							'type' => 'string',
						),
						'authorLineHeightType'    => array(
							'type'    => 'string',
							'default' => 'em',
						),
						'authorLineHeight'        => array(
							'type' => 'number',
						),
						'authorLineHeightTablet'  => array(
							'type' => 'number',
						),
						'authorLineHeightMobile'  => array(
							'type' => 'number',
						),
						'authorLoadGoogleFonts'   => array(
							'type'    => 'boolean',
							'default' => false,
						),
						'ctaFontSizeType'         => array(
							'type'    => 'string',
							'default' => 'px',
						),
						'ctaFontSize'             => array(
							'type'    => 'number',
							'default' => '',
						),
						'ctaFontSizeTablet'       => array(
							'type' => 'number',
						),
						'ctaFontSizeMobile'       => array(
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
						'dateColor'               => array(
							'type'    => 'string',
							'default' => '#333',
						),
						'dateFontsizeType'        => array(
							'type'    => 'string',
							'default' => 'px',
						),
						'dateFontsize'            => array(
							'type'    => 'number',
							'default' => 12,
						),
						'dateFontsizeTablet'      => array(
							'type' => 'number',
						),
						'dateFontsizeMobile'      => array(
							'type' => 'number',
						),
						'dateFontFamily'          => array(
							'type'    => 'string',
							'default' => '',
						),
						'dateFontWeight'          => array(
							'type' => 'string',
						),
						'dateFontSubset'          => array(
							'type' => 'string',
						),
						'dateLineHeightType'      => array(
							'type'    => 'string',
							'default' => 'em',
						),
						'dateLineHeight'          => array(
							'type' => 'number',
						),
						'dateLineHeightTablet'    => array(
							'type' => 'number',
						),
						'dateLineHeightMobile'    => array(
							'type' => 'number',
						),
						'dateLoadGoogleFonts'     => array(
							'type'    => 'boolean',
							'default' => false,
						),
						'connectorBgsize'         => array(
							'type'    => 'number',
							'default' => 35,
						),
						'dateBottomspace'         => array(
							'type'    => 'number',
							'default' => 5,
						),
						'headFontSizeType'        => array(
							'type'    => 'string',
							'default' => 'px',
						),
						'headFontSize'            => array(
							'type' => 'number',
						),
						'headFontSizeTablet'      => array(
							'type' => 'number',
						),
						'headFontSizeMobile'      => array(
							'type' => 'number',
						),
						'headFontFamily'          => array(
							'type'    => 'string',
							'default' => '',
						),
						'headFontWeight'          => array(
							'type' => 'string',
						),
						'headFontSubset'          => array(
							'type' => 'string',
						),
						'headLineHeightType'      => array(
							'type'    => 'string',
							'default' => 'em',
						),
						'headLineHeight'          => array(
							'type' => 'number',
						),
						'headLineHeightTablet'    => array(
							'type' => 'number',
						),
						'headLineHeightMobile'    => array(
							'type' => 'number',
						),
						'headLoadGoogleFonts'     => array(
							'type'    => 'boolean',
							'default' => false,
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
						'dateFormat'              => array(
							'type'    => 'string',
							'default' => 'F j, Y',
						),
						'displayPostExcerpt'      => array(
							'type'    => 'boolean',
							'default' => true,
						),
						'displayPostAuthor'       => array(
							'type'    => 'boolean',
							'default' => true,
						),
						'displayPostImage'        => array(
							'type'    => 'boolean',
							'default' => true,
						),
						'displayPostLink'         => array(
							'type'    => 'boolean',
							'default' => true,
						),
						'exerptLength'            => array(
							'type'    => 'number',
							'default' => 15,
						),
						'postLayout'              => array(
							'type'    => 'string',
							'default' => 'grid',
						),
						'columns'                 => array(
							'type'    => 'number',
							'default' => 2,
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
						'imageSize'               => array(
							'type'    => 'string',
							'default' => 'large',
						),
						'readMoreText'            => array(
							'type'    => 'string',
							'default' => __( 'Read More', 'ultimate-addons-for-gutenberg' ),
						),
						'block_id'                => array(
							'type'    => 'string',
							'default' => 'not_set',
						),
						'icon'                    => array(
							'type'    => 'string',
							'default' => 'fab fa fa-calendar-alt',
						),
						'borderRadius'            => array(
							'type'    => 'number',
							'default' => 2,
						),
						'bgPadding'               => array(
							'type'    => 'number',
							'default' => 20,
						),
						'contentPadding'          => array(
							'type'    => 'number',
							'default' => 10,
						),
						'iconSize'                => array(
							'type'    => 'number',
							'default' => 15,
						),
						'ctaColor'                => array(
							'type'    => 'string',
							'default' => '#fff',
						),
						'ctaBackground'           => array(
							'type'    => 'string',
							'default' => '#333',
						),
						'stack'                   => array(
							'type'    => 'string',
							'default' => 'tablet',
						),
						'linkTarget'              => array(
							'type'    => 'boolean',
							'default' => false,
						),
						// Exclude Current Post.
						'excludeCurrentPost'      => array(
							'type'    => 'boolean',
							'default' => false,
						),
					),
					'render_callback' => array( $this, 'post_timeline_callback' ),
				)
			);
		}

		/**
		 * Renders the post grid block on server.
		 *
		 * @param array $attributes Array of block attributes.
		 *
		 * @since 0.0.1
		 */
		public function post_timeline_callback( $attributes ) {

			$attributes['post_type'] = 'timeline';

			$recent_posts = UAGB_Helper::get_query( $attributes, 'timeline' );

			$block_id = 'uagb-block-' . $attributes['block_id'];

			$animation_class = ( isset( $attributes['animationfield'] ) ) ? 'uag-animation-speed  uag-animation-' . $attributes['animationfield'] : '';

			$animation_hover_class = ( isset( $attributes['animationhoverfield'] ) ) ? 'uag-hover-animation-' . $attributes['animationhoverfield'] : '';

			$main_classes = array(
				$block_id,
				$animation_class,
				$animation_hover_class,
			);

			ob_start();
			?>
			<div class = "uagb-timeline__outer-wrap <?php echo esc_attr( implode( ' ', $main_classes ) ); ?>" >
				<div  class = "<?php echo esc_html( $this->get_classes( $attributes ) ); ?>" >
					<div class = "uagb-timeline-wrapper">
						<div class = "uagb-timeline__main">
							<?php
							if ( empty( $recent_posts ) ) {
								esc_html_e( 'No posts found', 'ultimate-addons-for-gutenberg' );
							} else {
								$this->get_post_html( $attributes, $recent_posts );
							}
							?>
							<div class = "uagb-timeline__line" >
								<div class = "uagb-timeline__line__inner"></div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<?php
			return ob_get_clean();
		}

		/**
		 * Renders the post timeline block on server.
		 *
		 * @param array  $attributes Array of block attributes.
		 *
		 * @param object $query WP_Query object.
		 * @since 0.0.1
		 */
		public function get_post_html( $attributes, $query ) {
			?>
			<div class = "uagb-timeline__days">
				<?php
				$index = 0;
				while ( $query->have_posts() ) {
					$query->the_post();
					global $post;
					$this->render_single( $attributes, $index, $post );
					$index++;
				}
				wp_reset_postdata();
				?>
			</div>
			<?php
		}

		/**
		 * Renders the post timeline single block.
		 *
		 * @param array  $attributes Array of block attributes.
		 * @param int    $index Index value of current post.
		 * @param object $post Current Post object.
		 *
		 * @since 0.0.1
		 */
		public function render_single( $attributes, $index, $post ) {

			$display_inner_date  = ( 'center' === $attributes['timelinAlignment'] ) ? true : false;
			$content_align_class = $this->get_align_classes( $attributes, $index );
			$day_align_class     = $this->get_day_align_classes( $attributes, $index );

			?>
			<article class = "uagb-timeline__field uagb-timeline__field-wrap">
				<div class = "<?php echo esc_html( $content_align_class ); ?>">
					<?php $this->get_icon( $attributes ); ?>
					<div class = "<?php echo esc_html( $day_align_class ); ?>" >
						<div class = "uagb-timeline__events-new">
							<div class ="uagb-timeline__events-inner-new">
								<div class = "uagb-timeline__date-hide uagb-timeline__date-inner" >
									<?php $this->get_date( $attributes, 'uagb-timeline__inner-date-new' ); ?>
								</div>

								<?php ( $attributes['displayPostImage'] ) ? $this->get_image( $attributes ) : ''; ?>

								<div class = "uagb-content" >
									<?php
										$this->get_title( $attributes );
										$this->get_author( $attributes, $post->post_author );
										$this->get_excerpt( $attributes );
										$this->get_cta( $attributes );
									?>
									<div class = "uagb-timeline__arrow"></div>
								</div>
							</div>
						</div>
					</div>
					<?php if ( $display_inner_date ) { ?>
						<div class = "uagb-timeline__date-new" >
						<?php $this->get_date( $attributes, 'uagb-timeline__date-new' ); ?>
						</div>
					<?php } ?>
				</div>
			</article>
			<?php
		}

		/**
		 * Function Name: get_icon.
		 *
		 * @param  array $attributes attribute array.
		 */
		public function get_icon( $attributes ) {
			?>
			<div class = "uagb-timeline__marker uagb-timeline__out-view-icon" >
				<span class = "uagb-timeline__icon-new uagb-timeline__out-view-icon" ><?php UAGB_Helper::render_svg_html( $attributes['icon'] ); ?></span>
			</div>
			<?php
		}

		/**
		 * Function Name: get_image.
		 *
		 * @param  array $attributes attribute array.
		 */
		public function get_image( $attributes ) {

			if ( ! get_the_post_thumbnail_url() ) {
				return;
			}

			$target = ( isset( $attributes['linkTarget'] ) && ( true === $attributes['linkTarget'] ) ) ? '_blank' : '_self';
			do_action( "uagb_single_post_before_featured_image_{$attributes['post_type']}", get_the_ID(), $attributes );
			?>
			<div class='uagb-timeline__image'>
				<a href="<?php echo esc_url( apply_filters( "uagb_single_post_link_{$attributes['post_type']}", get_the_permalink(), get_the_ID(), $attributes ) ); ?>" target="<?php echo esc_html( $target ); ?>" rel="noopener noreferrer"><?php echo wp_get_attachment_image( get_post_thumbnail_id(), $attributes['imageSize'] ); ?>
				</a>
			</div>
			<?php
			do_action( "uagb_single_post_after_featured_image_{$attributes['post_type']}", get_the_ID(), $attributes );
		}

		/**
		 * Function Name: get_date.
		 *
		 * @param  array  $attributes attribute array.
		 * @param  string $classname attribute string.
		 */
		public function get_date( $attributes, $classname ) {

			global $post;
			$post_id = $post->ID;
			if ( isset( $attributes['displayPostDate'] ) && $attributes['displayPostDate'] ) {
				?>
				<div datetime="<?php echo esc_attr( get_the_date( 'c', $post_id ) ); ?>" class="<?php echo esc_html( $classname ); ?>"><?php echo esc_html( get_the_date( $attributes['dateFormat'], $post_id ) ); ?></div>
				<?php
			}
		}

		/**
		 * Function Name: get_title.
		 *
		 * @param  array $attributes attribute array.
		 */
		public function get_title( $attributes ) {

			$target = ( isset( $attributes['linkTarget'] ) && ( true === $attributes['linkTarget'] ) ) ? '_blank' : '_self';

			$tag = $attributes['headingTag'];
			global $post;
			?>
			<div class = "uagb-timeline__heading-text" >
				<?php do_action( "uagb_single_post_before_title_{$attributes['post_type']}", get_the_ID(), $attributes ); ?>
				<<?php echo esc_html( $tag ); ?> class="uagb-timeline__heading" >
					<a href="<?php echo esc_url( apply_filters( "uagb_single_post_link_{$attributes['post_type']}", get_the_permalink(), get_the_ID(), $attributes ) ); ?>" target="<?php echo esc_html( $target ); ?>" rel="noopener noreferrer"><?php ( '' !== get_the_title( $post->ID ) ) ? the_title() : esc_html_e( 'Untitled', 'ultimate-addons-for-gutenberg' ); ?></a>
				</<?php echo esc_html( $tag ); ?>>
				<?php do_action( "uagb_single_post_after_title_{$attributes['post_type']}", get_the_ID(), $attributes ); ?>
			</div>
			<?php
		}

		/**
		 * Function Name: get_cta.
		 *
		 * @param  array $attributes attribute array.
		 */
		public function get_cta( $attributes ) {

			if ( ! $attributes['displayPostLink'] ) {
				return;
			}
			$target = ( isset( $attributes['linkTarget'] ) && ( true === $attributes['linkTarget'] ) ) ? '_blank' : '_self';
			do_action( "uagb_single_post_before_cta_{$attributes['post_type']}", get_the_ID(), $attributes );
			?>
			<div class="uagb-timeline__link_parent">
				<a class="uagb-timeline__link" href="<?php echo esc_url( apply_filters( "uagb_single_post_link_{$attributes['post_type']}", get_the_permalink(), get_the_ID(), $attributes ) ); ?>" target="<?php echo esc_html( $target ); ?>" rel=" noopener noreferrer"><?php echo esc_html( $attributes['readMoreText'] ); ?></a>
			</div>
			<?php
			do_action( "uagb_single_post_after_cta_{$attributes['post_type']}", get_the_ID(), $attributes );
		}

		/**
		 * Function get_author.
		 *
		 * @param  array $attributes attribute.
		 * @param  array $author attribute.
		 */
		public function get_author( $attributes, $author ) {

			$output = '';
			do_action( "uagb_single_post_before_meta_{$attributes['post_type']}", get_the_ID(), $attributes );
			if ( isset( $attributes['displayPostAuthor'] ) && $attributes['displayPostAuthor'] ) {
				?>
			<div class="uagb-timeline__author">
				<span class="dashicons-admin-users dashicons"></span>
				<a class="uagb-timeline__author-link" href="<?php echo esc_url( get_author_posts_url( $author ) ); ?>"><?php echo esc_html( get_the_author_meta( 'display_name', $author ) ); ?></a>
			</div>
				<?php
			}
			do_action( "uagb_single_post_after_meta_{$attributes['post_type']}", get_the_ID(), $attributes );
		}

		/**
		 * Function get_excerpt.
		 *
		 * @param  array $attributes attribute.
		 */
		public function get_excerpt( $attributes ) {

			if ( ! $attributes['displayPostExcerpt'] ) {
				return;
			}

			$excerpt = wp_trim_words( get_the_excerpt(), $attributes['exerptLength'] );
			if ( ! $excerpt ) {
				$excerpt = null;
			}

			$excerpt = apply_filters( "uagb_single_post_excerpt_{$attributes['post_type']}", $excerpt, get_the_ID(), $attributes );
			do_action( "uagb_single_post_before_excerpt_{$attributes['post_type']}", get_the_ID(), $attributes );
			?>
			<div class="uagb-timeline-desc-content">
				<?php echo wp_kses_post( $excerpt ); ?>
			</div>
			<?php
			do_action( "uagb_single_post_after_excerpt_{$attributes['post_type']}", get_the_ID(), $attributes );
		}

		/**
		 * Function Name: get_classes .
		 *
		 * @param  array $attributes array of setting.
		 * @return string             class name.
		 */
		public function get_classes( $attributes ) {

			// Arrow position.
			$classes = array();
			if ( isset( $attributes['arrowlinAlignment'] ) && '' !== $attributes['arrowlinAlignment'] ) {
				$classes[] = 'uagb-timeline__arrow-' . $attributes['arrowlinAlignment'];
			}
			// Alignmnet.
			if ( isset( $attributes['timelinAlignment'] ) && '' !== $attributes['timelinAlignment'] ) {
				$classes[] = 'uagb-timeline__' . $attributes['timelinAlignment'] . '-block';
			}

			if ( isset( $attributes['displayPostLink'] ) && '' !== $attributes['displayPostLink'] ) {
				$classes[] = 'uagb_timeline__cta-enable';
			}

			$classes[] = 'uagb-timeline__responsive-' . $attributes['stack'];
			$classes[] = 'uagb-timeline';
			$classes[] = 'uagb-timeline__content-wrap';

			return implode( ' ', $classes );
		}

		/**
		 * Function Name: get_align_classes description.
		 *
		 * @param array  $attributes attribute array.
		 * @param string $index_val  post index.
		 * @return string            output HTML/String.
		 */
		public function get_align_classes( $attributes, $index_val ) {

			$classes   = array();
			$classes[] = 'uagb-timeline__widget';
			if ( isset( $attributes['timelinAlignment'] ) && '' !== $attributes['timelinAlignment'] ) {
				if ( 'center' !== $attributes['timelinAlignment'] ) {
					$classes[] = 'uagb-timeline__' . $attributes['timelinAlignment'];
				} else {
					$classes[] = ( 0 === $index_val % 2 ) ? 'uagb-timeline__right' : 'uagb-timeline__left';
				}
			}

			return implode( ' ', $classes );
		}

		/**
		 * Function Name: get_day_align_classes description.
		 *
		 * @param array  $attributes attribute array.
		 * @param string $index_val  post index.
		 * @return string            output HTML/String.
		 */
		public function get_day_align_classes( $attributes, $index_val ) {

			$classes   = array();
			$classes[] = 'uagb-timeline__day-new';
			if ( isset( $attributes['timelinAlignment'] ) && '' !== $attributes['timelinAlignment'] ) {
				if ( 'center' === $attributes['timelinAlignment'] ) {
					$classes[] = ( 0 === $index_val % 2 ) ? 'uagb-timeline__day-right' : 'uagb-timeline__day-left';
				} else {
					$classes[] = 'uagb-timeline__day-' . $attributes['timelinAlignment'];
				}
			}

			return implode( ' ', $classes );
		}

	}

	/**
	 *  Prepare if class 'UAGB_Post_Timeline' exist.
	 *  Kicking this off by calling 'get_instance()' method
	 */
	UAGB_Post_Timeline::get_instance();
}
