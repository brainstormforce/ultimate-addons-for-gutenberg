/**
 * BLOCK: Column - Save Block
 */

// Import block dependencies and components.
import classnames from "classnames"
import Title from "./components/Title"
import Price from "./components/Price"
import Description from "./components/Description"
import PositionClasses from "./classes"
import RestMenuImage from "./components/RestMenuImage"

const { Fragment } = wp.element

export default function save( props ) {

	const {
		block_id,
		className,
		rest_menu_item_arr,
		imagePosition,
	} = props.attributes

	return (
		<Fragment>
			<div className={ classnames(
				className,
				"uagb-rest_menu__outer-wrap",
				`uagb-block-${block_id}`
			) }
			>
				{ rest_menu_item_arr.map( ( test, index ) =>

					<div className = { classnames(
						"uagb-rest_menu__wrap",
						...PositionClasses( props.attributes ),
					) } key ={ "wrap-"+index } >
						<div className = "uagb-rm__content" key ={ "tm_content-"+index }>
							{ (imagePosition == "top" || imagePosition == "left" ) && <RestMenuImage  attributes={props.attributes}  index_value = {index} /> }

							<div className ="uagb-rm__text-wrap">
								{
									<Fragment>
										<div className = "uagb-rm-details" key={"tm_wraps-"+index}>
											<div className = "uagb-rm__title-wrap" key={"rm_title__wraps-"+index}>
												<Title attributes={props.attributes} setAttributes = "not_set" props = { props } index_value = {index}/>
												<div className = "uagb-rest-menu-text-wrap" key={"text-wrap-"+index}>
													<Description attributes={props.attributes} setAttributes = "not_set" props = { props }  index_value = {index}/>
												</div>
											</div>
											<div className = "uagb-rm__price-wrap" key={"rm_price__wraps-"+index}>
												<Price attributes={props.attributes} setAttributes = "not_set" props = { props }  index_value = {index}/>
											</div>
										</div>
									</Fragment>
								}
							</div>
							{ ( imagePosition == "right" ) && <RestMenuImage  attributes={props.attributes}  index_value = {index} /> }
						</div>
						<div className="uagb-rm__separator-parent"><div className="uagb-rm__separator"></div></div>
					</div>
				)}
			</div>
		</Fragment>
	)
}
