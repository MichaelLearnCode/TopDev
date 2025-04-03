import { Api } from "../api/api.js";

export default async function render(){
    const api = Api().init();
    // 
    const blogCarousel = document.querySelector('.blog-carousel');
    const blogData = await api.get('blogs');
    const renderedBlogs = [];
    blogData.forEach(blog=>{
        const date = new Date(blog.createdAt);
        renderedBlogs.push(`<div class="card mt-4 card-blog" key = "${blog.id}">
          <div class="card-img-wrapper">
            <img src="${blog.imgUrl}" alt="" style="aspect-ratio: 3/2;"
              class="card-img card-img-top" />
            <div class="card-img-overlay"></div>
            <div class="badge small-headline card-img-badge py-2 px-4">${blog.field}</div>
          </div>
          <div class="card-body">
            <h3 class="card-title mb-3 display-2">
              ${blog.title}
            </h3>
            <p class="card-text card-content body-1">
              ${blog.content}
            </p>
            <div class="mt-4 d-flex justify-between items-center">
              <span class="small-headline text-medium">${`${date.toLocaleDateString('en-US',{month: 'long', day: 'numeric'})}, ${date.getFullYear()}`}</span>
              <a href="#" class="d-flex items-center text-primary text-decoration-none">
                <span class="small-headline me-2">Read More</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="6" height="10" viewBox="0 0 6 10" fill="none">
                  <path
                    d="M5.13312 3.8092L3.81979 2.49587L1.67979 0.355869C1.22646 -0.0907975 0.453125 0.229203 0.453125 0.869203V5.02254V8.76254C0.453125 9.40254 1.22646 9.72254 1.67979 9.2692L5.13312 5.81587C5.68646 5.2692 5.68646 4.36254 5.13312 3.8092Z"
                    fill="#E24C32" />
                </svg>
              </a>
            </div>
          </div>
        </div>`)
    })
    blogCarousel.innerHTML = renderedBlogs.join('');

}

