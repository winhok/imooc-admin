<script setup lang="ts">
import { ArrowLeft } from '@element-plus/icons-vue'
import { shallowRef } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import gif401 from '@/assets/401_images/401.gif'

const errGif = `${gif401}?${Date.now()}`
const ewizardClap =
  'https://wpimg.wallstcn.com/007ef517-bafd-4066-aae4-6883632d9646'
const dialogVisible = shallowRef(false)

const route = useRoute()
const router = useRouter()

function back() {
  if (route.query.noGoBack || window.history.length <= 1) {
    void router.push('/')
    return
  }
  router.go(-1)
}
</script>

<template>
  <div class="err-page-container">
    <el-button :icon="ArrowLeft" class="pan-back-btn" @click="back">
      返回
    </el-button>
    <el-row>
      <el-col :xs="24" :sm="12">
        <h1 class="text-jumbo">Oops!</h1>
        gif 来源
        <a
          href="https://zh.airbnb.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          airbnb
        </a>
        页面
        <h2>你没有权限去该页面</h2>
        <h6>如有不满请联系你领导</h6>
        <ul class="list-unstyled">
          <li>或者你可以去:</li>
          <li class="link-type">
            <RouterLink to="/">回首页</RouterLink>
          </li>
          <li>
            <a href="#" @click.prevent="dialogVisible = true">点我看图</a>
          </li>
        </ul>
      </el-col>
      <el-col :xs="24" :sm="12">
        <img
          class="pan-gif"
          :src="errGif"
          width="313"
          height="428"
          alt="Girl has dropped her ice cream."
        />
      </el-col>
    </el-row>
    <el-dialog v-model="dialogVisible" title="随便看">
      <img :src="ewizardClap" class="pan-img" alt="鼓掌" />
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
.err-page-container {
  width: 800px;
  max-width: 100%;
  margin: 100px auto;
  padding: 0 20px;

  .pan-back-btn {
    border: none;
    background: #008489;
    color: #fff;
  }

  .pan-gif {
    display: block;
    max-width: 100%;
    margin: 0 auto;
    object-fit: contain;
  }

  .pan-img {
    display: block;
    width: 100%;
    margin: 0 auto;
  }

  .text-jumbo {
    color: #484848;
    font-size: 60px;
    font-weight: 700;
  }

  .list-unstyled {
    font-size: 14px;

    li {
      padding-bottom: 5px;
    }

    a {
      color: #008489;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }
}
</style>
