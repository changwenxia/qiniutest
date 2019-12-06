import Vue from 'vue'
import App from './App.vue'
// import ElementUI from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';
import '@xiyun/element-ui/lib/index.css';
import XyUI from '@xiyun/element-ui';
import  { Table, TableColumn}from 'element-ui';
Vue.use(Table);
Vue.use(TableColumn);

Vue.use(XyUI);


import router from './router'
import store from './store'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
