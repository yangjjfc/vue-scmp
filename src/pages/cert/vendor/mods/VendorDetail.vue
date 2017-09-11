<template>
    <section >
        <dailog size="tiny" :show.sync="myshow" classx="staff-add-user" title="证件详情【生产厂商证照】" :hide="true">
            <div slot="content">
                <el-col :span="24" class="ui-table">
                    <table>
                        <tr>
                            <td class="table_name">供应商名称: </td>
                            <td>
                                <span v-text="result.supplierName"></span>
                            </td>
                        </tr>
                        <tr>
                            <td class="table_name">厂商类型: </td>
                            <td>
                                <span>{{ result.factoryType == '1' ? '境内':'境外' }}</span>
                            </td>
                        </tr>
                        <tr>
                            <td class="table_name">厂商名称: </td>
                            <td>
                                <span v-text="result.factoryName"></span>
                            </td>
                        </tr>
                        <tr>
                            <td class="table_name">证件图片: </td>
                            <td>
                                <ul class="factoryCertList">
                                    <li class="clear" v-for="item in result.factoryCertList">
                                        <div class="pull-left">
                                            <fileList :files="item.fileUrl"></fileList>
                                        </div>
                                        <div class="fl">
                                            <dl>
                                                <dd>
                                                    <h5 class="green" v-text="item.certName"></h5>
                                                </dd>
                                                <dd>证件编号 : {{ item.certCode }}</dd>
                                                <dd>证件效期 : {{item.startTime}} 至 {{item.endTime}}</dd>
                                            </dl>
                                        </div>
                                    </li>
                                </ul>
                            </td>
                        </tr>
                    </table>
                </el-col>
            </div>
        </dailog>
    </section>
</template>
<script>
import fileList from '@/components/FileList.vue';
const URL = {
    DETAIL: 'scm.platformCert.getFactory' // 

};
export default {
    name: 'preserve-detail',
    data () {
        return {
            result: {},
            myshow: false // 是否显示弹框
        };
    },
    props: {
        cert: {
            type: Object
        },
        showx: { // 显示
            type: Boolean,
            require: true
        }
    },
    watch: {
        myshow (val, oldval) {
            this.grayCert = '';
            if (oldval && !val) {
                this.$emit('update:showx', false);
            }
        }
    },
    beforeMount () {
        this.getData().then(() => {
            this.myshow = this.showx; 
        }).catch(() => {
            this.$emit('update:showx', false);
        });
    },
    methods: {
        // 获取列表
        async getData () {
            await this.Http.post(URL.DETAIL,
                {   
                    params: {
                        factoryNo: this.cert.certNo
                    }
                }).then((re) => {
                    this.result = re.data;
                    this.result.factoryCertList.forEach(item => {
                        switch (item.certType) {
                        case '0':
                            item.certName = '三证合一';
                            break;
                        case '1':
                            item.certName = '营业执照';
                            break;
                        case '2':
                            item.certName = '生产许可证';
                            break;
                        case '3':
                            item.certName = '税务登记证';
                            break;
                        case '4':
                            item.certName = '组织机构代码证';
                            break; 
                        default:
                            break;
                        }
                    });
                });
        },

        // 确定
        quire () {
            this.myshow = false;
        }
    },
    mounted () {

    },
    components: {
        fileList
    }
};

</script>

<style lang="scss">
h3 {
    line-height: 30px;
}

.align-right {
    text-align: right;
    font-size: 16px;
}

.factoryCertList li:not(:last-child) {
    border-bottom: dashed 1px #ccc;
}
</style>
