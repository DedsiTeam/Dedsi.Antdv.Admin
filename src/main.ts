import { createApp } from 'vue'
import App from './App.vue'

import router from './router'

import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/reset.css'
import 'virtual:uno.css'

// 引入中文语言包
import zhCN from 'ant-design-vue/es/locale/zh_CN'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'

// 设置 dayjs 为中文
dayjs.locale('zh-cn')

const app = createApp(App)
app.use(router)
app.use(Antd)

// 配置 Ant Design Vue 使用中文
app.provide('$antLocale', zhCN)

app.mount('#app')
