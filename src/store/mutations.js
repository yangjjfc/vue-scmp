import { CHANGEUSER, REFRESH, CLEARSTATE, HEIGHTRESIZE, GETROLES, DEFAULTOPEN, SET_ROUTERS } from './mutation-types.js';

export default {
    // 用户登入
    [CHANGEUSER] (state, data) {
        state.userInfo = data;
        sessionStorage.setItem('user', JSON.stringify(state.userInfo));
    },
    // 用户刷新,重新赋值
    [REFRESH] (state, data) {
        let user = JSON.parse(sessionStorage.getItem('user'));
        let roles = JSON.parse(sessionStorage.getItem('roles'));
        state.userInfo = user || null;
        state.roles = roles || null; 
    },
    // 用户退出,清除数据
    [CLEARSTATE] (state, data) {
        for (let item in state) {
            state[item] = null;
        }
    },
    // 获取窗口高度
    [HEIGHTRESIZE] (state, data) {
        state.windowHeight = data;
    },
    // 获取权限
    [GETROLES] (state, data) {
        state.roles = data;
        sessionStorage.setItem('roles', JSON.stringify(state.roles));
    },
    // 默认打开
    [DEFAULTOPEN] (state, data) {
        if (state.defaultOpen.indexOf(data) === -1) {
            state.defaultOpen.push(data);  
        }
    },
    // 设置路由
    [SET_ROUTERS] (state, data) {
        state.routers = data;  
    }
};

