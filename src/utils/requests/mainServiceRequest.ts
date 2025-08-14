import { createAxiosRequest } from './axiosRequest.ts'

export const MainServiceRequest = createAxiosRequest(import.meta.env.VITE_MAIN_SERVICE_URL as string)