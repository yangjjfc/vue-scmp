<template >
<section class="container_setion">
    <dailog size="small" :show.sync="myshow" classx="staff-add-user" :title="title" @ok="quire">
        <div slot="content">
            <el-col :span="24" class="ui-table">
                <el-form :model="checkForm" :rules="rules" ref="checkForm"  class="demo-ruleForm">
                <table>
                    <tr>
                        <td class="table_name">供应商名称 </td>
                        <td><span v-text="result.supplierName"></span></td>
                    </tr>
                    <tr>
                        <td class="table_name">注册证号 </td>
                        <td><span v-text="result.registNo"></span></td>
                    </tr>
                    <tr>
                        <td class="table_name">产品名称 </td>
                        <td><span v-text="result.registName"></span></td>
                    </tr>
                    <tr>
                        <td class="table_name">证件日期 </td>
                        <td>
                            {{result.startTime}} 至 <span v-if="result.longTerm == 1">长期</span> <span v-else>{{result.endTime}}</span>
                        </td>
                    </tr>
                    <tr>
                        <td class="table_name">生产厂商 </td>
                        <td>
                            <div v-text="result.factoryName"></div>
                        </td>
                    </tr>
                    <tr>
                        <td class="table_name">品牌名称 </td>
                        <td>
                            <div v-text="result.brandName"></div>
                        </td>
                    </tr>
                    <tr>
                        <td class="table_name">产地类型 </td>
                        <td>
                            <div v-if="result.isAbroad == 1">境内</div>
                            <div v-else>境外</div>
                        </td>
                    </tr>
                    <tr>
                        <td class="table_name">发证机关 </td>
                        <td><span v-text="result.certificateAuthority"></span></td>
                    </tr>
                    <tr>
                        <td class="table_name">存储条件 </td>
                        <td><span v-text="result.storeCondiValidtime"></span></td>
                    </tr>
                    <tr>
                        <td class="table_name">有效周期 </td>
                        <td><span v-text="result.expiryDate"></span></td>
                    </tr>
                    <tr>
                        <td class="table_name">注册证产品规格 </td>
                        <td><span v-text="result.qualityModel"></span></td>
                    </tr>
                    <tr>
                        <td class="table_name">证照图片 </td>
                        <td>
                            <fileList :files="result.registImg" :isMaster="true"></fileList>
                            <fileList :files="result.registImgAttach"> </fileList>
                        </td>
                    </tr>
                    <tr v-if="type == 'detail'">
                        <td class="table_name">有无鲜章 </td>
                        <td>
                            <span v-text="result.providerPaper == 1 ? '有':'无'"></span>
                        </td>
                    </tr>
                    <tr v-if="type == 'detail'">
                        <td class="table_name">一直无鲜章 </td>
                        <td>
                            <span v-text="result.alwaysNoPaper == 1 ? '有':'无'"></span>
                        </td>
                    </tr>
                    <tr v-if="type == 'check'">
                        <td class="table_name">有无鲜章 </td>
                        <td>
                            <el-radio class="radio" v-model="checkForm.providerPaper" :label="1" >有</el-radio>
                            <el-radio class="radio" v-model="checkForm.providerPaper" :label="0" >无</el-radio>  
                        </td>
                    </tr>
                    <tr v-if="type == 'check'">
                        <td class="table_name">一直无鲜章 </td>
                        <td>
                            <el-checkbox  class="radio" v-model="checkForm.alwaysNoPaper" :label="1">是</el-checkbox>  
                        </td>
                    </tr>
                    <tr>
                        <td class="table_name">结构及组成 </td>
                        <td><span v-text="result.structureFrom"></span></td>
                    </tr>
                    <tr>
                        <td class="table_name">适用范围(预期用途) </td>
                        <td><span v-text="result.rangeUse"></span></td>
                    </tr>
                    <tr>
                        <td class="table_name">质量标准 </td>
                        <td><span v-text="result.productStandards"></span></td>
                    </tr>
                    <tr>
                        <td class="table_name">备注 </td>
                        <td><span v-text="result.otherRemark"></span></td>
                    </tr>
                    <tr>
                        <td class="table_name">基础数据库产品审核状态 </td>
                        <td>
                            <span v-if="result.basicStatus == 0">认证中</span>
                            <span class= "green" v-if="result.basicStatus == 1">审核通过</span>
                            <span class= "red" v-if="result.basicStatus == 2">审核不通过</span>
                        </td>
                    </tr>
                    <tr v-if="type == 'check'">
                        <td class="table_name">审核结果</td>
                        <td>
                            <el-radio class="radio" v-model="checkForm.registStatus" :label="3"  @click.native="resetForm" :disabled="result.basicStatus != 1" >审核通过</el-radio>
                            <el-radio class="radio" v-model="checkForm.registStatus" :label="4"  @click.native="resetForm">审核不通过</el-radio>  
                        </td>
                    </tr>
                    <tr v-if="type == 'check'">
                            <td class="table_name">审核备注</td>
                            <td> 
                                <el-form-item prop="reason" >
                                    <el-input type="textarea" :rows="2" v-model="checkForm.reason" placeholder="请输入备注"></el-input>
                                </el-form-item>
                            </td>
                        </tr>
                </table>
                </el-form>
            </el-col>
        </div>
    </dailog>
