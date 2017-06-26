import Http from '@/services/Http';
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
            sessionStorage.clear();
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
                    resolve();
                }
            }).catch(err => {
                throw new Error(err);
            });
        });
    }
};
