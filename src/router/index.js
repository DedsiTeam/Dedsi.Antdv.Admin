import { createRouter, createWebHistory } from 'vue-router'
import { routes } from './routes'

const router = createRouter({
  history: createWebHistory(),
  routes
})

// 路由守卫，检测 accessToken
router.beforeEach((to, from, next) => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken && to.path !== '/login') {
        next('/login');
    } else {
        next();
    }
});

export default router
