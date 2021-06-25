import classnames from 'classnames';

import renderSVG from '@Controls/renderIcon';

const CTA = ( props ) => {
	const { attributes, setAttributes } = props;

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
					`uagb-cta__align-button-${ attributes.ctaIconPosition }`,
					'uagb-cta-with-svg'
				) }
			>
				{ renderSVG( attributes.ctaIcon ) }
			</span>
		);
	}

	let link = '/';
	if ( setAttributes == 'not_set' ) {
		link = attributes.ctaLink;
	}
	return (
		<div className="uagb-cta__link-wrapper uagb-cta__block-link-style">
			{ ( attributes.ctaType === 'button' ||
				attributes.ctaType === 'text' ) && (
				<div
					className={ classnames(
						'uagb-cta__button-wrapper',
						attributes.inheritFromTheme &&
							attributes.ctaType === 'button'
							? 'wp-block-button'
							: null
					) }
				>
					<a
						href={ link }
						className={ classnames(
							'uagb-cta__button-link-wrapper',
							! attributes.inheritFromTheme
								? 'uagb-cta__block-link'
								: null,
							! attributes.inheritFromTheme
								? `uagb-cta-typeof-${ attributes.ctaType }`
								: null,
							attributes.inheritFromTheme &&
								attributes.ctaType === 'button'
								? 'wp-block-button__link'
								: null
						) }
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

export default CTA;
