<template>
    <section class="contentwrapper">
        <el-row>
            <el-col :span="16" class="left">
                <el-row>
                    <el-col :span="24">
                        <el-card class="box-card c_border_left f1">
                            <div slot="header">
                                <h3>订单统计</h3>
                            </div>
                            <el-col :span="24">
                                <div class="charts_buttom" ref="order">
                                    <ul class="order_box">
                                        <li>
                                            <el-row>
                                                <header>今日统计</header>
                                                <el-col :span="8" class="order_lists">
                                                    <span>订单数</span>
                                                    <span>{{order_data.day.num}}</span>
                                                </el-col>
                                                <el-col :span="8" class="order_lists">
                                                    <span>采购数</span>
                                                    <span>{{order_data.day.onum}}</span>
                                                </el-col>
                                                <el-col :span="8" class="order_lists">
                                                    <span>采购金额</span>
                                                    <span> <b v-if="order_data.day.ototal!=0">￥</b>{{order_data.day.ototal}}</span>
                                                </el-col>
                                            </el-row>
                                        </li>
                                        <li>
                                            <el-row>
                                                <header>本月统计</header>
                                                <el-col :span="8" class="order_lists">
                                                    <span>订单数</span>
                                                    <span>{{order_data.month.num}}</span>
                                                </el-col>
                                                <el-col :span="8" class="order_lists">
                                                    <span>采购数</span>
                                                    <span>{{order_data.month.onum}}</span>
                                                </el-col>
                                                <el-col :span="8" class="order_lists">
                                                    <span>采购金额</span>
                                                    <span> <b v-if="order_data.month.ototal!=0">￥</b>{{order_data.month.ototal}}</span>
                                                </el-col>
                                            </el-row>
                                        </li>
                                        <li>
                                            <el-row>
                                                <header>本年统计</header>
                                                <el-col :span="8" class="order_lists">
                                                    <span>订单数</span>
                                                    <span>{{order_data.year.num}}</span>
                                                </el-col>
                                                <el-col :span="8" class="order_lists">
                                                    <span>采购数</span>
                                                    <span>{{order_data.year.onum}}</span>
                                                </el-col>
                                                <el-col :span="8" class="order_lists">
                                                    <span>采购金额</span>
                                                    <span> <b v-if="order_data.year.ototal!=0">￥</b>{{order_data.year.ototal}}</span>
                                                </el-col>
                                            </el-row>
                                        </li>
                                        <li>
                                            <el-row>
                                                <header>总计</header>
                                                <el-col :span="8" class="order_lists">
                                                    <span>订单数</span>
                                                    <span>{{order_data.total.num}}</span>
                                                </el-col>
                                                <el-col :span="8" class="order_lists">
                                                    <span>采购数</span>
                                                    <span>{{order_data.total.onum}}</span>
                                                </el-col>
                                                <el-col :span="8" class="order_lists">
                                                    <span>采购金额</span>
                                                    <span> <b v-if="order_data.total.ototal!=0">￥</b>{{order_data.total.ototal}}</span>
                                                </el-col>
                                            </el-row>
                                        </li>
                                    </ul>
                                </div>
                            </el-col>
                        </el-card>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-card class="box-card c_border_left f2">
                            <div slot="header">
                                <h3>采购金额报表</h3>
                            </div>
                            <el-col :span="24">
                                <div class="charts_buttom" ref="charts_money"></div>
                            </el-col>
                        </el-card>
                    </el-col>
                </el-row>
            </el-col>
            <el-col :span="8" class="right">
                <el-row>
                    <el-col :span="24">
                        <el-card class="box-card c_border_right">
                            <div slot="header">
                                <h3>供应商</h3>
                            </div>
                            <el-col :span="24">
                                <div class="charts_buttom" ref="charts_supplier"></div>
                            </el-col>
                        </el-card>
                    </el-col>
                    <el-col :span="24">
                        <el-card class="box-card c_border_right">
                            <div slot="header">
                                <h3>客户</h3>
                            </div>
                            <el-col :span="24">
                                <div class="charts_buttom" ref="charts_hospital"></div>
                            </el-col>
                        </el-card>
                    </el-col>
                    <el-col :span="24">
                        <el-card class="box-card c_border_right">
                            <div slot="header">
                                <h3>产品</h3>
                            </div>
                            <el-col :span="24">
                                <div class="charts_buttom" ref="charts_product"></div>
                            </el-col>
                        </el-card>
                    </el-col>
                </el-row>
            </el-col>
        </el-row>
    
    </section>
