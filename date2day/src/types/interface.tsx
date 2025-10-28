export interface PlaceData {
    id: string;
    displayName: string;
    location: { lat: number; lng: number };
}

export interface DateEventData {
    _id: string;
    title: string;
    description: string;
    places: PlaceData[];
}
