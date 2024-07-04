const form = document.querySelector("#form");
console.log(form);
let locationInputField = document.querySelector("#input");
const img = document.querySelector("img");
const gifContainer = document.querySelector("#gifContainer");
const gifContainer2 = document.querySelector("#gifContainer2");

console.log(gifContainer);
const submitLocationBtn = document.querySelector("#searchLocation");
const currentWeatherInfo = document.querySelector(".currentWeatherInfo");

const countryEl = document.querySelector(".countryEl");
const temperatureEl = document.querySelector(".tempEl");
const temperatureBoldEl = document.querySelector(".boldTempEl");
const windDirEl = document.querySelector(".windDirEl");
const windDirInDegreeEl = document.querySelector(".windDirInDegree");
const feelLikeEl = document.querySelector(".feelLikeEl");
const weatherIconEl = document.querySelector(".weatherConditionImg");
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
//Get user Input
function getUserInput() {
  let userInput = locationInputField.value;

  return userInput;
}
locationInputField.addEventListener("input", getUserInput);

//Get Location From Api
async function getLocation() {
  const userLocation = getUserInput();
  console.log(userLocation);

  // try {
  const response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=9a516bc9012848759a5102735242906&q=${userLocation}&days=3`,
    { mode: "cors" }
  );
  const location = await response.json();
  console.log(location);

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

  // currentWeatherInfo.appendChild(countryEl)
  // currentWeatherInfo.appendChild(countryEl)
  // console.log(temperature);

  return location;

  // } catch {
  console.log("Location not found!");
  // }
}

//Get current weather info
function getCurrentWeatherConditon() {
  const weatherConditon = getLocation();
  weatherConditon.then((location) => {
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
    const currentWeatherPrecipitation = location.current.precip_mm;

    if (temperature <= 20) {
      fetch(
        `https://api.giphy.com/v1/gifs/translate?api_key=xUGeBWKikoUF1sOZRB6a37IK2KhrYt3e&s=rainy weather`,
        { mode: "cors" }
      )
        .then(function (response) {
          return response.json();
        })
        .then(function (response) {
          // img.src = response.data.images.original.url;
          gifContainer.style.backgroundImage = `url("${response.data.images.original.url}")`;
          gifContainer2.style.backgroundImage = `url("${response.data.images.original.url}")`;
        });
    } else if (temperature > 20) {
      fetch(
        `https://api.giphy.com/v1/gifs/translate?api_key=xUGeBWKikoUF1sOZRB6a37IK2KhrYt3e&s=sunny weather`,
        { mode: "cors" }
      )
        .then(function (response) {
          return response.json();
        })
        .then(function (response) {
          console.log(response);
          // img.src = response.data.images.original.url;
          gifContainer.style.backgroundImage = `url("${response.data.images.original.url}")`;
          gifContainer2.style.backgroundImage = `url("${response.data.images.original.url}")`;
        });
    }

    // const foreCastDay = location.forecast.forecastday;
    // console.log(foreCastDay);

    const currentWeatherObj = location.current;
    console.log(currentWeatherObj);
    const spanEl = document.createElement("span");

    countryEl.textContent = `${country}-${locationName}:`;
    temperatureEl.textContent = ` temp in °C: ${temperature}°C`;
    temperatureBoldEl.textContent = `${temperature}°`;
    spanEl.textContent = "c";
    temperatureBoldEl.appendChild(spanEl);

    windDirEl.textContent = ` wind dir: ${windDirection}°`;
    windDirInDegreeEl.textContent = ` wind direction in °C : ${windDirInDegree}°`;
    feelLikeEl.textContent = `feel like conditon in °C: ${feelLikeCondition}°`;
    weatherIconEl.src = weatherIcon;
    weatherIconEl.alt = weatherIconText;

    currentWeatherHumidityEl.textContent = `humidity: ${currentWeatherHumidity}%`;
    barometricPressureEl.textContent = ` barometric pressure: ${BarometricPressure}mb`;
    currentVisibilityEl.textContent = ` visibility in km: ${currentVisibility}km`;
    // currentWeatherLastUpdateEl.textContent = ` weather lastly update condition: ${currentWeatherLastUpdate}`;
    currentWeatherPrecipitationEl.textContent = `precipitation  in mm: ${currentWeatherPrecipitation}mm`;
  });
}

