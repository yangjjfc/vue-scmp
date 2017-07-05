<template >
<section class="container_setion">
    <dailog size="mini" :show.sync="myshow" classx="staff-add-user" title="日志详情" @ok="quire">
        <div slot="content">
            <el-col :span="24" class="ui-table">
                 <el-tabs v-model="logType" @tab-click="changeType">
                    <el-tab-pane label="操作日志" name="1">
                        <el-table :data="list" border>
                            <el-table-column prop="index" label="序号" width="70" align="center">
                            </el-table-column>
                            <el-table-column prop="operatorName" label="审核人" width="160" align="center">
                            </el-table-column>
                             <el-table-column prop="createTime" label="审核时间" width="160" align="center">
                            </el-table-column>
                             <el-table-column prop="" label="状态" width="160" align="center">
                            <template scope="scope">
                                <div v-html="scope.row.statusStr"></div>
                            </template>
                            </el-table-column>
                             <el-table-column prop="remark" label="审核内容" width="160" align="center">
                            </el-table-column>
                        </el-table>
                        
                    </el-tab-pane>
                    <el-tab-pane label="审核日志" name="2">
                        <el-table :data="list" border>
                            <el-table-column prop="index" label="序号" width="70" align="center">
                            </el-table-column>
                            <el-table-column prop="operatorName" label="审核人" width="160" align="center">
                            </el-table-column>
                             <el-table-column prop="createTime" label="审核时间" width="160" align="center">
                            </el-table-column>
                             <el-table-column prop="" label="状态" width="160" align="center">
                            <template scope="scope">
                                <div v-html="scope.row.statusStr"></div>
                            </template>
                            </el-table-column>
                             <el-table-column prop="remark" label="审核内容" width="160" align="center">
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>
                </el-tabs>
                <el-col :span="24" class="toolbar">
                    <pagination :total="page.total" :pageSize="page.pageSize" @change="getData"></pagination>
                </el-col>
            </el-col>
        </div>
    </dailog>
</section>
</template>
<script>
    import pagination from '@/components/pagination';
    import dailog from '@/components/Dailog';
    const URL = {
        LOG: 'scm.platformCert.pageAuthorizeLogs' // 
       
    };
    export default {
        name: 'auth-log',
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
            this.getData();
            this.myshow = this.showx;
        },
        methods: {
            // 获取列表
            getData (page = this.page) {
                this.Http.post(URL.LOG,
                    {
                        params: {
                            certNo: this.cert.certNo,
                            logType: this.logType,
                            supplierNo: this.cert.supplierNo,
                            pageSize: page.pageSize,
                            pageIndex: page.pageIndex
                        }
                    }).then((re) => {
                        this.page = Object.assign({}, re.data);
                        delete this.page.rows;
                        this.list = re.data.rows;
                        
                        this.list.forEach((item, index) => {
                            item.index = index + 1 + (this.page.pageIndex - 1) * this.page.pageSize;
                            switch (item.status) {
                            case '1':
                                item.statusStr = '<span >创建</span>';
                                break;
                            case '2':
                                item.statusStr = '<span >提交审核</span>';
                                break;
                            case '3':
                                item.statusStr = '<span class="green">审核通过</span>';
                                break;
                            case '4':
                                item.statusStr = '<span class="red">审核不通过</span>';
                                break;
                            case '5':
                                item.statusStr = '<span>修改</span>';
                                break;
                            case '6':
                                item.statusStr = '<span class="grey">删除</span>';
                                break;
                            default:
                                break;
                            }
                        });
                    });
            },
            changeType () {
                this.getData();
            },
            // 确定
            quire () {
                this.myshow = false;
            }
        },
        mounted () {
        
        },
        components: {
            dailog,
            pagination
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
