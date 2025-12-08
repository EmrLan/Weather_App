import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native';
import Background from '../components/layouts/Background';

export default function LoadingScreen() {
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
          <ActivityIndicator size="small" color="white" />
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
    paddingLeft: 20,
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
