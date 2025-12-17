import { Image, Platform, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/Store';
import { Colors } from '../../utils/Colors';
import BtnWithIconAtTop from '../../components/buttons/BtnWithIconAtTop';
import TemperatureChart from '../../components/TemperatureChart';
import Header from '../../components/layouts/Header';

interface PropsContainer {
  cityName: string;
}

export default function TopWeatherLayout({ cityName }: PropsContainer) {
  const Icons = [
    require('../../../assets/icons/umbrella_icon.png'),
    require('../../../assets/icons/water_drop_icon.png'),
    require('../../../assets/icons/wind_icon.png'),
  ];
  const iconNames = ['Ground Level', 'Humidity', 'Wind Speed'];

  const citiesWeatherData = useSelector((state: RootState) => state.Weather);
  const weatherToday = citiesWeatherData[cityName]?.currentWeather;
  const fiveDayForecast = citiesWeatherData[cityName]?.forecast;

  return (
    <View style={Styles.container}>
      <Header
        title={cityName}
        icon={require('../../../assets/icons/add_icon.png')}
        route={'Add City'}
      />
      <View style={Styles.topCtn}>
        <Text style={{ ...Styles.color }}>
          {new Date().toLocaleDateString(undefined, {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </Text>

        <View style={Styles.WeatherTxtCtn}>
          <Text style={{ ...Styles.color, ...Styles.tempText }}>
            {weatherToday?.temperature
              ? Math.round(weatherToday?.temperature)
              : '22'}
          </Text>
          <Text style={{ ...Styles.color, ...Styles.degree }}>&deg;</Text>
        </View>

        <View style={Styles.DesSWithImgCtn}>
          <Text style={{ ...Styles.color, ...Styles.weatherDes }}>
            {weatherToday?.description ? weatherToday.description : 'Cloudy'}
          </Text>
          {weatherToday?.icon ? (
            <Image
              source={{
                uri: `https://openweathermap.org/img/wn/${weatherToday.icon}@4x.png`,
              }}
              style={Styles.descIcon}
            />
          ) : (
            <Image
              source={{ uri: 'https://openweathermap.org/img/wn/10n@4x.png' }}
              style={Styles.descIcon}
            />
          )}
        </View>
      </View>
      <View style={Styles.middleCtn}>
        {Icons.map((item, index) => {
          let strData = '';
          if (index == 0) {
            strData = `${weatherToday?.main?.grnd_level} feet`;
          } else if (index == 1) {
            strData = `${weatherToday?.main?.humidity} %`;
          } else if (index == 2) strData = `${weatherToday?.wind?.speed} mph`;
          return (
            <BtnWithIconAtTop
              icon={item}
              name={iconNames[index]}
              key={item}
              data={strData}
            />
          );
        })}
      </View>
      <View style={Styles.bottomCtn}>
        <TemperatureChart data={fiveDayForecast?.list} />
      </View>
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {
    flex: 8,
    width: '100%',
    backgroundColor: Colors.bgSecondary,
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    alignItems: 'center',
    paddingTop: Platform.OS === 'android' ? 50 : 60,
    gap: 10,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  topCtn: {
    alignItems: 'center',
  },
  color: {
    color: '#041E42',
  },

  WeatherTxtCtn: {
    flexDirection: 'row',
  },
  tempText: {
    fontSize: 160,
    fontWeight: '900',
  },

  DesSWithImgCtn: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    transform: [{ translateY: -90 }],
  },
  degree: {
    fontSize: 110,
  },
  weatherDes: {
    fontSize: 30,
    fontWeight: '600',
  },
  descIcon: {
    width: 180,
    height: 100,
  },

  middleCtn: {
    width: '85%',
    backgroundColor: Colors.bgTertiary,
    flexDirection: 'row',
    borderRadius: 60,
    paddingLeft: 30,
    paddingRight: 30,
    justifyContent: 'space-between',
    paddingTop: 10,
    paddingBottom: 10,
    transform:
      Platform.OS === 'android' ? [{ translateY: -65 }] : [{ translateY: -45 }],
  },
  bottomCtn: {
    flex: 1,
    alignContent: 'center',
    transform:
      Platform.OS === 'android' ? [{ translateY: -65 }] : [{ translateY: -40 }],
  },
});
