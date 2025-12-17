import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/Store';
import { Colors } from '../../utils/Colors';
import DayBtn from '../../components/buttons/DayBtn';
import { useTranslation } from 'react-i18next';

interface InnerParsedDataFormat {
  icon: { [key: string]: number };
  minT: number;
  maxT: number;
  current?: boolean;
}

interface parsedDataFormat {
  [key: string]: InnerParsedDataFormat;
}

interface PropsContainer {
  cityName: string;
}

export default function BottomWeatherLayout(props: PropsContainer) {
  const [parsedList, setParsedList] = useState({} as parsedDataFormat);
  const citiesWeatherData = useSelector((state: RootState) => state.Weather);
  const todayWeather = citiesWeatherData[props.cityName]?.currentWeather;
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const inData: [
      {
        dt: number;
        dt_txt: string;
        main: Record<string, number>;
        weather: [
          {
            icon: string;
          },
        ];
      },
    ] = citiesWeatherData[props.cityName]?.forecast.list;

    if (inData) {
      const today = new Date().toLocaleString('en-US', {
        weekday: 'long',
      });
      const parsedData: parsedDataFormat = {};
      parsedData[today] = {
        maxT: todayWeather.main.temp_max,
        minT: todayWeather.main.temp_min,
        icon: { [todayWeather.weather[0].icon]: 1 },
        current: true,
      };

      // console.log(parsedData);

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
  }, [citiesWeatherData[props.cityName]]);

  return (
    <View style={Styles.container}>
      <Text style={Styles.forecastTxt}>{t('weather.forecast')}</Text>
      <FlatList
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        data={Object.entries(parsedList)}
        horizontal={true}
        renderItem={item => (
          <DayBtn data={Object.entries(parsedList)[item.index]} />
        )}
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
    color: Colors.secondary,
    marginLeft: 8,
  },
});
