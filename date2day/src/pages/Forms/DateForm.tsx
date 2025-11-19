import {
    Field,
    FieldDescription,
    FieldGroup,
    FieldLabel,
    FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";

import { APIProvider, AdvancedMarker, Map } from "@vis.gl/react-google-maps";

import MapView from "./MapView";

const DateForm = () => {
    interface Places {
        id: string;
        location: google.maps.LatLngLiteral;
        displayName: {
            text: string;
            languageCode: string;
        };
    }
    const [queryName, setQueryName] = useState<string>("");
    const [dateName, setDateName] = useState<string>("");
    const [places, setPlaces] = useState<any[]>([]); // List of Places from query search
    const [datePlaces, setDatePlaces] = useState<any[]>([]); // Places added to Date
    const [description, setDescription] = useState<string>("");
    const [timer, setTimer] = useState<NodeJS.Timeout | null>(null);
    const [previewDate, setPreviewDate] = useState<boolean>(false);

    const GOOGLE_PLACES_API_URL =
        "https://places.googleapis.com/v1/places:searchText";

    const API_KEY = import.meta.env.VITE_GOOGLE_MAPS_KEY!;

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setQueryName(e.target.value);

        if (timer) clearTimeout(timer);

        const newTimer = setTimeout(() => {
            if (e.target.value.trim() !== "") {
                runPlacesSearch(e.target.value);
            }
        }, 1000);

        setTimer(newTimer);
    };

    const runPlacesSearch = async (text: string) => {
        try {
            const response = await fetch(GOOGLE_PLACES_API_URL, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "X-Goog-Api-Key": API_KEY,
                    "X-Goog-FieldMask":
                        "places.id,places.displayName,places.formattedAddress,places.location,",
                },
                body: JSON.stringify({ textQuery: text }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error ${response.status}`);
            }

            const data = await response.json();
            console.log(data);

            setPlaces(data.places ?? []);
        } catch (err) {
            console.error("Error fetching place details:", err);
        }
    };

    const submitDate = async (e: React.MouseEvent) => {
        e.preventDefault();
        setPreviewDate((prev) => !prev);
    };

    return (
        <div className="w-full max-w-4/5 space-y-4 bg-card p-4 mt-4 rounded-sm flex gap-4 mx-auto max-h-200">
            <form className="w-1/3">
                <FieldSet>
                    <FieldGroup>
                        <Field>
                            <FieldLabel htmlFor="textSearch">
                                Enter a name for your Date.
                            </FieldLabel>
                            <Input
                                id="textSearch"
                                type="text"
                                placeholder="Kevin's miraculous date!"
                                onChange={(e) =>
                                    setDateName(e.currentTarget.value)
                                }
                            />
                            <FieldDescription>
                                Input the name of the date.
                            </FieldDescription>
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="textSearch">
                                Enter a Description for your date.
                            </FieldLabel>
                            <Input
                                id="textSearch"
                                type="text"
                                placeholder="A magical journey through out the many wonders of Toronto!"
                                onChange={(e) =>
                                    setDescription(e.currentTarget.value)
                                }
                            />
                            <FieldDescription>
                                Write a description for the date.
                            </FieldDescription>
                        </Field>
                        <Field>
                            <FieldLabel htmlFor="textSearch">
                                Search for a Place!
                            </FieldLabel>
                            <Input
                                id="textSearch"
                                type="text"
                                placeholder="Yorkdale Mall"
                                onChange={handleInputChange}
                            />
                            <FieldDescription>
                                Search and add a Place to your Date.
                            </FieldDescription>
                            <FieldLabel>Date Places:</FieldLabel>
                            <div className="mt-4 flex flex-col gap-4">
                                {datePlaces.map((p) => (
                                    <div
                                        key={p.id}
                                        className="p-2 bg-blue-900 rounded"
                                    >
                                        <p className="font-medium text-white">
                                            {p.displayName?.text}
                                        </p>
                                        <p className="text-gray-400 text-sm">
                                            {p.formattedAddress}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </Field>
                    </FieldGroup>

                    <Button
                        type="submit"
                        className="mt-2 hover:bg-white hover:text-black"
                        onClick={(e) => submitDate(e)}
                    >
                        Submit
                    </Button>
                </FieldSet>
            </form>
            <div className="w-2/3 bg-blue-400 ">
                {!previewDate && (
                    <MapView places={places} setDatePlaces={setDatePlaces} />
                )}
                {previewDate && (
                    <MapView
                        places={datePlaces}
                        setDatePlaces={setDatePlaces}
                    />
                )}
            </div>
        </div>
    );
};

export default DateForm;
