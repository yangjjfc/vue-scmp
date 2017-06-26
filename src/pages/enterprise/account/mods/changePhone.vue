<template>
    <section>
        <dailog size="tiny" :show.sync="myshow" classx="change-name" :title="title" @ok="quire">
            <el-form slot="content"  :rules="rules" label-width="100px" ref="forms" class="demo-dynamic" :model="msgx">
                <el-form-item label="登录密码" prop="password">
                    <el-input placeholder="登录密码" type="password" v-model.trim="msgx.password"></el-input>
                </el-form-item>
                <el-form-item label="新手机号" prop="phone">
                    <el-input placeholder="新手机号" type="phone" v-model.trim="msgx.phone"></el-input>
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
    CHANGE_PHONE: 'ypt.open.user.modifyMobilePhoneForWeb', // 修改邮箱
    SEND_PHONE_CODE: 'ypt.verification.sendMobileVerificationCodeEx', // 发送短信验证码
    CHECKPASSWORD: 'ypt.user.checkPassword', // 判断密码是否正确
    ISEXIST: 'ypt.open.user.isExistMobileForWeb' // 判断手机号是否存在
};
import dailog from '@/components/Dailog';
import { mapGetters } from 'vuex';
import {encryption} from '@/components/global.common';
export default {
    name: 'changePhone',
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
            } else if (!this.pass_state) {
                callback(new Error('密码错误'));
            } else {
                this.pass_state = true;
                callback();
            }
        };
        // 邮箱
        let validateemail = async (rule, value, callback) => {
            if (value === '') {
                this.phone_state = false;
                callback(new Error('请输入新手机号'));
            } else if (!/^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/.test(value)) {
                this.phone_state = false;
                callback(new Error('新手机号格式有误,长度11个字符'));
            } else if (this.send_state) {
                await this.Http.post(URL.ISEXIST, {
                    params: this.msgx.phone
                }).then((re) => {
                    if (re.data) {
                        this.phone_state = false;
                        callback(new Error('该手机号已占用'));
                    } else {
                        this.phone_state = true;
                        callback();
                    }
                });
            } else if (!this.phone_state) {
                callback(new Error('该手机号已占用'));
            } else {
                this.phone_state = true;
                callback();
            }
        };
        return {
            myshow: false,
            msgx: {
                password: '',
                phone: '',
                verifyCode: ''
            },
            phone_state: false, // 手机状态
            pass_state: false, // 密码状态
            send_state: true,  // 发送状态
            timeouts: 60, // 倒计时时间
            showResend: false, // 显示倒计时按钮
            sendTime: null, // 定时器
            rules: {
                password: [
                    { required: true, validator: validatenewpasswd, trigger: 'blur' }
                ],
                phone: [
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
            return !(this.phone_state && this.pass_state);
        }
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
                    this.Http.post(URL.CHANGE_PHONE, {
                        userNo: this.userno,
                        password: encryption(this.msgx.password, this.clientid, this.token),
                        verifyCode: this.msgx.verifyCode,
                        mobilePhone: this.msgx.phone
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

        // 发送短信
        sendCode () {
            this.send_state = false;
            this.$refs.forms.validateField('password', (valid) => {
                if (valid) {
                    this.send_state = true;
                    return;
                }
                this.$refs.forms.validateField('phone', (valid) => {
                    this.send_state = true;
                    if (valid) {
                        return;
                    } else {
                        this.Http.post(URL.SEND_PHONE_CODE, {
                            params: {
                                mobilePhone: this.msgx.phone
                            }
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
