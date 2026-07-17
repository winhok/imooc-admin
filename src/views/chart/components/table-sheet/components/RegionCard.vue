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
        ¥ {{ data.receivable }} ({{ $t('msg.chart.unit') }})
      </span>
    </span>
    <span class="region-card__row">
      <span>{{ $t('msg.chart.todayBalance') }}</span>
      <span
        :class="data.balance >= 0 ? 'region-card__profit' : 'region-card__loss'"
      >
        ¥ {{ data.balance }} ({{ $t('msg.chart.unit') }})
      </span>
    </span>
  </button>
</template>

<style scoped lang="scss">
.region-card {
  display: block;
  width: 100%;
  min-height: 112px;
  padding: 18px;
  color: #303133;
  text-align: left;
  background: #f2f3f9;
  border: 0;
  border-left: 6px solid transparent;
  border-radius: 6px;
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
    box-shadow: 0 4px 16px rgb(0 0 0 / 8%);
  }

  &__title {
    display: block;
    margin-bottom: 8px;
    font-size: 17px;
  }

  &__row {
    display: flex;
    justify-content: space-between;
    margin-top: 6px;
    color: #909399;
    font-size: 12px;
  }

  &__profit {
    color: #529b2e;
  }

  &__loss {
    color: #c45656;
  }
}
</style>
