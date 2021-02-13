let i = 0;

let selProject = 0;

let selTask = 0;

let projects = [];

let savedJSON = [];

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
    taskFormSubmit.classList.add("formBtn");
    taskListDiv.appendChild(taskFormSubmit);

    const taskFormCancel = document.createElement("button");
    taskFormCancel.type = "button";
    taskFormCancel.innerHTML = "Cancel";
    taskFormCancel.id = "taskFormCancelBtn";
    taskFormCancel.classList.add("formBtn");
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
    taskNotes.id = "taskNotes";
    addTaskForm.appendChild(taskNotes);

    const taskSaveEditBtn = document.createElement("button");
    taskSaveEditBtn.type = "button";
    taskSaveEditBtn.id = "taskSaveEditBtn";
    taskSaveEditBtn.classList.add("formBtn");
    taskSaveEditBtn.style.display = "none";
    taskSaveEditBtn.innerHTML = "Save";
    taskSaveEditBtn.addEventListener("click", saveEditTask);
    addTaskForm.appendChild(taskSaveEditBtn);

    const taskDeleteBtn = document.createElement("button");
    taskDeleteBtn.type = "button";
    taskDeleteBtn.id = "taskDeleteBtn";
    taskDeleteBtn.innerHTML = "Delete";
    taskDeleteBtn.classList.add("formBtn");
    taskDeleteBtn.style.display = "none";
    taskDeleteBtn.addEventListener("click", taskDelete);
    addTaskForm.appendChild(taskDeleteBtn);

    const taskSubmitBtn = document.createElement("button");
    taskSubmitBtn.id = "taskSubmitBtn";
    taskSubmitBtn.type = "button";
    taskSubmitBtn.classList.add("formBtn");
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
    taskCancelBtn.classList.add("formBtn");
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

function taskDelete () {
    projects[selProject].tasks.splice(selTask, 1);

    let taskitems = document.querySelectorAll(".task-item");
    taskitems.forEach(item => item.remove());

    const taskSaveEditBtn = document.getElementById("taskSaveEditBtn");
    const taskDeleteBtn = document.getElementById("taskDeleteBtn");
    const taskSubmitBtn = document.getElementById("taskSubmitBtn");
    const addTaskDiv = document.getElementById("addTaskDiv");

    taskSaveEditBtn.style.display = "none";
    taskDeleteBtn.style.display = "none";
    taskSubmitBtn.style.display = "block";
    addTaskDiv.style.display = "none";

    displayTask();
}

function displayTask () {

    let taskitems = document.querySelectorAll(".task-item");
    taskitems.forEach(item => item.remove());

    for(let tnum = 0; tnum < projects[selProject].tasks.length; tnum++) {
        let taskli = document.createElement("li");
        taskli.setAttribute("data-taskid", tnum);
        taskli.innerHTML = projects[selProject].tasks[tnum].name;
        taskForm.appendChild(taskli).className = 'task-item';

        if (projects[selProject].tasks[tnum].completed) {
            taskli.classList.add("checked");
        } else {
            taskli.classList.remove("checked");
        }

        let editbtn = document.createElement("button");
        editbtn.innerHTML = "Edit Task";
        editbtn.style.display = "none";
        editbtn.addEventListener("click", (event) => {
            selTask = event.target.parentElement.dataset.taskid;
            editTask();
        });

        let compCheck = document.createElement("input");
        compCheck.type = "checkbox";
        compCheck.style.display = "none";
        compCheck.addEventListener('change', (event) => {
            selTask = event.target.parentElement.dataset.taskid;
            if(compCheck.checked) {
                projects[selProject].tasks[selTask].completed = true;
                taskli.classList.add("checked");
            } else {
                projects[selProject].tasks[selTask].completed = false;
                taskli.classList.remove("checked");
            }
        })

        taskli.addEventListener("mouseover", () => {
            editbtn.style.display = "inline-block";
            compCheck.style.display = "inline-block";
        })

        taskli.addEventListener("mouseout", () => {
            editbtn.style.display = "none";
            compCheck.style.display = "none";
        })

        let taskitems = document.querySelectorAll(".task-item");
        taskitems.forEach(item => item.appendChild(editbtn).className = "taskeditbtn");
        taskitems.forEach(item => item.appendChild(compCheck).className = "compCheck");
    }

}

