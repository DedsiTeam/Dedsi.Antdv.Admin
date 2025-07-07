/**
 * API 使用示例
 * 
 * 本文件展示了如何使用安全环保API进行各种操作
 */

import { 
  RiskApi, 
  HazardApi, 
  DictionaryDataApi,
  MonitoringEquipmentApi,
  PortDeptApi 
} from '@/api'
import type { 
  RiskDto, 
  HazardDto, 
  RiskPagedInputDto,
  HazardPagedInputDto
} from '@/api'

/**
 * 风险管理示例
 */
export class RiskExample {
  
  /**
   * 查询风险列表
   */
  static async getRiskList() {
    try {
      const params: RiskPagedInputDto = {
        pageIndex: 1,
        pageSize: 10,
        riskLevelCode: 'MAJOR', // 重大风险
        organization: {
          level1Code: 'COMP001'
        }
      }
      
      const response = await RiskApi.pagedQuery(params)
      console.log('风险列表:', response.data)
      return response.data
    } catch (error) {
      console.error('查询风险列表失败:', error)
      throw error
    }
  }

  /**
   * 创建风险
   */
  static async createRisk() {
    try {
      const riskData: RiskDto = {
        riskCode: 'RISK-2025-001',
        description: '高空作业风险',
        riskLevelCode: 'MAJOR',
        riskTypeCode: 'SAFETY',
        organization: {
          level1Code: 'COMP001',
          level1Name: '某公司',
          level2Code: 'DEPT001',
          level2Name: '安全部'
        },
        location: {
          province: '江苏省',
          city: '南京市',
          district: '鼓楼区',
          detailAddress: '某某路123号'
        },
        controlPerson: {
          name: '张三',
          no: 'EMP001',
          id: 'USER001'
        },
        controlMeasures: '佩戴安全带，设置安全网',
        riskPoints: [{
          longitude: '118.796877',
          latitude: '32.060255'
        }]
      }
      
      const response = await RiskApi.create(riskData)
      console.log('创建风险成功，ID:', response.data)
      return response.data
    } catch (error) {
      console.error('创建风险失败:', error)
      throw error
    }
  }

  /**
   * 获取风险详情
   */
  static async getRiskDetail(riskId: string) {
    try {
      const response = await RiskApi.get(riskId)
      console.log('风险详情:', response.data)
      return response.data
    } catch (error) {
      console.error('获取风险详情失败:', error)
      throw error
    }
  }
}

/**
 * 隐患管理示例
 */
export class HazardExample {
  
  /**
   * 查询隐患列表
   */
  static async getHazardList() {
    try {
      const params: HazardPagedInputDto = {
        pageIndex: 1,
        pageSize: 10,
        hazardLevelCode: 'IMPORTANT', // 重大隐患
        governancePhaseCode: 'RECTIFICATION' // 整改阶段
      }
      
      const response = await HazardApi.pagedQuery(params)
      console.log('隐患列表:', response.data)
      return response.data
    } catch (error) {
      console.error('查询隐患列表失败:', error)
      throw error
    }
  }

  /**
   * 创建隐患
   */
  static async createHazard() {
    try {
      const hazardData: HazardDto = {
        hazardCode: 'HAZ-2025-001',
        description: '电线老化隐患',
        hazardLevelCode: 'IMPORTANT',
        hazardTypeCode: 'ELECTRICAL',
        organization: {
          level1Code: 'COMP001',
          level1Name: '某公司'
        },
        location: {
          province: '江苏省',
          city: '南京市',
          detailAddress: '车间A区'
        },
        rectificationPerson: {
          name: '李四',
          no: 'EMP002'
        },
        rectificationMeasures: '更换老化电线，加装保护套管',
        rectificationStartTime: '2025-01-10',
        rectificationEndTime: '2025-01-20'
      }
      
      const response = await HazardApi.create(hazardData)
      console.log('创建隐患成功，ID:', response.data)
      return response.data
    } catch (error) {
      console.error('创建隐患失败:', error)
      throw error
    }
  }
}

/**
 * 字典数据示例
 */
export class DictionaryExample {
  
  /**
   * 获取风险字典数据
   */
  static async getRiskDictionary() {
    try {
      const response = await DictionaryDataApi.getMyRiskData()
      console.log('风险字典数据:', response.data)
      return response.data
    } catch (error) {
      console.error('获取风险字典数据失败:', error)
      throw error
    }
  }

  /**
   * 获取隐患字典数据
   */
  static async getHazardDictionary() {
    try {
      const response = await DictionaryDataApi.getMyHazardData()
      console.log('隐患字典数据:', response.data)
      return response.data
    } catch (error) {
      console.error('获取隐患字典数据失败:', error)
      throw error
    }
  }
}

/**
 * 监控设备示例
 */
export class MonitoringExample {
  
  /**
   * 获取风险关联的监控设备
   */
  static async getRiskMonitoring(riskId: string) {
    try {
      const response = await MonitoringEquipmentApi.getByRiskId({ riskId })
      console.log('风险关联监控设备:', response.data)
      return response.data
    } catch (error) {
      console.error('获取监控设备失败:', error)
      throw error
    }
  }

  /**
   * 获取监控直播流
   */
  static async getMonitoringStream(cameraIndexCode: string) {
    try {
      const response = await MonitoringEquipmentApi.getUrlM3u8ByCameraIndexCode({ 
        cameraIndexCode 
      })
      console.log('监控直播流地址:', response.data)
      return response.data
    } catch (error) {
      console.error('获取监控直播流失败:', error)
      throw error
    }
  }
}

/**
 * 组织机构示例
 */
export class OrganizationExample {
  
  /**
   * 获取部门树
   */
  static async getDepartmentTree() {
    try {
      const response = await PortDeptApi.getPortDeptTree()
      console.log('部门树结构:', response.data)
      return response.data
    } catch (error) {
      console.error('获取部门树失败:', error)
      throw error
    }
  }
}
