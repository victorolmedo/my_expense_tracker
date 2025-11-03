<template>
  <div class="container">
    <h1>Mi App de Finanzas</h1>
    <FormularioTransaccion @transaccion-agregada="recargarTransacciones" />
    <ListaTransacciones :actualizar="actualizar" />
  </div>
</template>


<script>
import ListaTransacciones from './components/ListaTransacciones.vue'
import FormularioTransaccion from './components/FormularioTransaccion.vue'
export default {
  name: 'App',
  components: {
    ListaTransacciones,
    FormularioTransaccion
  },
  data() {
    return {
      actualizar: false
    }
  },
  methods: {
    recargarTransacciones() {
      this.actualizar = !this.actualizar  // ✅ Cambia valor para forzar actualización
    }
  }
}

</script>
<style>
body {
  font-family: 'Segoe UI', sans-serif;
  background-color: #f9f9f9;
  margin: 0;
  padding: 20px;
}

h1 {
  text-align: center;
  color: #333;
}

h2 {
  margin-top: 40px;
  color: #444;
}

.container {
  max-width: 900px;
  margin: auto;
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0,0,0,0.05);
}
</style>
