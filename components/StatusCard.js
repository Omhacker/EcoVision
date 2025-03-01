import React from "react";
import { View, Text, StyleSheet } from "react-native";

const StatusCard = ({ bin }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bin ID: {bin.id}</Text>
      <Text>Fill Level: {bin.level}%</Text>
      <Text>Location: {bin.lat}, {bin.lng}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: "white",
    borderRadius: 10,
    elevation: 5,
  },
  title: {
    fontWeight: "bold",
    marginBottom: 5,
  },
});

export default StatusCard;
