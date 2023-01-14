import Vue from 'vue'
import App from './App.vue'
import Buefy from 'buefy'
import 'buefy/dist/buefy.css'
import router from './router'
import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'

import Axios from "axios"

Vue.config.productionTip = false

Vue.use(Buefy);
Vue.prototype.$http = Axios;
//axios.defaults.headers.common['Authorization']

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
