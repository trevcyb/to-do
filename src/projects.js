let i = 0;

let projects = [];

class project {
    constructor(name, description, priority, tasks) {
        this.name = name;
        this.description = description;
        this.priority = priority;
        this.tasks = tasks;
    }
}

class task {
    constructor(name, duedate, notes, priority, completed) {
        this.name = name;
        this.duedate = duedate;
        this.notes = notes;
        this.priority = priority;
        this.completed = completed;
    }
}

function createProjectSection() {

    const projectSection = document.createElement("section");

    const projectHeader = document.createElement("h2");
    projectHeader.innerHTML = "Your Projects";
    projectHeader.id = "projectHeader";
    projectSection.appendChild(projectHeader);

    const projectList = document.createElement("section");
    projectList.id = "projectList";
    projectSection.appendChild(projectList);

    const addNewProject = document.createElement("button");
    addNewProject.innerHTML = "Add a new Project";
    addNewProject.id = "addNewProject";
    addNewProject.type = "button";
    addNewProject.addEventListener("click", () => {
        document.getElementById("projectNameInput").value = "";
        document.getElementById("projectDescriptionInput").value = "";
        const projectFormDiv = document.querySelector("#projectFormDiv");
        projectFormDiv.style.display = "block";
    });
    projectSection.appendChild(addNewProject);

    return projectSection;
}


function createProjectForm() {

    const projectFormDiv = document.createElement("div");
    projectFormDiv.id = "projectFormDiv";
    
    const projectForm = document.createElement("form");
    projectForm.style.display = "block";
    projectForm.id = "projectForm";
    projectFormDiv.appendChild(projectForm);

    const projectFormCloseBtn = document.createElement("button");
    projectFormCloseBtn.innerHTML = "X";
    projectFormCloseBtn.id = "projectxbtn";
    projectFormCloseBtn.type = "button";
    projectFormCloseBtn.addEventListener('click', cancelForm);
    projectForm.appendChild(projectFormCloseBtn);

    const projectNameLabel = document.createElement("label");
    projectNameLabel.innerHTML = "Enter a name for your project:"
    projectNameLabel.htmlFor = "projectNameInput";
    projectNameLabel.id = "projectNameLabel";
    projectForm.appendChild(projectNameLabel);

    const projectNameInput = document.createElement("input");
    projectNameInput.id = "projectNameInput";
    projectForm.appendChild(projectNameInput);

    const projectDescriptionLabel = document.createElement("label");
    projectDescriptionLabel.htmlFor = "projectDescriptionInput";
    projectDescriptionLabel.innerHTML = "Enter a description for your project:";
    projectDescriptionLabel.id = "projectDescriptionLabel";
    projectForm.appendChild(projectDescriptionLabel);

    const projectDescriptionInput = document.createElement("input");
    projectDescriptionInput.id = "projectDescriptionInput";
    projectForm.appendChild(projectDescriptionInput);

    const submitbtn = document.createElement("button");
    submitbtn.type = "button";
    submitbtn.id = "projectsubmitbtn";
    submitbtn.innerHTML = "Submit";
    submitbtn.addEventListener("click", () => {
    addNewProject();
    projectFormDiv.style.display = "none";
    });
    projectForm.appendChild(submitbtn);

    const cancelbtn = document.createElement("button");
    cancelbtn.innerHTML = "Cancel";
    cancelbtn.id = "projectcancelbtn";
    cancelbtn.type = "button";
    cancelbtn.addEventListener('click', cancelForm);
    projectForm.appendChild(cancelbtn);

    const deletebtn = document.createElement("button");
    deletebtn.innerHTML = "Delete";
    deletebtn.id = "projectdeletebtn";
    deletebtn.type = "button";
    deletebtn.style.display = "none";
    projectForm.appendChild(deletebtn);

    const saveeditbtn = document.createElement("button");
    saveeditbtn.type = "button";
    saveeditbtn.id = "projectsaveeditbtn";
    saveeditbtn.innerHTML = "Save Edit";
    saveeditbtn.style.display = "none";
    projectForm.appendChild(saveeditbtn);

    return projectFormDiv;
}

function cancelForm () {
    projectNameInput.value = "";
    projectDescriptionInput.value = "";
    projectFormDiv.style.display = "none";
}

function addNewProject() {
    const projectName = document.getElementById("projectNameInput").value;
    const projectDescription = document.getElementById("projectDescriptionInput").value;
    projects[i] = new project(projectName, projectDescription, i, []);
    i++;

    projects = projects.filter((x) => {
        return x!== undefined;
    });

    let projectitems = document.querySelectorAll(".project-item");
    projectitems.forEach(proj => proj.remove());

    console.log(projects);

    displayProject();
}

