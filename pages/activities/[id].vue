<template>
    <div v-if="!page.showForm">
        <table class="w-1/2">
            <tbody>
                <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                    <td class="font-bold">Name</td>
                    <td>{{ activity.name }}</td>
                </tr>
                <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                    <td class="font-bold">Legal Basis of Processing</td>
                    <td>{{ activity.legality }}</td>
                </tr>
                <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                    <td class="font-bold">Description</td>
                    <td>{{ activity.description }}</td>
                </tr>
                <tr class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                    <td class="font-bold">Expiry Date</td>
                    <td>{{ new Date(activity.expiryDate).toLocaleDateString("fr-CH") }}</td>
                </tr>
            </tbody>
        </table>
    </div>

    <div>
        <FormsActivityForm v-if="page.showForm" :activity=activity :isUpdate=true />
    </div>

    <div class="flex space-x-4 mt-5">
        <button class="btn-warning" @click="editActivity($event, page)" id="editActivityButton">Edit Activity</button>
        <button v-if="!page.showForm" type="button" class="btn-danger" @click="deleteActivity($event, activity._id)">Delete</button>

        <NuxtLink v-if="!page.showForm" class="btn" to="/activities">Back</NuxtLink>
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

<script>
 import useToast from "/components/useToast";

 export default {
     data() {
         return { page: { showForm : false } }
     }
 }

 export async function deleteActivity(event, activity_id) {
     if ( confirm('Are you sure?') ) {
         await useFetch(`/api/activities/${activity_id}`, {
             method: 'DELETE'
         }).catch((e) => {
             useToast().error(e.data.message);
         }).then(async (res) => {
             if ( res.status.value.includes("success") ) {
                 navigateTo('/activities')
                 useToast().success("Activity removed");
             } else
                 useToast().error("Activity could not be removed");
         });
     }
 }

 export function editActivity(event, page) {
     page.showForm = !page.showForm;
     if ( !page.showForm ) {
         event.target.innerText = "Edit Activity";
     } else {
         event.target.innerText = "Cancel";
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
