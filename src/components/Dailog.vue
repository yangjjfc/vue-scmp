//基本的dailog弹框组件
<template>
    <section>
        <el-dialog :title="title" :visible.sync="shows" :size="size" :custom-class="classx"  :close-on-click-modal="close" :close-on-press-escape="close"  :before-close="cancel">
            <slot name='content'></slot>
            <span slot="footer" class="dialog-footer" >
                <el-button type="primary" @click="ok" v-if="!hide" >确 定</el-button>
                <el-button @click.sync="cancel" >关闭</el-button>
            </span>
        </el-dialog>
    </section>
</template>

<script>

export default {
    name: 'Dailog',
    data () {
        return {
            shows: false
        };
    },
    props: {
        show: { // 是否显示dailog
            type: Boolean,
            required: true,
            default () {
                return false;
            }
        },
        title: {
            type: String,
            required: true
        },
        size: { // dailog大小
            type: String,
            default () {
                return 'small';
            }
        },
        close: { // 禁用某些操作,可配置
            type: Boolean,
            default () {
                return true;
            }
        },
        classx: String, // 自定义class
        hide: [String, Boolean] // 隐藏按钮
    },
    watch: {
        show (val, oldval) {
            this.shows = this.show; // 监听show的变化
        }
    },
    created () {
        this.shows = this.show;
    },
    methods: {
        // 确认事件
        ok () {
            this.$emit('ok');
        },
        // 取消事件
        cancel () {
            this.shows = false;
            this.$emit('update:show', false); // 更新父组件shows
            this.$emit('reset');
        }
    }

};

</script>

<style  lang="scss" rel="stylesheet/scss">
  .el-dialog{
      min-width: 560px;
      overflow: hidden;
  } 
 @media screen and (max-height: 700px){
     .el-dialog__body{
        max-height: 400px;
        overflow:auto;
    }
}
@media (min-height: 700px) and (max-height: 800px) {
     .el-dialog__body{
        max-height: 435px;
        overflow:auto;
    }
}
@media (min-height: 800px) and (max-height: 900px) {
     .el-dialog__body{
        max-height: 535px;
        overflow:auto;
    }
}
@media (min-height: 900px) {
     .el-dialog__body{
        max-height: 660px;
        overflow:auto;
    }
}  
    

@media (min-width: 1380px)  {
     .el-dialog--small {
        width: 40%;
     }
}
       
// @media (min-width: 1500px)  {
//      .el-dialog--small {
//         width: 35%;
//      }
// }
</style>
