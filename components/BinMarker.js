import React from "react";
import { Marker, Callout } from "react-native-maps";
import StatusCard from "./StatusCard"; // Import StatusCard component

const BinMarker = ({ bin }) => {
  return (
    <Marker
      coordinate={{ latitude: bin.lat, longitude: bin.lng }}
      title={`Bin ${bin.id}`}
    >
      <Callout>
        <StatusCard bin={bin} />
      </Callout>
    </Marker>
  );
};

export default BinMarker;
