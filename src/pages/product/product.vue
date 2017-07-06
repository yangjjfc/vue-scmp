<template>
    <section class="container_setion">
        <!--工具条-->
        <el-row>
            <el-col :span="24" class="toolbar">
                <el-form :inline="true">
                    <el-form-item >
                        <el-select v-model="from.search_date.value" placeholder="请选择" class="w100 "  size="small" @change="change">
                            <el-option v-for="item in from.search_date.options" :label="item.label" :value="item.value" :key="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item >
                        <el-select v-model="from.search_State.value" placeholder="请选择" class="w100 "  size="small" @change="change">
                            <el-option v-for="item in from.search_State.options" :label="item.label" :value="item.value" :key="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item >
                        <el-select v-model="from.search_product.value" placeholder="请选择" class="w100 "  size="small" @change="change">
                            <el-option v-for="item in from.search_product.options" :label="item.label" :value="item.value" :key="item.value"></el-option>
                        </el-select>
                    </el-form-item>
                     <el-form-item>
                        <el-input placeholder="供应商名称/产品编号/产品名称/注册证号" v-model="from.keywords" class="w300" size="small"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="getList()"  size="small">筛选</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="reset"  size="small">重置</el-button>
                    </el-form-item>
                    <el-form-item class="right">
                        <el-button type="primary"  size="small" >导入模板管理</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col :span="24">
                <el-table :data="tableDate" border >
                    <el-table-column prop="index" label="序号" width="70" align="center" >
                    </el-table-column>
                     <el-table-column prop="supplierName" label="供应商名称" min-width="130" align="" >
                    </el-table-column>
                     <el-table-column prop="productNo" label="产品编号" width="130" align="center" >
                    </el-table-column>
                     <el-table-column  label="产品名称/注册证号"   min-width="200">
                        <template scope="scope">
                             <a :href="scope.row.urls" v-boxer="scope.row.urls" v-if="scope.row.registImg" class="right"><img :src="picture" /></a>
                              <span v-html="scope.row.productName"></span>
                             <br/>
                              <span v-html="scope.row.registNo"></span><br/>
                              <div>有效期至 : <span v-if="scope.row.longTerm==1">长期</span> <span v-else-if="scope.row.endTime">{{scope.row.endTime}}</span> <span v-else>无</span> </div>
                        </template>
                    </el-table-column>
                     <el-table-column prop="supplierPhone" label="通用名称/生产厂商/品牌" min-width="250"  >
                        <template scope="scope">
                              <span v-html="scope.row.genericName"></span><br/>
                              <span v-html="scope.row.factoryName" class="green"></span><br/>
                              <span v-html="scope.row.brandName"></span>
                        </template>
                    </el-table-column>
                     <el-table-column   prop="spec" label="规格" width="100" align="center" >
                    </el-table-column>
                     <el-table-column   prop="unit" label="单位" width="80" align="center" >
                    </el-table-column>
                     <el-table-column  label="产品状态" width="100" align="center" >
                         <template scope="scope">
                              <span v-html="scope.row.statusx"></span>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作"  width="300">
                        <template scope="scope">
                            <el-button size="mini" type="primary"  @click="detailSuppiler(scope.row.productNo,'detail')">详情</el-button>
                            <el-button size="mini" type="primary"  @click="detailLog(scope.row.productNo)" >日志</el-button>
                            <el-button size="mini" type="warning"  @click="detailSuppiler(scope.row.productNo,'audit')" v-if="scope.row.status =='2' && scope.row.certType !=1">审核</el-button>
                            <el-button size="mini" type="warning"  @click="handleDown(scope.row.productNo)" v-if="scope.row.status =='5'">强制下架</el-button>
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
            <el-col :span="24" v-if="showDown">
                <down :showx.sync="showDown" :transMsg="msgx" @refresh="getList"></down>
            </el-col> 
             <el-col :span="24" v-if="showLog">
                <log :showx.sync="showLog" :logmsg="msgx" ></log>
            </el-col> 
        </el-row>
    </section>
</template>
<script>
import '@/assets/directive/vueDirective.js'; // jq boxer指令
import CONFIG from '@/config/app.config'; // 配置
import pagination from '@/components/pagination';
import detail from './mods/detail';
import picture from '@/assets/images/zhu.png'; // daf
import log from './mods/log';
import down from './mods/down';
const URL = {
    LIST: 'scm.product.queryProductListPlatform', // 分页列表
    DETAIL: 'scm.platformSupplier.findEnterprise', // 详情-
    ENABLE: 'scm.platformSupplier.addERPAuth' // 开通erp-
};
export default {
    name: 'supplier',
    data () {
        return {
            showDetail: false, // 显示详情/审核
            msgx: {}, // 弹框数据
            detailTitle: '', // 显示详情/审核标题 no
            showLog: false, // 显示日志
            showDown: false, // 显示下架
            total: 0,
            pageSize: 20,
            pageIndex: 1,
            picture: picture, // 图片
            from: {
                search_date: {
                    options: [{
                        value: -1,
                        label: '筛选过期'
                    },
                    {
                        value: 0,
                        label: '已过期'
                    },
                    {
                        value: 1,
                        label: '一个月内过期'
                    },
                    {
                        value: 3,
                        label: '三个月内过期'
                    }],
                    value: -1
                },
                search_product: {
                    options: [{
                        value: -1,
                        label: '产品状态'
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
                search_State: {
                    options: [{   
                        value: -1,
                        label: '证件类型'
                    },
                    { 
                        value: 1,
                        label: '产品证件'
                    },
                    {
                        value: 0,
                        label: '无需证件'
                    },
                    {
                        value: 2,
                        label: '科研试剂'
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
                        status: this.from.search_product.value,
                        certType: this.from.search_State.value,
                        pastType: this.from.search_date.value,
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
                            item.statusx = this.getStatusText(item.status);
                            if (item.registImg) {
                                item.urls = CONFIG.IMAGE_DOWNLOAD + item.registImg;
                            }
                            return item;
                        });
                    } else {
                        this.tableDate = [];
                    }
                });
        },
        getStatusText (status) { 
            let text = '';   
            switch (parseInt(status)) {  
            case 1:
                text = '<span class="blue">创建</span>';  
                break;
            case 2:
                text = '<span class="blue">待审核</span>';
                break;
            case 3:
                text = '<span class="green">审核通过</span>';
                break;
            case 4: 
                text = '<span class="red">审核不通过</span>';
                break;
            case 5:
                text = '<span class="green">已上架</span>';
                break;
            case 6:
                text = '<span class="red">已下架</span>';
                break;
            case 7:
                text = '<span class="gray">已删除</span>';
                break;
            case 8:
                text = '<span class="red">强制下架</span>'; 
                break;   
            default:
                break; 
            }
            return text;
        },  
        // 重置
        reset () {
            this.pageIndex = 1;
            this.from.keywords = '';
            this.from.search_date.value = -1;
            this.from.search_product.value = -1;
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
        // 时间设置
        handleDown (no) {
            this.msgx.no = no;
            this.showDown = true;
        },
        // 启用erp
        enabled (msg) {
            this.$confirm('您确定要开通erp?', '开通erp', {
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
        down, 
        log
        // certTimeSet,
        // addSupplier
    }
};

</script>

<style lang="scss">

</style>
