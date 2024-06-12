/* VARIABLES */
const quebec = document.querySelector('#quebec');
const newOrleans = document.querySelector('#new-orleans');
const sanFrancisco = document.querySelector('#san-francisco');

/* FUNCTIONS */
function navigate (city) {
    window.location.href = `weather.html`;
    localStorage.setItem("featured", city);
}

/* EVENT LISTENER */
quebec.addEventListener('click', () => navigate("quebec city"));
newOrleans.addEventListener('click', () => navigate("new orleans"));
sanFrancisco.addEventListener('click', () => navigate("san francisco"));