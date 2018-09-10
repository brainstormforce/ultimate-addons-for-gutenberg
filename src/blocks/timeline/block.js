/**
 * External dependencies
 */

import get from 'lodash/get';
import isUndefined from 'lodash/isUndefined';
import pickBy from 'lodash/pickBy';
import moment from 'moment';
import classnames from 'classnames';
//import { stringify } from 'querystringify';

const { Component, Fragment } = wp.element;

const { __ } = wp.i18n;

const { decodeEntities } = wp.htmlEntities;

const { apiFetch } = wp;

const {
    registerStore,
    withSelect,
} = wp.data;

const {
    PanelBody,
    PanelColor,
    Placeholder,
    QueryControls,
    RangeControl,
    SelectControl,
    Spinner,
    TextControl,
    ToggleControl,
    Toolbar,
    withAPIData,
} = wp.components;

const {
    AlignmentToolbar,
    InspectorControls,
    ColorPalette,
    RichText,
    BlockAlignmentToolbar,
    BlockControls,
} = wp.editor;


const MAX_POSTS_COLUMNS = 4;

class UAGBTimeline extends Component {
    constructor() {
        super( ...arguments );

        // Get initial timeline content.       
        this.toggleDisplayPostDate = this.toggleDisplayPostDate.bind( this );
        this.toggleDisplayPostExcerpt = this.toggleDisplayPostExcerpt.bind( this );
        this.toggleDisplayPostAuthor = this.toggleDisplayPostAuthor.bind( this );
        this.toggleDisplayPostImage = this.toggleDisplayPostImage.bind( this );
        this.toggleDisplayPostLink = this.toggleDisplayPostLink.bind( this );
        
        // Get unique id
        this.uagbGetId = this.uagbGetId.bind(this);
   }

    uagbGetId(){
        const id = _.uniqueId("uagb-tl-block-no-");
        if( this.props.attributes.tm_block_id == '0' ){
            this.props.setAttributes( { tm_block_id: id } );
        }
    }

    toggleDisplayPostDate() {
        const { displayPostDate } = this.props.attributes;
        const { setAttributes } = this.props;

        setAttributes( { displayPostDate: ! displayPostDate } );
    }

    toggleDisplayPostExcerpt() {
        const { displayPostExcerpt } = this.props.attributes;
        const { setAttributes } = this.props;

        setAttributes( { displayPostExcerpt: ! displayPostExcerpt } );
    }

    toggleDisplayPostAuthor() {
        const { displayPostAuthor } = this.props.attributes;
        const { setAttributes } = this.props;

        setAttributes( { displayPostAuthor: ! displayPostAuthor } );
    }

    toggleDisplayPostImage() {
        const { displayPostImage } = this.props.attributes;
        const { setAttributes } = this.props;

        setAttributes( { displayPostImage: ! displayPostImage } );
    }

    toggleDisplayPostLink() {
        const { displayPostLink } = this.props.attributes;
        const { setAttributes } = this.props;

        setAttributes( { displayPostLink: ! displayPostLink } );
    }

    customizeReadMoreText() {
        const { readMoreText } = this.props.attributes;
        const { setAttributes } = this.props;

        setAttributes( { readMoreText: ! readMoreText } );
    }
 
