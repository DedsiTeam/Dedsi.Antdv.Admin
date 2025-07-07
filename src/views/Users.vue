<template>
  <div class="hazard-management">
    <!-- 查询条件卡片 -->
    <a-card title="查询条件" class="search-card" :bordered="false">
      <div class="search-container">
        <div class="search-fields">
          <a-form
            ref="searchFormRef"
            :model="searchForm"
            layout="inline"
            class="search-form"
          >
            <a-form-item label="隐患编号" name="hazardCode">
              <a-input
                v-model:value="searchForm.hazardCode"
                placeholder="请输入隐患编号"
                allow-clear
              />
            </a-form-item>
            
            <a-form-item label="一级分类" name="level1Name">
              <a-input
                v-model:value="searchForm.level1Name"
                placeholder="请输入一级分类"
                allow-clear
              />
            </a-form-item>
            
            <a-form-item label="二级分类" name="level2Name">
              <a-input
                v-model:value="searchForm.level2Name"
                placeholder="请输入二级分类"
                allow-clear
              />
            </a-form-item>
            
            <a-form-item label="三级分类" name="level3Name">
              <a-input
                v-model:value="searchForm.level3Name"
                placeholder="请输入三级分类"
                allow-clear
              />
            </a-form-item>
            
            <a-form-item label="隐患等级" name="hazardLevelCode">
              <a-select
                v-model:value="searchForm.hazardLevelCode"
                placeholder="请选择隐患等级"
                allow-clear
                style="width: 150px"
              >
                <a-select-option value="HIGH">高风险</a-select-option>
                <a-select-option value="MEDIUM">中风险</a-select-option>
                <a-select-option value="LOW">低风险</a-select-option>
              </a-select>
            </a-form-item>
            
            <a-form-item label="治理阶段" name="governancePhaseCode">
              <a-select
                v-model:value="searchForm.governancePhaseCode"
                placeholder="请选择治理阶段"
                allow-clear
                style="width: 150px"
              >
                <a-select-option value="NOT_STARTED">未开始</a-select-option>
                <a-select-option value="IN_PROGRESS">进行中</a-select-option>
                <a-select-option value="COMPLETED">已完成</a-select-option>
              </a-select>
            </a-form-item>
          </a-form>
        </div>
        
        <div class="search-buttons">
          <a-space>
            <a-button type="primary" @click="handleSearch" :loading="loading">
              <template #icon><SearchOutlined /></template>
              查询
            </a-button>
            <a-button @click="handleReset">
              <template #icon><ReloadOutlined /></template>
              重置
            </a-button>
          </a-space>
        </div>
      </div>
    </a-card>

    <!-- 表格卡片 -->
    <a-card title="隐患列表" class="table-card" :bordered="false">
      <template #extra>
        <a-button type="primary" @click="handleAdd">
          <template #icon><PlusOutlined /></template>
          新增
        </a-button>
      </template>
      
      <a-table
        :columns="columns"
        :data-source="tableData"
        :loading="loading"
        :pagination="pagination"
        @change="handleTableChange"
        row-key="id"
        size="small"
        :scroll="{ y: 460 }"
      >
        <template #bodyCell="{ column, record }">
          <template v-if="column.dataIndex === 'hazardLevelName'">
            <a-tag
              :color="getHazardLevelColor(record.hazardLevelCode)"
            >
              {{ record.hazardLevelName }}
            </a-tag>
          </template>
          
          <template v-if="column.dataIndex === 'governancePhaseName'">
            <a-tag
              :color="getGovernancePhaseColor(record.governancePhaseCode)"
            >
              {{ record.governancePhaseName }}
            </a-tag>
          </template>
          
          <template v-if="column.dataIndex === 'action'">
            <a-space>
              <a-button
                type="primary"
                size="small"
                @click="handleDetail(record)"
              >
                详情
              </a-button>
              <a-button
                type="default"
                size="small"
                @click="handleEdit(record)"
              >
                修改
              </a-button>
              <a-popconfirm
                title="确定删除吗？"
                ok-text="确定"
                cancel-text="取消"
                @confirm="handleDelete(record)"
              >
                <a-button
                  type="primary"
                  size="small"
                  danger
                >
                  删除
                </a-button>
              </a-popconfirm>
            </a-space>
          </template>
        </template>
      </a-table>
    </a-card>

    <!-- 新增/编辑模态框 -->
    <a-modal
      v-model:open="modalVisible"
      :title="modalTitle"
      width="800px"
      :footer="null"
      @cancel="handleModalCancel"
    >
      <a-form
        ref="modalFormRef"
        :model="modalForm"
        :label-col="{ span: 6 }"
        :wrapper-col="{ span: 18 }"
      >
        <a-row :gutter="16">
          <a-col :span="12">
            <a-form-item
              label="隐患编号"
              name="hazardCode"
              :rules="[{ required: true, message: '请输入隐患编号' }]"
            >
              <a-input v-model:value="modalForm.hazardCode" placeholder="请输入隐患编号" />
            </a-form-item>
          </a-col>
          
          <a-col :span="12">
            <a-form-item
              label="一级分类"
              name="level1Name"
              :rules="[{ required: true, message: '请输入一级分类' }]"
            >
              <a-input v-model:value="modalForm.level1Name" placeholder="请输入一级分类" />
            </a-form-item>
          </a-col>
          
          <a-col :span="12">
            <a-form-item
              label="二级分类"
              name="level2Name"
              :rules="[{ required: true, message: '请输入二级分类' }]"
            >
              <a-input v-model:value="modalForm.level2Name" placeholder="请输入二级分类" />
            </a-form-item>
          </a-col>
          
          <a-col :span="12">
            <a-form-item
              label="三级分类"
              name="level3Name"
              :rules="[{ required: true, message: '请输入三级分类' }]"
            >
              <a-input v-model:value="modalForm.level3Name" placeholder="请输入三级分类" />
            </a-form-item>
          </a-col>
          
          <a-col :span="12">
            <a-form-item
              label="位置"
              name="location"
            >
              <a-input v-model:value="modalForm.location" placeholder="请输入位置" />
            </a-form-item>
          </a-col>
          
          <a-col :span="12">
            <a-form-item
              label="关联项目"
              name="relatedProject"
            >
              <a-input v-model:value="modalForm.relatedProject" placeholder="请输入关联项目" />
            </a-form-item>
          </a-col>
          
          <a-col :span="12">
            <a-form-item
              label="隐患等级"
              name="hazardLevelCode"
              :rules="[{ required: true, message: '请选择隐患等级' }]"
            >
              <a-select v-model:value="modalForm.hazardLevelCode" placeholder="请选择隐患等级">
                <a-select-option value="HIGH">高风险</a-select-option>
                <a-select-option value="MEDIUM">中风险</a-select-option>
                <a-select-option value="LOW">低风险</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          
          <a-col :span="12">
            <a-form-item
              label="隐患类型"
              name="hazardTypeCode"
              :rules="[{ required: true, message: '请选择隐患类型' }]"
            >
              <a-select v-model:value="modalForm.hazardTypeCode" placeholder="请选择隐患类型">
                <a-select-option value="SAFETY">安全类</a-select-option>
                <a-select-option value="QUALITY">质量类</a-select-option>
                <a-select-option value="ENVIRONMENT">环境类</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          
          <a-col :span="12">
            <a-form-item
              label="治理阶段"
              name="governancePhaseCode"
              :rules="[{ required: true, message: '请选择治理阶段' }]"
            >
              <a-select v-model:value="modalForm.governancePhaseCode" placeholder="请选择治理阶段">
                <a-select-option value="NOT_STARTED">未开始</a-select-option>
                <a-select-option value="IN_PROGRESS">进行中</a-select-option>
                <a-select-option value="COMPLETED">已完成</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          
          <a-col :span="12">
            <a-form-item
              label="整改单位"
              name="rectificationUnitName"
            >
              <a-input v-model:value="modalForm.rectificationUnitName" placeholder="请输入整改单位" />
            </a-form-item>
          </a-col>
          
          <a-col :span="12">
            <a-form-item
              label="整改人"
              name="rectificationPerson"
            >
              <a-input v-model:value="modalForm.rectificationPerson" placeholder="请输入整改人" />
            </a-form-item>
          </a-col>
          
          <a-col :span="12">
            <a-form-item
              label="整改开始时间"
              name="rectificationStartTime"
            >
              <a-date-picker 
                v-model:value="modalForm.rectificationStartTime" 
                style="width: 100%"
                placeholder="请选择整改开始时间"
              />
            </a-form-item>
          </a-col>
          
          <a-col :span="12">
            <a-form-item
              label="整改结束时间"
              name="rectificationEndTime"
            >
              <a-date-picker 
                v-model:value="modalForm.rectificationEndTime" 
                style="width: 100%"
                placeholder="请选择整改结束时间"
              />
            </a-form-item>
          </a-col>
          
          <a-col :span="12">
            <a-form-item
              label="录入人"
              name="entryPerson"
            >
              <a-input v-model:value="modalForm.entryPerson" placeholder="请输入录入人" />
            </a-form-item>
          </a-col>
          
          <a-col :span="12">
            <a-form-item
              label="监督人"
              name="supervisoryPerson"
            >
              <a-input v-model:value="modalForm.supervisoryPerson" placeholder="请输入监督人" />
            </a-form-item>
          </a-col>
          
          <a-col :span="24">
            <a-form-item
              :label-col="{ span: 3 }"
              :wrapper-col="{ span: 21, offset: 3 }"
            >
              <a-space>
                <a-button type="primary" @click="handleModalOk" :loading="modalLoading">
                  提交
                </a-button>
                <a-button @click="handleModalReset">
                  重置
                </a-button>
              </a-space>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </a-modal>

    <!-- 详情模态框 -->
    <a-modal
      v-model:open="detailModalVisible"
      title="隐患详情"
      width="800px"
      :footer="null"
    >
      <a-descriptions :column="2" bordered>
        <a-descriptions-item label="隐患编号">{{ detailData.hazardCode }}</a-descriptions-item>
        <a-descriptions-item label="一级分类">{{ detailData.level1Name }}</a-descriptions-item>
        <a-descriptions-item label="二级分类">{{ detailData.level2Name }}</a-descriptions-item>
        <a-descriptions-item label="三级分类">{{ detailData.level3Name }}</a-descriptions-item>
        <a-descriptions-item label="位置">{{ detailData.location }}</a-descriptions-item>
        <a-descriptions-item label="关联项目">{{ detailData.relatedProject }}</a-descriptions-item>
        <a-descriptions-item label="隐患等级">
          <a-tag :color="getHazardLevelColor(detailData.hazardLevelCode)">
            {{ detailData.hazardLevelName }}
          </a-tag>
        </a-descriptions-item>
        <a-descriptions-item label="隐患类型">{{ detailData.hazardTypeName }}</a-descriptions-item>
        <a-descriptions-item label="治理阶段">
          <a-tag :color="getGovernancePhaseColor(detailData.governancePhaseCode)">
            {{ detailData.governancePhaseName }}
          </a-tag>
        </a-descriptions-item>
        <a-descriptions-item label="整改单位">{{ detailData.rectificationUnitName }}</a-descriptions-item>
        <a-descriptions-item label="整改人">{{ detailData.rectificationPerson }}</a-descriptions-item>
        <a-descriptions-item label="整改开始时间">{{ formatDate(detailData.rectificationStartTime) }}</a-descriptions-item>
        <a-descriptions-item label="整改结束时间">{{ formatDate(detailData.rectificationEndTime) }}</a-descriptions-item>
        <a-descriptions-item label="延期完成时间">{{ formatDate(detailData.delayedCompletionTime) }}</a-descriptions-item>
        <a-descriptions-item label="延期天数">{{ detailData.delayDays }}</a-descriptions-item>
        <a-descriptions-item label="录入人">{{ detailData.entryPerson }}</a-descriptions-item>
        <a-descriptions-item label="监督人">{{ detailData.supervisoryPerson }}</a-descriptions-item>
      </a-descriptions>
    </a-modal>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { message } from 'ant-design-vue'
