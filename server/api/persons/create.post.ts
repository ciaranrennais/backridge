import PersonModel from "~~/server/models/Person.model";
import { PersonSchema } from "~~/server/validation";
import getNextSequence from "~~/server/db/getNextSequence";

export default defineEventHandler(async (event) => {
    // Get data form body

    const body = await readFormData(event);
    const person = Object.fromEntries(body.entries());
    person.personID = await getNextSequence("persons");

    // validate
    // let { value, error } = PersonSchema.validate(body);
    // if (error) {
    //         throw createError({
    //                 message: error.message.replace(/"/g, ""),
    //                 statusCode: 400,
    //                 fatal: false,
    //         });
    // }

    // create person
    try {
        await PersonModel.create(person);
        return { message: "Person created" };
    } catch (e) {
        throw createError({
            message: e.message,
        });
    }
});
