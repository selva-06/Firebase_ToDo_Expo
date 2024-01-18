for firebase configuration install :: 
1.    "@react-native-firebase/app": "^18.7.3",
2.    "firebase": "^10.7.1",

CREATE FIREBASE.JS:

// Import the functions you need from the SDKs you need
import firebase from 'firebase/compat/app'; // Update the import to use compat
import 'firebase/compat/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBXeUPmVdRn-sXpJOUT9LHJhZQi3rvgPSo",
  authDomain: "signin-839e7.firebaseapp.com",
  projectId: "signin-839e7",
  storageBucket: "signin-839e7.appspot.com",
  messagingSenderId: "631549079777",
  appId: "1:631549079777:web:314fad96a3f1bc7f5d47a0",
  measurementId: "G-QGMWC8WD6Q"
};

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }
  
  export default firebase;
  export const auth = firebase.auth(); // Export the auth object


USE THAT IN UR COMPONENT ::

import firebase from './firebase'; // Ensure correct path to your firebase initialization file
import { StyleSheet, Text,TextInput,Button, View } from "react-native";
import React, { useState } from 'react';
 
export default function App() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
 
  const handleLogin = async () => {
    try {
      const userCredential = await firebase.auth().signInWithEmailAndPassword(email, password);
      if (userCredential) {
        setLoggedIn(true);
      }
    } catch (error) {
      console.log('Error signing in:', error);
    }
  };
 
  return (
    <View style={{marginTop:100}}>
      {!loggedIn ? (
        <View>
      <TextInput
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
    </View>): (
      <View>
        <Text>sorry</Text>
      </View>
    )}
    </View>
 
 
  );
}
