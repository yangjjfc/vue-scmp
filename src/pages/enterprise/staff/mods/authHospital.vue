//授权客户
<template>
    <section>
        <dailog size="tiny" :show.sync="myshow" classx="" title="客户授权" @ok="quire">
            <el-transfer slot="content" v-model="value" :data="data" :titles="titles" :props="defaultProps" @change="change"></el-transfer>
        </dailog>
    </section>
</template>   

<script>
'use strict';
const URL = {
    DEL_AUTHORIY: 'scm.enterprise.modRemoveStaffAuthoriy', // 删除订单权限
    ADD_AUTHORIY: 'scm.enterprise.saveStaffAuthoriy', // 添加订单权限
    STAFFRELLIST: 'scm.enterprise.queryStaffRelList', // 查询已关联订单权限列表
    STAFFNORELLIST: 'scm.enterprise.queryStaffNorelList' // 查询未关联订单权限列表
};
import dailog from '@/components/Dailog';
export default {
    name: 'staff-authHospital',
    props: {
        showx: { // 显示
            type: Boolean,
            require: true
        },
        useMsg: {}
    },
    data () {
        return {
            data: [],
            value: [],
            titles: ['未授权客户', '已授权客户'],
            defaultProps: {
                key: 'customerNo',
                label: 'customerName'
            },
            myshow: false // 是否显示弹框
        };
    },
    computed: {

    },
    methods: {
        // 确认
        quire () {
            this.Http.post(URL.ADD_AUTHORIY, {
                params: {
                    userNo: this.userMsg.userNo
                   // enterpriseNoList: movedKeys
                }
            });
            this.Http.post(URL.DEL_AUTHORIY, {
                params: {
                    userNo: this.userMsg.userNo
                 //   enterpriseNo: movedKeys
                }
            });
        },
        change (value, direction, movedKeys) {
           // console.log(value, direction, movedKeys);
        },
        // 获取数据
        async getData () {
            let [bindAuth, unbindAuth] = await Promise.all([
                this.Http.post(URL.STAFFRELLIST, {
                    params: {
                        userNo: this.useMsg.userNo
                    }
                }),
                this.Http.post(URL.STAFFNORELLIST, {
                    params: {
                        userNo: this.useMsg.userNo
                    }
                })
            ]);
            return {bindAuth, unbindAuth};
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
        this.getData().then(({bindAuth, unbindAuth}) => {
            let msg = [], values = [];
            if (bindAuth.data && bindAuth.data.length > 0) {
                for (let item of bindAuth.data) {
                    msg.push(item);
                    values.push(item.customerNo);
                }
            }
            this.value = values;
            if (unbindAuth.data && unbindAuth.data.length > 0) {
                for (let item of unbindAuth.data) {
                    msg.push(item);
                }
            }
            this.data = msg;
            this.myshow = this.showx;
        }).catch(err => { throw new Error(err); });
    },
    components: {
        dailog
    }

};

</script>

<style scoped lang="scss" rel="stylesheet/scss">

</style>
