window.addEventListener(
    'load', function () {

        init();
    }
);

function init() {

	onLoadActions();

	accordionElements = document.getElementsByClassName( 'uagb-faq-layout-accordion' );
	for ( item of accordionElements ) {
		questionButtons = item.querySelectorAll( '.uagb-faq-questions-button' );

		for ( button of questionButtons ) {
			button.addEventListener("click", faqButtonClick);
		}
	}
}

function onLoadActions() {
	
	var expandFirstelements = document.getElementsByClassName( 'uagb-faq-expand-first-yes' );
	var inactiveOtherelements = document.getElementsByClassName( 'uagb-faq-inactive-other-no' );
	
	for ( item of expandFirstelements ) { 
		item.querySelectorAll( '.uagb-faq-child__outer-wrap' )[0].getElementsByClassName( 'uagb-faq-item' )[0].classList.add( 'uagb-faq-item-active' );
	}  
	
	for ( item of inactiveOtherelements ) { 
		otherItems = item.querySelectorAll( '.uagb-faq-child__outer-wrap' );
		
		for ( childItem of otherItems ) {
			childItem.getElementsByClassName( 'uagb-faq-item' )[0].classList.add( 'uagb-faq-item-active' );
		}
	}  
}

function faqButtonClick() {

	var faqItem = this.parentElement;
	
	if ( faqItem.classList.contains('uagb-faq-item-active') ) {

		faqItem.classList.remove('uagb-faq-item-active');
		slideUp( faqItem.getElementsByClassName( 'uagb-content' )[0] );
	} else {

		faqItem.classList.add('uagb-faq-item-active');
		slideDown( faqItem.getElementsByClassName( 'uagb-content' )[0] );
	}
}

function slideUp(el) {
	var elem = el;
	elem.classList.add('slider');
	elem.classList.add('closed');
}
function slideDown(el) {
	var elem = el;
	elem.classList.add('slider');
	elem.classList.remove('closed');
	elem.style.display = "block";
}