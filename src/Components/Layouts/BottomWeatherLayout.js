import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';
import DayBtn from '../Buttons/DayBtn';
import { useEffect, useState } from 'react';

export default function BottomWeatherLayout(props) {
  const [parsedList, setParsedList] = useState({});
  
  useEffect(() => {
    const inData = props.dataList;
    // console.log("BOTTOM: ", inData)

    if (inData) {
      const element = Object.entries(props.currentDay)[0];
      const parsedData = {};
      parsedData[element[0]] = {
        maxT: element[1].maxT,
        minT: element[1].minT,
        icon: element[1].icon,
        current: element[1].current,
      };
      
      const today = new Date().toLocaleString('en-US', {
        weekday: 'long',
      });

      for (let a = 0; a < inData.length; a++) {
        const date = new Date(inData[a].dt_txt);
        const curDay = date.toLocaleString('en-US', {
          weekday: 'long',
        });
        const curTime = date.getHours();

        if (curDay == today) continue;
        else {
          const maxTemp = inData[a].main.temp_max;
          const minTemp = inData[a].main.temp_min;
          const iconVal = inData[a].weather[0].icon;

          // console.log(
          //   `Day: ${curDay}, Time: ${curTime}, Max: ${maxTemp}, Min: ${minTemp}, Icon: ${icon}`,
          // );
          if (parsedData[curDay]) {
            parsedData[curDay].maxT = Math.max(
              parsedData[curDay].maxT,
              maxTemp,
            );
            parsedData[curDay].minT = Math.min(
              parsedData[curDay].minT,
              minTemp,
            );

            if (curTime > 5 && curTime < 21) {
              if (parsedData[curDay].icon[iconVal]) {
                parsedData[curDay].icon[iconVal] =
                  parsedData[curDay].icon[iconVal] + 1;
              } else {
                parsedData[curDay].icon[iconVal] = 1;
              }
            }
          } else {
            parsedData[curDay] = {
              maxT: maxTemp,
              minT: minTemp,
              icon: {},
            };
            if (curTime > 5 && curTime < 21) {
              parsedData[curDay].icon[iconVal] = 1;
            }
          }
        }
      }

      // console.log('paresed', parsedData);
      setParsedList(parsedData);
    }
  }, [props.dataList, props.currentDay]);

  return (
    <View style={Styles.container}>
      <Text style={Styles.forecastTxt}>5-Day Forecasts</Text>
      <FlatList
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        data={Object.entries(parsedList)}
        horizontal={true}
        renderItem={item => (
          <DayBtn data={Object.entries(parsedList)[item.index]} />
        )}
        keyExtractor={item => item}
      ></FlatList>
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {
    flex: 2,
    justifyContent: 'space-between',
    padding: 10,
  },
  forecastTxt: {
    color: 'white',
    marginLeft: 8,
  },
});
