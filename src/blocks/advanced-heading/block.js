/**
 * BLOCK: Advanced Heading
 */

import classnames from "classnames"
import UAGB_Block_Icons from "../../../dist/blocks/uagb-controls/block-icons"
import attributes from "./attributes"
import edit from "./edit"
import "./style.scss"

const { __ } = wp.i18n

const {
	registerBlockType,
	createBlock
} = wp.blocks

const {
	RichText
} = wp.editor

export const DYNAMIC_HEADING_TITLE = 'headingTitle';
export const DYNAMIC_HEADING_DESC = 'headingDesc';


registerBlockType( "uagb/advanced-heading", {

	title: uagb_blocks_info.blocks["uagb/advanced-heading"]["title"],
	description: uagb_blocks_info.blocks["uagb/advanced-heading"]["description"],
	icon: UAGB_Block_Icons.advanced_heading,
	keywords: [
		__( "advanced heading" ),
		__( "uag" ),
		__( "heading" ),
	],
	category: uagb_blocks_info.category,
	attributes,
	transforms: {
		from: [
			{
				type: "block",
				blocks: [ "core/paragraph" ],
				transform: ( { content } ) => {
					return createBlock( "uagb/advanced-heading", {
						headingDesc: content,
					} )
				},
			},
			{
				type: "block",
				blocks: [ "core/heading" ],
				transform: ( { content } ) => {
					return createBlock( "uagb/advanced-heading", {
						headingTitle: content,
						headingTag: "h3",
					} )
				},
			},
		],
		to: [
			{
				type: "block",
				blocks: [ "core/paragraph" ],
				transform: ( { content } ) => {
					return createBlock( "core/paragraph", {
						content,
					} )
				},
			},
			{
				type: "block",
				blocks: [ "core/heading" ],
				transform: ( { content } ) => {
					return createBlock( "core/heading", {
						content: content,
					} )
				},
			},
		],
	},
	edit,
	save: function( props ) {

		const {
			block_id,
			headingTitle,
			headingDesc,
			headingTag,
			seperatorStyle,
			headingId
		} = props.attributes

		const dynamicHeadingTitle = props.attributes.dynamic && props.attributes.dynamic[ DYNAMIC_HEADING_TITLE ] ? props.attributes.dynamic[ DYNAMIC_HEADING_TITLE ] : {};
		const dynamicHeadingDesc = props.attributes.dynamic && props.attributes.dynamic[ DYNAMIC_HEADING_DESC ] ? props.attributes.dynamic[ DYNAMIC_HEADING_DESC ] : {};
		const headingTitleOrShortcode = ToolsetDynamicSources.getShortcodeOrStatic( dynamicHeadingTitle, headingTitle, { repeatableFieldShowOnly: 'first' } );
		const headingDescOrShortcode = ToolsetDynamicSources.getShortcodeOrStatic( dynamicHeadingDesc, headingDesc, { repeatableFieldShowOnly: 'first' } );


		var seprator_output =  ""
		if( seperatorStyle !== "none" ){
			seprator_output = <div className="uagb-separator-wrap" ><div className="uagb-separator"></div></div>
		}
		return (
			<div className={ props.className } id={ `uagb-adv-heading-${block_id}` }>
				<RichText.Content
					tagName={ headingTag }
					value={ headingTitleOrShortcode }
					className='uagb-heading-text'	
					id = { headingId }				
				/>
				{seprator_output}
				<RichText.Content
					tagName="p"
					value={ headingDescOrShortcode }
					className='uagb-desc-text'					
				/>
			</div>
		)
	},
	deprecated: [
		{
			attributes,			
			save: function( props ) {

				const {
					block_id,
					headingTitle,
					headingDesc,
					headingTag,
					seperatorStyle
				} = props.attributes

				var seprator_output =  ""
				if( seperatorStyle !== "none" ){
					seprator_output = <div className="uagb-separator-wrap" ><div className="uagb-separator"></div></div>
				}
				return (
					<div className={ props.className } id={ `uagb-adv-heading-${block_id}` }>
						<RichText.Content
							tagName={ headingTag }
							value={ headingTitle }
							className='uagb-heading-text'					
						/>
						{seprator_output}
						<RichText.Content
							tagName="p"
							value={ headingDesc }
							className='uagb-desc-text'
						/>
					</div>
				)
			},
		}
	],
} )
