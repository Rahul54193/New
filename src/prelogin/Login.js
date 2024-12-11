import {Alert, Button, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState,useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const onLogin = async () => {
    try {
      if (email && password) {
        const emailRegistered = await AsyncStorage.getItem('email');
        const passwordRegistered = await AsyncStorage.getItem('password');
        if(emailRegistered === email && passwordRegistered ===password){
            Alert.alert('Message','Login successfully')
            navigation.navigate('StudentList')
        }else{
            Alert.alert('Message','Email/Password invalid!')
        }
      } else {
        Alert.alert('Message', 'Email and Password is required!');
      }
    } catch (error) {}
  };
  const onRegister = () => {
    navigation.navigate('Signup');
  };
  const getUser = async () => {
    try {
      const res = await AsyncStorage.getItem('email');
      const re = await AsyncStorage.getItem('password');
      console.log('first',res,re)
    } catch (error) {}
  };
  useEffect(() => {
    getUser()
  }, []);

  return (
    <View style={{flex: 1, justifyContent: 'center'}}>
      <TextInput
        value={email}
        placeholder="Enter email"
        onChangeText={setEmail}
      />
      <View style={{height: 20}} />
      <TextInput
        value={password}
        placeholder="Enter password"
        onChangeText={setPassword}
        secureTextEntry={true}
      />
      <Button title="Login" onPress={onLogin} />
      <View style={{marginTop: 20}}>
        <Button title="Register" onPress={onRegister} />
      </View>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({});
