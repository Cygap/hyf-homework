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
}
