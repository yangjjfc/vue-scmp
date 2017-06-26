//添加客户
<template>
    <section>
        <dailog size="tiny" :show.sync="myshow" classx="change-name" title="修改密码" @ok="quire">
            <el-form slot="content"  :rules="rules" label-width="100px" ref="forms" class="demo-dynamic" :model="msgx">
                <el-form-item label="旧密码" prop="repasswd">
                    <el-input placeholder="旧密码" type="password" v-model.trim="msgx.repasswd"></el-input>
                </el-form-item>
                <el-form-item label="新密码" prop="newpasswd">
                    <el-input placeholder="新密码" type="password" v-model.trim="msgx.newpasswd"></el-input>
                </el-form-item>
                <el-form-item label="重复密码" prop="fspasswd">
                    <el-input placeholder="重复密码" type="password" v-model.trim="msgx.fspasswd"></el-input>
                </el-form-item>
            </el-form>
        </dailog>
    </section>
</template>   

<script>
const URL = {
    CHANGE_PASSWORD: 'ypt.open.user.modifyPasswordForWeb' // 修改密码
};
import dailog from '@/components/Dailog';
import { mapGetters } from 'vuex';
import {encryption} from '@/components/global.common';

export default {
    name: 'changePasswd',
    props: {
        showx: {
            type: Boolean,
            required: true,
            default () {
                return false;
            }
        }
    },
    data () {
        // 新密码验证
        let validatenewpasswd = (rule, value, callback) => {
            if (value.length <= 20 && value.length >= 6) {
                this.$refs.forms.validateField('fspasswd');
                callback();
            }
        };
        // 重复密码验证
        let validatefspasswd = (rule, value, callback) => {
            if (value !== this.msgx.newpasswd) {
                callback(new Error('两次输入密码不一致!'));
            } else {
                callback();
            }
        };
        return {
            myshow: false,
            msgx: {
                repasswd: '',
                newpasswd: '',
                fspasswd: ''
            },
            // 验证规则
            rules: {
                repasswd: [
                    { required: true, message: '请输入旧密码', trigger: 'blur,change' },
                    { pattern: /^\S{6,20}$/, message: '旧密码长度在6-20个字符之间', trigger: 'blur,change' }
                ],
                newpasswd: [
                    { required: true, message: '请输入新密码', trigger: 'blur' },
                    { pattern: /^\S{6,20}$/, message: '新密码长度在6-20个字符之间', trigger: 'blur,change' },
                    { validator: validatenewpasswd, trigger: 'blur,change' }
                ],
                fspasswd: [
                    { required: true, message: '请输入重复密码', trigger: 'blur' },
                    { validator: validatefspasswd, trigger: 'blur,change' }
                ]
            }
        };
    },
    computed: {
        ...mapGetters([
            'userno',
            'token',
            'clientid'
        ])
        //  // 新密码验证
        // validatenewpasswd: (rule, value, callback) => {
        //     if (value.length <= 20 && value.length >= 6) {
        //         this.$refs.forms.validateField('fspasswd');
        //         callback();
        //     }
        // },
        // // 重复密码验证
        // validatefspasswd: (rule, value, callback) => {
        //     if (value !== this.msgx.newpasswd) {
        //         callback(new Error('两次输入密码不一致!'));
        //     } else {
        //         callback();
        //     }
        // }

    },
    methods: {
        quire () {
            this.$refs.forms.validate((valid) => {
                if (!valid) {
                    return false;
                } else {
                    this.Http.post(URL.CHANGE_PASSWORD, {
                        userNo: this.userno,
                        oldPassword: encryption(this.msgx.repasswd, this.clientid, this.token),
                        newPassword: encryption(this.msgx.newpasswd, this.clientid, this.token)
                    }).then((re) => {
                        if (re.data) {
                            this.$notify({
                                title: '成功',
                                message: '修改成功',
                                type: 'success'
                            });
                            this.$emit('refresh');
                            this.myshow = false;
                        }
                    });
                }
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
</style>
