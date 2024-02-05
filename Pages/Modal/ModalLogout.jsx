import {useNavigation} from '@react-navigation/native';
import {LinearGradient} from 'expo-linear-gradient';
import React from 'react';
import {Image, Modal, StyleSheet, Text, View} from 'react-native';
import TouchableScale from 'react-native-touchable-scale';

export const ModalLogout = ({isLogout, setIsLogout}) => {
  const navRedirect = useNavigation();
  return (
    <Modal transparent={true} animationType="slide" visible={true}>
      <View style={styles.modalContainer}>
        <TouchableScale
          tension={50}
          friction={7}
          useNativeDriver
          style={styles.button}
          onPress={() => setIsLogout(false)}>
          <Text style={{color: '#fff', fontWeight: 'bold'}}>Logout</Text>
        </TouchableScale>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Opacity 50%
  },
  button: {
    backgroundColor: 'green',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
});
