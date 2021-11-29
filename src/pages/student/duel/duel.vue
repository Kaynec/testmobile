<template>
  <div class="desktop" v-if="!isMobile()"></div>
  <div v-else class="comp-test" :style="styles">
    <SmallHeader />
    <div class="img">
      <img src="../../../assets/img/duel.png" class="hero" />
    </div>
    <div class="btns">
      <button
        @click="() => (currentState = 'pro')"
        :class="{ active: currentState == 'pro' }"
      >
        دوئل‌های حرفه ای
      </button>
      <button
        @click="() => (currentState = 'past')"
        :class="{ active: currentState == 'past' }"
      >
        دوئل‌های گذشته
      </button>
    </div>

    <DuelPro v-if="currentState == 'pro'" />
    <DuelPast v-if="currentState == 'past'" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import SmallHeader from '@/modules/student-modules/header/small-header.vue';
import DuelPast from '@/modules/student-modules/duel/duel-past.vue';
import DuelPro from '@/modules/student-modules/duel/duel-pro.vue';

export default defineComponent({
  components: {
    SmallHeader,
    DuelPast,
    DuelPro
  },
  setup() {
    //  Compare Dates Once Data Is available   //
    const currentState = ref('past');

    let styles = computed(() => {
      return {
        'min-height': `calc( 1vh * 100) `
      };
    });

    return { currentState, styles };
  }
});
</script>

<style lang="scss" scoped>
@import '@/css-variable//Global.scss';
.comp-test {
  width: 100%;
  font-family: IRANSans;
  position: relative;
  background: #f4f4f4;
  overflow: hidden;

  .img {
    width: 92%;
    max-height: 35vh;
    margin: 0 auto;
    margin-top: 0.7rem;
    img {
      width: 100%;
    }
  }
  .btns {
    margin: 0.42rem auto;
    width: 90%;
    display: flex;
    justify-content: center;
    align-items: center;

    button {
      font-family: IRANSans;
      font-size: 12px;
      font-weight: bold;
      text-align: center;
      padding: 15px 10px;
      outline: none;
      border: none;
      width: 50%;
      box-shadow: 0 0 23px 0 rgba(0, 0, 0, 0.13);
      background: white;
      color: #171717;

      &:nth-child(2) {
        border-bottom-left-radius: 10px;
        border-top-left-radius: 10px;
      }
      &:nth-child(1) {
        border-bottom-right-radius: 10px;
        border-top-right-radius: 10px;
      }
    }
  }
  button.active {
    background-image: $redish-background;
    color: #fff;
  }
}
</style>
