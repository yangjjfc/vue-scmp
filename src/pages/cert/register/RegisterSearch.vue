<template>
<el-col :span="24" class="toolbar">
    <el-form :inline="true">
        <el-form-item>
            <el-select size="small" v-model="search.certType" placeholder="请选择" @change="getList(1)" class="w120">
                <el-option v-for="item in certType" :label="item.text" :value="item.id" :key='item.id'>
                </el-option>
            </el-select>
        </el-form-item>
        <el-form-item>
            <el-select size="small" v-model="search.registStatus" placeholder="请选择" @change="getList(1)" class="w120">
                <el-option v-for="item in searchState" :label="item.text" :value="item.id" :key='item.id'>
                </el-option>
            </el-select>
        </el-form-item>
        <!--数据状态 -->
        <el-form-item v-if="search.certType == 1">
            <el-select size="small" v-model="search.providerPaper" placeholder="请选择" @change="getList(1)" class="w140">
                <el-option v-for="item in searchSignature" :label="item.text" :value="item.id" :key='item.id'>
                </el-option>
            </el-select>
        </el-form-item>

        <!-- 筛选过期-->
        <el-form-item v-if="search.certType != 1">
            <el-select v-model="search.pastType" placeholder="请选择" class="w140 "  size="small" @change="getList(1)">
                <el-option v-for="item in pastType" :label="item.text" :value="item.id" :key="item.id"></el-option>
            </el-select>
        </el-form-item>

        <el-form-item>
            <el-input placeholder="供应商名称/产品名称/注册证号" v-model.trim="search.keywords" class="w300" size="small" @keyup.native.enter="getList(1)"></el-input>
        </el-form-item>
        
        <el-form-item>
            <el-button type="primary" @click="getList(1)" size="small">查询</el-button>
        </el-form-item>
        <el-form-item>
            <el-button @click="reset" size="small">重置</el-button>
        </el-form-item>
    </el-form>
</el-col>
</template>
<script>
export default {
    name: 'register-search',
    data () {
        return {
            operateType: '',
            search: {
                certType: '1',
                registStatus: '-1',
                providerPaper: '-1',
                pastType: '-1',
                keywords: ''
            },
            certType: [{
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
            pastType: [{
                id: '-1',
                text: '筛选过期'
            },
            {
                id: '0',
                text: '已过期'
            },
            {
                id: '1',
                text: '一个月内过期'
            },
            {
                id: '3',
                text: '三个月内过期'
            }]
        };
    },
    
    computed: {},
    methods: {
        // 获取列表
        getList () {
            this.$emit('getList', this.search);
        },
        
        reset () {
            this.search = {
                certType: '1',
                registStatus: '-1',
                providerPaper: '-1',
                pastType: '-1',
                keywords: ''
            };
            this.$emit('getList', this.search);
        }
    },
    mounted () {
        
    },
    components: {
        
    }
};

</script>
<style lang="scss">

</style>
