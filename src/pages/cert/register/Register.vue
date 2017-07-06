<template>
<section class="container_setion">
    <!--工具条-->
    <el-row>
        <el-col :span="24" class="toolbar">
            <el-form :inline="true">
                <el-form-item>
                    <el-select size="small" v-model="search.searchType" placeholder="请选择" @change="getList()">
                        <el-option v-for="item in searchType" :label="item.text" :value="item.id" :key='item.id'>
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-select size="small" v-model="search.registStatus" placeholder="请选择" @change="getList()">
                        <el-option v-for="item in searchState" :label="item.text" :value="item.id" :key='item.id'>
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-select size="small" v-model="search.providerPaper" placeholder="请选择" @change="getList()">
                        <el-option v-for="item in searchSignature" :label="item.text" :value="item.id" :key='item.id'>
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-input placeholder="供应商名称/产品名称/注册证号" v-model="search.keywords" class="w300" size="small"></el-input>
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
                </el-table-column>
                <el-table-column prop="supplierName" label="供应商名称" min-width="150" align="">
                </el-table-column>
                 <el-table-column prop="orderTime" label="产品名称/注册证编号" min-width="160" align="">
                <template scope="scope">
                    <p class="blue" v-text="scope.row.registName"></p>
                    <p v-text="scope.row.registNo"></p>
                </template>
                </el-table-column>
                <el-table-column prop="productNum" label="有效期" width="220" align="center">
                    <template scope="scope">
                        {{scope.row.startTime}} 至 <span v-if="scope.row.longTerm == 1">长期</span> <span v-else>{{scope.row.endTime}}</span>
                    </template>
                </el-table-column>

                <el-table-column  label="有无鲜章" width="100" align="center">
                    <template scope="scope">
                         <span v-html="scope.row.providerPaperStr"></span>
                    </template>
                </el-table-column>
                <el-table-column  label="审核状态" width="100" align="center">
                    <template scope="scope">
                         <span v-html="scope.row.registStatusStr"></span>
                    </template>
                </el-table-column>
                
                <el-table-column  label="操作" width="200" align="">
                    <template scope="scope">
                        <el-button type="link" size="mini" @click="detail(scope.row,'detail')">查看</el-button>
                        <el-button type="link" size="mini" @click="log(scope.row)">日志</el-button>
                        <el-button type="link" v-if="scope.row.registStatus == 3" size="mini" @click="operate(scope.row)">设置</el-button>
                        <el-button type="link" v-if="scope.row.registStatus == 2" size="mini" @click="detail(scope.row,'check')">审核</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-col>
        <el-col :span="24" class="toolbar">
            <pagination :total="total" :pageSize.sync="pageSize" :pageIndex.sync="pageIndex"  @change="getList"></pagination>
        </el-col>
        <el-col :span="24" v-if="showDetail">
            <RegisterDetail :showx.sync ="showDetail" :cert="checkedObj" :type="operateType" @update="getList"></RegisterDetail>
        </el-col>
        <el-col :span="24" v-if="showLog">
            <RegisterLog :showx.sync ="showLog" :cert="checkedObj" ></RegisterLog>
        </el-col>
        <el-col :span="24" v-if="showSet">
            <SetStatus :showx.sync ="showSet" :cert="checkedObj" @update="getList"></SetStatus>
        </el-col>
    </el-row>
</section>
</template>
<script>
import pagination from '@/components/pagination';
import FileList from '@/components/FileList';
import RegisterDetail from './mods/RegisterDetail';
import SetStatus from './mods/SetStatus';
import RegisterLog from './mods/RegisterLog';
const URL = {
    LIST: 'scm.platformCert.pageRegists' // 查询列表
};
export default {
    name: 'order',
    data () {
        return {
            showDetail: false, // 显示详情
            showLog: false, // 显示日志
            showSet: false, // 显示设置
            checkedObj: null,
            operateType: '',
            search: {
                searchType: '1',
                registStatus: '-1',
                providerPaper: '-1',
                keywords: ''
            },
            searchType: [{
                id: '1',
                text: '产品证件'
            }, {
                id: '0',
                text: '无需证件'
            }, {
                id: '2',
                text: '科研试剂'
            }],
            searchState: [{
                id: '-1',
                text: '审核状态'
            }, {
                id: '1',
                text: '创建'
            }, {
                id: '2',
                text: '待审核'
            }, {
                id: '3',
                text: '审核通过' 
            }, {
                id: '4',
                text: '审核不通过' 
            }],
            searchSignature: [{
                id: '-1',
                text: '索证数据状态'
            }, {
                id: '1',
                text: '有鲜章'
            }, {
                id: '0',
                text: '无鲜章'
            }, {
                id: '2',
                text: '未处理'
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
            this.Http.post(URL.LIST,
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
                        switch (parseInt(item.registStatus)) {
                        case 1:
                            item.registStatusStr = '<span class="">创建</span>';
                            break;
                        case 2:
                            item.registStatusStr = '<span class="orange">待审核</span>';
                            break;
                        case 3:
                            item.registStatusStr = '<span class="green">审核通过</span>';
                            break;
                        case 4:
                            item.registStatusStr = '<span class="red">审核不通过</span>';
                            break;
                        default:
                            break;
                        }
                    
                        switch (parseInt(item.providerPaper)) {
                        case 1:
                            item.providerPaperStr = '<span class="green">有</span>';
                            break;
                        case 0:
                            item.providerPaperStr = '<span class="red">无</span>';
                            break;
                        case 2:
                            item.providerPaperStr = '未处理';
                            break;
                        default:
                            break;
                        }
                        return item;
                    });
                });
        },
       
        // 查看
        detail (row, type) {
            this.showDetail = true;
            this.checkedObj = row;
            this.operateType = type;
        },
        // 日志
        log (row) {
            this.checkedObj = row;
            this.showLog = true;
        },
        // 设置
        operate (row) {
            this.checkedObj = row;
            this.showSet = true;
        },
        // 重置
        reset () {
            this.pageIndex = 1;
            this.search = {
                searchType: '1',
                registStatus: '-1',
                providerPaper: '-1',
                keywords: ''
            };
            this.getList(1);
        }

    },
    mounted () {
        this.getList();
    },
    components: {
        FileList,
        RegisterDetail,
        SetStatus,
        RegisterLog,
        pagination
    }
};

</script>
<style lang="scss">

</style>
