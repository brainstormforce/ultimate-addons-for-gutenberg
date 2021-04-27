/**
 * BLOCK: Advanced Heading - Deprecated Block
 */

import attributes from "./attributes"

const {
	RichText
} = wp.blockEditor

const deprecated = [
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
	},
	{
		attributes,
		save: function( props ) {
			const {
				block_id,
				headingTitle,
				headingDesc,
				headingTag,
				seperatorStyle,
				headingId
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
						id = { headingId }				
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
]

export default deprecated