<template>
    <div>
      <h2>Lista Fise</h2>
      <table border="1" cellpadding="10">
        <thead>
          <tr>
            <th>Data inregistrare</th>
            <th>Numar identificare</th>
            <th>Diagnostic</th>
            <th>Doctor</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="file in files" :key="file.id">
            <td>{{ file.filedate }}</td>
            <td>{{ file.petIdentificationNumber }}</td>
            <td>{{ file.diagnostic }}</td>
            <td>{{ file.doctor }}</td>
            <td>
              <button @click="editFile(file.id)">Editeaza</button>
              <button @click="deleteFile(file.id)">Sterge</button>
             
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue';
  import { useRoute , useRouter } from 'vue-router';
  
  export default {
    name: 'History',
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
          const response = await fetch(`http://localhost:3000/api/file/${id}`, {
            method: 'DELETE',
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
  