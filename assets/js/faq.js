window.addEventListener(
    'load', function () {

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
			  //alert("!");
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
		var slideToggle = (target, duration = 500) => {
			if (window.getComputedStyle(target).display === 'none') {
			  return slideDown(target, duration);
			} else {
			  return slideUp(target, duration);
			}
		}

		let accordionElements = document.getElementsByClassName( 'uagb-faq-layout-accordion' );
		for ( var item of accordionElements ) {
			let questionButtons = item.querySelectorAll( '.uagb-faq-questions-button' );

			for ( var button of questionButtons ) {
				button.addEventListener("click", function() {
					var faqItem = this.parentElement;
					
					if ( faqItem.classList.contains('uagb-faq-item-active') ) {
						faqItem.classList.remove('uagb-faq-item-active');
						slideUp( faqItem.getElementsByClassName( 'uagb-content' )[0], 500 );
					} else {
						faqItem.classList.add('uagb-faq-item-active');
						slideDown( faqItem.getElementsByClassName( 'uagb-content' )[0], 500 );
					}
				});
			}
		}

        //init();
    }
);

// function init() {

// 	//onLoadActions();

// 	accordionElements = document.getElementsByClassName( 'uagb-faq-layout-accordion' );
// 	for ( item of accordionElements ) {
// 		questionButtons = item.querySelectorAll( '.uagb-faq-questions-button' );

// 		for ( button of questionButtons ) {
// 			button.addEventListener("click", function(){
// 				var faqItem = this.parentElement;
				
// 				if ( faqItem.classList.contains('uagb-faq-item-active') ) {

// 					faqItem.classList.remove('uagb-faq-item-active');
// 					slideUp( faqItem.getElementsByClassName( 'uagb-content' )[0], 200 );
// 				} else {

// 					faqItem.classList.add('uagb-faq-item-active');
// 					slideDown( faqItem.getElementsByClassName( 'uagb-content' )[0], 200 );
// 				}
// 			});
// 		}
// 	}
// }

// function onLoadActions() {
	
// 	var expandFirstelements = document.getElementsByClassName( 'uagb-faq-expand-first-yes' );
// 	var inactiveOtherelements = document.getElementsByClassName( 'uagb-faq-inactive-other-no' );
	
// 	for ( item of expandFirstelements ) { 
// 		item.querySelectorAll( '.uagb-faq-child__outer-wrap' )[0].getElementsByClassName( 'uagb-faq-item' )[0].classList.add( 'uagb-faq-item-active' );
// 	}  
	
// 	for ( item of inactiveOtherelements ) { 
// 		otherItems = item.querySelectorAll( '.uagb-faq-child__outer-wrap' );
		
// 		for ( childItem of otherItems ) {
// 			childItem.getElementsByClassName( 'uagb-faq-item' )[0].classList.add( 'uagb-faq-item-active' );
// 		}
// 	}  
// }

// function faqButtonClick() {

	
// }

// function slideUp(el) {
// 	var elem = el;
// 	elem.classList.add('slider');
// 	elem.classList.add('closed');
// 	elem.classList.remove('open');
// }
// function slideDown(el) {
// 	var elem = el;
// 	elem.classList.add('slider');
// 	elem.classList.add('open');
// 	elem.classList.remove('closed');
// 	elem.style.display = "block";
// }
