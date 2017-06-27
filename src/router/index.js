const dashboard = r => require.ensure([], () => r(require('../pages/dashboard/Dashboard')), 'dashboard');
const supplierChart = r => require.ensure([], () => r(require('../pages/chart/supplier/SupplierChart')), 'chart');
const hospitalChart = r => require.ensure([], () => r(require('../pages/chart/hospital/HospitalChart')), 'chart');
const user = r => require.ensure([], () => r(require('../pages/user/User')), 'user');
const index = r => require.ensure([], () => r(require('../pages/index/index')), 'index');
const supplier = r => require.ensure([], () => r(require('../pages/supplier/supplier')), 'supplier');
const salesReturn = r => require.ensure([], () => r(require('../pages/return/Return')), 'return');
const returnDetail = r => require.ensure([], () => r(require('../pages/return/detail/ReturnDetail')), 'ReturnDetail');
import Auth from '../pages/auth/Auth';
export default [
    {
        path: '/', redirect: '/auth'
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
            { path: '/supplier', component: supplier, name: 'supplier' }
        ]
    }
];

