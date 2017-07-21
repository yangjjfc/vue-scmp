//添加客户
<template>
    <section>
        <dailog size="small" :show.sync="myshow" classx="staff-add-user" title="物流详情" :hide="true">
            <div slot="content">
                <div class="contenttitle">配送单号 : {{ useMsg.deliveryNo }} , 生成时间 : {{ useMsg.deliveryTime }}</div>
                <el-table :data="list" border>
                    <el-table-column prop="name" label="物流公司" width="160" align="center">
                    </el-table-column>
                    <el-table-column prop="mailno" label="单号" min-width="150" align="">
                    </el-table-column>
                    <el-table-column type="expand">
                        <template scope="scope">
                            <!--<table class="ui-table">
                                        <tr v-for="item in scope.row.route" v-if="scope.row.route.length">
                                            <td v-text="item.recordtime"></td>
                                            <td v-text="item.remark"></td>
                                        </tr>
                                        <tr v-if="!scope.row.route.length">
                                            <td colspan=2>
                                                暂无内容
                                            </td>
                                        </tr>
                                    </table>-->
    
                            <ul class="logistic_info">
                                 <li v-if="!scope.row.route.length">
                                    暂无物流信息
                                </li>
                                <li v-for="(item,index) in scope.row.route" v-else :key="index">
                                    <dl  :class="(index=='0'?'active':'')">
                                        <dt>
                                            <p>
                                                <i></i>
                                            </p>
                                        </dt>
                                        <dd>
                                            <h3>{{item.remark}}</h3>
                                            <span>{{item.recordtime}}</span>
                                        </dd>
                                    </dl>
                                </li>
                               
                            </ul>
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
        async getData () {
            await this.Http.post(URL.DATA, {
                params: {
                    deliveryNo: this.useMsg.deliveryNo,
                    passKey: this.useMsg.passKey
                }
            }).then((re) => {
                this.list = re.data.rows.map((item) => {
                    item.route = item.route.reverse();
                    return item;
                });
            });
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
        this.getData().then(() => {
            this.myshow = this.showx;  
        });
    }

};

</script>

<style scoped lang="scss" rel="stylesheet/scss">
.contenttitle {
    background: #ebfcff;
    color: #000;
    text-transform: uppercase;
    -moz-border-radius: 2px 2px 0 0;
    -webkit-border-radius: 2px 2px 0 0;
    border-radius: 2px 2px 0 0;
    font-size: 14px;
    font-weight: bolder;
    line-height: 40px;
    padding: 0 10px
}

.logistic_info {
    li {
        dl {
            min-height: 68px;
            display: flex;
            dt {
                margin-right: 20px;
                p {
                    height: 100%;
                    width: 2px;
                    background: #c4c4c4;
                    position: relative;
                    i {
                        background: #999;
                        width: 8px;
                        height: 8px;
                        display: block;
                        border-radius: 100%;
                        position: absolute;
                        top: 18px;
                        left: -3px;
                    }
                }
            }
            dd {
                width: 100%;
                margin-top: 14px;
                color: #999;
                padding-bottom: 10px;
                border-bottom: 1px #c4c4c4 solid;
                h3 {
                    font-weight: normal;
                    font-size: 12px;
                    line-height: 18px;
                    margin-bottom: 5px;
                }
            }
            &.active {
                min-height: 48px;
                dt {
                    p {
                        i {
                            background: #3aa13e;
                            box-shadow: 0 0 14px #357138;
                            width: 10px;
                            height: 10px;
                            display: block;
                            top: 0px;
                            left: -4px;
                        }
                    }
                }
                dd {
                    margin-top: 0px;
                }   
            }
        }
    }
}

</style>
