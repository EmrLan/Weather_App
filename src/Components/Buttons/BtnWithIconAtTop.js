import { useEffect } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function BtnWithIconAtTop(props) {

  return (
    <TouchableOpacity style={Styles.container}>
      <Image style={Styles.btnIcon} source={props.icon} />
      <Text style={{ ...Styles.btnText, ...Styles.bigFont }}>
        {props.index == '0' ? props.data?.grnd_level : ''}
        {props.index == '1' ? props.data?.humidity : ''}
        {props.index == '2' ? props.data?.windSpeed : ''}
        {props.index == '0' ? ' feet' : ''}
        {props.index == '1' ? ' %' : ''}
        {props.index == '2' ? ' mph' : ''}
      </Text>
      <Text style={Styles.btnText}>{props.name}</Text>
    </TouchableOpacity>
  );
}

const Styles = StyleSheet.create({
  container: {
    padding: 10,
    alignItems: 'center',
    gap: 3,
  },
  bigFont: {
    fontSize: 15,
    fontWeight: '500',
    margin: 1,
  },
  btnText: {
    color: '#090979',
    fontSize: 10,
  },
  btnIcon: {
    tintColor: '#090979',
    width: 20,
    height: 20,
  },
});
