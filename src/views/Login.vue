<template>
  <div class="login-container">
    <!-- 背景装饰 -->
    <div class="background-decoration">
      <!-- 浮动圆形 -->
      <div class="decoration-circle circle-1"></div>
      <div class="decoration-circle circle-2"></div>
      <div class="decoration-circle circle-3"></div>
      <div class="decoration-circle circle-4"></div>
      <div class="decoration-circle circle-5"></div>

      <!-- 几何形状 -->
      <div class="decoration-shape square-1"></div>
      <div class="decoration-shape square-2"></div>

      <!-- 粒子效果 -->
      <div class="particles">
        <div class="particle" v-for="n in 20" :key="n" :style="getParticleStyle(n)"></div>
      </div>

      <!-- 波浪装饰 -->
      <div class="wave-decoration">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M0,60 C120,100 240,20 360,60 C480,100 600,20 720,60 C840,100 960,20 1080,60 L1200,60 L1200,0 L0,0 Z"
                fill="rgba(255,255,255,0.1)"></path>
        </svg>
      </div>

      <!-- 光晕效果 -->
      <div class="glow-orb glow-1"></div>
      <div class="glow-orb glow-2"></div>
      <div class="glow-orb glow-3"></div>

      <!-- 星星点缀 -->
      <div class="stars">
        <div class="star" v-for="n in 15" :key="`star-${n}`" :style="getStarStyle(n)"></div>
      </div>

      <!-- 渐变球体 -->
      <div class="gradient-spheres">
        <div class="sphere sphere-1"></div>
        <div class="sphere sphere-2"></div>
        <div class="sphere sphere-3"></div>
        <div class="sphere sphere-4"></div>
      </div>

      <!-- 脉冲环 -->
      <div class="pulse-rings">
        <div class="pulse-ring ring-1"></div>
        <div class="pulse-ring ring-2"></div>
        <div class="pulse-ring ring-3"></div>
      </div>
    </div>

    <!-- 登录表单卡片 -->
    <div class="login-card">
      <!-- Logo 和标题 -->
      <div class="login-header">
        <div class="logo">
          <svg width="48" height="48" viewBox="0 0 32 32" fill="none">
            <rect width="32" height="32" rx="8" fill="#001529"/>
            <path d="M8 8h16v16H8z" fill="url(#gradient)"/>
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#1890ff"/>
                <stop offset="100%" stop-color="#001529"/>
              </linearGradient>
            </defs>
          </svg>
        </div>
        <h1 class="login-title">Admin Pro</h1>
        <p class="login-subtitle">欢迎回来，请登录您的账户</p>
      </div>

      <!-- 登录表单 -->
      <a-form
        :model="loginForm"
        :rules="rules"
        @finish="handleLogin"
        @finishFailed="handleLoginFailed"
        layout="vertical"
        class="login-form"
      >
        <a-form-item
          label="用户名"
          name="username"
          class="form-item"
        >
          <a-input
            v-model:value="loginForm.username"
            size="large"
            placeholder="请输入用户名"
            class="input-field"
          >
            <template #prefix>
              <UserOutlined class="input-icon" />
            </template>
          </a-input>
        </a-form-item>

        <a-form-item
          label="密码"
          name="password"
          class="form-item"
        >
          <a-input-password
            v-model:value="loginForm.password"
            size="large"
            placeholder="请输入密码"
            class="input-field"
          >
            <template #prefix>
              <LockOutlined class="input-icon" />
            </template>
          </a-input-password>
        </a-form-item>

        <a-form-item class="form-options">
          <div class="options-row">
            <a-checkbox v-model:checked="loginForm.remember">
              记住我
            </a-checkbox>
            <a href="#" class="forgot-password">忘记密码？</a>
          </div>
        </a-form-item>

        <a-form-item>
          <a-button
            type="primary"
            html-type="submit"
            size="large"
            :loading="loading"
            block
          >
            {{ loading ? '登录中...' : '登录' }}
          </a-button>
        </a-form-item>
      </a-form>
    </div>

    <!-- 版��信息 -->
    <div class="copyright">
      <span>© 2025 Admin Pro. 技术支持：Vue3 + Ant Design Vue</span>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { message } from 'ant-design-vue'
import {
  UserOutlined,
  LockOutlined
} from '@ant-design/icons-vue'

const router = useRouter()
const loading = ref(false)

// 登录表单数据
const loginForm = reactive({
  username: '',
  password: '',
  remember: false
})

