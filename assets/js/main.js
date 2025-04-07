import Tab from './components/Tab.js';
import Dropdown from './components/Dropdown.js';
import render from './render.js';
import Modal from './components/Modal.js';
import { Api } from '../api/api.js';
import Components from './components.js';

document.addEventListener('DOMContentLoaded',async () => {
    const api = Api({}).init();
    const components = Components();
    // check login
    if (localStorage.getItem('access_token')){
        const users = await api.get('users',{
            custom: (user=>{
                return user.access_token === localStorage.getItem('access_token');
            })   
        })
        const profileHolder = document.querySelector('.profile-holder');
            profileHolder.querySelector('.login-modal-trigger').classList.add('d-none');
            const profileDropdown = components.createProfileDropdown({
                avatar: users[0].avatar,
                name: users[0].name,
                jsDropdownClass: 'js-profile-dropdown'
            })
            profileHolder.appendChild(profileDropdown);
            Dropdown({dropdownClass: 'js-profile-dropdown'}).init();
    }

    // first carousel init
    const firstCategoryCarousel = $('.owl-carousel.category-carousel').owlCarousel({
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
    });

    const firstAdvertiseCarousel = $('.owl-carousel.advertise-carousel').owlCarousel({
        loop: true,
        dots: false,
        autoWidth: true,
        margin: 32,
        autoplay: true,
        autoplayTimeout: 3000,
        nav: false,
        items: 4
    });


    // blog carousel

    const navForm = document.querySelector('.nav-form');
    Dropdown({ dropdownClass: 'js-dropdown-language' }).init();
    Modal({
        modalClass: 'js-login-modal',
        modalTriggerClass: 'js-login-modal-trigger'
    }).init();
    // Dropdown({ dropdownClass: 'js-dropdown-location-2' }).init();
    Dropdown({ dropdownClass: 'js-dropdown-about-1' }).init();
    Dropdown({ dropdownClass: 'js-dropdown-about-2' }).init();
    Dropdown({ dropdownClass: 'js-dropdown-about-3' }).init();

    if (navForm) {
        let observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting === false) {
                navForm.classList.add('active');
            } else {
                navForm.classList.remove('active');
            }
        }, { rootMargin: '-200px 0px 0px 0px' });
        observer.observe(document.querySelector("#hero-section-search-form"));
    }

    // fetching data
    const instance = render();
    instance.renderBlogsCarousel();
    instance.renderHotJobsCarousel();
    instance.renderTabJobsCarousel();
    instance.renderDropdownContent();
    instance.renderProposeCarousel();

    // form
    activeSearchForm({
        searchParam: 'location',
        parentEleClass: '.hero-section',
        formClass: '#hero-section-search-form',
        inputWrapperClass: '.search-input'
    });
    activeLoginForm();
    function activeLoginForm(){
        const loginForm = document.querySelector('#login-form');
        const loginBtn = loginForm.querySelector('.login-btn');
        const loadingIcon = loginForm.querySelector('.loading-icon');
        loginForm.addEventListener('submit',async e=>{
            e.preventDefault();
            console.log('submited');
            loadingIcon.classList.remove('d-none');
            loginBtn.classList.add('d-none');
            const email = loginForm.querySelector('#email').value;
            const password = loginForm.querySelector('#password').value;
            const users = await api.get('users',{
                custom: (user=>{
                    return user.password === password && user.email === email;
                })
            })
            loadingIcon.classList.add('d-none');
            loginBtn.classList.remove('d-none');
            if(!users.length)return loginForm.querySelector('.validation-error').textContent = 'Email hoặc mật khẩu không đúng';
            localStorage.setItem('access_token', users[0].access_token);
            const profileHolder = document.querySelector('.profile-holder');
            profileHolder.querySelector('.login-modal-trigger').classList.add('d-none');
            const profileDropdown = components.createProfileDropdown({
                avatar: users[0].avatar,
                name: users[0].name,
                jsDropdownClass: 'js-profile-dropdown'
            })
            profileHolder.appendChild(profileDropdown);
            Dropdown({dropdownClass: 'js-profile-dropdown'}).init();
            loginForm.closest('.modal').classList.remove('show');
            document.body.classList.remove('overflow-hidden');
        })
    }
    function activeSearchForm({
        searchParam,
        parentEleClass,
        formClass,
        inputWrapperClass
    }) {
        let locationParam = new URL(window.location).searchParams.get(searchParam);
        const parentElement = document.querySelector(parentEleClass);
        const searchInput = parentElement.querySelector(`${inputWrapperClass} input`);
        const searchForm = parentElement.querySelector(formClass);

        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            window.location.href = `search-results.html?search=${searchInput.value}&${searchParam}=${locationParam ?? ''}`;
        });

        const updateSearchSuggestion = debounce((input) => {
            instance.renderSearchSuggestion(input);
        });

        const searchSuggestionEle = parentElement.querySelector('.search-suggestion');
        searchInput.addEventListener('focus', e => {
            searchSuggestionEle.classList.add('active');
            const currentLocationParam = new URL(window.location).searchParams.get(searchParam);
            if (locationParam !== currentLocationParam) {
                locationParam = currentLocationParam;
                instance.renderSearchSuggestion(searchInput.value);
            }
        });

        document.addEventListener('click', (e) => {
            if (!e.target.closest('.search-input')) searchSuggestionEle.classList.remove('active');
        });

        searchInput.addEventListener('input', e => {
            updateSearchSuggestion(e.target.value);
        });

        function debounce(cb, delay = 1000) {
            let timeout;
            return (args) => {
                clearTimeout(timeout);
                timeout = setTimeout(() => {
                    cb(args);
                }, delay);
            };
        }
    }

    
});
