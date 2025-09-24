import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    passwordHash: String,
    googleId: String,
    name: String,
});

// Handles Serverless states to ensure we aren't overwriting models

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;
