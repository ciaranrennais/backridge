<template>
    <div>
        <h2>{{ organization.name }}</h2>
        <p>{{ organization.countryISOCode }}</p>
        <h2>Contact Person</h2>
        <p>{{ contact.firstname }} {{ contact.lastname }}</p>
        <p>{{ contact.email }}</p>
    </div>
    <div>
        <NuxtLink class="btn" to="/activities/organizations">Back</NuxtLink>
    </div>
</template>

<script setup>
 const { id } = useRoute().params
 const uri = '/api/organizations/' + id

 var contact;
 //  fetch the products
 const { data: organization } = await useFetch(uri, { orgID: id }).then(() => {
     alert('OK')
 })
 
 if ( !organization.value ) {
     throw createError({ statusCode: 404, statusMessage: "Organization not found", fatal: true});
 }
 
 definePageMeta({
     layout: "activities",
 })
</script>
