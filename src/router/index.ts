import { createRouter, createWebHistory, Router, RouteLocationNormalized, NavigationGuardNext } from 'vue-router'
import { routes } from './routes'

const router: Router = createRouter({
  history: createWebHistory(),
  routes
})

// 路由守卫，检测 accessToken
router.beforeEach((to: RouteLocationNormalized, _from: RouteLocationNormalized, next: NavigationGuardNext) => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken && to.path !== '/login') {
        next('/login');
    } else {
        next();
    }
});

export default router
