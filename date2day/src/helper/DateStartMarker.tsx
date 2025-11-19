import React, { useEffect, useState } from "react";

import { AdvancedMarker } from "@vis.gl/react-google-maps";
import type { PlaceData, DateEventData } from "@/types/interface";

interface DateObjProps {
    id: string;
    places: PlaceData[];
}

interface DateRestPlacesProp {
    id: string;
    restPlaces: PlaceData[];
    isActive: boolean;
}

interface DatesArrayProp {
    dates: DateEventData[];
}

const StartingLocation: React.FC<{
    dateLocation: PlaceData;
    onClick: () => void;
    hide: boolean;
}> = ({ dateLocation, onClick, hide }) => {
    return (
        <>
            {!hide && (
                <AdvancedMarker
                    position={dateLocation.location}
                    onClick={onClick}
                />
            )}
        </>
    );
};

const RestOfLocation: React.FC<{
    dateLocations: PlaceData[];
}> = ({ dateLocations }) => {
    return (
        <>
            {dateLocations.map((date) => (
                <AdvancedMarker key={date.id} position={date.location} />
            ))}
        </>
    );
};

const DateStartMarker: React.FC<DatesArrayProp> = ({ dates }) => {
    const [dateId, setDateId] = useState<string>("");

    const handleClick = (id: string) => {
        setDateId((prevId) => (prevId === id ? "" : id));
    };

    return (
        <>
            {dates.map((date) => (
                <React.Fragment key={date._id}>
                    <StartingLocation
                        dateLocation={date.places[0]}
                        onClick={() => handleClick(date._id)}
                        hide={dateId !== "" && dateId !== date._id}
                    />

                    {date._id === dateId && (
                        <RestOfLocation dateLocations={date.places.slice(1)} />
                    )}
                </React.Fragment>
            ))}
        </>
    );
};

export default DateStartMarker;
