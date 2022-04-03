import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import modal from './plugins/ModalWindow'   //Подключаем плагин modal

Vue.config.productionTip = false;
Vue.use(modal); //Устанавливаем плагин modal

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
