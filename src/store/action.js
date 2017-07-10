import Http from '@/services/Http';
import { menu } from '@/router/index';
export default {
    // 登录
    login (context, data) {
        return new Promise((resolve, reject) => {
            Http.post('login', data).then(result => {
                let userinfo = result || {};
                if (userinfo.data) {
                    context.commit('CHANGEUSER', userinfo.data);
                    resolve(userinfo);
                } else {
                    reject(userinfo);
                }
            }, err => {
                reject(err);
            });
        });
    },
    // 退出
    async logout (context, data) {
        return await (function () {
            context.commit('CLEARSTATE');
        }());
    },
    // 当前用户信息
    currentUser ({ commit, state }) {
        return new Promise((resolve, reject) => {
            state.userInfo && state.userInfo.enterpriseNo ? resolve(state.userInfo) // 判断是否需要去请求
                : Http.post('currentUser', {
                    token: state.userInfo ? state.userInfo.token : ''
                }).then(result => {
                    // 获取token 获取登录信息
                    let user = result.data || {};
                    commit('CHANGEUSER', user);
                    resolve(user);
                    //  user.loginUrl = state.userInfo && state.userInfo.loginUrl;
                }, err => {
                    reject(err);
                });
        });
    },
    // 获取用户信息
    async getInfo ({ commit, state }) {
        return await (function () {
            commit('REFRESH');
        }());
    },
    // 获取用户权限
    getroles ({commit, state}) {
        return new Promise((resolve, reject) => {
            state.roles ? resolve(state.roles) : Http.post('ypt.user.findRightsByUserNoAndAppRole', {
                userNo: state.userInfo.userNo,
                appCode: 'YSCM',
                appRole: ''
            }).then(res => {
                if (res.data.permissionSet) {
                    commit('GETROLES', res.data.permissionSet);
                    resolve(state.roles);
                } else {
                    reject(); 
                }
            }).catch(err => {
                reject(err);
            });
        });
    },
    // 生成路由
    async generateRouters ({commit, state}, roles) {
        let menulist = [];
        menu.forEach(item => {     
            if (roles.indexOf(item.meta.role) === -1) {
                return;  
            } else {
                item.state = '/dashboard/' + item.path;
                if (item.children) {
                    item.children.forEach(children => {  
                        if (roles.indexOf(children.meta.role) === -1) {
                            return;
                        } else {
                            children.state = item.state + '/' + children.path;
                        }
                    });         
                } else {
                    delete item.children; 
                }     
            }   
            menulist.push(item);    
        });     
        return await commit('SET_ROUTERS', menulist);
    }
};
