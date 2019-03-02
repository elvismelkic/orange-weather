const apiKey = process.env.API_KEY;

function handleError(error) {
  console.warn(error);
  return null;
}

async function fetchCurrentWeather(city) {
  let URI;
  const cityArr = city.split(",");
  cityArr.length > 1
    ? (URI = `https://api.openweathermap.org/data/2.5/weather?q=${
        cityArr[0]
      },${cityArr[1].trim()}&units=metric&type=accurate&APPID=${apiKey}`)
    : (URI = `https://api.openweathermap.org/data/2.5/weather?q=${
        cityArr[0]
      }&units=metric&type=accurate&APPID=${apiKey}`);

  const response = await fetch(URI).catch(handleError);
  const currentWeather = await response.json();

  return currentWeather;
}

async function fetchFiveDayWeather(city) {
  let URI;
  const cityArr = city.split(",");
  cityArr.length > 1
    ? (URI = `https://api.openweathermap.org/data/2.5/forecast?q=${
        cityArr[0]
      },${cityArr[1].trim()}&units=metric&type=accurate&APPID=${apiKey}`)
    : (URI = `https://api.openweathermap.org/data/2.5/forecast?q=${
        cityArr[0]
      }&units=metric&type=accurate&APPID=${apiKey}`);

  const response = await fetch(URI).catch(handleError);
  const fiveDayWeather = await response.json();

  return fiveDayWeather;
}

// Reduces the data from the Open Weather's API response into an object.
function reduceDayData(timestampArr, daysFromToday) {
  const timestamp = new Date();

  // For today, the timestamp is the current moment, for other days it's the noon.
  const timestampIndex = daysFromToday > 0 ? 4 : 0;

  const dayArr = timestampArr.reduce((acc, next) => {
    let date = new Date(next.dt * 1000);

    timestamp.getDate() + daysFromToday === date.getDate()
      ? acc.push(next)
      : null;

    return acc;
  }, []);

  const dayWeather = {
    dt: dayArr[timestampIndex].dt,
    temp: Math.round(dayArr[timestampIndex].main.temp),
    temp_min: Math.round(
      dayArr.reduce((acc, next) => {
        return acc < next.main.temp_min ? acc : next.main.temp_min;
      }, 100)
    ),
    temp_max: Math.round(
      dayArr.reduce((acc, next) => {
        return acc > next.main.temp_max ? acc : next.main.temp_max;
      }, -300)
    ),
    description: dayArr[timestampIndex].weather[0].description,
    icon: dayArr[timestampIndex].weather[0].icon,
    humidity: dayArr[timestampIndex].main.humidity
  };

  return dayWeather;
}

export async function sortWeatherData(city) {
  const fiveDayWeatherApi = await fetchFiveDayWeather(city);
  const currentTime = new Date();
  const currentHours = currentTime.getHours();
  let weather;
  let currentWeather;
  let futureWeather = [];

  if (fiveDayWeatherApi.cod >= 400 && fiveDayWeatherApi.cod <= 600) {
    weather = {
      cityName: null
    };
  } else {
    if (currentHours >= 21) {
      const currentWeatherApi = await fetchCurrentWeather(city);
      currentWeather = reduceDayData([currentWeatherApi], 0);
    } else {
      currentWeather = reduceDayData(fiveDayWeatherApi.list, 0);
    }

    for (let i = 1; i < 4; i++) {
      futureWeather.push(reduceDayData(fiveDayWeatherApi.list, i));
    }

    weather = {
      cityName: `${fiveDayWeatherApi.city.name}, ${
        fiveDayWeatherApi.city.country
      }`,
      currentWeather,
      futureWeather
    };
  }

  return weather;
}
