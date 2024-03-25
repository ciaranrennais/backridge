<template>
    <div v-if="!page.showForm">
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
        <FormsPersonForm v-if="page.showForm" :person=person :isUpdate=true />
    </div>

    <div class="flex space-x-4 mt-5">
        <button class="btn-warning" @click="editPerson($event, page)" id="editPersonButton">Edit Person</button>
        <button v-if="!page.showForm" type="button" class="btn-danger" @click="deletePerson($event, person._id)">Delete</button>

        <NuxtLink v-if="!page.showForm" class="btn" to="/activities/persons">Back</NuxtLink>
    </div>
</template>

<script setup>
 import { FormsPersonForm } from '#components'

 const { id } = useRoute().params
 const uri = '/api/persons/' + id

 //  fetch the list of people
 const { data: person } = await useFetch(uri, { personID: id })

 if ( !person.value ) {
     throw createError({ statusCode: 404, statusMessage: "Person not found", fatal: true});
 }

 definePageMeta({
     layout: "activities",
 })

</script>

<script>
 import useToast from "/components/useToast";

 export default {
     data() {
         return { page: { showForm : false } }
     }
 }

 export async function deletePerson(event, person_id) {
     if ( confirm('Are you sure?') ) {
         await useFetch(`/api/persons/${person_id}`, {
             method: 'DELETE'
         }).catch((e) => {
             useToast().error(e.data.message);
         }).then(async (res) => {
             if ( res.status.value.includes("success") ) {
                 navigateTo('/activities/persons')
                 useToast().success("Person removed");
             } else
                 useToast().error("Person could not be removed");
         });
     }
 }

 export function editPerson(event, page) {
     page.showForm = !page.showForm;
     if ( !page.showForm ) {
         event.target.innerText = "Edit Person";
     } else {
         event.target.innerText = "Cancel";
     }
 }
</script>
