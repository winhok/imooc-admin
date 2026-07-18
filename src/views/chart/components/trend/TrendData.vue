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
      duration: 1.5
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

    <div class="trend-data__item">
      <span class="trend-data__item-label trend-data__item-label--income">{{
        $t('msg.chart.trendDataTodayAdded')
      }}</span>
      <span class="trend-data__item-amount">
        <strong ref="added" /> {{ $t('msg.chart.unit') }}
      </span>
    </div>
    <div class="trend-data__item">
      <span class="trend-data__item-label trend-data__item-label--expense">{{
        $t('msg.chart.trendDataTodayExpend')
      }}</span>
      <span class="trend-data__item-amount">
        <strong ref="expense" /> {{ $t('msg.chart.unit') }}
      </span>
    </div>
    <div class="trend-data__item">
      <span class="trend-data__item-label trend-data__item-label--balance">{{
        $t('msg.chart.trendDataTodayBalance')
      }}</span>
      <span class="trend-data__item-amount">
        <strong ref="balance" /> {{ $t('msg.chart.unit') }}
      </span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.trend-data {
  height: 100%;

  &__total {
    padding: 12px 20px;
    color: #fff;
    background: linear-gradient(to right, #0ea5e9, #6366f1);
    border-radius: 5px;
  }

  &__label {
    display: block;
    font-size: 12px;
    font-weight: 700;
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
    padding: 16px 0;
    color: #666;
    border-bottom: 1px solid #c9c9c9;
    font-size: 12px;
  }

  &__item-label {
    padding: 4px 0 4px 8px;
    border-left: 6px solid transparent;

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

  &__item-amount {
    font-size: 12px;

    strong {
      color: #333;
      font-size: 20px;
    }
  }
}
</style>
