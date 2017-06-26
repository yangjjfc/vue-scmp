//添加客户
<template>
    <section>
        <dailog size="tiny" :show.sync="myshow" classx="change-name" title="修改姓名" @ok="quire" >
            <el-form slot="content" label-width="100px" ref="forms" class="demo-dynamic" :model="msgx">
                <el-form-item label="原真实姓名" prop="rename">
                    <el-input placeholder="原真实姓名" :disabled="true" v-model.trim="msgx.rename"></el-input>
                </el-form-item>
                <el-form-item label="新真实姓名" prop="nowname" :rules="[{ required: true, message: '请输入姓名', trigger: 'blur' },
                        {pattern:/^\S{0,30}$/ , message: '姓名不能超过30个字符',trigger: 'blur,change'}]">
                    <el-input placeholder="新真实姓名" v-model.trim="msgx.nowname"></el-input>
                </el-form-item>
            </el-form>
        </dailog>
    </section>
</template>   

<script>
const URL = {
    CHANGE_NAME: 'ypt.open.user.modifyUserNameForWeb' // 修改姓名
};
import dailog from '@/components/Dailog';
import { mapGetters } from 'vuex';
export default {
    name: 'changeName',
    props: {
        showx: {
            type: Boolean,
            required: true,
            default () {
                return false;
            }
        },
        msgx: {
            type: Object,
            required: true,
            default () {
                return {
                    rename: '',
                    nowname: ''

                };
            }
        }
    },
    data () {
        return {
            myshow: false
        };
    },
    computed: {
        ...mapGetters([
            'userno'
        ])
    },
    methods: {
        quire () {
            this.$refs.forms.validate((valid) => {
                if (!valid) {
                    return false;
                } else {
                    this.Http.post(URL.CHANGE_NAME, {
                        params: {
                            userNo: this.userno,
                            userName: this.msgx.nowname
                        }
                    }).then((re) => {
                        if (re.data) {
                            this.$notify({
                                title: '成功',
                                message: '修改成功',
                                type: 'success'
                            });
                            this.$emit('refresh');
                            this.myshow = false;
                        }
                    });
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
.el-form-item {
    margin-bottom: 22px;
}
</style>
