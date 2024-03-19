import mongoose from "mongoose";

// organizational schema
const schema: mongoose.Schema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        countryISOCode: {
            type: String,
            required: true,
        },
        contactPerson: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Person"
        },
        orgID: {
            type: Number,
            required: true
        }
    },
    { timestamps: true, strictPopulate: false }
);

// author model
export default mongoose.model("Organization", schema);
