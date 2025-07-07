import { httpRequest } from '../utils/axiosRequest'
import type {
  ApiResponse,
  MonitoringEquipmentDto,
  MonitoringEquipmentByM3U8Dto,
  GetByM3U8Request,
  GetByRiskIdRequest,
  GetByHazardIdRequest
} from './types'

/**
 * 监控设备相关API
 */
export class MonitoringEquipmentApi {
  
  /**
   * 带监控直播流的全部详情
   * @param params 查询参数
   * @returns 监控设备详情（含直播流）
   */
  static async getByM3U8(params: GetByM3U8Request): Promise<ApiResponse<MonitoringEquipmentByM3U8Dto>> {
    return httpRequest.post('/api/SafetyEnvProtection/MonitoringEquipment/GetByM3U8', params)
  }

  /**
   * 只拿到播放地址
   * @param params 查询参数
   * @returns 播放地址
   */
  static async getUrlM3u8ByCameraIndexCode(params: GetByM3U8Request): Promise<ApiResponse<string>> {
    return httpRequest.post('/api/SafetyEnvProtection/MonitoringEquipment/GetUrlM3u8ByCameraIndexCode', params)
  }

  /**
   * 查找风险关联的监控设备
   * @param params 风险ID参数
   * @returns 监控设备列表
   */
  static async getByRiskId(params: GetByRiskIdRequest): Promise<ApiResponse<MonitoringEquipmentDto[]>> {
    return httpRequest.post('/api/SafetyEnvProtection/MonitoringEquipment/GetByRiskId', params)
  }

  /**
   * 查找隐患关联的监控设备
   * @param params 隐患ID参数
   * @returns 监控设备列表
   */
  static async getByHazardId(params: GetByHazardIdRequest): Promise<ApiResponse<MonitoringEquipmentDto[]>> {
    return httpRequest.post('/api/SafetyEnvProtection/MonitoringEquipment/GetByHazardId', params)
  }
}
