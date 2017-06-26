/**分页插件*/
<template>
 <el-pagination :total="total" :page-size="pageSize" @size-change="changeSize" :current-page="pageIndex" @current-change="changePage" layout="total, sizes, prev, pager, next, jumper"></el-pagination>
</template>
<script>
export default {
    name: 'pagination',
    data () {
        return {
            size: this.pageSize
        };
    },
  // 需要传的参数
    props: {
        total: { // 总页数
            type: [String, Number],
            required: true
        },
        pageSize: { // 单页显示数量
            type: [String, Number],
            required: true
        },
        pageIndex: { // 页码
            type: [String, Number]
        }
    },
    methods: {
        // 改变页码
        changePage (page) {
            this.$emit('change', page, this.size);
        },
        // 改变总条数
        changeSize (size) {
            this.size = size;
            this.$emit('change', 1, size);
        }
    }
};
</script>
