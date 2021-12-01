<template>
  <div class="desktop" v-if="!isMobile()"></div>
  <div class="user-home" v-else :style="styles">
    <!-- Header -->
    <Header />
    <img src="../../../assets/img/hero@2x.png" class="hero" alt="hero-img" />
    <!-- Main Container -->
    <div class="cart-container">
      <div class="cart long">
        <img src="../../../assets/img/home-icons/time-exam.png" />
        <h4>آزمون بازی</h4>
      </div>

      <div class="cart long">
        <img
          src="../../../assets/img/home-icons/duel.png"
          @touchstart="MoveToDoul"
        />
        <h4>دوئل حرفه ای</h4>
      </div>

      <div class="cart">
        <img src="../../../assets/img/home-icons/bitmap.png" />
        <h4>کتب درسی</h4>
      </div>

      <div class="cart">
        <img
          src="../../../assets/img/home-icons/pencil.png"
          @touchstart="MoveToCLassRoom"
        />
        <h4>کلاس ها</h4>
      </div>

      <div class="cart">
        <img src="../../../assets/img/home-icons/archive.png" />
        <h4>بسته پشتیبانی</h4>
      </div>

      <div class="cart">
        <img
          src="../../../assets/img/home-icons/bill-of-document.png"
          @touchstart="changeShowAzmoon(true)"
        />
        <h4>آزمون ها</h4>
      </div>

      <div class="cart">
        <img
          src="../../../assets/img/home-icons/google-maps-icon-256.png"
          @touchstart="changeShowRoadMap(true)"
        />
        <h4>نقشه راه</h4>
      </div>

      <div class="cart">
        <img
          @touchstart="MoveToCalendar"
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
import router from '@/router';
import Footer from '@/modules/student-modules/footer/footer.vue';
import Header from '@/modules/student-modules/header/header.vue';
import RoadMap from '@/modules/student-modules/roadmap/roadmap.vue';
import Azmoon from '@/modules/student-modules/azmoon/azmoon.vue';

import { store } from '@/store';

@Options({
  components: {
    Footer,
    Header,
    RoadMap,
    Azmoon
  },
  computed: {}
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
  public MoveToCLassRoom(): void {
    setTimeout(() => {
      router.push({
        name: 'ClassRoom'
      });
    }, 100);
  }

  public MoveToDoul(): void {
    setTimeout(() => {
      router.push({
        name: 'Duel'
      });
    }, 100);
  }

  public MoveToCalendar(): void {
    setTimeout(() => {
      router.push({
        name: 'Calendar'
      });
    }, 100);
  }

  get styles() {
    return {
      'min-height': `calc( 1vh * 100) `
    };
  }
  public changeShowRoadMap(boolean: boolean): void {
    this.showRoadMap = boolean;
  }
  public changeShowAzmoon(boolean: boolean): void {
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
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  width: 100%;
  background-color: #f4f4f4;
  font-family: IRANSans;
  position: relative;

  .hero {
    width: 100%;
    max-height: 40vh;
    object-fit: cover;
  }
}
.cart-container {
  width: 100%;
  flex-grow: 1;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 0.25rem;
  align-items: center;
  .cart {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-basis: 33.33%;
    width: 33.33%;

    &:nth-of-type(7),
    &:nth-of-type(6),
    &:nth-of-type(8) {
      margin-bottom: 3.8rem;
    }
    img {
      width: 60%;
      height: 60%;
      aspect-ratio: 1;
      padding: 10%;
      background: linear-gradient(to bottom, white 30%, #ddd);
      border-radius: 10px;
      margin-bottom: 0.5rem;
      object-fit: contain;
    }
    h4 {
      font-family: IRANSans;
      font-size: 12px;
      font-weight: bold;
    }
  }
  .long {
    flex-basis: 42%;
    height: 6.2rem;
    margin: 0.7rem auto 0 auto;
    border-radius: 18px;

    background: linear-gradient(to bottom, white 30%, #ddd);
    img {
      background: none;
      padding: 3%;
    }
  }
}
</style>
