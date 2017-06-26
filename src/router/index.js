const dashboard = r => require.ensure([], () => r(require('../pages/dashboard/Dashboard')), 'dashboard');
const index = r => require.ensure([], () => r(require('../pages/index/index')), 'index');
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
            { path: '/index', component: index, name: 'index' }
        ]
    }
];

