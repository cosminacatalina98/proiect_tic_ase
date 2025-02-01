<template>
  <div>
    <h2>Editează un Animal</h2>
    <form @submit.prevent="updatePet">
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
      <input v-model="pet.birthday" id="birthday" type="date" required />

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

      <button type="submit">Actualizează Animal</button>
    </form>
  </div>
</template>

<script>


import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

export default {
  name: "EditPet",
  setup() {
    const pet = ref({
      name: "",
      identificationNumber: "",
      species: "",
      breed: "",
      gender: "",
      color: "",
      birthday: "",
      vet: "",
      weight: null,
      owner: {
        name: "",
        address: "",
        phone: "",
        email: "",
      },
    });

    const route = useRoute();
    const router = useRouter();

    const fetchPetData = async () => {
      const petId = route.params.id;
      console.log("Cauta animalul");
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

    
    const updatePet = async () => {
      const petId = route.params.id;
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(`http://localhost:3000/api/pets/${petId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,

          },
          body: JSON.stringify(pet.value),
        });

        if (!response.ok) {
          throw new Error("Eroare la actualizarea animalului");
        }

        const data = await response.json();
        alert(`Animal actualizat cu succes! ID: ${petId}`);
        router.push("/pets"); 
      } catch (error) {
        console.error("Eroare la actualizarea animalului:", error);
        alert("A aparut o eroare la actualizarea animalului.");
      }
    };

    
    onMounted(() => {
      fetchPetData();
    });

    return {
      pet,
      updatePet,
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
