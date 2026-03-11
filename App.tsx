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



// import React from 'react';
// import {
//   SafeAreaView,
//   StyleSheet,
//   Text,
//   TextInput,
//   Button,
// } from 'react-native';
// import NativeLocalStorage from './specs/NativeLocalStorage';
// const EMPTY = '<empty>';

// function App(): React.JSX.Element {
//   const [value, setValue] = React.useState<string | null>(null);

//   const [editingValue, setEditingValue] = React.useState<
//     string | null
//   >(null);

//   React.useEffect(() => {
//     const storedValue = NativeLocalStorage?.getItem('myKey');
//     setValue(storedValue ?? '');
//   }, []);

//   function saveValue() {
//     NativeLocalStorage?.setItem(editingValue ?? EMPTY, 'myKey');
//     setValue(editingValue);
//   }

//   function clearAll() {
//     NativeLocalStorage?.clear();
//     setValue('');
//   }

//   function deleteValue() {
//     NativeLocalStorage?.removeItem('myKey');
//     setValue('');
//   }

//   return (
//     <SafeAreaView style={{flex: 1}}>
//       <Text style={styles.text}>
//         Current stored value is: {value ?? 'No Value'}
//       </Text>
//       <TextInput
//         placeholder="Enter the text you want to store"
//         style={styles.textInput}
//         onChangeText={setEditingValue}
//       />
//       <Button title="Save" onPress={saveValue} />
//       <Button title="Delete" onPress={deleteValue} />
//       <Button title="Clear" onPress={clearAll} />
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   text: {
//     margin: 10,
//     fontSize: 20,
//   },
//   textInput: {
//     margin: 10,
//     height: 40,
//     borderColor: 'black',
//     borderWidth: 1,
//     paddingLeft: 5,
//     paddingRight: 5,
//     borderRadius: 5,
//   },
// });

// export default App;