<template>
  <div>
    <canvas id="graficoTransacciones"></canvas>
  </div>
</template>
<script>
import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
} from 'chart.js'

Chart.register(BarController, BarElement, CategoryScale, LinearScale, Tooltip, Legend)

export default {
  name: 'GraficoTransacciones',
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
      const ingresos = {}
      const egresos = {}

      transacciones.forEach(t => {
        const monto = Number(t.monto)
        const cat = t.categoria || 'Sin categoría'
        if (t.tipo === 'ingreso') {
          ingresos[cat] = (ingresos[cat] || 0) + monto
        } else {
          egresos[cat] = (egresos[cat] || 0) + monto
        }
      })

      const categorias = Array.from(new Set([
        ...Object.keys(ingresos),
        ...Object.keys(egresos)
      ]))

      const datosIngresos = categorias.map(cat => ingresos[cat] || 0)
      const datosEgresos = categorias.map(cat => egresos[cat] || 0)

      const canvas = document.getElementById('graficoTransacciones')
      if (!canvas) return
      const ctx = canvas.getContext('2d')

      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: categorias,
          datasets: [
            {
              label: 'Ingresos',
              data: datosIngresos,
              backgroundColor: 'rgba(0, 200, 83, 0.7)'
            },
            {
              label: 'Egresos',
              data: datosEgresos,
              backgroundColor: 'rgba(255, 82, 82, 0.7)'
            }
          ]
        },
        options: {
          responsive: true,
          plugins: {
            legend: { position: 'top' },
            tooltip: { mode: 'index', intersect: false }
          },
          scales: {
            y: { beginAtZero: true }
          }
        }
      })
    }
  }
}
</script>


<style scoped>
canvas {
  max-width: 100%;
  margin-top: 20px;
}
</style>
