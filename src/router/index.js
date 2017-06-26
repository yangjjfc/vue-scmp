const dashboard = r => require.ensure([], () => r(require('../pages/dashboard/Dashboard')), 'dashboard');
const charts = r => require.ensure([], () => r(require('../pages/echarts/echarts')), 'charts');
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
            { path: '/charts', component: charts, name: 'charts' }
        ]
    }
];

