import React, { useState, useEffect } from "react";
import {
    APIProvider,
    AdvancedMarker,
    Map,
    InfoWindow,
    useMap,
} from "@vis.gl/react-google-maps";

interface Place {
    id: string;
    location: {
        latitude: number | string;
        longitude: number | string;
    };
    formattedAddress: string;
    displayName: {
        text: string;
        languageCode: string;
    };
}

const RenderMapRebound = ({ places }: { places: Place[] }) => {
    const map = useMap();

    useEffect(() => {
        if (!map || places.length === 0) return;

        if (places.length === 1) {
            const place = places[0];
            const lat = Number(place.location.latitude);
            const lng = Number(place.location.longitude);

            map.panTo({ lat, lng });
            map.setZoom(15);
        } else {
            const bounds = new google.maps.LatLngBounds();
            places.forEach((place) => {
                bounds.extend({
                    lat: Number(place.location.latitude),
                    lng: Number(place.location.longitude),
                });
            });
            map.fitBounds(bounds);
        }
    }, [places, map]);

    return null;
};

const MapView = React.memo(
    ({
        places,
        setDatePlaces,
    }: {
        places: Place[];
        setDatePlaces: React.Dispatch<React.SetStateAction<any[]>>;
    }) => {
        const [activeWindow, setActiveWindow] = useState<Place | null>(null);

        return (
            <APIProvider apiKey={import.meta.env.VITE_GOOGLE_MAPS_KEY}>
                <Map
                    defaultZoom={13}
                    defaultCenter={{ lat: 43.6532, lng: -79.3832 }}
                    style={{ width: "100%", height: "100%" }}
                    mapId="f0193977dc823acb2c4541a1"
                    disableDefaultUI
                >
                    {places.map((place) => {
                        const lat = Number(place.location.latitude);
                        const lng = Number(place.location.longitude);

                        return (
                            <React.Fragment key={place.id}>
                                <AdvancedMarker
                                    position={{ lat, lng }}
                                    onClick={() => setActiveWindow(place)}
                                />

                                {activeWindow?.id === place.id && (
                                    <InfoWindow
                                        position={{ lat, lng }}
                                        onCloseClick={() =>
                                            setActiveWindow(null)
                                        }
                                    >
                                        <div className="flex flex-col gap-1">
                                            <h2 className="font-semibold text-xl text-black">
                                                {place.displayName?.text}
                                            </h2>
                                            <p className="text-xs text-gray-600">
                                                {place.formattedAddress}
                                            </p>
                                            <div
                                                className="text-black p-2  bg-[#e6e1e1] hover:bg-[#bdbbbb]"
                                                onClick={() =>
                                                    setDatePlaces((prev) => [
                                                        ...prev,
                                                        place,
                                                    ])
                                                }
                                            >
                                                Add to Date!
                                            </div>
                                        </div>
                                    </InfoWindow>
                                )}
                            </React.Fragment>
                        );
                    })}
                    <RenderMapRebound places={places} />
                </Map>
            </APIProvider>
        );
    }
);

export default MapView;
