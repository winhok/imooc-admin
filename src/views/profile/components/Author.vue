<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import PanThumb from '@/components/PanThumb/index.vue'
import { useUserStore } from '@/stores'

const { t } = useI18n()
const userStore = useUserStore()
const introduction = computed(() => t('msg.profile.Introduction'))
</script>

<template>
  <div class="author-container">
    <div class="header">
      <pan-thumb :image="userStore.userInfo.avatar" height="60px" width="60px">
        {{ $t('msg.profile.name') }}
      </pan-thumb>
      <div class="header-desc">
        <h3>{{ $t('msg.profile.name') }}</h3>
        <span>{{ $t('msg.profile.job') }}</span>
      </div>
    </div>
    <div class="info">
      {{ introduction }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.author-container {
  .header {
    display: flex;
    .header-desc {
      margin-left: 12px;
      display: flex;
      flex-direction: column;
      justify-content: space-around;

      span {
        font-size: 16px;
      }
    }
  }
  .info {
    margin-top: 16px;
    line-height: 22px;
    font-size: 16px;
    text-indent: 26px;
  }
}
</style>
