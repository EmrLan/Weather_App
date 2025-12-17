import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppContainer from './src/AppContainer';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Provider } from 'react-redux';
import Store from './src/redux/Store';
import './src/translations/i18n.tsx';
import ErrorPage from './src/ErrorPage.tsx';

function App() {
  return (
    <SafeAreaProvider>
      <StatusBar barStyle={'light-content'} />

      <ErrorPage>
        <GestureHandlerRootView>
          <Provider store={Store}>
            <AppContainer />
          </Provider>
        </GestureHandlerRootView>
      </ErrorPage>
    </SafeAreaProvider>
  );
}

export default App;
