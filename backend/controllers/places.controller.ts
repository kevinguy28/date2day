import type { Request, Response } from "express";

import Place from "../models/place.model.ts";

export const getPlaces = async (req: Request, res: Response) => {
    try {
        const places = await Place.find({});
        console.log("sssss");
        res.status(200).json(places);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
        console.log("Error: " + error);
    }
};

export const getPlacesId = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const place = await Place.findById(id);
        res.status(200).json(place);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
        console.log("Error: " + error);
    }
};
export const postPlaces = async (req: Request, res: Response) => {
    try {
        console.log("hello");
        const place = await Place.create(req.body);
        res.status(200).json(place);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
        console.log("Error: " + error);
    }
};

export const putPlacesId = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const place = await Place.findByIdAndUpdate(id, req.body);

        if (!place) {
            return res.status(404).json({ message: "Place not found" });
        }

        const updatedPlace = await Place.findById(id);
        res.status(200).json(updatedPlace);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};

export const deletePlacesId = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deleteProduct = await Place.findByIdAndDelete(id);

        if (!deleteProduct) {
            return res.status(404).json({ message: "Place not found" });
        }
        res.status(200).json({ message: "Place deleted" });
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }
};
