//添加客户
<template>
    <section>
        <dailog size="small" :show.sync="myshow" classx="view-user" title="用户登录日志" hide="true">
                <el-row slot="content">
                    <el-col :span="24">
                        <el-table :data="msgx" border style="width: 100%">
                            <el-table-column label="序号" prop="index" align="center" width="70">
                            </el-table-column>
                            <el-table-column label="登录时间"  prop="loginTime" align="center" width="160">
                            </el-table-column>
                            <el-table-column label="退出时间"  prop="logoutTime" align="center" width="160">
                            </el-table-column>
                            <el-table-column label="在线时长"  prop="seconds" align="center" width="160">
                            </el-table-column>
                            <el-table-column label="IP地址" prop="userIp" align="center" min-width="160">
                            </el-table-column>
                        </el-table>
                    </el-col>
                    <el-col :span="24" class="toolbar">
                    <pagination :total="total" :pageSize="pageSize" :pageIndex="pageIndex" @change="getData"></pagination>
                    </el-col>
            </el-row>
        </dailog>
    </section>
</template>   

<script>
const URL = {
    'queryUserLoginLogList': 'scm.enterprise.queryUserLoginLogList'
};
import dailog from '@/components/Dailog';
import pagination from '@/components/pagination';
export default {
    name: 'viewDailog',
    props: ['showx'],
    data () {
        return {
            myshow: false, // 是否显示弹框
            msgx: null, // 数据
            pageIndex: 1,
            pageSize: 10,
            total: 20
        };
    },
    methods: {
        // 获取数据
        async getData (pageIndex = this.pageIndex, pageSize = this.pageSize) {
            await this.Http.post(URL.queryUserLoginLogList, {
                params: {
                    pageIndex: pageIndex,
                    pageSize: pageSize
                }
            }).then((re) => {
                this.pageIndex = re.data.pageIndex;
                this.pageSize = re.data.pageSize;
                this.total = re.data.total;
                if (re.data && re.data.rows.length) {
                    this.msgx = re.data.rows.map((item, index) => {
                        item.index = index + 1 + (pageIndex - 1) * pageSize;
                        return item;
                    });
                }
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
    },
    components: {
        dailog,
        pagination
    }

};

</script>

<style scoped lang="scss" rel="stylesheet/scss">
</style>
