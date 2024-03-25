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
            <button class="btn" @click="addOrganization($event, page)" id="addOrganizationButton">Add Organization</button>
        </div>

        <div class="mt-5">
            <FormsOrganizationForm v-if="page.showForm" :organization=null :isUpdate=false :people=people />
        </div>

    </div>

</template>

<script setup>
 import { FormsOrganizationForm } from '#components'

 definePageMeta({
     layout: 'activities'
 })

 const { data: organizations } = await useFetch('/api/organizations')
 const { data: people } = await useFetch('/api/persons')

</script>

<script>
 import useToast from "/components/useToast";

 export default {
     name: 'organizationForm',
     data() {
         return { page: { showForm : false } }
     }
 }

 export function addOrganization(event, page) {
     page.showForm = !page.showForm;
     let button = event.target;
     if ( !page.showForm ) {
         button.innerText = "Add Organization";
         button.classList.remove('btn-warning');
         button.classList.add('btn');
         /* this.form.name = this.form.country = "";
          * this.form.contactPerson = null; */
     } else {
         button.innerText = "Cancel";
         button.classList.remove('btn');
         button.classList.add('btn-warning');
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
