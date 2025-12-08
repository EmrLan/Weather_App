import { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Colors } from '../../utils/Colors';

interface PropsContainer {
  children: ReactNode;
}

export default function Background(props: PropsContainer) {
  return (
    <LinearGradient
      colors={['#041E42', '#041E42', '#FF4500']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
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
    backgroundColor: Colors.bgPrimary,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
