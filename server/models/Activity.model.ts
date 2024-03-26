import mongoose from "mongoose";

// person schema
const schema: mongoose.Schema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        legality: {
            type: String,
            required: true,
        },
        expiryDate: {
            type: Date,
            required: true,
        },
        activityID: {
            type: Number,
            required: true
        }
    },
    { timestamps: true, strictPopulate: false }
);

// author model
export default mongoose.model("Activity", schema);