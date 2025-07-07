<template>
  <div class="risk-management">
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
            <a-form-item label="风险编号" name="riskNumber">
              <a-input
                v-model:value="searchForm.riskNumber"
                placeholder="请输入风险编号"
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
            
            <a-form-item label="风险等级" name="riskLevelCode">
              <a-select
                v-model:value="searchForm.riskLevelCode"
                placeholder="请选择风险等级"
                allow-clear
                style="width: 150px"
              >
                <a-select-option value="HIGH">高风险</a-select-option>
                <a-select-option value="MEDIUM">中风险</a-select-option>
                <a-select-option value="LOW">低风险</a-select-option>
              </a-select>
            </a-form-item>
            
            <a-form-item label="控制状态" name="controlStatusCode">
              <a-select
                v-model:value="searchForm.controlStatusCode"
                placeholder="请选择控制状态"
                allow-clear
                style="width: 150px"
              >
                <a-select-option value="CONTROLLED">已控制</a-select-option>
                <a-select-option value="UNCONTROLLED">未控制</a-select-option>
                <a-select-option value="PROCESSING">处理中</a-select-option>
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
    <a-card title="风险列表" class="table-card" :bordered="false">
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
          <template v-if="column.dataIndex === 'riskLevelName'">
            <a-tag
              :color="getRiskLevelColor(record.riskLevelCode)"
            >
              {{ record.riskLevelName }}
            </a-tag>
          </template>
          
          <template v-if="column.dataIndex === 'controlStatusName'">
            <a-tag
              :color="getControlStatusColor(record.controlStatusCode)"
            >
              {{ record.controlStatusName }}
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
              label="风险编号"
              name="riskNumber"
              :rules="[{ required: true, message: '请输入风险编号' }]"
            >
              <a-input v-model:value="modalForm.riskNumber" placeholder="请输入风险编号" />
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
              label="涉及项目"
              name="involvingProject"
            >
              <a-input v-model:value="modalForm.involvingProject" placeholder="请输入涉及项目" />
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
              label="风险等级"
              name="riskLevelCode"
              :rules="[{ required: true, message: '请选择风险等级' }]"
            >
              <a-select v-model:value="modalForm.riskLevelCode" placeholder="请选择风险等级">
                <a-select-option value="HIGH">高风险</a-select-option>
                <a-select-option value="MEDIUM">中风险</a-select-option>
                <a-select-option value="LOW">低风险</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          
          <a-col :span="12">
            <a-form-item
              label="风险类型"
              name="riskTypeCode"
              :rules="[{ required: true, message: '请选择风险类型' }]"
            >
              <a-select v-model:value="modalForm.riskTypeCode" placeholder="请选择风险类型">
                <a-select-option value="FINANCIAL">财务风险</a-select-option>
                <a-select-option value="OPERATIONAL">运营风险</a-select-option>
                <a-select-option value="TECHNICAL">技术风险</a-select-option>
                <a-select-option value="MARKET">市场风险</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          
          <a-col :span="12">
            <a-form-item
              label="控制状态"
              name="controlStatusCode"
              :rules="[{ required: true, message: '请选择控制状态' }]"
            >
              <a-select v-model:value="modalForm.controlStatusCode" placeholder="请选择控制状态">
                <a-select-option value="CONTROLLED">已控制</a-select-option>
                <a-select-option value="UNCONTROLLED">未控制</a-select-option>
                <a-select-option value="PROCESSING">处理中</a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          
          <a-col :span="24">
            <a-form-item
              label="风险描述"
              name="riskDescription"
              :label-col="{ span: 3 }"
              :wrapper-col="{ span: 21 }"
            >
              <a-textarea
                v-model:value="modalForm.riskDescription"
                placeholder="请输入风险描述"
                :rows="4"
              />
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
      title="风险详情"
      width="800px"
      :footer="null"
    >
      <a-descriptions :column="2" bordered>
        <a-descriptions-item label="风险编号">{{ detailData.riskNumber }}</a-descriptions-item>
        <a-descriptions-item label="一级分类">{{ detailData.level1Name }}</a-descriptions-item>
        <a-descriptions-item label="二级分类">{{ detailData.level2Name }}</a-descriptions-item>
        <a-descriptions-item label="三级分类">{{ detailData.level3Name }}</a-descriptions-item>
        <a-descriptions-item label="涉及项目">{{ detailData.involvingProject }}</a-descriptions-item>
        <a-descriptions-item label="位置">{{ detailData.location }}</a-descriptions-item>
        <a-descriptions-item label="风险等级">
          <a-tag :color="getRiskLevelColor(detailData.riskLevelCode)">
            {{ detailData.riskLevelName }}
          </a-tag>
        </a-descriptions-item>
        <a-descriptions-item label="风险类型">{{ detailData.riskTypeName }}</a-descriptions-item>
        <a-descriptions-item label="控制状态">
          <a-tag :color="getControlStatusColor(detailData.controlStatusCode)">
            {{ detailData.controlStatusName }}
          </a-tag>
        </a-descriptions-item>
        <a-descriptions-item label="风险描述" :span="2">
          {{ detailData.riskDescription }}
        </a-descriptions-item>
      </a-descriptions>
    </a-modal>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { message } from 'ant-design-vue'
