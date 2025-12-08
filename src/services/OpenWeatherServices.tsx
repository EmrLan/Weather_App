async function GetCurrentWeatherDataWithLatLong(
  Lat: number,
  Long: number,
  Api: string,
) {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${Lat}&lon=${Long}&appid=${Api}&units=imperial`,
    );
    return res.json();
  } catch (error) {
    console.log('GetCurrentWeatherDataWithLatLong Error: ' + error);
    throw error;
  }
}

async function GetFiveDayWeatherForecastWithLatLong(
  Lat: number,
  Long: number,
  Api: string,
) {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${Lat}&lon=${Long}&appid=${Api}&units=imperial`,
    );
    return res.json();
  } catch (error) {
    console.log('GetFiveDayWeatherForecastWithLatLong Error: ' + error);
    throw error;
  }
}

async function GetCurrentWeatherDataWithName(city: string, Api: string) {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${Api}&units=imperial`,
    );
    return res.json();
  } catch (error) {
    console.log('GetCurrentWeatherDataWithName Error: ' + error);
    throw error;
  }
}

async function GetFiveDayWeatherForecastithName(city: string, Api: string) {
  try {
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${Api}&units=imperial`,
    );
    return res.json();
  } catch (error) {
    console.log('GetFiveDayWeatherForecastithName Error: ' + error);
    throw error;
  }
}

export {
  GetCurrentWeatherDataWithLatLong,
  GetFiveDayWeatherForecastWithLatLong,
  GetCurrentWeatherDataWithName,
  GetFiveDayWeatherForecastithName,
};
