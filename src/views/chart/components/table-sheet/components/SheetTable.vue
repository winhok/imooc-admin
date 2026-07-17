<script setup lang="ts">
import { TableSheet, type S2DataConfig, type S2Options } from '@antv/s2'
import {
  onBeforeUnmount,
  onMounted,
  shallowRef,
  useTemplateRef,
  watch
} from 'vue'
import { useI18n } from 'vue-i18n'
import type { ChartSheetRow } from '@/api/chart'

const props = defineProps<{
  data: ChartSheetRow[]
}>()

const { locale, t } = useI18n()
const target = useTemplateRef<HTMLElement>('sheet')
const sheet = shallowRef<TableSheet>()
let resizeObserver: ResizeObserver | undefined

const dataConfig = (): S2DataConfig => ({
  fields: {
    columns: ['province', 'city', 'coverage', 'receivable', 'actual', 'balance']
  },
  meta: [
    { field: 'province', name: t('msg.chart.sheetProvince') },
    { field: 'city', name: t('msg.chart.sheetCity') },
    { field: 'coverage', name: t('msg.chart.sheetCoverage') },
    { field: 'receivable', name: t('msg.chart.sheetReceivable') },
    { field: 'actual', name: t('msg.chart.sheetActual') },
    { field: 'balance', name: t('msg.chart.sheetBalance') }
  ],
  data: props.data
})

const options = (): S2Options => ({
  width: target.value?.clientWidth ?? 0,
  height: target.value?.clientHeight ?? 0,
  seriesNumber: {
    enable: true,
    text: t('msg.chart.sheetIndex')
  },
  placeholder: {
    cell: '-',
    empty: { description: t('msg.chart.noData') }
  },
  conditions: {
    background: [
      {
        field: 'balance',
        mapping: (value) => ({
          fill: Number(value) >= 0 ? '#f0f9eb' : '#fef0f0'
        })
      }
    ]
  }
})

const render = async () => {
  if (!sheet.value) return
  sheet.value.setDataCfg(dataConfig(), true)
  sheet.value.setOptions(options())
  await sheet.value.render({ reloadData: true })
}

onMounted(() => {
  if (!target.value) return
  sheet.value = new TableSheet(target.value, dataConfig(), options())
  resizeObserver = new ResizeObserver(() => {
    if (!target.value || !sheet.value) return
    sheet.value.changeSheetSize(
      target.value.clientWidth,
      target.value.clientHeight
    )
  })
  resizeObserver.observe(target.value)
  void sheet.value.render()
})

watch([() => props.data, locale], () => void render())
onBeforeUnmount(() => {
  resizeObserver?.disconnect()
  sheet.value?.destroy()
})
</script>

<template>
  <el-card shadow="never" :body-style="{ padding: 0 }">
    <div ref="sheet" class="sheet-table" />
  </el-card>
</template>

<style scoped>
.sheet-table {
  width: 100%;
  height: 782px;
}
</style>
