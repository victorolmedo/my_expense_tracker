<template>
  <div class="inicio">
    <h1>Finanzas</h1>
    <div class="grid">
      <div class="col izquierda">
        <FormularioTransaccion @nueva="cargarTransacciones" />
      </div>
      <div class="col derecha">
        <ListaTransacciones
          :transacciones="transacciones"
          @actualizar="cargarTransacciones"
        />
      </div>
    </div>
  </div>
</template>

<script>
import FormularioTransaccion from '../components/FormularioTransaccion.vue'
import ListaTransacciones from '../components/ListaTransacciones.vue'

export default {
  name: 'InicioView',
  components: { FormularioTransaccion, ListaTransacciones },
  data() {
    return {
      transacciones: []
    }
  },
  mounted() {
    this.cargarTransacciones()
  },
  methods: {
    cargarTransacciones() {
      fetch('http://localhost:8000/transacciones')
        .then(res => res.json())
        .then(data => {
          this.transacciones = data
        })
    }
  }
}
</script>

<style scoped>
.inicio {
  padding: 20px;
}

.grid {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

.col {
  flex: 1;
  min-width: 300px;
}

.izquierda {
  max-width: 400px;
}

.derecha {
  flex-grow: 1;
}
</style>
