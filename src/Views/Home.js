import { useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Config from 'react-native-config';
import InputField from '../Components/InputField/InputField';
import Background from '../Components/Layouts/Background';
import {
  GetCurrentWeatherDataWithName,
  GetFiveDayWeatherForecastithName,
} from '../Services/OpenWeatherServices';

export default function Home() {
  const [city, setCity] = useState('');
  const [curWeather, setCurWeather] = useState({});
  const [fiveDayForecast, setfiveDayForecast] = useState([]);
  const [today, setToday] = useState({});
  const [loadingOne, SetLoadingOne] = useState(false);
  const [loadingTwo, SetLoadingTwo] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  // useEffect(() => {
  //   console.log('leng: ', fiveDayForecast?.length);
  // }, [fiveDayForecast]);

  useEffect(() => {
    if (
      !loadingOne &&
      !loadingTwo &&
      Object.entries(curWeather)?.length > 0 &&
      fiveDayForecast.length
    ) {
      navigation.navigate('Weather', {
        currentDay: today,
        currentWeather: curWeather,
        foreCast: fiveDayForecast,
      });
    }
  }, [loadingOne, loadingTwo]);

  const getStarted = () => {
    if (city.length > 1) {
      SetLoadingOne(true);
      SetLoadingTwo(true);
      GetCurrentWeatherDataWithName(city, Config.OPEN_WEATHER_KEY)
        .then(data => {
          if ((data.cod = '200')) {
            const today = new Date().toLocaleString('en-US', {
              weekday: 'long',
            });
            const tempIcon = data?.weather?.[0]?.icon || '';
            const temp = {};
            temp[today] = {
              maxT: data?.main?.temp_max || 0,
              minT: data?.main?.temp_min || 0,
              icon: {},
              current: true,
            };
            temp[today].icon[tempIcon] = 1;
            setToday(temp);
            setCurWeather(data);
            // SetLoadingOne(false);
          } else {
            setErrorMsg(data.message);
          }
        })
        .catch(e => {
          console.log(e);
        })
        .finally(() => SetLoadingOne(false));
      GetFiveDayWeatherForecastithName(city, Config.OPEN_WEATHER_KEY)
        .then(data => {
          if ((data.cod = '200')) {
            setfiveDayForecast(data?.list || []);
          } else {
            setErrorMsg(data.message);
          }
        })
        .catch(e => {
          console.log(e);
        })
        .finally(() => SetLoadingTwo(false));
    } else {
      setErrorMsg('City Name has to be longer than 1 character');
    }
  };

  const navigation = useNavigation();
  return (
    <Background>
      <View style={Styles.Container}>
        <View style={Styles.IconContainer}>
          <Image
            style={Styles.weatherIcon}
            source={require('../../assets/icons/weather_icon.png')}
          />
        </View>
        <View style={Styles.btnTxtContainer}>
          <Text style={Styles.weatherText}>Weather</Text>
          <Text style={Styles.forecastText}>Forecasts</Text>
          <View>
            <InputField fn={setCity} error={errorMsg} value={city} />
            <Text style={Styles.errorTxt}>{errorMsg}</Text>
          </View>
          <TouchableOpacity style={Styles.btn} onPress={() => getStarted()}>
            {loadingOne || loadingTwo ? (
              <ActivityIndicator size="small" color="white" />
            ) : (
              <Text style={Styles.btnTxt}>Get Started</Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </Background>
  );
}

const Styles = StyleSheet.create({
  Container: {
    height: '70%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  IconContainer: {
    shadowColor: '#121221ff',
    shadowOffset: { width: -20, height: 30 },
    shadowOpacity: 0.6,
    shadowRadius: 15,
  },
  weatherIcon: {
    width: 220,
    height: 220,
  },
  btnTxtContainer: {
    gap: 20,
  },
  weatherText: {
    fontSize: 70,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  forecastText: {
    fontSize: 70,
    color: 'white',
    transform: [{ translateY: -25 }],
    textAlign: 'center',
  },
  errorTxt: {
    color: '#FF2400',
    paddingLeft: '20',
  },
  btn: {
    backgroundColor: '#090979',
    alignItems: 'center',
    padding: 20,
    borderRadius: 30,
  },
  btnTxt: {
    color: 'white',
  },
});
