import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import MainRouter from './src/navigation/MainRoute';

export default function App() {
  return (
    <View style={styles.container}>
      <MainRouter />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
