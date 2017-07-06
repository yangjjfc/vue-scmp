<template>
    <section >
       <dailog size="small" :show.sync="myshow" classx="staff-add-user"  title="电子签章详情" @ok="quire">
            <div slot="content">
                <el-col :span="24" class="ui-table">
                    <el-form :model="checkForm" :rules="rules" ref="checkForm"  class="demo-ruleForm">
                    <table  >
                        <tr>
                            <td class="table_name">企业名称: </td>
                            <td><span v-text="result.enterpriseName"></span></td>
                        </tr>
                        <tr>
                            <td class="table_name">签章地址: </td>
                            <td>
                                <fileList :files="result.signatureAddr"></fileList>
                            </td>
                        </tr>
                        <tr v-if="type == 'detail'">
                            <td class="table_name">认证次数: </td>
                            <td>
                              <span v-text="result.authTimes"></span>
                            </td>
                        </tr>
                        <tr v-if="type == 'detail'">
                            <td class="table_name">认证状态: </td>
                            <td> <span v-html="result.text"></span></td>
                        </tr>
                        <tr v-if="type == 'detail' && result.status == 4">
                            <td class="table_name">认证失败原因: </td>
                            <td> <span v-html="result.reason"></span></td>
                        </tr>
                        <tr v-if="type == 'check'" >   
                            <td class="table_name">审核结果:</td>
                            <td>
                                <el-radio class="radio" v-model="checkForm.status" label="1" @click.native="resetForm">审核通过</el-radio>
                                <el-radio class="radio" v-model="checkForm.status" label="4" @click.native="resetForm">审核不通过</el-radio>  
                            </td>
                        </tr>
                        <tr v-if="type == 'check'">
                            <td class="table_name">审核备注:</td>
                            <td > 
                                <el-form-item prop="reason" >
                                    <el-input v-model="checkForm.reason" placeholder="请输入内容"></el-input>
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
        DETAIL: 'ypt.open.yscm.getSignatureByPlatform', // 平台端-查询企业签章详细
        CHECK: 'ypt.open.yscm.modAuditSignature' // 平台端-企业签章审核
    };
    export default {
        name: 'electronic-detail',
        data () {
            return {
                files: [],
                myshow: false, // 是否显示弹框
                checkForm: {
                    status: '1',
                    reason: ''
                },
                rules: {
                    reason: [
                       /* { required: true, message: '请输入备注', trigger: 'blur,change' } */
                    ]
                },
                result: {},
                existProd: []
            };
        },
        props: {
            type: '',
            cert: {
                type: Object
            },
            showx: { // 显示
                type: Boolean,
                require: true
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
            this.getData();
            this.myshow = this.showx;
        },
        methods: {
            changeChecked (src) {
                this.checkd = src;
            },
            resetForm () {
                this.$refs.checkForm.resetFields();
            },
            // 获取列表
            getData () {
                let param = {
                    enterpriseNo: this.cert.enterpriseNo,
                    secret: this.cert.secret
                };
                this.Http.post(URL.DETAIL,
                    {
                        params: param
                    }).then((re) => {
                        this.result = re.data;
                        switch (parseInt(this.result.status)) {
                        case 1:
                            this.result.text = '<span class="green">认证成功</span>';
                            break;
                        case 2:
                            this.result.text = '<span class="">未认证</span>';
                            break;
                        case 3:
                            this.result.text = '<span class="orange">认证中</span>';
                            break;
                        case 4:
                            this.result.text = '<span class="red">认证失败</span>';
                            break;
                        default:
                            break;
                        }
                    });
            },
            commit () {
                this.Http.post(URL.CHECK, {
                    params: {
                        enterpriseNo: this.cert.enterpriseNo,
                        secret: this.cert.secret,
                        status: this.checkForm.status,
                        reason: this.checkForm.reason
                    }
                }).then(result => {
                    this.$message({
                        message: '审核成功',
                        type: 'success'
                    });
                    this.myshow = false;
                });
            },
            // 确定
            quire () {
                 // 自动基础库更新
                if (this.type === 'check') {
                    if (this.checkForm.status === '1') {
                        this.rules.reason.push({ required: true, message: '请输入备注', trigger: 'blur,change' });
                    } else {
                        //
                        this.rules.reason = [];
                    }
                    this.$refs.checkForm.validate((valid) => {
                        if (valid) {
                            this.commit();
                        } else {
                            return false;
                        }
                    });
                } else {
                    this.myshow = false;
                }
            }
            
        },
        mounted () {
        
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
    .table-form{
        margin-left:-100px;
    }
    .align-right{
        text-align:right;
        font-size:16px;
    }
   

  
</style>
