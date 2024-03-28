<template>

    <div v-if="!page.showForm">

        <div class="form-section-title">Basic Information</div>
        <table class="table-fixed backridge-table">
            <tbody>
                <tr class="table-row">
                    <td class="font-bold w-48">Name</td>
                    <td>{{ activity.name }}</td>
                </tr>
                <tr class="table-row">
                    <td class="font-bold">Legal Basis of Processing</td>
                    <td>{{ activity.legality }}</td>
                </tr>
                <tr class="table-row">
                    <td class="font-bold">Description</td>
                    <td>{{ activity.description }}</td>
                </tr>
                <tr class="table-row">
                    <td class="font-bold">Categories of people</td>
                    <td>{{ activity.personCategories.join(', ') }}</td>
                </tr>
                <tr class="table-row">
                    <td class="font-bold">Transfer to Organizations</td>
                    <td>{{ activity.otherOrganizations.map((x) => x.name).join(', ') }}</td>
                </tr>
                <tr class="table-row">
                    <td class="font-bold">Expiry Date</td>
                    <td>{{ new Date(activity.expiryDate).toLocaleDateString("fr-CH") }}</td>
                </tr>
                <tr class="table-row">
                    <td class="font-bold">Last Update</td>
                    <td>{{ new Date(activity.updatedAt).toLocaleDateString("fr-CH") }}</td>
                </tr>
            </tbody>
        </table>

        <div v-if="activity.legality=='Consent'" class="form-section-title">Consent Explanation</div>
        <table v-if="activity.legality=='Consent'" class="table-fixed backridge-table">
            <tbody>
                <tr class="table-row">
                    <td class="font-bold w-48">How Consent was obtained</td>
                    <td>{{ activity.consentDetails.collectionManner }}</td>
                </tr>
                <tr class="table-row">
                    <td class="font-bold">How Consent was obtained</td>
                    <td>{{ activity.consentDetails.revocationManner }}</td>
                </tr>
                <tr class="table-row">
                    <td class="font-bold">Duration of Consent in Days</td>
                    <td>{{ activity.consentDetails.daysValid }}</td>
                </tr>
            </tbody>
        </table>

        <div class="form-section-title">Status</div>
        <table class="table-fixed backridge-table">
            <tbody>
                <tr class="table-row">
                    <td class="font-bold w-48">International Transfer Status</td>
                    <td>
                        <span v-if="transferStatus.warnings.length==0">No issues for international data transfer</span>
                        <span class="warning" v-for="warning in transferStatus.warnings">{{ warning }}</span>
                    </td>
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

 const transferStatus = internationalTransferStatus(activity._value)

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
