import type { ComputedRef, Ref } from 'vue'
import { onBeforeUnmount, onMounted, shallowRef, watch } from 'vue'
import {
  echarts,
  type EChartsCoreOption,
  type EChartsType
} from '@/views/chart/echarts'

export function useEChart(
  target: Readonly<Ref<HTMLElement | null>>,
  option: ComputedRef<EChartsCoreOption>
) {
  const chart = shallowRef<EChartsType>()
  let resizeObserver: ResizeObserver | undefined

  const render = () => {
    chart.value?.setOption(option.value, { notMerge: true })
  }

  onMounted(() => {
    if (!target.value) return
    chart.value = echarts.init(target.value)
    resizeObserver = new ResizeObserver(() => chart.value?.resize())
    resizeObserver.observe(target.value)
    render()
  })

  watch(option, render)

  onBeforeUnmount(() => {
    resizeObserver?.disconnect()
    chart.value?.dispose()
  })

  return { chart, render }
}
