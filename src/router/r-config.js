/**
 * router配置文件
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './index.js';
import { state } from '@/store/index';
/**
 * router
 */
Vue.use(VueRouter);
const router = new VueRouter({
    routes,
    mode: 'history',
    strict: process.env.NODE_ENV !== 'production'
});
/**
 * router interceptor
 */
router.beforeEach((to, from, next) => {
    if (to.path !== '/auth' && from.path !== '/') {
        if (state.userInfo && state.userInfo.enterpriseNo) {
            next();
        } else {
            next({
                path: '/auth'
            });
        }
    } else if (from.path === '/') {
     // 用户刷新
        next();
    } else {
        next();
    }
});

export { router };

