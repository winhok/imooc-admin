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
    top: 0,
    left: 0
  },
  tooltip: {
    trigger: 'item',
    formatter: `{b}: {c} ${t('msg.chart.unit')}`
  },
  series: [
    {
      type: 'pie',
      radius: ['40%', '70%'],
      itemStyle: {
        borderRadius: 10,
        borderColor: '#fff',
        borderWidth: 2
      },
      label: { show: false, formatter: '{b}: {d}%', position: 'center' },
      emphasis: {
        label: { show: true, fontSize: 22, fontWeight: 'bold' }
      },
      data: data.value
    }
  ]
}))

useEChart(target, option)
</script>

<template>
  <el-card :body-style="{ padding: 0 }">
    <div ref="chart" class="pie-chart" />
  </el-card>
</template>

<style scoped>
.pie-chart {
  width: 100%;
  height: 240px;
}
</style>