function displayProject() {

    for(let pnum = 0; pnum < projects.length; pnum++) {
        let cell = document.createElement("div");
        cell.setAttribute("data-projid", pnum);
        cell.innerHTML = '<h2>' + projects[pnum].name + '</h2>';
        projectList.appendChild(cell).className = "project-item";
        
        let editbtn = document.createElement('button');
        editbtn.innerHTML = "Edit Project";
        editbtn.style.display = "none";
        editbtn.addEventListener("click", editProject);

        cell.addEventListener("mouseover", () => {
            editbtn.style.display = "block";
        })

        cell.addEventListener("mouseout", () => {
            editbtn.style.display = "none";
        })

        let projectitems = document.querySelectorAll('.project-item');
        projectitems.forEach(projectitem => projectitem.appendChild(editbtn).className = "editbtn");

    }

    let projectitems = document.querySelectorAll('.project-item');

    projectitems.forEach(projectitem => projectitem.addEventListener('mouseover', function () {
        let chosen = document.querySelectorAll('.project-item' + this.dataset.projid);
        for (let chs of chosen) {
            chs.style.display = "inline-block";
        }
    }));

    projectitems.forEach(projectitem => projectitem.addEventListener('mouseout', function () {
        let chosen = document.querySelectorAll('.project-item' + this.dataset.projid);
        for (let chs of chosen) {
            chs.style.display = "none";
        }
    }));
}

function editProject (event) {
    const projectFormDiv = document.getElementById("projectFormDiv");
    projectFormDiv.style.display = "block";

    const projectID = event.target.parentElement.dataset.projid;

    document.getElementById("projectNameInput").value = projects[projectID].name;
    document.getElementById("projectDescriptionInput").value = projects[projectID].description;

    const submitbtn = document.getElementById("projectsubmitbtn");
    submitbtn.style.display = "none";

    const saveeditbtn = document.getElementById("projectsaveeditbtn");
    saveeditbtn.style.display = "block";

    saveeditbtn.addEventListener("click", () => {
        projects[projectID].name = document.getElementById("projectNameInput").value;
        projects[projectID].description = document.getElementById("projectDescriptionInput").value;
        document.getElementById("projectNameInput").value = "";
        document.getElementById("projectDescriptionInput").value = "";
        projectFormDiv.style.display = "none";

        let projectitems = document.querySelectorAll(".project-item");
        projectitems.forEach(proj => proj.remove());

        saveeditbtn.style.display = "none";
        deletebtn.style.display = "none";
        submitbtn.style.display = "block";

        displayProject();
    }, {once:true}
    );

    const deletebtn = document.getElementById("projectdeletebtn");
    deletebtn.style.display = "block";
    deletebtn.addEventListener("click", () => {
        projects.splice(projectID, 1);
    
        let projectGrid = document.querySelectorAll(".project-item");
        projectGrid.forEach(item => item.remove());
    
        const saveeditbtn = document.getElementById("projectsaveeditbtn");
        const deletebtn = document.getElementById("projectdeletebtn");
        const submitbtn = document.getElementById("projectsubmitbtn");
        const projectFormDiv = document.getElementById("projectFormDiv");
        
        saveeditbtn.style.display = "none";
        deletebtn.style.display = "none";
        submitbtn.style.display = "block";
        projectFormDiv.style.display = "none";

        console.log(projects);
    
        displayProject();
    }, {once: true}
    );
}


function createTaskForm () {

    const taskForm = document.createElement("form");

    const taskNameLabel = document.createElement("label");
    taskNameLabel.innerHTML = "Enter a name for your task:";
    taskForm.appendChild(taskNameLabel);

    const taskDueDateLabel = document.createElement("label");
    taskDueDateLabel.innerHTML = "Enter a Due Date for your Task:";
    taskForm.appendChild(taskDueDateLabel);

    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1; //January is 0!
    let yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd;
    }
    if (mm < 10) {
        mm = '0' + mm;
    }

    today = yyyy + '-' + mm + '-' + dd;

    const taskDueDate = document.createElement("input");
    taskDueDate.type = "datetime-local";
    taskDueDate.name = "duedate";
    taskDueDate.id = "duedate";
    taskDueDate.min = today;
    taskForm.appendChild(taskDueDate);

    const taskNotesLabel = document.createElement("label");
    taskNotesLabel.innerHTML = "Notes:";
    taskForm.appendChild(taskNotesLabel);

    const taskNotes = document.createElement("input");
    taskNotes.type = "text";
    taskForm.appendChild(taskNotes);

}

function setActive(id) {
    const activeBtn = document.querySelector(".tab.active");
    if (activeBtn) activeBtn.classList.remove("active");

    const projectsBtn = document.getElementById(id);
    projectsBtn.classList.add("active");
}

function loadProjects() {
    const content = document.getElementById("main");

    const projectPage = createProjectSection();

    const projectFormPage = createProjectForm();

    content.innerHTML = "";

    setActive("projectsSB");

    content.appendChild(projectPage);
    content.appendChild(projectFormPage);
}

export default loadProjects;