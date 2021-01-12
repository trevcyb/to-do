function createHeader () {
    const header = document.createElement("header");
    header.id = "header";
    header.innerHTML = "Noteriety";
    return header;
}

function createSideBar () {
    const sidebar = document.createElement("div");
    sidebar.id = "sidebar";

    const nav = document.createElement("nav");
    nav.id = "nav";
    sidebar.appendChild(nav);

    const projectSBList = document.createElement("ul");
    projectSBList.id = "projectsidebar";


}