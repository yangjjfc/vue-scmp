<template >
    <section class="container_setion">
        <!--工具条-->
        <el-row>
            <el-col :span="24" class="toolbar">
                <el-form :inline="true">
                    <el-form-item>
                        <el-select size="small" v-model="search.type" placeholder="请选择" @change="changeType()">
                            <el-option
                                    v-for="item in options"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item>
                        <div class="block">
                            <span class="demonstration" v-text="timeOpt.name"></span>
                            <el-date-picker size="small"
                                v-model="search.time"
                                :format="timeOpt.format"
                                :type="timeOpt.type" @change="changeTime">
                            </el-date-picker>
                        </div>
                    </el-form-item>

                    <el-form-item>
                        <el-input placeholder="供应商" v-model="search.keywords" class="w300" size="small"></el-input>
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
                    <el-table-column prop="month" label="月份" min-width="150" align="center" >
                    </el-table-column>
                    <el-table-column prop="name" label="供应商" min-width="150" align="center" >
                    </el-table-column>
                    <el-table-column prop="num" label="订单数" min-width="120" align="center" >
                    </el-table-column>
                    <el-table-column prop="onum" label="销售数" width="100" align="center" >
                    </el-table-column>

                    <el-table-column  prop="ototal" label="销售金额" min-width="140" align="right" >
                    </el-table-column>
                    <el-table-column  prop="cnum" label="取消数" min-width="140" align="center" >
                    </el-table-column>
                    <el-table-column  prop="ctotal" label="取消金额" min-width="140" align="right" >
                    </el-table-column>
                    <el-table-column  prop="anum" label="实际销售数" min-width="140"  align="center" >
                    </el-table-column>
                    <el-table-column  prop="atotal" label="实际销售金额" min-width="140"  align="right" >
                    </el-table-column>
                </el-table>
            </el-col>
            <el-col :span="24" class="toolbar">
                <pagination :total="total" :pageSize="pageSize"  @change="getList"></pagination>
            </el-col>
        </el-row>
    </section>
</template>
<script>
    import pagination from '@/components/pagination';
    import {parseMone, format} from '@/services/global.common';
    const URL = {
        PEOPLE_LIST: 'scm.statistics.supplierSalesByPlatform', // 查询列表
        STAFF: 'scm.enterprise.modValidateStaff' // 启用/停用/删除员工
    };
    export default {
        name: 'staff',
        data () {
            return {
                showPermission: false, // 显示权限配置
                search: {
                    type: '2',  // 1 年  2 月
                    time: '',
                    keywords: ''
                },
                timeOpt: {
                    name: '月',
                    type: 'month'
                },
                options: [
                    {
                        label: '年份统计',
                        value: '1'
                    },
                    {
                        label: '月份统计',
                        value: '2'
                    }
                ],
                total: 0,
                pageSize: 20,
                pageIndex: 1,
                from: {
                    keywords: ''
                },
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
                            item.ototal = parseMone(item.ototal);
                            item.ctotal = parseMone(item.ctotal);
                            item.atotal = parseMone(item.atotal);
                            return item;
                        });
                    });
            },
            // 配置权限
            permission (msg) {
                this.userMsg = {...msg};
                this.showPermission = true;
            },
            // 切换时间类型
            changeType () {
                if (this.search.type === '1') {
                    this.timeOpt = {
                        name: '年',
                        format: 'yyyy',
                        type: 'year'
                    };
                    this.search.time = format(new Date(), 'yyyy');
                } else {
                    this.timeOpt = {
                        name: '月',
                        format: 'yyyy-MM',
                        type: 'month'
                    };
                    this.search.time = format(new Date(), 'yyyy-MM');
                }
                this.getList();
            },
            changeTime (value) {
                this.search.time = value;
                this.getList();
            },
            // 重置
            reset () {
                this.pageIndex = 1;
                this.search = {
                    type: '2',
                    time: '',
                    keywords: ''
                };
                this.changeType();
                this.getList(1);
            }

        },
        mounted () {
            this.changeType();
            this.getList();
        },
        components: {
            pagination
        }
    };

</script>

<style lang="scss">

</style>
