<template>
    <div>
      <h2>Adauga un Animal</h2>
      <form @submit.prevent="addPet">
        <label for="name">Nume:</label>
        <input v-model="pet.name" id="name" type="text" required />

        <label for="identificationNumber">Numar identificare:</label>
        <input v-model="pet.identificationNumber" id="identificationNumber" type="text" required />
  
        <label for="species">Specie:</label>
        <input v-model="pet.species" id="species" type="text" required />
  
        <label for="breed">Rasa:</label>
        <input v-model="pet.breed" id="breed" type="text" required />

        <label for="gender">Gen:</label>
        <input v-model="pet.gender" id="gender" type="text" required />

        <label for="color">Culoare:</label>
        <input v-model="pet.color" id="color" type="text" required />
  
        <label for="birthday">Data nasterii:</label>
        <input v-model="pet.birthday" id="birthday" type="date"  />
  
        <label for="weight">Greutate:</label>
        <input v-model.number="pet.weight" id="weight" type="number" required />

        <label for="vet">Nume Vetrinar:</label>
        <input v-model="pet.vet" id="vet" type="text" required />


  
        <h3>Informatii Proprietar</h3>
        <label for="ownerName">Nume Proprietar:</label>
        <input v-model="pet.owner.name" id="ownerName" type="text" required />

        <label for="ownerAddress">Adresa Proprietar:</label>
        <input v-model="pet.owner.address" id="ownerAddress" type="text" required />
  
        <label for="phone">Telefon:</label>
        <input v-model="pet.owner.phone" id="phone" type="text" required />
  
        <label for="email">Email:</label>
        <input v-model="pet.owner.email" id="email" type="email" required />

  
        <button type="submit">Adauga Animal</button>
      </form>
    </div>
  </template>
  
  <script>
  import { ref } from "vue";
  
  export default {
    setup() {
      const pet = ref({
        name: "",
        identificationNumber: "",
        species: "",
        breed: "",
        gender:"",
        color:"",
        birthday:"",
        vet:"",
        weight: null,
        owner: {
          name: "",
          address:"",
          phone: "",
          email: ""
        }
      });
  
      const addPet = async () => {
        try {
          const response = await fetch("http://localhost:3000/api/pets", {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify(pet.value)
          });
  
          if (!response.ok) {
            throw new Error(`Eroare: ${response.statusText}`);
          }
  
          const data = await response.json();
          alert(`Animal adaugat cu succes! ID: ${data.id}`);
          pet.value = {
                name: "",
                identificationNumber: "",
                species: "",
                breed: "",
                gender:"",
                color:"",
                birthday:"",
                vet:"",
                weight: null,
                owner: {
                name: "",
                address:"",
                phone: "",
                email: ""
            }
          };
        } catch (error) {
          console.error("Eroare la adaugarea animalului:", error);
          alert("A aparut o eroare.");
        }
      };
  
      return {
        pet,
        addPet
      };
    }
  };
  </script>
  