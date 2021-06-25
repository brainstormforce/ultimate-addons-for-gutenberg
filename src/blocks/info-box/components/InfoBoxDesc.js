import { RichText } from '@wordpress/block-editor';

import { __ } from '@wordpress/i18n';

import { createBlock } from '@wordpress/blocks';

const InfoBoxDesc = ( props ) => {
	const {
		attributes,
		setAttributes,
		mergeBlocks,
		insertBlocksAfter,
		onReplace,
	} = props;

	if ( setAttributes !== 'not_set' ) {
		return (
			<RichText
				tagName="p"
				value={ attributes.headingDesc }
				placeholder={ __( 'Write a Description' ) }
				className="uagb-ifb-desc"
				onChange={ ( value ) =>
					setAttributes( { headingDesc: value } )
				}
				onMerge={ mergeBlocks }
				onSplit={
					insertBlocksAfter
						? ( before, after, ...blocks ) => {
								setAttributes( { content: before } );
								insertBlocksAfter( [
									...blocks,
									createBlock( 'core/paragraph', {
										content: after,
									} ),
								] );
						  }
						: undefined
				}
				onRemove={ () => onReplace( [] ) }
			/>
		);
	}
	return (
		<RichText.Content
			tagName="p"
			value={ attributes.headingDesc }
			className="uagb-ifb-desc"
		/>
	);
};

export default InfoBoxDesc;
