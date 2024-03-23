<template>

    <div>

        <table class="w-1/4">
            <tbody>
                <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                    <td class="font-bold">Name</td>
                    <td>{{ activity.name }}</td>
                </tr>
                <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                    <td class="font-bold">Last name</td>
                    <td>{{ activity.legality }}</td>
                </tr>
                <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                    <td class="font-bold">Expiry Date</td>
                    <td>{{ activity.expiryDate}}</td>
                </tr>
            </tbody>
        </table>
    </div>

</template>

<script setup>
 const { id } = useRoute().params
 const uri = '/api/activities/' + id

 //  fetch the list of people
 const { data: activity } = await useFetch(uri, { activityID: id })

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
