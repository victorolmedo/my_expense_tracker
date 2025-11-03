<template>
  <div class="container">
    <h1>Mi App de Finanzas</h1>
    <div class="grid">
      <div class="col">
        <FormularioTransaccion @transaccion-agregada="recargarTransacciones" />
      </div>
      <div class="col">
        <ListaTransacciones :actualizar="actualizar" />
      </div>
    </div>
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

.container {
  max-width: 1200px;
  margin: auto;
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0,0,0,0.05);
}

.grid {
  display: flex;
  gap: 20px;
  margin-top: 30px;
}

.col {
  flex: 1;
  min-width: 0;
}
</style>
