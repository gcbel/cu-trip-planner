//api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid=73e3e96b49fb7822dadb93b5d873f6a4
/* VARIABLES */
const submitBtn = document.querySelector(".submit");

/* FUNCTIONS */
function getForecast(e) {
    e.preventDefault();
    const city = document.querySelector("#input-city").value;
    fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=73e3e96b49fb7822dadb93b5d873f6a4`)
        .then((response) => response.json())
        .then((response) => {
          console.log(response);
        },
        (error) => {alert("Error: " + error.message)}
      );
  }

/* EVENT LISTENERS */
submitBtn.addEventListener('click', getForecast);