//添加客户
<template>
    <section >
        <dailog size="tiny" :show.sync="myshow" classx="staff-add-user"  :title="title" @ok="quire">
            <el-form slot="content" :rules="rules" ref="forms" label-width="100px" class="demo-dynamic" :model="msgx">
                <el-form-item label="登录账号" prop="loginAccount" >
                   <el-input placeholder="登录账号"  v-model="msgx.loginAccount" size="small" :disabled="this.type=='edit'"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password" v-if="this.type=='add'">
                    <el-input placeholder="密码" type="password" v-model="msgx.password" size="small"></el-input>
                </el-form-item>
                <el-form-item label="重复密码" prop="repassword" v-if="this.type=='add'">
                    <el-input placeholder="重复密码" type="password" v-model="msgx.repassword" size="small"></el-input>
                </el-form-item>
                <el-form-item label="真实姓名" prop="userName" >
                    <el-input placeholder="真实姓名" v-model="msgx.userName" size="small"></el-input>
                </el-form-item>
                <el-form-item label="手机号码" prop="mobilePhone" >
                    <el-input placeholder="手机号码" v-model="msgx.mobilePhone" size="small"></el-input>
                </el-form-item>
            
                 <el-form-item label="电子邮箱" prop="email" >
                    <el-input placeholder="电子邮箱" v-model="msgx.email" size="small"></el-input>
                </el-form-item>
                 <el-form-item label="身份证号码" prop="idcard" >
                    <el-input placeholder="身份证号码" v-model="msgx.idcard" size="small"></el-input>
                </el-form-item>
                 <el-form-item label="身份证照片" prop="idcardCertImg" >
                    <template scope="scope">
                        <el-input placeholder="身份证照片" v-model="msgx.cert" size="small" v-show="false"></el-input>
                        <file-upload :files="files" :max="max" classx="staff-adduser-img" @getUrl="getUrl"></file-upload>
                        <span class="tips">支持格式 : png. jpg. bmp. gif. pdf , 大小不超过5MB</span>
                    </template>
                </el-form-item>
            </el-form>
        </dailog>
    </section>
</template>   

