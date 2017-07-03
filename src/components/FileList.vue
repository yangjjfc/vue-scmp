<template>
    <ul class="fileList list-inline">
        <li v-for="item in list" :key="item">
         <a class="boxer" :href="item.fullUrl" v-boxer="item.fullUrl" >
            <img :src="item.thumbnail" :width="width" :height="width">
        </a>
        <p class="text-center" v-if="showChoose">
            <input type="radio" v-model="checked" :value="item.url" />
        </p>
        </li>
    </ul>
</template>
<script>
import { changeImgSize, getFileType } from '@/services/global.common'; // 文件格式
import CONFIG from '../config/app.config'; // 配置
import pdf from '@/assets/images/pdf.png'; // daf
import defaultImg from '@/assets/images/noimage.png';
import '../assets/directive/vueDirective.js'; // jq boxer指令
export default {
    data () {
        return {
            checked: '',
            width: '',
            list: []
        };
    },
    props: {
        showChoose: '',
        files: {
            type: [Array, String]
        },
        size: {
            type: String
        }
    },
    beforeMount () {
        this.init();
        switch (this.size) {
        case 'small':
            this.width = 60;
            break;
        case 'mini':
            this.width = 32;
            break;
        default:
            this.width = 100;
            break;
        }
    },
    watch: {
        checked () {
            this.$emit('changeChecked', this.checked);
        },
        files (val, oldVal) {
            this.init();
        }
    },
    methods: {
        init () {
            let src; 
            if (this.files) {
                src = (typeof this.files === 'string' ? this.files.split(';') : (this.files instanceof Array ? this.files : null));
            }
            this.list = [];
            src && src.forEach(item => {
                this.list.push(this.formatFile(item));
            });
        },
        // 格式化文件
        formatFile (item, uid) {
            let thumbnail;
            switch (getFileType(item)) {
            case 'image':
                thumbnail = CONFIG.IMAGE_DOWNLOAD + changeImgSize(item);
                break;
            case 'pdf':
                thumbnail = pdf;
                break;
            case 'other':
                thumbnail = defaultImg;
                break;
            default:
                thumbnail = defaultImg;
                break;
            }
            return {
                thumbnail: thumbnail,
                fullUrl: CONFIG.IMAGE_DOWNLOAD + item,
                url: item
            };
        }
    }
};
</script>
<style lang="scss">
    .fileList{
        li{
            float:left;
            margin-right:5px;
        }
    }
</style>
