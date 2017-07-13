import '../js/boxer/jquery.fs.boxer.js';
import '../js/boxer/jquery.fs.boxer.css';
const boxer = {};
boxer.install = (Vue, options = {}) => {
    Vue.directive('boxer', {
        bind: function (el, binding, vnode) {
            $(el).boxer();
            $(el).click(function () {
                return false;
            });
        }
    });
}
export default boxer;