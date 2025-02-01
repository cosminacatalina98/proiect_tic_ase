<template>
    <div class="signup-container">
      <h2>Inregistrare</h2>
      <form @submit.prevent="registerUser">
        <div>
          <label for="email">Email:</label>
          <input v-model="email" id="email" type="email" placeholder="Email" required />
        </div>
        <div>
          <label for="password">Parola:</label>
          <input v-model="password" id="password" type="password" placeholder="Parola" required />
        </div>
        <button type="submit">Inregistreaza-te</button>
      </form>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </div>
  </template>
  
  <script>
  import { ref } from "vue";
  import { createUserWithEmailAndPassword } from "firebase/auth";
  import { auth } from "../firebase";
  import { useStore } from "vuex";
  import { useRouter } from "vue-router";
  
  export default {
    name: "Signup",
    setup() {
      const email = ref("");
      const password = ref("");
      const errorMessage = ref("");
      const store = useStore();
      const router = useRouter();
  
      const registerUser = async () => {
        if (!email.value.endsWith("@vet.ro")) {
          errorMessage.value = "Inregistrarea este disponibila doar pentru doctori!";
          return;
        }
  
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, email.value, password.value);
          const user = userCredential.user;
          console.log(" Utilizator inregistrat:", user.email);
  
          const idToken = await user.getIdToken();
  
          const response = await fetch("http://localhost:3000/api/signup", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ idToken }),
          });
  
          if (!response.ok) {
            throw new Error("Eroare la inregistrare in backend.");
          }
  
          const data = await response.json();
          console.log("Raspuns backend:", data);
  
          store.commit("setUser", user);
          store.commit("setToken", data.token);
  
          router.push("/pets");
        } catch (error) {
          console.error("Eroare la inregistrare:", error);
          errorMessage.value = "Eroare la inregistrare. Verifica datele introduse.";
        }
      };
  
      return { email, password, errorMessage, registerUser };
    },
  };
  </script>

<style scoped>
  
.signup-container {
  max-width: 400px;
  margin: 100px auto;
  padding: 20px;
  background-color: #f7f7f7;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h2 {
  text-align: center;
}

form {
  display: flex;
  flex-direction: column;
}

form div {
  margin-bottom: 10px;
}

input {
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  padding: 10px;
  margin-top: 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3;
}

.error-message {
  color: red;
  font-size: 14px;
  text-align: center;
}
</style>

  