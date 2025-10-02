import { useEffect, useRef } from "react";

const Map = () => {
    const mapRef = useRef<HTMLDivElement | null>(null);
    const mapInstance = useRef<google.maps.Map | null>(null);

    useEffect(() => {
        if (!mapRef.current) return;

        // Load the Google Maps script dynamically
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=${
            import.meta.env.VITE_GOOGLE_MAPS_KEY
        }`;
        script.async = true;
        script.defer = true;

        script.onload = () => {
            if (!mapRef.current) return;

            // Initialize the map
            mapInstance.current = new google.maps.Map(mapRef.current, {
                center: { lat: 43.6532, lng: -79.3832 }, // Toronto
                zoom: 13,
                minZoom: 12,
                maxZoom: 16,
            });

            // Example: lock map to a region
            const bounds = new google.maps.LatLngBounds(
                { lat: 43.6, lng: -79.6 }, // SW
                { lat: 43.8, lng: -79.2 } // NE
            );
            mapInstance.current.setOptions({
                restriction: { latLngBounds: bounds, strictBounds: true },
            });

            // Example: add a marker
            new google.maps.Marker({
                position: { lat: 43.6532, lng: -79.3832 },
                map: mapInstance.current,
                title: "Toronto",
            });

            console.log("Map loaded!", mapInstance.current);
        };

        document.head.appendChild(script);

        return () => {
            document.head.removeChild(script);
        };
    }, []);

    return <div ref={mapRef} className="w-full h-[400px]" />;
};

export default Map;
