/**
 * 金额格式化
 * @param {*str} n
 */
export const parseMone = (n) => {
    let _str = '';
    if (isNaN(n)) {
        return;
    }
    let re = /^[0-9]*[1-9][0-9]*$/; // 判断是不是整数
    if (re.test(n) || n == 0) { //eslint-disable-line
        _str = parseNum(n) + '.00';
    } else {
        let k = '.' + n.toString().split('.')[1]; // 截取小数
        if (k.length <= 2) {
            k += '0';
        }
        k = k.substr(0, 3);
        let h = JSON.parse(n.toString().split('.')[0]);
        _str = parseNum(h) + k;
    }
    return _str;
};

// 时间格式化
export const format = (time, fmt) => {
    let o = {
        'M+': time.getMonth() + 1, // 月份
        'd+': time.getDate(), // 日
        'h+': time.getHours(), // 小时
        'm+': time.getMinutes(), // 分
        's+': time.getSeconds(), // 秒
        'q+': Math.floor((time.getMonth() + 3) / 3), // 季度
        S: time.getMilliseconds()
        // 毫秒
    };
    if (/(y+)/.test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (time.getFullYear() + '').substr(4 - RegExp.$1.length));
    }
    for (var k in o) {
        if (new RegExp('(' + k + ')').test(fmt)) {
            fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length));
        }
    }
    return fmt;
};
/**
 * 每3位加个','
 * @param {*} num
 */
export const parseNum = (num) => {
    let list = new String(num).split('').reverse(); // eslint-disable-line no-new-wrappers
    for (var i = 0; i < list.length; i++) {
        if (i % 4 === 3) {
            list.splice(i, 0, ',');
        }
    }
    return list.reverse().join('');
};
/**
 *
 * @param {*文件上传支持的类型} item
 */
export const getFileType = (item) => {
    // 判断是否是图片
    let strFilter = ['jpeg', 'gif', 'jpg', 'png', 'bmp', 'pic'];
    let strPostfix;
    if (!item) {
        return null;
    }
    if (item.indexOf('.') > -1) {
        strPostfix = item.split('.').pop().toLowerCase();
        if (~strFilter.indexOf(strPostfix)) {
            return 'image';
        } else if (~['pdf'].indexOf(strPostfix)) {
            return 'pdf';
        } else {
            return 'other'; // 不支持的文件类型
        }
    }
    return null;
};

// 格式化图片
import CONFIG from '@/config/app.config'; // 配置
import pdf from '@/assets/images/pdf.png'; // daf
import noimg from '@/assets/images/noimage.png'; // 没有图片
export const formatFile = (item) => {
    let thumbnail = '';
    switch (getFileType(item)) {
    case 'image':
        thumbnail = CONFIG.IMAGE_DOWNLOAD + changeImgSize(item);
        break;
    case 'pdf':
        thumbnail = pdf;
        break;
    default:
        thumbnail = noimg;
        break;
    }
    return thumbnail;
};

/**
 *
 * @param {*改变图片大小} src
 * @param {*} size
 */
export const changeImgSize = (src, size = '100x100') => {
    let i = src.lastIndexOf('.');
    return (src = src.substring(0, i) + '_' + size + src.substring(i));
};

/**
 * 密码加密处理
 */
import CryptoJS from '@/assets/js/aes/aes-min.min.js';
import SHA256 from '@/assets/js/sha256/sha256.min.js';
export const encryption = (password, clientid, token) => {
    let _encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(SHA256(password)), CryptoJS.enc.Utf8.parse(clientid), {
        iv: CryptoJS.enc.Utf8.parse(token),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Iso10126
    });
    return CryptoJS.enc.Base64.stringify(_encrypted.ciphertext);
};

