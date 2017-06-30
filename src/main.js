import Vue from 'vue';
import store from './store/index.js'; // vuex store
import {router} from './router/r-config.js'; // router配置
import iView from '@/services/iview-config.js';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-default/index.css';
import App from './App';
import Http from './services/Http';
Vue.use(iView);
Vue.use(ElementUI);
Vue.config.productionTip = false; // 在应用启动时，可以通过设置 Vue.config.productionTip = false 来关闭生产模式下给出的提示
window._ = require('lodash');
window.$ = require('jquery');
/**
 * axios添加原型链上
 */
Vue.prototype.Http = Http;

new Vue({ // eslint-disable-line no-new
    el: '#app',
    store,
    router,
    render: h => h(App)
});