// 表单验证规则
const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 20, message: '用户名长度在 3 到 20 个字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { min: 6, max: 20, message: '密码长度在 6 到 20 个字符', trigger: 'blur' }
  ]
}

// 登录处理
const handleLogin = async (values) => {
  loading.value = true
  try {
    // 模拟登录请求
    await new Promise(resolve => setTimeout(resolve, 1500))

    // 这里应该调用实际的登录API
    console.log('登录信息:', values)

    message.success('登录成功！')

    localStorage.setItem('accessToken', 'localStoragelocalStoragelocalStorage')

    // 登录成功后跳转到仪表盘
    router.push('/dashboard')
  } catch (error) {
    message.error('登录失败，请检查用户名和密码')
  } finally {
    loading.value = false
  }
}

// 登录失败处理
const handleLoginFailed = (errorInfo) => {
  console.log('登录失败:', errorInfo)
  message.error('请检查输入信息')
}

onMounted(function () {
  localStorage.clear()
  sessionStorage.clear()
})

// 粒子效果样式
const getParticleStyle = (n) => {
  const size = Math.random() * 8 + 4
  const position = Math.random() * 100
  const delay = Math.random() * 5
  const duration = Math.random() * 2 + 3
  return {
    width: `${size}px`,
    height: `${size}px`,
    left: `${position}%`,
    animationDelay: `-${delay}s`,
    animationDuration: `${duration}s`,
    opacity: Math.random()
  }
}

// 星星样式
const getStarStyle = (n) => {
  const size = Math.random() * 3 + 2
  const positionX = Math.random() * 100
  const positionY = Math.random() * 100
  const animationDuration = Math.random() * 2 + 3
  return {
    width: `${size}px`,
    height: `${size}px`,
    left: `${positionX}%`,
    top: `${positionY}%`,
    animationDuration: `${animationDuration}s`,
    opacity: Math.random()
  }
}
</script>

<style scoped>
.login-container {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #1677ff 0%, #1f78fc 100%);
  position: relative;
  overflow: hidden;
}

/* 背景装饰 */
.background-decoration {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 0;
}

.decoration-circle {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  animation: float 6s ease-in-out infinite;
}

.circle-1 {
  width: 200px;
  height: 200px;
  top: 5%;
  left: 5%;
  animation-delay: 0s;
}

.circle-2 {
  width: 150px;
  height: 150px;
  top: 65%;
  right: 5%;
  animation-delay: 2s;
}

.circle-3 {
  width: 100px;
  height: 100px;
  bottom: 30%;
  left: 30%;
  animation-delay: 4s;
}

.circle-4 {
  width: 180px;
  height: 180px;
  top: 35%;
  right: 25%;
  animation-delay: 1s;
}

.circle-5 {
  width: 120px;
  height: 120px;
  bottom: 5%;
  left: 60%;
  animation-delay: 3s;
}

.decoration-shape {
  position: absolute;
  background: rgba(255, 255, 255, 0.1);
  animation: float 8s ease-in-out infinite;
}

.square-1 {
  width: 80px;
  height: 80px;
  top: 25%;
  left: 8%;
  animation-delay: 2s;
}

.square-2 {
  width: 100px;
  height: 100px;
  bottom: 25%;
  right: 15%;
  animation-delay: 4.5s;
}

.particles {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  pointer-events: none;
}

.particle {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.8);
  opacity: 0.8;
  animation: particle-float 10s linear infinite;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(180deg);
  }
}

@keyframes particle-float {
  0% {
    transform: translateY(0) scale(1);
  }
  50% {
    transform: translateY(-10px) scale(0.8);
  }
  100% {
    transform: translateY(0) scale(1);
  }
}

/* 波浪装饰 */
.wave-decoration {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 120px;
  z-index: 0;
}

.wave-decoration svg {
  width: 100%;
  height: 100%;
  animation: wave-move 20s ease-in-out infinite;
}

@keyframes wave-move {
  0%, 100% {
    transform: translateX(0);
  }
  50% {
    transform: translateX(-50px);
  }
}

/* 光晕效果 */
.glow-orb {
  position: absolute;
  border-radius: 50%;
  filter: blur(40px);
  animation: glow-pulse 8s ease-in-out infinite;
}

.glow-1 {
  width: 300px;
  height: 300px;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.3) 0%, transparent 70%);
  top: 15%;
  left: 15%;
  animation-delay: 0s;
}

