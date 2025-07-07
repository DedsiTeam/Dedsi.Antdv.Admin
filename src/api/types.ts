/**
 * 基础类型定义
 */

/** API 统一响应格式 */
export interface ApiResponse<T = any> {
  /** 请求是否成功 */
  success: boolean;
  /** 响应数据 */
  data: T;
  /** 响应消息 */
  message?: string;
  /** 响应状态码 */
  code?: number;
}

/** 分页结果格式 */
export interface PagedResult<T> {
  /** 数据列表 */
  items: T[];
  /** 总记录数 */
  totalCount: number;
}

/** 分页查询基础参数 */
export interface PagedQuery {
  /** 页码（从1开始） */
  pageIndex: number;
  /** 每页大小 */
  pageSize: number;
  /** 最大结果数（只读） */
  maxResultCount?: number;
  /** 跳过记录数（只读） */
  skipCount?: number;
}

/**
 * 用户相关类型
 */

/** 流程审批用户信息 */
export interface ToEmpUser {
  /** 用户工号 */
  toEmpUserNo?: string;
  /** 用户姓名 */
  toEmpUserName?: string;
}

/**
 * 字典数据类型
 */

/** 字典数据选择项 */
export interface DictionaryDataSelectDto {
  /** 字典值 */
  dicValue?: string;
  /** 字典标签 */
  dicLabel?: string;
  /** 数据类型 */
  dataType?: DictionaryDataType;
}

/** 字典数据类型枚举 */
export enum DictionaryDataType {
  /** 风险 */
  Risk = 1,
  /** 隐患 */
  Hazard = 2
}

/** 保存我的字典数据请求 */
export interface SaveMyDataInputDto {
  /** 我的字典数据列表 */
  myDatas?: DictionaryDataSelectDto[];
}

/**
 * 组织机构类型
 */

/** 组织机构信息 */
export interface OrganizationDto {
  /** 一级组织代码 */
  level1Code?: string;
  /** 一级组织名称 */
  level1Name?: string;
  /** 二级组织代码 */
  level2Code?: string;
  /** 二级组织名称 */
  level2Name?: string;
  /** 三级组织代码 */
  level3Code?: string;
  /** 三级组织名称 */
  level3Name?: string;
}

/** 分页查询组织机构参数 */
export interface OrganizationPagedDto {
  /** 一级组织代码 */
  level1Code?: string;
  /** 二级组织代码 */
  level2Code?: string;
  /** 三级组织代码 */
  level3Code?: string;
}

/**
 * 位置信息类型
 */

/** 位置信息 */
export interface LocationDto {
  /** 省份 */
  province?: string;
  /** 城市 */
  city?: string;
  /** 区县 */
  district?: string;
  /** 详细地址 */
  detailAddress?: string;
}

/**
 * 人员信息类型
 */

/** 人员信息 */
export interface PersonDto {
  /** 姓名 */
  name?: string;
  /** 工号 */
  no?: string;
  /** 人员ID */
  id?: string;
}

/**
 * 点位信息类型
 */

/** 地理坐标点 */
export interface PointDto {
  /** 经度 */
  longitude?: string;
  /** 纬度 */
  latitude?: string;
}

/**
 * 文件信息类型
 */

/** 文件信息 */
export interface FileDto {
  /** 文件ID */
  fileId?: string;
  /** 文件名 */
  fileName?: string;
  /** 文件类型 */
  fileType?: string;
}

/**
 * 风险相关类型
 */

/** 风险数据状态枚举 */
export enum RiskDataStatus {
  /** 草稿 */
  Draft = 0,
  /** 审核中 */
  UnderReview = 1,
  /** 已通过 */
  Approved = 2,
  /** 已拒绝 */
  Rejected = 3,
  /** 已取消 */
  Cancelled = 4
}

