import React, {useState, useEffect} from 'react';
import {Text, View, SafeAreaView, StyleSheet, Image} from 'react-native';

const SplashScreen = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => navigation.navigate({name: 'LoginScreen'}), 3000);
  }, []);
  return (
    <SafeAreaView
      style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <Text
        style={{
          fontSize: 30,
          fontWeight: 'bold',
          marginBottom: 10,
          color: '#eb343a',
        }}>
        Virtual Clothes
      </Text>
      <Text style={{fontSize: 20, fontWeight: 'bold', color: '#000'}}>
        Loading...
      </Text>
    </SafeAreaView>
  );
};

export default SplashScreen;
