import { Api } from "../api/api.js";
import Components from "./components.js";
import Tab from "./components/Tab.js";

export default function render() {
  const api = Api().init();
  const components = Components();
  // cong viec hot
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
    for (let i = 0; i < 5; i++) {
      const skeletonBlogCard = components.createSkeletonBlogCard();
      blogCarousel.appendChild(skeletonBlogCard);
    }
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

    const skeletonContent = document.createElement('div');
    skeletonContent.classList = 'row row-cols-md-2 row-cols-xl-3 row-cols-xxl-4 justify-center justify-sm-start gy-4 gy-sm-5 gy-md-6 gy-xl-7 gy-xxl-8 gx-4';
    for (let i = 0; i < 5; i++) {
      const skeletonButton = components.createSkeletonButton();
      suggestTabHeader.appendChild(skeletonButton);
      const skeletonCard = components.createSkeletonJobCard();
      skeletonContent.appendChild(skeletonCard);
    }
    suggestTabBody.appendChild(skeletonContent);
    const tabJobs = await api.get('jobs');
    suggestTabHeader.innerHTML = `<button data-tab-target="#all" class="btn btn-job button-label js-tab-trigger active">Tất cả</button>`
    suggestTabBody.innerHTML = '';
    const locations = await api.get('locations');
    const allLocationContentElement = document.createElement('div');
    allLocationContentElement.id = 'all';
    allLocationContentElement.classList = 'tab-content js-tab-content row row-cols-md-2 row-cols-xl-3 row-cols-xxl-4 justify-center justify-sm-start gy-4 gy-sm-5 gy-md-6 gy-xl-7 gy-xxl-8 gx-4';
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
      allLocationContentElement.append(jobTabCard);
    });
    suggestTabBody.append(allLocationContentElement);
    locations.forEach(location => {
      const locationBtnElement = document.createElement('button');
      locationBtnElement.setAttribute('data-tab-target', '#' + location.slug);
      locationBtnElement.classList = 'btn btn-job button-label js-tab-trigger';
      locationBtnElement.textContent = location.name;
      suggestTabHeader.appendChild(locationBtnElement);
      const locationContentElement = document.createElement('div');
      locationContentElement.id = location.slug;
      locationContentElement.classList = 'tab-content js-tab-content row row-cols-md-2 row-cols-xl-3 row-cols-xxl-4 justify-center justify-sm-start gy-4 gy-sm-5 gy-md-6 gy-xl-7 gy-xxl-8 gx-4';
      tabJobs.forEach(job => {
        if (job.location.slug === location.slug) {
          const jobTabCard = components.createTabJobCard({
            title: job.title,
            thumbnail: job.thumbnail,
            salary: job.salary,
            id: job.id,
            locationType: job.locationType,
            type: job.type,
            description: job.description
          });
          locationContentElement.appendChild(jobTabCard);
        }
      })
      suggestTabBody.appendChild(locationContentElement);
    });
    Tab({ tabClass: 'js-suggest-tab' }).init();
  }
  // tab


  // blog
  return {
    renderHotJobsCarousel,
    renderBlogsCarousel,
    renderTabJobsCarousel
  }
}