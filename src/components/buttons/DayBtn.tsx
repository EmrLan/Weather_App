import { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Colors } from '../../utils/Colors';

interface PropsData {
  icon: { [key: string]: number };
  minT: number;
  maxT: number;
  current?: boolean;
}

interface PropsContainer {
  data: [string, PropsData];
}

export default function DayBtn(props: PropsContainer) {
  const [day, setDay] = useState('');
  const [minT, setMinT] = useState(0);
  const [maxT, setMaxT] = useState(0);
  const [icon, setIcon] = useState('');
  const [current, setCurrent] = useState(false);

  useEffect(() => {
    const input = props?.data;
    // console.log('props: ', input);
    if (input) {
      // console.log('DayBrn: ', input);
      setDay(input[0]);
      setMinT(input[1].minT);
      setMaxT(input[1].maxT);

      if (input[1].current) setCurrent(true);

      if (Object.entries(input[1].icon).length > 0) {
        let curName = Object.entries(input[1].icon)[0][0];
        let curOccurence = Object.entries(input[1].icon)[0][1];

        Object.entries(input[1].icon).forEach(element => {
          const occurence = element[1];
          if (occurence > curOccurence) {
            curOccurence = occurence;
            curName = element[0];
          }
        });

        // console.log(input[0]  + ": ", curName)
        setIcon(curName);
      }
    }
  }, []);

  return (
    <View style={Styles.container}>
      {current ? (
        <TouchableOpacity
          style={{ ...Styles.TouchOpCtn, ...Styles.CurTouchOpCtn }}
        >
          <Text style={{ ...Styles.curColor }}>{day}</Text>
          <Image
            style={Styles.btnIcon}
            source={{ uri: `https://openweathermap.org/img/wn/${icon}@4x.png` }}
          />
          <Text style={{ ...Styles.color, ...Styles.middleTxt }}>
            {Math.round(maxT)}°{' '}
            <Text style={{ ...Styles.curColor }}>/ {Math.round(minT)}°</Text>
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={Styles.TouchOpCtn}>
          <Text style={{ ...Styles.color }}>{day}</Text>
          <Image
            style={Styles.btnIcon}
            source={{ uri: `https://openweathermap.org/img/wn/${icon}@4x.png` }}
          />
          <Text style={{ ...Styles.color, ...Styles.middleTxt }}>
            {Math.round(maxT)}°{' '}
            <Text style={{ ...Styles.color }}>/ {Math.round(minT)}°</Text>
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {
    gap: 3,
    margin: 5,
  },
  TouchOpCtn: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: Colors.bgQuaternary,
    alignItems: 'center',
    gap: 8,
    width: 100,
  },
  CurTouchOpCtn: {
    backgroundColor: Colors.primary,
  },
  color: {
    color: Colors.primary,
  },
  curColor: {
    color: Colors.secondary,
  },
  middleTxt: {
    color: Colors.tertiary,
  },
  btnIcon: {
    width: 30,
    height: 30,
  },
});
