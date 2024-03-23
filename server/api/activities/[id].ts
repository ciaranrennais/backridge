import ActivityModel from "~~/server/models/Activity.model";

export default defineEventHandler(async (event) => {
    // return all people
    const { id } = event.context.params;
    return await ActivityModel.findOne({"activityID": id});
});
