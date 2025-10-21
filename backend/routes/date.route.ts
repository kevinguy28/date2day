import {
    getDateEvent,
    getDateEventId,
    postDateEvent,
} from "../controllers/dates.controller.ts";

import express from "express";

const router = express.Router();

router.get("/", getDateEvent);
router.get("/:id", getDateEventId);
router.post("/", postDateEvent);

export default router;
