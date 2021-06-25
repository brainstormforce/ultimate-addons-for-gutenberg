import classnames from 'classnames';

const InfoBoxCta = ( props ) => {
	const { attributes } = props;

	const ctaBtnClass = 'uagb-infobox-cta-link uagb-ifb-cta-button';

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
					`uagb-ifb-${ attributes.ctaType }-icon`,
					`uagb-ifb-align-icon-${ attributes.ctaIconPosition }`
				) }
			>
				<i className={ attributes.ctaIcon }></i>
			</span>
		);
	}
	return (
		<div className="uagb-ifb-cta uagb-infobox-cta-link-style">
			{ attributes.ctaType === 'text' && (
				<a
					href={ attributes.ctaLink }
					target={ target }
					className="uagb-infobox-cta-link"
					rel={ rel }
				>
					{ attributes.ctaIconPosition === 'before' && ctaIconOutput }
					<span className="uagb-inline-editing">
						{ attributes.ctaText }
					</span>
					{ attributes.ctaIconPosition === 'after' && ctaIconOutput }
				</a>
			) }

			{ attributes.ctaType === 'button' && (
				<div className="uagb-ifb-button-wrapper">
					<a
						href={ attributes.ctaLink }
						className={ ctaBtnClass }
						target={ target }
						rel={ rel }
					>
						{ ctaIconOutput }
						<span className="uagb-ifb-cta-content-wrapper">
							<span className="uagb-inline-editing ">
								{ attributes.ctaText }
							</span>
						</span>
					</a>
				</div>
			) }
		</div>
	);
};
export default InfoBoxCta;
