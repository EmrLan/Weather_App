import {
  BottomTabNavigationProp,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import {
  createDrawerNavigator,
  DrawerNavigationProp,
} from '@react-navigation/drawer';
import { CompositeNavigationProp, RouteProp } from '@react-navigation/native';
import CustomerTabBar from '../components/layouts/CustomTabBar';
import { useCityWeather } from '../context/Context';
import AddCity from '../views/AddCity';
import Weather from '../views/Weather';
import Login from '../views/users/Login';
import { Colors } from '../utils/Colors';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import { Signup } from '../views/users/Signup';
import Settings from '../views/Setting';
import { useEffect, useMemo, useState } from 'react';
import { getAuth, onAuthStateChanged } from '@react-native-firebase/auth';
import type { FirebaseAuthTypes } from '@react-native-firebase/auth';
import Logout from '../views/users/Logout';
import LoadingScreen from '../views/LoadingScreen';
import SupportChat from '../views/supportChat/SupportChat';
import { getApp } from '@react-native-firebase/app';
import { getFirestore } from '@react-native-firebase/firestore';
import AdminChat from '../views/supportChat/AdminChat';

const LeftDrawer = createDrawerNavigator<RootDrawerParamList>();
const Tab = createBottomTabNavigator<CityTabParamList>();

type CityTabParamList = {
  [key: string]: { cityTitle?: string } | undefined;
  Default: { cityTitle: string };
};

type TabRouteName = Exclude<keyof CityTabParamList, number>;

type RootDrawerParamList = {
  Weather: undefined;
  'Add City': undefined;
  SuperChat: undefined;
  Settings: undefined;
  Support: { routeEmail: string };
  Logout: undefined;
};

type RootStackParamList = {
  Login: undefined;
  Signup: undefined;
};

export type DefaultRouteProp = RouteProp<
  CityTabParamList,
  keyof CityTabParamList
>;

export type StackNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export type ProfileScreenNavigationProp = CompositeNavigationProp<
  BottomTabNavigationProp<CityTabParamList, TabRouteName>,
  DrawerNavigationProp<RootDrawerParamList>
>;

const Stack = createNativeStackNavigator();

export function CityTab() {
  const cities = useCityWeather();
  const cityList = Object.keys(cities || []);

  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={props => <CustomerTabBar {...props} />}
    >
      {cityList.length > 0 ? (
        cityList.map(city => (
          <Tab.Screen key={city} name={city} component={Weather} />
        ))
      ) : (
        <Tab.Screen
          name={'Default'}
          component={Weather}
          initialParams={{ cityTitle: 'default' }}
        />
      )}
    </Tab.Navigator>
  );
}

type AppRootParamList = {
  Loading: undefined;
  Auth: undefined;
  App: undefined;
};

export type AppStackNavigationProp =
  NativeStackNavigationProp<AppRootParamList>;

const AppStack = createNativeStackNavigator<AppRootParamList>();

export function HomeStack() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Signup" component={Signup} />
    </Stack.Navigator>
  );
}

export const LeftDrawerScreen = () => {
  const app = getApp();
  const db = getFirestore(app);
  const auth = getAuth(app);
  const userEmail = auth.currentUser?.email || '';
  return (
    <LeftDrawer.Navigator
      screenOptions={{
        drawerPosition: 'left',
        headerShown: false,
        drawerStyle: { backgroundColor: Colors.primary, opacity: 0.6 },
        drawerActiveTintColor: Colors.primary,
        drawerInactiveTintColor: Colors.secondary,
        drawerActiveBackgroundColor: Colors.tertiary,
      }}
    >
      <LeftDrawer.Screen name="Weather" component={CityTab} />
      <LeftDrawer.Screen name="Add City" component={AddCity} />
      <LeftDrawer.Screen name="Settings" component={Settings} />
      {userEmail == 'support@gmail.com' ? (
        <LeftDrawer.Screen name="SuperChat" component={AdminChat} />
      ) : (
        <LeftDrawer.Screen
          options={{
            drawerItemStyle: { display: 'none' },
            headerLeft: () => null,
          }}
          name="SuperChat"
          component={AdminChat}
        />
      )}

      {userEmail == 'support@gmail.com' ? (
        <LeftDrawer.Screen
          options={{
            drawerItemStyle: { display: 'none' },
            headerLeft: () => null,
          }}
          name="Support"
          component={SupportChat}
        />
      ) : (
        <LeftDrawer.Screen name="Support" component={SupportChat} />
      )}

      <LeftDrawer.Screen name="Logout" component={Logout} />
    </LeftDrawer.Navigator>
  );
};

export function Navigation() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);

  function handleAuthStateChanged(user: FirebaseAuthTypes.User | null) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, handleAuthStateChanged);
    return unsubscribe;
  }, []);

  if (initializing) return null;

  return (
    <AppStack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <AppStack.Screen name="App" component={LeftDrawerScreen} />
      ) : (
        <AppStack.Screen name="Auth" component={HomeStack} />
      )}
    </AppStack.Navigator>
  );
}
