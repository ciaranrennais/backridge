<template>
    <form @submit.prevent="submitForm" id="activityForm" class="flex space-x-4">
        <input v-model="form.name" type="text" name="name" placeholder="Activity name" required></input>
        <select v-model="form.legality" required>
            <option value="" disabled hidden>Legality of Processing</option>
            <option v-for="reason in legalReasons">{{ reason }}</option>
        </select>
        <vue-date-picker v-model=form.expiryDate class="flex space-x-2" :name="ABZ" :locale="fr-CH" :enable-time-picker="false" :format="format" required />
        <button type="submit" class="btn"> {{ isUpdate ? "Update" : "Create "}}</button>
    </form>
</template>

<script setup>
 import { ref } from 'vue';
 import VueDatePicker from '@vuepic/vue-datepicker';
 import '@vuepic/vue-datepicker/dist/main.css'

 const { activity, isUpdate } = defineProps(['activity', 'isUpdate'])

 const legalReasons = ['Consent', 'Legal Obligation', 'Legitimate Interest']

</script>

<script>

 const format = (date) => {
     const day = date.getDate();
     const month = date.getMonth() + 1;
     const year = date.getFullYear();

     return `Expiry Date: ${day}.${month}.${year}`;
 }

 export default {
     name: 'activityForm',
     data() {
         let fields = ( !this.isUpdate ) ? {
             name: "",
             legality: "",
             expiryDate: new Date()
         } : toRaw(this.activity);
         return { form: fields };
     },
     methods: {
         submitForm: async function() {
             const formData = new FormData();
             const { id } = useRoute().params
             for (let [key, value] of Object.entries(this.form)) {
                 formData.append(key, value);
             }
             if ( this.isUpdate ) {
                 await useFetch(`/api/activities/${id}`, {
                     method: 'PUT',
                     body: formData
                 }).catch((e) => {
                     useToast().error(e.data.message);
                 }).then(async (data) => {
                     reloadNuxtApp()
                 });
             } else {
                 await useFetch('/api/activities/create', {
                     method: 'POST',
                     body: formData
                 }).catch((e) => {
                     useToast().error(e.data.message);
                 }).then(async (data) => {
                     await reloadNuxtApp();
                     useToast().success('Person created');
                 });
             }
         }
     }
 }

</script>
