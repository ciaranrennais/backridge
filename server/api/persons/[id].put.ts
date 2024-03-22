import PersonModel from "~~/server/models/Person.model";
import { PersonSchema } from "~~/server/validation";
import getNextSequence from "~~/server/db/getNextSequence";

export default defineEventHandler(async (event) => {
    // Get data form body

    const person = await readBody(event);
    const id = event.context.params.id;

    // validate
    // let { value, error } = PersonSchema.validate(body);
    // if (error) {
    //         throw createError({
    //                 message: error.message.replace(/"/g, ""),
    //                 statusCode: 400,
    //                 fatal: false,
    //         });
    // }

    // update person
    try {
        await PersonModel.findByIdAndUpdate(person._id, person);
        return { message: "Person updated" };
    } catch (e) {
        throw createError({
            message: e.message,
        });
    }
});
