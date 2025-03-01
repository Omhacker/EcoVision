// import React, { useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
// import { auth } from '../firebase';
// import { createUserWithEmailAndPassword } from 'firebase/auth';

// export default function RegisterScreen({ navigation }) {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleRegister = async () => {
//     try {
//       await createUserWithEmailAndPassword(auth, email, password);
//       alert('Account created! Please log in.');
//       navigation.navigate('Login');
//     } catch (error) {
//       alert(error.message);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <Text style={styles.title}>Create Account</Text>
//       <TextInput placeholder="Email" value={email} onChangeText={setEmail} style={styles.input} />
//       <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry style={styles.input} />
//       <TouchableOpacity onPress={handleRegister} style={styles.button}>
//         <Text style={styles.buttonText}>SIGN UP</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fff' },
//   title: { fontSize: 32, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
//   input: { height: 50, borderWidth: 1, padding: 10, marginVertical: 10, borderRadius: 5 },
//   button: { backgroundColor: '#800020', padding: 15, borderRadius: 5, marginVertical: 10 },
//   buttonText: { color: '#fff', fontSize: 18, textAlign: 'center' }
// });

// import React, { useState } from "react";
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
// } from "react-native";
// import { auth, db } from "../firebase"; // Import Firestore
// import { LinearGradient } from "expo-linear-gradient";
// import { createUserWithEmailAndPassword } from "firebase/auth";
// import { collection, doc, setDoc } from "firebase/firestore"; // Firestore Functions

// export default function RegisterScreen({ navigation }) {
//   const [name, setName] = useState("");
//   const [phone, setPhone] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");

//   const handleRegister = async () => {
//     try {
//       // Create user in Firebase Authentication
//       const userCredential = await createUserWithEmailAndPassword(
//         auth,
//         email,
//         password
//       );
//       const user = userCredential.user;

//       // Store additional user info in Firestore
//       await setDoc(doc(db, "users", user.uid), {
//         name: name,
//         phone: phone,
//         email: email,
//         uid: user.uid,
//       });

//       alert("Account created! Please log in.");
//       navigation.navigate("Login");
//     } catch (error) {
//       alert(error.message);
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <LinearGradient colors={["#43A047", "#8BC34A"]} style={styles.gradient}>
//         <Text style={styles.title}>Create Your</Text>
//         <Text style={styles.subtitle}>Account</Text>
//       </LinearGradient>

//       <View style={styles.formContainer}>
//         {/* Name Input */}
//         <TextInput
//           placeholder="Full Name"
//           value={name}
//           onChangeText={setName}
//           style={styles.input}
//         />

//         {/* Phone Number Input */}
//         <TextInput
//           placeholder="Phone Number"
//           value={phone}
//           onChangeText={setPhone}
//           keyboardType="phone-pad"
//           style={styles.input}
//         />

//         {/* Email Input */}
//         <TextInput
//           placeholder="Email"
//           value={email}
//           onChangeText={setEmail}
//           style={styles.input}
//         />

//         {/* Password Input */}
//         <TextInput
//           placeholder="Password"
//           value={password}
//           onChangeText={setPassword}
//           secureTextEntry
//           style={styles.input}
//         />

//         {/* Register Button */}
//         <TouchableOpacity onPress={handleRegister} style={styles.button}>
//           <LinearGradient
//             colors={["#43A047", "#8BC34A"]}
//             style={styles.buttonGradient}
//           >
//             <Text style={styles.buttonText}>SIGN UP</Text>
//           </LinearGradient>
//         </TouchableOpacity>

