<template>
    <div>
      <h2>Adauga Fisa Pacient</h2>
      <form @submit.prevent="addFile">
         <label for="name">Nume:</label>
        <input v-model="pet.name" id="name" type="text" readonly />

        <label for="identificationNumber">Numar identificare:</label>
        <input v-model="pet.identificationNumber" id="identificationNumber" type="text" readonly />
   
        <label for="filedate">Data fisa:</label>
        <input v-model="file.filedate" id="filedate" type="date"  />

        <label for="symptom">Simptome:</label>
        <input v-model="file.symptom" id="symptom" type="text" required />

        <label for="diagnostic">Diagnostic:</label>
        <input v-model="file.diagnostic" id="diagnostic" type="text" required />

        <label for="treatment">Tratament:</label>
        <input v-model="file.treatment" id="treatment" type="text"  />

        <label for="recomandations">Recomandari:</label>
        <input v-model="file.recomandations" id="recomandations" type="text"  />

        <label for="doctor">Doctor:</label>
        <input v-model="file.doctor" id="doctor" type="text"  />

  
        <button type="submit">Adauga Fisa</button>
      </form>
    </div>
  </template>
  
  <script>
 // import { ref } from "vue";
  import { ref, onMounted } from "vue";
  import { useRoute} from "vue-router";
  
  export default {
    setup() {
      const file = ref({
        
        filedate: "",
        symptom: "",
        diagnostic:"",
        treatment:"",
        recomandations:"",
        doctor:"",
        
       
      });

      const pet= ref({
        
        name:"",
        identificationNumber:"",
        
       
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
            diagnostic:"",
            treatment:"",
            recomandations:"",
            doctor:"",
            
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
  