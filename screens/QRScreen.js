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
import QRCodeScanner from 'react-native-qrcode-scanner';
import {RNCamera} from 'react-native-camera';
import {style} from 'deprecated-react-native-prop-types/DeprecatedViewPropTypes';

const QRScreen = ({navigation}) => {
  // Cloth state
  const [cloth, setCloth] = useState('');

  const onSuccess = e => {
    setCloth(e.data);
  };

  // Function to add clothes to virtual cart
  const addToCart = clothId => {
    navigation.navigate('ClothScreen', {
      clothId: clothId,
    });
  };

  // Function to logout
  const logout = () => {
    Alert.alert(
      'Logout',
      'Are you sure? You want to logout?',
      [
        {
          text: 'Cancel',
          onPress: () => {
            return null;
          },
        },
        {
          text: 'Confirm',
          onPress: () => {
            auth()
              .signOut()
              .then(() => navigation.navigate('LoginScreen'))
              .catch(error => {
                console.log(error);
                if (error.code === 'auth/no-current-user') {
                  navigation.navigate('Splash');
                } else {
                  alert(error);
                }
              });
          },
        },
      ],
      {cancelable: false},
    );
  };

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
        Scan QR Codes of Clothes
      </Text>
      <TouchableOpacity
        onPress={() => logout()}
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
        <Text style={{fontSize: 18, color: '#000'}}>Logout</Text>
      </TouchableOpacity>
      <QRCodeScanner
        onRead={e => addToCart(e.data)}
        flashMode={RNCamera.Constants.FlashMode.off}
        reactivateTimeout={5000}
        reactivate={true}
        showMarker={true}
        containerStyle={styles.contStyle}
        cameraStyle={styles.camStyle}
        cameraContainerStyle={styles.camConStyle}
      />
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
        <Text style={{fontSize: 18, color: '#000'}}>View Cart</Text>
      </TouchableOpacity>
    </View>
  );
};

// Custom styles for QR scanner
const styles = StyleSheet.create({
  contStyle: {
    marginTop: 10,
    maxHeight: 450,
  },
  camConStyle: {
    maxHeight: '100%',
  },
  camStyle: {
    width: '70%',
    maxHeight: 'auto',
    alignSelf: 'center',
  },
});

export default QRScreen;
