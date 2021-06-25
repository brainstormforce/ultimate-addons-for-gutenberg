module.exports = {
	extends: [ 'plugin:@wordpress/eslint-plugin/recommended' ],
	ignorePatterns: [ 'deprecated.js' ],
	rules: {
		camelcase: 'off',
	},
	globals: {
		uagb_blocks_info: true,
		UAGB_Block_Icons: true,
		__webpack_public_path__: true,
	},
};
