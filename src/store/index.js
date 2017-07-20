import Vue from 'vue';
import Vuex from 'vuex';
import mutations from './mutations';
import actions from './action';
import getters from './getter';

Vue.use(Vuex);
export const state = {
    userInfo: null, // 用户信息
    $windowHeight: null, // 浏览器高度
    roles: null, // 用户权限
    defaultOpen: null, // 默认打开
    routers: null // 路由
};

export default new Vuex.Store({
    state,
    getters,
    actions,
    mutations
});

