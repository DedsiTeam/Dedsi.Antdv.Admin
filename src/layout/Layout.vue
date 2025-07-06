<template>
  <a-layout class="admin-layout">
    <!-- 侧边栏 -->
    <a-layout-sider
      v-model:collapsed="collapsed"
      :trigger="null"
      collapsible
      width="200"
      collapsed-width="80"
      class="sider"
      :style="{
        background: '#001529',
        boxShadow: '2px 0 8px rgba(0,0,0,0.15)'
      }"
    >
      <!-- Logo区域 -->
      <div class="logo">
        <div class="logo-img">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <rect width="32" height="32" rx="8" fill="#fff"/>
            <path d="M8 8h16v16H8z" fill="url(#gradient)"/>
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#667eea"/>
                <stop offset="100%" stop-color="#764ba2"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
        <h1 v-if="!collapsed" class="logo-title">Admin Pro</h1>
      </div>

      <!-- 导航菜单 -->
      <a-menu
        v-model:selectedKeys="selectedKeys"
        v-model:openKeys="openKeys"
        mode="inline"
        theme="dark"
        class="custom-menu"
        :style="{ background: 'transparent', border: 'none' }"
      >
        <template v-for="route in menuData" :key="route.path">
          <!-- 有子菜单的情况 -->
          <a-sub-menu v-if="route.children && route.children.length > 0" :key="route.path" class="menu-item">
            <template #icon>
              <component :is="getIconComponent(route.meta.icon)" />
            </template>
            <template #title>
              <span class="menu-title">{{ route.meta.title }}</span>
            </template>
            <a-menu-item
              v-for="child in route.children"
              :key="child.path"
              @click="$router.push(child.path)"
              class="sub-menu-item"
            >
              <template #icon v-if="child.meta.icon">
                <component :is="getIconComponent(child.meta.icon)" />
              </template>
              <span class="menu-title">{{ child.meta.title }}</span>
            </a-menu-item>
          </a-sub-menu>

          <!-- 没有子菜单的情况 -->
          <a-menu-item
            v-else
            :key="route.path"
            @click="$router.push(route.path)"
            class="menu-item"
          >
            <template #icon>
              <component :is="getIconComponent(route.meta.icon)" />
            </template>
            <span class="menu-title">{{ route.meta.title }}</span>
          </a-menu-item>
        </template>
      </a-menu>
    </a-layout-sider>

    <!-- 右侧主体区域 -->
    <a-layout :class="['main-layout', { 'collapsed': collapsed }]">
      <!-- 顶部导航栏 -->
      <a-layout-header class="header">
        <div class="header-left">
          <div @click="collapsed = !collapsed" id="collapsed-div">
            <MenuUnfoldOutlined v-if="collapsed" />
            <MenuFoldOutlined v-else />
          </div>

          <a-breadcrumb class="breadcrumb">
            <a-breadcrumb-item>
              <HomeOutlined />
              <span>首页</span>
            </a-breadcrumb-item>
            <a-breadcrumb-item>{{ currentPageTitle }}</a-breadcrumb-item>
          </a-breadcrumb>
        </div>

        <div class="header-right">
          <!-- 全屏按钮 -->
          <a-button type="text" shape="circle" @click="toggleFullscreen" class="action-btn">
            <template #icon>
              <ExpandOutlined v-if="!isFullscreen" />
              <CompressOutlined v-else />
            </template>
          </a-button>

          <!-- 用户下拉菜单 -->
          <a-dropdown placement="bottomRight">
            <div class="user-info">
              <a-avatar
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face"
                size="small"
              />
              <span class="username">管理员</span>
              <DownOutlined class="dropdown-icon" />
            </div>
            <template #overlay>
              <a-menu>
                <a-menu-item key="profile">
                  <UserOutlined />
                  个人中心
                </a-menu-item>
                <a-menu-item key="settings">
                  <SettingOutlined />
                  账户设置
                </a-menu-item>
                <a-menu-divider />
                <a-menu-item key="logout">
                  <LogoutOutlined />
                  退出登录
                </a-menu-item>
              </a-menu>
            </template>
          </a-dropdown>
        </div>
      </a-layout-header>

      <!-- 主内容区域 -->
      <a-layout-content class="content">
        <div class="content-wrapper">
          <router-view />
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  HomeOutlined,
  ExpandOutlined,
  CompressOutlined,
  DownOutlined,
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
  DashboardOutlined,
  ShoppingOutlined,
  ShoppingCartOutlined,
  BarChartOutlined,
  TeamOutlined,
  SafetyOutlined,
  AppstoreOutlined,
  FileTextOutlined,
  DatabaseOutlined,
  LineChartOutlined,
  PieChartOutlined,
  GlobalOutlined,
  SecurityScanOutlined
} from '@ant-design/icons-vue'

