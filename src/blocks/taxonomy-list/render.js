import classnames from 'classnames';
import React, { useLayoutEffect } from 'react';
import styles from './editor.lazy.scss';

const Render = ( props ) => {
	// Add and remove the CSS on the drop and remove of the component.
	useLayoutEffect( () => {
		styles.use();
		return () => {
			styles.unuse();
		};
	}, [] );

	props = props.parentProps;

	// Caching all Props.
	const { attributes, categoriesList, deviceType } = props;

	// Caching all attributes.
	const {
		layout,
		seperatorStyle,
		noTaxDisplaytext,
		showCount,
		listDisplayStyle,
		showhierarchy,
		titleTag,
	} = attributes;

	let Tag;
	if ( 'grid' == layout ) {
		Tag = titleTag ? titleTag : 'H4';
	} else if ( 'list' == layout ) {
		Tag = titleTag ? titleTag : 'div';
	}

	return (
		<>
			<div
				className={ classnames(
					'uagb-taxonomy__outer-wrap',
					`uagb-editor-preview-mode-${ deviceType.toLowerCase() }`,
					`uagb-block-${ props.clientId.substr( 0, 8 ) }`
				) }
			>
				<div
					className={ classnames(
						'uagb-taxonomy-wrap',
						`uagb-layout-${ layout }`
					) }
				>
					{ 'grid' == layout &&
						categoriesList.map( ( p, index ) => (
							<div className="uagb-taxomony-box" key={ index }>
								<a className="uagb-tax-link" href={ p.link }>
									<Tag
										className="uagb-tax-title"
										dangerouslySetInnerHTML={ {
											__html: p.name,
										} }
									></Tag>
									{ showCount && (
										<div className="uagb-tax-count">
											{ p.count }{ ' ' }
											{ p.count > '1'
												? `${ p.singular_name }s`
												: p.singular_name }
										</div>
									) }
								</a>
							</div>
						) ) }

					{ 'list' == layout && 'list' == listDisplayStyle && (
						<ul className="uagb-list-wrap">
							{ categoriesList.map( ( p, index ) => (
								<li className="uagb-tax-list" key={ index }>
									<Tag className="uagb-tax-link-wrap">
										<a
											className="uagb-tax-link"
											href={ p.link }
											dangerouslySetInnerHTML={ {
												__html: p.name,
											} }
										></a>
										{ showCount && (
											<span className="uagb-tax-list-count">{ ` (${ p.count })` }</span>
										) }
										{ showhierarchy && p.children != null && (
											<ul className="uagb-taxonomy-list-children">
												{ Object.keys( p.children ).map(
													function ( key, i ) {
														return (
															<li
																className="uagb-tax-list"
																key={ i }
															>
																<a
																	className="uagb-tax-link"
																	href={ `${ p.link }${ p.children[ key ].slug }` }
																>
																	{
																		p
																			.children[
																			key
																		].name
																	}
																</a>
																{ showCount && (
																	<span>{ ` (${ p.children[ key ].count })` }</span>
																) }
															</li>
														);
													}
												) }
											</ul>
										) }
									</Tag>

									{ 'none' != seperatorStyle && (
										<div className="uagb-tax-separator-wrap">
											<div className="uagb-tax-separator"></div>
										</div>
									) }
								</li>
							) ) }
						</ul>
					) }

					{ 'list' == layout && 'dropdown' == listDisplayStyle && (
						<select className="uagb-list-dropdown-wrap">
							{ categoriesList.map( ( p, index ) => (
								<option key={ index } value={ p.link }>
									{ p.name }
									{ showCount && ` (${ p.count })` }
								</option>
							) ) }
						</select>
					) }
				</div>

				{ /* If no Taxonomy is available. */ }
				{ categoriesList == '' && (
					<div className="uagb-tax-not-available">
						{ noTaxDisplaytext }
					</div>
				) }
			</div>
		</>
	);
};

export default React.memo( Render );
