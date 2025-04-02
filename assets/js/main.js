import Tab from './components/Tab.js';
import Dropdown from './components/Dropdown.js';

Dropdown({ dropdownClass: 'js-dropdown-language' }).init();
Dropdown({ dropdownClass: 'js-dropdown-profile' }).init();
Dropdown({ dropdownClass: 'js-dropdown-location' }).init();
Dropdown({ dropdownClass: 'js-dropdown-about-1' }).init();
Dropdown({ dropdownClass: 'js-dropdown-about-2' }).init();
Dropdown({ dropdownClass: 'js-dropdown-about-3' }).init();

Tab({ tabClass: 'js-suggest-tab' }).init();

$('.owl-carousel.category-carousel').owlCarousel({
    loop: true,
    dots: false,
    nav: false,
    autoWidth: true,
    autoplay: true,
    autoplayTimeout: 3000,
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
    autoplayTimeout: 3000,
    nav: false,
    items: 4
})



$('.owl-carousel.category-propose-carousel').owlCarousel({
    dots: true,
    margin: 10,
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
        1200: {
            items: 1
        }
    }
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

// blog carousel
const blogOwl = $('.owl-carousel.blog-carousel')
blogOwl.owlCarousel({
    loop: false,
    nav: true,
    dots: true,
    navText: ['<', '>'],
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

$('#blog-custom-owl-nav .owl-next').click(function () {
    blogOwl.trigger('next.owl.carousel');
})
$('#blog-custom-owl-nav .owl-prev').click(function () {
    blogOwl.trigger('prev.owl.carousel');
})
$('#blog-custom-owl-dots .owl-dot').click(function () {
    blogOwl.trigger('to.owl.carousel', [$(this).index(), 300]);
});
blogOwl.on('initialize.owl.carousel changed.owl.carousel resized.owl.carousel', function(e) {   
    owl_carousel_page_numbers(e);   
});
function owl_carousel_page_numbers(e){
    //if (!e.namespace || e.property.name != 'position') return;
    //console.log('work');
    var items_per_page = e.page.size;

    if (items_per_page > 1){

        var min_item_index  = e.item.index,
            max_item_index  = min_item_index + items_per_page,
            display_text    = (min_item_index+1) + '-' + max_item_index;

    } else {

        var display_text = (e.item.index+1);

    }   

    $('.blog-page-number').text( display_text + '/' + e.item.count);

}
// end blog carousel

const navForm = document.querySelector('.nav-form');
if (navForm){
    let observer = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting === false) {
            navForm.classList.add('active');
        }
        else navForm.classList.remove('active');
    },{rootMargin: '-200px 0px 0px 0px'});
    observer.observe(document.querySelector("#hero-section-search-form"));
}

const customControllerLeft = document.querySelector('.blog-carousel-controller .owl-prev')
console.log(customControllerLeft)
console.log(customControllerLeft.clientHeight);
const customControllerRight = $('.blog-carousel-controller .owl-next');

$(document).ready(function(){
    alert(customControllerLeft.clientWidth);
    alert(customControllerLeft.clientHeight);
  });