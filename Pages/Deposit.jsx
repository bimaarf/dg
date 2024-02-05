import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
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
import {Row, Rows, Table} from 'react-native-table-component';
import TouchableScale from 'react-native-touchable-scale';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {Toast} from 'toastify-react-native';

export const Deposit = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formInput, setFormInput] = useState({amount: '', doge_address: ''});
  const [authToken, setAuthToken] = useState('');
  const [authName, setAuthName] = useState('');
  const navRedirect = useNavigation();
  const [getData, setData] = useState(null); // Definisikan state untuk menyimpan data
  const [currentPage, setCurrentPage] = useState(0);
  const [lastPage, setLastPage] = useState(0);

  const fetchHistory = async () => {
    setIsLoading(true);
    try {
      await axios.get('sanctum/csrf-cookie');
      const response = await axios.get('api/history/deposit/get');
      if (response.data.status === 200) {
        setData(response.data.data.data); // Set data ke state
        setCurrentPage(response.data.currentPage);
        setLastPage(response.data.data.last_page);
      }
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.error('Error fetching data:', error);
    }
  };

  const fetchNextPage = async () => {
    setIsLoading(true);
    console.log('curret ' + currentPage);
    console.log('last ' + lastPage);
    if (lastPage <= currentPage) {
      setIsLoading(false);
      return Toast.info('there is no data on the next page');
    }
    if (lastPage > currentPage) {
      try {
        await axios.get('sanctum/csrf-cookie');
        const response = await axios.get(
          `api/history/passive/get?page=${currentPage + 1}`,
        );
        if (response.data.status === 200) {
          setData(response.data.data.data); // Set data ke state
          setCurrentPage(response.data.currentPage);
          setLastPage(response.data.data.last_page);
        }
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);

        console.error('Error fetching next page:', error);
      }
    }
  };

  const fetchPrevPage = async () => {
    setIsLoading(true);
    console.log('prev curret ' + currentPage);
    console.log('prev last ' + lastPage);
    if (lastPage <= currentPage || currentPage <= 1) {
      setIsLoading(false);
      return Toast.info('there is no data on the preview page');
    }
    if (lastPage > currentPage && currentPage >= 0) {
      try {
        await axios.get('sanctum/csrf-cookie');
        const response = await axios.get(
          `api/history/passive/get?page=${currentPage - 1}`,
        );
        if (response.data.status === 200) {
          setData(response.data.data.data); // Set data ke state
          setCurrentPage(response.data.currentPage);
          setLastPage(response.data.data.last_page);
        }
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);

        console.error('Error fetching next page:', error);
      }
    }
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
      setIsLoading(false);
      if (response.data.status === 200) {
        Toast.success('Deposit in process');
        setFormInput({amount: '', doge_address: ''});
        navRedirect.navigate('DepositWallet');
      } else if (response.data.status === 201) {
        Toast.warn('Something went wrong!');
      }
    } catch (error) {
      setIsLoading(false);
      console.error('Error:', error.response);
      Toast.warn('An error occurred. Please try again later.');
    }
  };

  useEffect(() => {
    fetchHistory();

    const getLocalStorage = async () => {
      try {
        const token = await AsyncStorage.getItem('auth_token');
        const name = await AsyncStorage.getItem('auth_name');
        if (token !== null) {
          setAuthToken(token);
        }
        if (name !== null) {
          setAuthName(name);
        }
      } catch (error) {
        console.error('Error retrieving data from AsyncStorage:', error);
      }
    };

    getLocalStorage();
  }, []);

  const handleChangeInput = (text, input) => {
    setFormInput({...formInput, [input]: text});
  };

  return (
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
              <Text style={{textAlign: 'center'}}>DEPOSIT DOGE {authName}</Text>
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
                <Text style={{color: '#fff', fontWeight: 'bold'}}>Deposit</Text>
              </TouchableScale>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: 10,
              }}></View>
          </View>
        </View>
        {getData && getData.map && (
          <>
            <ScrollView horizontal={true}>
              <Table
                borderStyle={{
                  borderWidth: 2,
                  borderColor: 'rgba(140, 140, 140, 0.1)',
                }}>
                <Row
                  data={['No', 'date', 'amount', 'status', 'From', 'To']}
                  style={styles.head}
                  textStyle={{
                    ...styles.text,
                    fontWeight: 'bold', // tambahkan gaya teks tambahan di sini jika diperlukan
                  }}
                />

                <Rows
                  style={{backgroundColor: 'rgba(0, 0, 0, 0.2)'}}
                  data={getData.map((rowData, index) => {
                    return [
                      currentPage > 1
                        ? (currentPage - 1) * 10 + index + 1
                        : index + 1,
                      rowData.updated_at,
                      rowData.amount,
                      rowData.status,
                      rowData.address_from,
                      rowData.address_to,
                    ];
                  })}
                  textStyle={styles.text}
                />
              </Table>
            </ScrollView>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 10,
              }}>
              <TouchableScale style={styles.buttonPage} onPress={fetchPrevPage}>
                <Text style={{color: '#fff'}}>Previous Page</Text>
              </TouchableScale>
              <Text style={{color: '#fff'}}>
                {currentPage + ' of ' + lastPage}
              </Text>
              <TouchableScale style={styles.buttonPage} onPress={fetchNextPage}>
                <Text style={{color: '#fff'}}>Next</Text>
              </TouchableScale>
            </View>
          </>
        )}
      </ScrollView>
      <View style={styles.container}>
        <Modal transparent={true} animationType="slide" visible={isLoading}>
          <View style={styles.modalContainer}>
            <ActivityIndicator size="large" color="yellow" />
          </View>
        </Modal>
      </View>
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
  head: {height: 40, backgroundColor: 'rgba(0, 0, 0, 0.5)'},
  text: {
    marginVertical: 10,
    marginHorizontal: 6,
    width: 140,
    color: 'white',
    textTransform: 'capitalize',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.2)', // Opacity 50%
  },
  gradient: {
    flex: 1,
  },
  input: {
    backgroundColor: 'rgba(000, 000, 000, 0.1)',
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
  buttonPage: {
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
