"use client";

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useState } from "react";
import { useStoreUserIP } from "@/helpers/useStoreUserIP";
import { latLong } from "@/api/routes";

const Map = ({ main_data }) => {
  const { userIP } = useStoreUserIP();

  const [isMounted, setIsMounted] = useState(false);

  console.log(userIP);
  const [state, setState] = useState({
    lat: null,
    lon: null,
  });

  async function getLatLongForMap(listDetail) {
    const { Street, StreetAbbreviation, StreetName, Area, Province } =
      listDetail;
    const fullAddressForMap = `${Street}, ${StreetName} ${StreetAbbreviation}, ${Area}, ${Province}, Canada`;
    const url = latLong;

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify({
        id: userIP,
        locationToSearch: fullAddressForMap,
      }),
    };

    const res = await fetch(url, options);
    const data = await res.json();
    return data;
  }

  useEffect(() => {
    if (userIP) {
      const commonFunctionCall = async () => {
        const latLngValue = await getLatLongForMap(main_data);
        setState({
          lat: latLngValue.result.lat,
          lon: latLngValue.result.lon,
        });
      };
      commonFunctionCall();
      setIsMounted(true);
    }
  }, [userIP]);

  return (
    <>
      {state.lat && isMounted ? (
        <MapContainer
          center={[state.lat, state.lon]}
          zoom={17}
          style={{
            height: "200px",
            width: "100%",
            borderRadius: "5px",
            marginTop: "1rem",
          }}
          attributionControl={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker
            position={[state.lat, state.lon]}
            icon={L.icon({
              iconUrl:
                "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
            })}
          ></Marker>
        </MapContainer>
      ) : null}
    </>
  );
};

export default Map;
