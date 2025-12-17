import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Background from '../../components/layouts/Background';
import InputField from '../../components/inputField/InputField';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Colors } from '../../utils/Colors';
import Header from '../../components/layouts/Header';
import firestore, {
  addDoc,
  collection,
  doc,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
  setDoc,
} from '@react-native-firebase/firestore';
import { getAuth } from '@react-native-firebase/auth';
import { getApp } from '@react-native-firebase/app';
import { ProfileScreenNavigationProp } from '../../navigation/Navigation';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

interface ChatData {
  email: string;
  msg: string;
  time: any;
}

interface ChatMessage {
  [key: string]: ChatData;
}

function onError(error: any) {
  console.error('OnSnapshot Error: ', error);
}

export default function SupportChat({ route }: { route: any }) {
  const app = getApp();
  const db = getFirestore(app);
  const auth = getAuth(app);
  const { routeEmail } = route.params || '';
  const flatListRef = useRef<FlatList>(null);

  const [input, setInput] = useState('');
  const [email, setEmail] = useState('');

  const [errorMsg, setErrorMsg] = useState('');
  const [chat, setChat] = useState<ChatMessage>({});
  const { t, i18n } = useTranslation();

  useLayoutEffect(() => {
    console.log('UseLayoutEffect');
  });

  useFocusEffect(() => {
    console.log('Route Email: ', routeEmail);
  });

  useEffect(() => {
    console.log('UseEffect');
    // console.log('routeE: ', routeEmail)

    const userEmail = auth.currentUser?.email || '';
    setChat({});
    // if (!routeEmail && userEmail) navigation.navigate('SuperChat');

    if (userEmail.length > 0) {
      setEmail(userEmail);

      let userDocRef = null;
      if (routeEmail) userDocRef = doc(db, 'SupportChatData', routeEmail);
      else userDocRef = doc(db, 'SupportChatData', userEmail);

      const messagesColRef = collection(userDocRef, 'messages');
      const q = query(messagesColRef, orderBy('time', 'asc'));

      const unSubscribe = onSnapshot(q, onResult, onError);

      return () => {
        unSubscribe();
        route.params = undefined;
      };
    }
  }, [routeEmail]);

  useEffect(() => {
    if (flatListRef.current)
      flatListRef.current.scrollToEnd({ animated: true });
  }, [chat]);

  function onResult(QuerySnapshot: any) {
    if (QuerySnapshot != undefined) {
      const newMessages: ChatMessage = QuerySnapshot.docs.reduce(
        (acc: ChatMessage, doc: any) => {
          const id = doc.id;
          const data = doc.data();

          acc[id] = {
            email: data.email,
            msg: data.message,
            time: data.time,
          };
          return acc;
        },
        {},
      );

      setChat(prevChat => {
        return { ...prevChat, ...newMessages };
      });
    }
  }

  const onSubmit = async () => {
    if (!input.trim()) return;

    let userDocRef = null;
    if (routeEmail) userDocRef = doc(db, 'SupportChatData', routeEmail);
    else userDocRef = doc(db, 'SupportChatData', email);

    try {
      await setDoc(userDocRef, { updatedAt: serverTimestamp() });
    } catch (err) {
      console.log('Failed to send updatedAt: ', err);
    }

    try {
      const messagesColRef = collection(userDocRef, 'messages');

      await addDoc(messagesColRef, {
        email: email,
        message: input,
        time: serverTimestamp(),
        read: false,
      });
    } catch (er) {
      console.log('Failed to send msg: ', er);
    }
    setInput('');
  };

  return (
    <Background>
      <KeyboardAvoidingView behavior={'padding'} style={Styles.container}>
        <View style={Styles.topContainer}>
          <View style={Styles.headerCtn}>
            <Header
              title={
                email == 'support@gmail.com'
                  ? `${routeEmail}`
                  : `${t('support.chatTitle')}`
              }
              icon={require('../../../assets/icons/close_icon.png')}
            />
          </View>

          <View style={Styles.msgCtn}>
            <FlatList
              ref={flatListRef}
              data={Object.keys(chat)}
              renderItem={({ item }) => {
                return chat[item].email != email ? (
                  <View
                    key={JSON.stringify(chat[item])}
                    style={Styles.supportChatCtn}
                  >
                    <Text style={Styles.supportTitle}>
                      {chat[item].email == 'support@gmail.com'
                        ? `${t('support.chatName')}:`
                        : chat[item].email}
                    </Text>
                    <Text style={Styles.supportChat}>{chat[item].msg}</Text>
                  </View>
                ) : (
                  <View
                    key={JSON.stringify(chat[item])}
                    style={Styles.userChatCtn}
                  >
                    <Text style={Styles.userTitle}>
                      {t('support.chatUser')}:
                    </Text>
                    <Text style={Styles.userChat}>{chat[item].msg}</Text>
                  </View>
                );
              }}
            />
          </View>
        </View>
        <View style={Styles.bottomContainer}>
          <View style={Styles.inputAndBtnCtn}>
            <InputField
              onChangeText={setInput}
              onSubmitEditing={onSubmit}
              error={errorMsg}
              value={input}
              placeholder={t('support.value')}
              placeholderTextColor={Colors.secondary}
            />
            <TouchableOpacity style={Styles.addIconCtn} onPress={onSubmit}>
              <Text style={Styles.addIconTxt}>{t('support.btn')}</Text>
            </TouchableOpacity>
          </View>
          <Text style={Styles.errMsg}>{errorMsg}</Text>
        </View>
      </KeyboardAvoidingView>
    </Background>
  );
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },
  topContainer: {
    flex: 8,
    width: '100%',
    backgroundColor: Colors.bgSecondary,
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    alignItems: 'center',
    paddingTop: Platform.OS === 'android' ? 50 : 60,
    paddingBottom: 20,
    gap: 20,
    shadowColor: 'black',
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  headerCtn: {
    flex: 1,
  },
  msgCtn: {
    flex: 20,
    // backgroundColor: 'red',
    minWidth: '100%',
    paddingHorizontal: 10,
  },
  supportChatCtn: {
    backgroundColor: Colors.primary,
    padding: 20,
    borderRadius: 30,
    marginVertical: 10,
    maxWidth: '80%',
    gap: 5,
  },
  supportTitle: {
    color: Colors.secondary,
    fontSize: 15,
    fontWeight: '800',
  },
  supportChat: {
    color: Colors.secondary,
  },
  userChatCtn: {
    backgroundColor: Colors.bgTertiary,
    padding: 15,
    borderRadius: 30,
    marginVertical: 10,
    minWidth: '80%',
    alignSelf: 'flex-end',
    gap: 5,
    alignItems: 'flex-end',
  },
  userTitle: {
    color: Colors.primary,
    fontSize: 15,
    fontWeight: '800',
  },
  userChat: {
    color: Colors.primary,
  },

  bottomContainer: {
    flex: 2,
    padding: 10,
    justifyContent: 'center',
  },

  inputAndBtnCtn: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    flexDirection: 'row',
    gap: 10,
  },
  addIconCtn: {
    flexDirection: 'row',
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    padding: 25,
    gap: 10,
  },
  addIconTxt: {
    color: Colors.secondary,
  },
  errMsg: {
    paddingTop: 2,
    paddingLeft: 20,
    color: Colors.secondary,
  },
});
