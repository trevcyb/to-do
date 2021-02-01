function createAboutUs() {
    const aboutUs = document.createElement("section");

    const aboutUsHeader = document.createElement("h2");
    aboutUsHeader.innerHTML = "About Noteriety";
    aboutUs.appendChild(aboutUsHeader);

    const aboutUsInfo = document.createElement("p");
    aboutUsInfo.innerHTML = "In a constantly evolving world, we're here to help you make sense of the madness. Introducing Noteriety, to help you keep track of the daily bustle.";
    aboutUs.appendChild(aboutUsInfo);

    return aboutUs;
}

function setActive(id) {
    const activeBtn = document.querySelector(".tab.active");
    if (activeBtn) activeBtn.classList.remove("active");

    const homeBtn = document.getElementById(id);
    homeBtn.classList.add("active");
}

function loadHome () {
    const content = document.getElementById("main");

    const aboutUsPage = createAboutUs();

    setActive("home");

    content.appendChild(aboutUsPage);
}

export default loadHome;