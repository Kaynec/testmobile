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
      <div class="Cart">
        <img src="../../../assets/img/home-icons/pencil.png" />
        <h4>کلاس ها</h4>
      </div>
      <div class="Cart">
        <img
          src="../../../assets/img/home-icons/google-maps-icon-256.png"
          @click="changeShowRoadMap(true)"
          @touchstart="changeShowRoadMap(true)"
        />
        <h4>نقشه راه</h4>
      </div>
      <div class="Cart">
        <img src="../../../assets/img/home-icons/bitmap.png" />
        <h4>کتب درسی</h4>
      </div>
      <div class="Cart">
        <img src="../../../assets/img/home-icons/archive.png" />
        <h4>بسته پشتیبانی</h4>
      </div>
      <div class="Cart">
        <img
          src="../../../assets/img/home-icons/bill-of-document.png"
          @click="changeShowAzmoon(true)"
          @touchstart="changeShowAzmoon(true)"
        />
        <h4>آزمون ها</h4>
      </div>
      <div class="Cart">
        <img
          src="../../../assets/img/home-icons/system-calendar-icon-256.png"
        />
        <h4>تقویم آموزشی</h4>
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
  width: 100%;
  height: 100%;
  max-width: 100vw;
  max-height: 100vh;
  top: 0;
  left: 0;
  background-color: #eee;
  display: flex;
  position: absolute;
  flex-direction: column;
  overflow: hidden;
  z-index: 1;

  .hero-section {
    position: relative;
    width: 100%;
    margin: 0;
    background-image: linear-gradient(to top right, #ec3538 -5%, #880e13);
    height: fit-content;
    padding: 0.4rem;
    .overlay {
      position: absolute;
      left: 0;
      bottom: 0;
      top: 0;
      background-color: #921c20;
      opacity: 0.6;
      max-width: 62.5%;
      overflow: hidden;

      -webkit-clip-path: polygon(0 0, 100% 0, 0% 166%, 0 100%);
      clip-path: polygon(0 0, 100% 0, 0% 166%, 0 100%);
    }

    .small-overlay {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
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
    grid-template-columns: repeat(2, 1fr);
    grid-auto-rows: 5.62rem;
    overflow: hidden;
    padding: 0.75rem;
    grid-gap: clamp(0.3rem, 0.5rem, 1rem);

    .Cart {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      overflow: hidden;
      img {
        padding: 0.55rem;
        background: linear-gradient(to bottom, white 30%, #ddd);
        border-radius: 1.5em;
        margin-bottom: 0.5rem;
        overflow: hidden;
      }
      h4 {
        font-family: IRANSans;
        font-size: 14px;
        font-weight: bold;
      }
    }
  }
}
</style>