//         <TouchableOpacity onPress={() => navigation.navigate("Login")}>
//           <Text style={styles.linkText}>
//             Already have an account?{" "}
//             <Text style={styles.linkTextBold}>Sign In</Text>
//           </Text>
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
//   title: { fontSize: 36, fontWeight: "bold", color: "#fff", marginRight: 120 },
//   subtitle: {
//     fontSize: 32,
//     fontWeight: "bold",
//     color: "#fff",
//     marginTop: 5,
//     marginRight: 210,
//     marginBottom: 10,
//   },
//   formContainer: {
//     flex: 1,
//     padding: 20,
//     marginTop: -600,
//     backgroundColor: "#fff",
//     borderTopLeftRadius: 50,
//     paddingTop: 100,
//   },
//   input: {
//     height: 50,
//     backgroundColor: "#FAFAFA",
//     borderRadius: 5,
//     paddingHorizontal: 10,
//     paddingVertical: 5,
//     fontSize: 16,
//     marginVertical: 10,
//   },
//   button: { marginVertical: 35 },
//   buttonGradient: { padding: 15, borderRadius: 30, alignItems: "center" },
//   buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
//   linkText: { color: "#808080", textAlign: "center" },
//   linkTextBold: { fontWeight: "bold", color: "#000" },
// });

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { auth, db } from "../firebase"; // Import Firestore
import { LinearGradient } from "expo-linear-gradient";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, doc, setDoc } from "firebase/firestore"; // Firestore Functions

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");

  // ✅ Password Validation Function
  const validatePassword = (password) => {
    if (password.length < 8) {
      return "Password must be at least 8 characters long.";
    }
    if (!/[A-Z]/.test(password)) {
      return "Password must contain at least one uppercase letter.";
    }
    if (!/[a-z]/.test(password)) {
      return "Password must contain at least one lowercase letter.";
    }
    if (!/[0-9]/.test(password)) {
      return "Password must contain at least one number.";
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
      return "Password must contain at least one special character (!@#$%^&*).";
    }
    return "";
  };

  const handleRegister = async () => {
    const passwordValidation = validatePassword(password);
    if (passwordValidation) {
      setPasswordError(passwordValidation);
      return;
    } else {
      setPasswordError(""); // Clear the error if valid
    }

    try {
      // Create user in Firebase Authentication
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Store additional user info in Firestore
      await setDoc(doc(db, "users", user.uid), {
        name: name,
        phone: phone,
        email: email,
        uid: user.uid,
      });

      alert("Account created! Please log in.");
      navigation.navigate("Login");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={["#43A047", "#8BC34A"]} style={styles.gradient}>
        <Text style={styles.title}>Create Your</Text>
        <Text style={styles.subtitle}>Account</Text>
      </LinearGradient>

      <View style={styles.formContainer}>
        {/* Name Input */}
        <TextInput
          placeholder="Full Name"
          value={name}
          onChangeText={setName}
          style={styles.input}
        />

        {/* Phone Number Input */}
        <TextInput
          placeholder="Phone Number"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
          style={styles.input}
        />

        {/* Email Input */}
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />

        {/* Password Input */}
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={(text) => {
            setPassword(text);
            setPasswordError(validatePassword(text));
          }}
          secureTextEntry
          style={styles.input}
        />

        {/* 🔥 Real-time Password Validation Message */}
        {passwordError ? (
          <Text style={styles.passwordError}>{passwordError}</Text>
        ) : null}

        {/* Register Button */}
        <TouchableOpacity onPress={handleRegister} style={styles.button}>
          <LinearGradient
            colors={["#43A047", "#8BC34A"]}
            style={styles.buttonGradient}
          >
            <Text style={styles.buttonText}>SIGN UP</Text>
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.linkText}>
            Already have an account?{" "}
            <Text style={styles.linkTextBold}>Sign In</Text>
          </Text>
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
  title: { fontSize: 36, fontWeight: "bold", color: "#fff", marginRight: 120 },
  subtitle: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 5,
    marginRight: 210,
    marginBottom: 10,
  },
  formContainer: {
    flex: 1,
    padding: 20,
    marginTop: -600,
    backgroundColor: "#fff",
    borderTopLeftRadius: 50,
    paddingTop: 100,
  },
  input: {
    height: 50,
    backgroundColor: "#FAFAFA",
    borderRadius: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 16,
    marginVertical: 10,
  },
  passwordError: {
    color: "red",
    fontSize: 14,
    marginBottom: 10,
  },
  button: { marginVertical: 35 },
  buttonGradient: { padding: 15, borderRadius: 30, alignItems: "center" },
  buttonText: { color: "#fff", fontSize: 18, fontWeight: "bold" },
  linkText: { color: "#808080", textAlign: "center" },
  linkTextBold: { fontWeight: "bold", color: "#000" },
});
