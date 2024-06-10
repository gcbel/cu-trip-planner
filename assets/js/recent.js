/* VARIABLES */
const recentSearches = document.querySelector('ul');

/* FUNCTIONS */
function getRecentSearch(event) {
    EventTarget(event);
}

/* EVENT LISTENERS */
recentSearches.addEventListener('click', getRecentSearch);