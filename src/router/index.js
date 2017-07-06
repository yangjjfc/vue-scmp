const Auth = r => require.ensure([], () => r(require('../pages/Auth/Auth')), 'auth'); // 登入页面
const dashboard = r => require.ensure([], () => r(require('../pages/dashboard/Dashboard')), 'dashboard'); // 所有页面的父组件
const index = r => require.ensure([], () => r(require('../pages/index/index')), 'index'); // 首页
const supplier = r => require.ensure([], () => r(require('../pages/supplier/supplier')), 'supplier'); // 供应商管理
const hospital = r => require.ensure([], () => r(require('../pages/hospital/hospital.vue')), 'hospital'); // 医院管理
const product = r => require.ensure([], () => r(require('../pages/product/product.vue')), 'product'); // 产品管理
const preserve = r => require.ensure([], () => r(require('../pages/cert/preserve/Preserve.vue')), 'cert'); // 证件维护
const electronic = r => require.ensure([], () => r(require('../pages/cert/electronic/Electronic.vue')), 'cert'); // 电子签章
const vendor = r => require.ensure([], () => r(require('../pages/cert/vendor/Vendor.vue')), 'cert'); // 生产厂商
const entrust = r => require.ensure([], () => r(require('../pages/cert/entrust/Entrust.vue')), 'cert'); // 法人委托书
const promise = r => require.ensure([], () => r(require('../pages/cert/promise/Promise.vue')), 'cert'); // 销售承诺书
const certAuth = r => require.ensure([], () => r(require('../pages/cert/auth/CertAuth.vue')), 'cert'); // 经销授权书
const order = r => require.ensure([], () => r(require('../pages/order/Order.vue')), 'order'); // 订单管理
const orderDetail = r => require.ensure([], () => r(require('../pages/order/detail/orderDetail.vue')), 'order'); // 订单管理详情
const logistic = r => require.ensure([], () => r(require('../pages/logistic/Logistic')), 'logistic'); // 配送管理
const logisticDetail = r => require.ensure([], () => r(require('../pages/logistic/mods/logisticDetail')), 'logistic'); // 配送管理详情
const salesReturn = r => require.ensure([], () => r(require('../pages/return/Return')), 'return'); // 退货管理
const returnDetail = r => require.ensure([], () => r(require('../pages/return/detail/ReturnDetail')), 'return'); // 退货管理详情
const user = r => require.ensure([], () => r(require('../pages/user/User')), 'user'); // 用户管理
const supplierChart = r => require.ensure([], () => r(require('../pages/chart/supplier/SupplierChart')), 'chart'); // 供应商销售
const hospitalChart = r => require.ensure([], () => r(require('../pages/chart/hospital/HospitalChart')), 'chart'); // 客户销售
export default [
    {
        path: '/', redirect: '/dashboard'
    },
    {
        path: '/auth', // 登入页面
        name: 'auth',
        component: Auth
    }, {
        path: '/dashboard', // 所有页面的父组件
        name: 'dashboard',
        component: dashboard,
        children: [
            { path: '/index', component: index, name: 'index' }, // 首页
            { path: '/supplier', component: supplier, name: 'supplier' }, // 供应商管理
            { path: '/hospital', component: hospital, name: 'hospital' }, // 医院管理
            { path: '/product', component: product, name: 'product' }, // 产品管理
            { path: '/cert/preserve', component: preserve, name: 'preserve' }, // 证件维护
            { path: '/cert/electronic', component: electronic, name: 'electronic' }, // 电子签章
            { path: '/cert/vendor', component: vendor, name: 'vendor' }, // 生产厂商
            { path: '/cert/entrust', component: entrust, name: 'entrust' }, // 法人委托书
            { path: '/cert/promise', component: promise, name: 'promise' }, // 销售承诺书
            { path: '/cert/auth', component: certAuth, name: 'certAuth' }, // 销售承诺书
            { path: '/order', component: order, name: 'order' }, // 订单管理
            { path: '/order/detail/:orderNo/:passkey', component: orderDetail, name: 'orderDetail' }, // 订单管理详情
            { path: '/logistic', component: logistic, name: 'logistic' }, // 配送管理
            { path: '/logistic/detail/:deliveryNo/:passKey', component: logisticDetail, name: 'logisticDetail' }, // 配送管理详情
            { path: '/return', component: salesReturn, name: 'return' }, // 退货管理
            { path: '/return/detail/:returnOrderNo/:passKey', component: returnDetail, name: 'returnDetail' }, // 退货管理详情
            { path: '/user', component: user, name: 'user' }, // 用户管理
            { path: '/supplierChart', component: supplierChart, name: 'supplierChart' }, // 供应商销售
            { path: '/hospitalChart', component: hospitalChart, name: 'hospitalChart' }, // 客户销售
            { path: '*', redirect: '/index' } 
        ]
    }
];

