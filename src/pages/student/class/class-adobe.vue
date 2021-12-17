<template>
  <div class="desktop" v-if="!isMobile()"></div>
  <div class="abobe" v-else>
    <MinimalHeader title="ادوبی کانکت" />
  </div>
</template>

<script>
import { defineComponent } from 'vue';
import MinimalHeader from '@/modules/student-modules/header/minimal-header.vue';
import router from '@/router';

export default defineComponent({
  components: { MinimalHeader },
  setup() {
    const goOnePageBack = () => router.go(-1);

    return {
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
  height: 100%;
}
</style>
