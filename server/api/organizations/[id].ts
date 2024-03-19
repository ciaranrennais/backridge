import OrganizationModel from "~~/server/models/Organization.model";

export default defineEventHandler(async (event) => {
    // return all people
    const { id } = event.context.params;
    return await OrganizationModel.findOne({"orgID": id}).populate('contactPerson').exec();
});
