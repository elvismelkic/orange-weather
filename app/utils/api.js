const apiKey = process.env.API_KEY;

function handleError(error) {
  console.warn(error);
  return null;
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
    temp_min: dayArr.reduce((acc, next) => {
      return acc < next.main.temp_min ? acc : next.main.temp_min;
    }, 100),
    temp_max: dayArr.reduce((acc, next) => {
      return acc > next.main.temp_max ? acc : next.main.temp_max;
    }, -300),
    description: dayArr[timestampIndex].weather[0].description,
    icon: dayArr[timestampIndex].weather[0].icon,
    humidity: dayArr[timestampIndex].main.humidity
  };

  return dayWeather;
}

export async function fetchCurrentWeather(city) {
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

export async function fetchFiveDayWeather(city) {
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

export function sortWeatherData(fiveDayWeather) {
  let futureWeather = [];

  for (let i = 1; i < 4; i++) {
    futureWeather.push(reduceDayData(fiveDayWeather.list, i));
  }

  const weather = {
    cityName: `${fiveDayWeather.city.name}, ${fiveDayWeather.city.country}`,
    currentWeather: reduceDayData(fiveDayWeather.list, 0),
    futureWeather
  };

  return weather;
}
