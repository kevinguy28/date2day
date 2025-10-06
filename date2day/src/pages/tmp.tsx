import "./App.css";

import {
    APIProvider,
    AdvancedMarker,
    Map,
    Pin,
    useMap,
} from "@vis.gl/react-google-maps";
import React, { useCallback, useEffect, useRef, useState } from "react";

import Banner from "./components/custom/Banner";
import { Input } from "./components/ui/input";
import { Label } from "@radix-ui/react-label";
import type { Marker } from "@googlemaps/markerclusterer";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import { createRoot } from "react-dom/client";

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
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [searchResults, setSearchResults] = useState<Poi[]>([]);

    return (
        <>
            <Banner />
            <div className="w-full p-4">
                <h1>Trending</h1>
                <h1>Restaurant</h1>
                <h1>Activities</h1>

                <div className="mt-4">
                    <h1>Maps</h1>
                    <Label htmlFor="placeSearch">Search</Label>

                    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_KEY}>
                        {/* ✅ Input above map, still can access map inside */}
                        <PlaceSearch
                            query={searchQuery}
                            onChange={(val) => setSearchQuery(val)}
                            onResults={(results) => setSearchResults(results)}
                        />

                        <Map
                            defaultZoom={13}
                            defaultCenter={{ lat: 43.6532, lng: -79.3832 }}
                            style={{ width: "100%", height: "400px" }}
                            mapId={"DEMO"}
                        >
                            <PoiMarkers pois={locations} />
                            <PoiMarkers pois={searchResults} />
                        </Map>
                    </APIProvider>
                </div>
            </div>
        </>
    );
}

const PlaceSearch = ({
    query,
    onChange,
    onResults,
}: {
    query: string;
    onChange: (val: string) => void;
    onResults: (results: Poi[]) => void;
}) => {
    const map = useMap();

    return (
        <Input
            id="placeSearch"
            type="text"
            className="w-40 text-white mb-2"
            value={query}
            onChange={(e) => onChange(e.currentTarget.value)}
            onKeyDown={async (e) => {
                if (e.key === "Enter" && map) {
                    const results = await findPlaces(query, map);
                    onResults(results); // update markers
                }
            }}
        />
    );
};

async function findPlaces(query: string, map: google.maps.Map): Promise<Poi[]> {
    const { Place } = (await google.maps.importLibrary(
        "places"
    )) as google.maps.PlacesLibrary;

    const request: google.maps.places.SearchByTextRequest = {
        textQuery: query,
        fields: ["displayName", "location", "businessStatus"],
        locationBias: map.getCenter()!,
        maxResultCount: 8,
        region: "ca",
    };

    const { places } = await Place.searchByText(request);

    if (places.length) {
        const results: Poi[] = places
            .filter((p) => p.location)
            .map((p, idx) => ({
                key: `search-${idx}-${p.displayName}`,
                location: {
                    lat: p.location!.lat(),
                    lng: p.location!.lng(),
                }, // convert LatLng to LatLngLiteral
            }));

        // Pan to first result
        if (results[0]?.location) map.panTo(results[0].location);

        return results;
    } else {
        console.log("No results for query:", query);
        return [];
    }
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