/** 风险数据传输对象 */
export interface RiskDto {
  /** 风险ID */
  id?: string;
  /** 风险编码 */
  riskCode?: string;
  /** 所属组织 */
  organization?: OrganizationDto;
  /** 位置信息 */
  location?: LocationDto;
  /** 关联项目 */
  relatedProject?: string;
  /** 风险等级代码 */
  riskLevelCode?: string;
  /** 风险等级名称 */
  riskLevelName?: string;
  /** 风险类型代码 */
  riskTypeCode?: string;
  /** 风险类型名称 */
  riskTypeName?: string;
  /** 管控负责人 */
  controlPerson?: PersonDto;
  /** 管控开始时间 */
  controlStartTime?: string;
  /** 管控结束时间 */
  controlEndTime?: string;
  /** 录入人员 */
  entryPerson?: PersonDto;
  /** 风险描述 */
  description?: string;
  /** 管控措施 */
  controlMeasures?: string;
  /** 风险文件列表 */
  riskFiles?: RiskFileDto[];
  /** 风险点位列表 */
  riskPoints?: PointDto[];
  /** 关联监控设备列表 */
  riskMes?: RiskMeDto[];
  /** 关联隐患列表 */
  relatedHazards?: RiskHazardRelationDto[];
  /** 风险评审流程 */
  riskReviewFlow?: RiskReviewFlowDto;
  /** 风险销号流程 */
  riskCancellationFlow?: RiskCancellationFlowDto;
  /** 数据状态 */
  dataStatus?: RiskDataStatus;
}

/** 风险文件信息 */
export interface RiskFileDto extends FileDto {
  /** 风险ID */
  riskId?: string;
}

/** 风险关联监控设备信息 */
export interface RiskMeDto {
  /** 监控设备ID */
  meId?: string;
  /** 监控设备名称 */
  meName?: string;
  /** 经度 */
  longitude?: string;
  /** 纬度 */
  latitude?: string;
}

/** 风险关联隐患信息 */
export interface RiskHazardRelationDto {
  /** 隐患ID */
  hazardId?: string;
  /** 隐患编码 */
  hazardCode?: string;
  /** 隐患等级代码 */
  hazardLevelCode?: string;
  /** 隐患等级名称 */
  hazardLevelName?: string;
  /** 经度 */
  longitude?: string;
  /** 纬度 */
  latitude?: string;
}

/** 风险评审流程信息 */
export interface RiskReviewFlowDto {
  /** 工作流ID */
  workId?: number;
  /** 流程ID */
  flowId?: string;
  /** 创建时间 */
  creationTime?: string;
  /** 审批完成时间 */
  approvalFinishTime?: string;
}

/** 风险销号流程信息 */
export interface RiskCancellationFlowDto {
  /** 工作流ID */
  workId?: number;
  /** 流程ID */
  flowId?: string;
  /** 创建时间 */
  creationTime?: string;
  /** 审批完成时间 */
  approvalFinishTime?: string;
}

/** 风险类型选择项 */
export interface RiskTypeSelectDto {
  /** 风险类型代码 */
  riskTypeCode?: string;
  /** 风险类型名称 */
  riskTypeName?: string;
}

/** 风险分页查询参数 */
export interface RiskPagedInputDto extends PagedQuery {
  /** 是否导出 */
  isExport?: boolean;
  /** 组织机构查询条件 */
  organization?: OrganizationPagedDto;
  /** 风险编码 */
  riskCode?: string;
  /** 风险等级代码 */
  riskLevelCode?: string;
  /** 风险类型代码 */
  riskTypeCode?: string;
  /** 关联项目 */
  relatedProject?: string;
  /** 风险描述 */
  description?: string;
  /** 位置信息 */
  location?: LocationDto;
  /** 管控负责人 */
  controlPerson?: string;
  /** 管控开始时间A */
  controlStartTimeA?: string;
  /** 管控开始时间B */
  controlStartTimeB?: string;
  /** 管控结束时间A */
  controlEndTimeA?: string;
  /** 管控结束时间B */
  controlEndTimeB?: string;
  /** 数据状态 */
  dataStatus?: RiskDataStatus;
}

