import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Background from '../components/layouts/Background';
import { useEffect, useRef, useState } from 'react';
import { getAuth } from '@react-native-firebase/auth';
import { Colors } from '../utils/Colors';
import firestore, {
  collection,
  doc,
  getDoc,
  getFirestore,
  query,
} from '@react-native-firebase/firestore';
import Header from '../components/layouts/Header';
import {
  Asset,
  CameraOptions,
  launchCamera,
  launchImageLibrary,
} from 'react-native-image-picker';
import { translate } from '@shopify/react-native-skia';
import { getApp } from '@react-native-firebase/app';

export default function Settings() {
  const [userInfo, setInfo] = useState<Record<string, any>>();
  const [email, setEmail] = useState('');
  const inputRef = useRef<TextInput>(null);
  const [editable, setEditable] = useState(false);
  const app = getApp();
  const db = getFirestore(app);
  const auth = getAuth(app);
  const [img, setImg] = useState<Asset | null>(null);

  useEffect(() => {
    const email: string = auth.currentUser?.email || '';
    setEmail(email);
    if (email.length > 0) {
      const userDocRef = doc(db, 'UserData', email);
      getDoc(userDocRef).then(res => setInfo(res.data() || {}));
    }
  }, []);

  const editProfilePicture = async () => {
    const options: CameraOptions = {
      mediaType: 'photo',
      includeBase64: true,
    };
    // const result = await launchCamera(options);
    // console.log(result)

    const result = await launchImageLibrary(options);
    if (result.assets) {
      setImg(result?.assets?.[0]);
    }
  };

  const editPersonalData = () => {
    setEditable(true);
    inputRef.current?.blur();
  };

  const savePersonalData = () => {
    setEditable(false);
  };

  return (
    <Background>
      <KeyboardAvoidingView style={Styles.container} behavior="padding">
        <Header title="" />
        <View style={Styles.profileImgCtn}>
          {img == null ? (
            <Image
              style={Styles.profileImg}
              source={require('../../assets/icons/user_icon.png')}
            />
          ) : (
            <Image style={Styles.profileImg} source={{ uri: img.uri}} />
          )}

          <TouchableOpacity onPress={editProfilePicture}>
            <Image
              style={{ ...Styles.penImg, tintColor: Colors.tertiary }}
              source={require('../../assets/icons/pen_icon.png')}
            />
          </TouchableOpacity>
        </View>
        {email.length > 0 ? (
          <View style={Styles.emailDetailCtn}>
            <View style={Styles.titleCtn}>
              <Text style={Styles.titleTxt}>Personal Data </Text>

              {editable ? (
                <TouchableOpacity
                  style={Styles.penImgBtn}
                  onPress={savePersonalData}
                >
                  <Text style={Styles.saveBtn}>Save</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={Styles.penImgBtn}
                  onPress={editPersonalData}
                >
                  <Image
                    style={Styles.penImg}
                    source={require('../../assets/icons/pen_icon.png')}
                  />
                </TouchableOpacity>
              )}
            </View>

            <View style={Styles.penImgCtn}>
              <Text style={Styles.penImgTxt}>Email: </Text>
              <TextInput
                style={Styles.textInput}
                ref={inputRef}
                value={`${email}`}
                editable={editable}
              />
            </View>
            {Object.keys(userInfo || {}).length > 0 ? (
              <FlatList
                data={Object.keys(userInfo || {})}
                renderItem={({ item }) => (
                  <View style={Styles.penImgCtn}>
                    <Text style={Styles.penImgTxt}>{item}: </Text>
                    <TextInput
                      style={Styles.textInput}
                      ref={inputRef}
                      value={`${userInfo?.[item]}`}
                      editable={editable}
                    />
                  </View>
                )}
              />
            ) : (
              <Text>No Data for current User</Text>
            )}
          </View>
        ) : (
          <Text>Not LoggedIn</Text>
        )}
      </KeyboardAvoidingView>
    </Background>
  );
}

const Styles = StyleSheet.create({
  container: {
    paddingTop: Platform.OS === 'android' ? 50 : 60,
    paddingBottom: 20,
    flex: 1,
    width: '100%',
    alignItems: 'center',
    gap: 20,
  },
  profileImgCtn: {
    flexDirection: 'row',
    transform: [{ translateX: 15 }],
  },
  profileImg: {
    width: 200,
    height: 200,
    borderRadius: 75,
    borderWidth: 5,
    borderColor: Colors.bgTertiary,
  },
  textColor: {
    color: Colors.secondary,
    marginVertical: 10,
  },
  emailDetailCtn: {
    width: '90%',
    backgroundColor: Colors.bgTertiary,
    padding: 20,
    borderRadius: 30,
    justifyContent: 'center',
  },

  titleCtn: {
    flexDirection: 'row',
    paddingBottom: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  titleTxt: {
    color: Colors.primary,
    fontWeight: '800',
    fontSize: 25,
  },
  saveBtn: {
    fontSize: 20,
    color: Colors.primary,
  },

  textInput: {
    color: Colors.secondary,
    fontSize: 15,
    width: '65%',
  },

  penImgTxt: {
    color: Colors.primary,
    fontSize: 20,
    width: '30%',
  },
  penImgCtn: {
    flexDirection: 'row',
    gap: 10,
    width: '100%',
    paddingVertical: 10,
    alignItems: 'center',
  },
  penImgBtn: {
    alignSelf: 'flex-end',
  },
  penImg: {
    height: 25,
    width: 25,
    tintColor: Colors.primary,
  },
});
