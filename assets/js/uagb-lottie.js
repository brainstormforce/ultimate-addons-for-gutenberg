( function ( $ ) {
	UAGBLottie = {
		_run( attr, id ) {
			const animation = bodymovin.loadAnimation( {
				container: document.getElementsByClassName( id )[ 0 ],
				renderer: 'svg',
				loop: attr.loop,
				autoplay: 'none' === attr.playOn ? true : false,
				path: attr.lottieURl,
				rendererSettings: {
					preserveAspectRatio: 'xMidYMid',
					className: 'uagb-lottie-inner-wrap',
				},
			} );

			animation.setSpeed( attr.speed );

			const reversedir = attr.reverse && attr.loop ? -1 : 1;

			animation.setDirection( reversedir );

			if ( 'hover' === attr.playOn ) {
				document
					.getElementsByClassName( id )[ 0 ]
					.addEventListener( 'mouseenter', function () {
						animation.play();
					} );
				document
					.getElementsByClassName( id )[ 0 ]
					.addEventListener( 'mouseleave', function () {
						animation.stop();
					} );
			} else if ( 'click' === attr.playOn ) {
				document
					.getElementsByClassName( id )[ 0 ]
					.addEventListener( 'click', function () {
						animation.stop();
						animation.play();
					} );
			} else if ( 'scroll' === attr.playOn ) {
				window.addEventListener( 'scroll', function () {
					animation.stop();
					animation.play();
				} );
			}
		},
	};
} )( jQuery );
