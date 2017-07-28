import axios from 'axios';
import CONFIG from '../config/app.config';
import NProgress from 'nprogress'; // Progress 进度条
import 'nprogress/nprogress.css';// Progress 进度条 样式
import { Notification } from 'element-ui';
class Interceptor {
  // 对请求数据做些什么
    request () {
        if (!String.prototype.trim) {
            String.prototype.trim = function () { // eslint-disable-line no-extend-native
                return this.replace(/^\s+|\s+$/g, '');
            };
        }
     //   let getClass = (object) => Object.prototype.toString.call(object).match(/^\[object\s(.*)\]$/)[1];
    // // 清空无值对象
    //     let clearNoneValueObj = (obj) => {
    //         for (let i in obj) {
    //             if (getClass(obj[i]) === 'Object') {
    //                 clearNoneValueObj(obj[i]);
    //             } else {
    //                 typeof obj[i] === String && (obj[i] = obj[i].trim());
    //                 if (!obj.notClearValue && (obj[i] === undefined || obj[i] === null || obj[i] === '')) {
    //                    // delete obj[i];
    //                 }
    //             }
    //         }
    //     };
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
        axios.interceptors.request.use(function (request) {
            NProgress.start();
            // 本地
            if (CONFIG.DEV_MODE === 0) {
                request.method = 'GET';
                request.url = 'static/data/' + request.url + '.json?' + getParams(request.data || {});
            // 线上
            } else if (CONFIG.DEV_MODE === 1 && request.method.toLowerCase() === 'post') {
                request.url = '/gateway/' + (request.url.split('.').length === 1 ? request.url : 'call');
            } 
            return request;
        }, function (error) {
            return Promise.reject(error);
        });
    }
  // 对响应数据做点什么
    response () {
        axios.interceptors.response.use(function (response) {
            NProgress.done();
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
        }, function (error) {
      // 对响应错误做点什么
            return Promise.reject(error);
        });
    }

    init () {
        this.request();
        this.response();
    }
}
export default Interceptor;
