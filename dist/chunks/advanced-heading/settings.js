(window["webpackJsonp_ultimate_addons_for_gutenberg"] = window["webpackJsonp_ultimate_addons_for_gutenberg"] || []).push([["chunks/advanced-heading/settings"],{

/***/ "./src/blocks/star-rating/settings.js":
/*!********************************************!*\
  !*** ./src/blocks/star-rating/settings.js ***!
  \********************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);
!(function webpackMissingModule() { var e = new Error("Cannot find module '@Controls/lazy-loader'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
!(function webpackMissingModule() { var e = new Error("Cannot find module '@Components/typography'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
!(function webpackMissingModule() { var e = new Error("Cannot find module '@Components/typography/fontloader'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/block-editor */ "@wordpress/block-editor");
/* harmony import */ var _wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__);









var Settings = function Settings(props) {
  props = props.parentProps;
  var _props = props,
      attributes = _props.attributes,
      setAttributes = _props.setAttributes,
      _props$attributes = _props.attributes,
      rating = _props$attributes.rating,
      range = _props$attributes.range,
      align = _props$attributes.align,
      size = _props$attributes.size,
      gap = _props$attributes.gap,
      unmarkedColor = _props$attributes.unmarkedColor,
      color = _props$attributes.color,
      title = _props$attributes.title,
      loadGoogleFonts = _props$attributes.loadGoogleFonts,
      fontFamily = _props$attributes.fontFamily,
      fontWeight = _props$attributes.fontWeight,
      fontSubset = _props$attributes.fontSubset,
      fontSizeType = _props$attributes.fontSizeType,
      fontSize = _props$attributes.fontSize,
      fontSizeMobile = _props$attributes.fontSizeMobile,
      fontSizeTablet = _props$attributes.fontSizeTablet,
      lineHeightType = _props$attributes.lineHeightType,
      lineHeight = _props$attributes.lineHeight,
      lineHeightMobile = _props$attributes.lineHeightMobile,
      lineHeightTablet = _props$attributes.lineHeightTablet,
      titleColor = _props$attributes.titleColor,
      titleGap = _props$attributes.titleGap;
  var loadTitleGoogleFonts;

  if (loadGoogleFonts == true) {
    var hconfig = {
      google: {
        families: [fontFamily + (fontWeight ? ':' + fontWeight : '')]
      }
    };
    loadTitleGoogleFonts = Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(!(function webpackMissingModule() { var e = new Error("Cannot find module '@Components/typography/fontloader'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()), {
      config: hconfig
    });
  }
  /**
   * Adds all Feneral tab controls.
   */


  var generalSettings = function generalSettings() {
    return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__["PanelBody"], {
      title: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__["__"])("General", 'ultimate-addons-for-gutenberg')
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__["SelectControl"], {
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__["__"])("Range", 'ultimate-addons-for-gutenberg'),
      value: range,
      onChange: function onChange(value) {
        return setAttributes({
          range: value
        });
      },
      options: [{
        value: "5",
        label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__["__"])("1-5", 'ultimate-addons-for-gutenberg')
      }, {
        value: "10",
        label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__["__"])("1-10", 'ultimate-addons-for-gutenberg')
      }]
    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__["RangeControl"], {
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__["__"])("Rating", 'ultimate-addons-for-gutenberg'),
      value: rating,
      onChange: function onChange(value) {
        return setAttributes({
          rating: value
        });
      },
      min: 0,
      max: range,
      beforeIcon: "",
      allowReset: true,
      initialPosition: 0
    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("hr", null), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(BaseControl, null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(BaseControl.VisualLabel, null, Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__["__"])('Alignment', 'ultimate-addons-for-gutenberg')), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(BlockAlignmentToolbar, {
      value: align,
      onChange: function onChange(value) {
        return setAttributes({
          align: value
        });
      },
      controls: ['left', 'center', 'right', 'full'],
      isCollapsed: false
    })), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__["RangeControl"], {
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__["__"])("Size", 'ultimate-addons-for-gutenberg'),
      value: size,
      onChange: function onChange(value) {
        return setAttributes({
          size: value
        });
      },
      min: 0,
      max: 100,
      beforeIcon: "",
      allowReset: true,
      initialPosition: 0
    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__["RangeControl"], {
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__["__"])("Spacing", 'ultimate-addons-for-gutenberg'),
      value: gap,
      onChange: function onChange(value) {
        return setAttributes({
          gap: value
        });
      },
      min: 0,
      max: 50,
      beforeIcon: "",
      allowReset: true,
      initialPosition: 0
    }));
  };
  /**
   * Adds all Design tab controls.
   */


  var designSettings = function designSettings() {
    return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__["PanelBody"], {
      title: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__["__"])("Design", 'ultimate-addons-for-gutenberg'),
      initialOpen: false
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("h3", null, Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__["__"])("Star", 'ultimate-addons-for-gutenberg')), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("p", {
      className: "uagb-setting-label"
    }, Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__["__"])("Color", 'ultimate-addons-for-gutenberg'), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("span", {
      className: "components-base-control__label"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("span", {
      className: "component-color-indicator",
      style: {
        backgroundColor: color
      }
    }))), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__["ColorPalette"], {
      value: color,
      onChange: function onChange(value) {
        return setAttributes({
          color: value
        });
      },
      allowReset: true
    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("p", {
      className: "uagb-setting-label"
    }, Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__["__"])("Unmarked Color", 'ultimate-addons-for-gutenberg'), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("span", {
      className: "components-base-control__label"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("span", {
      className: "component-color-indicator",
      style: {
        backgroundColor: unmarkedColor
      }
    }))), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__["ColorPalette"], {
      value: unmarkedColor,
      onChange: function onChange(value) {
        return setAttributes({
          unmarkedColor: value
        });
      },
      allowReset: true
    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("hr", null), '' !== title && Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(Fragment, null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("h3", null, Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__["__"])("Title", 'ultimate-addons-for-gutenberg')), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(!(function webpackMissingModule() { var e = new Error("Cannot find module '@Components/typography'"); e.code = 'MODULE_NOT_FOUND'; throw e; }()), {
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__["__"])("Typography", 'ultimate-addons-for-gutenberg'),
      attributes: attributes,
      setAttributes: setAttributes,
      loadGoogleFonts: {
        value: loadGoogleFonts,
        label: 'loadGoogleFonts'
      },
      fontFamily: {
        value: fontFamily,
        label: 'fontFamily'
      },
      fontWeight: {
        value: fontWeight,
        label: 'fontWeight'
      },
      fontSubset: {
        value: fontSubset,
        label: 'fontSubset'
      },
      fontSizeType: {
        value: fontSizeType,
        label: 'fontSizeType'
      },
      fontSize: {
        value: fontSize,
        label: 'fontSize'
      },
      fontSizeMobile: {
        value: fontSizeMobile,
        label: 'fontSizeMobile'
      },
      fontSizeTablet: {
        value: fontSizeTablet,
        label: 'fontSizeTablet'
      },
      lineHeightType: {
        value: lineHeightType,
        label: 'lineHeightType'
      },
      lineHeight: {
        value: lineHeight,
        label: 'lineHeight'
      },
      lineHeightMobile: {
        value: lineHeightMobile,
        label: 'lineHeightMobile'
      },
      lineHeightTablet: {
        value: lineHeightTablet,
        label: 'lineHeightTablet'
      }
    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("p", {
      className: "uagb-setting-label"
    }, Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__["__"])("Title Color", 'ultimate-addons-for-gutenberg'), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("span", {
      className: "components-base-control__label"
    }, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("span", {
      className: "component-color-indicator",
      style: {
        backgroundColor: titleColor
      }
    }))), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__["ColorPalette"], {
      value: titleColor,
      onChange: function onChange(value) {
        return setAttributes({
          titleColor: value
        });
      },
      allowReset: true
    }), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_components__WEBPACK_IMPORTED_MODULE_5__["RangeControl"], {
      label: Object(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__["__"])("Title Gap", 'ultimate-addons-for-gutenberg'),
      value: titleGap,
      onChange: function onChange(value) {
        return setAttributes({
          titleGap: value
        });
      },
      min: 0,
      max: 50,
      beforeIcon: "",
      allowReset: true,
      initialPosition: 0
    })));
  };

  return Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])("div", null, Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(_wordpress_block_editor__WEBPACK_IMPORTED_MODULE_4__["InspectorControls"], null, generalSettings(), designSettings()), Object(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__["createElement"])(react__WEBPACK_IMPORTED_MODULE_1__["Suspense"], {
    fallback: !(function webpackMissingModule() { var e = new Error("Cannot find module '@Controls/lazy-loader'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())()
  }, loadTitleGoogleFonts));
};

/* harmony default export */ __webpack_exports__["default"] = (react__WEBPACK_IMPORTED_MODULE_1___default.a.memo(Settings));

/***/ })

}]);
//# sourceMappingURL=settings.js.map