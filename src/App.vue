<template>
  <div class="container">
    <nav>
      <router-link to="/">Inicio</router-link>
      <router-link to="/grafico">Gráfico</router-link>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style scoped>
nav {
  display: flex;
  gap: 20px;
  margin-bottom: 20px;
}
</style>
