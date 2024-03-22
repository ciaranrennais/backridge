<template>
    <div v-if="!form.showForm">
        <table class="w-1/4">
            <tbody>
                <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                    <td class="font-bold">First name</td>
                    <td>{{ person.firstname }}</td>
                </tr>
                <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                    <td class="font-bold">Last name</td>
                    <td>{{ person.lastname }}</td>
                </tr>
                <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                    <td class="font-bold">Email</td>
                    <td>{{ person.email}}</td>
                </tr>
            </tbody>
        </table>
    </div>

    <div>
        <form @submit.prevent="submitForm(person)" id="personForm" v-if="form.showForm" class="flex space-x-4">
            <input v-model="person.firstname" type="text" name="firstname" placeholder="First name" required></input>
            <input v-model="person.lastname" type="text" name="lastname" placeholder="Last name" required></input>
            <input v-model="person.email" type="email" name="email" placeholder="Enter email" required></input>
            <button type="submit" class="btn">Update</button>
        </form>
    </div>

    <div class="flex space-x-4 mt-5">
        <button class="btn-warning" @click="editPerson" id="editPersonButton">Edit Person</button>
        <button v-if="!form.showForm" type="button" class="btn-danger" @click="deletePerson($event, person._id)">Delete</button>

        <NuxtLink v-if="!form.showForm" class="btn" to="/activities/persons">Back</NuxtLink>
    </div>
</template>

<script setup>
 const { id } = useRoute().params
 const uri = '/api/persons/' + id

 //  fetch the products
 const { data: person } = await useFetch(uri, { personID: id })

 if ( !person.value ) {
     throw createError({ statusCode: 404, statusMessage: "Person not found", fatal: true});
 }

 definePageMeta({
     layout: "activities",
 })
</script>

<script>
 export async function deletePerson(event, person_id) {
     if ( confirm('Are you sure?') ) {
         await useFetch(`/api/persons/${person_id}`, {
             method: 'DELETE'
         }).catch((e) => {
             console.log(e.data.message);
         }).then(async (data) => {
             navigateTo('/activities/persons')
         });
     }
 }

 export default {
     name: 'personForm',
     data() {
         return {
             form: {
                 //firstname: person.firstname,
                 //lastname: person.lastname,
                 //email: person.email,
                 showForm: false
             }
         };
     },
     methods: {
         submitForm: async function(person) {
             const formData = new FormData();
             const { id } = useRoute().params
             for (let [key, value] of Object.entries(this.form)) {
                 formData.append(key, value);
             }
             await useFetch(`/api/persons/${id}`, {
                 method: 'PUT',
                 body: person//formData
             }).catch((e) => {
                 console.log("ERROR", e.data.message);
             }).then(async (data) => {
                 reloadNuxtApp()
             });
         },
         editPerson: function() {
             this.form.showForm = !this.form.showForm;
             let button = document.getElementById("editPersonButton");
             if ( !this.form.showForm ) {
                 button.textContent = "Edit Person";
             } else {
                 button.textContent = "Cancel";
             }
         }
     }
 }
</script>
