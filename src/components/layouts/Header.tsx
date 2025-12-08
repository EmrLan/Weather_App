import {
  CompositeNavigationProp,
  useNavigation,
} from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ProfileScreenNavigationProp } from '../../navigation/Navigation';
import { Colors } from '../../utils/Colors';

interface PropsContainer {
  title: string;
}

export default function Header(props: PropsContainer) {
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  return (
    <View style={Styles.menuCtn}>
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Image
          style={Styles.MenuBtn}
          source={require('../../../assets/icons/menu_icon.png')}
        />
      </TouchableOpacity>
      {props.title ? <Text style={Styles.cityName}>{props.title}</Text> : ''}
      <TouchableOpacity onPress={() => navigation.navigate('Add City')}>
        <Image
          style={Styles.addIcon}
          source={require('../../../assets/icons/add_icon.png')}
        />
      </TouchableOpacity>
    </View>
  );
}

const Styles = StyleSheet.create({
  menuCtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '85%',
  },
  cityName: {
    fontSize: 20,
    color: Colors.secondary,
    fontWeight: "600"
  },
  MenuBtn: {
    width: 25,
    height: 25,
    tintColor: Colors.primary,
  },
  addIcon: {
    width: 25,
    height: 25,
    tintColor: Colors.primary,
  },
});
