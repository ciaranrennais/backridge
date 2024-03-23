<template>

    <div>
        <h2 class="capitalize"><span class="capitalize">Organizations</span></h2>
        <div>
            <div class="grid grid-cols-4 gap-5">
                <div v-for="o in organizations">
                    <div class="box-border h-32 p-4 border-4">
                        <NuxtLink class="url" :to="`/activities/organizations/${o.orgID}`">{{ o.name }} ({{ o.country }}) </NuxtLink>
                        <p>Contact: {{ o.contactPerson.firstname }} {{ o.contactPerson.lastname }}</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="mt-5">
            <button class="btn" @click="addOrganization" id="addOrganizationButton">Add Organization</button>
        </div>

        <div class="mt-5">
            <form @submit.prevent="submitForm" id="organizationForm" v-if="form.showForm" class="flex space-x-4">
                <input v-model="form.name" type="text" name="name" placeholder="Name" required></input>
                <select v-model="form.country" required>
                    <option value="" disabled hidden>Country</option>
                    <option v-for="country in countries">{{ country }}</option>
                </select>
                <select v-model="form.contactPerson" required>
                    <option value="null" disabled hidden>Contact Person</option>
                    <option v-for="p in people" :value="p._id" required>{{ p.firstname }} {{ p.lastname }}</option>
                </select>
                <button type="submit" class="btn">Create</button>
            </form>
        </div>

    </div>

</template>

<script setup>
 definePageMeta({
     layout: 'activities'
 })

 const { data: organizations } = await useFetch('/api/organizations')
 const { data: people } = await useFetch('/api/persons')

 const countries = ['France', 'Germany', 'Ireland', 'Italy', 'Switzerland', 'United Kingdom', 'United States']

</script>

<script>
 import useToast from "/components/useToast";

 export default {
     name: 'organizationForm',
     data() {
         return {
             form: {
                 name: "",
                 country: "",
                 contactPerson: null,
                 showForm: false
             }
         };
     },
     methods: {
         submitForm: async function() {
             const formData = new FormData();
             for (let [key, value] of Object.entries(this.form)) {
                 formData.append(key, value);
             }
             console.log(formData);
             await useFetch('/api/organizations/create', {
                 method: 'POST',
                 body: formData
             }).catch((e) => {
                 useToast().error(e.data.message);
             }).then(async (data) => {
                 await reloadNuxtApp();
                 useToast().success('Organization created');
             });
         },
         addOrganization: function() {
             this.form.showForm = !this.form.showForm;
             let button = document.getElementById("addOrganizationButton");
             if ( !this.form.showForm ) {
                 button.textContent = "Add Organization";
                 button.classList.remove('btn-warning');
                 button.classList.add('btn');
                 this.form.name = this.form.country = "";
                 this.form.contactPerson = null;
             } else {
                 button.textContent = "Cancel";
                 button.classList.remove('btn');
                 button.classList.add('btn-warning');
             }
         }
     }
 }
</script>


<style scoped>
 h2 {
     margin-bottom: 20px;
     font-size: 36px;
 }
 p {
     margin: 20px 0;
 }
</style>
