import { RichText } from '@wordpress/block-editor';

import { __ } from '@wordpress/i18n';

import { createBlock } from '@wordpress/blocks';

const Prefix = ( props ) => {
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
				tagName="div"
				value={ attributes.prefixTitle }
				placeholder={ __( 'Write a Prefix' ) }
				className="uagb-ifb-title-prefix"
				multiline={ false }
				onChange={ ( value ) => {
					setAttributes( { prefixTitle: value } );
				} }
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
			tagName="span"
			value={ attributes.prefixTitle }
			className="uagb-ifb-title-prefix"
		/>
	);
};

export default Prefix;
