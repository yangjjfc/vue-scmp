<template>
<section class="container_setion">
    <!--工具条-->
    <el-row>
        <el-col :span="24" class="toolbar">
            <el-form :inline="true">
                <el-form-item>
                    <el-select size="small" v-model="search.source" placeholder="请选择" @change="getList(1)" class="w100 ">
                        <el-option v-for="item in source" :label="item.text" :value="item.id" :key='item.id'>
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-select size="small" v-model="search.orderType" placeholder="请选择" @change="getList(1)" class="w100 ">
                        <el-option v-for="item in orderType" :label="item.text" :value="item.id" :key='item.id'>
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item>
                    <el-select size="small" v-model="search.status" placeholder="请选择" @change="getList(1)" class="w100 ">
                        <el-option v-for="item in status" :label="item.text" :value="item.id" :key='item.id'>
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item>
                    <datePicker :startTime.sync='search.startTime'  :endTime.sync='search.endTime' classx="w140"></datePicker>
                </el-form-item>

                <el-form-item>
                    <el-input placeholder="订单编号/SCM订单编号/供应商/客户名称" v-model.trim="search.keys" @keyup.native.enter="getList(1)" class="w300" size="small"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="getList(1)" size="small">查询</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button @click="reset" size="small">重置</el-button>
                </el-form-item>
            </el-form>
        </el-col>
        <el-col :span="24">
            <el-table :data="list" border>
                <el-table-column prop="index" label="序号" width="70" align="center">
                    <template scope="scope">
                        <div v-text ="scope.row.index" :class="{'partCancel': scope.row.partCancel == 0 }"></div>
                    </template>
                </el-table-column>
                <el-table-column prop="supplierName" label="供应商" min-width="150" align="">
                </el-table-column>
                <el-table-column prop="customerName" label="客户名称" min-width="150" align="">
                </el-table-column>
                <el-table-column prop="orderNo" label="订单编号" min-width="140" align="center">
                </el-table-column>

                <el-table-column prop="orderTime" label="下单时间" width="160" align="center">
                </el-table-column>

                <el-table-column prop="scmOrderNo" label="源订单编号" min-width="140" align="center">
                </el-table-column>

                <el-table-column  label="订单来源" min-width="140" align="center">
                    <template scope="scope">
                        <span v-text ="scope.row.sourceStr"> </span>
                    </template>
                </el-table-column>
                <el-table-column prop="dsName" label="订单类型" min-width="140" align="center">
                    <template scope="scope">
                        <span v-if ="scope.row.orderType == '1'"> 销售订单</span>
                        <span v-else> 借出订单</span>
                    </template>
                </el-table-column>

                <el-table-column label="订单状态" width="120" align="center">
                    <template scope="scope">
                        <div v-html ="scope.row.statusObj"> </div>
                    </template>
                </el-table-column>
                <el-table-column prop="atotal" label="操作" width="100">
                    <template scope="scope">
                        <el-button type="link" @click="detail(scope.row)" size="mini">详情</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-col>
        <el-col :span="24" class="toolbar" v-show="total>0">
            <pagination :total="total" :pageSize.sync="pageSize"  :pageIndex.sync="pageIndex" @change="getList"></pagination>
        </el-col>
        <el-col :span="24" v-if="showLogistic">
            <checkLogistic :showx.sync="showLogistic" :useMsg="userMsg"></checkLogistic>
        </el-col>
    </el-row>
</section>
</template>
<script>
import datePicker from '@/components/datePicker';
const URL = {
    PEOPLE_LIST: 'scm.order.queryOrderByPlatform' // 查询列表
};
export default {
    name: 'order',
    data () {
        return {
            showLogistic: false, // 显示配送
            search: {
                orderType: '-1',
                source: '-1',
                status: '-1',
                startTime: '',
                endTime: '',
                keys: ''
            },
            userMsg: null,
            source: [{
                id: '-1',
                text: '订单来源'
            }, {
                id: 'scm',
                text: '供应链'
            }, {
                id: 'yscm',
                text: '云供应链'
            }, {
                id: 'nc',
                text: '检验子公司'
            }],
            status: [{
                id: '-1',
                text: '订单状态'
            }, {
                id: 'trade_pending',
                text: '待确认'
            }, {
                id: 'trade_confirm',
                text: '已确认'
            }, {
                id: 'trade_partship',
                text: ' 部分发货'
            }, {
                id: 'trade_consign',
                text: '全部发货'
            }, {
                id: 'trade_finish',
                text: '订单完成'
            }, {
                id: 'trade_cancel',
                text: '订单取消'
            }, {
                id: 'trade_close',
                text: '订单关闭'
            }],
            orderType: [{
                id: '-1',
                text: '订单类型'
            }, {
                id: '1',
                text: '销售订单'
            }, {
                id: '2',
                text: '借出订单'
            }],
            total: 0,
            pageSize: 20,
            pageIndex: 1,
            list: []
        };
    },
    computed: {},
    methods: {
        // 获取列表
        getList (pageIndex = this.pageIndex, pageSize = this.pageSize) {
            this.Http.post(URL.PEOPLE_LIST,
                {
                    params: Object.assign({
                        pageIndex: pageIndex,
                        pageSize: pageSize
                    }, this.search)
                }).then((re) => {
                    this.pageIndex = re.data.pageIndex;
                    this.pageSize = re.data.pageSize;
                    this.total = re.data.total;
                    this.list = re.data.rows.map((item, index) => {
                        item.index = index + 1 + (this.pageIndex - 1) * this.pageSize;
                        switch (item.source) {
                        case 'scm':
                            item.sourceStr = '供应链';
                            break;
                        case 'yscm':
                            item.sourceStr = '云供应链';
                            break;
                        case 'nc':
                            item.sourceStr = '检验子公司';
                            break;
                        }
                        switch (item.status) {
                        case 'trade_pending':
                            item.statusObj = '<span class="blue">待确认</span>';
                            break;
                        case 'trade_confirm':
                            item.statusObj = '<span class="orange">已确认</span>';
                            break;
                        case 'trade_partship':
                            item.statusObj = '<span class="orange">部分发货</span>';
                            break;
                        case 'trade_consign':
                            item.statusObj = '<span class="green">全部发货</span>';
                            break;
                        case 'trade_finish':
                            item.statusObj = '<span class="green">订单完成</span>';
                            break;
                        case 'trade_cancel':
                            item.statusObj = '<span class="gray">订单取消</span>';
                            break;
                        case 'trade_close':
                            item.statusObj = '<span class="gray">订单关闭</span>';
                            break;
                        default:
                            break;
                        }
                        return item;
                    });
                });
        },
        // 物流跟踪
        checkLogistic (row) {
            this.showLogistic = true;
            this.userMsg = row;
        },
        // 查看
        detail (row) {
            this.$router.push('order/detail/' + row.orderNo + '/' + row.passKey);
        },
        // 重置
        reset () {
            this.pageIndex = 1;
            this.search = {
                orderType: '-1',
                source: '-1',
                status: '-1',
                startTime: '',
                endTime: '',
                keys: ''
            };
            this.getList(1);
        }

    },
    mounted () {
        this.getList();
    },
    components: {
        datePicker
    }
};

</script>
<style lang="scss">
.partCancel {
    background: url(../../assets/images/cancel.png) no-repeat 50% 50%;
    margin: 0 -15px;
}
</style>
