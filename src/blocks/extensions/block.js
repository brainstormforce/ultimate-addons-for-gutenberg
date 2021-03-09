import UserConditionOptions from './condition-block';

const { __ } = wp.i18n

const AdvancedControlsBlock = wp.compose.createHigherOrderComponent((BlockEdit) => {

	return (props) => {
		
		const { Fragment } = wp.element;
		
		const { InspectorAdvancedControls } = wp.blockEditor;
		
		const { isSelected } = props;
		
		const blocks_name = props.name;

		const block_type = ['uagb/buttons-child','uagb/faq-child', 'uagb/icon-list-child', 'uagb/social-share-child', 'uagb/restaurant-menu-child' ];

		return (
			<Fragment>
				<BlockEdit {...props} />
					{isSelected && ! block_type.includes(blocks_name) && 'uagb' === uagb_blocks_info.category && blocks_name.includes('uagb') &&
						<InspectorAdvancedControls>
							<p className="components-base-control__help">{ __( "Below setting will only take effect once you are on the live page, and not while you're editing.", 'ultimate-addons-for-gutenberg' ) }</p> 
							{ UserConditionOptions( props ) }						
						</InspectorAdvancedControls>
					}
			</Fragment>
		);
	};
}, 'AdvancedControlsBlock');


wp.hooks.addFilter(
	'editor.BlockEdit',
	'uagb/advanced-control-block',
	AdvancedControlsBlock
);

function ApplyExtraClass(extraProps, blockType, attributes) {

	const { 
		UAGHideDesktop,
		UAGHideTab,
		UAGHideMob,
		UAGDisplayConditions,
	} = attributes;

	if ( 'responsiveVisibility' === UAGDisplayConditions ) {
		if ( UAGHideDesktop ) {	
			extraProps.className = extraProps.className + ' uag-hide-desktop';
		}
	
		if ( UAGHideTab ) {	
			extraProps.className = extraProps.className + ' uag-hide-tab';
		}
	
		if ( UAGHideMob ) {	
			extraProps.className = extraProps.className + ' uag-hide-mob';
		}
	}

	return extraProps;
}

wp.hooks.addFilter(
	'blocks.getSaveContent.extraProps',
	'uagb/apply-extra-class',
	ApplyExtraClass,
);