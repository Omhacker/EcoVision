// import React, { useEffect, useState,useLayoutEffect} from "react";
// import { View, Text, StyleSheet, Dimensions, Button, Platform } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import DateTimePicker from "@react-native-community/datetimepicker";
// import { db } from "../firebase"; // Ensure db is properly initialized
// import { doc, getDoc } from "firebase/firestore";
// import { PieChart } from "react-native-chart-kit";

// export default function DataNotification() {

//   const navigation = useNavigation();

//   useLayoutEffect(() => {
//     navigation.setOptions({ headerShown: false });
//   }, [navigation]);

//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [trashData, setTrashData] = useState(null);
//   const [showPicker, setShowPicker] = useState(false);

//   useEffect(() => {
//     fetchTrashData(selectedDate);
//   }, [selectedDate]);

//   // Fetch data from Firestore
//   const fetchTrashData = async (date) => {
//     const formattedDate = date.toISOString().split("T")[0]; // Format: YYYY-MM-DD
//     try {
//       const docRef = doc(db, "trash_data", formattedDate);
//       const docSnap = await getDoc(docRef);

//       if (docSnap.exists()) {
//         setTrashData(docSnap.data());
//       } else {
//         setTrashData(null);
//       }
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   // Handle Date Selection
//   const onDateChange = (event, date) => {
//     if (date) {
//       setSelectedDate(date);
//       setShowPicker(Platform.OS === "ios"); // Keep picker open for iOS
//     } else {
//       setShowPicker(false);
//     }
//   };

//   // Prepare Pie Chart Data
//   const pieData = trashData
//     ? [
//         { name:"Organic", population: parseInt(trashData.organic), color: "#4CAF50", legendFontColor: "#000", legendFontSize: 15 },
//         { name: "Recyclable", population: parseInt(trashData.recyclable), color: "#2196F3", legendFontColor: "#000", legendFontSize: 15 },
//       ]
//     : [];

//   return (
//     <View style={styles.container}>
//       <Text style={styles.head}>Waste Analysis</Text>
//       <Text style={styles.text}>Trash Data for {selectedDate.toDateString()}</Text>
//       <Button title="Select Date" onPress={() => setShowPicker(true)} />
//       {showPicker && (
//         <DateTimePicker
//           value={selectedDate}
//           mode="date"
//           display="default"
//           onChange={onDateChange}
//         />
//       )}
//       {trashData ? (
//         <PieChart
//           data={pieData}
//           width={Dimensions.get("window").width - 20}
//           height={250}
//           chartConfig={{
//             backgroundColor: "#fff",
//             backgroundGradientFrom: "#fff",
//             backgroundGradientTo: "#fff",
//             color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
//           }}
//           accessor="population"
//           backgroundColor="transparent"
//           paddingLeft="15"
//         />
//       ) : (
//         <Text style={styles.noDataText}>No Data Available</Text>
//       )}
//     </View>
//   );
// }

// // Styles
// const styles = StyleSheet.create({
//   head:{fontSize:36,backgroundColor:'#C2FFC7', alignItems: "center",width:'100%',paddingLeft:45,marginBottom:30,fontFamily:'serif',padding:10,fontWeight:700},
//   container: { flex: 1, justifyContent: "top", alignItems: "center", backgroundColor: "#f4f4f4" },
//   text: { fontSize: 20, fontWeight: "bold", marginBottom: 10 },
//   noDataText: { fontSize: 16, color: "gray", marginTop: 10 },
// });

// import React, { useEffect, useState, useLayoutEffect } from "react";
// import { View, Text, StyleSheet, Dimensions, Button, Platform, ScrollView } from "react-native";
// import { useNavigation } from "@react-navigation/native";
// import DateTimePicker from "@react-native-community/datetimepicker";
// import { db } from "../firebase";
// import { doc, getDoc, collection, getDocs } from "firebase/firestore";
// import { PieChart, BarChart } from "react-native-chart-kit";