function getDayOneWeatherCondition() {
  const dayEl = document.querySelector(".day");
  const monthAndYearEl = document.querySelector(".month-year");

  const dayOneWeatherConditionImg = document.querySelector(
    ".dayOneWeatherConditionImg"
  );
  const dayOneboldTempEl = document.querySelector(".dayOneboldTempEl");

  const sunRiseEl = document.querySelector(".sunRiseNumber");
  const sunRiseTextEl = document.querySelector(".sunRise");

  const sunSetEl = document.querySelector(".sunSetNumber");
  const sunSetTextEl = document.querySelector(".sunSet");

  const moonRiseEl = document.querySelector(".moonRiseNumber");
  const moonRiseTextEl = document.querySelector(".moonRise");

  const moonSetEl = document.querySelector(".moonSetNumber");
  const moonSetTextEl = document.querySelector(".moonSet");

  const averageHumidityEl = document.querySelector(".averageHumidityNumber");
  const averageHumidityTextEl = document.querySelector(".averageHumidity");

  const averageTemperetureEl = document.querySelector(
    ".averageTemperatureNumber"
  );
  const averageTemperetureTextEl = document.querySelector(
    ".averageTemperature"
  );

  const averageVisibilityEl = document.querySelector(
    ".averageVisibilityNumber"
  );
  const averageVisibilityTextEl = document.querySelector(".averageVisibility");

  const dailyChanceOfRainEl = document.querySelector(
    ".dailyChanceOfRainNumber"
  );
  const dailyChanceOfRainTextEl = document.querySelector(".dailyChanceOfRain");
  const dailyChanceOfSnowEl = document.querySelector(
    ".dailyChanceOfSnowNumber"
  );
  const dailyChanceOfSnowTextEl = document.querySelector(".dailyChanceOfSnow");
  const currentWeatherHumidityTextEl = document.querySelector(
    ".currentWeatherHumidityElNumber"
  );
  const currentWeatherHumidityEl = document.querySelector(
    ".currentWeatherHumidityEl"
  );
  const dateEl = document.querySelector(".date");
  const dailyWillItRainEl = document.querySelector(".dailyWillItRainNumber");
  const dailyWillItRainTextEl = document.querySelector(".dailyWillItRain");

  const dailyWillItSnowEl = document.querySelector(".dailyWillItSnowNumber");
  const dailyWillItSnowTextEl = document.querySelector(".dailyWillItSnow");

  const totalPrecipEl = document.querySelector(".totalPrecipNumber");
  const totalPrecipTextEl = document.querySelector(".totalPrecip");

  const currentWeatherPrecipitationEl = document.querySelector(
    ".currentWeatherPrecipitationElNumber"
  );
  const currentWeatherPrecipitationTextEl = document.querySelector(
    ".currentWeatherPrecipitationEl"
  );
  const spanEl = document.createElement("span");

  const weatherConditon = getLocation();
  weatherConditon.then((location) => {
    const foreCastDay = location.forecast.forecastday;
    console.log(foreCastDay);

    //Get objects for the 7 weeks
    let day1 = foreCastDay[0];
    const date = day1.date;

    const dateObj = new Date(date);
    console.log(dateObj);

    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };

    const weekday = {
      weekday: "long",
    };

    // const day = options.weekday
    const day = dateObj.toLocaleDateString("en-Us", weekday);
    console.log(day);
    const fullDayInWeeks = dateObj.toLocaleDateString("en-Us", options);
    console.log(fullDayInWeeks);

    // let day2 = foreCastDay[1];
    // let day3 = foreCastDay[2];
    // let day4 = foreCastDay[3];
    // let day5 = foreCastDay[4];
    // let day6 = foreCastDay[5];
    // let day7 = foreCastDay[6];
    const sunRise = day1.astro.sunrise;
    const sunSet = day1.astro.sunset;
    const moonRise = day1.astro.moonrise;
    const moonSet = day1.astro.moonset;

    const averageHumidity = day1.day.avghumidity;
    const averageTempereture = day1.day.avgtemp_c;
    const averageVisibility = day1.day.avgvis_km;
    const weatherIcon = day1.day.condition.icon;
    const weatherText = day1.day.condition.text;
    const dailyChanceOfRain = day1.day.daily_chance_of_rain;
    const dailyChanceOfSnow = day1.day.daily_chance_of_snow;
    const dailyWillItRain = day1.day.daily_will_it_rain;
    const dailyWillItSnow = day1.day.daily_will_it_snow;
    const totalPrecip = day1.day.totalprecip_mm;
    let day1Hours = day1.hour;
    console.log(day1Hours);

    sunRiseEl.textContent = sunRise;
    sunRiseTextEl.textContent = "Sunrise";

    sunSetEl.textContent = sunSet;
    sunSetTextEl.textContent = "Sunset";

    moonRiseEl.textContent = moonRise;
    moonRiseTextEl.textContent = "Moonrise";

    moonSetEl.textContent = moonSet;
    moonSetTextEl.textContent = "Moonset";

    averageHumidityEl.textContent = `${averageHumidity}%`;
    averageHumidityTextEl.textContent = "Averagehumidity";

    averageTemperetureEl.textContent = `${averageTempereture}°C`;
    averageTemperetureTextEl.textContent = "AverageTemp";

    averageVisibilityEl.textContent = `${averageVisibility}km`;
    averageVisibilityTextEl.textContent = "Averagevisibility";

    dailyChanceOfRainEl.textContent = `${dailyChanceOfRain}%`;
    dailyChanceOfRainTextEl.textContent = "Daily chance of rain";

    dailyChanceOfSnowEl.textContent = `${dailyChanceOfSnow}%`;
    dailyChanceOfSnowTextEl.textContent = "Daily Chance Of Snow";

    dailyWillItRainEl.textContent = `${dailyWillItRain}%`;
    dailyWillItRainTextEl.textContent = `Daily It Will Rain`;

    dailyWillItSnowEl.textContent = `${dailyWillItRain}%`;
    dailyWillItSnowTextEl.textContent = `Daily It Will Snow`;

    dayEl.textContent = day;
    monthAndYearEl.textContent = fullDayInWeeks;
    dayOneWeatherConditionImg.src = weatherIcon;
    dayOneboldTempEl.textContent = `${averageTempereture}°`;
    spanEl.textContent = "c";
    dayOneboldTempEl.appendChild(spanEl);
    console.log(weatherIcon);

    // for(hour in day1Hours) {
    //   console.log(hour)
    //   let dayHour = hour;
    //   console.log(dayHour)
    // }

    // currentWeatherInfo.appendChild(countryEl)
    // currentWeatherInfo.appendChild(countryEl)
    // console.log(temperature);
  });
}

