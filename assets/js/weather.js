/* VARIABLES */
const submitBtn = document.querySelector(".submit");
const mainCard = document.querySelector(".output-card");
const weekCard = document.querySelector(".five-day-cont");
const ul = document.querySelector("ul");
const NUMDAYS = 40;

/* FUNCTIONS */
/* Handles fetching forecast details */
function handleSubmit(event) {
    event.preventDefault();

    mainCard.innerHTML = ""  // Clear content from last search
    weekCard.innerHTML = ""
    const city = document.querySelector("#input-city").value;  // Get city input

    fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=73e3e96b49fb7822dadb93b5d873f6a4`)
        .then((response) => {
            if (!response.ok) {throw new Error(`Status: ${response.status}`)}
            return response.json();
        })

        // Store successful response information and get forecast
        .then((response) => {
            createLi(city);
            let recentCities = JSON.parse(localStorage.getItem("recentCities")) || [];
            recentCities.push(city)
            localStorage.setItem("recentCities", JSON.stringify(recentCities));
            getSearchForecast(response)
        })

        // Send error message if error
        .catch(error => {
            console.log('Error fetching the weather data:', error)
            mainCard.classList.remove('hidden');
            weekCard.classList.add('hidden');
            const errorMessage = document.createElement('h4');
            errorMessage.textContent = `Sorry, I haven't heard of any cities called ${city}. Please try again.`
            mainCard.append(errorMessage);
        })

    document.querySelector("#input-city").value = "";  // Clear input value
}

/* Display all days of weather forecasts */
function getSearchForecast(response) {
    console.log(response);

    // Make cards visible
    mainCard.classList.remove('hidden');
    weekCard.classList.remove('hidden');

    // Display location name
    const name = document.createElement('h3');
    name.textContent = response.city.name;
    mainCard.append(name);

    // Populate main card data
    const timezone = response.city.timezone
    getDayForecast(response.list[0], mainCard, timezone);

    // Display weather info between 11 and 3 pm for each day
    for (let i = 0; i < NUMDAYS; i++) {
        const time = dayjs.unix(response.list[i].dt + timezone)
        if (11 < time.$H && time.$H <= 14 && time.$m === 0) {
            const weekdayCard = document.createElement('div');
            weekdayCard.classList.add('card', 'output-card', 'five-day-card');
            getDayForecast(response.list[i], weekdayCard, timezone);
            weekCard.append(weekdayCard);
        }
    }
}

/* Display weather forecast for a single day */
function getDayForecast(today, card, timezone) {

    // Create elements
    const date = document.createElement('h3');
    const temp = document.createElement('p');
    const tempNum = today.main.temp;
    const humidity = document.createElement('p');
    const wind = document.createElement('p');

    // Build elements
    date.textContent = dayjs.unix(today.dt + timezone).format('ddd, MMM D, YYYY h:mm A');
    temp.textContent = `Temp: ${Math.round(tempNum - 273.15)} °C, ${Math.round((tempNum - 273.15) * 9/5 + 32)} °F`;
    humidity.textContent = `Humidity: ${today.main.humidity}%`;
    wind.textContent = `Wind: ${today.wind.speed} mph`;

    // Place elements
    card.append(date);
    card.append(temp);
    card.append(humidity);
    card.append(wind);
}

/* Adds all searched citites to recently searched dropdown list */
function handleRecents(event) {
    const recentCities = JSON.parse(localStorage.getItem("recentCities")) || [];
    for (const index in recentCities) {
        const city = recentCities[index];
        createLi(city);
    }
}

/* Adds a city to recently searched dropdown list */
function createLi(city) {
    const li = document.createElement('li');
    li.textContent = city;
    ul.insertBefore(li, ul.firstChild);
}

/* EVENT LISTENERS */
submitBtn.addEventListener('click', handleSubmit);
window.onload = handleRecents;

// Uncomment to clear storage
// localStorage.setItem("recentCities", JSON.stringify([]));