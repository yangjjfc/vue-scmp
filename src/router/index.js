// const Auth = r => require.ensure([], () => r(require('../pages/Auth/Auth')), 'auth'); // 登入页面
// const dashboard = r => require.ensure([], () => r(require('../pages/dashboard/Dashboard')), 'dashboard'); // 所有页面的父组件
// const index = r => require.ensure([], () => r(require('../pages/index/index')), 'index'); // 首页
// const supplier = r => require.ensure([], () => r(require('../pages/supplier/supplier')), 'supplier'); // 供应商管理
// const hospital = r => require.ensure([], () => r(require('../pages/hospital/hospital.vue')), 'hospital'); // 医院管理
// const product = r => require.ensure([], () => r(require('../pages/product/product.vue')), 'product'); // 产品管理
// const preserve = r => require.ensure([], () => r(require('../pages/cert/preserve/Preserve.vue')), 'preserve'); // 证件维护
// const electronic = r => require.ensure([], () => r(require('../pages/cert/electronic/Electronic.vue')), 'electronic'); // 电子签章
// const vendor = r => require.ensure([], () => r(require('../pages/cert/vendor/Vendor.vue')), 'vendor'); // 生产厂商
// const entrust = r => require.ensure([], () => r(require('../pages/cert/entrust/Entrust.vue')), 'entrust'); // 法人委托书
// const promise = r => require.ensure([], () => r(require('../pages/cert/promise/Promise.vue')), 'promise'); // 销售承诺书
// const certAuth = r => require.ensure([], () => r(require('../pages/cert/auth/CertAuth.vue')), 'certAuth'); // 经销授权书
// const cert = r => require.ensure([], () => r(require('../pages/cert/cert.vue')), 'cert'); // 证件管理
// const order = r => require.ensure([], () => r(require('../pages/order/Order.vue')), 'order'); // 订单管理
// const orderDetail = r => require.ensure([], () => r(require('../pages/order/detail/orderDetail.vue')), 'orderDetail'); // 订单管理详情
// const logistic = r => require.ensure([], () => r(require('../pages/logistic/Logistic')), 'logistic'); // 配送管理
// const logisticDetail = r => require.ensure([], () => r(require('../pages/logistic/mods/logisticDetail')), 'logisticDetail'); // 配送管理详情
// const salesReturn = r => require.ensure([], () => r(require('../pages/return/Return')), 'salesReturn'); // 退货管理
// const returnDetail = r => require.ensure([], () => r(require('../pages/return/detail/ReturnDetail')), 'returnDetail'); // 退货管理详情
// const user = r => require.ensure([], () => r(require('../pages/user/User')), 'user'); // 用户管理
// const chart = r => require.ensure([], () => r(require('../pages/chart/chart')), 'chart'); // 统计分析
// const supplierChart = r => require.ensure([], () => r(require('../pages/chart/supplier/SupplierChart')), 'supplierChart'); // 供应商销售
// const hospitalChart = r => require.ensure([], () => r(require('../pages/chart/hospital/HospitalChart')), 'hospitalChart'); // 客户销售
// const register = r => require.ensure([], () => r(require('../pages/cert/register/Register.vue')), 'register');

