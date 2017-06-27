const dashboard = r => require.ensure([], () => r(require('../pages/dashboard/Dashboard')), 'dashboard');
const charts = r => require.ensure([], () => r(require('../pages/echarts/echarts')), 'charts');
const supplierChart = r => require.ensure([], () => r(require('../pages/chart/supplier/SupplierChart')), 'chart');
const hospitalChart = r => require.ensure([], () => r(require('../pages/chart/hospital/HospitalChart')), 'chart');
const user = r => require.ensure([], () => r(require('../pages/user/User')), 'user');
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
            { path: '/index', component: charts, name: 'charts' },
            { path: '/supplierChart', component: supplierChart, name: 'supplierChart' },
            { path: '/hospitalChart', component: hospitalChart, name: 'hospitalChart' },
            { path: '/user', component: user, name: 'user' }
        ]
    }
];

