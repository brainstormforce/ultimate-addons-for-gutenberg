// Import block dependencies and components
import classnames from "classnames";
import renderSVG from "../../../dist/blocks/uagb-controls/renderIcon";
const {
	RichText,
} = wp.blockEditor;

const { __ } = wp.i18n;
const inlineNoticeRender = props => {
    // Setup the attributes
		const {
			attributes: {
				block_id,
				icon,
				noticeTitle,
				noticeContent,
				noticeDismiss,
				noticeAlignment,
				headingTag,
			},
			setAttributes,
			className,
		} = props;

		let image_icon_html = "";

		if ( noticeDismiss ) {
			image_icon_html = <span className="uagb-notice-dismiss">{ renderSVG( icon ) }</span>;
		}
        return (
        		<div className={ classnames(
					className,
					"uagb-inline_notice__outer-wrap",
					`${ noticeDismiss }`,
					`uagb-inline_notice__align-${ noticeAlignment }`,
					`uagb-block-${ block_id }`
				) }
				>
					{ image_icon_html }
					<RichText
						tagName={ headingTag }
						placeholder={ __( "Notice Title", "ultimate-addons-for-gutenberg" ) }
						keepPlaceholderOnFocus
						value={ noticeTitle }
						className='uagb-notice-title'
						onChange={ ( value ) =>
							setAttributes( { noticeTitle: value } )
						}
					/>
					<RichText
						tagName="div"
						multiline="p"
						placeholder={ __( "Add notice text...", "ultimate-addons-for-gutenberg" ) }
						value={ noticeContent }
						className='uagb-notice-text'
						onChange={ ( value ) =>
							setAttributes( { noticeContent: value } )
						}
					/>
				</div>
            )
}
export default inlineNoticeRender