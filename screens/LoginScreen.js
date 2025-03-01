// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
// import { auth } from '../firebase';
// import { signInWithEmailAndPassword } from 'firebase/auth';

// export default function LoginScreen({ navigation }) {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleLogin = async () => {
//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//       const username = email.split('@')[0];
//       navigation.navigate('Welcome', { username });
//     } catch (error) {
//       alert(error.message);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Sign In</Text>
//       <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} />
//       <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry style={styles.input} />
//       <TouchableOpacity onPress={handleLogin} style={styles.button}>
//         <Text style={styles.buttonText}>SIGN IN</Text>
//       </TouchableOpacity>
//       <TouchableOpacity onPress={() => navigation.navigate('Register')}>
//         <Text style={styles.linkText}>Don't have an account? Sign Up</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fff' },
//   title: { fontSize: 32, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
//   input: { height: 50, borderWidth: 1, padding: 10, marginVertical: 10, borderRadius: 5 },
//   button: { backgroundColor: '#800020', padding: 15, borderRadius: 5, marginVertical: 10 },
//   buttonText: { color: '#fff', fontSize: 18, textAlign: 'center' },
//   linkText: { color: '#800020', textAlign: 'center', marginTop: 10 }
// });

// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Dimensions,
// } from "react-native";
// import { LinearGradient } from "expo-linear-gradient";
// import { auth, db } from "../firebase";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { doc, getDoc } from "firebase/firestore"; // Correct import

// const { width } = Dimensions.get("screen");

// export default function LoginScreen({ navigation }) {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLogin = async () => {
//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//       const username = email.split("@")[0];
//       navigation.navigate("Welcome", { username });
//     } catch (error) {
//       alert(error.message);
//     }

//     // try {
//     //   const userCredential = await signInWithEmailAndPassword(auth, email, password);
//     //   const user = userCredential.user;

//     //   // Fetch additional user details from Firestore
//     //   const userDoc = await getDoc(doc(db, "users", user.uid));
//     //   const userData = userDoc.exists() ? userDoc.data() : { name: "Guest" };

//     //   // Navigate with username
//     //   navigation.replace("Welcome", { username: userData.name });
//     // } catch (error) {
//     //   alert(error.message);
//     // }
//   };

//   return (
//     <View style={styles.container}>
//       {/* Eco-friendly green gradient */}
//       <LinearGradient colors={["#43A047", "#8BC34A"]} style={styles.gradient}>
//         <Text style={styles.title}>Hello</Text>
//         <Text style={styles.subtitle}>Sign in!</Text>
//       </LinearGradient>

//       <View style={styles.formContainer}>
//         {/* Green gradient border for Email Input */}
//         <LinearGradient
//           colors={["#66BB6A", "#A5D6A7"]}
//           style={styles.inputBorder}
//         >
//           <TextInput
//             placeholder="Email"
//             value={email}
//             onChangeText={setEmail}
//             style={styles.input}
//             placeholderTextColor="#555"
//           />
//         </LinearGradient>

//         {/* Green gradient border for Password Input */}
//         <LinearGradient
//           colors={["#66BB6A", "#A5D6A7"]}
//           style={styles.inputBorder}
//         >
//           <TextInput
//             placeholder="Password"
//             value={password}
//             onChangeText={setPassword}
//             secureTextEntry
//             style={styles.input}
//             placeholderTextColor="#555"
//           />
//         </LinearGradient>

//         {/* Green Gradient Button */}
//         <TouchableOpacity onPress={handleLogin} style={styles.button}>
//           <LinearGradient
//             colors={["#43A047", "#8BC34A"]}
//             style={styles.buttonGradient}
//           >
//             <Text style={styles.buttonText}>SIGN IN</Text>
//           </LinearGradient>
//         </TouchableOpacity>

