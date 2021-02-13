import loadPage from "./pageLoad";
import loadProjects from "./projects";
import loadHome from "./home";

function sbevents() {
    const homeBtn = document.getElementById("home");
    const projectsBtn = document.getElementById("projectsSB");

    homeBtn.addEventListener("click", loadHome);
    projectsBtn.addEventListener("click", loadProjects);
}

init();

function init() {
    loadPage();
    loadHome();
    sbevents();
}