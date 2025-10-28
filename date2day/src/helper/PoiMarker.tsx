import {
    APIProvider,
    AdvancedMarker,
    Map,
    Pin,
    useMap,
} from "@vis.gl/react-google-maps";
import React, { useCallback, useEffect, useRef, useState } from "react";

import type { DateEventData } from "@/types/interface";
import type { Marker } from "@googlemaps/markerclusterer";
import { MarkerClusterer } from "@googlemaps/markerclusterer";

interface PoiMarkerProps {
    location: DateEventData[];
}

const StartMarker = () => {
    return <></>;
};

const PoiMarker: React.FC<PoiMarkerProps> = ({ location }) => {
    return (
        <>
            {location.map((ded: DateEventData) => (
                <AdvancedMarker key={ded._id} position={ded.places[0].location}>
                    {" "}
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

export default PoiMarker;
