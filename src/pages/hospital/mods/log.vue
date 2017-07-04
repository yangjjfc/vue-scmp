//日志
<template>
    <section>
        <dailog size="small" :show.sync="myshow" classx="view-user" title="审核日志" hide="true">
                <el-row slot="content">
                    <el-col :span="24">
                        <el-table :data="msgx" border style="width: 100%">
                            <el-table-column label="序号" prop="index" align="center" width="70">
                            </el-table-column>
                            <el-table-column label="审核时间"  prop="operatorTime" align="center" width="160">
                            </el-table-column>
                            <el-table-column label="审核人"  prop="operatorName" align="center" width="150">
                            </el-table-column>
                            <el-table-column label="操作类型"  prop="seconds" align="center" width="100">
                                <template scope="scope">
                                    <span v-if="scope.row.operType == 'audit_success'" class="green">审核通过</span>
                                    <span v-else class="red">审核不通过</span>
                                </template>
                            </el-table-column>
                            <el-table-column label="审核意见" prop="remark" align="center" min-width="150">
                            </el-table-column>
                        </el-table>
                    </el-col>
                    <el-col :span="24" class="toolbar">
                        <pagination :total="total" :pageSize="pageSize" :pageIndex="pageIndex" @change="getData"></pagination>
                    </el-col>
            </el-row>
        </dailog>
    </section>
</template>   

<script>
const URL = { 
    'log': 'scm.platformCustomer.listEnterpriseAuditLog' // 审核日志
};
import dailog from '@/components/Dailog';
import pagination from '@/components/pagination';
export default {
    name: 'hospital-log',
    props: ['showx', 'logmsg'],
    data () {
        return {
            myshow: false, // 是否显示弹框
            msgx: null, // 数据
            pageIndex: 1,
            pageSize: 10,
            total: 20
        };
    },
    methods: {
        // 获取数据
        async getData (pageIndex = this.pageIndex, pageSize = this.pageSize) {
            await this.Http.post(URL.log, {
                params: {
                    enterpriseNo: this.logmsg.no,
                    pageIndex: pageIndex,
                    pageSize: pageSize
                }
            }).then((re) => {
                this.pageIndex = re.data.pageIndex;
                this.pageSize = re.data.pageSize;
                this.total = re.data.total;
                if (re.data && re.data.rows.length) {
                    this.msgx = re.data.rows.map((item, index) => {
                        item.index = index + 1 + (pageIndex - 1) * pageSize;
                        return item;
                    });
                }
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
        pagination
    }

};

</script>

<style scoped lang="scss" rel="stylesheet/scss">
</style>
