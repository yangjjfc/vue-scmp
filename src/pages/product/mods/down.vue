//编辑用户电话和联系人
<template>
    <section>
        <dailog size="tiny" :show.sync="myshow"  title="产品强制下架" @ok="ok" >
            <el-form slot="content" ref="forms" label-width="100px" class="demo-dynamic" :model="msgx">
                <el-form-item label="请选择" >
                     <el-select v-model="msgx.search_date.value" size="small" @change="change" style="width:100%">
                            <el-option v-for="item in msgx.search_date.options" :label="item.label" :value="item.value" :key="item.label"></el-option>
                        </el-select>
                </el-form-item>
                <el-form-item label="解除原因" prop="reson"   
                :rules="[{ required: true, message: '请输入强制下架原因', trigger: 'blur,change' }]">
                    <el-input type="textarea" placeholder="强制下架原因" v-model="msgx.reson"  :rows="4" size="small"></el-input>
                </el-form-item>
            </el-form>
        </dailog>
    </section>
</template>

<script>
const URL = {
    DOWN: 'scm.product.modOffShelfForceProduct'
};
export default {
    name: 'relieve',
    props: ['showx', 'transMsg'],
    data () {
        return {
            myshow: false, // 是否显示弹框
            msgx: {
                search_date: {
                    options: [{
                        value: 1,
                        label: '无需理由'
                    },
                    {
                        value: 2,
                        label: '非法销售'
                    },
                    {
                        value: 3,
                        label: '产品已过期'
                    },
                    {
                        value: 4,
                        label: '其他'
                    }],
                    value: 1
                },
                reson: '无需理由'
            }// 数据
        };
    },
    methods: {
        // 确认
        ok () {
            this.$refs.forms.validate((valid) => {
                if (!valid) {
                    return false;
                } else {
                    this.Http.post(URL.DOWN, {
                        params: {
                            productNo: this.transMsg.no,
                            reason: this.msgx.reson
                        }
                    }).then((re) => {
                        if (re.code === 'SUCCESS') {
                            this.$notify({
                                title: '成功',
                                message: '产品强制下架成功',
                                type: 'success'
                            });
                            this.$emit('refresh');
                            this.myshow = false;
                        }
                    });
                }
            });
        },
        change (val) {
            for (let item of this.msgx.search_date.options) {
                if (item.value === val) {
                    this.msgx.reson = item.label;
                }
            }
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
    }

};

</script>

<style scoped lang="scss" rel="stylesheet/scss">
.el-form-item {
    margin-bottom: 10px;
}
</style>
