<template>
    <section class="container_setion">
        <!--工具条-->
        <el-row>
            <el-col :span="24" class="toolbar">
                <el-form :inline="true">
                    <el-form-item>
                        <el-select v-model="from.search_pro.value" placeholder="请选择" class="w100 " size="small" @change="getList(1)">
                            <el-option v-for="item in from.search_pro.options" :label="item.label" :value="item.value" :key="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-input placeholder="产品名称/注册证号" v-model.trim="from.keywords" @keyup.native.enter="getList(1)" class="w200" size="small"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="getList(1)" size="small">筛选</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="reset" size="small">重置</el-button>
                    </el-form-item>
                    <el-form-item class="right">
                        <el-button type="primary" size="small" @click="back">返回</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col :span="24">
                <el-table :data="tableDate" border>
                    <el-table-column prop="index" label="序号" width="70" align="center">
                    </el-table-column>
                    <el-table-column  label="产品编号/通用名称" min-width="150" >
                        <template scope="scope">
                            <span class="blue">{{scope.row.productNo}}</span>
                            <br/>
                            <span>{{scope.row.genericName}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column label="注册证号/产品名称" min-width="150" align="">
                        <template scope="scope">
                            <span class="blue">{{scope.row.registNo}}
                            </span>
                            <br/>
                            <span>{{scope.row.productName}}
                            </span>
                        </template> 
                    </el-table-column>
                    </el-table-column>
                    <el-table-column prop="factoryName" label="生产厂商" width="220" >
                    </el-table-column>
                    <el-table-column prop="brandName" label="品牌" width="110" align="center">
                    </el-table-column>
                    <el-table-column prop="addr" label="产地" width="150" align="center">
                    </el-table-column>
                    <el-table-column prop="spec" label="规格" width="80" align="center">
                    </el-table-column>
                    <el-table-column prop="unit" label="单位" width="80" align="center">
                    </el-table-column>
                    <el-table-column label="产品状态" width="100" align="center">
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
    LIST: 'scm.platformSupplier.pageProduct' // 分页列表
};
export default {
    name: 'sup-product',
    data () {
        return {
            total: 0,
            pageSize: 20,
            pageIndex: 1,
            from: {
                search_pro: {
                    options: [{
                        value: -1,
                        label: '产品状态'
                    },
                    {
                        value: 1,
                        label: '已创建'
                    },
                    {
                        value: 2,
                        label: '待审核'
                    },
                    {
                        value: 3,
                        label: '审核通过'
                    },
                    {
                        value: 4,
                        label: '审核不通过'
                    },
                    {
                        value: 5,
                        label: '已上架'
                    },
                    {
                        value: 6,
                        label: '已下架'
                    },
                    {
                        value: 7,
                        label: '已删除'
                    },
                    {
                        value: 8,
                        label: '强制下架'
                    }],
                    value: -1
                },
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
                        supplierNo: this.$route.query.no,
                        status: this.from.search_pro.value,
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
                                item.statusx = '<span class="blue">已创建</span>';
                                break;
                            case 2:
                                item.statusx = '<span class="blue">待审核</span>';
                                break;
                            case 3:
                                item.statusx = '<span class="green">审核通过</span>';
                                break;
                            case 4:
                                item.statusx = '<span class="red">审核不通过</span>';
                                break;
                            case 5:
                                item.statusx = '<span class="green">已上架</span>';
                                break;
                            case 6:
                                item.statusx = '<span class="red">已下架</span>';
                                break;
                            case 7:
                                item.statusx = '<span class="gray">已删除</span>';
                                break;
                            case 8:
                                item.statusx = '<span class="red">强制下架</span>';
                                break;
                            default:
                                break;
                            }
                            return item;
                        });
                        console.log(this.tableDate);
                    } else {
                        this.tableDate = [];
                    }
                });
        },
        // 重置
        reset () {
            this.pageIndex = 1;
            this.from.keywords = '';
            this.from.search_pro.value = -1;
            this.getList(1);
        },
        // select change event 
        change () {
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
