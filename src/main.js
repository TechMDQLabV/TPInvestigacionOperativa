import Vue from 'vue'
import App from './App.vue'
import router from './router'
//import BootstrapVue from 'bootstrap-vue'
import './../node_modules/bootstrap/dist/js/jquery.min.js';
import './../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './../node_modules/bootstrap/dist/js/bootstrap.min.js';

Vue.config.productionTip = true
//Vue.config.use(BootstrapVue)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')