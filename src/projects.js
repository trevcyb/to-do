let i = 0;

function createProjectSection() {

    const projectSection = document.createElement("section");

    const projectHeader = document.createElement("h2");
    projectHeader.innerHTML = "Your Projects";
    projectSection.appendChild(projectHeader);

    const projectList = document.createElement("section");
    displayProject;
    projectSection.appendChild(projectList);

    const addNewProject = document.createElement("button");
    addNewProject.innerHTML = "Add a new Project";
    addNewProject.addEventListener("click", createProjectForm);
    projectSection.appendChild(addNewProject);

    return createProjectSection;
}

function createProjectForm() {

    const projectForm = document.createElement("form");

    const projectFormCloseBtn = document.createElement("button");
    projectFormCloseBtn.innerHTML = "X";
    projectFormCloseBtn.addEventListener('click', cancelForm);
    projectForm.appendChild(projectFormCloseBtn);

    const projectNameLabel = document.createElement("label");
    projectNameLabel.innerHTML = "Enter a name for your project:"
    projectNameLabel.htmlFor = "projectNameInput";
    projectForm.appendChild(projectNameLabel);

    const projectNameInput = document.createElement("input");
    projectNameInput.id = "projectNameInput";
    projectForm.appendChild(projectNameInput);

    const projectDescriptionLabel = document.createElement("label");
    projectDescriptionLabel.htmlFor = "projectDescriptionInput";
    projectDescriptionLabel.innerHTML = "Enter a description for your project:";
    projectForm.appendChild(projectDescriptionLabel);

    const projectDescriptionInput = document.createElement("input");
    projectDescriptionInput.id = "projectDescriptionInput";
    projectDescriptionInput.appendChild(projectDescriptionInput);

    const submitbtn = document.createElement("button");
    submitbtn.innerHTML = "Submit";
    submitbtn.addEventListener("click", addNewProject);
    projectForm.appendChild(submitbtn);

    const cancelbtn = document.createElement("button");
    cancelbtn.innerHTML = "Cancel";
    cancelbtn.addEventListener('click', cancelForm);
    projectForm.appendChild(cancelbtn);

    projectSection.appendChild(projectForm);

    return createProjectForm;
}

function cancelForm () {
    projectNameInput.value = "";
    projectDescriptionInput.value = "";
    projectForm.style.display = "none";
}

function addNewProject() {
    projectName = document.getElementById("projectNameInput").value;
    projectDescription = document.getElementById("projectDescriptionInput").value;
    projects[i] = new project(projectName, projectDescription, i, []);
    i++;
    document.getElementById("projectNameInput").value = "";
    document.getElementById("projectDescriptionInput").value = "";
}

function displayProject() {
    for(pnum = 0; pnum < projects.length; pnum++) {
        let cell = document.createElement("div");
        cell.setAttribute("data-projid", pnum);
        cell.innerHTML = '<h2>' + projects[pnum].name + '<h2>';
        projectList.appendChild(cell).className = "project-item";
        
        let editbtn = document.createElement('button');
        editbtn.innerHTML = "Edit Project";
        editbtn.addEventListener("click", createProjectForm);
        projectNameInput.value = projects[pnum].name;
        projectDescriptionInput.value = projects[pnum].description;

        let projectitems = document.querySelectorAll('.project-item');
        projectitems.forEach(projectitem => projectitem.appendChild(editbtn).className = "editbtn");

    }

    let projectitems = querySelectorAll('.project-item');
    projectitems.forEach(projectitem => projectitem.addEventListener('mouseover', function () {
        let chosen = document.querySelector('.project-item' + this.dataset.projid);
        for (let chs of chosen) {
            chs.style.display = "inline-block";
        }
    }));

    projectitems.forEach(projectitem => projectitem.addEventListener('mouseout', function () {
        let chosen = document.querySelector('.project-item' + this.dataset.projid);
        for (let chs of chosen) {
            chs.style.display = "none";
        }
    }));
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
