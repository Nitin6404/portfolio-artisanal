/* -----------------------------------------
  Have focus outline only for keyboard users 
 ---------------------------------------- */

const handleFirstTab = (e) => {
  if (e.key === "Tab") {
    document.body.classList.add("user-is-tabbing");

    window.removeEventListener("keydown", handleFirstTab);
    window.addEventListener("mousedown", handleMouseDownOnce);
  }
};

const handleMouseDownOnce = () => {
  document.body.classList.remove("user-is-tabbing");

  window.removeEventListener("mousedown", handleMouseDownOnce);
  window.addEventListener("keydown", handleFirstTab);
};

window.addEventListener("keydown", handleFirstTab);

const backToTopButton = document.querySelector(".back-to-top");
let isBackToTopRendered = false;

let alterStyles = (isBackToTopRendered) => {
  backToTopButton.style.visibility = isBackToTopRendered ? "visible" : "hidden";
  backToTopButton.style.opacity = isBackToTopRendered ? 1 : 0;
  backToTopButton.style.transform = isBackToTopRendered
    ? "scale(1)"
    : "scale(0)";
};

window.addEventListener("scroll", () => {
  if (window.scrollY > 700) {
    isBackToTopRendered = true;
    alterStyles(isBackToTopRendered);
  } else {
    isBackToTopRendered = false;
    alterStyles(isBackToTopRendered);
  }
});

// Cursor

const cursorDot = document.querySelector(".cursor-dot");
const cursorOutline = document.querySelector(".cursor-outline");

window.addEventListener("mousemove", (e) => {
  const posX = e.clientX;
  const posY = e.clientY;

  cursorDot.style.left = `${posX}px`;
  cursorDot.style.top = `${posY}px`;

  // cursorOutline.style.left = `${posX}px`;
  // cursorOutline.style.top = `${posY}px`;

  cursorOutline.animate(
    {
      left: `${posX}px`,
      top: `${posY}px`,
    },
    {
      duration: 500,
      fill: "forwards",
    }
  );
});

// Filter functionality for portfolio projects
const filterButtons = document.querySelectorAll(".filter-btn");
const webDevProjects = document.querySelectorAll(".web-development__box");
const uiUxProjects = document.querySelectorAll(".ui__box");

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Remove active class from all buttons
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    // Add active class to the clicked button
    button.classList.add("active");

    // Determine which projects to show based on the button clicked
    if (button.textContent.includes("Web Applications")) {
      webDevProjects.forEach((project) => {
        project.style.display = "block"; // Show web development projects
      });
      uiUxProjects.forEach((project) => {
        project.style.display = "none"; // Hide UI/UX projects
      });
    } else if (button.textContent.includes("UI/UX")) {
      webDevProjects.forEach((project) => {
        project.style.display = "none"; // Hide web development projects
      });
      uiUxProjects.forEach((project) => {
        project.style.display = "block"; // Show UI/UX projects
      });
    } else {
      // If other filters are clicked, show all projects (optional)
      webDevProjects.forEach((project) => {
        project.style.display = "block"; // Show all web development projects
      });
      uiUxProjects.forEach((project) => {
        project.style.display = "block"; // Show all UI/UX projects
      });
    }
  });
});
