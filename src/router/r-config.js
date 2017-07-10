/**
 * router配置文件
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
import routes, { layout } from './index.js';
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
    } else {
        // 判断权限是否存在  
        if (store.state.roles) {
            if (store.state.roles.indexOf(to.meta.role) > 0) { // 判断该路由是否有权限
                next();
            } else {
                next('/auth');
            }
        } else {
            store.dispatch('getInfo').then(() => {
                // 权限不存在,获取权限
                store.dispatch('getroles').then(res => {
                    store.dispatch('generateRouters', res).then(() => {
                        // 路由长度
                        if (store.state.routers.length) {
                            layout.children = store.state.routers;
                            router.addRoutes([layout]); // 必须是数组,动态添加可访问路由表
                            next({ ...to });// hack方法 确保addRoutes已完成
                        } else {
                            next('/auth');
                        }
                    });
                }).catch(errs => {
                    // 无法获取权限则跳到登入页,无权限进入系统
                    next('/auth');
                });
            });
        }
    }
});

export { router };