/** 风险分页查询结果行数据 */
export interface RiskPagedRowDto {
  /** 风险ID */
  id?: string;
  /** 风险编码 */
  riskCode?: string;
  /** 一级组织名称 */
  level1Name?: string;
  /** 二级组织名称 */
  level2Name?: string;
  /** 三级组织名称 */
  level3Name?: string;
  /** 位置 */
  location?: string;
  /** 位置详细信息 */
  locationDto?: LocationDto;
  /** 关联项目 */
  relatedProject?: string;
  /** 风险等级代码 */
  riskLevelCode?: string;
  /** 风险等级名称 */
  riskLevelName?: string;
  /** 风险类型代码 */
  riskTypeCode?: string;
  /** 风险类型名称 */
  riskTypeName?: string;
  /** 管控负责人 */
  controlPerson?: string;
  /** 管控开始时间 */
  controlStartTime?: string;
  /** 管控结束时间 */
  controlEndTime?: string;
  /** 录入人员 */
  entryPerson?: string;
  /** 风险描述 */
  description?: string;
  /** 管控措施 */
  controlMeasures?: string;
  /** 风险点位 */
  riskPoint?: string;
  /** 数据状态 */
  dataStatus?: RiskDataStatus;
  /** 创建人ID */
  creatorId?: string;
  /** 是否审核中 */
  isUnderReview?: boolean;
}

/** 风险地图数据 */
export interface RiskMapDataDto {
  /** 风险ID */
  id?: string;
  /** 风险编码 */
  riskCode?: string;
  /** 风险等级代码 */
  riskLevelCode?: string;
  /** 风险点经度 */
  riskPointLongitude?: string;
  /** 风险点纬度 */
  riskPointLatitude?: string;
}

/**
 * 隐患相关类型
 */

/** 隐患治理状态枚举 */
export enum HazardEnums {
  /** 草稿 */
  Draft = 0,
  /** 待确认 */
  NotConfirm = 1,
  /** 整改中 */
  Rectification = 2,
  /** 待销号 */
  PendingClosure = 3,
  /** 已销号 */
  Closed = 4
}

/** 隐患数据传输对象 */
export interface HazardDto {
  /** 隐患ID */
  id?: string;
  /** 隐患编码 */
  hazardCode?: string;
  /** 所属组织 */
  organization?: OrganizationDto;
  /** 位置信息 */
  location?: LocationDto;
  /** 关联项目 */
  relatedProject?: string;
  /** 风险等级代码 */
  riskLevelCode?: string;
  /** 风险等级名称 */
  riskLevelName?: string;
  /** 隐患等级代码 */
  hazardLevelCode?: string;
  /** 隐患等级名称 */
  hazardLevelName?: string;
  /** 隐患类型代码 */
  hazardTypeCode?: string;
  /** 隐患类型名称 */
  hazardTypeName?: string;
  /** 治理阶段代码 */
  governancePhaseCode?: string;
  /** 治理阶段名称 */
  governancePhaseName?: string;
  /** 整改单位代码 */
  rectificationUnitCode?: string;
  /** 整改单位名称 */
  rectificationUnitName?: string;
  /** 整改责任人 */
  rectificationPerson?: PersonDto;
  /** 整改开始时间 */
  rectificationStartTime?: string;
  /** 整改结束时间 */
  rectificationEndTime?: string;
  /** 延期完成时间 */
  delayedCompletionTime?: string;
  /** 延期天数 */
  delayDays?: number;
  /** 录入人员 */
  entryPerson?: PersonDto;
  /** 监督责任人 */
  supervisoryPerson?: PersonDto;
  /** 隐患描述 */
  description?: string;
  /** 整改措施 */
  rectificationMeasures?: string;
  /** 隐患整改次数 */
  hazardRectificationNumber?: number;
  /** 隐患记录列表 */
  hazardRecords?: HazardRecordDto[];
  /** 是否最新版本 */
  isLatestVersion?: boolean;
  /** 是否已被关联 */
  isrelevancy?: boolean;
  /** 隐患文件列表 */
  hazardFiles?: HazardFileDto[];
  /** 关联风险列表 */
  relatedRisks?: HazardRiskRelationDto[];
  /** 隐患点位列表 */
  hazardPoints?: PointDto[];
  /** 关联监控设备列表 */
  hazardMes?: HazardMeDto[];
  /** 隐患整改流程 */
  hazardReviewFlow?: HazardReviewFlowDto;
  /** 隐患销号流程 */
  hazardPinNumberFlow?: HazardPinNumberFlowDto;
}

