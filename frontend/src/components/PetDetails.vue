<template>
    <div class="pet-details">
      <h3>Detalii Pacient</h3>
      <div v-if="pet">
        <p><strong>Numar Identificare:</strong> {{ pet.identificationNumber }}</p>
        <p><strong>Nume:</strong> {{ pet.name }}</p>
        <p><strong>Specie:</strong> {{ pet.species }}</p>
        <p><strong>Rasa:</strong> {{ pet.breed }}</p>
        <p><strong>Gen:</strong> {{ pet.gender }}</p>
        <p><strong>Culoare:</strong> {{ pet.color }}</p>
        <p><strong>Data Nasterii:</strong> {{ formatDate(pet.birthday) }}</p>
        <p><strong>Greutate:</strong> {{ pet.weight }} kg</p>
        <p><strong>Veterinar:</strong> {{ pet.vet }}</p>
  
        <h4>Proprietar</h4>
        <p><strong>Nume:</strong> {{ pet.owner?.name }}</p>
        <p><strong>Adresa:</strong> {{ pet.owner?.address }}</p>
        <p><strong>Telefon:</strong> {{ pet.owner?.phone }}</p>
        <p><strong>Email:</strong> {{ pet.owner?.email }}</p>
      </div>
      <div v-else>
        <p>Se încarca detaliile pacientului...</p>
      </div>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from "vue";
  import { useRoute } from "vue-router";
  
  export default {
    name: "PetDetails",
    setup() {
      const pet = ref(null);
      const route = useRoute();
  
      const fetchPetData = async () => {
        try {
          const response = await fetch(`http://localhost:3000/api/pets/${route.params.id}`);
          if (!response.ok) {
            throw new Error("Eroare la preluarea datelor pacientului");
          }
          pet.value = await response.json();
        } catch (error) {
          console.error("Eroare la preluarea datelor pacientului:", error);
        }
      };
  
      
      const formatDate = (dateString) => {
        if (!dateString) return "N/A";
        return new Date(dateString).toLocaleDateString("ro-RO");
      };
  
      onMounted(fetchPetData);
  
      return { pet, formatDate };
    },
  };
  </script>
  
  <style scoped>
  .pet-details {
    border: 1px solid #ddd;
    padding: 15px;
    border-radius: 8px;
    background-color: #f9f9f9;
    margin-bottom: 20px;
    width: 100%;
  }
  
  h3 {
    margin-bottom: 10px;
    color: #007bff;
  }
  
  h4 {
    margin-top: 15px;
    color: #28a745;
  }
  
  p {
    margin: 5px 0;
  }
  </style>
  