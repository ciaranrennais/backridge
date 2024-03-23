<template>

    <div>
        <h2>Activities</h2>

        <div>
            <div class="grid grid-cols-4 gap-5">
                <div v-for="a in activities">
                    <div class="box-border h-32 p-4 border-4">
                        <NuxtLink class="url" :to="`/activities/${a.activityID}`">{{ a.name }}</NuxtLink>
                        <p>{{ a.legality }}</p>
                        <p>{{ new Date(a.expiryDate).toLocaleDateString("fr-CH") }}</p>
                    </div>
                </div>
            </div>
        </div>

    </div>

</template>

<script setup>
 definePageMeta({
     layout: 'activities'
 })

 const { data: activities } = await useFetch('/api/activities')

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
