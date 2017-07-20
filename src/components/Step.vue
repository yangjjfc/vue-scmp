<template>
<div id="flow_chart" >
    <ul>
        <li :class="temp.className" v-for="(temp,index) in list" :key="index">
            <div class="mode">
                <div class="img"></div>
                <div class="time">{{temp.time}}</div>
                <div class="status">{{temp.msg}}</div>
            </div>
            <div class="line" v-if="index != list.length-1"></div>
        </li>
    </ul>
</div>
</template>

<script>
    export default {
        name: 'step',
        data () {
            return {
                list: [],
                defaultFlow: [
                    {
                        msg: '提交订单',
                        className: 'flow1',
                        status: 'trade_pending'
                    },
                    {
                        msg: '确认订单',
                        className: 'flow2',
                        status: 'trade_confirm'
                    },
                    {
                        msg: '部分发货',
                        className: 'flow3',
                        status: ['trade_partship', 'trade_consign']
                    },
                    {
                        msg: '配送中',
                        className: 'flow4',
                        status: 'trade_finish'
                    },
                    {
                        msg: '订单完成',
                        className: 'flow5',
                        status: 'trade_finish'
                    }
                ]
            };
        },
        props: {
            flow: {
                type: Array,
                default: []
            }
        },
        methods: {
            init () {
                this.defaultFlow.forEach((item, num) => { 
                    item.status = typeof item.status === 'string' ? [item.status] : item.status;
                    this.flow.forEach(function (data) {
                        if (~item.status.indexOf(data.status)) {
                            if (item.msg !== '配送中') {
                                item.time = data.time;
                            }
                            item.className += ' active';
                            if (data.status === 'trade_consign') {
                                item.msg = '全部发货';
                            }
                        }
                    });
                });
                this.list = this.defaultFlow;
            }
        },
        // 流程图 待确认(trade_pending)，已确认(trade_confirm)，部分发货(trade_partship)，全部发货(trade_consign)，订单完成(trade_finish)
        // msg 一般不用接口提供的，但是部分发货和全部发货要区分下。
        beforeMount () {
            // this.init();
        },
        watch: {
            flow (val, oldVal) {
                this.init();
            }
        }
    };
</script>
<style lang="scss">
      #flow_chart {
            ul {
                height: 120px;
                clear: both;
                overflow: hidden;
                margin: 0 auto;
                min-width: 761px;
                padding:10px 0;
                display:flex;
                li {
                    
                    text-align: center;
                    height: 100%;
                    width:20%;
                    margin-right:15px;
                    position:relative;
                    &:last-child{
                        width: 140px;
                        margin-right:0;
                    }
                    .status {
                        color: #999;
                    }
                    
                    .img {
                        height: 60px;
                        width: 60px;
                        border-radius: 50%;
                        display: inline-block;
                        background-image: url("../assets/images/deliverys2.png");
                        background-position-y:-60px;

                    }
                    .mode{
                        position: absolute;
                        background: #fff;
                        min-width: 140px;
                    }
                    .line {
                        background-color: #ccc;
                        margin-top: 28px;
                        height:4px;
                    }
                    &.active{
                        .img{
                            background-position-y:0;
                        }
                        .line{
                            background-color: #31becf;
                        }
                        .status{
                            color: #333;
                        }
                    }
                    &.flow1 .img{
                        background-position-x: 0;
                    }
                    &.flow2  .img{
                        background-position-x: -60px;
                    }
                    &.flow3  .img{
                        background-position-x: -120px;
                    }
                    &.flow4  .img{
                        background-position-x: -180px;
                    }
                    &.flow5  .img{
                        background-position-x: -240px;
                    }
                }
            }

        }
</style>
