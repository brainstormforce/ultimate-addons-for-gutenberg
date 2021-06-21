import { __ } from '@wordpress/i18n';

const { Fragment } = wp.element;
const { InspectorAdvancedControls } = wp.blockEditor;
const {
    ToggleControl
} = wp.components;
const enableMasonryGallery = uagb_blocks_info.enableMasonryGallery;

const MasonryGallery = wp.compose.createHigherOrderComponent((BlockEdit) => {

	return (props) => {
		const { attributes, setAttributes, isSelected } = props;
		const blockName = props.name;
		const blockType = [ 'core/gallery' ];
		return (
			<Fragment>
				<BlockEdit {...props} />
				{isSelected && blockType.includes(blockName) &&
					<InspectorAdvancedControls>
						<hr />
						<p><strong>{ __( "Masonry Gallery", 'ultimate-addons-for-gutenberg' ) }</strong></p>
						<p className="components-base-control__help">{ __( "Below setting will only take effect once you are on the live page, and not while you're editing.", 'ultimate-addons-for-gutenberg' ) }</p> 
						<ToggleControl
							label={ __('Enable Masonry Layout')}
							checked={attributes.masonry}
							onChange={(value) => setAttributes({ masonry: !attributes.masonry })}
						/>
						<hr />			
					</InspectorAdvancedControls>
				}
			</Fragment>
		);
	};
}, 'MasonryGallery');

if ( enableMasonryGallery ) {
	wp.hooks.addFilter(
		'editor.BlockEdit',
		'uagb/masonry-gallery',
		MasonryGallery,
	);
}