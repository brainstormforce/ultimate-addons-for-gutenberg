import UAGB_Block_Icons from '@Controls/block-icons';
const TweetButton = ( { attributes } ) => (
	<a
		href="/"
		className="uagb-blockquote__tweet-button"
		target="_blank"
		rel="noopener noreferrer"
	>
		{ attributes.iconView === 'icon_text' && (
			<>
				{ UAGB_Block_Icons.quote_tweet_icon }
				<span className="uagb-blockquote__tweet-label">
					{ attributes.iconLabel }
				</span>
			</>
		) }

		{ attributes.iconView === 'icon' && (
			<>{ UAGB_Block_Icons.quote_tweet_icon }</>
		) }

		{ attributes.iconView === 'text' && (
			<>
				<span className="uagb-blockquote__tweet-label">
					{ attributes.iconLabel }
				</span>
			</>
		) }
	</a>
);

export default TweetButton;
