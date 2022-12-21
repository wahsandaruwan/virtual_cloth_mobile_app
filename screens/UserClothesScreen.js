import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
  StyleSheet,
  Linking,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserClothesScreen = ({navigation}) => {
  // User clothes state
  const [userClothes, setUserClothes] = useState('');

  // User email state
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    // Get user email
    // getUserEmail();

    // Load user clothes
    getUserClothes();
  }, []);

  // Get user email from local storage
  //   const getUserEmail = async () => {
  //     const email = await AsyncStorage.getItem('userEmail');
  //     setUserEmail(email);
  //   };

  // Function to get user clothes based on user email from virtual cart
  const getUserClothes = async () => {
    const userEmail = await AsyncStorage.getItem('userEmail');
    await firestore()
      .collection('VirtualCart')
      // Filter results
      .where('userEmail', '==', userEmail)
      .get()
      .then(querySnapshot => {
        console.log(querySnapshot._docs);
        setUserClothes(querySnapshot._docs);
      });
  };

  // Function to navigate QR screen
  const gotoQR = () => {
    navigation.navigate('QRScreen');
  };

  const oneCloth = ({item}) => {
    <Text>{item._data.clothId}</Text>;
  };

  return <FlatList data={userClothes} renderItem={this.oneCloth} />;
};

export default UserClothesScreen;
