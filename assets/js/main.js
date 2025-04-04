import Tab from './components/Tab.js';
import Dropdown from './components/Dropdown.js';
import render from './render.js';

document.addEventListener('DOMContentLoaded', () => {
    // skeleton
    // skeleton hotjob

    // first carousel init
    // const firstCategoryCarousel = $('.owl-carousel.category-carousel').owlCarousel({
    //     loop: true,
    //     dots: false,
    //     nav: false,
    //     autoWidth: true,
    //     autoplay: true,
    //     autoplayTimeout: 3000,
    //     margin: 32,
    //     responsive: {
    //         0: {
    //             items: 1
    //         },

    //         768: {
    //             items: 2
    //         },

    //         1400: {
    //             items: 3
    //         }
    //     }
    // })
    // const firstAdvertiseCarousel = $('.owl-carousel.advertise-carousel').owlCarousel({
    //     loop: true,
    //     dots: false,
    //     autoWidth: true,
    //     margin: 32,
    //     autoplay: true,
    //     autoplayTimeout: 3000,
    //     nav: false,
    //     items: 4
    // })
    // const firstProposeCarousel = $('.owl-carousel.category-propose-carousel').owlCarousel({
    //     dots: true,
    //     margin: 10,
    //     responsive: {
    //         0: {
    //             items: 1
    //         },
    //         768: {
    //             items: 2
    //         },
    //         992: {
    //             items: 3
    //         },
    //         1200: {
    //             items: 1
    //         }
    //     }
    // })
    
    // blog carousel
    

    // 
    const navForm = document.querySelector('.nav-form');
    Dropdown({ dropdownClass: 'js-dropdown-language' }).init();
    Dropdown({ dropdownClass: 'js-dropdown-profile' }).init();
    Dropdown({ dropdownClass: 'js-dropdown-location-1' }).init();
    Dropdown({ dropdownClass: 'js-dropdown-location-2' }).init();
    Dropdown({ dropdownClass: 'js-dropdown-about-1' }).init();
    Dropdown({ dropdownClass: 'js-dropdown-about-2' }).init();
    Dropdown({ dropdownClass: 'js-dropdown-about-3' }).init();
    if (navForm) {
        let observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting === false) {
                navForm.classList.add('active');
            }
            else navForm.classList.remove('active');
        }, { rootMargin: '-200px 0px 0px 0px' });
        observer.observe(document.querySelector("#hero-section-search-form"));
    }
    // fetching data
    const instance = render();
    instance.renderBlogsCarousel();
    instance.renderHotJobsCarousel();
    instance.renderTabJobsCarousel();
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
})