</section>
</template>
<script>
    import fileList from '@/components/FileList.vue';
    const URL = {
        DETAIL: 'scm.platformCert.queryAuthRegistDetail', // 
        CHECK: 'scm.platformCert.auditRegist'
    };
    export default {
        name: 'register-detail',
        data () {
            return {
                title: '注册证详情',
                result: {},
                rules: {
                    reason: [
                       
                    ]
                },
                checkForm: {
                    registStatus: 4,
                    reason: '',
                    providerPaper: 2,
                    alwaysNoPaper: false
                },
                myshow: false // 是否显示弹框
            };
        },
        props: {
            cert: {
                type: Object
            },
            type: '',
            showx: { // 显示
                type: Boolean,
                require: true
            }
        },
        watch: {
            myshow (val, oldval) {
                this.grayCert = ''; 
                if (oldval && !val) {
                    this.$emit('update:showx', false);
                }
            }
        },
        beforeMount () {
            this.type === 'check' && (this.title = '注册证审核');
            this.getData().then(() => {
                this.myshow = this.showx;
            }); 
        },
        methods: {
            // 获取列表
            async getData () {
                await this.Http.post(URL.DETAIL,
                    {
                        params: {
                            basicProductNo: this.cert.basicProductNo,
                            supplierNo: this.cert.supplierNo
                        }
                    }).then((re) => {
                        this.result = re.data;
                        this.checkForm.providerPaper = this.result.providerPaper;
                        this.checkForm.alwaysNoPaper = !!this.result.alwaysNoPaper;
                    });
            },
            resetForm () {
                this.$refs.checkForm.resetFields();
            },
            // 确定
            quire () {
                if (this.type === 'detail') {
                    this.myshow = false;
                } else {
                    // 审核不通过必须有原因
                    if (this.checkForm.registStatus === 4) {
                        this.rules.reason.push({ required: true, message: '审核失败时,备注不能为空', trigger: 'blur,change' });
                    } else {
                        this.rules.reason = [];
                    }
                    this.$refs.checkForm.validate((valid) => {
                        if (valid) {
                            this.commit();
                        } else {
                            return false;
                        }
                    });
                }
            },
            // 提交
            commit () {
                if (this.checkForm.providerPaper === 2) {
                    this.$notify({
                        title: '警告',
                        message: '有无鲜章必选',
                        type: 'warning' 
                    });    
                    return; 
                }
                this.Http.post(URL.CHECK, {
                    params: Object.assign({
                        basicProductNo: this.cert.basicProductNo,
                        supplierNo: this.cert.supplierNo,
                        alwaysNoPaper: this.checkForm.alwaysNoPaper ? '1' : '0',
                        providerPaper: this.checkForm.providerPaper
                    }, this.checkForm)
                }).then(result => {
                    this.$notify({
                        title: '成功',
                        message: '操作成功',
                        type: 'success'
                    });     
                    this.$emit('update');
                    this.myshow = false;
                });
            }
        },
        components: {
            fileList
        }
    };

</script>

<style lang="scss">
   
    h3{
        line-height:30px;
    }
    .align-right{
        text-align:right;
        font-size:16px;
    }
    #FILEtoPrint{
        display:none;
    }
</style>