    render() {       
        //Get id
        this.uagbGetId();
       
        const { attributes, categoriesList, setAttributes, latestPosts } = this.props;
        const {
            className,
            tm_post,
            tm_content,
            post_content,
            headingAlign,
            headingColor,
            subHeadingColor,
            backgroundColor,
            separatorColor,
            separatorBg,
            separatorBorder,
            headingTag,
            headFontSize,
            timelineItem,
            postNumber,
            timelinAlignment,
            arrowlinAlignment,
            subHeadFontSize,
            verticalSpace,
            horizontalSpace,
            headSpace,
            separatorwidth,
            subHeadSpace,
            displayPostDate,
            displayPostExcerpt,
            displayPostAuthor,
            displayPostImage,
            displayPostLink,
            align,
            postLayout,
            order,
            orderBy,
            categories,
            postsToShow,
            width,
            imageCrop,
            readMoreText,
            tm_block_id,
        } = attributes;

        //console.log(this.props);

        // Thumbnail options
        const imageCropOptions = [
            { value: 'landscape', label: __( 'Landscape' ) },
            { value: 'square', label: __( 'Square' ) },
        ];

        const isLandscape = imageCrop === 'landscape';

        const timeline_control = (
            <InspectorControls>
                
                 { <PanelBody title={ __( 'Post Settings' ) }>
                    <QueryControls
                        numberOfItems={ postsToShow }
                        { ...{ order, orderBy } }
                        categoriesList={ categoriesList }
                        selectedCategoryId={ categories }
                        onOrderChange={ ( value ) => { setAttributes( { order: value } ); } }
                        onOrderByChange={ ( value ) => { setAttributes( { orderBy: value } ); } }
                        onCategoryChange={ ( value ) => { setAttributes( { categories: '' !== value ? value : undefined } ) ; } }
                        onNumberOfItemsChange={ ( value ) => { setAttributes( { postsToShow: value } ); } }
                    />                   
                    <ToggleControl
                        label={ __( 'Display Featured Image' ) }
                        checked={ displayPostImage }
                        onChange={ this.toggleDisplayPostImage }
                    />
                    { displayPostImage &&
                        <SelectControl
                            label={ __( 'Featured Image Style' ) }
                            options={ imageCropOptions }
                            value={ imageCrop }
                            onChange={ ( value ) => this.props.setAttributes( { imageCrop: value } ) }
                        />
                    }
                    <ToggleControl
                        label={ __( 'Display Post Author' ) }
                        checked={ displayPostAuthor }
                        onChange={ this.toggleDisplayPostAuthor }
                    />
                    <ToggleControl
                        label={ __( 'Display Post Date' ) }
                        checked={ displayPostDate }
                        onChange={ this.toggleDisplayPostDate }
                    />
                    <ToggleControl
                        label={ __( 'Display Post Excerpt' ) }
                        checked={ displayPostExcerpt }
                        onChange={ this.toggleDisplayPostExcerpt }
                    />
                    <ToggleControl
                        label={ __( 'Display Continue Reading Link' ) }
                        checked={ displayPostLink }
                        onChange={ this.toggleDisplayPostLink }
                    />
                    { displayPostLink &&
                    <TextControl
                        label={ __( 'Customize Read More Link' ) }
                        type="text"
                        value={ readMoreText }
                        onChange={ ( value ) => this.props.setAttributes( { readMoreText: value } ) }
                    />                                      
                    }                    

                </PanelBody>} 
                 <PanelBody 
                    title={ __( 'Layout' ) }
                    initialOpen={ false }
                >                      
                    <SelectControl
                        label={ __( 'Alignment' ) }
                        value={ timelinAlignment }
                        onChange={ ( value ) => setAttributes( { timelinAlignment: value } ) }
                        options={ [
                            { value: 'left', label: __( 'Left' ) },
                            { value: 'right', label: __( 'Right' ) },
                            { value: 'center', label: __( 'Center' ) },
                        ] }
                    />
                    <SelectControl
                        label={ __( 'Arrow Alignment' ) }
                        value={ arrowlinAlignment }
                        onChange={ ( value ) => setAttributes( { arrowlinAlignment: value } ) }
                        options={ [
                            { value: 'top', label: __( 'Top' ) },
                            { value: 'bottom', label: __( 'Bottom' ) },
                            { value: 'center', label: __( 'Center' ) },
                        ] }
                    />
                    <BlockControls key='controls'>
                        <AlignmentToolbar
                            value={ headingAlign }
                            onChange={ ( value ) => setAttributes( { headingAlign: value } ) }
                        />
                    </BlockControls>
                </PanelBody>
                <PanelBody 
                    title={ __( 'Typography' ) }
                    initialOpen={ false }
                    >
                    <SelectControl
                        label={ __( 'Tag' ) }
                        value={ headingTag }
                        onChange={ ( value ) => setAttributes( { headingTag: value } ) }
                        options={ [
                            { value: 'h1', label: __( 'H1' ) },
                            { value: 'h2', label: __( 'H2' ) },
                            { value: 'h3', label: __( 'H3' ) },
                            { value: 'h4', label: __( 'H4' ) },
                            { value: 'h5', label: __( 'H5' ) },
                            { value: 'h6', label: __( 'H6' ) },
                        ] }
                    />
                    <RangeControl
                        label={ __( 'Heading Font Size' ) }
                        value={ headFontSize }
                        onChange={ ( value ) => setAttributes( { headFontSize: value } ) }
                        min={ 10 }
                        max={ 200 }
                        beforeIcon="editor-textcolor"
                        allowReset
                    />
                    <RangeControl
                        label={ __( 'Description Font Size' ) }
                        value={ subHeadFontSize }
                        onChange={ ( value ) => setAttributes( { subHeadFontSize: value } ) }
                        min={ 10 }
                        max={ 200 }
                        beforeIcon="editor-textcolor"
                        allowReset
                    />
                </PanelBody>
                <PanelBody 
                    title={ __( 'Timeline Colors' ) }
                    initialOpen={ false }
                    >
                    <PanelColor
                        title={ __( 'Heading Color' ) }
                        colorValue={ headingColor }
                        initialOpen={ false }
                    >
                        <ColorPalette
                            value={ headingColor }
                            onChange={ ( colorValue ) => setAttributes( { headingColor: colorValue } ) }
                            allowReset
                        />
                    </PanelColor>
                    <PanelColor
                        title={ __( 'Description Color' ) }
                        colorValue={ subHeadingColor }
                        initialOpen={ false }
                    >
                        <ColorPalette
                            value={ subHeadingColor }
                            onChange={ ( colorValue ) => setAttributes( { subHeadingColor: colorValue } ) }
                            allowReset
                        />
                    </PanelColor>
                    <PanelColor
                        title={ __( 'Background Color' ) }
                        colorValue={ backgroundColor }
                        initialOpen={ false }
                    >
                        <ColorPalette
                            value={ subHeadingColor }
                            onChange={ ( colorValue ) => setAttributes( { backgroundColor: colorValue } ) }
                            allowReset
                        />
                    </PanelColor>
                </PanelBody>
                <PanelBody 
                    title={ __( 'Connector' ) }
                    initialOpen={ false }
                    >
                    <PanelColor
                        title={ __( 'Line Color' ) }
                        colorValue={ separatorColor }
                        initialOpen={ false }
                    >
                        <ColorPalette
                            value={ separatorColor }
                            onChange={ ( colorValue ) => setAttributes( { separatorColor: colorValue } ) }
                            allowReset
                        />
                    </PanelColor>
                    <PanelColor
                        title={ __( 'Background Color' ) }
                        colorValue={ separatorBg }
                        initialOpen={ false }
                    >
                        <ColorPalette
                            value={ separatorBg }
                            onChange={ ( colorValue ) => setAttributes( { separatorBg: colorValue } ) }
                            allowReset
                        />
                    </PanelColor>
                    <PanelColor
                        title={ __( 'Border Color' ) }
                        colorValue={ separatorBorder }
                        initialOpen={ false }
                    >
                    <ColorPalette
                            value={ separatorBorder }
                            onChange={ ( colorValue ) => setAttributes( { separatorBorder: colorValue } ) }
                            allowReset
                        />
                    </PanelColor>
                    <RangeControl
                        label={ __( 'Line Width' ) }
                        value={ separatorwidth }
                        onChange={ ( value ) => setAttributes( { separatorwidth: value } ) }
                        min={ 1 }
                        max={ 10 }
                        beforeIcon="editor-textcolor"
                        allowReset
                    />
                    <RangeControl
                        label={ __( 'Horizontal Space' ) }
                        value={ horizontalSpace }
                        onChange={ ( value ) => setAttributes( { horizontalSpace: value } ) }
                        min={ 10 }
                        max={ 80 }
                        beforeIcon="editor-textcolor"
                        allowReset
                    />
                    <RangeControl
                        label={ __( 'Vertical Space' ) }
                        value={ verticalSpace }
                        onChange={ ( value ) => setAttributes( { verticalSpace: value } ) }
                        min={ 0 }
                        max={ 80 }
                        beforeIcon="editor-textcolor"
                        allowReset
                    />
                </PanelBody>
                <PanelBody 
                    title={ __( 'Additional Options' ) }
                    initialOpen={ false }
                    >                   
                    <RangeControl
                        label={ __( 'Heading Spacing' ) }
                        value={ headSpace }
                        onChange={ ( value ) => setAttributes( { headSpace: value } ) }
                        min={ 0 }
                        max={ 50 }
                        beforeIcon="editor-textcolor"
                        allowReset
                    />                    
                    <RangeControl
                        label={ __( 'Sub-Heading Spacing' ) }
                        value={ subHeadSpace }
                        onChange={ ( value ) => setAttributes( { subHeadSpace: value } ) }
                        min={ 0 }
                        max={ 50 }
                        beforeIcon="editor-textcolor"
                        allowReset
                    />
                </PanelBody>
            </InspectorControls>                
        );

        /* Arrow position */
        var arrow_align_class  = 'uagb-timeline-arrow-top';
        if( arrowlinAlignment == 'center' ){
            arrow_align_class = 'uagb-timeline-arrow-center';
        }else if( arrowlinAlignment == 'bottom' ){
            arrow_align_class = 'uagb-timeline-arrow-bottom';
        } 

        /* Alignmnet */
        var align_class = 'uagb-timeline--center '+ arrow_align_class;
        if( timelinAlignment == 'left' ){
            align_class = 'uagb-timeline--left ' + arrow_align_class;
        }else if(timelinAlignment == 'right'){
            align_class = 'uagb-timeline--right '+ arrow_align_class;
        }     

        var responsive_class = 'uagb-timeline-responsive-tablet';
        var tl_class = tm_block_id +' '+align_class+' '+responsive_class;

        return (
            <Fragment>
            { timeline_control }
                <div className={ className } > 
                    <div className = { tl_class }>
                        <div className = "uagb-timeline-wrapper">
                            <div className = "uagb-timeline-main">                                
                                { this.uagb_get_timeline_content() }
                                <div className = "uagb-timeline__line" style = {{ top:0, bottom:'288px' }} >
                                    <div className = "uagb-timeline__line__inner" style = {{ height:'1000px'}}></div>
                                </div>                                
                            </div>
                        </div>
                    </div>
                </div>
            </Fragment>
        );
    }

