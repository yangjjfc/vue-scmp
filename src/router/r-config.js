/**
 * router配置文件
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import routes, {layout} from './index.js';
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
    // 添加菜单打开项
    if (to.meta.open) {
        store.commit('DEFAULTOPEN', to.meta.open);
    } 
    // 跳转登录页
    if (to.path === '/auth') {
        next();
    } else if (from.path !== '/') { // 从根路径跳转
        // 判断权限是否存在
        if (store.state.roles) {
            console.log(111);
            next();
        } else {
            console.log(222);
            // 权限不存在,获取权限
            store.dispatch('getroles').then(res => {
                store.dispatch('generateRouters', res).then(() => {
                    if (store.state.routers.length) {
                        layout.children = store.state.routers;
                        router.addRoutes(layout); 
                        next({ ...to });
                    } else {
                        next({ 
                            path: '/auth'
                        });    
                    }
                });
            }).catch(errs => {
                next({ 
                    path: '/auth'
                });    
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

