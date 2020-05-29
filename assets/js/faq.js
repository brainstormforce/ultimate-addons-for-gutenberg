let slideUp = (target, duration=500) => {
	target.style.transitionProperty = 'height, margin, padding';
	target.style.transitionDuration = duration + 'ms';
	target.style.boxSizing = 'border-box';
	target.style.height = target.offsetHeight + 'px';
	target.offsetHeight;
	target.style.overflow = 'hidden';
	target.style.height = 0;
	target.style.paddingTop = 0;
	target.style.paddingBottom = 0;
	target.style.marginTop = 0;
	target.style.marginBottom = 0;
	window.setTimeout( () => {
		target.style.display = 'none';
		target.style.removeProperty('height');
		target.style.removeProperty('padding-top');
		target.style.removeProperty('padding-bottom');
		target.style.removeProperty('margin-top');
		target.style.removeProperty('margin-bottom');
		target.style.removeProperty('overflow');
		target.style.removeProperty('transition-duration');
		target.style.removeProperty('transition-property');
	}, duration);
}

let slideDown = (target, duration=500) => {
	target.style.removeProperty('display');
	let display = window.getComputedStyle(target).display;

	if (display === 'none')
		display = 'block';

	target.style.display = display;
	let height = target.offsetHeight;
	target.style.overflow = 'hidden';
	target.style.height = 0;
	target.style.paddingTop = 0;
	target.style.paddingBottom = 0;
	target.style.marginTop = 0;
	target.style.marginBottom = 0;
	target.offsetHeight;
	target.style.boxSizing = 'border-box';
	target.style.transitionProperty = "height, margin, padding";
	target.style.transitionDuration = duration + 'ms';
	target.style.height = height + 'px';
	target.style.removeProperty('padding-top');
	target.style.removeProperty('padding-bottom');
	target.style.removeProperty('margin-top');
	target.style.removeProperty('margin-bottom');
	window.setTimeout( () => {
		target.style.removeProperty('height');
		target.style.removeProperty('overflow');
		target.style.removeProperty('transition-duration');
		target.style.removeProperty('transition-property');
	}, duration);
}

let slideToggle = (target, duration = 500) => {
	if (window.getComputedStyle(target).display === 'none') {
		return slideDown(target, duration);
	} else {
		return slideUp(target, duration);
	}
}

let setupFAQ = () => {

	var pattern = new RegExp('^[\\w\\-]+$');
	var hashval = window.location.hash.substring(1);
	var expandFirstelements = document.getElementsByClassName( 'uagb-faq-expand-first-true' );
	var inactiveOtherelements = document.getElementsByClassName( 'uagb-faq-inactive-other-false' );
	
	if ( pattern.test( hashval ) ) {

		let elementToOpen = document.getElementById( hashval );
		elementToOpen.getElementsByClassName( 'uagb-faq-item' )[0].classList.add( 'uagb-faq-item-active' );

		slideDown( elementToOpen.getElementsByClassName( 'uagb-faq-content' )[0], 500 );
	} else {

		for ( var item of expandFirstelements ) {
			if ( true === item.classList.contains('uagb-faq-layout-accordion') ) { 
				
				item.querySelectorAll( '.uagb-faq-child__outer-wrap' )[0].getElementsByClassName( 'uagb-faq-item' )[0].classList.add( 'uagb-faq-item-active' );
			}
		}  
	}
	for ( item of inactiveOtherelements ) { 
		if ( true === item.classList.contains('uagb-faq-layout-accordion') ) {
			var otherItems = item.querySelectorAll( '.uagb-faq-child__outer-wrap' );
			
			for ( var childItem of otherItems ) {
				childItem.getElementsByClassName( 'uagb-faq-item' )[0].classList.add( 'uagb-faq-item-active' );
			}
		}
	}
}

window.addEventListener(
    'load', function () {

		setupFAQ();

		let accordionElements = document.getElementsByClassName( 'uagb-faq-layout-accordion' );
		for ( var item of accordionElements ) {
			let questionButtons = item.querySelectorAll( '.uagb-faq-questions-button' );
			
			for ( var button of questionButtons ) {
				button.addEventListener("click", function() {
					var faqItem = this.parentElement;
					if ( faqItem.classList.contains('uagb-faq-item-active') ) {
						faqItem.classList.remove('uagb-faq-item-active');
						slideUp( faqItem.getElementsByClassName( 'uagb-faq-content' )[0], 500 );
					} else {
						var parent = faqItem.parentElement.parentElement.parentElement.parentElement;
						var faqToggle = 'true';
						if ( parent.classList.contains( 'wp-block-uagb-faq' ) ) {
							faqToggle = parent.getAttribute( 'data-faqtoggle' );
						}
						faqItem.classList.add('uagb-faq-item-active');
						slideDown( faqItem.getElementsByClassName( 'uagb-faq-content' )[0], 500 );
						if( 'true' === faqToggle ) {
							for ( var buttonChild of questionButtons ) {
								buttonItem = buttonChild.parentElement
								if ( buttonItem === faqItem ) {
									continue;
								}
								buttonItem.classList.remove('uagb-faq-item-active');
								slideUp( buttonItem.getElementsByClassName( 'uagb-faq-content' )[0], 500 );
							}
						}
					}
				});
			}
		}
    }
);