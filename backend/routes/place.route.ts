import express from "express";
import {
    getPlaces,
    getPlacesId,
    postPlaces,
    putPlacesId,
    deletePlacesId,
} from "../controllers/places.controller.ts";

const router = express.Router();

router.get("/", getPlaces);
router.get("/:id", getPlacesId);
router.post("/", postPlaces);
router.put("/:id", putPlacesId);
router.delete("/:id", deletePlacesId);

export default router;
