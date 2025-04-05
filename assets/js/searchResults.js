import render from './render.js';
import Components from './components.js';
import { Api } from '../api/api.js';
import Dropdown from './components/Dropdown.js';
Dropdown({ dropdownClass: 'js-dropdown-about-1' }).init();
Dropdown({ dropdownClass: 'js-dropdown-about-2' }).init();
Dropdown({ dropdownClass: 'js-dropdown-about-3' }).init();
const api = Api().init();
const instance = render();
const components = Components();
const currentUrl = new URL(window.location);
const searchInput = currentUrl.searchParams.get('search');
const locationCriteria = currentUrl.searchParams.get('location');
const normalizedInput = searchInput.trim().toLowerCase();
const searchInputEle = document.querySelector('.search-input');
const searchResultsEle = document.querySelector('.search-results-cards');
searchInputEle.textContent = searchInput;
instance.renderSkeletonComponent(searchResultsEle, components.createSkeletonTabJobCard, 6);
const jobsData = await api.get('jobs', {
    custom: (job) => {
        const normalizedJobTitle = job.title.trim().toLowerCase();
        return normalizedJobTitle.includes(normalizedInput) && (!locationCriteria || job.location.slug === locationCriteria || locationCriteria === 'all')
    }
})

searchResultsEle.innerHTML = (jobsData.length === 0)?'<div class = "w-100 text-center">Không tìm thấy công việc nào phù hợp</div>':'';

jobsData.forEach(job => {
    const card = components.createTabJobCard({
        title: job.title,
        thumbnail: job.thumbnail,
        salary: job.salary,
        id: job.id,
        locationType: job.locationType,
        type: job.type,
        description: job.description
    });
    searchResultsEle.appendChild(card);
})