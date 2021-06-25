import { __ } from '@wordpress/i18n';

function TableOfContents( props ) {
	const { mappingHeaders, headers } = props;

	const filterArray = () => {
		const arrays = [];
		headers.forEach( ( heading ) => {
			if ( mappingHeaders[ heading.tag - 1 ] ) {
				arrays.push( heading );
			}
		} );
		return arrays;
	};

	const renderList = ( header ) => {
		let lastLevel = '';
		let parentLevel = '';
		let firstLevel = '';
		let toc = '';
		const str = '</li></ul>';
		let currentDepth = 0;
		const depthArray = {
			1: 0,
			2: 0,
			3: 0,
			4: 0,
			5: 0,
			6: 0,
		};
		header.forEach( ( item, index ) => {
			const level = item.tag;
			const title = item.content;

			if ( 0 === index ) {
				firstLevel = level;
			}

			if ( level < firstLevel ) {
				return;
			}

			if ( '' === parentLevel || level < parentLevel ) {
				parentLevel = level;
			}

			if ( '' !== lastLevel ) {
				if ( level > lastLevel ) {
					toc += '<ul class="uagb-toc__list">';
					currentDepth++;
					depthArray[ level ] = currentDepth;
				} else if ( level === lastLevel && level !== parentLevel ) {
					toc += '<li class="uagb-toc__list">';
					depthArray[ level ] = currentDepth;
				} else if ( level < lastLevel ) {
					const closing = Math.abs(
						currentDepth - depthArray[ level ]
					);

					if ( level > parentLevel ) {
						toc += str.repeat( closing );
						currentDepth = Math.abs( currentDepth - closing );
					} else if ( level === parentLevel ) {
						toc += str.repeat( closing );
						toc += '</li>';
					}
				}
			}

			toc += '<li class="uagb-toc__list"><a href="#">' + title + '</a>';

			lastLevel = level;
		} );

		toc += str.repeat( lastLevel );

		return (
			<ol
				className="uagb-toc__list"
				dangerouslySetInnerHTML={ { __html: toc } }
			></ol>
		);
	};

	if (
		mappingHeaders != 'undefined' &&
		headers &&
		headers.length > 0 &&
		headers.filter( ( header ) => mappingHeaders[ header.tag - 1 ] )
			.length > 0
	) {
		return (
			<div className="uagb-toc__list-wrap">
				{ renderList( filterArray( headers ) ) }
			</div>
		);
	}
	return (
		<p className="uagb_table-of-contents-placeholder">
			{ __( 'Add a header to begin generating the table of contents' ) }
		</p>
	);
}

export default TableOfContents;
