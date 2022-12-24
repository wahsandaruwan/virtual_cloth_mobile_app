import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Linking,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserClothesScreen = ({navigation}) => {
  // Cloth state
  const [clothes, setClothes] = useState([]);

  // User clothes state
  const [userClothes, setUserClothes] = useState([]);

  useEffect(() => {
    // Load user clothes
    getUserClothes();
  }, []);

  useEffect(() => {
    // Load details of all clothes
    getAllClothes();
  }, [userClothes]);

  // Function to get user clothes based on user email from virtual cart
  const getUserClothes = async () => {
    const userEmail = await AsyncStorage.getItem('userEmail');
    firestore()
      .collection('VirtualCart')
      // Filter results
      .where('userEmail', '==', userEmail)
      .get()
      .then(querySnapshot => {
        setUserClothes(querySnapshot._docs);
      });
  };

  // Function to get all clothes details
  const getAllClothes = () => {
    if (userClothes.length > 0) {
      userClothes.map((item, index) => {
        firestore()
          .collection('Clothes')
          // Filter results
          .where('clothId', '==', item._data.clothId)
          .get()
          .then(querySnapshot => {
            setClothes(curr => [...curr, querySnapshot._docs[0]._data]);
          })
          .catch(err => {
            console.log(err);
          });
      });
    }
  };

  // Function to navigate QR screen
  const gotoQR = () => {
    navigation.navigate('QRScreen');
  };

  return (
    // console.log(userClothes)
    // userClothes?.map((item, index) => <ListItem key={index} item={item} />)
    <ScrollView>
      <SafeAreaView
        style={{flex: 1, justifyContent: 'flex-start', alignItems: 'center'}}>
        <Text
          style={{
            marginTop: 25,
            fontSize: 30,
            color: '#eb343a',
            fontWeight: 'bold',
          }}>
          This is your Virtual Cart
        </Text>
        <TouchableOpacity
          onPress={() => gotoQR()}
          style={{
            width: '40%',
            height: 40,
            backgroundColor: '#000',
            borderRadius: 10,
            marginVertical: 20,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
          }}>
          <Text style={{fontSize: 18, color: '#fff'}}>Go Back</Text>
        </TouchableOpacity>
        {clothes.length > 0
          ? clothes.map((item, index) => {
              return (
                <View
                  key={index}
                  style={{
                    width: '60%',
                    paddingVertical: 40,
                    paddingHorizontal: 15,
                    backgroundColor: '#000',
                    marginBottom: 10,
                    alignItems: 'center',
                    borderRadius: 10,
                  }}>
                  <Image
                    style={{
                      width: 100,
                      height: 100,
                      marginBottom: 8,
                      borderRadius: 10,
                    }}
                    source={{uri: item.image}}
                  />
                  <Text style={{fontSize: 20, color: '#fff', marginBottom: 8}}>
                    {item.category}
                  </Text>
                  <Text style={{fontSize: 20, color: '#fff', marginBottom: 8}}>
                    Rs. {item.price}
                  </Text>
                </View>
              );
            })
          : null}
      </SafeAreaView>
    </ScrollView>
  );
};

export default UserClothesScreen;
