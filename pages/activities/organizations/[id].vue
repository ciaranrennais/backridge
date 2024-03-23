<template>
    <div v-if="!form.showForm">
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
        <form @submit.prevent="submitForm(organization)" id="organizationForm" v-if="form.showForm" class="flex space-x-4">
            <input v-model="organization.name" type="text" name="name" placeholder="Name" required></input>
            <select v-model="organization.country" name="country" required>
                <option v-for="country in countries">{{ country }}</option>
            </select>
            <select v-model="organization.contactPerson" name="contactPerson" required>
                <option v-for="p in people" v-bind:value="p" v-bind:selected="organization.contactPerson" required>{{ p.firstname }} {{ p.lastname }}</option>
            </select>
            <button type="submit" class="btn">Update</button>
        </form>
    </div>

    <div class="flex space-x-4 mt-5">
        <button class="btn-warning" @click="editOrganization" id="editOrganizationButton">Edit Organization</button>
        <button v-if="!form.showForm" type="button" class="btn-danger" @click="deleteOrganization($event, organization._id)">Delete</button>

        <NuxtLink v-if="!form.showForm" class="btn" to="/activities/organizations">Back</NuxtLink>
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

 export async function deleteOrganization(event, organization_id) {
     if ( confirm('Are you sure?') ) {
         await useFetch(`/api/organizations/${organization_id}`, {
             method: 'DELETE'
         }).catch((e) => {
             console.log(e.data.message);
         }).then(async (data) => {
             navigateTo('/activities/organizations')
         });
     }
 }

 export default {
     name: 'organizationForm',
     data() {
         return {
             form: {
                 showForm: false
             }
         };
     },
     methods: {
         submitForm: async function(organization) {
             const formData = new FormData();
             const { id } = useRoute().params
             for (let [key, value] of Object.entries(this.form)) {
                 formData.append(key, value);
             }
             await useFetch(`/api/organizations/${id}`, {
                 method: 'PUT',
                 body: organization//formData
             }).catch((e) => {
                 console.log("ERROR", e.data.message);
             }).then(async (data) => {
                 reloadNuxtApp()
             });
         },
         editOrganization: function() {
             this.form.showForm = !this.form.showForm;
             let button = document.getElementById("editOrganizationButton");
             if ( !this.form.showForm ) {
                 button.textContent = "Edit Organization";
             } else {
                 button.textContent = "Cancel";
             }
         },
         fullname: function(p) {
             return p.firstname + " " + p.lastname;
         }
     }
 }
</script>