// export default function DataNotification() {
//   const navigation = useNavigation();

//   useLayoutEffect(() => {
//     navigation.setOptions({ headerShown: false });
//   }, [navigation]);

//   const [selectedDate, setSelectedDate] = useState(new Date());
//   const [trashData, setTrashData] = useState(null);
//   const [historicalData, setHistoricalData] = useState([]);
//   const [showPicker, setShowPicker] = useState(false);

//   useEffect(() => {
//     fetchTrashData(selectedDate);
//     fetchHistoricalData();
//   }, [selectedDate]);

//   // Fetch data for selected date
//   const fetchTrashData = async (date) => {
//     const formattedDate = date.toISOString().split("T")[0]; // Format: YYYY-MM-DD
//     try {
//       const docRef = doc(db, "trash_data", formattedDate);
//       const docSnap = await getDoc(docRef);

//       if (docSnap.exists()) {
//         setTrashData(docSnap.data());
//       } else {
//         setTrashData(null);
//       }
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   // Fetch historical data for bar chart
//   const fetchHistoricalData = async () => {
//     try {
//       const querySnapshot = await getDocs(collection(db, "trash_data"));
//       const data = [];
//       querySnapshot.forEach((doc) => {
//         data.push({ date: doc.id, ...doc.data() });
//       });

//       // Sort by date
//       data.sort((a, b) => new Date(a.date) - new Date(b.date));
//       setHistoricalData(data);
//     } catch (error) {
//       console.error("Error fetching historical data:", error);
//     }
//   };

//   // Handle Date Selection
//   const onDateChange = (event, date) => {
//     if (date) {
//       setSelectedDate(date);
//       setShowPicker(Platform.OS === "ios"); // Keep picker open for iOS
//     } else {
//       setShowPicker(false);
//     }
//   };

//   // Prepare Pie Chart Data
//   const pieData = trashData
//     ? [
//         { name: "Organic", population: parseInt(trashData.organic), color: "#4CAF50", legendFontColor: "#000", legendFontSize: 15 },
//         { name: "Recyclable", population: parseInt(trashData.recyclable), color: "#2196F3", legendFontColor: "#000", legendFontSize: 15 },
//       ]
//     : [];

//   // Prepare Bar Chart Data
//   const labels = historicalData.map((entry) => entry.date); // Dates
//   const organicValues = historicalData.map((entry) => parseInt(entry.organic) || 0);
//   const recyclableValues = historicalData.map((entry) => parseInt(entry.recyclable) || 0);

//   return (
//     <ScrollView style={styles.container}>
//       <Text style={styles.head}>Waste Analysis</Text>
//       <Text style={styles.text}>Trash Data for {selectedDate.toDateString()}</Text>
//       <Button title="Select Date" onPress={() => setShowPicker(true)} />

//       {showPicker && (
//         <DateTimePicker
//           value={selectedDate}
//           mode="date"
//           display="default"
//           onChange={onDateChange}
//         />
//       )}

//       {trashData ? (
//         <PieChart
//           data={pieData}
//           width={Dimensions.get("window").width - 20}
//           height={250}
//           chartConfig={{
//             backgroundColor: "#fff",
//             backgroundGradientFrom: "#fff",
//             backgroundGradientTo: "#fff",
//             color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
//           }}
//           accessor="population"
//           backgroundColor="transparent"
//           paddingLeft="15"
//         />
//       ) : (
//         <Text style={styles.noDataText}>No Data Available</Text>
//       )}

