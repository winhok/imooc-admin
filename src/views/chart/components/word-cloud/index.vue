<script setup lang="ts">
import { Chart } from '@antv/g2'
import {
  onBeforeUnmount,
  onMounted,
  shallowRef,
  useTemplateRef,
  watch
} from 'vue'
import { useI18n } from 'vue-i18n'
import { getChartWordCloud } from '@/api/chart'
import { useLangFetch } from '@/utils/i18n'

const { t } = useI18n()
const wordCloudMask = new URL(
  '../../../../assets/imooc-logo.png',
  import.meta.url
).href
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
      fontSize: [4, 80],
      padding: 0,
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
  <el-card class="word-cloud-card" :body-style="{ padding: 0 }">
    <h3 class="word-cloud-card__title">{{ t('msg.chart.cloudChartTitle') }}</h3>
    <div ref="chart" class="word-cloud" />
  </el-card>
</template>

<style scoped>
.word-cloud-card {
  position: relative;
}

.word-cloud-card__title {
  position: absolute;
  top: 4px;
  left: 5px;
  z-index: 1;
  margin: 0;
  color: #303133;
  font-size: 18px;
}

.word-cloud {
  width: 100%;
  height: 240px;
}
</style>
