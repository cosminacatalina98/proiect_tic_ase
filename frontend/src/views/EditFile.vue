<template>
    <div>
      <h2>Editează Fisa</h2>
      <form @submit.prevent="updateFile">

        <!-- <label for="name">Nume:</label>
        <input v-model="pet.name" id="name" type="text" readonly />

        <label for="identificationNumber">Numar identificare:</label>
        <input v-model="pet.identificationNumber" id="identificationNumber" type="text" readonly />
    -->
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

  
        <button type="submit">Actualizează Animal</button>
      </form>
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
          const response = await fetch(`http://localhost:3000/api/file/${fileId}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(file.value),
          });
  
          if (!response.ok) {
            throw new Error("Eroare la actualizarea fisei");
          }
  
          const data = await response.json();
          alert(`Fisa actualizata cu succes! ID: ${fileId}`);
          router.push("/pets"); 
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
  form {
    display: flex;
    flex-direction: column;
    gap: 10px;
    max-width: 600px;
    margin: 0 auto;
  }
  
  input,
  button {
    padding: 8px;
    margin-bottom: 12px;
    font-size: 16px;
  }
  
  button {
    background-color: #007bff;
    color: white;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  </style>
  