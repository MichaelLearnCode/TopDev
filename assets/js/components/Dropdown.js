const DROPDOWNCLASS = 'js-dropdown';
const DROPDOWNCONTENTCLASS = 'js-dropdown-content';
const ACTIVECLASS = 'show';

const Dropdown = function({
    dropdownClass = DROPDOWNCLASS,
    dropdownContentClass = DROPDOWNCONTENTCLASS,
    activeClass = ACTIVECLASS
}){
    const dropdown = document.querySelector(`.${dropdownClass}`);
    if (!dropdown)return;
    console.log(dropdown);
    const dropdownContent = dropdown.querySelector(`.${dropdownContentClass}`)
    if (!dropdownContent)return;
    function init(){
        dropdown.onclick = e=>dropdownContent.classList.toggle(activeClass);
    }
    return {init}
}

export default Dropdown;