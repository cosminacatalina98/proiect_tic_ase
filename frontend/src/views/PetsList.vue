<template>
    <div>
      <h1>Lista pacienti</h1>
      <PetsList />
    </div>
  </template>
  
  <script>
  import PetsList from "../components/PetsList.vue";

  
  export default {
    components: {
      PetsList
    }
  };
  </script>
  