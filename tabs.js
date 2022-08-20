const tabList = document.querySelector('[role="tablist"]');
const tabs = tabList.querySelectorAll('[role="tab"]');

tabList.addEventListener('keydown', changeTabFocus);

tabs.forEach((tab) => {
    tab.addEventListener('click', changeTabPanel);
});


let tabFocus = 0;
function changeTabFocus(e) {
    const keyDownLeft = 37;
    const keyDownRight = 39;

    //When KeyDown -> Change TabIndex

    if (e.keyCode === keyDownLeft || e.keyCode === keyDownRight) {
        tabs[tabFocus].setAttribute("tabindex", -1);
    }

    if(e.keyCode === keyDownRight) {
        tabFocus++;
        if (tabFocus >= tabs.length)
            tabFocus = 0;
    }

    if(e.keyCode === keyDownLeft) {
        tabFocus--;
        if (tabFocus < 0)
            tabFocus = tabs.length - 1;
    }

    tabs[tabFocus].setAttribute("tabindex", 0);
    tabs[tabFocus].focus();
}

function changeTabPanel(e) {
    const targetTab = e.target;
    const targetPanel = targetTab.getAttribute("aria-controls");
    
    const tabContainer = targetTab.parentNode;
    const mainContainer = tabContainer.parentNode;
    
    targetTab.setAttribute("aria-selected", "true");
    tabs.forEach((tab) => {
        if(tab.getAttribute("aria-selected") === "true")
            tab.setAttribute("aria-selected", "false");
    })

    mainContainer
        .querySelectorAll('[role="tabpanel"]')
        .forEach((panel) => panel.setAttribute("hidden", true));

    mainContainer.querySelector([`#${targetPanel}`]).removeAttribute('hidden');

    mainContainer
        .querySelectorAll('picture')
        .forEach((picture) => picture.setAttribute("hidden", true));

    
}