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
		validationMsgFontSizeType,
		validationMsgFontSizeTablet,
		validationMsgFontSizeMobile,
		validationMsgLineHeightType,
		validationMsgLineHeightTablet,
		validationMsgLineHeightMobile,
		radioCheckBorderRadiusType,
		fieldBorderRadiusType,
		buttonBorderRadiusType,
	} = props.attributes;

	const selectors = {
		' .wpcf7 .wpcf7-form': {
			'text-align': align,
		},
		' .wpcf7 form.wpcf7-form:not(input)': {
			color: fieldLabelColor,
		},
		' .wpcf7 input:not([type=submit])': {
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
		' .wpcf7 select': {
			'background-color': fieldBgColor,
			color: fieldLabelColor,
			'border-style': fieldBorderStyle,
			'border-color': fieldBorderColor,
			'border-width': generateCSSUnit( fieldBorderWidth, 'px' ),
			'border-radius': generateCSSUnit(
				fieldBorderRadius,
				fieldBorderRadiusType
			),
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
		" .wpcf7 select.wpcf7-form-control.wpcf7-select:not([multiple='multiple'])": {
			'padding-left': generateCSSUnit( fieldHrPadding, 'px' ),
			'padding-right': generateCSSUnit( fieldHrPadding, 'px' ),
			'padding-top': generateCSSUnit( fieldVrPadding, 'px' ),
			'padding-bottom': generateCSSUnit( fieldVrPadding, 'px' ),
		},
		" .wpcf7 select.wpcf7-select[multiple='multiple'] option": {
			'padding-left': generateCSSUnit( fieldHrPadding, 'px' ),
			'padding-right': generateCSSUnit( fieldHrPadding, 'px' ),
			'padding-top': generateCSSUnit( fieldVrPadding, 'px' ),
			'padding-bottom': generateCSSUnit( fieldVrPadding, 'px' ),
		},
		' .wpcf7 textarea': {
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
		},
		' .wpcf7 input::placeholder': {
			color: fieldInputColor,
			'text-align': align,
		},
		' .wpcf7 textarea::placeholder': {
			color: fieldInputColor,
			'text-align': align,
		},
		' .wpcf7 form label': {
			'font-size': generateCSSUnit( labelFontSize, labelFontSizeType ),
			'font-family': labelFontFamily,
			'font-weight': labelFontWeight,
			'line-height': generateCSSUnit(
				labelLineHeight,
				labelLineHeightType
			),
		},
		' .wpcf7 form .wpcf7-list-item-label': {
			'font-size': generateCSSUnit( labelFontSize, labelFontSizeType ),
			'font-family': labelFontFamily,
			'font-weight': labelFontWeight,
			'line-height': generateCSSUnit(
				labelLineHeight,
				labelLineHeightType
			),
		},

		//Focus
		' .wpcf7 form input:not([type=submit]):focus': {
			'border-color': fieldBorderFocusColor,
		},
		' .wpcf7 form select:focus': {
			'border-color': fieldBorderFocusColor,
		},
		' .wpcf7 textarea:focus': {
			'border-color': fieldBorderFocusColor,
		},

		//Submit button
		' .wpcf7 input.wpcf7-form-control.wpcf7-submit': {
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

		' .wpcf7 input.wpcf7-form-control.wpcf7-submit:hover': {
			color: buttonTextHoverColor,
			'background-color': buttonBgHoverColor,
			'border-color': buttonBorderHoverColor,
		},

		// Check box Radio.
		" .wpcf7 .wpcf7-checkbox input[type='checkbox']:checked + span:before": {
			'background-color': fieldBgColor,
			color: fieldInputColor,
			'font-size': 'calc( ' + fieldVrPadding + 'px / 1.2 )',
			'border-color': fieldBorderFocusColor,
		},
		" .wpcf7 .wpcf7-checkbox input[type='checkbox'] + span:before": {
			'background-color': fieldBgColor,
			color: fieldInputColor,
			height: generateCSSUnit( fieldVrPadding, 'px' ),
			width: generateCSSUnit( fieldVrPadding, 'px' ),
			'font-size': 'calc( ' + fieldVrPadding + 'px / 1.2 )',
			'border-style': fieldBorderStyle,
			'border-color': fieldBorderColor,
			'border-width': generateCSSUnit( fieldBorderWidth, 'px' ),
			'border-radius': generateCSSUnit(
				fieldBorderRadius,
				fieldBorderRadiusType
			),
		},
		" .wpcf7 .wpcf7-acceptance input[type='checkbox']:checked + span:before": {
			'background-color': fieldBgColor,
			color: fieldInputColor,
			'border-color': fieldBorderFocusColor,
		},
		" .wpcf7 .wpcf7-acceptance input[type='checkbox'] + span:before": {
			'background-color': fieldBgColor,
			color: fieldInputColor,
			height: generateCSSUnit( fieldVrPadding, 'px' ),
			width: generateCSSUnit( fieldVrPadding, 'px' ),
			'font-size': 'calc( ' + fieldVrPadding + 'px / 1.2 )',
			'border-style': fieldBorderStyle,
			'border-color': fieldBorderColor,
			'border-width': generateCSSUnit( fieldBorderWidth, 'px' ),
			'border-radius': generateCSSUnit(
				fieldBorderRadius,
				fieldBorderRadiusType
			),
		},
		" .wpcf7 .wpcf7-radio input[type='radio'] + span:before": {
			'background-color': fieldBgColor,
			color: fieldInputColor,
			'border-style': fieldBorderStyle,
			'border-color': fieldBorderColor,
			'border-width': generateCSSUnit( fieldBorderWidth, 'px' ),
			height: 'calc( ' + fieldVrPadding + 'px / 1.2 )',
			width: 'calc( ' + fieldVrPadding + 'px / 1.2 )',
		},

		// underline border
		' .uagb-cf7-styler__field-style-underline .wpcf7 input:not([type=submit])': {
			'border-style': 'none',
			'border-bottom-color': fieldBorderColor,
			'border-bottom-style': 'solid',
			'border-bottom-width': generateCSSUnit( fieldBorderWidth, 'px' ),
			'border-radius': generateCSSUnit(
				fieldBorderRadius,
				fieldBorderRadiusType
			),
		},
		' .uagb-cf7-styler__field-style-underline select': {
			'border-style': 'none',
			'border-bottom-color': fieldBorderColor,
			'border-bottom-style': 'solid',
			'border-bottom-width': generateCSSUnit( fieldBorderWidth, 'px' ),
			'border-radius': generateCSSUnit(
				fieldBorderRadius,
				fieldBorderRadiusType
			),
		},
		' .uagb-cf7-styler__field-style-underline textarea': {
			'border-style': 'none',
			'border-bottom-color': fieldBorderColor,
			'border-bottom-style': 'solid',
			'border-bottom-width': generateCSSUnit( fieldBorderWidth, 'px' ),
			'border-radius': generateCSSUnit(
				fieldBorderRadius,
				fieldBorderRadiusType
			),
		},
		" .uagb-cf7-styler__field-style-underline .wpcf7-checkbox input[type='checkbox'] + span:before": {
			'border-style': 'solid',
		},
		" .uagb-cf7-styler__field-style-underline .wpcf7 input[type='radio'] + span:before": {
			'border-style': 'solid',
		},
		" .uagb-cf7-styler__field-style-underline .wpcf7-acceptance input[type='checkbox'] + span:before": {
			'border-style': 'solid',
		},
		" .wpcf7-radio input[type='radio']:checked + span:before": {
			'background-color': fieldInputColor,
			'border-color': fieldBorderFocusColor,
		},

		// Override check box , Radio & acceptance.
		" .uagb-cf7-styler__check-style-enabled .wpcf7 .wpcf7-checkbox input[type='checkbox'] + span:before": {
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
		},
		" .uagb-cf7-styler__check-style-enabled .wpcf7 .wpcf7-checkbox input[type='checkbox']:checked + span:before": {
			'border-color': fieldBorderFocusColor,
		},
		" .uagb-cf7-styler__check-style-enabled .wpcf7 .wpcf7-acceptance input[type='checkbox'] + span:before": {
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
		},
		" .uagb-cf7-styler__check-style-enabled .wpcf7 .wpcf7-acceptance input[type='checkbox']:checked + span:before": {
			'border-color': fieldBorderFocusColor,
		},

		" .uagb-cf7-styler__check-style-enabled .wpcf7 input[type='radio'] + span:before": {
			'background-color': radioCheckBgColor,
			color: radioCheckSelectColor,
			height: generateCSSUnit( radioCheckSize, 'px' ),
			width: generateCSSUnit( radioCheckSize, 'px' ),
			'font-size': 'calc( ' + radioCheckSize + 'px / 1.2 )',
			'border-color': radioCheckBorderColor,
			'border-width': generateCSSUnit( radioCheckBorderWidth, 'px' ),
		},

		" .uagb-cf7-styler__check-style-enabled .wpcf7-radio input[type='radio']:checked + span:before": {
			'background-color': radioCheckSelectColor,
			'border-color': fieldBorderFocusColor,
		},
		' .uagb-cf7-styler__check-style-enabled .wpcf7 form .wpcf7-list-item-label': {
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
	};

	const tabletSelectors = {
		' .wpcf7 input:not([type=submit])': {
			'font-size': generateCSSUnit(
				inputFontSizeTablet,
				inputFontSizeType
			),
			'line-height': generateCSSUnit(
				inputLineHeightTablet,
				inputLineHeightType
			),
		},
		' .wpcf7 select': {
			'font-size': generateCSSUnit(
				labelFontSizeTablet,
				labelFontSizeType
			),
			'line-height': generateCSSUnit(
				labelLineHeightTablet,
				labelLineHeightType
			),
		},
		' .wpcf7 textarea': {
			'font-size': generateCSSUnit(
				inputFontSizeTablet,
				inputFontSizeType
			),
			'line-height': generateCSSUnit(
				inputLineHeightTablet,
				inputLineHeightType
			),
		},
		' .wpcf7 form label': {
			'font-size': generateCSSUnit(
				labelFontSizeTablet,
				labelFontSizeType
			),
			'line-height': generateCSSUnit(
				labelLineHeightTablet,
				labelLineHeightType
			),
		},

		' .wpcf7 form .wpcf7-list-item-label': {
			'font-size': generateCSSUnit(
				labelFontSizeTablet,
				labelFontSizeType
			),
			'line-height': generateCSSUnit(
				labelLineHeightTablet,
				labelLineHeightType
			),
		},
		' .wpcf7 input.wpcf7-form-control.wpcf7-submit': {
			'font-size': generateCSSUnit(
				buttonFontSizeTablet,
				buttonFontSizeType
			),
			'line-height': generateCSSUnit(
				buttonLineHeightTablet,
				buttonLineHeightType
			),
		},
		' .uagb-cf7-styler__check-style-enabled .wpcf7 form .wpcf7-list-item-label': {
			'font-size': generateCSSUnit(
				radioCheckFontSizeTablet,
				radioCheckFontSizeType
			),
			'line-height': generateCSSUnit(
				radioCheckLineHeightTablet,
				radioCheckLineHeightType
			),
		},
		' span.wpcf7-not-valid-tip': {
			'font-size': generateCSSUnit(
				validationMsgFontSizeTablet,
				validationMsgFontSizeType
			),
			'line-height': generateCSSUnit(
				validationMsgLineHeightTablet,
				validationMsgLineHeightType
			),
		},
	};

	const mobileSelectors = {
		' .wpcf7 input:not([type=submit])': {
			'font-size': generateCSSUnit(
				inputFontSizeMobile,
				inputFontSizeType
			),
			'line-height': generateCSSUnit(
				inputLineHeightMobile,
				inputLineHeightType
			),
		},
		' .wpcf7 select': {
			'font-size': generateCSSUnit(
				labelFontSizeMobile,
				labelFontSizeType
			),
			'line-height': generateCSSUnit(
				labelLineHeightMobile,
				labelLineHeightType
			),
		},
		' .wpcf7 textarea': {
			'font-size': generateCSSUnit(
				inputFontSizeTablet,
				inputFontSizeType
			),
			'line-height': generateCSSUnit(
				inputLineHeightTablet,
				inputLineHeightType
			),
		},
		' .wpcf7 form label': {
			'font-size': generateCSSUnit(
				inputFontSizeMobile,
				inputFontSizeType
			),
			'line-height': generateCSSUnit(
				inputLineHeightMobile,
				inputLineHeightType
			),
		},
		' .wpcf7 form .wpcf7-list-item-label': {
			'font-size': generateCSSUnit(
				labelFontSizeMobile,
				labelFontSizeType
			),
			'line-height': generateCSSUnit(
				labelLineHeightMobile,
				labelLineHeightType
			),
		},
		' .wpcf7 input.wpcf7-form-control.wpcf7-submit': {
			'font-size': generateCSSUnit(
				buttonFontSizeMobile,
				buttonFontSizeType
			),
			'line-height': generateCSSUnit(
				buttonLineHeightMobile,
				buttonLineHeightType
			),
		},
		' .uagb-cf7-styler__check-style-enabled .wpcf7 form .wpcf7-list-item-label': {
			'font-size': generateCSSUnit(
				radioCheckFontSizeMobile,
				radioCheckFontSizeType
			),
			'line-height': generateCSSUnit(
				radioCheckLineHeightMobile,
				radioCheckLineHeightType
			),
		},
		' span.wpcf7-not-valid-tip': {
			'font-size': generateCSSUnit(
				validationMsgFontSizeMobile,
				validationMsgFontSizeType
			),
			'line-height': generateCSSUnit(
				validationMsgLineHeightMobile,
				validationMsgLineHeightType
			),
		},
	};

	let stylingCss = generateCSS(
		selectors,
		`.block-editor-page #wpwrap .uagb-block-${ props.clientId.substr(
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
