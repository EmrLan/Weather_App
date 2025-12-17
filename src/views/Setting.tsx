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
import { useTranslation } from 'react-i18next';

export default function Settings() {
  const [userInfo, setInfo] = useState<Record<string, any>>({});
  const [email, setEmail] = useState('');
  const inputRef = useRef<TextInput>(null);
  const [editable, setEditable] = useState(false);
  const app = getApp();
  const db = getFirestore(app);
  const auth = getAuth(app);
  const [img, setImg] = useState<Asset | null>(null);

  const { t, i18n } = useTranslation();

  useEffect(() => {
    const email: string = auth.currentUser?.email || '';
    setEmail(email);
    console.log(userInfo);
    if (email.length > 0) {
      const userDocRef = doc(db, 'UserData', email);
      getDoc(userDocRef).then(res =>
        setInfo(
          res.data() || {
            Age: '',
            FirstName: '',
            LastName: '',
            Phone: '',
          },
        ),
      );
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
  const labelKeys: Record<string, string> = {
    Age: 'settings.data.1',
    FirstName: 'settings.data.2',
    LastName: 'settings.data.3',
    Phone: 'settings.data.4',
  };

  return (
    <Background>
      <KeyboardAvoidingView style={Styles.container} behavior="padding">
        <Header title="" color={Colors.bgTertiary} />
        <View style={Styles.profileImgCtn}>
          {img == null ? (
            <Image
              style={Styles.profileImg}
              source={require('../../assets/icons/user_icon.png')}
            />
          ) : (
            <Image style={Styles.profileImg} source={{ uri: img.uri }} />
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
              <Text style={Styles.titleTxt}>{t('settings.title')}</Text>

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
              <Text style={Styles.penImgTxt}>{t('settings.data.0')}: </Text>
              <TextInput
                style={Styles.textInput}
                ref={inputRef}
                value={`${email}`}
                editable={editable}
              />
            </View>
            <FlatList
              data={Object.keys(userInfo || {})}
              renderItem={({ item }) => (
                <View style={Styles.penImgCtn}>
                  <Text style={Styles.penImgTxt}>{t(labelKeys[item])} :</Text>
                  <TextInput
                    style={Styles.textInput}
                    ref={inputRef}
                    value={`${userInfo?.[item]}`}
                    editable={editable}
                    placeholder={
                      userInfo?.[item].length > 0
                        ? undefined
                        : t('settings.error')
                    }
                    placeholderTextColor={Colors.secondary}
                  />
                </View>
              )}
            />
          </View>
        ) : (
          <Text style={Styles.textColor}>{t('settings.errorNoAcc')}</Text>
        )}
        <View style={Styles.langCtn}>
          <Text style={{ ...Styles.textColor, ...Styles.langTxt }}>
            {t('settings.lang')} :
          </Text>
          <FlatList
            data={['En', 'Es', 'Fr']}
            horizontal={true}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity style={Styles.langTxt}>
                  <Text style={Styles.textColor}>{item}</Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
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
  langCtn: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  langFlatlist: {

  },
  langBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 20,
    padding: 15,
  },
  langTxt: {
    marginHorizontal: 10,
  },
});
