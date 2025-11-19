import axios from "axios";
import type { PlaceData } from "@/types/interface";

const placesUrl = import.meta.env.VITE_BACKEND_URL;

export const postPlace = async (
    placeId: string,
    displayName: string,
    location: {
        latitude: number;
        longitude: number;
    }
) => {
    try {
        console.log(location);
        const response = await axios.post(`${placesUrl}/places`, {
            displayName,
            placeId,
            location: {
                lat: location.latitude,
                lng: location.longitude,
            },
        });

        console.log("Success:", response.data);
    } catch (error: any) {
        console.error("Axios error:", error.response?.data || error.message);
    }
};
