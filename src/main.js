import Vue from 'vue';
import store from './store/index.js'; // vuex store
import {router} from './router/r-config.js'; // router配置
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import Http from './services/Http';
import vueWaves from '@/assets/directive/waves';// 水波纹指令
import pagination from '@/components/pagination'; // 分页组件
window.$ = require('jquery');
import boxer from '@/assets/directive/boxer.js'; // jq boxer指令
import dailog from '@/components/Dailog'; // 弹框组件
import App from './App';
// 全局指令
Vue.use(ElementUI);
Vue.use(vueWaves);
Vue.use(boxer);
// 全局组件
Vue.component('pagination', pagination); 
Vue.component('dailog', dailog);
Vue.prototype.Http = Http;
Vue.config.productionTip = false; // 在应用启动时，可以通过设置 Vue.config.productionTip = false 来关闭生产模式下给出的提示

new Vue({ // eslint-disable-line no-new
    el: '#app',
    store,
    router,
    render: h => h(App)
});

