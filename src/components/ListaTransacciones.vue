<template>
  <div>
    <h2>Lista de Transacciones</h2>
    <label>Desde:</label>
    <input type="date" v-model="fechaInicio" />
    <label>Hasta:</label>
    <input type="date" v-model="fechaFin" />
    <button @click="filtrarPorFecha">Filtrar</button>

    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Tipo</th>
          <th>Monto</th>
          <th>Categoría</th>
          <th>Descripción</th>
          <th>Fecha</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="t in ListaTransacciones" :key="t.id">
          <td>{{ t.id }}</td>
          <td>{{ t.tipo }}</td>
          <td>{{ t.monto }}</td>
          <td>{{ t.categoria }}</td>
          <td>{{ t.descripcion }}</td>
          <td>{{ t.fecha }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: 'ListaTransacciones',
  props: ['actualizar'],
  data() {
    return {
      ListaTransacciones: [],
      fechaInicio: '',
      fechaFin: ''
    }
  },
  watch: {
    actualizar() {
      this.cargarTransacciones()
    }
  },
  methods: {
    cargarTransacciones() {
      fetch('http://127.0.0.1:8000/transacciones')
        .then(res => res.json())
        .then(data => {
          this.ListaTransacciones = data
        })
        .catch(err => console.error(err))
    },
    filtrarPorFecha() {
      const inicio = new Date(this.fechaInicio)
      const fin = new Date(this.fechaFin)

      this.transacciones = this.transacciones.filter(t => {
        const fecha = new Date(t.fecha)
        return fecha >= inicio && fecha <= fin
      })
}

  },
  mounted() {
    this.cargarTransacciones()
  }
}
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  padding: 8px;
  border: 1px solid #ccc;
}
</style>
