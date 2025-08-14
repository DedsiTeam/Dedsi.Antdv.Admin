import { MainServiceRequest } from '../utils/requests/mainServiceRequest.ts'
import type {
  ApiResponse,
  PagedResult,
  HazardDto,
  HazardPagedInputDto,
  HazardPagedRowDto,
  HazardTypeSelectDto,
  HazardMapDataDto,
  HazardRiskRelationDto,
  GetListByIdRequest
} from './types'

/**
 * 隐患相关API
 */
export class HazardApi {
  
  /**
   * 保存至草稿
   * @param data 隐患数据
   * @returns 保存结果
   */
  static async saveToDraft(data: HazardDto): Promise<ApiResponse<string>> {
    return MainServiceRequest.post('/api/SafetyEnvProtection/Hazard/SaveToDraft', data)
  }

  /**
   * 创建隐患
   * @param data 隐患数据
   * @returns 创建结果
   */
  static async create(data: HazardDto): Promise<ApiResponse<string>> {
    return MainServiceRequest.post('/api/SafetyEnvProtection/Hazard/Create', data)
  }

  /**
   * 修改隐患
   * @param id 隐患ID
   * @param data 隐患数据
   * @returns 修改结果
   */
  static async update(id: string, data: HazardDto): Promise<ApiResponse<void>> {
    return MainServiceRequest.post(`/api/SafetyEnvProtection/Hazard/Update/${id}`, data)
  }

  /**
   * 查询隐患详情
   * @param id 隐患ID
   * @returns 隐患详情
   */
  static async get(id: string): Promise<ApiResponse<HazardDto>> {
    return MainServiceRequest.get(`/api/SafetyEnvProtection/Hazard/Get/${id}`)
  }

  /**
   * 删除隐患
   * @param id 隐患ID
   * @returns 删除结果
   */
  static async delete(id: string): Promise<ApiResponse<void>> {
    return MainServiceRequest.get(`/api/SafetyEnvProtection/Hazard/Delete/${id}`)
  }

  /**
   * 分页查询隐患
   * @param params 查询参数
   * @returns 分页查询结果
   */
  static async pagedQuery(params: HazardPagedInputDto): Promise<ApiResponse<PagedResult<HazardPagedRowDto>>> {
    return MainServiceRequest.post('/api/SafetyEnvProtection/Hazard/PagedQuery', params)
  }

  /**
   * 不分页查询隐患
   * @param params 查询参数
   * @returns 查询结果
   */
  static async noPagedQuery(params: Omit<HazardPagedInputDto, 'pageIndex' | 'pageSize'>): Promise<ApiResponse<HazardPagedRowDto[]>> {
    return MainServiceRequest.post('/api/SafetyEnvProtection/Hazard/NoPagedQuery', params)
  }

  /**
   * 获取隐患类别选择项
   * @param params 查询参数
   * @returns 隐患类别列表
   */
  static async getHazardTypeSelect(params: any): Promise<ApiResponse<HazardTypeSelectDto[]>> {
    return MainServiceRequest.post('/api/SafetyEnvProtection/Hazard/GetHazardTypeSelect', params)
  }

  /**
   * 按照一组ID查询隐患
   * @param params ID列表参数
   * @returns 隐患列表
   */
  static async getListByIds(params: GetListByIdRequest): Promise<ApiResponse<HazardDto[]>> {
    return MainServiceRequest.post('/api/SafetyEnvProtection/Hazard/GetListByIds', params)
  }

  /**
   * 隐患排查治理导出
   * @param params 导出参数
   * @returns 导出结果
   */
  static async hazardCanvassExcel(params: HazardPagedInputDto): Promise<ApiResponse<Blob>> {
    return MainServiceRequest.post('/api/SafetyEnvProtection/Hazard/HazardcanvassExcel', params, {
      responseType: 'blob'
    })
  }

  /**
   * 隐患台账数据汇总
   * @param params 汇总参数
   * @returns 汇总数据
   */
  static async getHazardSummary(params: any): Promise<ApiResponse<any>> {
    return MainServiceRequest.post('/api/SafetyEnvProtection/Hazard/GetJazardSummary', params)
  }

