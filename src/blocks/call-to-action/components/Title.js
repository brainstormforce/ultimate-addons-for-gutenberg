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
				tagName={ attributes.titleTag }
				placeholder={ __( 'Write a Heading' ) }
				value={ attributes.ctaTitle }
				className="uagb-cta__title"
				onChange={ ( value ) => setAttributes( { ctaTitle: value } ) }
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
			tagName={ attributes.titleTag }
			value={ attributes.ctaTitle }
			className="uagb-cta__title"
		/>
	);
};

export default Title;
