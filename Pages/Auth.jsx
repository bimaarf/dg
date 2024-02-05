import {useNavigation} from '@react-navigation/native';
// import { LinearGradient } from "expo-linear-gradient";
import LinearGradient from 'react-native-linear-gradient';

import React, {useState} from 'react';
import {
  ActivityIndicator,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import TouchableScale from 'react-native-touchable-scale';
import {Login} from './__Login';
import {Register} from './__Register';

export const Auth = () => {
  const [isLoading, setLoading] = useState(false);
  const navRedirect = useNavigation();
  const [menuActive, setMenuActive] = useState(true);
  return (
    <LinearGradient colors={['#310861', '#17032e']} style={styles.gradient}>
      {isLoading && (
        <View style={styles.container}>
          <Modal transparent={true} animationType="slide" visible={isLoading}>
            <View style={styles.modalContainer}>
              <ActivityIndicator size="large" color="yellow" />
            </View>
          </Modal>
        </View>
      )}
      <ScrollView>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
          }}>
          <Image
            source={require('../Assets/logo.png')}
            style={{
              width: 300,
              height: 300,
              resizeMode: 'contain',
            }}
          />
          <View
            style={{
              backgroundColor: 'rgba(000, 000, 000, 0.1)', // Adjust the alpha value as needed (0.0 to 1.0)

              padding: 10,
              borderRadius: 50,
              flex: 1,
              justifyContent: 'center',
              flexDirection: 'row',
            }}>
            <View
              style={
                menuActive && {
                  backgroundColor: 'rgba(000, 000, 000, 0.1)', // Adjust the alpha value as needed (0.0 to 1.0)
                  borderRadius: 50,
                }
              }>
              <TouchableScale
                tension={50}
                friction={7}
                useNativeDriver
                onPress={e => setMenuActive(true)}
                style={styles.menu}>
                <Text style={{color: 'white', fontWeight: 'bold'}}>Login</Text>
              </TouchableScale>
            </View>
            <View
              style={
                menuActive === false && {
                  backgroundColor: 'rgba(000, 000, 000, 0.1)', // Adjust the alpha value as needed (0.0 to 1.0)
                  borderRadius: 50,
                }
              }>
              <TouchableScale
                tension={50}
                friction={7}
                useNativeDriver
                onPress={e => setMenuActive(false)}
                style={styles.menu}>
                <Text style={{color: 'white', fontWeight: 'bold'}}>
                  Register
                </Text>
              </TouchableScale>
            </View>
          </View>
          {menuActive ? (
            <Login
              isLoading={isLoading}
              setLoading={setLoading}
              styles={styles}
            />
          ) : (
            <Register
              isLoading={isLoading}
              setLoading={setLoading}
              styles={styles}
            />
          )}
        </View>
      </ScrollView>
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Opacity 50%
  },
  gradient: {
    flex: 1,
  },
  input: {
    backgroundColor: 'rgba(000, 000, 000, 0.2)',

    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
    borderRadius: 10,
    color: 'white',
  },
  inputFocused: {
    borderWidth: 1,
    borderColor: 'yellow',
  },
  button: {
    backgroundColor: 'orange',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
  },
  menu: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    alignItems: 'center',
  },
});
