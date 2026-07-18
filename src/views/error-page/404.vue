<script setup lang="ts">
import image404 from '@/assets/404_images/404.png'
import cloud404 from '@/assets/404_images/404_cloud.png'
</script>

<template>
  <div class="wscn-http404-container">
    <div class="wscn-http404">
      <div class="pic-404">
        <img class="pic-404__parent" :src="image404" alt="404" />
        <img class="pic-404__child left" :src="cloud404" alt="" />
        <img class="pic-404__child mid" :src="cloud404" alt="" />
        <img class="pic-404__child right" :src="cloud404" alt="" />
      </div>
      <div class="bullshit">
        <div class="bullshit__oops">OOPS!</div>
        <div class="bullshit__info">
          All rights reserved
          <a
            class="wallstreet-link"
            href="https://wallstreetcn.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            wallstreetcn
          </a>
        </div>
        <div class="bullshit__headline">没有这个页面...</div>
        <div class="bullshit__info">
          请检查您输入的 URL 是否正确，或单击下面的按钮返回主页。
        </div>
        <RouterLink to="/" class="bullshit__return-home">回到主页</RouterLink>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wscn-http404-container {
  position: absolute;
  top: 40%;
  left: 50%;
  width: min(1200px, 100%);
  transform: translate(-50%, -50%);
}

.wscn-http404 {
  position: relative;
  display: flex;
  align-items: flex-start;
  width: 100%;
  padding: 0 50px;
  overflow: hidden;

  .pic-404 {
    position: relative;
    width: 600px;
    overflow: hidden;

    &__parent {
      width: 100%;
    }

    &__child {
      position: absolute;
      opacity: 0;
      animation-duration: 2s;
      animation-timing-function: linear;
      animation-fill-mode: forwards;

      &.left {
        top: 17px;
        left: 220px;
        width: 80px;
        animation-name: cloud-left;
        animation-delay: 1s;
      }

      &.mid {
        top: 10px;
        left: 420px;
        width: 46px;
        animation-name: cloud-mid;
        animation-delay: 1.2s;
      }

      &.right {
        top: 100px;
        left: 500px;
        width: 62px;
        animation-name: cloud-right;
        animation-delay: 1s;
      }
    }
  }

  .bullshit {
    position: relative;
    width: 300px;
    padding: 30px 0;
    overflow: hidden;

    &__oops,
    &__headline,
    &__info,
    &__return-home {
      opacity: 0;
      animation: slide-up 0.5s forwards;
    }

    &__oops {
      margin-bottom: 20px;
      color: #1482f0;
      font-size: 32px;
      font-weight: bold;
      line-height: 40px;
    }

    &__headline {
      margin-bottom: 10px;
      color: #222;
      font-size: 20px;
      font-weight: bold;
      line-height: 24px;
      animation-delay: 0.1s;
    }

    &__info {
      margin-bottom: 30px;
      color: grey;
      font-size: 13px;
      line-height: 21px;
      animation-delay: 0.2s;
    }

    &__return-home {
      display: block;
      width: 110px;
      height: 36px;
      border-radius: 100px;
      background: #1482f0;
      color: #fff;
      font-size: 14px;
      line-height: 36px;
      text-align: center;
      cursor: pointer;
      animation-delay: 0.3s;
    }
  }
}

.wallstreet-link {
  color: #20a0ff;
}

@keyframes cloud-left {
  0% {
    top: 17px;
    left: 220px;
    opacity: 0;
  }
  20% {
    top: 33px;
    left: 188px;
    opacity: 1;
  }
  80% {
    top: 81px;
    left: 92px;
    opacity: 1;
  }
  100% {
    top: 97px;
    left: 60px;
    opacity: 0;
  }
}

@keyframes cloud-mid {
  0% {
    top: 10px;
    left: 420px;
    opacity: 0;
  }
  20% {
    top: 40px;
    left: 360px;
    opacity: 1;
  }
  70% {
    top: 130px;
    left: 180px;
    opacity: 1;
  }
  100% {
    top: 160px;
    left: 120px;
    opacity: 0;
  }
}

@keyframes cloud-right {
  0% {
    top: 100px;
    left: 500px;
    opacity: 0;
  }
  20% {
    top: 120px;
    left: 460px;
    opacity: 1;
  }
  80% {
    top: 180px;
    left: 340px;
    opacity: 1;
  }
  100% {
    top: 200px;
    left: 300px;
    opacity: 0;
  }
}

@keyframes slide-up {
  0% {
    transform: translateY(60px);
    opacity: 0;
  }
  100% {
    transform: translateY(0);
    opacity: 1;
  }
}

@media (width <= 900px) {
  .wscn-http404 {
    padding: 0 24px;

    .pic-404 {
      width: 55%;
    }
  }
}
</style>
