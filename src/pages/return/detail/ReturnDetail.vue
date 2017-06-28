<template>
    <section class="container_setion">
        <!--工具条-->
        <el-row>
            <el-col :span="24" class="toolbar">
                <el-form :inline="true">
                    <el-form-item>
                    <h4>退货单号：<span v-text="no"></span></h4>
                    </el-form-item>
                    <el-form-item class="pull-right">
                        <el-button @click="returns"  size="small">返回</el-button>
                    </el-form-item>
                </el-form>
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
                <h3>退货信息</h3>
                <table >
                    <tr>
                        <td>客户名称: <span v-text="order.purchaser"></span></td>
                        <td>退货时间: <span v-text="order.orderTime"></span></td>
                        <td>订单状态: <span v-text="order.status"></span></td>
                    </tr>
                    <tr>
                        <td>订单编号: <span v-text="order.orderNo"></span></td>
                        <td colspan="2">退货原因: <span v-text="order.reason"></span></td>
                    </tr>
                    <tr>
                        <td colspan="3">退货备注: <span v-text="order.remark"></span></td>
                    </tr>
                    <tr v-if="order.status == 'reject_return' ">
                        <td colspan="3">拒绝退货原因: <span v-text="order.rejectReason"></span></td>
                    </tr>
                </table>
            </el-col>

            <el-col :span="24">
                <el-table :data="list" border >
                    <el-table-column prop="index" label="序号" width="70" align="center" >
                    </el-table-column>
                    <el-table-column prop="productName" label="产品名称" min-width="150" align="" >
                    </el-table-column>
                    <el-table-column prop="registNo" label="注册证号" min-width="150" align="" >
                    </el-table-column>
                    <el-table-column prop="factory" label="生产厂家" min-width="120" align="center" >
                    </el-table-column>
                    <el-table-column prop="brand" label="品牌" width="160" align="center" >
                    </el-table-column>

                    <el-table-column   label="规格/单位" min-width="140" align="center" >
                        <template scope="scope">
                            {{ scope.row.spec}} / {{scope.row.unit }}
                        </template>
                    </el-table-column>
                    <el-table-column  prop="rnum" label="退货数" min-width="140" align="center" >
                    </el-table-column>
                    <el-table-column  prop="price" label="单价" min-width="140" align="right" >
                    </el-table-column>
                    <el-table-column  prop="total" label="金额" min-width="140"  align="right" >
                    </el-table-column>
                </el-table>
            </el-col>
        </el-row>
    </section>
</template>
<script>
    import pagination from '@/components/pagination';
    import {parseMone} from '@/services/global.common.js'; 
    const URL = {
        PEOPLE_LIST: 'scm.orderReturn.getReturnOrder' // 查询列表
    };
    export default {
        name: 'Return',
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
                        this.order.status = statusStr;

                        this.list = re.data.rows.map((item, index) => {
                            item.index = index + 1 + (this.pageIndex - 1) * this.pageSize;
                            item.price = parseMone(item.price);
                            item.total = parseMone(parseFloat(item.price) * parseFloat(item.rnum) || 0);
                            return item;
                        });
                    });
            },
            
            // 查看
            returns () {
                this.$router.push('/return');
            },
            // 重置
            reset () {
                this.pageIndex = 1;
                this.search = {
                    source: '-1',  
                    status: '-1',  
                    startTime: '',
                    endTime: '',
                    keys: ''
                };
                this.getList(1);
            }

        },
        created () {
            this.no = this.$route.params.returnOrderNo;
        },
        mounted () {
            this.getList();
        },
        components: {
            pagination
        }
    };

</script>

<style lang="scss">
   
    h3{
        line-height:30px;
    }
    .ui-table{
        td{
            width:33.3%;
        }
    }
</style>
