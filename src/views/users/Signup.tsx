import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Background from '../../components/layouts/Background';
import { TextInput } from 'react-native-gesture-handler';
import { Colors } from '../../utils/Colors';
import { useRef, useState } from 'react';
import {
  createUserWithEmailAndPassword,
  getAuth,
} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '../../navigation/Navigation';

export function Signup() {
  const [fName, setFName] = useState('');
  const [lName, setLName] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const lNameRef = useRef<TextInput>(null);
  const phoneRef = useRef<TextInput>(null);
  const ageRef = useRef<TextInput>(null);
  const emailRef = useRef<TextInput>(null);
  const passwordRef = useRef<TextInput>(null);
  const confirmPassRef = useRef<TextInput>(null);

  const navigation = useNavigation<StackNavigationProp>();

  const onSubmit = () => {
    createUserWithEmailAndPassword(getAuth(), email, password)
      .then(() => {
        console.log('User account created & signed in!');
        firestore().collection('UserData').doc(email).set({
          FirstName: fName,
          LastName: lName,
          Phone: phone,
          Age: age,
        });
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
          navigation.goBack();
        }

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
          <Text style={Styles.title}>SIGNUP</Text>
          <View style={Styles.form}>
            <TextInput
              style={{
                ...Styles.inputField,
              }}
              onSubmitEditing={() => lNameRef.current?.focus()}
              onChangeText={setFName}
              value={fName}
              placeholder={'First Name'}
              placeholderTextColor={Colors.secondary}
              returnKeyType={'next'}
            />

            <TextInput
              ref={lNameRef}
              style={{
                ...Styles.inputField,
              }}
              onSubmitEditing={() => phoneRef.current?.focus()}
              onChangeText={setLName}
              value={lName}
              placeholder={'Last Name'}
              placeholderTextColor={Colors.secondary}
              returnKeyType={'next'}
            />

            <TextInput
              ref={phoneRef}
              style={{
                ...Styles.inputField,
              }}
              onSubmitEditing={() => ageRef.current?.focus()}
              onChangeText={setPhone}
              value={phone}
              placeholder={'Phone'}
              placeholderTextColor={Colors.secondary}
              textContentType="telephoneNumber"
              inputMode="tel"
              returnKeyType={'next'}
            />

            <TextInput
              ref={ageRef}
              style={{
                ...Styles.inputField,
              }}
              onSubmitEditing={() => emailRef.current?.focus()}
              onChangeText={setAge}
              value={age}
              placeholder={'Age'}
              placeholderTextColor={Colors.secondary}
              textContentType="birthdateYear"
              inputMode="numeric"
              returnKeyType={'next'}
            />
            <TextInput
              ref={emailRef}
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
              returnKeyType={'next'}
              autoCorrect={false}
              autoCapitalize='none'
            />
            <TextInput
              ref={passwordRef}
              style={{
                ...Styles.inputField,
              }}
              onSubmitEditing={() => confirmPassRef.current?.focus()}
              onChangeText={setPassword}
              value={password}
              placeholder={'Password'}
              placeholderTextColor={Colors.secondary}
              textContentType="newPassword"
              autoComplete="new-password"
              autoCorrect={false}
              returnKeyType={'next'}
              secureTextEntry
            />
            <TextInput
              ref={confirmPassRef}
              style={{
                ...Styles.inputField,
              }}
              onSubmitEditing={onSubmit}
              onChangeText={setConfirmPassword}
              value={confirmPassword}
              placeholder={'Confirm Password'}
              placeholderTextColor={Colors.secondary}
              returnKeyType={'done'}
              textContentType="newPassword"
              autoComplete="new-password"
              autoCorrect={false}
              secureTextEntry
            />

            <View style={Styles.btnCtn}>
              <TouchableOpacity onPress={onSubmit} style={Styles.submitBtn}>
                <Text style={Styles.submitBtnTxt}>SIGN UP</Text>
              </TouchableOpacity>
            </View>
          </View>
          <View style={Styles.signupCtn}>
            <Text style={Styles.txtColor}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={Styles.signupTxtColor}>LOGIN</Text>
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
  btnCtn: {
    flexDirection: 'row',
    gap: 20,
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
  signupTxtColor: {
    color: Colors.primary,
    fontSize: 20,
    fontWeight: '700',
  },
  txtColor: {
    color: Colors.secondary,
  },
  submitBtnTxt: {
    color: Colors.secondary,
    fontSize: 17,
    fontWeight: '700'
  },
});
