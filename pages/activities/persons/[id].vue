<template>
    <div>
        <p>{{ person.firstname }}</p>
        <p>{{ person.lastname }}</p>
        <p>{{ person.email }}</p>
    </div>
    <NuxtLink class="btn" to="/activities/persons">Back</NuxtLink>
</template>

<script setup>
 const { id } = useRoute().params
 const uri = '/api/persons/' + id

 //  fetch the products
 const { data: person } = await useFetch(uri, { personID: id })

 definePageMeta({
     layout: "activities",
 })
</script>
