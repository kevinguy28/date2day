import {
    getDateEvent,
    getDateEventId,
    postDateEvent,
    deleteDateEventId,
} from "../controllers/dates.controller.ts";

import express from "express";

const router = express.Router();

router.get("/", getDateEvent);
router.get("/:id", getDateEventId);
router.post("/", postDateEvent);
router.delete("/:id", deleteDateEventId);

export default router;
