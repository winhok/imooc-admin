<script setup lang="ts">
import { shallowRef } from 'vue'
import { getChartCalendar } from '@/api/chart'

const selectedDate = defineModel<Date>({ required: true })
const amounts = shallowRef(new Map<string, number>())

getChartCalendar().then((data) => {
  amounts.value = new Map(data.map((item) => [item.date, item.amount]))
})

const amountOf = (date: string) => amounts.value.get(date) ?? 0
const classOf = (date: string, isSelected: boolean) => ({
  'calendar-day--selected': isSelected,
  'calendar-day--profit': amountOf(date) > 0,
  'calendar-day--loss': amountOf(date) < 0
})
</script>

<template>
  <el-card class="calendar-card" :body-style="{ padding: 0 }">
    <el-calendar v-model="selectedDate" class="calendar">
      <template #date-cell="{ data }">
        <div class="calendar-day" :class="classOf(data.day, data.isSelected)">
          <span>{{ data.day.slice(-2) }}</span>
          <span v-if="amountOf(data.day)" class="calendar-day__amount">
            {{ amountOf(data.day) }}
          </span>
        </div>
      </template>
    </el-calendar>
  </el-card>
</template>

<style scoped lang="scss">
.calendar-card {
  height: 443px;
}

.calendar {
  :deep(.el-calendar__body) {
    padding: 0 12px 12px;
    font-size: 14px;
  }

  :deep(.el-calendar-day) {
    height: 66px;
    padding: 0;
  }
}

.calendar-day {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 8px;
  font-size: 14px;

  &__amount {
    margin-top: 4px;
    font-size: 12px;
  }

  &--profit {
    background: #f3fff3;

    .calendar-day__amount {
      color: #649840;
    }
  }

  &--loss {
    background: #ffe7e7;

    .calendar-day__amount {
      color: #b65d59;
    }
  }

  &--selected {
    background: #d6f2ff;
  }
}
</style>
