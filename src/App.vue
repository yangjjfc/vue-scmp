<template>
    <div id="app">
        <transition name="router-fade" mode="out-in">
            <router-view></router-view>
        </transition>
    </div>
</template>

<script>
    export default {
        name: 'app'
    };
</script>

<style lang="scss" >
    @import './style/common';
    #app {
        // font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        font-size:12px;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
    }

    .router-fade-enter-active, .router-fade-leave-active {
        transition: opacity .3s;
    }
 
    .router-fade-enter, .router-fade-leave-active {
         opacity: 0;
    }
</style>   
