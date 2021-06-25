import { RichText } from '@wordpress/block-editor';

import { __ } from '@wordpress/i18n';

import { createBlock } from '@wordpress/blocks';

const AuthorName = ( props ) => {
	const {
		attributes,
		setAttributes,
		index_value,
		mergeBlocks,
		insertBlocksAfter,
		onReplace,
	} = props;

	const testArray = attributes.test_block[ index_value ];
	let authorName = '';
	if ( testArray && typeof testArray !== 'undefined' ) {
		authorName = testArray.name;
	}

	const dataCopy = [ ...attributes.test_block ];

	if ( setAttributes !== 'not_set' ) {
		return (
			<RichText
				tagName="div"
				value={ authorName }
				placeholder={ __(
					'Author Name',
					'ultimate-addons-for-gutenberg'
				) }
				className="uagb-tm__author-name"
				onChange={ ( value ) => {
					const new_content = {
						description: dataCopy[ index_value ].description,
						name: value,
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
			tagName="span"
			value={ authorName }
			className="uagb-tm__author-name"
		/>
	);
};

export default AuthorName;
