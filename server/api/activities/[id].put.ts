import ActivityModel from "~~/server/models/Activity.model";
import ConsentModel from "~~/server/models/Consent.model";
import { ActivitySchema } from "~~/server/validation";
import getNextSequence from "~~/server/db/getNextSequence";
import mongoose from "mongoose";

export default defineEventHandler(async (event) => {
    // Get data form body

    const body = await readFormData(event);
    const activity = Object.fromEntries(body.entries());

    const consent = JSON.parse(activity.consentDetails);
    activity.consentDetails = new mongoose.Types.ObjectId(consent._id);

    activity.personCategories = activity.personCategories.split(',');
    activity.otherOrganizations = ( activity.otherOrganizations.length === 0 ) ? [] : activity.otherOrganizations.split(',');


    // validate
    // let { value, error } = ActivitySchema.validate(body);
    // if (error) {
    //         throw createError({
    //                 message: error.message.replace(/"/g, ""),
    //                 statusCode: 400,
    //                 fatal: false,
    //         });
    // }

    // update activity
    try {
        await ConsentModel.findByIdAndUpdate(consent._id, consent);
        await ActivityModel.findByIdAndUpdate(activity._id, activity);
        return { message: "Activity updated" };
    } catch (e) {
        throw createError({
            message: e.message,
        });
    }
});