//         <Text style={styles.linkText}>Don't have an account?</Text>
//         <TouchableOpacity onPress={() => navigation.navigate("Register")}>
//           <Text style={styles.linkText1}>Sign Up</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, backgroundColor: "#fff" },

//   gradient: {
//     width: "100%",
//     height: "100%",
//     borderBottomLeftRadius: 50,
//     borderBottomRightRadius: 50,
//     paddingTop: 60,
//     paddingLeft: 20,
//   },

//   title: { fontSize: 36, fontWeight: "bold", color: "#fff", marginRight: 250 },
//   subtitle: {
//     fontSize: 32,
//     fontWeight: "bold",
//     color: "#fff",
//     marginTop: 5,
//     marginRight: 230,
//     marginBottom: 10,
//   },

//   formContainer: {
//     flex: 1,
//     padding: 20,
//     marginTop: -600,
//     backgroundColor: "#fff",
//     borderTopRightRadius: 50,
//     paddingTop: 100,
//   },

//   inputBorder: {
//     width: "100%",
//     borderRadius: 5,
//     padding: 2, // Thickness of the gradient border
//     marginVertical: 15,
//   },

//   input: {
//     height: 50,
//     backgroundColor: "#FAFAFA",
//     borderRadius: 5,
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//     fontSize: 16,
//   },

//   button: { marginVertical: 35 },
//   buttonGradient: { padding: 15, borderRadius: 30, alignItems: "center" },
//   buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
//   linkText: {
//     color: "#808080",
//     textAlign: "center",
//     marginTop: 120,
//     marginLeft: 170,
//   },
//   linkText1: {
//     color: "fff",
//     fontSize: 14,
//     fontWeight: "bold",
//     textAlign: "center",
//     marginTop: 5,
//     marginLeft: 260,
//   },
// });

import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { auth, db } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Fetch user role from Firestore
      const userDoc = await getDoc(doc(db, "users", user.uid));
      if (userDoc.exists()) {
        const userData = userDoc.data();
        if (userData.role === "Admin") {
          navigation.replace("AdminPanel"); // Navigate to Admin Panel
        } else {
          navigation.replace("DriverPanel"); // Navigate to Driver Panel
        }
      } else {
        alert("User data not found.");
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={["#43A047", "#8BC34A"]} style={styles.gradient}>
        <Text style={styles.title}>Hello</Text>
        <Text style={styles.subtitle}>Sign in!</Text>
      </LinearGradient>

      <View style={styles.formContainer}>
        <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} />
        <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry style={styles.input} />

        <TouchableOpacity onPress={handleLogin} style={styles.button}>
          <LinearGradient colors={["#43A047", "#8BC34A"]} style={styles.buttonGradient}>
            <Text style={styles.buttonText}>SIGN IN</Text>
          </LinearGradient>
        </TouchableOpacity>

        <Text style={styles.linkText}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={styles.linkText1}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },

  gradient: {
    width: "100%",
    height: "100%",
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 50,
    paddingTop: 60,
    paddingLeft: 20,
  },

  title: { fontSize: 36, fontWeight: "bold", color: "#fff", marginRight: 250 },
  subtitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 5,
    marginRight: 230,
    marginBottom: 10,
  },

  formContainer: {
    flex: 1,
    padding: 20,
    marginTop: -600,
    backgroundColor: "#fff",
    borderTopRightRadius: 50,
    paddingTop: 100,
  },

  inputBorder: {
    width: "100%",
    borderRadius: 5,
    padding: 2, // Thickness of the gradient border
    marginVertical: 15,
  },

  input: {
    height: 50,
    backgroundColor: "#FAFAFA",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 16,
    marginBottom:20
  },

  button: { marginVertical: 25 },
  buttonGradient: { padding: 15, borderRadius: 30, alignItems: "center" },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  linkText: {
    color: "#808080",
    textAlign: "center",
    marginTop: 120,
    marginLeft: 170,
  },
  linkText1: {
    color: "fff",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 5,
    marginLeft: 260,
  },
});