function getDayTwoWeatherCondition() {
  const dayEl = document.querySelector(".dayTwo");
  const monthAndYearEl = document.querySelector(".dayTwoMonth-year");

  const dayTwoWeatherConditionImg = document.querySelector(
    ".dayTwoWeatherConditionImg"
  );
  const dayTwoboldTempEl = document.querySelector(".dayTwoboldTempEl");

  const sunRiseEl = document.querySelector(".dayTwosunRiseNumber");
  const sunRiseTextEl = document.querySelector(".dayTwosunRise");

  const sunSetEl = document.querySelector(".dayTwosunSetNumber");
  const sunSetTextEl = document.querySelector(".dayTwosunSet");

  const moonRiseEl = document.querySelector(".dayTwomoonRiseNumber");
  const moonRiseTextEl = document.querySelector(".dayTwomoonRise");

  const moonSetEl = document.querySelector(".dayTwomoonSetNumber");
  const moonSetTextEl = document.querySelector(".dayTwomoonSet");

  const averageHumidityEl = document.querySelector(
    ".dayTwoaverageHumidityNumber"
  );
  const averageHumidityTextEl = document.querySelector(
    ".dayTwoaverageHumidity"
  );

  const averageTemperetureEl = document.querySelector(
    ".dayTwoaverageTemperatureNumber"
  );
  const averageTemperetureTextEl = document.querySelector(
    ".dayTwoaverageTemperature"
  );

  const averageVisibilityEl = document.querySelector(
    ".dayTwoaverageVisibilityNumber"
  );
  const averageVisibilityTextEl = document.querySelector(
    ".dayTwoaverageVisibility"
  );

  const dailyChanceOfRainEl = document.querySelector(
    ".dayTwodailyChanceOfRainNumber"
  );
  const dailyChanceOfRainTextEl = document.querySelector(
    ".dayTwodailyChanceOfRain"
  );
  const dailyChanceOfSnowEl = document.querySelector(
    ".dayTwodailyChanceOfSnowNumber"
  );
  const dailyChanceOfSnowTextEl = document.querySelector(
    ".dayTwodailyChanceOfSnow"
  );
  const currentWeatherHumidityTextEl = document.querySelector(
    ".dayTwocurrentWeatherHumidityElNumber"
  );
  const currentWeatherHumidityEl = document.querySelector(
    ".dayTwocurrentWeatherHumidityEl"
  );
  const dateEl = document.querySelector(".dayTwodate");
  const dailyWillItRainEl = document.querySelector(
    ".dayTwodailyWillItRainNumber"
  );
  const dailyWillItRainTextEl = document.querySelector(
    ".dayTwodailyWillItRain"
  );

  const dailyWillItSnowEl = document.querySelector(
    ".dayTwodailyWillItSnowNumber"
  );
  const dailyWillItSnowTextEl = document.querySelector(
    ".dayTwodailyWillItSnow"
  );

  const totalPrecipEl = document.querySelector(".dayTwototalPrecipNumber");
  const totalPrecipTextEl = document.querySelector(".dayTwototalPrecip");

  const currentWeatherPrecipitationEl = document.querySelector(
    ".dayTwocurrentWeatherPrecipitationElNumber"
  );
  const currentWeatherPrecipitationTextEl = document.querySelector(
    ".dayTwocurrentWeatherPrecipitationEl"
  );
  const spanEl = document.createElement("span");

  const weatherConditon = getLocation();
  weatherConditon.then((location) => {
    const foreCastDay = location.forecast.forecastday;
    console.log(foreCastDay);

    //Get objects for the 7 weeks
    let day2 = foreCastDay[1];
    const date = day2.date;

    const dateObj = new Date(date);
    console.log(dateObj);

    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };

    const weekday = {
      weekday: "long",
    };

    // const day = options.weekday
    const day = dateObj.toLocaleDateString("en-Us", weekday);
    console.log(day);
    const fullDayInWeeks = dateObj.toLocaleDateString("en-Us", options);
    console.log(fullDayInWeeks);

    // let day2 = foreCastDay[1];
    // let day3 = foreCastDay[2];
    // let day4 = foreCastDay[3];
    // let day5 = foreCastDay[4];
    // let day6 = foreCastDay[5];
    // let day7 = foreCastDay[6];
    const sunRise = day2.astro.sunrise;
    const sunSet = day2.astro.sunset;
    const moonRise = day2.astro.moonrise;
    const moonSet = day2.astro.moonset;

    const averageHumidity = day2.day.avghumidity;
    const averageTempereture = day2.day.avgtemp_c;
    const averageVisibility = day2.day.avgvis_km;
    const weatherIcon = day2.day.condition.icon;
    const weatherText = day2.day.condition.text;
    const dailyChanceOfRain = day2.day.daily_chance_of_rain;
    const dailyChanceOfSnow = day2.day.daily_chance_of_snow;
    const dailyWillItRain = day2.day.daily_will_it_rain;
    const dailyWillItSnow = day2.day.daily_will_it_snow;
    const totalPrecip = day2.day.totalprecip_mm;
    let day1Hours = day2.hour;
    console.log(day1Hours);

    sunRiseEl.textContent = sunRise;
    sunRiseTextEl.textContent = "Sunrise";

    sunSetEl.textContent = sunSet;
    sunSetTextEl.textContent = "Sunset";

    moonRiseEl.textContent = moonRise;
    moonRiseTextEl.textContent = "Moonrise";

    moonSetEl.textContent = moonSet;
    moonSetTextEl.textContent = "Moonset";

    averageHumidityEl.textContent = `${averageHumidity}%`;
    averageHumidityTextEl.textContent = "Averagehumidity";

    averageTemperetureEl.textContent = `${averageTempereture}°C`;
    averageTemperetureTextEl.textContent = "AverageTemp";

    averageVisibilityEl.textContent = `${averageVisibility}km`;
    averageVisibilityTextEl.textContent = "Averagevisibility";

    dailyChanceOfRainEl.textContent = `${dailyChanceOfRain}%`;
    dailyChanceOfRainTextEl.textContent = "Daily chance of rain";

    dailyChanceOfSnowEl.textContent = `${dailyChanceOfSnow}%`;
    dailyChanceOfSnowTextEl.textContent = "Daily Chance Of Snow";

    dailyWillItRainEl.textContent = `${dailyWillItRain}%`;
    dailyWillItRainTextEl.textContent = `Daily It Will Rain`;

    dailyWillItSnowEl.textContent = `${dailyWillItRain}%`;
    dailyWillItSnowTextEl.textContent = `Daily It Will Snow`;

    dayEl.textContent = day;
    monthAndYearEl.textContent = fullDayInWeeks;

    dayTwoWeatherConditionImg.src = weatherIcon;
    dayTwoboldTempEl.textContent = `${averageTempereture}°`;
    spanEl.textContent = "c";
    dayTwoboldTempEl.appendChild(spanEl);
    console.log(weatherIcon);

    // for(hour in day1Hours) {
    //   console.log(hour)
    //   let dayHour = hour;
    //   console.log(dayHour)
    // }

    // currentWeatherInfo.appendChild(countryEl)
    // currentWeatherInfo.appendChild(countryEl)
    // console.log(temperature);
  });
}

