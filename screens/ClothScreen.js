import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Alert,
  StyleSheet,
  Linking,
} from 'react-native';
import auth from '@react-native-firebase/auth';

const ClothScreen = ({navigation, route}) => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text
        style={{
          fontSize: 30,
          fontWeight: 'bold',
          marginTop: 15,
          marginBottom: 10,
          color: '#eb343a',
        }}>
        Add this Cloth to Virtual Cart {route.params.clothId}
      </Text>
      <TouchableOpacity
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
        <Text style={{fontSize: 18, color: '#000'}}>Cancel</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ClothScreen;
