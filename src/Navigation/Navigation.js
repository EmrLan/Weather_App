import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../Views/Home';
import Weather from '../Views/Weather';

const LeftDrawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

export function HomeStack() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Weather" component={Weather} />
    </Stack.Navigator>
  );
}

export const LeftDrawerScreen = () => {
  return (
    <LeftDrawer.Navigator
      initialRouteName="Home"
      screenOptions={{
        drawerPosition: 'left',
        headerShown: false,
        drawerStyle: { backgroundColor: '#b7b9d9', color: "white" },
        drawerActiveTintColor: "white",
        drawerInactiveTintColor: '#090979',
        drawerActiveBackgroundColor: "#7481bc"
      }}
    >
      <LeftDrawer.Screen name="Home" component={Home} />
      <LeftDrawer.Screen name="Weather" component={Weather} />
    </LeftDrawer.Navigator>
  );
};

export function Navigation() {
  return <LeftDrawerScreen />;
}
