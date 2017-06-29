//添加客户
<template>
    <section >
        <dailog size="small" :show.sync="myshow" title="添加供应商" @ok="quire">
            <el-form slot="content" :rules="rules" ref="forms" label-width="100px" class="demo-dynamic" :model="msgx">
                    <div class="content_title">供应商信息</div>
                 <el-form-item label="供应商类型" >
                    <el-select v-model="msgx.supplierType.value" placeholder="供应商类型" size="small" style="width:100%">
                        <el-option v-for="item in msgx.supplierType.options"  :label="item.label" :value="item.value" :key="item.label"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="公司名称" prop="enterpriseName" >
                    <template scope="scope">
                        <el-input placeholder="公司名称"  v-model="msgx.enterpriseName" size="small"></el-input>
                        <!--<query-list>
                            <ul slot="quire_content">
                                <li>21313</li>
                                <li>21313</li>
                                <li>21313</li>
                                <li>21313</li>
                                <li>21313</li>
                                <li>21313</li>
                                <li>21313</li>
                                <li>21313</li>
                                <li>21313</li>
                                <li>21313</li>
                                <li>21313</li>
                                <li>21313</li>
                                <li>21313</li>
                                <li>21313</li>
                                <li>21313</li>
                                <li>21313</li>
                                <li>21313</li>
                            </ul>
                        </query-list>-->
                    </template>
                </el-form-item>
                <el-form-item label="法人代表" prop="legalPerson"  >
                    <el-input placeholder="法人代表" type="legalPerson" v-model="msgx.legalPerson" size="small"></el-input>
                </el-form-item>
                <el-form-item label="联系人" prop="linkPerson"  >
                    <el-input placeholder="联系人" type="linkPerson" v-model="msgx.linkPerson" size="small"></el-input>
                </el-form-item>
                <el-form-item label="联系电话" prop="linkTelphone" >
                    <el-input placeholder="联系电话" v-model="msgx.linkTelphone" size="small" ></el-input>
                </el-form-item>
                
                 <el-form-item label="注册地址" prop="info_address" >
                    <template scope="scope">
                        <region-picker></region-picker>
                        <el-input placeholder="注册地址" v-model="msgx.info_address" size="small" ></el-input>
                    </template>
                </el-form-item>
                <div class="content_title">账号信息</div>
                <el-form-item label="登入账号" prop="userName" >
                    <el-input placeholder="登入账号" v-model="msgx.userName" size="small"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password" >
                    <el-input placeholder="密码" type="password" v-model="msgx.password" size="small"></el-input>
                </el-form-item>
                <el-form-item label="重复密码" prop="password2" >
                    <el-input placeholder="重复密码" type="password"  v-model="msgx.password2" size="small"></el-input>
                </el-form-item>
                <el-form-item label="真实姓名" prop="userName" >
                    <el-input placeholder="真实姓名" v-model="msgx.userName" size="small"></el-input>
                </el-form-item>
                <el-form-item label="登入账号" prop="loginAccount" >
                    <el-input placeholder="登入账号" v-model="msgx.loginAccount" size="small"></el-input>
                </el-form-item>
                <el-form-item label="手机号码" prop="mobile" >
                    <el-input placeholder="手机号码" v-model="msgx.mobile" size="small"></el-input>
                </el-form-item>
                <el-form-item label="邮箱" prop="email" >
                    <el-input placeholder="邮箱" v-model="msgx.email" size="small"></el-input>
                </el-form-item>
                <template scoped="scoped" v-for="item in msgx.certList">
                    <div class="contenttitle_certs_title"><p>营业证照 (必填)</p></div>
                    <el-form-item label="证件号码" prop="mobilePhone" >
                        <el-input placeholder="证件号码" v-model="msgx.mobilePhone" size="small"></el-input>
                    </el-form-item>
                    <date-picker timeType="2"></date-picker>
                    <el-form-item label="证件图片" prop="idcardCertImg" >
                        <template scope="scope">
                            <el-input placeholder="证件图片"  size="small" v-show="false"></el-input>
                            <file-upload :files="msgx.mobilePhone" :max="msgx.mobilePhone" classx="staff-adduser-img" @getUrl=""></file-upload>
                            <span class="tips">支持格式 : png. jpg. bmp. gif. pdf , 大小不超过5MB</span>
                        </template>
                    </el-form-item>
                </template>
                 
                 <div class="contenttitle_certs_title"><p>医疗器械经营企业许可证 (必填)</p></div>
                 <el-form-item label="证件号码" prop="mobilePhone" >
                    <el-input placeholder="证件号码" v-model="msgx.mobilePhone" size="small"></el-input>
                </el-form-item>
                <date-picker timeType="2"></date-picker>
                <el-form-item label="证件图片" prop="idcardCertImg" >
                    <template scope="scope">
                        <el-input placeholder="证件图片"  size="small" v-show="false"></el-input>
                        <file-upload :files="msgx.mobilePhone" :max="msgx.mobilePhone" classx="staff-adduser-img" @getUrl=""></file-upload>
                        <span class="tips">支持格式 : png. jpg. bmp. gif. pdf , 大小不超过5MB</span>
                    </template>
                </el-form-item>
                 <div class="contenttitle_certs_title"><p>税务登记证</p></div>
                 <el-form-item label="证件号码" prop="mobilePhone" >
                    <el-input placeholder="证件号码" v-model="msgx.mobilePhone" size="small"></el-input>
                </el-form-item>
                <date-picker timeType="2"></date-picker>
                <el-form-item label="证件图片" prop="idcardCertImg" >
                    <template scope="scope">
                        <el-input placeholder="证件图片"  size="small" v-show="false"></el-input>
                        <file-upload :files="msgx.mobilePhone" :max="msgx.mobilePhone" classx="staff-adduser-img" @getUrl=""></file-upload>
                        <span class="tips">支持格式 : png. jpg. bmp. gif. pdf , 大小不超过5MB</span>
                    </template>
                </el-form-item>
                <div class="contenttitle_certs_title"><p>组织机构代码证</p></div>
                 <el-form-item label="证件号码" prop="mobilePhone" >
                    <el-input placeholder="证件号码" v-model="msgx.mobilePhone" size="small"></el-input>
                </el-form-item>
                <date-picker timeType="2"></date-picker>
                <el-form-item label="证件图片" prop="idcardCertImg" >
                    <template scope="scope">
                        <el-input placeholder="证件图片"  size="small" v-show="false"></el-input>
                        <file-upload :files="msgx.mobilePhone" :max="msgx.mobilePhone" classx="staff-adduser-img" @getUrl=""></file-upload>
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
    ADDSUPPLIERMASTER: 'scm.platformSupplier.addSupplierMaster', // 添加供应商
    PAGENCSUPPLIERS: 'scm.platformSupplier.pageNotRegNcSuppliers' // NC供应商列表
};
import dailog from '@/components/Dailog';
import queryList from '@/components/queryList';
import regionPicker from '@/components/regionPicker';
import datePicker from '@/components/datePicker';
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
        transMsg: { // 编辑用户数据
            type: Object
        }
    },
    data () {
        return {
            myshow: false, // 是否显示弹框
            msgx: {
                supplierType: {
                    options: [{
                        value: 20,
                        label: '外部供应商'
                    },
                    {
                        value: 21,
                        label: 'NC供应商'
                    }],
                    value: 20 
                },
                enterpriseName: '',
                legalPerson: '',
                linkPerson: '',
                linkTelphone: '',
                info_address: '',
                loginAccount: '',
                password: '',
                password2: '',
                userName: '',
                mobile: '',
                email: '',
                certList: [{
                    name: '营业证照 (必填)',
                    certNo_yyzz: '',
                    startTime_yyzz: '',
                    endTime_yyzz: '',
                    lonrTime_yyzz: '',
                    imglist_yyzz: ''
                }, {
                    certNo_ylqxjyqyxkz: '',
                    startTime_ylqxjyqyxkz: '',
                    endTime_ylqxjyqyxkz: '',
                    lonrTime_ylqxjyqyxkz: '',
                    imglist_ylqxjyqyxkz: ''
                }, {
                    certNo_swdjz: '',
                    startTime_swdjz: '',
                    endTime_swdjz: '',
                    lonrTime_swdjz: '',
                    imglist_swdjz: ''
                }, {
                    certNo_zzjgdmz: '',
                    startTime_zzjgdmz: '',
                    endTime_zzjgdmz: '',
                    lonrTime_zzjgdmz: '',
                    imglist_zzjgdmz: ''
                }]
            },
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
            // this.send_status = false;
            // this.$refs.forms.validate((valid) => {
            //     this.send_status = true;
            //     if (!valid) {
            //         return false;
            //     } else {
            //         let url;
            //         let _data = {
            //             userName: this.msgx.userName,
            //             mobilePhone: this.msgx.mobilePhone,
            //             email: this.msgx.email,
            //             idcard: this.msgx.idcard,
            //             isSms: 1,
            //             idcardCertImg: this.msgx.idcardCertImg,
            //             appCode: 'YSCM'
            //         };
            //         // 添加
            //         if (this.type === 'add') {
            //             url = URL.ADD;
            //             _data = {..._data,
            //                 loginAccount: this.msgx.loginAccount,
            //                 password: encryption(this.msgx.password, this.clientid, this.token),
            //                 orderSpecialist: this.msgx.orderSpecialist ? '0' : '1'};
            //         } else {
            //             _data = {..._data, userNo: this.msgx.userNo};
            //             // 编辑
            //             url = URL.EDIT;
            //         }
            //         this.Http.post(url, {
            //             params: _data
            //         }).then((re) => {
            //             if (re.data) {
            //                 this.$notify({
            //                     title: '成功',
            //                     message: this.type === 'add' ? '添加成功' : '编辑成功',
            //                     type: 'success'
            //                 });
            //                 this.myshow = false;
            //                 this.$emit('refresh');
            //             }
            //         });
            //     }
            // });
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
        this.myshow = this.showx;
    },
    components: {
        dailog,
        fileUpload,
        queryList,
        regionPicker,
        datePicker
    }

};

</script>

<style scoped lang="scss" rel="stylesheet/scss">
.el-form-item__error {
    position: inherit;
}
.demo-dynamic{
    // width: 80%
}
.staff-adduser-img{
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
    margin:10px 0;
}
.contenttitle_certs_title {
    border-bottom: 3px solid orange;
    overflow: hidden;
    margin:  10px 0;
    p{
        background: orange;
    color: #fff;
    height: 32px;
    line-height: 32px;
    padding: 0 20px;
    font-weight: bold;
    display: inline-block;
    }
}
.el-form-item{
    margin: 0 auto;
    width:80%;
}
</style>
