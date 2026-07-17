<script setup lang="ts">
import { shallowRef, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import {
  getChartRegions,
  getChartSheet,
  type ChartRegion,
  type ChartSheetRow
} from '@/api/chart'
import RegionCard from './components/RegionCard.vue'
import SheetTable from './components/SheetTable.vue'

const { locale } = useI18n()
const regions = shallowRef<ChartRegion[]>([])
const selectedId = shallowRef<ChartRegion['id']>()
const sheetData = shallowRef<ChartSheetRow[]>([])

const selectRegion = async (region: ChartRegion) => {
  selectedId.value = region.id
  sheetData.value = await getChartSheet(region.id)
}

const loadRegions = async () => {
  regions.value = await getChartRegions()
  const selected =
    regions.value.find((region) => region.id === selectedId.value) ??
    regions.value[0]
  if (selected) await selectRegion(selected)
}

watch(locale, loadRegions, { immediate: true })
</script>

<template>
  <el-row :gutter="20">
    <el-col :xs="24" :lg="18">
      <SheetTable :data="sheetData" />
    </el-col>
    <el-col :xs="24" :lg="6">
      <div class="region-list">
        <RegionCard
          v-for="region in regions"
          :key="region.id"
          :data="region"
          :selected="selectedId === region.id"
          @select="selectRegion(region)"
        />
      </div>
    </el-col>
  </el-row>
</template>

<style scoped>
.region-list {
  display: grid;
  gap: 20px;
}

@media (max-width: 1199px) {
  .region-list {
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    margin-top: 20px;
  }
}
</style>
