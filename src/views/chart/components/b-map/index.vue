<script setup lang="ts">
import * as echarts from 'echarts'
import 'echarts/extension/bmap/bmap.js'
import type { EChartsOption, EChartsType } from 'echarts'
import {
  computed,
  onBeforeUnmount,
  onMounted,
  shallowRef,
  useTemplateRef,
  watch
} from 'vue'
import { useI18n } from 'vue-i18n'
import { getChartMap, type NamedValue } from '@/api/chart'
import { useLangFetch } from '@/utils/i18n'
import { loadBaiduMap } from '@/views/chart/composables/useBaiduMap'

const { t } = useI18n()
const data = useLangFetch(getChartMap, { data: [], geoCoordMap: {} })
const target = useTemplateRef<HTMLElement>('chart')
const chart = shallowRef<EChartsType>()
const error = shallowRef('')
let resizeObserver: ResizeObserver | undefined

const convertData = (items: NamedValue[]) =>
  items.flatMap((item) => {
    const coordinate = data.value.geoCoordMap[item.name]
    return coordinate
      ? [{ name: item.name, value: [...coordinate, item.value] }]
      : []
  })

const option = computed<EChartsOption>(() => {
  const all = convertData(data.value.data)
  const top = convertData(
    [...data.value.data].sort((a, b) => b.value - a.value).slice(0, 5)
  )

  return {
    tooltip: { trigger: 'item' },
    bmap: {
      center: [109.114129, 36.550339],
      zoom: 5,
      roam: true
    },
    series: [
      {
        name: `${t('msg.chart.revenue')} (${t('msg.chart.unit')})`,
        type: 'scatter',
        coordinateSystem: 'bmap',
        data: all,
        symbolSize: (value: number[]) => Math.max(8, (value[2] ?? 0) / 10),
        encode: { value: 2 },
        emphasis: { label: { show: true } },
        itemStyle: { color: '#15803d' }
      },
      {
        name: `${t('msg.chart.revenueTop5')} (${t('msg.chart.unit')})`,
        type: 'effectScatter',
        coordinateSystem: 'bmap',
        data: top,
        symbolSize: (value: number[]) => Math.max(10, (value[2] ?? 0) / 10),
        encode: { value: 2 },
        rippleEffect: { brushType: 'stroke' },
        label: { formatter: '{b}', position: 'right', show: true },
        itemStyle: { color: '#166534' },
        zlevel: 2
      }
    ]
  } as EChartsOption
})

const render = () => chart.value?.setOption(option.value, { notMerge: true })

onMounted(async () => {
  const ak = import.meta.env.VITE_BAIDU_MAP_AK?.trim()
  if (!ak) {
    error.value = t('msg.chart.bmapMissingAk')
    return
  }

  try {
    await loadBaiduMap(ak)
    if (!target.value) return
    chart.value = echarts.init(target.value)
    resizeObserver = new ResizeObserver(() => chart.value?.resize())
    resizeObserver.observe(target.value)
    render()
  } catch {
    error.value = t('msg.chart.bmapLoadFailed')
  }
})

watch(option, render)
onBeforeUnmount(() => {
  resizeObserver?.disconnect()
  chart.value?.dispose()
})
</script>

<template>
  <el-card class="map-card" shadow="never">
    <h3 class="map-card__title">{{ $t('msg.chart.bmapChartTitle') }}</h3>
    <el-empty v-if="error" :description="error" />
    <div v-else ref="chart" class="map-card__chart" />
  </el-card>
</template>

<style scoped lang="scss">
.map-card {
  position: relative;
  height: 500px;

  &__title {
    position: absolute;
    top: 24px;
    left: 50%;
    z-index: 2;
    margin: 0;
    color: #303133;
    font-size: 20px;
    transform: translateX(-50%);
  }

  &__chart {
    width: 100%;
    height: 452px;
  }

  :deep(.el-empty) {
    height: 452px;
  }
}
</style>
