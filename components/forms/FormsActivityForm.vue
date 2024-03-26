<template>
    <form @submit.prevent="submitForm" id="activityForm" class="border-4 grid gird-cols-1 gap-5">

        <div class="form-group">
            <label class="form-label">Activity Name</label>
            <input v-model="form.name" type="text" name="name" placeholder="Activity name" required></input>
        </div>

        <div class="form-group">
            <label class="form-label">Description</label>
            <textarea v-model="form.description" class="w-full" type="text" name="description" placeholder="Activity description" required></textarea>
        </div>

        <div class="form-group">
            <label class="form-label">Legal Basis of Processing</label>
            <select v-model="form.legality" required class="w-48">
                <option value="" disabled hidden>Legality of Processing</option>
                <option v-for="reason in legalReasons">{{ reason }}</option>
            </select>
        </div>

        <div class="form-group">
            <label class="form-label">Expiry date</label>
            <vue-date-picker v-model=form.expiryDate class="flex space-x-2" :locale="fr-CH" :enable-time-picker="false" :format="format" required />
        </div>

        <span><button type="submit" class="btn"> {{ isUpdate ? "Update" : "Create "}}</button></span>
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
             descritpion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus...",
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
