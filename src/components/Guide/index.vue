<script setup lang="ts">
import { driver, type Driver } from 'driver.js'
import 'driver.js/dist/driver.css'
import { useI18n } from 'vue-i18n'
import { onUnmounted } from 'vue'
import { watchSwitchLang } from '@/utils/i18n'
import steps from './steps'

const i18n = useI18n()

let driverObj: Driver | null = null

function destroyDriver() {
  driverObj?.destroy()
  driverObj = null
}

function onClick() {
  destroyDriver()
  driverObj = driver({
    allowClose: false,
    doneBtnText: i18n.t('msg.guide.close'),
    nextBtnText: i18n.t('msg.guide.next'),
    prevBtnText: i18n.t('msg.guide.prev'),
    steps: steps(i18n)
  })
  driverObj.drive()
}

watchSwitchLang(destroyDriver)
onUnmounted(destroyDriver)
</script>

<template>
  <div>
    <el-tooltip :content="$t('msg.navBar.guide')">
      <svg-icon id="guide-start" icon="guide" @click="onClick" />
    </el-tooltip>
  </div>
</template>

<style scoped></style>
