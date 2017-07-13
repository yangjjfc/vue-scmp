//添加客户
<template>
    <section>
        <dailog size="small" :show.sync="myshow" classx="staff-add-user" :title="title" @ok="quire" :hide="(detailUser.type=='detail')">
            <div class="ui-table" slot="content">
                <div>
                    <img :src="msgx.logo" class="logo">
                    <span class="enterprise_name">{{msgx.enterpriseName}}</span>
                </div>
                <table width="100%">
                    <tbody>
                        <tr>
                            <td class="table_name">企业编号</td>
                            <td>{{msgx.enterpriseNo}}</td>
                        </tr>
                        <tr>
                            <td class="table_name">企业名称</td>
                            <td>{{msgx.enterpriseName}}</td>
                        </tr>
                        <tr>
                            <td class="table_name">法人代表</td>
                            <td>{{msgx.legalPerson}}</td>
                        </tr>
                        <tr>
                            <td class="table_name">联系人</td>
                            <td>{{msgx.linkPerson}}</td>
                        </tr>
                        <tr>
                            <td class="table_name">联系电话</td>
                            <td>{{msgx.linkTelphone}}</td> 
                        </tr>
                        <tr>
                            <td class="table_name">注册地址</td>
                            <td>{{msgx.provinceName + ' ' + msgx.cityName + ' ' + msgx.townName + ' ' + msgx.regAddr}}</td>
                        </tr>
                        <tr>
                            <td class="table_name">许可经营范围</td>
                            <td>{{msgx.manageScopeParent}}</td>
                        </tr>
                        <tr>
                            <td class="table_name">企业证照</td>
                            <td>
                                <li class="clear img_list" v-for="(item,index) in msgx.enterpriseCerts" :key="index">
                                    <div class="left mgr10" >
                                        <a class="boxer" :href="item.fileUrl" v-boxer="item.fileUrl" v-if="item.fileUrl">
                                            <img :src="item.fileUrl_format" width="100" height="100">
                                        </a>
                                        <img :src="item.fileUrl_format" width="100" height="100" v-else> 
                                        <br>
                                    </div>
                                    <div class="left">
                                        <dl>
                                            <dd>
                                                <h5 class="green">{{item.certName}}</h5>
                                            </dd>
                                            <dd>证件编号 : {{item.certCode}}</dd>
                                            <dd>证件效期 : {{item.startTime}} 至 {{item.endTime_format}}</dd>
                                            <dd >证件状态 : <span v-html="item.auditStatusx"></span></dd>
                                        </dl>
                                    </div>
                                </li>
                            </td>
                        </tr>
                        <tr>
                            <td class="table_name">注册时间</td>
                            <td>{{msgx.addTime}}</td>
                        </tr>
                        <tr>
                            <td class="table_name">ERP</td>
                            <td>{{(msgx.enableErp == '1' ? '已启用' : '未启用')}}</td>
                        </tr>
                        <tr>
                            <td class="table_name">登录账号</td>
                            <td>{{msgx.loginAccount}}</td>
                        </tr>
                        <tr v-if="detailUser.type=='detail'">
                            <td class="table_name">审核状态</td>
                            <td v-html="msgx.auditStatusx"></td>
                        </tr>
                        <tr v-if="detailUser.type=='detail'">
                            <td class="table_name">审核意见</td>
                            <td>{{msgx.remark}}</td>
                        </tr>
                        <tr v-if="detailUser.type=='audit'">
                            <td class="table_name">审核结果</td>
                            <td>
                                <el-radio-group v-model="forms.radios">
                                    <el-radio :label="1" >审核通过</el-radio>
                                    <el-radio :label="0" >审核不通过</el-radio>
                                </el-radio-group>
                            </td>
                        </tr>
                        <tr v-if="detailUser.type=='audit'">
                            <td class="table_name">审核备注</td>
                            <td>
                                <el-form :rules="rules" ref="forms"  :model="forms" >
                                     <el-form-item  prop="resource">
                                        <el-input type="textarea" v-model="forms.resource"></el-input>
                                    </el-form-item>
                                </el-form>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </dailog>
    </section>
