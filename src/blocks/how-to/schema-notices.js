/**
 * How-To Schema Notices component.
 *
 */
import { __ } from '@wordpress/i18n';

import { select } from '@wordpress/data';

function SchemaNotices( props ) {
	const {
		headingTitle,
		headingDesc,
		mainimage,
		showTotaltime,
		showTools,
		showMaterials,
		timeNeeded,
		showEstcost,
		estCost,
		cost,
		currencyType,
		tools,
		materials,
		clientId,
		minsValue,
		timeInHours,
		timeInDays,
		timeInMonths,
		timeInYears,
	} = props;

	const emptyItems = [];
	const steps = select( 'core/block-editor' ).getBlocks( clientId );
	let steps_empty_item_flag = false;
	steps.forEach( ( step ) => {
		if (
			'' === step.attributes.ctaLink ||
			'#' === step.attributes.ctaLink ||
			'' === step.attributes.infoBoxTitle ||
			'' === step.attributes.headingDesc ||
			'' === step.attributes.iconImage?.url
		) {
			steps_empty_item_flag = true;
		}
	} );

	if ( 'undefined' === typeof headingTitle || '' === headingTitle ) {
		emptyItems.push( 'How-To Title' );
	}
	if ( 'undefined' === typeof headingDesc || '' === headingDesc ) {
		emptyItems.push( 'Description' );
	}
	if (
		'undefined' === typeof mainimage.url ||
		null === mainimage.url ||
		'' === mainimage.url
	) {
		emptyItems.push( 'Image' );
	}
	if (
		true === showTotaltime &&
		( 'undefined' === typeof timeNeeded || '' === timeNeeded )
	) {
		emptyItems.push( 'Time Needed Label' );
	}
	if (
		true === showTotaltime &&
		( 'undefined' === typeof minsValue || '' === minsValue ) &&
		( 'undefined' === typeof timeInHours || '' === timeInHours ) &&
		( 'undefined' === typeof timeInDays || '' === timeInDays ) &&
		( 'undefined' === typeof timeInMonths || '' === timeInMonths ) &&
		( 'undefined' === typeof timeInYears || '' === timeInYears )
	) {
		emptyItems.push( 'Time' );
	}
	if (
		true === showEstcost &&
		( 'undefined' === typeof estCost || '' === estCost )
	) {
		emptyItems.push( 'Total Cost Label' );
	}
	if (
		true === showEstcost &&
		( 'undefined' === typeof cost || '' === cost )
	) {
		emptyItems.push( 'Cost' );
	}
	if (
		true === showEstcost &&
		( 'undefined' === typeof currencyType || '' === currencyType )
	) {
		emptyItems.push( 'Currency Unit' );
	}
	if (
		true === showTools &&
		( 'undefined' === typeof tools ||
			0 === tools.length ||
			'' === tools[ 0 ].add_required_tools )
	) {
		emptyItems.push( 'Tools' );
	}
	if (
		true === showMaterials &&
		( 'undefined' === typeof materials ||
			0 === materials.length ||
			'' === materials[ 0 ].add_required_materials )
	) {
		emptyItems.push( 'Materials' );
	}
	if ( 'undefined' === typeof steps || 2 > steps.length ) {
		emptyItems.push( 'Atleast 2 Steps are required' );
	}
	if ( true === steps_empty_item_flag ) {
		emptyItems.push(
			'The Info Box Heading, Description, Image, Call To Action Link are required for each Step. '
		);
	}
	const listItems = emptyItems.map( ( item ) => (
		<li key={ item }> { item } </li>
	) );

	const schemaNoticeMarkup = () => {
		if ( 0 !== emptyItems.length ) {
			return (
				<div className="how-to-schema-notices">
					<h6>
						{ ' ' }
						{ __(
							'It seems the following fields are empty. This may generate Schema errors / warnings for your Page, we recommend you to fill these fields.'
						) }{ ' ' }
					</h6>
					<ul className="how-to-schema-notices-list">
						{ listItems }
					</ul>
					<p>
						{ __(
							'P.S. Note that this notice is visible only in the editor. This will not be visible in frontend. Also, once the required fields are added, this notice will go away.'
						) }
						&nbsp;
						<a
							href="https://developers.google.com/search/docs/data-types/how-to"
							target="_blank"
							rel="noreferrer"
						>
							{ __( 'Read more.' ) }
						</a>
					</p>
				</div>
			);
		}
		return '';
	};

	return <>{ schemaNoticeMarkup() }</>;
}

export default SchemaNotices;
