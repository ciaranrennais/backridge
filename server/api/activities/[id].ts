import ActivityModel from "~~/server/models/Activity.model";

export default defineEventHandler(async (event) => {
    // return all people
    const { id } = event.context.params;
    let activity = await ActivityModel.findOne({"activityID": id}).populate('otherOrganizations');
    console.log(activity);
    return activity;
});
