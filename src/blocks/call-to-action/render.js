import classnames from "classnames";
import Title from "./components/Title";
import Description from "./components/Description";
import CtaPositionClasses from "./classes";
import CTA from "./components/CTA";

const callToActionRender = props => {
    const { className, setAttributes, attributes } = props;

    // Setup the attributes.
    const {
        block_id,
        ctaPosition,
        ctaType,
    } = attributes;

	const is_cta =  <CTA attributes={ attributes } setAttributes={ setAttributes } />;

	// Get description components.
    const desc = (
        <div className="uagb-cta-text-wrap">
            { <Description attributes={ attributes } setAttributes={ setAttributes } props={ props } /> }
        </div>
    );

    // Get Title components.
    const title_text = (
        <div className="uagb-cta__title-wrap">
            { <Title attributes={ attributes } setAttributes={ setAttributes } props={ props } /> }
        </div>
    );

    const output = () => {
        return <div className={ classnames(
                    "uagb-cta__content-wrap",
                    ...CtaPositionClasses( attributes ),
                ) }>
                    <div className="uagb-cta__left-right-wrap">
                        <div className="uagb-cta__content">
                            { ctaPosition == "below-title"  &&
                            <>
                                { title_text }
                                { desc }
                                { is_cta }
                            </>
                            }
                            { ( ctaPosition == "right" ) &&
                            <>
                                { title_text }
                                { desc }
                            </>
                            }
                        </div>
                        { ( ctaPosition == "right" ) &&
                                    is_cta
                        }
                    </div>
                </div>
    }

    return (<>
        	<div className={ classnames(
					className,
					"uagb-cta__outer-wrap",
					`uagb-block-${block_id}`
				) }
				>
					{ ( ctaType == "all" ) &&
					<>
						<a href="javascript:void(0)" className="uagb-cta__block-link-wrap uagb-cta__link-to-all" rel="noopener noreferrer" > </a>
						{ output() }
					</>
					}
					{ ( ctaType !== "all" ) && output() }
			</div>
    </>)
}
export default callToActionRender 