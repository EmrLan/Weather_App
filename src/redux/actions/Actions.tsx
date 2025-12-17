import {
  ADD_WEATHER_DATA_FROM_STORAGE,
  ADD_WEATHER_LOCATION,
  REMOVE_WEATHER_LOCATION,
} from './ActionTypes';

const addWeatherLocation = () => {
  return {
    type: ADD_WEATHER_LOCATION,
  };
};

const addWeatherDataFromStorage = () => {
  return {
    type: ADD_WEATHER_DATA_FROM_STORAGE,
  };
};

const removeWeatherLocation = () => {
  return {
    type: REMOVE_WEATHER_LOCATION,
  };
};

export { addWeatherLocation, addWeatherDataFromStorage, removeWeatherLocation };
