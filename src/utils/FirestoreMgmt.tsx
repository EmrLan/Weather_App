import { Component } from 'react';
import firestore from '@react-native-firebase/firestore';

class FirestoreMgmt {
  async getData(email: string) {
    return await firestore().collection('UserData').doc(email).get();
  }
  async setData(email: string, data: Record<string, any>) {
    await firestore().doc(email).collection('UserData').add(data);
  }
}
