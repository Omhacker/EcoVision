// import React, { useEffect, useState } from "react";
// import { View, StyleSheet } from "react-native";
// import MapView from "react-native-maps";
// import { collection, onSnapshot } from "firebase/firestore";
// import { db } from "./../firebase";
// import BinMarker from "../components/BinMarker"; // Import BinMarker

// const DriverPanel = () => {
//   const [bins, setBins] = useState([]);
//   const [state, setState] = useState({
//     pickupCords: {
//       latitude: 37.78825,
//       longitude: -122.4324,
//     },
//     destinationCords: {
//       latitude: 39.78825,
//       longitude: -120.4324,
//     },
//   });

//   const{pickupCords,destinationCords} = state

//   useEffect(() => {
//     const unsubscribe = onSnapshot(collection(db, "bins"), (snapshot) => {
//       setBins(
//         snapshot.docs.map((doc) => ({
//           id: doc.id,
//           level: doc.data().level,
//           lat: doc.data().location.lat,
//           lng: doc.data().location.lng,
//         }))
//       );
//     });
//     return () => unsubscribe();
//   }, []);

//   return (
//     <View style={styles.container}>
//       <MapView
//         style={styles.map}
//         initialRegion={{
//          pickupCords
//         }}
//       />

// <MapViewDirections
// origin={pickupCords}
// destination={destinationCords}

//       />

//         {bins.map((bin) => (
//           <BinMarker key={bin.id} bin={bin} />
//         ))}
     
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1 },
//   map: { flex: 1 },
// });

// export default DriverPanel;

import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import { View, StyleSheet, ActivityIndicator, Image } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import { useNavigation, useRoute } from "@react-navigation/native";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase";
import dustbinIcon from "./../assets/dustbin.png";
import truckIcon from "./../assets/truck.png";

const ORS_API_KEY = "5b3ce3597851110001cf624864428fac95534af184492fdd8559ca26";

