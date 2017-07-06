<template>
    <section class="container_setion">
       <dailog size="small" :show.sync="myshow" classx="staff-add-user"  title="证件维护" @ok="quire">
            <div slot="content">
                <el-col :span="24" class="ui-table">
                    <h3>供应商信息</h3>
                    <table  >
                        <tr>
                            <td>供应商编号: <span v-text="product.supplierNo"></span></td>
                            <td>供应商名称: <span v-text="product.supplierName"></span></td>
                        </tr>
                        <tr>
                            <td>注册证编号: <span v-text="product.certIssuedNo"></span></td>
                            <td>产品名称	: <span v-text="product.productName"></span></td>
                        </tr>
                        <tr>
                            <td>生产厂家名称: <span v-text="product.facEnterpriseName"></span></td>
                            <td>有效期: <span>
                                {{ product.startTime}} 至  <span v-if="product.isLong">长期</span> <span v-else>{{ product.endTime}} </span> 
                            </span></td>
                        </tr>
                        <tr>
                            <td>产地类型: <span v-text="product.isAbroad"></span></td>
                            <td>存储条件: <span v-text="product.storeCondiValidtime"></span></td>
                        </tr>
                        <tr>
                            <td>有效周期: <span >{{ product.expiryDate}} {{ product.expiryUnitName}} </span></td>
                            <td>品牌名称: <span v-text="product.brandName"></span></td>
                        </tr>
                        <tr>
                            <td>结构及组成: <span v-text="product.structureFrom"></span></td>
                            <td>适用范围（预期用途）: <span v-text="product.rangeUse"></span></td>
                        </tr>
                        <tr>
                            <td>质量标准: <span v-text="product.productStandards"></span></td>
                            <td>备注: <span v-text="product.otherRemark"></span></td>
                        </tr>
                    </table>
                    <el-table :data="existProd" border>
                        <el-table-column prop="index" label="序号" width="80" align="center" >
                        </el-table-column>
                        <el-table-column prop="productNo" label="产品编号" min-width="120" align="center" >
                        </el-table-column>
                        <el-table-column prop="registNo" label="注册证编号" min-width="120" align="center" >
                        </el-table-column>
                         <el-table-column prop="spec" label="规格" min-width="80" align="center" >
                        </el-table-column>
                         <el-table-column prop="unit" label="计量单位" width="100" align="center" >
                        </el-table-column>
                         <el-table-column prop="index" label="注册证图片" width="120" align="center" >
                         <template scope="scope">
                            <fileList size="small" :files="scope.row.registImg"></fileList>
                         </template>
                        </el-table-column>
                    </el-table>
                </el-col>
                <el-col :span="24" class="ui-table">
                    <el-tabs type="border-card" @tab-click="changeType" v-model="activeTab">
                        <el-tab-pane label="手动上传" name="hand">
                            <table>
                            
                            <tbody>
                            <tr>
                                <td class="table_name">注册证主图</td>
                                <td> <FileUpload max = 1 :files.sync= "files" ></FileUpload> </td>
                            </tr>
                            <tr>
                                <td class="table_name">注册证附件</td>
                                <td> <FileUpload max = 4 :files.sync= "plugsImg"></FileUpload> </td>
                            </tr>
                            </tbody>
                            </table>
                        </el-tab-pane>
                        <el-tab-pane label="自动更新" v-if="showReg" name="auto">
                            <table>
                                <tbody>
                                <tr>
                                    <td class="table_name">注册证图</td>
                                    <td> 
                                        <fileList max=5 :files="grayCert" showChoose="true" @changeChecked="changeChecked"></fileList> 
                                    </td>
                                </tr>
                                </tbody>
                            </table>
                        </el-tab-pane>
                    </el-tabs>
                </el-col>
            </div>
        </dailog>
    </section>
</template>
<script>
    import fileList from '@/components/FileList.vue';
    import FileUpload from '@/components/FileUpload.vue';
    const URL = {
        DETAIL: 'scm.platformCert.supplyRegistDetail', // 订单编号查询
        UPDATE: 'scm.platformCert.modSupplyRegist',
        PREVIEWIMG: 'scm.platformCert.previewImg' // 证件签章预览
    };
    export default {
        name: 'preserve-detail',
        data () {
            return {
                files: [],
                plugsImg: [], // 附件
                grayCert: '',
                activeTab: 'hand', // 选中的tab
                checkd: '', // 选中的图片
                myshow: false, // 是否显示弹框
                showReg: false,
                product: {},
                existProd: []
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
            changeChecked (src) {
                this.checkd = src;
            },
            // 获取列表
            getData () {
                let param = {
                    basicProductNo: this.cert.basicProductNo,
                    supplierNo: this.cert.supplierNo
                };
                this.Http.post(URL.DETAIL,
                    {
                        params: param
                    }).then((re) => {
                        this.product = re.data.product;
                        this.showReg = re.data.showReg;
                        this.product.supplierNo = this.cert.supplierNo;
                        this.product.supplierName = this.cert.supplierName;
                        this.product.endDate = (this.product.startTime || '') + (this.product.startTime ? ' 至 ' : '') + (this.product.isLong ? '长期' : (this.product.endTime || ''));
                        this.product.isAbroad = this.product.isAbroad === 1 ? '境内' : '境外';
                        this.existProd = re.data.existProd.map((item, index) => {
                            item.index = index + 1;
                            return item;
                        });
                    });
            },
            // 获取灰度图片
            getGray () {
                this.Http.post(URL.PREVIEWIMG, {
                    params: {
                        registImg: this.product.certImg,
                        supplierNo: this.product.supplierNo + ''
                    }
                }).then(result => {
                    this.grayCert = result.data;
                });
            },
            changeType (tag) {
                !this.grayCert && this.getGray();
            },
            // 确定
            quire () {
                 // 自动基础库更新
                if (this.activeTab === 'auto') {
                    if (this.checkd) {
                        this.commit({
                            topUrl: this.checkd
                        });
                    } else {
                        this.$message({
                            message: '请选择注册证',
                            type: 'warning'
                        });
                    }
                } else { // 手工上传
                    if (this.files.length) {
                        this.commit({
                            topUrl: this.files.join(';'),
                            registImgAttach: this.plugsImg.join(';')
                        });
                    } else {
                        this.$message({
                            message: '请先上传注册证',
                            type: 'warning'
                        });
                    }
                }
            },
            // 提交注册证更新
            commit (param) {
                this.Http.post(URL.UPDATE, {
                    params: Object.assign({
                        supplierNo: this.cert.supplierNo,
                        basicProductNo: this.cert.basicProductNo
                    }, param)
                }).then(result => {
                    this.$message({
                        message: '上传成功',
                        type: 'success'
                    });
                    this.existProd.forEach(item => {
                        item.registImg = this.files;
                    });
                    this.$emit('update');
                });
            }
        },
        mounted () {
        
        },
        components: {
            FileUpload,
            fileList
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
