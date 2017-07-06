<template>
<section class="container_setion">
    <!--工具条-->
    <el-row>
        <!-- //搜索框 -->
        <RegisterSearch  @getList="getList" ></RegisterSearch>

        <RegisterTable v-if="search.certType == 1" :search="search" :index.sync="pageIndex"></RegisterTable>
        <productTable v-if="search.certType != 1" :search="search" :index.sync="pageIndex"></productTable>
    </el-row>
</section>
</template>
<script>

import RegisterTable from './RegisterTable';
import RegisterSearch from './RegisterSearch';
import productTable from '@/pages/product/productTable';
export default {
    name: 'register',
    data () {
        return {
            search: {
                certType: '1',
                registStatus: '-1',
                providerPaper: '-1',
                pastType: '-1',
                keywords: ''
            },
            pageIndex: 1,
            showType: 1 
        };
    },
    computed: {},
    methods: {
        getList (search) {
            this.pageIndex = 1;
            Object.assign(this.search, search);
        }
    },
    mounted () {
        
    },
    components: {
        RegisterTable,
        RegisterSearch,
        productTable
    }
};

</script>
<style lang="scss">

</style>
