import { useCallback, useEffect, useRef, useState } from 'react';
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import InputField from '../components/inputField/InputField';
import Background from '../components/layouts/Background';
import Header from '../components/layouts/Header';
import {
  GetCurrentWeatherDataWithName,
  GetFiveDayWeatherForecastithName,
} from '../services/OpenWeatherServices';
import Config from 'react-native-config';
import { useCityWeather, useCityWeatherUpdate } from '../context/Context';
import { ACTIONS } from '../reducer/CityWeatherAction';
import { CurrentWeatherData, FiveDayForecastData } from './AppContainer';
import { Colors } from '../utils/Colors';

interface InputFieldRef {
  imperativeClear: () => void;
  imperativeBlur: () => void;
}

export default function AddCity() {
  const contextCity = useCityWeather();
  const dispatchCity = useCityWeatherUpdate();
  const cityList = Object.keys(contextCity);
  const [city, setCity] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const curRef = useRef<InputFieldRef>(null);

  const [cityWeather, setCityWeather] = useState({} as CurrentWeatherData);
  const [cityFiveDayForecast, setCityFiveDayForecast] = useState(
    {} as FiveDayForecastData,
  );

  useEffect(() => {
    if (
      Object.entries(cityWeather).length > 0 &&
      Object.entries(cityFiveDayForecast).length > 0
    ) {
      dispatchCity({
        type: ACTIONS.ADD,
        payload: {
          name: cityWeather.name || cityFiveDayForecast.city.name,
          currentWeather: cityWeather,
          forecast: cityFiveDayForecast,
          location: contextCity?.[cityWeather.name]?.geolocation
            ? contextCity[cityWeather.name].geolocation
            : false,
        },
      });
      setCityWeather({} as CurrentWeatherData),
        setCityFiveDayForecast({} as FiveDayForecastData);
    }
  }, [cityWeather, cityFiveDayForecast, dispatchCity]);

  const onSubmit = useCallback(() => {
    if (curRef.current) curRef.current.imperativeBlur();
    if (!city.trim()) return;
    GetCurrentWeatherDataWithName(city, Config.OPEN_WEATHER_KEY || '')
      .then(data => {
        if (data.cod == '404') setErrorMsg(data.message);
        else {
          setErrorMsg('');
          setCityWeather(data || {});
          if (curRef.current) curRef.current.imperativeClear();
        }
      })
      .catch(e => {
        console.log(e);
      });

    GetFiveDayWeatherForecastithName(city, Config.OPEN_WEATHER_KEY || '')
      .then(data => {
        if (data.cod == '404') setErrorMsg(data.message);
        else {
          setErrorMsg('');
          setCityFiveDayForecast(data || {});
        }
      })
      .catch(e => {
        console.log(e);
      });
  }, [city]);

  const onDelete = (inCity: string) => {
    dispatchCity({ type: ACTIONS.REMOVE, payload: { name: inCity } });
  };

  return (
    <Background>
      <KeyboardAvoidingView behavior={'padding'} style={Styles.container}>
        <View style={Styles.topContainer}>
          <Header title={''} />
          <FlatList
            style={Styles.flatList}
            data={cityList || []}
            renderItem={({ item: city }) => {
              return (
                <View style={Styles.cityIconCtn}>
                  <View>
                    <Text
                      style={{ ...Styles.darkBlue, ...Styles.cityTxt }}
                      key={city}
                    >
                      {city}
                    </Text>
                    <View style={Styles.tempIconCtn}>
                      <Text style={{ ...Styles.darkBlue, ...Styles.curTemp }}>
                        {contextCity[city].currentWeather.main.temp}
                      </Text>
                      <Image
                        style={Styles.weatherIcon}
                        source={{
                          uri: `https://openweathermap.org/img/wn/${contextCity[city].currentWeather.weather[0].icon}@4x.png`,
                        }}
                      />
                    </View>
                    <Text style={{ ...Styles.darkBlue, ...Styles.maxMinCtn }}>
                      <Text style={{ ...Styles.orange }}>
                        {contextCity[city].currentWeather.main.temp_max}
                      </Text>{' '}
                      / {contextCity[city].currentWeather.main.temp_min}
                    </Text>
                  </View>
                  {contextCity[city].geolocation ? (
                    <Image
                      style={Styles.deleteIcon}
                      source={require('../../assets/icons/location_icon.png')}
                    />
                  ) : (
                    <TouchableOpacity onPress={() => onDelete(city)}>
                      <Image
                        style={Styles.deleteIcon}
                        source={require('../../assets/icons/trash_icon.png')}
                      />
                    </TouchableOpacity>
                  )}
                </View>
              );
            }}
          />
        </View>
        <View style={Styles.bottomContainer}>
          <View style={Styles.inputAndBtnCtn}>
            <InputField
              fn={setCity}
              submitFn={onSubmit}
              error={errorMsg}
              value={city}
              placeholder={'Enter City Name'}
              ref={curRef}
            />
            <TouchableOpacity style={Styles.addIconCtn} onPress={onSubmit}>
              <Text style={Styles.addIconTxt}>Add City</Text>
            </TouchableOpacity>
          </View>
          <Text style={Styles.errMsg}>{errorMsg}</Text>
        </View>
      </KeyboardAvoidingView>
    </Background>
  );
}
const Styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  darkBlue: {
    color: Colors.primary,
  },
  orange: {
    color: Colors.tertiary,
  },
  topContainer: {
    flex: 8,
    width: '100%',
    backgroundColor: Colors.bgSecondary,
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    alignItems: 'center',
    paddingTop: Platform.OS === 'android' ? 50 : 60,
    paddingBottom: 20,
    gap: 20,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  flatList: {
    flex: 1,
    width: '90%',
  },
  cityIconCtn: {
    backgroundColor: Colors.bgTertiary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 25,
    paddingVertical: 10,
    justifyContent: 'space-between',
    borderRadius: 30,
    marginVertical: 5,
  },
  tempIconCtn: {
    flexDirection: 'row',
    alignItems: 'center',
    tintColor: Colors.primary,
  },
  cityTxt: {
    fontSize: 23,
    fontWeight: 'condensed',
  },
  curTemp: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  weatherIcon: {
    width: 40,
    height: 40,
  },
  maxMinCtn: {
    fontSize: 11,
  },
  deleteIcon: {
    width: 20,
    height: 20,
    tintColor: Colors.primary,
  },

  bottomContainer: {
    flex: 2,
    padding: 10,
    justifyContent: 'center',
  },
  inputAndBtnCtn: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    flexDirection: 'row',
    gap: 10,
  },
  addIconCtn: {
    flexDirection: 'row',
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    padding: 25,
    gap: 10,
  },
  addIconTxt: {
    color: Colors.secondary,
  },
  errMsg: {
    paddingTop: 2,
    paddingLeft: 20,
    color: Colors.secondary,
  },
});
