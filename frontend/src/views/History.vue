<template>
  <div class="container mx-auto px-4">
    <h2 class="text-2xl font-semibold text-center mb-6">Lista Fișe</h2>

    <div class="flex flex-col lg:flex-row lg:items-start gap-6 w-full">
      
      <div class="w-full lg:w-1/3 flex lg:justify-start">
        <div class="bg-white shadow-md rounded-lg p-6 border-l-4 border-blue-500 w-full">
          <PetDetails />
        </div>
      </div>

      <div class="w-full lg:w-2/3">
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div v-for="file in files" :key="file.id" class="bg-white shadow-md rounded-lg p-4 border">
            <p><strong>Data Înregistrare:</strong> {{ file.filedate }}</p>
            <p><strong>Nr. Identificare:</strong> {{ file.petIdentificationNumber }}</p>
            <p><strong>Diagnostic:</strong> {{ file.diagnostic }}</p>
            <p><strong>Doctor:</strong> {{ file.doctor }}</p>

            
            <div class="mt-4 flex flex-wrap gap-2">
              <button @click="editFile(file.id)" class="btn btn-blue">Editează</button>
              <button @click="confirmDelete(file)" class="btn btn-red">Șterge</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


  <script>
  import { ref, onMounted } from 'vue';
  import { useRoute , useRouter } from 'vue-router';
  import PetDetails from "@/components/PetDetails.vue";
  
  export default {
    name: 'History',
    components: { PetDetails },
    setup() {
      const files = ref([]);
      const router = useRouter(); 
      const route = useRoute();
  
    
      const fetchFiles = async () => {
        const petId = route.params.id;
        try {
          const response = await fetch(`http://localhost:3000/api/files/${petId}`);
          if (!response.ok) {
            throw new Error('Eroare la preluarea animalelor');
          }
          const data = await response.json();
          files.value = data; 
        } catch (error) {
          console.error('Eroare la preluarea animalelor:', error);
        }
      };
  
      const editFile = (id) => {
        console.log('Editare  fisa pacient cu ID:', id);
        router.push(`/editFile/${id}`); 
      };
  
      
      const deleteFile = async (id) => {
        try {
          const token = localStorage.getItem("token");
          const response = await fetch(`http://localhost:3000/api/file/${id}`, {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${token}`}
          });
          if (response.ok) {
            files.value = files.value.filter((file) => file.id !== id); 
            console.log('Fisa stearsa cu succes');
          } else {
            console.error('Eroare la stergerea fisei');
          }
        } catch (error) {
          console.error('Eroare la cererea fetch pentru stergere:', error);
        }
      };
  
    

     
      onMounted(() => {
        fetchFiles();
      });
  
      return {
        files,
        editFile,
        deleteFile,
       
      };
    },
  };
  </script>
  
  <style scoped>
  
  .btn {
    padding: 8px 12px;
    border-radius: 6px;
    font-size: 14px;
    font-weight: 600;
    color: white;
    transition: 0.3s ease;
    border: none;
    box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.1);
  }
  
  .btn:hover {
    transform: translateY(-2px);
  }
  
  .btn-blue {
    background-color: #3b82f6;
  }
  
  .btn-red {
    background-color: #ef4444;
  }
  
  .btn-blue:hover {
    background-color: #2563eb;
  }
  
  .btn-red:hover {
    background-color: #dc2626;
  }
  </style>