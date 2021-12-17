<template>
  <div class="desktop" v-if="!isMobile()"></div>
  <div v-else class="road-map">
    <SmallHeader />
    <img src="../../../assets/img/roadmap.png" class="hero" />
    <div class="btns">
      <button
        @click="() => (currentState = 'future')"
        :class="{ active: currentState == 'future' }"
      >
        آزمون های آینده
      </button>
      <button
        @click="() => (currentState = 'past')"
        :class="{ active: currentState == 'past' }"
      >
        آزمون های گذشته
      </button>
    </div>
    <!--  -->
    <RoadMapFuture
      v-if="currentState == 'future'"
      @convertBoolean="changeShowDetail"
    />
    <RoadMapPast
      v-if="currentState == 'past'"
      @convertBoolean="changeShowDetail"
    />
    <!--  -->
    <Footer />
    <RoadMapDetail v-if="showDetail" @convertBoolean="changeShowDetail" />
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import SmallHeader from '@/modules/student-modules/header/small-header.vue';
import RoadMapPast from '@/modules/student-modules/roadmap/road-map-past.vue';
import RoadMapFuture from '@/modules/student-modules/roadmap/road-map-future.vue';
import RoadMapDetail from '@/modules/student-modules/roadmap/road-map-detail.vue';
import Footer from '@/modules/student-modules/footer/footer.vue';

export default defineComponent({
  components: {
    SmallHeader,
    RoadMapPast,
    RoadMapFuture,
    Footer,
    RoadMapDetail
  },
  setup() {
    //  Compare Dates Once Data Is available   //
    const currentState = ref('past');
    const showDetail = ref(false);

    const changeShowDetail = () => (showDetail.value = !showDetail.value);

    return { currentState, changeShowDetail, showDetail };
  }
});
</script>

<style lang="scss" scoped>
@import '@/css-variable//Global.scss';
.road-map {
  width: 100%;
  height: 100%;
  padding-top: 8vh;
  position: relative;
  background-color: #f4f4f4;
  font-family: IRANSans;

  .hero {
    width: 100%;
    max-height: 35vh;
  }
  .btns {
    margin: 1rem auto;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;

    button {
      font-family: IRANSans;
      font-size: 12px;
      font-weight: bold;
      text-align: center;
      padding: 10px;
      outline: none;
      border: none;
      width: 45%;
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
