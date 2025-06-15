import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { MaterialIcons, Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const ForgotPasswordScreen = () => {
  const [selected, setSelected] = useState(null);
  const navigation = useNavigation();

  const handleContinue = () => {
    if (selected) {
      navigation.navigate('VerificationCode');
    } else {
      alert('Please select a method to continue.');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F7FB" />
      <TouchableOpacity style={styles.backButton}>
        <Feather name="arrow-left" size={24} color="#212121" />
        <Text style={styles.title}>Forgot Password</Text>
      </TouchableOpacity>

      <View style={styles.content}>
        <Text style={styles.instruction}>
          Select which contact details should we use to Reset Your Password
        </Text>

        <TouchableOpacity
          style={[styles.option, selected === 'email' && styles.optionSelected]}
          onPress={() => setSelected('email')}
        >
          <MaterialIcons name="email" size={24} color="#0C9488" />
          <View style={styles.optionTextContainer}>
            <Text style={styles.optionLabel}>Via Email</Text>
            <Text style={styles.optionDetail}>priscilla.frank26@gmail.com</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.option, selected === 'sms' && styles.optionSelected]}
          onPress={() => setSelected('sms')}
        >
          <MaterialIcons name="sms" size={24} color="#0C9488" />
          <View style={styles.optionTextContainer}>
            <Text style={styles.optionLabel}>Via SMS</Text>
            <Text style={styles.optionDetail}>(+91) 958-894-5529</Text>
          </View>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleContinue}>
        <Text style={styles.buttonText}>Continue</Text>
        <Feather name="arrow-right-circle" size={24} color="#FFFFFF" />
      </TouchableOpacity>
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
    marginTop: 20,
    marginBottom: 40,
  },
  title: {
    fontFamily: 'OPTIFrankfurter-Medium',
    fontSize: 22,
    marginLeft: 10,
    color: '#212121',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  instruction: {
    fontFamily: 'OPTIFrankfurter-Medium',
    fontSize: 15,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 30,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 15,
    marginBottom: 20,
    elevation: 3,
  },
  optionSelected: {
    borderWidth: 2,
    borderColor: '#0C9488',
  },
  optionTextContainer: {
    marginLeft: 15,
  },
  optionLabel: {
    fontFamily: 'OPTIFrankfurter-Medium',
    fontSize: 16,
    color: '#212121',
  },
  optionDetail: {
    fontFamily: 'OPTIFrankfurter-Medium',
    fontSize: 14,
    color: '#666666',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2563EB',
    paddingVertical: 15,
    borderRadius: 30,
    marginBottom: 30,
  },
  buttonText: {
    fontFamily: 'OPTIFrankfurter-Medium',
    fontSize: 16,
    color: '#FFFFFF',
    marginRight: 10,
  },
});

export default ForgotPasswordScreen;
