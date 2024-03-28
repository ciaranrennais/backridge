import ActivityModel from "~~/server/models/Activity.model";
import ConsentModel from "~~/server/models/Consent.model";
import { ActivitySchema } from "~~/server/validation";
import getNextSequence from "~~/server/db/getNextSequence";

export default defineEventHandler(async (event) => {
    // Get data form body

    const body = await readFormData(event);
    const activity = Object.fromEntries(body.entries());
    activity.activityID = await getNextSequence("activities");
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

    // create activity
    try {
        const consent = await ConsentModel.create(JSON.parse(activity.consentDetails));
        activity.consentDetails = consent._id;
        await ActivityModel.create(activity);
        return { message: "Activity created" };
    } catch (e) {
        throw createError({
            message: e.message,
        });
    }
});
