<template>
  <div class="desktop" v-if="!isMobile()"></div>
  <!-- Header -->
  <div class="class-note" v-else>
    <MinimalHeader title="یادداشت ها " />
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
import { defineComponent } from 'vue';
import MinimalHeader from '@/modules/student-modules/header/minimal-header.vue';
import router from '@/router';

export default defineComponent({
  components: { MinimalHeader },
  setup() {
    const goOnePageBack = () => router.go(-1);
    return { goOnePageBack };
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
  height: 100%;

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
