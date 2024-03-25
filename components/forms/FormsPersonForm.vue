<template>
    <form @submit.prevent="submitForm" id="personForm" class="flex space-x-4">
        <input v-model="form.firstname" type="text" name="firstname" placeholder="First name" required></input>
        <input v-model="form.lastname" type="text" name="lastname" placeholder="Last name" required></input>
        <input v-model="form.email" type="email" name="email" placeholder="Enter email" required></input>
        <button type="submit" class="btn"> {{ isUpdate ? "Update" : "Create "}}</button>
    </form>
</template>

<script setup>
 const { person, isUpdate } = defineProps(['person', 'isUpdate'])
</script>

<script>
 export default {
     name: 'personForm',
     data() {
         let fields = ( !this.isUpdate ) ? {
             firstname: "",
             lastname: "",
             email: ""
         } : toRaw(this.person);
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
                 await useFetch(`/api/persons/${id}`, {
                     method: 'PUT',
                     body: formData
                 }).catch((e) => {
                     useToast().error(e.data.message);
                 }).then(async (data) => {
                     reloadNuxtApp()
                 });
             } else {
                 await useFetch('/api/persons/create', {
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
