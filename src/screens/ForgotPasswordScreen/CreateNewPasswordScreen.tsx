import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../types/NavigationType';

const CreateNewPasswordScreen = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true);
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handleContinue = () => {
  if (password && confirmPassword && password === confirmPassword) {
    navigation.navigate('Congratulations'); // chuyển sang màn hình Congratulations
  } else {
    alert('Please ensure passwords match.');
  }
};


  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F7FB" />

      <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
        <Feather name="arrow-left" size={24} color="#212121" />
        <Text style={styles.headerText}>Create New Password</Text>
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.title}>Create Your New Password</Text>

        <View style={styles.inputContainer}>
          <Feather name="lock" size={20} color="#666" />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={hidePassword}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setHidePassword(!hidePassword)}>
            <Feather name={hidePassword ? 'eye-off' : 'eye'} size={20} color="#666" />
          </TouchableOpacity>
        </View>

        <View style={styles.inputContainer}>
          <Feather name="lock" size={20} color="#666" />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry={hideConfirmPassword}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <TouchableOpacity onPress={() => setHideConfirmPassword(!hideConfirmPassword)}>
            <Feather name={hideConfirmPassword ? 'eye-off' : 'eye'} size={20} color="#666" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleContinue}>
          <Text style={styles.buttonText}>Continue</Text>
          <Feather name="arrow-right-circle" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F7FB',
    paddingHorizontal: 20,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  headerText: {
    fontFamily: 'OPTIFrankfurter-Medium',
    fontSize: 22,
    marginLeft: 10,
    color: '#212121',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'OPTIFrankfurter-Medium',
    fontSize: 20,
    color: '#212121',
    marginBottom: 30,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 20,
    elevation: 3,
  },
  input: {
    flex: 1,
    marginLeft: 10,
    fontFamily: 'OPTIFrankfurter-Medium',
    color: '#212121',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2563EB',
    paddingVertical: 15,
    borderRadius: 30,
    marginTop: 20,
  },
  buttonText: {
    fontFamily: 'OPTIFrankfurter-Medium',
    fontSize: 16,
    color: '#FFFFFF',
    marginRight: 10,
  },
});

export default CreateNewPasswordScreen;