import { SearchOutlined, ReloadOutlined, PlusOutlined } from '@ant-design/icons-vue'
import dayjs from 'dayjs'

// 搜索表单
const searchFormRef = ref()
const searchForm = reactive({
  hazardCode: '',
  level1Name: '',
  level2Name: '',
  level3Name: '',
  hazardLevelCode: undefined,
  governancePhaseCode: undefined
})

// 表格数据
const tableData = ref([])
const loading = ref(false)

// 分页配置
const pagination = reactive({
  current: 1,
  pageSize: 10,
  total: 0,
  showSizeChanger: true,
  showQuickJumper: true,
  showTotal: (total) => `共 ${total} 条数据`,
  pageSizeOptions: ['10', '20', '50', '100']
})

// 表格列配置
const columns = [
  {
    title: '隐患编号',
    dataIndex: 'hazardCode',
    key: 'hazardCode',
    width: 120
  },
  {
    title: '一级分类',
    dataIndex: 'level1Name',
    key: 'level1Name',
    width: 100
  },
  {
    title: '二级分类',
    dataIndex: 'level2Name',
    key: 'level2Name',
    width: 100
  },
  {
    title: '三级分类',
    dataIndex: 'level3Name',
    key: 'level3Name',
    width: 100
  },
  {
    title: '位置',
    dataIndex: 'location',
    key: 'location',
    width: 120
  },
  {
    title: '关联项目',
    dataIndex: 'relatedProject',
    key: 'relatedProject',
    width: 120
  },
  {
    title: '隐患等级',
    dataIndex: 'hazardLevelName',
    key: 'hazardLevelName',
    width: 100
  },
  {
    title: '隐患类型',
    dataIndex: 'hazardTypeName',
    key: 'hazardTypeName',
    width: 100
  },
  {
    title: '治理阶段',
    dataIndex: 'governancePhaseName',
    key: 'governancePhaseName',
    width: 100
  },
  {
    title: '操作',
    dataIndex: 'action',
    key: 'action',
    width: 180,
    fixed: 'right'
  }
]

