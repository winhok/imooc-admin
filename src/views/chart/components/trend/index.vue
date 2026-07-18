<script setup lang="ts">
import { getChartTrend } from '@/api/chart'
import { useLangFetch } from '@/utils/i18n'
import TrendChart from './TrendChart.vue'
import TrendData from './TrendData.vue'

const data = useLangFetch(getChartTrend, null)
</script>

<template>
  <el-card class="trend-card">
    <el-skeleton v-if="!data" :rows="5" animated />
    <el-row v-else :gutter="32">
      <el-col :xs="24" :md="7" :lg="6">
        <TrendData :data="data" />
      </el-col>
      <el-col :xs="24" :md="17" :lg="18">
        <TrendChart :data="data" />
      </el-col>
    </el-row>
  </el-card>
</template>

<style scoped>
.trend-card {
  height: 286px;
}

@media (max-width: 767px) {
  .trend-card {
    height: auto;
    min-height: 286px;
  }
}
</style>
