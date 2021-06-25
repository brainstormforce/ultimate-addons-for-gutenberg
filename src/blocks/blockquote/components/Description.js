import { RichText } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';
import { createBlock } from '@wordpress/blocks';

const Description = ( { attributes, setAttributes, props } ) => {
	if ( setAttributes !== 'not_set' ) {
		return (
			<RichText
				tagName="div"
				value={ attributes.descriptionText }
				placeholder={ __(
					'Write a Quote',
					'ultimate-addons-for-gutenberg'
				) }
				className="uagb-blockquote__content"
				onChange={ ( value ) =>
					setAttributes( {
						descriptionText: value,
					} )
				}
				onMerge={ props.mergeBlocks }
				onSplit={
					props.insertBlocksAfter
						? ( before, after, ...blocks ) => {
								setAttributes( {
									content: before,
								} );
								props.insertBlocksAfter( [
									...blocks,
									createBlock( 'core/paragraph', {
										content: after,
									} ),
								] );
						  }
						: undefined
				}
				onRemove={ () => props.onReplace( [] ) }
			/>
		);
	}

	return (
		<RichText.Content
			tagName="div"
			value={ attributes.descriptionText }
			className="uagb-blockquote__content"
		/>
	);
};

export default Description;
