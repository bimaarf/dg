// import { LinearGradient } from "expo-linear-gradient";
import LinearGradient from 'react-native-linear-gradient';

import React, {useState} from 'react';
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

export const WdPassive = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [formInput, setFormInput] = useState(0);
  const handleSubmit = e => {
    e.preventDefault();
    console.log(formInput);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
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
              <Text style={{textAlign: 'center'}}>WITHDRAWAL DOGE</Text>
              <Text style={{textAlign: 'center'}}>$100.00 = DOGE 12.50000</Text>
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
                  Doge Address
                </Text>
                <Text style={{textAlign: 'left', color: 'white'}}></Text>
              </ScrollView>
              <TextInput
                keyboardType="number-pad"
                placeholderTextColor="grey"
                style={styles.input}
                name="amount"
                placeholder="0"
                editable={false}
                value="D8enW4LGFak2xqujV8zjbfNExkcbnL1Mkr"
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
                keyboardType="number-pad"
                placeholderTextColor="grey"
                style={styles.input}
                value={formInput}
                onChangeText={text => setFormInput(text)}
                placeholder="0"
              />
              <Text style={styles.input}>DOGE</Text>
              <TouchableScale
                tension={50}
                friction={7}
                useNativeDriver
                onPress={handleSubmit}
                style={styles.button}>
                <Text style={{color: '#fff', fontWeight: 'bold'}}>SEND</Text>
              </TouchableScale>
            </View>
          </View>
        </View>
      </ScrollView>
      <View>
        <Modal transparent={true} animationType="slide" visible={isLoading}>
          <View style={styles.modalContainer}>
            <ActivityIndicator size="large" color="yellow" />
          </View>
        </Modal>

        <View>
          {/* Tampilkan konten aplikasi setelah proses loading selesai */}
          <Text>Ini adalah konten aplikasi</Text>
        </View>
      </View>
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
