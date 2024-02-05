// import { LinearGradient } from "expo-linear-gradient";
import LinearGradient from 'react-native-linear-gradient';

import React, {useState} from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import {TableActive} from './Components/TableActive';
import {TablePassive} from './Components/TablePassive';

export const Balance = () => {
  const [isLoading, setIsLoading] = useState(false);
  return (
    <LinearGradient colors={['#310861', '#17032e']} style={styles.gradient}>
      <ScrollView>
        <View
          style={{
            flex: 1,
            alignItems: 'center',
          }}>
          <Text style={{color: 'white', fontSize: 17, marginBottom: 10}}>
            Active Bonus History
          </Text>
          <TableActive
            styles={styles}
            setIsLoading={setIsLoading}
            isLoading={isLoading}
          />
          <Text style={{color: 'white', fontSize: 17, marginBottom: 10}}>
            Passive Bonus History
          </Text>
          <TablePassive
            styles={styles}
            setIsLoading={setIsLoading}
            isLoading={isLoading}
          />
        </View>
      </ScrollView>
    </LinearGradient>
  );
};
const styles = StyleSheet.create({
  head: {height: 40, backgroundColor: 'rgba(0, 0, 0, 0.5)'},
  text: {
    marginVertical: 10,
    marginHorizontal: 6,
    width: 160,
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
