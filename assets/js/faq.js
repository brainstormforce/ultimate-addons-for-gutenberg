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
	elem.classList.remove('open');
}
function slideDown(el) {
	var elem = el;
	elem.style.removeProperty('display'); /* [1] */
	let display = window.getComputedStyle(elem).display;
	if (display === 'none') { /* [2] */
	  display = 'block';
	}
	elem.style.display = display;
	let height = elem.offsetHeight; /* [3] */
elem.style.height = 0; /* [4] */
elem.style.paddingTop = 0; /* [5.1] */
elem.style.paddingBottom = 0; /* [5.2] */ 
elem.style.marginTop = 0; /* [6.1] */ 
elem.style.marginBottom = 0; /* [6.2] */ 
elem.style.overflow = 'hidden'; /* [7] */ 
elem.style.boxSizing = 'border-box'; /* [8] */
elem.style.transitionProperty = "height, margin, padding";  /* [9.1] */ 
elem.style.transitionDuration = 200 + 'ms'; /* [9.2] */
elem.style.height = height + 'px'; /* [10] */
elem.style.removeProperty('padding-top'); /* [11.1] */ 
elem.style.removeProperty('padding-bottom'); /* [11.2] */ 
elem.style.removeProperty('margin-top'); /* [12.1] */ 
elem.style.removeProperty('margin-bottom'); /* [12.2] */
window.setTimeout( () => {
	elem.style.removeProperty('height'); /* [13] */
	elem.style.removeProperty('overflow'); /* [14] */
	elem.style.removeProperty('transition-duration'); /* [15.1] */
	elem.style.removeProperty('transition-property'); /* [15.2] */
  }, 200);
}


