const container = document.querySelector("#container");
       const subContainer = document.querySelector('.sub_container')
       const errorContainer = document.querySelector('#errorContainer')
const error = document.querySelector(".error");

const form = document.querySelector("#form");
let locationInputField = document.querySelector("#input");
const currentWeatherText = document.querySelector(".currentWeatherHeaderMainText")
const img = document.querySelector("img");
const gifContainer = document.querySelector("#gifContainer");
const gifContainer2 = document.querySelector("#gifContainer2");
const gifContainer3 = document.querySelector("#gifContainer3");
const gifContainer4 = document.querySelector("#gifContainer4");
const gifContainer5 = document.querySelector("#gifContainer5");
const gifContainer6 = document.querySelector("#gifContainer6");

const submitLocationBtn = document.querySelector("#searchLocation");
const currentWeatherInfo = document.querySelector(".currentWeatherInfo");
const countryEl = document.querySelector(".countryEl");
const temperatureBoldEl = document.querySelector(".boldTempEl");

const dewPointTextEl = document.querySelector(".dewPointEl");
const dewPointEl = document.querySelector(".dewPointElNumber");

const windDirTextEl = document.querySelector(".windDirEl");
const windDirEl = document.querySelector(".windDirNumber");

// const windDirInDegreeTextEl = document.querySelector(".windDirInDegree");
// const windDirInDegreeEl = document.querySelector(".windDirInDegreeNumber");

const feelLikeTextEl = document.querySelector(".feelLikeEl");
const feelLikeEl = document.querySelector(".feelLikeElNumber");

const weatherIconEl = document.querySelector(".weatherConditionImg");

const currentWeatherHumidityTextEl = document.querySelector(
  ".currentWeatherHumidityEl"
);
const currentWeatherHumidityEl = document.querySelector(
  ".currentWeatherHumidityElNumber"
);

const barometricPressureTextEl = document.querySelector(
  ".barometricPressureEl"
);
const barometricPressureEl = document.querySelector(
  ".barometricPressureElNumber"
);

const currentVisibilityTextEl = document.querySelector(".currentVisibilityEl");
const currentVisibilityEl = document.querySelector(
  ".currentVisibilityElNumber"
);

// const currentWeatherLastUpdateTextEl = document.querySelector(
//   ".currentWeatherLastUpdateElNumber"
// );
// const currentWeatherLastUpdateEl = document.querySelector(
//   ".currentWeatherLastUpdateElNumber"
// );

const currentWeatherPrecipitationTextEl = document.querySelector(
  ".currentWeatherPrecipitationEl"
);
const currentWeatherPrecipitationEl = document.querySelector(
  ".currentWeatherPrecipitationElNumber"
);
//Get user Input
function getUserInput() {
  let userInput = locationInputField.value;

  return userInput;
}
locationInputField.addEventListener("input", getUserInput);

