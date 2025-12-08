import Background from '../components/layouts/Background';
import BottomWeatherLayout from '../components/layouts/BottomWeatherLayout';
import TopWeatherLayout from '../components/layouts/TopWeatherLayout';
import { DefaultRouteProp } from '../navigation/Navigation';

interface WeatherProps {
  route: DefaultRouteProp;
}

export default function Weather({ route }: Readonly<WeatherProps>) {
  return (
    <Background>
      <TopWeatherLayout cityName={route.name} />
      <BottomWeatherLayout cityName={route.name} />
    </Background>
  );
}
