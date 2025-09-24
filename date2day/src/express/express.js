import express from "express";
import passport from "passport";
import User from "../mongoose/models/user";

const router = express.Router();

router.post("/signup", async (req, res) => {
    const { email, password, name } = req.body;

    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "Email already in use" });

    const hash = await bycrypt.hash(password, 10);
    user = await User.create({ email, passwordHash: hash, name });
    res.json(user);
});

router.post("/login", passport.authenticate("local"), (req, res) => {
    res.json(req.user);
});

router.get(
    "/auth/google",
    passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
    "/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/login" }),
    (req, res) => {
        // Redirect to frontend after success
        res.redirect("http://localhost:5173/home");
    }
);

export default router;
