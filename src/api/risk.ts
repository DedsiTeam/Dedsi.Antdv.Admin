import { httpRequest } from '../utils/axiosRequest'
import type {
  ApiResponse,
  PagedResult,
  RiskDto,
  RiskPagedInputDto,
  RiskPagedRowDto,
  RiskTypeSelectDto,
  RiskMapDataDto,
  GetListByIdRequest
} from './types'

/**
 * 风险相关API
 */
export class RiskApi {
  
  /**
   * 保存至草稿
   * @param data 风险数据
   * @returns 保存结果
   */
  static async saveToDraft(data: RiskDto): Promise<ApiResponse<string>> {
    return httpRequest.post('/api/SafetyEnvProtection/Risk/SaveToDraft', data)
  }

  /**
   * 创建风险
   * @param data 风险数据
   * @returns 创建结果
   */
  static async create(data: RiskDto): Promise<ApiResponse<string>> {
    return httpRequest.post('/api/SafetyEnvProtection/Risk/Create', data)
  }

  /**
   * 修改风险
   * @param id 风险ID
   * @param data 风险数据
   * @returns 修改结果
   */
  static async update(id: string, data: RiskDto): Promise<ApiResponse<void>> {
    return httpRequest.post(`/api/SafetyEnvProtection/Risk/Update/${id}`, data)
  }

  /**
   * 删除风险
   * @param id 风险ID
   * @returns 删除结果
   */
  static async delete(id: string): Promise<ApiResponse<void>> {
    return httpRequest.post(`/api/SafetyEnvProtection/Risk/Delete/${id}`)
  }

  /**
   * 查询风险详情
   * @param id 风险ID
   * @returns 风险详情
   */
  static async get(id: string): Promise<ApiResponse<RiskDto>> {
    return httpRequest.get(`/api/SafetyEnvProtection/Risk/Get/${id}`)
  }

  /**
   * 风险分级管控分页查询
   * @param params 查询参数
   * @returns 分页查询结果
   */
  static async pagedQuery(params: RiskPagedInputDto): Promise<ApiResponse<PagedResult<RiskPagedRowDto>>> {
    return httpRequest.post('/api/SafetyEnvProtection/Risk/PagedQuery', params)
  }

  /**
   * 风险分级管控不分页查询
   * @param params 查询参数
   * @returns 查询结果
   */
  static async noPagedQuery(params: Omit<RiskPagedInputDto, 'pageIndex' | 'pageSize'>): Promise<ApiResponse<RiskPagedRowDto[]>> {
    return httpRequest.post('/api/SafetyEnvProtection/Risk/NoPagedQuery', params)
  }

  /**
   * 风险分级管控导出
   * @param params 导出参数
   * @returns 导出结果
   */
  static async draftExportExcel(params: RiskPagedInputDto): Promise<ApiResponse<Blob>> {
    return httpRequest.post('/api/SafetyEnvProtection/Risk/DraftExportExcel', params, {
      responseType: 'blob'
    })
  }

  /**
   * 获得我可以看的风险类型
   * @param params 查询参数
   * @returns 风险类型列表
   */
  static async getRiskTypeSelect(params: any): Promise<ApiResponse<RiskTypeSelectDto[]>> {
    return httpRequest.post('/api/SafetyEnvProtection/Risk/GetRiskTypeSelect', params)
  }

  /**
   * 风险分级管控汇总数据
   * @param params 汇总参数
   * @returns 汇总数据
   */
  static async getRiskSummary(params: any): Promise<ApiResponse<any>> {
    return httpRequest.post('/api/SafetyEnvProtection/Risk/GetRiskSummary', params)
  }

  /**
   * 按照风险ID批量查询风险
   * @param params ID列表参数
   * @returns 风险列表
   */
  static async getListByIds(params: GetListByIdRequest): Promise<ApiResponse<RiskDto[]>> {
    return httpRequest.post('/api/SafetyEnvProtection/Risk/GetListByIds', params)
  }

