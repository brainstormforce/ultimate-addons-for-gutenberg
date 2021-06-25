/**
 * BLOCK: Social Share - Settings.
 */

import lazyLoader from '@Controls/lazy-loader';
import React, { Suspense } from 'react';
import ColumnResponsive from '../../components/typography/column-responsive';

import { __ } from '@wordpress/i18n';

import {
	BlockControls,
	BlockAlignmentToolbar,
	InspectorControls,
} from '@wordpress/block-editor';

import {
	PanelBody,
	SelectControl,
	RangeControl,
	Button,
	ButtonGroup,
} from '@wordpress/components';

const Settings = ( props ) => {
	props = props.parentProps;

	const { attributes, setAttributes, deviceType } = props;

	const {
		align,
		gap,
		stack,
		social_layout,
		borderRadius,
		size,
		sizeType,
		sizeMobile,
		sizeTablet,
		bgSize,
	} = attributes;

	const sizeTypes = [
		{ key: 'px', name: __( 'px', 'ultimate-addons-for-gutenberg' ) },
		{ key: 'em', name: __( 'em', 'ultimate-addons-for-gutenberg' ) },
	];

	const sizeTypesControls = (
		<ButtonGroup
			className="uagb-size-type-field"
			aria-label={ __( 'Size Type', 'ultimate-addons-for-gutenberg' ) }
		>
			{ sizeTypes.map( ( { name, key } ) => (
				<Button
					key={ key }
					className="uagb-size-btn"
					isSmall
					isPrimary={ sizeType === key }
					aria-pressed={ sizeType === key }
					onClick={ () => setAttributes( { sizeType: key } ) }
				>
					{ name }
				</Button>
			) ) }
		</ButtonGroup>
	);

	const blockControls = () => {
		return (
			<BlockControls>
				<BlockAlignmentToolbar
					value={ align }
					onChange={ ( value ) => {
						setAttributes( { align: value } );
					} }
					controls={ [ 'left', 'center', 'right' ] }
				/>
			</BlockControls>
		);
	};

	const generalSettings = () => {
		return (
			<PanelBody
				title={ __( 'General', 'ultimate-addons-for-gutenberg' ) }
				initialOpen={ true }
			>
				<SelectControl
					label={ __( 'Layout', 'ultimate-addons-for-gutenberg' ) }
					value={ social_layout }
					options={ [
						{
							value: 'horizontal',
							label: __(
								'Horizontal',
								'ultimate-addons-for-gutenberg'
							),
						},
						{
							value: 'vertical',
							label: __(
								'Vertical',
								'ultimate-addons-for-gutenberg'
							),
						},
					] }
					onChange={ ( value ) =>
						setAttributes( { social_layout: value } )
					}
				/>
				{ 'horizontal' == social_layout && (
					<>
						<SelectControl
							label={ __(
								'Stack on',
								'ultimate-addons-for-gutenberg'
							) }
							value={ stack }
							options={ [
								{
									value: 'none',
									label: __(
										'None',
										'ultimate-addons-for-gutenberg'
									),
								},
								{
									value: 'desktop',
									label: __(
										'Desktop',
										'ultimate-addons-for-gutenberg'
									),
								},
								{
									value: 'tablet',
									label: __(
										'Tablet',
										'ultimate-addons-for-gutenberg'
									),
								},
								{
									value: 'mobile',
									label: __(
										'Mobile',
										'ultimate-addons-for-gutenberg'
									),
								},
							] }
							onChange={ ( value ) =>
								setAttributes( { stack: value } )
							}
							help={ __(
								'Note: Choose on what breakpoint the Icons will stack.',
								'ultimate-addons-for-gutenberg'
							) }
						/>
					</>
				) }
				<hr className="uagb-editor__separator" />
				<ColumnResponsive />
				{ 'Desktop' === deviceType && (
					<>
						{ sizeTypesControls }
						<RangeControl
							label={ __(
								'Size',
								'ultimate-addons-for-gutenberg'
							) }
							value={ size }
							onChange={ ( value ) =>
								setAttributes( { size: value } )
							}
							min={ 0 }
							max={ 500 }
							allowReset
							initialPosition={ 40 }
						/>
					</>
				) }
				{ 'Tablet' === deviceType && (
					<>
						{ sizeTypesControls }
						<RangeControl
							label={ __(
								'Size',
								'ultimate-addons-for-gutenberg'
							) }
							value={ sizeTablet }
							onChange={ ( value ) =>
								setAttributes( { sizeTablet: value } )
							}
							min={ 0 }
							max={ 500 }
							allowReset
							initialPosition={ 40 }
						/>
					</>
				) }
				{ 'Mobile' === deviceType && (
					<>
						{ sizeTypesControls }
						<RangeControl
							label={ __(
								'Size',
								'ultimate-addons-for-gutenberg'
							) }
							value={ sizeMobile }
							onChange={ ( value ) =>
								setAttributes( { sizeMobile: value } )
							}
							min={ 0 }
							max={ 500 }
							allowReset
							initialPosition={ 40 }
						/>
					</>
				) }
				<RangeControl
					label={ __(
						'Background Size',
						'ultimate-addons-for-gutenberg'
					) }
					value={ bgSize }
					onChange={ ( value ) => setAttributes( { bgSize: value } ) }
					help={ __(
						'Note: Background Size option is useful when one adds background color to the icons.',
						'ultimate-addons-for-gutenberg'
					) }
					min={ 0 }
					max={ 500 }
				/>
				<RangeControl
					label={ __(
						'Border Radius',
						'ultimate-addons-for-gutenberg'
					) }
					value={ borderRadius }
					onChange={ ( value ) =>
						setAttributes( { borderRadius: value } )
					}
					help={ __(
						'Note: Border Radius option is useful when one adds background color to the icons.',
						'ultimate-addons-for-gutenberg'
					) }
					min={ 0 }
					max={ 500 }
				/>
				<hr className="uagb-editor__separator" />
				<RangeControl
					label={ __(
						'Gap between Items',
						'ultimate-addons-for-gutenberg'
					) }
					value={ gap }
					onChange={ ( value ) => setAttributes( { gap: value } ) }
					help={ __(
						'Note: The gap between the items will seem larger in the editor, for better user edit experience. But at frontend the gap will be exactly what is set from here.',
						'ultimate-addons-for-gutenberg'
					) }
					min={ 0 }
					max={ 100 }
				/>
			</PanelBody>
		);
	};

	return (
		<Suspense fallback={ lazyLoader() }>
			{ blockControls() }
			<InspectorControls>{ generalSettings() }</InspectorControls>
		</Suspense>
	);
};

export default React.memo( Settings );