// 模态框相关
const modalVisible = ref(false)
const modalTitle = ref('')
const modalLoading = ref(false)
const modalFormRef = ref()
const isEdit = ref(false)
const modalForm = reactive({
  id: '',
  hazardCode: '',
  level1Name: '',
  level2Name: '',
  level3Name: '',
  location: '',
  relatedProject: '',
  hazardLevelCode: undefined,
  hazardTypeCode: undefined,
  governancePhaseCode: undefined,
  rectificationUnitName: '',
  rectificationPerson: '',
  rectificationStartTime: null,
  rectificationEndTime: null,
  delayedCompletionTime: null,
  delayDays: 0,
  entryPerson: '',
  supervisoryPerson: ''
})

// 详情模态框
const detailModalVisible = ref(false)
const detailData = ref({})

// 获取隐患等级颜色
const getHazardLevelColor = (code) => {
  const colorMap = {
    HIGH: 'red',
    MEDIUM: 'orange',
    LOW: 'green'
  }
  return colorMap[code] || 'default'
}

// 获取治理阶段颜色
const getGovernancePhaseColor = (code) => {
  const colorMap = {
    NOT_STARTED: 'red',
    IN_PROGRESS: 'orange',
    COMPLETED: 'green'
  }
  return colorMap[code] || 'default'
}

