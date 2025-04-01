import Tab from './components/Tab.js';
import Dropdown from './components/Dropdown.js';

Dropdown({ dropdownClass: 'js-dropdown-profile' }).init();
Dropdown({ dropdownClass: 'js-dropdown-location' }).init();
Tab({tabClass: 'js-suggest-tab'}).init();

$('.owl-carousel.category-carousel').owlCarousel({
    loop: true,
    dots: false,
    nav: false,
    autoWidth: true,
    autoplay: true,
    autoplayTimeout:3000,
    margin: 32,
    responsive: {
        0: {
            items: 1
        },

        768: {
            items: 2
        },

        1400: {
            items: 3
        }
    }
})

$('.owl-carousel.advertise-carousel').owlCarousel({
    loop: true,
    dots: false,
    autoWidth: true,
    margin: 32,
    autoplay: true,
    autoplayTimeout:3000,
    nav: false,
    items: 4
})



$('.owl-carousel.category-propose-carousel').owlCarousel({
    loop: true,
    items: 1,
    dots: true,
    margin: 10
})
$('.owl-carousel.slider-carousel').owlCarousel({
    loop: false,
    dots: false,
    nav: true,
    margin: 15,
    responsive: {
        0: {
            items: 1
        },
        768: {
            items: 2
        },
        992: {
            items: 3
        },
        1440: {
            items: 4
        }
    }
})
const blogOwl = $('.owl-carousel.blog-carousel')
blogOwl.owlCarousel({
    loop: false,
    nav: true,
    dots: true,
    navText: ['<','>'],
    navContainer: '#blog-custom-owl-nav',
    dotsContainer: '#blog-custom-owl-dots',
    margin: 15,
    responsive: {
        0: {
            items: 1,
            margin: 0
        },
        992: {
            margin: 16,
            items: 2
        },
        1440: {
            items: 3,
            margin: 32
        }
    }
})
$('#blog-custom-owl-nav .owl-next').click(function() {
    blogOwl.trigger('next.owl.carousel');
})
// Go to the previous item
$('#blog-custom-owl-nav .owl-prev').click(function() {
    // With optional speed parameter
    // Parameters has to be in square bracket '[]'
    blogOwl.trigger('prev.owl.carousel');
})
$('#blog-custom-owl-dots .owl-dot').click(function () {
    blogOwl.trigger('to.owl.carousel', [$(this).index(), 300]);
});
