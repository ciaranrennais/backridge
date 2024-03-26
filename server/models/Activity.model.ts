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
        description: {
            type: String,
            required: true,
        },
        personCategories: [ { type: String } ],
        activityID: {
            type: Number,
            required: true
        },
        otherOrganizations:[ {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Organization"
        }],
    },
    { timestamps: true, strictPopulate: false }
);

// author model
export default mongoose.model("Activity", schema);
