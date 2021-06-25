import { __ } from '@wordpress/i18n';

import React from 'react';
import {
	AlignmentToolbar,
	BlockControls,
	InspectorControls,
	MediaUpload,
} from '@wordpress/block-editor';

import { PanelBody, BaseControl, Button } from '@wordpress/components';

const Settings = ( props ) => {
	props = props.parentProps;
	const { setAttributes, attributes } = props;

	// Setup the attributes.
	const { headingAlign, imagePosition, image } = attributes;

	const onSelectRestImage = ( media ) => {
		let imageUrl = null;
		if ( ! media || ! media.url ) {
			imageUrl = null;
		} else {
			imageUrl = media;
		}

		if ( ! media.type || 'image' !== media.type ) {
			imageUrl = null;
		}

		setAttributes( {
			image: imageUrl,
		} );
	};

	/*
	 * Event to set Image selectot label.
	 */
	const getImageName = ( img ) => {
		let imageTitle = __( 'Select Image' );
		if ( img ) {
			if ( img.url == null || img.url == '' ) {
				imageTitle = __( 'Select Image' );
			} else {
				imageTitle = __( 'Replace Image' );
			}
		}
		return imageTitle;
	};

	/*
	 * Event to set Image as null while removing.
	 */
	const onRemoveRestImage = () => {
		setAttributes( {
			image: null,
		} );
	};

	const inspectControl = () => {
		return (
			<InspectorControls>
				<p className="uagb-settings-notice">
					{ __(
						'For the common styling options please select the Parent Block of this Price List Item.'
					) }
				</p>
				<PanelBody title={ __( 'Image' ) } initialOpen={ true }>
					<BaseControl
						id="Image"
						className="editor-bg-image-control"
						label={ __( '' ) }
					>
						<MediaUpload
							title={ __( 'Select Image' ) }
							onSelect={ ( media ) => {
								onSelectRestImage( media );
							} }
							allowedTypes={ [ 'image' ] }
							value={ image }
							render={ ( { open } ) => (
								<Button isSecondary onClick={ open }>
									{ getImageName( image ) }
								</Button>
							) }
						/>
						{ image && (
							<Button
								className="uagb-rm-btn"
								onClick={ onRemoveRestImage }
								isLink
								isDestructive
							>
								{ __( 'Remove Image' ) }
							</Button>
						) }
					</BaseControl>
				</PanelBody>
			</InspectorControls>
		);
	};

	const blockControls = () => {
		return (
			<>
				{ imagePosition == 'top' && (
					<BlockControls key="controls">
						<AlignmentToolbar
							value={ headingAlign }
							onChange={ ( value ) =>
								setAttributes( { headingAlign: value } )
							}
						/>
					</BlockControls>
				) }
			</>
		);
	};

	return (
		<>
			{ blockControls() }
			{ inspectControl() }
		</>
	);
};
export default React.memo( Settings );
