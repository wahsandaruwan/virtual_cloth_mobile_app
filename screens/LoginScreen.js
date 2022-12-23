import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({navigation}) => {
  // Login data states
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Function to handle user login
  const handleLogin = () => {
    if (!email) {
      alert('Please enter email');
      return;
    }
    if (!password) {
      alert('Please enter password');
      return;
    }

    auth()
      .signInWithEmailAndPassword(email, password)
      .then(async user => {
        // Set user email to local storage
        await AsyncStorage.setItem('userEmail', email);

        setEmail('');
        setPassword('');

        // If server response message same as Data Matched
        if (user) {
          navigation.navigate('QRScreen');
        }
      })
      .catch(error => {
        console.log(error);
        if (error.code === 'auth/invalid-email') {
          alert(error.message);
        } else if (error.code === 'auth/user-not-found') {
          alert('No User Found');
        } else {
          alert('Please check your email id or password');
        }
      });
  };

  // Function to navigate register screen
  const gotoRegister = () => {
    navigation.navigate('RegisterScreen');
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
        Login
      </Text>
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
          marginTop: 50,
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
        onPress={() => handleLogin()}
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
        <Text style={{fontSize: 18, color: '#000'}}>Login</Text>
      </TouchableOpacity>
      <Text
        onPress={() => gotoRegister()}
        style={{
          fontSize: 16,
          marginTop: 30,
          color: '#000',
        }}>
        Regster, If you don't have an account!
      </Text>
    </SafeAreaView>
  );
};

export default LoginScreen;
