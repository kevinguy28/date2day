import mongoose from "mongoose";

const PlaceSchema = new mongoose.Schema(
    {
        displayName: {
            type: String,
            required: [true, "Please enter product name"],
        },

        location: {
            lat: {
                type: Number,
                required: true,
            },

            lng: {
                type: Number,
                required: true,
            },
        },
    },
    { timestamps: true }
);

const Place = mongoose.model("Place", PlaceSchema);

export default Place;
