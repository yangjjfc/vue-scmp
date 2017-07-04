<template>
    <section>
        <dailog size="small" :show.sync="myshow" title="添加客户" @ok="quire">
            <div slot="content">
                <el-form :rules="rules" ref="forms" label-width="100px" class="demo-dynamic" :model="msgx">
                    <div class="content_title">客户信息</div>
                    <el-form-item label="客户类型">
                        <el-select v-model="curtomerType.value" placeholder="客户类型" size="small" @change="changeSelect" style="width:100%">
                            <el-option v-for="item in curtomerType.options" :label="item.label" :value="item.value" :key="item.label"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="客户名称" prop="curtomerName">
                        <template scope="scope">
                            <el-input placeholder="客户名称" v-model="msgx.curtomerName" :readonly="msgx.curtomer.isEdit" @click.native="getNcList" size="small"></el-input>
                        </template>
                    </el-form-item>
                    <el-form-item label="院长" prop="legalPerson">
                        <el-input placeholder="院长" type="legalPerson" v-model="msgx.legalPerson" size="small"></el-input>
                    </el-form-item>
                    <el-form-item label="联系人" prop="linkPerson">
                        <el-input placeholder="联系人" type="linkPerson" v-model="msgx.linkPerson" size="small"></el-input>
                    </el-form-item>
                    <el-form-item label="联系电话" prop="linkTelphone">
                        <el-input placeholder="联系电话" v-model="msgx.linkTelphone" size="small"></el-input>
                    </el-form-item>
    
                    <el-form-item label="注册地址" prop="registAddr">
                        <template scope="scope">
                            <region-picker :region.sync="msgx.address"></region-picker>
                            <el-input placeholder="注册地址" v-model="msgx.registAddr" size="small"></el-input>
                        </template>
                    </el-form-item>
                    <el-form-item label="区域" prop="regionName">
                        <el-input placeholder="区域" v-model="msgx.regionName" size="small"></el-input>
                    </el-form-item>
                    <el-form-item label="客户性质">
                        <el-select v-model="msgx.curtomerType.value" placeholder="客户性质" size="small" @change="changeSelect" style="width:100%">
                            <el-option v-for="item in msgx.curtomerType.options" :label="item.label" :value="item.value" :key="item.label"></el-option>
                        </el-select>
                    </el-form-item>
                    <div class="content_title">账号信息</div>
                    <el-form-item label="登入账号" prop="loginAccount">
                        <el-input placeholder="登入账号" v-model="msgx.loginAccount" size="small"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input placeholder="密码" type="password" v-model="msgx.password" size="small"></el-input>
                    </el-form-item>
                    <el-form-item label="重复密码" prop="repassword">
                        <el-input placeholder="重复密码" type="password" v-model="msgx.repassword" size="small"></el-input>
                    </el-form-item>
                    <el-form-item label="真实姓名" prop="userName">
                        <el-input placeholder="真实姓名" v-model="msgx.userName" size="small"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号码" prop="mobile">
                        <el-input placeholder="手机号码" v-model="msgx.mobile" size="small"></el-input>
                    </el-form-item>
                    <el-form-item label="邮箱" prop="email">
                        <el-input placeholder="邮箱" v-model="msgx.email" size="small"></el-input>
                    </el-form-item>
                     <el-form-item label="开通SCM" prop="email">
                         <el-checkbox  name="type" v-model="msgx.scm"></el-checkbox>
                    </el-form-item>
                </el-form>
                <certs :transMsg="item"  :ref="'cert'+index" :key="index" v-for="(item,index) in msgx.certs" ></certs>
            </div>
        </dailog>
    </section>
</template>   

