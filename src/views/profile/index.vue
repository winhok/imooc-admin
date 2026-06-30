<script setup lang="ts">
import ProjectCard from './components/ProjectCard.vue'
import Chapter from './components/Chapter.vue'
import Feature from './components/Feature.vue'
import Author from './components/Author.vue'
import { ref } from 'vue'
import { feature, type FeatureItem } from '@/api/user'
import { useLangFetch } from '@/utils/i18n'

const activeName = ref('feature')
const featureData = useLangFetch<FeatureItem[]>(feature, [])
</script>

<template>
  <div class="my-container">
    <el-row>
      <el-col :span="6">
        <ProjectCard class="user-card" :features="featureData" />
      </el-col>
      <el-col :span="18">
        <el-card>
          <el-tabs v-model="activeName">
            <el-tab-pane :label="$t('msg.profile.feature')" name="feature">
              <Feature :features="featureData" />
            </el-tab-pane>
            <el-tab-pane :label="$t('msg.profile.chapter')" name="chapter" lazy>
              <Chapter />
            </el-tab-pane>
            <el-tab-pane :label="$t('msg.profile.author')" name="author" lazy>
              <Author />
            </el-tab-pane>
          </el-tabs>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
.my-container {
  .user-card {
    margin-right: 20px;
  }
}
</style>
