import OrganizationModel from "~~/server/models/Organization.model";
import { OrganizationSchema } from "~~/server/validation";

export default defineEventHandler(async (event) => {
        // Get id from params
        const id = event.context.params.id;

        // Remove organization
        try {
                await OrganizationModel.findByIdAndDelete(id);
                return { message: "Organization removed" };
        } catch (e) {
                throw createError({
                        message: e.message,
                });
        }
});
