<template>
  <div>
    <h2 class="text-2xl font-semibold text-gray-800 text-center mb-6">Adauga Fisa Pacient</h2>
    <div class="flex flex-row">
      
      <div class="w-96 bg-white shadow-lg rounded-lg p-6 border-l-4 border-blue-500 md:basis-1/3 sm:basis-1">
        <PetDetails />
      </div>

  
      <div class="md:basis-2/3 sm:basis-1">
        <form @submit.prevent="addFile" class="space-y-4">
          <div>
            <label for="name" class="font-semibold text-gray-700">Nume:</label>
            <input v-model="pet.name" id="name" type="text" readonly class="input-field" />
          </div>

          <div>
            <label for="identificationNumber" class="font-semibold text-gray-700">Numar identificare:</label>
            <input v-model="pet.identificationNumber" id="identificationNumber" type="text" readonly
              class="input-field" />
          </div>

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
            Adaugă Fișă
          </button>
        </form>
      </div>
    </div>
  </div>
</template>


<script>
// import { ref } from "vue";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import PetDetails from "@/components/PetDetails.vue";
import Card from 'primevue/card';




export default {
  components: { PetDetails, Card },
  setup() {
    const file = ref({

      filedate: "",
      symptom: "",
      diagnostic: "",
      treatment: "",
      recomandations: "",
      doctor: "",


    });

    const pet = ref({

      name: "",
      identificationNumber: "",


    });

    const route = useRoute();


    const fetchPetData = async () => {
      const petId = route.params.id;
      console.log("cauta animalul");
      try {
        const response = await fetch(`http://localhost:3000/api/pets/${petId}`);
        if (!response.ok) {
          throw new Error("Eroare la preluarea datelor animalului");
        }
        const data = await response.json();
        pet.value = data;
      } catch (error) {
        console.error("Eroare la preluarea datelor animalului:", error);
        alert("A aparut o eroare la preluarea datelor.");
      }
    };


    const addFile = async () => {
      try {


        const response = await fetch("http://localhost:3000/api/file", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            ...file.value,
            petId: route.params.id,
            petIdentificationNumber: pet.value.identificationNumber,
          }),
        });

        if (!response.ok) {
          throw new Error(`Eroare: ${response.statusText}`);
        }

        const data = await response.json();
        alert(`Fisa a fost adaugata cu succes! `);
        file.value = {
          filedate: "",
          symptom: "",
          diagnostic: "",
          treatment: "",
          recomandations: "",
          doctor: "",

        };
      } catch (error) {
        console.error("Eroare la adaugarea fisei:", error);
        alert("A aparut o eroare.");
      }
    };

    onMounted(() => {
      fetchPetData();
    });


    return {
      file,
      pet,
      addFile
    };
  }
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