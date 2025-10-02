import "./App.css";

import {
    APIProvider,
    AdvancedMarker,
    Map,
    Marker,
    Pin,
} from "@vis.gl/react-google-maps";

import Banner from "./components/custom/Banner";
import type { MapCameraChangedEvent } from "@vis.gl/react-google-maps";
import { useState } from "react";

type Poi = { key: string; location: google.maps.LatLngLiteral };
const locations: Poi[] = [
    { key: "operaHouse", location: { lat: -33.8567844, lng: 151.213108 } },
    { key: "tarongaZoo", location: { lat: -33.8472767, lng: 151.2188164 } },
    { key: "manlyBeach", location: { lat: -33.8209738, lng: 151.2563253 } },
    { key: "hyderPark", location: { lat: -33.8690081, lng: 151.2052393 } },
    { key: "theRocks", location: { lat: -33.8587568, lng: 151.2058246 } },
    { key: "circularQuay", location: { lat: -33.858761, lng: 151.2055688 } },
    { key: "harbourBridge", location: { lat: -33.852228, lng: 151.2038374 } },
    { key: "kingsCross", location: { lat: -33.8737375, lng: 151.222569 } },
    { key: "botanicGardens", location: { lat: -33.864167, lng: 151.216387 } },
    { key: "museumOfSydney", location: { lat: -33.8636005, lng: 151.2092542 } },
    { key: "maritimeMuseum", location: { lat: -33.869395, lng: 151.198648 } },
    {
        key: "kingStreetWharf",
        location: { lat: -33.8665445, lng: 151.1989808 },
    },
    { key: "aquarium", location: { lat: -33.869627, lng: 151.202146 } },
    { key: "darlingHarbour", location: { lat: -33.87488, lng: 151.1987113 } },
    { key: "barangaroo", location: { lat: -33.8605523, lng: 151.1972205 } },
];

function App() {
    const [mapLoaded, setMapLoaded] = useState<boolean>(false);
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
                            defaultCenter={{ lat: -33.860664, lng: 151.208138 }}
                            style={{ width: "100%", height: "400px" }}
                        >
                            <PoiMarkers pois={locations} />
                        </Map>
                    </APIProvider>
                </div>
            </div>
        </>
    );
}

const PoiMarkers = (props: { pois: Poi[] }) => {
    return (
        <>
            {props.pois.map((poi: Poi) => (
                <AdvancedMarker key={poi.key} position={poi.location}>
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
