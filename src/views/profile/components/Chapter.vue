<script setup lang="ts">
import { useLangFetch } from '@/utils/i18n'
import { chapter, type ChapterItem } from '@/api/user'

const chapterData = useLangFetch<ChapterItem[]>(chapter, [])
</script>

<template>
  <el-timeline>
    <el-timeline-item
      v-for="item in chapterData"
      :key="item.id"
      :timestamp="item.timestamp"
      placement="top"
    >
      <el-card>
        <h4>{{ item.content }}</h4>
      </el-card>
    </el-timeline-item>
  </el-timeline>
</template>
