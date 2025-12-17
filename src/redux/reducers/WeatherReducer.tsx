import {
  addWeatherDataFromStorage,
  addWeatherLocation,
  removeWeatherLocation,
} from '../actions/Actions';
import {
  ADD_WEATHER_DATA_FROM_STORAGE,
  ADD_WEATHER_LOCATION,
  REMOVE_WEATHER_LOCATION,
} from '../actions/ActionTypes';

interface CityWeatherData {
  currentWeather: Record<string, any>;
  forecast: Record<string, any>;
}

interface CityWeatherObj {
  [key: string]: CityWeatherData;
}

const initialState: CityWeatherObj = {};

export default function WeatherReducer(
  state: CityWeatherObj = initialState,
  action: any,
) {
  switch (action.type) {
    case ADD_WEATHER_LOCATION: {
      if (!action.payload.name) {
        return state;
      }
      return {
        ...state,
        [action.payload.name]: {
          currentWeather: action.payload.currentWeather || {},
          forecast: action.payload.forecast || {},
        },
      };
    }
    case ADD_WEATHER_DATA_FROM_STORAGE: {
      return {
        ...state,
        ...action.payload.local,
      };
    }
    case REMOVE_WEATHER_LOCATION: {
      const stateCpy = { ...state };
      delete stateCpy[action.payload.name];
      return {
        ...stateCpy,
      };
    }
    default: {
      return state;
    }
  }
}
