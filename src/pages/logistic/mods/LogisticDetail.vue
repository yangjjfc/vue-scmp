<template src="./LogisticDetail.html">
</template>
<script>
    import {parseMone} from '@/services/global.common'; 
    const URL = {
        PEOPLE_LIST: 'scm.orderDelivery.getDeliveryOrder' // 查询列表
    };
    export default {
        name: 'logisticDetail',
        data () {
            return {
                total: 0,
                pageSize: 20,
                pageIndex: 1,
                no: '',
                order: {},
                list: []
            };
        },
        computed: {},
        methods: {
            // 获取列表
            getList () {
                let param = this.$route.params;
                this.Http.post(URL.PEOPLE_LIST,
                    {
                        params: param
                    }).then((re) => {
                        this.order = re.data.delivery;
                        this.order.totalMoney = parseMone(this.order.totalMoney);
                        this.list = re.data.rows.map((item, index) => {
                            item.index = index + 1 + (this.pageIndex - 1) * this.pageSize;
                            item.price = parseMone(item.price);
                            item.total = parseMone(item.total || 0);
                            return item;
                        });
                    });
            },
            
            // 查看
            returns () {
                this.$router.back();
            }
    
        },
        created () {
            this.no = this.$route.params.deliveryNo;
        },
        mounted () {
            this.getList();
        }
      
    };

</script>

<style lang="scss" scoped>
   
    h3{
        line-height:30px;
    }
    .align-right{
        text-align: right;
        font-size:16px;
        line-height:30px;
    }
    .ui-table{
        td{
            width:33.3%;
        }
    }
</style>
