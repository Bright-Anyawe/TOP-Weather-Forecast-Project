const menuEl = document.querySelector("#child-container");
const projectsContainer = document.querySelector("#projects");
const closeEl = document.querySelector('.close');

//Display task in block
menuEl.addEventListener(
  "click",
  () => { projectsContainer.style.display = "block" }
);

closeEl.addEventListener(
  "click",
  () => (projectsContainer.style.display = "none")
);
