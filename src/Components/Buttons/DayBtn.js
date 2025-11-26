import { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function DayBtn(props) {
  const [day, setDay] = useState();
  const [minT, setMinT] = useState();
  const [maxT, setMaxT] = useState();
  const [icon, setIcon] = useState();
  const [current, setCurrent] = useState(false);

  useEffect(() => {
    const input = props.data;
    // console.log("DayBrn: ",input)
    if (input) {
      setDay(input[0]);
      setMinT(input[1].minT);
      setMaxT(input[1].maxT);

      if (input[1].current) setCurrent(true);

      let curName = Object.entries(input[1].icon)[0][0];
      let curOccurence = Object.entries(input[1].icon)[0][1];

      Object.entries(input[1].icon).forEach(element => {
        const occurence = element[1];
        if (occurence > curOccurence) {
          curOccurence = occurence;
          curName = element[0];
        }
      });

      setIcon(curName);
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
            {Math.round(maxT)}°
          </Text>
          <Text style={{ ...Styles.curColor }}>{Math.round(minT)}°</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={Styles.TouchOpCtn}>
          <Text style={{ ...Styles.color }}>{day}</Text>
          <Image
            style={Styles.btnIcon}
            source={{ uri: `https://openweathermap.org/img/wn/${icon}@4x.png` }}
          />
          <Text style={{ ...Styles.color, ...Styles.middleTxt }}>
            {Math.round(maxT)}°
          </Text>
          <Text style={{ ...Styles.color }}>{Math.round(minT)}°</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {
    gap: 3,
    margin: 5
  },
  TouchOpCtn: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    alignItems: 'center',
    gap: 8,
    width: 100,
  },
  CurTouchOpCtn: {
    backgroundColor: '#090979',
  },
  color: {
    color: '#090979',
  },
  curColor: {
    color: 'white',
  },
  middleTxt: {
    color: '#E97451',
  },
  btnIcon: {
    width: 30,
    height: 30,
  },
});
