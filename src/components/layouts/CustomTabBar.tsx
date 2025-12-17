import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/Store';
import { Colors } from '../../utils/Colors';
import { useEffect } from 'react';

export default function CustomTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const citiesWeatherData = useSelector((state: RootState) => state.Weather);
  const locationCity = useSelector(
    (state: RootState) => state.Location.cityName,
  );

    

  return (
    <View style={Styles.container}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;
        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity key={route.key} onPress={onPress}>
            {route.name== locationCity ? (
              <Image
                style={[
                  Styles.icon,
                  isFocused ? Styles.iconActive : Styles.iconInactive,
                  Styles.locationIcon,
                ]}
                source={require('../../../assets/icons/location_icon.png')}
              />
            ) : (
              <Image
                style={[
                  Styles.icon,
                  isFocused ? Styles.iconActive : Styles.iconInactive,
                ]}
                source={require('../../../assets/icons/dot_icon.png')}
              />
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 15,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  iconActive: {
    width: 30,
    height: 30,
    tintColor: Colors.primary,
  },
  iconInactive: {
    tintColor: Colors.secondary,
  },
  locationIcon: {
    width: 20,
    height: 20,
    paddingRight: 5,
  },
  icon: {
    tintColor: Colors.secondary,
    width: 30,
    height: 30,
  },
});
