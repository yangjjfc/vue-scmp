<template>
<section class="container_setion">
    <!--工具条-->
    <el-row>
        <el-col :span="24" class="toolbar">
            <el-form :inline="true">
                <el-form-item>
                    <el-select size="small" v-model="search.source" placeholder="请选择" @change="getList()">
                        <el-option v-for="item in source" :label="item.text" :value="item.id" :key='item.id'>
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-select size="small" v-model="search.orderType" placeholder="请选择" @change="getList()">
                        <el-option v-for="item in orderType" :label="item.text" :value="item.id" :key='item.id'>
                        </el-option>
                    </el-select>
                </el-form-item>

                <el-form-item>
                    <el-select size="small" v-model="search.status" placeholder="请选择" @change="getList()">
                        <el-option v-for="item in status" :label="item.text" :value="item.id" :key='item.id'>
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>

                </el-form-item>
                <el-form-item>
                    <datePicker @changeTime_sta="changeTime_sta" @changeTime_end="changeTime_end" placeholder="请选择时间"></datePicker>
                </el-form-item>

                <el-form-item>
                    <el-input placeholder="订单编号/SCM订单编号/供应商/客户名称" v-model="search.keys" class="w300" size="small"></el-input>
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
        <el-col :span="24" class="toolbar">
            <pagination :total="total" :pageSize="pageSize" @change="getList"></pagination>
        </el-col>
        <el-col :span="24" v-if="showLogistic">
            <checkLogistic :showx.sync="showLogistic" :useMsg="userMsg"></checkLogistic>
        </el-col>
    </el-row>
</section>
</template>
<script src="./order.js">
</script>
<style lang="scss">
.partCancel {
    background: url(../../assets/images/cancel.png) no-repeat 50% 50%;
    margin: 0 -15px;
}
</style>
