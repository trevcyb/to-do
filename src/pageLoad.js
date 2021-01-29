function createHeader () {
    const header = document.createElement("header");
    header.id = "header";
    header.innerHTML = "Noteriety";
    return header;
}

function createSideBarElement(id, name) {
    const button = document.createElement("button");
    button.id = id;
    button.innerHTML = name;
    button.classList.add("tab");
    return button;
}

function createSideBar () {
    const sidebar = document.createElement("div");
    sidebar.id = "sidebar";

    const homeBtn = createSideBarElement('home', 'Home');
    const projectsBtn = createSideBarElement('projectsSB', 'Projects');

    sidebar.appendChild(homeBtn);
    sidebar.appendChild(projectsBtn);

    return sidebar;
}

function createMain (id) {
    const main = document.createElement("main");
    main.id = id;
    return main;
}

function loadPage() {
    const content = document.getElementById("content");

    const header = createHeader();
    content.appendChild(header);

    const sidebar = createSideBar();
    content.appendChild(sidebar);

    const main = createMain('main');
    content.appendChild(main);
}

export default loadPage;