import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false

Vue.prototype.$apiSource = 1;  // 0、本地 mock 数据，1、api 数据

App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
