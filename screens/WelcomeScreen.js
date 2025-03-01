// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   FlatList,
//   StyleSheet,
//   TouchableOpacity,
//   StatusBar,
// } from "react-native";
// import { Ionicons } from "@expo/vector-icons";
// import { db } from "../firebase";
// import { collection, getDocs } from "firebase/firestore";
// import { ProgressBar } from "react-native-paper";

// export default function WelcomeMainScreen({ route }) {
//   const username = route.params?.username || "Guest";
//   const [bins, setBins] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchBins = async () => {
//       try {
//         const querySnapshot = await getDocs(collection(db, "bins"));
//         const binData = querySnapshot.docs.map((doc) => ({
//           id: doc.id,
//           ...doc.data(),
//         }));
//         setBins(binData);
//       } catch (error) {
//         console.error("Error fetching bins:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchBins();
//   }, []);

//   const getFillColor = (level) =>
//     level <= 50 ? "#4CAF50" : level <= 80 ? "#FFC107" : "#F44336";

//   return (
//     <View style={styles.container}>
//       <StatusBar backgroundColor="black" barStyle="light-content" />

//       {/* Header Section */}
//       <View style={styles.header}>
//         <Text style={styles.title}>EcoVision</Text>
//       </View>

//       {/* Welcome Message */}
//       <Text style={styles.welcomeText}>
//         Welcome, <Text style={styles.username}>{username}!</Text>
//       </Text>

//       {/* Bin Fill Levels Section */}
//       <Text style={styles.head}>Bin Fill Levels</Text>

//       {loading ? (
//         <Text style={styles.loadingText}>Loading bins...</Text>
//       ) : bins.length === 0 ? (
//         <Text style={styles.emptyText}>No bins found.</Text>
//       ) : (
//         <FlatList
//           data={bins}
//           keyExtractor={(item) => item.id}
//           numColumns={2}
//           contentContainerStyle={styles.gridContainer}
//           renderItem={({ item }) => (
//             <View style={styles.binCard}>
//               <View style={styles.cardHeader}>
//                 <Text style={styles.binId}>{item.id}</Text>
//                 <Ionicons
//                   name="trash-bin"
//                   size={24}
//                   color={getFillColor(item.level)}
//                 />
//               </View>
//               <ProgressBar
//                 progress={item.level / 100}
//                 color={getFillColor(item.level)}
//                 style={styles.progressBar}
//               />
//               <Text style={styles.fillLevel}>{item.level}% Full</Text>
//             </View>
//           )}
//         />
//       )}
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#A1EEBD",
//   },
//   header: {
//     width: "100%",
//     backgroundColor: "#C2FFC7",
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//     marginBottom: 20,
//     padding:10
//   },
//   title: {
//     fontSize: 32,
//     fontWeight: "600",
//     fontFamily: "serif",
//   },
//   icon: {
//     padding: 5,
//   },
//   welcomeText: {
//     fontSize: 22,
//     fontWeight: "bold",
//     textAlign: "center",
//     backgroundColor: "#FFFFFF",
//     padding: 10,
//     borderRadius: 10,
//     marginBottom: 20,
//     elevation: 3,
//   },
//   username: {
//     color: "#7199f4",
//   },
//   head: {
//     fontSize: 22,
//     fontWeight: "bold",
//     textAlign: "center",
//     marginBottom: 10,
//   },
//   loadingText: {
//     textAlign: "center",
//     fontSize: 16,
//     marginTop: 20,
//   },
//   emptyText: {
//     textAlign: "center",
//     fontSize: 16,
//     marginTop: 20,
//     color: "#666",
//   },
//   gridContainer: {
//     justifyContent: "center",
//     alignItems: "center",
//   },
//   binCard: {
//     width:'45%',
//     backgroundColor: "#fff",
//     padding: 8,
//     margin: 10,
//     borderRadius: 10,
//     elevation: 3,
//   },
//   cardHeader: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     alignItems: "center",
//   },
//   binId: { fontSize: 18, fontWeight: "bold" },
//   progressBar: { height: 8, borderRadius: 5, marginVertical: 10 },
//   fillLevel: { fontSize: 16, textAlign: "center" },
// });


import React, { useState, useEffect, useLayoutEffect,useRef } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Modal,
  Image,
  Animated
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { ProgressBar } from "react-native-paper";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import DataNotification from "./DataNotification";
import ProfileScreen from "./ProfileScreen";
import MapScreen from "./MapScreen";

const Tab = createBottomTabNavigator();

