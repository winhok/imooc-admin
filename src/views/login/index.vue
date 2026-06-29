<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { shallowRef, useTemplateRef, computed } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { validatePassword } from './rules'
import { useLogin } from './useLogin'
import { watchSwitchLang } from '@/utils/i18n'

const { loginForm, loading, login } = useLogin()

const loginFormRef = useTemplateRef<FormInstance>('loginFormRef')

const i18n = useI18n()
const loginRules = computed<FormRules>(() => ({
  username: [
    {
      required: true,
      trigger: 'blur',
      message: i18n.t('msg.login.usernameRule')
    }
  ],
  password: [{ required: true, trigger: 'blur', validator: validatePassword }]
}))

watchSwitchLang(() => {
  loginFormRef.value?.validate()
})

const passwordType = shallowRef<'password' | 'text'>('password')

function onChangePwdType() {
  passwordType.value = passwordType.value === 'password' ? 'text' : 'password'
}

async function onSubmit() {
  const form = loginFormRef.value
  if (!form) return
  try {
    await form.validate()
    await login()
  } catch {}
}
</script>

<template>
  <div class="login-container">
    <el-form
      ref="loginFormRef"
      class="login-form"
      :model="loginForm"
      :rules="loginRules"
    >
      <div class="title-container">
        <h3 class="title">{{ $t('msg.login.title') }}</h3>
        <LangSelect class="lang-select" effect="light"></LangSelect>
      </div>

      <el-form-item prop="username">
        <span class="svg-container">
          <SvgIcon icon="user" />
        </span>
        <el-input
          v-model="loginForm.username"
          placeholder="username"
          name="username"
          type="text"
        />
      </el-form-item>
      <el-form-item prop="password">
        <span class="svg-container">
          <SvgIcon icon="password" />
        </span>
        <el-input
          v-model="loginForm.password"
          placeholder="password"
          name="password"
          :type="passwordType"
          @keyup.enter="onSubmit"
        />
        <span class="show-pwd">
          <SvgIcon
            :icon="passwordType === 'password' ? 'eye' : 'eye-open'"
            @click="onChangePwdType"
          />
        </span>
      </el-form-item>

      <el-button
        type="primary"
        :loading="loading"
        style="width: 100%; margin-bottom: 30px"
        @click="onSubmit"
      >
        {{ $t('msg.login.loginBtn') }}
      </el-button>
      <div class="tips" v-html="$t('msg.login.desc')"></div>
    </el-form>
  </div>
</template>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark-gray: #889aa4;
$light-gray: #eee;
$cursor: #fff;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;

    :deep(.el-form-item) {
      border: 1px solid rgb(255 255 255 / 10%);
      background: rgb(0 0 0 / 10%);
      border-radius: 5px;
      color: #454545;
    }

    :deep(.el-input) {
      display: inline-block;
      height: 47px;
      width: 85%;
      flex: none;

      .el-input__wrapper {
        padding: 0;
        background: transparent;
        box-shadow: none;
      }

      input {
        background: transparent;
        border: 0;
        -webkit-appearance: none;
        appearance: none;
        border-radius: 0;
        padding: 12px 5px 12px 15px;
        color: $light-gray;
        height: 47px;
        caret-color: $cursor;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark-gray;
    vertical-align: middle;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light-gray;
      margin: 0 auto 40px;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark-gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
