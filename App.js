import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import HomePage from './src/component/HomePage'
import Feed from './src/component/Feed';
import Login from './src/pages/Login';
import SignUp from './src/pages/SignUp';
import Posting from './src/component/Posting';
import Navigation from './src/pages/Navigation';
export default function App() {
  return (
    <View style={styles.container}>
      <HomePage/>
        
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});
