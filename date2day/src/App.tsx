import "./App.css";
import React, { useEffect, useState, useRef, useCallback } from "react";
import Banner from "./components/custom/Banner";
import { createRoot } from "react-dom/client";
import {
    APIProvider,
    Map,
    AdvancedMarker,
    Pin,
    useMap,
} from "@vis.gl/react-google-maps";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import type { Marker } from "@googlemaps/markerclusterer";

// Toronto hotspots
type Poi = { key: string; location: google.maps.LatLngLiteral };
const locations: Poi[] = [
    { key: "cnTower", location: { lat: 43.6426, lng: -79.3871 } },
    { key: "rogersCentre", location: { lat: 43.6414, lng: -79.3894 } },
    { key: "unionStation", location: { lat: 43.6455, lng: -79.3807 } },
    { key: "scotiabankArena", location: { lat: 43.6435, lng: -79.3791 } },
    { key: "royalOntarioMuseum", location: { lat: 43.6677, lng: -79.3948 } },
    { key: "artGalleryOntario", location: { lat: 43.6536, lng: -79.3925 } },
    { key: "stLawrenceMarket", location: { lat: 43.6487, lng: -79.3716 } },
    { key: "distilleryDistrict", location: { lat: 43.6506, lng: -79.3596 } },
    { key: "highPark", location: { lat: 43.6465, lng: -79.4637 } },
    { key: "torontoIslands", location: { lat: 43.6205, lng: -79.3783 } },
    { key: "cityHall", location: { lat: 43.6535, lng: -79.3841 } },
    { key: "eatonCentre", location: { lat: 43.6544, lng: -79.3807 } },
    { key: "yorkville", location: { lat: 43.671, lng: -79.3934 } },
    { key: "kensingtonMarket", location: { lat: 43.654, lng: -79.4001 } },

    { key: "ontarioScienceCentre", location: { lat: 43.7161, lng: -79.3389 } },
    { key: "cn1", location: { lat: 43.6426, lng: -79.3871 } },
    { key: "cn2", location: { lat: 43.6427, lng: -79.3872 } },
    { key: "cn3", location: { lat: 43.6428, lng: -79.3873 } },
    { key: "cn4", location: { lat: 43.6425, lng: -79.387 } },
    { key: "cn5", location: { lat: 43.6424, lng: -79.3872 } },
    { key: "cn6", location: { lat: 43.6429, lng: -79.3871 } },
    { key: "cn7", location: { lat: 43.643, lng: -79.3874 } },
    { key: "cn8", location: { lat: 43.6423, lng: -79.3873 } },
    { key: "cn9", location: { lat: 43.6422, lng: -79.3875 } },
    { key: "cn10", location: { lat: 43.6421, lng: -79.3876 } },
];

function App() {
    return (
        <>
            <Banner />
            <div className="w-full p-4">
                <h1>Trending</h1>
                <h1>Restaurant</h1>
                <h1>Activities</h1>
                <div className="mt-4">
                    <h1>Maps</h1>

                    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_KEY}>
                        <Map
                            defaultZoom={13}
                            defaultCenter={{ lat: 43.6532, lng: -79.3832 }}
                            style={{ width: "100%", height: "400px" }}
                            mapId={"DEMO"}
                        >
                            <PoiMarkers pois={locations} />
                        </Map>
                    </APIProvider>
                </div>
            </div>
        </>
    );
}

const PoiMarkers = ({ pois }: { pois: Poi[] }) => {
    const map = useMap();
    const [markers, setMarkers] = useState<{ [key: string]: Marker }>({});
    const clusterer = useRef<MarkerClusterer | null>(null);

    useEffect(() => {
        if (!map) return;
        if (!clusterer.current) {
            clusterer.current = new MarkerClusterer({ map });
        }
    }, [map]);

    useEffect(() => {
        clusterer.current?.clearMarkers();
        clusterer.current?.addMarkers(Object.values(markers));
    }, [markers]);

    const setMarkerRef = (marker: Marker | null, key: string) => {
        if (marker && markers[key]) return;
        if (!marker && !markers[key]) return;

        setMarkers((prev) => {
            if (marker) {
                return { ...prev, [key]: marker };
            } else {
                const newMarkers = { ...prev };
                delete newMarkers[key];
                return newMarkers;
            }
        });
    };

    const handleClick = useCallback(
        (ev: google.maps.MapMouseEvent) => {
            if (!map) return;
            if (!ev.latLng) return;
            console.log("marker clicked:", ev.latLng.toString());
            map.panTo(ev.latLng);
        },
        [map] // 👈 dependency array
    );

    return (
        <>
            {pois.map((poi: Poi) => (
                <AdvancedMarker
                    key={poi.key}
                    position={poi.location}
                    ref={(marker) => setMarkerRef(marker, poi.key)}
                    clickable={true}
                    onClick={handleClick}
                >
                    <Pin
                        background={"#FBBC04"}
                        glyphColor={"#000"}
                        borderColor={"#000"}
                    />
                </AdvancedMarker>
            ))}
        </>
    );
};

export default App;
