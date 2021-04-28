import renderSVG from "../../../../dist/blocks/uagb-controls/renderIcon"

const {
	RichText,
} = wp.blockEditor

const { __ } = wp.i18n
const InfoBoxIcon = props =>{

	const { attributes } = props

		return (
			<div className="uagb-ifb-image-icon-content uagb-ifb-imgicon-wrap" >
				<div className="uagb-ifb-icon-wrap">
					<span className="uagb-ifb-icon">
						<span className={attributes.icon} ></span>
					</span>
				</div>
			</div>
		)
	
}

export default InfoBoxIcon