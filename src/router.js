import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import AddProv from './views/AddProv.vue'
import ListProv from './views/ListProv.vue'
import AddProd from './views/AddProd.vue'
import Compras from './views/Compras.vue'
import ListProd from './views/ListProd.vue'
import ListProdVendidos from './views/ListProdVendidos.vue'
import Ventas from './views/Ventas.vue'
import ListVentas from './views/ListVentas.vue'
import Delete from './views/Delete.vue'
import User from './views/User'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/addProv',
      name: 'addProv',
      component: AddProv
    },
    {
      path: '/listProv',
      name: 'listProv',
      component: ListProv
    },
    {
      path: '/addProd',
      name: 'addProd',
      component: AddProd
    },
    {
      path: '/compras',
      name: 'compras',
      component: Compras
    },
    {
      path: '/listProd',
      name: 'listProd',
      component: ListProd
    },
    {
      path: '/listProdVendidos',
      name: 'listProdVendidos',
      component: ListProdVendidos
    },
    {
      path: '/ventas',
      name: 'ventas',
      component: Ventas
    },
    {
      path: '/listVentas',
      name: 'listVentas',
      component: ListVentas
    },
    {
      path: '/delete',
      name: 'delete',
      component: Delete
    },
    {
      path: '/user/:id',
      name: 'user',
      component: User
    }
  ]
})
