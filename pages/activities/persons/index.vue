<template>

    <div>
        <h2>Persons</h2>
        <div>
            <div class="grid grid-cols-4 gap-5">
                <div v-for="p in people">
                    <NuxtLink :to="`/activities/persons/${p.personID}`">{{ p.firstname }} {{ p.lastname }}</NuxtLink>
                </div>
            </div>
        </div>

        <div>
            <form @submit.prevent="submitForm" id="personForm">
                <input v-model="form.firstname" type="text" name="firstname" placeholder="First name" required></input>
                <input v-model="form.lastname" type="text" name="lastname" placeholder="Last name" required></input>
                <input v-model="form.email" type="email" name="email" placeholder="Enter email" required></input>
                <button type="submit" class="btn">Send</button>
            </form>
        </div>
    </div>

</template>

<script setup>
 definePageMeta({
     layout: 'activities'
 })

 const { data: people } = await useFetch('/api/persons')
</script>

<script>
 export default {
     name: 'personForm',
     data() {
         return {
             form: {
                 firstname: "",
                 lastname: "",
                 email: ""
             }
         };
     },
     methods: {
         submitForm: async function() {
             const formData = new FormData();
             for (let [key, value] of Object.entries(this.form)) {
                 formData.append(key, value);
             }
             await useFetch('/api/persons/create', {
                 method: 'POST',
                 body: formData
             }).catch((e) => {
                 console.log("ERROR", e.data.message);
             }).then(async (data) => {
                 reloadNuxtApp()
             });
         }
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
