<script setup lang="ts">
import { computed, shallowRef } from 'vue'
import { userDetail, type UserDetail } from '@/api/user-manage'
import { dateFormat } from '@/filters'
import { watchSwitchLang } from '@/utils/i18n'

const props = defineProps<{
  id: string
}>()

const detailData = shallowRef<UserDetail>({
  _id: props.id
})
const printLoading = shallowRef(false)

const remarkList = computed(() => detailData.value.remark ?? [])
const experienceList = computed(() => detailData.value.experience ?? [])
const avatarPreviewList = computed(() =>
  detailData.value.avatar ? [detailData.value.avatar] : []
)

async function getUserDetail() {
  detailData.value = await userDetail(props.id)
}

void getUserDetail()
watchSwitchLang(getUserDetail)

const printObj = {
  id: 'userInfoBox',
  popTitle: 'imooc-vue-element-admin',
  beforeOpenCallback() {
    printLoading.value = true
  },
  openCallback() {
    printLoading.value = false
  },
  closeCallback() {
    printLoading.value = false
  }
}
</script>

<template>
  <div class="user-info-container">
    <el-card class="print-box">
      <el-button v-print="printObj" type="primary" :loading="printLoading">
        {{ $t('msg.userInfo.print') }}
      </el-button>
    </el-card>
    <el-card>
      <div id="userInfoBox" class="user-info-box">
        <h2 class="title">{{ $t('msg.userInfo.title') }}</h2>

        <div class="header">
          <el-descriptions :column="2" border>
            <el-descriptions-item :label="$t('msg.userInfo.name')">
              {{ detailData.username }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('msg.userInfo.sex')">
              {{ detailData.gender }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('msg.userInfo.nation')">
              {{ detailData.nationality }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('msg.userInfo.mobile')">
              {{ detailData.mobile }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('msg.userInfo.province')">
              {{ detailData.province }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('msg.userInfo.date')">
              {{ dateFormat(detailData.openTime) }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('msg.userInfo.remark')" :span="2">
              <el-tag
                v-for="(item, index) in remarkList"
                :key="`${item}-${index}`"
                class="remark"
                size="small"
              >
                {{ item }}
              </el-tag>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('msg.userInfo.address')" :span="2">
              {{ detailData.address }}
            </el-descriptions-item>
          </el-descriptions>
          <el-image
            class="avatar"
            :src="detailData.avatar"
            :preview-src-list="avatarPreviewList"
          />
        </div>
        <div class="body">
          <el-descriptions direction="vertical" :column="1" border>
            <el-descriptions-item :label="$t('msg.userInfo.experience')">
              <ul>
                <li v-for="(item, index) in experienceList" :key="index">
                  <span>
                    {{ dateFormat(item.startTime, 'YYYY/MM') }}
                    ----
                    {{ dateFormat(item.endTime, 'YYYY/MM') }}
                  </span>
                  <span>{{ item.title }}</span>
                  <span>{{ item.desc }}</span>
                </li>
              </ul>
            </el-descriptions-item>
            <el-descriptions-item :label="$t('msg.userInfo.major')">
              {{ detailData.major }}
            </el-descriptions-item>
            <el-descriptions-item :label="$t('msg.userInfo.glory')">
              {{ detailData.glory }}
            </el-descriptions-item>
          </el-descriptions>
        </div>
        <div class="foot">{{ $t('msg.userInfo.foot') }}</div>
      </div>
    </el-card>
  </div>
</template>

<style lang="scss" scoped>
.print-box {
  margin-bottom: 20px;
  text-align: right;
}

.user-info-box {
  width: 1024px;
  margin: 0 auto;

  .title {
    text-align: center;
    margin-bottom: 18px;
  }

  .header {
    display: flex;

    :deep(.el-descriptions) {
      flex-grow: 1;
    }

    .avatar {
      width: 187px;
      box-sizing: border-box;
      padding: 30px 20px;
      border: 1px solid #ebeef5;
      border-left: none;
    }

    .remark {
      margin-right: 12px;
    }
  }

  .body {
    ul {
      list-style: none;
      padding-left: 0;
      margin: 0;
    }

    li span {
      margin-right: 62px;
    }
  }

  .foot {
    margin-top: 42px;
    text-align: right;
  }
}
</style>
