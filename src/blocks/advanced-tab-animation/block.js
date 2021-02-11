const {
	SelectControl
} = wp.components

const { __ } = wp.i18n

const AdvancedAnimationControls = wp.compose.createHigherOrderComponent((BlockEdit) => {
	
	return (props) => {
		const { Fragment } = wp.element;
		const { InspectorAdvancedControls } = wp.blockEditor;
		const { attributes, setAttributes, isSelected } = props;
		const blocks_name = props.name;
		const block_type = ['uagb/buttons-child','uagb/faq-child', 'uagb/icon-list-child', 'uagb/social-share-child','uagb/restaurant-menu-child' ];

		return (
			<Fragment>
				<BlockEdit {...props} />
				{isSelected &&  ! block_type.includes(blocks_name) &&
					<InspectorAdvancedControls>
						<span className="components-base-control__help">
							{ __( "This setting will only take effect once you are on the live page, and not while you're editing.", 'ultimate-addons-for-gutenberg' ) }
						</span>
						<SelectControl
							label={ __( "Animation", 'ultimate-addons-for-gutenberg' ) }
							value={ attributes.animationfield }
							onChange={ ( value ) => setAttributes( { animationfield: value } ) }
							options={ [
								{ value: "none", label: __( "None", 'ultimate-addons-for-gutenberg' ) },
								{ value: "fadeInDown", label: __( "Fade In Down", 'ultimate-addons-for-gutenberg' ) },
								{ value: "fadeInUp", label: __( "Fade In Up", 'ultimate-addons-for-gutenberg' ) },
								{ value: "fadeIn", label: __( "Fade In", 'ultimate-addons-for-gutenberg' ) },
								{ value: "fadeInLeft", label: __( "Fade In Left", 'ultimate-addons-for-gutenberg' ) },
								{ value: "fadeInRight", label: __( "Fade In Right", 'ultimate-addons-for-gutenberg' ) },
								{ value: "lightSpeedIn", label: __( "Light Speed In", 'ultimate-addons-for-gutenberg' ) },
								{ value: "slideInDown", label: __( "Slide In Down", 'ultimate-addons-for-gutenberg' ) },
								{ value: "slideInLeft", label: __( "Slide In Left", 'ultimate-addons-for-gutenberg' ) },
								{ value: "slideInRight", label: __( "Slide In Right", 'ultimate-addons-for-gutenberg' ) },
								{ value: "slideInUp", label: __( "Slide In Up", 'ultimate-addons-for-gutenberg' ) },
								{ value: "bounceIn", label: __( "Bounce In", 'ultimate-addons-for-gutenberg' ) },
								{ value: "bounceDown", label: __( "Bounce Down", 'ultimate-addons-for-gutenberg' ) },
								{ value: "bounceLeft", label: __( "Bounce Left", 'ultimate-addons-for-gutenberg' ) },
								{ value: "bounceInRight", label: __( "Bounce In Right", 'ultimate-addons-for-gutenberg' ) },
								{ value: "bounceInUp", label: __( "Bounce In Up", 'ultimate-addons-for-gutenberg' ) },
								{ value: "rotateIn", label: __( "Rotate In", 'ultimate-addons-for-gutenberg' ) },
								{ value: "rotateInDownLeft", label: __( "Rotate In Down Left", 'ultimate-addons-for-gutenberg' ) },
							] } 
						/>
						<SelectControl
							label={ __( "Hover Animation", 'ultimate-addons-for-gutenberg' ) }
							value={ attributes.animationhoverfield }
							onChange={ ( value ) => setAttributes( { animationhoverfield: value } ) }
							options={ [
								{ value: "none", label: __( "None", 'ultimate-addons-for-gutenberg' ) },
								{ value: "push", label: __( "Push", 'ultimate-addons-for-gutenberg' ) },
								{ value: "pulse", label: __( "Pulse", 'ultimate-addons-for-gutenberg' ) },
								{ value: "bounce", label: __( "Bounce", 'ultimate-addons-for-gutenberg' ) },
								{ value: "pop", label: __( "Pop", 'ultimate-addons-for-gutenberg' ) },
								{ value: "grow", label: __( "Grow", 'ultimate-addons-for-gutenberg' ) },
								{ value: "pulse-grow", label: __( "Pulse Grow", 'ultimate-addons-for-gutenberg' ) },
								{ value: "pulse-shrink", label: __( "Pulse Shrink", 'ultimate-addons-for-gutenberg' ) },
							] }
						/>
					</InspectorAdvancedControls>
				}
			</Fragment>
		);
	};
}, 'AdvancedAnimationControls');
 
wp.hooks.addFilter(
	'editor.BlockEdit',
	'uagb/advanced-animation-control',
	AdvancedAnimationControls
);

function ApplyAnimateClass(extraProps, blockType, attributes) {
	
	const { 
		animationfield,
		animationhoverfield
	} = attributes;
	
	if ( animationfield && 'none' !== animationfield) {	
		extraProps.className = extraProps.className + ' uag-animation-' + animationfield;
		extraProps.className = extraProps.className + '  uag-animation-speed';
	}
	
	if ( animationhoverfield && 'none' !== animationhoverfield) {	
		extraProps.className = extraProps.className + ' uag-hover-animation-' + animationhoverfield;
	}

	return extraProps;
}

wp.hooks.addFilter(
	'blocks.getSaveContent.extraProps',
	'uagb/apply-animation-class',
	ApplyAnimateClass,
);
