import Vue from 'vue'
import App from './App.vue'
import 'element-ui/lib/theme-chalk/index.css'
import Element from 'element-ui'
import locale from 'element-ui/lib/locale/lang/en'

Vue.config.productionTip = false
Vue.use(Element, { locale })

new Vue({
  render: h => h(App),
}).$mount('#app')
