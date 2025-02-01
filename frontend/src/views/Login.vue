<template>
    <div class="login-container">
      <h2>Autentificare</h2>
      <form @submit.prevent="loginUser">
        <div>
          <label for="email">Email:</label>
          <input v-model="email" id="email" type="email" placeholder="Email" required />
        </div>
        <div>
          <label for="password">Parola:</label>
          <input v-model="password" id="password" type="password" placeholder="Parola" required />
        </div>
        <button type="submit">Autentifică-te</button>
      </form>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </div>
  </template>
  
  <script>
  import { ref } from "vue";
  import { useStore } from "vuex";
  import { useRouter } from "vue-router";
  
  export default {
    name: "Login",
    setup() {
      const email = ref("");
      const password = ref("");
      const errorMessage = ref("");
      const store = useStore();
      const router = useRouter();
  
      const loginUser = async () => {
        try {
          
          await store.dispatch("login", { email: email.value, password: password.value });
  
        
          const jwtToken = store.state.token;
          if (jwtToken) {
            console.log("JWT primit si salvat:", jwtToken);
            router.push("/pets"); 
          } else {
            throw new Error("Autentificare esuata: JWT nu a fost primit");
          }
        } catch (error) {
          console.error("Eroare login:", error);
          errorMessage.value = "Email sau parola incorecta.";
        }
      };
  
      return {
        email,
        password,
        errorMessage,
        loginUser,
      };
    },
  };
  </script>
  
  <style scoped>
  
  .login-container {
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
  