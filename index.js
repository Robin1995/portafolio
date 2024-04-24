const threshold = 0;
const navigation = document.querySelector(".navigation");
window.onload = () => {
  document.querySelector(".toggle").onclick = function () {
    this.classList.toggle("active");
    navigation.classList.toggle("active");
  };
  document.querySelector(".theme").onclick = function () {
    document.body.classList.toggle("theme-light");
  };
  document.querySelectorAll(".project").forEach((element) => {
    element.addEventListener("click", (e) => openModal(e));
  });
  document.querySelector(".arrow-right").addEventListener("click", clickRight);
  document.querySelector(".arrow-left").addEventListener("click", clickLeft);
  document.querySelector(".form").addEventListener("submit", handleSubmit);
  document.body.addEventListener("click", (e) => closeModal(e));
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: light)").matches
  ) {
    document.body.classList.toggle("theme-light");
  }
  const observer = new IntersectionObserver(navigationStiky, {
    rootMargin: "0px",
    threshold: threshold,
  });
  const section = document.querySelector(".subtitle");
  const mediaQuery = window.matchMedia("(min-width: 780px)");
  if (mediaQuery && mediaQuery.matches) {
    observer.observe(section);
  }

  mediaQuery.addEventListener("change", (e) => {
    if (e.matches) {
      observer.observe(section);
    } else {
      observer.unobserve(section);
      navigation.style.position = "absolute";
      navigation.style.top = "20px";
    }
  });
};
function navigationStiky(entries) {
  const entry = entries[0];
  const noVisible = !entry.isIntersecting && entry.intersectionRatio < 1;
  if (noVisible) {
    navigation.style.position = "fixed";
    navigation.style.top = 0;
  } else {
    navigation.style.position = "static";
  }
}
/** Esta funcion se llama cuando la persona hace click en la fecha derecha del carousel para navegar a la derecha */
function clickRight() {
  const currentLeft = parseInt(
    getComputedStyle(document.querySelector(".project-container")).left,
    10
  );
  if (currentLeft < -810 && screen.width < 420) {
    //si el valor de izquierda es menor a -810, para de mover el contenido
    return;
  }
  if (currentLeft < -270 && screen.width > 420) {
    //si el valor de izquierda es menor a -270, para de mover el contenido
    return;
  }
  let newValue = currentLeft - 270; //270 toma en cuenta el tamaño de la imagen mas sus margines
  document.querySelector(".project-container").style.left = `${newValue}px`;
  switch (newValue) {
    case -270:
      document.querySelector(".project1").setAttribute("tabindex", "-1");
      document
        .querySelector(".project1-container")
        .setAttribute("aria-hidden", true);
      document.querySelector(".project4").removeAttribute("tabindex");
      document
        .querySelector(".project4-container")
        .removeAttribute("aria-hidden");
      break;
    case -540:
      document.querySelector(".project2").setAttribute("tabindex", "-1");
      document
        .querySelector(".project2-container")
        .setAttribute("aria-hidden", "true");
      document.querySelector(".project5").removeAttribute("tabindex");
      document
        .querySelector(".project5-container")
        .removeAttribute("aria-hidden");
      break;
    default:
      break;
  }
}

/** Esta funcion se llama cuando la persona hace click en la fecha izquierda del carousel para navegar a la izquierda */
function clickLeft() {
  const currentLeft = parseInt(
    getComputedStyle(document.querySelector(".project-container")).left,
    10
  );
  if (currentLeft === 0) {
    //si el valor de izquiera es 0, retornar para no seguir movierno el contenido
    return;
  }
  let newValue = currentLeft + 270;
  document.querySelector(".project-container").style.left = `${newValue}px`;
  switch (newValue) {
    case -270:
      document.querySelector(".project5").setAttribute("tabindex", "-1");
      document
        .querySelector(".project5-container")
        .setAttribute("aria-hidden", "true");
      document.querySelector(".project2").removeAttribute("tabindex");
      document
        .querySelector(".project2-container")
        .removeAttribute("aria-hidden");
      break;
    case 0:
      document.querySelector(".project4").setAttribute("tabindex", "-1");
      document
        .querySelector(".project4-container")
        .setAttribute("aria-hidden", "true");
      document.querySelector(".project1").removeAttribute("tabindex");
      document
        .querySelector(".project1-container")
        .removeAttribute("aria-hidden");
      break;
    default:
      break;
  }
}

function goToProject(project) {
  const redirects = [
    "https://robin1995.github.io/simple-page",
    "https://robin1995.github.io/batata-bit",
    "https://robin1995.github.io/angular-apirest",
    "https://robin1995.github.io/countdown",
    "https://codepen.io/RobinsonDev/full/GRxEKwG",
  ];
  window.open(redirects[project - 1]);
}

function openModal(e) {
  let project = e.target.parentElement.classList[0];
  project = `${project.slice(0, -1)}-${project.slice(-1)}`;
  const imageProject = document.querySelector(".modal-project-image");
  imageProject.setAttribute("src", `assets/img/${project}.png`);
  if (imageProject.classList.length == 2) {
    const classToDelete = Array.from(imageProject.classList)[1];
    imageProject.classList.remove(classToDelete);
    imageProject.classList.add(project);
  } else {
    imageProject.classList.add(project);
  }
  document.querySelector(".modal-container").style.display = "flex";
  document.getElementById("modal-header").focus();
}

/** Esta funcion se llama para cerrar el modal */
function closeModal(e) {
  if (e.target.className.includes("modal-project-image")) {
    const project = e.target.classList[1];
    goToProject(project.slice(-1));
  } else if (!e.target.className.includes("project")) {
    document.querySelector(".modal-container").style.display = "none";
  }
}

function handleSubmit(e) {
  e.preventDefault();
  const mailanchor = document.getElementById("mailanchor");
  const form = new FormData(this);
  console.log(form.get("name"));
  mailanchor.setAttribute(
    "href",
    `mailto:fercho.rod16@gmail.com?subject=${form.get("name")} ${form.get(
      "email"
    )}&body=${form.get("message")}`
  );
  mailanchor.click();
}
