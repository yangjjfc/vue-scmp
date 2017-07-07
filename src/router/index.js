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
const register = r => require.ensure([], () => r(require('../pages/cert/register/Register.vue')), 'register');
export default [
    {
        path: '/', redirect: '/index'
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
            { path: 'index', // 首页
                component: index,
                name: 'index', 
                meta: {
                    name: '首页',
                    icon: 'icon-index'
                    
                }
            }, 
            { path: 'supplier',
                component: supplier,
                name: 'supplier',
                meta: {
                    name: '供应商管理',
                    icon: 'icon-qiye'
                    
                }
            }, // 供应商管理
            { path: 'hospital',
                component: hospital,
                name: 'hospital',
                meta: {
                    name: '客户管理',
                    icon: 'icon-iconfontyiyuan'
                   
                }
            }, // 医院管理
            { path: 'product',
                component: product,
                name: 'product', 
                meta: {
                    name: '产品管理',
                    icon: 'icon-chanpin1'
                    
                }
            }, // 产品管理
            { path: 'cert/preserve',
                component: preserve,
                name: 'preserve',
                meta: {
                    name: '证件维护',
                    
                    icon: 'icon-zhengjian'  
                }
            }, // 证件维护
            { path: 'cert/register',
                component: register,
                name: 'register',
                meta: {
                    name: '产品注册证',
                   
                    icon: 'icon-zhengjian',
                    open: ['4'] 
                }
            }, // 产品注册证
            { path: 'cert/electronic',
                component: electronic,
                name: 'electronic', 
                meta: {
                    name: '电子签章',
                    
                    icon: 'icon-zhengjian',
                    open: ['4']  
                }
            }, // 电子签章
            { path: 'cert/vendor',
                component: vendor,
                name: 'vendor', 
                meta: {
                    name: '生产厂商',
                   
                    icon: 'icon-zhengjian',
                    open: ['4']   
                }
            }, // 生产厂商
            { path: 'cert/entrust',
                component: entrust,
                name: 'entrust', 
                meta: {
                    name: '法人委托书',
                    
                    icon: 'icon-zhengjian',
                    open: ['4'] 
                }
            }, // 法人委托书
            { path: 'cert/promise',
                component: promise,
                name: 'promise', 
                meta: {
                    name: '销售承诺书',
                   
                    icon: 'icon-zhengjian',
                    open: ['4'] 
                }
            }, // 销售承诺书
            { path: 'cert/auth',
                component: certAuth,
                name: 'certAuth',
                meta: {
                    name: '经销授权书',
                    
                    icon: 'icon-zhengjian',
                    open: ['4']   
                }
            }, // 经销授权书
            { path: 'order',
                component: order,
                name: 'order',
                meta: {
                    name: '订单管理',
                    icon: 'icon-weifenxiaopcjiemianzhuanhuan'
                }
            }, // 订单管理
            { path: 'order/detail/:orderNo/:passkey',
                component: orderDetail,
                name: 'orderDetail', 
                meta: {
                    name: '订单管理',
                    icon: 'icon-weifenxiaopcjiemianzhuanhuan'
                }
            }, // 订单管理详情
            { path: 'logistic',
                component: logistic,
                name: 'logistic',
                meta: {
                    name: '配送管理',
                    icon: 'icon-peisong'
                }
            }, // 配送管理
            { path: 'logistic/detail/:deliveryNo/:passKey',
                component: logisticDetail,
                name: 'logisticDetail', 
                meta: {
                    name: '配送管理', 
                    icon: 'icon-peisong'
                }
            }, // 配送管理详情
            { path: 'return',
                component: salesReturn,
                name: 'return',
                meta: {
                    name: '退货管理',
                    icon: 'icon-ccgl-tuihuoyugao-4'
                }
            }, // 退货管理
            { path: 'return/detail/:returnOrderNo/:passKey',
                component: returnDetail,
                name: 'returnDetail',
                meta: {
                    name: '退货管理',
                    icon: 'icon-ccgl-tuihuoyugao-4'
                }
            }, // 退货管理详情
            { path: 'user',
                component: user,
                name: 'user',
                meta: {
                    name: '用户管理',
                    icon: 'icon-yonghuguanli'
                }
            }, // 用户管理
            { path: 'supplierChart',
                component: supplierChart,
                name: 'supplierChart',
                meta: {
                    name: '供应商销售',
                    icon: 'icon-statistics',
                    open: ['9'] 
                } 
            }, // 供应商销售
            { path: 'hospitalChart',
                component: hospitalChart,
                name: 'hospitalChart',
                meta: {
                    name: '客户采购',
                    icon: 'icon-statistics',
                    open: ['9'] 
                }
            }, // 客户销售
            { path: '*', redirect: '/index' } 
        ]
    }
];

