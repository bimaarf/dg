import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {useEffect, useState} from 'react';
import {SafeAreaView, Text, TextInput} from 'react-native';
import TouchableScale from 'react-native-touchable-scale';
import {Toast} from 'toastify-react-native';

export const Register = ({isLoading, setLoading, styles}) => {
  const [isNameFocused, setIsNameFocused] = useState(false);
  const [isEmailFocused, setIsEmailFocused] = useState(false);
  const [isReferralFocused, setIsReferralFocused] = useState(false);
  const [isPhoneFocused, setIsPhoneFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isPasswordConfFocused, setIsPasswordConfFocused] = useState(false);
  const navRedirect = useNavigation();
  const handleFocus = input => {
    setIsNameFocused(input === 'name');
    setIsEmailFocused(input === 'email');
    setIsReferralFocused(input === 'referral_code');
    setIsPhoneFocused(input === 'no_telp');
    setIsPasswordFocused(input === 'password');
    setIsPasswordConfFocused(input === 'password_confirmation');
  };

  const handleBlur = () => {
    setIsEmailFocused(false);
    setIsPasswordFocused(false);
  };
  const [formInput, setFormInput] = useState({
    name: '',
    email: '',
    referral_code: '',
    no_telp: '0828328328',
    password: 'password',
    password_confirmation: 'password',
  });

  const handleChangeInput = (text, input) => {
    setFormInput(prevInput => ({
      ...prevInput,
      [input]: text,
    }));
  };
  const handleLoginSubmit = async () => {
    setLoading(true);
    if (!formInput.name || !formInput.email || !formInput.password) {
      setLoading(false);
      Toast.warn('Please fill in all required fields.');
      return;
    }
    const data = {
      name: formInput.name,
      email: formInput.email,
      referral_code: formInput.referral_code,
      password: formInput.password,
      no_telp: formInput.no_telp,
      password_confirmation: formInput.password_confirmation,
    };

    console.log(data);
    try {
      await axios.get('sanctum/csrf-cookie');
      const response = await axios.post('api/register', data);

      setLoading(false);

      switch (response.data.status) {
        case 200:
          // Handle successful registration
          Toast.success(`You are logged In`);
          AsyncStorage.setItem('auth_token', response.data.token);
          AsyncStorage.setItem('auth_ips', response.data.ips);
          AsyncStorage.setItem('auth_name', response.data.username);
          AsyncStorage.setItem('auth_package', response.data.package);
          AsyncStorage.setItem('auth_doge', response.data.doge_amount);
          AsyncStorage.setItem('auth_email', response.data.email);
          AsyncStorage.setItem('auth_whatsapp', response.data.no_telp);
          navRedirect.navigate('Navbar');
          break;
        case 101:
          Toast.warn('Username has been registered!');
          break;
        case 102:
          Toast.warn('E-mail has been registered!');
          break;
        case 103:
          Toast.warn('Referral code is wrong!');
          break;
        default:
          Toast.warn('Registration failed. Please try again.');
      }
    } catch (error) {
      setLoading(false);
      Toast.warn('Network error!');
    }
  };

  useEffect(() => {
    // Removing listener when component unmounts
    return () => {};
  }, []);
  return (
    <SafeAreaView style={{width: '80%', marginTop: 10, flex: 1}}>
      <TextInput
        onFocus={() => handleFocus('name')}
        onBlur={handleBlur}
        placeholderTextColor="grey"
        style={[styles.input, isNameFocused ? styles.inputFocused : null]}
        onChangeText={text => handleChangeInput(text, 'name')}
        value={formInput.name}
        name="name"
        placeholder="Your Name"
      />
      <TextInput
        onFocus={() => handleFocus('email')}
        onBlur={handleBlur}
        placeholderTextColor="grey"
        style={[styles.input, isEmailFocused ? styles.inputFocused : null]}
        onChangeText={text => handleChangeInput(text, 'email')}
        value={formInput.email}
        name="email"
        placeholder="example@gmail.com"
        keyboardType="email-address"
      />
      <TextInput
        onFocus={() => handleFocus('referral_code')}
        onBlur={handleBlur}
        placeholderTextColor="grey"
        style={[styles.input, isReferralFocused ? styles.inputFocused : null]}
        onChangeText={text => handleChangeInput(text, 'referral_code')}
        value={formInput.referral_code}
        name="referral_code"
        placeholder="Referral Code"
      />
      <TextInput
        onFocus={() => handleFocus('no_telp')}
        onBlur={handleBlur}
        placeholderTextColor="grey"
        style={[styles.input, isPhoneFocused ? styles.inputFocused : null]}
        onChangeText={text => handleChangeInput(text, 'no_telp')}
        value={formInput.no_telp}
        name="no_telp"
        placeholder="Phone Number"
        keyboardType="phone-pad"
      />
      <TextInput
        onFocus={() => handleFocus('password')}
        onBlur={handleBlur}
        placeholderTextColor="grey"
        style={[styles.input, isPasswordFocused ? styles.inputFocused : null]}
        onChangeText={text => handleChangeInput(text, 'password')}
        value={formInput.password}
        name="password"
        placeholder="Your Password"
        secureTextEntry={true}
      />

      <TextInput
        onFocus={() => handleFocus('password_confirmation')}
        onBlur={handleBlur}
        placeholderTextColor="grey"
        style={[
          styles.input,
          isPasswordConfFocused ? styles.inputFocused : null,
        ]}
        onChangeText={text => handleChangeInput(text, 'password_confirmation')}
        value={formInput.password_confirmation}
        name="password_confirmation"
        placeholder="Confirm Password"
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
