import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/Store';
import { Colors } from '../../utils/Colors';

interface PropsContainer {
  name: string;
  data: string;
  icon: ImageSourcePropType;
}

export default function BtnWithIconAtTop(props: Readonly<PropsContainer>) {
  

  return (
    <TouchableOpacity style={Styles.container}>
      <Image testID="icon-image" style={Styles.btnIcon} source={props.icon} />
      <Text style={{ ...Styles.btnText, ...Styles.bigFont }}>
        {props.data}
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
    color: Colors.primary,
    fontSize: 10,
  },
  btnIcon: {
    tintColor: Colors.primary,
    width: 20,
    height: 20,
  },
});
