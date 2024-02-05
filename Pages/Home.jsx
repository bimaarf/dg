import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
// import { LinearGradient } from "expo-linear-gradient";
import LinearGradient from 'react-native-linear-gradient';

import React, {useEffect, useState} from 'react';
import {
  AppState,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import TouchableScale from 'react-native-touchable-scale';
// import BackgroundTimer from "react-native-background-timer";
import {DogeTimer} from './Components/DogeTimer';

export const Home = () => {
  const navRedirect = useNavigation();
  const [amount, setAmount] = useState(10000);
  const [authName, setAuthName] = useState('');
  const [authPackage, setAuthPackage] = useState('');
  const [authDoge, setAuthDoge] = useState('');

  useEffect(() => {
    const getLocalStorage = async () => {
      try {
        const name = await AsyncStorage.getItem('auth_name');
        const packageValue = await AsyncStorage.getItem('auth_package');
        const dogeAmount = await AsyncStorage.getItem('auth_doge');

        if (name !== null) {
          setAuthName(name);
        }

        if (packageValue !== null) {
          setAuthPackage(packageValue);
        }
        if (dogeAmount !== null) {
          setAuthDoge(dogeAmount);
        }
      } catch (error) {
        console.error('Error retrieving data from AsyncStorage:', error);
      }
    };

    getLocalStorage();
  }, []);

  useEffect(() => {
    const loadAmountFromStorage = async () => {
      try {
        const storedAmount = await AsyncStorage.getItem('amount');
        if (storedAmount !== null) {
          setAmount(parseFloat(storedAmount));
        }
      } catch (error) {
        console.error('Error loading amount from storage:', error);
      }
    };

    // Start timer in background
    // BackgroundTimer.start();

    // const intervalId = BackgroundTimer.setInterval(() => {
    //   // Hitung penambahan 0,6% per detik
    //   setAmount((prevAmount) => {
    //     const percentageIncrement = 0.6 / 100;
    //     const elapsedTimeInSeconds = 1; // karena interval setiap detik

    //     const newAmount =
    //       prevAmount * (1 + percentageIncrement * elapsedTimeInSeconds);

    //     // Simpan nilai amount ke local storage
    //     AsyncStorage.setItem("amount", newAmount.toString());

    //     return newAmount;
    //   });
    // }, 1000);

    // // Load nilai amount dari local storage saat komponen di-mount
    // loadAmountFromStorage();

    // // Bersihkan interval saat komponen di-unmount
    // return () => {
    //   BackgroundTimer.clearInterval(intervalId);
    //   // Stop background timer
    //   BackgroundTimer.stop();
    // };
  }, []);
  return (
    <LinearGradient colors={['#310861', '#17032e']} style={styles.gradient}>
      <ScrollView>
        <TouchableScale
          tension={50}
          friction={7}
          useNativeDriver
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 20,
            marginHorizontal: 10,
            backgroundColor: '#FFE800',
            borderRadius: 10,
            padding: 17,
          }}>
          <View>
            <Text
              style={{
                fontWeight: 'bold',
                textAlign: 'center',
                textTransform: 'capitalize',
              }}>
              Welcome, {authName}
            </Text>
            <Text style={{fontWeight: 'bold', textAlign: 'center'}}>
              Doge {authDoge}
            </Text>
          </View>
        </TouchableScale>
        {/*  */}
        <TouchableScale
          tension={50}
          friction={7}
          useNativeDriver
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 20,
            marginHorizontal: 10,
            backgroundColor: 'rgba(000, 000, 000, 0.1)',
            borderRadius: 10,
            padding: 17,
          }}>
          <View>
            <Text
              style={{
                fontWeight: 'bold',
                textAlign: 'center',
                color: 'yellow',
              }}>
              Active: Package {authPackage}
            </Text>
            <Text
              style={{
                fontWeight: 'bold',
                textAlign: 'center',
                color: 'yellow',
              }}>
              Range : D3
            </Text>
          </View>
        </TouchableScale>
        {/*  */}
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 20,
            marginHorizontal: 10,
            backgroundColor: 'rgba(000, 000, 000, 0.1)',
            borderRadius: 10,
            padding: 17,
          }}>
          <View>
            <Text
              style={{
                fontWeight: 'bold',
                textAlign: 'center',
                color: 'yellow',
              }}>
              Active Commition :
            </Text>
            <Text
              style={{
                fontWeight: 'bold',
                textAlign: 'center',
                color: 'yellow',
              }}>
              Doge : 10,0000
            </Text>
            <TouchableScale
              style={styles.button}
              onPress={() => navRedirect.navigate('WdActive')}>
              <Text style={{color: 'white', textAlign: 'center'}}>
                Withdraw
              </Text>
            </TouchableScale>
          </View>
        </View>
        {/*  */}
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 20,
            marginHorizontal: 10,
            backgroundColor: 'rgba(000, 000, 000, 0.1)',
            borderRadius: 10,
            padding: 17,
          }}>
          <View>
            <Text
              style={{
                fontWeight: 'bold',
                textAlign: 'center',
                color: 'yellow',
              }}>
              Passive Commition :
            </Text>
            <Text
              style={{
                fontWeight: 'bold',
                textAlign: 'center',
                color: 'yellow',
              }}>
              Doge : 10,0000
            </Text>
            <TouchableScale
              style={styles.button}
              onPress={() => navRedirect.navigate('WdPassive')}>
              <Text style={{color: 'white', textAlign: 'center'}}>
                Withdraw
              </Text>
            </TouchableScale>
          </View>
        </View>
        {/* Doge Amount */}
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 20,
            marginHorizontal: 10,
            backgroundColor: 'rgba(000, 000, 000, 0.1)',
            borderRadius: 10,
            padding: 17,
          }}>
          <View>
            <TouchableScale tension={50} friction={7} useNativeDriver>
              <Image
                source={require('../Assets/dogecoin.png')}
                style={{
                  width: 200,
                  resizeMode: 'contain',
                }}
              />
            </TouchableScale>
            <Text
              style={{
                fontWeight: 'bold',
                textAlign: 'center',
                color: 'yellow',
              }}>
              Doge : {authDoge}
            </Text>
            <Text
              style={{
                fontWeight: 'bold',
                textAlign: 'center',
                color: 'yellow',
              }}>
              $1 : 12.08238283
            </Text>
            <Text
              style={{
                fontWeight: 'bold',
                textAlign: 'center',
                color: 'yellow',
              }}>
              $1 : 4
            </Text>
            <Text
              style={{
                fontWeight: 'bold',
                textAlign: 'center',
                color: 'red',
              }}>
              -2.04%
            </Text>
          </View>
        </View>
        {/* Doge Mining */}
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 20,
            marginHorizontal: 10,
            backgroundColor: 'rgba(000, 000, 000, 0.1)',
            borderRadius: 10,
            padding: 17,
            marginBottom: 20,
          }}>
          <Text
            style={{
              fontWeight: 'bold',
              textAlign: 'center',
              color: 'yellow',
            }}>
            Start : 2024-01-03 16:03:22
          </Text>
          <Text
            style={{
              fontWeight: 'bold',
              textAlign: 'center',
              color: 'yellow',
            }}>
            End : 2025-01-03 16:03:22
          </Text>
          <View>
            <TouchableScale tension={50} friction={7} useNativeDriver>
              <Image
                source={require('../Assets/mining.gif')}
                style={{
                  width: 500,
                  height: 300,
                }}
              />
            </TouchableScale>
          </View>
          {/* {authDoge && <DogeTimer authDoge={authDoge} />} */}
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
    backgroundColor: 'rgba(000, 000, 000, 0.1)',
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
    backgroundColor: 'green',
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
