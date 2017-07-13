//添加客户
<template>
        <el-form label-width="100px" class="demo-dynamic" :model="msg" :rules="rules" ref="forms" >
            <div class="contenttitle_certs_title">
                <p>{{msg.name}}</p>
            </div>
            <el-form-item label="证件号码" prop="certNo">
                <el-input placeholder="证件号码" v-model.trim="msg.certNo" size="small"></el-input>
            </el-form-item>
            <el-form-item label="开始时间" class="stateTime" prop="startTime">
                <el-date-picker v-model.trim="msg.startTime" type="date" placeholder="开始日期" :picker-options="pickerOptions_sta"  :editable="false" @change="dateChangeTime_sta" ref="startTime" size="small">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="截止日期" class="endTime" prop="endTime">
                <el-date-picker v-model.trim="msg.endTime" type="date" placeholder="结束日期" :disabled="offEndTime" :picker-options="pickerOptions_end"  :editable="false" @change="dateChangeTime_end" ref="endTime" size="small">
                </el-date-picker>
                <el-checkbox label="长期" name="type" v-model="msg.lonrTime" @click.native="checked" class="long"></el-checkbox>
            </el-form-item>
            </div>
            <el-form-item label="证件图片" prop="imgs" class="img-form">
                <template scope="scope" >
                    <el-input placeholder="证件图片" size="small" v-model="msg.imgs" v-show="false"></el-input>
                    <file-upload :files.sync="msg.imglist" :max="1" :classx="msg.class" @getUrl="getUrl"></file-upload>
                    <span class="tips">支持格式 : png. jpg. bmp. gif. pdf , 大小不超过5MB</span>
                </template>
            </el-form-item>
        </el-form>
</template>   
<script>
import fileUpload from '@/components/FileUpload';
import {format} from '@/services/global.common';
export default {
    name: 'staff-certs',
    props: {
        transMsg: { // 编辑用户数据
            type: Object
        },
        verify: {
            type: Boolean
        }
    },
    data () {
        return {
            msg: {
            
            }, 
            pickerOptions_sta: {}, // 开始时间
            pickerOptions_end: {}, // 结束时间
            disabledDate_sta: '', // 开始禁用区域
            disabledDate_end: '', // 结束禁用区域
            offEndTime: false, // 禁用
            rules: {
                certNo: [{ pattern: /^\S{0,30}$/, message: '证件号码不能超过30个字符', trigger: 'blur,change' }]
            }
        };
    },
    methods: {
        // 模拟图片长传,添加input值,方便验证表单
        getUrl (data) {
            // this.msg.imglists = data;
            if (data.length > 0) {
                this.msg.imgs = '123';
            } else {
                this.msg.imgs = '';
            }
        },
        // 开始
        dateChangeTime_sta (val) {
            this.msg.startTime && (this.msg.startTime = format(this.msg.startTime, 'yyyy-MM-dd')); 
            this.disabledDate_end = this.$refs.startTime.value;
            this.$emit('update:startTime', val);
            this.$emit('changeTime_sta', val);
        },
        // 结束
        dateChangeTime_end (val) {
            this.msg.endTime && (this.msg.endTime !== '2099-01-01') && (this.msg.endTime = format(this.msg.endTime, 'yyyy-MM-dd'));
            this.disabledDate_sta = this.$refs.endTime.value;
            if (!this.msg.lonrTime) {
                this.$emit('update:full', val);
            }
            this.$emit('update:endTime', val);
            this.$emit('changeTime_end', val);
        },
        // 长期
        checked () {
            if (this.msg.lonrTime) {
                this.$refs.forms.validateField('endTime');
                this.msg.endTime = '2099-01-01';
                this.offEndTime = true;
            } else {
                this.msg.endTime = '';
                this.offEndTime = false;
            }
        }
    },
    watch: {
        // 开始禁用区域
        disabledDate_sta (val) {
            if (!val) {
                val = '1495900800000000000000000000';
            }
            this.pickerOptions_sta = {
                disabledDate (time) {
                    return time.getTime() > val;
                }
            };
        },
        // 结束禁用区域
        disabledDate_end (val) {
            this.pickerOptions_end = {
                disabledDate (time) {
                    return time.getTime() < val;
                }
            };
        }
       
    },
    beforeMount () {
        // 判断类型校验数据 
        this.msg = this.transMsg;
        if (this.transMsg.require) {
            this.rules = { ...this.rules,
                certNo: [   
                    { required: true, message: '请输入证件号码', trigger: 'blur,change' },
                    { pattern: /^\S{0,30}$/, message: '证件号码不能超过30个字符', trigger: 'blur,change' }
                ],
                startTime: [
                    { required: true, message: '请输入开始时间', trigger: 'blur,change' }
                ],
                endTime: [
                    { required: true, message: '请输入结束时间或勾选长期', trigger: 'blur,change' }
                ],
                imgs: [
                     { required: true, message: '请上传证件图片', trigger: 'blur,change' }
                ] };
        }
    },
    components: {
        fileUpload
    }

};

</script>

<style scoped lang="scss" rel="stylesheet/scss">

.content_title {
    background: orange;
    color: #fff;
    text-transform: uppercase;
    -moz-border-radius: 2px 2px 0 0;
    -webkit-border-radius: 2px 2px 0 0;
    border-radius: 2px 2px 0 0;
    font-size: 14px;
    font-weight: normal;
    line-height: 30px;
    padding: 0 8px;
    margin: 10px 0;
}

.contenttitle_certs_title {
    border-bottom: 3px solid orange;
    overflow: hidden;
    margin: 10px 0;
    p {
        background: orange;
        color: #fff;
        height: 32px;
        line-height: 32px;
        padding: 0 20px;
        font-weight: bold;
        display: inline-block;
    }
}
.el-form-item {
    margin: 0 auto;
    width: 80%;
}
.el-date-editor.el-input{
    width: 100%
}

.editTime{
    width:100%;
   
}
.long{
     position: absolute;
    top: 1px;
    right: -60px;
}

</style>
