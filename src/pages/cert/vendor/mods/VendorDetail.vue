<template src="./vendorDetail.html">
</template>
<script>
    import pagination from '@/components/pagination';
    import dailog from '@/components/Dailog';
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
            this.getData();
            this.myshow = this.showx;
        },
        methods: {
            // 获取列表
            getData () {
                this.Http.post(URL.DETAIL,
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
    .factoryCertList li:not(:last-child){
        border-bottom: dashed 1px #ccc;
    }
</style>
