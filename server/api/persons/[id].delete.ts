import PersonModel from "~~/server/models/Person.model";
import OrganizationModel from "~~/server/models/Organization.model";
import { PersonSchema } from "~~/server/validation";

export default defineEventHandler(async (event) => {
    // Get id from params
    const id = event.context.params.id;

    // Cannot remove a person who is contact point in an organization
    const orgs = await OrganizationModel.find( { contactPerson : id });

    if ( orgs.length > 0 )
        throw createError({
            message: "Person is contact point"
        });

    // Remove author
    try {
        await PersonModel.findByIdAndDelete(id);
        return { message: "Person removed" };
    } catch (e) {
        throw createError({
            message: e.message,
        });
    }
});
