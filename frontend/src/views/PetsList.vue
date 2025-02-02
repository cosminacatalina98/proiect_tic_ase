<template>
  <div>
    <h2>Lista Animalelor</h2>
    <ConfirmDialog /> <
    
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
    <button @click="editPet(pet.id)">Editează</button>

    <!-- Buton pentru ștergere -->
    <Button 
      label="Șterge"  
      icon="pi pi-trash"
      severity="danger"
      class="p-button-sm"
      @click="confirmDelete(pet)"
    />

    <button @click="addFile(pet.id)">Adaugă Fișă</button>
    <button @click="history(pet.id)">Istoric Fișe</button>
  </td>
</tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import Button from "primevue/button";
import ConfirmDialog from "primevue/confirmdialog";
import { useConfirm } from "primevue/useconfirm";
import { useToast } from "primevue/usetoast";

export default {
  components: { Button, ConfirmDialog },
  name: 'PetsList',
  setup() {
    const pets = ref([]);
    const router = useRouter(); 
    const confirm = useConfirm();
    const toast = useToast();

  
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

    const confirmDelete = (pet) => {
      confirm.require({
        message: `Sigur doriți să ștergeți pacientul ${pet.name}?`,
        header: "Confirmare Ștergere",
        icon: "pi pi-exclamation-triangle",
        acceptLabel: "Da, șterge",
        rejectLabel: "Anulează",
        accept: () => deletePet(pet.id),
      });
    };

    
    const deletePet = async (id) => {

      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`http://localhost:3000/api/pets/${id}`, {
          method: 'DELETE',
          headers: {
              "Authorization": `Bearer ${token}`,
            },
        });
        if (response.ok) {
          pets.value = pets.value.filter((pet) => pet.id !== id); 
          console.log('Pacient sters cu succes');
          toast.add({
        severity: "success",
        summary: "Ștergere reușită",
        detail: "Pacientul și fișele asociate au fost șterse.",
        life: 3000,
      });

        } else {
          console.error('Eroare la stergere pacient');
        }
      } catch (error) {
        console.error('Eroare la cererea fetch pentru stergere:', error);
      }
    };

    const addFile = (id) => {
      console.log('Adaugare fisa pentru pacient cu ID:', id);
      router.push(`/addfile/${id}`); 
    };

    const history = (id) => {
      console.log('Afisare istoric pentru pacient cu ID:', id);
      router.push(`/history/${id}`); 
    };

   
    onMounted(() => {
      fetchPets();
    });

    return {
      pets,
      editPet,
      deletePet,
      addFile,
      confirmDelete,
      history,
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
