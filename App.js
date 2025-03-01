// // // import React from 'react';
// // // import { NavigationContainer } from '@react-navigation/native';
// // // import { createNativeStackNavigator } from '@react-navigation/native-stack';
// // // import LoginScreen from './screens/LoginScreen';
// // // import RegisterScreen from './screens/RegisterScreen';
// // // import WelcomeScreen from './screens/WelcomeScreen';

// // // const Stack = createNativeStackNavigator();

// // // export default function App() {
// // //   return (
// // //     <NavigationContainer>
// // //       <Stack.Navigator initialRouteName="Login">
// // //         <Stack.Screen name="Login" component={LoginScreen} />
// // //         <Stack.Screen name="Register" component={RegisterScreen} />
// // //         <Stack.Screen name="Welcome" component={WelcomeScreen} />
// // //       </Stack.Navigator>
// // //     </NavigationContainer>
// // //   );
// // // }

// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import HomeScreen from './screens/HomeScreen';
// import LoginScreen from './screens/LoginScreen';
// import RegisterScreen from './screens/RegisterScreen';
// import WelcomeScreen from './screens/WelcomeScreen';

// const Stack = createNativeStackNavigator();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Home">
//         <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
//         <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/>
//         <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }}/>
//         <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }}/>
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import DriverPanel from './screens/DriverPanel'

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      {/* <Stack.Navigator initialRouteName="Home"> */}
        {/* <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }}/>
        <Stack.Screen name="Welcome" component={WelcomeScreen} options={{ headerShown: false }}/> */}
        {/* </Stack.Navigator> */}

<Stack.Navigator initialRouteName="Home">
<Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
  <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
  <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
  <Stack.Screen name="AdminPanel" component={WelcomeScreen} options={{ headerShown: false }} />
  <Stack.Screen name="DriverPanel" component={DriverPanel} options={{ headerShown: false }} />
</Stack.Navigator>

      
    </NavigationContainer>
  );
}
