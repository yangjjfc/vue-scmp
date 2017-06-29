import Vue from 'vue';
import $ from 'jquery';
import '../js/boxer/jquery.fs.boxer.js';
import '../js/boxer/jquery.fs.boxer.css';
// 时间插件
Vue.directive('datetimepicker', {
    twoWay: true,
    priority: 1000,
    params: ['onChange', 'options'],
    bind: function (el, binding, vnode) {
        let self = this;
        let options = $.extend({
            language: 'zh-CN',
            minView: 2,
            todayHighlight: 1,
            format: 'yyyy-mm-dd',
            autoclose: true
        }, self.options);
        setTimeout(function () {
            $(self.el)
                .datetimepicker(options)
                .on('changeDate', function (ev) {
                    self.set(ev.target.value);
                    self.params.onChange && self.params.onChange();
                });
        }, 0);
    },
    update: function (value) {
        $(this.el).val(value).trigger('change');
    },
    unbind: function () {
        $(this.el).off().datetimepicker('remove');
    }
});
var isPicture = function (item) {
    // 判断是否是图片
    let strFilter = ['jpeg', 'gif', 'jpg', 'png', 'bmp', 'pic', 'pdf'];
    let strPostfix;
    if (!item) { return false; }
    if (item.indexOf('.') > -1) {
        strPostfix = item.split('.').pop().toLowerCase();
        if (~strFilter.indexOf(strPostfix)) {
            return true;
        }
    }
    return false;
};
Vue.directive('boxer', {
    bind: function (el, binding, vnode) {
        isPicture(binding.value) && $(el).boxer();
        $(el).click(function () {
            return false;
        });
    }
});

