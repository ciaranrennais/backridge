<template>
    <div>
        <p>{{ person.firstname }}</p>
        <p>{{ person.lastname }}</p>
        <p>{{ person.email }}</p>
        <button type="button" class="btn-danger" @click="deletePerson($event, person._id)">Delete</button>
    </div>
    <NuxtLink class="btn" to="/activities/persons">Back</NuxtLink>
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
             console.log("ERROR", e.data.message);
         }).then(async (data) => {
             navigateTo('/activities/persons')
         });
     }
 }
</script>
