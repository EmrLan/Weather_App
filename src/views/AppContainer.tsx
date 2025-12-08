import { createAsyncStorage } from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { useCallback, useEffect, useMemo, useState } from 'react';
import Config from 'react-native-config';
import GetLocation from 'react-native-get-location';
import { useCityWeather, useCityWeatherUpdate } from '../context/Context';
import { Navigation } from '../navigation/Navigation';
import { ACTIONS } from '../reducer/CityWeatherAction';
import { CityWeatherObj } from '../reducer/CityWeatherReducer';
import {
  GetCurrentWeatherDataWithLatLong,
  GetFiveDayWeatherForecastWithLatLong,
} from '../services/OpenWeatherServices';
import withLoadingScreen from '../components/withLoadingScreen';

export interface CurrentWeatherData {
  name: string;
  main: {
    temp: number;
    humidity: number;

    [key: string]: any;
    weather: Array<{
      id: number;
      main: string;
      icon: string;
    }>;
  };
}

export interface FiveDayForecastData {
  city: {
    name: string;
  };
  list: Array<{
    dt_txt: string;
    main: {
      temp_min: number;
      temp_max: number;
    };
    weather: Array<{
      icon: string;
    }>;
    [key: string]: any;
  }>;
}

interface LocationData {
  latitude: number;
  longitude: number;
}

export default function AppContainer() {
  const localStorage = useMemo(() => createAsyncStorage('cities'), []);

  const city = useCityWeather();
  const cityDispatch = useCityWeatherUpdate();
  const [currentWeather, setCurrentWeather] = useState(
    {} as CurrentWeatherData,
  );
  const [fiveDayForecast, setFiveDayForecast] = useState(
    {} as FiveDayForecastData,
  );
  const [loadingOne, SetLoadingOne] = useState(false);
  const [loadingTwo, SetLoadingTwo] = useState(false);

  useEffect(() => {
    if (
      !loadingOne &&
      !loadingTwo &&
      Object.entries(currentWeather)?.length > 0 &&
      Object.entries(fiveDayForecast)?.length > 0
    ) {
      handleDataReady();
    }
  }, [loadingOne, loadingTwo, currentWeather, fiveDayForecast]);

  useEffect(() => {
    getLocal().then(localData => {
      cityDispatch({
        type: ACTIONS.ADDMULTIPLE,
        payload: {
          name: '',
          obj: localData,
        },
      });
    });

    GetLocation.getCurrentPosition({
      enableHighAccuracy: true,
      timeout: 60000,
    })
      .then(location => {
        getStarted(location);
      })
      .catch(() => {
        getStarted({
          latitude: 51.509865,
          longitude: -0.118092,
        });
      });
  }, []);

  const handleDataReady = () => {
    cityDispatch({
      type: ACTIONS.ADD,
      payload: {
        name: currentWeather.name || fiveDayForecast.city.name,
        currentWeather: currentWeather,
        forecast: fiveDayForecast,
        location: true,
      },
    });
    setCurrentWeather({} as CurrentWeatherData);
    setFiveDayForecast({} as FiveDayForecastData);
  };

  const setLocal = useCallback(async (inContext: CityWeatherObj) => {
    try {
      await localStorage.setItem('context', JSON.stringify(inContext));
    } catch (er: any) {
      console.log('Local storage error: ', er);
    }
  }, []);

  const getLocal = useCallback(async () => {
    try {
      const res = await localStorage.getItem('context');
      // console.log('res from local: ', JSON.parse(res || ''));
      return JSON.parse(res || '{}') as CityWeatherObj;
    } catch (er: any) {
      console.log('Local storage error: ', er);
    }
  }, []);

  useEffect(() => {
    if (Object.keys(city).length > 0) {
      setLocal(city);
    }
  }, [city]);

  const getStarted = (location: LocationData) => {
    SetLoadingOne(true);
    SetLoadingTwo(true);

    GetCurrentWeatherDataWithLatLong(
      location.latitude,
      location.longitude,
      Config.OPEN_WEATHER_KEY || '',
    )
      .then(data => {
        setCurrentWeather(data);
      })
      .catch(e => {
        console.log(e);
      })
      .finally(() => SetLoadingOne(false));
    GetFiveDayWeatherForecastWithLatLong(
      location.latitude,
      location.longitude,
      Config.OPEN_WEATHER_KEY || '',
    )
      .then(data => {
        setFiveDayForecast(data || {});
      })
      .catch(e => {
        console.log(e);
      })
      .finally(() => SetLoadingTwo(false));
  };

  const Loader = withLoadingScreen(Navigation);

  return (
    <NavigationContainer>
      <Loader loading={loadingOne || loadingTwo}>...</Loader>
    </NavigationContainer>
  );
}
