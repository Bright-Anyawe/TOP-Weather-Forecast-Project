const form = document.querySelector("#form");
console.log(form);
let locationInputField = document.querySelector("#input");
const submitLocationBtn = document.querySelector("#submitLocation");
const currentWeatherInfo = document.querySelector(".currentWeatherInfo");

const countryEl = document.querySelector(".countryEl");
const temperatureEl = document.querySelector(".tempEl");
const windDirEl = document.querySelector(".windDirEl");
const windDirInDegreeEl = document.querySelector(".windDirInDegree");
const feelLikeEl = document.querySelector(".feelLikeEl");
const weatherIconEl = document.querySelector(".weatherIconEl");
const currentWeatherHumidityEl = document.querySelector(
  ".currentWeatherHumidityEl"
);
const barometricPressureEl = document.querySelector(".barometricPressureEl");
const currentVisibilityEl = document.querySelector(".currentVisibilityEl");
const currentWeatherLastUpdateEl = document.querySelector(
  ".currentWeatherLastUpdateEl"
);
const currentWeatherPrecipitationEl = document.querySelector(
  ".currentWeatherPrecipitationEl"
);

function getUserInput() {
  let userInput = locationInputField.value;

  return userInput;
}
locationInputField.addEventListener("input", getUserInput);

//Get Location From Api
async function getLocation() {
  const userLocation = getUserInput();
  console.log(userLocation);

  try {
    const response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=9a516bc9012848759a5102735242906&q=${userLocation}&days=2`,
      { mode: "cors" }
    );
    const location = await response.json();
    console.log(location);

    const country = location.location.country;
    const locationName = location.location.name;

    const temperature = location.current.temp_c;
    const windDirection = location.current.wind_dir;
    const windDirInDegree = location.current.wind_degree;
    const feelLikeCondition = location.current.feelslike_c;
    const weatherIcon = location.current.condition.icon;
    const weatherIconText = location.current.condition.text;
    const currentWeatherHumidity = location.current.humidity;
    const BarometricPressure = location.current.pressure_mb;
    const currentVisibility = location.current.vis_km;
    const currentWeatherLastUpdate = location.current.last_updated;
    const currentWeatherPrecipitation = location.current.precip_mm;

    const foreCastDay = location.forecast.forecastday;
    console.log(foreCastDay);

    const currentWeatherObj = location.current;
    console.log(currentWeatherObj);
    //Get objects for the 7 weeks
    // let day1 = foreCastDay[0];
    // let day2 = foreCastDay[1];
    // let day3 = foreCastDay[2];
    // let day4 = foreCastDay[3];
    // let day5 = foreCastDay[4];
    // let day6 = foreCastDay[5];
    // let day7 = foreCastDay[6];

    // console.log(day1)
    // console.log(day1.astro.sunrise)
    // console.log(day1.astro.sunset)
    // console.log(day1.astro.moonrise)
    // console.log(day1.astro.moonset)
    // console.log(day1.date)
    // console.log(day1.day.avghumidity)
    // console.log(day1.day.avgtemp_c)
    // console.log(day1.day.avgvis_km)
    // console.log(day1.day.condition.icon)
    // console.log(day1.day.condition.text)

    // console.log(day1.day.daily_chance_of_rain)
    // console.log(day1.day.daily_chance_of_snow)
    // console.log(day1.day.daily_will_it_rain)
    // console.log(day1.day.daily_will_it_snow)
    // console.log(day1.day.maxtemp_c)
    // console.log(day1.day.maxwind_mph)
    // console.log(day1.day.totalprecip_mm)
    // console.log(day1.day.totalsnow_cm)
    // console.log(day1.hour)
    // let day1Hours = day1.hour;
    // console.log(day1Hours);

    // for(hour in day1Hours) {
    //   console.log(hour)
    //   let dayHour = hour;
    //   console.log(dayHour)
    // }

    // const countryEl = document.createElement('p');
    // currentWeatherInfo.textContent = `${country}-${locationName}:`;
    countryEl.textContent = `${country}-${locationName}:`;
    temperatureEl.textContent = ` temp in celsius: ${temperature}°`;
    windDirEl.textContent = ` wind direction: ${windDirection}°`;
    windDirInDegreeEl.textContent = ` wind direction in degrees celsius: ${windDirInDegree}°`;
    feelLikeEl.textContent = `feel like conditon in celsius: ${feelLikeCondition}°`;
    weatherIconEl.textContent = `Day condition icon: ${weatherIcon}`;
    currentWeatherHumidityEl.textContent = `Daily humidity condition of the weather: ${currentWeatherHumidity}%`;
    barometricPressureEl.textContent = `Daily barometric pressure condition of the weather: ${BarometricPressure}mb`;
    currentVisibilityEl.textContent = `Daily weather visibility condition in kilometer: ${currentVisibility}km`;
    currentWeatherLastUpdateEl.textContent = `Daily weather lastly update condition: ${currentWeatherLastUpdate}`;
    currentWeatherPrecipitationEl.textContent = `Daily weather precipitation condition in milimeters: ${currentWeatherPrecipitation}mm`;

    // currentWeatherInfo.appendChild(countryEl)
    // currentWeatherInfo.appendChild(countryEl)
    console.log(temperature);

  } catch {
    console.log("Location not found!");
  }
}

// function getLocation() {
//   const userLocation = getUserInput();
//   console.log(userLocation);

//   fetch(
//     `https://api.weatherapi.com/v1/forecast.json?key=9a516bc9012848759a5102735242906&q=${userLocation}&days=2`,
//     { mode: "cors" }
//   )
//     .then(function (response) {
//       return response.json();
//     })
//     .then(function (location) {
//       console.log(location);

//       const country = location.location.country;
//       const locationName = location.location.name;

//       const temperature = location.current.temp_c;
//       const windDirection = location.current.wind_dir;
//       const windDirInDegree = location.current.wind_degree;
//       const feelLikeCondition = location.current.feelslike_c;
//       const weatherIcon = location.current.condition.icon;
//       const weatherIconText = location.current.condition.text;
//       const currentWeatherHumidity = location.current.humidity;
//       const barometricPressure = location.current.pressure_mb;
//       const currentVisibility = location.current.vis_km;
//       const currentWeatherLastUpdate = location.current.last_updated;
//       const currentWeatherPrecipitation = location.current.precip_mm;

//       const foreCastDay = location.forecast.forecastday;

//       return {
//         country,
//         locationName,
//         temperature,
//         windDirection,
//         windDirInDegree,
//         feelLikeCondition,
//         weatherIcon,
//         weatherIconText,
//         currentWeatherHumidity,
//         barometricPressure,
//         currentVisibility,
//         currentWeatherLastUpdate,
//         currentWeatherPrecipitation,
//         foreCastDay,
//       };
//     })
//     .catch((err) => {
//       console.log("Location not found!");
//     });
// }

// function displayCurrentWeatherInfo() {
//   const country = getLocation().country;
//   const locationName = getLocation().locationName;
//   const temperature = getLocation().temperature;
//   const windDirection = getLocation().windDirection;
//   const windDirInDegree = getLocation().windDirInDegree;

//   // const countryEl = document.createElement('p');
//   // currentWeatherInfo.textContent = `${country}-${locationName}:`;
//   countryEl.textContent = `${country}-${locationName}:`;
//   temperatureEl.textContent = ` temp in celsius: ${temperature}°`;
//   windDirEl.textContent = ` wind direction: ${windDirection}°`;
//   windDirInDegreeEl.textContent = ` wind direction in degrees celsius: ${windDirInDegree}°`;
//   feelLikeEl.textContent = `feel like conditon in celsius: ${feelLikeCondition}°`;
//   weatherIconEl.textContent = `Day condition icon: ${weatherIcon}`;
//   currentWeatherHumidityEl.textContent = `Daily humidity condition of the weather: ${currentWeatherHumidity}%`;
//   barometricPressureEl.textContent = `Daily barometric pressure condition of the weather: ${BarometricPressure}mb`;
//   currentVisibilityEl.textContent = `Daily weather visibility condition in kilometer: ${currentVisibility}km`;
//   currentWeatherLastUpdateEl.textContent = `Daily weather lastly update condition: ${currentWeatherLastUpdate}`;
//   currentWeatherPrecipitationEl.textContent = `Daily weather precipitation condition in milimeters: ${currentWeatherPrecipitation}mm`;
// }

function submitForm(event) {
  event.preventDefault();
  getUserInput();
  getLocation();
  // displayCurrentWeatherInfo();

  locationInputField.value = "";
}
form.addEventListener("submit", submitForm);
