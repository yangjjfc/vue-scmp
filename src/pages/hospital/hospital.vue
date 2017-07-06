<template>
    <section class="container_setion">
        <!--工具条-->
        <el-row>
            <el-col :span="24" class="toolbar">
                <el-form :inline="true">
                    <el-form-item >
                        <el-select v-model="from.search_scm.value" placeholder="请选择" class="w100 "  size="small" @change="change">
                            <el-option v-for="item in from.search_scm.options" :label="item.label" :value="item.value" :key="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item >
                        <el-select v-model="from.search_State.value" placeholder="请选择" class="w100 "  size="small" @change="change">
                            <el-option v-for="item in from.search_State.options" :label="item.label" :value="item.value" :key="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item >
                        <el-select v-model="from.search_type.value" placeholder="请选择" class="w100 "  size="small" @change="change">
                            <el-option v-for="item in from.search_type.options" :label="item.label" :value="item.value" :key="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                     <el-form-item>
                        <el-input placeholder="客户名称/联系人" v-model="from.keywords" @keyup.native.enter="getList(1)" class="w300" size="small"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="getList(1)"  size="small">筛选</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="reset"  size="small">重置</el-button>
                    </el-form-item>
                    <el-form-item class="right">
                        <el-button type="primary"  size="small" @click="add">添加客户</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col :span="24">
                <el-table :data="tableDate" border >
                    <el-table-column prop="index" label="序号" width="70" align="center" >
                    </el-table-column>
                     <el-table-column prop="customerNo" label="客户编号" min-width="140" align="" >
                    </el-table-column>
                     <el-table-column prop="customerName" label="客户名称" min-width="150"  >
                    </el-table-column>
                     <el-table-column  label="客户类型" min-width="100" align="center" >
                         <template scope="scope">
                              <span v-html="scope.row.enterpriseType"></span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="customerLinkman" label="联系人" min-width="100" align="center" >
                    </el-table-column>
                     <el-table-column prop="customerPhone" label="联系电话" width="120" align="center" >
                    </el-table-column>
                     <el-table-column   prop="supplierNum" label="供应商数量	" width="100" align="center" >
                    </el-table-column>
                     <el-table-column   prop="productNum" label="产品数量" width="100" align="center" >
                    </el-table-column>
                     <el-table-column prop="erps" label="SCM" width="80" align="center" >
                         <template scope="scope">
                              <span v-html="scope.row.scm"></span>
                        </template>
                    </el-table-column>
                     <el-table-column  label="审核状态" width="100" align="center" >
                         <template scope="scope">
                              <span v-html="scope.row.statusx"></span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作"  width="300">
                        <template scope="scope">
                            <el-button size="mini" type="primary"  @click="detailSuppiler(scope.row.customerNo,'detail')">详情</el-button>
                            <el-button size="mini" type="primary"  @click="detailLog(scope.row.customerNo)" >日志</el-button>
                            <el-button size="mini" type="warning"  @click="detailSuppiler(scope.row.customerNo,'audit')" v-if="scope.row.status =='2'">审核</el-button>
                            <el-button size="mini" type="warning"  @click="enabled(scope.row)" v-if="scope.row.scm =='0' && scope.row.status ==3">开通scm</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
            <el-col :span="24" class="toolbar">
                <pagination :total="total" :pageSize.sync="pageSize" :pageIndex.sync="pageIndex" @change="getList"></pagination>
            </el-col>
            <el-col :span="24" v-if="showDetail">
                <detail :showx.sync="showDetail" :detailUser="msgx" :title="detailTitle"  @refresh="getList"></detail>
            </el-col>  
             <el-col :span="24" v-if="showLog">
                <log :showx.sync="showLog" :logmsg="msgx" ></log>
            </el-col> 
            <el-col :span="24" v-if="showAdd">
                <add-supplier :showx.sync="showAdd" :transMsg="msgx"  @refresh="getList"></add-supplier>
            </el-col>     
        </el-row>
    </section>
</template>
<script>
import pagination from '@/components/pagination';
import detail from './mods/detail';
import log from './mods/log';
import addSupplier from './mods/addSupplier';
const URL = {
    LIST: 'scm.platformCustomer.pageCustomer', // 分页列表
    DETAIL: 'scm.platformSupplier.findEnterprise', // 详情-
    ENABLE: 'scm.platformCustomer.addRegisterScmAuth' // 开通erp-
};
export default {
    name: 'hospital',
    data () {
        return {
            showDetail: false, // 显示详情/审核
            msgx: {}, // 弹框数据
            detailTitle: '', // 显示详情/审核标题 no
            showLog: false, // 显示日志
            showAdd: false, // 添加供应商
            total: 0,
            pageSize: 20,
            pageIndex: 1,
            from: {
                search_scm: {
                    options: [{
                        value: -1,
                        label: 'SCM 状态'
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
                search_type: {
                    options: [{
                        value: -1,
                        label: '客户类型'
                    },
                    {
                        value: 20,
                        label: '合作共建'
                    },
                    {
                        value: 21,
                        label: '非合作共建'
                    },
                    {
                        value: 22,
                        label: '检验子公司'
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
            console.log(1);
            this.Http.post(URL.LIST,
                {
                    params: {
                        scmEnterpriseType: this.from.search_type.value,
                        status: this.from.search_State.value,
                        scm: this.from.search_scm.value,
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
                            switch (parseInt(item.scmEnterpriseType)) {
                            case 20:
                                item.enterpriseType = '<span class="blue">合作共建</span>';
                                break;
                            case 21:
                                item.enterpriseType = '<span class="blue">非合作共建</span>';
                                break;
                            case 22:
                                item.enterpriseType = '<span class="blue">检验子公司</span>';
                                break;
                            default:
                                break;
                            } 
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
                            item.scm = (item.scm === '1' ? '<span class="green">已启用</span>' : '<span class="gray">未启用</span>');
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
            this.from.search_scm.value = -1;
            this.from.search_type.value = -1;
            this.from.search_State.value = -1;
            this.getList(1);
        },
        // select change event
        change () {
            this.getList(1);
        },
        // 详情
        detailSuppiler (no, type) {
            this.detailTitle = (type === 'detail' ? '企业详情' : '审核'); 
            this.msgx.no = no;
            this.msgx.type = type;
            this.showDetail = true;
        },
        // 日志
        detailLog (no) {
            this.msgx.no = no;
            this.showLog = true;
        },
       
        // 添加供应商
        add () {
            this.showAdd = true;
        },
        // 启用erp
        enabled (msg) {
            this.$confirm('确定要开通SCM?', '开通SCM', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.Http.post(URL.ENABLE, {
                    enterpriseNo: msg.supplierNo
                }).then((re) => {
                    this.getList();
                    this.$notify({
                        title: '成功',
                        message: '开通成功',
                        type: 'success'
                    });  
                });  
            }).catch(function () {});
        }        

    },
    mounted () {
        this.getList();
    },
    components: {
        pagination,
        detail,
        log,
        addSupplier
    }
};

</script>

<style lang="scss">

</style>
