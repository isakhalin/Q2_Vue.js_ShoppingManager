import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import modal from './plugins/ModalWindow'   //Подключаем плагин modal
import modalEditMenu from './plugins/ModalEditMenu'

Vue.config.productionTip = false;
Vue.use(modal); //Устанавливаем плагин modal
Vue.use(modalEditMenu);

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
