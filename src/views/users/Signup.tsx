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
import { Formik } from 'formik';
import * as Yup from 'yup';
import InputField, {
  InputFieldImperativeHandle,
} from '../../components/inputField/InputField';
import { useTranslation } from 'react-i18next';

export function Signup() {
  const { t, i18n } = useTranslation();

  const lNameRef = useRef<InputFieldImperativeHandle>(null);
  const phoneRef = useRef<InputFieldImperativeHandle>(null);
  const ageRef = useRef<InputFieldImperativeHandle>(null);
  const emailRef = useRef<InputFieldImperativeHandle>(null);
  const passwordRef = useRef<InputFieldImperativeHandle>(null);
  const confirmPassRef = useRef<InputFieldImperativeHandle>(null);

  const navigation = useNavigation<StackNavigationProp>();

  const onSubmit = ({
    email,
    password,
    fName,
    lName,
    phone,
    age,
  }: {
    email: string;
    password: string;
    fName: string;
    lName: string;
    phone: string;
    age: string;
  }) => {
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

  const signupSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Required'),
    password: Yup.string().min(8, 'Too Short!').required('Required'),
    confirmPassword: Yup.string().min(8, 'Too Short!').required('Required'),
  });

  return (
    <Background>
      <View style={Styles.container}>
        <Text style={Styles.title}>{t('signup.title')}</Text>
        <KeyboardAvoidingView style={Styles.keyboardCtn} behavior="padding">
          <Formik
            initialValues={{
              fName: '',
              lName: '',
              phone: '',
              age: '',
              email: '',
              password: '',
              confirmPassword: '',
            }}
            validationSchema={signupSchema}
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
              <View style={Styles.form}>
                <InputField
                  error={errors.fName && touched.fName ? errors.fName : ''}
                  txtInputStyle={Styles.inputField}
                  onBlur={handleBlur('fName')}
                  onChangeText={handleChange('fName')}
                  value={values.fName}
                  onSubmitEditing={() => lNameRef.current?.imperativeFocus()}
                  placeholder={t('signup.inputs.0')}
                  placeholderTextColor={Colors.secondary}
                  returnKeyType={'next'}
                />
                <InputField
                  ref={lNameRef}
                  error={errors.lName && touched.lName ? errors.lName : ''}
                  txtInputStyle={Styles.inputField}
                  onBlur={handleBlur('lName')}
                  onChangeText={handleChange('lName')}
                  value={values.lName}
                  onSubmitEditing={() => phoneRef.current?.imperativeFocus()}
                  placeholder={t('signup.inputs.1')}
                  placeholderTextColor={Colors.secondary}
                  returnKeyType={'next'}
                />
                <InputField
                  ref={phoneRef}
                  error={errors.phone && touched.phone ? errors.phone : ''}
                  txtInputStyle={Styles.inputField}
                  onBlur={handleBlur('phone')}
                  onChangeText={handleChange('phone')}
                  value={values.phone}
                  onSubmitEditing={() => ageRef.current?.imperativeFocus()}
                  placeholder={t('signup.inputs.2')}
                  placeholderTextColor={Colors.secondary}
                  textContentType="telephoneNumber"
                  inputMode="tel"
                  returnKeyType={'next'}
                />
                <InputField
                  ref={ageRef}
                  error={errors.age && touched.age ? errors.age : ''}
                  txtInputStyle={Styles.inputField}
                  onBlur={handleBlur('age')}
                  onChangeText={handleChange('age')}
                  value={values.age}
                  onSubmitEditing={() => emailRef.current?.imperativeFocus()}
                  placeholder={t('signup.inputs.3')}
                  placeholderTextColor={Colors.secondary}
                  textContentType="birthdateYear"
                  inputMode="numeric"
                  returnKeyType={'next'}
                />
                <InputField
                  ref={emailRef}
                  error={errors.email && touched.email ? errors.email : ''}
                  txtInputStyle={Styles.inputField}
                  onBlur={handleBlur('email')}
                  onChangeText={handleChange('email')}
                  value={values.email}
                  onSubmitEditing={() => passwordRef.current?.imperativeFocus()}
                  placeholder={t('signup.inputs.4')}
                  placeholderTextColor={Colors.secondary}
                  textContentType="emailAddress"
                  autoComplete="email"
                  returnKeyType={'next'}
                  autoCorrect={false}
                  autoCapitalize="none"
                />
                <InputField
                  ref={passwordRef}
                  error={
                    errors.password && touched.password ? errors.password : ''
                  }
                  txtInputStyle={Styles.inputField}
                  onBlur={handleBlur('password')}
                  onChangeText={handleChange('password')}
                  value={values.password}
                  onSubmitEditing={() =>
                    confirmPassRef.current?.imperativeFocus()
                  }
                  placeholder={t('signup.inputs.5')}
                  placeholderTextColor={Colors.secondary}
                  textContentType="newPassword"
                  autoComplete="new-password"
                  autoCorrect={false}
                  returnKeyType={'next'}
                  secureTextEntry
                />
                <InputField
                  ref={confirmPassRef}
                  error={
                    errors.confirmPassword && touched.confirmPassword
                      ? errors.confirmPassword
                      : ''
                  }
                  txtInputStyle={Styles.inputField}
                  onBlur={handleBlur('confirmPassword')}
                  onChangeText={handleChange('confirmPassword')}
                  value={values.confirmPassword}
                  onSubmitEditing={handleSubmit}
                  placeholder={t('signup.inputs.6')}
                  placeholderTextColor={Colors.secondary}
                  returnKeyType={'done'}
                  textContentType="newPassword"
                  autoComplete="new-password"
                  autoCorrect={false}
                  secureTextEntry
                />

                <View style={Styles.btnCtn}>
                  <TouchableOpacity
                    onPress={handleSubmit}
                    style={Styles.submitBtn}
                  >
                    <Text style={Styles.submitBtnTxt}>
                      {t('signup.buttons.0')}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}
          </Formik>
        </KeyboardAvoidingView>

        <View style={Styles.signupCtn}>
          <Text style={Styles.txtColor}>{t('signup.AccTxt')}</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text style={Styles.signupTxtColor}>{t('signup.buttons.1')}</Text>
          </TouchableOpacity>
        </View>
      </View>
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
  errorMsg: {
    color: Colors.tertiary,
    paddingTop: 3,
    paddingHorizontal: 15,
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
    fontWeight: '700',
  },
});
