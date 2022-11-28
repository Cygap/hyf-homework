const url = `https://api.openweathermap.org/data/2.5/weather?q=copenhagen&appid=f1d8052b4461556cdf58b37e34a4e4cd&units=metric`;
fetch(url)
  .then((response) => response.json())
  .then((response) => {
    console.dir(response);
    renderWeather(response);
  })
  .catch((error) => console.error(error));

function renderWeather(forecast) {
  const iconHolder = document.querySelector("#weather-icon");
  const forecastHolder = document.createElement("div");
  document.body.append(forecastHolder);

  iconHolder.setAttribute("alt", forecast.weather[0].icon);
  iconHolder.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${forecast.weather[0].icon}@2x.png`
  );
  forecastHolder.innerHTML = `<p>The Temperature in ${forecast.name} is ${
    forecast.main.temp
  } degreees celsius</p>
<p> The wind speed is ${forecast.wind.speed} m/s</p>
<p> We have ${forecast.weather[0].description}</p>
<p> Sun rises at ${new Date(
    forecast.sys.sunrise * 1000
  ).toLocaleTimeString()} and sets at ${new Date(
    forecast.sys.sunset * 1000
  ).toLocaleTimeString()}</p>`;

  let script = document.createElement("script");
  script.src =
    "https://maps.googleapis.com/maps/api/js?key=AIzaSyCQKWxWUcyoZgMmTA50PtbWdZ_GGme3NeY&callback=initMap";
  script.async = true;

  // Attach your callback function to the `window` object

  // Append the 'script' element to 'head'
  document.head.appendChild(script);
  renderCoordinates();
}
window.initMap = function () {
  console.log("Google map JS API is loaded and available");
};
let map;
function renderCoordinates() {
  navigator.geolocation.getCurrentPosition(
    (position) => {
      map = new google.maps.Map(document.getElementById("map"), {
        center: {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        },
        zoom: 12
      });
    },
    () =>
      (coordinates.innerText = `don't have your permission to read location`)
  );
}
