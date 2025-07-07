/**
 * 安全环保API统一导出
 * 
 * 本文件统一导出所有安全环保相关的API类和类型定义
 * 方便在组件中进行导入和使用
 * 
 * @example
 * ```typescript
 * // 导入API类
 * import { RiskApi, HazardApi } from '@/api'
 * 
 * // 导入类型
 * import type { RiskDto, HazardDto } from '@/api'
 * 
 * // 使用API
 * const riskList = await RiskApi.pagedQuery(params)
 * ```
 */

// API类导出
export { DictionaryDataApi } from './dictionaryData'
export { 
  HazardApi, 
  HazardMapApi, 
  HazardPinNumberFlowApi, 
  HazardReviewFlowApi 
} from './hazard'
export { 
  RiskApi, 
  RiskMapApi, 
  RiskCancellationFlowApi, 
  RiskReviewFlowApi 
} from './risk'
export { MonitoringEquipmentApi } from './monitoringEquipment'
export { PortDeptApi } from './portDept'
export { HazardReviewUnitApi, RiskReviewUnitApi } from './reviewUnit'

// 类型定义导出
export type * from './types'
