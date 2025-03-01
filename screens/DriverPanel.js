import React, { useEffect, useState } from "react";
import { View, StyleSheet } from "react-native";
import MapView from "react-native-maps";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "./../firebase";
import BinMarker from "../components/BinMarker"; // Import BinMarker

const DriverPanel = () => {
  const [bins, setBins] = useState([]);
  const [state, setState] = useState({
    pickupCords: {
      latitude: 37.78825,
      longitude: -122.4324,
    },
    destinationCords: {
      latitude: 39.78825,
      longitude: -120.4324,
    },
  });

  const{pickupCords,destinationCords} = state

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "bins"), (snapshot) => {
      setBins(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          level: doc.data().level,
          lat: doc.data().location.lat,
          lng: doc.data().location.lng,
        }))
      );
    });
    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
         pickupCords
        }}
      />

<MapViewDirections
origin={pickupCords}
destination={destinationCords}

      />

        {bins.map((bin) => (
          <BinMarker key={bin.id} bin={bin} />
        ))}
     
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1 },
});

export default DriverPanel;
