import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import DayBtn from '../buttons/DayBtn';
import { ReactNode, useEffect, useState } from 'react';
import { useCityWeather } from '../../context/Context';

interface PropsContainer {
  children: ReactNode;
}

export default function EightTwoLayout(props: PropsContainer) {

  return (
    <View style={Styles.container}>
      {props.children}
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {
    flex: 2,
    justifyContent: 'space-between',
    padding: 10,
  },
});
