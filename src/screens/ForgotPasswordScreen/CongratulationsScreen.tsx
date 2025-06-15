import React, { useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ActivityIndicator, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const CongratulationsScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
  const timer = setTimeout(() => {
    navigation.navigate('Launching'); 
  }, 3000);

  return () => clearTimeout(timer);
}, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.card}>
        <Image 
          source={{ uri: 'https://img.icons8.com/clouds/100/000000/lock-2.png' }}
          style={styles.image}
        />
        <Text style={styles.title}>Congratulations</Text>
        <Text style={styles.subtitle}>
          Your Account is Ready to Use. You will be redirected to the Home Page in a Few Seconds.
        </Text>
        <ActivityIndicator size="large" color="#555" style={{ marginTop: 20 }} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#555570',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    width: '85%',
    backgroundColor: '#F5F7FB',
    borderRadius: 20,
    paddingVertical: 40,
    paddingHorizontal: 20,
    alignItems: 'center',
    elevation: 5,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontFamily: 'OPTIFrankfurter-Medium',
    fontSize: 22,
    color: '#212121',
    marginBottom: 10,
  },
  subtitle: {
    fontFamily: 'OPTIFrankfurter-Medium',
    fontSize: 15,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 10,
  },
});

export default CongratulationsScreen;
