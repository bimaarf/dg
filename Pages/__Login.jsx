import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {useState} from 'react';
import {SafeAreaView, Text, TextInput} from 'react-native';
import TouchableScale from 'react-native-touchable-scale';
import {Toast} from 'toastify-react-native'; // Import Toast from toastify-react-native

export const Login = ({isLoading, setLoading, styles}) => {
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const navRedirect = useNavigation();
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);

  const handleFocus = inputName => {
    setIsEmailFocused(inputName === 'email');
    setIsPasswordFocused(inputName === 'password');
  };

  const handleBlur = () => {
    setIsEmailFocused(false);
    setIsPasswordFocused(false);
  };

  const [loginInput, setFormInput] = useState({
    name: 'user',
    password: 'password',
  });

  const handleChangeInput = (text, input) => {
    setFormInput({...loginInput, [input]: text});
  };

  const handleLoginSubmit = async () => {
    setLoading(true);
    const data = {
      name: loginInput.name,
      password: loginInput.password,
    };

    try {
      await axios.get('sanctum/csrf-cookie');
      const response = await axios.post('api/login', data);
      setLoading(false);

      if (response.data && response.data.status === 200) {
        // Saving values to AsyncStorage
        AsyncStorage.setItem('auth_token', response.data.token);
        AsyncStorage.setItem('auth_ips', response.data.ips);
        AsyncStorage.setItem('auth_name', response.data.username);
        AsyncStorage.setItem(
          'auth_package',
          response.data.package ? response.data.package : 0,
        );
        AsyncStorage.setItem('auth_doge', response.data.doge_amount);
        AsyncStorage.setItem('auth_email', response.data.email);
        AsyncStorage.setItem('auth_whatsapp', response.data.no_telp);

        navRedirect.navigate('Navbar');
        Toast.success('You are logged in!'); // Display toast message using Toast.error
      } else if (response.data.status === 101) {
        Toast.info('Your password is wrong!'); // Display toast message using Toast.info
      } else if (response.data.status === 102) {
        Toast.info('Username is not registered!'); // Display toast message using Toast.info
      }
    } catch (error) {
      setLoading(false);
      Toast.info('Network error!'); // Display toast message using Toast.info
    }
  };

  return (
    <SafeAreaView style={{width: '80%', marginTop: 10, flex: 1}}>
      <TextInput
        onFocus={() => handleFocus('email')}
        onBlur={handleBlur}
        placeholderTextColor="grey"
        style={[styles.input, isEmailFocused ? styles.inputFocused : null]}
        onChangeText={text => handleChangeInput(text, 'name')}
        value={loginInput.name}
        name="name"
        placeholder="Your Name"
      />

      <TextInput
        onFocus={() => handleFocus('password')}
        onBlur={handleBlur}
        placeholderTextColor="grey"
        style={[styles.input, isPasswordFocused ? styles.inputFocused : null]}
        onChangeText={text => handleChangeInput(text, 'password')}
        value={loginInput.password}
        name="password"
        placeholder="Your Password"
        secureTextEntry={true}
      />

      <TouchableScale
        tension={50}
        friction={7}
        useNativeDriver
        disabled={isLoading ? true : false}
        onPress={handleLoginSubmit}
        style={styles.button}>
        <Text style={{color: '#fff', fontWeight: 'bold'}}>Login</Text>
      </TouchableScale>
    </SafeAreaView>
  );
};
