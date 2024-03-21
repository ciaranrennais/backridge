import PersonModel from "~~/server/models/Person.model";
import { PersonSchema } from "~~/server/validation";

export default defineEventHandler(async (event) => {
        // Get id from params
        const id = event.context.params.id;

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
