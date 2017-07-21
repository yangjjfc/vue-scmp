<template >
<section class="container_setion">
    <dailog size="mini" :show.sync="myshow" classx="staff-add-user" title="日志详情"  :hide="true">
        <div slot="content">
            <el-col :span="24" class="ui-table">
                 <el-tabs v-model="logType" @tab-click="changeType">
                    <el-tab-pane label="操作日志" name="1">
                        <el-table :data="list" border>
                            <el-table-column prop="index" label="序号" width="80" align="center">
                            </el-table-column>
                            <el-table-column prop="operatorName" label="操作人" width="160" align="center">
                            </el-table-column>
                             <el-table-column prop="createTime" label="操作时间" width="180" align="center">
                            </el-table-column>
                            <el-table-column prop="supplierName" label="供应商" width="160" align="center">
                            </el-table-column>
                            <el-table-column prop="registName" label="注册证" width="160" align="center">
                            </el-table-column>
                            <el-table-column prop="remark" label="操作内容" width="160" align="center">
                            </el-table-column>
                            <el-table-column prop="reason" label="备注" width="160" align="center">
                            </el-table-column>
                        </el-table>
                        
                    </el-tab-pane>
                    <el-tab-pane label="审核日志" name="2">
                        <el-table :data="list" border>
                            <el-table-column prop="index" label="序号" width="80" align="center">
                            </el-table-column>
                            <el-table-column prop="operatorName" label="操作人" width="160" align="center">
                            </el-table-column>
                             <el-table-column prop="createTime" label="操作时间" width="180" align="center">
                            </el-table-column>
                            <el-table-column prop="supplierName" label="供应商" width="160" align="center">
                            </el-table-column>
                            <el-table-column prop="registName" label="注册证" width="160" align="center">
                            </el-table-column>
                            <el-table-column prop="remark" label="操作内容" width="160" align="center">
                            </el-table-column>
                            <el-table-column prop="reason" label="备注" width="160" align="center">
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>
                </el-tabs>
                <el-col :span="24" class="toolbar" v-show="page.total>0">
                    <pagination :total="page.total" :pageIndex.sync ="page.pageIndex" :pageSize.sync ="page.pageSize" @change="getData"></pagination>
                </el-col>
            </el-col>
        </div>
    </dailog>
</section>
</template>
<script>
    const URL = {
        LOG: 'scm.platformCert.pageAuthRegistLog' // 
       
    };
    export default {
        name: 'register-log',
        data () {
            return {
                list: [],
                logType: '1',
                page: {
                    pageSize: 10,
                    pageIndex: 1,
                    total: 0
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
                this.grayCert = ''; 
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
        methods: {
            // 获取列表
            async getData (pageSize = this.page.pageSize, pageIndex = this.page.pageIndex) {
                await this.Http.post(URL.LOG,
                    {
                        params: {
                            supplierNo: this.cert.supplierNo,
                            logType: this.logType,
                            registNo: this.cert.registNo,
                            pageSize: pageSize,
                            pageIndex: pageIndex
                        }
                    }).then((re) => {
                        this.page = Object.assign({}, re.data);
                        delete this.page.rows;
                        this.list = re.data.rows;
                        
                        this.list.forEach((item, index) => {
                            item.index = index + 1 + (this.page.pageIndex - 1) * this.page.pageSize;
                        });
                    });
            },
            changeType () {
                this.getData();
            }
        },
        mounted () {
        
        },
        components: {
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
