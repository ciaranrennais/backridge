<template>

    <div>
        <h2 class="capitalize"><span class="capitalize">Organizations</span></h2>
        <div>
            <div class="grid grid-cols-4 gap-5">
                <div v-for="o in organizations">
                    <NuxtLink :to="`/activities/organizations/${o.orgID}`">{{ o.name }} ({{ o.countryISOCode }}) </NuxtLink>
                </div>
            </div>
        </div>
    </div>

</template>

<script setup>
 definePageMeta({
     layout: 'activities'
 })

 const { data: organizations } = await useFetch('/api/organizations')
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
