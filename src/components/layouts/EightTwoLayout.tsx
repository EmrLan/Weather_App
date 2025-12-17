import { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';

interface PropsContainer {
  children: ReactNode;
}

export default function EightTwoLayout(props: PropsContainer) {

  return (
    <View style={Styles.container}>
      {props.children}
    </View>
  );
}

const Styles = StyleSheet.create({
  container: {
    flex: 2,
    justifyContent: 'space-between',
    padding: 10,
  },
});
