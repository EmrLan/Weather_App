import axios from 'axios';
import { OPEN_WEATHER_KEY } from '@env';
const API = OPEN_WEATHER_KEY;

const BASEURL = 'https://api.openweathermap.org/data/2.5/';
const axiosInstance = axios.create({
  baseURL: BASEURL,
  timeout: 5000,
});

axiosInstance.interceptors.response.use(response => {
  return response.data;
});

async function GetCurrentWeatherDataWithLatLong(Lat: number, Long: number) {
  try {
    const res = await axiosInstance.get(
      `/weather?lat=${Lat}&lon=${Long}&appid=${API}&units=imperial`,
    );
    return res as any;
  } catch (error) {
    console.log('GetCurrentWeatherDataWithLatLong Error: ' + error);
    throw error;
  }
}

async function GetFiveDayWeatherForecastWithLatLong(Lat: number, Long: number) {
  try {
    const res = await axiosInstance.get(
      `/forecast?lat=${Lat}&lon=${Long}&appid=${API}&units=imperial`,
    );
    return res as any;
  } catch (error) {
    console.log('GetFiveDayWeatherForecastWithLatLong Error: ' + error);
    throw error;
  }
}

async function GetCurrentWeatherDataWithName(city: string) {
  try {
    const res = await axiosInstance(
      `/weather?q=${city}&appid=${API}&units=imperial`,
    );
    return res as any;
  } catch (error) {
    console.log('GetCurrentWeatherDataWithName Error: ' + error);
    throw error;
  }
}

async function GetFiveDayWeatherForecastithName(city: string) {
  try {
    const res = await axiosInstance(
      `/forecast?q=${city}&appid=${API}&units=imperial`,
    );
    return res as any;
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
