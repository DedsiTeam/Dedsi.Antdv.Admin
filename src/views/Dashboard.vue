<template>
  <div class="dashboard">
    <!-- 页面标题 -->
    <div class="page-header">
      <h2 class="page-title">仪表盘</h2>
      <p class="page-description">欢迎回来，这里是您的数据概览</p>
    </div>

    <!-- 统计卡片 -->
    <a-row :gutter="[24, 24]" class="stats-row">
      <a-col :xs="24" :sm="12" :lg="6">
        <a-card class="stat-card">
          <div class="stat-content">
            <div class="stat-icon user-icon">
              <UserOutlined />
            </div>
            <div class="stat-info">
              <div class="stat-number">2,456</div>
              <div class="stat-label">总用户数</div>
              <div class="stat-trend positive">
                <ArrowUpOutlined />
                <span>12.5%</span>
              </div>
            </div>
          </div>
        </a-card>
      </a-col>

      <a-col :xs="24" :sm="12" :lg="6">
        <a-card class="stat-card">
          <div class="stat-content">
            <div class="stat-icon revenue-icon">
              <DollarOutlined />
            </div>
            <div class="stat-info">
              <div class="stat-number">¥128,456</div>
              <div class="stat-label">总收入</div>
              <div class="stat-trend positive">
                <ArrowUpOutlined />
                <span>8.2%</span>
              </div>
            </div>
          </div>
        </a-card>
      </a-col>

      <a-col :xs="24" :sm="12" :lg="6">
        <a-card class="stat-card">
          <div class="stat-content">
            <div class="stat-icon order-icon">
              <ShoppingCartOutlined />
            </div>
            <div class="stat-info">
              <div class="stat-number">1,329</div>
              <div class="stat-label">订单数量</div>
              <div class="stat-trend negative">
                <ArrowDownOutlined />
                <span>3.1%</span>
              </div>
            </div>
          </div>
        </a-card>
      </a-col>

      <a-col :xs="24" :sm="12" :lg="6">
        <a-card class="stat-card">
          <div class="stat-content">
            <div class="stat-icon product-icon">
              <ShoppingOutlined />
            </div>
            <div class="stat-info">
              <div class="stat-number">486</div>
              <div class="stat-label">产品数量</div>
              <div class="stat-trend positive">
                <ArrowUpOutlined />
                <span>5.7%</span>
              </div>
            </div>
          </div>
        </a-card>
      </a-col>
    </a-row>

    <!-- 图表区域 -->
    <a-row :gutter="[24, 24]" class="charts-row">
      <a-col :xs="24" :lg="16">
        <a-card title="销售趋势" class="chart-card">
          <div class="chart-placeholder">
            <div class="chart-content">
              <BarChartOutlined class="chart-icon" />
              <p>销售趋势图表</p>
              <p class="chart-desc">这里可以集成 ECharts 或其他图表库</p>
            </div>
          </div>
        </a-card>
      </a-col>

      <a-col :xs="24" :lg="8">
        <a-card title="热销产品" class="chart-card">
          <div class="product-list">
            <div v-for="(item, index) in hotProducts" :key="index" class="product-item">
              <div class="product-rank">{{ index + 1 }}</div>
              <div class="product-info">
                <div class="product-name">{{ item.name }}</div>
                <div class="product-sales">销量: {{ item.sales }}</div>
              </div>
              <div class="product-progress">
                <a-progress
                  :percent="item.percent"
                  :stroke-color="getProgressColor(index)"
                  :show-info="false"
                  size="small"
                />
              </div>
            </div>
          </div>
        </a-card>
      </a-col>
    </a-row>

    <!-- 最新动态 -->
    <a-row :gutter="[24, 24]">
      <a-col :xs="24" :lg="12">
        <a-card title="最新订单" class="activity-card">
          <a-list
            :data-source="recentOrders"
            size="small"
          >
            <template #renderItem="{ item }">
              <a-list-item>
                <a-list-item-meta>
                  <template #avatar>
                    <a-avatar :style="{ backgroundColor: item.color }">
                      {{ item.customer.charAt(0) }}
                    </a-avatar>
                  </template>
                  <template #title>
                    <span>{{ item.customer }}</span>
                  </template>
                  <template #description>
                    订单号: {{ item.orderNo }} | 金额: ¥{{ item.amount }}
                  </template>
                </a-list-item-meta>
                <div class="order-time">{{ item.time }}</div>
              </a-list-item>
            </template>
          </a-list>
        </a-card>
      </a-col>

      <a-col :xs="24" :lg="12">
        <a-card title="系统通知" class="activity-card">
          <a-timeline>
            <a-timeline-item v-for="(item, index) in notifications" :key="index" :color="item.color">
              <div class="notification-content">
                <div class="notification-title">{{ item.title }}</div>
                <div class="notification-desc">{{ item.description }}</div>
                <div class="notification-time">{{ item.time }}</div>
              </div>
            </a-timeline-item>
          </a-timeline>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import {
  UserOutlined,
  DollarOutlined,
  ShoppingCartOutlined,
  ShoppingOutlined,
  ArrowUpOutlined,
  ArrowDownOutlined,
  BarChartOutlined
} from '@ant-design/icons-vue'

