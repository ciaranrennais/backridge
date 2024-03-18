import mongoose from "mongoose";

// person schema
const schema: mongoose.Schema = new mongoose.Schema(
    {
        firstname: {
            type: String,
            required: true,
        },
        lastname: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
    },
    { timestamps: true, strictPopulate: false }
);

// author model
export default mongoose.model("Person", schema);
