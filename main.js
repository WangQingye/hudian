import Vue from 'vue'
import App from './App'
import util from './common/index.js'
import uView from "uview-ui"
import aTip from "@/components/a_tip/aTip"
Vue.component("aTip", aTip);
Vue.use(uView);
Vue.config.productionTip = false
Vue.prototype.$util = new util()
App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