<script>
'use strict';
const URL = {
    ADDSUPPLIERMASTER: 'scm.platformSupplier.addSupplierMaster', // 添加供应商
    PAGENCSUPPLIERS: 'scm.platformSupplier.pageNotRegNcSuppliers' // NC供应商列表
};
import certs from '@/pages/supplier/mods/certs';
import dailog from '@/components/Dailog';
import queryList from '@/components/queryList';
import regionPicker from '@/components/regionPicker';
import fileUpload from '@/components/FileUpload';
import { mapGetters } from 'vuex';
import { encryption, Validate } from '@/services/global.common';
export default {
    name: 'staff-addUser',
    props: {
        showx: { // 显示
            type: Boolean,
            require: true
        },
        transMsg: { // 编辑用户数据
            type: Object
        }
    },
    data () {
        return {
            myshow: false, // 是否显示弹框
            malis_state: true, // 邮件状态
            loginAccount_state: true, // 登入状态
            send_status: true, // 发送状态
            search: { // nc的搜索
                pageIndex: 1,
                pageSize: 10,
                total: 10,
                full: '',
                keywords: '',
                info: []
            },
            resetmsg: '', // 初始化数据
            curtomerType: { // 供应商类型
                options: [{
                    value: 20,
                    label: '合作共建'
                },
                {
                    value: 21,
                    label: '非合作共建'
                },
                {
                    value: 22,
                    label: '检验子公司'
                }],
                value: 20
            },
            msgx: { // 数据
                curtomerName: '',
                ncCompanyNo: '',
                curtomer: {
                    isEdit: false,
                    showNc: false
                },
                legalPerson: '',
                linkPerson: '',
                linkTelphone: '',
                registAddr: '',
                address: {
                    provinceName: '浙江省',
                    provinceCode: '330000',
                    cityName: '杭州市',
                    cityCode: '330100',
                    townName: '西湖区', 
                    townCode: '330102'
                },
                regionName: '',
                regionNo: '',
                curtomerType: { // 供应商类型
                    options: [{
                        value: 1,
                        label: '公立医院'
                    },
                    {
                        value: 0,
                        label: '民营医院'
                    }],
                    value: 1
                },  
                loginAccount: '',
                password: '',
                repassword: '',
                userName: '',
                mobile: '',
                email: '',
                certs: [
                    {
                        name: '医疗器械经营企业许可证 (必填)',
                        certNo: '',
                        startTime: '',
                        endTime: '',
                        lonrTime: false,
                        imglist: [],
                        imgs: '',
                        require: true,
                        class: 'img1'
                    }, { 
                        name: '事业单位法人证 (必填)',
                        certNo: '',
                        startTime: '',
                        endTime: '',
                        lonrTime: false,
                        imglist: [],
                        imgs: '',
                        require: true,
                        class: 'img2'
                    }]
            },
            // 校验规则
            rules: {
                curtomerName: [
                    { required: true, message: '请输入客户名称', trigger: 'blur' },
                    { pattern: /^\S{0,30}$/, message: '客户名称不能超过30个字符', trigger: 'blur,change' }
                ],
                legalPerson: [
                    { required: true, message: '请输入院长', trigger: 'blur,change' },
                    { pattern: /^\S{0,30}$/, message: '院长不能超过30个字符', trigger: 'blur,change' }
                ],
                linkPerson: [
                    { required: true, message: '请输入联系人', trigger: 'blur,change' },
                    { pattern: /^\S{0,30}$/, message: '联系人不能超过30个字符', trigger: 'blur,change' }
                ],
                linkTelphone: [
                    { pattern: /^1[34578]\d{9}$/, message: '联系电话格式有误,有效11个字符', trigger: 'blur,change' }
                ],
                registAddr: [
                    { required: true, message: '请输入注册地址' },
                    { pattern: /^\S{0,120}$/, message: '注册地址不能超过120个字符', trigger: 'blur,change' }
                ],
                regionName: [
                    { required: true, message: '请输入区域', trigger: 'blur,change' }
                ], 
                loginAccount: [
                    { required: true, message: '请输入登录账号', trigger: 'blur,change' },
                    { pattern: /^\w{6,20}$/, message: '登录账号仅支持数字、字母、下划线“_”，长度6-20位', trigger: 'blur,change' },
                    { validator: Validate.validateloginAccount.bind(this), trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { pattern: /^\S{6,20}$/, message: '密码长度在6-20个字符之间', trigger: 'blur,change' },
                    { validator: Validate.validatePassword.bind(this), trigger: 'blur,change' }
                ],
                repassword: [
                    { required: true, message: '请输入重复密码', trigger: 'blur' },
                    { validator: Validate.validateRePassword.bind(this), trigger: 'blur,change' }
                ],
                userName: [
                    { required: true, message: '请输入真实姓名', trigger: 'blur,change' },
                    { pattern: /^\S{0,30}$/, message: '公司名称不能超过30个字符', trigger: 'blur,change' }
                ],
                mobile: [
                    { required: true, message: '请输入手机号码', trigger: 'blur,change' },
                    { pattern: /^1[34578]\d{9}$/, message: '手机号码格式有误,有效11个字符', trigger: 'blur,change' },
                    { validator: Validate.validatePhone.bind(this), trigger: 'blur' }
                ],
                email: [
                    { pattern: /^(?=\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$).{5,50}$/, message: '电子邮箱格式不正确,长度5-50字符之间', trigger: 'blur,change' },
                    { validator: Validate.validateEmail.bind(this), trigger: 'blur' }
                ]
            }
        };
    },
    computed: {
        ...mapGetters([
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
                let flag = true;
                // 校验证件状态
                for (let i = 0; i < 4; i++) {
                    // 父组件调用子组件方法
                    this.$refs['cert' + i][0].$refs.forms.validate((valid) => {
                        if (!valid) {
                            flag = false;
                        }
                    });
                }
                if (!flag) {
                    return false;
                }    
                if (!valid) {
                    return false;
                } else {
                    let url = URL.ADDSUPPLIERMASTER;
                    let _data = {
                        ncCompanyNo: this.curtomerType.value === 20 ? '' : this.msgx.enterNC,
                        enterpriseType: this.curtomerType.value, 
                        enterpriseName: this.msgx.enterpriseName,
                        legalPerson: this.msgx.legalPerson,
                        linkPerson: this.msgx.linkPerson,
                        linkTelphone: this.msgx.linkTelphone,
                        provinceCode: this.msgx.address.provinceCode,
                        provinceName: this.msgx.address.provinceName,
                        cityCode: this.msgx.address.cityCode,
                        cityName: this.msgx.address.cityName,
                        townCode: this.msgx.address.townCode,
                        townName: this.msgx.address.townName,
                        regAddr: this.msgx.registAddr,
                        loginAccount: this.msgx.loginAccount,
                        password: encryption(this.msgx.password, this.clientid, this.token),
                        userName: this.msgx.userName,
                        mobile: this.msgx.mobile,
                        email: this.msgx.email,
                        certs: []
                    };
                    for (let i = 0; i < 4; i++) {
                        let certInfo = this.createCert(i);
                        if (certInfo) {
                            _data.certs.push(certInfo);
                        }
                    }
                    this.Http.post(url, {
                        params: _data
                    }).then((re) => {
                        if (re.data) {
                            this.$notify({
                                title: '成功',
                                message: '添加成功',
                                type: 'success'
                            });
                            this.myshow = false;
                            this.$emit('refresh');
                        }
                    });
                }
            });
        }, 
        // 证件数据
        createCert (num) {
            let type = '';
            switch (num) {
            case 0:
                type = 'yyzz';  
                break;
            case 1:
                type = 'ylqxjyqyxkz';  
                break;
            case 2:
                type = 'swdjz';  
                break;
            case 3:
                type = 'zzjgdmz';  
                break;
            default:
                break;
            }
            if (num === 2 || num === 3) {
                if (!this.$refs['cert' + num][0].msg.certNo ||
                 !this.$refs['cert' + num][0].msg.startTime || 
                 (!this.$refs['cert' + num][0].msg.endTime && !this.$refs['cert' + num][0].msg.lonrTime && this.$refs['cert' + num][0].msg.endTime === '2099-01-01') || 
                 this.$refs['cert' + num][0].msg.imglist.length === 0) {
                    return;
                }
            } 
            let imgUrl = {
                certCode: this.$refs['cert' + num][0].msg.certNo,
                startTime: this.$refs['cert' + num][0].msg.startTime,
                endTime: this.$refs['cert' + num][0].msg.endTime,
                longTerm: this.$refs['cert' + num][0].msg.lonrTime ? '1' : '0',
                fileUrl: this.$refs['cert' + num][0].msg.imglist && this.$refs['cert' + num][0].msg.imglist[0],
                certType: type
            };  
            return imgUrl;
        },
        // nc下拉列表
        getNcList () {
            if (!this.msgx.curtomer.isEdit) {
                return;
            }
            this.Http.post(URL.PAGENCSUPPLIERS, {
                params: {
                    pageIndex: this.search.pageIndex,
                    pageSize: this.search.pageSize,
                    keywords: this.search.keywords
                }
            }).then((re) => {
                this.msgx.curtomer.showNc = true;
                this.search.total = re.data.total;
                this.search.info = re.data.rows;
            });
        },
        // 改变供应商类型
        changeSelect (val) {
            this.msgx = this.resetmsg;
            this.$refs.forms.resetFields();
            if (val === 21) {
                this.msgx.curtomer.isEdit = true;
            } else {
                this.msgx.curtomer.isEdit = false;
            }
        },
        // nc列表点击事件
        checkNc (item) {
            this.msgx.curtomer.showNc = false;
            this.msgx.enterpriseName = item.supplierName;
            this.msgx.legalPerson = item.legalPerson;
            this.msgx.linkPerson = item.linkPerson;
            this.msgx.linkTelphone = item.linkTelphone;
            this.msgx.registAddr = item.registAddr;
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
        this.resetmsg = {...this.msgx};
    },
    components: {
        dailog,
        fileUpload,
        queryList,
        regionPicker,
        certs
    }

};

</script>

<style scoped lang="scss" rel="stylesheet/scss">
.el-form-item__error {
    position: inherit;
}


.staff-adduser-img {
    height: 100px;
}

.content_title {
    background: orange;
    color: #fff;
    text-transform: uppercase;
    -moz-border-radius: 2px 2px 0 0;
    -webkit-border-radius: 2px 2px 0 0;
    border-radius: 2px 2px 0 0;
    font-size: 14px;
    font-weight: normal;
    line-height: 30px;
    padding: 0 8px;
    margin: 10px 0;
}

.contenttitle_certs_title {
    border-bottom: 3px solid orange;
    overflow: hidden;
    margin: 10px 0;
    p {
        background: orange;
        color: #fff;
        height: 32px;
        line-height: 32px;
        padding: 0 20px;
        font-weight: bold;
        display: inline-block;
    }
}

.el-form-item {
    margin: 0 auto;
    width: 80%;
}
</style>
