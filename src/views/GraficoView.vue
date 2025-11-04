<template>
  <div>
    <h2>Resumen Gráfico de Transacciones</h2>
    <GraficoTransacciones :transacciones="transacciones" />
  </div>
</template>

<script>
import GraficoTransacciones from '../components/GraficoTransacciones.vue'

export default {
  name: 'GraficoView',
  components: { GraficoTransacciones },
  data() {
    return {
      transacciones: []
    }
  },
  mounted() {
    fetch('http://localhost:8000/transacciones')
      .then(res => res.json())
      .then(data => {
        console.log('Transacciones cargadas:', data)
        this.transacciones = data
      })
  }
}
</script>
