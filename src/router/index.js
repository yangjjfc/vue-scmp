const dashboard = r => require.ensure([], () => r(require('../pages/dashboard/Dashboard')), 'dashboard');
const index = r => require.ensure([], () => r(require('../pages/index/index')), 'index');
const supplier = r => require.ensure([], () => r(require('../pages/supplier/supplier')), 'supplier');
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
            { path: '/index', component: index, name: 'index' },
            { path: '/supplier', component: supplier, name: 'supplier' }
        ]
    }
];

