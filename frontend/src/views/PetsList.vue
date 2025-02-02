<template>
  <div class="container mx-auto px-4">
   
    <ConfirmDialog></ConfirmDialog>
    <h2 class="text-2xl font-semibold text-center my-4">Lista Animalelor</h2>

    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <div v-for="pet in pets" :key="pet.id" class="bg-white p-6 shadow-lg rounded-xl border">
        <h3 class="text-lg font-bold text-gray-800">{{ pet.name }}</h3>
        <p class="text-gray-600"><strong>Nr. Identificare:</strong> {{ pet.identificationNumber }}</p>
        <p class="text-gray-600"><strong>Rasă:</strong> {{ pet.breed }}</p>
        <p class="text-gray-600"><strong>Specie:</strong> {{ pet.species }}</p>
        <p class="text-gray-600"><strong>Proprietar:</strong> {{ pet.owner.name }}</p>

      
        <div class="mt-4 flex flex-wrap gap-2">
          <button @click="editPet(pet.id)" class="btn btn-soft-blue">Editează</button>
          <button @click="confirmDelete(pet)" class="btn btn-soft-red">Șterge</button>
          <button @click="addFile(pet.id)" class="btn btn-soft-green">Adaugă Fișă</button>
          <button @click="history(pet.id)" class="btn btn-soft-yellow">Istoric Fișe</button>
        </div>
      </div>
    </div>
  

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
        rejectProps: {
            label: 'Anuleaza',
            severity: 'secondary',
            outlined: true
        },
        acceptProps: {
            label: 'Sterge',
            severity: 'danger'
        },
        // acceptLabel: "Da, șterge",
        // rejectLabel: "Anulează",
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

.btn {
  padding: 8px 12px;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  color: white;
  transition: 0.3s ease;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  border: none;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0px 6px 10px rgba(0, 0, 0, 0.15);
}


.btn-soft-blue {
  background-color: #7ea8ff;
}
.btn-soft-blue:hover {
  background-color: #5a92ff;
}

.btn-soft-red {
  background-color: #ff7e79;
}
.btn-soft-red:hover {
  background-color: #ff5c58;
}

.btn-soft-green {
  background-color: #7ed957;
}
.btn-soft-green:hover {
  background-color: #5cca45;
}

.btn-soft-yellow {
  background-color: #f4c430;
}
.btn-soft-yellow:hover {
  background-color: #e6b82e;
}


@media (max-width: 768px) {
  .grid {
    grid-template-columns: 1fr !important;
  }

  .btn {
    font-size: 12px;
    padding: 6px 10px;
    width: 100%;
    text-align: center;
  }
}
</style>