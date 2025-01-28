<template>
  <div>
    <h2>Lista Animalelor</h2>
    <table border="1" cellpadding="10">
      <thead>
        <tr>
          <th>Numar identificare</th>
          <th>Nume</th>
          <th>Rasa</th>
          <th>Specie</th>
          <th>Proprietar</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="pet in pets" :key="pet.id">
          <td>{{ pet.identificationNumber }}</td>
          <td>{{ pet.name }}</td>
          <td>{{ pet.breed }}</td>
          <td>{{ pet.species }}</td>
          <td>{{ pet.owner.name }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  name: 'PetsList',
  setup() {
    const pets = ref([]);

    const fetchPets = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/pets');
        if (!response.ok) {
          throw new Error('Eroare la preluarea animalelor');
        }
        const data = await response.json();
        pets.value = data; 
      } catch (error) {
        console.error('Eroare la preluarea animalelor:', error);
      }
    };

    onMounted(() => {
      fetchPets();
    });

    return {
      pets,
    };
  },
};
</script>

<style scoped>
h2 {
  text-align: center;
  margin-bottom: 20px;
}
table {
  width: 100%;
  margin: 0 auto;
  border-collapse: collapse;
}
th, td {
  padding: 10px;
  text-align: left;
}
th {
  background-color: #f4f4f4;
}
</style>
