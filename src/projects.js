let i = 0;

let projects = [];

let selProject = 0;

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
        const submitbtn = document.getElementById("projectsubmitbtn");
        submitbtn.style.display = "block";
        const projectFormDiv = document.querySelector("#projectFormDiv");
        projectFormDiv.style.display = "block";
    });
    projectSection.appendChild(addNewProject);

    return projectSection;
}

function createTaskSection() {

    const taskSectionDiv = document.createElement("div");
    taskSectionDiv.id = "taskSectionDiv";

    const taskListDiv = document.createElement("div");
    taskListDiv.id = "taskListDiv";
    taskSectionDiv.appendChild(taskListDiv);

    const taskFormHeader = document.createElement("h2");
    taskFormHeader.id = "taskFormHeader";
    taskListDiv.appendChild(taskFormHeader);

    const taskForm = document.createElement("ul");
    taskForm.id = "taskForm";
    taskListDiv.appendChild(taskForm);

    const addNewTask = document.createElement("li");
    addNewTask.id = "addNewTask";
    addNewTask.innerHTML = "Add a New Task";
    addNewTask.addEventListener('click', () => {
        const addTaskDiv = document.getElementById("addTaskDiv");
        addTaskDiv.style.display = "block";
        displayTask();
    })
    taskForm.appendChild(addNewTask);

    const taskFormSubmit = document.createElement("button");
    taskFormSubmit.type = "button";
    taskFormSubmit.innerHTML = "Save";
    taskFormSubmit.id = "taskFormSubmitBtn";
    taskListDiv.appendChild(taskFormSubmit);

    const taskFormCancel = document.createElement("button");
    taskFormCancel.type = "button";
    taskFormCancel.innerHTML = "Cancel";
    taskFormCancel.id = "taskFormCancelBtn";
    taskFormCancel.addEventListener("click", () => {
        taskSectionDiv.style.display = "none";
        displayTask();
    })
    taskListDiv.appendChild(taskFormCancel);

    return taskSectionDiv;
}

function createTaskForm () {

    const addTaskDiv = document.createElement("div");
    addTaskDiv.id = "addTaskDiv";

    const addTaskForm = document.createElement("form");
    addTaskForm.id = "addTaskForm";
    addTaskDiv.appendChild(addTaskForm);

    const taskNameLabel = document.createElement("label");
    taskNameLabel.innerHTML = "Enter your task:";
    addTaskForm.appendChild(taskNameLabel);

    const taskNameInput = document.createElement("input");
    taskNameInput.id = "taskNameInput";
    addTaskForm.appendChild(taskNameInput);

    const taskDueDateLabel = document.createElement("label");
    taskDueDateLabel.innerHTML = "Enter a Due Date for your Task:";
    addTaskForm.appendChild(taskDueDateLabel);

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
    addTaskForm.appendChild(taskDueDate);

    const taskNotesLabel = document.createElement("label");
    taskNotesLabel.innerHTML = "Notes:";
    addTaskForm.appendChild(taskNotesLabel);

    const taskNotes = document.createElement("input");
    taskNotes.type = "text";
    addTaskForm.appendChild(taskNotes);

    const taskSubmitBtn = document.createElement("button");
    taskSubmitBtn.id = "taskSubmitBtn";
    taskSubmitBtn.type = "button";
    taskSubmitBtn.innerHTML = "Submit";
    taskSubmitBtn.addEventListener("click", () => {
        const newTask = new task(taskNameInput.value, taskDueDate.value, taskNotes.value, 1, false);
        projects[selProject].tasks.push(newTask);
        displayTask();
        taskNameInput.value = "";
        taskDueDate.value = "";
        taskNotes.value = "";
        addTaskDiv.style.display = "none";
    })
    addTaskForm.appendChild(taskSubmitBtn);

    const taskCancelBtn = document.createElement("button");
    taskCancelBtn.id = "taskSubmitBtn";
    taskCancelBtn.type = "button";
    taskCancelBtn.innerHTML = "Cancel";
    taskCancelBtn.addEventListener("click", () => {
        taskNameInput.value = "";
        taskDueDate.value = "";
        taskNotes.value = "";
        addTaskDiv.style.display = "none";
    })
    addTaskForm.appendChild(taskCancelBtn);

    return addTaskDiv;
}

