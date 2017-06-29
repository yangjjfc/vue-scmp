import pagination from '@/components/pagination';
import datePicker from '@/components/datePicker';
const URL = {
    PEOPLE_LIST: 'scm.order.queryOrderByPlatform' // 查询列表
};
export default {
    name: 'order',
    data () {
        return {
            showLogistic: false, // 显示配送
            search: {
                orderType: '-1',
                source: '-1',
                status: '-1',
                startTime: '',
                endTime: '',
                keys: ''
            },
            userMsg: null,
            source: [{
                id: '-1',
                text: '订单来源'
            }, {
                id: 'scm',
                text: '供应链'
            }, {
                id: 'yscm',
                text: '云供应链'
            }, {
                id: 'nc',
                text: '检验子公司'
            }],
            status: [{
                id: '-1',
                text: '订单状态'
            }, {
                id: 'trade_pending',
                text: '待确认'
            }, {
                id: 'trade_confirm',
                text: '已确认'
            }, {
                id: 'trade_partship',
                text: ' 部分发货'
            }, {
                id: 'trade_consign',
                text: '全部发货'
            }, {
                id: 'trade_finish',
                text: '订单完成'
            }, {
                id: 'trade_cancel',
                text: '订单取消'
            }, {
                id: 'trade_close',
                text: '订单关闭'
            }],
            orderType: [{
                id: '-1',
                text: '订单类型'
            }, {
                id: '1',
                text: '销售订单'
            }, {
                id: '2',
                text: '借出订单'
            }],
            total: 0,
            pageSize: 20,
            pageIndex: 1,
            list: []
        };
    },
    computed: {},
    methods: {
        // 获取列表
        getList (pageIndex = this.pageIndex, pageSize = this.pageSize) {
            this.Http.post(URL.PEOPLE_LIST,
                {
                    params: Object.assign({
                        pageIndex: pageIndex,
                        pageSize: pageSize
                    }, this.search)
                }).then((re) => {
                    this.pageIndex = re.data.pageIndex;
                    this.pageSize = re.data.pageSize;
                    this.total = re.data.total;
                    this.list = re.data.rows.map((item, index) => {
                        item.index = index + 1 + (this.pageIndex - 1) * this.pageSize;
                        switch (item.source) {
                        case 'scm':
                            item.sourceStr = '供应链';
                            break;
                        case 'yscm':
                            item.sourceStr = '云供应链';
                            break;
                        case 'nc':
                            item.sourceStr = '检验子公司';
                            break;
                        }
                        switch (item.status) {
                        case 'trade_pending':
                            item.statusObj = '<span class="blue">待确认</span>';
                            break;
                        case 'trade_confirm':
                            item.statusObj = '<span class="orange">已确认</span>';
                            break;
                        case 'trade_partship':
                            item.statusObj = '<span class="orange">部分发货</span>';
                            break;
                        case 'trade_consign':
                            item.statusObj = '<span class="green">全部发货</span>';
                            break;
                        case 'trade_finish':
                            item.statusObj = '<span class="green">订单完成</span>';
                            break;
                        case 'trade_cancel':
                            item.statusObj = '<span class="gray">订单取消</span>';
                            break;
                        case 'trade_close':
                            item.statusObj = '<span class="gray">订单关闭</span>';
                            break;
                        default:
                            break;
                        }
                        return item;
                    });
                });
        },
        changeTime_sta (value) {
            this.search.startTime = value;
        },
        changeTime_end (value) {
            this.search.endTime = value;
        },
        // 物流跟踪
        checkLogistic (row) {
            this.showLogistic = true;
            this.userMsg = row;
        },
        // 查看
        detail (row) {
            this.$router.push('/logistic/detail/' + row.deliveryNo + '/' + row.passKey);
        },
        // 重置
        reset () {
            this.pageIndex = 1;
            this.search = {
                orderType: '-1',
                source: '-1',
                status: '-1',
                startTime: '',
                endTime: '',
                keys: ''
            };
            this.getList(1);
        }

    },
    mounted () {
        this.getList();
    },
    components: {
        datePicker,
        pagination
    }
};
