(function ($) {
	"use strict";
	var nav = $('nav');
  var navHeight = nav.outerHeight();
  
  $('.navbar-toggler').on('click', function() {
    if( ! $('#mainNav').hasClass('navbar-reduce')) {
      $('#mainNav').addClass('navbar-reduce');
    }
  })

  // Preloader
  $(window).on('load', function () {
    if ($('#preloader').length) {
      $('#preloader').delay(100).fadeOut('slow', function () {
        $(this).remove();
      });
    }
  });

  // Back to top button
  $(window).scroll(function() {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });
  $('.back-to-top').click(function(){
    $('html, body').animate({scrollTop : 0},1500, 'easeInOutExpo');
    return false;
  });

	/*--/ Star ScrollTop /--*/
	$('.scrolltop-mf').on("click", function () {
		$('html, body').animate({
			scrollTop: 0
		}, 1000);
	});

	/*--/ Star Counter /--*/
	$('.counter').counterUp({
		delay: 15,
		time: 2000
	});

	/*--/ Star Scrolling nav /--*/
	$('a.js-scroll[href*="#"]:not([href="#"])').on("click", function () {
		if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
			var target = $(this.hash);
			target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
			if (target.length) {
				$('html, body').animate({
					scrollTop: (target.offset().top - navHeight + 5)
				}, 1000, "easeInOutExpo");
				return false;
			}
		}
	});

	// Closes responsive menu when a scroll trigger link is clicked
	$('.js-scroll').on("click", function () {
		$('.navbar-collapse').collapse('hide');
	});

	// Activate scrollspy to add active class to navbar items on scroll
	$('body').scrollspy({
		target: '#mainNav',
		offset: navHeight
	});
	/*--/ End Scrolling nav /--*/

	/*--/ Navbar Menu Reduce /--*/
	$(window).trigger('scroll');
	$(window).on('scroll', function () {
		var pixels = 50; 
		var top = 1200;
		if ($(window).scrollTop() > pixels) {
			$('.navbar-expand-md').addClass('navbar-reduce');
			$('.navbar-expand-md').removeClass('navbar-trans');
		} else {
			$('.navbar-expand-md').addClass('navbar-trans');
			$('.navbar-expand-md').removeClass('navbar-reduce');
		}
		if ($(window).scrollTop() > top) {
			$('.scrolltop-mf').fadeIn(1000, "easeInOutExpo");
		} else {
			$('.scrolltop-mf').fadeOut(1000, "easeInOutExpo");
		}
	});

	/*--/ Star Typed /--*/
	if ($('.text-slider').length == 1) {
    var typed_strings = $('.text-slider-items').text();
		var typed = new Typed('.text-slider', {
			strings: typed_strings.split(','),
			typeSpeed: 80,
			loop: true,
			backDelay: 1100,
			backSpeed: 30
		});
	}

	/*--/ Testimonials owl /--*/
	$('#testimonial-mf').owlCarousel({
		margin: 20,
		autoplay: true,
		autoplayTimeout: 4000,
		autoplayHoverPause: true,
		responsive: {
			0: {
				items: 1,
			}
		}
	});

	/*--/ AOS /--*/
	$(document).ready(function () {
		AOS.init({
		  duration: 1500, // Animation duration in ms
		  easing: 'ease-in-out', // Easing function
		  once: true, // Animation happens only once
		  mirror: false // Animation won't repeat when scrolling back
		});
	  });
	/*--/ FORM /--*/
	$(document).ready(function () {
  const form = $('#contact-form');
  const sendMessage = $('#sendmessage');
  const errorMessage = $('#errormessage');

  // Form submission event handler
  form.on('submit', async function (e) {
    e.preventDefault(); // Prevent native submission

    let valid = true;

    // Validate each field based on its data-rule
    form.find('.form-group').each(function () {
      const input = $(this).find('input, textarea');
      const rule = input.data('rule');
      const msg = input.data('msg');
      const validation = $(this).find('.validation');
      let error = '';

      if (rule === 'required' && !input.val().trim()) {
        error = msg;
      } else if (rule && rule.startsWith('minlen')) {
        const minLen = parseInt(rule.split(':')[1]);
        if (input.val().length < minLen) {
          error = msg;
        }
      } else if (rule === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(input.val())) {
        error = msg;
      }

      if (error) {
        validation.text(error).show();
        valid = false;
      } else {
        validation.text('').hide();
      }
    });

    if (!valid) return; // Stop if validation fails

    // Proceed to send the form via Formspree if valid
    try {
      const formData = new FormData(this);

      const response = await fetch(form.attr('action'), {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      });

      if (response.ok) {
        sendMessage.show(); // Show success message
        errorMessage.hide();
        form.trigger('reset'); // Reset the form
      } else {
        throw new Error('Failed to send');
      }
    } catch (error) {
      errorMessage.show(); // Show error message
      sendMessage.hide();
    }
  });
});

})(jQuery);


