(()=>{"use strict";function e(e,t){const n=document.createElement("button");return n.id=e,n.innerHTML=t,n.classList.add("tab"),n}let t=0,n=[];class o{constructor(e,t,n,o){this.name=e,this.description=t,this.priority=n,this.tasks=o}}function c(){n.splice(pnum,1),alert("Item was removed"),document.querySelectorAll(".project-item").forEach((e=>e.remove())),i()}function d(){projectNameInput.value="",projectDescriptionInput.value="",projectForm.style.display="none"}function i(){for(let e=0;e<n.length;e++){let t=document.createElement("div");t.setAttribute("data-projid",e),t.innerHTML="<h2>"+n[e].name+"</h2>",projectList.appendChild(t).className="project-item";let o=document.createElement("button");o.innerHTML="Edit Project",o.classList="edit",o.addEventListener("click",r),projectNameInput.value=n[e].name,projectDescriptionInput.value=n[e].description,document.querySelectorAll(".project-item").forEach((e=>e.appendChild(o).className="editbtn"))}let e=document.querySelectorAll(".project-item");e.forEach((e=>e.addEventListener("mouseover",(function(){let e=document.querySelectorAll(".project-item"+this.dataset.projid);for(let t of e)t.style.display="inline-block"})))),e.forEach((e=>e.addEventListener("mouseout",(function(){let e=document.querySelectorAll(".project-item"+this.dataset.projid);for(let t of e)t.style.display="none"}))))}function r(e){const t=document.getElementById("projectForm");t.style.display="block",document.getElementById("projectNameInput").value=n[e.target.parentElement.dataset.projid].name,document.getElementById("projectDescriptionInput").value=n[e.target.parentElement.dataset.projid].description,document.getElementById("submitbtn").style.display="none";const o=document.createElement("button");o.type="button",o.is="saveeditbtn",o.innerHTML="Save Edit",o.addEventListener("click",(()=>{n[e.target.parentElement.dataset.projid].name=document.getElementById("projectNameInput").value,n[e.target.parentElement.dataset.projid].description=document.getElementById("projectDescriptionInput").value,document.getElementById("projectNameInput").value="",document.getElementById("projectDescriptionInput").value="",t.style.display="none",document.querySelectorAll(".project-item").forEach((e=>e.remove())),i()})),t.appendChild(o),document.getElementById("deletebtn").style.display="block"}const l=function(){const e=document.getElementById("main"),r=function(){const e=document.createElement("section"),t=document.createElement("h2");t.innerHTML="Your Projects",t.id="projectHeader",e.appendChild(t);const n=document.createElement("section");n.id="projectList",e.appendChild(n);const o=document.createElement("button");return o.innerHTML="Add a new Project",o.addEventListener("click",(()=>{document.querySelector("#projectForm").style.display="block"})),e.appendChild(o),e}(),l=function(){const e=document.createElement("form");e.style.display="none",e.id="projectForm";const r=document.createElement("button");r.innerHTML="X",r.addEventListener("click",d),e.appendChild(r);const l=document.createElement("label");l.innerHTML="Enter a name for your project:",l.htmlFor="projectNameInput",e.appendChild(l);const a=document.createElement("input");a.id="projectNameInput",e.appendChild(a);const m=document.createElement("label");m.htmlFor="projectDescriptionInput",m.innerHTML="Enter a description for your project:",e.appendChild(m);const u=document.createElement("input");u.id="projectDescriptionInput",e.appendChild(u);const p=document.createElement("button");p.type="button",p.id="submitbtn",p.innerHTML="Submit",p.addEventListener("click",(()=>{!function(){const e=document.getElementById("projectNameInput").value,c=document.getElementById("projectDescriptionInput").value;n[t]=new o(e,c,t,[]),t++,document.getElementById("projectNameInput").value="",document.getElementById("projectDescriptionInput").value="",i()}(),e.style.display="none"})),e.appendChild(p);const s=document.createElement("button");s.innerHTML="Cancel",s.addEventListener("click",d),e.appendChild(s);const E=document.createElement("button");return E.innerHTML="Delete",E.id="deletebtn",E.addEventListener("click",c),E.style.display="none",e.appendChild(E),e}();e.innerHTML="",function(e){const t=document.querySelector(".tab.active");t&&t.classList.remove("active"),document.getElementById("projectsSB").classList.add("active")}(),e.appendChild(r),e.appendChild(l)},a=function(){const e=document.getElementById("main"),t=function(){const e=document.createElement("section"),t=document.createElement("h2");t.innerHTML="About Noteriety",t.id="aboutUsHeader",e.appendChild(t);const n=document.createElement("p");return n.innerHTML="In a constantly evolving world, we're here to help you make sense of the madness. Introducing Noteriety, to help you keep track of the daily bustle.",n.id="aboutUsInfo",e.appendChild(n),e}();e.innerHTML="",function(e){const t=document.querySelector(".tab.active");t&&t.classList.remove("active"),document.getElementById("home").classList.add("active")}(),e.appendChild(t)};(function(){const t=document.getElementById("content"),n=function(){const e=document.createElement("header");return e.id="header",e.innerHTML="Noteriety",e}();t.appendChild(n);const o=function(){const t=document.createElement("div");t.id="sidebar";const n=e("home","Home"),o=e("projectsSB","Projects");return t.appendChild(n),t.appendChild(o),t}();t.appendChild(o);const c=function(e){const t=document.createElement("main");return t.id="main",t}();t.appendChild(c)})(),l(),function(){const e=document.getElementById("home"),t=document.getElementById("projectsSB");e.addEventListener("click",a),t.addEventListener("click",l)}()})();