import {Alert, Button, StyleSheet, Text, TextInput, View} from 'react-native';
import React, {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation()
  const onSignup = async () => {
    try {
      if (email && password) {
        await AsyncStorage.setItem('email', email);
        await AsyncStorage.setItem('password', password);

        Alert.alert('Message','Registered successfully.')
        setEmail('')
        setPassword('')
        navigation.goBack()
      } else {
        Alert.alert('Message', 'Email and Password is required!');
      }
    } catch (error) {}
  };
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
      <Button title="Signup" onPress={onSignup} />
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({});