//       {/* Bar Chart */}
//       {historicalData.length > 0 && (
//         <View style={styles.barChartContainer}>
//           <Text style={styles.chartTitle}>Historical Waste Data</Text>
//           <ScrollView horizontal>
//             <BarChart
//               data={{
//                 labels: labels,
//                 datasets: [
//                   { data: organicValues, color: () => "#4CAF50" }, // Organic Waste - Green
//                   { data: recyclableValues, color: () => "#2196F3" }, // Recyclable Waste - Blue
//                 ],
//                 legend: ["Organic", "Recyclable"],
//               }}
//               width={Math.max(Dimensions.get("window").width, labels.length * 50)}
//               height={350}
//               yAxisLabel=""
//               chartConfig={{
//                 backgroundColor: "#fff",
//                 backgroundGradientFrom: "#fff",
//                 backgroundGradientTo: "#fff",
//                 decimalPlaces: 0,
//                 color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
//               }}
//               verticalLabelRotation={45}
//               fromZero
//               showValuesOnTopOfBars
//             />
//           </ScrollView>
//         </View>
//       )}
//     </ScrollView>
//   );
// }

// // Styles
// const styles = StyleSheet.create({
//   head: {
//     fontSize: 36,
//     backgroundColor: "#C2FFC7",
//     alignItems: "center",
//     width: "100%",
//     paddingLeft: 45,
//     marginBottom: 30,
//     fontFamily: "serif",
//     padding: 10,
//     fontWeight: "700",
//   },
//   container: {
//     flex: 1,
//     backgroundColor: "#f4f4f4",
//   },
//   text: {
//     fontSize: 20,
//     fontWeight: "bold",
//     marginBottom: 10,
//     textAlign: "center",
//   },
//   noDataText: {
//     fontSize: 16,
//     color: "gray",
//     marginTop: 10,
//     textAlign: "center",
//   },
//   barChartContainer: {
//     marginTop: 20,
//     alignItems: "center",
//   },
//   chartTitle: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginBottom: 10,
//   },
// });

