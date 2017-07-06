<template>
    <section>
        <dailog size="small" :show.sync="myshow" title="添加客户" @ok="quire">
            <div slot="content">
                <el-form :rules="rules" ref="forms" label-width="100px" class="demo-dynamic" :model="msgx">
                    <div class="content_title">客户信息</div>
                    <el-form-item label="客户类型">
                        <el-select v-model.lazy="curtomerType.value" placeholder="客户类型" size="small" @change="changeCurtomerType" style="width:100%">
                            <el-option v-for="item in curtomerType.options" :label="item.label" :value="item.value" :key="item.label"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="客户名称" prop="companyName">
                        <template scope="scope">
                            <el-input placeholder="客户名称" v-model="msgx.companyName" class="companyName" :readonly="msgx.curtomer.isEdit" @click.native="getNcList" size="small"></el-input>
                            <ul class="nc_box" v-show="msgx.curtomer.showchild">
                                <li v-if="!msgx.curtomer.childData.length">查询无结果</li>
                                <li v-else v-for="(item,index) in msgx.curtomer.childData" :key="index" @click="checkChild(item)">{{item.companyName}}</li>
                            </ul>
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
                            <el-input placeholder="注册地址" v-model="msgx.registAddr" size="small" style="margin-bottom:6px"></el-input>
                        </template>
                    </el-form-item>
                    <el-form-item label="区域" prop="regionName">
                        <template scope="scope">
                            <el-input placeholder="区域" v-model="msgx.regionName" size="small" :readonly="true" @click.native="selcetregionName"></el-input>
                            <el-tabs type="border-card" class="zone_box" v-if="msgx.regionShow" :activeName="msgx.regionData[0].areaNo" @click.native.stop="">
                                <el-tab-pane v-for="(item,index) in msgx.regionData" :label="item.areaName" :name="item.areaNo" :key="item.areaNo">
                                    <ul>
                                        <li v-for="(itemx,index) in item.areaList" class="checkZone" @click="checkZone(item.areaName,itemx)">
                                            {{itemx.areaName}}
                                        </li>
                                    </ul>
                                </el-tab-pane>
                            </el-tabs>
                        </template>
                    </el-form-item>
                    <el-form-item label="客户性质">
                        <el-input v-model="msgx.nature" size="small" v-if="msgx.nature" :readonly="true" ></el-input>
                        <el-select v-else v-model="msgx.natureType.value" placeholder="客户性质" size="small" style="width:100%" @change="changeNatureType">
                            <el-option v-for="item in msgx.natureType.options" :label="item.label" :value="item.value" :key="item.label"></el-option>
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
                    <el-form-item label="开通SCM" prop="scm" v-if="!msgx.nature">
                        <el-checkbox name="type" v-model="msgx.scm" class="scm"></el-checkbox>
                    </el-form-item>
                </el-form>
                <certs :transMsg="item" :ref="'cert'+index" :key="index" v-for="(item,index) in msgx.certs"></certs>
            </div>
        </dailog>
    </section>
</template>   

