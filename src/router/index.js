const dashboard = r => require.ensure([], () => r(require('../pages/dashboard/Dashboard')), 'dashboard');
const supplierChart = r => require.ensure([], () => r(require('../pages/chart/supplier/SupplierChart')), 'SupplierChart');
const hospitalChart = r => require.ensure([], () => r(require('../pages/chart/hospital/HospitalChart')), 'HospitalChart');
const user = r => require.ensure([], () => r(require('../pages/user/User')), 'user');
const index = r => require.ensure([], () => r(require('../pages/index/index')), 'index');
const supplier = r => require.ensure([], () => r(require('../pages/supplier/supplier')), 'supplier');
const salesReturn = r => require.ensure([], () => r(require('../pages/return/Return')), 'return');
const returnDetail = r => require.ensure([], () => r(require('../pages/return/detail/ReturnDetail')), 'ReturnDetail');
const logistic = r => require.ensure([], () => r(require('../pages/logistic/Logistic')), 'logistic');
const logisticDetail = r => require.ensure([], () => r(require('../pages/logistic/mods/logisticDetail')), 'logisticDetail');
const order = r => require.ensure([], () => r(require('../pages/order/Order.vue')), 'order');
const orderDetail = r => require.ensure([], () => r(require('../pages/order/detail/orderDetail.vue')), 'orderDetail');
const preserve = r => require.ensure([], () => r(require('../pages/cert/preserve/Preserve.vue')), 'preserve');
const electronic = r => require.ensure([], () => r(require('../pages/cert/electronic/Electronic.vue')), 'electronic');
const vendor = r => require.ensure([], () => r(require('../pages/cert/vendor/Vendor.vue')), 'vendor');
import Auth from '../pages/auth/Auth';
export default [
    {
        path: '/', redirect: '/dashboard'
    },
    {
        path: '/auth',
        name: 'auth',
        component: Auth
    }, {
        path: '/dashboard',
        name: 'dashboard',
        component: dashboard,
        children: [
            { path: '/supplierChart', component: supplierChart, name: 'supplierChart' },
            { path: '/hospitalChart', component: hospitalChart, name: 'hospitalChart' },
            { path: '/user', component: user, name: 'user' },
            { path: '/index', component: index, name: 'index' },
            { path: '/return', component: salesReturn, name: 'return' },
            { path: '/return/detail/:returnOrderNo/:passKey', component: returnDetail, name: 'returnDetail' },
            { path: '/logistic', component: logistic, name: 'logistic' }, // 配送管理
            { path: '/logistic/detail/:deliveryNo/:passKey', component: logisticDetail, name: 'logisticDetail' },
            { path: '/supplier', component: supplier, name: 'supplier' },
            { path: '/order', component: order, name: 'order' },
            { path: '/order/detail/:orderNo/:passkey', component: orderDetail, name: 'orderDetail' },
            { path: '/cert/preserve', component: preserve, name: 'preserve' }, // 证件维护
            { path: '/cert/electronic', component: electronic, name: 'electronic' }, // 电子签章
            { path: '/cert/vendor', component: vendor, name: 'vendor' } // 生产厂商
        ]
    }
];