     /* Render output at backend */
    uagb_get_timeline_content(){
        var attr               = this.props.attributes,
            headingTag         = attr.headingTag,
            headingAlign       = attr.headingAlign,
            headFontSize       = attr.headFontSize,
            headingColor       = attr.headingColor,
            headSpace          = attr.headSpace,
            subHeadFontSize    = attr.subHeadFontSize,
            subHeadingColor    = attr.subHeadingColor,
            subHeadSpace       = attr.subHeadSpace,
            backgroundColor    = attr.backgroundColor,
            separatorColor     = attr.separatorColor,
            separatorBg        = attr.separatorBg,
            separatorBorder    = attr.separatorBorder,
            timelinAlignment   = attr.timelinAlignment,
            arrowlinAlignment  = attr.arrowlinAlignment,
            postNumber         = attr.postNumber,
            verticalSpace      = attr.verticalSpace,
            horizontalSpace    = attr.horizontalSpace,
            separatorwidth     = attr.separatorwidth,
            displayPostImage   = attr.displayPostImage,
            displayPostDate    = attr.displayPostDate,
            displayPostExcerpt = attr.displayPostExcerpt,
            displayPostAuthor  = attr.displayPostAuthor,
            displayPostImage   = attr.displayPostImage,
            displayPostLink    = attr.displayPostLink,
            order              = attr.order,
            orderBy            = attr.orderBy,
            categories         = attr.categories,
            postsToShow        = attr.postsToShow,
            width              = attr.width,
            imageCrop          = attr.imageCrop,
            readMoreText       = attr.readMoreText,
            tm_block_id        = attr.tm_block_id,
            align_class        = '',
            align_item_class   = '',            
            seperator_margin   = parseInt(separatorwidth/2),
            vert_per           = parseInt((parseInt(verticalSpace) * (75))/100);        

        const isLandscape = imageCrop === 'landscape';

         /* Style for elements */
        var back_style = '.'+ tm_block_id +' .uagb-timeline-container.uagb-tl-item-left .uagb-timeline-content::before {'+
                        '  border-color: transparent transparent transparent '+backgroundColor+
                        '}'+
                        '.'+ tm_block_id +' .uagb-timeline::after{'+
                            'background-color:'+separatorColor+';'+
                            'width:'+separatorwidth+'px'+';'+
                            'margin-left:-'+seperator_margin+'px'+
                        '}'+
                        '.'+ tm_block_id +' .uagb-timeline-container::after{'+
                          'background-color:'+separatorBg+';'+
                          'border-color:'+separatorBorder+
                        '}'+
                        '.'+ tm_block_id +' .uagb-timeline-container.uagb-tl-item-right .uagb-timeline-content::before {'+
                        '  border-color: transparent '+backgroundColor+' transparent transparent'+
                        '}'+ 
                        '.'+ tm_block_id +' .uagb-timeline-container.uagb-tl-item-left {'+
                        ' padding-right:'+horizontalSpace+'px'+
                        '}'+ 
                        '.'+ tm_block_id +' .uagb-timeline-container.uagb-tl-item-right {'+
                        ' padding-left:'+horizontalSpace+'px'+
                        '}'+
                        '.'+ tm_block_id +' .uagb-timeline-container {'+
                        ' padding-top:'+verticalSpace+'px'+
                        '}'+
                        '.'+ tm_block_id +' .uagb-top-arrow .uagb-timeline-container:after{'+
                        ' top:calc(20% + '+vert_per+'px)!important'+
                        '}'+
                        '.'+ tm_block_id +' .uagb-bottom-arrow .uagb-timeline-container:after{'+
                        ' top:calc(80% + '+vert_per+'px)!important'+
                        '}'+ 
                        '.'+ tm_block_id +' .uagb-center-arrow .uagb-timeline-container:after{'+
                        ' top:calc(50% + '+vert_per+'px)!important'+
                        '}' ;

        const { setAttributes, latestPosts } = this.props;           

        const hasPosts = Array.isArray( latestPosts ) && latestPosts.length;

            if ( ! hasPosts ) {
                return (
                    <Fragment>                                            
                        <Placeholder
                            icon="admin-post"
                            label={ __( 'UAGB timeline' ) }
                        >
                            { ! Array.isArray( latestPosts ) ?
                                <Spinner /> :
                                __( 'No posts found.' )
                            }
                        </Placeholder>
                    </Fragment>
                );
            }else{
                // Removing posts from display should be instant.
            const displayPosts = latestPosts.length > postsToShow ?
                latestPosts.slice( 0, postsToShow ) :
                latestPosts;
            
            var content_align_class = '';
            var day_align_class = '';

            if( timelinAlignment == 'left' ){
                content_align_class = 'uagb-timeline-widget uagb-timeline-left';
                day_align_class = 'uagb-day-new uagb-day-left';
            }else if(timelinAlignment == 'right'){
                content_align_class = 'uagb-timeline-widget uagb-timeline-right';
                day_align_class = 'uagb-day-new uagb-day-right';
            }     
            
            var display_inner_date = false;
            /*<style dangerouslySetInnerHTML={{ __html: back_style }}></style>*/

            return (<div className = "uagb-days uagb-timeline-infinite-load">                       
                            {displayPosts.map((post,index) => {
                                var second_index = 'uagb-'+index;
                                if(timelinAlignment == 'center'){
                                    display_inner_date = true;
                                    if(index % 2 == '0'){
                                        content_align_class = 'uagb-timeline-widget uagb-timeline-right';
                                        day_align_class = 'uagb-day-new uagb-day-right';
                                    }else{
                                        content_align_class = 'uagb-timeline-widget uagb-timeline-left';
                                        day_align_class = 'uagb-day-new uagb-day-left';
                                    }  
                                }       
                                return (
                                    <div className = "uagb-timeline-field animate-border in-view">
                                        <div className = {content_align_class}> 
                                            <div className = "uagb-timeline-marker in-view-timeline-icon">
                                                <i className = "timeline-icon-new out-view-timeline-icon fa fa-calendar"></i>
                                            </div>
                                            <div className = {day_align_class}>
                                                <div className="uagb-events-new">
                                                    <a href= { post.link } target="_blank">
                                                        <div className="uagb-events-inner-new" style={{ backgroundColor: backgroundColor }}>                                                                
                                                                
                                                                <div className="uagb-timeline-date-hide uagb-date-inner">                                                                
                                                                    { displayPostDate && post.date_gmt &&
                                                                        <div dateTime={ moment( post.date_gmt ).utc().format() } className={ 'inner-date-new' }>
                                                                            { moment( post.date_gmt ).local().format( 'MMMM DD, Y' ) }
                                                                        </div>
                                                                    }  
                                                                </div>                                                            
                                                               
                                                            <div className="uagb-content">
                                                                <div className="uagb-timeline-heading-text">
                                                                    <h3 className="uagb-timeline-heading" style={{ 
                                                                        textAlign: headingAlign,
                                                                        fontSize: headFontSize + 'px',
                                                                        color: headingColor,
                                                                        marginBottom: headSpace + 'px',
                                                                    }}>
                                                                    { decodeEntities( post.title.rendered.trim() ) || __( '(Untitled)' ) }
                                                                    </h3>
                                                                </div>

                                                                { displayPostExcerpt && post.excerpt &&
                                                                    <div className = "uagb-timeline-desc-content" dangerouslySetInnerHTML={ { __html: post.excerpt.rendered } } style={{ 
                                                                    textAlign: headingAlign,
                                                                    fontSize: subHeadFontSize + 'px',
                                                                    color: subHeadingColor,
                                                                    marginBottom: subHeadSpace + 'px',
                                                                }}/>
                                                                }                                                                
                                                            <div className="uagb-timeline-arrow"></div>
                                                            </div>
                                                        </div>
                                                    </a>
                                                </div>
                                            </div>
                                            { display_inner_date &&
                                                <div className = "uagb-timeline-date-new">
                                                    <div className = "uagb-date-new">                                                    
                                                        { displayPostDate && post.date_gmt &&
                                                            <div dateTime={ moment( post.date_gmt ).utc().format() } className={ 'uagb-date-new' }>
                                                                { moment( post.date_gmt ).local().format( 'MMMM DD, Y' ) }
                                                            </div>
                                                        }                                                    
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                    </div> 
                                );
                            })}        
                    </div>);
                }
            
        
    }

}

export default withSelect( ( select, props ) => {
    const { postsToShow, order, orderBy, categories } = props.attributes;    
    
        const { getEntityRecords } = select( 'core' );
        const latestPostsQuery = pickBy( {
            categories,
            order,
            orderby: orderBy,
            per_page: postsToShow,
        }, ( value ) => ! isUndefined( value ) );
        const categoriesListQuery = {
            per_page: 100,
        };        
        return {
            latestPosts: getEntityRecords( 'postType', 'post', latestPostsQuery ),
            categoriesList: getEntityRecords( 'taxonomy', 'category', categoriesListQuery ),
        };
    
} )( UAGBTimeline );