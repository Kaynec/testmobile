<template>
  <div class="desktop" v-if="!isMobile()"></div>
  <div class="user-home" v-else>
    <!-- Header -->
    <Header />
    <!-- Hero Section -->
    <div class="hero-section">
      <div class="overlay"></div>
      <div class="small-overlay"></div>
      <img src="../../../assets/img/asset-1-288-x@3x.png" class="hero-image" />

      <div class="heroDiv">
        <div class="hero-header">
          <p class="text-style-1">نقشه راه</p>
          <p class="text-style-2">آزمون های جامع</p>
          <p class="chevron">
            مشاهده
            <i class="fas fa-chevron-left"></i>
          </p>
        </div>
      </div>
    </div>
    <!--  User Home -->
    <div class="User---Home">
      <div class="Cart"><img src="../../../assets/img/pancil.png" /></div>
      <div class="Cart">
        <img
          src="../../../assets/img/map.png"
          @click="changeShowRoadMap(true)"
          @touchstart="changeShowRoadMap(true)"
        />
      </div>
      <div class="Cart">
        <img src="../../../assets/img/book.png" />
      </div>
      <div class="Cart">
        <img src="../../../assets/img/support.png" />
      </div>
      <div class="Cart">
        <img
          src="../../../assets/img/exam.png"
          @click="changeShowAzmoon(true)"
          @touchstart="changeShowAzmoon(true)"
        />
      </div>
      <div class="Cart">
        <img src="../../../assets/img/calendar.png" />
      </div>
    </div>
    <Footer />
    <!--  -->
  </div>

  <!-- RoadMap  Add a Link as A Prop And Open That On Click -->
  <RoadMap v-if="showRoadMap" @convertBoolean="changeShowRoadMap(false)" />
  <!-- Azmoon -->

  <Azmoon v-if="showAzmoon" @convertBoolean="changeShowAzmoon(false)" />
</template>
<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import { useStudentStore } from '@/store';
import { StudentActionTypes } from '@/store/modules/student/action-types';
import Footer from '@/modules/student-modules/footer/footer.vue';
import Header from '@/modules/student-modules/header/header.vue';
import RoadMap from '@/modules/student-modules/roadmap/roadmap.vue';
import Azmoon from '@/modules/student-modules/azmoon/azmoon.vue';

@Options({
  components: {
    Footer,
    Header,
    RoadMap,
    Azmoon
  }
})
export default class Login extends Vue {
  public windowHeight = window.innerHeight;
  public showAzmoon = false;
  public showRoadMap = false;

  public mounted(): void {
    this.$nextTick(() => {
      window.addEventListener('resize', this.onResize);
    });
  }

  public changeShowRoadMap(boolean: boolean): void {
    console.log('SOME');
    this.showRoadMap = boolean;
  }

  public changeShowAzmoon(boolean: boolean): void {
    console.log('SOME');
    this.showAzmoon = boolean;
  }

  onResize(): void {
    (this as any).windowHeight = window.innerHeight;
  }

  getMainStyle(): { height: string } {
    return { height: `${(this as any).windowHeight - 1}px` };
  }
  // eslint-disable-next-line
  async logout() {
    debugger;
    await useStudentStore().dispatch(
      StudentActionTypes.LOG_OUT_STUDENT,
      undefined
    );
    this.$router.push('/student/login');
  }
}
</script>
<style lang="scss" scoped>
.desktop {
  height: 100%;
}

.user-home {
  width: 100vw;
  height: 100vh;
  background-color: #eee;
  display: flex;
  flex-direction: column;
  overflow: hidden;

  .hero-section {
    position: relative;
    width: 100%;
    margin: 0;
    background-image: linear-gradient(to top right, #ec3538 -5%, #880e13);
    flex-basis: clamp(17%, 27%, 31%);

    .overlay {
      position: absolute;
      left: 0;
      bottom: 0;
      top: 0;
      background-color: #960c10;
      opacity: 0.6;
      height: 100%;
      width: 62.5%;
      overflow: hidden;
      -webkit-clip-path: polygon(0 0, 100% 0, 0% 166%, 0 100%);
      clip-path: polygon(0 0, 100% 0, 0% 166%, 0 100%);
    }

    .small-overlay {
      position: absolute;
      width: 0;
      height: 0;
      left: 0;
      bottom: 0;
      border-top: 70vw solid #a61a1e;
      border-right: 60vw solid transparent;
    }

    .hero-image {
      object-fit: cover;
      position: absolute;
      left: 0;
      bottom: 0;
      width: auto;
      height: auto;
      max-width: 45%;
      max-height: 95%;
      z-index: 1;
    }
    .heroDiv {
      max-width: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      line-height: 1;
      height: 100%;
      margin: 0.25rem;
      .text-style-1 {
        z-index: 25;
        font-family: DimaArsalan;
        font-size: clamp(2rem, 2.5rem, 3rem);
        color: #fff;
        margin: 0;
        font-weight: 500;
      }
      .text-style-2 {
        z-index: 25;
        font-weight: 300;
        text-shadow: 0 3px 4px rgba(0, 0, 0, 0.33);
        font-family: IRANSans;
        font-size: clamp(1.2rem, 1.55rem, 1.8rem);
        color: #fff;
      }
    }

    .chevron {
      display: block;
      margin-top: 2.25rem;
      font-family: IRANSans;
      font-size: 0.79rem;
      font-weight: light;
      color: #fff;
      transform: translateY(-80%);

      i {
        color: white;
        font-size: 11px;
      }
    }
  }
  .User---Home {
    width: 100%;
    display: grid;
    height: 50%;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(3, 1fr);
    background-color: #eee;
    overflow: hidden;
    .Cart {
      display: flex;
      justify-content: center;
      align-items: center;

      img {
        width: 65%;
      }
    }
  }
}
</style>
