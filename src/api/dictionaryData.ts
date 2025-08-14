import { MainServiceRequest } from '../utils/requests/mainServiceRequest.ts'
import type {
  ApiResponse,
  DictionaryDataSelectDto,
  SaveMyDataInputDto
} from './types'

/**
 * 字典数据相关API
 */
export class DictionaryDataApi {
  
  /**
   * 获得我的风险字典数据
   * @returns 风险字典数据列表
   */
  static async getMyRiskData(): Promise<ApiResponse<DictionaryDataSelectDto[]>> {
    return MainServiceRequest.get('/api/SafetyEnvProtection/DictionaryData/GetMyRiskData')
  }

  /**
   * 获得我的隐患字典数据
   * @returns 隐患字典数据列表
   */
  static async getMyHazardData(): Promise<ApiResponse<DictionaryDataSelectDto[]>> {
    return MainServiceRequest.get('/api/SafetyEnvProtection/DictionaryData/GetMyHazardData')
  }

  /**
   * 保存我的字典数据（风险）
   * @param data 保存的字典数据
   * @returns 保存结果
   */
  static async saveMyDataByRisk(data: SaveMyDataInputDto): Promise<ApiResponse<void>> {
    return MainServiceRequest.post('/api/SafetyEnvProtection/DictionaryData/SaveMyDataByRisk', data)
  }

  /**
   * 保存我的字典数据（隐患）
   * @param data 保存的字典数据
   * @returns 保存结果
   */
  static async saveMyDataByHazard(data: SaveMyDataInputDto): Promise<ApiResponse<void>> {
    return MainServiceRequest.post('/api/SafetyEnvProtection/DictionaryData/SaveMyDataByHazard', data)
  }
}