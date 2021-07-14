/**
 * WordPress dependencies
 */
import { __ } from "@wordpress/i18n";
import Range from "../../components/range/Range.js";

const { ButtonGroup, Button, Dashicon } = wp.components;

// Extend component
const { Fragment } = wp.element;
const { useSelect, useDispatch } = wp.data;
import map from "lodash/map";

/**
 * Build the Measure controls
 * @returns {object} Measure settings.
 */
export default function RangeTypographyControl(props) {
	const deviceType = useSelect((select) => {
		return select("core/edit-post").__experimentalGetPreviewDeviceType();
	}, []);
	const {
		__experimentalSetPreviewDeviceType: setPreviewDeviceType,
	} = useDispatch("core/edit-post");
	const customSetPreviewDeviceType = (device) => {
		setPreviewDeviceType(device);
	};
	const devices = [
		{
			name: "Desktop",
			title: <Dashicon icon="desktop" />,
			itemClass: "uagb-desktop-tab uagb-responsive-tabs",
		},
		{
			name: "Tablet",
			title: <Dashicon icon="tablet" />,
			itemClass: "uagb-tablet-tab uagb-responsive-tabs",
		},
		{
			name: "Mobile",
			key: "mobile",
			title: <Dashicon icon="smartphone" />,
			itemClass: "uagb-mobile-tab uagb-responsive-tabs",
		},
	];
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
			/>
		</Fragment>
	);

	return (
		<div className={"uag-typography-range-options"}>
			<div className="uagb-size-type-field-tabs">
				<ButtonGroup
					className="components-tab-panel__tabs"
					aria-label={__("Device", "ultimate-addons-for-gutenberg")}
				>
					{map(devices, ({ name, key, title, itemClass }) => (
						<Button
							key={key}
							className={`components-button components-tab-panel__tabs-item ${itemClass}${
								name === deviceType ? " active-tab" : ""
							}`}
							aria-pressed={deviceType === name}
							onClick={() => customSetPreviewDeviceType(name)}
						>
							{title}
						</Button>
					))}
				</ButtonGroup>
				<div className="uagb-responsive-control-inner">
					{output[deviceType] ? output[deviceType] : output.Desktop}
				</div>
			</div>
		</div>
	);
}
