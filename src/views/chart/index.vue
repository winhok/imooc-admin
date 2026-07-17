<script setup lang="ts">
import { shallowRef } from 'vue'
import BMap from './components/b-map/index.vue'
import Calendar from './components/calendar/index.vue'
import HorizontalBar from './components/horizontal-bar/index.vue'
import Pie from './components/pie/index.vue'
import TableSheet from './components/table-sheet/index.vue'
import Trend from './components/trend/index.vue'
import WordCloud from './components/word-cloud/index.vue'

const selectedDate = shallowRef(new Date())
</script>

<template>
  <section class="chart-page">
    <Trend />

    <el-row :gutter="20">
      <el-col :xs="24" :lg="16">
        <HorizontalBar :date="selectedDate" />
      </el-col>
      <el-col :xs="24" :lg="8">
        <Calendar v-model="selectedDate" />
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :xs="24" :lg="6">
        <div class="chart-page__stack">
          <Pie />
          <WordCloud />
        </div>
      </el-col>
      <el-col :xs="24" :lg="18">
        <BMap />
      </el-col>
    </el-row>

    <TableSheet />
  </section>
</template>

<style scoped>
.chart-page {
  display: grid;
  gap: 20px;
}

.chart-page__stack {
  display: grid;
  gap: 20px;
}

@media (max-width: 1199px) {
  .chart-page :deep(.el-col + .el-col) {
    margin-top: 20px;
  }
}
</style>
