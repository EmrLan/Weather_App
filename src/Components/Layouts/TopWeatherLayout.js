import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import BtnWithIconAtTop from '../Buttons/BtnWithIconAtTop';
import TemperatureChart from '../TemperatureChart';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';

export default function TopWeatherLayout({ data, dataList }) {
  const Icons = [
    require('../../../assets/icons/umbrella_icon.png'),
    require('../../../assets/icons/water_drop_icon.png'),
    require('../../../assets/icons/wind_icon.png'),
  ];
  const name = ['Ground Level', 'Humidity', 'Wind Speed'];
  const navigation = useNavigation();

  return (
    <View style={Styles.container}>
      <View style={Styles.menuCtn}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Image
            style={Styles.MenuBtn}
            source={require('../../../assets/icons/menu_icon.png')}
          />
        </TouchableOpacity>
        <Text style={Styles.cityName}>{data.name}</Text>
        <TouchableOpacity>
          <Image
            style={Styles.AddBtn}
            source={require('../../../assets/icons/add_icon.png')}
          />
        </TouchableOpacity>
      </View>
      <View style={Styles.topCtn}>
        <Text style={{ ...Styles.color }}>
          {new Date().toLocaleDateString(undefined, {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </Text>
        <Text style={{ ...Styles.color, ...Styles.tempText }}>
          {data.temperature ? Math.round(data.temperature) : '22'}
          <Text style={Styles.degree}>&deg;</Text>
        </Text>
        <View style={Styles.DesSWithImgCtn}>
          <Text style={{ ...Styles.color, ...Styles.weatherDes }}>
            {data.description ? data.description : 'Cloudy'}
          </Text>
          {data.icon ? (
            <Image
              source={{
                uri: `https://openweathermap.org/img/wn/${data.icon}@4x.png`,
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
        {Icons.map((item, index) => (
          <BtnWithIconAtTop
            icon={item}
            data={{
              humidity: data.humidity,
              grnd_level: data.grnd_level,
              windSpeed: data.windSpeed,
            }}
            name={name[index]}
            key={item}
            index={index}
          />
        ))}
      </View>
      <View style={Styles.bottomCtn}>
        <TemperatureChart data={dataList} />
      </View>
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {
    flex: 8,
    width: '100%',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    alignItems: 'center',
    paddingTop: Platform.OS === 'android' ? '35' : '60',
    gap: 10,
  },

  menuCtn: {
    tintColor: '#090979',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '85%',
  },
  cityName: {
    fontSize: 20,
    color: '#090979'
  },
  MenuBtn: {
    width: 20,
    height: 20,
  },
  addIcon: {
    tintColor: '#090979',
  },

  topCtn: {
    alignItems: 'center',
  },

  DesSWithImgCtn: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    transform: [{ translateY: -90 }],
  },

  color: {
    color: '#090979',
  },
  tempText: {
    fontSize: 160,
    fontWeight: '900',
  },
  degree: {
    fontSize: 160,
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
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    flexDirection: 'row',
    borderRadius: 60,
    paddingLeft: 30,
    paddingRight: 30,
    justifyContent: 'space-between',
    transform: [{ translateY: -50 }],
  },
  bottomCtn: {
    flex: 1,
    alignContent: 'center',
    transform: [{ translateY: -40 }],
  },
});
