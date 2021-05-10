/**
 * BLOCK: Testimonial - Deprecated Block
 */

import classnames from "classnames"
import attributes from "./attributes"
import renderSVG from "@Controls/renderIcon"
import AuthorName from "./components/AuthorName"
import Company from "./components/Company"
import Description from "./components/Description"
import PositionClasses from "./classes"
import TestimonialImage from "./components/TestimonialImage"
import TestimonialImageNew from "./components/Image"

const {
	RichText
} = wp.blockEditor

const { Fragment } = wp.element


const deprecated = [
	{
		attributes,
		save: function( props ) {
			const {
				block_id,
				className,
				columns,
				autoplaySpeed,
				autoplay,
				infiniteLoop,
				pauseOnHover,
				transitionSpeed,
				tcolumns,
				arrowSize,
				mcolumns,
				test_block,
				imagePosition,
				arrowColor,
			} = props.attributes

			const sldier_data = []
			sldier_data.push(
				{
					"block_id" : block_id,
					"columns" : columns,
					"autoplaySpeed" : autoplaySpeed,
					"autoplay" : autoplay,
					"infiniteLoop" : infiniteLoop,
					"pauseOnHover" : pauseOnHover,
					"transitionSpeed" : transitionSpeed,
					"tcolumns" : tcolumns,
					"arrowSize" : arrowSize,
					"mcolumns" : mcolumns,
					"arrowColor":arrowColor,
				}
			)

			return (
				<Fragment>
					<div className={ classnames(
						className,
						"uagb-testomonial__outer-wrap uagb-slick-carousel uagb-tm__arrow-outside"
					) }
					id = { `uagb-testimonial-${block_id}` }
					data-slider = {JSON.stringify(sldier_data)}
					>

						<div
							className={ classnames(
								"is-carousel",
								`uagb-tm__columns-${ columns }`,
								"uagb-tm__items"
							) }
						>
							{ test_block.map( ( test, index ) =>

								<div className = { classnames(
									"uagb-testimonial__wrap",
									...PositionClasses( props.attributes ),
								) } key ={ "wrap-"+index } >
									<div className = "uagb-tm__content" key ={ "tm_content-"+index }>
										<div className = "uagb-tm__overlay"></div>
										{ (imagePosition == "top" || imagePosition == "left" ) && <TestimonialImage  attributes={props.attributes} index_value = {index} /> }

										<div className ="uagb-tm__text-wrap">
											{  // Get description.
												<Fragment>
													<div className = "uagb-testinomial-text-wrap" key={"text-wrap-"+index}>
														<Description attributes={props.attributes} setAttributes = "not_set" props = { props }  index_value = {index}/>
													</div>
												</Fragment>
											}
											<div className ="uagb-tm__meta">
												<div className ="uagb-tm__meta-inner">

													{ (imagePosition == "bottom" ) && <TestimonialImage  attributes={props.attributes}  index_value = {index} /> }

													{ //title_text
														<Fragment>
															<div className = "uagb-testimonial-details" key={"tm_wraps-"+index}>
																<AuthorName attributes={props.attributes} setAttributes = "not_set"  props = { props } index_value = {index}/>
																<Company attributes={props.attributes} setAttributes = "not_set"  props = { props }  index_value = {index}/>
															</div>
														</Fragment>
													}
												</div>
											</div>
										</div>
										{ ( imagePosition == "right" ) && <TestimonialImage  attributes={props.attributes} index_value = {index} /> }
									</div>
								</div>
							)}
						</div>
					</div>
				</Fragment>
			)
		},
	},
	{
		attributes,
		save: function( props ) {
			const {
				block_id,
				className,
				columns,
				autoplaySpeed,
				autoplay,
				infiniteLoop,
				pauseOnHover,
				transitionSpeed,
				tcolumns,
				arrowSize,
				mcolumns,
				test_block,
				imagePosition,
				arrowColor,
			} = props.attributes

			return (
				<Fragment>
					<div className={ classnames(
						className,
						"uagb-testomonial__outer-wrap uagb-slick-carousel uagb-tm__arrow-outside"
					) }
					id = { `uagb-testimonial-${block_id}` }
					>

						<div
							className={ classnames(
								"is-carousel",
								`uagb-tm__columns-${ columns }`,
								"uagb-tm__items"
							) }
						>
							{ test_block.map( ( test, index ) =>

								<div className = { classnames(
									"uagb-testimonial__wrap",
									...PositionClasses( props.attributes ),
								) } key ={ "wrap-"+index } >
									<div className = "uagb-tm__content" key ={ "tm_content-"+index }>
										<div className = "uagb-tm__overlay"></div>
										{ (imagePosition == "top" || imagePosition == "left" ) && <TestimonialImage  attributes={props.attributes} index_value = {index} /> }

										<div className ="uagb-tm__text-wrap">
											{  // Get description.
												<Fragment>
													<div className = "uagb-testinomial-text-wrap" key={"text-wrap-"+index}>
														<Description attributes={props.attributes} setAttributes = "not_set" props = { props }  index_value = {index}/>
													</div>
												</Fragment>
											}
											<div className ="uagb-tm__meta">
												<div className ="uagb-tm__meta-inner">

													{ (imagePosition == "bottom" ) && <TestimonialImage  attributes={props.attributes}  index_value = {index} /> }

													{ //title_text
														<Fragment>
															<div className = "uagb-testimonial-details" key={"tm_wraps-"+index}>
																<AuthorName attributes={props.attributes} setAttributes = "not_set"  props = { props } index_value = {index}/>
																<Company attributes={props.attributes} setAttributes = "not_set"  props = { props }  index_value = {index}/>
															</div>
														</Fragment>
													}
												</div>
											</div>
										</div>
										{ ( imagePosition == "right" ) && <TestimonialImage  attributes={props.attributes} index_value = {index} /> }
									</div>
								</div>
							)}
						</div>
					</div>
				</Fragment>
			)
		},
	},
	{
		attributes,
		save: function( props ) {
			const {
				block_id,
				className,
				columns,
				autoplaySpeed,
				autoplay,
				infiniteLoop,
				pauseOnHover,
				transitionSpeed,
				tcolumns,
				arrowSize,
				mcolumns,
				test_block,
				imagePosition,
				arrowColor,
			} = props.attributes
		
			return (
				<Fragment>
					<div className={ classnames(
						className,
						"uagb-testomonial__outer-wrap uagb-slick-carousel uagb-tm__arrow-outside",
						`uagb-block-${block_id}`
					) }
					>
		
						<div
							className={ classnames(
								"is-carousel",
								`uagb-tm__columns-${ columns }`,
								"uagb-tm__items"
							) }
						>
							{ test_block.map( ( test, index ) =>
		
								<div className = { classnames(
									"uagb-testimonial__wrap",
									...PositionClasses( props.attributes ),
								) } key ={ "wrap-"+index } >
									<div className = "uagb-tm__content" key ={ "tm_content-"+index }>
										<div className = "uagb-tm__overlay"></div>
										{ (imagePosition == "top" || imagePosition == "left" ) && <TestimonialImage  attributes={props.attributes} index_value = {index} /> }
		
										<div className ="uagb-tm__text-wrap">
											{  // Get description.
												<Fragment>
													<div className = "uagb-testinomial-text-wrap" key={"text-wrap-"+index}>
														<Description attributes={props.attributes} setAttributes = "not_set" props = { props }  index_value = {index}/>
													</div>
												</Fragment>
											}
											<div className ="uagb-tm__meta">
												<div className ="uagb-tm__meta-inner">
		
													{ (imagePosition == "bottom" ) && <TestimonialImage  attributes={props.attributes}  index_value = {index} /> }
		
													{ //title_text
														<Fragment>
															<div className = "uagb-testimonial-details" key={"tm_wraps-"+index}>
																<AuthorName attributes={props.attributes} setAttributes = "not_set"  props = { props } index_value = {index}/>
																<Company attributes={props.attributes} setAttributes = "not_set"  props = { props }  index_value = {index}/>
															</div>
														</Fragment>
													}
												</div>
											</div>
										</div>
										{ ( imagePosition == "right" ) && <TestimonialImage  attributes={props.attributes} index_value = {index} /> }
									</div>
								</div>
							)}
						</div>
					</div>
				</Fragment>
			)
		},
	},
	{
		attributes,
		save: function( props ) {
			const {
				block_id,
				className,
				columns,
				autoplaySpeed,
				autoplay,
				infiniteLoop,
				pauseOnHover,
				transitionSpeed,
				tcolumns,
				arrowSize,
				mcolumns,
				test_block,
				imagePosition,
				arrowColor,
			} = props.attributes
		
			return (
				<div className={ classnames(
					className,
					"uagb-testomonial__outer-wrap uagb-slick-carousel uagb-tm__arrow-outside",
					`uagb-block-${block_id}`
				) }
				>
		
					<div
						className={ classnames(
							"is-carousel",
							`uagb-tm__columns-${ columns }`,
							"uagb-tm__items"
						) }
					>
						{ test_block.map( ( test, index ) =>
		
							<div className = { classnames(
								"uagb-testimonial__wrap",
								...PositionClasses( props.attributes ),
							) } key ={ "wrap-"+index } >
								<div className = "uagb-tm__content" key ={ "tm_content-"+index }>
									<div className = "uagb-tm__overlay"></div>
									{ (imagePosition == "top" || imagePosition == "left" ) && <TestimonialImageNew  attributes={props.attributes} index_value = {index} /> }
		
									<div className ="uagb-tm__text-wrap">
										{  // Get description.
											<Fragment>
												<div className = "uagb-testinomial-text-wrap" key={"text-wrap-"+index}>
													<Description attributes={props.attributes} setAttributes = "not_set" props = { props }  index_value = {index}/>
												</div>
											</Fragment>
										}
										<div className ="uagb-tm__meta">
											<div className ="uagb-tm__meta-inner">
		
												{ (imagePosition == "bottom" ) && <TestimonialImageNew  attributes={props.attributes}  index_value = {index} /> }
		
												{ //title_text
													<Fragment>
														<div className = "uagb-testimonial-details" key={"tm_wraps-"+index}>
															<AuthorName attributes={props.attributes} setAttributes = "not_set"  props = { props } index_value = {index}/>
															<Company attributes={props.attributes} setAttributes = "not_set"  props = { props }  index_value = {index}/>
														</div>
													</Fragment>
												}
											</div>
										</div>
									</div>
									{ ( imagePosition == "right" ) && <TestimonialImageNew  attributes={props.attributes} index_value = {index} /> }
								</div>
							</div>
						)}
					</div>
				</div>
			)
		}
	}
]

export default deprecated;