/**
 * BLOCK: Tabs Child Block
 */

import classnames from "classnames";

const { __ } = wp.i18n;

const {
	Component,
} = wp.element;

const {
	InnerBlocks
} = wp.blockEditor;

const { select } = wp.data;

class UAGBTabsChildEdit extends Component {
	constructor() {
		super( ...arguments );
	}

	componentDidMount() {
		const { attributes, setAttributes, clientId  } = this.props;
		const { getBlockRootClientId, getBlockAttributes } = !wp.blockEditor ? select( "core/editor" ) : select( "core/block-editor" );
		const rootBlockId = getBlockRootClientId( clientId );
		const rootBlockAttrs = getBlockAttributes( rootBlockId );
		setAttributes( { block_id: this.props.clientId.substr( 0, 8 ) } );
		setAttributes( { tabActive: rootBlockAttrs.tabActiveFrontend } );
		
		// Apply parent style if newly inserted
		if ( rootBlockAttrs !== null && rootBlockAttrs.needUpdate !== false ) {
			Object.keys( rootBlockAttrs ).map( ( attribute ) => {
				attributes[attribute] = rootBlockAttrs[attribute];
			} );
		}
	}	
	
	render() {
		const { attributes , className } = this.props;
		const { tabActive, id, block_id } = attributes;
		
		return (
			<div className={ `uagb-tabs__body-container uagb-tabs__inner-tab uagb-inner-tab-${id}` } style={ { display: id === tabActive ? "block" : "none" } }>
				<div className={ classnames(
					className,
					`uagb-tabs__${block_id}`,
					"uagb-tabs__body"
				) } aria-labelledby={ `uagb-tabs__tab${id}` }>
					<InnerBlocks
						template={ [ [ "core/paragraph" ] ] }
						templateLock={ false }
					/>
				</div>
			</div>
		);
	}
}

export default UAGBTabsChildEdit;
