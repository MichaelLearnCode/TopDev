import { Api } from "../api/api.js";
import Components from "./components.js";
import Tab from "./components/Tab.js";
import UrlHandler from "./UrlHandler.js";
import Dropdown from "./components/Dropdown.js";

export default function render() {
  const api = Api().init();
  const components = Components();
  // cong viec hot
  function renderSkeletonComponent(rootElement, componentFunction, times = 5) {
    for (let i = 0; i < times; i++) {
      const componentInstance = componentFunction();
      rootElement.appendChild(componentInstance);
    }
  }
  async function renderSearchSuggestion(input) {
    const searchSuggestion = document.querySelector('.search-suggestion');
    searchSuggestion.innerHTML = '';
    renderSkeletonComponent(searchSuggestion, components.createSkeletonSearchSuggestion);
    const currentUrl = new URL(window.location);
    const locationCriteria = currentUrl.searchParams.get('location');
    const normalizedInput = input.trim().toLowerCase();
    const searchData = await api.get('jobs', {
      limit: 10,
      custom: (job) => {
        const normalizedJobTitle = job.title.trim().toLowerCase();
        return normalizedJobTitle.includes(normalizedInput) && (job.location.slug === locationCriteria || locationCriteria === 'all' || !locationCriteria)
      }
    })
    searchSuggestion.innerHTML = '';

    searchData.forEach(job => {
      const suggestionItem = document.createElement('li');
      suggestionItem.className = 'search-suggestion-item';

      const img = document.createElement('img');
      img.src = job.thumbnail;
      img.alt = '';

      const span = document.createElement('span');
      span.textContent = job.title;

      suggestionItem.appendChild(img);
      suggestionItem.appendChild(span);

      searchSuggestion.appendChild(suggestionItem);
    })
  }
  async function renderDropdownContent() {
    const dropdowns = document.querySelectorAll(`.js-dropdown-location`);
    const currentState = 'all';
    if (!dropdowns.length) return;
    const locationArray = [{
      name: 'Vị trí',
      slug: 'all'
    }]
    const locations = await api.get('locations');
    locations.forEach(location => {
      locationArray.push({
        name: location.name,
        slug: location.slug
      })
    })
    dropdowns.forEach(dropdown => {
      const dropdownMenu = dropdown.querySelector('.js-dropdown-content');
      const dropdownLabel = dropdown.querySelector('.dropdown-label');
      const currentUrl = new URL(window.location);
      dropdownLabel.textContent = locationArray.find(location => currentUrl.searchParams.get('location') === location.slug)?.name ?? locationArray[0].name;
      locationArray.forEach(location => {
        const locationElement = document.createElement('li');
        locationElement.className = 'dropdown-item';
        locationElement.textContent = location.name;
        locationElement.setAttribute('value', location.slug);
        locationElement.addEventListener('click', () => {

          dropdownMenu.classList.remove('active');
          UrlHandler.addSearchParams('location', location.slug);
          dropdownLabel.textContent = location.name;

        })
        dropdownMenu.appendChild(locationElement);
      })
    })
    Dropdown({ dropdownClass: 'js-dropdown-location-1' }).init();
  }
  async function renderHotJobsCarousel() {
    const hotJobsCarousel = document.querySelector('.hot-jobs-carousel');
    for (let i = 0; i < 5; i++) {
      const skeletonJobCard = components.createSkeletonJobCard();
      hotJobsCarousel.appendChild(skeletonJobCard);
    }
    const firstHotJobsCarousel = $('.owl-carousel.hot-jobs-carousel').owlCarousel({
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
    const hotJobsData = await api.get('jobs');
    firstHotJobsCarousel.trigger('destroy.owl.carousel');
    hotJobsCarousel.innerHTML = '';
    hotJobsData.forEach(job => {
      const jobCard = components.createJobCard({
        title: job.title,
        thumbnail: job.thumbnail,
        salary: job.salary,
        id: job.id,
        locationType: job.locationType,
        type: job.type,
        description: job.description
      })
      hotJobsCarousel.appendChild(jobCard)
    });
    $('.owl-carousel.hot-jobs-carousel').owlCarousel({
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
  }
  async function renderBlogsCarousel() {
    const blogCarousel = document.querySelector('.blog-carousel');
    renderSkeletonComponent(blogCarousel, components.createSkeletonBlogCard, 5);
    const firstBlogCarousel = $('.owl-carousel.blog-carousel').owlCarousel({
      loop: false,
      nav: false,
      dots: false,
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
    const blogData = await api.get('blogs');
    firstBlogCarousel.trigger('destroy.owl.carousel');
    blogCarousel.innerHTML = '';
    blogData.forEach(blog => {
      const blogCard = components.createBlogCard({
        createdAt: blog.createdAt,
        title: blog.title,
        imgUrl: blog.imgUrl,
        content: blog.content,
        field: blog.field,
        id: blog.id
      })
      blogCarousel.appendChild(blogCard);
    });
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
    blogOwl.on('initialize.owl.carousel changed.owl.carousel resized.owl.carousel', function (e) {
      owl_carousel_page_numbers(e);
    });
    function owl_carousel_page_numbers(e) {
      //if (!e.namespace || e.property.name != 'position') return;
      //console.log('work');
      var items_per_page = e.page.size;

      if (items_per_page > 1) {

        var min_item_index = e.item.index,
          max_item_index = min_item_index + items_per_page,
          display_text = (min_item_index + 1) + '-' + max_item_index;

      } else {

        var display_text = (e.item.index + 1);

      }

      $('.blog-page-number').text(display_text + '/' + e.item.count);

    }
  }
  async function renderTabJobsCarousel() {
    const suggestTab = document.querySelector('.suggest-tab');
    const suggestTabHeader = suggestTab.querySelector('.tab-header');
    const suggestTabBody = suggestTab.querySelector('.tab-body');
    renderSkeletonComponent(suggestTabHeader, components.createSkeletonButton);
    const locations = await api.get('locations');
    suggestTabHeader.innerHTML = `<button data-tab-target="#all" class="btn btn-job button-label js-tab-trigger active">Tất cả</button>`
    suggestTabBody.innerHTML = `<div id = "all" class = "tab-content js-tab-content row row-cols-md-2 row-cols-xl-3 row-cols-xxl-4 justify-center justify-sm-start gy-4 gy-sm-5 gy-md-6 gy-xl-7 gy-xxl-8 gx-4 active"></div>`
    const locationAllBtnElement = suggestTab.querySelector('button[data-tab-target = "#all"]');
    const locationAllContentElement = suggestTab.querySelector('.tab-content#all'); locations.forEach(location => {
      const locationBtnElement = document.createElement('button');
      const locationContentElement = document.createElement('div');
      locationAllBtnElement.addEventListener('click', () => {
        UrlHandler.addSearchParams('category', 'all');
        loadTabContent(locationAllContentElement);
      })
      locationBtnElement.setAttribute('data-tab-target', '#' + location.slug);
      locationBtnElement.classList = 'btn btn-job button-label js-tab-trigger';
      locationBtnElement.textContent = location.name;
      locationBtnElement.addEventListener('click', () => {
        UrlHandler.addSearchParams('category', location.slug);
        loadTabContent(locationContentElement);
      })
      suggestTabHeader.appendChild(locationBtnElement);
      locationContentElement.id = location.slug;
      locationContentElement.classList = 'tab-content js-tab-content row row-cols-md-2 row-cols-xl-3 row-cols-xxl-4 justify-center justify-sm-start gy-4 gy-sm-5 gy-md-6 gy-xl-7 gy-xxl-8 gx-4';
      suggestTabBody.appendChild(locationContentElement);
    });
    Tab({ tabClass: 'js-suggest-tab' }).init();
    const initalTabBtn = suggestTab.querySelector('button.active');
    const initialTabContent = suggestTab.querySelector(initalTabBtn.getAttribute('data-tab-target'));
    const initialCategory = initialTabContent.id;
    UrlHandler.addSearchParams('category', initialCategory);
    async function loadTabContent(rootElement) {
      const currentUrl = new URL(window.location);
      let locationSlug = currentUrl.searchParams.get('category');
      if (!locationSlug) locationSlug = 'all';
      rootElement.innerHTML = '';
      renderSkeletonComponent(rootElement, components.createSkeletonJobCard);
      const tabJobs = await api.get('jobs', {
        custom: (job) => {
          return (locationSlug === 'all') ? 1 : job.location.slug === locationSlug;
        }
      });
      rootElement.innerHTML = '';
      tabJobs.forEach(job => {
        const jobTabCard = components.createTabJobCard({
          title: job.title,
          thumbnail: job.thumbnail,
          salary: job.salary,
          id: job.id,
          locationType: job.locationType,
          type: job.type,
          description: job.description
        });
        rootElement.append(jobTabCard);
      });
    }
    loadTabContent(document.querySelector(`.tab-content[id=${initialCategory}]`));

  }
  // tab


  // blog
  return {
    renderSkeletonComponent,
    renderSearchSuggestion,
    renderDropdownContent,
    renderHotJobsCarousel,
    renderBlogsCarousel,
    renderTabJobsCarousel
  }
}