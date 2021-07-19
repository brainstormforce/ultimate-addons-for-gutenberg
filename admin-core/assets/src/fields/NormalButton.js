import React from 'react';
import './NormalButton.scss';
import ReactHtmlParser from 'react-html-parser';

const NormalButton = ( props ) => {
	const { classes, saving, buttonText, desc } = props;

	const savingState = saving ? 'uag-saving' : '';
	const btnClass = classes ? classes : 'uag-button--primary';
	return (
		<div className="uag-field uag-normal-button-control uag-button-field">
			<button
				className={ `uag-button  ${ savingState } ${ btnClass }` }
				onClick={ props.onClick }
			>
				{ buttonText }
			</button>
			{ desc && (
				<div className="uag-field__desc">
					{ ReactHtmlParser( desc ) }
				</div>
			) }
		</div>
	);
};

export default NormalButton;