function WelcomeMainScreen({ route }) {
  const navigation = useNavigation();
  const username = route.params?.username || "Guest";
  const [bins, setBins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [urgentBins, setUrgentBins] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const logoOpacity = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.8)).current

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  useEffect(() => {
    const fetchBins = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "bins"));
        const binData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setBins(binData);

        // Filter bins where level >= 90
        const highFillBins = binData.filter((bin) => bin.level >= 90);
        setUrgentBins(highFillBins);
      } catch (error) {
        console.error("Error fetching bins:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBins();
  }, []);

  const handleBinPress = (bin) => {
    navigation.navigate("Map", { selectedBin: bin });
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="black" barStyle="light-content" />
      <View style={styles.header}>
        <Text style={styles.title}>EcoVision</Text>

        {/* <Image
        source={require('./../assets/logo_f.png')} // Ensure the correct path
        style={[styles.logo]}
        resizeMode="contain"
      /> */}

        {/* Notification Icon */}
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Ionicons name="notifications-outline" size={28} color="black" style={styles.icon} />
          {urgentBins.length > 0 && (
            <View style={styles.notificationBadge}>
              <Text style={styles.badgeText}>{urgentBins.length}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Notification Modal */}
      <Modal visible={modalVisible} transparent={true} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Urgent Bins</Text>

            {urgentBins.length > 0 ? (
              urgentBins.map((bin) => (
                <TouchableOpacity
                  key={bin.id}
                  style={styles.notificationItem}
                  onPress={() => {
                    setModalVisible(false);
                    navigation.navigate("Map", {
                      selectedBin: {
                        latitude: bin.location.lat,
                        longitude: bin.location.lng,
                      },
                    });
                  }}
                >
                  <Text style={styles.notificationText}>
                    🗑️ {bin.id} is {bin.level}% full!
                  </Text>
                  <Text style={styles.locationText}>
                    📍 Location: {bin.location.lat}, {bin.location.lng}
                  </Text>
                </TouchableOpacity>
              ))
            ) : (
              <Text style={styles.emptyText}>No urgent bins.</Text>
            )}

            <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeButton}>
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Text style={styles.welcomeText}>
        Welcome, <Text style={styles.username}>{username}!</Text>
      </Text>

            <Text style={styles.head}>Bin Fill Levels</Text>

      {loading ? (
        <Text style={styles.loadingText}>Loading bins...</Text>
      ) : bins.length === 0 ? (
        <Text style={styles.emptyText}>No bins found.</Text>
      ) : (
        <FlatList
          data={bins}
          keyExtractor={(item) => item.id}
          numColumns={2}
          contentContainerStyle={styles.gridContainer}
          nestedScrollEnabled={true}
          renderItem={({ item }) => (
            <TouchableOpacity onPress={() => handleBinPress(item)}>
              <View style={styles.binCard}>
                <View style={styles.cardHeader}>
                  <Text style={styles.binId}>{item.id}</Text>
                  <Ionicons
                    name="trash-bin"
                    size={24}
                    color={
                      item.level >= 90
                        ? "red"
                        : item.level >= 50
                        ? "orange"
                        : "green"
                    }
                  />
                </View>
                <ProgressBar
                  progress={item.level / 100}
                  color={
                    item.level >= 90
                      ? "red"
                      : item.level >= 50
                      ? "orange"
                      : "green"
                  }
                  style={styles.progressBar}
                />
                <Text style={styles.fillLevel}>{item.level}% Full</Text>
                <View style={styles.location}>
                  <Ionicons name="location-outline" size={18} color="#333" />
                  <Text style={styles.locationText}>
                    {item.location
                      ? `${item.location.lat}, ${item.location.lng}`
                      : "Fetching location..."}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

export default function WelcomeScreen({ route }) {
  const username = route.params?.username || "Guest";


  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;
          if (route.name === "Home") iconName = "home";
          else if (route.name === "Data") iconName = "stats-chart-outline";
          else if (route.name === "Map") iconName = "map";
          else if (route.name === "Profile") iconName = "person";
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#43A047",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Home">
        {() => <WelcomeMainScreen route={route} />} 
      </Tab.Screen>
      <Tab.Screen name="Data" component={DataNotification} />
      <Tab.Screen name="Map" component={MapScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#A1EEBD",
  },
  header: {
    width: "100%",
    backgroundColor: "#C2FFC7",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    padding:10
  },
  title: {
    fontSize: 32,
    fontWeight: "600",
    fontFamily: "serif",
  },
  icon: {
    padding: 5,
  },
  welcomeText: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#FFFFFF",
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
    elevation: 3,
  },
  username: {
    color: "#7199f4",
  },
  head: {
    fontSize: 22,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  loadingText: {
    textAlign: "center",
    fontSize: 16,
    marginTop: 20,
  },
  emptyText: {
    textAlign: "center",
    fontSize: 16,
    marginTop: 20,
    color: "#666",
  },
  gridContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  binCard: {
    backgroundColor: "#fff",
    padding: 8,
    margin: 10,
    borderRadius: 10,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  binId: { fontSize: 18, fontWeight: "bold" },
  progressBar: { height: 8, borderRadius: 5, marginVertical: 10 },
  fillLevel: { fontSize: 16, textAlign: "center" },
  location: { flexDirection: "row", alignItems: "center", marginTop: 5 },
  locationText: { marginLeft: 5, fontSize: 14, color: "#333" },
  notificationBadge: {
    position: "absolute",
    right: -5,
    top: -5,
    backgroundColor: "red",
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  badgeText: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  notificationItem: {
    backgroundColor: "#FFD700",
    padding: 10,
    borderRadius: 8,
    marginBottom: 5,
    width: "100%",
  },
  notificationText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  locationText: {
    fontSize: 14,
    color: "gray",
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#FF6347",
    borderRadius: 5,
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  logo: { width: 180, height: 50 },
});