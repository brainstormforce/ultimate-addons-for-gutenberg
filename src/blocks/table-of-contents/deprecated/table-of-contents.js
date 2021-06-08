import { __ } from '@wordpress/i18n';

class TOC extends React.Component {

	render() {
		const { mappingHeaders, headers } = this.props;

		const makeHeaderArray = origHeaders => {
			let arrays = [];

			origHeaders
				.filter(header => mappingHeaders[header.tag - 1])
				.forEach(header => {
					let last = arrays.length - 1;
					if (
						arrays.length === 0 ||
						arrays[last][0].tag < header.tag
					) {
						arrays.push([header]);
					} else if (arrays[last][0].tag === header.tag) {
						arrays[last].push(header);
					} else {
						while (arrays[last][0].tag > header.tag) {
							if (arrays.length > 1) {
								arrays[arrays.length - 2].push(arrays.pop());
								last = arrays.length - 1;
							} else break;
						}
						if (arrays[last][0].tag === header.tag) {
							arrays[last].push(header);
						}
					}
				});

			while (
				arrays.length > 1 &&
				arrays[arrays.length - 1][0].tag >
					arrays[arrays.length - 2][0].tag
			) {
				arrays[arrays.length - 2].push(arrays.pop());
			}

			return arrays[0];
		};

		const filterArray = origHeaders => {
			let arrays = [];
			headers.forEach((heading, key) => {
				if ( mappingHeaders[heading.tag - 1] ) {
					arrays.push( heading );
				}
			});
			return makeHeaderArray( arrays );
		};

		var counter = 0;

		const parseList = list => {
			let items = [];
			list.forEach(item => {
				
				if (Array.isArray(item)) {
					items.push(parseList(item));
				} else {

					items.push(
						<li key={list.indexOf(item)}>
							<a
								href={`#${item.link}`}
								dangerouslySetInnerHTML={{
									__html: item.text
								}}
							/>
						</li>
					);
					counter ++;
				}
			});
			return <ul className="uagb-toc__list">{items}</ul>;
		};

		if (
			typeof mappingHeaders != undefined && headers && headers.length > 0 && headers.filter(header => mappingHeaders[header.tag - 1]).length > 0
		) {
			return (
				<div className="uagb-toc__list-wrap" data-headers={JSON.stringify(headers)}>
					{parseList(filterArray(headers))}
				</div>
			);
		} else {
			return (
				<p className="uagb_table-of-contents-placeholder">
					{__(
						'Add a header to begin generating the table of contents'
					)}
				</p>
			);
		}

	}
}

export default TOC;
