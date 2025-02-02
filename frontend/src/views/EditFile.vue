<template>
  <div>
    <h2 class="text-2xl font-semibold text-gray-800 text-center mb-6">Editează Fișă Pacient</h2>
    <div class="flex flex-row justify-center">
      
    

  
      <div class="md:basis-2/3 sm:basis-1">
        <form @submit.prevent="updateFile" class="space-y-4">
         

          <div>
            <label for="filedate" class="font-semibold text-gray-700">Data fisa:</label>
            <input v-model="file.filedate" id="filedate" type="date" class="input-field" />
          </div>

          <div>
            <label for="symptom" class="font-semibold text-gray-700">Simptome:</label>
            <input v-model="file.symptom" id="symptom" type="text" required class="input-field" />
          </div>

          <div>
            <label for="diagnostic" class="font-semibold text-gray-700">Diagnostic:</label>
            <input v-model="file.diagnostic" id="diagnostic" type="text" required class="input-field" />
          </div>

          <div>
            <label for="treatment" class="font-semibold text-gray-700">Tratament:</label>
            <input v-model="file.treatment" id="treatment" type="text" class="input-field" />
          </div>

          <div>
            <label for="recomandations" class="font-semibold text-gray-700">Recomandari:</label>
            <input v-model="file.recomandations" id="recomandations" type="text" class="input-field" />
          </div>

          <div>
            <label for="doctor" class="font-semibold text-gray-700">Doctor:</label>
            <input v-model="file.doctor" id="doctor" type="text" class="input-field" />
          </div>

          <button type="submit"
            class="w-full bg-blue-600 text-white py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition">
            Editează Fișă
          </button>
        </form>
      </div>
    </div>
  </div>
</template>



  <script>
  
  
  import { ref, onMounted } from "vue";
  import { useRoute, useRouter } from "vue-router";
  
  export default {
    name: "EditFile",
    setup() {
      const file = ref({

        filedate: "",
        symptom: "",
        diagnostic:"",
        treatment:"",
        recomandations:"",
        doctor:"",

      });
  
      const route = useRoute();
      const router = useRouter();
  
      const fetchFileData = async () => {
        const id = route.params.id;
        console.log("Cauta  fisa");
        try {
          const response = await fetch(`http://localhost:3000/api/file/${id}`);
          if (!response.ok) {
            throw new Error("Eroare la preluarea datelor fisei");
          }
          const data = await response.json();
          file.value = data; 
        } catch (error) {
          console.error("Eroare la preluarea datelor animalului:", error);
          alert("A apărut o eroare la preluarea datelor.");
        }
      };
  
      
      const updateFile = async () => {
        const fileId = route.params.id;
        try {
          const token = localStorage.getItem("token");
          const response = await fetch(`http://localhost:3000/api/file/${fileId}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${token}`,
            },
            body: JSON.stringify(file.value),
          });
  
          if (!response.ok) {
            throw new Error("Eroare la actualizarea fisei");
          }
  
          const data = await response.json();
          alert(`Fisa actualizata cu succes! ID: ${fileId}`);
          router.push(`/history/${file.value.petId}`); 
        } catch (error) {
          console.error("Eroare la actualizarea  fisei:", error);
          alert("A aparut o eroare la actualizarea fisei.");
        }
      };
  
      
      onMounted(() => {
        fetchFileData();
      });
  
      return {
        file,
        updateFile,
      };
    },
  };
  </script>
 


 <style scoped>

.input-field {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 16px;
  background: #f8f9fa;
}
</style>