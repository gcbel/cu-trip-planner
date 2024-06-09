//api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=73e3e96b49fb7822dadb93b5d873f6a4
/* VARIABLES */
const city = document.querySelector("#inputCity");
const submitBtn = document.querySelector(".submit");

/* FUNCTIONS */
function getForecast(e) {
    e.preventDefault();
    fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=73e3e96b49fb7822dadb93b5d873f6a4`)
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
        },
        (error) => {
          alert("Error in fetching weather data : " + error.message);
        }
      );
  }

/* EVENT LISTENERS */
submitBtn.addEventListener('click', getForecast);