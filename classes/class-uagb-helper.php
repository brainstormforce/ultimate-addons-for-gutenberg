<?php
/**
 * UAGB Helper.
 *
 * @package UAGB
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

if ( ! class_exists( 'UAGB_Helper' ) ) {

	/**
	 * Class UAGB_Helper.
	 */
	final class UAGB_Helper {


		/**
		 * Member Variable
		 *
		 * @since 0.0.1
		 * @var instance
		 */
		private static $instance;

		/**
		 * Member Variable
		 *
		 * @since 0.0.1
		 * @var instance
		 */
		public static $block_list;






		/**
		 * Store Json variable
		 *
		 * @since 1.8.1
		 * @var instance
		 */
		public static $icon_json;

		/**
		 * Google fonts to enqueue
		 *
		 * @var array
		 */
		public static $gfonts = array();

		/**
		 *  Initiator
		 *
		 * @since 0.0.1
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

			require UAGB_DIR . 'classes/class-uagb-config.php';
			require UAGB_DIR . 'classes/class-uagb-block-helper.php';
			require UAGB_DIR . 'classes/class-uagb-block-js.php';

			self::$block_list = UAGB_Config::get_block_attributes();

			add_action( 'wp_head', array( $this, 'frontend_gfonts' ), 120 );

			add_action( 'wp_footer', array( $this, 'print_script' ), 1000 );
			add_filter( 'redirect_canonical', array( $this, 'override_canonical' ), 1, 2 );

		}

		/**
		 * Load the front end Google Fonts.
		 */
		public function frontend_gfonts() {

			if ( empty( self::$gfonts ) ) {
				return;
			}
			$show_google_fonts = apply_filters( 'uagb_blocks_show_google_fonts', true );
			if ( ! $show_google_fonts ) {
				return;
			}
			$link    = '';
			$subsets = array();
			foreach ( self::$gfonts as $key => $gfont_values ) {
				if ( ! empty( $link ) ) {
					$link .= '%7C'; // Append a new font to the string.
				}
				$link .= $gfont_values['fontfamily'];
				if ( ! empty( $gfont_values['fontvariants'] ) ) {
					$link .= ':';
					$link .= implode( ',', $gfont_values['fontvariants'] );
				}
				if ( ! empty( $gfont_values['fontsubsets'] ) ) {
					foreach ( $gfont_values['fontsubsets'] as $subset ) {
						if ( ! in_array( $subset, $subsets, true ) ) {
							array_push( $subsets, $subset );
						}
					}
				}
			}
			if ( ! empty( $subsets ) ) {
				$link .= '&amp;subset=' . implode( ',', $subsets );
			}
			if ( isset( $link ) && ! empty( $link ) ) {
				echo '<link href="//fonts.googleapis.com/css?family=' . esc_attr( str_replace( '|', '%7C', $link ) ) . '" rel="stylesheet">'; //phpcs:ignore WordPress.WP.EnqueuedResources.NonEnqueuedStylesheet
			}
		}


		/**
		 * Parse CSS into correct CSS syntax.
		 *
		 * @param array  $selectors The block selectors.
		 * @param string $id The selector ID.
		 * @since 0.0.1
		 */
		public static function generate_css( $selectors, $id ) {
			$styling_css = '';

			if ( empty( $selectors ) ) {
				return '';
			}

			foreach ( $selectors as $key => $value ) {

				$css = '';

				foreach ( $value as $j => $val ) {

					if ( 'font-family' === $j && 'Default' === $val ) {
						continue;
					}

					if ( ! empty( $val ) || 0 === $val ) {
						if ( 'font-family' === $j ) {
							$css .= $j . ': "' . $val . '";';
						} else {
							$css .= $j . ': ' . $val . ';';
						}
					}
				}

				if ( ! empty( $css ) ) {
					$styling_css     .= $id;
					$styling_css     .= $key . '{';
						$styling_css .= $css . '}';
				}
			}

			return $styling_css;
		}

		/**
		 * Get CSS value
		 *
		 * Syntax:
		 *
		 *  get_css_value( VALUE, UNIT );
		 *
		 * E.g.
		 *
		 *  get_css_value( VALUE, 'em' );
		 *
		 * @param string $value  CSS value.
		 * @param string $unit  CSS unit.
		 * @since 1.13.4
		 */
		public static function get_css_value( $value = '', $unit = '' ) {

			if ( '' == $value ) { // phpcs:ignore WordPress.PHP.StrictComparisons.LooseComparison
				return $value;
			}

			$css_val = '';

			if ( ! empty( $value ) ) {
				$css_val = esc_attr( $value ) . $unit;
			}

			return $css_val;
		}

		/**
		 * Adds Google fonts all blocks.
		 *
		 * @param array $load_google_font the blocks attr.
		 * @param array $font_family the blocks attr.
		 * @param array $font_weight the blocks attr.
		 * @param array $font_subset the blocks attr.
		 */
		public static function blocks_google_font( $load_google_font, $font_family, $font_weight, $font_subset ) {

			if ( true === $load_google_font ) {
				if ( ! array_key_exists( $font_family, self::$gfonts ) ) {
					$add_font                     = array(
						'fontfamily'   => $font_family,
						'fontvariants' => ( isset( $font_weight ) && ! empty( $font_weight ) ? array( $font_weight ) : array() ),
						'fontsubsets'  => ( isset( $font_subset ) && ! empty( $font_subset ) ? array( $font_subset ) : array() ),
					);
					self::$gfonts[ $font_family ] = $add_font;
				} else {
					if ( isset( $font_weight ) && ! empty( $font_weight ) && ! in_array( $font_weight, self::$gfonts[ $font_family ]['fontvariants'], true ) ) {
						array_push( self::$gfonts[ $font_family ]['fontvariants'], $font_weight );
					}
					if ( isset( $font_subset ) && ! empty( $font_subset ) && ! in_array( $font_subset, self::$gfonts[ $font_family ]['fontsubsets'], true ) ) {
						array_push( self::$gfonts[ $font_family ]['fontsubsets'], $font_subset );
					}
				}
			}
		}

		/**
		 * Get Buttons default array.
		 *
		 * @since 0.0.1
		 */
		public static function get_button_defaults() {

			$default = array();

			for ( $i = 1; $i <= 2; $i++ ) {
				$default[] = array(
					'size'             => '',
					'vPadding'         => 10,
					'hPadding'         => 14,
					'borderWidth'      => 1,
					'borderRadius'     => 2,
					'borderStyle'      => 'solid',
					'borderColor'      => '#333',
					'borderHColor'     => '#333',
					'color'            => '#333',
					'background'       => '',
					'hColor'           => '#333',
					'hBackground'      => '',
					'sizeType'         => 'px',
					'sizeMobile'       => '',
					'sizeTablet'       => '',
					'lineHeightType'   => 'em',
					'lineHeight'       => '',
					'lineHeightMobile' => '',
					'lineHeightTablet' => '',
				);
			}

			return $default;
		}

		/**
		 * Get Json Data.
		 *
		 * @since 1.8.1
		 * @return Array
		 */
		public static function backend_load_font_awesome_icons() {

			$json_file = UAGB_DIR . 'dist/blocks/uagb-controls/UAGBIcon.json';
			if ( ! file_exists( $json_file ) ) {
				return array();
			}

			// Function has already run.
			if ( null !== self::$icon_json ) {
				return self::$icon_json;
			}

			$str             = self::get_instance()->get_filesystem()->get_contents( $json_file );
			self::$icon_json = json_decode( $str, true );
			return self::$icon_json;
		}

		/**
		 * Generate SVG.
		 *
		 * @since 1.8.1
		 * @param  array $icon Decoded fontawesome json file data.
		 */
		public static function render_svg_html( $icon ) {
			$icon = str_replace( 'far', '', $icon );
			$icon = str_replace( 'fas', '', $icon );
			$icon = str_replace( 'fab', '', $icon );
			$icon = str_replace( 'fa-', '', $icon );
			$icon = str_replace( 'fa', '', $icon );
			$icon = sanitize_text_field( esc_attr( $icon ) );

			$json = self::backend_load_font_awesome_icons();
			$path = isset( $json[ $icon ]['svg']['brands'] ) ? $json[ $icon ]['svg']['brands']['path'] : $json[ $icon ]['svg']['solid']['path'];
			$view = isset( $json[ $icon ]['svg']['brands'] ) ? $json[ $icon ]['svg']['brands']['viewBox'] : $json[ $icon ]['svg']['solid']['viewBox'];
			if ( $view ) {
				$view = implode( ' ', $view );
			}
			?>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox= "<?php echo esc_html( $view ); ?>">
				<path d="<?php echo esc_html( $path ); ?>"></path>
			</svg>
			<?php
		}

		/**
		 *  Check MIME Type
		 *
		 *  @since 1.20.0
		 */
		public static function get_mime_type() {

			$allowed_types = get_allowed_mime_types();

			return ( array_key_exists( 'json', $allowed_types ) ) ? true : false;

		}

		/**
		 * Returns Query.
		 *
		 * @param array  $attributes The block attributes.
		 * @param string $block_type The Block Type.
		 * @since 1.8.2
		 */
		public static function get_query( $attributes, $block_type ) {

			// Block type is grid/masonry/carousel/timeline.
			$query_args = array(
				'posts_per_page'      => ( isset( $attributes['postsToShow'] ) ) ? $attributes['postsToShow'] : 6,
				'post_status'         => 'publish',
				'post_type'           => ( isset( $attributes['postType'] ) ) ? $attributes['postType'] : 'post',
				'order'               => ( isset( $attributes['order'] ) ) ? $attributes['order'] : 'desc',
				'orderby'             => ( isset( $attributes['orderBy'] ) ) ? $attributes['orderBy'] : 'date',
				'ignore_sticky_posts' => 1,
				'paged'               => 1,
			);

			if ( $attributes['excludeCurrentPost'] ) {
				$query_args['post__not_in'] = array( get_the_ID() );
			}

			if ( isset( $attributes['categories'] ) && '' !== $attributes['categories'] ) {
				$query_args['tax_query'][] = array(
					'taxonomy' => ( isset( $attributes['taxonomyType'] ) ) ? $attributes['taxonomyType'] : 'category',
					'field'    => 'id',
					'terms'    => $attributes['categories'],
					'operator' => 'IN',
				);
			}

			if ( 'grid' === $block_type && isset( $attributes['postPagination'] ) && true === $attributes['postPagination'] ) {

				if ( get_query_var( 'paged' ) ) {

					$paged = get_query_var( 'paged' );

				} elseif ( get_query_var( 'page' ) ) {

					$paged = get_query_var( 'page' );

				} else {

					$paged = 1;

				}
				$query_args['posts_per_page'] = $attributes['postsToShow'];
				$query_args['paged']          = $paged;

			}

			if ( 'masonry' === $block_type && isset( $attributes['paginationType'] ) && 'none' !== $attributes['paginationType'] && isset( $attributes['paged'] ) ) {

				$query_args['paged'] = $attributes['paged'];

			}

			$query_args = apply_filters( "uagb_post_query_args_{$block_type}", $query_args, $attributes );

			return new WP_Query( $query_args );
		}

		/**
		 * Get size information for all currently-registered image sizes.
		 *
		 * @global $_wp_additional_image_sizes
		 * @uses   get_intermediate_image_sizes()
		 * @link   https://codex.wordpress.org/Function_Reference/get_intermediate_image_sizes
		 * @since  1.9.0
		 * @return array $sizes Data for all currently-registered image sizes.
		 */
		public static function get_image_sizes() {

			global $_wp_additional_image_sizes;

			$sizes       = get_intermediate_image_sizes();
			$image_sizes = array();

			$image_sizes[] = array(
				'value' => 'full',
				'label' => esc_html__( 'Full', 'ultimate-addons-for-gutenberg' ),
			);

			foreach ( $sizes as $size ) {
				if ( in_array( $size, array( 'thumbnail', 'medium', 'medium_large', 'large' ), true ) ) {
					$image_sizes[] = array(
						'value' => $size,
						'label' => ucwords( trim( str_replace( array( '-', '_' ), array( ' ', ' ' ), $size ) ) ),
					);
				} else {
					$image_sizes[] = array(
						'value' => $size,
						'label' => sprintf(
							'%1$s (%2$sx%3$s)',
							ucwords( trim( str_replace( array( '-', '_' ), array( ' ', ' ' ), $size ) ) ),
							$_wp_additional_image_sizes[ $size ]['width'],
							$_wp_additional_image_sizes[ $size ]['height']
						),
					);
				}
			}

			$image_sizes = apply_filters( 'uagb_post_featured_image_sizes', $image_sizes );

			return $image_sizes;
		}

		/**
		 * Get Post Types.
		 *
		 * @since 1.11.0
		 * @access public
		 */
		public static function get_post_types() {

			$post_types = get_post_types(
				array(
					'public'       => true,
					'show_in_rest' => true,
				),
				'objects'
			);

			$options = array();

			foreach ( $post_types as $post_type ) {
				if ( 'product' === $post_type->name ) {
					continue;
				}

				if ( 'attachment' === $post_type->name ) {
					continue;
				}

				$options[] = array(
					'value' => $post_type->name,
					'label' => $post_type->label,
				);
			}

			return apply_filters( 'uagb_loop_post_types', $options );
		}

		/**
		 * Get all taxonomies.
		 *
		 * @since 1.11.0
		 * @access public
		 */
		public static function get_related_taxonomy() {

			$post_types = self::get_post_types();

			$return_array = array();

			foreach ( $post_types as $key => $value ) {
				$post_type = $value['value'];

				$taxonomies = get_object_taxonomies( $post_type, 'objects' );
				$data       = array();

				foreach ( $taxonomies as $tax_slug => $tax ) {
					if ( ! $tax->public || ! $tax->show_ui || ! $tax->show_in_rest ) {
						continue;
					}

					$data[ $tax_slug ] = $tax;

					$terms = get_terms( $tax_slug );

					$related_tax = array();

					if ( ! empty( $terms ) ) {
						foreach ( $terms as $t_index => $t_obj ) {
							$related_tax[] = array(
								'id'    => $t_obj->term_id,
								'name'  => $t_obj->name,
								'child' => get_term_children( $t_obj->term_id, $tax_slug ),
							);
						}
						$return_array[ $post_type ]['terms'][ $tax_slug ] = $related_tax;
					}
				}

				$return_array[ $post_type ]['taxonomy'] = $data;

			}

			return apply_filters( 'uagb_post_loop_taxonomies', $return_array );
		}

		/**
		 * Get all taxonomies list.
		 *
		 * @since 1.18.0
		 * @access public
		 */
		public static function get_taxonomy_list() {

			$post_types = self::get_post_types();

			$return_array = array();

			foreach ( $post_types as $key => $value ) {
				$post_type = $value['value'];

				$taxonomies = get_object_taxonomies( $post_type, 'objects' );
				$data       = array();

				$get_singular_name = get_post_type_object( $post_type );
				foreach ( $taxonomies as $tax_slug => $tax ) {
					if ( ! $tax->public || ! $tax->show_ui || ! $tax->show_in_rest ) {
						continue;
					}

					$data[ $tax_slug ] = $tax;

					$terms = get_terms( $tax_slug );

					$related_tax_terms = array();

					if ( ! empty( $terms ) ) {
						foreach ( $terms as $t_index => $t_obj ) {
							$related_tax_terms[] = array(
								'id'            => $t_obj->term_id,
								'name'          => $t_obj->name,
								'count'         => $t_obj->count,
								'link'          => get_term_link( $t_obj->term_id ),
								'singular_name' => $get_singular_name->labels->singular_name,
							);
						}

						$return_array[ $post_type ]['terms'][ $tax_slug ] = $related_tax_terms;
					}

					$newcategoriesList = get_terms(
						$tax_slug,
						array(
							'hide_empty' => true,
							'parent'     => 0,
						)
					);

					$related_tax = array();

					if ( ! empty( $newcategoriesList ) ) {
						foreach ( $newcategoriesList as $t_index => $t_obj ) {
							$child_arg     = array(
								'hide_empty' => true,
								'parent'     => $t_obj->term_id,
							);
							$child_cat     = get_terms( $tax_slug, $child_arg );
							$child_cat_arr = $child_cat ? $child_cat : null;
							$related_tax[] = array(
								'id'            => $t_obj->term_id,
								'name'          => $t_obj->name,
								'count'         => $t_obj->count,
								'link'          => get_term_link( $t_obj->term_id ),
								'singular_name' => $get_singular_name->labels->singular_name,
								'children'      => $child_cat_arr,
							);

						}

						$return_array[ $post_type ]['without_empty_taxonomy'][ $tax_slug ] = $related_tax;

					}

					$newcategoriesList_empty_tax = get_terms(
						$tax_slug,
						array(
							'hide_empty' => false,
							'parent'     => 0,
						)
					);

					$related_tax_empty_tax = array();

					if ( ! empty( $newcategoriesList_empty_tax ) ) {
						foreach ( $newcategoriesList_empty_tax as $t_index => $t_obj ) {
							$child_arg_empty_tax     = array(
								'hide_empty' => false,
								'parent'     => $t_obj->term_id,
							);
							$child_cat_empty_tax     = get_terms( $tax_slug, $child_arg_empty_tax );
							$child_cat_empty_tax_arr = $child_cat_empty_tax ? $child_cat_empty_tax : null;
							$related_tax_empty_tax[] = array(
								'id'            => $t_obj->term_id,
								'name'          => $t_obj->name,
								'count'         => $t_obj->count,
								'link'          => get_term_link( $t_obj->term_id ),
								'singular_name' => $get_singular_name->labels->singular_name,
								'children'      => $child_cat_empty_tax_arr,
							);
						}

						$return_array[ $post_type ]['with_empty_taxonomy'][ $tax_slug ] = $related_tax_empty_tax;

					}
				}
				$return_array[ $post_type ]['taxonomy'] = $data;

			}

			return apply_filters( 'uagb_taxonomies_list', $return_array );
		}

		/**
		 *  Get - RGBA Color
		 *
		 *  Get HEX color and return RGBA. Default return RGB color.
		 *
		 * @param  var   $color      Gets the color value.
		 * @param  var   $opacity    Gets the opacity value.
		 * @param  array $is_array Gets an array of the value.
		 * @since   1.11.0
		 */
		public static function hex2rgba( $color, $opacity = false, $is_array = false ) {

			$default = $color;

			// Return default if no color provided.
			if ( empty( $color ) ) {
				return $default;
			}

			// Sanitize $color if "#" is provided.
			if ( '#' === $color[0] ) {
				$color = substr( $color, 1 );
			}

			// Check if color has 6 or 3 characters and get values.
			if ( strlen( $color ) === 6 ) {
					$hex = array( $color[0] . $color[1], $color[2] . $color[3], $color[4] . $color[5] );
			} elseif ( strlen( $color ) === 3 ) {
					$hex = array( $color[0] . $color[0], $color[1] . $color[1], $color[2] . $color[2] );
			} else {
					return $default;
			}

			// Convert hexadec to rgb.
			$rgb = array_map( 'hexdec', $hex );

			// Check if opacity is set(rgba or rgb).
			if ( false !== $opacity && '' !== $opacity ) {
				if ( abs( $opacity ) >= 1 ) {
					$opacity = $opacity / 100;
				}
				$output = 'rgba(' . implode( ',', $rgb ) . ',' . $opacity . ')';
			} else {
				$output = 'rgb(' . implode( ',', $rgb ) . ')';
			}

			if ( $is_array ) {
				return $rgb;
			} else {
				// Return rgb(a) color string.
				return $output;
			}
		}

		/**
		 * Checks to see if the site has SSL enabled or not.
		 *
		 * @since 1.14.0
		 * @return bool
		 */
		public static function is_ssl() {
			if (
				is_ssl() ||
				( 0 === stripos( get_option( 'siteurl' ), 'https://' ) ) ||
				( isset( $_SERVER['HTTP_X_FORWARDED_PROTO'] ) && 'https' === $_SERVER['HTTP_X_FORWARDED_PROTO'] )
			) {
				return true;
			}
			return false;
		}

		/**
		 * Gives the paged Query var.
		 *
		 * @param Object $query Query.
		 * @return int $paged Paged Query var.
		 * @since 1.14.9
		 */
		public static function get_paged( $query ) {

			global $paged;

			// Check the 'paged' query var.
			$paged_qv = $query->get( 'paged' );

			if ( is_numeric( $paged_qv ) ) {
				return $paged_qv;
			}

			// Check the 'page' query var.
			$page_qv = $query->get( 'page' );

			if ( is_numeric( $page_qv ) ) {
				return $page_qv;
			}

			// Check the $paged global?
			if ( is_numeric( $paged ) ) {
				return $paged;
			}

			return 0;
		}
		/**
		 * Builds the base url.
		 *
		 * @param string $permalink_structure Premalink Structure.
		 * @param string $base Base.
		 * @since 1.14.9
		 */
		public static function build_base_url( $permalink_structure, $base ) {
			// Check to see if we are using pretty permalinks.
			if ( ! empty( $permalink_structure ) ) {

				if ( strrpos( $base, 'paged-' ) ) {
					$base = substr_replace( $base, '', strrpos( $base, 'paged-' ), strlen( $base ) );
				}

				// Remove query string from base URL since paginate_links() adds it automatically.
				// This should also fix the WPML pagination issue that was added since 1.10.2.
				if ( count( $_GET ) > 0 ) { // phpcs:ignore WordPress.Security.NonceVerification.Recommended
					$base = strtok( $base, '?' );
				}

				// Add trailing slash when necessary.
				if ( '/' === substr( $permalink_structure, -1 ) ) {
					$base = trailingslashit( $base );
				} else {
					$base = untrailingslashit( $base );
				}
			} else {
				$url_params = wp_parse_url( $base, PHP_URL_QUERY );

				if ( empty( $url_params ) ) {
					$base = trailingslashit( $base );
				}
			}

			return $base;
		}
		/**
		 * Returns the Paged Format.
		 *
		 * @param string $permalink_structure Premalink Structure.
		 * @param string $base Base.
		 * @since 1.14.9
		 */
		public static function paged_format( $permalink_structure, $base ) {

			$page_prefix = empty( $permalink_structure ) ? 'paged' : 'page';

			if ( ! empty( $permalink_structure ) ) {
				$format  = substr( $base, -1 ) !== '/' ? '/' : '';
				$format .= $page_prefix . '/';
				$format .= '%#%';
				$format .= substr( $permalink_structure, -1 ) === '/' ? '/' : '';
			} elseif ( empty( $permalink_structure ) || is_search() ) {
				$parse_url = wp_parse_url( $base, PHP_URL_QUERY );
				$format    = empty( $parse_url ) ? '?' : '&';
				$format   .= $page_prefix . '=%#%';
			}

			return $format;
		}

		/**
		 * Disable canonical on Single Post.
		 *
		 * @param  string $redirect_url  The redirect URL.
		 * @param  string $requested_url The requested URL.
		 * @since  1.14.9
		 * @return bool|string
		 */
		public function override_canonical( $redirect_url, $requested_url ) {

			global $wp_query;

			if ( is_array( $wp_query->query ) ) {

				if ( true === $wp_query->is_singular
					&& - 1 === $wp_query->current_post
					&& true === $wp_query->is_paged
				) {
					$redirect_url = false;
				}
			}

			return $redirect_url;
		}

		/**
		 * Get Typography Dynamic CSS.
		 *
		 * @param  array  $attr The Attribute array.
		 * @param  string $slug The field slug.
		 * @param  string $selector The selector array.
		 * @param  array  $combined_selectors The combined selector array.
		 * @since  1.15.0
		 * @return bool|string
		 */
		public static function get_typography_css( $attr, $slug, $selector, $combined_selectors ) {

			$typo_css_desktop = array();
			$typo_css_tablet  = array();
			$typo_css_mobile  = array();

			$already_selectors_desktop = ( isset( $combined_selectors['desktop'][ $selector ] ) ) ? $combined_selectors['desktop'][ $selector ] : array();
			$already_selectors_tablet  = ( isset( $combined_selectors['tablet'][ $selector ] ) ) ? $combined_selectors['tablet'][ $selector ] : array();
			$already_selectors_mobile  = ( isset( $combined_selectors['mobile'][ $selector ] ) ) ? $combined_selectors['mobile'][ $selector ] : array();

			$family_slug = ( '' === $slug ) ? 'fontFamily' : $slug . 'FontFamily';
			$weight_slug = ( '' === $slug ) ? 'fontWeight' : $slug . 'FontWeight';

			$l_ht_slug      = ( '' === $slug ) ? 'lineHeight' : $slug . 'LineHeight';
			$f_sz_slug      = ( '' === $slug ) ? 'fontSize' : $slug . 'FontSize';
			$l_ht_type_slug = ( '' === $slug ) ? 'lineHeightType' : $slug . 'LineHeightType';
			$f_sz_type_slug = ( '' === $slug ) ? 'fontSizeType' : $slug . 'FontSizeType';

			$typo_css_desktop[ $selector ] = array(
				'font-family' => $attr[ $family_slug ],
				'font-weight' => $attr[ $weight_slug ],
				'font-size'   => ( isset( $attr[ $f_sz_slug ] ) ) ? self::get_css_value( $attr[ $f_sz_slug ], $attr[ $f_sz_type_slug ] ) : '',
				'line-height' => ( isset( $attr[ $l_ht_slug ] ) ) ? self::get_css_value( $attr[ $l_ht_slug ], $attr[ $l_ht_type_slug ] ) : '',
			);

			$typo_css_desktop[ $selector ] = array_merge(
				$typo_css_desktop[ $selector ],
				$already_selectors_desktop
			);

			$typo_css_tablet[ $selector ] = array(
				'font-size'   => ( isset( $attr[ $f_sz_slug . 'Tablet' ] ) ) ? self::get_css_value( $attr[ $f_sz_slug . 'Tablet' ], $attr[ $f_sz_type_slug ] ) : '',
				'line-height' => ( isset( $attr[ $l_ht_slug . 'Tablet' ] ) ) ? self::get_css_value( $attr[ $l_ht_slug . 'Tablet' ], $attr[ $l_ht_type_slug ] ) : '',
			);

			$typo_css_tablet[ $selector ] = array_merge(
				$typo_css_tablet[ $selector ],
				$already_selectors_tablet
			);

			$typo_css_mobile[ $selector ] = array(
				'font-size'   => ( isset( $attr[ $f_sz_slug . 'Mobile' ] ) ) ? self::get_css_value( $attr[ $f_sz_slug . 'Mobile' ], $attr[ $f_sz_type_slug ] ) : '',
				'line-height' => ( isset( $attr[ $l_ht_slug . 'Mobile' ] ) ) ? self::get_css_value( $attr[ $l_ht_slug . 'Mobile' ], $attr[ $l_ht_type_slug ] ) : '',
			);

			$typo_css_mobile[ $selector ] = array_merge(
				$typo_css_mobile[ $selector ],
				$already_selectors_mobile
			);

			return array(
				'desktop' => array_merge(
					$combined_selectors['desktop'],
					$typo_css_desktop
				),
				'tablet'  => array_merge(
					$combined_selectors['tablet'],
					$typo_css_tablet
				),
				'mobile'  => array_merge(
					$combined_selectors['mobile'],
					$typo_css_mobile
				),
			);
		}

		/**
		 * Parse CSS into correct CSS syntax.
		 *
		 * @param array  $combined_selectors The combined selector array.
		 * @param string $id The selector ID.
		 * @since 1.15.0
		 */
		public static function generate_all_css( $combined_selectors, $id ) {

			return array(
				'desktop' => self::generate_css( $combined_selectors['desktop'], $id ),
				'tablet'  => self::generate_css( $combined_selectors['tablet'], $id ),
				'mobile'  => self::generate_css( $combined_selectors['mobile'], $id ),
			);
		}

	}

	/**
	 *  Prepare if class 'UAGB_Helper' exist.
	 *  Kicking this off by calling 'get_instance()' method
	 */
	UAGB_Helper::get_instance();
}

