// import React, { useEffect, useState, useRef,useLayoutEffect} from "react";
// import { View, StyleSheet, ActivityIndicator, Image } from "react-native";
// import MapView, { Marker } from "react-native-maps";
// import { useNavigation, useRoute } from "@react-navigation/native";
// import { collection, onSnapshot } from "firebase/firestore";
// import { db } from "../firebase";
// import dustbinIcon from "../assets/dustbin.png";
// import truckIcon from "../assets/truck.png";

// const MapScreen = () => {
//   const navigation = useNavigation();
//   const route = useRoute();
//   const mapRef = useRef(null);
//   const [binLocations, setBinLocations] = useState([]);
//   const [truckLocation, setTruckLocation] = useState(null);
//   const [selectedBin, setSelectedBin] = useState(null);
//   const [loading, setLoading] = useState(true);

//   useLayoutEffect(() => {
//     navigation.setOptions({ headerShown: false });
//   }, [navigation]);

//   // **Handle bin click from HomeScreen and zoom to bin**
//   useEffect(() => {
//     if (route.params?.selectedBin) {
//       setSelectedBin(route.params.selectedBin);
//       zoomToBin(route.params.selectedBin);
//     }
//   }, [route.params?.selectedBin]);

//   useEffect(() => {
//     if (route.params?.selectedBin) {
//       const { latitude, longitude } = route.params.selectedBin;
//       setSelectedBin({ latitude, longitude });
//       zoomToBin(latitude, longitude);
//     }
//   }, [route.params?.selectedBin]);

//   useEffect(() => {
//     const unsubscribeBins = onSnapshot(collection(db, "bins"), (snapshot) => {
//       const bins = snapshot.docs.map((doc) => ({
//         id: doc.id,
//         latitude: doc.data().location?.lat || 0,
//         longitude: doc.data().location?.lng || 0,
//         level: parseInt(doc.data().level) || 0, // Ensure level is a number
//       }));
//       setBinLocations(bins);
//     });

//     const unsubscribeTruck = onSnapshot(collection(db, "trucks"), (snapshot) => {
//       if (!snapshot.empty) {
//         const truckData = snapshot.docs[0].data();
//         setTruckLocation({
//           latitude: truckData.location.lat,
//           longitude: truckData.location.lng,
//         });
//       }
//       setLoading(false);
//     });

//     return () => {
//       unsubscribeBins();
//       unsubscribeTruck();
//     };
//   }, []);

//   const zoomToBin = (bin) => {
//     if (!bin || !bin.location) {
//       console.warn("Invalid bin data:", bin);
//       return;
//     }
  
//     if (mapRef.current) {
//       mapRef.current.animateToRegion({
//         latitude: bin.location.lat,
//         longitude: bin.location.lng,
//         latitudeDelta: 0.01,
//         longitudeDelta: 0.01,
//       });
//     }
//   };
  

//   // **Get bin color based on fill level**
//   const getBinColor = (level) => {
//     if (level >= 90) return "red"; // 🔴 Full bins
//     if (level >= 50) return "yellow"; // 🟡 Medium bins
//     return "green"; // 🟢 Low bins
//   };

//   if (loading) {
//     return <ActivityIndicator size="large" color="#008000" />;
//   }

//   return (
//     <View style={styles.container}>
//       <MapView ref={mapRef} style={styles.map}>
//         {/* 🗑️ **Bin Locations with color coding** */}
//         {binLocations.map((bin) => (
//           <Marker key={bin.id} coordinate={{ latitude: bin.latitude, longitude: bin.longitude }}>
//             <Image source={dustbinIcon} style={[styles.markerIcon, { tintColor: getBinColor(bin.level) }]} />
//           </Marker>
//         ))}

//         {/* 🔵 Highlight selected bin */}
//         {selectedBin && selectedBin.latitude !== undefined && selectedBin.longitude !== undefined && (
//   <Marker coordinate={{ latitude: selectedBin.latitude, longitude: selectedBin.longitude }}>
//     <Image source={dustbinIcon} />
//   </Marker>
// )}

        // {/* 🚛 Truck Location */}
        // {truckLocation && (
        //   <Marker coordinate={truckLocation}>
        //     <Image
        //       source={truckIcon}
        //       style={styles.truckIcon}
        //       resizeMode="contain"
        //     />
        //   </Marker>
        // )}
//       </MapView>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1 },
//   map: { width: "100%", height: "100%" },
//   markerIcon: { width: 40, height: 40 },
//   truckIcon: { width: 30, height: 50 },
// });

// export default MapScreen;

import React, { useEffect, useState, useRef,useLayoutEffect} from "react";
import { View, StyleSheet, ActivityIndicator, Image } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useNavigation, useRoute } from "@react-navigation/native";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import dustbinIcon from "../assets/dustbin.png";
import truckIcon from "../assets/truck.png";


const MapScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const mapRef = useRef(null);
  const [binLocations, setBinLocations] = useState([]);
  const [truckLocation, setTruckLocation] = useState(null);
  const [selectedBin, setSelectedBin] = useState(null);
  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  useEffect(() => {
    if (route.params?.selectedBin) {
      const bin = route.params.selectedBin;
  
      // ✅ Handle both HomeScreen (bin.location.lat/lng) & Notification (bin.latitude/longitude)
      const binData = {
        latitude: bin.location?.lat || bin.latitude,
        longitude: bin.location?.lng || bin.longitude,
      };
  
      setSelectedBin(binData);
      zoomToBin(binData.latitude, binData.longitude);
    }
  }, [route.params?.selectedBin]);
  
  useEffect(() => {
    const unsubscribeBins = onSnapshot(collection(db, "bins"), (snapshot) => {
      const bins = snapshot.docs.map((doc) => ({
        id: doc.id,
        latitude: doc.data().location?.lat || 0,
        longitude: doc.data().location?.lng || 0,
        level: parseInt(doc.data().level) || 0,
      }));
      setBinLocations(bins);
    });

    const unsubscribeTruck = onSnapshot(collection(db, "trucks"), (snapshot) => {
      if (!snapshot.empty) {
        const truckData = snapshot.docs[0].data();
        setTruckLocation({
          latitude: truckData.location.lat,
          longitude: truckData.location.lng,
        });
      }
      setLoading(false);
    });

    return () => {
      unsubscribeBins();
      unsubscribeTruck();
    };
  }, []);

  const zoomToBin = (lat, lng) => {
    if (mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: lat,
        longitude: lng,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005,
      }, 1000);
    }
  };

  const planOptimizedRoute = async (truckLat, truckLng) => {
    if (binLocations.length === 0) return;

    // **Step 1: Filter bins that are 90% or more full**
    const highPriorityBins = binLocations
      .filter((bin) => bin.level >= 90)
      .map((bin) => ({
        latitude: bin.latitude,
        longitude: bin.longitude,
      }));

    if (highPriorityBins.length === 0) {
      console.log("No bins require immediate pickup.");
      return;
    }

    // **Step 2: Construct the API request URL for multi-stop routing**
    const waypoints = highPriorityBins.map((bin) => `${bin.latitude},${bin.longitude}`).join("|");
    const directionsURL = `https://maps.googleapis.com/maps/api/directions/json?origin=${truckLat},${truckLng}&destination=${highPriorityBins[highPriorityBins.length - 1].latitude},${highPriorityBins[highPriorityBins.length - 1].longitude}&waypoints=${waypoints}&key=${GOOGLE_MAPS_API_KEY}`;

    try {
      const response = await fetch(directionsURL);
      const data = await response.json();

      if (data.routes.length > 0) {
        const optimizedPoints = data.routes[0].legs.flatMap((leg) =>
          leg.steps.map((step) => ({
            latitude: step.end_location.lat,
            longitude: step.end_location.lng,
          }))
        );
        setOptimizedRoute(optimizedPoints);
      } else {
        console.error("No route found in Google Directions API.");
      }
    } catch (error) {
      console.error("Error fetching route:", error);
    }
  };

  const getBinColor = (level) => {
    if (level >= 90) return "red"; // 🔴 Full bins
    if (level >= 50) return "yellow"; // 🟡 Medium bins
    return "green"; // 🟢 Low bins
  };


  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#008000" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <MapView ref={mapRef} style={styles.map} initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}>
          {/* 🗑️ **Bin Locations with color coding** */}
        {binLocations.map((bin) => (
          <Marker key={bin.id} coordinate={{ latitude: bin.latitude, longitude: bin.longitude }}>
            <Image source={dustbinIcon} style={[styles.markerIcon, { tintColor: getBinColor(bin.level) }]} />
          </Marker>
        ))}

        {/* 🔵 Highlight selected bin */}
        {selectedBin && selectedBin.latitude !== undefined && selectedBin.longitude !== undefined && (
  <Marker coordinate={{ latitude: selectedBin.latitude, longitude: selectedBin.longitude }}>
    <Image source={dustbinIcon} />
  </Marker>
)}

{/* 🚛 Truck Location */}
{truckLocation && (
          <Marker coordinate={truckLocation}>
            <Image
              source={truckIcon}
              style={styles.truckIcon}
              resizeMode="contain"
            />
          </Marker>
        )}

        </MapView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { width: "100%", height: "100%" },
  markerIcon: { width: 40, height: 40 },
  truckIcon: { width: 30, height: 50 },
});

export default MapScreen;