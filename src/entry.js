import Vue from 'vue'
import VueRouter from 'vue-router'
import './style.less'

import Cal from './app/cal/cal.vue'


Vue.use(VueRouter)

const routes = [
    { path: '/cal', component: Cal },
]

const router = new VueRouter({
    routes
})
const app = new Vue({
    router
}).$mount('#app')