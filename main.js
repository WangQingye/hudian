import Vue from 'vue'
import App from './App'
import util from './common/index.js'
import uView from "uview-ui";
Vue.use(uView);
Vue.config.productionTip = false
Vue.prototype.$util = new util()
App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
