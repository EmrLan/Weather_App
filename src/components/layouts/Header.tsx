import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { ProfileScreenNavigationProp } from '../../navigation/Navigation';
import { Colors } from '../../utils/Colors';
import { useNavigation } from '@react-navigation/native';

interface PropsContainer {
  title: string;
  color?: string;
  icon?: ImageSourcePropType;
  route?: string;
}

export default function Header(props: Readonly<PropsContainer>) {
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  return (
    <View style={Styles.menuCtn}>
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Image
          style={[
            Styles.MenuBtn,
            props.color ? { tintColor: props.color } : null,
          ]}
          source={require('../../../assets/icons/menu_icon.png')}
        />
      </TouchableOpacity>
      {props.title ? <Text style={Styles.cityName}>{props.title}</Text> : ''}
      <TouchableOpacity
        onPress={() => {
          if (props.route) {
            navigation.navigate(props.route);
          } else {
            navigation.goBack();
          }
        }}
      >
        {props.icon ? (
          <Image
            style={[
              Styles.addIcon,
              props.color ? { tintColor: props.color } : null,
            ]}
            source={props.icon}
          />
        ) : (
          <Image
            style={[
              Styles.addIcon,
              props.color ? { tintColor: props.color } : null,
            ]}
            source={require('../../../assets/icons/back_icon.png')}
          />
        )}
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
    fontWeight: '600',
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
