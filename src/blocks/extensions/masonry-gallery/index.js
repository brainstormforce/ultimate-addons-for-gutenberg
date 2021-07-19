import { __ } from '@wordpress/i18n';
import { Fragment } from "@wordpress/element";
import { InspectorControls } from "@wordpress/block-editor";
import { ToggleControl, PanelBody, RangeControl } from "@wordpress/components";
import { createHigherOrderComponent } from "@wordpress/compose";
import { addFilter } from "@wordpress/hooks";
const { enableMasonryGallery } = uagb_blocks_info;
import generateCSSUnit from "@Controls/generateCSSUnit"
import generateCSS from "@Controls/generateCSS"

const MasonryGallery = createHigherOrderComponent((BlockEdit) => {

	return (props) => {
		const { attributes, setAttributes, isSelected } = props;
		const blockName = props.name;
		const blockType = [ 'core/gallery' ];

		/**
		 * Generates CSS for the given values for editor.
		 */
		const applyCSS = () => {
			const colCount = ( attributes.columns ) ? attributes.columns : 3;
			const selectors = {
				".wp-block-gallery ul.blocks-gallery-grid" : {
					"column-gap" : generateCSSUnit( attributes.masonryGutter, 'px' ),
					"column-count" : colCount
				},
				".wp-block-gallery ul.blocks-gallery-grid li.blocks-gallery-item" : {
					"margin-bottom" : generateCSSUnit( attributes.masonryGutter, 'px' )
				},
			}
			const styling = generateCSS( selectors, '#block-' + props.clientId );
			if ( attributes.masonry ) {
				let element = document.getElementById( "uag-gallery-masonry-style-" + props.clientId.substr( 0, 8 ) )
				if( null !== element && undefined !== element ) {
					element.innerHTML = styling;
				} else {
					const style = document.createElement( "style" )
					style.setAttribute( "id", "uag-gallery-masonry-style-" + props.clientId.substr( 0, 8 ) )
					style.innerHTML = styling;
					document.head.appendChild( style )
				}
			}
		}

		/**
		 * Update the Masonry flag.
		 * @param {bool} value 
		 */
		const update = ( value ) => {
			if ( value ) {
				setAttributes({ className: 'uag-masonry' })
			} else {
				let classNameList = attributes.className;
				classNameList = classNameList.replace( "uag-masonry", "" );
				setAttributes({ className: classNameList })
			}
			setAttributes({ masonry: !attributes.masonry })
			setAttributes({ block_id: props.clientId.substr( 0, 8 ) })
		}

		/**
		 * Gutter value for the Masonry layout
		 * @param {int} value
		 */
		const applyGutter = ( value ) => {
			if ( undefined === value ) {
				return;
			}
			setAttributes( { masonryGutter: value } )
			applyCSS();
		}

		applyCSS();
		
		return (
			<Fragment>
				<BlockEdit {...props} />
				{isSelected && blockType.includes(blockName) && attributes.ids && attributes.ids.length !== 0 &&
					<InspectorControls>
						<PanelBody title={ __( "Masonry Gallery", 'ultimate-addons-for-gutenberg' ) } initialOpen={ false }>
							<ToggleControl
								label={ __('Enable Masonry Layout')}
								checked={attributes.masonry}
								onChange={(value) => update( value )}
							/>
							{ attributes.masonry &&
								<RangeControl
									label={ __( "Gap", 'ultimate-addons-for-gutenberg' ) }
									value={ attributes.masonryGutter }
									onChange={ ( value ) => applyGutter( value ) }
									min={ 0 }
									max={ 100 }
									allowReset
								/>
							}
						</PanelBody>	
					</InspectorControls>
				}
			</Fragment>
		);
	};
}, 'MasonryGallery');

function ApplyUniqueClass(extraProps, blockType, attributes) {

	if ( 'core/gallery' === blockType.name && attributes.masonry ) {
		extraProps.className = extraProps.className + ' uagb-block-' + attributes.block_id;
	}

	return extraProps;
}

if ( '1' === enableMasonryGallery ) {
	addFilter(
		'editor.BlockEdit',
		'uagb/masonry-gallery',
		MasonryGallery,
		999
	);

	addFilter(
        'blocks.getSaveContent.extraProps',
        'uagb/apply-extra-class',
        ApplyUniqueClass,
    );
}