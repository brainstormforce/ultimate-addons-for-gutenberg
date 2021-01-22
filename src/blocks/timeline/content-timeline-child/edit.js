/**
 * BLOCK: Content Timeline child.
 */
import classnames from "classnames"
import renderSVG from "../../../../dist/blocks/uagb-controls/renderIcon"

const { dateI18n } = wp.date

const { Component, Fragment } = wp.element

const { __ } = wp.i18n

const {
	createBlock
} = wp.blocks

const {
	InspectorControls,
	RichText,
} = wp.blockEditor

const {
	PanelBody,
	TextControl,
} = wp.components

class UAGBcontentTimelineChild extends Component {

		constructor() {
			super( ...arguments )
		}

		splitBlock( before, after, ...blocks ) {
			const {
				attributes,
				insertBlocksAfter,
				setAttributes,
				onReplace,
			} = this.props

			if ( after ) {
				// Append "After" content as a new paragraph block to the end of
				// any other blocks being inserted after the current paragraph.
				blocks.push( createBlock( "core/paragraph", { content: after } ) )
			}

			if ( blocks.length && insertBlocksAfter ) {
				insertBlocksAfter( blocks )
			}

			const { content } = attributes

			if ( ! before ) {
				// If before content is omitted, treat as intent to delete block.
				onReplace( [] )
			} else if ( content !== before ) {
				// Only update content if it has in-fact changed. In case that user
				// has created a new paragraph at end of an existing one, the value
				// of before will be strictly equal to the current content.
				setAttributes( { content: before } )
			}
		}

		componentDidMount() {
			//Store client id.
			this.props.setAttributes( { block_id: this.props.clientId } )
		}

		componentDidUpdate() {
		}	

		render() {

			// Setup the attributes.
			const {
				setAttributes,
				insertBlocksAfter,
				mergeBlocks,
				onReplace,
				attributes: {
					block_id,
					headingTag,
					timelinAlignment,
					icon,
					t_date,
					displayPostDate,
					dateFormat,
					time_heading,
					time_desc,
				},
			} = this.props
			
			const content_control = (
				<InspectorControls>
					{ displayPostDate != true &&(
					<PanelBody title={ __( "Timeline Item" ) } initialOpen={ false } >
						<TextControl
							label= { __( "Date" ) }
							value= { t_date }
							onChange={ ( value ) => setAttributes( { t_date: value } ) }
						/>
					</PanelBody>
					)}
				</InspectorControls>
			)
			
			var display_inner_date  = false
			var icon_class = "uagb-timeline__icon-new uagb-timeline__out-view-icon "
			var post_date = t_date

			if ( 'custom' != dateFormat ) {

				post_date = dateI18n( dateFormat, t_date )
				if( post_date === "Invalid date" ){
					post_date = t_date
				}
			}

				if(timelinAlignment == "center"){
					display_inner_date = true
				} 

				return (
					<Fragment>
								{ content_control }
								<article  className={ classnames(
									"uagb-timeline__field uagb-timeline__field-wrap",
									`uagb-timeline-child-${block_id}`
								) }>
									<div className = { this.props.attributes.content_class }>
									<div className = "uagb-timeline__marker uagb-timeline__out-view-icon">
										<span className = {icon_class}>{ renderSVG(icon) }</span>
									</div>
								<div className = { this.props.attributes.dayalign_class }>
								<div className="uagb-timeline__events-new">
									<div className="uagb-timeline__events-inner-new">
										<div className="uagb-timeline__date-hide uagb-timeline__date-inner" >
	                                        <div className={ "uagb-timeline__inner-date-new" }>
	                                        	{ post_date }
	                                        </div>
										</div>
										<div className="uagb-content">
											<div className="uagb-timeline__heading-text">
												<RichText
													tagName={ headingTag }
													value={ time_heading }
													onChange={ ( value ) => setAttributes( { time_heading: value } ) }
													placeholder={ __( "Write a Heading" ) }
													className='uagb-timeline__heading'
													onMerge={ mergeBlocks }
													unstableOnSplit={
														insertBlocksAfter ?
															( before, after, ...blocks ) => {
																setAttributes( { content: before } )
																insertBlocksAfter( [
																	...blocks,
																	createBlock( "core/paragraph", { content: after } ),
																] )
															} :
															undefined
													}
													onRemove={ () => onReplace( [] ) }
												/>
											</div>
											<RichText
												tagName= "p"
												value={ time_desc }
												onChange={ ( value ) => setAttributes( { time_desc: value } ) }
												placeholder={ __( "Write a Description" ) }
												className='uagb-timeline-desc-content'
												onMerge={ mergeBlocks }
												unstableOnSplit={ this.splitBlock }
												onRemove={ () => onReplace( [] ) }
											/>
											<div className="uagb-timeline__arrow"></div>
										</div>
									</div>
								</div>
								</div>	
									{ display_inner_date && <div className = "uagb-timeline__date-new">
										{ displayPostDate != true && t_date &&
                                            <div className={ "uagb-timeline__date-new" }>
                                            	{ post_date }
                                            </div>
										}
									</div>
									}
									</div>
								</article>	
							</Fragment>
							
					)
		}

}
export default UAGBcontentTimelineChild