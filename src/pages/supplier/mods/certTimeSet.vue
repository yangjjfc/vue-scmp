//日志
<template>
    <section>
        <dailog size="tiny" :show.sync="myshow" title="时间设置"  @ok="quire">
            <el-form slot="content">
                <el-form-item label="无纸质证书期 : ">
                    <el-radio-group v-model="msgx" >
                        <el-radio :label="30">30天</el-radio>
                        <el-radio :label="60">60天</el-radio>
                        <el-radio :label="90">90天</el-radio>
                        <el-radio :label="180">180天</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
        </dailog>
    </section>
</template>   

<script>
const URL = {
    getTime: 'scm.platformSupplier.getSupplierPaperTime',
    updateTime: 'scm.platformSupplier.updateProviderPaperTime'
};
export default {
    name: 'supplier-certTimeSet',
    props: ['showx', 'transMsg'],
    data () {
        return {
            myshow: false, // 是否显示弹框
            msgx: 30 // 数据
        };
    },
    methods: {
        quire () {
            this.Http.post(URL.updateTime, {
                params: {
                    supplierNo: this.transMsg.no,
                    paperTime: this.msgx + ''
                }
            }).then((re) => {
                this.$notify({
                    title: '成功',
                    message: '设置成功',
                    type: 'success'
                });
                this.myshow = false;
            });
        },
        // 获取数据
        async getData () {
            await this.Http.post(URL.getTime, {
                supplierNo: this.transMsg.no
            }).then((re) => {
                if (re.data) {
                    this.msgx = parseInt(re.data);
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
    }

};

</script>

<style scoped lang="scss" rel="stylesheet/scss">

</style>