<script>
'use strict';
const URL = {
    GETCUSTOMAREA: 'scm.common.getCustomArea', // 查询自定义区域
    SELECTNCCOMPANYS: 'scm.platformCustomer.selectNcCompanys', // 查询可以添加的检验子公司
    ADDHOSPITALMASTER: 'scm.platformCustomer.addHospitalMaster' // 添加合作共建
};
import certs from '@/pages/supplier/mods/certs';
import queryList from '@/components/queryList';
import regionPicker from '@/components/regionPicker';
import fileUpload from '@/components/FileUpload';
import { mapGetters } from 'vuex';
import { encryption, Validate, addEvent } from '@/services/global.common';
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
            companyName_state: true, // 客户名称状态
            linkTelphone_state: true, // 联系电话状态
            mobile_state: true, // 手机号码状态
            email_state: true, // 邮箱状态
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
            cert_sydwfrz: {
                name: '事业单位法人证 (必填)',
                certNo: '',
                startTime: '',
                endTime: '',
                lonrTime: false,
                imglist: [],
                imgs: '',
                require: true,
                class: 'img2'
            }, 
            resetmsg: '', // 初始化数据
            curtomerType: { // 客户类型
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
                companyName: '',
                companyNo: '',
                curtomer: {
                    isEdit: false,
                    showchild: false,
                    childData: []
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
                regionShow: false,
                regionName: '',
                regionNo: '',
                regionData: [],
                nature: '',
                natureType: { // 客户性质
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
                scm: false,
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
                    }]
            },
            // 校验规则
            rules: {
                companyName: [
                    { required: true, message: '请输入客户名称', trigger: 'change' },
                    { pattern: /^\S{0,30}$/, message: '客户名称不能超过30个字符', trigger: 'blur,change' },
                    { validator: Validate.validateloginAccount.bind(this), trigger: 'blur' }
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
                    { pattern: /^1[34578]\d{9}$/, message: '联系电话格式有误,有效11个字符', trigger: 'blur,change' },
                     { validator: Validate.validatePhone.bind(this), trigger: 'blur' }
                ],
                registAddr: [
                    { required: true, message: '请输入注册地址' },
                    { pattern: /^\S{0,120}$/, message: '注册地址不能超过120个字符', trigger: 'blur,change' }
                ],
                regionName: [
                    { required: true, message: '请输入区域', trigger: 'change' }
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
                for (let i = 0; i < this.msgx.certs.length; i++) {
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
                    let url = URL.ADDHOSPITALMASTER;
                    let _data = {
                        ncCompanyNo: this.curtomerType.value === 22 ? this.msgx.companyNo : '',
                        enterpriseType: this.curtomerType.value,
                        enterpriseName: this.msgx.companyName,
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
                        regionName: this.msgx.regionName,
                        regionNo: this.msgx.regionNo,
                        nature: this.msgx.nature ? 2 : this.msgx.natureType.value,
                        loginAccount: this.msgx.loginAccount,
                        password: encryption(this.msgx.password, this.clientid, this.token),
                        userName: this.msgx.userName,
                        mobile: this.msgx.mobile,
                        email: this.msgx.email,
                        enableScm: (this.msgx.scm && !this.msgx.nature) ? 1 : 0, 
                        certs: []
                    };
                    for (let i = 0; i < this.msgx.certs.length; i++) {
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
                type = 'yljgzyxkz';
                break;
            case 1:
                type = 'sydwfrz';
                break;
            default:
                break;
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
        // 检验子公司下拉列表
        getNcList () {
            if (!this.msgx.curtomer.isEdit) {
                return;
            }
            this.Http.post(URL.SELECTNCCOMPANYS, {
            }).then((re) => {
                this.msgx.curtomer.showchild = true;
                this.msgx.curtomer.childData = re.data;
            });
        },
        // 改变客户类型
        changeCurtomerType (val) {
            this.msgx = this.resetmsg;
            this.$refs.forms.resetFields();
            if (val === 22) {
                if (this.msgx.certs.length > 1) {
                    this.msgx.certs.pop();
                }
                this.msgx.curtomer.isEdit = true;
                this.msgx.nature = '检验子公司';
            } else {
                if (this.msgx.certs.length === 1 && this.msgx.natureType.value === 0) {
                    this.msgx.certs.push(this.cert_sydwfrz);
                }
                this.msgx.curtomer.isEdit = false;
                this.msgx.nature = '';
            }
        },
        // 检验子公司li事件
        checkChild (item) {
            this.msgx.curtomer.showchild = false;
            let { entries } = Object;

            for (let [key, value] of entries(item)) {
                this.msgx[key] = value;
            }
            this.$refs.forms.validateField('companyName');
        },
        // 选择区域
        selcetregionName () {
            this.Http.post(URL.GETCUSTOMAREA, {
            }).then((re) => {
                this.msgx.regionShow = true;
                this.msgx.regionData = re.data;
            });
        },
        // 选择区域
        checkZone (name, item) {
            this.msgx.regionShow = false;
            this.msgx.regionName = name + ' : ' + item.areaName;
            this.msgx.regionNo = item.areaNo;
        }, 
        // 更改医院性质
        changeNatureType (val) {
            if (val === 0) {
                this.msgx.certs.push(this.cert_sydwfrz);
            } else {
                this.msgx.certs.pop();
            }
        }
    },
    created () {
        addEvent(window, 'click', () => {
            if (this.msgx.curtomer.showchild) {
                this.msgx.curtomer.showchild = false;
            }
            if (this.msgx.regionShow) {
                this.msgx.regionShow = false;
            }
        });
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
        this.resetmsg = { ...this.msgx };
    },
    components: {
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

.scm {
    position: relative;
    top: 8px;
}

.nc_box {
    min-height: 100px;
    position: absolute;
    z-index: 3333;
    background: #fff;
    max-height: 300px;
    border: 1px solid #d1dbe5;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);
    width: 100%;
    overflow: auto;
    li {
        line-height: 20px;
        color: #666;
        padding: 5px 10px;
        cursor: pointer;
        &:hover {
            background-color: #f4f4f4;
            color: #00a2b3;
        }
    }
}

.zone_box {
    .el-tabs__content{
        padding: 0 !important;
    }
    position: absolute;
    z-index: 3333;
    width: 100%;
    ul {
         max-height: 200px;
        overflow: auto;
        .checkZone {
            line-height: 20px;
            color: #666;
            padding: 5px 10px;
            cursor: pointer;
            &:hover {
                background-color: #f4f4f4;
                color: #00a2b3;
            }
        }
    }
}
</style>
