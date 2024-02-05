import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
// import { LinearGradient } from "expo-linear-gradient";
import LinearGradient from 'react-native-linear-gradient';

import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import TouchableScale from 'react-native-touchable-scale';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Toast} from 'toastify-react-native';

export const DepositWallet = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formInput, setFormInput] = useState({amount: '', doge_address: ''});
  const [authToken, setAuthToken] = useState('');

  useEffect(() => {
    const getLocalStorage = async () => {
      try {
        const token = await AsyncStorage.getItem('auth_token');
        // if (token !== null) {
        setAuthToken(token);
        // }
      } catch (error) {
        console.error('Error retrieving data from AsyncStorage:', error);
      }
    };

    getLocalStorage();
  }, []);

  const handleChangeInput = (text, input) => {
    setFormInput({...formInput, [input]: text});
  };
  const handleSubmit = async () => {
    setIsLoading(true);
    const data = {
      amount: formInput.amount,
      doge_address: formInput.doge_address,
    };
    const headers = {
      Authorization: `Bearer ${authToken}`,
    };
    try {
      await axios.get('sanctum/csrf-cookie', {headers});
      const response = await axios.post('api/deposit/store', data, {headers});
      console.log(response.data);
      setIsLoading(false);
      if (response.data.status === 200) {
        Toast.success('Deposit successfully');
      } else if (response.data.status === 201) {
        Toast.warn('Something is wrong!');
      }
    } catch (error) {
      setIsLoading(false);
      console.error('Error:', error.response); // Log detailed error response for debugging
      Toast.warn('An error occurred. Please try again later.');
    }
  };

  return (
    <>
      <LinearGradient colors={['#310861', '#17032e']} style={styles.gradient}>
        <ScrollView>
          <View
            style={{
              marginTop: 10,
              flex: 1,
              alignItems: 'center',
            }}>
            <View
              style={{
                backgroundColor: 'rgba(000, 000, 000, 0.1)',
                width: '100%',
                padding: 10,
                borderRadius: 10,
              }}>
              <View
                style={{
                  padding: 10,
                  backgroundColor: 'white',
                  borderRadius: 5,
                }}>
                <Text style={{textAlign: 'center'}}>
                  WITHDRAWAL DOGE : {authToken}
                </Text>
              </View>
              <View
                style={{
                  marginTop: 20,
                  padding: 10,
                  backgroundColor: 'rgba(000, 000, 000, 0.2)',
                  borderRadius: 5,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 10,
                  }}>
                  <Icon name="inbox" color={'white'} size={18} />
                  <Text style={{textAlign: 'left', color: 'white'}}>
                    Balance :
                  </Text>
                </View>
                <Text style={{textAlign: 'left', color: 'white', marginTop: 4}}>
                  12.50000 DOGE
                </Text>
              </View>
              <View
                style={{
                  marginTop: 5,
                  padding: 10,
                  backgroundColor: 'rgba(000, 000, 000, 0.2)',
                  borderRadius: 5,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 10,
                  }}>
                  <Icon name="user" color={'white'} size={18} />
                  <Text style={{textAlign: 'left', color: 'white'}}>
                    User : DogeCan
                  </Text>
                </View>
              </View>
              <View
                style={{
                  marginTop: 20,
                  padding: 10,
                  backgroundColor: 'rgba(000, 000, 000, 0.2)',
                  borderRadius: 5,
                }}>
                <ScrollView
                  horizontal={true}
                  showsHorizontalScrollIndicator={false} // Optional: hide the horizontal scroll indicator
                >
                  <Text
                    style={{
                      textAlign: 'left',
                      color: 'white',
                      marginRight: 10,
                    }}>
                    Your Doge Address
                  </Text>
                  <Text style={{textAlign: 'left', color: 'white'}}></Text>
                </ScrollView>
                <TextInput
                  keyboardType="ascii-capable"
                  placeholderTextColor="grey"
                  style={styles.input}
                  name="doge_address"
                  value={formInput.doge_address}
                  onChangeText={text => handleChangeInput(text, 'doge_address')}
                  placeholder="XXXXXXXX"
                />
                <Text
                  style={{
                    textAlign: 'left',
                    color: 'white',
                    marginRight: 10,
                  }}>
                  Amount
                </Text>
                <TextInput
                  keyboardType="numeric"
                  placeholderTextColor="grey"
                  style={styles.input}
                  value={formInput.amount}
                  name="amount"
                  onChangeText={text => handleChangeInput(text, 'amount')}
                  placeholder="0"
                />
                <Text style={styles.input}>DOGE</Text>
                <TouchableScale
                  disabled={isLoading ? true : false}
                  tension={50}
                  friction={7}
                  useNativeDriver
                  onPress={handleSubmit}
                  style={styles.button}>
                  <Text style={{color: '#fff', fontWeight: 'bold'}}>
                    Deposit
                  </Text>
                </TouchableScale>
              </View>
            </View>
          </View>
        </ScrollView>
      </LinearGradient>
      <View style={styles.container}>
        <Modal transparent={true} animationType="slide" visible={isLoading}>
          <View style={styles.modalContainer}>
            <ActivityIndicator size="large" color="yellow" />
          </View>
        </Modal>
      </View>
    </>
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
    backgroundColor: 'rgba(240, 240, 240, 0.1)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
    borderRadius: 5,
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
    borderRadius: 5,
    alignItems: 'center',
  },
  menu: {
    paddingVertical: 10,
    paddingHorizontal: 30,
    alignItems: 'center',
  },
});
