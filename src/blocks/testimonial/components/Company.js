import { RichText } from '@wordpress/block-editor';

import { __ } from '@wordpress/i18n';

import { createBlock } from '@wordpress/blocks';

const Company = ( props ) => {
	const {
		attributes,
		setAttributes,
		index_value,
		mergeBlocks,
		insertBlocksAfter,
		onReplace,
	} = props;

	const testArray = attributes.test_block[ index_value ];
	let company = '';
	if ( testArray && typeof testArray !== 'undefined' ) {
		company = testArray.company;
	}

	const dataCopy = [ ...attributes.test_block ];

	if ( setAttributes !== 'not_set' ) {
		return (
			<RichText
				tagName="div"
				value={ company }
				className="uagb-tm__company"
				onChange={ ( value ) => {
					const new_content = {
						description: dataCopy[ index_value ].description,
						name: dataCopy[ index_value ].name,
						company: value,
						image: dataCopy[ index_value ].image,
					};
					dataCopy[ index_value ] = new_content;
					setAttributes( { test_block: dataCopy } );
				} }
				multiline={ false }
				placeholder={ __(
					'Company Name',
					'ultimate-addons-for-gutenberg'
				) }
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
			value={ company }
			className="uagb-tm__company"
		/>
	);
};

export default Company;
