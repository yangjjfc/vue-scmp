//添加客户
<template>
    <section >
        <dailog size="tiny" :show.sync="myshow" classx="staff-add-user"  title="物流详情" @ok="quire">
            <div slot="content">
                <div class="contenttitle" >配送单号 : {{ useMsg.deliveryNo }} , 生成时间 : {{ useMsg.deliveryTime }}</div>
                    <el-table :data="list" border >
                        <el-table-column prop="name" label="物流公司" width="160" align="center" >
                        </el-table-column>
                        <el-table-column prop="mailno" label="单号" min-width="150" align="" >
                        </el-table-column>
                        <el-table-column type="expand">
                            <template scope="scope">
                                <table class="ui-table">
                                    <tr v-for="item in scope.row.route" v-if="scope.row.route.length">
                                        <td v-text="item.recordtime"></td>
                                        <td v-text="item.remark"></td>
                                    </tr>
                                    <tr v-if="!scope.row.route.length">
                                        <td colspan=2>
                                            暂无内容
                                        </td>
                                    </tr>
                                </table>
                            </template>
                        </el-table-column>
                </el-table>
            </div>
        </dailog>
    </section>
</template>   

<script>
'use strict';
const URL = {
    DATA: 'scm.orderDelivery.queryLogistics' // 物流信息
};
export default {
    name: 'CheckLogistic',
    props: {
        showx: { // 显示
            type: Boolean,
            require: true
        },
        useMsg: { // 用户数据
            type: Object
        }
    },
    data () {
        return {
            myshow: false, // 是否显示弹框
            list: []
        };
    },
    computed: {
    },
    methods: {
        getData () {
            this.Http.post(URL.DATA, {
                params: {
                    deliveryNo: this.useMsg.deliveryNo,
                    passKey: this.useMsg.passKey
                }
            }).then((re) => {
                this.list = re.data.rows;
            });
        },
        // 确认
        quire () {
            this.myshow = false;
        }  
    },
    watch: {
        myshow (val, oldval) {
            if (oldval && !val) {
                this.$emit('update:showx', false);
            }
        }
    },
    beforeMount () {
        this.getData();
        this.myshow = this.showx;
    }

};

</script>

<style scoped lang="scss" rel="stylesheet/scss">
.contenttitle{
    background: #ebfcff;
	color: #000;
	text-transform: uppercase;
	-moz-border-radius: 2px 2px 0 0;
	-webkit-border-radius: 2px 2px 0 0;
	border-radius: 2px 2px 0 0;
	font-size: 14px;
	font-weight: bolder;
	line-height: 40px;
	padding:0 10px
}
</style>
