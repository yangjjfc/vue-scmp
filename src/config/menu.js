import { state } from '@/store/index';
const createMenu = () => {
    let roles = state.roles;
    let MENU = [{
        name: '首页',
        icon: 'icon-index',
        state: '/index',
        hidden: roles.indexOf('platform:index') === -1
    }, {
        name: '供应商管理',
        icon: 'icon-qiye',
        state: '/supplier',
        hidden: roles.indexOf('platform:supplier') === -1
    }, {
        name: '客户管理',
        icon: 'icon-iconfontyiyuan',
        state: '/index',
        hidden: roles.indexOf('platform:hospital') === -1

    }, {
        name: '产品管理',
        icon: 'icon-chanpin1',
        state: '/product',
        hidden: roles.indexOf('platform:product') === -1
    }, {
        name: '证件管理',
        icon: 'icon-zhengjian',
        hidden: roles.indexOf('platform:certificate') === -1,
        son: [
            {
                name: '产品注册证',
                state: '/cert_register',
                hidden: roles.indexOf('platform:certificate:cert_regist') === -1
            },
            {
                name: '经销授权书',
                state: '/cert_auth',
                hidden: roles.indexOf('platform:certificate:cert_auth') === -1
            },
            {
                name: '生产厂商',
                state: '/cert_entrust',
                hidden: roles.indexOf('platform:certificate:cert_factory') === -1
            },
            {
                name: '法人委托书',
                state: '/signature',
                hidden: roles.indexOf('platform:certificate:cert_entrust') === -1
            },
            {
                name: '销售承诺书',
                state: '/cert_promise',
                hidden: roles.indexOf('platform:certificate:cert_commit') === -1
            },
            {
                name: '电子签章',
                state: '/cert_expire',
                hidden: roles.indexOf('platform:certificate:cert_sign') === -1
            },
            {
                name: '证件维护',
                state: '/cert_expire',
                hidden: roles.indexOf('platform:certificate:cert_maintain') === -1
            }
        ]
    }, {
        name: '订单管理',
        icon: 'icon-weifenxiaopcjiemianzhuanhuan',
        state: '/order',
        hidden: roles.indexOf('platform:order') === -1
    }, {
        name: '配送管理',
        icon: 'icon-peisong',
        state: '/logistic',
        hidden: roles.indexOf('platform:logistic') === -1
    }, {
        name: '退货管理',
        icon: 'icon-ccgl-tuihuoyugao-4',
        state: '/return',
        hidden: roles.indexOf('platform:return') === -1
    }, {
        name: '用户管理',
        icon: 'icon-yonghuguanli',
        hidden: roles.indexOf('platform:user') === -1,
        state: '/user'
    }, {
        name: '统计分析',
        icon: 'icon-statistics',
        // state: '/index',
        hidden: roles.indexOf('platform:chart') === -1,
        son: [
            {
                name: '供应商销售',
                state: '/supplierChart'
            },
            {
                name: '客户采购',
                state: '/hospitalChart'
            }
        ]
    }];
    return MENU;
};

export default createMenu;
