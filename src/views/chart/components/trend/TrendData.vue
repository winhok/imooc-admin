<script setup lang="ts">
import { CountUp } from 'countup.js'
import { nextTick, onBeforeUnmount, useTemplateRef, watch } from 'vue'
import type { ChartTrend } from '@/api/chart'

const props = defineProps<{
  data: ChartTrend
}>()

const totalTarget = useTemplateRef<HTMLElement>('total')
const addedTarget = useTemplateRef<HTMLElement>('added')
const expenseTarget = useTemplateRef<HTMLElement>('expense')
const balanceTarget = useTemplateRef<HTMLElement>('balance')
const counters: CountUp[] = []

const animate = async () => {
  await nextTick()
  counters.splice(0).forEach((counter) => counter.reset())

  const values: Array<[HTMLElement | null, number]> = [
    [totalTarget.value, props.data.allAmount],
    [addedTarget.value, props.data.tadayAdded],
    [expenseTarget.value, props.data.tadaySub],
    [balanceTarget.value, props.data.tadayAmount]
  ]

  values.forEach(([target, value]) => {
    if (!target) return
    const counter = new CountUp(target, value, {
      decimalPlaces: 2,
      duration: 1.2
    })
    counters.push(counter)
    counter.start()
  })
}

watch(() => props.data, animate, { immediate: true })
onBeforeUnmount(() => counters.forEach((counter) => counter.reset()))
</script>

<template>
  <div class="trend-data">
    <div class="trend-data__total">
      <span class="trend-data__label">{{
        $t('msg.chart.trendDataTitle')
      }}</span>
      <strong class="trend-data__amount">¥ <span ref="total" /></strong>
    </div>

    <div class="trend-data__item trend-data__item--income">
      <span>{{ $t('msg.chart.trendDataTodayAdded') }}</span>
      <strong><span ref="added" /> {{ $t('msg.chart.unit') }}</strong>
    </div>
    <div class="trend-data__item trend-data__item--expense">
      <span>{{ $t('msg.chart.trendDataTodayExpend') }}</span>
      <strong><span ref="expense" /> {{ $t('msg.chart.unit') }}</strong>
    </div>
    <div class="trend-data__item trend-data__item--balance">
      <span>{{ $t('msg.chart.trendDataTodayBalance') }}</span>
      <strong><span ref="balance" /> {{ $t('msg.chart.unit') }}</strong>
    </div>
  </div>
</template>

<style scoped lang="scss">
.trend-data {
  height: 100%;

  &__total {
    padding: 14px 20px;
    color: #fff;
    background: linear-gradient(135deg, #0ea5e9, #6366f1);
    border-radius: 8px;
  }

  &__label {
    display: block;
    font-size: 12px;
    font-weight: 600;
  }

  &__amount {
    display: block;
    margin-top: 4px;
    font-size: 24px;
  }

  &__item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 0 14px 10px;
    color: #606266;
    border-bottom: 1px solid #ebeef5;
    border-left: 5px solid transparent;
    font-size: 12px;

    strong {
      color: #303133;
      font-size: 16px;
    }

    &--income {
      border-left-color: #409eff;
    }

    &--expense {
      border-left-color: #e6a23c;
    }

    &--balance {
      border-left-color: #67c23a;
    }
  }
}
</style>
