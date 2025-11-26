async function GetCurrentWeatherData(Lat, Long, Api) {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${Lat}&lon=${Long}&appid=${Api}&units=imperial`,
    );
    return res.json();
  } catch (error) {
    console.log('GetCurrentWeatherData Error: ' + error);
    throw error;
  }
}

async function GetFiveDayWeatherForecast(Lat, Long, Api) {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${Lat}&lon=${Long}&appid=${Api}&units=imperial`,
    );
    return res.json();
  } catch (error) {
    console.log('GetCurrentWeatherData Error: ' + error);
    throw error;
  }
}

async function GetCurrentWeatherDataWithName(city, Api) {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${Api}&units=imperial`,
    );
    return res.json();
  } catch (error) {
    console.log('GetCurrentWeatherData Error: ' + error);
    throw error;
  }
}

async function GetFiveDayWeatherForecastithName(city, Api) {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${Api}&units=imperial`,
    );
    return res.json();
  } catch (error) {
    console.log('GetCurrentWeatherData Error: ' + error);
    throw error;
  }
}

export {
  GetCurrentWeatherData,
  GetFiveDayWeatherForecast,
  GetCurrentWeatherDataWithName,
  GetFiveDayWeatherForecastithName,
};
