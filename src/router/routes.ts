import { RouteRecordRaw } from 'vue-router'
import Layout from "@/layout/Layout.vue";

export const routes: RouteRecordRaw[] = [
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/Login.vue')
    },
    {
        path: '/',
        component: Layout,
        redirect: '/dashboard',
        children: [
            {
                path: 'dashboard',
                name: 'Dashboard',
                component: () => import('../views/Dashboard.vue'),
                meta: { title: '仪表盘', icon: 'DashboardOutlined', permissionCode: 'dashboard:view' }
            },
            {
                path: 'users',
                name: 'Users',
                component: () => import('../views/Users.vue'),
                meta: { title: '用户管理', icon: 'UserOutlined', permissionCode: 'user:list' }
            },
            {
                path: 'products',
                name: 'Products',
                component: () => import('../views/Products.vue'),
                meta: { title: '产品管理', icon: 'ShoppingOutlined', permissionCode: 'product:list' }
            },
            {
                path: 'orders',
                name: 'Orders',
                component: () => import('../views/Orders.vue'),
                meta: { title: '订单管理', icon: 'ShoppingCartOutlined', permissionCode: 'order:list' }
            },
            {
                path: 'analytics',
                name: 'Analytics',
                component: () => import('../views/Analytics.vue'),
                meta: { title: '数据分析', icon: 'BarChartOutlined', permissionCode: 'analytics:sales:view' }
            },
            {
                path: 'settings',
                name: 'Settings',
                component: () => import('../views/Settings.vue'),
                meta: { title: '系统设置', icon: 'SettingOutlined', permissionCode: 'system:settings:manage' }
            }
        ]
    }
]
