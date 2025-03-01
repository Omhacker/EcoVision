// import React, { useEffect, useRef } from 'react';
// import { View, Text, TouchableOpacity, Image, Animated, StyleSheet } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';

// export default function HomeScreen({ navigation }) {
//   const logoOpacity = useRef(new Animated.Value(0)).current;
//   const logoScale = useRef(new Animated.Value(0.8)).current;

//   useEffect(() => {
//     Animated.parallel([
//       Animated.timing(logoOpacity, { toValue: 1, duration: 1500, useNativeDriver: true }),
//       Animated.spring(logoScale, { toValue: 1, friction: 5, useNativeDriver: true }),
//     ]).start();
//   }, []);

//   return (
//     <LinearGradient colors={['#ffffff', '#d4edda']} style={styles.container}>
//       <Animated.Image
//         source={require('./../assets/logo_f.png')} // Ensure the correct path
//         style={[styles.logo, { opacity: logoOpacity, transform: [{ scale: logoScale }] }]}
//         resizeMode="contain"
//       />
      
//       <Text style={styles.tagline}>Find eco-friendly solutions nearby.🌱</Text>

//       <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
//         <View style={styles.gradientButton}>
//           <Text style={styles.buttonText}>SIGN IN</Text>
//         </View>
//       </TouchableOpacity>

//       <TouchableOpacity style={[styles.button, styles.signUpButton]} onPress={() => navigation.navigate('Register')}>
//         <Text style={styles.signUpText}>SIGN UP</Text>
//       </TouchableOpacity>
//     </LinearGradient>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
//   logo: { width: 280, height: 200, marginBottom: 20,marginLeft:25 },
//   tagline: { fontSize: 18, color:'#43A047', textAlign: 'center', fontStyle: 'italic', marginBottom: 40 },
//   button: { width: '80%', borderRadius: 30, overflow: 'hidden', marginVertical: 10 },
//   gradientButton: { padding: 15, borderRadius: 30, alignItems: 'center', backgroundColor:"#8b9f01" },
//   buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
//   signUpButton: { borderWidth: 2, borderColor: '#8b9f01', padding: 15, alignItems: 'center' },
//   signUpText: { color: '#8b9f01', fontSize: 18, fontWeight: 'bold' },
// });

import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, Animated, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function HomeScreen({ navigation }) {
  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(logoOpacity, { toValue: 1, duration: 1500, useNativeDriver: true }),
      Animated.spring(logoScale, { toValue: 1, friction: 5, useNativeDriver: true }),
    ]).start();
  }, []);

  return (
    <LinearGradient colors={['#ffffff', '#d4edda']} style={styles.container}>
      <Animated.Image
        source={require('./../assets/logo_f.png')} // Ensure the correct path
        style={[styles.logo, { opacity: logoOpacity, transform: [{ scale: logoScale }] }]}
        resizeMode="contain"
      />
      
      <Text style={styles.tagline}>Find eco-friendly solutions nearby.🌱</Text>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
        <View style={styles.gradientButton}>
          <Text style={styles.buttonText}>SIGN IN</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.signUpButton]} onPress={() => navigation.navigate('Register')}>
        <Text style={styles.signUpText}>SIGN UP</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  logo: { width: 280, height: 200, marginBottom: 20,marginLeft:25 },
  tagline: { fontSize: 18, color:'#43A047', textAlign: 'center', fontStyle: 'italic', marginBottom: 40 },
  button: { width: '80%', borderRadius: 30, overflow: 'hidden', marginVertical: 10 },
  gradientButton: { padding: 15, borderRadius: 30, alignItems: 'center', backgroundColor:"#8b9f01" },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  signUpButton: { borderWidth: 2, borderColor: '#8b9f01', padding: 15, alignItems: 'center' },
  signUpText: { color: '#8b9f01', fontSize: 18, fontWeight: 'bold' },
});
