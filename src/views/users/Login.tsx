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

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const navigation = useNavigation<StackNavigationProp>();
  const passwordRef = useRef<TextInput>(null);

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

  const onSubmit = () => {
    signInWithEmailAndPassword(getAuth(), email, password)
      .then(() => {
        console.log('User account signed in!');
      })
      .catch(error => {
        console.log('Error: ', error);

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
  };

  return (
    <Background>
      <KeyboardAvoidingView style={Styles.keyboardCtn} behavior="padding">
        <View style={Styles.container}>
          <Text style={Styles.title}>LOGIN</Text>
          <View style={Styles.form}>
            <TextInput
              style={{
                ...Styles.inputField,
              }}
              onSubmitEditing={() => passwordRef.current?.focus()}
              onChangeText={setEmail}
              value={email}
              placeholder={'Email'}
              placeholderTextColor={Colors.secondary}
              textContentType="emailAddress"
              autoComplete="email"
              autoCorrect={false}
              returnKeyType={'next'}
              autoCapitalize='none'
            />
            <TextInput
              ref={passwordRef}
              style={{
                ...Styles.inputField,
              }}
              onChangeText={setPassword}
              onSubmitEditing={onSubmit}
              value={password}
              placeholder={'Password'}
              placeholderTextColor={Colors.secondary}
              returnKeyType={'done'}
              textContentType="password"
              autoComplete="password"
              autoCorrect={false}
              secureTextEntry
            />
            <TouchableOpacity onPress={onSubmit} style={Styles.submitBtn}>
              <Text style={{...Styles.txtColor, ...Styles.loginBtnTxt}}>LOGIN</Text>
            </TouchableOpacity>

            <View style={Styles.resetSkipCtn}>
              <TouchableOpacity>
                <Text style={Styles.txtColor}>Forgot password?</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={ContinueAsGuest}>
                <Text style={Styles.txtColor}>Continue as Guest</Text>
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
            <Text style={Styles.googleBtnTxt}>CONTINUE WITH GOOGLE</Text>
            <Image
              style={Styles.googleIcon}
              source={require('../../../assets/icons/google_icon.png')}
            />
          </TouchableOpacity>

          <View style={Styles.signupCtn}>
            <Text style={Styles.txtColor}>Don't have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
              <Text style={Styles.signupBtnTxt}>SIGN UP</Text>
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
    fontWeight: '700'
  },
  googleIcon: {
    width: 30,
    height: 30,
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
    fontWeight: '700'
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
