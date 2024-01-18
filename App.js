import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import firebase from './firebase'; // Import the firebase instance
const SignIn = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [error, setError] = useState(null);


  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '631549079777-g5svh9cg1ralev9f98ai1n7cvvc1lk99.apps.googleusercontent.com',   
    });

    const checkPlayServices = async () => {
      try {
        const hasPlayServices = await GoogleSignin.hasPlayServices();
        console.log('Google Play Services:', hasPlayServices);
      } catch (error) {
        console.error('Error checking Play Services:', error);
      }
    };

    checkPlayServices();
  }, []);

//   const onGoogleButtonPress = async () => {
//     try {
//       await GoogleSignin.hasPlayServices();
//       const user = await GoogleSignin.signIn();
//       setUserInfo(user);
//       setError(null);
//       console.log('Google Sign-In User:', user);
//     } catch (error) {
//       console.error('Google Sign-In Error:', error);
//       setError(error.message || 'An error occurred.');
//     }
//   };

//   const onSignOutPress = async () => {
//     try {
//       await GoogleSignin.hasPlayServices();
//       const user = await GoogleSignin.getCurrentUser();

//       if (user) {
//         await GoogleSignin.revokeAccess();
//         await GoogleSignin.signOut();
//         setUserInfo(null);
//         setError(null);
//         console.log('User signed out successfully!');
//       } else {
//         console.log('No user signed in.');
//         setError('No user signed in.');
//       }
//     } catch (error) {
//       console.error('Sign Out Error:', error);
//       setError(error.message || 'An error occurred.');
//     }
//   };
const onGoogleButtonPress = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const user = await GoogleSignin.signIn();
      setUserInfo(user);

      // Authenticate with Firebase using the Google Sign-In credentials
      const credential = firebase.auth.GoogleAuthProvider.credential(user.idToken);
      await firebase.auth().signInWithCredential(credential);

      setError(null);
      console.log('Google Sign-In User:', user);
    } catch (error) {
      console.error('Google Sign-In Error:', error);
      setError(error.message || 'An error occurred.');
    }
  };

  const onSignOutPress = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const user = await GoogleSignin.getCurrentUser();

      if (user) {
        await GoogleSignin.revokeAccess();
        await GoogleSignin.signOut();
        setUserInfo(null);
        setError(null);

        // Sign out from Firebase
        await firebase.auth().signOut();

        console.log('User signed out successfully!');
      } else {
        console.log('No user signed in.');
        setError('No user signed in.');
      }
    } catch (error) {
      console.error('Sign Out Error:', error);
      setError(error.message || 'An error occurred.');
    }
  };


  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {userInfo ? (
        <View>
          <Text>User Info:</Text>
          <Text>Name: {userInfo.user.name}</Text>
          <Text>Email: {userInfo.user.email}</Text>
          <Text>Id: {userInfo.user.id}</Text>
        </View>
      ) : (
        <GoogleSigninButton
          style={{ width: 192, height: 48 }}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={onGoogleButtonPress}
        />
      )}
      {userInfo && <Button title="Sign Out" onPress={onSignOutPress} />}
      {error && <Text>Error: {error}</Text>}
    </View>
  );
};

export default SignIn;
