import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { CityWeatherProvider } from './src/context/Context';
import AppContainer from './src/views/AppContainer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />

      <GestureHandlerRootView>
        <CityWeatherProvider>
          <AppContainer />
        </CityWeatherProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  );
}

export default App;
