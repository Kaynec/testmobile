<template>
  <div class="desktop" v-if="!isMobile()"></div>
  <div class="abobe" v-else :style="styles">
    <nav class="nav">
      <span> ادوبی کانکت </span>
      <img src="../../../assets/img/arrow-left.png" @click="goOnePageBack" />
    </nav>
  </div>
</template>

<script>
import { defineComponent, computed } from 'vue';
import router from '@/router';

export default defineComponent({
  setup() {
    const goOnePageBack = () => router.go(-1);

    let styles = computed(() => {
      return {
        'min-height': `calc( 1vh * 100) `
      };
    });

    return {
      styles,
      goOnePageBack
    };
  }
});
</script>

<style lang="scss" scoped>
@import '@/css-variable//Global.scss';
.abobe {
  width: 100%;
  background-color: #f4f4f4;
  font-family: IRANSans;
  position: relative;
  overflow-x: hidden;
  overflow-y: auto;
  .nav {
    width: 100%;
    height: 50px;
    padding: 10px 15px 10px 10px;
    box-shadow: 0 -2px 5px 0 rgba(0, 0, 0, 0.09),
      0 2px 4px 0 rgba(0, 0, 0, 0.19);
    background-color: #171717;
    display: flex;
    align-items: center;
    justify-content: space-between;

    span {
      margin: 7px 0 7px 2px;
      font-family: IRANSans;
      font-size: 11px;
      font-weight: bold;
      line-height: 1.45;
      color: #fff;
      display: inline-block;
    }
  }
}
</style>
