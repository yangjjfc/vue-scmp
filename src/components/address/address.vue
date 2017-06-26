<template>
    <div class="region-picker">
        <label class="province">
            <slot name="province"></slot>
            <el-select size="small" v-model="value_provinces" ref="provinceSelected" :placeholder="placeholder.province" class="province-select" :class="classx" :required="required" :disabled="disabled" @change="change1">
                <el-option v-for="item in provinces" :key="item.label" :label="item.label" :value="item.value" :class="classx">
                </el-option>
            </el-select>
        </label>
        <label class="city" ref="citySelected" v-show="!auto || cities.length">
            <slot name="city"></slot>
            <el-select size="small" v-model="value_city" class="city-select" @change="change2" :required="required && cities.length > 0" :disabled="disabled" :class="classx">
                <el-option v-for="item in cities" :key="item.label" :label="item.label" :value="item.value" :class="classx">
                </el-option>
            </el-select>
        </label>
        <label class="district" v-if="!twoSelect" v-show="!auto || districts.length">
            <slot name="district"></slot>
            <el-select size="small" v-model="value_district" ref="districtSelected" class="district-select" @change="change3" :class="classx" :required="required && districts.length > 0" :disabled="disabled">
                <el-option v-for="item in districts" :key="item.label" :label="item.label" :value="item.value" :class="classx">
                </el-option>
            </el-select>
        </label>
    </div>
</template>
<script>
export default {
    name: 'adderss',
    data () {
        return {
            current: {
                province: '',
                city: '',
                district: ''
            },
            value_provinces: '', // 省
            value_city: '',  // 市
            value_district: '' // 区
        };
    },
    beforeMount () {
        this.value_provinces = this.provinceSelected[0];
        this.value_city = this.citySelected[0] && this.citySelected[0];
        this.value_district = this.districtSelected[0] && this.districtSelected[0];
    },
    watch: {
        province (val) {
            this.value_provinces = val;
            this.current.province = '';
        },
        city (val) {
            this.value_city = val;
            this.current.city = '';
        },
        district (val) {
            this.value_district = val;
            this.current.district = '';
        }
    },
    props: {
        province: {},
        city: {},
        district: {},
        regions: {
            type: Object
        }, // 地区源josn
        twoSelect: Boolean,
        auto: Boolean,
        required: Boolean,
        disabled: Boolean,
        rootCode: {
            default: '86'
        },
        classx: {},
        placeholder: {
            type: Object,
            default () {
                return {
                    province: '请选择',
                    city: '请选择',
                    district: '请选择'
                };
            }
        }
    },
    methods: {
        // 省改变
        change1 (val) {
            this.provinceSelected = val;
            this.citySelected = this.cities[0] && this.cities[0].value;
            this.districtSelected = this.districts[0] && this.districts[0].value;
            this.setAddress();
        },
        // 市改变
        change2 (val) {
            this.citySelected = val;
            this.districtSelected = this.districts[0] && this.districts[0].value;
            this.setAddress();
        },
        // 区改变
        change3 (val) {
            this.districtSelected = val;
            this.setAddress();
        },
        // 设置地址
        setAddress () {
            this.$emit('onchange', {
                province: this.provinceSelected[0],
                city: this.citySelected[0],
                district: this.districtSelected[0]
            });
        },
        // 过滤地址
        _filter (pid) {
            const result = [];
            const items = this.regions[pid];
            for (let code in items) {
                result.push([parseInt(code, 10), items[code]]);
            }
            return result;
        },
        // data model: [code, name]
        _searchIndex (items, model, by) {
            if (!model) return -1;
            // by name
            if (by === 1) {
                for (let key in items) {
                    if (items[key][by].indexOf(model) > -1) {
                        return key;
                    }
                }
                // by code
            } else {
                for (let key in items) {
                    if (items[key][by] === model) {
                        return key;
                    }
                }
            }
        },
        _selected (pid, model) {
            const items = this._filter(pid);
            let index = -1;
            if (typeof model === 'string') {
                index = this._searchIndex(items, model, 1);
            } else if (typeof model === 'number') {
                index = this._searchIndex(items, Number(model), 0);
            } else if (Array.isArray(model)) {
                index = this._searchIndex(items, Number(model[0]), 0);
            }
            return items[index] || [];
        }
    },
    computed: {
        provinces () {
            return this._filter(this.rootCode).map((item, index) => ({
                value: item[0],
                label: item[1]
            }));
        },
        cities () {
            return this._filter(this.provinceSelected[0]).map((item, index) => ({
                value: item[0],
                label: item[1]
            }));
        },
        districts () {
            return this._filter(this.citySelected[0]).map((item, index) => ({
                value: item[0],
                label: item[1]
            }));
        },
        provinceSelected: {
            get () {
                return this._selected(this.rootCode, this.current.province || this.province);
            },
            set (value) {
                this.current.province = value;
            }
        },
        citySelected: {
            get () {
                return this._selected(this.provinceSelected[0], this.current.city || this.city);
            },
            set (value) {
                this.current.city = value;
            }
        },
        districtSelected: {
            get () {
                return this._selected(this.citySelected[0], this.current.district || this.district);
            },
            set (value) {
                this.current.district = value;
            }
        }
    }
};
</script>
