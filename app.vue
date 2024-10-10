<template>
  <div>
    <header>
      <nav>
        <NuxtLink to="/">Главная</NuxtLink>
      </nav>
    </header>
    <main>
      <NuxtPage />
    </main>
  </div>
</template>

<script setup lang="ts">

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap');
header {
  background-color: #ffffff;
  color: rgb(0, 0, 0);
  padding: 1rem;
}

nav {
  display: flex;
  gap: 1rem;
}
</style>