import { SearchOutlined, ReloadOutlined, PlusOutlined } from '@ant-design/icons-vue'

// 搜索表单
const searchFormRef = ref()
const searchForm = reactive({
  riskNumber: '',
  level1Name: '',
  level2Name: '',
  level3Name: '',
  riskLevelCode: undefined,
  controlStatusCode: undefined
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
    title: '风险编号',
    dataIndex: 'riskNumber',
    key: 'riskNumber',
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
    title: '涉及项目',
    dataIndex: 'involvingProject',
    key: 'involvingProject',
    width: 120
  },
  {
    title: '位置',
    dataIndex: 'location',
    key: 'location',
    width: 100
  },
  {
    title: '风险等级',
    dataIndex: 'riskLevelName',
    key: 'riskLevelName',
    width: 100
  },
  {
    title: '风险类型',
    dataIndex: 'riskTypeName',
    key: 'riskTypeName',
    width: 100
  },
  {
    title: '控制状态',
    dataIndex: 'controlStatusName',
    key: 'controlStatusName',
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
  riskNumber: '',
  level1Name: '',
  level2Name: '',
  level3Name: '',
  involvingProject: '',
  location: '',
  riskDescription: '',
  riskLevelCode: undefined,
  riskTypeCode: undefined,
  controlStatusCode: undefined
})

// 详情模态框
const detailModalVisible = ref(false)
const detailData = ref({})

// 获取风险等级颜色
const getRiskLevelColor = (code) => {
  const colorMap = {
    HIGH: 'red',
    MEDIUM: 'orange',
    LOW: 'green'
  }
  return colorMap[code] || 'default'
}

// 获取控制状态颜色
const getControlStatusColor = (code) => {
  const colorMap = {
    CONTROLLED: 'green',
    UNCONTROLLED: 'red',
    PROCESSING: 'orange'
  }
  return colorMap[code] || 'default'
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
  modalTitle.value = '新增风险'
  resetModalForm()
  modalVisible.value = true
}

// 编辑
const handleEdit = (record) => {
  isEdit.value = true
  modalTitle.value = '编辑风险'
  Object.assign(modalForm, record)
  modalVisible.value = true
}

// 删除
const handleDelete = async (record) => {
  try {
    loading.value = true
    // 这里调用删除接口
    // await deleteRisk(record.id)
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
      // await updateRisk(modalForm)
      message.success('编辑成功')
    } else {
      // await createRisk(modalForm)
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
    riskNumber: '',
    level1Name: '',
    level2Name: '',
    level3Name: '',
    involvingProject: '',
    location: '',
    riskDescription: '',
    riskLevelCode: undefined,
    riskTypeCode: undefined,
    controlStatusCode: undefined
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
    // const response = await getRiskList(params)
    
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
      id: `risk_${i}`,
      riskNumber: `RISK${String(i).padStart(4, '0')}`,
      level1Name: ['安全风险', '财务风险', '运营风险'][i % 3],
      level2Name: ['技术安全', '人员安全', '资金风险', '投资风险', '流程风险', '管理风险'][i % 6],
      level3Name: ['系统漏洞', '数据泄露', '人身伤害', '设备故障', '资金短缺', '投资损失'][i % 6],
      involvingProject: `项目${i}`,
      controlStatusName: ['已控制', '未控制', '处理中'][i % 3],
      controlStatusCode: ['CONTROLLED', 'UNCONTROLLED', 'PROCESSING'][i % 3],
      location: `位置${i}`,
      riskDescription: `这是第${i}个风险的详细描述信息`,
      riskLevelCode: ['HIGH', 'MEDIUM', 'LOW'][i % 3],
      riskLevelName: ['高风险', '中风险', '低风险'][i % 3],
      riskTypeName: ['财务风险', '运营风险', '技术风险', '市场风险'][i % 4],
      riskTypeCode: ['FINANCIAL', 'OPERATIONAL', 'TECHNICAL', 'MARKET'][i % 4]
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
.risk-management {
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