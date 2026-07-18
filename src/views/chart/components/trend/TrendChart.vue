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
      type: 'cross',
      crossStyle: { color: '#999' }
    }
  },
  legend: {
    data: [t('msg.chart.monthIncome'), t('msg.chart.dayIncome')],
    top: 0,
    right: 0
  },
  grid: {
    top: 20,
    right: 0,
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
    max: ({ max }: { max: number }) => Math.trunc(max * 1.2),
    axisLabel: {
      formatter: `{value} ${t('msg.chart.unit')}`
    }
  },
  series: [
    {
      name: t('msg.chart.monthIncome'),
      type: 'bar',
      barWidth: 20,
      tooltip: {
        valueFormatter: (value: string | number) =>
          `${value}${t('msg.chart.unit')}`
      },
      data: props.data.monthAmountList.map((item) => item.amount)
    },
    {
      name: t('msg.chart.dayIncome'),
      type: 'line',
      color: '#6ec6d0',
      smooth: true,
      tooltip: {
        valueFormatter: (value: string | number) =>
          `${value}${t('msg.chart.unit')}`
      },
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
  height: 248px;
}
</style>
