import { httpRequest } from '../utils/axiosRequest'
import type {
  ApiResponse,
  PortDeptTreeItem
} from './types'

/**
 * 组织机构相关API（SafetyEnvProtection专用）
 */
export class PortDeptApi {
  
  /**
   * 获得区域公司层级的No
   * @returns 区域公司代码列表
   */
  static async getLevel1Codes(): Promise<ApiResponse<string[]>> {
    return httpRequest.get('/api/SafetyEnvProtection/PortDept/Level1Codes')
  }

  /**
   * 按照权限查询部门树形结构数据
   * @returns 部门树形结构
   */
  static async getPortDeptTree(): Promise<ApiResponse<PortDeptTreeItem[]>> {
    return httpRequest.get('/api/SafetyEnvProtection/PortDept/PortDeptTree')
  }
}
