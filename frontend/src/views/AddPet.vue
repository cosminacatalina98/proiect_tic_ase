<template>
  <div class="p-6 max-w-3xl mx-auto bg-white rounded-lg shadow-md">
    <h2 class="text-2xl font-semibold mb-6 text-center">Adaugă un Animal</h2>

    <form @submit.prevent="addPet" class="grid grid-cols-2 gap-4">
      <div class="col-span-2">
        <label for="name" class="block font-medium">Nume:</label>
        <InputText v-model="pet.name" id="name" class="w-full" required />
      </div>

      <div>
        <label for="identificationNumber" class="block font-medium">Număr identificare:</label>
        <InputText v-model="pet.identificationNumber" id="identificationNumber" class="w-full" required />
      </div>

      <div>
        <label for="species" class="block font-medium">Specie:</label>
        <InputText v-model="pet.species" id="species" class="w-full" required />
      </div>

      <div>
        <label for="breed" class="block font-medium">Rasă:</label>
        <InputText v-model="pet.breed" id="breed" class="w-full" required />
      </div>

      <div>
        <label for="gender" class="block font-medium">Gen:</label>
        <Dropdown v-model="pet.gender" :options="['Masculin', 'Feminin']" class="w-full" placeholder="Selectează genul"
          required />
      </div>

      <div>
        <label for="color" class="block font-medium">Culoare:</label>
        <InputText v-model="pet.color" id="color" class="w-full" required />
      </div>

      <div>
        <label for="birthday" class="block font-medium">Data nașterii:</label>
        <Calendar v-model="pet.birthday" id="birthday" class="w-full" showIcon />
      </div>

      <div>
        <label for="weight" class="block font-medium">Greutate (kg):</label>
        <InputNumber v-model="pet.weight" id="weight" class="w-full" required />
      </div>

      <div class="col-span-2">
        <label for="vet" class="block font-medium">Nume Veterinar:</label>
        <InputText v-model="pet.vet" id="vet" class="w-full" required />
      </div>

      <!-- Informații Proprietar -->
      <div class="col-span-2 mt-6">
        <h3 class="text-lg font-semibold">Informații Proprietar</h3>
      </div>

      <div>
        <label for="ownerName" class="block font-medium">Nume Proprietar:</label>
        <InputText v-model="pet.owner.name" id="ownerName" class="w-full" required />
      </div>

      <div>
        <label for="ownerAddress" class="block font-medium">Adresa Proprietar:</label>
        <InputText v-model="pet.owner.address" id="ownerAddress" class="w-full" required />
      </div>

      <div>
        <label for="phone" class="block font-medium">Telefon:</label>
        <InputText v-model="pet.owner.phone" id="phone" class="w-full" required />
      </div>

      <div>
        <label for="email" class="block font-medium">Email:</label>
        <InputText v-model="pet.owner.email" id="email" class="w-full" required type="email" />
      </div>

      <div class="col-span-2 text-center mt-6">
        <Button type="submit" label="Adaugă Animal" icon="pi pi-check" class="p-button-success w-full" />
      </div>
    </form>
  </div>
</template>

<script>
import { ref } from "vue";
import InputText from "primevue/inputtext";
import InputNumber from "primevue/inputnumber";
import Dropdown from "primevue/dropdown";
import Calendar from "primevue/calendar";
import Button from 'primevue/button';
import { useToast } from "primevue/usetoast";
import { useRouter } from "vue-router";

export default {
  components: { InputText, InputNumber, Dropdown, Calendar, Button },
  setup() {
    const toast = useToast();
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
        email: ""
      }
    });

    const router = useRouter();



    const validateForm = () => {
      if (!pet.value.name.trim()) {
        toast.add({ severity: "warn", summary: "Eroare", detail: "Numele este obligatoriu.", life: 3000 });
        alert("sunt aicic");
        return false;
      }

      if (!pet.value.identificationNumber.trim()) {
        toast.add({ severity: "warn", summary: "Eroare", detail: "Numărul de identificare este obligatoriu.", life: 3000 });
        return false;
      }

      if (!pet.value.owner.email.includes("@") || !pet.value.owner.email.includes(".")) {
        toast.add({ severity: "warn", summary: "Eroare", detail: "Email invalid.", life: 3000 });
        return false;
      }

      if (!/^\d{10}$/.test(pet.value.owner.phone)) {
        toast.add({ severity: "warn", summary: "Eroare", detail: "Telefon invalid (10 cifre necesare).", life: 3000 });
        return false;
      }

      if (pet.value.weight <= 0 || isNaN(pet.value.weight)) {
        toast.add({ severity: "warn", summary: "Eroare", detail: "Greutatea trebuie să fie un număr pozitiv.", life: 3000 });
        return false;
      }

      const today = new Date();
      if (new Date(pet.value.birthday) > today) {
        toast.add({ severity: "warn", summary: "Eroare", detail: "Data nașterii nu poate fi în viitor.", life: 3000 });
        return false;
      }

      return true;
    };




    const addPet = async () => {
      try {

        if (!validateForm()) return;

        const token = localStorage.getItem("token");
        if (!token) {
          console.error("Token lipsă! Utilizatorul nu este autentificat.");
          alert("Eroare: Nu ești autentificat!");
          return;
        }


        const response = await fetch("http://localhost:3000/api/pets", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          },
          body: JSON.stringify(pet.value)
        });

        if (!response.ok) {
          throw new Error(`Eroare: ${response.statusText}`);
        }

        const data = await response.json();
        alert(`Animal adaugat cu succes! ID: ${data.id}`);
        toast.add({ severity: "success", summary: "Succes", detail: `Animal adăugat cu succes!`, life: 3000 });
        pet.value = {
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
            email: ""
          }
        };
        router.push("/pets");

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
