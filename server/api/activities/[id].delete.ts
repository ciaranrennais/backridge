import ActivityModel from "~~/server/models/Activity.model";
import { ActivitySchema } from "~~/server/validation";

export default defineEventHandler(async (event) => {
        // Get id from params
        const id = event.context.params.id;

        // Remove activity
        try {
                await ActivityModel.findByIdAndDelete(id);
                return { message: "Activity removed" };
        } catch (e) {
                throw createError({
                        message: e.message,
                });
        }
});
