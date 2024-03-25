<template>
    <div v-if="!page.showForm">
        <table class="w-1/4">
            <tbody>
                <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                    <td class="font-bold">Name</td>
                    <td>{{ organization.name }}</td>
                </tr>
                <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                    <td class="font-bold">Country</td>
                    <td>{{ organization.country }}</td>
                </tr>
                <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                    <td class="font-bold">Contact Person</td>
                    <td>{{ organization.contactPerson.firstname}} {{ organization.contactPerson.lastname}}</td>
                </tr>
            </tbody>
        </table>
    </div>

    <div>
        <FormsOrganizationForm v-if="page.showForm" :organization=organization :isUpdate=true :people="people" />
    </div>

    <div class="flex space-x-4 mt-5">
        <button class="btn-warning" @click="editOrganization($event, page)" id="editOrganizationButton">Edit Organization</button>
        <button v-if="!page.showForm" type="button" class="btn-danger" @click="deleteOrganization($event, organization._id)">Delete</button>

        <NuxtLink v-if="!page.showForm" class="btn" to="/activities/organizations">Back</NuxtLink>
    </div>
</template>

<script setup>
 const { id } = useRoute().params
 const uri = '/api/organizations/' + id

 //  fetch the products
 const { data: organization } = await useFetch(uri, { organizationID: id })

 if ( !organization.value ) {
     throw createError({ statusCode: 404, statusMessage: "Organization not found", fatal: true});
 }

 const { data: people } = await useFetch('/api/persons')

 const countries = ['France', 'Germany', 'Ireland', 'Italy', 'Switzerland', 'United Kingdom', 'United States']

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

 export async function deleteOrganization(event, organization_id) {
     if ( confirm('Are you sure?') ) {
         await useFetch(`/api/organizations/${organization_id}`, {
             method: 'DELETE'
         }).catch((e) => {
             useToast().error(e.data.message);
         }).then(async (res) => {
             if ( res.status.value.includes("success") ) {
                 navigateTo('/activities/organizations')
                 useToast().success("Organization removed");
             } else
                 useToast().error("Organization could not be removed");
         });
     }
 }

 export function editOrganization(event, page) {
     page.showForm = !page.showForm;
     if ( !page.showForm ) {
         event.target.innerText = "Edit Organization";
     } else {
         event.target.innerText = "Cancel";
     }
 }
</script>
