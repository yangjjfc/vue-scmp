<template>
    <section class="container2">
    
        <el-row >
    
    
              
    
                <el-col :span="8">
                    <el-card class="box-card c_border">
                        <div slot="header">
                            <h3>产品</h3>
                        </div>
                        <el-col :span="24">
                            <div class="charts_buttom" ref="charts_product"></div>
                        </el-col>
                    </el-card>
    
                </el-col>
    
                <el-col :span="8">
                    <el-card class="box-card c_border">
                        <div slot="header">
                            <h3>医院</h3>
                        </div>
                        <el-col :span="24">
                            <div class="charts_buttom" ref="charts_hospital"></div>
                        </el-col>
                    </el-card>
                </el-col>
    
                <el-col :span="8">
                    <el-card class="box-card c_border">
                        <div slot="header">
                            <h3>证件</h3>
                        </div>
                        <el-col :span="24">
                            <div class="charts_buttom" ref="charts_cert"></div>
                        </el-col>
                    </el-card>
    
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

    ORDERBYSUPPLIER: 'scm.homePage.orderBySupplier', // 订单趋势图

    SUPPLIERHOMEPAGE: 'scm.homePage.supplierHomePage' // 产品图

};

export default {

    data () {
        return {
            data: [],
            charts_product: '',
            charts_hospital: '',
            charts_cert: '',
            chartLine_sell: '',
            chartLine_order: ''
        };
    },
    methods: {
        // 获取折线图数据
        charts_line () {
            this.Http.post(URL.ORDERBYSUPPLIER, {

                params: {}

            }).then((msg) => {
                this.chartLine_sell = echarts.init(this.$refs.charts_sell); // 初始化echarts

                let msgs = Array.from(msg.data.lists); // 转化数据为数组

                this.data.month = []; // 月

                this.data.atotal = []; // 总数

                this.data.num = []; // 订单数

                for (let v of msgs) {
                    this.data.month.push(v.month);

                    this.data.atotal.push(v.atotal);

                    this.data.num.push(v.num);
                }

                this.setChart_line(this.chartLine_sell, this.data.month, this.data.atotal, 1);
            });
        },

        // tab切换初始化订单趋势

        openCahrt () {
            setTimeout(() => {
                this.chartLine_order = echarts.init(this.$refs.charts_order);
                this.setChart_line(this.chartLine_order, this.data.month, this.data.num, 2);
            }, 500);
        },

        // 获取饼形图数据

        charts_pie () {
            this.Http.post(URL.SUPPLIERHOMEPAGE, {

                params: {}

            }).then((msg) => {
                this.charts_product = echarts.init(this.$refs.charts_product); // 初始化echarts

                this.charts_hospital = echarts.init(this.$refs.charts_hospital);

                this.charts_cert = echarts.init(this.$refs.charts_cert);

                let chartsProductName = msg.data.product.chartData.map((item, i) => item.name);

                let chartsHospitalName = msg.data.customer.chartData.map((item, i) => item.name);

                let chartsCertName = msg.data.cert.chartData.map((item, i) => item.name);

                this.setChart_pie(this.charts_product, chartsProductName, msg.data.product.chartData, '产品');

                this.setChart_pie(this.charts_hospital, chartsHospitalName, msg.data.customer.chartData, '医院');

                this.setChart_pie(this.charts_cert, chartsCertName, msg.data.cert.chartData, '证件');
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

                    center: ['50%', '60%'],

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

        setChart_line (target, name, value, type) {
            let legendName = (type === 1 ? '实际采购金额' : '订单数');

            target.setOption({

                title: {

                    text: (type === 1 ? '销售趋势' : '订单趋势'),

                    x: 'center'

                },

                tooltip: {

                    trigger: 'axis',

                    formatter: function (params, ticket, callback) {
                        let res = '';

                        if (type === 1) {
                            res = params[0].name + '<br/>' + params[0].marker + '实际采购金额' + ' : ' + parseMone(params[0].value) + '元';
                        } else {
                            res = params[0].name + '<br/>' + params[0].marker + '订单数' + ' : ' + params[0].value + '单';
                        }

                        return res;
                    }

                },

                legend: {

                    data: [legendName],

                    x: 'right'

                },

                grid: {

                    left: '3%',

                    right: '4%',

                    bottom: '3%',

                    containLabel: true

                },

                xAxis: {

                    type: 'category',

                    boundaryGap: false,

                    data: name

                },

                yAxis: {

                    type: 'value',

                    name: (type === 1 ? '金额(元)' : '数量(单)')

                },

                series: [{

                    name: legendName,

                    type: 'line',

                    stack: '总量',

                    data: value

                }]

            });
        }

    },

    mounted () {
        this.charts_line();

        this.charts_pie();

        window.onresize = () => (() => {
            setTimeout(() => {
                // 重置echarts
                this.charts_product.resize();

                this.charts_hospital.resize();

                this.charts_cert.resize();

                this.chartLine_sell.resize();

                if (this.chartLine_order) {
                    this.chartLine_order.resize();
                }
            }, 100);
        })();
    }

};
</script>

<style scoped lang="scss" rel="stylesheet/scss">
$charts_top:500px;

$charts_bottom:440px;

.container2 {
    background: #fff;
    border: 1px solid #d1dbe5;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,.12),0 0 6px 0 rgba(0,0,0,.04);
    width: 100%;
    .charts_top {

        width: 100%;

        height: $charts_top
    }

    .c_border {

        height: $charts_bottom;

        margin: 10px; //   border: 1px #ccc solid;
        //     h3 {
        //    //    border-bottom: 1px #ccc solid;
        //         height: 55px;
        //         line-height: 55px;
        //         text-indent: 2em;
        //     }
        .charts_buttom {

            padding: 10px;

            height: $charts_bottom - 40px;
        }
    }
}
</style>
