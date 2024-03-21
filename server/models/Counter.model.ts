import mongoose from "mongoose";

// counter schema
const schema: mongoose.Schema = new mongoose.Schema(
    {
        entity: {
            type: String,
            required: true,
        },
        seqNumber: {
            type: Number,
            required: true
        }
    },
    { timestamps: true, strictPopulate: false }
);

// counter model
export default mongoose.model("Counter", schema);
