//设置权限
<template>
    <section>
        <dailog size="tiny" :show.sync="myshow" classx="" title="员工权限配置" @ok="quire">
            <el-tree slot="content" :data="tree_data" ref="tree" show-checkbox node-key="id" :default-expand-all="true" :default-checked-keys="defaultChecked" :props="defaultProps">
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
        getKeyslist (data) {
            let checked = [];
            let findPresentId = (data, present) => {
                for (let item of data) {
                    present = present || item.id;
                    if (this.getKeys.indexOf(item.id) > -1) {
                        checked.push(present);
                        break;
                    }
                    if (!item.isLeaf) {
                        findPresentId(item.children, item.id);
                    } 
                }      
            };  
            findPresentId(data);
            return checked;
        },    
        // 确认
        quire () {
            let keys = [];
            if (this.getKeys.length > 0) {
                keys.push(this.tree_data[0].id);
                keys = Array.from(new Set(keys.concat(this.getKeyslist(this.tree_data)).concat(this.getKeys))); // 数组去重
            }
            this.Http.post(URL.RIGHTS_EDIT, {
                userNo: this.useMsg.userNo,
                appCode: 'YSCM',
                rightIds: keys,
                appRole: 'Platform'
            }).then(re => {
                if (re.data === 'SUCCESS') {
                    this.$notify({
                        title: '成功',
                        message: '权限配置成功',
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
                appRole: 'Platform'
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
