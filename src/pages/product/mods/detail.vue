//添加客户
<template>
    <section>
        <dailog size="small" :show.sync="myshow" classx="staff-add-user" :title="title" @ok="quire" :hide="(detailUser.type=='detail')">
            <div class="ui-table" slot="content">
                <div class="content_box">
                    <div class="contenttitle">产品信息</div>
                    <div class="content_container">
                        <table width="100%">
                            <tbody>
                                <tr>
                                    <td class="table_name">产品编号</td>
                                    <td>{{msgx.product.productNo}}</td>
                                </tr>
                                <tr>
                                    <td class="table_name">产品名称</td>
                                    <td>{{msgx.product.productName}}</td>
                                </tr>
                                  <tr v-if="msgx.product.registNo">
                                    <td class="table_name" >注册证号</td>
                                    <td>{{msgx.product.certType == '0'?'不作为医疗器械管理':msgx.product.registNo}}</td>
                                </tr>
                                <tr>
                                    <td class="table_name">通用名称</td>
                                    <td>{{msgx.product.genericName}}</td>
                                </tr>
                                <tr>
                                    <td class="table_name">生产厂商</td>
                                    <td>{{msgx.product.factoryName}}</td>
                                </tr>
                                <tr>
                                    <td class="table_name">品牌名称</td>
                                    <td>{{msgx.product.brandName}}</td>
                                </tr>
                                <tr>
                                    <td class="table_name">产地名称</td>
                                    <td>{{msgx.product.addr}}</td>
                                </tr>
                                <tr>
                                    <td class="table_name">产地类型</td>
                                    <td>{{msgx.product.addrType == '1' ? '境内' : '境外'}}</td>
                                </tr>
                                <tr v-if="msgx.detail && msgx.detail.certificateAuthority">
                                    <td class="table_name">发证机关</td>
                                    <td>{{msgx.detail.certificateAuthority}}</td>
                                </tr>
                                <tr>
                                    <td class="table_name">存储条件</td>
                                    <td>{{msgx.detail.storage}}</td>
                                </tr>
                                <tr>
                                    <td class="table_name">有效周期</td>
                                    <td>{{msgx.detail.expiryDate>=0? (msgx.detail.expiryDate +''+ (msgx.detail.expiryUnitName||'')):''}}</td>

                                </tr>
                                <tr>
                                    <td class="table_name">产品规格</td>
                                    <td>{{msgx.product.spec + ' / ' + msgx.product.unit}}</td>
                                </tr>
                                 <tr>
                                    <td class="table_name">证照图片</td>
                                    <td >
                                        <fileList :files="msgx.product.registImg" :master="true"></fileList>
                                        <fileList :files="msgx.product.registImgAttach"></fileList>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="table_name">产品图片</td>
                                    <td >
                                        <fileList :files="msgx.product.productImg"></fileList>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="table_name">商品货号</td>
                                    <td v-html="msgx.product.articleNo"></td>
                                </tr>
                                <tr>
                                    <td class="table_name">ERP编号</td>
                                    <td v-html="msgx.product.sysNo"></td>
                                </tr>
                                <tr>
                                    <td class="table_name">是否冷链</td>
                                    <td>{{msgx.product.coldChain == '1' ? '是' : '否'}}</td>
                                </tr>
                                <tr v-if="msgx.product.certType==1">
                                    <td class="table_name">68分类</td>
                                    <td v-html="msgx.product.category68Name"></td>
                                </tr>
                                <tr v-if="msgx.product.certType==1">
                                    <td class="table_name">证照效期</td>
                                    <td >{{(msgx.product.startTime) ? (msgx.product.startTime + ' 至 ' + msgx.product.endTime) : ''}}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
    
                <div class="content_box">
                    <div class="contenttitle">生产厂商</div>
                    <div class="content_container">
                        <table width="100%">
                            <tbody>
                                <tr>
                                    <td class="table_name">生产厂商类型</td>
                                    <td>{{msgx.factory.factoryType == '2' ? '境外' : '境内'}}</td>
                                </tr>
                                <tr>
                                    <td class="table_name">生产厂商</td>
                                    <td>{{msgx.factory.factoryName}}</td>
                                </tr>
                                <tr>
                                    <td class="table_name">全国总代理</td>
                                    <td>{{msgx.factory.agent}}</td>
                                </tr>
                                <tr>
                                    <td class="table_name">生产厂商证照</td>
                                    <td>
                                         <li class="clear img_list" v-for="(item,index) in msgx.factory.factoryCertList" :key="index">
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
                                        </dl>
                                    </div>
                                </li>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
    
                <div class="content_box">
                    <div class="contenttitle">授权书</div>
                    <div class="content_container">
                        <el-table :data="msgx.warrant" border >
                            <el-table-column prop="higher" label="授权单位"  align="center">
                            </el-table-column>
                            <el-table-column  label="授权时间"  align="center">
                                <template scope="scope">
                                    <span>{{scope.row.startTime + ' 至 ' + (scope.row.longTerm == '1' ? '长期' : scope.row.endTime )}}</span>
                                </template>
                            </el-table-column>
                        </el-table>
    
                    </div>
                </div>
    
                <div class="content_box"  v-if="detailUser.type=='audit'">
                    <div class="contenttitle">产品审核</div>
                    <div class="content_container">
                        <table width="100%">
                            <tbody>
                                <tr>
                                    <td class="table_name">审核结果</td>
                                    <td>
                                        <el-radio-group v-model="forms.radios">
                                            <el-radio :label="3">审核通过</el-radio>
                                            <el-radio :label="4">审核不通过</el-radio>
                                        </el-radio-group> 
                                    </td>
                                </tr>
                                <tr>
                                    <td class="table_name">审核备注</td>
                                    <td>
                                        <el-form :rules="rules" ref="forms" :model="forms">
                                            <el-form-item prop="resource">
                                                <el-input type="textarea" v-model="forms.resource"></el-input>
                                            </el-form-item>
                                        </el-form>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
    
            </div>
        </dailog>
    </section>
