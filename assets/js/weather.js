/* VARIABLES */
const submitBtn = document.querySelector(".submit");
const weatherCard = document.querySelector(".output-card");
const fiveDayCard = document.querySelector(".five-day-card");
const weatherHead = document.querySelector(".output-card-head");
const weatherBody = document.querySelector(".output-card-body");
const ul = document.querySelector("ul");

/* FUNCTIONS */
/* Populates screen with forecast details */
function handleSubmit(event) {
    event.preventDefault();

    weatherCard.innerHTML = ""  // Clear content from last search
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

        // Console log if error
        .catch(error => {console.log('Error fetching the weather data:', error)})

    document.querySelector("#input-city").value = "";  // Clear input value
}

/* Display weather forecast */
function getSearchForecast(response) {
    console.log(response);

    weatherCard.classList.remove('hidden');
    weatherCard.append(weatherHead);
    weatherCard.append(weatherBody);


    fiveDayCard.classList.remove('hidden');

    // Create elements
    const today = response.list[0];
    const name = document.createElement('h3');
    const date = document.createElement('h3');
    const temp = today.main.temp;
    const celcius = document.createElement('p');
    const fahrenheit = document.createElement('p');
    const humidity = document.createElement('p');
    const wind = document.createElement('p');

    // Build elements
    name.textContent = response.city.name;
    date.textContent = dayjs.unix(today.dt).format('dddd, MMM D, YYYY');
    celcius.textContent = `Current temp: ${Math.round(temp - 273.15)} °C`
    fahrenheit.textContent = `Current temp: ${Math.round((temp - 273.15) * 9/5 + 32)} °F`;
    humidity.textContent = `Humidity: ${today.main.humidity}%`;
    wind.textContent = `Wind: ${today.wind.speed} mph`;

    // Place elements
    weatherHead.append(name);
    weatherHead.append(date)
    weatherBody.append(celcius);
    weatherBody.append(fahrenheit);
    weatherBody.append(humidity);
    weatherBody.append(wind);
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
//localStorage.setItem("recentCities", JSON.stringify([]));
