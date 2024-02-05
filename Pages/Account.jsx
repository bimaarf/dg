// import { LinearGradient } from "expo-linear-gradient";

import LinearGradient from 'react-native-linear-gradient';

import React from 'react';
import {Image, ScrollView, StyleSheet, View} from 'react-native';

export const Account = () => {
  return (
    <LinearGradient colors={['#310861', '#17032e']} style={styles.gradient}>
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
        </View>
      </ScrollView>
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  input: {
    backgroundColor: 'rgba(240, 240, 240, 0.1)',
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
    backgroundColor: '#42BB5D',
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
