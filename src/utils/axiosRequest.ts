import axios, { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse, AxiosError } from 'axios'
import { message } from "ant-design-vue";

// 定义 API 错误响应的类型
interface ErrorResponse {
  error?: {
    message: string;
  };
}

export const httpRequest: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_APIUrl
})

// 请求拦截器
httpRequest.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        // 这里可以添加 token 或其他自定义逻辑
        const token = localStorage.getItem('accessToken')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error: AxiosError) => {
        return Promise.reject(error)
    }
)

// 响应拦截器
httpRequest.interceptors.response.use(
    (response: AxiosResponse) => {
        // 可以统一处理响应数据
        return response.data
    },
    (error: AxiosError<ErrorResponse>) => {
        if (error.response && error.response.status === 401) {
            message.error({
                content: '登录已过期，请重新登录',
                duration: 2,
                onClose: () => {
                    window.location.href = '/login'
                }
            })
        } else if (error.response?.data?.error?.message) {
            message.error(error.response.data.error.message)
        }
        return Promise.reject(error)
    }
)
