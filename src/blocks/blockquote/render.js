import classnames from 'classnames';
import UAGB_Block_Icons from '@Controls/block-icons';
import React, { useLayoutEffect } from 'react';
import Description from './components/Description';
import AuthorImage from './components/AuthorImage';
import AuthorText from './components/AuthorText';
import TweetButtonCTA from './components/TweetButtonCTA';
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

	const { className, setAttributes, attributes } = props;

	const {
		skinStyle,
		align,
		stack,
		quoteStyle,
		enableTweet,
		iconView,
		iconSkin,
		authorImage,
		authorImgPosition,
	} = attributes;

	return (
		<div
			className={ classnames(
				className,
				'uagb-blockquote__outer-wrap',
				`uagb-block-${ props.clientId.substr( 0, 8 ) }`
			) }
		>
			<div
				className={ classnames(
					'uagb-blockquote__wrap',
					`uagb-blockquote__skin-${ skinStyle }`,
					skinStyle !== 'border'
						? `uagb-blockquote__align-${ align }`
						: '',
					skinStyle === 'quotation'
						? `uagb-blockquote__style-${ quoteStyle }`
						: '',
					enableTweet
						? `uagb-blockquote__with-tweet uagb-blockquote__tweet-style-${ iconSkin } uagb-blockquote__tweet-${ iconView }`
						: '',
					`uagb-blockquote__stack-img-${ stack }`
				) }
			>
				<blockquote className="uagb-blockquote">
					{ skinStyle === 'quotation' && (
						<div className="uagb-blockquote__icon-wrap">
							<span className="uagb-blockquote__icon">
								{ UAGB_Block_Icons.quote_inline_icon }
							</span>{ ' ' }
						</div>
					) }
					<div className="uagb-blockquote__content-wrap">
						{
							<Description
								attributes={ attributes }
								setAttributes={ setAttributes }
								props={ props }
							/>
						}

						<footer>
							<div
								className={ classnames(
									'uagb-blockquote__author-wrap',
									authorImage !== ''
										? `uagb-blockquote__author-at-${ authorImgPosition }`
										: ''
								) }
							>
								{ <AuthorImage attributes={ attributes } /> }
								{
									<AuthorText
										attributes={ attributes }
										setAttributes={ setAttributes }
										props={ props }
									/>
								}
							</div>
							{ enableTweet && (
								<TweetButtonCTA attributes={ attributes } />
							) }
						</footer>
					</div>
				</blockquote>
			</div>
		</div>
	);
};

export default React.memo( Render );
