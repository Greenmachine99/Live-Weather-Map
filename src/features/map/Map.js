// Import React & Redux Dependencies
import React, { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";

// Import React Leaflet Dependencies
import { MapContainer, TileLayer, Marker, Popup} from "react-leaflet";
import { Icon } from "leaflet";
import 'leaflet/dist/leaflet.css';

// Import CSS
import "./map.css";

// Import Slice Dependencies
import { getUserPosition, startPositionSelector, endDestinationSelector } from "./mapSlice";

export function Map() {
    const dispatch = useDispatch();

    // Assign Redux State to Variables
    const startPosition = useSelector(startPositionSelector);
    const endDestination = useSelector(endDestinationSelector);
    const hasError = useSelector((state) => state.map.hasError);
    const isLoading = useSelector((state) => state.map.isLoading);

    // Set Icon for Marker
    const positionIcon = new Icon({
        iconUrl: "https://img.icons8.com/emoji/48/000000/round-pushpin-emoji.png",
        iconSize: [40, 40]
    })

    // Load Current Location
    useEffect(() => {
        dispatch(getUserPosition());
    },
    [dispatch])

    return (
        <div className="map">
            {isLoading ? (
                <p> Loading current location... </p>
            ) : (!hasError ? (
            <MapContainer center={startPosition} zoom={13} >
                <TileLayer 
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={startPosition} icon={positionIcon}>
                    <Popup>
                        You are here!
                    </Popup>
                </Marker>               
            </MapContainer>
            ) :
            <p> Cannot load current location </p>
            )}
        </div>
    )
}