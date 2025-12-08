import { CurrentWeatherData } from '../views/AppContainer';
import { ACTIONS } from './CityWeatherAction';

interface CityWeatherData {
  currentWeather: Record<string, any>;
  forecast: Record<string, any>;
  geolocation: boolean;
}

export interface payloadData {
  name: string;
  currentWeather?: Record<string, any>;
  forecast?: Record<string, any>;
  location?: boolean;
  obj?: CityWeatherObj | null;
}

export interface CityWeatherObj {
  [key: string]: CityWeatherData;
}

export default function cityWeatherReducer(
  state: CityWeatherObj,
  action: { type: string; payload: payloadData },
) {
  switch (action.type) {
    case ACTIONS.ADD: {
      return {
        ...state,
        [action.payload.name]: {
          currentWeather: action.payload.currentWeather || {},
          forecast: action.payload.forecast || {},
          geolocation: action.payload.location || false,
        },
      };
    }
    case ACTIONS.REMOVE: {
      const stateCpy = { ...state };
      delete stateCpy[action.payload.name];
      return {
        ...stateCpy,
      };
    }
    case ACTIONS.ADDMULTIPLE: {
      const loadedData = action.payload.obj;
      if (loadedData && typeof loadedData === 'object') {
        const loadedCityObj = loadedData as CityWeatherObj;
        return {
          ...state,
          ...loadedCityObj,
        };
      }
      return state;
    }
    default: {
      return state;
    }
  }
}
