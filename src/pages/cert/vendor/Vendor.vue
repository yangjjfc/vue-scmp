<template>
<section class="container_setion">
    <!--工具条-->
    <el-row>
        <el-col :span="24" class="toolbar">
            <el-form :inline="true">
                <el-form-item>
                    <el-input placeholder="供应商名称" v-model.trim="search.searchParm"  @keyup.native.enter="getList(1)" class="w300" size="small" ></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="getList(1)" size="small" >查询</el-button>
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
                <el-table-column prop="factoryName" label="厂商名称" min-width="150" align="">
                </el-table-column>
                <el-table-column prop="basicProductNo" label="证件效期" width="200" align="center">
                    <template scope="scope">
                        {{scope.row.startTime}} 至 {{scope.row.endTime}}
                    </template>
                </el-table-column>

                <el-table-column prop="orderTime" label="状态" width="120" align="center">
                <template scope="scope">
                    <span class="red" v-if="scope.row.status == 0">已删除</span>
                    <span class="green" v-else>正常</span>
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
            <pagination :total="total" :pageSize.sync="pageSize"  :pageIndex.sync="pageIndex"  @change="getList"></pagination>
        </el-col>
        <el-col :span="24" v-if="showDetail">
            <VendorDetail :showx.sync ="showDetail" :cert="checkedObj" ></VendorDetail>
        </el-col>
    </el-row>
</section>
</template>
<script>
import FileList from '@/components/FileList';
import VendorDetail from './mods/VendorDetail';
const URL = {
    LIST: 'scm.platformCert.pageCert' // 查询列表
};
export default {
    name: 'vendor',
    data () {
        return {
            showDetail: false, // 显示维护
            checkedObj: null,
            search: {
                certType: '5',
                searchParm: '',
                keywords: ''
            },
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
                        return item;
                    });
                });
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
                certType: '5',
                searchParm: '',
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
        VendorDetail
    }
};

</script>
<style lang="scss">
    
</style>
