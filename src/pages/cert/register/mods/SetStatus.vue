<template >
<section >
    <dailog size="mini" :show.sync="myshow" classx="staff-add-user" title="设置" @ok="commit">
        <div slot="content">
            <el-col :span="24" >
                <el-form :model="form" :rules="rules" ref="form" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="有无鲜章" prop="providerPaper">
                        <el-radio-group v-model="form.providerPaper">
                            <el-radio :label="1" >有</el-radio>
                            <el-radio :label="0" >无</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="一直无鲜章" prop="alwaysNoPaper">
                        <el-checkbox  v-model="form.alwaysNoPaper" :true-label="1" :false-label="0">有</el-checkbox>
                    </el-form-item>
                </el-form> 
            </el-col>
        </div>
    </dailog>
</section>
</template>
<script>
    const URL = {
        COMMIT: 'scm.platformCert.updateNeedPaper' // 
    };
    export default {
        name: 'set-status',
        data () {
            return {
                form: {
                    providerPaper: 0,
                    alwaysNoPaper: 0
                },
                rules: {

                },
                myshow: false // 是否显示弹框
            };
        },
        props: {
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
            this.myshow = this.showx;
            this.form.alwaysNoPaper = this.cert.alwaysNoPaper;
            this.form.providerPaper = this.cert.providerPaper;
        },
        methods: {
            // 获取列表
            commit () {
                this.Http.post(URL.COMMIT,
                    {
                        params: Object.assign({
                            supplierNo: this.cert.supplierNo,
                            basicProductNo: this.cert.basicProductNo
                        }, this.form)
                    }).then((re) => {
                        this.$message('操作成功');
                        this.$emit('update');
                        this.myshow = false;
                    });
            }
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
    
</style>
