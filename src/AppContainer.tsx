import { createAsyncStorage } from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Navigation } from './navigation/Navigation';
import {
  GetCurrentWeatherDataWithLatLong,
  GetFiveDayWeatherForecastWithLatLong,
} from './services/OpenWeatherServices';
import withLoadingScreen from './components/withLoadingScreen';
import { Alert, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './redux/Store';
import Geolocation, {
  GeolocationResponse,
} from '@react-native-community/geolocation';
import {
  ADD_WEATHER_DATA_FROM_STORAGE,
  ADD_WEATHER_LOCATION,
  SET_LOCATION,
} from './redux/actions/ActionTypes';
import useWatchLocation from './zustand/store';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
  // const localStorage = useMemo(() => createAsyncStorage('cities'), []);

  // const cityName = useSelector((state: RootState) => state.Location.cityName);
  const weatherData = useSelector((state: RootState) => state.Weather);

  const dispatch = useDispatch();
  const [currentWeather, setCurrentWeather] = useState(
    {} as CurrentWeatherData,
  );
  const [fiveDayForecast, setFiveDayForecast] = useState(
    {} as FiveDayForecastData,
  );
  const [loadingOne, SetLoadingOne] = useState(false);
  const [loadingTwo, SetLoadingTwo] = useState(false);
  const setZu = useWatchLocation(state => state.setCoords);

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
      if (localData && Object.keys(localData).length > 0)
        // console.log('local: ', localData)
        dispatch({
          type: ADD_WEATHER_DATA_FROM_STORAGE,
          payload: {
            local: localData,
          },
        });
    });

    Geolocation.getCurrentPosition(
      pos => {
        getStarted(pos.coords);
      },
      error => Alert.alert('GetCurrentPosition Error', JSON.stringify(error)),
      { enableHighAccuracy: true },
    );
  }, []);

  const handleDataReady = () => {
    dispatch({
      type: ADD_WEATHER_LOCATION,
      payload: {
        name: currentWeather.name || fiveDayForecast.city.name,
        currentWeather: currentWeather,
        forecast: fiveDayForecast,
      },
    });
    dispatch({
      type: SET_LOCATION,
      payload: currentWeather.name || fiveDayForecast.city.name || '',
    });

    setCurrentWeather({} as CurrentWeatherData);
    setFiveDayForecast({} as FiveDayForecastData);
  };

  useEffect(() => {
    const saveToStorage = async () => {
      try {
        if (Object.keys(weatherData).length > 0) {
          await AsyncStorage.setItem(
            'weatherLocal',
            JSON.stringify(weatherData),
          );
        }
        // getLocal()
      } catch (er: any) {
        console.log('Local storage error: ', er);
      }
    };
    saveToStorage();
  }, [weatherData, localStorage]);

  const getLocal = useCallback(async () => {
    try {
      const res = await AsyncStorage.getItem('weatherLocal');
      return JSON.parse(res || '{}');
    } catch (er: any) {
      console.log('Local storage error: ', er);
    }
  }, []);

  // useEffect(() => {
  //   console.log('Location: ', cityName)
  //   console.log('Weather: ', weather)
  //   // console.log('True: ', weather.currentWeather.name == cityName)
  // }, [cityName, weather]);

  const getStarted = (location: LocationData) => {
    setZu(location.latitude, location.longitude);

    SetLoadingOne(true);
    SetLoadingTwo(true);

    GetCurrentWeatherDataWithLatLong(
      location.latitude,
      location.longitude
    )
      .then(data => {
        setCurrentWeather(data || {});
      })
      .catch(e => {
        console.log(e);
      })
      .finally(() => SetLoadingOne(false));
    GetFiveDayWeatherForecastWithLatLong(
      location.latitude,
      location.longitude
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
