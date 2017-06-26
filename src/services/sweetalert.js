/*  sweetalert  */
import swal from 'sweetalert2';

const SweetAlert = {
    swal () {
        return swal.apply(swal, arguments);
    },
    alert (title, message, type, opt) {
        return swal(Object.assign({
            title: title,
            text: message,
            type: type,
            confirmButtonText: '确定',
            width: '300px',
            showCancelButton: false,
            showLoaderOnConfirm: true,
            allowOutsideClick: false
        }, opt || {})).catch(function (e) {
            // console.log(e);
        });
    },
    confirm (opt) {
        return swal(Object.assign({
            confirmButtonText: '确定',
            width: '300px',
            // title:'提示信息',
            type: 'question',
            showCancelButton: true,
            cancelButtonText: '取消',
            showLoaderOnConfirm: true,
            allowOutsideClick: false
        }, opt || {})).catch(function (e) {
            // console.log(e);
        });
    },
    success (title, message) {
        return this.alert(title, message, 'success', {
            timer: '1500',
            showConfirmButton: false
        });
    },
    error (title, message) {
        return this.alert(title, message, 'error');
    },
    warning (title, message) {
        return this.alert(title, message, 'warning');
    },
    info (title, message) {
        return this.alert(title, message, 'info');
    },
    close () {
        return window.alert.close();
    }
};
export default SweetAlert;