function editTask() {
    const addTaskDiv = document.getElementById("addTaskDiv");
    addTaskDiv.style.display = "block";

    const taskNameInput = document.getElementById("taskNameInput");
    taskNameInput.value = projects[selProject].tasks[selTask].name;

    const duedate = document.getElementById("duedate");
    duedate.value = projects[selProject].tasks[selTask].duedate;

    const taskNotes = document.getElementById("taskNotes");
    taskNotes.value = projects[selProject].tasks[selTask].notes;

    const taskSaveEditBtn = document.getElementById("taskSaveEditBtn");
    taskSaveEditBtn.style.display = "block";

    const taskDeleteBtn = document.getElementById("taskDeleteBtn");
    taskDeleteBtn.style.display = "block";

    const taskSubmitBtn = document.getElementById("taskSubmitBtn");
    taskSubmitBtn.style.display = "none";
}

function saveEditTask() {
    projects[selProject].tasks[selTask].name = taskNameInput.value;
    projects[selProject].tasks[selTask].duedate = duedate.value;
    projects[selProject].tasks[selTask].notes = taskNotes.value;

    taskNameInput.value = "";
    duedate.value = "";
    taskNotes.value = "";

    let taskitems = document.querySelectorAll(".task-item");
    taskitems.forEach(task => task.remove());

    const taskSaveEditBtn = document.getElementById("taskSaveEditBtn");
    const taskDeleteBtn = document.getElementById("taskDeleteBtn");
    const taskSubmitBtn = document.getElementById("taskSubmitBtn");
    const addTaskDiv = document.getElementById("addTaskDiv");

    taskSaveEditBtn.style.display = "none";
    taskDeleteBtn.style.display = "none";
    taskSubmitBtn.style.display = "block";
    addTaskDiv.style.display = "none";

    displayTask();
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
    projectFormCloseBtn.classList.add("formBtn");
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
    submitbtn.classList.add("formBtn");
    submitbtn.innerHTML = "Submit";
    submitbtn.addEventListener("click", () => {
    addNewProject();
    projectFormDiv.style.display = "none";
    });
    projectForm.appendChild(submitbtn);

    const cancelbtn = document.createElement("button");
    cancelbtn.innerHTML = "Cancel";
    cancelbtn.id = "projectcancelbtn";
    cancelbtn.classList.add("formBtn");
    cancelbtn.type = "button";
    cancelbtn.addEventListener('click', cancelForm);
    projectForm.appendChild(cancelbtn);

    const deletebtn = document.createElement("button");
    deletebtn.innerHTML = "Delete";
    deletebtn.id = "projectdeletebtn";
    deletebtn.classList.add("formBtn");
    deletebtn.type = "button";
    deletebtn.style.display = "none";
    deletebtn.addEventListener("click", deleteProject);
    projectForm.appendChild(deletebtn);

    const saveeditbtn = document.createElement("button");
    saveeditbtn.type = "button";
    saveeditbtn.id = "projectsaveeditbtn";
    saveeditbtn.innerHTML = "Save Edit";
    saveeditbtn.classList.add("formBtn");
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
        document.getElementById("taskFormHeader").innerHTML = projects[selProject].name;
        displayTask();
    }))
}

function editProject () {

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

function showSavedProjects(arr) {
    if (arr) {
        projects = JSON.parse(arr);
        i = arr.length;
        console.log("yes");
    } else {
        projects = [];
        console.log("no");
    }
}

function saveProjects() {
    savedJSON = (JSON.stringify(projects));
    localStorage.setItem('storedProjects', savedJSON);
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

    document.getElementById("saveProjectsBtn").style.display = "block";
    saveProjectsBtn.addEventListener("click", saveProjects, {once: true});

    const storedProjects = localStorage.getItem('storedProjects');

    showSavedProjects(storedProjects);
    displayProject();
}

export default loadProjects;