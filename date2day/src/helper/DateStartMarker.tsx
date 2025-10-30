import React, { useEffect, useState } from "react";

import { AdvancedMarker } from "@vis.gl/react-google-maps";
import type { PlaceData } from "@/types/interface";
import type { SetStateAction } from "react";

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
        <div>
            {isActive &&
                restPlaces.map((place, index) => (
                    <AdvancedMarker
                        key={`${place.id}-${index}`}
                        position={place.location}
                        data-refDateObj={id}
                    />
                ))}
        </div>
    );
};

const DateStartMarker: React.FC<DateObjProps> = ({ id, places }) => {
    const [firstPlace, ...restPlaces] = places;
    const [active, setActive] = useState<boolean>(false);
    const [activeDate, setActiveDate] = useState<[]>([]);

    return (
        <>
            <AdvancedMarker
                position={firstPlace.location}
                key={firstPlace.id}
                data-refDateObj={id}
                onClick={() => setActive(!active)}
            ></AdvancedMarker>
            <DateRestPlaces
                id={id}
                restPlaces={restPlaces}
                isActive={active}
            ></DateRestPlaces>
        </>
    );
};

export default DateStartMarker;
