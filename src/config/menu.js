import { state } from '@/store/index';
const createMenu = () => {
    let roles = state.roles;
    let MENU = [{
        name: '首页',
        icon: 'el-icon-message',
        state: '/charts',
        hidden: roles.indexOf('supplier:index') === -1
    }, {
        name: '企业信息',
        icon: 'el-icon-menu',
        hidden: roles.indexOf('supplier:my_supplier') === -1,
        son: [
            {
                name: '账户管理',
                state: '/account',
                hidden: roles.indexOf('supplier:my_supplier:my_account') === -1
            },
            {
                name: '企业信息',
                state: '/supplier',
                hidden: roles.indexOf('supplier:my_supplier:my_supplier') === -1
            },
            {
                name: '员工管理',
                state: '/staff',
                hidden: roles.indexOf('supplier:my_supplier:my_staff') === -1
            },
            {
                name: '电子签章',
                state: '/signature',
                hidden: roles.indexOf('supplier:my_supplier:signature') === -1
            }
        ]
    }, {
        name: '客户管理',
        icon: 'el-icon-menu',
        hidden: roles.indexOf('supplier:hospital') === -1,
        son: [
            {
                name: '客户列表',
                state: '/customerList',
                hidden: roles.indexOf('supplier:hospital:list:addHospital') === -1
            },
            {
                name: '新客户',
                state: '/newCustomer',
                hidden: roles.indexOf('supplier:hospital:access') === -1
            }
        ]
    }, {
        name: '产品管理',
        icon: 'el-icon-menu',
        state: '/product',
        hidden: roles.indexOf('supplier:product') === -1
    }, {
        name: '证件管理',
        icon: 'el-icon-menu',
        hidden: roles.indexOf('supplier:certificate') === -1,
        son: [
            {
                name: '产品注册证',
                state: '/cert_register',
                hidden: roles.indexOf('supplier:certificate:cert_auth') === -1
            },
            {
                name: '经销授权书',
                state: '/cert_auth',
                hidden: roles.indexOf('supplier:certificate:cert_register') === -1
            },
            {
                name: '生产厂商',
                state: '/cert_entrust',
                hidden: roles.indexOf('supplier:certificate:cert_vendor') === -1
            },
            {
                name: '法人委托书',
                state: '/signature',
                hidden: roles.indexOf('supplier:certificate:cert_proxy') === -1
            },
            {
                name: '销售承诺书',
                state: '/cert_promise',
                hidden: roles.indexOf('supplier:certificate:cert_promise') === -1
            },
            {
                name: '证件过期提醒',
                state: '/cert_expire',
                hidden: roles.indexOf('supplier:certificate:cert_expire') === -1
            }
        ]
    }, {
        name: '订单管理',
        icon: 'el-icon-menu',
        hidden: roles.indexOf('supplier:order') === -1,
        son: [
            {
                name: '销售订单',
                state: '/order',
                hidden: roles.indexOf('supplier:order:order_purchase') === -1
            },
            {
                name: '退货订单',
                state: '/order_return',
                hidden: roles.indexOf('supplier:order:order_return') === -1
            },
            {
                name: '直发订单',
                state: '/order_send',
                hidden: roles.indexOf('supplier:order:order_send') === -1
            }
        ]
    }, {
        name: '配送订单',
        icon: 'el-icon-menu',
        state: '/logistic',
        hidden: roles.indexOf('supplier:logistic') === -1
    }, {
        name: '设备管理',
        icon: 'el-icon-menu',
        hidden: roles.indexOf('supplier:eqManager') === -1,
        son: [
            {
                name: '设备合同',
                state: '/eqInfo',
                hidden: roles.indexOf('supplier:eqManager:eqInfo') === -1
            },
            {
                name: '设备列表',
                state: '/eqList',
                hidden: roles.indexOf('supplier:eqManager:eqList') === -1
            },
            {
                name: '设备统计',
                state: '/eqcount',
                hidden: roles.indexOf('supplier:eqManager:eqCount') === -1
            },
            {
                name: '数据字典',
                state: '/dictionary',
                hidden: roles.indexOf('supplier:eqManager:dictionary') === -1
            }
        ]
    }, {
        name: '分销管理',
        icon: 'el-icon-menu',
        hidden: roles.indexOf('supplier:sales') === -1,
        son: [
            {
                name: '分销订单',
                state: '/orderSales',
                hidden: roles.indexOf('supplier:sales:sales_order') === -1
            },
            {
                name: '分销客户',
                state: '/sales_vendor',
                hidden: roles.indexOf('supplier:sales:sales_vendor') === -1
            }
        ]
    }, {
        name: '医院库存',
        icon: 'el-icon-menu',
        hidden: roles.indexOf('supplier:stock') === -1,
        state: '/stock'
    }, {
        name: '统计分析',
        icon: 'el-icon-menu',
        hidden: roles.indexOf('supplier:chart') === -1,
        son: [
            {
                name: '销售统计',
                state: '/chart',
                hidden: roles.indexOf('supplier:chart') === -1
            }
        ]
    }, {
        name: '消息提醒',
        icon: 'el-icon-menu',
        hidden: false,
        state: '/message'
    }];
    return MENU;
};

export default createMenu;
