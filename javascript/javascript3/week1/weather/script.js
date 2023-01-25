"use strict";
/**
 * Setting up API and elements to get input; Setting up hendlers to catch values and render forecast.
 */
const APIKey = "f1d8052b4461556cdf58b37e34a4e4cd";
document.querySelector("#user-location").onsubmit = (e) => e.preventDefault();
document.querySelector("#get-city").addEventListener("click", cityHandler);
document
  .querySelector("#get-coordinates")
  .addEventListener("click", coordinatesHandler);

/**
 * Checks, whether user has enetered the city and calls getWeather for this city-name.
 * Also writes the city-name to localStorage.
 * @param {event} e
 */
function cityHandler(e) {
  const city = document.querySelector("#city").value;
  if (!city) {
    alert("Please, enter the city or town name!");
  } else {
    localStorage.setItem("city", city);

    getWeather(city);
  }
}

/**
 * Gets user coordinates, and if available, stores them in localStorage and calls
 * getWeather for these coordinates.
 * @param {event} e
 */
function coordinatesHandler(e) {
  const weatherCoordinates = {};
  navigator.geolocation.getCurrentPosition(
    (position) => {
      weatherCoordinates.lat = position.coords.latitude;
      weatherCoordinates.lon = position.coords.longitude;
      localStorage.setItem(
        "weatherCoordinates",
        JSON.stringify(weatherCoordinates)
      );
      getWeather(weatherCoordinates);
    },
    () => alert(`don't have your permission to read location`)
  );
}

/** Initiating the page with the values from localStorage,
 * if none, then calling en empty render, which asks user for the input  */
if (localStorage.city) {
  getWeather(localStorage.city);
} else if (localStorage.weatherCoordinates) {
  getWeather(localStorage.weatherCoordinates);
} else {
  getWeather(null);
}

/**
 * Gets location either in a form of string with the name of city or as an object with coordinates.
 * Depending on the location type composes the right url or calls renderWeather with null.
 * If url can be formed, then tries to fetch the forecast and calls renderWeather with the result.
 * @param {string|object} location ether city-name or obejt in a form of {lat:x, lon:y}
 * @returns {undefined}
 */
function getWeather(location) {
  let url = "";
  if (typeof location === "string") {
    url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${APIKey}&units=metric`;
  } else if (typeof location === "object" && location !== null) {
    url = `https://api.openweathermap.org/data/2.5/weather?lat=${location.lat}&lon=${location.lon}&appid=${APIKey}&units=metric`;
  } else {
    renderWeather(null);
    return;
  }

  fetch(url)
    .then((response) => response.json())
    .then((response) => {
      renderWeather(response);
    })
    .catch((error) => console.error(error));
}

/**
 * Gets the forcast data, selects and populates elements to display, positions them accordingly
 * (above forecast location if there is one, or in the center of the screen if there is nothing to display).
 * Saves the coordinates and the cityname to localStorage to show next time by default and also to be sure
 * that we can use the right coordinates when drawing the map.
 * Calls initMap to draw the map and weather-overlay, centered on the relevant coordinates.
 * @param {object} forecast with weather data.
 */
function renderWeather(forecast) {
  const iconHolder = document.querySelector("#weather-icon");
  const forecastHolder = document.querySelector("div#forecast");
  const container = document.querySelector("#forecast-container");
  container.style.bottom = 50 + "%";
  container.style.left = 50 + "%";
  console.dir(forecast);
  if (forecast === null || forecast === undefined) {
    forecastHolder.innerHTML = `Please, enter city/town name or set the coordinates to show forecast`;
    container.style.bottom = 45 + "%";
    container.style.left = 35 + "%";
  } else {
    iconHolder.setAttribute("alt", forecast.weather[0].icon);
    iconHolder.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${forecast.weather[0].icon}.png`
    );
    forecastHolder.innerHTML = `<p>${forecast.name}, ${
      forecast.main.temp
    } °C</p>
<p> The wind speed is ${forecast.wind.speed} m/s</p>
<p> We have ${forecast.weather[0].description}</p>
<p> Sun rises at ${new Date(
      forecast.sys.sunrise * 1000
    ).toLocaleTimeString()}<br>and sets at ${new Date(
      forecast.sys.sunset * 1000
    ).toLocaleTimeString()}</p>`;
    localStorage.setItem("city", forecast.name);
    localStorage.setItem(
      "weatherCoordinates",
      JSON.stringify({
        lon: forecast.coord.lon,
        lat: forecast.coord.lat
      })
    );
    initMap();
  }
}
/**getting the map from google */
const script = document.createElement("script");
script.src =
  "https://maps.googleapis.com/maps/api/js?key=AIzaSyCQKWxWUcyoZgMmTA50PtbWdZ_GGme3NeY&callback=initMap";
script.async = true;
document.head.appendChild(script);

/**
 * google maps API. Creating the map, centering it on coordinates from localStorage and then gettin the overlay tiles
 * from free map 1.0 at openweathermap.org (this free map overlays basically show
 * no useful info on zoom levels bigger then 3, for real product definitely need to look for some alternative)
 * Showing free tiles just to test the API.
 */
window.initMap = function () {
  const map = new google.maps.Map(document.getElementById("map"), {
    center: {
      lat: JSON.parse(localStorage.weatherCoordinates).lat,
      lng: JSON.parse(localStorage.weatherCoordinates).lon
    },
    disableDefaultUI: true,
    zoom: 10
  });

  const myMapType = new google.maps.ImageMapType({
    getTileUrl: function (coord, zoom) {
      return `https://tile.openweathermap.org/map/temp_new/${zoom}/${coord.x}/${coord.y}.png?appid=${APIKey}`;
    },
    tileSize: new google.maps.Size(256, 256),
    maxZoom: 10,
    minZoom: 0,
    name: "mymaptype"
  });

  map.overlayMapTypes.insertAt(0, myMapType);
};
