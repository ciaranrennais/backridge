import ActivityModel from "~~/server/models/Activity.model";
import { ActivitySchema } from "~~/server/validation";
import getNextSequence from "~~/server/db/getNextSequence";

export default defineEventHandler(async (event) => {
    // Get data form body

    const body = await readFormData(event);
    const activity = Object.fromEntries(body.entries());

    console.log("Activity = ", activity);
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
        await ActivityModel.findByIdAndUpdate(activity._id, activity);
        return { message: "Activity updated" };
    } catch (e) {
        throw createError({
            message: e.message,
        });
    }
});
