import React, { Suspense } from 'react';
import { __ } from '@wordpress/i18n';
import lazyLoader from '@Controls/lazy-loader';
import WebfontLoader from '@Components/typography/fontloader';
import { BlockAlignmentToolbar, BlockControls } from '@wordpress/block-editor';
import { ToolbarGroup } from '@wordpress/components';

const Settings = ( props ) => {
	const { state, inspectorControls, togglePreview } = props;

	props = props.parentProps;

	const { attributes, setAttributes } = props;

	const {
		align,
		titleFontFamily,
		titleFontWeight,
		titleLoadGoogleFonts,
		metaFontFamily,
		metaFontWeight,
		metaLoadGoogleFonts,
		excerptFontFamily,
		excerptFontWeight,
		excerptLoadGoogleFonts,
		ctaFontFamily,
		ctaFontWeight,
		ctaLoadGoogleFonts,
	} = attributes;

	const getBlockControls = () => {
		const { isEditing } = state;

		return (
			<ToolbarGroup
				controls={ [
					{
						icon: 'edit',
						title: __( 'Edit' ),
						onClick: () => togglePreview(),
						isActive: isEditing,
					},
				] }
			/>
		);
	};

	let loadTitleGoogleFonts;
	let loadMetaGoogleFonts;
	let loadExcerptGoogleFonts;
	let loadCtaGoogleFonts;

	if ( titleLoadGoogleFonts == true ) {
		const titleconfig = {
			google: {
				families: [
					titleFontFamily +
						( titleFontWeight ? ':' + titleFontWeight : '' ),
				],
			},
		};

		loadTitleGoogleFonts = (
			<WebfontLoader config={ titleconfig }></WebfontLoader>
		);
	}

	if ( metaLoadGoogleFonts == true ) {
		const metaconfig = {
			google: {
				families: [
					metaFontFamily +
						( metaFontWeight ? ':' + metaFontWeight : '' ),
				],
			},
		};

		loadMetaGoogleFonts = (
			<WebfontLoader config={ metaconfig }></WebfontLoader>
		);
	}

	if ( excerptLoadGoogleFonts == true ) {
		const excerptconfig = {
			google: {
				families: [
					excerptFontFamily +
						( excerptFontWeight ? ':' + excerptFontWeight : '' ),
				],
			},
		};

		loadExcerptGoogleFonts = (
			<WebfontLoader config={ excerptconfig }></WebfontLoader>
		);
	}

	if ( ctaLoadGoogleFonts == true ) {
		const ctaconfig = {
			google: {
				families: [
					ctaFontFamily +
						( ctaFontWeight ? ':' + ctaFontWeight : '' ),
				],
			},
		};

		loadCtaGoogleFonts = (
			<WebfontLoader config={ ctaconfig }></WebfontLoader>
		);
	}

	return (
		<Suspense fallback={ lazyLoader() }>
			{ inspectorControls }
			<BlockControls>
				<BlockAlignmentToolbar
					value={ align }
					onChange={ ( value ) => {
						setAttributes( { align: value } );
					} }
					controls={ [ 'left', 'center', 'right' ] }
				/>
				{ getBlockControls() }
			</BlockControls>
			{ loadTitleGoogleFonts }
			{ loadMetaGoogleFonts }
			{ loadExcerptGoogleFonts }
			{ loadCtaGoogleFonts }
		</Suspense>
	);
};

export default React.memo( Settings );
