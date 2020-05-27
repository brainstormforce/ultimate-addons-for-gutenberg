/**
 * Schema Notices component.
 *
 */
const { __ } = wp.i18n

const { select } = wp.data;

const { Component, Fragment } = wp.element

class SchemaNotices extends Component {

	constructor() {
        super( ...arguments )
    }
    render() {
        const {
            headingTitle,
            headingDesc,
            mainimage,
            showTotaltime,
            showTools,
            showMaterials,
            timeNeeded,
            time,
            timeIn,
            showEstcost,
            estCost,
            cost,
            currencyType,
            tools,
            materials,
            clientId,
        } = this.props

        var emptyItems = [];
        var steps = select('core/block-editor').getBlocks( clientId );
        var steps_empty_item_flag = false;
        steps.forEach((step, key) => {
            if ( '' === step.attributes.ctaLink || '#' === step.attributes.ctaLink || '' === step.attributes.infoBoxTitle || '' === step.attributes.headingDesc || '' === step.attributes.iconImage.url ) {
                steps_empty_item_flag = true;
            }
        });

        if ( 'undefined' === typeof headingTitle || '' === headingTitle ) {
            emptyItems.push( 'How-To Title' );
        }
        if ( 'undefined' === typeof headingDesc || '' === headingDesc ) {
            emptyItems.push( 'Description' );
        }
        if ( 'undefined' === typeof mainimage || null === mainimage ) {
            emptyItems.push( 'Image' );
        }
        if ( true === showTotaltime && ( 'undefined' === typeof timeNeeded || '' === timeNeeded ) ) {
            emptyItems.push( 'Time Needed Label' );
        }
        if ( true === showTotaltime && ( 'undefined' === typeof time || '' === time ) ) {
            emptyItems.push( 'Time' );
        }
        if ( true === showTotaltime && ( 'undefined' === typeof timeIn || '' === timeIn ) ) {
            emptyItems.push( 'Time Unit' );
        }
        if ( true === showEstcost && ( 'undefined' === typeof estCost || '' === estCost ) ) {
            emptyItems.push( 'Total Cost Label' );
        }
        if ( true === showEstcost && ( 'undefined' === typeof cost || '' === cost ) ) {
            emptyItems.push( 'Cost' );
        }
        if ( true === showEstcost && ( 'undefined' === typeof currencyType || '' === currencyType ) ) {
            emptyItems.push( 'Currency Unit' );
        }
        if ( true === showTools && ( 'undefined' === typeof tools || 0 === tools.length || '' === tools[0].add_required_tools ) ) {
            emptyItems.push( 'Tools' );
        }
        if ( true === showMaterials && ( 'undefined' === typeof materials || 0 === materials.length || '' === materials[0].add_required_materials ) ) {
            emptyItems.push( 'Materials' );
        }
        if ( 'undefined' === typeof steps || 2 > steps.length ) {
            emptyItems.push( 'Atleast 2 Steps are required' );
        }
        if ( true === steps_empty_item_flag ) {
            emptyItems.push( 'The Info Box Heading, Description, Image, Call To Action Link are required for each Step. ' );
        }
        const listItems = emptyItems.map( ( item ) =>
            <li key={ item }> { item } </li> 
        );

        const schemaNoticeMarkup = () => {

            if ( 0 !== emptyItems.length ) {
                return (
                    <div className="how-to-schema-notices">

                        <h6> { __( 'It seems the following fields are empty, It may generate Schema errors / warnings for your Page, we recommend you to fill those fields.' ) } </h6>
                        <ul className="how-to-schema-notices-list">
                            { listItems }
                        </ul>
                    </div>
                )
            }
            return '';
        }

        return (
            <Fragment>
                { schemaNoticeMarkup() }
            </Fragment>
        )
    }
}

export default SchemaNotices