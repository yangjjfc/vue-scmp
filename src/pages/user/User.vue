<template src="./User.html"></template>
<script>
    import pagination from '@/components/pagination';
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
            // 新增用户
            add () {

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
            pagination
        }
    };

</script>

<style lang="scss">

</style>
