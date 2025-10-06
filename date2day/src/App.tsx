import "./App.css";

import {
    APIProvider,
    AdvancedMarker,
    Map,
    Pin,
    useMap,
} from "@vis.gl/react-google-maps";
import {
    Field,
    FieldContent,
    FieldDescription,
    FieldError,
    FieldGroup,
    FieldLabel,
    FieldLegend,
    FieldSeparator,
    FieldSet,
    FieldTitle,
} from "@/components/ui/field";
import React, { useCallback, useEffect, useRef, useState } from "react";

import Banner from "./components/custom/Banner";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Label } from "@radix-ui/react-label";
import type { Marker } from "@googlemaps/markerclusterer";
import { MarkerClusterer } from "@googlemaps/markerclusterer";
import { createRoot } from "react-dom/client";

type Poi = { key: string; location: google.maps.LatLngLiteral };

const Form = () => {
    const [locations, setLocations] = useState<Array<google.maps.places.Place>>(
        []
    );

    const [location, setLocation] = useState<string>("");

    return (
        <FieldSet className="w-100 p-4 bg-[#0f0f0f] rounded-lg">
            <FieldGroup>
                <FieldDescription>Input a location</FieldDescription>
                <Field>
                    <FieldLabel htmlFor="name">Location </FieldLabel>
                    <Input
                        id="name"
                        autoComplete="off"
                        placeholder="St. Clair Avenue West"
                        onChange={(e) => setLocation(e.currentTarget.value)}
                    />
                </Field>
            </FieldGroup>
            <Field orientation="horizontal">
                <Button
                    type="submit"
                    className="hover:bg-white hover:text-black"
                >
                    Submit
                </Button>
                <Button variant="outline" type="button">
                    Cancel
                </Button>
            </Field>
        </FieldSet>
    );
};

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
                    <Form />

                    <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_KEY}>
                        <Map
                            defaultZoom={13}
                            defaultCenter={{ lat: 43.6532, lng: -79.3832 }}
                            style={{ width: "100%", height: "400px" }}
                            mapId={"DEMO"}
                        ></Map>
                    </APIProvider>
                </div>
            </div>
        </>
    );
}

export default App;
