<template>
  <div class="page-container">
    <div class="page-header">
      <h2>系统设置</h2>
      <p>配置系统参数和用户权限</p>
    </div>

    <a-card>
      <div class="content-placeholder">
        <SettingOutlined style="font-size: 48px; color: #d9d9d9;" />
        <h3>系统设置页面</h3>
        <p>这里可以添加系统配置、权限管理等功能</p>
      </div>
    </a-card>
  </div>
</template>

<script setup>
import { SettingOutlined } from '@ant-design/icons-vue'
</script>

<style scoped>
.page-container {
  padding: 0;
}

.page-header {
  margin-bottom: 24px;
}

.page-header h2 {
  font-size: 24px;
  font-weight: 600;
  color: #262626;
  margin: 0 0 8px 0;
}

.page-header p {
  color: #8c8c8c;
  margin: 0;
}

.content-placeholder {
  text-align: center;
  padding: 60px 20px;
  color: #8c8c8c;
}

.content-placeholder h3 {
  margin: 16px 0 8px 0;
  color: #595959;
}
</style>
