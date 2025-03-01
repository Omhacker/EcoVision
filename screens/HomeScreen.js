import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function HomeScreen({ navigation }) {
  return (
    <LinearGradient colors={[ '#4b0082', '#00d4ff']} style={styles.container}>
      <Text style={styles.logo}>EcoVision</Text>
      <Text style={styles.welcomeText}>Welcome Back</Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.buttonText}>SIGN IN</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.signUpButton]} onPress={() => navigation.navigate('Register')}>
        <Text style={styles.signUpText}>SIGN UP</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  logo: { fontSize: 45, fontWeight: '900', color: '#fff', marginBottom: 100, fontFamily: 'serif', letterSpacing: 2 },
  welcomeText: { fontSize: 28, color: '#ddd', marginBottom: 20, fontFamily: 'sans-light', fontStyle: 'italic' },
  button: { width: '80%', padding: 15, backgroundColor: '#fff', borderRadius: 30, marginVertical: 12, elevation: 5 },
  buttonText: { color: '#4b0082', fontSize: 18, textAlign: 'center', fontWeight: 'bold', fontFamily: 'sans-serif-medium' },
  signUpButton: { backgroundColor: 'transparent', borderWidth: 2, borderColor: '#fff' },
  signUpText: { color: '#fff', fontSize: 18, textAlign: 'center', fontWeight: 'bold', fontFamily: 'sans-serif-medium' },
});