/** 失去焦点校验数据 */
export const Validate = {
    URL: {
        EXISTEMAIL: 'ypt.open.user.isExistEmailForWeb', // 判断邮箱是否存在
        ISEXIST: 'ypt.open.user.isExistMobileForWeb', // 判断手机号是否存在
        isExistUserByLoginAccountForWeb: 'ypt.open.user.isExistUserByLoginAccountForWeb'
    },
    // 用户名
    validateloginAccount: async function (rule, value, callback) {
        if (!isNaN(value) && value) {
            callback(new Error('不能是纯数字'));
        }
        if (this.send_status && value) {
            await this.Http.post(Validate.URL.isExistUserByLoginAccountForWeb, {
                loginAccount: this.msgx[rule.field]
            }).then((re) => {
                if (re.data) {
                    this[rule.field + '_state'] = false;
                    callback(new Error('用户名已存在'));
                } else {
                    this[rule.field + '_state'] = true;
                    callback();
                }
            });
        } else if (!value.length) { 
            callback();
        } else if (!this[rule.field + '_state']) {
            callback(new Error('用户名已存在'));
        } else {
            this[rule.field + '_state'] = true;
            callback();
        }
    },
    // 密码
    validatePassword (rule, value, callback) {
        if (value.length <= 20 && value.length >= 6) {
            this.$refs.forms.validateField('repassword');
            callback();
        }
    },
    // 重复密码
    validateRePassword (rule, value, callback) {
        if (value.length && value !== this.msgx.password) {
            callback(new Error('两次输入密码不一致!'));
        } else {
            callback();
        }
    },
    // 手机
    validatePhone: async function (rule, value, callback) {
        if (this.send_status && value.length > 0) {
            await this.Http.post(Validate.URL.ISEXIST, {
                params: this.msgx[rule.field]
            }).then((re) => {
                if (re.data) {
                    this[rule.field + '_state'] = false;
                    callback(new Error('该手机号已占用'));
                } else {
                    this[rule.field + '_state'] = true;
                    callback();
                }
            });
        } else if (!value.length) { 
            callback();
        } else if (!this[rule.field + '_state']) {
            callback(new Error('该手机号已占用'));
        } else {
            this[rule.field + '_state'] = true;
            callback();
        }
    },
    // 邮箱
    validateEmail: async function (rule, value, callback) {
        if (this.send_status && value.length > 0) {
            await this.Http.post(Validate.URL.EXISTEMAIL, {
                params: this.msgx[rule.field]
            }).then((re) => {
                if (re.data) {
                    this[rule.field + '_state'] = false;
                    callback(new Error('该邮箱已占用'));
                } else {
                    this[rule.field + '_state'] = true;
                    callback();
                }
            });
        } else if (!value.length) { 
            callback();
        } else if (!this[rule.field + '_state']) { // 提交时验证处理
            callback(new Error('该邮箱已占用'));
        } else {
            this[rule.field + '_state'] = true;
            callback();
        }
    }

};

/**
 * 监听事件
 * @param {*对象名} obj 
 * @param {*绑定类型} evtype 
 * @param {*函数} fn 
 * @param {*} useCapture 
 */
export const addEvent = (obj, evtype, fn, useCapture) => {
    if (obj.addEventListener) {
        obj.addEventListener(evtype, fn, useCapture);
    } else if (obj.attachEvent) {
        obj.attachEvent('on' + evtype, fn);// IE不支持事件捕获 
    } else {
        obj['on' + evtype] = fn;// 事实上这种情况不会存在 
    }
};
/**
 * 解绑监听事件
 * @param {*对象名} obj 
 * @param {*解绑类型} evtype 
 * @param {*函数} fn 
 * @param {*} useCapture 
 */
export const delEvent = (obj, evtype, fn, useCapture) => {
    if (obj.removeEventListener) {
        obj.removeEventListener(evtype, fn, useCapture);
    } else if (obj.detachEvent) {
        obj.detachEvent('on' + evtype, fn);
    } else { 
        obj['on' + evtype] = null;
    }
};

