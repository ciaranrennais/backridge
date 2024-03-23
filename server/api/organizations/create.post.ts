import OrganizationModel from "~~/server/models/Organization.model";
import { OrganizationSchema } from "~~/server/validation";
import getNextSequence from "~~/server/db/getNextSequence";

export default defineEventHandler(async (event) => {
    // Get data form body

    const body = await readFormData(event);
    const organization = Object.fromEntries(body.entries());
    organization.orgID = await getNextSequence("organizations");

    // validate
    // let { value, error } = OrganizationSchema.validate(body);
    // if (error) {
    //         throw createError({
    //                 message: error.message.replace(/"/g, ""),
    //                 statusCode: 400,
    //                 fatal: false,
    //         });
    // }

    // create organization
    try {
        await OrganizationModel.create(organization);
        return { message: "Organization created" };
    } catch (e) {
        throw createError({
            message: e.message,
        });
    }
});
