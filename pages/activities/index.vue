<template>

    <div>
        <h2>Activities</h2>

        <div>
            <div class="grid grid-cols-2 gap-5">
                <div v-for="a in activities">
                    <div class="box-border h-64 p-4 border-4">
                        <NuxtLink class="url" :to="`/activities/${a.activityID}`">{{ a.name }}</NuxtLink>
                        <p><span class="font-bold"> Legal Basis</span>: {{ a.legality }}</p>
                        <p>{{ a.description }}</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="mt-5">
            <button class="btn" @click="addActivity($event, page)" id="addActivityButton">Add Activity</button>
        </div>

        <div class="mt-5">
            <FormsActivityForm v-if="page.showForm" :activity=null :isUpdate=false />
        </div>

    </div>

</template>

<script setup>
 definePageMeta({
     layout: 'activities'
 })

 const { data: activities } = await useFetch('/api/activities')

</script>

<script>
 import useToast from "/components/useToast";

 export default {
     name: 'activityForm',
     data() {
         return { page: { showForm : false } }
     }
 }

 export function addActivity(event, page) {
     page.showForm = !page.showForm;
     let button = event.target;
     if ( !page.showForm ) {
         button.innerText = "Add Activity";
         button.classList.remove('btn-warning');
         button.classList.add('btn');
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
