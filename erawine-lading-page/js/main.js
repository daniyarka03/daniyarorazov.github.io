let acc = document.getElementsByClassName("accordion");
let i;
const sideBarButton = document.querySelector('#openSidebar');
const sideBarContactButton = document.querySelector('#sidebarContactButton');
const sideBar = document.querySelector('.sidebar');
const sideBarContact = document.querySelector('.sidebar-contact');

sideBarButton.addEventListener('click', () => {
    $(sideBar).toggleClass('sidebar-active');
    stateSidebar();
});

function stateSidebar() {
    if ($(sideBar).hasClass('sidebar-active')) {
        let spanCZ = document.querySelector("[lang='cz']")
        let spanEN = document.querySelector("[lang='en']")

        if ($(spanCZ).is(":visible") === true) {
            $('#openSidebar').html('<span lang="cz"><img src="./img/close-icon.png" />Zavřít</span>')
        } if ($(spanEN).is(":visible") === true) {
            $('#openSidebar').html('<span lang="en"><img src="./img/close-icon.png" />Close</span>')
        }


    } else {
        sideBarButton.innerHTML = 'Menu';
    }
}

sideBarContactButton.addEventListener('click', () => {
    $(sideBarContact).toggleClass('sidebar-active');
    if ($(sideBarContact).hasClass('sidebar-active')) {
        sideBarContactButton.innerHTML = 'Close';
    } else {
        sideBarContactButton.innerHTML = 'Kontakt';
    }
});

for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
        this.classList.toggle("active");

        let spanCZ = document.querySelectorAll("[lang='cz']")

        if ($(spanCZ).is(":visible") === true) {
            if(this.classList.contains("active")) {
                $('.collapse-menu__button').html('Zavřít<img src="./img/close-icon.png" />')
            } else {
                $('.collapse-menu__button').html('Rozbalit')

            }
        } else {
            if(this.classList.contains("active")) {
                $('.collapse-menu__button').html('Close<img src="./img/close-icon.png" />')
            } else {
                $('.collapse-menu__button').html('Expand')

            }
        }


        var panel = this.nextElementSibling;
        if (panel.style.maxHeight) {
            panel.style.maxHeight = null;
        } else {
            panel.style.maxHeight = "10000px";
        }
    });
}

let spanEN = document.querySelectorAll("[lang='en']")

$(spanEN).hide();
$("#languageSelect").change(function() {
    if ($(this).val() === "EN") {
        $('[lang="en"]').toggle();
        $('[lang="cz"]').toggle();

        // TODO Fix bug in slider when switching language
        stateSidebar();
    }
    if ($(this).val() === "CZ") {
        $('[lang="en"]').toggle();
        $('[lang="cz"]').toggle();
        stateSidebar();
    }
});

if (window.innerWidth <= 874) {
    sideBarButton.addEventListener('click', () => {
        if ($(sideBarContact).hasClass('sidebar-active')) {
            $(sideBarContact).toggleClass('sidebar-active');
            sideBarContactButton.innerHTML = 'Kontakt';
        }
    });

    sideBarContactButton.addEventListener('click', () => {
        if ($(sideBar).hasClass('sidebar-active')) {
            $(sideBar).toggleClass('sidebar-active');
            sideBarButton.innerHTML = 'Menu';
        }
    });
}

const sliderNext = document.querySelector('.slider-next');
const sliderPrev = document.querySelector('.slider-prev');
const sliders = document.querySelectorAll(".slide-content");


sliders.forEach((el, key) => {
    if (key > 0) {
        $(el).hide()
    }
})


sliderNext.addEventListener('click', () => {
    console.log(sliders)
    let found = false;
    sliders.forEach((el, key) => {
        if (!found && $(el).is(":visible") === false && $(sliders[key-1]).is(":visible") === true) {
            $(sliders[key-1]).hide()
            $(el).show()
            found = true;
        }


        if ($(sliders[sliders.length-1]).is(":visible") == true) {
            $("body > main > div.panel.menu-list > div.slider-control > button.slider-next > img").css('opacity', '0.5');
        }
        if (!($(sliders[sliders.length-1]).is(":visible") == true)) {
            $("body > main > div.panel.menu-list > div.slider-control > button.slider-prev > img").css('opacity', '1');
        }
    });

});


sliderPrev.addEventListener('click', () => {
    sliders.forEach((el, key) => {
        if ($(el).is(":visible") === false && $(sliders[key+1]).is(":visible") === true) {
            $(el).show()
            $(sliders[key+1]).hide()
        }
        if (!($(sliders[sliders.length-1]).is(":visible") == true)) {
            $("body > main > div.panel.menu-list > div.slider-control > button.slider-next > img").css('opacity', '1');
        }

        if ($(sliders[sliders.length-1]).is(":visible") == true) {
            $("body > main > div.panel.menu-list > div.slider-control > button.slider-prev > img").css('opacity', '0.5');
        }
    })
});

$("video").prop('muted', true);

$('.mute-video').click(() => {
    if ($("video").prop('muted')) {
        $("video").prop('muted', false);
        $(".sound__icon").show();
        $(".mute__icon").hide();
    } else {
        $("video").prop('muted', true);
        $(".sound__icon").hide();
        $(".mute__icon").show();
    }
    
})

// const defaultAttributes = {
//     autoplay: true,
//   controls: false,
//   loop: true,
//   muted: true,
//   playsInline: true,
// }

// var instance = new vidbg('.video-background', 
// {
//     mp4: 'https://ambassadorwineclub.cz/wp-content/themes/awcerawine/img/background-video-awc.mp4',
//     // webm: 'media/webm_video.webm',
//     poster: 'https://ambassadorwineclub.cz/wp-content/themes/awcerawine/img/background-video-cover.jpg',
    
// },
// defaultAttributes
// )
// instance.playVideo();

const stopVideo = document.querySelector('.stop-video');
const video = document.querySelector('#myVideo');
stopVideo.addEventListener('click', () => {
    if (video.paused) {
        video.play();
        $(".play__icon").hide();
        $(".stop__icon").show();
      } else {
        video.pause();
        $(".stop__icon").hide();
        $(".play__icon").show();
      }
})
