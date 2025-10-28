import React from "react";
import type { PlaceData } from "@/types/interface";
import { AdvancedMarker } from "@vis.gl/react-google-maps";

interface DateObjProps {
    id: string;
    places: PlaceData[];
}

interface DateRestPlacesProp {
    id: string;
    restPlaces: PlaceData[];
    isActive: boolean;
}

const DateRestPlaces: React.FC<DateRestPlacesProp> = ({
    id,
    restPlaces,
    isActive,
}) => {
    return (
        <>
            {isActive &&
                restPlaces.map((place, index) => (
                    <AdvancedMarker
                        key={`${place.id}-${index}`}
                        position={place.location}
                        data-refDateObj={id}
                    />
                ))}
        </>
    );
};

const DateStartMarker: React.FC<DateObjProps> = ({ id, places }) => {
    const [firstPlace, ...restPlaces] = places;

    return (
        <>
            <AdvancedMarker
                position={firstPlace.location}
                key={firstPlace.id}
                data-refDateObj={id}
            ></AdvancedMarker>
            <DateRestPlaces
                id={id}
                restPlaces={restPlaces}
                isActive={true}
            ></DateRestPlaces>
        </>
    );
};

export default DateStartMarker;
