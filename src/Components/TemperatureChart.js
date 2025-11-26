import { useEffect, useState } from 'react';
import { Dimensions, View } from 'react-native';
import { LineChart } from 'react-native-chart-kit';

export default function TemperatureChart(props) {
  const [labels, setLabels] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const inData = props.data;
    if (inData) {
      // console.log(inData)
      const arrData = [];
      const arrLabel = [];
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
                color: () => '#090979',
              },
            ], 
          }}
          width={Dimensions.get('window').width}
          height={180}
          chartConfig={{
            backgroundGradientFromOpacity: 0,
            backgroundGradientToOpacity: 0,
            color: () => 'rgba(255, 255, 255, 0)',
            labelColor: () => '#090979',
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
