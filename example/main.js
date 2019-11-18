import Vue from 'vue';
import VueRouter from 'vue-router';
import app from './app.vue';
import routes from './route/route.config.js';
import './assets/style.css';
import { codemirror } from 'vue-codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/lib/codemirror.js';
import 'codemirror/theme/neo.css';
import 'codemirror/mode/javascript/javascript.js';
import 'codemirror/addon/hint/html-hint.js';
import 'codemirror/addon/hint/css-hint.js';
import 'codemirror/addon/hint/javascript-hint.js';
import * as d3 from 'd3';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
window.d3 = d3;
Vue.use(ElementUI);
Vue.use(codemirror);
Vue.use(VueRouter);
// route config
const router = new VueRouter({ linkExactActiveClass: 'active', linkActiveClass: 'active', routes });

// import d4 chart
var globalConfig = {
	enableColorModify: false,
	enableTitleModify: false,
	enableXLabelModify: false,
	enableYLabelModify: false,
	enableChartSelect: false
}

Vue.component('codemirror',codemirror);

new Vue({
	el: "#app",
	router,
	render: h => h(app)
})
