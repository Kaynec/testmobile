<template>
  <div class="desktop" v-if="!isMobile()"></div>
  <div class="user-home" v-else>
    <!-- Header -->
    <Header />
    <section class="hero">
      <img src="../../../assets/img/asset-1-288-x@3x.png" alt="" />
      <h5>نقشه راه</h5>
      <h5>ازمون های جامع</h5>
      <p>مشاهده<i class="fas fa-angle-left"></i></p>
    </section>

    <div class="cart-container">
      <div class="cart">
        <img src="../../../assets/img/home-icons/pencil.png" />
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
  height: 100%;
  background-color: #eee;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  z-index: 1;

  .hero {
    position: relative;
    width: 100%;
    background-image: linear-gradient(to top right, #ec3538 -5%, #880e13);
    height: fit-content;
    max-height: 37vh;
    padding: 2rem;
    color: white;
    img {
      object-fit: cover;
      position: absolute;
      left: 0;
      bottom: 0;
      max-width: 50%;
      max-height: 95%;
      float: left;
      z-index: 1;
    }
    h5 {
      &:nth-of-type(1) {
        font-size: clamp(2.5rem, 3.5rem, 3.5rem);
        font-family: DimaArsalan;
        margin: 0;
        line-height: 0.8;
      }
      &:nth-of-type(2) {
        font-size: clamp(12px, 14px, 16px);
        font-family: IRANSans;
        margin: 0.25rem 0 0 0;
      }
    }

    p {
      display: flex;
      grid-gap: 0.5rem;
      align-items: center;
      margin: 1.5rem 0 0 0;
    }
  }
}
.cart-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  flex-grow: 1;
  background-color: #921c20;
  justify-content: center;
  align-items: center;

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
      padding: 0.25rem;
      background: linear-gradient(to bottom, white 30%, #ddd);
      border-radius: 1.5em;
      margin-bottom: 0.5rem;
    }
    h4 {
      font-family: IRANSans;
      font-size: 14px;
      font-weight: bold;
    }
  }
}
</style>
