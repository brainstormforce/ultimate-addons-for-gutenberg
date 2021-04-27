import renderSVG from "../../../../dist/blocks/uagb-controls/renderIcon"

const {
	RichText,
} = wp.blockEditor

const { __ } = wp.i18n

export default function Icon(attributes){	

	return (
		<div className="uagb-ifb-image-icon-content uagb-ifb-imgicon-wrap" >
			<div className="uagb-ifb-icon-wrap">
				<span className="uagb-ifb-icon">
					{ renderSVG( attributes.icon ) }
				</span>
			</div>
		</div>
	)
	
}

