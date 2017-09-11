import axios from 'axios';
import CONFIG from '../config/app.config';
import NProgress from 'nprogress'; // Progress 进度条
import 'nprogress/nprogress.css';// Progress 进度条 样式
import { Notification } from 'element-ui';
class Interceptor {
    constructor () {
        this.req = {};// 防止同个链接连续请求
        this.urlGuid = '';
    }
    getParams (obj) {    
        var result = [],
            keys = Object.keys(obj);
        keys && keys.forEach(function (val) {
            var str = val + '=' + (typeof obj[val] === 'string' ? obj[val].toString() : JSON.stringify(obj[val]));
            result.push(str);
        });
        return result.join('&');
    }
    // 对请求数据做些什么
    request () {
        if (!String.prototype.trim) {
            String.prototype.trim = function () { // eslint-disable-line no-extend-native
                return this.replace(/^\s+|\s+$/g, '');
            };
        }
        // 把对象键值转换成数组形式
        let getParams = (obj) => {
            let result = [];
            let keys = Object.keys(obj);
            keys && keys.forEach(function (val) {
                var str = val + '=' + (typeof obj[val] === 'string' ? obj[val].toString() : JSON.stringify(obj[val]));
                result.push(str);
            });
            return result.join('&');
        };
        axios.interceptors.request.use((request) => {
            this.urlGuid = request.url + '?' + this.getParams(request.data); // 防止同个链接连续请求
            // 本地
            if (CONFIG.DEV_MODE === 0) {
                request.method = 'GET';
                request.url = 'static/data/' + request.url + '.json?' + getParams(request.data || {});
            // 线上
            } else if (CONFIG.DEV_MODE === 1 && request.method.toLowerCase() === 'post' && !this.req[this.urlGuid]) {
                request.url = '/gateway/' + (request.url.split('.').length === 1 ? request.url : 'call');
                this.req[this.urlGuid] = request;
            }  
            NProgress.start();
            return request;
        }, (error) => Promise.reject(error));
    }
    // 对响应数据做点什么
    response () {
        axios.interceptors.response.use((response) => {
            NProgress.done();
            delete this.req[this.urlGuid]; // 防止同个链接连续请求
            if (response.data) {
                if (response.data.code === 'SUCCESS' || response.data.code === '0') {
                    return response.data;
                } else if (response.data.code === 'SESSION_EXPIRED' || response.data.code === '5000') {
                    return Promise.reject(response);
                } else {
                    Notification.error({
                        title: '错误',
                        message: response.data.message
                    });
                    return response.data;
                }
            }
            return response;
        }, (error) => Promise.reject(error));
    }
    init () {
        this.request();
        this.response();
    }
}
export default Interceptor;
