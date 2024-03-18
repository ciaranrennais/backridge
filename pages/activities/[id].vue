<template>

    <div>
        <h2>Activity {{ id }}</h2>
    </div>

</template>

<script setup>
 const { id } = useRoute().params

 definePageMeta({
     layout: 'activities'
 })
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

