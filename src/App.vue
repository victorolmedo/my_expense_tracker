<template>
  <div id="app">
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