import { menuData } from '../configs/menuData.js'

const route = useRoute()
const router = useRouter()

const collapsed = ref(false)
const isFullscreen = ref(false)
const openKeys = ref([])

// 当前选中的菜单
const selectedKeys = computed(() => [route.path])

// 当前页面标题 - 修改以支持多级菜单
const currentPageTitle = computed(() => {
  // 先在一级菜单中查找
  let currentRoute = menuData.find(r => r.path === route.path)
  if (currentRoute) {
    return currentRoute.meta.title
  }

  // 在二级菜单中查找
  for (const parentRoute of menuData) {
    if (parentRoute.children) {
      const childRoute = parentRoute.children.find(c => c.path === route.path)
      if (childRoute) {
        return childRoute.meta.title
      }
    }
  }

  return '首页'
})

// 获取图标组件
const getIconComponent = (iconName) => {
  const iconMap = {
    DashboardOutlined,
    UserOutlined,
    ShoppingOutlined,
    ShoppingCartOutlined,
    BarChartOutlined,
    SettingOutlined,
    TeamOutlined,
    SafetyOutlined,
    AppstoreOutlined,
    FileTextOutlined,
    DatabaseOutlined,
    LineChartOutlined,
    PieChartOutlined,
    GlobalOutlined,
    SecurityScanOutlined
  }
  return iconMap[iconName]
}

// 搜索功能
const onSearch = (value) => {
  console.log('搜索:', value)
}

// 全屏切换
const toggleFullscreen = () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen()
    isFullscreen.value = true
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen()
      isFullscreen.value = false
    }
  }
}

// 监听全屏状态变化
const handleFullscreenChange = () => {
  isFullscreen.value = !!document.fullscreenElement
}

onMounted(() => {
  document.addEventListener('fullscreenchange', handleFullscreenChange)
})

onUnmounted(() => {
  document.removeEventListener('fullscreenchange', handleFullscreenChange)
})
</script>

<style scoped>
.admin-layout {
  min-height: 100vh;
}

.sider {
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  z-index: 100;
  transition: all 0.2s;
}

/* 右侧主体区域布局 */
.main-layout {
  margin-left: 200px;
  transition: margin-left 0.2s ease;
  min-height: 100vh;
}

.main-layout.collapsed {
  margin-left: 80px;
}

.logo {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  justify-content: center;
  height: 64px;
}

.logo-img {
  flex-shrink: 0;
}

.logo-title {
  color: white;
  font-size: 20px;
  font-weight: bold;
  white-space: nowrap;
  margin: 0 0 0 1rem;
}

div#collapsed-div{
  cursor: pointer;
  margin-right: 1rem;
  font-size: 1rem;
}

.custom-menu .menu-item {
  margin: 8px 0;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.custom-menu .menu-item:hover {
  background: rgba(255, 255, 255, 0.1) !important;
  transform: translateX(4px);
}

.custom-menu .menu-item.ant-menu-item-selected {
  background: rgba(255, 255, 255, 0.2) !important;
  color: #fff !important;
}

.menu-title {
  font-weight: 500;
}

.header {
  background: #fff;
  padding: 0 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  position: sticky;
  top: 0;
  z-index: 99;
}

.header-left {
  display: flex;
  align-items: center;
}

.breadcrumb {
  font-size: 14px;
}

.header-right {
  display: flex;
  align-items: center;
}

.action-btn {
  margin-right: 16px;
  color: #666;
  transition: color 0.3s;
}

.action-btn:hover {
  color: #1890ff;
}

.user-info {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 8px;
  transition: background-color 0.3s;
}

.user-info:hover {
  background: #f5f5f5;
}

.username {
  margin: 0 8px;
  font-weight: 500;
  color: #333;
}

.dropdown-icon {
  font-size: 12px;
  color: #666;
}

.content {
  margin: 1rem;
  background: #fff;
  border-radius: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.content-wrapper {
  padding: 24px;
  min-height: calc(100vh - 200px);
}

.footer {
  background: #f0f2f5;
  border-top: 1px solid #e8e8e8;
  padding: 16px 24px;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #666;
  font-size: 14px;
}

.footer-links {
  display: flex;
  gap: 16px;
}

.footer-link {
  color: #666;
  text-decoration: none;
  transition: color 0.3s;
}

.footer-link:hover {
  color: #1890ff;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .main-layout {
    margin-left: 0;
  }

  .main-layout.collapsed {
    margin-left: 0;
  }

  .sider {
    transform: translateX(-100%);
  }

  .sider.collapsed {
    transform: translateX(0);
  }

  .header {
    padding: 0 16px;
  }

  .content {
    margin: 16px;
  }

  .username {
    display: none;
  }
}
</style>
