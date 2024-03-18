import OrganizationModel from "~~/server/models/Organization.model";

export default defineEventHandler(async (event) => {
        // return all people
    return await OrganizationModel.find();
});