const _import = require('./_import_' + process.env.NODE_ENV);// require('@/pages/' + file + '.vue')
const Auth = _import('auth/Auth'); // 登入页面 
const dashboard = _import('dashboard/Dashboard'); // 所有页面的父组件
const index = _import('index/index');  // 首页
const supplier = _import('supplier/supplier'); // 供应商管理
const supCustomer = _import('supplier/customer'); // 供应商管理-客户列表
const supProduct = _import('supplier/product'); // 供应商管理-产品列表
const hospital = _import('hospital/hospital');     // 医院管理
const hosSupplier = _import('hospital/supplier');     // 医院管理-供应商列表
const hosProduct = _import('hospital/product');     // 医院管理-产品列表
const product = _import('product/product');  // 产品管理
const preserve = _import('cert/preserve/Preserve'); // 证件维护
const electronic = _import('cert/electronic/Electronic'); // 电子签章
const vendor = _import('cert/vendor/Vendor'); // 生产厂商
const entrust = _import('cert/entrust/Entrust'); // 法人委托书
const promise = _import('cert/promise/Promise'); // 销售承诺书
const certAuth = _import('cert/auth/CertAuth');  // 经销授权书
const register = _import('cert/register/Register'); 
const cert = _import('cert/cert');  // 证件管理
const order = _import('order/Order'); // 订单管理
const orderDetail = _import('order/detail/orderDetail');  // 订单管理详情
const logistic = _import('logistic/Logistic');// 配送管理
const logisticDetail = _import('logistic/mods/LogisticDetail'); // 配送管理详情
const salesReturn = _import('return/Return');// 退货管理
const returnDetail = _import('return/detail/ReturnDetail'); // 退货管理详情
const user = _import('user/User');  // 用户管理
const chart = _import('chart/chart');  // 统计分析
const supplierChart = _import('chart/supplier/SupplierChart'); // 供应商销售
const hospitalChart = _import('chart/hospital/HospitalChart'); // 客户销售
export const menu = [{
    path: 'suoqi', // 缩起
    meta: {
        name: '缩起菜单',
        icon: 'icon-zengjiasuojinliang',
        role: '',
        whitemenu: true
    }
}, {
    path: 'index', // 首页
    component: index,
    name: 'index',
    meta: {
        name: '首页',
        icon: 'icon-index',
        role: 'platform:index',
        whitemenu: true
    }
},
{
    path: 'supplier',
    component: supplier,
    name: 'supplier',
    meta: {
        name: '供应商管理',
        icon: 'icon-qiye',
        role: 'platform:supplier'
    }
}, // 供应商管理
{
    path: 'supplier/customer',
    component: supCustomer,
    name: 'supCustomer',
    meta: {
        active: '/dashboard/supplier',
        nomenu: true,
        name: '供应商管理 / 客户列表',
        icon: 'icon-qiye',
        role: 'platform:supplier'
    }
}, // 供应商管理-客户列表
{
    path: 'supplier/product',
    component: supProduct,
    name: 'supProduct',
    meta: {
        active: '/dashboard/supplier',
        nomenu: true,
        name: '供应商管理 / 产品列表',
        icon: 'icon-qiye',
        role: 'platform:supplier'
    }
}, // 供应商管理-产品列表
{
    path: 'hospital',
    component: hospital,
    name: 'hospital',
    meta: {
        name: '客户管理',
        icon: 'icon-iconfontyiyuan',
        role: 'platform:hospital'
    }
}, // 医院管理
{
    path: 'hospital/supplier',
    component: hosSupplier,
    name: 'hosSupplier',
    meta: {
        active: '/dashboard/hospital',
        nomenu: true,
        name: '客户管理-供应商列表', 
        icon: 'icon-iconfontyiyuan',
        role: 'platform:hospital'
    }
}, // 医院管理-供应商列表
{
    path: 'hospital/product',
    component: hosProduct,
    name: 'hosProduct',
    meta: {
        active: '/dashboard/hospital',
        nomenu: true,
        name: '客户管理-产品列表', 
        icon: 'icon-iconfontyiyuan',
        role: 'platform:hospital'
    }
}, // 医院管理-产品列表
{
    path: 'product',
    component: product,
    name: 'product',
    meta: {
        name: '产品管理',
        icon: 'icon-chanpin1',
        role: 'platform:product'
    }
}, // 产品管理
{
    path: 'cert',
    redirect: 'cert/register',
    component: cert,
    meta: {
        name: '证件管理',
        icon: 'icon-zhengjian',
        role: 'platform:certificate'
    },
    children: [{
        path: 'register',
        component: register,
        name: 'register',
        meta: {
            name: '产品注册证',
            icon: 'icon-zhengjian',
            open: 'cert',
            role: 'platform:certificate:cert_regist'
        }
    }, // 产品注册证
    {
        path: 'auth',
        component: certAuth,
        name: 'certauth',
        meta: {
            name: '经销授权书',
            icon: 'icon-zhengjian',
            open: 'cert',
            role: 'platform:certificate:cert_auth'
        }
    }, // 经销授权书
    {
        path: 'promise',
        component: promise,
        name: 'promise',
        meta: {
            name: '销售承诺书',
            icon: 'icon-zhengjian',
            open: 'cert',
            role: 'platform:certificate:cert_commit'
        }
    }, // 销售承诺书
    {
        path: 'entrust',
        component: entrust,
        name: 'entrust',
        meta: {
            name: '法人委托书',
            icon: 'icon-zhengjian',
            open: 'cert',
            role: 'platform:certificate:cert_entrust'
        }
    }, // 法人委托书
    {
        path: 'vendor',
        component: vendor,
        name: 'vendor',
        meta: {
            name: '生产厂商',
            icon: 'icon-zhengjian',
            open: 'cert',
            role: 'platform:certificate:cert_factory'
        }
    }, // 生产厂商
    {
        path: 'electronic',
        component: electronic,
        name: 'electronic',
        meta: {
            name: '电子签章',
            icon: 'icon-zhengjian',
            open: 'cert',
            role: 'platform:certificate:cert_sign'
        }
    }, // 电子签章
    {
        path: 'preserve',
        component: preserve,
        name: 'preserve',
        meta: {
            name: '证件维护',
            icon: 'icon-zhengjian',
            open: 'cert',
            role: 'platform:certificate:cert_maintain'
        }
    }  // 证件维护
    ]
},

{// 订单管理
    path: 'order',
    component: order,
    name: 'order',
    meta: {
        name: '订单管理',
        icon: 'icon-weifenxiaopcjiemianzhuanhuan',
        role: 'platform:order'
    }  
},
{
    path: 'order/detail/:orderNo/:passkey',
    component: orderDetail,
    name: 'orderDetail',
    meta: {
        active: '/dashboard/order',
        nomenu: true,
        name: '订单管理',
        icon: 'icon-weifenxiaopcjiemianzhuanhuan',
        role: 'platform:order'
    }
}, // 订单管理详情
{
    path: 'logistic',
    component: logistic,
    name: 'logistic',
    meta: {
        name: '配送管理',
        icon: 'icon-peisong',
        role: 'platform:logistic'
    }
   
}, // 配送管理
{
    path: 'logistic/detail/:deliveryNo/:passKey',
    component: logisticDetail,
    name: 'logisticDetail',
    meta: {
        active: '/dashboard/logistic',
        nomenu: true,
        name: '配送管理',
        icon: 'icon-peisong',
        role: 'platform:logistic'
    }
}, // 配送管理详情
{ 
    path: 'return',
    component: salesReturn,
    name: 'return',
    meta: {
        name: '退货管理',
        icon: 'icon-ccgl-tuihuoyugao-4',
        role: 'platform:return'
    }
}, // 退货管理 
{
    path: 'return/detail/:returnOrderNo/:passKey',
    component: returnDetail,
    name: 'returnDetail',
    meta: {
        active: '/dashboard/return',
        nomenu: true,
        name: '退货管理',
        icon: 'icon-ccgl-tuihuoyugao-4',
        role: 'platform:return'
    }
}, // 退货管理详情    
{
    path: 'user',
    component: user,
    name: 'user',
    meta: {
        name: '用户管理',
        icon: 'icon-yonghuguanli',
        role: 'platform:user'
    }
}, // 用户管理
{// 供应商销售
    path: 'chart',
    redirect: '/statistics/supplierChart',
    component: chart,
    meta: {
        name: '统计分析',
        icon: 'icon-statistics',
        role: 'platform:chart'
    },
    children: [{
        path: 'supplierChart',
        component: supplierChart,
        name: 'supplierChart',
        meta: {
            name: '供应商销售',
            icon: 'icon-statistics',
            open: 'chart',
            role: 'platform:chart'
        }
    }, // 供应商销售
    {
        path: 'hospitalChart',
        component: hospitalChart,
        name: 'hospitalChart',
        meta: {
            name: '客户采购',
            icon: 'icon-statistics',
            open: 'chart',
            role: 'platform:chart'
        }
    }] // 客户销售   
}];

export const layout = {
    path: '/dashboard', // 所有页面的父组件
    name: 'dashboard',
    component: dashboard,
    children: menu
};

export default [
    {
        path: '/', redirect: '/auth'
    },
    {
        path: '/auth', // 登入页面
        name: 'auth',
        component: Auth
    }
    // { path: '*', redirect: '/dashboard/index' }
];

