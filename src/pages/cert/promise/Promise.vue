<template>
<section class="container_setion">
    <!--工具条-->
    <el-row>
        <el-col :span="24" class="toolbar">
            <el-form :inline="true">
                <el-form-item>
                    <el-select size="small" v-model="search.status" placeholder="请选择" @change="getList(1)" class="w160">
                        <el-option v-for="item in source" :label="item.text" :value="item.id" :key='item.id'>
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-input placeholder="供应商名称/客户名称" v-model="search.keywords"  @keyup.native.enter="getList(1)" class="w300" size="small"></el-input>
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
                <el-table-column prop="customerName" label="客户名称" min-width="140" align="">
                </el-table-column>
                <el-table-column  label="证件效期" width="280" align="center">
                    <template scope="scope">
                        {{scope.row.startTime}} 至 {{scope.row.endTime}} <el-tag type="danger" v-if="scope.row.isPast == 1">已过期</el-tag>
                    </template>
                </el-table-column>
                <el-table-column  label="状态" width="100" align="center">
                    <template scope="scope">
                        <span v-html="scope.row.statusStr"></span>
                    </template>
                </el-table-column>
                <el-table-column  label="操作" width="100" align="center">
                    <template scope="scope">
                        <el-button type="link" size="mini" @click="detail(scope.row)">查看</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-col>
        <el-col :span="24" class="toolbar">
            <pagination :total="total" :pageSize.sync="pageSize"  :pageIndex.sync="pageIndex" @change="getList"></pagination>
        </el-col>
        <el-col :span="24" v-if="showDetail">
            <PromiseDetail :showx.sync ="showDetail" :cert="checkedObj"></PromiseDetail>
        </el-col>
    </el-row>
</section>
</template>
<script>
import FileList from '@/components/FileList';
import PromiseDetail from './mods/PromiseDetail';
const URL = {
    LIST: 'scm.platformCert.querySupplierCommitmentPlatform' // 查询列表
};
export default {
    name: 'order',
    data () {
        return {
            showDetail: false, // 显示维护
            checkedObj: null,
            search: {
                status: '-1',
                certType: '2',
                keywords: ''
            },
            source: [{
                id: '-1',
                text: '状态'
            }, { 
                id: '1',
                text: '正常'
            }, { 
                id: '0',
                text: '已删除'
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
                        case 0:
                            item.statusStr = '<span class="red">已删除</span>';
                            break;
                        case 1:
                            item.statusStr = '<span class="green">正常</span>';
                            break;
                        default:
                            break;
                        }
                        
                        return item;
                    });
                });
        },
        changeTime_sta (value) {
            this.search.startTime = value;
        },
        changeTime_end (value) {
            this.search.endTime = value;
        },
        
        // 查看
        detail (row) {
            this.showDetail = true;
            this.checkedObj = row;
        },
        // 重置
        reset () {
            this.pageIndex = 1;
            this.search = {
                status: '-1',
                certType: '2',
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
        PromiseDetail
    }
};

</script>
<style lang="scss">

</style>
