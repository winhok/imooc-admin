<script setup lang="ts">
import type { ChartRegion } from '@/api/chart'

defineProps<{
  data: ChartRegion
  selected: boolean
}>()

defineEmits<{
  select: []
}>()
</script>

<template>
  <button
    type="button"
    class="region-card"
    :class="{ 'region-card--selected': selected }"
    @click="$emit('select')"
  >
    <strong class="region-card__title">{{ data.title }}</strong>
    <span class="region-card__row">
      <span>{{ $t('msg.chart.todayReceivable') }}</span>
      <span class="region-card__profit">
        ¥ {{ data.receivable }}（{{ $t('msg.chart.unit') }}）
      </span>
    </span>
    <span class="region-card__row">
      <span>{{ $t('msg.chart.todayBalance') }}</span>
      <span
        :class="data.balance >= 0 ? 'region-card__profit' : 'region-card__loss'"
      >
        ¥ {{ data.balance }}（{{ $t('msg.chart.unit') }}）
      </span>
    </span>
  </button>
</template>

<style scoped lang="scss">
.region-card {
  display: block;
  width: 100%;
  min-height: 115px;
  padding: 20px;
  color: #303133;
  font: inherit;
  text-align: left;
  background: #f2f3f9;
  border: 0;
  border-left: 6px solid transparent;
  border-radius: 5px;
  box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
  cursor: pointer;
  transition:
    border-color 0.2s,
    background-color 0.2s;

  &:hover,
  &:focus-visible,
  &--selected {
    background: #fff;
    border-left-color: #5172e9;
    outline: none;
    box-shadow: 0 2px 12px 0 rgb(0 0 0 / 10%);
  }

  &__title {
    display: block;
    margin-bottom: 8px;
    font-size: 18px;
  }

  &__row {
    display: flex;
    justify-content: space-between;
    margin-top: 6px;
    color: #999;
    font-size: 12px;
  }

  &__profit {
    color: #649840;
  }

  &__loss {
    color: #b65d59;
  }
}
</style>
