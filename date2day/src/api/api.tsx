import type { PlaceData } from "@/types/interface";

export const savePlace = async (place: PlaceData) => {
    const response = await fetch("http://localhost:5000/api/places", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(place),
    });
    if (!response.ok) throw new Error("Failed to save place");
};
