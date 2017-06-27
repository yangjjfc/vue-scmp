/**分页插件*/
<template>
    <div class="ui-table"> 
        <table width="100%" >
            <tbody>
                <tr v-for="(item,index) in datas ">
                    <td :class="item.id" class="table_name">{{item.name}}</td>
                    <td>{{item.text}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
export default {
    name: 'dailog-table',
    data () {
        return {
           
        };
    },
  // 需要传的参数
    props: {
        datas: { // 数据
            type: [String, Array],
            required: true
        }
    }
};
</script>

<style lang="scss" scoped rel="stylesheet/scss">
.ui-table{
    table {
        border-left: 1px solid #ddd;
        border-bottom: 1px solid #ddd;
        td {
            border-right: 1px solid #ddd;
            border-top: 1px solid #ddd;
            color: #333;
            line-height: 24px;
            padding: 5px;
            word-break: break-all;
            word-wrap: break-word;
        }
        .table_name{
            width: 90px;
            background-color: #f9f9f9;
            text-align: right;
            padding: 0 10px 0 0;
            color: #666;
            text-indent: 0;
            vertical-align: middle;
        }
    }
}

 
</style>
