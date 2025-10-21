import { response, type Request, type Response } from "express";

import DateEvent from "../models/date.model.ts";

export const getDateEvent = async (req: Request, res: Response) => {
    try {
        const dateEvent = await DateEvent.find({});
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
