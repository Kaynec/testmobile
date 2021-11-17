<template>
  <div class="desktop" v-if="!isMobile()"></div>
  <div class="user-home" v-else :style="styles">
    <!-- Header -->
    <Header />
    <img src="../../../assets/img/hero@2x.png" class="hero" alt="hero-img" />
    <!-- Main Container -->
    <div class="cart-container">
      <div class="cart">
        <img
          src="../../../assets/img/home-icons/pencil.png"
          @click="MoveToCLassRoom"
        />
        <h4>کلاس ها</h4>
      </div>
      <div class="cart">
        <img
          src="../../../assets/img/home-icons/google-maps-icon-256.png"
          @click="changeShowRoadMap(true)"
          @touchstart="changeShowRoadMap(true)"
        />
        <h4>نقشه راه</h4>
      </div>
      <div class="cart">
        <img src="../../../assets/img/home-icons/bitmap.png" />
        <h4>کتب درسی</h4>
      </div>
      <div class="cart">
        <img src="../../../assets/img/home-icons/archive.png" />
        <h4>بسته پشتیبانی</h4>
      </div>
      <div class="cart">
        <img
          src="../../../assets/img/home-icons/bill-of-document.png"
          @click="changeShowAzmoon(true)"
          @touchstart="changeShowAzmoon(true)"
        />
        <h4>آزمون ها</h4>
      </div>
      <div class="cart">
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
import router from '@/router';
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
    router.push({
      name: 'ClassRoom'
    });
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
  min-height: 110%;
  background-color: #eee;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  z-index: 1;

  .hero {
    width: 100%;
    max-height: 40vh;
    object-fit: cover;
  }
}
.cart-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  flex-grow: 1;
  padding-top: 1rem;
  align-items: center;
  justify-items: center;

  .cart {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-items: center;
    &:nth-of-type(5),
    &:nth-of-type(6) {
      margin-bottom: 3rem;
    }
    img {
      padding: 0.7rem;
      background: linear-gradient(to bottom, white 30%, #ddd);
      border-radius: 1.5em;
      // margin-bottom: 0.5rem;
    }
    h4 {
      font-family: IRANSans;
      font-size: 12px;
      font-weight: bold;
    }
  }
}
</style>