</template>   

<script>
const URL = {
    DETAIL: 'scm.product.queryProductDetPlatform', // 查看产品信息
    CHECK: 'scm.product.modAuditProduct' // 审核
};
import fileList from '@/components/FileList.vue';
import CONFIG from '@/config/app.config'; // 配置
import dailog from '@/components/Dailog';
import { formatFile } from '@/services/global.common';
import noimg from '@/assets/images/noimage.png'; // 没有图片
import '@/assets/directive/vueDirective.js'; // jq boxer指令
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
            msgx: {
                warrant: [],
                product: [],
                detail: [],
                factory: []
            },
            forms: {
                radios: 3,
                resource: '',
                ids: []
            },
            patterns: { required: true, message: '审核不通过时,审核备注不能为空' },
            rules: {
                resource: [
                    { pattern: /^.{1,200}$/, message: '审核备注长度不能大于200个字符' }
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
            if (this.forms.radios === 4) {
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
                    params: {
                        productNo: this.detailUser.no,
                        status: this.forms.radios + '',
                        reason: this.forms.resource  
                    }
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
            case '0':
                _html = '三证合一';
                break;
            case '1':
                _html = '营业执照';
                break;
            case '2':
                _html = '生产许可证';
                break;
            case '3':
                _html = '税务登记证';
                break;
            case '4':
                _html = '组织机构代码证';
                break;
            default:
                break;  
            }
            return _html;
        },
        // 获取数据
        async getData () {
            await this.Http.post(URL.DETAIL, {
                params: {
                    productNo: this.detailUser.no
                }
            }).then((re) => {
                // // 格式化logo
                if (re.data.factory.factoryCertList && re.data.factory.factoryCertList.length) {
                    re.data.factory.factoryCertList = re.data.factory.factoryCertList.map(item => {
                        this.forms.ids.push(item.id);
                        // 图片
                        if (item.fileUrl) {
                            item.fileUrl_format = formatFile(item.fileUrl);
                            item.fileUrl = CONFIG.IMAGE_DOWNLOAD + item.fileUrl;
                        } else {
                            item.fileUrl_format = noimg;
                        }
                        item.certName = this.auditStatus(item.certType);
                        // 时间格式化
                        item.endTime_format = item.longTerm === '1' ? '长期' : item.endTime;
                        return item;
                    });
                }   

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
    },
    components: {
        dailog,
        fileList
    }
};
</script>

<style scoped lang="scss" rel="stylesheet/scss">
.img_list {
    border-bottom: 1px dashed #ddd;
    margin-bottom: 10px;
}

.content_box {
    border: 1px #c8ecf2 solid;
    .contenttitle {
        background: #ebfcff;
        color: #000;
        text-transform: uppercase;
        -moz-border-radius: 2px 2px 0 0;
        -webkit-border-radius: 2px 2px 0 0;
        border-radius: 2px 2px 0 0;
        font-size: 14px;
        font-weight: bolder;
        line-height: 40px;
        padding: 0 10px
    }
    .content_container {
        padding: 10px;
    }
}
</style>
