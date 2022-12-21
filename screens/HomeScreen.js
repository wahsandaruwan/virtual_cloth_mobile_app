import React, {useEffect, useState} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from './SplashScreen';
import LoginScreen from './LoginScreen';
import RegisterScreen from './RegisterScreen';
import QRScreen from './QRScreen';
import ClothScreen from './ClothScreen';
import UserClothesScreen from './UserClothesScreen';

const Stack = createStackNavigator();

const HomeScreen = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Splash" options={{headerShown: false}}>
          {props => <SplashScreen {...props} />}
        </Stack.Screen>
        <Stack.Screen name="LoginScreen" options={{headerShown: false}}>
          {props => <LoginScreen {...props} />}
        </Stack.Screen>
        <Stack.Screen name="RegisterScreen" options={{headerShown: false}}>
          {props => <RegisterScreen {...props} />}
        </Stack.Screen>
        <Stack.Screen name="QRScreen" options={{headerShown: false}}>
          {props => <QRScreen {...props} />}
        </Stack.Screen>
        <Stack.Screen name="ClothScreen" options={{headerShown: false}}>
          {props => <ClothScreen {...props} />}
        </Stack.Screen>
        <Stack.Screen name="UserClothesScreen" options={{headerShown: false}}>
          {props => <UserClothesScreen {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default HomeScreen;
