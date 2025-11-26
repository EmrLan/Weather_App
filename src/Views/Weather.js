import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import Config from 'react-native-config';
import Background from '../Components/Layouts/Background';
import BottomWeatherLayout from '../Components/Layouts/BottomWeatherLayout';
import TopWeatherLayout from '../Components/Layouts/TopWeatherLayout';
import {
  GetCurrentWeatherData,
  GetFiveDayWeatherForecast,
} from '../Services/OpenWeatherServices';

export default function Weather({ route }) {
  const [weatherNow, setWeatherNow] = useState();
  const [fiveDayForecast, setFiveDayForecast] = useState();
  const [todayForecast, setTodayForecast] = useState();
  const { currentDay, currentWeather, foreCast } = route.params || {};
  useEffect(() => {
    // console.log("Today: ", currentDay);
    // console.log("Current Weather: ", currentWeather);
    // console.log("Forecast: ", foreCast.length);
    setWeatherNow(currentWeather);
    setTodayForecast(currentDay);
    setFiveDayForecast(foreCast);
  }, [currentDay, currentWeather, foreCast]);

  return (
    <Background>
      <TopWeatherLayout
        data={{
          temperature: weatherNow?.main?.temp,
          description: weatherNow?.weather?.[0]?.main,
          icon: weatherNow?.weather?.[0]?.icon,
          humidity: weatherNow?.main?.humidity,
          windSpeed: weatherNow?.wind?.speed,
          grnd_level: weatherNow?.main?.grnd_level,
          name: weatherNow?.name
        }}
        dataList={fiveDayForecast}
      />
      <BottomWeatherLayout
        currentDay={todayForecast}
        dataList={fiveDayForecast}
      />
    </Background>
  );
}
