<template>
    <section>
        <dailog size="tiny" :show.sync="myshow" classx="change-name" :title="title"  @ok="quire">
            <el-form slot="content"  :rules="rules" label-width="100px" ref="forms" class="demo-dynamic" :model="msgx" :error="132">
                <el-form-item label="登录密码" prop="password">
                    <el-input placeholder="登录密码" type="password" v-model.trim="msgx.password"></el-input>
                </el-form-item>
                <el-form-item label="新邮箱" prop="email">
                    <el-input placeholder="新邮箱" type="email" v-model.trim="msgx.email"></el-input>
                    <el-button type="info" :disabled="true" v-if="showResend" size="small">重新发送<i>{{timeouts}}</i>s</el-button>
                    <el-button @click.prevent="sendCode" type="info" v-else :disabled="statex" size="small">发送验证码</el-button>
                </el-form-item>
                <el-form-item label="验证码" prop="verifyCode">
                    <el-input placeholder="验证码"  v-model="msgx.verifyCode"  :maxlength="6"></el-input>
                </el-form-item>
            </el-form>
        </dailog>
    </section>
</template>   

<script>
const URL = {
    CHANGE_EMAIL: 'ypt.open.user.modifyEmailForWeb', // 修改邮箱
    SEND_EMAIL_CODE: 'ypt.open.userCenter.sendEmailVerificationCode', // 发送邮箱验证码
    CHECKPASSWORD: 'ypt.user.checkPassword', // 判断密码是否正确
    EXISTEMAIL: 'ypt.open.user.isExistEmailForWeb' // 判断邮箱是否存在
};
import dailog from '@/components/Dailog';
import { mapGetters } from 'vuex';
import {encryption} from '@/components/global.common';
export default {
    name: 'changeEmail',
    props: {
        showx: {
            type: Boolean,
            required: true,
            default () {
                return false;
            }
        },
        title: String
    },
    data () {
        // 新密码验证
        let validatenewpasswd = async (rule, value, callback) => {
            if (value === '') {
                this.pass_state = false;
                callback(new Error('请输入密码'));
            } else if (!/^\S{6,20}$/.test(value)) {
                this.pass_state = false;
                callback(new Error('密码长度在6-20个字符之间'));
            } else if (this.send_state) {
                await this.Http.post(URL.CHECKPASSWORD, {
                    loginAccount: this.loginAccount,
                    password: encryption(this.msgx.password, this.clientid, this.token)
                }).then((re) => {
                    if (re.code === '10110') {
                        this.pass_state = false;
                        callback(new Error('密码错误'));
                    } else if (re.code === 'SUCCESS') {
                        this.pass_state = true;
                        callback();
                    }
                });
            } else if (!this.pass_state) { // 提交时验证处理
                callback(new Error('密码错误'));
            } else {
                this.pass_state = true;
                callback();
            }
        };
        // 邮箱
        let validateemail = async (rule, value, callback) => {
            if (value === '') {
                this.malis_state = false;
                callback(new Error('请输入新邮箱'));
            } else if (!/^(?=\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$).{5,50}$/.test(value)) {
                this.malis_state = false;
                callback(new Error('新邮箱格式不正确,5-50字符之间'));
            } else if (this.send_state) {
                await this.Http.post(URL.EXISTEMAIL, {
                    params: this.msgx.email
                }).then((re) => {
                    if (re.data) {
                        this.malis_state = false;
                        callback(new Error('该邮箱已占用'));
                    } else {
                        this.malis_state = true;
                        callback();
                    }
                });
            } else if (!this.malis_state) { // 提交时验证处理
                callback(new Error('该邮箱已占用'));
            } else {
                this.malis_state = true;
                callback();
            }
        };
        return {
            myshow: false,
            msgx: {
                password: '',
                email: '',
                verifyCode: ''
            },
            malis_state: false, // emial状态
            pass_state: false, // 密码状态
            send_state: true,  // 发送状态
            timeouts: 60, // 倒计时时间
            showResend: false, // 显示倒计时按钮
            sendTime: null, // 定时器
            rules: {
                password: [
                    { required: true, validator: validatenewpasswd, trigger: 'blur' }
                ],
                email: [
                    { required: true, validator: validateemail, trigger: 'blur' }
                ],
                verifyCode: [
                    { required: true, message: '请输入验证码', trigger: 'blur' },
                    { pattern: /^\S{6}$/, message: '验证码长度6个字符', trigger: 'blur,change' }
                ]
            }
        };
    },
    computed: {
        ...mapGetters([
            'userno',
            'token',
            'clientid',
            'loginAccount'
        ]),
        // 可发送按钮是否禁用
        statex () {
            return !(this.malis_state && this.pass_state);
        }
    },
    mounted () {
        // console.log(this.statex, '213');
    },
    methods: {
        // 确认
        quire () {
            this.send_state = false;
            this.$refs.forms.validate((valid) => {
                this.send_state = true;
                if (!valid) {
                    return false;
                } else {
                    this.Http.post(URL.CHANGE_EMAIL, {
                        userNo: this.userno,
                        password: encryption(this.msgx.password, this.clientid, this.token),
                        verifyCode: this.msgx.verifyCode,
                        email: this.msgx.email
                    }).then((re) => {
                        if (re.data) {
                            this.$notify({
                                title: '成功',
                                message: '修改成功',
                                type: 'success'
                            });
                            this.myshow = false;
                            this.$emit('refresh');
                        }
                    });
                }
            });
        },
        // // 重置bug,模拟异步解决
        // reset () {
        //     setTimeout(() => {
        //         clearInterval(this.sendTime);
        //         this.malis_state = false;
        //         this.pass_state = false;
        //         this.send_state = true;
        //         this.showResend = false;
        //         this.timeouts = 60;
        //         this.$refs.forms.resetFields();
        //     }, 500);
        // },
        sendCode () {
            this.send_state = false;
            this.$refs.forms.validateField('password', (valid) => {
                if (valid) {
                    this.send_state = true;
                    return;
                }
                this.$refs.forms.validateField('email', (valid) => {
                    this.send_state = true;
                    if (valid) {
                        return;
                    } else {
                        this.Http.post(URL.SEND_EMAIL_CODE, {
                            appCode: 'yscm',
                            type: '9',
                            email: this.msgx.email
                        }).then((re) => {
                            if (re.data) {
                                this.showResend = true;
                                this.sendTime = setInterval(() => {
                                    this.timeouts--;
                                    if (this.timeouts === 0) {
                                        this.timeouts = 60;
                                        clearInterval(this.sendTime);
                                        this.showResend = false;
                                    }
                                }, 1000);
                            }
                        });
                    }
                });
            });
        }
    },
    watch: {
        myshow (val, oldval) {
            if (oldval && !val) {
                this.$emit('update:showx', false);
            }
        }
    },
    beforeMount () {
        this.myshow = this.showx;
    },
    components: {
        dailog
    }

};

</script>

<style scoped lang="scss" rel="stylesheet/scss">
.el-form-item {
    margin-bottom: 22px;
}
.demo-dynamic .el-input {
    margin-right: 10px;
    width: 270px;
    vertical-align: top;
}
</style>
