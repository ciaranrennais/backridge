<template>

    <div>
        <h2>Persons</h2>
        <div>
            <div class="grid grid-cols-4 gap-5">
                <div v-for="p in people">
                    <NuxtLink :to="`/activities/persons/${p.personID}`">{{ p.firstname }} {{ p.lastname }}</NuxtLink>
                </div>
            </div>
        </div>
    </div>

</template>

<script setup>
 definePageMeta({
     layout: 'activities'
 })

 const { data: people } = await useFetch('/api/persons')
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
