<?php
/**
 * UAGB Table Of Contents block.
 *
 * @package UAGB
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

if ( ! class_exists( 'UAGB_Table_Of_Content' ) ) {


	/**
	 * Class UAGB_Table_Of_Content.
	 */
	class UAGB_Table_Of_Content {


		/**
		 * Member Variable
		 *
		 * @since 1.23.0
		 * @var instance
		 */
		private static $instance;


		/**
		 *  Initiator
		 *
		 * @since 1.23.0
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
			add_action( 'init', array( $this, 'register_table_of_contents' ) );
			add_action( 'save_post', array( $this, 'update_toc_meta' ), 10, 3 );
		}

		/**
		 * Delete toc meta.
		 *
		 * @access public
		 *
		 * @since 1.23.0
		 * @param int     $post_id Post ID.
		 * @param object  $post Post object.
		 * @param boolean $update Whether this is an existing post being updated.
		 */
		public function update_toc_meta( $post_id, $post, $update ) {
			delete_post_meta( $post_id, '_uagb_toc_heading_content' );
		}

		/**
		 * Extracts heading content, id, and level from the given post content.
		 *
		 * @since 1.23.0
		 * @access public
		 *
		 * @param string $content       The post content to extract headings from.
		 * @param int    $mapping_headers_array The page of the post where the headings are
		 *                              located.
		 *
		 * @return array The list of headings.
		 */
		public function table_of_contents_get_headings_from_content(
			$content,
			$mapping_headers_array
		) {

			/* phpcs:disable WordPress.NamingConventions.ValidVariableName.UsedPropertyNotSnakeCase */
			// Disabled because of PHP DOMDocument and DOMXPath APIs using camelCase.

			// Create a document to load the post content into.
			$doc = new DOMDocument();

			// Enable user error handling for the HTML parsing. HTML5 elements aren't
			// supported (as of PHP 7.4) and There's no way to guarantee that the markup
			// is valid anyway, so we're just going to ignore all errors in parsing.
			// Nested heading elements will still be parsed.
			// The lack of HTML5 support is a libxml2 issue:
			// https://bugzilla.gnome.org/show_bug.cgi?id=761534.
			libxml_use_internal_errors( true );

			// Parse the post content into an HTML document.
			$doc->loadHTML(
				// loadHTML expects ISO-8859-1, so we need to convert the post content to
				// that format. We use htmlentities to encode Unicode characters not
				// supported by ISO-8859-1 as HTML entities. However, this function also
				// converts all special characters like < or > to HTML entities, so we use
				// htmlspecialchars_decode to decode them.
				htmlspecialchars_decode(
					utf8_decode(
						htmlentities(
							'<html><body>' . $content . '</body></html>',
							ENT_COMPAT,
							'UTF-8',
							false
						)
					),
					ENT_COMPAT
				)
			);

			// We're done parsing, so we can disable user error handling. This also
			// clears any existing errors, which helps avoid a memory leak.
			libxml_use_internal_errors( false );

			// IE11 treats template elements like divs, so to avoid extracting heading
			// elements from them, we first have to remove them.
			// We can't use foreach directly on the $templates DOMNodeList because it's a
			// dynamic list, and removing nodes confuses the foreach iterator. So
			// instead, we convert the iterator to an array and then iterate over that.
			$templates = iterator_to_array(
				$doc->documentElement->getElementsByTagName( 'template' )
			);

			foreach ( $templates as $template ) {
				$template->parentNode->removeChild( $template );
			}

			$xpath = new DOMXPath( $doc );

			// Get all non-empty heading elements in the post content.
			$headings = iterator_to_array(
				$xpath->query(
					'//*[self::h1 or self::h2 or self::h3 or self::h4 or self::h5 or self::h6][text()!=""]'
				)
			);

			return array_map(
				function ( $heading ) use ( $mapping_headers_array ) {

					$exclude_heading = null;

					if ( isset( $heading->attributes ) ) {
						$class_name = $heading->attributes->getNamedItem( 'class' );
						if ( null !== $class_name && '' !== $class_name->value ) {
							$exclude_heading = $class_name->value;
						}
					}

					$mapping_header = 0;

					if ( 'uagb-toc-hide-heading' !== $exclude_heading ) {

						foreach ( $mapping_headers_array as $key => $value ) {

							if ( $mapping_headers_array[ $key ] ) {

								$mapping_header = ( $key + 1 );
							}

							if ( strval( $mapping_header ) === $heading->nodeName[1] ) {

								return array(
									// A little hacky, but since we know at this point that the tag will
									// be an h1-h6, we can just grab the 2nd character of the tag name
									// and convert it to an integer. Should be faster than conditionals.
									'level'   => (int) $heading->nodeName[1],
									'id'      => $this->clean( $heading->textContent ),
									'content' => $heading->textContent,
									'depth'   => intval( substr( $heading->tagName, 1 ) ),
								);
							}
						}
					}
				},
				$headings
			);
			/* phpcs:enable */
		}

		/**
		 * Clean up heading content.
		 *
		 * @since 1.23.0
		 * @access public
		 *
		 * @param string $string The post content to extract headings from.
		 *
		 * @return string $string.
		 */
		public function clean( $string ) {
			$string = str_replace( array( '‘', '’', '“', '”' ), '', $string );
			$string = str_replace( array( '$', '.', '+', '!', '*', '\'', '(', ')', ',' ), '', $string );
			$string = str_replace( array( '%', '{', '}', '|', '\\', '^', '~', '[', ']', '`' ), '', $string );
			$string = str_replace(
				array( '*', '\'', '(', ')', ';', '@', '&', '=', '+', '$', ',', '/', '?', '#', '[', ']' ),
				'',
				$string
			);
			$string = preg_replace( '/[\x00-\x1F\x7F]*/u', '', $string );
			$string = str_replace( array( '&amp;', '&nbsp;' ), ' ', $string );
			$string = str_replace( array( ':' ), '', $string );
			// Convert space characters to an `_` (underscore).
			$string = preg_replace( '/\s+/', '_', $string );
			// Replace multiple `-` (hyphen) with a single `-` (hyphen).
			$string = preg_replace( '/-+/', '-', $string );
			// Replace multiple `_` (underscore) with a single `_` (underscore).
			$string = preg_replace( '/_+/', '-', $string );
			// Remove trailing `-` and `_`.
			$string = trim( $string, '-_' );
			return strtolower( preg_replace( '/-+/', '-', $string ) ); // Replaces multiple hyphens with single one.
		}

		/**
		 * Gets the content, anchor, level, and page of headings from a post. Returns
		 * data from all headings in a paginated post if $current_page_only is false;
		 * otherwise, returns only data from headings on the current page being
		 * rendered.
		 *
		 * @since 1.23.0
		 * @access public
		 *
		 * @param int  $post_id           Id of the post to extract headings from.
		 * @param bool $current_page_only Whether to include headings from the entire
		 *                                post, or just those from the current page (if
		 *                                the post is paginated).
		 *
		 * @return array The list of headings.
		 */
		public function table_of_contents_get_headings(
			$post_id,
			$current_page_only
		) {

			return $this->table_of_contents_get_headings_from_content(
				get_post( $post_id )->post_content,
				$current_page_only['mappingHeaders']
			);
		}

		/**
		 * Converts a flat list of heading parameters to a hierarchical nested list
		 * based on each header's immediate parent's level.
		 *
		 * @since 1.23.0
		 * @access public
		 *
		 * @param array $heading_list Flat list of heading parameters to nest.
		 * @param int   $index        The current list index.
		 *
		 * @return array A hierarchical nested list of heading parameters.
		 */
		public function table_of_contents_linear_to_nested_heading_list(
			$heading_list,
			$index = 0
		) {
			$nested_heading_list = array();

			foreach ( $heading_list as $key => $heading ) {

				if ( ! is_null( $heading_list[ $key ] ) ) {

					$nested_heading_list[] = array(
						'heading'  => $heading,
						'index'    => $index + $key,
						'children' => null,
					);

				}
			}

			return $nested_heading_list;
		}

		/**
		 * Renders the heading list of the UAGB Table Of Contents block.
		 *
		 * @since 1.23.0
		 * @access public
		 *
		 * @param array  $nested_heading_list Nested list of heading data.
		 * @param string $page_url URL of the page the block belongs to.
		 * @param array  $attributes array of attributes.
		 *
		 * @return string The heading list rendered as HTML.
		 */
		public function table_of_contents_render_list(
			$nested_heading_list,
			$page_url,
			$attributes
		) {
			$toc           = '<ol class="uagb-toc__list">';
			$last_level    = '';
			$parent_level  = '';
			$first_level   = '';
			$current_depth = 0;
			$depth_array   = array(
				1 => 0,
				2 => 0,
				3 => 0,
				4 => 0,
				5 => 0,
				6 => 0,
			);

			foreach ( $nested_heading_list as $anchor => $heading ) {

				$level = $heading['heading']['level'];
				$title = $heading['heading']['content'];
				$id    = $heading['heading']['id'];

				if ( 0 === $anchor ) {
					$first_level = $level;
				}

				if ( $level < $first_level ) {
					continue;
				}

				if ( empty( $parent_level ) || $level < $parent_level ) {
					$parent_level = $level;
				}

				if ( ! empty( $last_level ) ) {

					if ( $level > $last_level ) {

						$toc .= '<ul class="uagb-toc__list">';
						$current_depth ++;
						$depth_array[ $level ] = $current_depth;

					} elseif ( $level === $last_level && $level !== $parent_level ) {

						$toc                  .= '<li class="uagb-toc__list">';
						$depth_array[ $level ] = $current_depth;

					} elseif ( $level < $last_level ) {

						$closing = absint( $current_depth - $depth_array[ $level ] );

						if ( $level > $parent_level ) {

							$toc          .= str_repeat( '</li></ul>', $closing );
							$current_depth = absint( $current_depth - $closing );

						} elseif ( $level === $parent_level ) {

							$toc .= str_repeat( '</li></ul>', $closing );
							$toc .= '</li>';
						}
					}
				}

				$toc       .= sprintf( '<li class="uagb-toc__list"><a href="#%s">%s</a>', esc_attr( $id ), $title );
				$last_level = $level;
			}

			$toc .= str_repeat( '</li></ul>', $current_depth );
			$toc .= '</ol>';
			return $toc;
		}

		/**
		 * Renders the UAGB Table Of Contents block.
		 *
		 * @since 1.23.0
		 * @access public
		 *
		 * @param  array    $attributes Block attributes.
		 * @param  string   $content    Block default content.
		 * @param  WP_Block $block      Block instance.
		 *
		 * @return string Rendered block HTML.
		 */
		public function render_table_of_contents( $attributes, $content, $block ) {

			global $post;

			if ( ! isset( $post->ID ) ) {
				return '';
			}

			$uagb_toc_heading_content = get_post_meta( $post->ID, '_uagb_toc_heading_content', true );

			if ( empty( $uagb_toc_heading_content ) ) {

				$uagb_toc_heading_content = $this->table_of_contents_get_headings(
					$post->ID,
					$attributes
				);

				update_post_meta( $post->ID, '_uagb_toc_heading_content', $uagb_toc_heading_content );

			}

			$mapping_header_func = function( $value ) {
				return $value;
			};

			$wrap = array(
				'wp-block-uagb-table-of-contents',
				'uagb-toc__align-' . $attributes['align'],
				'uagb-toc__columns-' . $attributes['tColumnsDesktop'],
				( ( true === $attributes['initialCollapse'] ) ? 'uagb-toc__collapse' : ' ' ),
				'uagb-block-' . $attributes['block_id'],
				( isset( $attributes['className'] ) ) ? $attributes['className'] : '',
			);

			ob_start();
			?>
				<div class="<?php echo esc_html( implode( ' ', $wrap ) ); ?>" 
					data-scroll= "<?php echo esc_attr( $attributes['smoothScroll'] ); ?>"
					data-offset= "<?php echo esc_attr( $attributes['smoothScrollOffset'] ); ?>"
					data-delay= "<?php echo esc_attr( $attributes['smoothScrollDelay'] ); ?>"
				>
				<div class="uagb-toc__wrap">
					<div class="uagb-toc__title-wrap">
						<div class="uagb-toc__title">
							<?php echo wp_kses_post( $attributes['headingTitle'] ); ?>
						</div>
						<?php
						if ( $attributes['makeCollapsible'] && $attributes['icon'] ) {
							?>
							<span class="uag-toc__collapsible-wrap"><?php UAGB_Helper::render_svg_html( $attributes['icon'] ); ?></span>
							<?php
						}
						?>
					</div>
					<?php if ( $uagb_toc_heading_content && count( $uagb_toc_heading_content ) > 0 && count( array_filter( $attributes['mappingHeaders'], $mapping_header_func ) ) > 0 ) { ?>
					<div class="uagb-toc__list-wrap">
						<?php
							echo wp_kses_post(
								$this->table_of_contents_render_list(
									$this->table_of_contents_linear_to_nested_heading_list( $uagb_toc_heading_content ),
									get_permalink( $post->ID ),
									$attributes
								)
							);
						?>
					</div>
					<?php } else { ?> 
						<p class='uagb_table-of-contents-placeholder'>
						<?php echo esc_html( $attributes['emptyHeadingTeaxt'] ); ?>
						</p>
					<?php } ?>
				</div>
				</div>
			<?php

			return ob_get_clean();
		}

		/**
		 * Registers the UAGB Table Of Contents block.
		 *
		 * @since 1.23.0
		 * @access public
		 *
		 * @uses render_table_of_contents()
		 *
		 * @throws WP_Error An exception parsing the block definition.
		 */
		public function register_table_of_contents() {
			$mapping_headers_array = array_fill_keys( array( 0, 1, 2, 3, 4, 5 ), true );

					register_block_type(
						'uagb/table-of-contents',
						array(
							'attributes'      => array_merge(
								array(
									'block_id'             => array(
										'type'    => 'string',
										'default' => 'not_set',
									),
									'classMigrate'         => array(
										'type'    => 'boolean',
										'default' => false,
									),
									'headingTitleString'   => array(
										'type' => 'string',
									),
									'disableBullets'       => array(
										'type'    => 'boolean',
										'default' => false,
									),
									'makeCollapsible'      => array(
										'type'    => 'boolean',
										'default' => false,
									),
									'initialCollapse'      => array(
										'type'    => 'boolean',
										'default' => false,
									),
									'icon'                 => array(
										'type'    => 'string',
										'default' => 'fa-angle-down',
									),
									'iconSize'             => array(
										'type' => 'number',
									),
									'iconColor'            => array(
										'type' => 'string',
									),
									'bulletColor'          => array(
										'type' => 'string',
									),
									'align'                => array(
										'type'    => 'string',
										'default' => 'left',
									),
									'heading'              => array(
										'type'     => 'string',
										'selector' => '.uagb-toc__title',
										'default'  => __( 'Table Of Contents', 'ultimate-addons-for-gutenberg' ),
									),
									'headingTitle'         => array(
										'type'    => 'string',
										'default' => __( 'Table Of Contents', 'ultimate-addons-for-gutenberg' ),
									),
									'icon'                 => array(
										'type'    => 'string',
										'default' => 'fa-angle-down',
									),
									'smoothScroll'         => array(
										'type'    => 'boolean',
										'default' => true,
									),
									'smoothScrollDelay'    => array(
										'type'    => 'number',
										'default' => 800,
									),
									'smoothScrollOffset'   => array(
										'type'    => 'number',
										'default' => 30,
									),
									'scrollToTop'          => array(
										'type'    => 'boolean',
										'default' => false,
									),
									'scrollToTopColor'     => array(
										'type' => 'string',
									),
									'scrollToTopBgColor'   => array(
										'type' => 'string',
									),
									'tColumnsDesktop'      => array(
										'type'    => 'number',
										'default' => 1,
									),
									'tColumnsTablet'       => array(
										'type'    => 'number',
										'default' => 1,
									),
									'tColumnsMobile'       => array(
										'type'    => 'number',
										'default' => 1,
									),
									'mappingHeaders'       => array(
										'type'    => 'array',
										'default' => $mapping_headers_array,
									),
									// Color.
									'backgroundColor'      => array(
										'type'    => 'string',
										'default' => '#eee',
									),
									'linkColor'            => array(
										'type'    => 'string',
										'default' => '#333',
									),
									'linkHoverColor'       => array(
										'type' => 'string',
									),
									'headingColor'         => array(
										'type' => 'string',
									),

									// Padding.
									'vPaddingDesktop'      => array(
										'type'    => 'number',
										'default' => 30,
									),
									'hPaddingDesktop'      => array(
										'type'    => 'number',
										'default' => 30,
									),
									'vPaddingTablet'       => array(
										'type' => 'number',
									),
									'hPaddingTablet'       => array(
										'type' => 'number',
									),
									'vPaddingMobile'       => array(
										'type' => 'number',
									),
									'hPaddingMobile'       => array(
										'type' => 'number',
									),
									// Margin.
									'vMarginDesktop'       => array(
										'type' => 'number',
									),
									'hMarginDesktop'       => array(
										'type' => 'number',
									),
									'vMarginTablet'        => array(
										'type' => 'number',
									),
									'hMarginTablet'        => array(
										'type' => 'number',
									),
									'vMarginMobile'        => array(
										'type' => 'number',
									),
									'hMarginMobile'        => array(
										'type' => 'number',
									),
									'marginTypeDesktop'    => array(
										'type'    => 'string',
										'default' => 'px',
									),
									'marginTypeTablet'     => array(
										'type'    => 'string',
										'default' => 'px',
									),
									'marginTypeMobile'     => array(
										'type'    => 'string',
										'default' => 'px',
									),
									'headingBottom'        => array(
										'type' => 'number',
									),
									'paddingTypeDesktop'   => array(
										'type'    => 'string',
										'default' => 'px',
									),
									'paddingTypeTablet'    => array(
										'type'    => 'string',
										'default' => 'px',
									),
									'paddingTypeMobile'    => array(
										'type'    => 'string',
										'default' => 'px',
									),

									// Content Padding.
									'contentPaddingDesktop' => array(
										'type' => 'number',
									),
									'contentPaddingTablet' => array(
										'type' => 'number',
									),
									'contentPaddingMobile' => array(
										'type' => 'number',
									),
									'contentPaddingTypeDesktop' => array(
										'type'    => 'string',
										'default' => 'px',
									),
									'contentPaddingTypeTablet' => array(
										'type'    => 'string',
										'default' => 'px',
									),
									'contentPaddingTypeMobile' => array(
										'type'    => 'string',
										'default' => 'px',
									),

									// Border.
									'borderStyle'          => array(
										'type'    => 'string',
										'default' => 'solid',
									),
									'borderWidth'          => array(
										'type'    => 'number',
										'default' => 1,
									),
									'borderRadius'         => array(
										'type' => 'number',
									),
									'borderColor'          => array(
										'type'    => 'string',
										'default' => '#333',
									),

									// Typography.
									// Link Font Family.
									'loadGoogleFonts'      => array(
										'type'    => 'boolean',
										'default' => false,
									),
									'fontFamily'           => array(
										'type'    => 'string',
										'default' => 'Default',
									),
									'fontWeight'           => array(
										'type' => 'string',
									),
									'fontSubset'           => array(
										'type' => 'string',
									),
									// Link Font Size.
									'fontSize'             => array(
										'type' => 'number',
									),
									'fontSizeType'         => array(
										'type'    => 'string',
										'default' => 'px',
									),
									'fontSizeTablet'       => array(
										'type' => 'number',
									),
									'fontSizeMobile'       => array(
										'type' => 'number',
									),
									// Link Line Height.
									'lineHeightType'       => array(
										'type'    => 'string',
										'default' => 'em',
									),
									'lineHeight'           => array(
										'type' => 'number',
									),
									'lineHeightTablet'     => array(
										'type' => 'number',
									),
									'lineHeightMobile'     => array(
										'type' => 'number',
									),

									// Link Font Family.
									'headingLoadGoogleFonts' => array(
										'type'    => 'boolean',
										'default' => false,
									),
									'headingFontFamily'    => array(
										'type'    => 'string',
										'default' => 'Default',
									),
									'headingFontWeight'    => array(
										'type'    => 'string',
										'default' => '500',
									),
									'headingFontSubset'    => array(
										'type' => 'string',
									),
									// Link Font Size.
									'headingFontSize'      => array(
										'type'    => 'number',
										'default' => 20,
									),
									'headingFontSizeType'  => array(
										'type'    => 'string',
										'default' => 'px',
									),
									'headingFontSizeTablet' => array(
										'type' => 'number',
									),
									'headingFontSizeMobile' => array(
										'type' => 'number',
									),
									// Link Line Height.
									'headingLineHeightType' => array(
										'type'    => 'string',
										'default' => 'em',
									),
									'headingLineHeight'    => array(
										'type' => 'number',
									),
									'headingLineHeightTablet' => array(
										'type' => 'number',
									),
									'headingLineHeightMobile' => array(
										'type' => 'number',
									),
									'headingAlignment'     => array(
										'type'    => 'string',
										'default' => 'left',
									),
									'emptyHeadingTeaxt'    => array(
										'type'    => 'string',
										'default' => __( 'Add a header to begin generating the table of contents', 'ultimate-addons-for-gutenberg' ),
									),
								)
							),
							'render_callback' => array( $this, 'render_table_of_contents' ),
						)
					);
		}

	}

	/**
	 *  Prepare if class 'UAGB_Table_Of_Content' exist.
	 *  Kicking this off by calling 'get_instance()' method
	 */
	UAGB_Table_Of_Content::get_instance();
}