const DriverPanel = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const mapRef = useRef(null);
  const [binLocations, setBinLocations] = useState([]);
  const [truckLocation, setTruckLocation] = useState(null);
  const [selectedBin, setSelectedBin] = useState(null);
  const [optimizedRoute, setOptimizedRoute] = useState([]);
  const [loading, setLoading] = useState(true);

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  useEffect(() => {
    if (route.params?.selectedBin) {
      const bin = route.params.selectedBin;
      const binData = {
        latitude: bin.location?.lat || bin.latitude,
        longitude: bin.location?.lng || bin.longitude,
      };
      setSelectedBin(binData);
      zoomToBin(binData.latitude, binData.longitude);
    }
  }, [route.params?.selectedBin]);

  // useEffect(() => {
  //   const unsubscribeBins = onSnapshot(collection(db, "bins"), (snapshot) => {
  //     const bins = snapshot.docs.map((doc) => ({
  //       id: doc.id,
  //       latitude: doc.data().location?.lat || 0,
  //       longitude: doc.data().location?.lng || 0,
  //       level: parseInt(doc.data().level) || 0,
  //     }));
  //     console.log("Bins Data:", bins);
  //     setBinLocations(bins);
  
  //     if (truckLocation) {
  //       planOptimizedRoute(truckLocation.latitude, truckLocation.longitude, bins);
  //     }
  //   });
  
  //   const unsubscribeTruck = onSnapshot(collection(db, "trucks"), (snapshot) => {
  //     if (!snapshot.empty) {
  //       const truckData = snapshot.docs[0].data();
  //       const truckLoc = {
  //         latitude: truckData.location.lat,
  //         longitude: truckData.location.lng,
  //       };
  //       console.log("Truck Location:", truckLoc);
  //       setTruckLocation(truckLoc);
        
  //       if (binLocations.length > 0) {
  //         planOptimizedRoute(truckLoc.latitude, truckLoc.longitude, binLocations);
  //       }
  //     }
  //     setLoading(false);
  //   });
  
  //   return () => {
  //     unsubscribeBins();
  //     unsubscribeTruck();
  //   };
  // }, []);

  useEffect(() => {
    const unsubscribeBins = onSnapshot(collection(db, "bins"), (snapshot) => {
      const bins = snapshot.docs.map((doc) => ({
        id: doc.id,
        latitude: doc.data().location?.lat || 0,
        longitude: doc.data().location?.lng || 0,
        level: parseInt(doc.data().level) || 0,
      }));
      console.log("Updated Bins Data:", bins);
      setBinLocations(bins);
    });
  
    const unsubscribeTruck = onSnapshot(collection(db, "trucks"), (snapshot) => {
      if (!snapshot.empty) {
        const truckData = snapshot.docs[0].data();
        const truckLoc = {
          latitude: truckData.location.lat,
          longitude: truckData.location.lng,
        };
        console.log("Updated Truck Location:", truckLoc);
        setTruckLocation(truckLoc);
      }
      setLoading(false);
    });
  
    return () => {
      unsubscribeBins();
      unsubscribeTruck();
    };
  }, []);
  
  useEffect(() => {
    if (truckLocation && binLocations.length > 0) {
      planOptimizedRoute(truckLocation.latitude, truckLocation.longitude);
    }
  }, [truckLocation, binLocations]); // Recalculate route whenever bins or truck change
  
  

  const zoomToBin = (lat, lng) => {
    if (mapRef.current) {
      mapRef.current.animateToRegion(
        {
          latitude: lat,
          longitude: lng,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        },
        1000
      );
    }
  };

  const planOptimizedRoute = async (truckLat, truckLng) => {
    if (!truckLocation || binLocations.length === 0) return;

    // Separate bins into high-priority (red) and medium-priority (yellow)
    const redBins = binLocations.filter((bin) => bin.level >= 90);
    let yellowBins = binLocations.filter((bin) => bin.level >= 50 && bin.level < 90);

    if (redBins.length === 0) {
      console.log("No high-priority bins (Red) require immediate pickup.");
      return;
    }

    // Convert red bins to ORS format
    const redBinCoords = redBins.map((bin) => [bin.longitude, bin.latitude]);

    // Determine nearby yellow bins (within ~1km of any red bin)
    yellowBins = yellowBins.filter((yellowBin) =>
      redBins.some((redBin) => {
        const distance = getDistance(redBin.latitude, redBin.longitude, yellowBin.latitude, yellowBin.longitude);
        return distance <= 1; // Consider only yellow bins within 1km of any red bin
      })
    );

    console.log("Optimizing Route with:", redBins.length, "Red Bins &", yellowBins.length, "Nearby Yellow Bins");

    // Construct ORS API request
    const coordinates = [[truckLng, truckLat], ...redBinCoords, ...yellowBins.map((bin) => [bin.longitude, bin.latitude])];

    const orsURL ="https://api.openrouteservice.org/v2/directions/driving-car/geojson";

    try {
      const response = await fetch(orsURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: ORS_API_KEY,
        },
        body: JSON.stringify({
          coordinates: coordinates,
          instructions: false,
          preference: "shortest",
        }),
      });

      const data = await response.json();

      if (data.features && data.features.length > 0) {
        const routeCoords = data.features[0].geometry.coordinates.map(([lng, lat]) => ({
          latitude: lat,
          longitude: lng,
        }));

        setOptimizedRoute(routeCoords);
      } else {
        console.error("No optimized route found.");
      }
    } catch (error) {
      console.error("Error fetching optimized route:", error);
    }
  };

  // Function to calculate distance between two points (Haversine Formula)
  const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  };

  const getBinColor = (level) => {
    if (level >= 90) return "red";
    if (level >= 50) return "yellow";
    return "green";
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
      <MapView
        ref={mapRef}
        style={styles.map}
        initialRegion={{
          latitude: 22.69573,
          longitude: 72.85877,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {binLocations.map((bin) => (
          <Marker key={bin.id} coordinate={{ latitude: bin.latitude, longitude: bin.longitude }}>
            <Image source={dustbinIcon} style={[styles.markerIcon, { tintColor: getBinColor(bin.level) }]} />
          </Marker>
        ))}

        {truckLocation && (
          <Marker coordinate={truckLocation}>
            <Image source={truckIcon} style={styles.truckIcon} resizeMode="contain" />
          </Marker>
        )}

        {optimizedRoute.length > 0 ? (
  <Polyline coordinates={optimizedRoute} strokeWidth={4} strokeColor="blue" />
) : (
  console.log("No route available")
)}

      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { width: "100%", height: "100%" },
  markerIcon: { width: 40, height: 40 },
  truckIcon: { width: 30, height: 50 },
});

export default DriverPanel;