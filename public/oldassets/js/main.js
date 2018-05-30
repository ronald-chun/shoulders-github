(function($) {
    'use strict';
    //preloader
    $(window).on( 'load', function() {
        $("#loading").delay(2000).fadeOut(500);
        $("#loading-center").on( 'click', function() {
        $("#loading").fadeOut(500);
        })
        $(".controls-btn .control:first-child").addClass("mixitup-control-active");
    }) 
    
    var win = $( window );
    // scrollTop init
    var totop = $('#scrollUp'); 
    if(totop.length){	
		win.on('scroll', function() {
			if (win.scrollTop() > 150) {
				totop.fadeIn();
			} else {
				totop.fadeOut();
			}
		});
		totop.on('click', function() {
			$("html,body").animate({
				scrollTop: 0
			}, 500)
		});
	}
	 // image popup
	var imaggepoppup = $('.image-popup');
	if(imaggepoppup.length){
		$('.image-popup').magnificPopup({
			type: 'image',
			callbacks: {
				beforeOpen: function() {
				   this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure animated zoomInDown');
				}
			},
			gallery: {
				enabled: true
			}
		});
	}
  
       
    $("a").on('click', function(event) {
        if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 600, function() {
                window.location.hash = hash;
            });
        }
    });
    
		jQuery('.max-list').mixItUp({  
		  selectors: {
			target: '.home',
			//sort: '.sort-btn'
		  },
			animation:{
			animateResizeContainer: false,
			effects: 'fade scale'
		  },
           
          controls: {
            toggleDefault: 'none'
          }

		});
	
	
})(jQuery);

 