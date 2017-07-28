<template>
    <section class="container_setion">
        <!--工具条-->
        <el-row>
            <el-col :span="24" class="header_top">
                <el-button @click="returns"  size="small" class="right">返回</el-button>
                <h4 >订单编号:<span v-text="no"></span></h4>
            </el-col>
            <el-col :span="18" :offset="3" v-if="!~['trade_close','trade_cancel'].indexOf(order.status)">
                <Step :flow="flow"></step>
            </el-col>
            <el-col :span="24" class="ui-table">
                <h3>供应商信息</h3>
                <table  >
                    <tr>
                        <td>供应商: <span v-text="order.supplierName"></span></td>
                        <td>联系人: <span v-text="order.linkman"></span></td>
                        <td>联系电话: <span v-text="order.phone"></span></td>
                    </tr>
                </table>
            </el-col>
            <el-col :span="24" class="ui-table">
                <h3>订单信息</h3>
                <table >
                    <tr>
                        <td>客户名称: <span v-text="order.customerName"></span></td>
                        <td>采购人: <span v-text="order.purchaser"></span></td>
                        <td>下单时间: <span v-text="order.orderTime"></span></td>
                    </tr>
                    <tr>
                        <td>收货人: <span v-text="order.receiveUser"></span></td>
                        <td >收货电话: <span v-text="order.receivePhone"></span></td>
                        <td >收货地址: <span v-text="order.receiveAddr"></span></td>
                    </tr>
                    <tr v-if="order.status == 'trade_close' || order.status == 'trade_cancel'">
                        <td>取消时间: <span v-text="order.cancelTime"></span></td>
                        <td colspan="2">取消原因: <span v-text="order.reason"></span></td>
                    </tr>
                    <tr>
                        <td colspan="3">备注: <span v-text="order.cremark"></span></td>
                    </tr>
                   
                </table>
            </el-col>

            <el-col :span="24">
                <h3>订单明细</h3>
                <el-table :data="list" border >
                    <el-table-column prop="index" label="序号" width="70" align="center" >
                    </el-table-column>
                    <el-table-column prop="productName" label="产品名称" min-width="150" align="" >
                    </el-table-column>
                    <el-table-column prop="registNo" label="注册证号" min-width="150" align="" >
                    </el-table-column>
                    <el-table-column prop="factory" label="生产厂家" min-width="200"  >
                    </el-table-column>
                    <el-table-column prop="brand" label="品牌" width="130" align="center" >
                    </el-table-column>

                    <el-table-column   label="规格/单位" min-width="140"  >
                        <template scope="scope">
                            {{ scope.row.spec}} / {{scope.row.unit }}
                        </template>
                    </el-table-column>
                    <el-table-column   label="采购数/发货数/取消数" min-width="160" align="center" >
                     <template scope="scope">
                        <span v-text="scope.row.pnum"></span> / 
                        <span v-text="scope.row.dnum"></span> /
                        <span v-text="scope.row.cnum" :class="{'red': scope.row.cnum > 0}"></span>
                    </template>
                    </el-table-column>
                    <el-table-column  prop="price" label="单价" width="100" align="right" >
                    </el-table-column>
                    <el-table-column  prop="total" label="金额" width="140"  align="right" >
                    </el-table-column>
                </el-table>
                <p class="align-right allTotal">
                    合计金额 ：<span class="red" >￥ <b>{{order.totalMoney }}</b></span> 元
                </p>
            </el-col>

            <el-col :span="24" v-if="logisticList.length>0">
                <h3>配送订单</h3>
                <el-table :data="logisticList" border >
                    <el-table-column prop="index" label="序号" width="70" align="center" >
                    </el-table-column>
                    <el-table-column prop="deliveryNo" label="配送单号" min-width="150" align="" >
                    </el-table-column>
                    <el-table-column prop="deliveryTime" label="配送时间" min-width="150" align="" >
                    </el-table-column>
                    <el-table-column prop="lCompanyName" label="配送方式" min-width="120" align="center" >
                    </el-table-column>
                    <el-table-column  prop="status" label="状态" min-width="140" align="center" >
                    </el-table-column>
                    <el-table-column  prop="total" label="操作" width="100"  align="center" >
                        <template scope="scope">
                            <el-button type="link" size="mini" @click="detail(scope.row)">详情</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
    </section>
</template>
<script>
    import {parseMone} from '@/services/global.common.js';
    import Step from '@/components/Step'; 
    const URL = {
        DETAIL: 'scm.order.getOrder', // 订单编号查询
        NUMBER_LIST: 'scm.order.queryOrderDetail' // 配送单列表
    };
    export default {
        name: 'order-detail',
        data () {
            return {
                total: 0,
                pageSize: 20,
                pageIndex: 1,
                no: '',
                order: {},
                list: [],
                flow: [],
                logisticList: []
            };
        },
        methods: {
            // 获取列表
            getList () {
                let param = this.$route.params;
                this.Http.post(URL.DETAIL,
                    {
                        params: param
                    }).then((re) => {
                        this.order = re.data.order;
                        var statusStr = '';
                        switch (this.order.status) {
                        case 'apply_return':
                            statusStr = '申请退货';
                            break;
                        case 'confirm_return':
                            statusStr = '确认退货';
                            break;
                        case 'reject_return':
                            statusStr = '拒绝退货';
                            break;
                        case 'finish_return':
                            statusStr = '退货完成';
                            break;
                        default:
                            break;
                        }
                        this.order.statusx = statusStr;
                        this.order.totalMoney = parseMone(this.order.totalMoney);
                        this.list = re.data.rows.map((item, index) => {
                            item.index = index + 1 + (this.pageIndex - 1) * this.pageSize;
                            item.price = parseMone(item.price);
                            item.total = parseMone(item.total);
                            return item;
                        });
                    });
            },
            getDetail () {
                let param = this.$route.params;
                this.Http.post(URL.NUMBER_LIST,
                    {
                        params: {
                            orderNo: param.orderNo
                        }
                    }).then((re) => {
                        this.flow = re.data.flow;
                        this.logisticList = re.data.deliverys.map((item, index) => { 
                            item.index = index + 1 + (this.pageIndex - 1) * this.pageSize;
                            switch (item.status) {
                            case 'delivered':
                                item.status = '已发货';
                                break;
                            case 'received':
                                item.status = '已收货';
                                break;
                            case 'cancelled':
                                item.status = '已作废';
                                break;
                            default:
                                break;
                            } 
                            return item;
                        });
                    });
            },
            returns () {
                this.$router.back();
            },
            detail (row) {
                this.$router.push('/dashboard/logistic/detail/' + row.deliveryNo + '/' + row.passKey);
            }

        },
        created () {
            this.no = this.$route.params.orderNo;
        },
        mounted () {
            this.getList();
            this.getDetail();
        },
        components: {
            Step
        }
    };

</script>

<style lang="scss" scoped>
   
    h3{
        line-height:38px;
    }
    .align-right{
        text-align:right;
        font-size:16px;
    }
    .ui-table{
        td{
            width:33.3%;
        }
    }

    .allTotal{
        margin:7px 0;
        b{
            font-size: 20px;
            font-weight: bold;
        }
    }
    .header_top{
        height: 40px;
        line-height: 40px;
        border-bottom: 1px #e3eaee solid;
        h4{
            font-size:14px;
        }
    }
  
</style>
