<template >
<section class="container_setion">
    <dailog size="tiny" :show.sync="myshow" classx="staff-add-user" title="证件详情【法人委托书】" @ok="quire">
        <div slot="content">
            <el-col :span="24" class="ui-table">
                <table>
                    <tr>
                        <td class="table_name">供应商名称: </td>
                        <td><span v-text="result.supplierName"></span></td>
                    </tr>
                    <tr>
                        <td class="table_name">客户名称: </td>
                        <td>
                            <span v-text="result.customerName"></span>
                        </td>
                    </tr>
                    <tr>
                        <td class="table_name">员工真实姓名: </td>
                        <td>
                            <span v-text="result.salerName"></span>
                        </td>
                    </tr>
                    <tr>
                        <td class="table_name">手机号码: </td>
                        <td>
                            <span v-text="result.salerPhone"></span>
                        </td>
                    </tr>
                    <tr>
                        <td class="table_name">证件效期: </td>
                        <td>
                            {{result.startTime}} 至 {{result.endTime}}
                        </td>
                    </tr>
                    <tr>
                        <td class="table_name">证件图片: </td>
                        <td>
                            <fileList :files="result.url"></fileList>
                        </td>
                    </tr>
                    
                    <tr>
                        <td class="table_name">身份证照片: </td>
                        <td>
                            <fileList :files="result.idCardurl"></fileList>
                        </td>
                    </tr>
                </table>
            </el-col>
        </div>
    </dailog>
</section>
</template>
<script>
    import pagination from '@/components/pagination';
    import dailog from '@/components/Dailog';
    import fileList from '@/components/FileList.vue';
    
    const URL = {
        DETAIL: 'scm.platformCert.getSupplierEntrustForCustomer' // 
       
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
            this.getData();
            this.myshow = this.showx;
        },
        methods: {
            // 获取列表
            getData () {
                this.Http.post(URL.DETAIL,
                    {
                        params: {
                            certNo: this.cert.certNo
                        }
                    }).then((re) => {
                        this.result = re.data; 
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
            dailog,
            fileList,
            pagination
        }
    };

</script>

<style lang="scss">
   
    h3{
        line-height:30px;
    }
    .align-right{
        text-align:right;
        font-size:16px;
    }
    
</style>
