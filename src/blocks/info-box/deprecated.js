/**
 * BLOCK: Columns - Deprecated Block
 */

// Import block dependencies and components.
import classnames from "classnames"
import Prefix from "./components/Prefix"
import Title from "./components/Title"
import InfoBoxDesc from "./components/InfoBoxDesc"
import InfoBoxIcon from "./components/InfoBoxIcon"
import Icon from "./components/Icon"
import InfoBoxPositionClasses from "./classes"
import InfoBoxSeparator from "./components/InfoBoxSeparator"
import InfoBoxCta from "./components/InfoBoxCta"
import CallToAction from "./components/CallToAction"
import InfoBoxStyle from "./inline-styles"
import InfoBoxIconImage from "./components/InfoBoxIconImage"

// Import icon.
import attributes from "./attributes"

const { __ } = wp.i18n

const {
	RichText
} = wp.blockEditor

const { Fragment } = wp.element

const deprecated = [
	{
		attributes,
		save: function( props ) {
			const {
				iconimgPosition,
				block_id,
				source_type,
				seperatorStyle,
				backgroundType,
				ctaType,
				ctaLink,
				ctaTarget,
				className
			} = props.attributes

			// Get icon/Image components.
			let is_image = ""

			if( source_type === "icon" ) {
				is_image = <InfoBoxIcon attributes={ props.attributes }/>
			}else{
				is_image = <InfoBoxIconImage attributes={ props.attributes } />
			}

			// Get description and seperator components.
			const desc = (
				<Fragment>
					{ "none" !== seperatorStyle && <InfoBoxSeparator attributes={props.attributes} /> }
					<div className = "uagb-ifb-text-wrap">
						<InfoBoxDesc attributes={props.attributes} setAttributes = "not_set"/>
						<InfoBoxCta attributes={props.attributes} />
					</div>
				</Fragment>
			)

			// Get Title and Prefix components.
			const title_text = (
				<Fragment>
					<div className = "uagb-ifb-title-wrap">
						<Prefix attributes={ props.attributes } setAttributes = "not_set"/>
						<Title attributes={ props.attributes} setAttributes = "not_set"/>
					</div>
				</Fragment>
			)

			const output = (
				<Fragment>
					<div className = { classnames(
						"uagb-infobox__content-wrap",
						...InfoBoxPositionClasses(  props.attributes  ),
					) }>
						<div className = "uagb-ifb-left-right-wrap">

							{ ( iconimgPosition == "left") &&
								is_image
							}
							<div className = "uagb-ifb-content">

								{  iconimgPosition == "above-title" && is_image }

								{ ( iconimgPosition == "above-title" || iconimgPosition == "below-title") && title_text }

								{ iconimgPosition == "below-title"  && is_image }

								{ ( iconimgPosition == "above-title" || iconimgPosition == "below-title") && desc }

								{ ( iconimgPosition === "left-title") &&
									<Fragment>
										<div className = "uagb-ifb-left-title-image">
											{ is_image }
											{ title_text }
										</div>
										{ desc }
									</Fragment>
								}

								{ ( iconimgPosition === "right-title") &&
									<Fragment>
										<div className = "uagb-ifb-right-title-image">
											{ title_text }
											{ is_image }
										</div>
										{ desc }
									</Fragment>
								}

								{ ( iconimgPosition == "left" || iconimgPosition == "right") &&
									<Fragment>
										{ title_text }
										{ desc }
									</Fragment>
								}

							</div>

							{ ( iconimgPosition == "right") &&
								is_image
							}
						</div>
					</div>
				</Fragment>
			)

			let target =""
			if( ctaTarget ){
				target ="_blank"
			}

			return (
				<Fragment>
					<div className={ classnames(
						className,
						"uagb-infobox__outer-wrap"
					) }
					id = { `uagb-infobox-${block_id}` } >

						{ ( ctaType == "all") &&
							<Fragment>
								<a href= {ctaLink} className = "uagb-infobox-link-wrap" target={target} rel ="noopener noreferrer"> {output}</a>
							</Fragment>
						}
						{ ( ctaType !== "all") && output }

					</div>
				</Fragment>
			)
		},
	},
	{
		attributes,
		save: function( props ) {
			const {
				iconimgPosition,
				block_id,
				source_type,
				seperatorStyle,
				backgroundType,
				ctaType,
				ctaLink,
				ctaTarget,
				className,
				prefixTitle,
				infoBoxTitle,
				headingDesc,
				showPrefix,
				showTitle,
				showDesc,
				icon
			} = props.attributes

			// Get icon/Image components.
			let is_image = ""

			if( source_type === "icon" && icon !=="" ) {
				is_image = <InfoBoxIcon attributes={ props.attributes }/>
			}else{
				is_image = <InfoBoxIconImage attributes={ props.attributes } />
			}

			// Get description and seperator components.
			const desc = (
				<Fragment>
					{ "none" !== seperatorStyle && <InfoBoxSeparator attributes={props.attributes} /> }
					<div className = "uagb-ifb-text-wrap">
						{ showDesc && "" !== headingDesc && <InfoBoxDesc attributes={props.attributes} setAttributes = "not_set"/> }
						{ ctaType !== "none" && <InfoBoxCta attributes={props.attributes} />}
					</div>
				</Fragment>
			)

			// Get Title and Prefix components.
			const title_text = (
				<Fragment>
					<div className = "uagb-ifb-title-wrap">
						{ showPrefix && "" !== prefixTitle && <Prefix attributes={ props.attributes } setAttributes = "not_set"/> }
						{ showTitle && "" !== infoBoxTitle && <Title attributes={ props.attributes} setAttributes = "not_set"/> }
					</div>
				</Fragment>
			)

			const output = (
				<Fragment>
					<div className = { classnames(
						"uagb-infobox__content-wrap",
						...InfoBoxPositionClasses(  props.attributes  ),
					) }>
						<div className = "uagb-ifb-left-right-wrap">

							{ ( iconimgPosition == "left") &&
									is_image
							}
							<div className = "uagb-ifb-content">

								{  iconimgPosition == "above-title" && is_image }

								{ ( iconimgPosition == "above-title" || iconimgPosition == "below-title") && title_text }

								{ iconimgPosition == "below-title"  && is_image }

								{ ( iconimgPosition == "above-title" || iconimgPosition == "below-title") && desc }

								{ ( iconimgPosition === "left-title") &&
										<Fragment>
											<div className = "uagb-ifb-left-title-image">
												{ is_image }
												{ title_text }
											</div>
											{ desc }
										</Fragment>
								}

								{ ( iconimgPosition === "right-title") &&
										<Fragment>
											<div className = "uagb-ifb-right-title-image">
												{ title_text }
												{ is_image }
											</div>
											{ desc }
										</Fragment>
								}

								{ ( iconimgPosition == "left" || iconimgPosition == "right") &&
										<Fragment>
											{ title_text }
											{ desc }
										</Fragment>
								}

							</div>

							{ ( iconimgPosition == "right") &&
									is_image
							}
						</div>
					</div>
				</Fragment>
			)

			let target =""
			if( ctaTarget ){
				target ="_blank"
			}

			return (
				<Fragment>
					<div className={ classnames(
						className,
						"uagb-infobox__outer-wrap"
					) }
					id = { `uagb-infobox-${block_id}` } >

						{ ( ctaType == "all") &&
							<Fragment>
								<a href= {ctaLink} className = "uagb-infobox-link-wrap" target={target} rel ="noopener noreferrer"> {output}</a>
							</Fragment>
						}
						{ ( ctaType !== "all") && output }

					</div>
				</Fragment>
			)
		},
	},
	{
		attributes,
		save: function( props ) {
			const {
				iconimgPosition,
				block_id,
				source_type,
				seperatorStyle,
				backgroundType,
				ctaType,
				ctaLink,
				ctaTarget,
				className,
				prefixTitle,
				infoBoxTitle,
				headingDesc,
				showPrefix,
				showTitle,
				showDesc,
				icon
			} = props.attributes

			// Get icon/Image components.
			let is_image = ""

			if( source_type === "icon" && icon !=="" ) {
				is_image = <Icon attributes={ props.attributes }/>
			}else{
				is_image = <InfoBoxIconImage attributes={ props.attributes } />
			}

			// Get description and seperator components.
			const desc = (
				<Fragment>
					{ "none" !== seperatorStyle && <InfoBoxSeparator attributes={props.attributes} /> }
					<div className = "uagb-ifb-text-wrap">
						{ showDesc && "" !== headingDesc && <InfoBoxDesc attributes={props.attributes} setAttributes = "not_set"/> }
						{ ctaType !== "none" && <CallToAction attributes={props.attributes} />}
					</div>
				</Fragment>
			)

			// Get Title and Prefix components.
			const title_text = (
				<Fragment>
					<div className = "uagb-ifb-title-wrap">
						{ showPrefix && "" !== prefixTitle && <Prefix attributes={ props.attributes } setAttributes = "not_set"/> }
						{ showTitle && "" !== infoBoxTitle && <Title attributes={ props.attributes} setAttributes = "not_set"/> }
					</div>
				</Fragment>
			)

			const output = (
				<Fragment>
					<div className = { classnames(
						"uagb-infobox__content-wrap",
						...InfoBoxPositionClasses(  props.attributes  ),
					) }>
						<div className = "uagb-ifb-left-right-wrap">

							{ ( iconimgPosition == "left") &&
								is_image
							}
							<div className = "uagb-ifb-content">

								{  iconimgPosition == "above-title" && is_image }

								{ ( iconimgPosition == "above-title" || iconimgPosition == "below-title") && title_text }

								{ iconimgPosition == "below-title"  && is_image }

								{ ( iconimgPosition == "above-title" || iconimgPosition == "below-title") && desc }

								{ ( iconimgPosition === "left-title") &&
									<Fragment>
										<div className = "uagb-ifb-left-title-image">
											{ is_image }
											{ title_text }
										</div>
										{ desc }
									</Fragment>
								}

								{ ( iconimgPosition === "right-title") &&
									<Fragment>
										<div className = "uagb-ifb-right-title-image">
											{ title_text }
											{ is_image }
										</div>
										{ desc }
									</Fragment>
								}

								{ ( iconimgPosition == "left" || iconimgPosition == "right") &&
									<Fragment>
										{ title_text }
										{ desc }
									</Fragment>
								}

							</div>

							{ ( iconimgPosition == "right") &&
								is_image
							}
						</div>
					</div>
				</Fragment>
			)

			let target =""
			if( ctaTarget ){
				target ="_blank"
			}

			return (
				<Fragment>
					<div className={ classnames(
						className,
						"uagb-infobox__outer-wrap"
					) }
					id = { `uagb-infobox-${block_id}` } >

						{ ( ctaType == "all") &&
						<Fragment>
							<a href= {ctaLink} className = "uagb-infobox-link-wrap" target={target} rel ="noopener noreferrer"> {output}</a>
						</Fragment>
						}
						{ ( ctaType !== "all") && output }

					</div>
				</Fragment>
			)
		},
	},
	{
		attributes,
		save: function( props ) {
			const {
				iconimgPosition,
				block_id,
				source_type,
				seperatorStyle,
				backgroundType,
				ctaType,
				ctaLink,
				ctaTarget,
				className,
				prefixTitle,
				infoBoxTitle,
				headingDesc,
				showPrefix,
				showTitle,
				showDesc,
				icon,
				seperatorPosition
			} = props.attributes

			// Get icon/Image components.
			let is_image = ""

			if( source_type === "icon" && icon !=="" ) {
				is_image = <Icon attributes={ props.attributes }/>
			}else{
				is_image = <InfoBoxIconImage attributes={ props.attributes } />
			}

			var icon_image_html = is_image
			var seperator_position = seperatorPosition
			var seperator_html = <InfoBoxSeparator attributes={props.attributes} />
			var show_seperator = true

			if( seperatorPosition == "after_icon" && ( iconimgPosition == "above-title" || iconimgPosition == "below-title" ) ){
				show_seperator = false
				icon_image_html = (
					<Fragment>
						{ is_image }
						{ "none" !== seperatorStyle && seperator_html }
					</Fragment>
				)
			}

			if( seperatorPosition == "after_icon" && ( iconimgPosition !== "above-title" || iconimgPosition !== "below-title" ) ){
				seperator_position = "after_title"
			}

			if( iconimgPosition == "below-title" &&  seperatorPosition == "after_title" ){
				show_seperator = false
				icon_image_html = (
					<Fragment>
						{ "none" !== seperatorStyle && seperator_html }
						{ is_image }
					</Fragment>
				)
			}
			// Get description and seperator components.
			const desc = (
				<Fragment>
					{ "none" !== seperatorStyle && ( seperator_position == "after_title"  && show_seperator )&& seperator_html }
					<div className = "uagb-ifb-text-wrap">
						{ showDesc && "" !== headingDesc && <InfoBoxDesc attributes={props.attributes} setAttributes = "not_set"/> }
						{ "none" !== seperatorStyle && seperator_position == "after_desc" && seperator_html }
						{ ctaType !== "none" && <CallToAction attributes={props.attributes} />}
					</div>
				</Fragment>
			)

			// Get Title and Prefix components.
			const title_text = (
				<Fragment>
					<div className = "uagb-ifb-title-wrap">
						{ showPrefix && "" !== prefixTitle && <Prefix attributes={ props.attributes } setAttributes = "not_set"/> }
						{ "none" !== seperatorStyle && seperator_position == "after_prefix" && seperator_html }
						{ showTitle && "" !== infoBoxTitle && <Title attributes={ props.attributes} setAttributes = "not_set"/> }
					</div>
				</Fragment>
			)

			const output = (
				<Fragment>
					<div className = { classnames(
						"uagb-infobox__content-wrap",
						( ctaType == "all" ? " uagb-infobox_cta-type-all" : "" ),
						...InfoBoxPositionClasses(  props.attributes  ),
					) }>
						<div className = "uagb-ifb-left-right-wrap">

							{ ( iconimgPosition == "left") &&
									is_image
							}
							<div className = "uagb-ifb-content">

								{  iconimgPosition == "above-title" && icon_image_html }

								{ ( iconimgPosition == "above-title" || iconimgPosition == "below-title") && title_text }

								{ iconimgPosition == "below-title"  && icon_image_html }

								{ ( iconimgPosition == "above-title" || iconimgPosition == "below-title") && desc }

								{ ( iconimgPosition === "left-title") &&
										<Fragment>
											<div className = "uagb-ifb-left-title-image">
												{ icon_image_html }
												{ title_text }
											</div>
											{ desc }
										</Fragment>
								}

								{ ( iconimgPosition === "right-title") &&
										<Fragment>
											<div className = "uagb-ifb-right-title-image">
												{ title_text }
												{ icon_image_html }
											</div>
											{ desc }
										</Fragment>
								}

								{ ( iconimgPosition == "left" || iconimgPosition == "right") &&
										<Fragment>
											{ title_text }
											{ desc }
										</Fragment>
								}

							</div>

							{ ( iconimgPosition == "right") && icon_image_html }
						</div>
					</div>
				</Fragment>
			)

			let target =""
			if( ctaTarget ){
				target ="_blank"
			}

			return (
				<Fragment>
					<div className={ classnames(
						className,
						"uagb-infobox__outer-wrap"
					) }
					id = { `uagb-infobox-${block_id}` } >

						{ ( ctaType == "all") &&
							<Fragment>
								<a href= {ctaLink} className = "uagb-infobox-link-wrap uagb-infbox__link-to-all" target={target} rel ="noopener noreferrer"></a>
								{output}
							</Fragment>
						}
						{ ( ctaType !== "all") && output }

					</div>
				</Fragment>
			)
		},
	},
	{
		attributes,
		save: function( props ) {
			const {
				iconimgPosition,
				block_id,
				source_type,
				seperatorStyle,
				backgroundType,
				ctaType,
				ctaLink,
				ctaTarget,
				className,
				prefixTitle,
				infoBoxTitle,
				headingDesc,
				showPrefix,
				showTitle,
				showDesc,
				icon,
				seperatorPosition
			} = props.attributes
		
			// Get icon/Image components.
			let is_image = ""
		
			if( source_type === "icon" && icon !=="" ) {
				is_image = <Icon attributes={ props.attributes }/>
			}else{
				is_image = <InfoBoxIconImage attributes={ props.attributes } />
			}
		
			var icon_image_html = is_image
			var seperator_position = seperatorPosition
			var seperator_html = <InfoBoxSeparator attributes={props.attributes} />
			var show_seperator = true
		
			if( seperatorPosition == "after_icon" && ( iconimgPosition == "above-title" || iconimgPosition == "below-title" ) ){
				show_seperator = false
				icon_image_html = (
					<Fragment>
						{ is_image }
						{ "none" !== seperatorStyle && seperator_html }
					</Fragment>
				)
			}
		
			if( seperatorPosition == "after_icon" && ( iconimgPosition !== "above-title" || iconimgPosition !== "below-title" ) ){
				seperator_position = "after_title"
			}
		
			if( iconimgPosition == "below-title" &&  seperatorPosition == "after_title" ){
				show_seperator = false
				icon_image_html = (
					<Fragment>
						{ "none" !== seperatorStyle && seperator_html }
						{ is_image }
					</Fragment>
				)
			}
			// Get description and seperator components.
			const desc = (
				<Fragment>
					{ "none" !== seperatorStyle && ( seperator_position == "after_title"  && show_seperator )&& seperator_html }
					<div className = "uagb-ifb-text-wrap">
						{ showDesc && "" !== headingDesc && <InfoBoxDesc attributes={props.attributes} setAttributes = "not_set"/> }
						{ "none" !== seperatorStyle && seperator_position == "after_desc" && seperator_html }
						{ ctaType !== "none" && <CallToAction attributes={props.attributes} />}
					</div>
				</Fragment>
			)
		
			// Get Title and Prefix components.
			const title_text = (
				<Fragment>
					<div className = "uagb-ifb-title-wrap">
						{ showPrefix && "" !== prefixTitle && <Prefix attributes={ props.attributes } setAttributes = "not_set"/> }
						{ "none" !== seperatorStyle && seperator_position == "after_prefix" && seperator_html }
						{ showTitle && "" !== infoBoxTitle && <Title attributes={ props.attributes} setAttributes = "not_set"/> }
					</div>
				</Fragment>
			)
		
			const output = (
				<Fragment>
					<div className = { classnames(
						"uagb-infobox__content-wrap",
						( ctaType == "all" ? " uagb-infobox_cta-type-all" : "" ),
						...InfoBoxPositionClasses(  props.attributes  ),
					) }>
						<div className = "uagb-ifb-left-right-wrap">
		
							{ ( iconimgPosition == "left") &&
									is_image
							}
							<div className = "uagb-ifb-content">
		
								{  iconimgPosition == "above-title" && icon_image_html }
		
								{ ( iconimgPosition == "above-title" || iconimgPosition == "below-title") && title_text }
		
								{ iconimgPosition == "below-title"  && icon_image_html }
		
								{ ( iconimgPosition == "above-title" || iconimgPosition == "below-title") && desc }
		
								{ ( iconimgPosition === "left-title") &&
										<Fragment>
											<div className = "uagb-ifb-left-title-image">
												{ icon_image_html }
												{ title_text }
											</div>
											{ desc }
										</Fragment>
								}
		
								{ ( iconimgPosition === "right-title") &&
										<Fragment>
											<div className = "uagb-ifb-right-title-image">
												{ title_text }
												{ icon_image_html }
											</div>
											{ desc }
										</Fragment>
								}
		
								{ ( iconimgPosition == "left" || iconimgPosition == "right") &&
										<Fragment>
											{ title_text }
											{ desc }
										</Fragment>
								}
		
							</div>
		
							{ ( iconimgPosition == "right") && icon_image_html }
						</div>
					</div>
				</Fragment>
			)
		
			let target =""
			if( ctaTarget ){
				target ="_blank"
			}
		
			return (
				<Fragment>
					<div className={ classnames(
						className,
						"uagb-infobox__outer-wrap",
						`uagb-block-${block_id}`
					) }>
		
						{ ( ctaType == "all") &&
							<Fragment>
								<a href= {ctaLink} className = "uagb-infobox-link-wrap uagb-infbox__link-to-all" target={target} rel ="noopener noreferrer"></a>
								{output}
							</Fragment>
						}
						{ ( ctaType !== "all") && output }
		
					</div>
				</Fragment>
			)
		},
	},
	{
		attributes,
		save: function( props ) {
			const {
				iconimgPosition,
				block_id,
				source_type,
				seperatorStyle,
				ctaType,
				ctaLink,
				ctaTarget,
				className,
				prefixTitle,
				infoBoxTitle,
				headingDesc,
				showPrefix,
				showTitle,
				showDesc,
				icon,
				seperatorPosition
			} = props.attributes
		
			// Get icon/Image components.
			let is_image = ""
		
			if( source_type === "icon" && icon !=="" ) {
				is_image = <Icon attributes={ props.attributes }/>
			}else{
				is_image = <InfoBoxIconImage attributes={ props.attributes } />
			}
		
			var icon_image_html = is_image
			var seperator_position = seperatorPosition
			var seperator_html = <InfoBoxSeparator attributes={props.attributes} />
			var show_seperator = true
		
			if( seperatorPosition == "after_icon" && ( iconimgPosition == "above-title" || iconimgPosition == "below-title" ) ){
				show_seperator = false
				icon_image_html = (
					<Fragment>
						{ is_image }
						{ "none" !== seperatorStyle && seperator_html }
					</Fragment>
				)
			}
		
			if( seperatorPosition == "after_icon" && ( iconimgPosition !== "above-title" || iconimgPosition !== "below-title" ) ){
				seperator_position = "after_title"
			}
		
			if( iconimgPosition == "below-title" &&  seperatorPosition == "after_title" ){
				show_seperator = false
				icon_image_html = (
					<Fragment>
						{ "none" !== seperatorStyle && seperator_html }
						{ is_image }
					</Fragment>
				)
			}
			// Get description and seperator components.
			const desc = (
				<Fragment>
					{ "none" !== seperatorStyle && ( seperator_position == "after_title"  && show_seperator )&& seperator_html }
					<div className = "uagb-ifb-text-wrap">
						{ showDesc && "" !== headingDesc && <InfoBoxDesc attributes={props.attributes} setAttributes = "not_set"/> }
						{ "none" !== seperatorStyle && seperator_position == "after_desc" && seperator_html }
						{ ctaType !== "none" && <CallToAction attributes={props.attributes} />}
					</div>
				</Fragment>
			)
		
			// Get Title and Prefix components.
			const title_text = (
				<div className = "uagb-ifb-title-wrap">
					{ showPrefix && "" !== prefixTitle && <Prefix attributes={ props.attributes } setAttributes = "not_set"/> }
					{ "none" !== seperatorStyle && seperator_position == "after_prefix" && seperator_html }
					{ showTitle && "" !== infoBoxTitle && <Title attributes={ props.attributes} setAttributes = "not_set"/> }
				</div>
			)
		
			const output = (
				<div className = { classnames(
					"uagb-infobox__content-wrap",
					( ctaType == "all" ? " uagb-infobox_cta-type-all" : "" ),
					...InfoBoxPositionClasses(  props.attributes  ),
				) }>
					<div className = "uagb-ifb-left-right-wrap">
		
						{ ( iconimgPosition == "left") &&
								is_image
						}
						<div className = "uagb-ifb-content">
		
							{  iconimgPosition == "above-title" && icon_image_html }
		
							{ ( iconimgPosition == "above-title" || iconimgPosition == "below-title") && title_text }
		
							{ iconimgPosition == "below-title"  && icon_image_html }
		
							{ ( iconimgPosition == "above-title" || iconimgPosition == "below-title") && desc }
		
							{ ( iconimgPosition === "left-title") &&
									<Fragment>
										<div className = "uagb-ifb-left-title-image">
											{ icon_image_html }
											{ title_text }
										</div>
										{ desc }
									</Fragment>
							}
		
							{ ( iconimgPosition === "right-title") &&
									<Fragment>
										<div className = "uagb-ifb-right-title-image">
											{ title_text }
											{ icon_image_html }
										</div>
										{ desc }
									</Fragment>
							}
		
							{ ( iconimgPosition == "left" || iconimgPosition == "right") &&
									<Fragment>
										{ title_text }
										{ desc }
									</Fragment>
							}
		
						</div>
		
						{ ( iconimgPosition == "right") && icon_image_html }
					</div>
				</div>
			)
		
			let target =""
			if( ctaTarget ){
				target ="_blank"
			}
		
			return (
				<div className={ classnames(
					className,
					"uagb-infobox__outer-wrap",
					`uagb-block-${block_id}`
				) }>
		
					{ ( ctaType == "all") &&
						<a href= {ctaLink} className = "uagb-infobox-link-wrap uagb-infbox__link-to-all" target={target} aria-label={"Infobox Link"} rel ="noopener noreferrer"></a>
					}
					{output}
				</div>
			)
		},
	},
	{
		attributes,
		save: function( props ) {
				
			const {
				iconimgPosition,
				block_id,
				source_type,
				seperatorStyle,
				ctaType,
				ctaLink,
				ctaTarget,
				className,
				prefixTitle,
				infoBoxTitle,
				headingDesc,
				showPrefix,
				showTitle,
				showDesc,
				icon,
				seperatorPosition
			} = props.attributes

			// Get icon/Image components.
			let is_image = ""

			if( source_type === "icon" && icon !=="" ) {
				is_image = <Icon attributes={ props.attributes }/>
			}else{
				is_image = <InfoBoxIconImage attributes={ props.attributes } />
			}

			var icon_image_html = is_image
			var seperator_position = seperatorPosition
			var seperator_html = <InfoBoxSeparator attributes={props.attributes} />
			var show_seperator = true

			if( seperatorPosition == "after_icon" && ( iconimgPosition == "above-title" || iconimgPosition == "below-title" ) ){
				show_seperator = false
				icon_image_html = (
					<Fragment>
						{ is_image }
						{ "none" !== seperatorStyle && seperator_html }
					</Fragment>
				)
			}

			if( seperatorPosition == "after_icon" && ( iconimgPosition !== "above-title" || iconimgPosition !== "below-title" ) ){
				seperator_position = "after_title"
			}

			if( iconimgPosition == "below-title" &&  seperatorPosition == "after_title" ){
				show_seperator = false
				icon_image_html = (
					<Fragment>
						{ "none" !== seperatorStyle && seperator_html }
						{ is_image }
					</Fragment>
				)
			}
			// Get description and seperator components.
			const desc = (
				<Fragment>
					{ "none" !== seperatorStyle && ( seperator_position == "after_title"  && show_seperator )&& seperator_html }
					<div className = "uagb-ifb-text-wrap">
						{ showDesc && "" !== headingDesc && <InfoBoxDesc attributes={props.attributes} setAttributes = "not_set"/> }
						{ "none" !== seperatorStyle && seperator_position == "after_desc" && seperator_html }
						{ ctaType !== "none" && <CallToAction attributes={props.attributes} />}
					</div>
				</Fragment>
			)

			// Get Title and Prefix components.
			const title_text = (
				<div className = "uagb-ifb-title-wrap">
					{ showPrefix && "" !== prefixTitle && <Prefix attributes={ props.attributes } setAttributes = "not_set"/> }
					{ "none" !== seperatorStyle && seperator_position == "after_prefix" && seperator_html }
					{ showTitle && "" !== infoBoxTitle && <Title attributes={ props.attributes} setAttributes = "not_set"/> }
				</div>
			)

			const output = (
				<div className = { classnames(
					"uagb-infobox__content-wrap",
					( ctaType == "all" ? " uagb-infobox_cta-type-all" : "" ),
					...InfoBoxPositionClasses(  props.attributes  ),
				) }>
					<div className = "uagb-ifb-left-right-wrap">

						{ ( iconimgPosition == "left") &&
								is_image
						}
						<div className = "uagb-ifb-content">

							{  iconimgPosition == "above-title" && icon_image_html }

							{ ( iconimgPosition == "above-title" || iconimgPosition == "below-title") && title_text }

							{ iconimgPosition == "below-title"  && icon_image_html }

							{ ( iconimgPosition == "above-title" || iconimgPosition == "below-title") && desc }

							{ ( iconimgPosition === "left-title") &&
									<Fragment>
										<div className = "uagb-ifb-left-title-image">
											{ icon_image_html }
											{ title_text }
										</div>
										{ desc }
									</Fragment>
							}

							{ ( iconimgPosition === "right-title") &&
									<Fragment>
										<div className = "uagb-ifb-right-title-image">
											{ title_text }
											{ icon_image_html }
										</div>
										{ desc }
									</Fragment>
							}

							{ ( iconimgPosition == "left" || iconimgPosition == "right") &&
									<Fragment>
										{ title_text }
										{ desc }
									</Fragment>
							}

						</div>

						{ ( iconimgPosition == "right") && icon_image_html }
					</div>
				</div>
			)

			let target =""
			if( ctaTarget ){
				target ="_blank"
			}

			return (
				<div className={ classnames(
					className,
					"uagb-infobox__outer-wrap",
					`uagb-block-${block_id}`
				) }>

					{ ( ctaType == "all") &&
						<a href= {ctaLink} className = "uagb-infobox-link-wrap uagb-infbox__link-to-all" target={target} aria-label={"Infobox Link"} rel ="noopener noreferrer"></a>
					}
					{output}
				</div>
			)
		},
	}
]

export default deprecated;