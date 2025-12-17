import {
  Alert,
  Button,
  Image,
  Platform,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import Background from '../components/layouts/Background';
import { lazy, useCallback, useEffect, useState } from 'react';
import Geolocation from '@react-native-community/geolocation';
import MapView, { Marker } from 'react-native-maps';
import { Colors } from '../utils/Colors';
import useWatchLocation from '../zustand/store';
import Header from '../components/layouts/Header';
import { useFocusEffect } from '@react-navigation/native';

interface Coords {
  accuracy: number;
  altitude: number | null;
  altitudeAccuracy: number | null;
  heading: number | null;
  latitude: number;
  longitude: number;
  speed: number | null;
}

export default function Map() {
  const setZu = useWatchLocation(state => state.setCoords);
  const zuLat = useWatchLocation(state => state.latitude);
  const zuLong = useWatchLocation(state => state.longitude);

  const watchPosition = () => {
    try {
      const id = Geolocation.watchPosition(
        position => {
          // console.log('watchPosition', position.coords);
          setZu(position.coords.latitude, position.coords.longitude);
          setPosition({
            accuracy: position.coords.accuracy,
            altitude: position.coords.altitude,
            altitudeAccuracy: position.coords.altitudeAccuracy,
            heading: position.coords.heading,
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            speed: position.coords.speed,
          });
        },
        error => console.warn('WatchPosition Error', JSON.stringify(error)),
      );
      return id;
    } catch (error) {
      console.warn('WatchPosition Error', JSON.stringify(error));
      return null;
    }
  };

  const clearWatch = (id: number | null) => {
    id !== null && Geolocation.clearWatch(id);
    setPosition(null);
  };

  const [position, setPosition] = useState<Coords | null>(null);

  useFocusEffect(
    useCallback(() => {
      const watchID = watchPosition();
      console.log('Mounting Watcher ID:', watchID);

      return () => {
        if (watchID !== null) {
          console.log('EXITED....');
          clearWatch(watchID);
        }
      };
    }, []),
  );

  return (
    <Background>
      <View style={Styles.topContainer}>
        <View style={Styles.header}>
          <Header title="" />
        </View>

        <MapView
          style={Styles.map}
          region={{
            latitude: position?.latitude || 37.78825,
            longitude: position?.longitude || -122.4324,
            latitudeDelta: 0.03,
            longitudeDelta: 0.03,
          }}
        >
          <Marker
            coordinate={{
              latitude: position?.latitude || 37.78825,
              longitude: position?.longitude || -122.4324,
            }}
          >
            <Image
              style={Styles.markerImg}
              source={require('../../assets/icons/default_marker_icon.png')}
            />
          </Marker>
        </MapView>
      </View>
      <View style={Styles.bottomContainer}>
        <Text style={Styles.txtCol}>Latitude: {zuLat}</Text>
        <Text style={Styles.txtCol}>Longitude: {zuLong}</Text>
      </View>
    </Background>
  );
}

const Styles = StyleSheet.create({
  topContainer: {
    flex: 8,
    width: '100%',
    borderBottomRightRadius: 40,
    borderBottomLeftRadius: 30,
    alignItems: 'center',
    paddingBottom: 20,
    gap: 20,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
    overflow: 'hidden',
  },
  header: {
    paddingTop: Platform.OS === 'android' ? 50 : 60,
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: 1,
    alignItems: 'center',
  },
  map: {
    flex: 1,
    width: '100%',
  },

  bottomContainer: {
    flex: 2,
    padding: 10,
    justifyContent: 'center',
  },
  markerImg: {
    height: 30,
    width: 30,
    tintColor: Colors.primary,
  },
  txtCol: {
    color: Colors.secondary,
  },
});
