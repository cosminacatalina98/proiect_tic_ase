<script setup>
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <header>
    <div class="wrapper">

      <nav class="navbar">
        <div class="left-menu">
          <RouterLink to="/pets">Lista Pacienți</RouterLink>
          <RouterLink to="/addpet">Adaugă Pacient</RouterLink>
        </div>

      
        <div class="right-menu">
          <RouterLink to="/profile">Profil</RouterLink>
        </div>
      </nav>
    </div>
  </header>

  
  <RouterView />
</template>

<style scoped>
header {
  position: fixed; 
  top: 0;
  left: 0;
  width: 100%;
  background-color: #333; 
  color: white;
  z-index: 1000; 
  padding: 10px 20px;
  
}

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
