import { MainServiceRequest } from '../utils/requests/mainServiceRequest.ts'
import type {
  ApiResponse
} from './types'

/**
 * 隐患整改责任单位相关API
 */
export class HazardReviewUnitApi {
  
  /**
   * 创建隐患整改责任单位
   * @param data 创建数据
   * @returns 创建结果
   */
  static async create(data: any): Promise<ApiResponse<string>> {
    return MainServiceRequest.post('/api/SafetyEnvProtection/HazardReviewUnit/Create', data)
  }

  /**
   * 修改隐患整改责任单位
   * @param id 单位ID
   * @param data 修改数据
   * @returns 修改结果
   */
  static async update(id: string, data: any): Promise<ApiResponse<void>> {
    return MainServiceRequest.post(`/api/SafetyEnvProtection/HazardReviewUnit/Update/${id}`, data)
  }

  /**
   * 删除隐患整改责任单位
   * @param id 单位ID
   * @returns 删除结果
   */
  static async delete(id: string): Promise<ApiResponse<void>> {
    return MainServiceRequest.post(`/api/SafetyEnvProtection/HazardReviewUnit/Delete/${id}`)
  }

  /**
   * 主键ID查询隐患整改责任单位
   * @param id 单位ID
   * @returns 单位详情
   */
  static async get(id: string): Promise<ApiResponse<any>> {
    return MainServiceRequest.get(`/api/SafetyEnvProtection/HazardReviewUnit/Get/${id}`)
  }

  /**
   * 获得我的隐患整改责任单位数据
   * @returns 我的数据列表
   */
  static async getMyData(): Promise<ApiResponse<any[]>> {
    return MainServiceRequest.get('/api/SafetyEnvProtection/HazardReviewUnit/GetMyData')
  }
}

/**
 * 风险评审单位相关API
 */
export class RiskReviewUnitApi {
  
  /**
   * 创建风险评审单位
   * @param data 创建数据
   * @returns 创建结果
   */
  static async create(data: any): Promise<ApiResponse<string>> {
    return MainServiceRequest.post('/api/SafetyEnvProtection/RiskReviewUnit/Create', data)
  }

  /**
   * 修改风险评审单位
   * @param id 单位ID
   * @param data 修改数据
   * @returns 修改结果
   */
  static async update(id: string, data: any): Promise<ApiResponse<void>> {
    return MainServiceRequest.post(`/api/SafetyEnvProtection/RiskReviewUnit/Update/${id}`, data)
  }

  /**
   * 删除风险评审单位
   * @param id 单位ID
   * @returns 删除结果
   */
  static async delete(id: string): Promise<ApiResponse<void>> {
    return MainServiceRequest.post(`/api/SafetyEnvProtection/RiskReviewUnit/Delete/${id}`)
  }

  /**
   * 主键ID查询风险评审单位
   * @param id 单位ID
   * @returns 单位详情
   */
  static async get(id: string): Promise<ApiResponse<any>> {
    return MainServiceRequest.get(`/api/SafetyEnvProtection/RiskReviewUnit/Get/${id}`)
  }

  /**
   * 获得我的风险评审单位数据
   * @returns 我的数据列表
   */
  static async getMyData(): Promise<ApiResponse<any[]>> {
    return MainServiceRequest.get('/api/SafetyEnvProtection/RiskReviewUnit/GetMyData')
  }
}
