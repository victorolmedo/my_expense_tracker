import { createRouter, createWebHistory } from 'vue-router'
import InicioView from '../views/InicioView.vue'
import GraficoView from '../views/GraficoView.vue'

const routes = [
  { path: '/', component: InicioView },
  { path: '/grafico', component: GraficoView }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