<script>
'use strict';
const URL = {
    ADD: 'ypt.open.user.createUserForWeb', // 添加
    CHECK: 'ypt.open.user.isExistUserByLoginAccountForWeb', // 检查用户名是否存在
    ISEXIST: 'ypt.open.user.isExistMobileForWeb', // 判断手机号是否存在
    STAFFINFO: 'ypt.open.user.findUserByNoForWeb', // 获取员工信息
    EDIT: 'scm.enterprise.modifyUser' // 编辑员工
};
import dailog from '@/components/Dailog';
import fileUpload from '@/components/FileUpload';
import { mapGetters } from 'vuex';
import {encryption, Validate} from '@/services/global.common';
export default {
    name: 'staff-addUser',
    props: {
        showx: { // 显示
            type: Boolean,
            require: true
        },
        type: { // 'edit'/'add'
            type: String,
            require: true
        },
        eidtUser: { // 编辑用户数据
            type: Object
        },
        title: { // 标题
            type: String,
            require: true
        }
    },
    data () {
        return {
            myshow: false, // 是否显示弹框
            malis_state: true,
            phone_state: true,
            loginAccount_state: true,
            send_status: true,
            msgx: {
                loginAccount: '',
                password: '',
                repassword: '',
                userName: '',
                email: '',
                idcard: '',
                mobilePhone: '',
                idcardCertImg: [],
                orderSpecialist: false
            }, // 数据
            files: [],
            max: 2,
            rules: {
                userName: [
                    { required: true, message: '请输入真实姓名', trigger: 'blur' },
                      { pattern: /^\S{0,30}$/, message: '真实姓名不能超过30个字符', trigger: 'blur,change' }
                ],
                mobilePhone: [
                    { required: true, message: '请输入手机号码', trigger: 'blur' },
                      { pattern: /^1[34578]\d{9}$/, message: '手机号码格式有误,不能超过11个字符', trigger: 'blur,change' },
                     { validator: Validate.validatePhone.bind(this), trigger: 'blur' }
                ],
                email: [
                     { pattern: /^(?=\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$).{5,50}$/, message: '电子邮箱格式不正确,长度5-50字符之间', trigger: 'blur,change' },
                     { validator: Validate.validateEmail.bind(this), trigger: 'blur' }
                ],
                idcard: [
                     { pattern: /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/, message: '身份证号码格式不正确,长度18个字符', trigger: 'blur,change' }
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
    },
    methods: {
        // 确认
        quire () {
            this.send_status = false;
            this.$refs.forms.validate((valid) => {
                this.send_status = true;
                if (!valid) {
                    return false;
                } else {
                    let url;
                    let _data = {
                        userName: this.msgx.userName,
                        mobilePhone: this.msgx.mobilePhone,
                        email: this.msgx.email,
                        idcard: this.msgx.idcard,
                        isSms: 1,
                        idcardCertImg: this.msgx.idcardCertImg,
                        appCode: 'YSCM'
                    };
                    // 添加
                    if (this.type === 'add') {
                        url = URL.ADD;
                        _data = {..._data,
                            loginAccount: this.msgx.loginAccount,
                            password: encryption(this.msgx.password, this.clientid, this.token),
                            orderSpecialist: this.msgx.orderSpecialist ? '0' : '1'};
                    } else {
                        _data = {..._data, userNo: this.msgx.userNo};
                        // 编辑
                        url = URL.EDIT;
                    }
                    this.Http.post(url, {
                        params: _data
                    }).then((re) => {
                        if (re.data) {
                            this.$notify({
                                title: '成功',
                                message: this.type === 'add' ? '添加成功' : '编辑成功',
                                type: 'success'
                            });
                            this.myshow = false;
                            this.$emit('refresh');
                        }
                    });
                }
            });
        },
        // 确认
        async getData () {
            await this.Http.post(URL.STAFFINFO, {
                userNo: this.eidtUser.userNo
            }).then((re) => {
                this.msgx = re.data;
                if (this.msgx.idcardCertImg) {
                    this.files = this.msgx.idcardCertImg;
                }
            });
        },
        // 模拟图片长传,添加input值,方便验证表单
        getUrl (data) {
            this.msgx.idcardCertImg = data;
            if (data.length > 0) {
                this.msgx.cert = '123';
            } else {
                this.msgx.cert = '';
            }
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
        // 编辑
        if (this.type === 'edit') {
            this.getData().then(() => {
                this.myshow = this.showx;
            });
        }
        // 添加
        if (this.type === 'add') {
            this.myshow = this.showx;
            this.rules = {...this.rules,
                loginAccount: [
                    { required: true, message: '请输入登录账号', trigger: 'blur,change' },
                    { pattern: /^\S{6,20}$/, message: '仅支持数字、字母、下划线“_”，长度6-20位', trigger: 'blur,change' },
                   { validator: Validate.validateloginAccount.bind(this), trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入新密码', trigger: 'blur' },
                    { pattern: /^\S{6,20}$/, message: '新密码长度在6-20个字符之间', trigger: 'blur,change' },
                   { validator: Validate.validatePassword.bind(this), trigger: 'blur,change' }
                ],
                repassword: [
                    { required: true, message: '请输入重复密码', trigger: 'blur' },
                   { validator: Validate.validateRePassword.bind(this), trigger: 'blur,change' }
                ]
            };
        }
    },
    components: {
        dailog,
        fileUpload
    }

};

</script>

<style scoped lang="scss" rel="stylesheet/scss">
.el-form-item__error {
    position: inherit;
}
.demo-dynamic{
    width: 80%
}
.staff-adduser-img{
    height: 100px;
}
</style>
