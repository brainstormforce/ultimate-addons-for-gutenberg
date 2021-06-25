import classnames from 'classnames';
import InfoBoxPositionClasses from './classes';
import React, { useLayoutEffect } from 'react';
import Title from './components/Title';
import InfoBoxDesc from './components/InfoBoxDesc';
import CallToAction from './components/CallToAction';
import InfoBoxSeparator from './components/InfoBoxSeparator';
import Icon from './components/Icon';
import InfoBoxIconImage from './components/InfoBoxIconImage';
import Prefix from './components/Prefix';
import styles from './editor.lazy.scss';

const Render = ( props ) => {
	// Add and remove the CSS on the drop and remove of the component.
	useLayoutEffect( () => {
		styles.use();
		return () => {
			styles.unuse();
		};
	}, [] );

	props = props.parentProps;
	const { className, attributes, setAttributes } = props;

	// Setup the attributes.
	const {
		icon,
		iconimgPosition,
		source_type,
		seperatorPosition,
		seperatorStyle,
		ctaType,
		showPrefix,
		showTitle,
		showDesc,
		block_id,
	} = attributes;
	// Get icon/Image components.
	let isImage = '';
	if ( source_type === 'icon' && icon !== '' ) {
		isImage = <Icon attributes={ attributes } />;
	} else {
		isImage = <InfoBoxIconImage attributes={ attributes } />;
	}

	let iconImageHtml = isImage;
	let seperatorPos = seperatorPosition;
	const seperatorHtml = <InfoBoxSeparator attributes={ attributes } />;
	let showSeperator = true;

	if (
		seperatorPosition == 'after_icon' &&
		( iconimgPosition == 'above-title' || iconimgPosition == 'below-title' )
	) {
		showSeperator = false;
		iconImageHtml = (
			<>
				{ isImage }
				{ 'none' !== seperatorStyle && seperatorHtml }
			</>
		);
	}

	if (
		seperatorPosition == 'after_icon' &&
		( iconimgPosition !== 'above-title' ||
			iconimgPosition !== 'below-title' )
	) {
		seperatorPos = 'after_title';
	}

	if (
		iconimgPosition == 'below-title' &&
		seperatorPosition == 'after_title'
	) {
		showSeperator = false;
		iconImageHtml = (
			<>
				{ 'none' !== seperatorStyle && seperatorHtml }
				{ isImage }
			</>
		);
	}

	// Get description and seperator components.
	const desc = (
		<>
			{ 'none' !== seperatorStyle &&
				seperatorPos == 'after_title' &&
				showSeperator &&
				seperatorHtml }
			<div className="uagb-ifb-text-wrap">
				{ showDesc && (
					<InfoBoxDesc
						attributes={ attributes }
						setAttributes={ setAttributes }
						props={ props }
					/>
				) }
				{ 'none' !== seperatorStyle &&
					seperatorPos == 'after_desc' &&
					seperatorHtml }
				<CallToAction
					attributes={ attributes }
					setAttributes={ setAttributes }
				/>
			</div>
		</>
	);

	// Get Title and Prefix components.
	const titleText = (
		<>
			<div className="uagb-ifb-title-wrap">
				{ showPrefix && (
					<Prefix
						attributes={ attributes }
						setAttributes={ setAttributes }
						props={ props }
					/>
				) }
				{ 'none' !== seperatorStyle &&
					seperatorPos == 'after_prefix' &&
					seperatorHtml }
				{ showTitle && (
					<Title
						attributes={ attributes }
						setAttributes={ setAttributes }
						props={ props }
					/>
				) }
			</div>
		</>
	);

	const output = (
		<div
			className={ classnames(
				'uagb-infobox__content-wrap',
				ctaType == 'all' ? ' uagb-infobox_cta-type-all' : '',
				...InfoBoxPositionClasses( attributes )
			) }
		>
			<div className="uagb-ifb-left-right-wrap">
				{ iconimgPosition == 'left' && iconImageHtml }
				<div className="uagb-ifb-content">
					{ iconimgPosition == 'above-title' && iconImageHtml }

					{ ( iconimgPosition == 'above-title' ||
						iconimgPosition == 'below-title' ) &&
						titleText }

					{ iconimgPosition == 'below-title' && iconImageHtml }

					{ ( iconimgPosition == 'above-title' ||
						iconimgPosition == 'below-title' ) &&
						desc }

					{ iconimgPosition === 'left-title' && (
						<>
							<div className="uagb-ifb-left-title-image">
								{ iconImageHtml }
								{ titleText }
							</div>
							{ desc }
						</>
					) }

					{ iconimgPosition === 'right-title' && (
						<>
							<div className="uagb-ifb-right-title-image">
								{ titleText }
								{ iconImageHtml }
							</div>
							{ desc }
						</>
					) }

					{ ( iconimgPosition == 'left' ||
						iconimgPosition == 'right' ) && (
						<>
							{ titleText }
							{ desc }
						</>
					) }
				</div>

				{ iconimgPosition == 'right' && iconImageHtml }
			</div>
		</div>
	);

	return (
		<div
			className={ classnames(
				className,
				'uagb-infobox__outer-wrap',
				`uagb-block-${ block_id }`
			) }
		>
			{ ctaType == 'all' && (
				<>
					<a
						className="uagb-infobox-link-wrap uagb-infbox__link-to-all"
						aria-label={ 'Infobox Link' }
						rel="noopener noreferrer"
						href="/"
					></a>
					{ output }
				</>
			) }
			{ ctaType !== 'all' && output }
		</div>
	);
};
export default React.memo( Render );