</template>   

<script>
const URL = {
    DETAIL: 'scm.platformSupplier.findEnterprise', // 详情
    CHECK: 'scm.platformCustomer.auditEnterprise' // 审核
};
import CONFIG from '@/config/app.config'; // 配置
import { formatFile } from '@/services/global.common';
import noimg from '@/assets/images/noimage.png'; // 没有图片
export default {
    name: 'supplier-detail',
    props: {
        showx: { // 显示
            type: Boolean,
            require: true
        },
        type: { // 'detail'/'audit'
            type: String,
            require: true
        },
        detailUser: { // 用户数据
            type: Object,
            require: true
        },
        title: { // 标题
            type: String,
            require: true
        }
    },
    data () {
        return {
            myshow: false, // 是否显示弹框
            msgx: {},
            forms: {
                radios: 1,
                resource: '',
                ids: []
            },
            patterns: { required: true, message: '审核不通过时,审核备注不能为空' },
            rules: {
                resource: [
                     {pattern: /^.{1,200}$/, message: '审核备注长度不能大于200个字符'}
                ]
            }  
        };
    },
    computed: {

    },
    methods: {
        // 审核
        quire () {
            let flag = true;
            // 审核失败时校验
            if (this.forms.radios === 0) {
                this.rules.resource.unshift(this.patterns);
                this.$refs.forms.validate((valid) => {
                    this.rules.resource.shift(this.patterns);
                    if (!valid) {
                        flag = false;
                        return; 
                    }
                });
            }
            if (flag) {
                this.Http.post(URL.CHECK, {
                    enterpriseNo: this.detailUser.no,
                    ids: this.forms.ids,
                    type: this.forms.radios + '',
                    content: this.forms.resource
                }).then((re) => {
                    if (re.data) {    
                        this.$notify({
                            title: '成功',
                            message: '提交成功',
                            type: 'success'
                        });
                        this.myshow = false;
                        this.$emit('refresh');
                    }
                });       
            }
        },
        // 审核状态
        auditStatus (item) {
            let _html = '';
            switch (item) {  
            case 'audit_wait':
            case 'auditing':
                _html = '<span class="orange">待审核</span>';
                break;
            case 'audit_success':
                _html = '<span class="green">审核通过</span>';
                break;
            case 'audit_fail':
                _html = '<span class="red">审核不通过</span>';
                break; 
            default:
                break; 
            } 
            return _html; 
        }, 
        // 获取数据
        async getData () {
            await this.Http.post(URL.DETAIL, {
                enterpriseNo: this.detailUser.no
            }).then((re) => {
                // 格式化logo
                if (re.data.logo) {
                    re.data.logo = formatFile(re.data.logo);
                } else {
                    re.data.logo = noimg; 
                }
                re.data.auditStatusx = this.auditStatus(re.data.auditStatus);
                re.data.enterpriseCerts = re.data.enterpriseCerts.map(item => {
                    this.forms.ids.push(item.id);
                    // 图片
                    if (item.fileUrl) {
                        item.fileUrl_format = formatFile(item.fileUrl);
                        item.fileUrl = CONFIG.IMAGE_DOWNLOAD + item.fileUrl;
                    } else {
                        item.fileUrl_format = noimg;
                    }
                    item.auditStatusx = this.auditStatus(item.auditStatus);
                    // 时间格式化
                    item.endTime_format = item.longTerm === '1' ? '长期' : item.endTime; 
                    
                    return item;
                });

                this.msgx = re.data;
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
        this.getData().then(() => {
            this.myshow = this.showx;
        });
    }
    
};
</script>

<style scoped lang="scss" rel="stylesheet/scss">
.logo {
    width: 40px;
    height: 40px;
    margin-bottom: 10px;
    border: 1px solid #ddd;
    border-radius: 50%;
    margin-right: 10px;
    float: left;
}
.enterprise_name {
    float: left;
    line-height: 40px;
    font-size: 18px;
    font-weight: bolder;
}
.img_list{
    border-bottom:1px dashed #ddd;
    margin-bottom:10px;
}

</style>
