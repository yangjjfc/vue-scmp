/**分页插件*/
<template>
    <div class="quire_box" v-show="showx" @click.stop="">
        <section class="quire_container">
            <slot name="quire_content"></slot>
        </section>
        <footer class="quire_footer">
            <el-pagination  layout="prev, next" :pageIndex="pageIndex" :pageSize="pageSize" :total="total" class="left quire_pagination"></el-pagination>
            <div class="right mgr10">
                <el-input placeholder=""   size="small" class="w200"></el-input>
                <el-button type="primary" size="small" class="">筛选</el-button>
                <el-button   size="small" class="mgl5">重置</el-button>
            </div>
        </footer>
    </div>
</template>
<script>
import {addEvent} from '@/services/global.common';
export default {
    name: 'queryList',
    data () {
        return {
            show: false
        };
    },
    // 需要传的参数
    props: {
        total: {
            type: [Number],
            required: true
        },
        pageIndex: {
            type: [Number],
            required: true
        },
        pageSize: {
            type: [Number],
            required: true
        },
        showx: {
            type: Boolean,
            default () {
                return false;
            }
        }
    },
    created () {
        addEvent(window, 'click', () => {
            if (this.showx) {
                this.$emit('update:showx', false);
            }
        });
    }
};
</script>

<style lang="scss" scoped rel="stylesheet/scss">
$width:500px;
$height:250px;
$bottom_height:45px;
.quire_box {
    position: absolute;
    z-index: 3333;
    background: #fff;
    max-height: $height;
    border: 1px solid #d1dbe5;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);
    width: 100%;
    .quire_footer {
        height: $bottom_height;
        border-top: 1px #f4f4f4 dashed;
        .quire_pagination{
            position: relative;
            top:2px;
        }
    }
    .quire_container {
        height: $height - $bottom_height;
        width: 100%;
        overflow: hidden;
        overflow-y: auto;
        li {
            line-height: 20px;
            color: #666;
            padding: 5px 10px;
            cursor: pointer;
            &:hover{
                background-color: #f4f4f4;
                color: #00a2b3;
            }
        }
    }
}
</style>
