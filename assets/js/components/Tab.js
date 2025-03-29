const TABCLASS = 'js-tab';
const TABBUTTONCLASS = 'js-tab-trigger';
const TABCONTENTClASS = 'js-tab-content';
const ACTIVECLASS = 'active';
const TARGETATTRIBUTE = 'data-tab-target';

const Tab = function({
    tabClass = TABCLASS,
    tabBtnClass = TABBUTTONCLASS,
    tabContentClass = TABCONTENTClASS,
    activeClass = ACTIVECLASS,
    targetAttribute = TARGETATTRIBUTE
}){
    const tab = document.querySelector(`.${tabClass}`);
    console.log(tabClass);
    console.log(tab);
    if (!tab) return;
    const tabBtns = tab.querySelectorAll(`.${tabBtnClass}`);
    const tabContents = tab.querySelectorAll(`.${tabContentClass}`);
    if (!tabContents.length || !tabBtns.length)return;
    function init(){
        defaultActive();
        tabBtns.forEach(tabBtn=>tabBtn.onclick = handleClick);
        return {defaultActive};
    }
    function handleClick(e){
        const clickedBtn = this;
        const contentId = clickedBtn.getAttribute(targetAttribute);
        if (!contentId)return;
        removeAllActive();
        addActive(clickedBtn, contentId);
    }
    function defaultActive(index = 0){
        if(index < 0 || index > tabBtns.length)index = 0;
        const activeBtn = tabBtns[index];
        const contentId = activeBtn.getAttribute(targetAttribute);
        removeAllActive();
        addActive(activeBtn, contentId);
    }
    function addActive(activeBtn, contentId){
        activeBtn.classList.add(activeClass);
        const tabContent = tab.querySelector(contentId);
        if (!tabContent)return;
        tabContent.classList.add(activeClass)
    }
    function removeAllActive(){
        tabBtns.forEach(tabBtn=>{
            tabBtn.classList.remove('active');
        });
        tabContents.forEach(tabContent=>tabContent.classList.remove('active'));
    }
    return {
        init
    }
}

export default Tab;