import { RichText } from '@wordpress/block-editor';

import { __ } from '@wordpress/i18n';

import { createBlock } from '@wordpress/blocks';

const Description = ( props ) => {
	const {
		attributes,
		setAttributes,
		index_value,
		mergeBlocks,
		insertBlocksAfter,
		onReplace,
	} = props;

	const testArray = attributes.test_block[ index_value ];
	let description = '';
	if ( testArray && typeof testArray !== 'undefined' ) {
		description = testArray.description;
	}

	const dataCopy = [ ...attributes.test_block ];

	if ( setAttributes !== 'not_set' ) {
		return (
			<RichText
				tagName="div"
				value={ description }
				placeholder={ __(
					'Write Description',
					'ultimate-addons-for-gutenberg'
				) }
				className="uagb-tm__desc"
				onChange={ ( value ) => {
					const new_content = {
						description: value,
						name: dataCopy[ index_value ].name,
						company: dataCopy[ index_value ].company,
						image: dataCopy[ index_value ].image,
					};
					dataCopy[ index_value ] = new_content;
					setAttributes( { test_block: dataCopy } );
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
			tagName="div"
			value={ description }
			className="uagb-tm__desc"
		/>
	);
};

export default Description;
