import { lazy, Suspense } from 'react';
import { ActivityIndicator } from 'react-native';
import Background from '../../components/layouts/Background';
import { DefaultRouteProp } from '../../navigation/Navigation';

interface WeatherProps {
  route: DefaultRouteProp;
}

export default function Weather({ route }: Readonly<WeatherProps>) {
  const LazyTop = lazy(() => import('./TopWeatherLayout'));
  const LazyBottom = lazy(() => import('./BottomWeatherLayout'));

  return (
    <Background>
      <Suspense fallback={<ActivityIndicator size="large" />}>
        <LazyTop cityName={route.name} />
        <LazyBottom cityName={route.name} />
      </Suspense>
    </Background>
  );
}
