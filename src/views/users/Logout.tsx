import { getAuth, signOut } from '@react-native-firebase/auth';
import { useEffect, useState } from 'react';
import LoadingScreen from '../LoadingScreen';
import { useNavigation } from '@react-navigation/native';
import { AppStackNavigationProp } from '../../navigation/Navigation';

export default function Logout() {
  useEffect(() => {
    signOut(getAuth()).then(() => console.log("Logout btn worked, signing out."));
  }, []);
  return <LoadingScreen />;
}
