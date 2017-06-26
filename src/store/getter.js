export default {
    // 用户token
    token: (state) => state.userInfo && state.userInfo.token,
    userno: (state) => state.userInfo && state.userInfo.userNo,
    clientid: (state) => state.userInfo && state.userInfo.clientId,
    loginAccount: (state) => state.userInfo && state.userInfo.loginAccount
};