// 格式化日期
const formatDate = (date) => {
  return date ? dayjs(date).format('YYYY-MM-DD') : '-'
}

// 查询
const handleSearch = () => {
  pagination.current = 1
  loadData()
}

// 重置
const handleReset = () => {
  searchFormRef.value.resetFields()
  pagination.current = 1
  loadData()
}

// 表格变化处理
const handleTableChange = (pag) => {
  pagination.current = pag.current
  pagination.pageSize = pag.pageSize
  loadData()
}

// 新增
const handleAdd = () => {
  isEdit.value = false
  modalTitle.value = '新增隐患'
  resetModalForm()
  modalVisible.value = true
}

// 编辑
const handleEdit = (record) => {
  isEdit.value = true
  modalTitle.value = '编辑隐患'
  Object.assign(modalForm, record)
  modalVisible.value = true
}

// 删除
const handleDelete = async (record) => {
  try {
    loading.value = true
    // 这里调用删除接口
    // await deleteHazard(record.id)
    message.success('删除成功')
    loadData()
  } catch (error) {
    message.error('删除失败')
  } finally {
    loading.value = false
  }
}

// 详情
const handleDetail = (record) => {
  detailData.value = record
  detailModalVisible.value = true
}

// 模态框确定
const handleModalOk = async () => {
  try {
    await modalFormRef.value.validate()
    modalLoading.value = true
    
    // 这里调用新增或编辑接口
    if (isEdit.value) {
      // await updateHazard(modalForm)
      message.success('编辑成功')
    } else {
      // await createHazard(modalForm)
      message.success('新增成功')
    }
    
    modalVisible.value = false
    loadData()
  } catch (error) {
    if (error.errorFields) {
      message.error('请完善表单信息')
    } else {
      message.error(isEdit.value ? '编辑失败' : '新增失败')
    }
  } finally {
    modalLoading.value = false
  }
}

