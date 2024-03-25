<template>

    <div>
        <h2>Persons</h2>
        <div>
            <div class="grid grid-cols-4 gap-5">
                <div v-for="p in people">
                    <div class="box-border h-32 p-4 border-4">
                        <NuxtLink class="url" :to="`/activities/persons/${p.personID}`">{{ p.firstname }} {{ p.lastname }}</NuxtLink>
                        <p>{{ p.email }}</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="mt-5">
            <button class="btn" @click="addPerson($event, page)" id="addPersonButton">Add Person</button>
        </div>

        <div class="mt-5">
            <FormsPersonForm v-if="page.showForm" :person=null :isUpdate=false />
        </div>
    </div>

</template>

<script setup>
 import { FormsPersonForm } from '#components'

 Definepagemeta({
     layout: 'activities'
 })

 const { data: people } = await useFetch('/api/persons')
</script>

<script>
 import useToast from "/components/useToast";

 export default {
     name: 'personForm',
     data() {
         return { page: { showForm : false } }
     }
 }

 export function addPerson(event, page) {
     page.showForm = !page.showForm;
     let button = event.target;
     if ( !page.showForm ) {
         button.innerText = "Add Person";
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