function displayTask () {

    let taskitems = document.querySelectorAll(".task-item");
    taskitems.forEach(item => item.remove());

    for(let tnum = 0; tnum < projects[selProject].tasks.length; tnum++) {
        let taskli = document.createElement("li");
        taskli.setAttribute("data-taskid", tnum);
        taskli.innerHTML = projects[selProject].tasks[tnum].name;
        taskForm.appendChild(taskli).className = 'task-item';

        let editbtn = document.createElement("button");
        editbtn.innerHTML = "Edit Task";
        editbtn.style.display = "none";
//        editbtn.addEventListener("click", editTask);

        taskli.addEventListener("mouseover", () => {
            editbtn.style.display = "inline-block";
        })

        taskli.addEventListener("mouseout", () => {
            editbtn.style.display = "none";
        })

        let taskitems = document.querySelectorAll(".task-item");
        taskitems.forEach(item => item.appendChild(editbtn).className = "taskeditbtn");
    }

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
    deletebtn.addEventListener("click", deleteProject);
    projectForm.appendChild(deletebtn);

    const saveeditbtn = document.createElement("button");
    saveeditbtn.type = "button";
    saveeditbtn.id = "projectsaveeditbtn";
    saveeditbtn.innerHTML = "Save Edit";
    saveeditbtn.style.display = "none";
    saveeditbtn.addEventListener("click", saveEditProject);
    projectForm.appendChild(saveeditbtn);

    return projectFormDiv;
}

function cancelForm () {
    projectNameInput.value = "";
    projectDescriptionInput.value = "";
    projectFormDiv.style.display = "none";

    const saveeditbtn = document.getElementById("projectsaveeditbtn");
    const deletebtn = document.getElementById("projectdeletebtn");

    saveeditbtn.style.display = "none";
    deletebtn.style.display = "none";
}

function deleteProject() {
    projects.splice(selProject, 1);
    
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
}

function saveEditProject() {
    console.log(projectNameInput.value);
    projects[selProject].name = projectNameInput.value;
    projects[selProject].description = projectDescriptionInput.value;
    projectNameInput.value = "";
    projectDescriptionInput.value = "";
    projectFormDiv.style.display = "none";

    let projectitems = document.querySelectorAll(".project-item");
    projectitems.forEach(proj => proj.remove());

    const saveeditbtn = document.getElementById("projectsaveeditbtn");
    const deletebtn = document.getElementById("projectdeletebtn");
    const submitbtn = document.getElementById("projectsubmitbtn");

    saveeditbtn.style.display = "none";
    deletebtn.style.display = "none";
    submitbtn.style.display = "block";

    displayProject();
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
        editbtn.addEventListener("click", (event) => {
            selProject = event.target.parentElement.dataset.projid;
            event.stopPropagation();
            editProject();
        });

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

    projectitems.forEach(projectitem => projectitem.addEventListener('click', (event) => {
        taskSectionDiv.style.display = "block";
        selProject = event.target.parentElement.dataset.projid;
        document.getElementById("taskFormHeader").innerHTML = event.target.firstChild.nodeValue;
        displayTask();
    }))
}

function editProject (event) {

    const projectFormDiv = document.getElementById("projectFormDiv");
    projectFormDiv.style.display = "block";

    const projectNameInput = document.getElementById("projectNameInput");
    const projectDescriptionInput = document.getElementById("projectDescriptionInput");

    projectNameInput.value = projects[selProject].name;
    projectDescriptionInput.value = projects[selProject].description;

    const submitbtn = document.getElementById("projectsubmitbtn");
    submitbtn.style.display = "none";

    const saveeditbtn = document.getElementById("projectsaveeditbtn");
    saveeditbtn.style.display = "block";

    const deletebtn = document.getElementById("projectdeletebtn");
    deletebtn.style.display = "block";
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

    const taskSectionPage = createTaskSection();

    const taskFormPage = createTaskForm();

    content.innerHTML = "";

    setActive("projectsSB");

    content.appendChild(projectPage);
    content.appendChild(projectFormPage);
    content.appendChild(taskSectionPage);
    content.appendChild(taskFormPage);

    displayProject();
}

export default loadProjects;