import React, { useEffect, useState, useLayoutEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Button,
  Platform,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";
import { db } from "../firebase";
import { doc, getDoc, collection, getDocs } from "firebase/firestore";
import { PieChart, BarChart } from "react-native-chart-kit";
import RNPickerSelect from "react-native-picker-select";

export default function DataNotification() {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const [selectedDate, setSelectedDate] = useState(new Date());
  const [trashData, setTrashData] = useState(null);
  const [historicalData, setHistoricalData] = useState([]);
  const [showPicker, setShowPicker] = useState(false);
  const [selectedType, setSelectedType] = useState("organic");

  useEffect(() => {
    fetchTrashData(selectedDate);
    fetchHistoricalData();
  }, [selectedDate]);

  const fetchTrashData = async (date) => {
    const formattedDate = date.toISOString().split("T")[0];
    try {
      const docRef = doc(db, "trash_data", formattedDate);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setTrashData(docSnap.data());
      } else {
        setTrashData(null);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchHistoricalData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "trash_data"));
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ date: doc.id, ...doc.data() });
      });
      data.sort((a, b) => new Date(a.date) - new Date(b.date));
      setHistoricalData(data);
    } catch (error) {
      console.error("Error fetching historical data:", error);
    }
  };

  const onDateChange = (event, date) => {
    if (date) {
      setSelectedDate(date);
      setShowPicker(Platform.OS === "ios");
    } else {
      setShowPicker(false);
    }
  };

  // const pieData = trashData
  //   ? [
  //       {
  //         name: "Organic",
  //         population: parseInt(trashData.organic),
  //         color: "#4CAF50",
  //         legendFontColor: "#000",
  //         legendFontSize: 15,
  //       },
  //       {
  //         name: "Recyclable",
  //         population: parseInt(trashData.recyclable),
  //         color: "#2196F3",
  //         legendFontColor: "#000",
  //         legendFontSize: 15,
  //       },
  //     ]
  //   : [];

  const pieData = trashData
  ? [
      { name: "Organic", population: parseInt(trashData.organic), color: "#2E7D32", legendFontColor: "#000", legendFontSize: 15 }, // Dark Green
      { name: "Recyclable", population: parseInt(trashData.recyclable), color: "#1565C0", legendFontColor: "#000", legendFontSize: 15 }, // Dark Blue
    ]
  : [];


  return (
    <ScrollView style={styles.container}>
      <Text style={styles.head}>Waste Analysis</Text>
      <Text style={styles.text}>
        Trash Data for <Text style={styles.date}>{selectedDate.toDateString()}</Text>
      </Text>
      <TouchableOpacity
        onPress={() => setShowPicker(true)}
        style={styles.customButton}
      >
        <Text style={styles.buttonText}>Select Date</Text>
      </TouchableOpacity>

      {showPicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={onDateChange}
        />
      )}

      {trashData ? (
        <PieChart
        data={pieData}
        width={Dimensions.get("window").width - 10}
        height={250}
        chartConfig={{
          backgroundColor: "#fff",
          backgroundGradientFrom: "#fff",
          backgroundGradientTo: "#fff",
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        accessor="population"
        backgroundColor="transparent"
        paddingLeft="20"
        hasLegend={true}
        strokeWidth={3}  // Adds a border effect
        strokeColor="white"  // White border for clear separation
      />
      
      ) : (
        <Text style={styles.noDataText}>No Data Available</Text>
      )}

      {historicalData.length > 0 && (
        <View style={styles.barChartContainer}>
          <Text style={styles.chartTitle}>Historical Waste Data</Text>

          <View style={{ width: 180, height: 90, marginRight: 150 }}>
            <RNPickerSelect
              onValueChange={(value) => setSelectedType(value)}
              items={[
                { label: "Organic", value: "organic" },
                { label: "Recyclable", value: "recyclable" },
              ]}
              value={selectedType}
              style={{
                inputIOS: {
                  fontSize: 14,
                  paddingVertical: 6,
                  paddingHorizontal: 8,
                  borderWidth: 1,
                  borderColor: "gray",
                  borderRadius: 4,
                  color: "black",
                  paddingRight: 20,
                  backgroundColor: "white",
                },
                inputAndroid: {
                  fontSize: 14,
                  paddingHorizontal: 8,
                  borderWidth: 1,
                  borderColor: "gray",
                  borderRadius: 4,
                  color: "black",
                  paddingRight: 20,
                  backgroundColor: "white",
                  // height: 55,
                },
              }}
            />
          </View>

          <BarChart
            data={{
              labels: historicalData.map((entry) => entry.date),
              datasets: [
                {
                  data: historicalData.map((entry) =>
                    parseInt(entry[selectedType]?.replace("%", "") || "0")
                  ),
                  color: (opacity = 1) =>
                    selectedType === "organic"
                      ? `rgba(76, 175, 80, ${opacity})` // Green for Organic
                      : `rgba(33, 150, 243, ${opacity})`, // Blue for Recyclable
                  label:
                    selectedType.charAt(0).toUpperCase() +
                    selectedType.slice(1),
                },
              ],
            }}
            width={Dimensions.get("window").width - 20}
            height={350}
            yAxisLabel=""
            chartConfig={{
              backgroundColor: "#fff",
              backgroundGradientFrom: "#fff",
              backgroundGradientTo: "#fff",
              decimalPlaces: 0,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            }}
            verticalLabelRotation={30}
            fromZero
            showValuesOnTopOfBars
          />
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  head: {
    fontSize: 36,
    backgroundColor: "#C2FFC7",
    alignItems: "center",
    width: "100%",
    paddingLeft: 45,
    marginBottom: 30,
    fontFamily: "serif",
    padding: 10,
    fontWeight: "700",
  },
  container: {
    flex: 1,
    backgroundColor: "#f4f4f4",
  },
  text: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  date: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color:'#7199f4'
  },
  noDataText: {
    fontSize: 16,
    color: "gray",
    marginTop: 10,
    textAlign: "center",
  },
  barChartContainer: {
    marginTop: 20,
    alignItems: "center",
  },
  chartTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },
  customButton: {
    backgroundColor: "#DADADA",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    width:'30%',
    alignItems:'center',
    marginLeft:125
  },
  buttonText: {
    color: "black",
    fontSize: 16,
  },
});