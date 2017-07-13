<template>
<section class="container_setion">
    <!--工具条-->
    <el-row>
        <el-col :span="24" class="toolbar">
            <el-form :inline="true">
                <el-form-item>
                    <el-select size="small" v-model="search.status" placeholder="请选择" @change="getList(1)" class="w140">
                        <el-option v-for="item in source" :label="item.text" :value="item.id" :key='item.id'>
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-select size="small" v-model="search.pastType" placeholder="请选择" @change="getList(1)" class="w160">
                        <el-option v-for="item in sourceType" :label="item.text" :value="item.id" :key='item.id'>
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-input placeholder="供应商名称/授权单位" v-model.trim="search.keywords"  @keyup.native.enter="getList(1)" class="w300" size="small"></el-input>
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
                <el-table-column prop="certNo" label="授权书编号" width="160" align="center">
                </el-table-column>
                <el-table-column prop="supplierName" label="供应商名称" min-width="140" align="">
                </el-table-column>
                <el-table-column  prop="higher" label="授权单位" min-width="140" align="">
                </el-table-column>
                <el-table-column  label="有效期" width="260" align="center">
                    <template scope="scope">
                        {{scope.row.startTime}} 至 <span v-if="scope.row.longTerm == 1">长期</span> <span v-else>{{scope.row.endTime}}</span> 
                        <el-tag type="danger" v-if="scope.row.validate ==0">已过期</el-tag>
                        <el-tag type="warning" v-if="scope.row.validate ==2">即将过期</el-tag>
                    </template>
                </el-table-column>
                <el-table-column prop="productCertNum" label="产品数" width="100" align="center">
                   
                </el-table-column>
                <el-table-column  label="状态" width="100" align="center">
                    <template scope="scope">
                        <span v-html="scope.row.statusStr"></span>
                    </template>
                </el-table-column>
                <el-table-column  label="操作" width="160" align="center">
                    <template scope="scope">
                        <el-button type="link" size="mini" @click="detail(scope.row)">查看</el-button>
                        <el-button type="link" size="mini" @click="log(scope.row)">日志</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-col>
        <el-col :span="24" class="toolbar">
            <pagination :total="total" :pageSize.sync="pageSize"  :pageIndex.sync="pageIndex" @change="getList"></pagination>
        </el-col>
        <el-col :span="24" v-if="showDetail">
            <AuthDetail :showx.sync ="showDetail" :cert="checkedObj"></AuthDetail>
        </el-col>
        <el-col :span="24" v-if="showLog">
            <AuthLog :showx.sync ="showLog" :cert="checkedObj"></AuthLog>
        </el-col>
    </el-row>
</section>
</template>
<script>
import FileList from '@/components/FileList';
import AuthDetail from './mods/AuthDetail';
import AuthLog from './mods/AuthLog';
const URL = {
    LIST: 'scm.platformCert.pagePlatformAuthorizeList' // 查询列表
};
export default {
    name: 'certAuth',
    data () {
        return {
            showDetail: false, // 显示维护
            showLog: false,
            checkedObj: null,
            search: {
                status: '-1',
                pastType: '-1',
                keywords: ''
            },
            source: [{
                id: '-1',
                text: '状态' // “全部”改为“状态”
            }, {
                id: '1',
                text: '有效'
            }, {
                id: '0',
                text: '无效'
            }],
            sourceType: [{ 
                id: '-1',
                text: '筛选过期'
            }, {
                id: '0',
                text: '已过期'
            }, {
                id: '1',
                text: '一个月内过期' 
            }, {
                id: '3',
                text: '三个月内过期'
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
                        switch (parseInt(item.status)) {
                        case 1:
                            item.statusStr = '<span class="">有效</span>';
                            break;
                        case 0:
                            item.statusStr = '<span class="red">无效</span>';
                            break;
                        default:
                            break;
                        }
                        
                        return item;
                    });
                });
        },
        // 查看
        detail (row) {
            this.showDetail = true;
            this.checkedObj = row;
        },
        // 日志
        log (row) {
            this.showLog = true;
            this.checkedObj = row;
        },
        // 重置
        reset () {
            this.pageIndex = 1;
            this.search = {
                status: '-1',
                pastType: '-1',
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
        AuthDetail,
        AuthLog
    }
};

</script>
<style lang="scss">

</style>
