import PersonModel from "~~/server/models/Person.model";

export default defineEventHandler(async (event) => {
        // return all people
    return await PersonModel.find();
});
