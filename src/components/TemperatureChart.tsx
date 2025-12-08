import { useEffect, useState } from 'react';
import { Dimensions, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Colors } from '../utils/Colors';

interface PropsContainer {
  data: [
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
  ];
}

export default function TemperatureChart(props: PropsContainer) {
  const [labels, setLabels] = useState([] as string[]);
  const [data, setData] = useState([] as number[]);

  useEffect(() => {
    const inData = props.data;
    // console.log('IND: ', inData);
    if (inData) {
      // console.log(inData)
      const arrData: number[] = [];
      const arrLabel: string[] = [];
      for (let a = 0; a < 7; a++) {
        const time = new Date(inData[a].dt_txt);
        arrLabel.push(
          time.toLocaleString('en-US', {
            hour: 'numeric',
            hour12: true,
          }),
        );
        arrData.push(inData[a].main.temp);
      }
      setData(arrData);
      setLabels(arrLabel);
    }
  }, [props.data]);

  return (
    <View>
      {data.length != 0 ? (
        <LineChart
          data={{
            labels: labels,
            datasets: [
              {
                data: data,
                color: () => Colors.primary,
              },
            ],
          }}
          width={Dimensions.get('window').width}
          height={180}
          chartConfig={{
            backgroundGradientFromOpacity: 0,
            backgroundGradientToOpacity: 0,
            color: () => Colors.primary,
            labelColor: () => Colors.secondary,
            style: {},
            propsForDots: {
              r: '0',
            },
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
          withInnerLines={false}
          withOuterLines={false}
          // withHorizontalLabels={false}
        />
      ) : (
        ''
      )}
    </View>
  );
}
