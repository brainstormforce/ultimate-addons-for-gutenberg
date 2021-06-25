import classnames from 'classnames';
import renderSVG from '@Controls/renderIcon';

const InfoBoxCta = ( props ) => {
	const { attributes, setAttributes = 'not_set' } = props;

	let ctaBtnClass = 'uagb-infobox-cta-link uagb-ifb-cta-button';

	if ( attributes.inheritFromTheme ) {
		ctaBtnClass = 'wp-block-button__link';
	}

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
				{ renderSVG( attributes.ctaIcon ) }
			</span>
		);
	}

	if ( setAttributes !== 'not_set' ) {
		return (
			<div className="uagb-ifb-cta uagb-infobox-cta-link-style">
				{ attributes.ctaType === 'text' && (
					<a
						target={ target }
						className="uagb-infobox-cta-link"
						rel={ rel }
					>
						{ attributes.ctaIconPosition === 'before' &&
							ctaIconOutput }
						<span className="uagb-inline-editing">
							{ attributes.ctaText }
						</span>
						{ attributes.ctaIconPosition === 'after' &&
							ctaIconOutput }
					</a>
				) }

				{ attributes.ctaType === 'button' && (
					<div
						className={ classnames(
							'uagb-ifb-button-wrapper',
							attributes.inheritFromTheme
								? 'wp-block-button'
								: null
						) }
					>
						<a
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
	}
	return (
		<div className="uagb-ifb-cta uagb-infobox-cta-link-style">
			{ attributes.ctaType === 'text' && (
				<a
					href={ attributes.ctaLink }
					target={ target }
					className="uagb-infobox-cta-link"
					rel={ rel }
					alt=""
				>
					{ attributes.ctaIconPosition === 'before' && ctaIconOutput }
					<span className="uagb-inline-editing">
						{ attributes.ctaText }
					</span>
					{ attributes.ctaIconPosition === 'after' && ctaIconOutput }
				</a>
			) }

			{ attributes.ctaType === 'button' && (
				<div
					className={ classnames(
						'uagb-ifb-button-wrapper',
						attributes.inheritFromTheme ? 'wp-block-button' : null
					) }
				>
					<a
						href={ attributes.ctaLink }
						className={ ctaBtnClass }
						target={ target }
						rel={ rel }
						alt=""
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