/** 隐患文件信息 */
export interface HazardFileDto extends FileDto {
  /** 隐患ID */
  hazardId?: string;
}

/** 隐患记录信息 */
export interface HazardRecordDto {
  /** 记录ID */
  id?: string;
  /** 记录名称 */
  recordName?: string;
}

/** 隐患关联监控设备信息 */
export interface HazardMeDto {
  /** 监控设备ID */
  meId?: string;
  /** 监控设备名称 */
  meName?: string;
  /** 经度 */
  longitude?: string;
  /** 纬度 */
  latitude?: string;
}

/** 隐患关联风险信息 */
export interface HazardRiskRelationDto {
  /** 风险ID */
  riskId?: string;
  /** 风险编码 */
  riskCode?: string;
  /** 风险等级代码 */
  riskLevelCode?: string;
  /** 风险等级名称 */
  riskLevelName?: string;
  /** 经度 */
  longitude?: string;
  /** 纬度 */
  latitude?: string;
}

/** 隐患整改流程信息 */
export interface HazardReviewFlowDto {
  /** 工作流ID */
  workId?: number;
  /** 流程ID */
  flowId?: string;
  /** 创建时间 */
  creationTime?: string;
  /** 审批完成时间 */
  approvalFinishTime?: string;
}

/** 隐患销号流程信息 */
export interface HazardPinNumberFlowDto {
  /** 工作流ID */
  workId?: number;
  /** 流程ID */
  flowId?: string;
  /** 创建时间 */
  creationTime?: string;
  /** 审批完成时间 */
  approvalFinishTime?: string;
}

/** 隐患类型选择项 */
export interface HazardTypeSelectDto {
  /** 隐患类型代码 */
  hazardTypeCode?: string;
  /** 隐患类型名称 */
  hazardTypeName?: string;
}

/** 隐患分页查询参数 */
export interface HazardPagedInputDto extends PagedQuery {
  /** 是否导出 */
  isExport?: boolean;
  /** 治理阶段代码 */
  governancePhaseCode?: string;
  /** 组织机构查询条件 */
  organization?: OrganizationPagedDto;
  /** 隐患编码 */
  hazardCode?: string;
  /** 风险等级代码 */
  riskLevelCode?: string;
  /** 隐患等级代码 */
  hazardLevelCode?: string;
  /** 隐患类型代码 */
  hazardTypeCode?: string;
  /** 关联项目 */
  relatedProject?: string;
  /** 隐患描述 */
  description?: string;
  /** 位置信息 */
  location?: LocationDto;
  /** 整改责任人 */
  rectificationPerson?: string;
  /** 整改单位代码 */
  rectificationUnitCode?: string;
  /** 整改开始时间A */
  rectificationStartTimeA?: string;
  /** 整改开始时间B */
  rectificationStartTimeB?: string;
  /** 整改结束时间A */
  rectificationEndTimeA?: string;
  /** 整改结束时间B */
  rectificationEndTimeB?: string;
}

