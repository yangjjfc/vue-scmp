<template>
    <section class="container_setion">
        <!--工具条-->
        <el-row>
            <el-col :span="24" class="toolbar">
                <el-form :inline="true">
                    <el-form-item>
                        <el-select v-model="from.search_sal.value" placeholder="请选择" class="w100 " size="small" @change="getList(1)">
                            <el-option v-for="item in from.search_sal.options" :label="item.label" :value="item.value" :key="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                     <el-form-item>
                        <el-select v-model="from.search_bargain.value" placeholder="请选择" class="w100 " size="small" @change="getList(1)">
                            <el-option v-for="item in from.search_bargain.options" :label="item.label" :value="item.value" :key="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-input placeholder="供应商名称" v-model.trim="from.supplierName" @keyup.native.enter="getList(1)" class="w100" size="small"></el-input>
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
                    <el-table-column prop="supplierName" label="供应商名称" min-width="120" >
                    </el-table-column>
                    <el-table-column  label="产品编号/通用名称" min-width="150" >
                        <template scope="scope">
                            <span class="blue">{{scope.row.productNo}}</span>
                            <br/>
                            <span>{{scope.row.genericName}}</span>
                        </template>
                    </el-table-column>
                    <el-table-column  label="注册证号/产品名称" min-width="150" align="">
                        <template scope="scope">
                            <span class="blue">{{scope.row.registNo}}
                            </span>
                            <br/>
                            <span>{{scope.row.productName}}
                            </span>
                        </template> 
                    </el-table-column>
                     <el-table-column label="生产厂商/品牌" min-width="150" align="">
                        <template scope="scope">
                            <span class="blue">{{scope.row.factoryName}}
                            </span>
                            <br/>
                            <span>{{scope.row.brandName}}
                            </span>
                        </template> 
                    </el-table-column>
                    </el-table-column>
                    <el-table-column prop="addr" label="产地" width="220" >
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
                    <el-table-column prop="unit" label="销售合同" width="100" align="center">
                        <template scope="scope">
                            <div v-html="scope.row.saleTypex"></div>
                        </template>
                    </el-table-column>
                    <el-table-column prop="sysNo" label="ERP编号" width="100" align="center">
                    </el-table-column>
                    <el-table-column  label="操作" width="80" align="center">
                        <template scope="scope">
                             <el-button size="mini" type="primary"  @click="log(scope.row)" >日志</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
            <el-col :span="24" class="toolbar" v-show="total>0">
                <pagination :total="total" :pageSize.sync="pageSize" :pageIndex.sync="pageIndex" @change="getList"></pagination>
            </el-col>
             <el-col :span="24" v-if="showLog">
                <log :showx.sync="showLog" :logmsg="msgx" ></log>
            </el-col> 
        </el-row>
    </section>
</template>
<script>
import log from './mods/productLog';

const URL = {
    LIST: 'scm.platformCustomer.pageProduct', // 分页列表
    LOG: 'scm.platformCustomer.pageCustomerProductLog' // 日志
};
export default {
    name: 'sup-product',
    data () {
        return {
            showLog: false,
            msgx: null,
            total: 0,
            pageSize: 20,
            pageIndex: 1,
            from: {
                search_sal: {
                    options: [{
                        value: -1,
                        label: '正常销售'
                    },
                    {
                        value: -1,
                        label: '销售状态'
                    },
                    {
                        value: 0,
                        label: '解除销售'
                    }],
                    value: -1
                },
                search_bargain: {
                    options: [{
                        value: -1,
                        label: '销售合同'
                    },
                    {
                        value: 1,
                        label: '有合同'
                    },
                    {
                        value: 0,
                        label: '无合同'
                    }],
                    value: -1
                },
                supplierName: '',
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
                        supplierName: '',
                        status: this.from.search_sal.value,
                        saleType: this.from.search_bargain.value,
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
                            case 0:
                                item.statusx = '<span class="red">解除销售</span>';
                                break;
                            case 1:
                                item.statusx = '<span class="green">正常销售</span>';
                                break;
                            default:
                                break;
                            }
                            switch (parseInt(item.saleType)) {
                            case 0:
                                item.saleTypex = '<span class="red">无合同</span>';
                                break;
                            case 1:
                                item.saleTypex = '<span class="green">有合同</span>';
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
            this.from.search_pro.value = -1;
            this.getList(1);
        },
        // select change event 
        change () {
            this.getList(1);
        },
        back () {
            this.$router.back();
        },
        log (item) {
            this.showLog = true;
            this.msgx = {...item, customerNo: this.$route.query.no};
        }
    },
    mounted () {
        this.getList();
    },
    components: {
        log
    }
};

</script>

<style lang="scss">

</style>
