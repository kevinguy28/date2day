import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldSet,
} from "@/components/ui/field";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Form = () => {
    const [textQuery, setTextQuery] = useState<string>("");
    const [places, setPlaces] = useState<any[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>("");

    const GOOGLE_PLACES_API_URL =
        "https://places.googleapis.com/v1/places:searchText";

    const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_KEY!;

    const submitQuery = async (query: string): Promise<void> => {
        if (!query.trim()) return;
        setLoading(true);
        setError("");
        setPlaces([]);

        try {
            const response = await fetch(GOOGLE_PLACES_API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-Goog-Api-Key": API_KEY,
                    "X-Goog-FieldMask":
                        "places.id,places.displayName,places.formattedAddress",
                },
                body: JSON.stringify({
                    textQuery: query,
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error ${response.status}`);
            }

            const data = await response.json();
            console.log(data);
            setPlaces(data.places || []);
        } catch (err) {
            console.error("Error fetching place details:", err);
            setError("Failed to fetch place details.");
        } finally {
            setLoading(false);
        }
    };

    // ---- Handle form submission ----
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        submitQuery(textQuery);
    };

    return (
        <div className="w-full max-w-md space-y-4">
            <form onSubmit={handleSubmit}>
                <FieldSet>
                    <FieldGroup>
                        <Field>
                            <FieldLabel htmlFor="textSearch">
                                Text Search
                            </FieldLabel>
                            <Input
                                id="textSearch"
                                type="text"
                                placeholder="Toronto, Ontario"
                                value={textQuery}
                                onChange={(e) =>
                                    setTextQuery(e.currentTarget.value)
                                }
                            />
                            <FieldDescription>
                                Input the name or type of a business.
                            </FieldDescription>
                        </Field>
                    </FieldGroup>
                    <Button
                        type="submit"
                        disabled={loading}
                        className="mt-2 hover:bg-white hover:text-black"
                    >
                        {loading ? "Searching..." : "Submit"}
                    </Button>
                </FieldSet>
            </form>

            {/* ---- Display Results ---- */}
            {error && <p className="text-red-500">{error}</p>}

            {places.length > 0 && (
                <div className="space-y-3 mt-4">
                    <h2 className="text-lg font-semibold">Results:</h2>
                    <ul className="space-y-2">
                        {places.map((place, index) => (
                            <li
                                key={index}
                                className="p-3 bg-gray-800 rounded-lg border border-gray-700"
                            >
                                <p className="font-medium text-white">
                                    {place.displayName?.text}
                                </p>
                                <p className="text-gray-400 text-sm">
                                    {place.formattedAddress}
                                </p>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Form;
