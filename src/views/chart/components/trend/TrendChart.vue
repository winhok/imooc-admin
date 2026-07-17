<script setup lang="ts">
import { computed, useTemplateRef } from 'vue'
import { useI18n } from 'vue-i18n'
import type { ChartTrend } from '@/api/chart'
import { useEChart } from '@/views/chart/composables/useEChart'
import type { EChartsCoreOption } from '@/views/chart/echarts'

const props = defineProps<{
  data: ChartTrend
}>()

const { t } = useI18n()
const target = useTemplateRef<HTMLElement>('chart')
const option = computed<EChartsCoreOption>(() => ({
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross'
    }
  },
  legend: {
    data: [t('msg.chart.monthIncome'), t('msg.chart.dayIncome')],
    right: 0
  },
  grid: {
    top: 36,
    right: 8,
    bottom: 0,
    left: 0,
    containLabel: true
  },
  xAxis: {
    type: 'category',
    data: props.data.monthAmountList.map((item) => item.time),
    axisTick: { show: false }
  },
  yAxis: {
    type: 'value',
    min: 0,
    axisLabel: {
      formatter: `{value} ${t('msg.chart.unit')}`
    }
  },
  series: [
    {
      name: t('msg.chart.monthIncome'),
      type: 'bar',
      barMaxWidth: 24,
      itemStyle: { borderRadius: [4, 4, 0, 0] },
      data: props.data.monthAmountList.map((item) => item.amount)
    },
    {
      name: t('msg.chart.dayIncome'),
      type: 'line',
      smooth: true,
      showSymbol: false,
      lineStyle: { width: 3 },
      data: props.data.dailyCurve.map((item) => item.amount)
    }
  ]
}))

useEChart(target, option)
</script>

<template>
  <div ref="chart" class="trend-chart" />
</template>

<style scoped>
.trend-chart {
  width: 100%;
  height: 238px;
}
</style>