  /**
   * 启用风险
   * @param id 风险ID
   * @returns 启用结果
   */
  static async start(id: string): Promise<ApiResponse<void>> {
    return httpRequest.post(`/api/SafetyEnvProtection/Risk/Start/${id}`)
  }

  /**
   * 获得管控负责人
   * @param params 查询参数
   * @returns 负责人列表
   */
  static async getRiskPerson(params: any): Promise<ApiResponse<any[]>> {
    return httpRequest.post('/api/SafetyEnvProtection/Risk/GetRiskPerson', params)
  }
}

/**
 * 风险地图相关API
 */
export class RiskMapApi {
  
  /**
   * 地图点全部风险
   * @param params 查询参数
   * @returns 地图风险数据
   */
  static async getRiskMapData(params: any): Promise<ApiResponse<RiskMapDataDto[]>> {
    return httpRequest.post('/api/SafetyEnvProtection/RiskMap/GetRiskMapData', params)
  }

  /**
   * 地图点全部隐患
   * @param params 查询参数
   * @returns 地图隐患数据
   */
  static async getRiskHazardMapData(params: any): Promise<ApiResponse<any[]>> {
    return httpRequest.post('/api/SafetyEnvProtection/RiskMap/GetRiskHazardMapData', params)
  }
}

/**
 * 风险销号流程相关API
 */
export class RiskCancellationFlowApi {
  
  /**
   * 发起风险销号流程
   * @param riskId 风险ID
   * @returns 流程发起结果
   */
  static async initiate(riskId: string): Promise<ApiResponse<number>> {
    return httpRequest.post(`/api/SafetyEnvProtection/RiskCancellationFlow/Initiate/${riskId}`)
  }

  /**
   * 发送
   * @param params 发送参数
   * @returns 发送结果
   */
  static async send(params: any): Promise<ApiResponse<void>> {
    return httpRequest.post('/api/SafetyEnvProtection/RiskCancellationFlow/Send', params)
  }

  /**
   * 退回
   * @param params 退回参数
   * @returns 退回结果
   */
  static async crossProcessReturn(params: any): Promise<ApiResponse<void>> {
    return httpRequest.post('/api/SafetyEnvProtection/RiskCancellationFlow/CrossProcessReturn', params)
  }

  /**
   * 结束流程
   * @param params 结束参数
   * @returns 结束结果
   */
  static async endProcess(params: any): Promise<ApiResponse<void>> {
    return httpRequest.post('/api/SafetyEnvProtection/RiskCancellationFlow/EndProcess', params)
  }
}

/**
 * 风险评审流程相关API
 */
export class RiskReviewFlowApi {
  
  /**
   * 发起风险评审流程
   * @param riskId 风险ID
   * @returns 流程发起结果
   */
  static async initiate(riskId: string): Promise<ApiResponse<number>> {
    return httpRequest.post(`/api/SafetyEnvProtection/RiskReviewFlow/Initiate/${riskId}`)
  }

  /**
   * 发送
   * @param params 发送参数
   * @returns 发送结果
   */
  static async send(params: any): Promise<ApiResponse<void>> {
    return httpRequest.post('/api/SafetyEnvProtection/RiskReviewFlow/Send', params)
  }

  /**
   * 退回
   * @param params 退回参数
   * @returns 退回结果
   */
  static async crossProcessReturn(params: any): Promise<ApiResponse<void>> {
    return httpRequest.post('/api/SafetyEnvProtection/RiskReviewFlow/CrossProcessReturn', params)
  }

  /**
   * 结束流程
   * @param params 结束参数
   * @returns 结束结果
   */
  static async endProcess(params: any): Promise<ApiResponse<void>> {
    return httpRequest.post('/api/SafetyEnvProtection/RiskReviewFlow/EndProcess', params)
  }
}
