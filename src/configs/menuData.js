// 菜单路由 - 修改为多级菜单结构
export const menuData = [
    {
        path: '/dashboard',
        meta: { title: '仪表盘', icon: 'DashboardOutlined', permissionCode: 'dashboard:view' }
    },
    {
        path: '/user-management',
        meta: { title: '用户管理', icon: 'TeamOutlined', permissionCode: 'user:manage' },
        children: [
            { path: '/users', meta: { title: '用户列表', icon: 'UserOutlined', permissionCode: 'user:list' } },
            { path: '/user-roles', meta: { title: '角色管理', icon: 'SafetyOutlined', permissionCode: 'user:role:manage' } },
            { path: '/user-permissionCodes', meta: { title: '权限管理', icon: 'SecurityScanOutlined', permissionCode: 'user:permissionCode:manage' } }
        ]
    },
    {
        path: '/product-management',
        meta: { title: '商品管理', icon: 'AppstoreOutlined', permissionCode: 'product:manage' },
        children: [
            { path: '/products', meta: { title: '商品列表', icon: 'ShoppingOutlined', permissionCode: 'product:list' } },
            { path: '/product-categories', meta: { title: '商品分类', icon: 'AppstoreOutlined', permissionCode: 'product:category:manage' } },
            { path: '/product-inventory', meta: { title: '库存管理', icon: 'DatabaseOutlined', permissionCode: 'product:inventory:manage' } }
        ]
    },
    {
        path: '/order-management',
        meta: { title: '订单管理', icon: 'FileTextOutlined', permissionCode: 'order:manage' },
        children: [
            { path: '/orders', meta: { title: '订单列表', icon: 'ShoppingCartOutlined', permissionCode: 'order:list' } },
            { path: '/order-refunds', meta: { title: '退款管理', icon: 'FileTextOutlined', permissionCode: 'order:refund:manage' } }
        ]
    },
    {
        path: '/analytics-management',
        meta: { title: '数据分析', icon: 'BarChartOutlined', permissionCode: 'analytics:manage' },
        children: [
            { path: '/analytics', meta: { title: '销售分析', icon: 'LineChartOutlined', permissionCode: 'analytics:sales:view' } },
            { path: '/user-analytics', meta: { title: '用户分析', icon: 'PieChartOutlined', permissionCode: 'analytics:user:view' } },
            { path: '/traffic-analytics', meta: { title: '流量分析', icon: 'GlobalOutlined', permissionCode: 'analytics:traffic:view' } }
        ]
    },
    {
        path: '/settings',
        meta: { title: '系统设置', icon: 'SettingOutlined', permissionCode: 'system:settings:manage' }
    }
]
