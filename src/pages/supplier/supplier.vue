<template>
    <section class="container_setion">
        <!--工具条-->
        <el-row>
            <el-col :span="24" class="toolbar">
                <el-form :inline="true">
                    <el-form-item >
                        <el-select v-model="from.search_erp.value" placeholder="请选择" class="w100 "  size="small" @change="change">
                            <el-option v-for="item in from.search_erp.options" :label="item.label" :value="item.value" :key="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item >
                        <el-select v-model="from.search_State.value" placeholder="请选择" class="w100 "  size="small" @change="change">
                            <el-option v-for="item in from.search_State.options" :label="item.label" :value="item.value" :key="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                     <el-form-item>
                        <el-input placeholder="供应商名称/联系人" v-model="from.keywords" class="w300" size="small"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="getList()"  size="small">筛选</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="reset"  size="small">重置</el-button>
                    </el-form-item>
                    <el-form-item class="right">
                        <el-button type="primary"  size="small">添加供应商</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col :span="24">
                <el-table :data="tableDate" border >
                    <el-table-column prop="index" label="序号" width="70" align="center" >
                    </el-table-column>
                     <el-table-column prop="supplierNo" label="供应商编号" min-width="110" align="center" >
                    </el-table-column>
                     <el-table-column prop="supplierName" label="供应商名称" min-width="150"  >
                    </el-table-column>
                     <el-table-column prop="supplierLinkman" label="联系人" min-width="100" align="center" >
                    </el-table-column>
                     <el-table-column prop="supplierPhone" label="联系电话" width="120" align="center" >
                    </el-table-column>
                     <el-table-column   prop="customerNum" label="客户数量" width="100" align="center" >
                    </el-table-column>
                     <el-table-column   prop="productNum" label="产品数量" width="100" align="center" >
                    </el-table-column>
                     <el-table-column prop="erps" label="ERP" width="80" align="center" >
                         <template scope="scope">
                              <span v-html="scope.row.erps"></span>
                        </template>
                    </el-table-column>
                     <el-table-column  label="审核状态" width="100" align="center" >
                         <template scope="scope">
                              <span v-html="scope.row.statusx"></span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作"  width="300">
                        <template scope="scope">
                            <el-button size="mini" type="primary"  @click="detailSuppiler(scope.row.supplierNo)">详情</el-button>
                            <el-button size="mini" type="primary"  >日志</el-button>
                            <el-button size="mini" type="info"  >时间设置</el-button>
                            <el-button size="mini" type="warning"  v-if="scope.row.erp =='0' && scope.row.erp ==3">开通erp</el-button>
                            <el-button size="mini" type="warning"  v-if="scope.row.status =='2'">审核</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
            <el-col :span="24" class="toolbar">
                <pagination :total="total" :pageSize="pageSize" :pageIndex="pageIndex" @change="getList"></pagination>
            </el-col>
            <el-col :span="24" v-if="showDetail">
                <detail :showx.sync="showDetail" :detailUser="detailUser" :title="detailTitle"  @refresh="getList"></detail>
            </el-col>  
        </el-row>
    </section>
</template>
<script>
import pagination from '@/components/pagination';
import detail from './mods/detail';
const URL = {
    LIST: 'scm.platformSupplier.pageSupplier', // 分页列表
    DETAIL: 'scm.platformSupplier.findEnterprise' // 详情-
};
export default {
    name: 'supplier',
    data () {
        return {
            showDetail: false, // 显示详情/审核
            detailUser: '', // 显示详情/审核 no
            detailTitle: '', // 显示详情/审核 no
            total: 0,
            pageSize: 20,
            pageIndex: 1,
            from: {
                search_erp: {
                    options: [{
                        value: -1,
                        label: 'ERP状态'
                    },
                    {
                        value: 1,
                        label: '已启用'
                    },
                    {
                        value: 0,
                        label: '未启用'
                    }],
                    value: -1
                },
                search_State: {
                    options: [{
                        value: -1,
                        label: '审核状态'
                    },
                    {
                        value: 2,
                        label: '待审核'
                    },
                    {
                        value: 4,
                        label: '审核不通过'
                    },
                    {
                        value: 3,
                        label: '审核通过'
                    }],
                    value: -1
                },
                keywords: ''
            },
            tableDate: [] // 列表数据
        };
    },
    computed: {
    },
    methods: {
        // 获取列表
        getList (pageIndex = this.pageIndex, pageSize = this.pageSize) {
            this.Http.post(URL.LIST,
                {
                    params: {
                        status: this.from.search_State.value,
                        erp: this.from.search_erp.value,
                        keywords: this.from.keywords,
                        pageIndex: pageIndex,
                        pageSize: pageSize
                    }
                }).then((re) => {
                    this.pageIndex = re.data.pageIndex;
                    this.pageSize = re.data.pageSize;
                    this.total = re.data.total;
                    if (re.data.rows.length > 0) {
                        this.tableDate = re.data.rows.map((item, index) => {
                            item.index = index + 1 + (pageIndex - 1) * pageSize;
                            switch (item.status) {
                            case '3':
                                item.statusx = '<span class="green">审核通过</span>';
                                break;
                            case '2':
                                item.statusx = '<span class="orange">待审核</span>';
                                break;
                            case '4':
                                item.statusx = '<span class="red">审核不通过</span>';
                                break;
                            default:
                                break;
                            }
                            item.erps = (item.erp === '1' ? '<span class="green">已启用</span>' : '<span class="gray">未启用</span>');
                            return item;
                        });
                    } else {
                        this.tableDate = [];
                    }
                });
        },
        // 重置
        reset () {
            this.pageIndex = 1;
            this.from.keywords = '';
            this.from.search_State.value = -1;
            this.from.search_erp.value = -1;
            this.getList(1);
        },
        // select change event
        change () {
            this.getList();
        },
        // 详情
        detailSuppiler (no) {
            this.detailTitle = '企业详情';
            this.detailUser = no;
            this.showDetail = true;
        }

    },
    mounted () {
        this.getList();
    },
    components: {
        pagination,
        detail
    }
};

</script>

<style lang="scss">

</style>