  /**
   * 隐患关联风险
   * @param params 关联参数
   * @returns 关联结果
   */
  static async hazardRiskRelevancy(params: any): Promise<ApiResponse<void>> {
    return MainServiceRequest.post('/api/SafetyEnvProtection/Hazard/HazardRiskRelevancy', params)
  }

  /**
   * 获取台账存在整改责任单位
   * @returns 责任单位列表
   */
  static async getHazardReviewList(): Promise<ApiResponse<any[]>> {
    return MainServiceRequest.post('/api/SafetyEnvProtection/Hazard/GetHazardReviewList')
  }

  /**
   * 根据登录信息获取监督治理责任人
   * @param unitCode 单位代码
   * @param params 查询参数
   * @returns 责任人列表
   */
  static async getPersonList(unitCode: string, params: any): Promise<ApiResponse<any[]>> {
    return MainServiceRequest.post(`/api/SafetyEnvProtection/Hazard/GetPersonList?unitCode=${unitCode}`, params)
  }
}

/**
 * 隐患地图相关API
 */
export class HazardMapApi {
  
  /**
   * 地图点全部隐患
   * @param params 查询参数
   * @returns 地图隐患数据
   */
  static async getHazardMapData(params: any): Promise<ApiResponse<HazardMapDataDto[]>> {
    return MainServiceRequest.post('/api/SafetyEnvProtection/HazardMap/GetHazardMapData', params)
  }

  /**
   * 地图全部隐患关联风险
   * @param params 查询参数
   * @returns 隐患关联风险数据
   */
  static async getHazardRiskData(params: any): Promise<ApiResponse<HazardRiskRelationDto[]>> {
    return MainServiceRequest.post('/api/SafetyEnvProtection/HazardMap/GetHazardRiskData', params)
  }
}

/**
 * 隐患销号流程相关API
 */
export class HazardPinNumberFlowApi {
  
  /**
   * 发起隐患销号流程
   * @param hazardId 隐患ID
   * @returns 流程发起结果
   */
  static async initiate(hazardId: string): Promise<ApiResponse<number>> {
    return MainServiceRequest.post(`/api/SafetyEnvProtection/HazardPinNumberFlow/Initiate/${hazardId}`)
  }

  /**
   * 发送
   * @param params 发送参数
   * @returns 发送结果
   */
  static async send(params: any): Promise<ApiResponse<void>> {
    return MainServiceRequest.post('/api/SafetyEnvProtection/HazardPinNumberFlow/Send', params)
  }

  /**
   * 退回
   * @param params 退回参数
   * @returns 退回结果
   */
  static async crossProcessReturn(params: any): Promise<ApiResponse<void>> {
    return MainServiceRequest.post('/api/SafetyEnvProtection/HazardPinNumberFlow/CrossProcessReturn', params)
  }

  /**
   * 结束流程
   * @param params 结束参数
   * @returns 结束结果
   */
  static async endProcess(params: any): Promise<ApiResponse<void>> {
    return MainServiceRequest.post('/api/SafetyEnvProtection/HazardPinNumberFlow/EndProcess', params)
  }
}

/**
 * 隐患整改流程相关API
 */
export class HazardReviewFlowApi {
  
  /**
   * 发起隐患治理流程
   * @param hazardId 隐患ID
   * @returns 流程发起结果
   */
  static async initiate(hazardId: string): Promise<ApiResponse<number>> {
    return MainServiceRequest.post(`/api/SafetyEnvProtection/HazardRevirewFlow/Initiate/${hazardId}`)
  }

  /**
   * 发送
   * @param params 发送参数
   * @returns 发送结果
   */
  static async send(params: any): Promise<ApiResponse<void>> {
    return MainServiceRequest.post('/api/SafetyEnvProtection/HazardRevirewFlow/HazardSend', params)
  }

  /**
   * 退回
   * @param params 退回参数
   * @returns 退回结果
   */
  static async crossProcessReturn(params: any): Promise<ApiResponse<void>> {
    return MainServiceRequest.post('/api/SafetyEnvProtection/HazardRevirewFlow/HazardCrossProcessReturn', params)
  }

  /**
   * 结束流程
   * @param params 结束参数
   * @returns 结束结果
   */
  static async endProcess(params: any): Promise<ApiResponse<void>> {
    return MainServiceRequest.post('/api/SafetyEnvProtection/HazardRevirewFlow/HazardEndProcess', params)
  }
}
