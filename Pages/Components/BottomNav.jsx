import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {
  getFocusedRouteNameFromRoute,
  useNavigation,
  useNavigationState,
} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import TouchableScale from 'react-native-touchable-scale';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconFA5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {Account} from '../Account';
import {Balance} from '../Balance';
import {Deposit} from '../Deposit';
import {Home} from '../Home';
import {ModalLogout} from '../Modal/ModalLogout';
import {Modal, StyleSheet, Text, View} from 'react-native';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
// Remove this import statement

import {Toast} from 'toastify-react-native';
import ToastManager from 'toastify-react-native';
const {Navigator, Screen} = createBottomTabNavigator();

export const BottomNav = () => {
  const [isLogout, setIsLogout] = useState(false);
  const [loadSubmit, setLoadSubmit] = useState(false);
  const navigationState = useNavigationState(state => state);
  const navRedirect = useNavigation();
  useEffect(() => {
    const focusedRoute = getFocusedRouteNameFromRoute(
      navigationState.routes[navigationState.index],
    );

    if (focusedRoute === 'Logout') {
      setIsLogout(true);
    } else {
      setIsLogout(false);
    }
  }, [navigationState]);
  const handleLogout = async e => {
    setLoadSubmit(true);
    e.preventDefault();
    await axios.get('sanctum/csrf-cookie').then(() => {
      axios
        .post('api/logout')
        .then(res => {
          setLoadSubmit(false);
          navRedirect('/');
          ToastManager.show('Anda telah logout');
          AsyncStorage.clear();
        })
        .catch(() => {
          setLoadSubmit(false);
          navRedirect('/');
          ToastManager.show('Anda telah logout');

          navRedirect.navigate('Navbar');
          AsyncStorage.clear();
        });
    });
  };
  return (
    <>
      <Navigator
        initialRouteName="Home"
        screenOptions={{
          headerShown: false,
          cardStyle: {backgroundColor: '#17032e'},
          tabBarInactiveBackgroundColor: '#17032e',
          tabBarActiveBackgroundColor: '#17032e',
          tabBarActiveTintColor: 'white',
          tabBarButton: ({onPress, onLongPress, children, style}) => (
            <TouchableScale
              tension={50}
              friction={7}
              useNativeDriver
              onPress={onPress}
              onLongPress={onLongPress}
              style={style}>
              {children}
            </TouchableScale>
          ),
        }}>
        <Screen
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({color, size}) => (
              <Icon name="dashboard" color={color} size={30} />
            ),
          }}
          name="Home"
          component={Home}
        />
        <Screen
          options={{
            tabBarLabel: 'Balance',
            tabBarIcon: ({color, size}) => (
              <IconFA5 name="layer-group" color={color} size={25} />
            ),
          }}
          name="Balance"
          component={Balance}
        />
        <Screen
          options={{
            tabBarLabel: 'Account',
            tabBarIcon: ({color, size}) => (
              <Icon name="bar-chart" color={color} size={25} />
            ),
          }}
          name="Account"
          component={Account}
        />
        <Screen
          options={{
            tabBarLabel: 'Deposit',
            tabBarIcon: ({color, size}) => (
              <IconFA5 name="coins" color={color} size={25} />
            ),
          }}
          name="Deposit"
          component={Deposit}
        />
        <Screen
          options={{
            tabBarLabel: 'Logout',
            tabBarIcon: ({color, size}) => (
              <MaterialIcons name="logout" color={color} size={25} />
            ),
          }}
          name="Logout"
          component={Home}
        />
      </Navigator>
      <Modal transparent={true} animationType="slide" visible={isLogout}>
        <View style={styles.modalContainer}>
          <TouchableScale
            tension={50}
            friction={7}
            onBlur={() => nav}
            useNativeDriver
            style={styles.button}
            onPress={() => {
              setIsLogout(false);
              navRedirect.navigate('Auth');
            }}
            onFocus={handleLogout}>
            <Text style={{color: '#fff', fontWeight: 'bold'}}>Logout</Text>
          </TouchableScale>
        </View>
      </Modal>
    </>
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
    backgroundColor: 'rgba(0, 0, 0, 0.9)', // Opacity 50%
  },
  button: {
    backgroundColor: 'red',
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
});
