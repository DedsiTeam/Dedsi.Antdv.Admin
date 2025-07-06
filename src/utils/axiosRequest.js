import axios from 'axios'
import { message } from "ant-design-vue";

export const httpRequest = axios.create({
    baseURL: import.meta.env.VITE_APIUrl
})

// 请求拦截器
httpRequest.interceptors.request.use(
    config => {
        // 这里可以添加 token 或其他自定义逻辑
        const token = localStorage.getItem('accessToken')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

// 响应拦截器
httpRequest.interceptors.response.use(
    response => {
        // 可以统一处理响应数据
        return response.data
    },
    error => {
        if (error.response && error.response.status === 401) {
            message.error({
                content: '登录已过期，请重新登录',
                duration: 2,
                onClose: () => {
                    window.location.href = '/login'
                }
            })
        } else if (error.response && error.response.data && error.response.data.error && error.response.data.error.message) {
            message.error(error.response.data.error.message)
        }
        return Promise.reject(error)
    }
)
