<script setup lang="ts">
import { computed, useTemplateRef } from 'vue'
import { useI18n } from 'vue-i18n'
import { getChartPie } from '@/api/chart'
import { useLangFetch } from '@/utils/i18n'
import { useEChart } from '@/views/chart/composables/useEChart'
import type { EChartsCoreOption } from '@/views/chart/echarts'

const { t } = useI18n()
const data = useLangFetch(getChartPie, [])
const target = useTemplateRef<HTMLElement>('chart')
const option = computed<EChartsCoreOption>(() => ({
  title: {
    text: t('msg.chart.pieChartTitle'),
    left: 16,
    top: 14,
    textStyle: { fontSize: 16 }
  },
  tooltip: {
    trigger: 'item',
    valueFormatter: (value: string | number) =>
      `${value} ${t('msg.chart.unit')}`
  },
  series: [
    {
      type: 'pie',
      radius: ['42%', '72%'],
      center: ['50%', '58%'],
      itemStyle: {
        borderRadius: 8,
        borderColor: '#fff',
        borderWidth: 2
      },
      label: { show: false, position: 'center' },
      emphasis: {
        label: { show: true, fontSize: 18, fontWeight: 'bold' }
      },
      data: data.value
    }
  ]
}))

useEChart(target, option)
</script>

<template>
  <el-card shadow="never" :body-style="{ padding: 0 }">
    <div ref="chart" class="pie-chart" />
  </el-card>
</template>

<style scoped>
.pie-chart {
  width: 100%;
  height: 240px;
}
</style>
