const { Fragment } = wp.element;
import UAGB_Block_Icons from "../../../../dist/blocks/uagb-controls/block-icons";
class TweetButtonCTA extends React.Component {

	render() {

		const { attributes } = this.props;
	
		return (			
			<a href="/" className='uagb-blockquote__tweet-button' target='_blank' rel='noopener noreferrer'>
				{ ( attributes.iconView === "icon_text" ) && <Fragment>
					{ UAGB_Block_Icons.quote_tweet_icon }
					<span className="uagb-blockquote__tweet-label">{ attributes.iconLabel }</span>
				</Fragment>
		      	}

				{ ( attributes.iconView ==="icon" ) && <Fragment>
					{ UAGB_Block_Icons.quote_tweet_icon }		      			
				</Fragment>
		      	}

				{ ( attributes.iconView === "text" ) && <Fragment>	      			
					<span className="uagb-blockquote__tweet-label">{ attributes.iconLabel }</span>
				</Fragment>
		      	}
			</a>    	
		);
	}
}

export default TweetButtonCTA;
