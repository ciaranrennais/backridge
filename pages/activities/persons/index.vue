<template>

    <div>
        <h2>Persons</h2>
        <div>
            <div class="grid grid-cols-4 gap-5">
                <div v-for="p in people">
                    <div class="box-border h-32 p-4 border-4">
                        <NuxtLink class="url" :to="`/activities/persons/${p.personID}`">{{ p.firstname }} {{ p.lastname }}</NuxtLink>
                        <p>{{ p.email }}</p>
                    </div>
                </div>
            </div>
        </div>

        <div class="mt-5">
            <button class="btn" @click="addPerson" id="addPersonButton">Add Person</button>
        </div>

        <div class="mt-5">
            <form @submit.prevent="submitForm" id="personForm" v-if="form.showForm" class="flex space-x-4">
                <input v-model="form.firstname" type="text" name="firstname" placeholder="First name" required></input>
                <input v-model="form.lastname" type="text" name="lastname" placeholder="Last name" required></input>
                <input v-model="form.email" type="email" name="email" placeholder="Enter email" required></input>
                <button type="submit" class="btn">Create</button>
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
                 email: "",
                 showForm: false
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
         },
         addPerson: function() {
             this.form.showForm = !this.form.showForm;
             let button = document.getElementById("addPersonButton");
             if ( !this.form.showForm ) {
                 button.textContent = "Add Person";
                 button.classList.remove('btn-warning');
                 button.classList.add('btn');
                 this.form.firstname = this.form.lastname = this.form.email = "";
             } else {
                 button.textContent = "Cancel";
                 button.classList.remove('btn');
                 button.classList.add('btn-warning');
             }
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
