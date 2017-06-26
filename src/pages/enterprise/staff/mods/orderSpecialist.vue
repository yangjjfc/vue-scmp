//设置订单专员
<template>
    <section>
        <dailog size="tiny" :show.sync="myshow"  :title="myTitle" @ok="quire">
            <el-form slot="content"  ref="forms" label-width="100px" class="demo-dynamic" :model="useMsg">
                <el-form-item label="登录账号"  >
                     <p v-text="useMsg.loginAccount"></p>
                </el-form-item>
                <el-form-item label="真实姓名">
                     <p v-text="useMsg.userName"></p>
                </el-form-item>
                <el-form-item>
                   <p class="tips" v-text="tipsInfo"></p>
                </el-form-item>
            </el-form>
        </dailog>
    </section>
</template>   

<script>
'use strict';
const URL = {
    ORDERSPECIALIST: 'scm.enterprise.modOrderSpecialist' // 订单专员设置
};
import dailog from '@/components/Dailog';
export default {
    name: 'staff-orderSpecialist',
    props: {
        showx: { // 显示
            type: Boolean,
            require: true
        },
        type: { // 'edit'/'add'
            type: String,
            require: true
        },
        useMsg: { // 编辑用户数据
            type: Object
        }
    },
    data () {
        return {
            myshow: false // 是否显示弹框
        };
    },
    computed: {
        myTitle () {
            return this.type === '1' ? '设置订单专员' : '取消订单专员';
        },
        tipsInfo () {
            return this.type === '1' ? '设置订单专员成功后,授权的客户下单时将会发送短信通知' : '取消订单专员成功后,授权的客户下单时将不会发送短信通知(如果未给客户设置订单专员,订单将无法上传)';
        }
    },
    methods: {
        // 确认
        quire () {
            this.Http.post(URL.ORDERSPECIALIST, {
                params: {
                    userNo: this.useMsg.userNo,
                    orderSpecialist: this.type
                }
            }).then((re) => {
                if (re.data) {
                    this.$notify({
                        title: '成功',
                        message: this.type === '1' ? '设置订单专员成功' : '取消订单专员成功',
                        type: 'success'
                    });
                    this.myshow = false;
                    this.$emit('refresh');
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
        this.myshow = this.showx;
    },
    components: {
        dailog
    }

};

</script>

<style scoped lang="scss" rel="stylesheet/scss">
.demo-dynamic{
    width: 80%
}
.tips{
    line-height: 20px;
    background-position-y: 3px;
}
</style>
