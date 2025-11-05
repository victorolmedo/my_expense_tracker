<template>
  <div>
    <canvas id="graficoTorta"></canvas>
  </div>
</template>

<script>
import {
  Chart,
  PieController,
  ArcElement,
  Tooltip,
  Legend
} from 'chart.js'

Chart.register(PieController, ArcElement, Tooltip, Legend)

export default {
  name: 'GraficoTorta',
  props: ['transacciones'],
  watch: {
    transacciones: {
      handler(nuevas) {
        if (nuevas.length > 0) {
          this.renderizarGrafico(nuevas)
        }
      },
      immediate: true
    }
  },
  methods: {
    renderizarGrafico(transacciones) {
      const egresos = {}

      transacciones.forEach(t => {
        if (t.tipo === 'egreso') {
          const cat = t.categoria || 'Sin categoría'
          const monto = Number(t.monto)
          egresos[cat] = (egresos[cat] || 0) + monto
        }
      })

      const categorias = Object.keys(egresos)
      const montos = categorias.map(cat => egresos[cat])
      const colores = [
        '#FF6384', '#36A2EB', '#FFCE56', '#8E44AD', '#2ECC71', '#E67E22'
      ]

      const canvas = document.getElementById('graficoTorta')
      if (!canvas) return
      const ctx = canvas.getContext('2d')

      new Chart(ctx, {
        type: 'pie',
        data: {
          labels: categorias,
          datasets: [{
            data: montos,
            backgroundColor: colores.slice(0, categorias.length)
          }]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { position: 'top' },
            tooltip: { mode: 'index', intersect: false }
          }
        }
      })
    }
  }
}
</script>

<style scoped>
canvas {
  width: 70% !important;
  height: 70% !important;
  max-width: 100%;
  margin-top: 20px;
}
</style>

