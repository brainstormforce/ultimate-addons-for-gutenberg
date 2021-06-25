/**
 * BLOCK: UAGB Review Block Attributes
 */
import { __ } from '@wordpress/i18n';

const attributes = {
	ID: {
		type: 'string',
		default: '',
	},
	itemType: {
		type: 'string',
		default: __( 'Product' ),
	},
	itemSubtype: {
		type: 'string',
		default: '',
	},
	reviewPublisher: {
		type: 'string',
		default: '',
	},
	bookAuthorName: {
		type: 'string',
		default: '',
	},
	isbn: {
		type: 'string',
		default: '',
	},
	provider: {
		type: 'string',
		default: '',
	},
	appCategory: {
		type: 'string',
		default: '',
	},
	operatingSystem: {
		type: 'string',
		default: '',
	},
	datecreated: {
		type: 'string',
		default: 'Dec 19 2020',
	},
	directorname: {
		type: 'string',
		default: '',
	},
	overallAlignment: {
		type: 'string',
		default: 'left',
	},
	schema: {
		type: 'string',
		default: '',
	},
	rTitle: {
		type: 'string',
		default: '',
	},
	rContent: {
		type: 'string',
		default: '',
	},
	rAuthor: {
		type: 'string',
		default: '',
	},
	headingTag: {
		type: 'string',
		default: 'h3',
	},
	block_id: {
		type: 'string',
		default: '',
	},
	mainimage: {
		type: 'object',
		default: {
			url: '',
		},
	},
	imgSize: {
		type: 'string',
		default: 'thumbnail',
	},
	authorName: {
		type: 'string',
		default: '',
	},
	itemName: {
		type: 'string',
		default: '',
	},
	items: {
		type: 'string',
		default: '[{"label":"","value":0}]',
	},
	description: {
		type: 'string',
		default: '',
	},
	descriptionAlign: {
		type: 'string',
		default: 'left',
	},
	imgURL: {
		type: 'string',
		default: '',
	},
	imgID: {
		type: 'number',
	},
	imgAlt: {
		type: 'string',
		default: '',
	},
	parts: {
		type: 'array',
		default: [ { label: '', value: 0 } ],
	},
	starCount: {
		type: 'number',
		default: 5,
	},
	summaryTitle: {
		type: 'string',
		default: __( 'Summary' ),
	},
	summaryDescription: {
		type: 'string',
		default: '',
	},
	callToActionText: {
		type: 'string',
		default: '',
	},
	ctaLink: {
		type: 'string',
		default: '#',
	},
	callToActionBackColor: {
		type: 'string',
		default: '#f63d3d',
	},
	callToActionForeColor: {
		type: 'string',
		default: '#ffffff',
	},
	inactiveStarColor: {
		type: 'string',
		default: '#888888',
	},
	activeStarColor: {
		type: 'string',
		default: '#eeee00',
	},
	authorColor: {
		type: 'string',
		default: '',
	},
	summaryColor: {
		type: 'string',
		default: '',
	},
	titleAlign: {
		type: 'string',
		default: 'left',
	},
	authorAlign: {
		type: 'string',
		default: 'left',
	},
	enableCTA: {
		type: 'boolean',
		default: true,
	},
	ctaNoFollow: {
		type: 'boolean',
		default: true,
	},
	ctaOpenInNewTab: {
		type: 'boolean',
		default: true,
	},
	enableReviewSchema: {
		type: 'boolean',
		default: true,
	},
	enableImage: {
		type: 'boolean',
		default: true,
	},
	enableDescription: {
		type: 'boolean',
		default: true,
	},
	enableSchema: {
		type: 'boolean',
		default: true,
	},
	starOutlineColor: {
		type: 'string',
		default: '#000000',
	},
	starActiveColor: {
		type: 'string',
		default: '#000000',
	},
	imageSize: {
		type: 'number',
		default: 100, //range: 0-200
	},
	brand: {
		type: 'string',
		default: '',
	},
	sku: {
		type: 'string',
		default: '',
	},
	identifier: {
		type: 'string',
		default: '',
	},
	identifierType: {
		type: 'string',
		default: 'gtin',
	},
	ctaTarget: {
		type: 'boolean',
		default: false,
	},
	offerType: {
		type: 'string',
		default: 'Offer',
	},
	offerStatus: {
		type: 'string',
		default: '',
	},
	offerPrice: {
		type: 'string',
		default: 0,
	},
	offerCurrency: {
		type: 'string',
		default: 'USD',
	},
	offerExpiry: {
		type: 'string',
		default: 'Dec 19 2020',
	},
	datepublish: {
		type: 'string',
		default: 'Dec 19 2020',
	},
	featuresTitle: {
		type: 'string',
		default: __( 'List Of Features:' ),
	},
	featuresAvgText: {
		type: 'string',
		default: __( 'Average Ratings' ),
	},
	feature_count: {
		type: 'number',
		default: 1,
	},
	showFeature: {
		type: 'boolean',
		default: false,
	},
	showAuthor: {
		type: 'boolean',
		default: true,
	},
	starSize: {
		type: 'number',
		default: 20,
	},
	starColor: {
		type: 'string',
		default: '#ffff00',
	},
	selectedStars: {
		type: 'number',
		default: 0,
	},
	starAlign: {
		type: 'string',
		default: 'left',
	},
	descColor: {
		type: 'string',
		default: '',
	},
	titleColor: {
		type: 'string',
		default: '',
	},
	pricevalue: {
		type: 'string',
		default: 'US$65',
	},
	pricetext: {
		type: 'string',
		default: 'Price',
	},
	availabilityvalue: {
		type: 'string',
		default: __( 'Instock' ),
	},
	availabilitytext: {
		type: 'string',
		default: __( 'Availability' ),
	},
	contentVrPadding: {
		type: 'number',
		default: 15,
	},
	contentHrPadding: {
		type: 'number',
		default: 50,
	},
	star_gap: {
		type: 'number',
		default: 100,
	},
	contentColor: {
		type: 'string',
		default: '',
	},
	author: {
		type: 'string',
		default: '',
	},
	headFontFamily: {
		type: 'string',
		default: 'Default',
	},
	headFontWeight: {
		type: 'string',
	},
	headFontSubset: {
		type: 'string',
	},
	headFontSizeType: {
		type: 'string',
		default: 'px',
	},
	headLineHeightType: {
		type: 'string',
		default: 'em',
	},
	headFontSize: {
		type: 'number',
	},
	headFontSizeTablet: {
		type: 'number',
	},
	headFontSizeMobile: {
		type: 'number',
	},
	headLineHeight: {
		type: 'number',
	},
	headLineHeightTablet: {
		type: 'number',
	},
	headLineHeightMobile: {
		type: 'number',
	},
	subHeadFontFamily: {
		type: 'string',
		default: '',
	},
	subHeadFontWeight: {
		type: 'string',
	},
	subHeadFontSubset: {
		type: 'string',
	},
	subHeadFontSize: {
		type: 'number',
	},
	subHeadFontSizeType: {
		type: 'string',
		default: 'px',
	},
	subHeadFontSizeTablet: {
		type: 'number',
	},
	subHeadFontSizeMobile: {
		type: 'number',
	},
	subHeadLineHeight: {
		type: 'number',
	},
	subHeadLineHeightType: {
		type: 'string',
		default: 'em',
	},
	subHeadLineHeightTablet: {
		type: 'number',
	},
	subHeadLineHeightMobile: {
		type: 'number',
	},
	separatorSpace: {
		type: 'number',
		default: 15,
	},
	headLoadGoogleFonts: {
		type: 'boolean',
		default: false,
	},
	subHeadLoadGoogleFonts: {
		type: 'boolean',
		default: false,
	},
	contentFontFamily: {
		type: 'string',
		default: 'Default',
	},
	contentLoadGoogleFonts: {
		type: 'boolean',
		default: false,
	},
	contentFontWeight: {
		type: 'string',
	},
	contentFontSubset: {
		type: 'string',
	},
	contentFontSize: {
		type: 'number',
	},
	contentFontSizeType: {
		type: 'string',
		default: 'px',
	},
	contentFontSizeTablet: {
		type: 'number',
	},
	contentFontSizeMobile: {
		type: 'number',
	},
	contentLineHeight: {
		type: 'number',
	},
	contentLineHeightType: {
		type: 'string',
		default: 'em',
	},
	contentLineHeightTablet: {
		type: 'number',
	},
	contentLineHeightMobile: {
		type: 'number',
	},
};

export default attributes;
