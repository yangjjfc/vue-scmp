<template >
<section class="container_setion">
    <dailog size="tiny" :show.sync="myshow" classx="staff-add-user" title="证件详情【销售承诺书】" @ok="quire">
        <div slot="content">
            <el-col :span="24" class="ui-table">
                <table>
                    <tr>
                        <td class="table_name">授权单位: </td>
                        <td><span v-text="result.higher"></span></td>
                    </tr>
                    <tr>
                        <td class="table_name">是否厂商授权: </td>
                        <td><span v-text="result.isAuthorized == '1'? '是':'否'"></span></td>
                    </tr>
                    <tr>
                        <td class="table_name">授权区域: </td>
                        <td><span v-text="result.zone"></span></td>
                    </tr>
                    <tr>
                        <td class="table_name">有效期: </td>
                        <td>
                            {{result.startTime}} 至 <span v-if="result.longTerm == 1">长期</span> <span v-else>{{result.endTime}}</span>
                        </td>
                    </tr>
                    <tr>
                        <td class="table_name">授权书: </td>
                        <td>
                            <div class="clear">
                            <fileList :files="result.url"></fileList>
                            </div>
                            <p ><el-button size="mini" type="link"  @click="print(result.url)">打印</el-button></p>
                        </td>
                    </tr>
                    <tr>
                        <td class="table_name">授权清单: </td>
                        <td>
                            <div class="clear">
                            <fileList :files="result.supplierAuthorizeDataListImg"></fileList>
                            </div>
                            <p> <el-button size="mini" type="link" @click="print($event,result.supplierAuthorizeDataListImg)">打印</el-button></p>
                        </td>
                    </tr>
                </table>
            </el-col>
            <el-col :span="24">
                <iframe src="/static/tpl/printTpl.html" id="FILEtoPrint"></iframe>
            </el-col>
        </div>
    </dailog>
</section>
</template>
<script>
    import pagination from '@/components/pagination';
    import dailog from '@/components/Dailog';
    import fileList from '@/components/FileList.vue';
    import {getFileType} from '@/services/global.common';
    import CONFIG from '@/config/app.config'; // 配置
    const URL = {
        DETAIL: 'scm.platformCert.selectAuthorizeCert' // 
       
    };
    export default {
        name: 'auth-detail',
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
                            certNo: this.cert.certNo,
                            supplierNo: this.cert.supplierNo
                        }
                    }).then((re) => {
                        this.result = re.data;
                        this.result.supplierAuthorizeDataListImg = this.result.supplierAuthorizeDataList.map(item => item.url);
                    });
            },
            print (evt, src) {
                let fullUrl = CONFIG.IMAGE_DOWNLOAD + src;
                if (getFileType(fullUrl) === 'pdf') {
                    $(evt).siblings('a').trigger('click');
                } else {
                    $(document.getElementById('FILEtoPrint').contentWindow.document.getElementById('img_top')).attr('src', fullUrl).show();
                    setTimeout(function () {
                        document.getElementById('FILEtoPrint').contentWindow.print();
                    }, 500);
                }
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
    #FILEtoPrint{
        display:none;
    }
</style>
