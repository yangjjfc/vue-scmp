//添加客户
<template>
    <section>
        <dailog size="small" :show.sync="myshow" title="添加供应商" @ok="quire">
            <div slot="content">
                <el-form :rules="rules" ref="forms" label-width="100px" class="demo-dynamic" :model="msgx">
                    <div class="content_title">供应商信息</div>
                    <el-form-item label="供应商类型">
                        <el-select v-model="supplierType.value" placeholder="供应商类型" size="small" @change="changeSelect" style="width:100%">
                            <el-option v-for="item in supplierType.options" :label="item.label" :value="item.value" :key="item.label"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="公司名称" prop="enterpriseName">
                        <template scope="scope">
                            <el-input placeholder="公司名称" v-model="msgx.enterpriseName" :readonly="msgx.enterprise.isEdit" @click.native="getNcList" size="small"></el-input>
                            <query-list @change="getNcList" :keyWords.sync="search.keywords" :showx.sync="msgx.enterprise.showNc" :pageSize="search.pageSize" :pageIndex.sync="search.pageIndex" :total="search.total">
                                <ul slot="quire_content">
                                    <li v-for="(item,index) in search.info" :key="index" v-if="search.info.length>0" @click="checkNc(item)">{{item.supplierName}}</li>
                                    <li v-else>暂无数据</li>
                                </ul>
                            </query-list>
                        </template>
                    </el-form-item>
                    <el-form-item label="法人代表" prop="legalPerson">
                        <el-input placeholder="法人代表" type="legalPerson" v-model="msgx.legalPerson" size="small"></el-input>
                    </el-form-item>
                    <el-form-item label="联系人" prop="linkPerson">
                        <el-input placeholder="联系人" type="linkPerson" v-model="msgx.linkPerson" size="small"></el-input>
                    </el-form-item>
                    <el-form-item label="联系电话" prop="linkTelphone">
                        <el-input placeholder="联系电话" v-model="msgx.linkTelphone" size="small"></el-input>
                    </el-form-item>
    
                    <el-form-item label="注册地址" prop="registAddr">
                        <template scope="scope">
                            <region-picker :region.sync="this.address"></region-picker>
                            <el-input placeholder="注册地址" v-model="msgx.registAddr" size="small"></el-input>
                        </template>
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
                </el-form>
                <el-form label-width="100px" class="demo-dynamic" :model="cert_yyzz" >
                        <div class="contenttitle_certs_title">
                            <p>{{cert_yyzz.name}}</p>
                        </div>
                        <el-form-item label="证件号码" prop="certNo"  :rules="[  { required: true, message: '请输入证件号码', trigger: 'blur,change' },
                          { pattern: /^\S{0,30}$/, message: '证件号码不能超过30个字符', trigger: 'blur,change' }]">
                            <el-input placeholder="证件号码" v-model="cert_yyzz.certNo" size="small"></el-input>
                        </el-form-item>
                        <date-picker timeType="2"
                        :startTime.sync="cert_yyzz.startTime"
                        :endTime.sync="cert_yyzz.endTime"
                        :prop="yyy"
                        :rules="xxx"
                        :full.sync="cert_yyzz.full"
                        :isLong.sync="cert_yyzz.lonrTime"
                        ></date-picker>
                        <el-form-item label="证件图片" prop="idcardCertImg" :rules="[{ required: true, message: '请输入姓名', trigger: 'blur' }]">
                            <template scope="scope">
                                <el-input placeholder="证件图片" size="small" v-model="cert_yyzz.imgs" v-show="false"></el-input>
                                <file-upload :files="cert_yyzz.imglist" :max="2" classx="12312" @getUrl=""></file-upload>
                                <span class="tips">支持格式 : png. jpg. bmp. gif. pdf , 大小不超过5MB</span>
                            </template>
                        </el-form-item>
                </el-form>
                <el-form label-width="100px" class="demo-dynamic" :model="cert_yljyxkz" >
                        <div class="contenttitle_certs_title">
                            <p>{{cert_yljyxkz.name}}</p>
                        </div>
                        <el-form-item label="证件号码" prop="certNo"  :rules="[  { required: true, message: '请输入证件号码', trigger: 'blur,change' },
                          { pattern: /^\S{0,30}$/, message: '证件号码不能超过30个字符', trigger: 'blur,change' }]">
                            <el-input placeholder="证件号码" v-model="cert_yljyxkz.certNo" size="small"></el-input>
                        </el-form-item>
                        <date-picker timeType="2"
                        :startTime.sync="cert_yljyxkz.startTime"
                        :endTime.sync="cert_yljyxkz.endTime"
                        :prop="yyy"
                        :rules="xxx"
                        :full.sync="cert_yljyxkz.full"
                        :isLong.sync="cert_yljyxkz.lonrTime"
                        ></date-picker>
                        <el-form-item label="证件图片" prop="idcardCertImg" :rules="[{ required: true, message: '请输入姓名', trigger: 'blur' }]">
                            <template scope="scope">
                                <el-input placeholder="证件图片" size="small" v-model="cert_yljyxkz.imgs" v-show="false"></el-input>
                                <file-upload :files="cert_yljyxkz.imglist" :max="2" classx="12312" @getUrl=""></file-upload>
                                <span class="tips">支持格式 : png. jpg. bmp. gif. pdf , 大小不超过5MB</span>
                            </template>
                        </el-form-item>
                </el-form>
                <el-form label-width="100px" class="demo-dynamic" :model="cert_swdjz" >
                        <div class="contenttitle_certs_title">
                            <p>{{cert_swdjz.name}}</p>
                        </div>
                        <el-form-item label="证件号码" prop="certNo"  :rules="[  
                          { pattern: /^\S{0,30}$/, message: '证件号码不能超过30个字符', trigger: 'blur,change' }]">
                            <el-input placeholder="证件号码" v-model="cert_swdjz.certNo" size="small"></el-input>
                        </el-form-item>
                        <date-picker timeType="2"
                        :startTime.sync="cert_swdjz.startTime"
                        :endTime.sync="cert_swdjz.endTime"
                        :full.sync="cert_swdjz.full"
                        :isLong.sync="cert_swdjz.lonrTime"
                        ></date-picker>
                        <el-form-item label="证件图片" prop="idcardCertImg" >
                            <template scope="scope">
                                <el-input placeholder="证件图片" size="small" v-model="cert_swdjz.imgs" v-show="false"></el-input>
                                <file-upload :files="cert_swdjz.imglist" :max="2" classx="12312" @getUrl=""></file-upload>
                                <span class="tips">支持格式 : png. jpg. bmp. gif. pdf , 大小不超过5MB</span>
                            </template>
                        </el-form-item>
                </el-form>
                <el-form label-width="100px" class="demo-dynamic" :model="cert_zzdmjgz" >
                        <div class="contenttitle_certs_title">
                            <p>{{cert_zzdmjgz.name}}</p>
                        </div>
                        <el-form-item label="证件号码" prop="certNo"  :rules="[ 
                          { pattern: /^\S{0,30}$/, message: '证件号码不能超过30个字符', trigger: 'blur,change' }]">
                            <el-input placeholder="证件号码" v-model="cert_zzdmjgz.certNo" size="small"></el-input>
                        </el-form-item>
                        <date-picker timeType="2"
                        :startTime.sync="cert_zzdmjgz.startTime"
                        :endTime.sync="cert_zzdmjgz.endTime"
                        :full.sync="cert_zzdmjgz.full"
                        :isLong.sync="cert_zzdmjgz.lonrTime"
                        ></date-picker>
                        <el-form-item label="证件图片" prop="idcardCertImg" >
                            <template scope="scope">
                                <el-input placeholder="证件图片" size="small" v-model="cert_zzdmjgz.imgs" v-show="false"></el-input>
                                <file-upload :files="cert_zzdmjgz.imglist" :max="2" classx="12312" @getUrl=""></file-upload>
                                <span class="tips">支持格式 : png. jpg. bmp. gif. pdf , 大小不超过5MB</span>
                            </template>
                        </el-form-item>
                </el-form>
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
import dailog from '@/components/Dailog';
import queryList from '@/components/queryList';
import regionPicker from '@/components/regionPicker';
import datePicker from '@/components/datePicker';
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
            malis_state: true,
            phone_state: true,
            loginAccount_state: true,
            send_status: true,
            yyy: {
                startTime: 'startTime',
                endTime: 'full' 
            },
            xxx: {
                startTime: [{ required: true, message: '请输入开始时间', trigger: 'blur,change' }],
                endTime: [{ required: true, message: '请输入结束时间或勾选长期', trigger: 'blur,change' }]
            },
            search: {
                pageIndex: 1,
                pageSize: 10,
                total: 10,
                full: '',
                keywords: '',
                info: []
            },
            resetmsg: '',
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
            cert_yljyxkz: {
                name: '医疗器械经营企业许可证 (必填)',
                certNo: '',
                startTime: '',
                endTime: '',
                lonrTime: false,
                imglist: [],
                imgs: ''
            },  
            cert_swdjz: {
                name: '税务登记证',
                certNo: '',
                startTime: '',
                endTime: '',
                lonrTime: false,
                imglist: [],
                imgs: ''
            },  
            cert_zzdmjgz: {
                name: '组织机构代码证',
                certNo: '',
                startTime: '',
                endTime: '',
                lonrTime: false,
                imglist: [],
                imgs: ''
            },  
            cert_yyzz: {
                name: '营业证照 (必填)',
                certNo: '',
                startTime: '',
                endTime: '',
                lonrTime: false,
                imglist: [],
                imgs: ''
            },   
            msgx: {
                enterpriseName: '',
                enterprise: {
                    isEdit: false,
                    showNc: false
                },
                legalPerson: '',
                linkPerson: '',
                linkTelphone: '',
                registAddr: '',
                address: {
                    province: '浙江省',
                    city: '杭州市',
                    district: '西湖区'
                },
                loginAccount: '',
                password: '',
                repassword: '',
                userName: '',
                mobile: '',
                email: ''
                
            },
            rules: {
                enterpriseName: [
                    { required: true, message: '请输入公司名称', trigger: 'change' },
                    { pattern: /^\S{0,30}$/, message: '公司名称不能超过30个字符', trigger: 'blur,change' }
                ],
                legalPerson: [
                    { required: true, message: '请输入法人代表', trigger: 'blur,change' },
                    { pattern: /^\S{0,30}$/, message: '法人代表不能超过30个字符', trigger: 'blur,change' }
                ],
                linkPerson: [
                    { required: true, message: '请输入联系人', trigger: 'blur,change' },
                    { pattern: /^\S{0,30}$/, message: '联系人不能超过30个字符', trigger: 'blur,change' }
                ],
                linkTelphone: [
                    { pattern: /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/, message: '联系电话格式有误,有效11个字符', trigger: 'blur,change' }
                ],
                registAddr: [
                    { required: true, message: '请输入注册地址' },
                    { pattern: /^\S{0,120}$/, message: '注册地址不能超过120个字符', trigger: 'blur,change' }
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
                // certList: {
                //     certNo: [
                //         { required: true, message: '请输入证件号码', trigger: 'blur,change' },
                //         { pattern: /^\S{0,30}$/, message: '证件号码不能超过30个字符', trigger: 'blur,change' }
                //     ],
                //     startTime: [
                //         { required: true, message: '请输入开始时间', trigger: 'blur,change' }
                //     ],
                //     endTime: [
                //         { required: true, message: '请输入结束时间或勾选长期', trigger: 'blur,change' }
                //     ]
                // }
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
        },
        getNcList () {
            if (!this.msgx.enterprise.isEdit) {
                return;
            }
            this.Http.post(URL.PAGENCSUPPLIERS, {
                params: {
                    pageIndex: this.search.pageIndex,
                    pageSize: this.search.pageSize,
                    keywords: this.search.keywords
                }
            }).then((re) => {
                this.msgx.enterprise.showNc = true;
                this.search.total = re.data.total;
                this.search.info = re.data.rows;
            });
        },
        changeSelect (val) {
            console.log(this.resetmsg);
            this.msgx = this.resetmsg;
            this.$refs.forms.resetFields();
            if (val === 21) {
                this.msgx.enterprise.isEdit = true;
            } else {
                this.msgx.enterprise.isEdit = false;
            }
        },
        checkNc (item) {
            this.msgx.enterprise.showNc = false;
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
        this.resetmsg = _.cloneDeep(this.msgx);
        console.log(this.resetmsg === this.msgx);
        console.log(this.resetmsg);
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

.demo-dynamic {
    // width: 80%
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
