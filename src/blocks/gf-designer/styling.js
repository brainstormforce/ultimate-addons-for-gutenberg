/**
 * Set inline styles.
 *
 * @param  {Object} props - The block object.
 * @return {Object} The inline background type CSS.
 */
import generateCSS from '@Controls/generateCSS';
import generateCSSUnit from '@Controls/generateCSSUnit';

function styling( props ) {
	const {
		align,
		titleDescAlignment,
		fieldHrPadding,
		fieldVrPadding,
		fieldBgColor,
		fieldLabelColor,
		fieldInputColor,
		fieldBorderStyle,
		fieldBorderWidth,
		fieldBorderRadius,
		fieldBorderColor,
		fieldBorderFocusColor,
		buttonVrPadding,
		buttonHrPadding,
		buttonTextColor,
		buttonBgColor,
		buttonTextHoverColor,
		buttonBgHoverColor,
		buttonBorderStyle,
		buttonBorderWidth,
		buttonBorderRadius,
		buttonBorderColor,
		buttonBorderHoverColor,
		fieldSpacing,
		fieldLabelSpacing,
		labelFontSize,
		labelFontSizeType,
		labelFontSizeTablet,
		labelFontSizeMobile,
		labelFontFamily,
		labelFontWeight,
		labelLineHeightType,
		labelLineHeight,
		labelLineHeightTablet,
		labelLineHeightMobile,
		textAreaHeight,
		inputFontSize,
		inputFontSizeType,
		inputFontSizeTablet,
		inputFontSizeMobile,
		inputFontFamily,
		inputFontWeight,
		inputLineHeightType,
		inputLineHeight,
		inputLineHeightTablet,
		inputLineHeightMobile,
		buttonFontSize,
		buttonFontSizeType,
		buttonFontSizeTablet,
		buttonFontSizeMobile,
		buttonFontFamily,
		buttonFontWeight,
		buttonLineHeightType,
		buttonLineHeight,
		buttonLineHeightTablet,
		buttonLineHeightMobile,
		highlightBorderColor,
		radioCheckSize,
		radioCheckBgColor,
		radioCheckSelectColor,
		radioCheckLableColor,
		radioCheckBorderColor,
		radioCheckBorderWidth,
		radioCheckBorderRadius,
		radioCheckFontSize,
		radioCheckFontSizeType,
		radioCheckFontSizeTablet,
		radioCheckFontSizeMobile,
		radioCheckFontFamily,
		radioCheckFontWeight,
		radioCheckLineHeightType,
		radioCheckLineHeight,
		radioCheckLineHeightTablet,
		radioCheckLineHeightMobile,
		validationMsgColor,
		validationMsgBgColor,
		validationMsgFontFamily,
		validationMsgFontWeight,
		validationMsgFontSize,
		validationMsgFontSizeType,
		validationMsgFontSizeTablet,
		validationMsgFontSizeMobile,
		validationMsgLineHeightType,
		validationMsgLineHeight,
		validationMsgLineHeightTablet,
		validationMsgLineHeightMobile,
		msgFontFamily,
		msgFontWeight,
		msgFontSize,
		msgFontSizeType,
		msgFontSizeTablet,
		msgFontSizeMobile,
		msgLineHeightType,
		msgLineHeight,
		msgLineHeightTablet,
		msgLineHeightMobile,
		successMsgFontFamily,
		successMsgFontWeight,
		successMsgFontSize,
		successMsgFontSizeType,
		successMsgFontSizeTablet,
		successMsgFontSizeMobile,
		successMsgLineHeightType,
		successMsgLineHeight,
		successMsgLineHeightTablet,
		successMsgLineHeightMobile,
		radioCheckBorderRadiusType,
		fieldBorderRadiusType,
		buttonBorderRadiusType,
		errorMsgColor,
		errorMsgBgColor,
		errorMsgBorderColor,
		msgBorderSize,
		msgBorderRadius,
		msgBorderRadiusType,
		msgVrPadding,
		msgHrPadding,
		successMsgColor,
	} = props.attributes;

	const selectors = {
		' .gform_wrapper form': {
			'text-align': align,
		},
		' .wp-block-uagb-gf-styler form:not(input)': {
			color: fieldLabelColor,
		},
		' .gform_heading': {
			'text-align': titleDescAlignment,
		},
		' input:not([type=submit])': {
			'background-color': fieldBgColor,
			color: fieldInputColor,
			'border-style': fieldBorderStyle,
			'border-color': fieldBorderColor,
			'border-width': generateCSSUnit( fieldBorderWidth, 'px' ),
			'border-radius': generateCSSUnit(
				fieldBorderRadius,
				fieldBorderRadiusType
			),
			'padding-left': generateCSSUnit( fieldHrPadding, 'px' ),
			'padding-right': generateCSSUnit( fieldHrPadding, 'px' ),
			'padding-top': generateCSSUnit( fieldVrPadding, 'px' ),
			'padding-bottom': generateCSSUnit( fieldVrPadding, 'px' ),
			'margin-top': generateCSSUnit( fieldLabelSpacing, 'px' ),
			'margin-bottom': generateCSSUnit( fieldSpacing, 'px' ),
			'font-size': generateCSSUnit( inputFontSize, inputFontSizeType ),
			'font-family': inputFontFamily,
			'font-weight': inputFontWeight,
			'line-height': generateCSSUnit(
				inputLineHeight,
				inputLineHeightType
			),
			'text-align': align,
		},
		' input[type=button]': {
			color: buttonTextColor,
			'background-color': buttonBgColor,
			'font-size': generateCSSUnit( buttonFontSize, buttonFontSizeType ),
			'font-family': buttonFontFamily,
			'font-weight': buttonFontWeight,
			'line-height': generateCSSUnit(
				buttonLineHeight,
				buttonLineHeightType
			),
			'border-color': buttonBorderColor,
			'border-style': buttonBorderStyle,
			'border-width': generateCSSUnit( buttonBorderWidth, 'px' ),
			'border-radius': generateCSSUnit(
				buttonBorderRadius,
				buttonBorderRadiusType
			),
			'padding-left': generateCSSUnit( buttonHrPadding, 'px' ),
			'padding-right': generateCSSUnit( buttonHrPadding, 'px' ),
			'padding-top': generateCSSUnit( buttonVrPadding, 'px' ),
			'padding-bottom': generateCSSUnit( buttonVrPadding, 'px' ),
		},
		' select': {
			'background-color': fieldBgColor,
			'border-style': fieldBorderStyle,
			'border-color': fieldBorderColor,
			'border-width': generateCSSUnit( fieldBorderWidth, 'px' ),
			'border-radius': generateCSSUnit(
				fieldBorderRadius,
				fieldBorderRadiusType
			),
			'margin-top': generateCSSUnit( fieldLabelSpacing, 'px' ),
			'margin-bottom': generateCSSUnit( fieldSpacing, 'px' ),
			color: fieldInputColor,
			'font-size': generateCSSUnit( inputFontSize, inputFontSizeType ),
			'font-family': inputFontFamily,
			'font-weight': inputFontWeight,
			'line-height': generateCSSUnit(
				inputLineHeight,
				inputLineHeightType
			),
			'text-align': align,
			'padding-left': generateCSSUnit( fieldHrPadding, 'px' ),
			'padding-right': generateCSSUnit( fieldHrPadding, 'px' ),
			'padding-top': generateCSSUnit( fieldVrPadding, 'px' ),
			'padding-bottom': generateCSSUnit( fieldVrPadding, 'px' ),
		},
		' .chosen-container-single span': {
			'background-color': fieldBgColor,
			'border-style': fieldBorderStyle,
			'border-color': fieldBorderColor,
			'border-width': generateCSSUnit( fieldBorderWidth, 'px' ),
			'border-radius': generateCSSUnit(
				fieldBorderRadius,
				fieldBorderRadiusType
			),
			'margin-top': generateCSSUnit( fieldLabelSpacing, 'px' ),
			'margin-bottom': generateCSSUnit( fieldSpacing, 'px' ),
			color: fieldInputColor,
			'font-size': generateCSSUnit( inputFontSize, inputFontSizeType ),
			'font-family': inputFontFamily,
			'font-weight': inputFontWeight,
			'line-height': generateCSSUnit(
				inputLineHeight,
				inputLineHeightType
			),
			'text-align': align,
			'padding-left': generateCSSUnit( fieldHrPadding, 'px' ),
			'padding-right': generateCSSUnit( fieldHrPadding, 'px' ),
			'padding-top': generateCSSUnit( fieldVrPadding, 'px' ),
			'padding-bottom': generateCSSUnit( fieldVrPadding, 'px' ),
		},
		' .chosen-container-single.chosen-container-active .chosen-single span': {
			'margin-bottom': 0,
		},
		" select.wpgf-form-control.wpgf-select:not([multiple='multiple'])": {
			'padding-left': generateCSSUnit( fieldHrPadding, 'px' ),
			'padding-right': generateCSSUnit( fieldHrPadding, 'px' ),
			'padding-top': generateCSSUnit( fieldVrPadding, 'px' ),
			'padding-bottom': generateCSSUnit( fieldVrPadding, 'px' ),
		},
		" select.wpgf-select[multiple='multiple'] option": {
			'padding-left': generateCSSUnit( fieldHrPadding, 'px' ),
			'padding-right': generateCSSUnit( fieldHrPadding, 'px' ),
			'padding-top': generateCSSUnit( fieldVrPadding, 'px' ),
			'padding-bottom': generateCSSUnit( fieldVrPadding, 'px' ),
		},
		' textarea': {
			'background-color': fieldBgColor,
			color: fieldInputColor,
			'border-color': fieldBorderColor,
			'border-width': generateCSSUnit( fieldBorderWidth, 'px' ),
			'border-radius': generateCSSUnit(
				fieldBorderRadius,
				fieldBorderRadiusType
			),
			'border-style': fieldBorderStyle,
			'padding-left': generateCSSUnit( fieldHrPadding, 'px' ),
			'padding-right': generateCSSUnit( fieldHrPadding, 'px' ),
			'padding-top': generateCSSUnit( fieldVrPadding, 'px' ),
			'padding-bottom': generateCSSUnit( fieldVrPadding, 'px' ),
			'margin-top': generateCSSUnit( fieldLabelSpacing, 'px' ),
			'margin-bottom': generateCSSUnit( fieldSpacing, 'px' ),
			'font-size': generateCSSUnit( inputFontSize, inputFontSizeType ),
			'font-family': inputFontFamily,
			'font-weight': inputFontWeight,
			'line-height': generateCSSUnit(
				inputLineHeight,
				inputLineHeightType
			),
			'text-align': align,
			height:
				'auto' === textAreaHeight
					? textAreaHeight
					: textAreaHeight + 'px',
		},
		' textarea::placeholder': {
			color: fieldInputColor,
			'text-align': align,
		},
		' input::placeholder': {
			color: fieldInputColor,
			'text-align': align,
		},
		' form label.gfield_label': {
			color: fieldLabelColor,
			'font-size': generateCSSUnit( labelFontSize, labelFontSizeType ),
			'font-family': labelFontFamily,
			'font-weight': labelFontWeight,
			'line-height': generateCSSUnit(
				labelLineHeight,
				labelLineHeightType
			),
		},
		' form .gfield_radio label.gfield_label': {
			color: fieldLabelColor,
			'font-size': generateCSSUnit( labelFontSize, labelFontSizeType ),
			'font-family': labelFontFamily,
			'font-weight': labelFontWeight,
			'line-height': generateCSSUnit(
				labelLineHeight,
				labelLineHeightType
			),
		},
		' form .gfield_checkbox label.gfield_label': {
			color: fieldLabelColor,
			'font-size': generateCSSUnit( labelFontSize, labelFontSizeType ),
			'font-family': labelFontFamily,
			'font-weight': labelFontWeight,
			'line-height': generateCSSUnit(
				labelLineHeight,
				labelLineHeightType
			),
		},
		" .wpgf .gfield_checkbox input[type='checkbox'] + label, .wpgf .gfield_checkbox input[type='checkbox'] + label": {
			'margin-top': generateCSSUnit( fieldLabelSpacing, 'px' ),
		},

		// Focus.
		' form input:not([type=submit]):focus': {
			'border-color': fieldBorderFocusColor,
		},
		' form select:focus': {
			'border-color': fieldBorderFocusColor,
		},
		' textarea:focus': {
			'border-color': fieldBorderFocusColor,
		},

		// Submit button.
		' input.gform_button': {
			color: buttonTextColor,
			'background-color': buttonBgColor,
			'font-size': generateCSSUnit( buttonFontSize, buttonFontSizeType ),
			'font-family': buttonFontFamily,
			'font-weight': buttonFontWeight,
			'line-height': generateCSSUnit(
				buttonLineHeight,
				buttonLineHeightType
			),
			'border-color': buttonBorderColor,
			'border-style': buttonBorderStyle,
			'border-width': generateCSSUnit( buttonBorderWidth, 'px' ),
			'border-radius': generateCSSUnit(
				buttonBorderRadius,
				buttonBorderRadiusType
			),
			'padding-left': generateCSSUnit( buttonHrPadding, 'px' ),
			'padding-right': generateCSSUnit( buttonHrPadding, 'px' ),
			'padding-top': generateCSSUnit( buttonVrPadding, 'px' ),
			'padding-bottom': generateCSSUnit( buttonVrPadding, 'px' ),
		},
		' input.gform_button:hover': {
			color: buttonTextHoverColor,
			'background-color': buttonBgHoverColor,
			'border-color': buttonBorderHoverColor,
		},
		' input.gform_next_button:hover': {
			color: buttonTextHoverColor,
			'background-color': buttonBgHoverColor,
			'border-color': buttonBorderHoverColor,
		},

		// Underline border.
		' .uagb-gf-styler__field-style-underline input:not([type=submit])': {
			'border-style': 'none',
			'border-bottom-color': fieldBorderColor,
			'border-bottom-style': 'solid',
			'border-bottom-width': generateCSSUnit( fieldBorderWidth, 'px' ),
			'border-radius': generateCSSUnit(
				fieldBorderRadius,
				fieldBorderRadiusType
			),
		},
		' .uagb-gf-styler__field-style-underline textarea': {
			'border-style': 'none',
			'border-bottom-color': fieldBorderColor,
			'border-bottom-style': 'solid',
			'border-bottom-width': generateCSSUnit( fieldBorderWidth, 'px' ),
			'border-radius': generateCSSUnit(
				fieldBorderRadius,
				fieldBorderRadiusType
			),
		},
		' .uagb-gf-styler__field-style-underline select': {
			'border-style': 'none',
			'border-bottom-color': fieldBorderColor,
			'border-bottom-style': 'solid',
			'border-bottom-width': generateCSSUnit( fieldBorderWidth, 'px' ),
			'border-radius': generateCSSUnit(
				fieldBorderRadius,
				fieldBorderRadiusType
			),
		},
		" .uagb-gf-styler__check-style-enabled input[type='radio'] + label:before": {
			'border-style': 'solid',
		},
		" .uagb-gf-styler__field-style-box .gfield_checkbox input[type='checkbox']:checked + label:before": {
			'border-style': 'solid',
			'border-width': generateCSSUnit( fieldBorderWidth, 'px' ),
			'border-radius': generateCSSUnit(
				fieldBorderRadius,
				fieldBorderRadiusType
			),
			'font-size': 'calc( ' + radioCheckSize + 'px / 1.2 )',
		},
		" .uagb-gf-styler__field-style-box input[type='checkbox']:checked + label:before": {
			'border-style': 'solid',
			'border-width': generateCSSUnit( fieldBorderWidth, 'px' ),
			'border-radius': generateCSSUnit(
				fieldBorderRadius,
				fieldBorderRadiusType
			),
			'font-size': 'calc( ' + radioCheckSize + 'px / 1.2)',
		},
		" .gfield_radio input[type='radio']:checked + label:before": {
			'background-color': fieldInputColor,
		},

		// Override check box.
		" .uagb-gf-styler__check-style-enabled .gfield_checkbox input[type='checkbox'] + label:before": {
			'background-color': radioCheckBgColor,
			color: radioCheckSelectColor,
			height: generateCSSUnit( radioCheckSize, 'px' ),
			width: generateCSSUnit( radioCheckSize, 'px' ),
			'font-size': 'calc( ' + radioCheckSize + 'px / 1.2 )',
			'border-color': radioCheckBorderColor,
			'border-style': 'solid',
			'border-width': generateCSSUnit( radioCheckBorderWidth, 'px' ),
			'border-radius': generateCSSUnit(
				radioCheckBorderRadius,
				radioCheckBorderRadiusType
			),
		},
		" .uagb-gf-styler__check-style-enabled .gfield_checkbox input[type='checkbox']:checked + label:before": {
			'border-color': fieldBorderFocusColor,
		},
		" .uagb-gf-styler__check-style-enabled input[type='checkbox'] + label:before": {
			'background-color': radioCheckBgColor,
			color: radioCheckSelectColor,
			height: generateCSSUnit( radioCheckSize, 'px' ),
			width: generateCSSUnit( radioCheckSize, 'px' ),
			'font-size': 'calc( ' + radioCheckSize + 'px / 1.2 )',
			'border-color': radioCheckBorderColor,
			'border-width': generateCSSUnit( radioCheckBorderWidth, 'px' ),
			'border-radius': generateCSSUnit(
				radioCheckBorderRadius,
				radioCheckBorderRadiusType
			),
			'border-style': 'solid',
		},
		" .uagb-gf-styler__check-style-enabled .gfield_radio input[type='radio'] + label:before": {
			'background-color': radioCheckBgColor,
			color: radioCheckSelectColor,
			height: generateCSSUnit( radioCheckSize, 'px' ),
			width: generateCSSUnit( radioCheckSize, 'px' ),
			'font-size': 'calc( ' + radioCheckSize + 'px / 1.2 )',
			'border-color': radioCheckBorderColor,
			'border-width': generateCSSUnit( radioCheckBorderWidth, 'px' ),
		},
		" .uagb-gf-styler__check-style-enabled .gfield_radio input[type='radio']:checked + label:before": {
			'background-color': radioCheckSelectColor,
		},
		' .uagb-gf-styler__check-style-enabled form .gfield_radio label': {
			'font-size': generateCSSUnit(
				radioCheckFontSize,
				radioCheckFontSizeType
			),
			'font-family': radioCheckFontFamily,
			'font-weight': radioCheckFontWeight,
			'line-height': generateCSSUnit(
				radioCheckLineHeight,
				radioCheckLineHeightType
			),
			color: radioCheckLableColor,
		},
		' .uagb-gf-styler__check-style-enabled form .gfield_checkbox label': {
			'font-size': generateCSSUnit(
				radioCheckFontSize,
				radioCheckFontSizeType
			),
			'font-family': radioCheckFontFamily,
			'font-weight': radioCheckFontWeight,
			'line-height': generateCSSUnit(
				radioCheckLineHeight,
				radioCheckLineHeightType
			),
			color: radioCheckLableColor,
		},

		' .gform_wrapper .gfield_description.validation_message': {
			color: validationMsgColor,
		},
		' .gform_wrapper .validation_message': {
			'font-size': generateCSSUnit(
				validationMsgFontSize,
				validationMsgFontSizeType
			),
			'font-family': validationMsgFontFamily,
			'font-weight': validationMsgFontWeight,
			'line-height': generateCSSUnit(
				validationMsgLineHeight,
				validationMsgLineHeightType
			),
		},
		' .uagb-gf-styler__error-yes .gform_wrapper .gfield.gfield_error': {
			'background-color': validationMsgBgColor,
		},

		" .uagb-gf-styler__error-yes .gform_wrapper li.gfield_error input:not([type='submit']):not([type='button']):not([type='image'])": {
			'border-color': highlightBorderColor,
		},

		' .uagb-gf-styler__error-yes .gform_wrapper .gfield_error .ginput_container select': {
			'border-color': highlightBorderColor,
		},

		' .uagb-gf-styler__error-yes .gform_wrapper .gfield_error .ginput_container .chosen-single': {
			'border-color': highlightBorderColor,
		},

		' .uagb-gf-styler__error-yes .gform_wrapper .gfield_error .ginput_container textarea': {
			'border-color': highlightBorderColor,
		},

		' .uagb-gf-styler__error-yes .gform_wrapper li.gfield.gfield_error': {
			'border-color': highlightBorderColor,
		},

		' .uagb-gf-styler__error-yes .gform_wrapper li.gfield.gfield_error.gfield_contains_required.gfield_creditcard_warning': {
			'border-color': highlightBorderColor,
		},

		" .uagb-gf-styler__error-yes li.gfield_error .gfield_checkbox input[type='checkbox'] + label:before": {
			'border-color': highlightBorderColor,
		},

		" .uagb-gf-styler__error-yes li.gfield_error .ginput_container_consent input[type='checkbox'] + label:before": {
			'border-color': highlightBorderColor,
		},

		" .uagb-gf-styler__error-yes li.gfield_error .gfield_radio input[type='radio'] + label:before": {
			'border-color': highlightBorderColor,
		},

		" .uagb-gf-styler__error-yes .gform_wrapper li.gfield_error input[type='text']": {
			'border-color':
				fieldBorderWidth +
				'px '.fieldBorderStyle +
				' ' +
				fieldBorderColor +
				'!important',
		},

		" .uael-gf-style-underline.uagb-gf-styler__error-yes .gform_wrapper li.gfield_error input[type='text']": {
			'border-width': fieldBorderWidth + 'px' + '!important',
			'border-style': 'solid' + '!important',
			'border-color': fieldBorderColor + '!important',
		},

		' .gform_wrapper div.validation_error': {
			color: errorMsgColor,
			'background-color': errorMsgBgColor,
			'border-color': errorMsgBorderColor,
			'border-style': 'solid',
			'border-width': generateCSSUnit( msgBorderSize, 'px' ),
			'border-radius': generateCSSUnit(
				msgBorderRadius,
				msgBorderRadiusType
			),
			padding: msgVrPadding + 'px ' + msgHrPadding + 'px',
			'font-size': msgFontSize.msgFontSizeType,
			'font-family': msgFontFamily,
			'font-weight': msgFontWeight,
			'line-height': generateCSSUnit( msgLineHeight, msgLineHeightType ),
		},

		' .gform_confirmation_message': {
			color: successMsgColor,
			'font-size': generateCSSUnit(
				successMsgFontSize,
				successMsgFontSizeType
			),
			'font-family': successMsgFontFamily,
			'font-weight': successMsgFontWeight,
			'line-height': generateCSSUnit(
				successMsgLineHeight,
				successMsgLineHeightType
			),
		},
	};

	const tabletSelectors = {
		' input:not([type=submit])': {
			'font-size': generateCSSUnit(
				inputFontSizeTablet,
				inputFontSizeType
			),
			'line-height': generateCSSUnit(
				inputLineHeightTablet,
				inputLineHeightType
			),
		},
		' select': {
			'font-size': generateCSSUnit(
				labelFontSizeTablet,
				labelFontSizeType
			),
			'line-height': generateCSSUnit(
				labelLineHeightTablet,
				labelLineHeightType
			),
		},
		' textarea': {
			'font-size': generateCSSUnit(
				inputFontSizeTablet,
				inputFontSizeType
			),
			'line-height': generateCSSUnit(
				inputLineHeightTablet,
				inputLineHeightType
			),
		},
		' form label': {
			'font-size': generateCSSUnit(
				labelFontSizeTablet,
				labelFontSizeType
			),
			'line-height': generateCSSUnit(
				labelLineHeightTablet,
				labelLineHeightType
			),
		},

		' form .gfield_radio label': {
			'font-size': generateCSSUnit(
				labelFontSizeTablet,
				labelFontSizeType
			),
			'line-height': generateCSSUnit(
				labelLineHeightTablet,
				labelLineHeightType
			),
		},
		' form .gfield_checkbox label': {
			'font-size': generateCSSUnit(
				labelFontSizeTablet,
				labelFontSizeType
			),
			'line-height': generateCSSUnit(
				labelLineHeightTablet,
				labelLineHeightType
			),
		},
		' input.gform_button': {
			'font-size': generateCSSUnit(
				buttonFontSizeTablet,
				buttonFontSizeType
			),
			'line-height': generateCSSUnit(
				buttonLineHeightTablet,
				buttonLineHeightType
			),
		},
		' .uagb-gf-styler__check-style-enabled form .gfield_radio label': {
			'font-size': generateCSSUnit(
				radioCheckFontSizeTablet,
				radioCheckFontSizeType
			),
			'line-height': generateCSSUnit(
				radioCheckLineHeightTablet,
				radioCheckLineHeightType
			),
		},
		' .uagb-gf-styler__check-style-enabled form .gfield_checkbox label': {
			'font-size': generateCSSUnit(
				radioCheckFontSizeTablet,
				radioCheckFontSizeType
			),
			'line-height': generateCSSUnit(
				radioCheckLineHeightTablet,
				radioCheckLineHeightType
			),
		},
		' span.wpgf-not-valid-tip': {
			'font-size': generateCSSUnit(
				validationMsgFontSizeTablet,
				validationMsgFontSizeType
			),
			'line-height': generateCSSUnit(
				validationMsgLineHeightTablet,
				validationMsgLineHeightType
			),
		},
		' .gform_wrapper .validation_message': {
			'font-size': generateCSSUnit(
				validationMsgFontSizeTablet,
				validationMsgFontSizeType
			),
			'line-height': generateCSSUnit(
				validationMsgLineHeightTablet,
				validationMsgLineHeightType
			),
		},
		' .gform_wrapper div.validation_error': {
			'font-size': generateCSSUnit( msgFontSizeTablet, msgFontSizeType ),
			'line-height': generateCSSUnit(
				msgLineHeightTablet,
				msgLineHeightType
			),
		},
		' .gform_confirmation_message': {
			'font-size': generateCSSUnit(
				successMsgFontSizeTablet,
				successMsgFontSizeType
			),
			'line-height': generateCSSUnit(
				successMsgLineHeightTablet,
				successMsgLineHeightType
			),
		},
	};

	const mobileSelectors = {
		' input:not([type=submit])': {
			'font-size': generateCSSUnit(
				inputFontSizeMobile,
				inputFontSizeType
			),
			'line-height': generateCSSUnit(
				inputLineHeightMobile,
				inputLineHeightType
			),
		},
		' select': {
			'font-size': generateCSSUnit(
				labelFontSizeMobile,
				labelFontSizeType
			),
			'line-height': generateCSSUnit(
				labelLineHeightMobile,
				labelLineHeightType
			),
		},
		' textarea': {
			'font-size': generateCSSUnit(
				inputFontSizeTablet,
				inputFontSizeType
			),
			'line-height': generateCSSUnit(
				inputLineHeightTablet,
				inputLineHeightType
			),
		},
		' form label': {
			'font-size': generateCSSUnit(
				inputFontSizeMobile,
				inputFontSizeType
			),
			'line-height': generateCSSUnit(
				inputLineHeightMobile,
				inputLineHeightType
			),
		},
		' form .gfield_radio label': {
			'font-size': generateCSSUnit(
				labelFontSizeMobile,
				labelFontSizeType
			),
			'line-height': generateCSSUnit(
				labelLineHeightMobile,
				labelLineHeightType
			),
		},
		' form .gfield_checkbox label': {
			'font-size': generateCSSUnit(
				labelFontSizeMobile,
				labelFontSizeType
			),
			'line-height': generateCSSUnit(
				labelLineHeightMobile,
				labelLineHeightType
			),
		},
		' input.gform_button': {
			'font-size': generateCSSUnit(
				buttonFontSizeMobile,
				buttonFontSizeType
			),
			'line-height': generateCSSUnit(
				buttonLineHeightMobile,
				buttonLineHeightType
			),
		},
		' .uagb-gf-styler__check-style-enabled form .gfield_radio label': {
			'font-size': generateCSSUnit(
				radioCheckFontSizeMobile,
				radioCheckFontSizeType
			),
			'line-height': generateCSSUnit(
				radioCheckLineHeightMobile,
				radioCheckLineHeightType
			),
		},
		' .uagb-gf-styler__check-style-enabled form .gfield_checkbox label': {
			'font-size': generateCSSUnit(
				radioCheckFontSizeMobile,
				radioCheckFontSizeType
			),
			'line-height': generateCSSUnit(
				radioCheckLineHeightMobile,
				radioCheckLineHeightType
			),
		},
		' span.wpgf-not-valid-tip': {
			'font-size': generateCSSUnit(
				validationMsgFontSizeMobile,
				validationMsgFontSizeType
			),
			'line-height': generateCSSUnit(
				validationMsgLineHeightMobile,
				validationMsgLineHeightType
			),
		},
		' .gform_wrapper .validation_message': {
			'font-size': generateCSSUnit(
				validationMsgFontSizeMobile,
				validationMsgFontSizeType
			),
			'line-height': generateCSSUnit(
				validationMsgLineHeightMobile,
				validationMsgLineHeightType
			),
		},
		' .gform_wrapper div.validation_error': {
			'font-size': generateCSSUnit( msgFontSizeMobile, msgFontSizeType ),
			'line-height': generateCSSUnit(
				msgLineHeightMobile,
				msgLineHeightType
			),
		},
		' .gform_confirmation_message': {
			'font-size': generateCSSUnit(
				successMsgFontSizeMobile,
				successMsgFontSizeType
			),
			'line-height': generateCSSUnit(
				successMsgLineHeightMobile,
				successMsgLineHeightType
			),
		},
	};

	let stylingCss = generateCSS(
		selectors,
		`.block-editor-page #wpwrap .edit-post-visual-editor .wp-block-uagb-gf-styler.uagb-block-${ props.clientId.substr(
			0,
			8
		) }`
	);

	stylingCss += generateCSS(
		tabletSelectors,
		`.block-editor-page #wpwrap .uagb-block-${ props.clientId.substr(
			0,
			8
		) }`,
		true,
		'tablet'
	);

	stylingCss += generateCSS(
		mobileSelectors,
		`.block-editor-page #wpwrap .uagb-block-${ props.clientId.substr(
			0,
			8
		) }`,
		true,
		'mobile'
	);

	return stylingCss;
}

export default styling;
