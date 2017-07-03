<template>
    <div>
        <adderss :regions="chinaAddr" :province="region.provinceName" :city="region.cityName" :district="region.townName" @onchange="change" classx="adderss">
        </adderss>
    </div>
</template>
<script type="text/javascript">
import adderss from '@/components/address/address';
import REGION_DATA from 'china-area-data';
export default {
    name: 'regionPicker',
    data () {
        return {
            chinaAddr: REGION_DATA
        };
    },
    props: {
        region: {
            type: Object,
            default () {
                return { 
                    provinceName: '浙江省', // you can set initial value or not.
                    cityName: '杭州市', // by code or name.
                    townName: '西湖区'
                };
            }
        }
    },
    methods: {
        change (msg) {
            this.$emit('update:region', msg);
        }
    },
    components: {
        adderss
    }
};
</script>
<style lang="scss">
.adderss {
    width: 32.5%;
    margin-bottom: 5px;
}
</style>
