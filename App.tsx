import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import LoadingScreen from './src/Views/Home';
import HomePage from './src/Views/Weather';
import {Navigation} from './src/Navigation/Navigation';


function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <NavigationContainer>
        <Navigation/>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
