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
