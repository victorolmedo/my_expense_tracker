<template>
  <div>
    <h2>Registrar Nueva Transacción</h2>
    <form @submit.prevent="enviarTransaccion">
      <label>Tipo:</label>
      <select v-model="transaccion.tipo" required>
        <option value="ingreso">Ingreso</option>
        <option value="egreso">Egreso</option>
      </select>

      <label>Monto:</label>
      <input type="number" v-model.number="transaccion.monto" required />

      <label>Categoría:</label>
      <input type="text" v-model="transaccion.categoria" required />

      <label>Descripción:</label>
      <input type="text" v-model="transaccion.descripcion" required />

      <label>Fecha:</label>
      <input type="date" v-model="transaccion.fecha" required />

      <button type="submit">Guardar</button>
    </form>

    <p v-if="mensaje">{{ mensaje }}</p>
  </div>
</template>

<script>
export default {
  name: 'FormularioTransaccion',
  data() {
    return {
      transaccion: {
        tipo: 'ingreso',
        monto: null,
        categoria: '',
        descripcion: '',
        fecha: ''
      },
      mensaje: ''
    }
  },
  methods: {
    async enviarTransaccion() {
      try {
        const res = await fetch('http://localhost:8000/transacciones', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.transaccion)
        })
        const data = await res.json()
        this.mensaje = `Transacción #${data.id} registrada con éxito`
        this.transaccion = {
          tipo: 'ingreso',
          monto: null,
          categoria: '',
          descripcion: '',
          fecha: ''
        }
        this.$emit('transaccion-agregada')  // ✅ Emitimos evento
      } catch (error) {
        console.error(error)
        this.mensaje = 'Error al registrar transacción'
      }
    },
        async eliminar(id) {
        if (!confirm('¿Estás seguro de que deseas eliminar esta transacción?')) return

        try {
            await fetch(`http://localhost:8000/transacciones/${id}`, {
            method: 'DELETE'
            })
            this.cargarTransacciones()
        } catch (error) {
            console.error('Error al eliminar:', error)
        }
        }

  }
}
</script>

<style scoped>
form {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
  margin-top: 20px;
}

label {
  grid-column: span 2;
  font-weight: bold;
  margin-top: 10px;
}

input, select {
  grid-column: span 2;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  grid-column: span 2;
  padding: 10px;
  background-color: #007acc;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #005fa3;
}

p {
  grid-column: span 2;
  color: green;
  margin-top: 10px;
}
</style>

