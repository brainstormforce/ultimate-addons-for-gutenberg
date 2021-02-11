<?php
/**
 * UAGB - Taxonomy-List
 *
 * @package UAGB
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

if ( ! class_exists( 'UAGB_Taxonomy_List' ) ) {

	/**
	 * Class UAGB_Taxonomy_List.
	 *
	 * @since 1.18.1
	 */
	class UAGB_Taxonomy_List {

		/**
		 * Member Variable
		 *
		 * @since 1.18.1
		 * @var instance
		 */
		private static $instance;

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
		 *
		 * @since 1.18.1
		 */
		public function __construct() {

			// Activation hook.
			add_action( 'init', array( $this, 'register_blocks' ) );
		}

		/**
		 * Registers the `uagb/taxonomy-list` block on server.
		 *
		 * @since 1.18.1
		 */
		public function register_blocks() {

			// Check if the register function exists.
			if ( ! function_exists( 'register_block_type' ) ) {
				return;
			}

			register_block_type(
				'uagb/taxonomy-list',
				array(
					'attributes'      => array(

						'block_id'              => array(
							'type' => 'string',
						),
						'postType'              => array(
							'type'    => 'string',
							'default' => 'post',
						),
						'taxonomyType'          => array(
							'type'    => 'string',
							'default' => 'category',
						),
						'categories'            => array(
							'type' => 'string',
						),
						'order'                 => array(
							'type'    => 'string',
							'default' => 'desc',
						),
						'orderBy'               => array(
							'type'    => 'string',
							'default' => 'date',
						),
						'postsToShow'           => array(
							'type'    => 'number',
							'default' => '8',
						),
						'layout'                => array(
							'type'    => 'string',
							'default' => 'grid',
						),
						'columns'               => array(
							'type'    => 'number',
							'default' => 3,
						),
						'tcolumns'              => array(
							'type'    => 'number',
							'default' => 2,
						),
						'mcolumns'              => array(
							'type'    => 'number',
							'default' => 1,
						),
						'noTaxDisplaytext'      => array(
							'type'    => 'string',
							'default' => __( 'Taxonomy Not Available.', 'ultimate-addons-for-gutenberg' ),
						),
						'boxShadowColor'        => array(
							'type' => 'string',
						),
						'boxShadowHOffset'      => array(
							'type'    => 'number',
							'default' => 0,
						),
						'boxShadowVOffset'      => array(
							'type'    => 'number',
							'default' => 0,
						),
						'boxShadowBlur'         => array(
							'type' => 'number',
						),
						'boxShadowSpread'       => array(
							'type' => 'number',
						),
						'boxShadowPosition'     => array(
							'type'    => 'string',
							'default' => 'outset',
						),
						'showCount'             => array(
							'type'    => 'boolean',
							'default' => true,
						),
						'showEmptyTaxonomy'     => array(
							'type'    => 'boolean',
							'default' => false,
						),
						'showhierarchy'         => array(
							'type'    => 'boolean',
							'default' => false,
						),

						// Color Attributes.
						'bgColor'               => array(
							'type'    => 'string',
							'default' => '#f5f5f5',
						),
						'titleColor'            => array(
							'type'    => 'string',
							'default' => '#3b3b3b',
						),
						'countColor'            => array(
							'type'    => 'string',
							'default' => '#777777',
						),
						'listTextColor'         => array(
							'type'    => 'string',
							'default' => '#3b3b3b',
						),
						'hoverlistTextColor'    => array(
							'type'    => 'string',
							'default' => '#3b3b3b',
						),
						'listStyleColor'        => array(
							'type'    => 'string',
							'default' => '#3b3b3b',
						),
						'hoverlistStyleColor'   => array(
							'type'    => 'string',
							'default' => '#3b3b3b',
						),

						// Spacing Attributes.
						'rowGap'                => array(
							'type'    => 'number',
							'default' => 20,
						),
						'columnGap'             => array(
							'type'    => 'number',
							'default' => 20,
						),
						'contentPadding'        => array(
							'type'    => 'number',
							'default' => 20,
						),
						'contentPaddingTablet'  => array(
							'type'    => 'number',
							'default' => 15,
						),
						'contentPaddingMobile'  => array(
							'type'    => 'number',
							'default' => 15,
						),
						'titleBottomSpace'      => array(
							'type'    => 'number',
							'default' => 15,
						),
						'listBottomMargin'      => array(
							'type'    => 'number',
							'default' => 10,
						),

						// ALignment Attributes.
						'alignment'             => array(
							'type'    => 'string',
							'default' => 'center',
						),

						// List Attributes.
						'listStyle'             => array(
							'type'    => 'string',
							'default' => 'disc',
						),
						'listDisplayStyle'      => array(
							'type'    => 'string',
							'default' => 'list',
						),

						// Seperator Attributes.
						'seperatorStyle'        => array(
							'type'    => 'string',
							'default' => 'none',
						),
						'seperatorWidth'        => array(
							'type'    => 'number',
							'default' => 100,
						),
						'seperatorThickness'    => array(
							'type'    => 'number',
							'default' => 1,
						),
						'seperatorColor'        => array(
							'type'    => 'string',
							'default' => '#b2b4b5',
						),

						// Grid Border attributes.
						'borderColor'           => array(
							'type'    => 'string',
							'default' => '#E0E0E0',
						),
						'borderThickness'       => array(
							'type'    => 'number',
							'default' => 1,
						),
						'borderRadius'          => array(
							'type'    => 'number',
							'default' => 0,
						),
						'borderStyle'           => array(
							'type'    => 'string',
							'default' => 'solid',
						),
						// Typograpghy attributes.
						'titleFontSize'         => array(
							'type' => 'number',
						),
						'titleFontSizeType'     => array(
							'type'    => 'string',
							'default' => 'px',
						),
						'titleFontSizeMobile'   => array(
							'type' => 'number',
						),
						'titleFontSizeTablet'   => array(
							'type' => 'number',
						),
						'titleFontFamily'       => array(
							'type'    => 'string',
							'default' => 'Default',
						),
						'titleFontWeight'       => array(
							'type' => 'string',
						),
						'titleFontSubset'       => array(
							'type' => 'string',
						),
						'titleLineHeightType'   => array(
							'type'    => 'string',
							'default' => 'em',
						),
						'titleLineHeight'       => array(
							'type' => 'number',
						),
						'titleLineHeightTablet' => array(
							'type' => 'number',
						),
						'titleLineHeightMobile' => array(
							'type' => 'number',
						),
						'titleLoadGoogleFonts'  => array(
							'type'    => 'boolean',
							'default' => false,
						),
						'countFontSize'         => array(
							'type' => 'number',
						),
						'countFontSizeType'     => array(
							'type'    => 'string',
							'default' => 'px',
						),
						'countFontSizeMobile'   => array(
							'type' => 'number',
						),
						'countFontSizeTablet'   => array(
							'type' => 'number',
						),
						'countFontFamily'       => array(
							'type'    => 'string',
							'default' => 'Default',
						),
						'countFontWeight'       => array(
							'type' => 'string',
						),
						'countFontSubset'       => array(
							'type' => 'string',
						),
						'countLineHeightType'   => array(
							'type'    => 'string',
							'default' => 'em',
						),
						'countLineHeight'       => array(
							'type' => 'number',
						),
						'countLineHeightTablet' => array(
							'type' => 'number',
						),
						'countLineHeightMobile' => array(
							'type' => 'number',
						),
						'countLoadGoogleFonts'  => array(
							'type'    => 'boolean',
							'default' => false,
						),

						'listFontSize'          => array(
							'type' => 'number',
						),
						'listFontSizeType'      => array(
							'type'    => 'string',
							'default' => 'px',
						),
						'listFontSizeMobile'    => array(
							'type' => 'number',
						),
						'listFontSizeTablet'    => array(
							'type' => 'number',
						),
						'listFontFamily'        => array(
							'type'    => 'string',
							'default' => 'Default',
						),
						'listFontWeight'        => array(
							'type' => 'string',
						),
						'listFontSubset'        => array(
							'type' => 'string',
						),
						'listLineHeightType'    => array(
							'type'    => 'string',
							'default' => 'em',
						),
						'listLineHeight'        => array(
							'type' => 'number',
						),
						'listLineHeightTablet'  => array(
							'type' => 'number',
						),
						'listLineHeightMobile'  => array(
							'type' => 'number',
						),
						'listLoadGoogleFonts'   => array(
							'type'    => 'boolean',
							'default' => false,
						),
					),
					'render_callback' => array( $this, 'render_html' ),
				)
			);
		}

		/**
		 * Render Grid HTML.
		 *
		 * @param array $attributes Array of block attributes.
		 *
		 * @since 1.18.1
		 */
		public function grid_html( $attributes ) {
			$block_id         = $attributes['block_id'];
			$postType         = $attributes['postType'];
			$taxonomyType     = $attributes['taxonomyType'];
			$layout           = $attributes['layout'];
			$seperatorStyle   = $attributes['seperatorStyle'];
			$noTaxDisplaytext = $attributes['noTaxDisplaytext'];
			$showCount        = $attributes['showCount'];

			if ( 'grid' === $layout ) {

				$pt            = get_post_type_object( $postType );
				$singular_name = $pt->labels->singular_name;

				$args              = array(
					'hide_empty' => ! $attributes['showEmptyTaxonomy'],
					'parent'     => 0,
				);
				$newcategoriesList = get_terms( $attributes['taxonomyType'], $args );

				foreach ( $newcategoriesList as $value ) {
					?>

					<div class="uagb-taxomony-box">
						<a class="uagb-tax-link" href= "<?php echo esc_url( get_term_link( $value->slug, $attributes['taxonomyType'] ) ); ?>">
							<h4 class="uagb-tax-title"><?php echo esc_attr( $value->name ); ?></h4>
							<?php if ( $showCount ) { ?>
								<div class="uagb-tax-count">
									<?php echo esc_attr( $value->count ); ?>
									<?php $countName = ( $value->count > 1 ) ? esc_attr( $singular_name ) . 's' : esc_attr( $singular_name ); ?>
									<?php echo esc_attr( apply_filters( 'uagb_taxonomy_count_text', $countName, $value->count ) ); ?>
									</div>
							<?php } ?>
						</a>
					</div>
					<?php
				}
			}
		}

		/**
		 * Render List HTML.
		 *
		 * @param array $attributes Array of block attributes.
		 *
		 * @since 1.18.1
		 */
		public function list_html( $attributes ) {
			$block_id         = $attributes['block_id'];
			$postType         = $attributes['postType'];
			$taxonomyType     = $attributes['taxonomyType'];
			$layout           = $attributes['layout'];
			$seperatorStyle   = $attributes['seperatorStyle'];
			$noTaxDisplaytext = $attributes['noTaxDisplaytext'];
			$showCount        = $attributes['showCount'];

			if ( 'list' === $layout ) {
				$pt            = get_post_type_object( $postType );
				$singular_name = $pt->labels->singular_name;

				$args = array(
					'hide_empty' => ! $attributes['showEmptyTaxonomy'],
					'parent'     => 0,
				);

				$newcategoriesList = get_terms( $attributes['taxonomyType'], $args );

				foreach ( $newcategoriesList as $key => $value ) {
					$child_arg_empty_tax                 = array(
						'hide_empty' => ! $attributes['showEmptyTaxonomy'],
						'parent'     => $value->term_id,
					);
					$child_cat_empty_tax                 = get_terms( $attributes['taxonomyType'], $child_arg_empty_tax );
					$child_cat_empty_tax_arr             = $child_cat_empty_tax ? $child_cat_empty_tax : '';
					$newcategoriesList[ $key ]->children = $child_cat_empty_tax_arr;
				}

				?>
				<?php if ( 'dropdown' !== $attributes['listDisplayStyle'] ) { ?>
					<ul class="uagb-list-wrap">
						<?php foreach ( $newcategoriesList as $key => $value ) { ?>
							<li class="uagb-tax-list">
								<div class="uagb-tax-link-wrap">
									<a class="uagb-tax-link" href="<?php echo esc_url( get_term_link( $value->slug, $attributes['taxonomyType'] ) ); ?>"><?php echo esc_attr( $value->name ); ?></a>
										<?php if ( $showCount ) { ?>
											<span class="uagb-tax-list-count"><?php echo ' (' . esc_attr( $value->count ) . ')'; ?></span>
										<?php } ?>
										<?php if ( $attributes['showhierarchy'] && ! empty( $newcategoriesList[ $key ]->children ) ) { ?>	
											<ul class="uagb-taxonomy-list-children">	
												<?php foreach ( $newcategoriesList[ $key ]->children as $value ) { ?>
													<li class="uagb-tax-list">
													<a class="uagb-tax-link" href="<?php echo esc_url( get_term_link( $value->slug, $attributes['taxonomyType'] ) ); ?>"><?php echo esc_attr( $value->name ); ?></a>	
													<?php if ( $showCount ) { ?>
														<span class="uagb-tax-list-count"><?php echo ' (' . esc_attr( $value->count ) . ')'; ?></span>
													<?php } ?>												
													</li>
												<?php } ?>
											</ul>			
										<?php } ?>										
								</div>
								<?php if ( 'none' !== $seperatorStyle ) { ?>
									<div class="uagb-tax-separator-wrap">
										<div class="uagb-tax-separator"></div>
									</div>
								<?php } ?>
							</li>
						<?php } ?>
					</ul>
				<?php } else { ?>
					<select class="uagb-list-dropdown-wrap" onchange="redirectToTaxonomyLink(this)">
						<option selected value=""> -- Select -- </option>
						<?php foreach ( $newcategoriesList as $key => $value ) { ?>
							<option value="<?php echo esc_url( get_term_link( $value->slug, $attributes['taxonomyType'] ) ); ?>" >
								<?php echo esc_attr( $value->name ); ?>
								<?php if ( $showCount ) { ?>
									<?php echo ' (' . esc_attr( $value->count ) . ')'; ?>
								<?php } ?>
							</option>
						<?php } ?>
					</select>
					<script type="text/javascript">
						function redirectToTaxonomyLink( selectedOption ) {       
							var selectedValue = selectedOption.value;
							if ( selectedValue ) {
								location.href = selectedValue;
							}						
						}
					</script>					
				<?php } ?>	
				<?php
			}
		}

		/**
		 * Render Taxonomy List HTML.
		 *
		 * @param array $attributes Array of block attributes.
		 *
		 * @since 1.18.1
		 */
		public function render_html( $attributes ) {

			$block_id         = $attributes['block_id'];
			$postType         = $attributes['postType'];
			$taxonomyType     = $attributes['taxonomyType'];
			$layout           = $attributes['layout'];
			$seperatorStyle   = $attributes['seperatorStyle'];
			$noTaxDisplaytext = $attributes['noTaxDisplaytext'];
			$showCount        = $attributes['showCount'];

			$animation_class = ( isset( $attributes['animationfield'] ) ) ? 'uag-animation-speed  uag-animation-' . $attributes['animationfield'] : '';

			$animation_hover_class = ( isset( $attributes['animationhoverfield'] ) ) ? 'uag-hover-animation-' . $attributes['animationhoverfield'] : '';

			$main_classes = array(
				'uagb-taxonomy__outer-wrap',
				'uagb-block-' . $block_id,
				$animation_class,
				$animation_hover_class,
			);

			$inner_classes = array(
				'uagb-taxonomy-wrap',
				'uagb-layout-' . $layout,
			);
			$args          = array(
				'hide_empty' => ! $attributes['showEmptyTaxonomy'],
			);

			if ( $taxonomyType && 'page' !== $postType ) {
				$newcategoriesList = get_terms( $taxonomyType, $args );
			}

			ob_start();

			?>
				<div class = "<?php echo esc_attr( implode( ' ', $main_classes ) ); ?>">
					<?php if ( ! empty( $newcategoriesList ) ) { ?>
						<div class = "<?php echo esc_attr( implode( ' ', $inner_classes ) ); ?>">
							<?php $this->grid_html( $attributes ); ?>
							<?php $this->list_html( $attributes ); ?>							
						</div>
					<?php } else { ?>
							<div class="uagb-tax-not-available"><?php echo esc_attr( $noTaxDisplaytext ); ?></div>
					<?php } ?>					
				</div>

			<?php
				return ob_get_clean();
		}
	}

	/**
	 *  Prepare if class 'UAGB_Taxonomy_List' exist.
	 *  Kicking this off by calling 'get_instance()' method
	 */
	UAGB_Taxonomy_List::get_instance();
}
