import OrganizationModel from "~~/server/models/Organization.model";
import { OrganizationSchema } from "~~/server/validation";
import getNextSequence from "~~/server/db/getNextSequence";

export default defineEventHandler(async (event) => {
    // Get data form body

    const body = await readFormData(event);
    const organization = Object.fromEntries(body.entries());

    // validate
    // let { value, error } = OrganizationSchema.validate(body);
    // if (error) {
    //         throw createError({
    //                 message: error.message.replace(/"/g, ""),
    //                 statusCode: 400,
    //                 fatal: false,
    //         });
    // }

    // update organization
    try {
        await OrganizationModel.findByIdAndUpdate(organization._id, organization);
        return { message: "Organization updated" };
    } catch (e) {
        throw createError({
            message: e.message,
        });
    }
});
