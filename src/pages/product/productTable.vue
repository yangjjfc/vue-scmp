<template>
    <div >
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
    </div>
</template>
<script>
import '@/assets/directive/vueDirective.js'; // jq boxer指令
import CONFIG from '@/config/app.config'; // 配置
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
            tableDate: [] // 列表数据
        };
    },
    computed: {
    },
    props: {
        search: {},
        index: ''
    },
    watch: {
        index () {
            this.pageIndex = this.index;
            this.getList();
        },
        search: {
            handler: function () {
                this.getList();
            },
            deep: true
        } 
    },
    methods: {
        // 获取列表
        getList (pageIndex = this.pageIndex, pageSize = this.pageSize) {
            this.Http.post(URL.LIST,
                {
                    params: Object.assign({
                        pageIndex: pageIndex,
                        pageSize: pageSize,
                        status: this.search.registStatus
                    }, this.search)
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
        }

    },
    mounted () {
        this.getList();
    },
    components: {
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
