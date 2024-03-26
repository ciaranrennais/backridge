import ActivityModel from "~~/server/models/Activity.model";

export default defineEventHandler(async (event) => {
    // return all activities
    return await ActivityModel.find().populate('otherOrganizations').sort( {name: 'asc' } ).exec();
});
