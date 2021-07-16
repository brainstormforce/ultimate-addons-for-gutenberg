/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import Range from "../../components/range/Range.js";
// Extend component
const { Fragment } = wp.element;
const { useSelect, useDispatch } = wp.data;

/**
 * Build the Measure controls
 * @returns {object} Measure settings.
 */
export default function RangeTypographyControl(props) {
	const deviceType = useSelect((select) => {
		return select("core/edit-post").__experimentalGetPreviewDeviceType();
	}, []);

	let sizeTypes;

	if ("sizeTypes" in props) {
		sizeTypes = props.sizeTypes;
	} else {
		sizeTypes = [
			{ key: "px", name: __("px", "ultimate-addons-for-gutenberg") },
			{ key: "em", name: __("em", "ultimate-addons-for-gutenberg") },
		];
	}

	const output = {};

	output.Desktop = (
		<Fragment>
			<Range
				{...props}
				label={__(props.sizeText)}
				value={props.size.value || ""}
				onChange={(value) =>
					props.setAttributes({ [props.sizeLabel]: value })
				}
				min={0}
				max={100}
				unit={props.type}
				responsive={true}
			/>
		</Fragment>
	);
	output.Tablet = (
		<Fragment>
			<Range
				{...props}
				label={__(props.sizeTabletText)}
				value={props.sizeTablet.value}
				onChange={(value) =>
					props.setAttributes({ [props.sizeTabletLabel]: value })
				}
				min={0}
				max={100}
				unit={props.type}
				responsive={true}
			/>
		</Fragment>
	);
	output.Mobile = (
		<Fragment>
			<Range
				{...props}
				label={__(props.sizeMobileText)}
				value={props.sizeMobile.value}
				onChange={(value) =>
					props.setAttributes({ [props.sizeMobileLabel]: value })
				}
				min={0}
				max={100}
				unit={props.type}
				responsive={true}
			/>
		</Fragment>
	);

	return (
		<div className={"uag-typography-range-options"}>
			<div className="uagb-size-type-field-tabs">
				<div className="uagb-responsive-control-inner">
					{output[deviceType] ? output[deviceType] : output.Desktop}
				</div>
			</div>
		</div>
	);
}
