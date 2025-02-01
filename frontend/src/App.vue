<template>
  <div>
    <header>
      <div class="card">
        <Menubar :model="items" class=" bg-slate-100!">
          <template #item="{ item, props }">
            <RouterLink v-if="isAuthenticated" :to="item.route" class="hover:bg-slate-200" v-bind="props.action">
              {{item.label }}
            </RouterLink>
          </template>
          <template #end>
            <div class="flex items-center gap-2">
              <!-- <Avatar image="https://primefaces.org/cdn/primevue/images/avatar/amyelsner.png" shape="circle" /> -->
              <span v-if="user">{{ user.email }}</span>
              <Button v-if="isAuthenticated" icon="pi pi-power-off" @click="logout" severity="danger"></Button>
              <RouterLink v-else to="/login">Conectare</RouterLink>
              <RouterLink v-if="!isAuthenticated" to="/signup">Inregistrare</RouterLink>


            </div>
          </template>
        </Menubar>
        
      </div>
      <!-- <div class="wrapper">

      <nav class="navbar">
        <div class="left-menu">
          <RouterLink v-if="isAuthenticated" to="/pets">Lista Pacienti</RouterLink>
          <RouterLink v-if="isAuthenticated" to="/addpet">Adauga Pacient</RouterLink>

        </div>


        <div class="right-menu">
          <span v-if="user">{{ user.email }}</span>
          <button v-if="isAuthenticated" @click="logout">Deconectare</button>
          <RouterLink v-else to="/login">Conectare</RouterLink>
          <RouterLink v-if="!isAuthenticated" to="/signup">Inregistrare</RouterLink>


        </div>

        <div class="right-menu">
          <RouterLink to="/profile">Profil</RouterLink>
        </div>
      </nav>
    </div> -->
    </header>

    <Toast />
    <div class="container mx-auto px-4">
      <RouterView />
    
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import Menubar from 'primevue/menubar';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Toast from "primevue/toast";

import { ref } from "vue";




export default {
  components: {
    Menubar,
    InputText,
    Button,
    Toast, 
  },

  setup() {
    const store = useStore();
    const router = useRouter();

    const user = computed(() => store.state.user);
    const isAuthenticated = computed(() => store.getters.isAuthenticated);


    const items = ref([
      {
        label: 'Lista Pacienti',
        icon: 'pi pi-home',
        route: '/pets'
      },
      {
        label: 'Adauga Pacienti',
        icon: 'pi pi-home',
        route: '/addpet'
      },
    ]);

    console.log("Este autentificat:", isAuthenticated.value);

    const logout = async () => {
      await store.dispatch("logout");
      router.push("/login");
    };

    return { user, isAuthenticated, logout, items };
  },
};
</script>

<style scoped>
.wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.navbar {
  display: flex;
  justify-content: space-between;
  width: 100%;
  font-size: 16px;
}

.left-menu,
.right-menu {
  display: flex;
  gap: 20px;
}

.left-menu a,
.right-menu a {
  color: white;
  text-decoration: none;
  font-weight: bold;
}

.left-menu a:hover,
.right-menu a:hover {
  color: #007bff;
  background-color: transparent;
  padding: 5px;
}

@media (min-width: 1024px) {
  .navbar {
    font-size: 1rem;
  }
}

body {
  padding-top: 60px;
}
</style>
