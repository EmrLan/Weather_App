import { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Background from '../components/layouts/Background';
import { RootState } from '../redux/Store';
import useWatchLocation from '../zustand/store';
import { connect, ConnectedProps } from 'react-redux';
import { Colors } from '../utils/Colors';

const mapStateToProps = (redux: RootState) => {
  return {
    location: redux.Location.cityName,
  };
};

const mapDispatchToProps = {
  setLocation: (city: string) => ({
    type: 'SET_LOCATION',
    payload: city,
  }),
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

class Test extends Component<PropsFromRedux> {
  constructor(props: PropsFromRedux) {
    super(props);
  }
  render() {
    const {location, setLocation} = this.props;
    return (
      <Background>
        <View>
          <Text style={Styles.txtClr}>LOCATION: {location}</Text>
        </View>
      </Background>
    );
  }
}

const Styles = StyleSheet.create({
  txtClr: {
    color: Colors.secondary,
  },
});

export default connector(Test);
