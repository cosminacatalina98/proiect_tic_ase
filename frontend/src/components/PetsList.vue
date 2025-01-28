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
          <th></th> 
        </tr>
      </thead>
      <tbody>
        <tr v-for="pet in pets" :key="pet.id">
          <td>{{ pet.identificationNumber }}</td>
          <td>{{ pet.name }}</td>
          <td>{{ pet.breed }}</td>
          <td>{{ pet.species }}</td>
          <td>{{ pet.owner.name }}</td>
          <td>
            <button @click="editPet(pet.id)">Editeaza</button>
            <button @click="deletePet(pet.id)">Sterge</button>
            <button @click="addFile(pet.id)">Adaugare  Fisa</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

export default {
  name: 'PetsList',
  setup() {
    const pets = ref([]);
    const router = useRouter(); 

  
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

    const editPet = (id) => {
      console.log('Editare pacient cu ID:', id);
      router.push(`/editpet/${id}`); 
    };

    
    const deletePet = async (id) => {
      try {
        const response = await fetch(`http://localhost:3000/api/pets/${id}`, {
          method: 'DELETE',
        });
        if (response.ok) {
          pets.value = pets.value.filter((pet) => pet.id !== id); 
          console.log('Pacient șters cu succes');
        } else {
          console.error('Eroare la ștergere pacient');
        }
      } catch (error) {
        console.error('Eroare la cererea fetch pentru stergere:', error);
      }
    };

    const addFile = (id) => {
      console.log('Adaugare fisa pentru pacient cu ID:', id);
      router.push(`/addfile/${id}`); 
    };

   
    onMounted(() => {
      fetchPets();
    });

    return {
      pets,
      editPet,
      deletePet,
      addFile,
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

button {
  margin: 5px;
  padding: 5px 10px;
  cursor: pointer;
  border: none;
  background-color: #007bff;
  color: white;
}

button:hover {
  background-color: #0056b3;
}
</style>
