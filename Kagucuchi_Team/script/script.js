$(document).ready(function(){
	$("#btn-message").on('click', function(){
		swal("Что-то пошло не так!", "К сожалению данная функция в разработке!", "warning");
	});

	$('.slick-slider').slick({
		dots: true,
  		infinite: false,
  		speed: 300,
      draggable: 0,
 		slidesToShow: 3,
 		centerMode: true,
 		slidesToScroll: 3,
  responsive: [
    {
      breakpoint: 1440,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
    // You can unslick at a given breakpoint now by adding:
    // settings: "unslick"
    // instead of a settings object
  ]
	});

});