.glow-2 {
  width: 200px;
  height: 200px;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.2) 0%, transparent 70%);
  bottom: 20%;
  right: 20%;
  animation-delay: 3s;
}

.glow-3 {
  width: 400px;
  height: 400px;
  background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%);
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation-delay: 1.5s;
}

@keyframes glow-pulse {
  0%, 100% {
    opacity: 0.5;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.1);
  }
}

/* 星星样式 */
.stars {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.star {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.8);
  animation: twinkle 2s infinite;
}

@keyframes twinkle {
  0%, 100% {
    opacity: 0.8;
  }
  50% {
    opacity: 1;
  }
}

/* 渐变球体 */
.gradient-spheres {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.sphere {
  position: absolute;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  animation: sphere-move 6s ease-in-out infinite;
}

.sphere-1 {
  width: 100px;
  height: 100px;
  top: 10%;
  left: 10%;
  animation-delay: 0s;
}

.sphere-2 {
  width: 80px;
  height: 80px;
  top: 30%;
  right: 10%;
  animation-delay: 2s;
}

.sphere-3 {
  width: 120px;
  height: 120px;
  bottom: 20%;
  left: 20%;
  animation-delay: 4s;
}

.sphere-4 {
  width: 90px;
  height: 90px;
  bottom: 10%;
  right: 20%;
  animation-delay: 1s;
}

@keyframes sphere-move {
  0%, 100% {
    transform: translateY(0) scale(1);
  }
  50% {
    transform: translateY(-10px) scale(1.1);
  }
}

/* 脉冲环 */
.pulse-rings {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
}

.pulse-ring {
  position: absolute;
  border-radius: 50%;
  border: 2px solid rgba(255, 255, 255, 0.3);
  animation: pulse-ring 3s ease-in-out infinite;
}

.ring-1 {
  width: 150px;
  height: 150px;
  top: 20%;
  left: 20%;
  animation-delay: 0s;
}

.ring-2 {
  width: 200px;
  height: 200px;
  top: 30%;
  right: 10%;
  animation-delay: 1s;
}

.ring-3 {
  width: 120px;
  height: 120px;
  bottom: 10%;
  left: 40%;
  animation-delay: 2s;
}

@keyframes pulse-ring {
  0%, 100% {
    transform: scale(1);
    opacity: 0.7;
  }
  50% {
    transform: scale(1.05);
    opacity: 1;
  }
}

/* 登录卡片 */
.login-card {
  background: #fff;
  border-radius: 16px;
  padding: 48px;
  width: 100%;
  max-width: 420px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
  z-index: 1;
  position: relative;
  backdrop-filter: blur(10px);
}

/* 登录头部 */
.login-header {
  text-align: center;
  margin-bottom: 32px;
}

.logo {
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
}

.login-title {
  font-size: 28px;
  font-weight: bold;
  color: #001529;
  margin: 0 0 8px 0;
  background: linear-gradient(135deg, #001529 0%, #1890ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.login-subtitle {
  color: #666;
  font-size: 14px;
  margin: 0;
}

/* 表单样式 */
.login-form {
  margin-bottom: 24px;
}

.form-item {
  margin-bottom: 24px;
}

.input-field {
  border-radius: 8px;
  border: 1px solid #d9d9d9;
  transition: all 0.3s;
}

.input-field:hover {
  border-color: #1890ff;
}

.input-field:focus,
.input-field.ant-input-focused {
  border-color: #1890ff;
  box-shadow: 0 0 0 2px rgba(24, 144, 255, 0.2);
}

.input-icon {
  color: #999;
}

.form-options {
  margin-bottom: 32px;
}

.options-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.forgot-password {
  color: #1890ff;
  text-decoration: none;
  font-size: 14px;
  transition: color 0.3s;
}

.forgot-password:hover {
  color: #40a9ff;
}

/* 版权信息 */
.copyright {
  position: absolute;
  bottom: 24px;
  left: 50%;
  transform: translateX(-50%);
  color: rgba(255, 255, 255, 0.8);
  font-size: 14px;
  z-index: 1;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .login-card {
    margin: 20px;
    padding: 32px 24px;
  }

  .login-title {
    font-size: 24px;
  }

  .copyright {
    position: static;
    margin-top: 24px;
    transform: none;
    text-align: center;
  }
}

@media (max-width: 480px) {
  .login-card {
    margin: 16px;
    padding: 24px 20px;
  }

  .social-login {
    gap: 12px;
  }
}
</style>
