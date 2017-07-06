<template>
<section class="container_setion">
    <!--工具条-->
    <el-row>
        <el-col :span="24" class="toolbar">
            <el-form :inline="true">
                <el-form-item>
                    <el-select size="small" v-model="search.supplyRegist" placeholder="请选择" @change="getList(1)">
                        <el-option v-for="item in source" :label="item.text" :value="item.id" :key='item.id'>
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-input placeholder="供应商名称" v-model="search.supplierNo" class="w200"  @keyup.native.enter="getList(1)" size="small"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-input placeholder="产品编号/注册证编号/产品名称" v-model="search.keywords"   @keyup.native.enter="getList(1)" class="w300" size="small"></el-input>
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
                <el-table-column prop="supplierNo" label="供应商编号" min-width="150" align="">
                </el-table-column>
                <el-table-column prop="supplierName" label="供应商名称" min-width="150" align="">
                </el-table-column>
                <el-table-column prop="basicProductNo" label="产品编号" width="140" align="center">
                </el-table-column>

                <el-table-column prop="orderTime" label="注册证编号/产品名称" min-width="160" align="">
                <template scope="scope">
                    <p v-text="scope.row.registNo"></p>
                    <p v-text="scope.row.registName"></p>
                </template>
                </el-table-column>

                <el-table-column prop="productNum" label="产品数量" width="120" align="center">
                </el-table-column>

                <el-table-column  label="注册证图片" width="100" align="center">
                    <template scope="scope">
                        <FileList :files="scope.row.registImg" size="small"></FileList>
                    </template>
                </el-table-column>
                <el-table-column  label="操作" width="100" align="center">
                    <template scope="scope">
                        <el-button type="link" size="mini" @click="detail(scope.row)">证件维护</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-col>
        <el-col :span="24" class="toolbar">
            <pagination :total="total" :pageSize.sync="pageSize"  :pageIndex.sync="pageIndex"  @change="getList"></pagination>
        </el-col>
        <el-col :span="24" v-if="showPreserve">
            <preserveDetail :showx.sync ="showPreserve" :cert="checkedObj" @update="getList"></preserveDetail>
        </el-col>
    </el-row>
</section>
</template>
<script>
import FileList from '@/components/FileList';
import preserveDetail from './mods/PreserveDetail';
const URL = {
    LIST: 'scm.platformCert.querySuppRegPlatform' // 查询列表
};
export default {
    name: 'order',
    data () {
        return {
            showPreserve: false, // 显示维护
            checkedObj: null,
            search: {
                supplyRegist: '1',
                supplierNo: '',
                keywords: ''
            },
            source: [{
                id: '1',
                text: '需要维护'
            }, {
                id: '0',
                text: '无需维护' 
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
                        switch (item.source) {
                        case 'scm':
                            item.sourceStr = '供应链';
                            break;
                        case 'yscm':
                            item.sourceStr = '云供应链';
                            break;
                        case 'nc':
                            item.sourceStr = '检验子公司';
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
            this.showPreserve = true;
            this.checkedObj = row;
        },
        // 重置
        reset () {
            this.pageIndex = 1;
            this.search = {
                supplyRegist: '1',
                supplierNo: '',
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
        preserveDetail
    }
};

</script>
<style lang="scss">

</style>
