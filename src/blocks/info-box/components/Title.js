import { RichText } from '@wordpress/block-editor';

import { __ } from '@wordpress/i18n';

import { createBlock } from '@wordpress/blocks';

const Title = ( props ) => {
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
				tagName={ attributes.headingTag }
				placeholder={ __( 'Write a Heading' ) }
				value={ attributes.infoBoxTitle }
				className="uagb-ifb-title"
				onChange={ ( value ) =>
					setAttributes( { infoBoxTitle: value } )
				}
				multiline={ false }
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
			tagName={ attributes.headingTag }
			value={ attributes.infoBoxTitle }
			className="uagb-ifb-title"
		/>
	);
};

export default Title;
