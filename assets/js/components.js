import { createElement, createText } from './ReactSimulator/virtual_dom.js';
import { renderElement } from "./ReactSimulator/render.js";

export default function Components() {
    function createProfileDropdown({
        avatar = 'https://avatars.githubusercontent.com/u/91683993', 
        name = 'Nguyễn Tấn Đạt',
        jsDropdownClass = 'js-dropdown-profile'
    } = {}) {
        let profileDropdown;
        const dropdown = createElement('div', { className: `dropdown dropdown-profile ${jsDropdownClass}` });

        // Dropdown button
        const button = createElement('button', { className: 'btn gap-4 d-flex items-center dropdown-toggle px-0 px-md-4' });

        // Avatar container
        const avatarContainer = createElement('div', { className: 'dropdown-avatar' });
        const avatarImg = createElement('img', {
            width: '40',
            height: '40',
            src: avatar,
            alt: '',
            className: 'rounded-circle'
        });

        // Profile info
        const profileInfo = createElement('div', { className: 'd-flex flex-column text-start' });
        const profileName = createElement('span', { className: 'profile-name' }, createText(name));
        const profileRole = createElement('span', { className: 'profile-role button-label' }, createText('UI UX'));

        // Dropdown arrow
        // <svg class="dropdown-arrow-down" xmlns="http://www.w3.org/2000/svg" width="14" height="8"
        //                 viewBox="0 0 14 8" fill="none">
        //                 <path d="M1 1.2187L4 4.21021L7 7.20171L13 1.2187" stroke-width="1.5" stroke-linecap="round"
        //                   stroke-linejoin="round" />
        //               </svg>
        const dropdownArrow = document.createElement('svg');
        


        // Dropdown menu
        function logout(){
            localStorage.removeItem('access_token');
            const profileHolder = document.querySelector('.profile-holder');
            profileHolder.removeChild(profileDropdown);
            profileHolder.querySelector('.login-modal-trigger').classList.remove('d-none');
        }
        const dropdownMenu = createElement('ul', { className: 'dropdown-menu js-dropdown-content' });
        const menuItem1 = createElement('li', {}, createElement('a', { className: 'dropdown-item', href: '#' }, createText('Thông tin')));
        const menuItem2 = createElement('li', {}, createElement('a', { className: 'dropdown-item', href: '#' }, createText('Cài đặt')));
        const menuDivider = createElement('li', {}, createElement('hr', { className: 'dropdown-divider' }));
        const menuLogout = createElement('li', {}, createElement('a', { className: 'dropdown-item', href: '#', onclick: logout }, createText('Đăng xuất')));
        // Build the structure
        avatarContainer.childeren.push(avatarImg);
        profileInfo.childeren.push(profileName, profileRole);
        button.childeren.push(avatarContainer, profileInfo);
        dropdownMenu.childeren.push(menuItem1, menuItem2, menuDivider, menuLogout);
        dropdown.childeren.push(button, dropdownMenu);
        // Render the dropdown
        profileDropdown = renderElement(dropdown);
        profileDropdown.querySelector('.dropdown-toggle').appendChild(dropdownArrow);
        dropdownArrow.outerHTML = `<svg class="dropdown-arrow-down" xmlns="http://www.w3.org/2000/svg" width="14" height="8"
                        viewBox="0 0 14 8" fill="none">
                        <path d="M1 1.2187L4 4.21021L7 7.20171L13 1.2187" stroke-width="1.5" stroke-linecap="round"
                          stroke-linejoin="round" />
                      </svg>`

        return profileDropdown;
    }
    function createSkeletonBlogCard() {
        const card = createElement('div', { className: 'card mt-4 card-blog' });

        // Card Image Wrapper
        const cardImgWrapper = createElement('div', { className: 'skeleton w-100', style: 'aspect-ratio: 2/1;' });

        // Card Body
        const cardBody = createElement('div', { className: 'card-body' });
        const skeletonText1 = createElement('div', { className: 'skeleton skeleton-text mb-3' });
        const skeletonText2 = createElement('p', { className: 'skeleton skeleton-text' });
        const skeletonText3 = createElement('div', { className: 'mt-4 skeleton skeleton-text' });

        // Build the structure
        cardBody.childeren.push(skeletonText1, skeletonText2, skeletonText3);
        card.childeren.push(cardImgWrapper, cardBody);

        // Render the card
        return renderElement(card);
    }
    function createSkeletonSearchSuggestion() {
        const suggestionItem = document.createElement('li');
        suggestionItem.className = 'search-suggestion-item';
        const span = document.createElement('span');
        span.className = 'skeleton skeleton-text py-3';
        suggestionItem.appendChild(span);
        return suggestionItem;

    }
    function createSkeletonButton() {
        const button = createElement('button', {
            className: 'btn btn-job button-label skeleton'
        });
        return renderElement(button);
    }
    function createSkeletonTabJobCard() {
        const col = document.createElement('div');
        col.className = 'col';
        const card = createSkeletonJobCard();
        col.appendChild(card);
        return col;
    }
    function createSkeletonJobCard() {
        const card = createElement('div', { className: 'card p-4 card-job d-flex flex-column rounded-4 bg-white' });

        // Card Header
        const cardHeader = createElement('div', { className: 'card-header gap-4 pb-5 d-flex items-center' });
        const cardLogo = createElement('div', { className: 'card-logo d-flex flex-center skeleton' });

        const cardHeaderInfo = createElement('div', { className: 'w-100' });
        const skeletonText1 = createElement('div', { className: 'skeleton skeleton-text' });
        const skeletonText2 = createElement('div', { className: 'skeleton skeleton-text' });

        // Card Body
        const cardBody = createElement('div', { className: 'card-body pt-5' });
        const skeletonText3 = createElement('div', { className: 'skeleton skeleton-text' });
        const skeletonText4 = createElement('div', { className: 'skeleton skeleton-text' });
        const skeletonText5 = createElement('div', { className: 'skeleton skeleton-text' });

        // Build the structure
        cardHeaderInfo.childeren.push(skeletonText1, skeletonText2);
        cardHeader.childeren.push(cardLogo, cardHeaderInfo);

        cardBody.childeren.push(skeletonText3, skeletonText4, skeletonText5);

        card.childeren.push(cardHeader, cardBody);

        // Render the card
        return renderElement(card);
    }
    function createBlogCard({
        id = Math.random(),
        createdAt = "June 12, 2023",
        imgUrl = './assets/image/blog-section/img_blog_1.avif',
        title = 'title',
        content = 'content',
        field = 'field'
    }) {
        const date = new Date(createdAt);
        const card = createElement('div', { className: 'card mt-4 card-blog', key: id });
        const cardImgWrapper = createElement('div', { className: 'card-img-wrapper' });
        const cardImg = createElement('img', {
            src: imgUrl,
            alt: '',
            style: 'aspect-ratio: 3/2;',
            className: 'card-img card-img-top'
        });
        const cardImgOverlay = createElement('div', { className: 'card-img-overlay' });
        const cardImgBadge = createElement('div', { className: 'badge small-headline card-img-badge py-2 px-4' }, createText(field));

        const cardBody = createElement('div', { className: 'card-body' });
        const cardTitle = createElement('h3', { className: 'card-title mb-3 display-2' }, createText(title));
        const cardContent = createElement('p', { className: 'card-text text-limit-2 body-1' }, createText(content));

        const cardFooter = createElement('div', { className: 'mt-4 d-flex justify-between items-center' });
        const cardDate = createElement('span', { className: 'small-headline text-medium' }, createText(`${date.toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}, ${date.getFullYear()}`));
        const readMoreLink = createElement('a', { href: '#', className: 'd-flex items-center text-primary text-decoration-none' });
        const readMoreText = createElement('span', { className: 'small-headline me-2' }, createText('Read More'));
        const readMoreIcon = createElement('svg', {
            xmlns: 'http://www.w3.org/2000/svg',
            width: '6',
            height: '10',
            viewBox: '0 0 6 10',
            fill: 'none'
        }, createElement('path', {
            d: 'M5.13312 3.8092L3.81979 2.49587L1.67979 0.355869C1.22646 -0.0907975 0.453125 0.229203 0.453125 0.869203V5.02254V8.76254C0.453125 9.40254 1.22646 9.72254 1.67979 9.2692L5.13312 5.81587C5.68646 5.2692 5.68646 4.36254 5.13312 3.8092Z',
            fill: '#E24C32'
        }));

        readMoreLink.childeren.push(readMoreText, readMoreIcon);
        cardFooter.childeren.push(cardDate, readMoreLink);
        cardImgWrapper.childeren.push(cardImg, cardImgOverlay, cardImgBadge);
        cardBody.childeren.push(cardTitle, cardContent, cardFooter);
        card.childeren.push(cardImgWrapper, cardBody);

        return renderElement(card);
    }
    function createJobCard({
        title = 'title',
        thumbnail = 'https://avatars.githubusercontent.com/u/91683993',
        salary = 1000,
        id = Math.random(),
        locationType = 'Onsite',
        type = 'Full Time',
        description = 'Job description'
    }) {
        const card = createElement('div', { className: 'card p-4 card-job d-flex flex-column rounded-4 bg-white', key: id });

        // Card Header
        const cardHeader = createElement('div', { className: 'card-header gap-4 pb-5 d-flex items-center' });
        const cardLogo = createElement('div', { className: 'card-logo d-flex flex-center' });
        const cardLogoImg = createElement('img', { src: thumbnail, alt: 'acb logo' });

        const cardHeaderInfo = createElement('div', { className: 'd-flex flex-column' });
        const cardTitle = createElement('h3', { className: 'mt-0 mb-1 card-title display-2 text-limit-1' }, createText(title));
        const cardSalary = createElement('span', { className: 'extra-small text-primary' }, createText(`Up to ${salary}$`));

        const cardArchiveTick = createElement('img', {
            className: 'card-archive-tick',
            src: './assets/image/spotlight-section/icon/img_icon_archive-tick.png',
            alt: ''
        });

        // Card Body
        const cardBody = createElement('div', { className: 'card-body pt-5' });
        const cardBodyIcons = createElement('div', { className: 'd-flex mb-2' });

        const locationIcon = createElement('div', { className: 'card-icon d-flex me-4' });
        const locationImg = createElement('img', {
            src: './assets/image/spotlight-section/icon/img_icon_building.png',
            alt: 'building icon'
        });
        const locationText = createElement('span', { className: 'small-headline' }, createText(locationType));

        const typeIcon = createElement('div', { className: 'card-icon d-flex' });
        const typeImgWrapper = createElement('div', { className: 'me-1 d-flex flex-center' });
        const typeImg = createElement('img', {
            src: './assets/image/spotlight-section/icon/img_icon_clock.png',
            alt: 'clock icon'
        });
        const typeText = createElement('span', { className: 'small-headline' }, createText(type));

        const cardDescription = createElement('div', { className: 'text-limit-2 card-desc description-small' }, createText(description));

        // Build the structure
        cardLogo.childeren.push(cardLogoImg);
        cardHeaderInfo.childeren.push(cardTitle, cardSalary);
        cardHeader.childeren.push(cardLogo, cardHeaderInfo, cardArchiveTick);

        locationIcon.childeren.push(locationImg, locationText);
        typeImgWrapper.childeren.push(typeImg);
        typeIcon.childeren.push(typeImgWrapper, typeText);
        cardBodyIcons.childeren.push(locationIcon, typeIcon);
        cardBody.childeren.push(cardBodyIcons, cardDescription);

        card.childeren.push(cardHeader, cardBody);

        // Render the card
        return renderElement(card);
    }
    function createTabJobCard({
        title = 'title',
        thumbnail = 'https://avatars.githubusercontent.com/u/91683993',
        salary = 1000,
        id = Math.random(),
        locationType = 'Onsite',
        type = 'Full Time',
        description = 'Job description'
    }) {
        const cardWrapperEle = document.createElement('div');
        cardWrapperEle.classList = 'col';
        const card = createJobCard({ title, thumbnail, salary, id, locationType, type, description });
        cardWrapperEle.appendChild(card);
        return cardWrapperEle;
    }
    return {
        createProfileDropdown,
        createSkeletonTabJobCard,
        createSkeletonSearchSuggestion,
        createSkeletonBlogCard,
        createSkeletonButton,
        createSkeletonJobCard,
        createBlogCard,
        createJobCard,
        createTabJobCard
    }
}