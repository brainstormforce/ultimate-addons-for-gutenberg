import renderSVG from "../../../../../dist/blocks/uagb-controls/renderIcon";

class Icon extends React.Component {

	render() {

		const { attributes } = this.props;
		const icon_class = "uagb-timeline__icon-new uagb-timeline__out-view-icon ";  
		const svg = renderSVG( attributes.icon );
		return (			
			<div className="uagb-timeline__marker uagb-timeline__out-view-icon"> 
				<span className={ icon_class }>{ renderSVG( attributes.icon ) }</span>
			</div>
		);
	}
}

export default Icon;
