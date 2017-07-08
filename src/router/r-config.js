/**
 * router配置文件
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import routes from './index.js';
import store from '@/store/index';
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
    if (to.meta.open) {
        store.commit('DEFAULTOPEN', to.meta.open);
    } 
    if (to.path === '/auth') {
        next();
    } else if (to.path !== '/auth' && from.path !== '/') { // 非登入页或不是'/'跳转
        if (store.state.roles) {
            next();
            // if (store.state.roles.indexof(to.meat.role) !== -1) {
            //     next();
            // } else {
            //     next({
            //         path: '/auth' 
            //     });  
            // }
        } else {
            next({
                path: '/auth'
            });
        }
    } else if (from.path === '/' && window.sessionStorage.getItem('roles')) {
     // 用户刷新
        next();
    } else {
        next({
            path: '/auth'
        }); 
    }
}); 

export { router };

