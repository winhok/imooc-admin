<script setup lang="ts">
import { Chart } from '@antv/g2'
import {
  onBeforeUnmount,
  onMounted,
  shallowRef,
  useTemplateRef,
  watch
} from 'vue'
import { getChartWordCloud } from '@/api/chart'
import wordCloudMask from '@/assets/wordcloud-mask.svg'
import { useLangFetch } from '@/utils/i18n'

const data = useLangFetch(getChartWordCloud, [])
const target = useTemplateRef<HTMLElement>('chart')
const chart = shallowRef<Chart>()

const render = async () => {
  if (!chart.value) return
  chart.value.options({
    type: 'wordCloud',
    data: data.value,
    encode: {
      text: 'name',
      value: 'value',
      color: 'name'
    },
    layout: {
      fontSize: [12, 42],
      padding: 2,
      rotate: 0,
      spiral: 'rectangular',
      imageMask: wordCloudMask
    },
    scale: {
      color: {
        range: ['#409eff', '#67c23a', '#e6a23c', '#f56c6c', '#8b5cf6']
      }
    },
    legend: false,
    axis: false
  })
  await chart.value.render()
}

onMounted(() => {
  if (!target.value) return
  chart.value = new Chart({
    container: target.value,
    autoFit: true,
    padding: 0
  })
  void render()
})

watch(data, () => void render())
onBeforeUnmount(() => chart.value?.destroy())
</script>

<template>
  <el-card shadow="never" :body-style="{ padding: '14px 16px 0' }">
    <h3 class="word-cloud__title">{{ $t('msg.chart.cloudChartTitle') }}</h3>
    <div ref="chart" class="word-cloud" />
  </el-card>
</template>

<style scoped>
.word-cloud {
  width: 100%;
  height: 202px;
}

.word-cloud__title {
  margin: 0;
  color: #303133;
  font-size: 16px;
}
</style>
