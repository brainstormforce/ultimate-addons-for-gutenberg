/**
 * BLOCK: How-To Schema
 */

import SchemaNotices from './schema-notices';
import styling from './styling';
import './style.scss';
import { compose } from '@wordpress/compose';
import { withSelect } from '@wordpress/data';
import lazyLoader from '@Controls/lazy-loader';
import React, { useEffect, lazy, Suspense } from 'react';

const Settings = lazy( () =>
	import( /* webpackChunkName: "chunks/how-to/settings" */ './settings' )
);
const Render = lazy( () =>
	import( /* webpackChunkName: "chunks/how-to/render" */ './render' )
);

let prevState;

const HowToComponent = ( props ) => {
	useEffect( () => {
		// Replacement for componentDidMount.

		// Assigning block_id in the attribute.
		props.setAttributes( { block_id: props.clientId.substr( 0, 8 ) } );

		props.setAttributes( {
			schema: JSON.stringify( props.schemaJsonData ),
		} );

		// Pushing Style tag for this block css.
		const $style = document.createElement( 'style' );
		$style.setAttribute(
			'id',
			'uagb-how-to-schema-style-' + props.clientId.substr( 0, 8 )
		);
		document.head.appendChild( $style );

		prevState = props.schemaJsonData;
	}, [] );

	useEffect( () => {
		// Replacement for componentDidUpdate.

		if (
			JSON.stringify( props.schemaJsonData ) !==
			JSON.stringify( prevState )
		) {
			props.setAttributes( {
				schema: JSON.stringify( props.schemaJsonData ),
			} );

			prevState = props.schemaJsonData;
		}
		const element = document.getElementById(
			'uagb-how-to-schema-style-' + props.clientId.substr( 0, 8 )
		);

		if ( null !== element && undefined !== element ) {
			element.innerHTML = styling( props );
		}
	}, [ props ] );

	// Setup the attributes
	const {
		attributes: {
			currencyType,
			showEstcost,
			showTotaltime,
			tools,
			materials,
			timeNeeded,
			estCost,
			mainimage,
			headingTitle,
			headingDesc,
			time,
			cost,
			timeInMins,
			timeInHours,
			timeInDays,
			timeInMonths,
			timeInYears,
		},
	} = props;
	const minsValue = timeInMins ? timeInMins : time;

	return (
		<Suspense fallback={ lazyLoader() }>
			<SchemaNotices
				headingTitle={ headingTitle }
				headingDesc={ headingDesc }
				mainimage={ mainimage }
				showTotaltime={ showTotaltime }
				timeNeeded={ timeNeeded }
				minsValue={ minsValue }
				timeInHours={ timeInHours }
				timeInDays={ timeInDays }
				timeInMonths={ timeInMonths }
				timeInYears={ timeInYears }
				showEstcost={ showEstcost }
				estCost={ estCost }
				cost={ cost }
				currencyType={ currencyType }
				tools={ tools }
				materials={ materials }
				clientId={ props.clientId }
			/>
			<Settings parentProps={ props } />
			<Render parentProps={ props } />
		</Suspense>
	);
};

export default compose(
	withSelect( ( select, ownProps ) => {
		const { __experimentalGetPreviewDeviceType = null } = select(
			'core/edit-post'
		);
		const deviceType = __experimentalGetPreviewDeviceType
			? __experimentalGetPreviewDeviceType()
			: null;
		let urlChk = '';

		if (
			'undefined' !== ownProps.attributes.mainimage &&
			null !== ownProps.attributes.mainimage &&
			'' !== ownProps.attributes.mainimage
		) {
			urlChk = ownProps.attributes.mainimage.url;
		}
		let toolsData = {};
		let materialsData = {};
		let stepsData = {};
		const jsonData = {
			'@context': 'https://schema.org',
			'@type': 'HowTo',
			name: ownProps.attributes.headingTitle,
			description: ownProps.attributes.headingDesc,
			image: {
				'@type': 'ImageObject',
				url: urlChk,
				height: '406',
				width: '305',
			},
			totalTime: '',
			estimatedCost: [],
			tool: [],
			supply: [],
			step: [],
		};

		const y = ownProps.attributes.timeInYears
			? ownProps.attributes.timeInYears
			: 0;
		const m = ownProps.attributes.timeInMonths
			? ownProps.attributes.timeInMonths
			: 0;
		const d = ownProps.attributes.timeInDays
			? ownProps.attributes.timeInDays
			: 0;
		const h = ownProps.attributes.timeInHours
			? ownProps.attributes.timeInHours
			: 0;

		const minutes = ownProps.attributes.timeInMins
			? ownProps.attributes.timeInMins
			: ownProps.attributes.time;

		if ( ownProps.attributes.showTotaltime ) {
			jsonData.totalTime =
				'P' + y + 'Y' + m + 'M' + d + 'DT' + h + 'H' + minutes + 'M';
		}

		if ( ownProps.attributes.showEstcost ) {
			jsonData.estimatedCost = {
				'@type': 'MonetaryAmount',
				currency: ownProps.attributes.currencyType,
				value: ownProps.attributes.cost,
			};
		}

		if ( ownProps.attributes.showTools ) {
			ownProps.attributes.tools.forEach( ( tools, key ) => {
				toolsData = {
					'@type': 'HowToTool',
					name: tools.add_required_tools,
				};
				jsonData.tool[ key ] = toolsData;
			} );
		}

		if ( ownProps.attributes.showMaterials ) {
			ownProps.attributes.materials.forEach( ( materials, key ) => {
				materialsData = {
					'@type': 'HowToSupply',
					name: materials.add_required_materials,
				};
				jsonData.supply[ key ] = materialsData;
			} );
		}

		const getChildBlocks = select( 'core/block-editor' ).getBlocks(
			ownProps.clientId
		);

		getChildBlocks.forEach( ( steps, key ) => {
			stepsData = {
				'@type': 'HowToStep',
				url: steps.attributes.ctaLink,
				name: steps.attributes.infoBoxTitle,
				text: steps.attributes.headingDesc,
				image: steps.attributes.iconImage.url,
			};
			jsonData.step[ key ] = stepsData;
		} );

		return {
			schemaJsonData: jsonData,
			deviceType,
		};
	} )
)( HowToComponent );
