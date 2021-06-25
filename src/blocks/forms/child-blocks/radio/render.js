import classnames from 'classnames';
import React, { useLayoutEffect } from 'react';
import { __ } from '@wordpress/i18n';
import styles from './editor.lazy.scss';

import { Button, ToggleControl } from '@wordpress/components';

import { RichText } from '@wordpress/block-editor';

const Render = ( props ) => {
	// Add and remove the CSS on the drop and remove of the component.
	useLayoutEffect( () => {
		styles.use();
		return () => {
			styles.unuse();
		};
	}, [] );

	const { setState } = props;

	props = props.parentProps;

	const { attributes, setAttributes, isSelected } = props;

	const { block_id, radioRequired, options, radioName } = attributes;

	const addOption = () => {
		const newOption = {
			optiontitle:
				__( 'Option Name ', 'ultimate-addons-for-gutenberg' ) +
				`${ options.length + 1 }`,
			optionvalue:
				__( 'Option Value ', 'ultimate-addons-for-gutenberg' ) +
				`${ options.length + 1 }`,
		};
		options[ options.length ] = newOption;
		const addnewOptions = options.map( ( item ) => item );

		setAttributes( { options: addnewOptions } );
		setState( { optionsstate: addnewOptions } );
	};

	const editView = options.map( ( option, index ) => {
		return (
			<div key={ index } className="uagb-form-radio-option">
				<input
					type="radio"
					name={ `radio-${ block_id }` }
					value={ option.optiontitle }
					id={ option.optiontitle }
				/>
				<label htmlFor={ option.optiontitle }></label>
				<input
					className="uagb-inner-input-view"
					aria-label={ option.optiontitle }
					onChange={ ( e ) =>
						changeOption(
							{
								optiontitle: e.target.value,
								optionvalue: e.target.value,
							},
							index
						)
					}
					type="text"
					value={ option.optiontitle }
				/>
				<input
					className="uagb-inner-input-view"
					aria-label={ option.optionvalue }
					onChange={ ( e ) =>
						changeOption( { optionvalue: e.target.value }, index )
					}
					type="text"
					value={ option.optionvalue }
				/>
				<Button
					className="uagb-form-radio-option-delete"
					icon="trash"
					label="Remove"
					onClick={ () => deleteOption( index ) }
				/>
			</div>
		);
	} );

	const RadioView = () => {
		return options.map( ( option ) => {
			const optionvalue = option.optionvalue;
			const value = optionvalue.replace( /\s+/g, '-' ).toLowerCase();
			return (
				<>
					<input
						type="radio"
						id={ value }
						name={ block_id }
						value={ optionvalue }
						required={ radioRequired }
					/>
					<label htmlFor={ value }>{ option.optiontitle }</label>
					<br />
				</>
			);
		} );
	};

	const changeOption = ( e, index ) => {
		const editOptions = options.map( ( item, thisIndex ) => {
			if ( index === thisIndex ) {
				item = { ...item, ...e };
			}
			return item;
		} );

		setAttributes( { options: editOptions } );
		setState( { optionsstate: editOptions } );
	};

	const deleteOption = ( index ) => {
		const deleteOptions = options.map( ( item, thisIndex ) => {
			if ( index === thisIndex ) {
				options.splice( index, 1 );
				item = { options };
			}
			return item;
		} );

		setState( { optionsstate: deleteOptions } );
		setAttributes( { deleteOptions } );
	};

	const isRequired = radioRequired
		? __( 'required', 'ultimate-addons-for-gutenberg' )
		: '';

	return (
		<>
			<div
				className={ classnames(
					'uagb-forms-radio-wrap',
					'uagb-forms-field-set',
					`uagb-block-${ block_id }`
				) }
			>
				{ isSelected && (
					<div className="uagb-forms-required-wrap">
						<ToggleControl
							label={ __(
								'Required',
								'ultimate-addons-for-gutenberg'
							) }
							checked={ radioRequired }
							onChange={ () =>
								setAttributes( {
									radioRequired: ! radioRequired,
								} )
							}
						/>
					</div>
				) }
				<RichText
					tagName="div"
					placeholder={ __(
						'Radio Title',
						'ultimate-addons-for-gutenberg'
					) }
					value={ radioName }
					onChange={ ( value ) =>
						setAttributes( { radioName: value } )
					}
					className={ `uagb-forms-radio-label ${ isRequired } uagb-forms-input-label` }
					multiline={ false }
					id={ block_id }
				/>
				{ isSelected && (
					<>
						<div className="uagb-forms-radio-controls">
							{ editView }
							<div>
								<Button isSecondary onClick={ addOption }>
									{ __(
										' + Add Option ',
										'ultimate-addons-for-gutenberg'
									) }
								</Button>
							</div>
						</div>
					</>
				) }

				{ ! isSelected && <RadioView /> }
			</div>
		</>
	);
};
export default React.memo( Render );
