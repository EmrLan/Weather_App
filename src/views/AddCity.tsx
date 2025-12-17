import { useCallback, useEffect, useRef, useState } from 'react';
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import InputField, { InputFieldImperativeHandle } from '../components/inputField/InputField';
import Background from '../components/layouts/Background';
import Header from '../components/layouts/Header';
import { RootState } from '../redux/Store';
import {
  GetCurrentWeatherDataWithName,
  GetFiveDayWeatherForecastithName,
} from '../services/OpenWeatherServices';
import { Colors } from '../utils/Colors';
import { CurrentWeatherData, FiveDayForecastData } from '../AppContainer';
import {
  ADD_WEATHER_LOCATION,
  REMOVE_WEATHER_LOCATION,
} from '../redux/actions/ActionTypes';
import { useTranslation } from 'react-i18next';

export default function AddCity() {
  const citiesWeatherData = useSelector((state: RootState) => state.Weather);
  const locationCity = useSelector(
    (state: RootState) => state.Location.cityName,
  );
  const dispatch = useDispatch();
  const cityList = Object.keys(citiesWeatherData);
  const [city, setCity] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const curRef = useRef<InputFieldImperativeHandle>(null);
  const { t, i18n } = useTranslation();

  const [cityWeather, setCityWeather] = useState({} as CurrentWeatherData);
  const [cityFiveDayForecast, setCityFiveDayForecast] = useState(
    {} as FiveDayForecastData,
  );

  useEffect(() => {
    if (
      Object.entries(cityWeather).length > 0 &&
      Object.entries(cityFiveDayForecast).length > 0
    ) {
      dispatch({
        type: ADD_WEATHER_LOCATION,
        payload: {
          name: cityWeather.name || cityFiveDayForecast.city.name,
          currentWeather: cityWeather,
          forecast: cityFiveDayForecast,
        },
      });
      setCityWeather({} as CurrentWeatherData),
        setCityFiveDayForecast({} as FiveDayForecastData);
    }
  }, [cityWeather, cityFiveDayForecast, dispatch]);

  const onSubmit = useCallback(() => {
    if (curRef.current) curRef.current.imperativeBlur();
    if (!city.trim()) return;
    GetCurrentWeatherDataWithName(city)
      .then(data => {
        if (data.cod == '404') setErrorMsg(data.message);
        else {
          setErrorMsg('');
          setCityWeather(data || {});
          if (curRef.current) curRef.current.imperativeClear();
        }
      })
      .catch(e => {
        setErrorMsg('City Not Found.');
      });

    GetFiveDayWeatherForecastithName(city)
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
    dispatch({ type: REMOVE_WEATHER_LOCATION, payload: { name: inCity } });
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
                        {citiesWeatherData[city].currentWeather.main.temp}
                      </Text>
                      <Image
                        style={Styles.weatherIcon}
                        source={{
                          uri: `https://openweathermap.org/img/wn/${citiesWeatherData[city].currentWeather.weather[0].icon}@4x.png`,
                        }}
                      />
                    </View>
                    <Text style={{ ...Styles.darkBlue, ...Styles.maxMinCtn }}>
                      <Text style={{ ...Styles.orange }}>
                        {citiesWeatherData[city].currentWeather.main.temp_max}
                      </Text>{' '}
                      / {citiesWeatherData[city].currentWeather.main.temp_min}
                    </Text>
                  </View>
                  {city == locationCity ? (
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
              errorClr="black"
              error={errorMsg}
              ref={curRef}
              onChangeText={setCity}
              value={city}
              placeholder={t('addCity.value')}
              placeholderTextColor={
                errorMsg.length > 0 ? 'black' : Colors.secondary
              }
              onSubmitEditing={onSubmit}
              returnKeyType={'done'}
            />
            <TouchableOpacity style={Styles.addIconCtn} onPress={onSubmit}>
              <Text style={Styles.addIconTxt}>{t('addCity.btnTxt')}</Text>
            </TouchableOpacity>
          </View>
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
});
