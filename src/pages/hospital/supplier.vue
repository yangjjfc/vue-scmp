<template>
    <section class="container_setion">
        <!--工具条-->
        <el-row>
            <el-col :span="24" class="toolbar">
                <el-form :inline="true" @submit.native.prevent="">
                     <el-form-item>
                        <el-input placeholder="供应商名称/联系人" v-model.trim="from.keywords" @keyup.native.enter="getList(1)" class="w200" size="small"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="getList(1)"  size="small">筛选</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="reset"  size="small">重置</el-button>
                    </el-form-item>
                    <el-form-item class="right">
                        <el-button type="primary"  size="small" @click="back">返回</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col :span="24">
                <el-table :data="tableDate" border >
                    <el-table-column prop="index" label="序号" width="70" align="center" >
                    </el-table-column>
                     <el-table-column prop="supplierNo" label="供应商编号" width="130" align="center" >
                    </el-table-column>
                     <el-table-column prop="supplierName" label="供应商名称" min-width="130" align="" >
                    </el-table-column>
                     <el-table-column prop="supplierLinkman" label="联系人" width="100" align="center" >
                    </el-table-column>
                     <el-table-column prop="supplierPhone" label="联系电话" width="120" align="center" >
                    </el-table-column>
                     <el-table-column  prop="applyTime" label="申请时间" width="150" align="center" >
                    </el-table-column>
                    <el-table-column label="客户状态"  width="100" align="center">
                        <template scope="scope">
                            <div v-html="scope.row.statusx"></div>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
            <el-col :span="24" class="toolbar">
                <pagination :total="total" :pageSize.sync="pageSize" :pageIndex.sync="pageIndex" @change="getList"></pagination>
            </el-col>
        </el-row>
    </section>
</template>
<script>
const URL = {
    LIST: 'scm.platformCustomer.pageSupplier' // 分页列表
};
export default {
    name: 'hos-supplier',
    data () {
        return {
            total: 0,
            pageSize: 20,
            pageIndex: 1,
            from: {
                keywords: ''
            },
            tableDate: [] // 列表数据
        };
    },
    methods: {
        // 获取列表
        getList (pageIndex = this.pageIndex, pageSize = this.pageSize) {
            this.Http.post(URL.LIST,
                {
                    params: {
                        customerNo: this.$route.query.no,
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
                            switch (parseInt(item.status)) {
                            case 1:
                                item.statusx = '<span class="green">通过</span>';
                                break;
                            case 2:
                                item.statusx = '<span class="blue">客户申请</span>';
                                break;
                            case 3:
                                item.statusx = '<span class="blue">供应商申请</span>';
                                break;
                            case 4:
                                item.statusx = '<span class="red">客户拒绝</span>';
                                break;
                            case 5:
                                item.statusx = '<span class="red">供应商拒绝</span>';
                                break;
                            case 6:
                                item.statusx = '<span class="red">客户解除</span>';
                                break;
                            case 7:
                                item.statusx = '<span class="red">供应商解除</span>';
                                break;
                            case 8:
                                item.statusx = '<span class="red">双方删除</span>';
                                break;
                            default:
                                break; 
                            }
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
            this.getList(1);
        },
        back () {
            this.$router.back();
        }
    },
    mounted () {
        this.getList();
    },
    components: {
    }
};

</script>

<style lang="scss">

</style>
