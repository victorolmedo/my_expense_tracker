<template>
  <div>
    <h2>Lista de Transacciones</h2>
    <label>Desde:</label>
    <input type="date" v-model="fechaInicio" />
    <label>Hasta:</label>
    <input type="date" v-model="fechaFin" />
    <button @click="filtrarPorFecha">Filtrar</button>
    <button @click="exportarCSV">Exportar CSV</button>
    <button @click="exportarPDF">Exportar PDF</button>

    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Tipo</th>
          <th>Monto</th>
          <th>Categoría</th>
          <th>Descripción</th>
          <th>Fecha</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="t in transaccionesPaginadas" :key="t.id">
          <td>{{ t.id }}</td>
          <td>{{ t.tipo }}</td>
          <td>{{ t.monto }}</td>
          <td>{{ t.categoria }}</td>
          <td>{{ t.descripcion }}</td>
          <td>{{ t.fecha }}</td>
          <td>
            <button @click="editar(t)">✏️</button>
            <button @click="eliminar(t.id)">🗑️</button>
          </td>

        </tr>
      </tbody>
    </table>
    <div class="paginacion">
    <button @click="paginaActual--" :disabled="paginaActual === 1">Anterior</button>
    <span>Página {{ paginaActual }} de {{ totalPaginas }}</span>
    <button @click="paginaActual++" :disabled="paginaActual === totalPaginas">Siguiente</button>
  </div>

  <div v-if="transaccionEditando">
    <h3>Editar Transacción #{{ transaccionEditando.id }}</h3>
    <form @submit.prevent="guardarEdicion">
      <label>Tipo:</label>
      <select v-model="transaccionEditando.tipo">
        <option value="ingreso">Ingreso</option>
        <option value="egreso">Egreso</option>
      </select>

      <label>Monto:</label>
      <input type="number" v-model.number="transaccionEditando.monto" />

      <label>Categoría:</label>
      <input type="text" v-model="transaccionEditando.categoria" />

      <label>Descripción:</label>
      <input type="text" v-model="transaccionEditando.descripcion" />

      <label>Fecha:</label>
      <input type="date" v-model="transaccionEditando.fecha" />

      <button type="submit">Guardar</button>
      <button type="button" @click="transaccionEditando = null">Cancelar</button>
    </form>
  </div>
  </div>
</template>

<script>
import jsPDF from 'jspdf/dist/jspdf.umd'
import autoTable from 'jspdf-autotable'


export default {
  
  name: 'ListaTransacciones',
  props: ['actualizar'],
  data() {
    const fechaHoy = new Date().toISOString().split('T')[0]  // ✅ yyyy-MM-dd
    return {
      ListaTransacciones: [],
      todas: [],
      fechaInicio: fechaHoy,
      fechaFin: fechaHoy,
      paginaActual: 1,
      porPagina: 10,
      transaccionEditando: null 
    }
  },
  watch: {
    actualizar() {
      this.cargarTransacciones()
    }
  },
  methods: {
    async cargarTransacciones() {
      try {
        const res = await fetch('http://localhost:8000/transacciones')
        const data = await res.json()
        this.ListaTransacciones = data
        this.todas = data  // ✅ Copia completa para filtrar
      } catch (error) {
        console.error('Error al cargar transacciones:', error)
      }
    },
      filtrarPorFecha() {
        if (!this.todas || !Array.isArray(this.todas)) return

        this.ListaTransacciones = this.todas.filter(t => {
          return t.fecha >= this.fechaInicio && t.fecha <= this.fechaFin
        })

        this.paginaActual = 1
      },
    editar(t) {
      this.transaccionEditando = { ...t }  // ✅ Copia del objeto para edición
    },
    eliminar(id) {
      if (!confirm('¿Estás seguro de que deseas eliminar esta transacción?')) return

      fetch(`http://localhost:8000/transacciones/${id}`, {
        method: 'DELETE'
      })
        .then(() => this.cargarTransacciones())
        .catch(err => console.error(err))
    },
    guardarEdicion() {
      fetch(`http://localhost:8000/transacciones/${this.transaccionEditando.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.transaccionEditando)
      })
        .then(() => {
          this.transaccionEditando = null
          this.cargarTransacciones()
        })
        .catch(err => console.error(err))
    },exportarCSV() {
          const filas = this.transaccionesPaginadas.map(t => [
            t.id, t.tipo, t.monto, t.categoria, t.descripcion, t.fecha
          ])

          const encabezado = ['ID', 'Tipo', 'Monto', 'Categoría', 'Descripción', 'Fecha']
          const csv = [encabezado, ...filas]
            .map(fila => fila.map(campo => `"${campo}"`).join(','))
            .join('\n')

          const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' })
          const link = document.createElement('a')
          link.href = URL.createObjectURL(blob)
          link.download = `transacciones_${this.fechaInicio}_a_${this.fechaFin}.csv`
          link.click()
    },
exportarPDF() {
      const doc = new jsPDF()
      doc.text(`Transacciones del ${this.fechaInicio} al ${this.fechaFin}`, 14, 15)

      const filas = this.transaccionesPaginadas.map(t => [
        t.id, t.tipo, t.monto, t.categoria, t.descripcion, t.fecha
      ])

      autoTable(doc, {
        head: [['ID', 'Tipo', 'Monto', 'Categoría', 'Descripción', 'Fecha']],
        body: filas,
        startY: 20
      })

      doc.save(`transacciones_${this.fechaInicio}_a_${this.fechaFin}.pdf`)
    }

  },
  mounted() {
    this.cargarTransacciones()
  },
  computed: {
  transaccionesPaginadas() {
    const inicio = (this.paginaActual - 1) * this.porPagina
    const fin = inicio + this.porPagina
    return this.ListaTransacciones.slice(inicio, fin)
  },
  totalPaginas() {
    return Math.ceil(this.ListaTransacciones.length / this.porPagina)
  }
}

}
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th {
  background-color: #007acc;
  color: white;
  padding: 10px;
  text-align: left;
}

td {
  padding: 8px;
  border-bottom: 1px solid #ddd;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}

input[type="date"] {
  padding: 6px;
  margin-right: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  padding: 6px 12px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #218838;
}
.paginacion {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.paginacion button {
  padding: 6px 12px;
  background-color: #007acc;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.paginacion button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
</style>
