import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Alert,
  StyleSheet,
  Linking,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ClothScreen = ({navigation, route}) => {
  // Cloth state
  const [cloth, setCloth] = useState('');

  // User email state
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    // Load particular cloth
    getCloth();

    // Get user email
    getUserEmail();
  }, []);

  // Get user email from local storage
  const getUserEmail = async () => {
    const email = await AsyncStorage.getItem('userEmail');
    setUserEmail(email);
  };

  // Function to get a cloth based on id
  const getCloth = () => {
    console.log(route.params.clothId);
    firestore()
      .collection('Clothes')
      // Filter results
      .where('clothId', '==', route.params.clothId)
      .get()
      .then(querySnapshot => {
        console.log(querySnapshot._docs[0]._data);
        setCloth(querySnapshot._docs[0]._data);
      });
  };

  // Function to add a coth to virtual cart
  const addToCart = async () => {
    // Verification status
    let status = '';

    // Check cloth id and user email available
    await firestore()
      .collection('VirtualCart')
      .where('clothId', '==', cloth.clothId)
      .get()
      .then(querySnapshot => {
        if (querySnapshot._docs.length > 0) {
          console.log(querySnapshot._docs.length);
          const results = querySnapshot._docs.filter(
            result => result._data.userEmail == userEmail,
          );
          if (results.length > 0) {
            alert('Cloth already exist in your Virtual Cart');
            status = false;
          } else {
            status = true;
          }
        } else {
          status = true;
        }
      });

    // Add cloth to virtual cart after verification
    if (status) {
      await firestore()
        .collection('VirtualCart')
        .add({
          userEmail: userEmail,
          clothId: cloth.clothId,
        })
        .then(() => {
          alert('Cloth added');
          navigation.navigate('QRScreen');
        });
    }
  };

  // Function to navigate QR screen
  const gotoQR = () => {
    navigation.navigate('QRScreen');
  };

  return (
    <SafeAreaView
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <View style={{flexDirection: 'row'}}>
        <Image
          style={{
            resizeMode: 'contain',
            flex: 1,
            aspectRatio: 1.5,
          }}
          source={{uri: cloth.image}}
        />
      </View>
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          marginVertical: 10,
          color: '#000',
        }}>
        Category : {cloth.category}
      </Text>
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          marginVertical: 10,
          color: '#000',
        }}>
        Price : Rs. {cloth.price}
      </Text>
      <Text
        style={{
          fontSize: 20,
          fontWeight: 'bold',
          marginVertical: 10,
          color: '#000',
        }}>
        Gender : {cloth.gender}
      </Text>
      <Text
        style={{
          fontSize: 25,
          fontWeight: 'bold',
          marginTop: 15,
          marginBottom: 10,
          color: '#eb343a',
        }}>
        Add this Cloth to Virtual Cart.
      </Text>
      <TouchableOpacity
        onPress={() => addToCart()}
        style={{
          width: '40%',
          height: 40,
          backgroundColor: '#eb343a',
          borderRadius: 10,
          marginTop: 10,
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
        }}>
        <Text style={{fontSize: 18, color: '#000'}}>Ok</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => gotoQR()}
        style={{
          width: '40%',
          height: 40,
          backgroundColor: '#000',
          borderRadius: 10,
          marginTop: 10,
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
        }}>
        <Text style={{fontSize: 18, color: '#fff'}}>Cancel</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ClothScreen;
