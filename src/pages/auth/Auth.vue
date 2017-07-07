<template>
    <div class="loginpage">
        <div class="loginbox">
            <h3 class="logo"></h3>
            <div class="loginForm">
                <form role="form" name="auth">
                    <div class="username">
                        <div class="usernameinner">
                            <input type="text" name="username" id="username" placeholder="请输入用户名" v-model="form.username" />
                        </div>
                    </div>
                    <div class="password">
                        <div class="passwordinner">
                            <input type="password" name="password" id="password" maxlength="20" placeholder="请输入密码" v-model="form.password" />
                        </div>
                    </div>
                    <div class="verify">
                        <div class="verifyimg">
                            <img id="imageCode" class="textbox" src="" :src="verifyImg" width="80" height="40" alt="验证码" title="点击刷新" />
                            <a @click="refreshCode()" href="javascript:void(0)">换一张？</a>
                        </div>
                        <div class="verifycode">
    
                            <div class="verifycodeinner">
                                <input type="text" name="verifycode" maxlength="4" id="verifycode" placeholder="验证码" v-model="form.verifycode" />
                            </div>
                        </div>
                    </div>
                    <label id="errorMsg" v-text="errorMsg"></label>
                    <button type="button" @click="login()">登录</button>
                </form>
            </div>
        </div>
    </div>
</template>
<script type="text/javascript">
import CONFIG from '@/config/app.config';
import { mapState, mapActions } from 'vuex';
import {encryption} from '@/services/global.common';
const URL = {
    VERIFY_CODE: '/verifyCode'
};
export default {
    data () {
        return {
            verifyImg: '',
            errorMsg: '',
            form: {
                username: 'yosemite',
                password: '123456',
                verifycode: '1243'
            }
        };
    },
    computed: {
        ...mapState(['userInfo'])
    },
    methods: {
        ...mapActions({
            'userLogin': 'login',
            'currentUser': 'currentUser',
            'getroles': 'getroles'
        }),
        // 刷新验证码
        refreshCode () {
            let config = CONFIG;
            let getRandomImg = () => {
                this.verifyImg = CONFIG.SERVER + URL.VERIFY_CODE + '?t=' + Math.round(Math.random() * 1000000);
            };
            if (config.DEV_MODE === 1) { // 开发,需跨域
                if (this.userInfo && this.userInfo.token) {
                    getRandomImg();
                } else {
                    this.currentUser().then(() => {
                        getRandomImg();
                    }, () => {
                        getRandomImg();
                    });
                }
            } else if (config.DEV_MODE === 2) { // 测试,无需跨域
                getRandomImg();
            }
        },
        // 登录
        login () {
            let xflag = false;
            let clientid = this.userInfo ? this.userInfo.clientId : null;
            let token = this.userInfo ? this.userInfo.token : null;
            let password = this.form.password;
            if (!/^[a-zA-Z0-9_-]{6,20}$/.test(this.form.username)) {
                xflag = true;
                this.errorMsg = this.form.username === '' ? '请输入用户名' : '用户名格式不正确';
                return;
            }

            if (!/^[a-zA-Z0-9_-]{6,20}$/.test(this.form.password)) {
                xflag = true;
                this.errorMsg = this.form.password === '' ? '请输入密码' : '密码长度6-20个字符';
                return;
            }
            if (!/^[a-zA-Z0-9]{4}$/.test(this.form.verifycode)) {
                xflag = true;
                this.errorMsg = this.form.verifycode === '' ? '请输入验证码' : '验证码格式不正确';
                return;
            }
            let param = Object.assign({}, this.form, {
                password: encryption(password, clientid, token)
            });
            if (!xflag) {
                this.userLogin(param).then(msg => {
                    this.$router.push({ name: 'index' });
                }, err => {
                    // 记录错误信息
                    this.errorMsg = err.message;
                    this.refreshCode();
                });
            }
        }
    },
    mounted () {
        this.refreshCode();
    },
    beforeRouteLeave (to, from, next) {
        // 获取权限
        this.getroles().then(() => {
            next();
        });
    }  
};
</script>

<style scoped lang="scss" rel="stylesheet/scss">
/*  登录页样式  */

.loginpage {
    position: absolute;
    width: 100%;
    height: 100%;
    background: #4c88c7 url(img/ERP-bg.jpg) no-repeat;
    background-size: cover;
}

.loginbox {
    width: 400px;
    overflow: hidden;
    height: 420px;
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -200px;
    margin-top: -260px;

    .logo {
        height: 81px;
        margin-bottom: 40px;
        margin-top: 0;
        background-image: url(img/ERPlogo.png);
        background-position: center top;
        background-repeat: no-repeat;
    }

    .loginForm {
        border-top: solid 4px #7eb9f4;
        padding: 40px;
        background-color: #fff;
    }
}

.loginbox .username,
.loginbox .password,
.loginbox .verifycode {
    background: #fff url(img/login.png) no-repeat 0px -8px;
    margin-bottom: 10px;
    border: 1px solid #c1c1c1;
}

.loginbox .usernameinner,
.loginbox .passwordinner,
.loginbox .verifycodeinner {
    margin-left: 45px;
    border-left: 1px solid #ddd;
    background: #fff;
}

.loginbox .username input,
.loginbox .password input {
    width: 270px;
    height: 36px;
    line-height: 36px;
    border: none;
    font-size: 14px;
    color: #666;
    text-indent: 12px;
}

.loginbox .password {
    background-position: 0 center;
}

.loginbox .verify {

    $vWidth: 137px;

    .verifycode {
        margin-right: $vWidth;
        margin-bottom: 30px;
        background-position: 0 -105px;

        .verifycodeinner {

            input {
                width: 100%;
                height: 36px;
                line-height: 36px;
                text-indent: 12px;
                border: none;
            }
        }
    }
    .verifyimg {
        width: $vWidth;
        float: right;

        a {
            float: right;
            line-height: 40px;
        }
    }
}

.loginbox button {
    width: 100%;
    height: 39px;
    line-height: 39px;
    background: #4f9ce8;
    text-align: center;
    font-size: 16px;
    font-weight: normal;
    color: #fff;
    border: 0;
    letter-spacing: 10px;
    padding: 0;

    &:hover {
        background-color: #4f9ce8 +10%;
        cursor: pointer;
    }
}

.loginbox #errorMsg {
    position: absolute;
    left: 40px;
    bottom: 90px;
    color: #e23934;
    display: block;
}
</style>