/** 隐患分页查询结果行数据 */
export interface HazardPagedRowDto {
  /** 隐患ID */
  id?: string;
  /** 隐患编码 */
  hazardCode?: string;
  /** 一级组织名称 */
  level1Name?: string;
  /** 二级组织名称 */
  level2Name?: string;
  /** 三级组织名称 */
  level3Name?: string;
  /** 位置 */
  location?: string;
  /** 位置详细信息 */
  locationDto?: LocationDto;
  /** 关联项目 */
  relatedProject?: string;
  /** 风险等级名称 */
  riskLevelName?: string;
  /** 隐患等级代码 */
  hazardLevelCode?: string;
  /** 隐患等级名称 */
  hazardLevelName?: string;
  /** 隐患类型代码 */
  hazardTypeCode?: string;
  /** 隐患类型名称 */
  hazardTypeName?: string;
  /** 治理阶段代码 */
  governancePhaseCode?: string;
  /** 治理阶段名称 */
  governancePhaseName?: string;
  /** 整改单位名称 */
  rectificationUnitName?: string;
  /** 整改责任人 */
  rectificationPerson?: string;
  /** 整改开始时间 */
  rectificationStartTime?: string;
  /** 整改结束时间 */
  rectificationEndTime?: string;
  /** 延期完成时间 */
  delayedCompletionTime?: string;
  /** 延期天数 */
  delayDays?: number;
  /** 录入人员 */
  entryPerson?: string;
  /** 监督责任人 */
  supervisoryPerson?: string;
  /** 隐患描述 */
  description?: string;
  /** 整改措施 */
  rectificationMeasures?: string;
  /** 隐患整改次数 */
  hazardRectificationNumber?: number;
  /** 隐患点位 */
  hazardPoint?: string;
  /** 是否最新版本 */
  isLatestVersion?: boolean;
  /** 是否已被关联 */
  isrelevancy?: boolean;
  /** 是否审核中 */
  isUnderReview?: boolean;
  /** 数据状态 */
  dataStatus?: HazardEnums;
  /** 创建人ID */
  creatorId?: string;
}

/** 隐患地图数据 */
export interface HazardMapDataDto {
  /** 隐患ID */
  id?: string;
  /** 隐患编号 */
  hazardNumber?: string;
  /** 隐患等级代码 */
  hazardLevelCode?: string;
  /** 隐患点经度 */
  hazardPointLongitude?: string;
  /** 隐患点纬度 */
  hazardPointLatitude?: string;
}

/**
 * 流程相关类型
 */

/** 流程发送请求参数 */
export interface SendRequest {
  /** 当前节点ID */
  currentNodeId?: number;
  /** 目标节点ID */
  toNodeId?: string;
  /** 目标用户列表 */
  toEmpUsers?: ToEmpUser[];
}

/** 流程退回请求参数 */
export interface CrossProcessReturnRequest {
  /** 退回消息 */
  returnMseeage?: string;
  /** 退回到节点ID */
  returnToNodeId?: number;
  /** 退回到用户工号 */
  returnToUserNo?: string;
}

/** 流程结束请求参数 */
export interface EndProcessRequest {
  /** 当前节点ID */
  currentNodeId?: number;
  /** 结束消息 */
  msg?: string;
}

/**
 * 监控设备类型
 */

/** 监控设备基础信息 */
export interface MonitoringEquipmentDto {
  /** 监控设备ID */
  meId?: string;
  /** 监控设备名称 */
  meName?: string;
  /** 经度 */
  longitude?: string;
  /** 纬度 */
  latitude?: string;
}

/** 带M3U8播放地址的监控设备信息 */
export interface MonitoringEquipmentByM3U8Dto extends MonitoringEquipmentDto {
  /** M3U8播放地址 */
  m3u8Url?: string;
}

/**
 * 部门树形结构
 */

/** 部门树节点 */
export interface PortDeptTreeItem {
  /** 部门代码 */
  code?: string;
  /** 部门名称 */
  name?: string;
  /** 子部门列表 */
  children?: PortDeptTreeItem[];
}

/**
 * 请求参数类型
 */

/** 根据ID列表查询请求参数 */
export interface GetListByIdRequest {
  /** ID列表 */
  ids?: string[];
}

/** 获取M3U8播放地址请求参数 */
export interface GetByM3U8Request {
  /** 摄像头索引代码 */
  cameraIndexCode?: string;
}

/** 根据风险ID查询请求参数 */
export interface GetByRiskIdRequest {
  /** 风险ID */
  riskId?: string;
}

/** 根据隐患ID查询请求参数 */
export interface GetByHazardIdRequest {
  /** 隐患ID */
  hazardId?: string;
}
