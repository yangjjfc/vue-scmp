<template>
    <section class="container_setion">
        <!--工具条-->
        <el-row>
            <el-col :span="24" class="toolbar">
                <el-form :inline="true" @submit.native.prevent="">
                    <el-form-item class="pull-right">
                        <el-button type="primary" @click="add" size="small">新增用户</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-input placeholder="真实姓名" v-model.trim="search.keywords" @keyup.native.enter="getList(1)" class="w300" size="small"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="getList(1)" size="small">查询</el-button>
                    </el-form-item>
                    <el-form-item>
                        <el-button @click="reset" size="small">重置</el-button>
                    </el-form-item>
                </el-form> 
            </el-col>
            <el-col :span="24">
    
                <el-table :data="list" border>
                    <el-table-column prop="index" label="序号" width="70" align="center">
                    </el-table-column>
                    <el-table-column prop="userName" label="真实姓名" min-width="150" align="center">
                    </el-table-column>
                    <el-table-column prop="loginAccount" label="登录账号" min-width="150" align="center">
                    </el-table-column>
                    <el-table-column prop="mobilePhone" label="手机号码" min-width="120" align="center">
                    </el-table-column>
                    <el-table-column prop="createTime" label="创建时间" width="200" align="center">
                    </el-table-column>
                    <el-table-column label="状态" min-width="140" align="center">
                        <template scope="scope">
                            <span class="green" v-if="scope.row.status == '1'">已启用</span>
                            <span class="red" v-if="scope.row.status == '2'">已禁用</span>
                            <span class="gray" v-if="scope.row.status == '3'">已删除</span>
                        </template>
                    </el-table-column>
                    <el-table-column prop="cnum" label="操作" min-width="200">
                        <template scope="scope">
                            <el-button size="mini" type="link" @click="editUser(scope.row)" v-if="scope.row.status !='3'">编辑</el-button>
                            <el-button size="mini" type="link" @click="enabled(scope.row,'1')" v-if="scope.row.status=='2'">启用</el-button>
                            <el-button size="mini" type="link" @click="enabled(scope.row,'2')" v-if="scope.row.status=='1'">禁用</el-button>
                            <el-button size="mini" type="link" @click="enabled(scope.row,'3')" v-if="scope.row.status !='3'">删除</el-button>
                            <el-button size="mini" type="link" @click="permission(scope.row)" v-if="scope.row.status !='3'">权限</el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </el-col>
            <el-col :span="24" class="toolbar" v-show="total>0">
                <pagination :total="total" :pageSize.sync="pageSize" :pageIndex.sync="pageIndex" @change="getList"></pagination>
            </el-col>
    
            <el-col :span="24" v-if="showaddUser">
                <addUser :showx.sync="showaddUser" :title="addTitle" :type="addType" :eidtUser="userMsg" @refresh="getList"></addUser>
            </el-col>
            <el-col :span="24" v-if="showPermission">
                <permission :showx.sync="showPermission" :useMsg="userMsg"></permission>
            </el-col>
        </el-row>
    </section>
</template>
<script>
import addUser from './mods/addUser';
import permission from './mods/permission';  // 添加用户权限
const URL = {
    LIST: ' scm.enterprise.queryStaffList', // 查询员工列表
    ADD: ' ypt.open.user.createUserForWeb', // 添加
    EDIT: ' scm.enterprise.modifyUser', // 更新
    CHECK: ' ypt.open.user.isExistUserByLoginAccountForWeb', // 检查用户名是否存在
    DETAIL: ' ypt.open.user.findUserByNoForWeb', // 详情
    ENABLE: ' scm.enterprise.modValidateStaff', // 启用/停用/删除员工
    // 员工菜单授权
    RIGHTS_LIST: ' ypt.open.right.findUserRights', // 所有可选权限
    // RIGHTS_USER: ' ypt.role.findUserRights', // 员工权限配置
    RIGHTS_EDIT: ' ypt.open.right.updateUserRights', // 设置权限
    ISEXIST: ' ypt.open.user.isExistMobileForWeb', // 判断手机号是否存在
    EXISTEMAIL: ' ypt.open.user.isExistEmailForWeb'// 判断邮箱是否存在
};
export default {
    name: 'staff',
    data () {
        return {
            search: {
                keywords: ''
            },
            addTitle: null,
            showaddUser: false, // 显示添加用户
            addType: false, // 添加用户类型
            userMsg: null, // 数据
            showPermission: false, // 显示权限配置
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
            this.Http.post(URL.LIST,
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
                        return item;
                    });
                });
        },
        // 编辑用户
        editUser (msg) {
            this.addTitle = '编辑员工资料';
            this.addType = 'edit';
            this.userMsg = { ...msg };
            this.showaddUser = true;
        },
        // 新增用户
        add () {
            this.addTitle = '添加用户';
            this.addType = 'add';
            this.showaddUser = true;
        },
        // 启用,禁用,删除
        enabled (msg, type) {
            this.$confirm('您确定要' + (type === '1' ? '启用' : type === '2' ? '禁用' : type === '3' ? '删除' : '') + '用户【' + msg.userName + '】吗?', '员工状态更新', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.Http.post(URL.ENABLE, {
                    params: {
                        status: type,
                        userNo: msg.userNo
                    }
                }).then((re) => {
                    if (re.data) {
                        this.getList();
                        if (type === '3') {
                            this.$notify({
                                title: '成功',
                                message: '删除成功',
                                type: 'success'
                            });
                        }
                    }
                });
            }).catch(function () { });
        },
        // 配置权限
        permission (msg) {
            this.userMsg = { ...msg };
            this.showPermission = true;
        },
        // 重置
        reset () {
            this.pageIndex = 1;
            this.search = {
                keywords: ''
            };
            this.getList(1);
        }

    },
    mounted () {
        this.getList();
    },
    components: {
        addUser,
        permission
    }
};

</script>

<style lang="scss">

</style>
