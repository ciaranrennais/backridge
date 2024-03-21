<template>
    <div>
        <h2>{{ organization.name }}</h2>
        <p>{{ organization.countryISOCode }}</p>
        <h2>Contact Person</h2>
        <p>{{ organization.contactPerson.firstname }} {{ organization.contactPerson.lastname }}</p>
        <p>{{ organization.contactPerson.email }}</p>
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
 const { data: organization } = await useFetch(uri, { orgID: id })
 
 if ( !organization.value ) {
     throw createError({ statusCode: 404, statusMessage: "Organization not found", fatal: true});
 }
 
 definePageMeta({
     layout: "activities",
 })
</script>
