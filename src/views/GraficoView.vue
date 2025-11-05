<template>
  <div class="grafico-view">
    <h2>Resumen Visual de Transacciones</h2>
    <div class="grid">
      <div class="col">
        <GraficoTransacciones :transacciones="transacciones" />
      </div>
      <div class="col">
        <GraficoTorta :transacciones="transacciones" />
      </div>
    </div>
  </div>
</template>

<script>
import GraficoTransacciones from '../components/GraficoTransacciones.vue'
import GraficoTorta from '../components/GraficoTorta.vue'

export default {
  name: 'GraficoView',
  components: { GraficoTransacciones, GraficoTorta },
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

<style scoped>
.grafico-view {
  padding: 20px;
}

.grid {
  display: flex;
  gap: 40px;
  flex-wrap: wrap;
}

.col {
  flex: 1;
  min-width: 300px;
}
.col canvas {
  min-height: 300px;
}
</style>
