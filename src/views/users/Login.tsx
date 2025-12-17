import { useEffect, useRef, useState } from 'react';
import Background from '../../components/layouts/Background';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TextInputComponent,
  TouchableOpacity,
  View,
} from 'react-native';
import { Colors } from '../../utils/Colors';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '../../navigation/Navigation';
import {
  FirebaseAuthTypes,
  getAuth,
  signInAnonymously,
  signInWithEmailAndPassword,
  signInWithPhoneNumber,
} from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useTranslation } from 'react-i18next';
import InputField, {
  InputFieldImperativeHandle,
} from '../../components/inputField/InputField';

export default function Login() {
  const navigation = useNavigation<StackNavigationProp>();
  const passwordRef = useRef<InputFieldImperativeHandle>(null);
  const { t, i18n } = useTranslation();

  const [confirm, setConfirm] =
    useState<FirebaseAuthTypes.ConfirmationResult | null>(null);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '1057087350172-fqnnvrmqkrnaejakav83or3i2pd8j9ea.apps.googleusercontent.com',
    });
  }, []);
  // verification code (OTP - One-Time-Passcode)
  const [code, setCode] = useState('');

  // Handle the button press
  async function handleSignInWithPhoneNumber(phoneNumber: string) {
    const confirmation = await signInWithPhoneNumber(getAuth(), phoneNumber);
    setConfirm(confirmation);
  }

  async function confirmCode() {
    try {
      await confirm?.confirm('123456');
    } catch (error) {
      console.log('Invalid code.');
    }
  }

  async function onGoogleButtonPress() {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // Get the users ID token
    const signInResult = await GoogleSignin.signIn();

    // Try the new style of google-sign in result, from v13+ of that module
    let idToken = signInResult.data?.idToken;
    if (!idToken) {
      // if you are using older versions of google-signin, try old style result
      idToken = signInResult.data?.idToken;
    }
    if (!idToken) {
      throw new Error('No ID token found');
    }

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  }

  const ContinueAsGuest = () => {
    signInAnonymously(getAuth())
      .then(() => {
        console.log('User signed in anonymously');
      })
      .catch(error => {
        if (error.code === 'auth/operation-not-allowed') {
          console.log('Enable anonymous in your firebase console.');
        }

        console.error(error);
      });
  };

  const onSubmit = ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    signInWithEmailAndPassword(getAuth(), email.trim(), password)
      .then(() => {
        console.log('User account signed in!');
      })
      .catch(error => {
        console.log('Error: ', error);
      });
  };

  const loginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(2, 'Too Short!').required('Required'),
  });

  return (
    <Background>
      <KeyboardAvoidingView style={Styles.keyboardCtn} behavior="padding">
        <View style={Styles.container}>
          <Text style={Styles.title}>{t('login.title')}</Text>
          <View style={Styles.form}>
            <Formik
              initialValues={{ email: '', password: '' }}
              validationSchema={loginSchema}
              onSubmit={onSubmit}
            >
              {({
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                values,
              }) => (
                <View>
                  <InputField
                    error={errors.email && touched.email ? errors.email : ''}
                    txtInputStyle={Styles.inputField}
                    onBlur={handleBlur('email')}
                    onSubmitEditing={() =>
                      passwordRef.current?.imperativeFocus()
                    }
                    onChangeText={handleChange('email')}
                    value={values.email}
                    placeholder={t('login.inputs.0')}
                    placeholderTextColor={Colors.secondary}
                    textContentType="emailAddress"
                    autoComplete="email"
                    autoCorrect={false}
                    returnKeyType={'next'}
                    autoCapitalize="none"
                  />

                  <InputField
                    error={
                      errors.password && touched.password ? errors.password : ''
                    }
                    txtInputStyle={Styles.inputField}
                    ref={passwordRef}
                    onBlur={handleBlur('password')}
                    onChangeText={handleChange('password')}
                    value={values.password}
                    onSubmitEditing={handleSubmit}
                    placeholder={t('login.inputs.1')}
                    placeholderTextColor={Colors.secondary}
                    returnKeyType={'done'}
                    textContentType="password"
                    autoComplete="password"
                    autoCorrect={false}
                    secureTextEntry
                  />

                  <TouchableOpacity
                    onPress={handleSubmit}
                    style={Styles.submitBtn}
                  >
                    <Text style={{ ...Styles.txtColor, ...Styles.loginBtnTxt }}>
                      {t('login.buttons.0')}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </Formik>
            <View style={Styles.resetSkipCtn}>
              <TouchableOpacity>
                <Text style={Styles.txtColor}>{t('login.buttons.1')}</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={ContinueAsGuest}>
                <Text style={Styles.txtColor}>{t('login.buttons.2')}</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* <TouchableOpacity
            onPress={() => handleSignInWithPhoneNumber('+44 7444 555666')}
          >
            <Text style={Styles.txtColor}>Login With PhoneNumber (Step 1)</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setCode('123456')}>
            <Text style={Styles.txtColor}>Set Test Code (Step 2)</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={confirmCode}>
            <Text style={Styles.txtColor}>Confirm Code (Step 3)</Text>
          </TouchableOpacity> */}
          <TouchableOpacity
            style={Styles.googleBtn}
            onPress={onGoogleButtonPress}
          >
            <Text style={Styles.googleBtnTxt}>{t('login.buttons.3')}</Text>
            <Image
              style={Styles.googleIcon}
              source={require('../../../assets/icons/google_icon.png')}
            />
          </TouchableOpacity>

          <View style={Styles.signupCtn}>
            <Text style={Styles.txtColor}>{t('login.noAccTxt')}</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
              <Text style={Styles.signupBtnTxt}>{t('login.buttons.4')}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Background>
  );
}

const Styles = StyleSheet.create({
  keyboardCtn: {
    flex: 1,
    width: '100%',
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: Platform.OS === 'android' ? 80 : 100,
    paddingBottom: 20,
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  title: {
    color: Colors.secondary,
    fontSize: 40,
    fontWeight: '600',
  },

  form: {
    gap: 10,
    alignItems: 'center',
  },
  inputField: {
    minWidth: '100%',
    borderBottomWidth: 1,
    borderColor: Colors.secondary,
    borderRadius: 20,
    padding: 15,
    color: Colors.secondary,
    fontSize: 18,
  },

  googleBtn: {
    backgroundColor: Colors.secondary,
    padding: 15,
    borderRadius: 30,
    minWidth: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  googleBtnTxt: {
    color: Colors.primary,
    marginHorizontal: 10,
    fontSize: 17,
    fontWeight: '700',
  },
  googleIcon: {
    width: 30,
    height: 30,
  },
  errorMsg: {
    color: Colors.tertiary,
    paddingTop: 3,
    paddingHorizontal: 15,
  },
  signupCtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  submitBtn: {
    marginTop: 15,
    borderRadius: 30,
    padding: 20,
    backgroundColor: Colors.tertiary,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: '93%',
  },
  loginBtnTxt: {
    fontSize: 17,
    fontWeight: '700',
  },
  signupBtnTxt: {
    color: Colors.primary,
    fontSize: 20,
    fontWeight: '700',
  },
  txtColor: {
    color: Colors.secondary,
  },
  resetSkipCtn: {
    flexDirection: 'row',
    gap: 5,
  },
});
