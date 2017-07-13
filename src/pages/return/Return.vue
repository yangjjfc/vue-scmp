<template>
    <section class="container_setion">
        <!--工具条-->
        <el-row>
            <el-col :span="24" class="toolbar">
                <el-form :inline="true">
                    <el-form-item>
                        <el-select size="small" v-model="search.source" placeholder="请选择" @change="getList(1)" class="w120">
                            <el-option
                                    v-for="item in source"
                                    :label="item.text"
                                    :value="item.id" :key="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <el-select size="small" v-model="search.status" placeholder="请选择" @change="getList(1)" class="w100">
                            <el-option
                                    v-for="item in status"
                                    :label="item.text"
                                    :value="item.id" :key="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>

                    </el-form-item>
                    <el-form-item>
                        <datePicker :startTime.sync='search.startTime'  :endTime.sync='search.endTime' classx="w140"></datePicker>
                    </el-form-item>

                    <el-form-item>
                        <el-input placeholder="退货单号/订单编号/供应商/客户名称" v-model.trim="search.keys" @keyup.native.enter="getList(1)" class="w300" size="small"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="getList(1)"  size="small">查询</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="reset"  size="small">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
            <el-col :span="24">
                <el-table :data="list" border >
                    <el-table-column prop="index" label="序号" width="70" align="center" >
                    </el-table-column>
                    <el-table-column prop="supplierName" label="供应商" min-width="150" align="" >
                    </el-table-column>
                    <el-table-column prop="customerName" label="客户名称" min-width="150" align="" >
                    </el-table-column>
                    <el-table-column prop="returnOrderNo" label="退货单号" min-width="120" align="center" >
                    </el-table-column>
                    <el-table-column prop="orderTime" label="退货时间" width="160" align="center" >
                    </el-table-column>

                    <el-table-column  prop="returnScmorderNo" label="SCM退货单号" min-width="140" align="center" >
                    </el-table-column>
                    <el-table-column  prop="orderNo" label="订单编号" min-width="140" align="center" >
                    </el-table-column>
                    <el-table-column  prop="sourceStr" label="退货来源" min-width="140" align="center" >
                    </el-table-column>
                    <el-table-column  prop="status" label="退货状态" min-width="140"  align="center" >
                    </el-table-column>
                    <el-table-column  prop="atotal" label="操作" width="80"  align="center" >
                    <template scope="scope">
                        <el-button type="link" @click="detail(scope.row.returnOrderNo,scope.row.passKey)"  size="small">查看</el-button>
                    </template>
                    </el-table-column>
                </el-table>
            </el-col>
            <el-col :span="24" class="toolbar">
                <pagination :total="total" :pageSize.sync="pageSize"  :pageIndex.sync="pageIndex"  @change="getList"></pagination>
            </el-col>
        </el-row>
    </section>
</template>
<script>
    import datePicker from '@/components/datePicker';
    const URL = {
        PEOPLE_LIST: 'scm.orderReturn.queryReturnOrderByPlatform' // 查询列表
    };
    export default {
        name: 'Return',
        data () {
            return {
                showPermission: false, // 显示权限配置
                search: {
                    source: '-1',  
                    status: '-1',  
                    startTime: '',
                    endTime: '',
                    keys: ''
                },
                source: [
                    {
                        id: '-1',
                        text: '退货来源'
                    }, {
                        id: 'scm', 
                        text: '供应链'
                    }, {
                        id: 'yscm', 
                        text: '云供应链'
                    }, {
                        id: 'nc', 
                        text: '检验子公司'
                    } 
                ],
                status: [{
                    id: '-1',
                    text: '退货状态'
                }, {
                    id: 'apply_return',
                    text: '申请退货'
                }, {
                    id: 'confirm_return',
                    text: '确认退货'
                }, {
                    id: 'reject_return',
                    text: '拒绝退货'
                }, {
                    id: 'finish_return',
                    text: '退货完成'
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
                            item.sourceStr = item.source === 'scm' ? '供应链' : (item.source === 'nc' ? '检验子公司' : '云供应链');
                            let _status = '';
                            switch (item.status) {
                            case 'apply_return' :
                                _status = '申请退货';
                                break;
                            case 'confirm_return' :
                                _status = '确认退货';
                                break;
                            case 'reject_return' :
                                _status = '拒绝退货';
                                break;
                            case 'finish_return' :
                                _status = '退货完成';
                                break;
                            default :
                                break;
                            }
                            item.status = _status;
                            return item;
                        });
                    });
            },
            // 查看
            detail (id, key) {
                this.$router.push('return/detail/' + id + '/' + key);
            },
            // 重置
            reset () {
                this.pageIndex = 1;
                this.search = {
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
            datePicker
        }
    };

</script>

<style lang="scss">

</style>
