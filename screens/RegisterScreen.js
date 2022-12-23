import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RegisterScreen = ({navigation}) => {
  // Registration data states
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Function to handle user registration
  const handleRegistration = () => {
    if (!name) {
      alert('Please enter name');
      return;
    }
    if (!email) {
      alert('Please enter email');
      return;
    }
    if (!password) {
      alert('Please enter password');
      return;
    }
    if (password.length < 8) {
      alert('Please enter a password more than 8 characters long');
      return;
    }

    // Register new user with unique email and password
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(user => {
        // Create a new user
        firestore()
          .collection('Users')
          .add({
            name: name,
            email: email,
          })
          .then(async () => {
            // Set user email to local storage
            await AsyncStorage.setItem('userEmail', email);

            setName('');
            setEmail('');
            setPassword('');
            alert('User successfully registered');

            // If server response message same as Data Matched
            if (user) {
              navigation.navigate('QRScreen');
            }
          });
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          alert('This email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          alert('This email address is invalid!');
        }

        console.error(error);
      });
  };

  // Function to navigate login screen
  const gotoLogin = () => {
    navigation.navigate('LoginScreen');
  };

  return (
    <SafeAreaView
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text
        style={{
          alignSelf: 'center',
          fontSize: 50,
          fontWeight: 'bold',
          color: '#eb343a',
        }}>
        Register
      </Text>
      <TextInput
        value={name}
        placeholder="Enter name"
        placeholderTextColor="#464746"
        onChangeText={txt => setName(txt)}
        style={{
          width: '90%',
          height: 50,
          borderRadius: 10,
          borderWidth: 1,
          alignSelf: 'center',
          marginTop: 50,
          paddingHorizontal: 20,
          color: '#000',
        }}
      />
      <TextInput
        value={email}
        placeholder="Enter email address"
        placeholderTextColor="#464746"
        onChangeText={txt => setEmail(txt)}
        style={{
          width: '90%',
          height: 50,
          borderRadius: 10,
          borderWidth: 1,
          alignSelf: 'center',
          marginTop: 10,
          paddingHorizontal: 20,
          color: '#000',
        }}
      />
      <TextInput
        value={password}
        placeholder="Enter password"
        placeholderTextColor="#464746"
        onChangeText={txt => setPassword(txt)}
        secureTextEntry={true}
        style={{
          width: '90%',
          height: 50,
          borderRadius: 10,
          borderWidth: 1,
          alignSelf: 'center',
          marginTop: 10,
          paddingHorizontal: 20,
          color: '#000',
        }}
      />
      <TouchableOpacity
        onPress={() => handleRegistration()}
        style={{
          width: '90%',
          height: 50,
          backgroundColor: '#eb343a',
          borderRadius: 10,
          marginTop: 20,
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
        }}>
        <Text style={{fontSize: 18, color: '#000'}}>Register</Text>
      </TouchableOpacity>
      <Text
        onPress={() => gotoLogin()}
        style={{
          fontSize: 16,
          marginTop: 30,
          color: '#000',
        }}>
        Login, If you have an account already!
      </Text>
    </SafeAreaView>
  );
};

export default RegisterScreen;
