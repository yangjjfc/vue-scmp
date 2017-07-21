//日志
<template>
    <section>
        <dailog size="small" :show.sync="myshow" classx="view-user" title="审核日志" hide="true">
                <el-row slot="content">
                    <el-col :span="24">
                        <el-table :data="msgx" border style="width: 100%">
                            <el-table-column label="序号" prop="index" align="center" width="70">
                            </el-table-column>
                            <el-table-column label="操作内容"  prop="remark" align="center" min-width="160">
                            </el-table-column>
                            <el-table-column label="价格"  prop="price" align="center" width="100">
                            </el-table-column>
                            <el-table-column label="操作时间"  prop="createTime" align="center" width="160">
                            </el-table-column>
                            <el-table-column label="操作人" prop="operatorName" align="center" width="120">
                            </el-table-column>
                        </el-table>
                    </el-col>
                    <el-col :span="24" class="toolbar" v-show="total>0">
                        <pagination :total="total" :pageSize="pageSize" :pageIndex="pageIndex" @change="getData"></pagination>
                    </el-col>
            </el-row>
        </dailog>
    </section>
</template>   

<script>
import {parseMone} from '@/services/global.common';
const URL = { 
    'log': 'scm.platformCustomer.pageCustomerProductLog' // 审核日志
};
export default {
    name: 'hos-product-log',
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
                    customerNo: this.logmsg.customerNo,
                    productNo: this.logmsg.productNo,
                    supplierNo: this.logmsg.supplierNo,
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
                        item.price = parseMone(item.price);
                        return item;
                    });
                } else { 
                    this.msgx = [];
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
    }
    
};

</script>

<style scoped lang="scss" rel="stylesheet/scss">
</style>