// Get third day weather condition information
function getDayThreeWeatherCondition() {
  const dayEl = document.querySelector(".dayThree");
  const monthAndYearEl = document.querySelector(".dayThreeMonth-year");

  const dayThreeWeatherConditionImg = document.querySelector(
    ".dayThreeWeatherConditionImg"
  );
  const dayThreeboldTempEl = document.querySelector(".dayThreeboldTempEl");

  const sunRiseEl = document.querySelector(".dayThreesunRiseNumber");
  const sunRiseTextEl = document.querySelector(".dayThreesunRise");

  const sunSetEl = document.querySelector(".dayThreesunSetNumber");
  const sunSetTextEl = document.querySelector(".dayThreesunSet");

  const moonRiseEl = document.querySelector(".dayThreemoonRiseNumber");
  const moonRiseTextEl = document.querySelector(".dayThreemoonRise");

  const moonSetEl = document.querySelector(".dayThreemoonSetNumber");
  const moonSetTextEl = document.querySelector(".dayThreemoonSet");

  const averageHumidityEl = document.querySelector(
    ".dayThreeaverageHumidityNumber"
  );
  const averageHumidityTextEl = document.querySelector(
    ".dayThreeaverageHumidity"
  );

  const averageTemperetureEl = document.querySelector(
    ".dayThreeaverageTemperatureNumber"
  );
  const averageTemperetureTextEl = document.querySelector(
    ".dayThreeaverageTemperature"
  );

  const averageVisibilityEl = document.querySelector(
    ".dayThreeaverageVisibilityNumber"
  );
  const averageVisibilityTextEl = document.querySelector(
    ".dayThreeaverageVisibility"
  );

  const dailyChanceOfRainEl = document.querySelector(
    ".dayThreedailyChanceOfRainNumber"
  );
  const dailyChanceOfRainTextEl = document.querySelector(
    ".dayThreedailyChanceOfRain"
  );
  const dailyChanceOfSnowEl = document.querySelector(
    ".dayThreedailyChanceOfSnowNumber"
  );
  const dailyChanceOfSnowTextEl = document.querySelector(
    ".dayThreedailyChanceOfSnow"
  );
  const currentWeatherHumidityTextEl = document.querySelector(
    ".dayThreecurrentWeatherHumidityElNumber"
  );
  const currentWeatherHumidityEl = document.querySelector(
    ".dayThreecurrentWeatherHumidityEl"
  );
  const dateEl = document.querySelector(".dayThreedate");
  const dailyWillItRainEl = document.querySelector(
    ".dayThreedailyWillItRainNumber"
  );
  const dailyWillItRainTextEl = document.querySelector(
    ".dayThreedailyWillItRain"
  );

  const dailyWillItSnowEl = document.querySelector(
    ".dayThreedailyWillItSnowNumber"
  );
  const dailyWillItSnowTextEl = document.querySelector(
    ".dayThreedailyWillItSnow"
  );

  const totalPrecipEl = document.querySelector(".dayThreetotalPrecipNumber");
  const totalPrecipTextEl = document.querySelector(".dayThreetotalPrecip");

  const currentWeatherPrecipitationEl = document.querySelector(
    ".dayThreecurrentWeatherPrecipitationElNumber"
  );
  const currentWeatherPrecipitationTextEl = document.querySelector(
    ".dayThreecurrentWeatherPrecipitationEl"
  );
  const spanEl = document.createElement("span");

  const weatherConditon = getLocation();
  weatherConditon.then((location) => {
    const foreCastDay = location.forecast.forecastday;
    console.log(foreCastDay);

    //Get objects for the third week
    let day3 = foreCastDay[2];
    const date = day3.date;

    const dateObj = new Date(date);
    console.log(dateObj);

    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };

    const weekday = {
      weekday: "long",
    };

    // const day = options.weekday
    const day = dateObj.toLocaleDateString("en-Us", weekday);
    console.log(day);
    const fullDayInWeeks = dateObj.toLocaleDateString("en-Us", options);
    console.log(fullDayInWeeks);

    // let day2 = foreCastDay[1];
    // let day3 = foreCastDay[2];
    // let day4 = foreCastDay[3];
    // let day5 = foreCastDay[4];
    // let day6 = foreCastDay[5];
    // let day7 = foreCastDay[6];
    const sunRise = day3.astro.sunrise;
    const sunSet = day3.astro.sunset;
    const moonRise = day3.astro.moonrise;
    const moonSet = day3.astro.moonset;

    const averageHumidity = day3.day.avghumidity;
    const averageTempereture = day3.day.avgtemp_c;
    const averageVisibility = day3.day.avgvis_km;
    const weatherIcon = day3.day.condition.icon;
    const weatherText = day3.day.condition.text;
    const dailyChanceOfRain = day3.day.daily_chance_of_rain;
    const dailyChanceOfSnow = day3.day.daily_chance_of_snow;
    const dailyWillItRain = day3.day.daily_will_it_rain;
    const dailyWillItSnow = day3.day.daily_will_it_snow;
    const totalPrecip = day3.day.totalprecip_mm;
    let day3Hours = day3.hour;
    console.log(day3Hours);

    sunRiseEl.textContent = sunRise;
    sunRiseTextEl.textContent = "Sunrise";

    sunSetEl.textContent = sunSet;
    sunSetTextEl.textContent = "Sunset";

    moonRiseEl.textContent = moonRise;
    moonRiseTextEl.textContent = "Moonrise";

    moonSetEl.textContent = moonSet;
    moonSetTextEl.textContent = "Moonset";

    averageHumidityEl.textContent = `${averageHumidity}%`;
    averageHumidityTextEl.textContent = "Averagehumidity";

    averageTemperetureEl.textContent = `${averageTempereture}°C`;
    averageTemperetureTextEl.textContent = "AverageTemp";

    averageVisibilityEl.textContent = `${averageVisibility}km`;
    averageVisibilityTextEl.textContent = "Averagevisibility";

    dailyChanceOfRainEl.textContent = `${dailyChanceOfRain}%`;
    dailyChanceOfRainTextEl.textContent = "Daily chance of rain";

    dailyChanceOfSnowEl.textContent = `${dailyChanceOfSnow}%`;
    dailyChanceOfSnowTextEl.textContent = "Daily Chance Of Snow";

    dailyWillItRainEl.textContent = `${dailyWillItRain}%`;
    dailyWillItRainTextEl.textContent = `Daily It Will Rain`;

    dailyWillItSnowEl.textContent = `${dailyWillItRain}%`;
    dailyWillItSnowTextEl.textContent = `Daily It Will Snow`;

    dayEl.textContent = day;
    monthAndYearEl.textContent = fullDayInWeeks;

    dayThreeWeatherConditionImg.src = weatherIcon;
    dayThreeboldTempEl.textContent = `${averageTempereture}°`;
    spanEl.textContent = "c";
    dayThreeboldTempEl.appendChild(spanEl);
    console.log(weatherIcon);

    // for(hour in day1Hours) {
    //   console.log(hour)
    //   let dayHour = hour;
    //   console.log(dayHour)
    // }

    // currentWeatherInfo.appendChild(countryEl)
    // currentWeatherInfo.appendChild(countryEl)
    // console.log(temperature);
  });
}

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
  getCurrentWeatherConditon();
  getDayOneWeatherCondition();
  getDayTwoWeatherCondition();
  getDayThreeWeatherCondition();
  // displayCurrentWeatherInfo();

  locationInputField.value = "";
}
submitLocationBtn.addEventListener("click", submitForm);