</template>

<script>
import echarts from 'echarts';
import {

    parseMone

} from '@/services/global.common';

const URL = {
    SUPPLIER_HOSPITAL_COUNT: 'scm.homePage.enterpriseByplatform', // 供应商和客户数量饼图
    PRODUCT_COUNT: 'scm.homePage.productByplatform', // 产品饼图
    MONEY_COUNT: 'scm.homePage.orderChartByplatform', // 订单趋势图
    ORDER_COUNT: 'scm.homePage.orderByplatform' // 订单
};

export default {

    data () {
        return {
            data: [],
            charts_supplier: '', // 供应商
            charts_hospital: '', // 医院
            charts_product: '', // 产品
            charts_money: '', // 采购金额
            order_data: {
                day: {},
                month: {},
                year: {},
                total: {}
            } // 订单统计
        };
    },
    methods: {
        // 处理饼图数据
        getCount (xdata) {
            let _ccount = [];
            _ccount.push({
                name: '审核不通过',
                value: parseInt(xdata.failNum)
            }, {
                name: '待审核',
                value: parseInt(xdata.auditingNum)
            }, {
                name: '审核通过',
                value: parseInt(xdata.successNum)
            }, {
                name: '未提交',
                value: parseInt(xdata.notSubNum)
            });
            return _ccount;
        },
        // 获取供应商/客户 数据
        init_charts_supplier_hospital () {
            this.Http.post(URL.SUPPLIER_HOSPITAL_COUNT, {
                params: {}
            }).then((msg) => {
                let name = ['审核不通过', '待审核', '审核通过', '未提交'];
                this.charts_supplier = echarts.init(this.$refs.charts_supplier); // 初始化echarts
                this.charts_hospital = echarts.init(this.$refs.charts_hospital); // 初始化echarts
                let supplierData = this.getCount(msg.data.supplier);
                let hospitalData = this.getCount(msg.data.customer);
                this.setChart_pie(this.charts_supplier, name, supplierData, '供应商');
                this.setChart_pie(this.charts_hospital, name, hospitalData, '医院');
            });
        },
        // 获取产品数据
        init_charts_product () {
            this.Http.post(URL.PRODUCT_COUNT, {
                params: {}
            }).then(msg => {
                this.charts_product = echarts.init(this.$refs.charts_product); // 初始化echarts
                let chartsProductName = msg.data.products.map((item, i) => item.name);
                let chartsProductData = msg.data.products.map((item, i) => {
                    item.value = item.num;
                    return item;
                });
                this.setChart_pie(this.charts_product, chartsProductName, chartsProductData, '产品');
            });
        },
         // 获取采购金额报表数据
        init_charts_money () {
            this.Http.post(URL.MONEY_COUNT, {
                params: {}
            }).then(msg => {
                this.charts_money = echarts.init(this.$refs.charts_money); // 初始化echarts
                let legendName = ['采购金额', '实际采购金额', '取消金额'];
                let month = [], ototal = [], ctotal = [], atotal = [], datas = {};
                for (let v of msg.data.lists) {
                    month.push(v.month);
                    ototal.push(v.ototal);
                    ctotal.push(v.ctotal);
                    atotal.push(v.atotal);
                }
                datas = { ototal: ototal, ctotal: ctotal, atotal: atotal };

                this.setChart_line(this.charts_money, legendName, month, datas);
            });
        },
        // 订单统计
        async init_order () {
            await this.Http.post(URL.ORDER_COUNT, {
                params: {}
            }).then(msg => {
                for (let item in msg.data) {
                    msg.data[item].ototal = parseMone(msg.data[item].ototal);
                }
                this.order_data = msg.data;
            });
        },
        // 饼形图方法

        setChart_pie (target, name, value, type) {
            target.setOption({

                tooltip: {

                    trigger: 'item',

                    formatter: '{a} <br/>{b} : {c} ({d}%)'

                },

                legend: {

                    orient: 'horizontal',

                    left: 'left',

                    data: name

                },

                series: [{

                    name: type,

                    type: 'pie',

                    radius: '45%',

                    center: ['50%', '50%'],

                    data: value,

                    itemStyle: {

                        emphasis: {

                            shadowBlur: 10,

                            shadowOffsetX: 0,

                            shadowColor: 'rgba(0, 0, 0, 0.5)'

                        }

                    }

                }]

            });
        },

        // 折线图方法

        setChart_line (target, legendName, name, value, type) {
            target.setOption({
                legend: {
                    data: legendName,
                    x: 'right'
                },
                tooltip: {
                    trigger: 'item',
                    formatter: function (params, ticket, callback) {
                        let res = params.name + '<br/>' + params.marker + params.seriesName + ' : ￥' + parseMone(params.value) + '元';
                        return res;
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '18%',
                    containLabel: true

                },

                xAxis: {
                    type: 'category',
                    data: name.map(function (str) {
                        return str.replace(' ', '\n');
                    }),
                    axisLabel: {
                        interval: 0,
                        rotate: 40
                    }
                },
                yAxis: {
                    type: 'value',
                    name: '金额(元)'
                },

                series: [{
                    name: legendName[0],
                    type: 'line',
                    data: value.ototal,
                    smooth: true,
                    itemStyle: {
                        normal: {
                            color: '#2f7ed8',
                            lineStyle: {
                                color: '#2f7ed8'
                            }
                        }
                    }

                }, {
                    name: legendName[1],
                    type: 'line',
                    smooth: true,
                    data: value.atotal,
                    itemStyle: {
                        normal: {
                            color: '#8bbc21',
                            lineStyle: {
                                color: '#8bbc21'
                            }
                        }
                    }

                }, {
                    name: legendName[2],
                    type: 'line',
                    smooth: true,
                    data: value.ctotal,
                    itemStyle: {
                        normal: {
                            color: '#910000',
                            lineStyle: {
                                color: '#910000'
                            }
                        }
                    }

                }]

            });
        }

    },
    created () {
        this.init_order();
    },
    mounted () {
        this.init_charts_supplier_hospital();
        this.init_charts_product();
        this.init_charts_money();
        window.onresize = () => (() => {
            setTimeout(() => {
                // 重置echarts
                this.charts_supplier.resize();

                this.charts_hospital.resize();

                this.charts_product.resize();

                this.charts_money.resize();
            }, 100);
        })();
    }

};
</script>

<style scoped lang="scss" rel="stylesheet/scss">
$charts_bottom_left:785px;
$charts_bottom_right:440px;

.contentwrapper {
    // background: #fff;
    // border: 1px solid #d1dbe5;
    // box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);
     width: 100%;
    .c_border_right {
        height: $charts_bottom_right;
        margin:0  0 10px 10px;
        .charts_buttom {
            padding: 10px;
            height: $charts_bottom_right - 40px;
        }
    }  
    .f1{
        height: $charts_bottom_left - 200px;
        .charts_buttom {
             height: $charts_bottom_left - 240px;
        }
    }
    .f2{
         height: $charts_bottom_left - 40px;
         .charts_buttom {
              height: $charts_bottom_left - 40px;
        } 
    }
    .c_border_left {
         margin:0  10px 10px 0;
        .charts_buttom {
            padding: 10px;
            .order_box {
                height: 100%;
                li {
                    height: 24%;
                    header {
                        font-size: 14px;
                        color: #527BDB;
                        font-weight: bold;
                        margin-bottom: 10px;
                    }
                    .order_lists {
                        border: 1px solid #f0f0f0;
                        border-right: none;
                        height: 50px;
                        line-height: 50px;
                        &:nth-last-of-type(1) {
                            border-right: 1px solid #f0f0f0;
                        }
                        padding:0 10px;
                        display: flex;
                        justify-content: space-between;
                        span {
                            &:nth-of-type(2) {
                                font-weight: bold;
                                color:#000;
                            }
                        }
                    }
                    &:hover {
                        .order_lists {
                            background: #f4f4f4;
                        }
                    }
                }
            }
        }
    }
}
</style>
