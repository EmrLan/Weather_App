import {
  StyleSheet,
  View
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

export default function background(props) {
  return (
    <LinearGradient
      colors={['#020024', '#090979', '#99badd']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }} // 90 degrees horizontal
      style={Styles.LinearGradient}
    >
      <View style={Styles.background}>{props.children}</View>
    </LinearGradient>
  );
}

const Styles = StyleSheet.create({
  LinearGradient: {
    flex: 1,
  },
  background: {
    flex: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
