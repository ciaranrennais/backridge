import mongoose from "mongoose";

// consent schema
const schema: mongoose.Schema = new mongoose.Schema(
    {
        collectionManner: {
            type: String,
            required: true
        },
        revocationManner: {
            type: String,
            required: true
        },
        daysValid: {
            type: Number,
            required: true
        }
    },
    { timestamps: true, strictPopulate: false }
);

// consent model
export default mongoose.model("Consent", schema);
