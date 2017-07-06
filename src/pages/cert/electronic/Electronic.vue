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
                    <el-input placeholder="企业名称" v-model="search.keywords"   @keyup.native.enter="getList(1)" class="w200" size="small"></el-input>
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
                <el-table-column prop="supplierNo" label="企业名称/企业编号" min-width="150" align="">
                <template scope="scope">
                    <p v-text="scope.row.enterpriseName"></p>
                    <p v-text="scope.row.enterpriseNo"></p>
                </template>
                </el-table-column>
                <el-table-column prop="supplierName" label="签章状态" min-width="150" align="">
                <template scope="scope">
                    <p v-html ="scope.row.text"></p>
                </template>
                </el-table-column>
                <el-table-column prop="authTimes" label="认证次数" width="140" align="center">
                </el-table-column>

                <el-table-column prop="orderTime" label="操作" width="160" align="center">
                <template scope="scope">
                    <el-button type="link" size="mini" @click="detail(scope.row,'detail')">查看</el-button>
                    <el-button v-if="scope.row.status == 3" type="link" size="mini" @click="detail(scope.row,'check')">审核</el-button>
                </template>
                </el-table-column>
            </el-table>
        </el-col>
        <el-col :span="24" class="toolbar">
            <pagination :total="total" :pageSize.sync="pageSize"  :pageIndex.sync="pageIndex" @change="getList"></pagination>
        </el-col>
        <el-col :span="24" v-if="showPreserve" >
            <ElectronicDetail :showx.sync="showPreserve" :cert="checkedObj" :type="oprateType"></ElectronicDetail>
        </el-col>
    </el-row>
</section>
</template>
<script>
import pagination from '@/components/pagination';
import ElectronicDetail from './mods/ElectronicDetail';
import FileList from '@/components/FileList';

const URL = {
    LIST: 'ypt.open.yscm.querySignatureListByPlatform' // 平台端-企业签章列表
    
};
export default {
    name: 'electronic',
    data () {
        return {
            showPreserve: false, // 显示维护
            checkedObj: null,
            oprateType: '',
            search: {
                status: '-1',
                keywords: ''
            },
            source: [{
                id: '-1',
                text: '认证状态' 
            }, {
                id: '1',
                text: '认证成功'
            }, {
                id: '2',
                text: '未认证'
            }, {
                id: '3',
                text: '认证中'
            }, {
                id: '4',
                text: '认证失败'
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
                            item.text = '<span class="green">认证成功</span>';
                            break;
                        case 2:
                            item.text = '<span class="">未认证</span>';
                            break;
                        case 3:
                            item.text = '<span class="orange">认证中</span>';
                            break;
                        case 4:
                            item.text = '<span class="red">认证失败</span>';
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
        detail (row, type) {
            this.oprateType = type;
            this.checkedObj = row;
            this.showPreserve = true;
        },
        // 重置
        reset () {
            this.pageIndex = 1;
            this.search = {
                status: '-1',
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
        ElectronicDetail,
        pagination
    }
};

</script>
<style lang="scss">

</style>
