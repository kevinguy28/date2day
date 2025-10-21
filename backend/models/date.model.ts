import mongoose from "mongoose";

const DateSchema = new mongoose.Schema(
    {
        title: { type: String, required: true },

        description: String,

        places: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Place",
            },
        ],
    },
    { timestamps: true }
);

const DateEvent = mongoose.model("DateEvent", DateSchema);
export default DateEvent;
