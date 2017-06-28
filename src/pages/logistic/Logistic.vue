<template>
    <section class="container_setion">
        <!--工具条-->
        <el-row>
            <el-col :span="24" class="toolbar">
                <el-form :inline="true">
                    <el-form-item>
                        <el-select size="small" v-model="search.deliveryType" placeholder="请选择" @change="getList()">
                            <el-option
                                    v-for="item in deliveryType"
                                    :label="item.text"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-select size="small" v-model="search.status" placeholder="请选择" @change="getList()">
                            <el-option
                                    v-for="item in status"
                                    :label="item.text"
                                    :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>

                    </el-form-item>
                    <el-form-item>
                        <datePicker @changeTime_sta="changeTime_sta" @changeTime_end="changeTime_end" placeholder="请选择时间"></datePicker>
                    </el-form-item>

                    <el-form-item>
                        <el-input placeholder="配送单号/订单编号/出库单号/供应商/客户名称" v-model="search.keys" class="w300" size="small"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="getList(1)"  size="small">查询</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="reset"  size="small">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col :span="24">
                <el-table :data="list" border >
                    <el-table-column prop="index" label="序号" width="70" align="center" >
                    </el-table-column>
                    <el-table-column prop="supplierName" label="供应商" min-width="150" align="" >
                    </el-table-column>
                    <el-table-column prop="customerName" label="客户名称" min-width="150" align="" >
                    </el-table-column>
                    <el-table-column prop="deliveryNo" label="配送单号" min-width="120" align="center" >
                    </el-table-column>
                    <el-table-column prop="outStorageNo" label="出库单号" width="160" align="center" >
                    </el-table-column>

                    <el-table-column  prop="deliveryTime" label="配送时间" min-width="140" align="center" >
                    </el-table-column>
                    <el-table-column  prop="orderNo" label="订单编号" min-width="140" align="center" >
                    </el-table-column>
                    <el-table-column  prop="dsName" label="发货商" min-width="140" align="center" >
                    </el-table-column>
                    <el-table-column  label="状态" width="120"  align="center" >
                        <template scope="scope">
                            <span class=".Blue" v-if="scope.row.status == 'delivered' ">已发货</span>    
                            <span class="Success" v-if="scope.row.status == 'received' ">已收货</span>    
                            <span class="Silver" v-if="scope.row.status == 'cancelled' ">已作废</span>    
                        </template>
                    </el-table-column>
                    <el-table-column  prop="atotal" label="操作" width="180">
                    <template scope="scope">
                        <el-button :disabled="true" :plain="true" size="small" v-if="scope.row.mode == 'N' ">自行配送</el-button>    
                        <el-button v-if="scope.row.mode === 'Y' " type="primary" @click="checkLogistic(scope.row)"  size="small">物流跟踪</el-button>
                        <el-button type="link" @click="detail(scope.row)"  size="small">详情</el-button>
                    </template>
                    </el-table-column>
                </el-table>
            </el-col>
            <el-col :span="24" class="toolbar">
                <pagination :total="total" :pageSize="pageSize"  @change="getList"></pagination>
            </el-col>
            <el-col :span="24" v-if="showLogistic">
                <checkLogistic :showx.sync="showLogistic" :useMsg="userMsg" ></checkLogistic>
            </el-col>
        </el-row>
    </section>
</template>
<script>
    import pagination from '@/components/pagination';
    import datePicker from '@/components/datePicker';
    import checkLogistic from './mods/CheckLogistic';
    const URL = {
        PEOPLE_LIST: 'scm.orderDelivery.queryDeliversByPlatform' // 查询列表
    };
    export default {
        name: 'Return',
        data () {
            return {
                showLogistic: false, // 显示配送
                search: {
                    deliveryType: '-1',  
                    status: '-1',  
                    startTime: '',
                    endTime: '',
                    keys: ''
                },
                userMsg: null,
                deliveryType: [{
                    id: '-1',
                    text: '配送类型' 
                }, {
                    id: '1', 
                    text: '供应商发货'
                }, {
                    id: '2', 
                    text: '代理发货'
                }],
                status: [{
                    id: '-1',
                    text: '配送状态'
                }, {
                    id: 'delivered', 
                    text: '已发货'
                }, { 
                    id: 'received',
                    text: '已收货'
                }, { 
                    id: 'cancelled', 
                    text: '已作废'
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
                            return item;
                        });
                    });
            },
            changeTime_sta (value) {
                this.search.startTime = value;
            },
            changeTime_end (value) {
                this.search.endTime = value;
            },
            // 物流跟踪
            checkLogistic (row) {
                this.showLogistic = true;
                this.userMsg = row;
            },
            // 查看
            detail (row) {
                this.$router.push('/logistic/detail/' + row.deliveryNo + '/' + row.passKey);
            },
            // 重置
            reset () {
                this.pageIndex = 1;
                this.search = {
                    deliveryType: '-1',  
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
            datePicker,
            checkLogistic,
            pagination
        }
    };

</script>

<style lang="scss">

</style>
