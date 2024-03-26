<template>
    <form @submit.prevent="submitForm" id="activityForm" class="border-4 grid gird-cols-1 gap-5">

        <div class="form-group" v-tooltip="tooltip('name')">
            <label class="form-label">Activity Name</label>
            <input v-model="form.name" type="text" name="name" placeholder="Activity name" required></input>
        </div>

        <div class="form-group" v-tooltip="tooltip('description')">
            <label class="form-label">Description</label>
            <textarea v-model="form.description" class="w-full"
                      type="text" name="description"
                      :placeholder=descriptionPlaceholder required></textarea>
        </div>

        <div class="form-group" v-tooltip="tooltip('legalBasis')">
            <label class="form-label">Legal Basis of Processing</label>
            <select v-model="form.legality" required class="w-48">
                <option value="" disabled hidden>Legality of Processing</option>
                <option v-for="reason in legalReasons">{{ reason }}</option>
            </select>
        </div>

        <div class="form-group" v-tooltip="tooltip('personCategories')">
            <label class="form-label">Category of Person</label>
            <Multiselect v-model="form.personCategories"
                         :options="personCategoryOptions" mode="tags"/>
        </div>

        <div class="form-group" v-tooltip="tooltip('expiryDate')">
            <label class="form-label">Expiry date</label>
            <vue-date-picker v-model=form.expiryDate class="flex space-x-2"
                             :locale="fr" :enable-time-picker="false" :format="format" required />
        </div>

        <span><button type="submit" class="btn"> {{ isUpdate ? "Update" : "Create "}}</button></span>

    </form>
</template>

<script setup>
 import VueDatePicker from '@vuepic/vue-datepicker';
 import '@vuepic/vue-datepicker/dist/main.css'

 import { Tooltip } from 'floating-vue'

 const { activity, isUpdate } = defineProps(['activity', 'isUpdate'])

 const legalReasons = ['Consent', 'Legal Obligation', 'Legitimate Interest']

</script>

<script>
 import Multiselect from '@vueform/multiselect'

 const format = (date) => {
     const day = date.getDate();
     const month = date.getMonth() + 1;
     const year = date.getFullYear();

     return `Expiry Date: ${day}.${month}.${year}`;
 }

 const descriptionPlaceholder = "Describe briefly the nature of the activity";

 export default {
     name: 'activityForm',
     data() {
         let fields = ( !this.isUpdate ) ? {
             name: "",
             legality: "",
             descritpion: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus...",
             expiryDate: new Date()
         } : toRaw(this.activity);
         return {
             form: fields,
             personCategoryOptions: ['Employee', 'Supplier', 'Client',
                                     'Prospect', 'Share-holder', 'Association member', 'Other']
         };
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

 const tooltips = {
     name: "Give a meaningful name for the activity",
     description: "A short description of what this activity is, and why it is important for your organization",
     legalBasis: 'What is the legal basis for processing this data?',
     personCategories: 'Specify the categories of people whose data you process in this activity',
     expiryDate: 'What is the data after which you must delete this personal data'
 }
 export function tooltip(field) {
     return tooltips[field];
 }
</script>

<style src="@vueform/multiselect/themes/default.css"></style>