//Get Location current weather condition From Api
async function getLocation() {
  const userLocation = getUserInput();

  if (userLocation) {
    // try {
      const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=9a516bc9012848759a5102735242906&q=${userLocation}&days=3`,
        { mode: "cors" }
      );
      // //Get a ReadableStreamDefaultReader to read the response body
      // const reader = response.body.getReader();

      // // Initialize variables to keep track of the data
      // let downloadedLength = 0;
      // const chunks = [];

      // while (true) {
      //   const { done, value } = await reader.read();

      //   if (done) {
      //     break;
      //   }
      //   downloadedLength += value.length;
      //   chunks.push(value);
      // }

      // console.log(downloadedLength);
      // //Concatenate the chucks into a single Uint8Array
      // let completeData = new Uint8Array(downloadedLength);
      // let position = 0;
      // console.log(completeData);
      // for (const chuck of chucks) {
      //   completeData.set(chuck, position);
      //   position += chuck.length;
      // }

      // console.log(chunks);

      // const result = new TextDecoder().decode(completeData);
      // console.log(result);

      // //Convert data into json object
      // const locationObj = JSON.parse(result);
      // console.log(locationObj);
      const locationObj = await response.json();

      return locationObj;
    // } catch (err) {
    //   alert("Check your network!");
    // }
  } else {
    alert("You've not entered any value");
  }
}

//Get current weather info
function getCurrentWeatherConditon() {
  const userLocationInput = getLocation();
  const userInput = getUserInput();
  if (userLocationInput) {

    userLocationInput.then((location) => {
    const country = location.location.country;
    const locationName = location.location.name;

    //Check if userInput location is equal to the locationName return from api
    if(locationName == userInput ) {
 subContainer.style.display = "block"
            errorContainer.style.display = 'none'

     const dewPoint = location.current.dewpoint_c;
    const temperature = location.current.temp_c;
    const windDirection = location.current.wind_dir;
    const feelLikeCondition = location.current.feelslike_c;
    const weatherIcon = location.current.condition.icon;
    const weatherIconText = location.current.condition.text;
    const currentWeatherHumidity = location.current.humidity;
    const BarometricPressure = location.current.pressure_mb;
    const currentVisibility = location.current.vis_km;
    const currentWeatherPrecipitation = location.current.precip_mm;

    //Get current weather data object
    const currentWeatherObj = location.current;
    console.log(currentWeatherObj);
    const spanEl = document.createElement("span");

    temperatureBoldEl.textContent = `${temperature}°`;
    spanEl.textContent = "c";
    temperatureBoldEl.appendChild(spanEl);

    countryEl.textContent = `${country}-${locationName}:`;

    dewPointTextEl.textContent = "Dewpoint:";
    dewPointEl.textContent = `${dewPoint}°c`;

    windDirTextEl.textContent = "Wind direction:";
    windDirEl.textContent = `${windDirection}°`;

    feelLikeTextEl.textContent = "Feel Like:";
    feelLikeEl.textContent = `${feelLikeCondition}°c`;

    weatherIconEl.src = weatherIcon;
    weatherIconEl.alt = weatherIconText;

    currentWeatherHumidityTextEl.textContent = "Humidity:";
    currentWeatherHumidityEl.textContent = `${currentWeatherHumidity}%`;

    barometricPressureTextEl.textContent = "Barometric_pressure:";
    barometricPressureEl.textContent = `${BarometricPressure}mb`;

    currentVisibilityTextEl.textContent = "Visibility:";
    currentVisibilityEl.textContent = ` ${currentVisibility}km`;

    currentWeatherPrecipitationTextEl.textContent = "Precipitation:";
    currentWeatherPrecipitationEl.textContent = `${currentWeatherPrecipitation}mm`;

      currentWeatherText.textContent = 'Current Weather';
        // if(container.style.display === "block") {
        //   container.style.display = "none"
        // } else {
          // }
           
      
    }
    else {
       subContainer.style.display = 'none'
       errorContainer.style.display = "block"
      //  const error = document.createElement('div');

       error.textContent = `Location not found!, Enter  valid location name`
        //  error.appendChild(error)
  }
  });
  
  }
 
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
  const dailyWillItRainEl = document.querySelector(".dailyWillItRainNumber");
  const dailyWillItRainTextEl = document.querySelector(".dailyWillItRain");

  const dailyWillItSnowEl = document.querySelector(".dailyWillItSnowNumber");
  const dailyWillItSnowTextEl = document.querySelector(".dailyWillItSnow");

  const spanEl = document.createElement("span");

  const weatherConditon = getLocation();
  weatherConditon.then((location) => {
    const foreCastDay = location.forecast.forecastday;
    console.log(foreCastDay);

    //Get day1 object for the week
    let day1 = foreCastDay[0];
    const date = day1.date;

    const dateObj = new Date(date);

    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };

    // Get only a day
    const weekday = {
      weekday: "long",
    };

    const day = dateObj.toLocaleDateString("en-Us", weekday);
    const fullDayInWeeks = dateObj.toLocaleDateString("en-Us", options);

    const sunRise = day1.astro.sunrise;
    const sunSet = day1.astro.sunset;
    const moonRise = day1.astro.moonrise;
    const moonSet = day1.astro.moonset;

    const averageHumidity = day1.day.avghumidity;
    const averageTempereture = day1.day.avgtemp_c;
    const averageVisibility = day1.day.avgvis_km;
    const weatherIcon = day1.day.condition.icon;
    const weatherIconText = day1.day.condition.text;
    const dailyChanceOfRain = day1.day.daily_chance_of_rain;
    const dailyChanceOfSnow = day1.day.daily_chance_of_snow;
    const dailyWillItRain = day1.day.daily_will_it_rain;

    // let day1Hours = day1.hour;

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
    dayOneWeatherConditionImg.alt = weatherIconText;

    dayOneboldTempEl.textContent = `${averageTempereture}°`;
    spanEl.textContent = "c";
    dayOneboldTempEl.appendChild(spanEl);
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

    const sunRise = day2.astro.sunrise;
    const sunSet = day2.astro.sunset;
    const moonRise = day2.astro.moonrise;
    const moonSet = day2.astro.moonset;

    const averageHumidity = day2.day.avghumidity;
    const averageTempereture = day2.day.avgtemp_c;
    const averageVisibility = day2.day.avgvis_km;
    const weatherIcon = day2.day.condition.icon;
    const weatherIconText = day2.day.condition.text;
    const dailyChanceOfRain = day2.day.daily_chance_of_rain;
    const dailyChanceOfSnow = day2.day.daily_chance_of_snow;
    const dailyWillItRain = day2.day.daily_will_it_rain;
    const dailyWillItSnow = day2.day.daily_will_it_snow;
    const totalPrecip = day2.day.totalprecip_mm;
    // let day1Hours = day2.hour;

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
    dayTwoWeatherConditionImg.alt = weatherIconText;
    dayTwoboldTempEl.textContent = `${averageTempereture}°`;
    spanEl.textContent = "c";
    dayTwoboldTempEl.appendChild(spanEl);

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

  const spanEl = document.createElement("span");

  const weatherConditon = getLocation();
  weatherConditon.then((location) => {
    const foreCastDay = location.forecast.forecastday;

    //Get objects for the third week
    let day3 = foreCastDay[2];
    const date = day3.date;

    const dateObj = new Date(date);

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
    const fullDayInWeeks = dateObj.toLocaleDateString("en-Us", options);

    const sunRise = day3.astro.sunrise;
    const sunSet = day3.astro.sunset;
    const moonRise = day3.astro.moonrise;
    const moonSet = day3.astro.moonset;

    const averageHumidity = day3.day.avghumidity;
    const averageTempereture = day3.day.avgtemp_c;
    const averageVisibility = day3.day.avgvis_km;
    const weatherIcon = day3.day.condition.icon;
    const weatherIconText = day3.day.condition.text;
    const dailyChanceOfRain = day3.day.daily_chance_of_rain;
    const dailyChanceOfSnow = day3.day.daily_chance_of_snow;
    const dailyWillItRain = day3.day.daily_will_it_rain;

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
    dayThreeWeatherConditionImg.alt = weatherIconText;

    dayThreeboldTempEl.textContent = `${averageTempereture}°`;
    spanEl.textContent = "c";
    dayThreeboldTempEl.appendChild(spanEl);
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
  container.style.display = 'block'
  // displayCurrentWeatherInfo();

  locationInputField.value = "";
}
submitLocationBtn.addEventListener("click", submitForm);
