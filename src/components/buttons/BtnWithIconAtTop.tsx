import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { useCityWeather } from '../../context/Context';
import { CityWeatherObj } from '../../reducer/CityWeatherReducer';
import { useEffect } from 'react';
import { Colors } from '../../utils/Colors';

interface propsContainer {
  name: string;
  cityName: string;
  icon: ImageSourcePropType;
  index: number;
}

export default function BtnWithIconAtTop(props: propsContainer) {
  const city: CityWeatherObj = useCityWeather();
  const weatherToday = city[props.cityName]?.currentWeather;

  // useEffect(() => {
  //   console.log("TITLE BTN: ", props.titleRef);
  // }, [])

  return (
    <TouchableOpacity style={Styles.container}>
      <Image style={Styles.btnIcon} source={props.icon} />
      <Text style={{ ...Styles.btnText, ...Styles.bigFont }}>
        {props.index == 0 ? weatherToday?.main?.grnd_level : ''}
        {props.index == 1 ? weatherToday?.main?.humidity : ''}
        {props.index == 2 ? weatherToday?.wind?.speed : ''}
        {props.index == 0 ? ' feet' : ''}
        {props.index == 1 ? ' %' : ''}
        {props.index == 2 ? ' mph' : ''}
      </Text>
      <Text style={Styles.btnText}>{props.name}</Text>
    </TouchableOpacity>
  );
}

const Styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: 'center',
    gap: 3,
  },
  bigFont: {
    fontSize: 15,
    fontWeight: '500',
    margin: 1,
  },
  btnText: {
    color: Colors.primary,
    fontSize: 10,
  },
  btnIcon: {
    tintColor: Colors.primary,
    width: 20,
    height: 20,
  },
});
