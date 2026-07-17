<script setup lang="ts">
import dayjs from 'dayjs'
import { computed, shallowRef, useTemplateRef, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { getChartTimeAmount, type TimeAmount } from '@/api/chart'
import { useEChart } from '@/views/chart/composables/useEChart'
import type { EChartsCoreOption } from '@/views/chart/echarts'

const props = defineProps<{
  date: Date
}>()

const { t } = useI18n()
const data = shallowRef<TimeAmount[]>([])
const target = useTemplateRef<HTMLElement>('chart')

watch(
  () => props.date,
  async (date) => {
    data.value = await getChartTimeAmount(dayjs(date).format('YYYY-MM-DD'))
  },
  { immediate: true }
)

const option = computed<EChartsCoreOption>(() => {
  const income = `${t('msg.chart.income')} (${t('msg.chart.unit')})`
  const expend = `${t('msg.chart.expend')} (${t('msg.chart.unit')})`
  const balance = `${t('msg.chart.balance')} (${t('msg.chart.unit')})`

  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' }
    },
    legend: {
      data: [income, expend, balance],
      right: 0
    },
    grid: {
      top: 44,
      right: 16,
      bottom: 0,
      left: 0,
      containLabel: true
    },
    xAxis: { type: 'value' },
    yAxis: {
      type: 'category',
      inverse: true,
      axisTick: { show: false },
      data: data.value.map((item) => item.timeStr)
    },
    series: [
      {
        name: income,
        type: 'bar',
        stack: 'cashflow',
        color: '#67c23a',
        label: { show: true, position: 'right' },
        emphasis: { focus: 'series' },
        data: data.value.map((item) => item.income)
      },
      {
        name: expend,
        type: 'bar',
        stack: 'cashflow',
        color: '#f56c6c',
        label: { show: true, position: 'left' },
        emphasis: { focus: 'series' },
        data: data.value.map((item) => item.expense)
      },
      {
        name: balance,
        type: 'bar',
        color: '#409eff',
        label: { show: true, position: 'inside' },
        emphasis: { focus: 'series' },
        data: data.value.map((item) => item.balance)
      }
    ]
  }
})

useEChart(target, option)
</script>

<template>
  <el-card shadow="never" :body-style="{ paddingTop: '12px' }">
    <div ref="chart" class="horizontal-bar" />
  </el-card>
</template>

<style scoped>
.horizontal-bar {
  width: 100%;
  height: 403px;
}
</style>
