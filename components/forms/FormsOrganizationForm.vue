<template>
    <form @submit.prevent="submitForm" id="organizationForm" class="flex space-x-4">
        <input v-model="form.name" type="text" name="name" placeholder="Name" required></input>
        <select v-model="form.country" required>
            <option value="" disabled hidden>Country</option>
            <option v-for="country in countries">{{ country }}</option>
        </select>
        <select v-model="form.contactPerson" class="form-select" required>
            <option v-if=!isUpdate value="null" disabled hidden>Contact Person</option>
            <option v-for="p in people" :value="p" required>{{ p.firstname }} {{ p.lastname }}</option>
        </select>
        <button type="submit" class="btn">{{ isUpdate ? "Update" : "Create "}}</button>
    </form>
</template>

<script setup>
 const { organization, isUpdate, people } = defineProps(['organization', 'isUpdate', 'people'])

 const countries = ['France', 'Germany', 'Ireland', 'Italy', 'Switzerland', 'United Kingdom', 'United States']
</script>

<script>
 export default {
     name: 'organizationForm',
     data() {
         let fields = ( !this.isUpdate ) ? {
             name: "",
             country: "",
             contactPerson: null
         } : this.organization;
         return { form: fields };
     },
     methods: {
         submitForm: async function() {
             const formData = new FormData();
             const { id } = useRoute().params
             for (let [key, value] of Object.entries(this.form)) {
                 formData.append(key, ( key == "contactPerson" ) ? value._id : value);
             }
             if ( this.isUpdate ) {
                 await useFetch(`/api/organizations/${id}`, {
                     method: 'PUT',
                     body: toRaw(formData)
                 }).catch((e) => {
                     useToast().error(e.data.message);
                 }).then(async (data) => {
                     reloadNuxtApp()
                 });
             } else {
                 await useFetch('/api/organizations/create', {
                     method: 'POST',
                     body: formData
                 }).catch((e) => {
                     useToast().error(e.data.message);
                 }).then(async (data) => {
                     await reloadNuxtApp();
                     useToast().success('Organization created');
                 });
             }
         }
     }
 }

</script>
