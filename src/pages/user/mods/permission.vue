//设置权限
<template>
    <section>
        <dailog size="tiny" :show.sync="myshow" classx="" title="员工权限配置" @ok="quire">
            <el-tree slot="content" :data="tree_data" ref="tree" show-checkbox node-key="id" :default-expand-all="true"  :default-checked-keys="defaultChecked" :props="defaultProps">
            </el-tree>
        </dailog>
    </section>
</template>   

<script>
'use strict';
const URL = {
    RIGHTS_EDIT: 'ypt.open.right.updateUserRights', // 设置权限
    RIGHTS_LIST: 'ypt.open.right.findUserRights' // 所有可选权限
};
export default {
    name: 'staff-permission',
    props: {
        showx: { // 显示
            type: Boolean,
            require: true
        },
        useMsg: {}
    },
    data () {
        return {
            myshow: false, // 是否显示弹框
            tree_data: {}, // 获取的数据
            defaultProps: { // 默认props设置
                children: 'children',
                label: 'text'
            },
            defaultChecked: [] // 默认选择
        };
    },
    computed: {
        // 获取打钩的keys
        getKeys () {
            return this.$refs.tree.getCheckedKeys();
        }
    },
    methods: {
        // 确认
        quire () {
            this.Http.post(URL.RIGHTS_EDIT, {
                userNo: this.useMsg.userNo,
                appCode: 'YSCM',
                rightIds: this.getKeys,
                appRole: 'Supplier'
            }).then(re => {
                if (re.data === 'SUCCESS') {
                    this.$notify({
                        title: '成功',
                        message: this.type === 'add' ? '添加成功' : '编辑成功',
                        type: 'success'
                    });
                    this.myshow = false;
                }
            });
        },
        // 获取数据
        async getData () {
            await this.Http.post(URL.RIGHTS_LIST, {
                userNo: this.useMsg.userNo,
                appCode: 'YSCM',
                appRole: 'Supplier'
            }).then((re) => {
                if (re.data && re.data.length > 0) {
                    this.tree_data = re.data;
                    this.formatChecked(this.tree_data);
                }
            });
        },
        // 遍历数据已选择的keys
        formatChecked (data) {
            let checked = [];
            let listChecked = (data) => {
                for (let item of data) {
                    if (item.checked && item.isLeaf) {
                        checked.push(item.id);
                    }
                    if (!item.isLeaf) {
                        listChecked(item.children);
                    }
                }
            };
            listChecked(data);
            this.defaultChecked = checked;
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
    }

};

</script>

<style scoped lang="scss" rel="stylesheet/scss">

</style>
