import { createStore } from "vuex";
import { auth } from "../firebase";
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from "firebase/auth";

const store = createStore({
  state: {
    user: null,
    token: localStorage.getItem("token") || null,
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    setToken(state, token) {
      state.token = token;
      localStorage.setItem("token", token);
      console.log(" Token salvat in Vuex si localStorage:", token); 
    },
    clearAuth(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    },
  },

  
  
  actions: {
    async login({ commit }, { email, password }) {
      try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const firebaseUser = userCredential.user;
        const idToken = await firebaseUser.getIdToken();

        const response = await fetch("http://localhost:3000/api/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ idToken }),
        });

        if (!response.ok) {
          throw new Error("Eroare la obținerea JWT-ului de la backend");
        }

        const data = await response.json();
        commit("setUser", firebaseUser);
        commit("setToken", data.token);

        return firebaseUser;
      } catch (error) {
        throw error;
      }
    },

    async logout({ commit }) {
      try {
        await signOut(auth);
        commit("clearAuth");
      } catch (error) {
        console.error("Eroare la delogare:", error);
      }
    },

    checkUser({ commit }) {

      console.log(" Verificam autentificarea utilizatorului"); 

      const savedToken = localStorage.getItem("token"); 
      if (savedToken) {
        console.log(" Token gasit in localStorage:", savedToken);
        commit("setToken", savedToken);
      }
    

      onAuthStateChanged(auth, async (user) => {
        if (user) {
          console.log(" Utilizator gasit:", user.email);
          const idToken = await user.getIdToken();
          commit("setUser", user);
          commit("setToken", idToken);
        } else {
          console.log(" Niciun utilizator logat!"); 
          commit("clearAuth");
        }
      });
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.token,
    getUser: (state) => state.user,
  },
});



export default store;
