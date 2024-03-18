import PersonModel from "~~/server/models/Person.model";

export default defineEventHandler(async (event) => {
    // return all people
    const { id } = event.context.params;
    return await PersonModel.findOne({"personID": id});
});
