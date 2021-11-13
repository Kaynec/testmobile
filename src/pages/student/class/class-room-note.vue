<template>
  <div class="desktop" v-if="!isMobile()"></div>
  <!-- Header -->
  <div class="class-note" :style="styles" v-else>
    <nav class="sm-nav">
      <span class="user-parts"> یادداشت ها </span>

      <img src="../../../assets/img/arrow-left.png" @touchend="goOnePageBack" />
    </nav>
    <!-- Save Section -->
    <div class="save">
      <!-- Change This TO Real Data Later -->
      <span> آخرین تغییرات ۴ آبان ۱۴۰۰ ساعت ۱۸ </span>
      <span> ذخیره </span>
    </div>
    <!-- Text Area  -->
    <div class="textarea">
      <textarea placeholder="شروع به نوشتن کنید…"></textarea>
    </div>
    <!--  -->
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import router from '@/router';

export default defineComponent({
  setup() {
    const goOnePageBack = () => router.go(-1);
    let styles = computed(() => {
      return {
        'min-height': `calc( 1vh * 100) `
      };
    });
    // ${window.innerHeight * 0.01}
    return { goOnePageBack, styles };
  }
});
</script>

<style lang="scss" scoped>
.class-note {
  width: 100%;
  overflow: hidden;
  background-color: #f4f4f4;
  position: relative;
  display: flex;
  flex-direction: column;

  .sm-nav {
    display: flex;
    position: sticky;
    top: 0;
    width: 100%;
    background-color: #171717;
    color: #fff;
    justify-content: space-between;
    align-items: center;
    padding: 0.7rem;
    max-height: 8vh;
    box-shadow: 0 -2px 5px 0 rgba(0, 0, 0, 0.09),
      0 2px 4px 0 rgba(0, 0, 0, 0.19);

    span {
      font-family: IRANSans;
      font-size: 11px;
      font-weight: bold;
    }
  }

  .save {
    width: 100%;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;

    span {
      font-family: IRANSans;
      &:first-child {
        font-size: 11px;
        color: #979797;
      }
      &:nth-child(2) {
        font-size: 13px;
        line-height: 1.08;
        color: #4ac367;
      }
    }
  }
  .textarea {
    width: 100%;
    flex-grow: 1;
    overflow: auto;
    display: flex;
    align-items: stretch;
    justify-content: stretch;
    textarea {
      border: none;
      outline: none;
      flex-grow: 1;
      background: transparent;
      resize: none;
      padding: 1.25rem 1.25rem 0 0;
      font-family: IRANSans;
      width: 100%;
      font-size: 14px;
      text-align: right;
      color: #313131;
    }
  }
}
</style>