// 热销产品数据
const hotProducts = ref([
  { name: 'iPhone 15 Pro', sales: 1234, percent: 85 },
  { name: 'MacBook Air M2', sales: 987, percent: 70 },
  { name: 'iPad Pro', sales: 756, percent: 55 },
  { name: 'AirPods Pro', sales: 543, percent: 40 },
  { name: 'Apple Watch', sales: 321, percent: 25 }
])

// 最新订单数据
const recentOrders = ref([
  {
    customer: '张三',
    orderNo: 'ORD-2025-001',
    amount: 2999,
    time: '5分钟前',
    color: '#1890ff'
  },
  {
    customer: '李四',
    orderNo: 'ORD-2025-002',
    amount: 1599,
    time: '15分钟前',
    color: '#52c41a'
  },
  {
    customer: '王五',
    orderNo: 'ORD-2025-003',
    amount: 899,
    time: '30分钟前',
    color: '#faad14'
  },
  {
    customer: '赵六',
    orderNo: 'ORD-2025-004',
    amount: 3299,
    time: '1小时前',
    color: '#f5222d'
  }
])

// 系统通知数据
const notifications = ref([
  {
    title: '系统升级完成',
    description: 'V2.1.0 版本已成功部署',
    time: '2小时前',
    color: 'green'
  },
  {
    title: '新用户注册',
    description: '今日新增用户 156 人',
    time: '4小时前',
    color: 'blue'
  },
  {
    title: '库存预警',
    description: 'iPhone 15 Pro 库存不足',
    time: '6小时前',
    color: 'red'
  },
  {
    title: '数据备份',
    description: '每日数据备份已完成',
    time: '12小时前',
    color: 'gray'
  }
])

// 获取进度条颜色
const getProgressColor = (index) => {
  const colors = ['#1890ff', '#52c41a', '#faad14', '#f5222d', '#722ed1']
  return colors[index] || '#1890ff'
}
</script>

<style scoped>
.dashboard {
  padding: 0;
}

.page-header {
  margin-bottom: 24px;
}

.page-title {
  font-size: 24px;
  font-weight: 600;
  color: #262626;
  margin: 0 0 8px 0;
}

.page-description {
  color: #8c8c8c;
  margin: 0;
}

.stats-row {
  margin-bottom: 24px;
}

.stat-card {
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
}

.stat-card:hover {
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.12);
  transform: translateY(-2px);
}

.stat-content {
  display: flex;
  align-items: center;
}

.stat-icon {
  width: 60px;
  height: 60px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  margin-right: 16px;
}

.user-icon {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
}

.revenue-icon {
  background: linear-gradient(135deg, #f093fb 0%, #f5576c 100%);
  color: white;
}

.order-icon {
  background: linear-gradient(135deg, #4facfe 0%, #00f2fe 100%);
  color: white;
}

.product-icon {
  background: linear-gradient(135deg, #43e97b 0%, #38f9d7 100%);
  color: white;
}

.stat-info {
  flex: 1;
}

.stat-number {
  font-size: 24px;
  font-weight: 700;
  color: #262626;
  margin-bottom: 4px;
}

.stat-label {
  color: #8c8c8c;
  margin-bottom: 8px;
}

.stat-trend {
  display: flex;
  align-items: center;
  font-size: 12px;
  font-weight: 500;
}

.stat-trend.positive {
  color: #52c41a;
}

.stat-trend.negative {
  color: #f5222d;
}

.stat-trend span {
  margin-left: 4px;
}

.charts-row {
  margin-bottom: 24px;
}

.chart-card {
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.chart-placeholder {
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fafafa;
  border-radius: 8px;
}

.chart-content {
  text-align: center;
  color: #8c8c8c;
}

.chart-icon {
  font-size: 48px;
  margin-bottom: 16px;
  color: #d9d9d9;
}

.chart-desc {
  margin-top: 8px;
  font-size: 12px;
}

.product-list {
  padding: 0;
}

.product-item {
  display: flex;
  align-items: center;
  padding: 16px 0;
  border-bottom: 1px solid #f0f0f0;
}

.product-item:last-child {
  border-bottom: none;
}

.product-rank {
  width: 24px;
  height: 24px;
  background: #f5f5f5;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: 600;
  margin-right: 12px;
}

.product-info {
  flex: 1;
  margin-right: 12px;
}

.product-name {
  font-weight: 500;
  color: #262626;
  margin-bottom: 4px;
}

.product-sales {
  font-size: 12px;
  color: #8c8c8c;
}

.product-progress {
  width: 80px;
}

.activity-card {
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}

.order-time {
  color: #8c8c8c;
  font-size: 12px;
}

.notification-content {
  padding-left: 8px;
}

.notification-title {
  font-weight: 500;
  color: #262626;
  margin-bottom: 4px;
}

.notification-desc {
  color: #8c8c8c;
  font-size: 12px;
  margin-bottom: 4px;
}

.notification-time {
  color: #bfbfbf;
  font-size: 11px;
}
</style>
