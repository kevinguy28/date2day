import { response, type Request, type Response } from "express";

import DateEvent from "../models/date.model.ts";

export const getDateEvent = async (req: Request, res: Response) => {
    try {
        const dateEvent = await DateEvent.find({}).populate("places");
        console.log(dateEvent);
        res.status(200).json(dateEvent);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
        console.log("Error: " + error);
    }
};

export const getDateEventId = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const dateEvent = await DateEvent.findById(id);
        res.status(200).json(dateEvent);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
        console.log("Error: " + error);
    }
};

export const postDateEvent = async (req: Request, res: Response) => {
    try {
        console.log("saasasaBB");
        const dateEvent = await DateEvent.create(req.body);
        res.status(200).json(dateEvent);
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
        console.log("Error: " + error);
    }
};

export const deleteDateEventId = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const deleteProduct = await DateEvent.findByIdAndDelete(id);

        if (!deleteProduct) {
            return res.status(404).json({ message: "Place not found" });
        }
        res.status(200).json({ message: "Place deleted" });
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
        console.log("Error: " + error);
    }
};
