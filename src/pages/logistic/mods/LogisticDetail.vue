<template >
    <section class="container_setion">
        <!--工具条-->
        <el-row>
            <el-col :span="24" class="toolbar">
                <el-form :inline="true">
                    <el-form-item>
                        <h4>配送单号：
                            <span v-text="no"></span>
                        </h4>
                    </el-form-item>
                    <el-form-item class="pull-right">
                        <el-button @click="returns" size="small">返回</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col :span="24" class="ui-table">
                <h3>配送单信息</h3>
                <table width="100%" cellspacing="0" cellpadding="0">
                    <tbody>
                        <tr>
                            <td>供应商名称 :
                                <span v-text="order.supplierName"></span>
                            </td>
                            <td>客户名称 :
                                <span v-text="order.customerName"></span>
                            </td>
                            <td>订单编号 :
                                <span v-text="order.orderNo"></span>
                            </td>
                        </tr>
                        <tr>
                            <td>发货人 :
                                <span v-text="order.deliveryName"></span>
                            </td>
                            <td>发货时间 :
                                <span v-text="order.deliveryTime"></span>
                            </td>
                            <td>下单时间 :
                                <span v-text="order.orderTime"></span>
                            </td>
                        </tr>
                        <tr>
                            <td>收货人 :
                                <span v-text="order.receiveName"></span>
                            </td>
                            <td>收货电话 :
                                <span v-text="order.deliveryPhone"></span>
                            </td>
                            <td>收货地址 :
                                <span v-text="order.receiveAddr"></span>
                            </td>
                        </tr>
                        <tr>
                            <td>收货时间 ：
                                <span v-text="order.receiptTime"></span>
                            </td>
                            <td>配送方式 :
                                <span v-text="order.lCompanyName"></span>
                            </td>
                            <td>快递单号 :
                                <span v-text="order.lno"></span>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="3">备注 ：
                                <span v-text="order.remark"></span>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </el-col>
    
            <el-col :span="24">
                <el-table :data="list" border>
                    <el-table-column prop="index" label="序号" width="70" align="center">
                    </el-table-column>
                    <el-table-column prop="productName" label="产品名称" min-width="150" align="">
                    </el-table-column>
                    <el-table-column prop="registNo" label="注册证号" min-width="150" align="">
                    </el-table-column>
                    <el-table-column prop="spec" label="规格" min-width="120" align="center">
                    </el-table-column>
                    <el-table-column prop="num" label="配送数量" width="100" align="center">
                    </el-table-column>
                    <el-table-column prop="batch" label="批号" min-width="140" align="center">
                    </el-table-column>
                    <el-table-column prop="validDate" label="效期" min-width="120" align="center">
                    </el-table-column>
                    <el-table-column prop="invoice" label="发票号" min-width="140" align="center">
                    </el-table-column>
                    <el-table-column prop="invoiceDate" label="开票日期" min-width="140" align="center">
                    </el-table-column>
                    <el-table-column prop="unit" label="单位" width="80" align="center">
                    </el-table-column>
                    <el-table-column prop="price" label="单价" min-width="120" align="right">
                    </el-table-column>
                    <el-table-column prop="total" label="金额" min-width="140" align="right">
                    </el-table-column>
                </el-table>
                <p class="align-right">
                    合计金额 ：
                    <b class="red" v-text="order.totalMoney"></b> 元
                </p>
            </el-col>
        </el-row>
    </section>
</template>
<script>
import { parseMone } from '@/services/global.common';
const URL = {
    PEOPLE_LIST: 'scm.orderDelivery.getDeliveryOrder' // 查询列表
};
export default {
    name: 'logisticDetail',
    data () {
        return {
            total: 0,
            pageSize: 20,
            pageIndex: 1,
            no: '',
            order: {},
            list: []
        };
    },
    computed: {},
    methods: {
        // 获取列表
        getList () {
            let param = this.$route.params;
            this.Http.post(URL.PEOPLE_LIST,
                {
                    params: param
                }).then((re) => {
                    this.order = re.data.delivery;
                    this.order.totalMoney = parseMone(this.order.totalMoney);
                    this.list = re.data.rows.map((item, index) => {
                        item.index = index + 1 + (this.pageIndex - 1) * this.pageSize;
                        item.price = parseMone(item.price);
                        item.total = parseMone(item.total || 0);
                        return item;
                    });
                });
        },

        // 查看
        returns () {
            this.$router.back();
        }

    },
    created () {
        this.no = this.$route.params.deliveryNo;
    },
    mounted () {
        this.getList();
    }

};

</script>

<style  scoped lang="scss" rel="stylesheet/scss">
h3 {
    line-height: 30px;
}
 
.align-right {
    text-align: right;
    font-size: 16px;
    line-height: 30px;
}

.ui-table {
    td {
        width: 33.3%;
    }
}
</style>
