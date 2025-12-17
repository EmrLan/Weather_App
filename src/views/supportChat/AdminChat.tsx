import {
  FlatList,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import Background from '../../components/layouts/Background';
import { useEffect, useState } from 'react';
import {
  addDoc,
  collection,
  doc,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from '@react-native-firebase/firestore';
import { getApp } from '@react-native-firebase/app';
import { getAuth } from '@react-native-firebase/auth';
import InputField from '../../components/inputField/InputField';
import { Colors } from '../../utils/Colors';
import Header from '../../components/layouts/Header';
import {
  Navigation,
  ProfileScreenNavigationProp,
} from '../../navigation/Navigation';
import { useNavigation } from '@react-navigation/native';

interface UserDocument {
  email: string;
}

function onError(error: any) {
  console.error('OnSnapshot Error: ', error);
}

export default function AdminChat() {
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const app = getApp();
  const db = getFirestore(app);
  const auth = getAuth(app);
  const [selection, setSelection] = useState<string>('');
  const [email, setEmail] = useState('');
  const [users, setUsers] = useState<UserDocument[]>([]);
  const [input, setInput] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const userEmail = auth.currentUser?.email || '';
    if (userEmail.length > 0) {
      setEmail(userEmail);
      const userDocRef = collection(db, 'SupportChatData');

      const unSubscribe = onSnapshot(
        query(userDocRef, orderBy('updatedAt', 'asc')),
        onResultSupport,
        onError,
      );

      return unSubscribe;
    }
  }, []);

  function onResultSupport(QuerySnapshot: any) {
    // console.log(QuerySnapshot)
    if (QuerySnapshot) {
      const userList: UserDocument[] = QuerySnapshot.docs.map((doc: any) => {
        const data = doc.id;
        return {
          email: data,
        };
      });
      setUsers(userList);
    }
  }

  const onSubmit = async () => {
    if (!input.trim()) return;

    try {
      const userDocRef = doc(db, 'SupportChatData', email);
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
  };

  return (
    <Background>
      <View style={Styles.container}>
        <View style={Styles.innerContainer}>
          <Header title={'Users'} color={Colors.bgSecondary}/>
          <View style={Styles.msgCtn}>
            <FlatList
              data={users}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  style={Styles.emailBtn}
                  key={index}
                  onPress={() =>
                    navigation.navigate('Support', { routeEmail: item.email })
                  }
                >
                  <Text style={Styles.emailTxt}>{item.email}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </View>
      </View>
    </Background>
  );
}

const Styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
  },

  innerContainer: {
    justifyContent: 'space-between',
    paddingTop: Platform.OS === 'android' ? 50 : 60,
    paddingBottom: 20,
    alignItems: 'center',
    gap: 20
  },

  emailBtn: {
    padding: 10,
    backgroundColor: Colors.bgSecondary,
    marginVertical: 10,
    borderRadius: 15,
    alignItems: 'center',
  },
  emailTxt: {
    color: Colors.primary,
    fontSize: 15
  },

  msgCtn: {
    minWidth: '100%',
    paddingHorizontal: 10,
  },
});
