import classnames from 'classnames';

const CallToAction = ( props ) => {
	const { attributes, setAttributes } = props;

	const ctaBtnClass =
		'uagb-cta__block-link uagb-cta__button-link-wrapper uagb-cta-typeof-' +
		attributes.ctaType;

	let target = '_self';
	const rel = 'noopener noreferrer';
	if ( attributes.ctaTarget ) {
		target = '_blank';
	}

	let ctaIconOutput = '';
	if ( attributes.ctaIcon !== '' ) {
		ctaIconOutput = (
			<span
				className={ classnames(
					`uagb-cta-${ attributes.ctaType }-icon`,
					`uagb-cta__align-button-${ attributes.ctaIconPosition }`
				) }
			>
				<i className={ attributes.ctaIcon }></i>
			</span>
		);
	}

	let link = 'javascript:void(0)';
	if ( setAttributes == 'not_set' ) {
		link = attributes.ctaLink;
	}
	return (
		<div className="uagb-cta__link-wrapper uagb-cta__block-link-style">
			{ ( attributes.ctaType === 'button' ||
				attributes.ctaType === 'text' ) && (
				<div className="uagb-cta__button-wrapper">
					<a
						href={ link }
						className={ ctaBtnClass }
						target={ target }
						rel={ rel }
					>
						{ attributes.ctaIconPosition === 'before' &&
							ctaIconOutput }
						<span className="uagb-cta__link-content-inner">
							<span>{ attributes.ctaText }</span>
						</span>
						{ attributes.ctaIconPosition === 'after' &&
							ctaIconOutput }
					</a>
				</div>
			) }
		</div>
	);
};

export default CallToAction;
