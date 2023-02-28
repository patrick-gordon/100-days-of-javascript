let container = document.querySelector('.container');
let search = document.querySelector('.search-box button');
let weatherBox = document.querySelector('.weather-box');
let weatherDetails = document.querySelector('.weather-details');
let error404 = document.querySelector('.not-found');

search.addEventListener('click', () => {
  console.log('clicking search button'); // REMOVE
  const APIKEY = 'e5ce067c55069ebfcf43743e9baf205f';
  const city = document.querySelector('.search-box input').value;
  console.log('city', city); // REMOVE

  if (city === '') return;

  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKEY}&units=standard`
  )
    .then((res) => res.json())
    .then((json) => {
      console.log(json);
      if (json.cod === '404') {
        container.style.height = '400px';
        weatherBox.style.display = 'none';
        weatherDetails.style.display = 'none';
        error404.style.display = 'block';
        error404.classList.add('fadeIn');
        return;
      }

      error404.style.display = 'none';
      error404.classList.remove('fadeIn');

      const image = document.querySelector('.weather-box img');
      const temp = document.querySelector('.weather-box .temperature');
      const description = document.querySelector('.weather-box .description ');
      const humidity = document.querySelector(
        '.weather-details .humidity span'
      );
      const wind = document.querySelector('.weather-details .wind span');

      switch (json.weather[0].main) {
        case 'Clear':
          image.src = 'images/clear.png';
          break;

        case 'Rain':
          image.src = 'images/rain.png';
          break;

        case 'Snow':
          image.src = 'images/snow.png';
          break;

        case 'Clouds':
          image.src = 'images/cloud.png';
          break;

        case 'Haze':
          image.src = 'images/mist.png';
          break;

        default:
          image.src = '';
      }

      temp.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
      description.innerHTML = `${json.weather[0].description}`;
      humidity.innerHTML = `${json.main.humidity}`;
      wind.innerHTML = `${parseInt(json.wind.speed)}Km/h`;

      weatherBox.style.display = '';
      weatherDetails.style.display = '';
      weatherDetails.classList.add('fadeIn');
      weatherBox.classList.add('fadeIn');
      container.style.height = '590px';
    });
});
