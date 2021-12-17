<template>
  <div class="desktop" v-if="!isMobile()"></div>
  <div class="shop-message" v-else>
    <nav class="nav">
      <svg
        class="svg"
        width="100%"
        height="150"
        viewBox="0 0 500 80"
        preserveAspectRatio="none"
      >
        <path d="M0,0 L0,40 Q250,80 500,40 L500,0 Z" fill="black" />
      </svg>
      <span> مشاهده رودمپ </span>
      <div class="transform">
        <span> لیست آزمون های انجام شده </span>
      </div>
    </nav>
    <h6 class="middle-text">مشاهده پاسخنامه</h6>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import router from '@/router';

export default defineComponent({
  setup() {
    const goOnePageBack = () => router.go(-1);

    return {
      goOnePageBack
    };
  }
});
</script>

<style lang="scss" scoped>
@import '@/css-variable/Global.scss';
.shop-message {
  position: relative;
  overflow-x: hidden;
  background: #fff;
  font-family: IRANSans;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding-top: 8vh;

  .nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    position: fixed;
    top: 0;
    .svg {
      position: absolute;
      width: 100%;
      top: 0;
      left: 0;
      z-index: 1;
    }

    span {
      font-family: IRANSans;
      //   font-family: IRANYekan;
      font-size: 16px;
      font-weight: bold;
      text-align: right;
      color: #fff;
      z-index: 9999;
      padding: 2rem;
      padding-top: 1.25rem;
    }

    .transform {
      position: absolute;
      bottom: -65%;
      left: 0;
      right: 0;
      width: 75%;
      height: 64px;
      margin: 0 auto;
      background-color: #fff;
      border-radius: 10px;
      box-shadow: 0 2px 52px 0 rgba(0, 0, 0, 0.09);
      z-index: 9999;
      display: flex;
      align-items: center;
      justify-content: center;

      span {
        font-family: IRANSans;
        //   font-family: IRANYekan;
        font-size: 15px;
        font-weight: bold;
        text-align: center;
        color: #000;
        white-space: nowrap;
      }
    }
  }

  //
  .middle-text {
    border-radius: 27px;
    border: solid 1px #ed1b24;
    padding: 1rem 3rem;
  }
}
</style>
