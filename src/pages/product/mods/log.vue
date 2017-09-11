<template >
    <section>
        <dailog size="small" :show.sync="myshow" classx="staff-add-user" title="日志详情" @ok="quire" :hide="true">
            <div slot="content">
                <el-col :span="24" class="ui-table">
                    <el-tabs v-model="logType" @tab-click="changeType">
                        <el-tab-pane label="操作日志" name="0">
                            <el-table :data="list" border>
                                <el-table-column prop="index" label="序号" min-width="90" align="center">
                                </el-table-column>
                                <el-table-column prop="operatorName" label="操作人" min-width="120" >
                                </el-table-column>
                                <el-table-column prop="createTime" label="操作时间" min-width="180" align="center">
                                </el-table-column>
                                <el-table-column prop="content" label="操作类型" min-width="160">
                                </el-table-column>
                                <el-table-column prop="remark" label="备注" min-width="160" >
                                </el-table-column>
                            </el-table>
                        </el-tab-pane>
                        <el-tab-pane label="审核日志" name="1">
                            <el-table :data="list" border>
                                <el-table-column prop="index" label="序号" min-width="90" align="center">
                                </el-table-column>
                                <el-table-column prop="operatorName" label="审核人" min-width="120" >
                                </el-table-column>
                                <el-table-column prop="createTime" label="审核时间" min-width="180" align="center">
                                </el-table-column>
                                <el-table-column prop="content" label="操作类型" min-width="160" >
                                </el-table-column>
                                <el-table-column prop="remark" label="审核意见" min-width="160" >
                                </el-table-column>
                            </el-table>
                        </el-tab-pane>
                    </el-tabs>
                    <el-col :span="24" class="toolbar" v-show="page.total>0">
                        <pagination :total="page.total" :pageIndex.sync="page.pageIndex" :pageSize.sync="page.pageSize" @change="getData"></pagination>
                    </el-col>
                </el-col>
            </div>
        </dailog>
    </section>
</template>
<script>
const URL = {
    LOG: 'scm.product.queryProductLogList' // 
};
export default {
    name: 'auth-log',
    data () {
        return {
            list: [],
            logType: '0',
            page: {
                pageSize: 10,
                pageIndex: 1,
                total: 0
            },
            myshow: false // 是否显示弹框
        };
    },
    props: {
        logmsg: {
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
        }).catch(() => {
            this.$emit('update:showx', false);
        });    
    },
    methods: {
        // 获取列表
        async getData (pageIndex = this.page.pageIndex, pageSize = this.page.pageSize) {
            await this.Http.post(URL.LOG,
                {
                    params: {
                        productNo: this.logmsg.no,
                        type: this.logType,
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
            this.page.pageIndex = 1;
            this.page.pageSize = 10; 
            this.getData();
        },
        // 确定
        quire () {
            this.myshow = false;
        }
    },
    mounted () {

    }
   
};

</script>

<style lang="scss">
h3 {
    line-height: 30px;
}

.align-right {
    text-align: right;
    font-size: 16px;
}

#FILEtoPrint {
    display: none;
}
</style>
