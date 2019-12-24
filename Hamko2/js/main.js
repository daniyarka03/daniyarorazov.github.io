


jQuery(function ($) {
	$('.hemko-slider .bxslider').bxSlider({
		auto: true,
		adaptiveHeight: true
	});
	$('.slider-1 .bxslider').bxSlider({
		auto: true,
		controls: false,
		adaptiveHeight: true
	});
	$('.slider-2 .bxslider').bxSlider({
		auto: true,
		controls: false,
		adaptiveHeight: true
	});
	
	$('.hemko-partners-block .bxslider').bxSlider({
		auto: true,
		minSlides: 4,
		maxSlides: 4,
		slideWidth: 265,
		slideMargin: 35,
		controls: false
	});

	$('.callback-phone').click(function () {
		var el = $('#hemko-bid');

		$('body').animate({
			scrollTop: $(el).offset().top
		}, 1000);
	});

	// Tabs
	$('.tab-title').each(function () {
		var i = 1;
		if ($(this).hasClass('active')) {
			var el = $(this).find('div').attr('data-id');
			$(el).addClass('active');

			$('.room-plan-slider-' + i + ' .bxslider').bxSlider({
				auto: true,
				pagerCustom: '#bx-pager-1',
				controls: false
			});
		}
	});

	$('.tab-title').click(function () {
		if ($(this).hasClass('active')) {
			return false;
		} else {
			var el = $(this).find('div').attr('data-id');
			$('.tab-title').removeClass('active');
			$('.hemko-room').removeClass('active');
			$(this).addClass('active');
			$(el).addClass('active');
			$(el).find('.room-plan-slider .bxslider').bxSlider({
				auto: true,
				pagerCustom: '#bx-pager-' + $(el).find('.room-plan-slider').attr('id'),
				controls: false
			});
		}
	});

	// $('.room-plan-btn-2').click(function () {
	// 	window.location = $(this).attr('data-link');
	// });
});


	// $('.room-plan-slider-1 .bxslider').bxSlider({
	// 	auto: true,
	// 	pagerCustom: '#bx-pager-1',
	// 	controls: false
	// });
	// $('.room-plan-slider-2 .bxslider').bxSlider({
	// 	auto: true,
	// 	pagerCustom: '#bx-pager-2',
	// 	controls: false
	// });

/*
playback timings (ms):
  esindex: 0.012
  PetaboxLoader3.resolve: 159.325 (2)
  exclusion.robots.policy: 0.142
  captures_list: 78.395
  load_resource: 265.461
  CDXLines.iter: 12.087 (3)
  exclusion.robots: 0.153
  PetaboxLoader3.datanode: 116.635 (5)
  LoadShardBlock: 62.821 (3)
  RedisCDXSource: 0.856
*/