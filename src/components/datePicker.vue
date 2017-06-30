<template>
    <div class="block">
        <div v-if="timeType=='1'">
            <el-date-picker v-model="value_sta" 
            :type="type" placeholder="开始日期" 
            :picker-options="pickerOptions_sta" 
            :readonly="readonly" :editable="editable" 
            @change="dateChangeTime_sta"
            ref="startTime" size="small" :class="classx">
            </el-date-picker>
            <slot name="between"></slot>
            <el-date-picker v-model="value_end" 
            :type="type" placeholder="结束日期" 
            :picker-options="pickerOptions_end" 
            :readonly="readonly" :editable="editable" 
            @change="dateChangeTime_end"
            ref="endTime" size="small" :class="classx">
            </el-date-picker>
        </div>
        <div v-if="timeType=='2'" >
            <el-form-item label="开始时间"  class="stateTime"  :rules="rules.startTime" :prop="prop.startTime">
                <el-date-picker v-model="value_sta" 
                :type="type" placeholder="开始日期" 
                :picker-options="pickerOptions_sta" 
                :readonly="readonly" :editable="editable" 
                @change="dateChangeTime_sta"
                ref="startTime" size="small" :class="[classx,timeCLassx]" 
                >
                </el-date-picker>
            </el-form-item>
            <el-form-item label="截止日期"  class="endTime"  :rules="rules.endTime" :prop="prop.endTime">
                <el-date-picker v-model="value_end" 
                :type="type" placeholder="结束日期" 
                :disabled="offEndTime"
                :picker-options="pickerOptions_end" 
                :readonly="readonly" :editable="editable" 
                @change="dateChangeTime_end"
                ref="endTime" size="small" :class="[classx,timeCLassx]"
                >
                </el-date-picker>
                <el-checkbox label="长期" name="type" v-model="checked" class="long"></el-checkbox>
            </el-form-item>
        </div>
    </div>
</template>
<script>
// return time.getTime() < Date.now() - 8.64e7; 只能选今天之后的时间
export default {
    name: 'datePicker',
    data () {
        return {
            pickerOptions_sta: {}, // 开始时间
            pickerOptions_end: {}, // 结束时间
            value_sta: '', // 开始值
            value_end: '', // 结束值
            disabledDate_sta: '', // 开始禁用区域
            disabledDate_end: '', // 结束禁用区域
            checked: false, // 长期选择
            offEndTime: false, // 禁用
            timeCLassx: 'editTime'
        };
    },
    props: {
        placeholder: {},
        readonly: { // 只读
            type: Boolean,
            default () {
                return false;
            }
        },
        editable: { // 是否可编辑
            type: Boolean,
            default () {
                return false;
            }
        },
        type: { // 日期类型
            type: String,
            default () {
                return 'date';
            }
        },
        rules: { // 规则
            type: Object,
            default () {
                return {startTime: [], endTime: []};
            }
        },
        prop: { // 规则
            type: Object,
            default () {
                return {startTime: '', endTime: ''};
            }
        },
        timeType: { // 模式 '1','2','3'
            type: String,
            default () {
                return '1';
            }
        },
        startTime: [String, Number],
        endTime: [String, Number],
        full: [String, Number],
        classx: String // 自定义class
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
        },
        checked (val, oldval) {
            this.$emit('update:isLong', val);
            if (val && !oldval) {
                this.$emit('update:full', 1);
                this.value_end = '';
                this.offEndTime = true;
            } else {
                this.$emit('update:full', '');
                this.offEndTime = false;
            }
        }
    },
    methods: {
        // 开始
        dateChangeTime_sta (val) {
            this.disabledDate_end = this.$refs.startTime.value;
            this.$emit('update:startTime', val);
            this.$emit('changeTime_sta', val);
        },
        // 结束
        dateChangeTime_end (val) {
            this.disabledDate_sta = this.$refs.endTime.value;
            if (!this.checked) {
                this.$emit('update:full', val);
            }
            this.$emit('update:endTime', val);
            this.$emit('changeTime_end', val);
        }
    }
};
</script>
<style lang="scss" scoped rel="stylesheet/scss">
.stateTime,.endTime{
    width:80%;
    margin: 0 auto;
}
.editTime{
    width:100%;
   
}
.long{
     position: absolute;
    top: 7px;
    right: -60px;
}
</style>
