//编辑用户电话和联系人
<template>
      <el-col :span="24" >
        <transition name="fade" mode="out-in">
            <router-view></router-view>
        </transition>
    </el-col>
</template>

<script>

export default {
    name: 'chart',
    data () {
        return {
        };
    } 
};

</script>

<style scoped lang="scss" rel="stylesheet/scss">

</style>