// 模态框取消
const handleModalCancel = () => {
  modalVisible.value = false
  resetModalForm()
}

// 重置模态框表单
const resetModalForm = () => {
  modalFormRef.value?.resetFields()
  Object.assign(modalForm, {
    id: '',
    hazardCode: '',
    level1Name: '',
    level2Name: '',
    level3Name: '',
    location: '',
    relatedProject: '',
    hazardLevelCode: undefined,
    hazardTypeCode: undefined,
    governancePhaseCode: undefined,
    rectificationUnitName: '',
    rectificationPerson: '',
    rectificationStartTime: null,
    rectificationEndTime: null,
    delayedCompletionTime: null,
    delayDays: 0,
    entryPerson: '',
    supervisoryPerson: ''
  })
}

// 模态框重置按钮
const handleModalReset = () => {
  resetModalForm()
}

// 加载数据
const loadData = async () => {
  try {
    loading.value = true
    
    // 构建查询参数
    const params = {
      ...searchForm,
      page: pagination.current,
      size: pagination.pageSize
    }
    
    // 这里调用API接口
    // const response = await getHazardList(params)
    
    // 模拟数据
    const mockData = generateMockData()
    tableData.value = mockData.list
    pagination.total = mockData.total
    
  } catch (error) {
    message.error('加载数据失败')
  } finally {
    loading.value = false
  }
}

// 生成模拟数据
const generateMockData = () => {
  const mockList = []
  for (let i = 1; i <= 100; i++) {
    mockList.push({
      id: `hazard_${i}`,
      hazardCode: `HAZ${String(i).padStart(4, '0')}`,
      level1Name: ['安全类', '质量类', '环境类'][i % 3],
      level2Name: ['电气安全', '消防安全', '施工质量', '材料质量', '噪音污染', '粉尘污染'][i % 6],
      level3Name: ['电线裸露', '灭火器缺失', '混凝土强度不足', '钢筋锈蚀', '夜间施工', '土方作业'][i % 6],
      location: `位置${i}`,
      relatedProject: `项目${i}`,
      hazardLevelCode: ['HIGH', 'MEDIUM', 'LOW'][i % 3],
      hazardLevelName: ['高风险', '中风险', '低风险'][i % 3],
      hazardTypeCode: ['SAFETY', 'QUALITY', 'ENVIRONMENT'][i % 3],
      hazardTypeName: ['安全类', '质量类', '环境类'][i % 3],
      governancePhaseCode: ['NOT_STARTED', 'IN_PROGRESS', 'COMPLETED'][i % 3],
      governancePhaseName: ['未开始', '进行中', '已完成'][i % 3],
      rectificationUnitName: `单位${i}`,
      rectificationPerson: `人员${i}`,
      rectificationStartTime: dayjs().subtract(i, 'day').toISOString(),
      rectificationEndTime: dayjs().add(i, 'day').toISOString(),
      delayedCompletionTime: i % 5 === 0 ? dayjs().add(i + 2, 'day').toISOString() : null,
      delayDays: i % 5 === 0 ? i % 10 : 0,
      entryPerson: `录入人${i}`,
      supervisoryPerson: `监督人${i}`
    })
  }
  
  return {
    list: mockList.slice((pagination.current - 1) * pagination.pageSize, pagination.current * pagination.pageSize),
    total: mockList.length
  }
}

// 页面加载时获取数据
onMounted(() => {
  loadData()
})
</script>

<style scoped>
.hazard-management {
  padding: 16px;
}

.search-card {
  margin-bottom: 16px;
}

.search-container {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 16px;
}

.search-fields {
  flex: 1;
}

.search-form .ant-form-item {
  margin-bottom: 16px;
}

.search-buttons {
  flex-shrink: 0;
  padding-top: 4px;
}

.table-card {
  margin-bottom: 16px;
}
</style>