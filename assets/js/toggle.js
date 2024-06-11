/* VARIABLES */
const toggle = document.querySelector(".toggle");
const toggleIcon = document.querySelector("#toggle-icon");
const container = document.querySelector('.container');
const backgroundImg = document.querySelector('.background');

/* FUNCTIONS */
/* Set theme upon switching from main and blog pages according to last mode */
function setColor() {
    if (mode === "light") {
        container.setAttribute('class', 'light');
        if (backgroundImg) {
            backgroundImg.src = "assets/images/home-light.jpg";
            backgroundImg.style.opacity = "0.7";
            document.documentElement.style.backgroundColor = 'var(--accentblue)'
        } else {
            document.documentElement.style.backgroundColor = 'var(--primaryblue)'
        }
        toggleIcon.classList.remove("fa-sun");
        toggleIcon.classList.add("fa-moon");
    } else {
        container.setAttribute('class', 'dark');
        if (backgroundImg) {
            backgroundImg.src = "assets/images/home-dark.jpg";
            backgroundImg.style.opacity = "0.85";
            document.documentElement.style.backgroundColor = 'var(--accentgray)'
        } else {
            document.documentElement.style.backgroundColor = 'black'
        }
        toggleIcon.classList.remove("fa-moon");
        toggleIcon.classList.add("fa-sun");
    }
}

/* Change theme from light to dark or vice versa */
function toggleColor (event) {
    if (mode === "light") {
        mode = "dark";
        localStorage.setItem("mode", mode);
    } else {
        mode = "light";
        localStorage.setItem("mode", mode);
    }
    setColor();
}

/* INITIALIZERS */
/* Get user's preferred light/dark mode and move to local storage*/
let mode = localStorage.getItem("mode");
if (mode !== null) {
} else if (window.matchMedia && window.matchMedia("prefers-color-scheme: dark").matches) {
    mode = "dark";
    localStorage.setItem("mode", mode);
} else {
    mode = "light";
    localStorage.setItem("mode", mode);
}
setColor();

/* EVENT LISTENER */
/* Theme toggle event listener */
toggle.addEventListener('click', toggleColor); 