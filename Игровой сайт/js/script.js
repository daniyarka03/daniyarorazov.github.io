
 function slowScroll (id) {
    var offset = 0;
    $('html, body').animate ({
      scrollTop: $(id).offset ().top - offset
    }, 1000);
    return false;
  }

   

   $(document).scroll(function () {
        
        var y = $(this).scrollTop();
        if (y > 250) {
           $('.content-games').addClass('wow rotateInDownLeft')
        }

        if (y > 350) {
        	
           $('.block-icons').addClass('wow bounceInLeft');   
        }
   });

